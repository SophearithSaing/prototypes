package main

import (
	"context"
	"errors"
	"fmt"
	"os"
	"reflect"
	"strings"
	"sync"
	"testing"
	"time"
	"unicode"
	"unicode/utf8"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

func TestSanitizeResultText(t *testing.T) {
	tests := []struct {
		name string
		raw  string
		want string
	}{
		{"empty", "", ""},
		{"text protocol", `a;b \\x00 'quoted'`, `a;b \\x00 'quoted'`},
		{"unicode", "caf\u00e9 \u754c \U0001f642", "caf\u00e9 \u754c \U0001f642"},
		{"whitespace", "a\nb\tc\rd", `a\nb\tc\rd`},
		{"terminal escapes", "\x1b[31mred\x1b[0m\x1b]52;c;data\a", `\x1b[31mred\x1b[0m\x1b]52;c;data\a`},
		{"controls", "\x00\x01\b\v\f\x7f", `\x00\x01\b\v\f\x7f`},
		{"unicode controls", "\u0085\u009b\u2028\u202e\u2066", `\u0085\u009b\u2028\u202e\u2066`},
		{"invalid utf8", "a\xff\xc0b", `a\xff\xc0b`},
		{"replacement rune", "\ufffd", "\ufffd"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, clipped := sanitizeResultText([]byte(tt.raw))
			if got != tt.want || clipped {
				t.Fatalf("sanitizeResultText(%q) = (%q, %v), want (%q, false)", tt.raw, got, clipped, tt.want)
			}
		})
	}
	for r := rune(0); r <= 0x9f; r++ {
		got, _ := sanitizeResultText([]byte(string(r)))
		for _, rendered := range got {
			if !unicode.IsPrint(rendered) {
				t.Fatalf("control U+%04X reached output %q", r, got)
			}
		}
	}
}

func TestSanitizeResultTextClipping(t *testing.T) {
	tests := []struct {
		name    string
		raw     string
		clipped bool
	}{
		{"below limit", strings.Repeat("x", maxResultCellBytes-1), false},
		{"exact limit", strings.Repeat("x", maxResultCellBytes), false},
		{"over limit", strings.Repeat("x", maxResultCellBytes+1), true},
		{"multibyte", strings.Repeat("\u754c", maxResultCellBytes), true},
		{"escaped exact limit", strings.Repeat("\n", maxResultCellBytes/2), false},
		{"escaped over limit", strings.Repeat("\n", maxResultCellBytes/2+1), true},
		{"unicode escape", strings.Repeat("\u202e", maxResultCellBytes), true},
		{"invalid bytes", strings.Repeat("\xff", maxResultCellBytes), true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, clipped := sanitizeResultText([]byte(tt.raw))
			if clipped != tt.clipped || len(got) > maxResultCellBytes || !utf8.ValidString(got) {
				t.Fatalf("length = %d, valid UTF-8 = %v, clipped = %v; want clipped = %v", len(got), utf8.ValidString(got), clipped, tt.clipped)
			}
			if clipped && !strings.HasSuffix(got, resultClippedMarker) {
				t.Fatalf("missing visible clipping marker in %q", got)
			}
			if tt.name == "escaped over limit" {
				prefix := strings.TrimSuffix(got, resultClippedMarker)
				if strings.Trim(prefix, `\n`) != "" || len(prefix)%2 != 0 {
					t.Fatal("clipping split an escape token")
				}
			}
			for _, r := range got {
				if !unicode.IsPrint(r) {
					t.Fatalf("nonprintable rune U+%04X in sanitized output", r)
				}
			}
		})
	}
}

func TestResultBudgetTotalRows(t *testing.T) {
	budget := resultBudget{rowsLeft: 3, bytesLeft: maxResultBytes}
	sets := make([]resultSet, 2)
	for i := range sets {
		for range 2 {
			budget.retainRow(&sets[i], [][]byte{[]byte("value")})
		}
	}
	if len(sets[0].rows) != 2 || sets[0].rowCount != 2 || sets[0].truncated {
		t.Fatalf("first set = %+v", sets[0])
	}
	if len(sets[1].rows) != 1 || sets[1].rowCount != 2 || !sets[1].truncated {
		t.Fatalf("second set = %+v", sets[1])
	}
	for _, limit := range []int{0, -1} {
		budget := resultBudget{rowsLeft: limit, bytesLeft: maxResultBytes}
		set := resultSet{}
		budget.retainRow(&set, [][]byte{[]byte("value")})
		if len(set.rows) != 0 || set.rowCount != 1 || !set.truncated {
			t.Fatalf("row limit %d: %+v", limit, set)
		}
	}
}

