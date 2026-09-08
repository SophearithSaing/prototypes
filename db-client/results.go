package main

import (
	"errors"
	"fmt"
	"strconv"
	"strings"

	"github.com/charmbracelet/x/ansi"
	"github.com/jackc/pgx/v5/pgconn"
)

func (m *model) refreshResults() {
	var content strings.Builder
	if m.result.err != nil {
		content.WriteString("ERROR: " + queryErrorText(m.result.err) + "\n\n")
		if len(m.result.sets) > 0 {
			content.WriteString("Partial batch results below do not imply that changes committed.\n\n")
		}
	}
	if m.result.omittedSets > 0 {
		fmt.Fprintf(&content, "%d additional result sets were executed but not retained.\n\n", m.result.omittedSets)
	}
	if len(m.result.sets) > 0 {
		set := m.result.sets[m.resultIndex]
		if set.truncated {
			content.WriteString("Display limited: some rows or cell text were not retained.\n\n")
		}
		content.WriteString(renderResult(set, m.expanded))
	} else if m.result.err == nil {
		content.WriteString("Execute SQL with Ctrl+R or F5.\n\nResults appear here. Tab switches focus; arrows scroll.\nSQL NULL is <NULL>; empty strings are blank.\nPress v in results to toggle the full-value view.")
	}
	m.results.SetContent(content.String())
	m.results.GotoTop()
	m.results.SetXOffset(0)
}

func queryErrorText(err error) string {
	text, _ := sanitizeResultText([]byte(err.Error()))
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		for _, field := range []struct{ label, value string }{
			{"Detail", pgErr.Detail}, {"Hint", pgErr.Hint},
		} {
			if field.value != "" {
				value, _ := sanitizeResultText([]byte(field.value))
				text += "\n" + field.label + ": " + value
			}
		}
		if pgErr.Position > 0 {
			text += fmt.Sprintf("\nSQL character position: %d", pgErr.Position)
		}
	}
	return text
}

func renderResult(set resultSet, expanded bool) string {
	var out strings.Builder
	if len(set.columns) == 0 {
		if set.tag != "" {
			out.WriteString(set.tag + "\n")
		}
		if set.rowCount == 0 {
			out.WriteString("No rows returned.")
			return out.String()
		}
	}
	if expanded {
		for i, row := range set.rows {
			fmt.Fprintf(&out, "Row %d\n", i+1)
			for j, value := range row {
				fmt.Fprintf(&out, "  %s: %s\n", set.columns[j], value)
			}
			out.WriteByte('\n')
		}
	} else {
		widths := make([]int, len(set.columns))
		for i, column := range set.columns {
			widths[i] = min(60, max(3, ansi.StringWidth(column)))
		}
		for _, row := range set.rows {
			for i, value := range row {
				widths[i] = min(60, max(widths[i], ansi.StringWidth(value)))
			}
		}
		numberWidth := max(1, len(strconv.Itoa(len(set.rows))))
		writeRow := func(number string, row []string) {
			fmt.Fprintf(&out, "%*s |", numberWidth, number)
			for i, value := range row {
				value = ansi.Truncate(value, widths[i], "...")
				out.WriteString(" " + value + strings.Repeat(" ", widths[i]-ansi.StringWidth(value)) + " |")
			}
			out.WriteByte('\n')
		}
		writeRow("#", set.columns)
		out.WriteString(strings.Repeat("-", numberWidth) + "-+")
		for _, width := range widths {
			out.WriteString(strings.Repeat("-", width+2) + "+")
		}
		out.WriteByte('\n')
		for i, row := range set.rows {
			writeRow(strconv.Itoa(i+1), row)
		}
	}
	if len(set.rows) == 0 {
		out.WriteString("No rows to display.\n")
	}
	return strings.TrimSuffix(out.String(), "\n")
}
