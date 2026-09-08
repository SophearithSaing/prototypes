package main

import (
	"context"
	"errors"
	"strconv"
	"strings"
	"sync"
	"time"
	"unicode"
	"unicode/utf8"

	"github.com/jackc/pgx/v5"
)

const (
	maxResultBytes       = 8 << 20
	maxResultCellBytes   = 4 << 10
	maxResultSets        = 32
	resultClippedMarker  = "... [clipped]"
	resultNull           = "<NULL>"
	databaseCloseTimeout = 2 * time.Second
)

type database struct {
	mu     sync.Mutex
	conn   *pgx.Conn
	closed bool
}

type queryResult struct {
	sets         []resultSet
	duration     time.Duration
	err          error
	transaction  byte
	disconnected bool
	omittedSets  int
}

type resultSet struct {
	columns   []string
	rows      [][]string
	tag       string
	rowCount  int64 // Rows received; affected-row counts remain in tag.
	truncated bool
}

func (db *database) connect(ctx context.Context, cfg *pgx.ConnConfig) error {
	db.mu.Lock()
	defer db.mu.Unlock()

	if db.closed {
		return errors.New("database is closed")
	}
	db.disconnectLocked()
	if cfg == nil {
		return errors.New("connection configuration is required")
	}

	conn, err := pgx.ConnectConfig(ctx, cfg)
	if err != nil {
		return databaseContextError(ctx, err)
	}
	db.conn = conn
	return nil
}

// execute retains at most maxRows rows across the entire batch. Nonpositive
// limits retain no rows, but still execute and drain every server result.
func (db *database) execute(ctx context.Context, query string, maxRows int) (result queryResult) {
	db.mu.Lock()
	defer db.mu.Unlock()
	started := time.Now()
	defer func() {
		result.duration = time.Since(started)
		result.disconnected = db.conn == nil || db.conn.IsClosed()
		if db.conn != nil {
			result.transaction = db.conn.PgConn().TxStatus()
		}
		result.err = databaseContextError(ctx, result.err)
	}()

	if strings.TrimSpace(query) == "" {
		result.err = errors.New("query is empty")
		return
	}
	if db.closed {
		result.err = errors.New("database is closed")
		return
	}
	if db.conn == nil || db.conn.IsClosed() {
		result.err = errors.New("not connected to a database")
		return
	}

	// Reserve space for set headers and command tags, even after row storage fills.
	budget := resultBudget{rowsLeft: maxRows, bytesLeft: maxResultBytes - maxResultSets*256}
	reader := db.conn.PgConn().Exec(ctx, query)
	for reader.NextResult() {
		rr := reader.ResultReader()
		set := resultSet{}
		keep := len(result.sets) < maxResultSets
		if keep {
			fields := rr.FieldDescriptions()
			columnBytes := len(fields) * 16
			if columnBytes > budget.bytesLeft {
				keep = false
			} else {
				set.columns = make([]string, len(fields))
				for i, field := range fields {
					text, clipped := sanitizeResultText([]byte(field.Name))
					columnBytes += len(text)
					if columnBytes > budget.bytesLeft {
						keep = false
						break
					}
					set.columns[i] = text
					set.truncated = set.truncated || clipped
				}
				if keep {
					budget.bytesLeft -= columnBytes
				}
			}
		}

		for rr.NextRow() {
			if keep {
				budget.retainRow(&set, rr.Values())
			}
		}
		tag, err := rr.Close()
		if result.err == nil {
			result.err = err
		}
		if keep {
			set.tag = tag.String()
			result.sets = append(result.sets, set)
		} else {
			result.omittedSets++
		}
	}
	if err := reader.Close(); result.err == nil {
		result.err = err
	}
	// PostgreSQL also reports an empty query for buffers containing only comments
	// or semicolons. Let its parser decide instead of parsing SQL here.
	if result.err == nil && len(result.sets) == 1 && result.sets[0].tag == "" && len(result.sets[0].columns) == 0 {
		result.sets = nil
		result.err = errors.New("query is empty")
	}
	return
}

func (db *database) close() {
	db.mu.Lock()
	defer db.mu.Unlock()
	db.closed = true
	db.disconnectLocked()
}

// The caller holds db.mu. Unlike close, replacement must allow a later connect.
func (db *database) disconnectLocked() {
	if db.conn != nil {
		ctx, cancel := context.WithTimeout(context.Background(), databaseCloseTimeout)
		defer cancel()
		_ = db.conn.Close(ctx)
		db.conn = nil
	}
}

func databaseContextError(ctx context.Context, err error) error {
	if cause := ctx.Err(); err != nil && cause != nil && !errors.Is(err, cause) {
		// Keep any PgError while making cancellation discoverable with errors.Is.
		return errors.Join(err, cause)
	}
	return err
}

type resultBudget struct {
	rowsLeft  int
	bytesLeft int
}

func (budget *resultBudget) retainRow(set *resultSet, values [][]byte) {
	set.rowCount++
	if budget.rowsLeft <= 0 {
		set.truncated = true
		return
	}
	// Include string headers and row-slice capacity, so empty cells/rows cannot
	// bypass the memory limit. These are conservative sizes on 32-bit systems.
	size := 48 + 16*len(values)
	if size > budget.bytesLeft {
		budget.rowsLeft = 0
		set.truncated = true
		return
	}
	row := make([]string, len(values))
	clipped := false
	for i, value := range values {
		if value == nil {
			row[i] = resultNull
		} else {
			var cellClipped bool
			row[i], cellClipped = sanitizeResultText(value)
			clipped = clipped || cellClipped
		}
		size += len(row[i])
		if size > budget.bytesLeft {
			budget.rowsLeft = 0
			set.truncated = true
			return
		}
	}
	budget.bytesLeft -= size
	budget.rowsLeft--
	set.rows = append(set.rows, row)
	set.truncated = set.truncated || clipped
}

// Escape controls (including Unicode format controls) before the renderer sees
// them. Track token boundaries so clipping splits neither UTF-8 nor an escape.
func sanitizeResultText(raw []byte) (string, bool) {
	text := make([]byte, 0, min(len(raw), maxResultCellBytes))
	clipAt := 0
	for len(raw) > 0 {
		r, size := utf8.DecodeRune(raw)
		token := raw[:size]
		if r == utf8.RuneError && size == 1 {
			const hex = "0123456789abcdef"
			token = []byte{'\\', 'x', hex[raw[0]>>4], hex[raw[0]&15]}
		} else if !unicode.IsPrint(r) {
			quoted := strconv.QuoteRuneToASCII(r)
			token = []byte(quoted[1 : len(quoted)-1])
		}
		if len(text)+len(token) > maxResultCellBytes {
			return string(append(text[:clipAt], resultClippedMarker...)), true
		}
		text = append(text, token...)
		if len(text) <= maxResultCellBytes-len(resultClippedMarker) {
			clipAt = len(text)
		}
		raw = raw[size:]
	}
	return string(text), false
}