func TestResultBudgetBytes(t *testing.T) {
	t.Run("whole rows across sets", func(t *testing.T) {
		budget := resultBudget{rowsLeft: 100, bytesLeft: 140}
		first, second := resultSet{}, resultSet{}
		budget.retainRow(&first, [][]byte{[]byte("12345")})
		budget.retainRow(&second, [][]byte{[]byte("12345")})
		budget.retainRow(&second, [][]byte{[]byte("12345")})
		if len(first.rows) != 1 || len(second.rows) != 1 || second.rowCount != 2 || !second.truncated || budget.bytesLeft < 0 {
			t.Fatalf("first=%+v second=%+v budget=%+v", first, second, budget)
		}
	})
	t.Run("no partial rows", func(t *testing.T) {
		budget := resultBudget{rowsLeft: 10, bytesLeft: 100}
		set := resultSet{}
		budget.retainRow(&set, [][]byte{[]byte("first"), []byte(strings.Repeat("x", 50))})
		if len(set.rows) != 0 || set.rowCount != 1 || !set.truncated || budget.bytesLeft != 100 {
			t.Fatalf("set=%+v budget=%+v", set, budget)
		}
	})
	t.Run("empty values have a cost", func(t *testing.T) {
		budget := resultBudget{rowsLeft: 1000, bytesLeft: 100}
		set := resultSet{}
		for range 1000 {
			budget.retainRow(&set, [][]byte{{}})
		}
		if len(set.rows) != 1 || set.rowCount != 1000 || !set.truncated {
			t.Fatalf("set=%+v", set)
		}
	})
	t.Run("zero-column rows have a cost", func(t *testing.T) {
		budget := resultBudget{rowsLeft: 1000, bytesLeft: 100}
		set := resultSet{}
		for range 1000 {
			budget.retainRow(&set, nil)
		}
		if len(set.rows) != 2 || set.rowCount != 1000 || !set.truncated {
			t.Fatalf("set=%+v", set)
		}
	})
	t.Run("escaped bytes count", func(t *testing.T) {
		budget := resultBudget{rowsLeft: 1, bytesLeft: 66}
		set := resultSet{}
		budget.retainRow(&set, [][]byte{{0x1b}})
		if len(set.rows) != 0 || !set.truncated {
			t.Fatalf("set=%+v", set)
		}
	})
}

func TestResultBudgetValues(t *testing.T) {
	budget := resultBudget{rowsLeft: 2, bytesLeft: maxResultBytes}
	set := resultSet{}
	raw := []byte("original")
	budget.retainRow(&set, [][]byte{nil, {}, raw, []byte(strings.Repeat("\u754c", maxResultCellBytes))})
	raw[0] = 'X'
	if len(set.rows) != 1 || set.rows[0][0] != resultNull || set.rows[0][1] != "" || set.rows[0][2] != "original" {
		t.Fatalf("unexpected retained values: %v", set.rows)
	}
	if !set.truncated || len(set.rows[0][3]) > maxResultCellBytes || !utf8.ValidString(set.rows[0][3]) || !strings.HasSuffix(set.rows[0][3], resultClippedMarker) {
		t.Fatal("long cell was not safely clipped")
	}
}

func TestDatabaseZeroValueAndClose(t *testing.T) {
	var db database
	for _, query := range []string{"", " \t\n"} {
		result := db.execute(context.Background(), query, 10)
		if result.err == nil || !strings.Contains(result.err.Error(), "empty") || !result.disconnected {
			t.Fatalf("empty query result = %+v", result)
		}
	}
	result := db.execute(context.Background(), "SELECT 1", 10)
	if result.err == nil || !result.disconnected || result.transaction != 0 {
		t.Fatalf("disconnected query result = %+v", result)
	}
	if err := db.connect(context.Background(), nil); err == nil {
		t.Fatal("nil configuration should fail without panicking")
	}
	db.close()
	db.close()
	var wg sync.WaitGroup
	for range 10 {
		wg.Go(func() {
			if err := db.connect(context.Background(), nil); err == nil || !strings.Contains(err.Error(), "closed") {
				t.Errorf("connect after close: %v", err)
			}
			if result := db.execute(context.Background(), "SELECT 1", 10); result.err == nil || !result.disconnected {
				t.Errorf("execute after close: %+v", result)
			}
			db.close()
		})
	}
	wg.Wait()
}

