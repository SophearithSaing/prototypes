package main

import (
	"errors"
	"fmt"
	"strings"
	"testing"
	"unicode"
	"unicode/utf8"

	"github.com/charmbracelet/x/ansi"
	"github.com/jackc/pgx/v5/pgconn"
)

func TestRenderResult(t *testing.T) {
	set := resultSet{columns: []string{"value"}, rows: [][]string{{resultNull}, {""}, {"0"}}, rowCount: 3, tag: "SELECT 3"}
	if got, want := renderResult(set, false), "# | value  |\n--+--------+\n1 | <NULL> |\n2 |        |\n3 | 0      |"; got != want {
		t.Fatalf("table = %q; want %q", got, want)
	}
	if got, want := renderResult(set, true), "Row 1\n  value: <NULL>\n\nRow 2\n  value: \n\nRow 3\n  value: 0\n"; got != want {
		t.Fatalf("full values = %q; want %q", got, want)
	}
	for _, expanded := range []bool{false, true} {
		for _, tag := range []string{"CREATE TABLE", "INSERT 0 2", "UPDATE 0", "DELETE 3", "BEGIN", "COMMIT"} {
			if got := renderResult(resultSet{tag: tag}, expanded); got != tag+"\nNo rows returned." {
				t.Errorf("command tag %q, expanded=%v: %q", tag, expanded, got)
			}
		}
		zero := renderResult(resultSet{columns: []string{"value"}, tag: "SELECT 0"}, expanded)
		if !strings.Contains(zero, "No rows to display.") || (!expanded && !strings.Contains(zero, "value")) || strings.Contains(zero, "Row 1") {
			t.Errorf("zero-row SELECT, expanded=%v: %q", expanded, zero)
		}
	}
}

func TestRenderResultUnicodeWidths(t *testing.T) {
	wide := strings.Repeat("\u754c", 40)
	set := resultSet{columns: []string{wide, "accent"}, rows: [][]string{{wide, "e\u0301"}, {"\U0001f642", "caf\u00e9"}}}
	lines := strings.Split(renderResult(set, false), "\n")
	for _, line := range lines {
		if !utf8.ValidString(line) || ansi.StringWidth(line) != 75 {
			t.Errorf("misaligned Unicode table: width=%d, line=%q", ansi.StringWidth(line), line)
		}
	}
	for _, line := range []string{lines[0], lines[2]} {
		cell := strings.Split(line, "|")[1]
		if ansi.StringWidth(cell) != 62 || !strings.Contains(cell, "...") || strings.Contains(cell, wide) {
			t.Errorf("wide cell did not respect the 60-cell display cap: %q", cell)
		}
	}
	if got := renderResult(set, true); !strings.Contains(got, "  "+wide+": "+wide) || !strings.Contains(got, "accent: e\u0301") {
		t.Fatalf("full-value view lost untruncated Unicode text: %q", got)
	}
	set = resultSet{columns: []string{"x"}}
	for range 12 {
		set.rows = append(set.rows, []string{"0"})
	}
	for _, line := range strings.Split(renderResult(set, false), "\n") {
		if ansi.StringWidth(line) != 10 {
			t.Errorf("two-digit row numbers broke alignment: %q", line)
		}
	}
}

func TestQueryErrorText(t *testing.T) {
	pgErr := &pgconn.PgError{
		Severity: "ERROR", Code: "42601", Message: "bad\x1b[2J\nmessage",
		Detail: "detail\x1b]52;c;payload\a\r", Hint: "hint\t\u009b\u202e\xff", Position: 17,
	}
	text := queryErrorText(fmt.Errorf("execute: %w", pgErr))
	for _, want := range []string{"execute:", "42601", `bad\x1b[2J\nmessage`, `Detail: detail\x1b]52;c;payload\a\r`, `Hint: hint\t\u009b\u202e\xff`, "SQL character position: 17"} {
		if !strings.Contains(text, want) {
			t.Errorf("formatted PostgreSQL error lacks %q: %q", want, text)
		}
	}
	for _, r := range text {
		if r != '\n' && !unicode.IsPrint(r) {
			t.Errorf("control injection U+%04X reached formatted error: %q", r, text)
		}
	}
	if !utf8.ValidString(text) {
		t.Fatal("formatted error contains invalid UTF-8")
	}
	if got := queryErrorText(errors.New("network\r\n\x1b[31m")); got != `network\r\n\x1b[31m` {
		t.Fatalf("plain error was not sanitized: %q", got)
	}
	if got := queryErrorText(&pgconn.PgError{Message: "simple"}); strings.Contains(got, "Detail:") || strings.Contains(got, "Hint:") || strings.Contains(got, "position:") {
		t.Fatalf("empty optional error fields were rendered: %q", got)
	}
}

func TestRefreshResultsWarningsAndOffsets(t *testing.T) {
	m := newTestModel(t)
	m.results.Width, m.results.Height = 200, 40
	m.result = queryResult{
		err: errors.New("batch failed"), omittedSets: 2,
		sets: []resultSet{{columns: []string{"value"}, rows: [][]string{{"retained"}}, tag: "SELECT 2", rowCount: 2, truncated: true}},
	}
	m.results.SetContent(strings.Repeat(strings.Repeat("x", 250)+"\n", 100))
	m.results.GotoBottom()
	m.results.ScrollRight(50)
	m.refreshResults()
	view := m.results.View()
	for _, want := range []string{"ERROR: batch failed", "Partial batch results", "do not imply that changes committed", "2 additional result sets were executed but not retained", "Display limited", "retained"} {
		if !strings.Contains(view, want) {
			t.Errorf("result view lacks %q: %q", want, view)
		}
	}
	if !m.results.AtTop() {
		t.Fatal("refresh did not reset vertical scrolling")
	}
	m.result = queryResult{}
	m.refreshResults()
	view = m.results.View()
	if !strings.Contains(view, "Execute SQL with Ctrl+R or F5") || strings.Contains(view, "batch failed") || strings.Contains(view, "retained") {
		t.Fatalf("empty results retained a stale error or table: %q", view)
	}
}