func TestDatabaseContextError(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	pgErr := &pgconn.PgError{Code: "57014", Message: "canceling statement due to user request"}
	err := databaseContextError(ctx, pgErr)
	var got *pgconn.PgError
	if !errors.Is(err, context.Canceled) || !errors.As(err, &got) || got != pgErr {
		t.Fatalf("context or PostgreSQL error lost: %v", err)
	}
	if databaseContextError(ctx, nil) != nil {
		t.Fatal("late cancellation must not turn a completed success into an error")
	}
	if databaseContextError(context.Background(), pgErr) != pgErr {
		t.Fatal("an unrelated server error should remain unchanged")
	}
	wrapped := fmt.Errorf("query: %w", context.Canceled)
	if databaseContextError(ctx, wrapped) != wrapped {
		t.Fatal("an existing context error should not be wrapped again")
	}
}

func databaseTestConfig(t *testing.T) *pgx.ConnConfig {
	t.Helper()
	url := os.Getenv("DB_CLIENT_TEST_DATABASE_URL")
	if url == "" {
		t.Skip("set DB_CLIENT_TEST_DATABASE_URL to run PostgreSQL integration tests")
	}
	cfg, err := pgx.ParseConfig(url)
	if err != nil {
		t.Fatalf("parse test database configuration: %v", err)
	}
	return cfg
}

func openTestDatabase(t *testing.T) *database {
	t.Helper()
	cfg := databaseTestConfig(t)
	db := &database{}
	t.Cleanup(db.close)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := db.connect(ctx, cfg); err != nil {
		t.Fatalf("connect to test database: %v", err)
	}
	return db
}

func executeTestQuery(t *testing.T, db *database, query string, maxRows int) queryResult {
	t.Helper()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result := db.execute(ctx, query, maxRows)
	if result.err != nil {
		t.Fatalf("execute test query: %v", result.err)
	}
	if result.disconnected {
		t.Fatal("successful query unexpectedly disconnected")
	}
	return result
}

func TestDatabaseIntegrationMultiStatements(t *testing.T) {
	db := openTestDatabase(t)
	result := executeTestQuery(t, db, `
		CREATE TEMP TABLE db_client_batch (id integer, value text);
		INSERT INTO pg_temp.db_client_batch VALUES (1, 'one;two'), (2, ''), (3, NULL);
		SELECT id, value FROM pg_temp.db_client_batch ORDER BY id;
		UPDATE pg_temp.db_client_batch SET value = 'changed;value' WHERE id IN (1, 2);
		DELETE FROM pg_temp.db_client_batch WHERE id = 3;
		SELECT value FROM pg_temp.db_client_batch ORDER BY id;
		DO $body$ BEGIN PERFORM 'another;semicolon'; END; $body$;
	`, 100)
	wantTags := []string{"CREATE TABLE", "INSERT 0 3", "SELECT 3", "UPDATE 2", "DELETE 1", "SELECT 2", "DO"}
	wantCounts := []int64{0, 0, 3, 0, 0, 2, 0}
	if len(result.sets) != len(wantTags) {
		t.Fatalf("got %d result sets, want %d", len(result.sets), len(wantTags))
	}
	for i, set := range result.sets {
		if set.tag != wantTags[i] || set.rowCount != wantCounts[i] || set.truncated {
			t.Errorf("set %d = %+v, want tag %q and rowCount %d", i, set, wantTags[i], wantCounts[i])
		}
	}
	if !reflect.DeepEqual(result.sets[2].columns, []string{"id", "value"}) || !reflect.DeepEqual(result.sets[2].rows, [][]string{{"1", "one;two"}, {"2", ""}, {"3", resultNull}}) {
		t.Fatalf("SELECT result = %+v", result.sets[2])
	}
	if result.transaction != 'I' || result.duration <= 0 || result.omittedSets != 0 {
		t.Fatalf("query status = %+v", result)
	}
	result = executeTestQuery(t, db, "SELECT id FROM pg_temp.db_client_batch WHERE false", 10)
	if !reflect.DeepEqual(result.sets[0].columns, []string{"id"}) || len(result.sets[0].rows) != 0 || result.sets[0].tag != "SELECT 0" {
		t.Fatalf("empty SELECT lost its columns or tag: %+v", result.sets[0])
	}
}

func TestDatabaseIntegrationSessionAndRollback(t *testing.T) {
	db := openTestDatabase(t)
	executeTestQuery(t, db, "CREATE TEMP TABLE db_client_session (value integer); SET application_name = 'db-client test;session'", 10)
	for _, query := range []string{"BEGIN", "INSERT INTO pg_temp.db_client_session VALUES (42)", "SELECT value FROM pg_temp.db_client_session"} {
		result := executeTestQuery(t, db, query, 10)
		if result.transaction != 'T' {
			t.Fatalf("%q: transaction = %q, want T", query, result.transaction)
		}
		if strings.HasPrefix(query, "SELECT") && !reflect.DeepEqual(result.sets[0].rows, [][]string{{"42"}}) {
			t.Fatal("transaction did not retain the inserted row between execute calls")
		}
	}
	if result := executeTestQuery(t, db, "ROLLBACK", 10); result.transaction != 'I' {
		t.Fatalf("transaction after rollback = %q", result.transaction)
	}
	result := executeTestQuery(t, db, "SELECT count(*), current_setting('application_name') FROM pg_temp.db_client_session", 10)
	if !reflect.DeepEqual(result.sets[0].rows, [][]string{{"0", "db-client test;session"}}) {
		t.Fatalf("session state after rollback = %v", result.sets[0].rows)
	}
}

func TestDatabaseIntegrationServerErrorRecovery(t *testing.T) {
	db := openTestDatabase(t)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result := db.execute(ctx, "SELECT 'first;value' AS value; SELECT 1 / 0; SELECT 'unreachable'", 10)
	var pgErr *pgconn.PgError
	if !errors.As(result.err, &pgErr) || pgErr.Code != "22012" || result.disconnected || result.transaction != 'I' {
		t.Fatalf("server error result = %+v", result)
	}
	if len(result.sets) == 0 || !reflect.DeepEqual(result.sets[0].rows, [][]string{{"first;value"}}) || result.sets[0].tag != "SELECT 1" {
		t.Fatalf("earlier successful result was lost: %+v", result.sets)
	}
	executeTestQuery(t, db, "SELECT 42", 10)
	result = db.execute(ctx, "BEGIN; SELECT 1 / 0", 10)
	if !errors.As(result.err, &pgErr) || pgErr.Code != "22012" || result.transaction != 'E' || result.disconnected {
		t.Fatalf("failed transaction = %+v", result)
	}
	result = db.execute(ctx, "SELECT 42", 10)
	if !errors.As(result.err, &pgErr) || pgErr.Code != "25P02" || result.transaction != 'E' {
		t.Fatalf("failed transaction did not persist: %+v", result)
	}
	if result := executeTestQuery(t, db, "ROLLBACK; SELECT 42", 10); result.transaction != 'I' || result.sets[1].rows[0][0] != "42" {
		t.Fatalf("recovery after rollback = %+v", result)
	}
	for _, query := range []string{"", " \t\n", "-- only a comment;", "/* empty; */ ; ;"} {
		result := db.execute(ctx, query, 10)
		if result.err == nil || !strings.Contains(result.err.Error(), "empty") || result.disconnected {
			t.Fatalf("empty buffer %q: %+v", query, result)
		}
	}
	executeTestQuery(t, db, "SELECT 1", 10)
}

func TestDatabaseIntegrationRowLimitsDrainBatch(t *testing.T) {
	for _, limit := range []int{3, 0, -1} {
		t.Run(fmt.Sprint(limit), func(t *testing.T) {
			db := openTestDatabase(t)
			executeTestQuery(t, db, "CREATE TEMP TABLE db_client_limit (value integer)", 10)
			result := executeTestQuery(t, db, `
				SELECT n FROM generate_series(1, 2) AS n;
				SELECT n FROM generate_series(3, 6) AS n;
				INSERT INTO pg_temp.db_client_limit VALUES (7);
				UPDATE pg_temp.db_client_limit SET value = 8;
				SELECT value FROM pg_temp.db_client_limit;
			`, limit)
			if len(result.sets) != 5 {
				t.Fatalf("got %d sets, want 5", len(result.sets))
			}
			if result.sets[0].rowCount != 2 || result.sets[1].rowCount != 4 || result.sets[4].rowCount != 1 || !result.sets[1].truncated || !result.sets[4].truncated {
				t.Fatalf("row counts or truncation = %+v", result.sets)
			}
			if result.sets[0].tag != "SELECT 2" || result.sets[1].tag != "SELECT 4" || result.sets[2].tag != "INSERT 0 1" || result.sets[3].tag != "UPDATE 1" || result.sets[4].tag != "SELECT 1" {
				t.Fatalf("tags after truncation = %+v", result.sets)
			}
			retained := 0
			for _, set := range result.sets {
				retained += len(set.rows)
			}
			if retained != max(limit, 0) || (limit == 3 && (len(result.sets[0].rows) != 2 || len(result.sets[1].rows) != 1)) {
				t.Fatalf("retained %d rows for limit %d", retained, limit)
			}
			result = executeTestQuery(t, db, "SELECT value FROM pg_temp.db_client_limit", 10)
			if result.sets[0].rows[0][0] != "8" {
				t.Fatal("display limit prevented a following write from completing")
			}
		})
	}
}

func TestDatabaseIntegrationSetLimitDrainsBatch(t *testing.T) {
	db := openTestDatabase(t)
	executeTestQuery(t, db, "CREATE TEMP TABLE db_client_sets (value integer)", 10)
	query := strings.Repeat("SELECT 1;", maxResultSets+3) + "INSERT INTO pg_temp.db_client_sets VALUES (9)"
	result := executeTestQuery(t, db, query, 1)
	if len(result.sets) != maxResultSets || result.omittedSets != 4 {
		t.Fatalf("retained %d sets, omitted %d", len(result.sets), result.omittedSets)
	}
	result = executeTestQuery(t, db, "SELECT value FROM pg_temp.db_client_sets", 10)
	if result.sets[0].rows[0][0] != "9" {
		t.Fatal("result-set limit prevented a following write from completing")
	}
}

func TestDatabaseIntegrationByteLimitDrainsBatch(t *testing.T) {
	db := openTestDatabase(t)
	executeTestQuery(t, db, "CREATE TEMP TABLE db_client_bytes (value integer)", 10)
	query := fmt.Sprintf(`
		SELECT repeat('x', %d) FROM generate_series(1, 1100);
		SELECT repeat('x', %d) FROM generate_series(1, 1100);
		INSERT INTO pg_temp.db_client_bytes VALUES (9);
	`, maxResultCellBytes, maxResultCellBytes)
	result := executeTestQuery(t, db, query, 3000)
	if len(result.sets) != 3 || result.sets[0].truncated || !result.sets[1].truncated || result.sets[2].tag != "INSERT 0 1" {
		t.Fatalf("unexpected sets or truncation: count=%d", len(result.sets))
	}
	bytes := 0
	for _, set := range result.sets[:2] {
		if set.rowCount != 1100 || set.tag != "SELECT 1100" {
			t.Fatalf("rowCount=%d tag=%q", set.rowCount, set.tag)
		}
		for _, row := range set.rows {
			for _, cell := range row {
				bytes += len(cell)
			}
		}
	}
	if bytes > maxResultBytes {
		t.Fatalf("retained %d bytes, limit %d", bytes, maxResultBytes)
	}
	result = executeTestQuery(t, db, "SELECT value FROM pg_temp.db_client_bytes", 10)
	if result.sets[0].rows[0][0] != "9" {
		t.Fatal("byte limit prevented a following write from completing")
	}
}

func TestDatabaseIntegrationSanitization(t *testing.T) {
	db := openTestDatabase(t)
	result := executeTestQuery(t, db, `SELECT E'line\n\t\033[31m' AS U&"col\000a\001b", repeat(U&'\754c', 2000) AS long_cell`, 10)
	set := result.sets[0]
	if set.columns[0] != `col\n\x1b` || set.rows[0][0] != `line\n\t\x1b[31m` {
		t.Fatalf("terminal controls were not escaped: column=%q cell=%q", set.columns[0], set.rows[0][0])
	}
	if !set.truncated || !utf8.ValidString(set.rows[0][1]) || len(set.rows[0][1]) > maxResultCellBytes || !strings.HasSuffix(set.rows[0][1], resultClippedMarker) {
		t.Fatal("long Unicode cell was not safely clipped")
	}
}

func TestDatabaseIntegrationCancellation(t *testing.T) {
	for _, mode := range []string{"deadline", "cancel", "already canceled"} {
		t.Run(mode, func(t *testing.T) {
			db := openTestDatabase(t)
			ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
			defer cancel()
			want := context.Canceled
			switch mode {
			case "deadline":
				var deadlineCancel context.CancelFunc
				ctx, deadlineCancel = context.WithTimeout(ctx, 100*time.Millisecond)
				defer deadlineCancel()
				want = context.DeadlineExceeded
			case "cancel":
				timer := time.AfterFunc(100*time.Millisecond, cancel)
				defer timer.Stop()
			case "already canceled":
				cancel()
			}
			result := db.execute(ctx, "SELECT 1; SELECT pg_sleep(10)", 0)
			if !errors.Is(result.err, want) {
				t.Fatalf("got %v, want errors.Is(%v)", result.err, want)
			}
			if result.duration >= 5*time.Second {
				t.Fatalf("cancellation took %v", result.duration)
			}
			if result.disconnected != db.conn.IsClosed() || result.transaction != db.conn.PgConn().TxStatus() {
				t.Fatal("returned connection status does not match pgx")
			}
		})
	}
}

func TestDatabaseIntegrationConnectionReplacement(t *testing.T) {
	db := openTestDatabase(t)
	cfg := databaseTestConfig(t)
	executeTestQuery(t, db, "CREATE TEMP TABLE db_client_old_session (value integer)", 10)
	old := db.conn
	canceled, cancel := context.WithCancel(context.Background())
	cancel()
	if err := db.connect(canceled, cfg); !errors.Is(err, context.Canceled) {
		t.Fatalf("canceled connection replacement = %v", err)
	}
	if !old.IsClosed() || db.conn != nil {
		t.Fatal("failed replacement left the previous session connected")
	}
	if result := db.execute(context.Background(), "SELECT 1", 10); result.err == nil || !result.disconnected {
		t.Fatalf("failed replacement query = %+v", result)
	}
	ctx, cleanup := context.WithTimeout(context.Background(), 10*time.Second)
	defer cleanup()
	if err := db.connect(ctx, cfg); err != nil {
		t.Fatalf("connect after failed replacement: %v", err)
	}
	result := executeTestQuery(t, db, "SELECT to_regclass('pg_temp.db_client_old_session') IS NULL", 10)
	if result.sets[0].rows[0][0] != "t" {
		t.Fatal("connection replacement retained the old session's temporary table")
	}
	old = db.conn
	if err := db.connect(ctx, cfg); err != nil {
		t.Fatalf("successful connection replacement: %v", err)
	}
	if !old.IsClosed() || db.conn == old {
		t.Fatal("successful replacement did not close the previous connection")
	}
	db.close()
	if err := db.connect(ctx, cfg); err == nil || !strings.Contains(err.Error(), "closed") {
		t.Fatalf("connect after shutdown: %v", err)
	}
}

func TestDatabaseIntegrationConcurrentExecution(t *testing.T) {
	db := openTestDatabase(t)
	executeTestQuery(t, db, "CREATE TEMP TABLE db_client_concurrent (value integer)", 10)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var wg sync.WaitGroup
	for range 10 {
		wg.Go(func() {
			result := db.execute(ctx, "INSERT INTO pg_temp.db_client_concurrent VALUES (1)", 10)
			if result.err != nil {
				t.Errorf("concurrent execute: %v", result.err)
			}
		})
	}
	wg.Wait()
	result := executeTestQuery(t, db, "SELECT count(*) FROM pg_temp.db_client_concurrent", 10)
	if result.sets[0].rows[0][0] != "10" {
		t.Fatal("concurrent execution lost writes")
	}
}
