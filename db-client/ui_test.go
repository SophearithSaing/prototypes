package main

import (
	"context"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
	"unicode/utf8"

	"github.com/charmbracelet/bubbles/textinput"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/x/ansi"
)

const uiTestURL = "postgres://user@localhost:5432/app?sslmode=disable"

func newTestModel(t *testing.T, profiles ...profile) *model {
	t.Helper()
	isolateConfigEnvironment(t)
	m := newModel(t.Context(), &database{}, config{Connections: profiles}, options{
		configPath: filepath.Join(t.TempDir(), "connections.json"), maxRows: 1000, timeout: 30 * time.Second,
	})
	t.Cleanup(m.finishWork)
	return m
}

// Run only the save batch. Commands returned by Update(savedMsg) may connect
// and must not be executed by these tests.
func runSaveCommand(t *testing.T, cmd tea.Cmd) savedMsg {
	t.Helper()
	if cmd == nil {
		t.Fatal("missing save command")
	}
	batch, ok := cmd().(tea.BatchMsg)
	if !ok {
		t.Fatal("save did not return a command batch")
	}
	for _, work := range batch {
		if msg, ok := work().(savedMsg); ok {
			return msg
		}
	}
	t.Fatal("save batch did not produce savedMsg")
	return savedMsg{}
}

func TestModelPickerAndForm(t *testing.T) {
	m := newTestModel(t)
	if m.Init() != nil || m.screen != connectionsScreen || m.connected || m.editor.Focused() {
		t.Fatal("initial model must wait at the connection picker")
	}
	for _, key := range []tea.KeyType{tea.KeyUp, tea.KeyDown, tea.KeyEnter} {
		_, cmd := m.Update(tea.KeyMsg{Type: key})
		if cmd != nil || m.selected != 0 || m.busy != "" {
			t.Fatal("empty picker tried to select or connect a profile")
		}
	}
	m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("n")})
	if m.screen != newConnectionScreen || m.field != 0 || !m.form[0].Focused() {
		t.Fatal("n did not open and focus the new connection form")
	}
	for _, step := range []struct {
		key   tea.KeyType
		field int
	}{{tea.KeyShiftTab, 3}, {tea.KeyTab, 0}, {tea.KeyEnter, 1}, {tea.KeyTab, 2}} {
		m.Update(tea.KeyMsg{Type: step.key})
		for i, field := range m.form {
			if m.field != step.field || field.Focused() != (i == step.field) {
				t.Fatalf("%v: field %d focus=%v, selected=%d; want %d", step.key, i, field.Focused(), m.field, step.field)
			}
		}
	}
	const secret = "form-secret"
	m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune(secret)})
	view := ansi.Strip(m.View())
	if m.form[2].Value() != secret || m.form[2].EchoMode != textinput.EchoPassword || strings.Contains(view, secret) || !strings.Contains(view, strings.Repeat("*", len(secret))) {
		t.Fatalf("form password was not masked: %q", view)
	}
	m.Update(tea.KeyMsg{Type: tea.KeyEsc})
	if m.screen != connectionsScreen || m.failed {
		t.Fatal("Esc did not return to the picker")
	}
	for _, field := range m.form {
		if field.Value() != "" || field.Focused() {
			t.Fatal("abandoned form retained input or focus")
		}
	}
}

func TestModelPasswordPrompt(t *testing.T) {
	for _, password := range []string{"", "prompt-secret"} {
		t.Run(fmt.Sprintf("password=%t", password != ""), func(t *testing.T) {
			m := newTestModel(t, profile{Name: "Local", URL: uiTestURL})
			m.Update(tea.KeyMsg{Type: tea.KeyEnter})
			if m.screen != passwordScreen || !m.password.Focused() || m.busy != "" {
				t.Fatal("profile without a password did not prompt before connecting")
			}
			m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("discard-secret")})
			m.Update(tea.KeyMsg{Type: tea.KeyEsc})
			if m.screen != connectionsScreen || m.password.Value() != "" || m.password.Focused() {
				t.Fatal("Esc did not clear and blur the password prompt")
			}
			m.Update(tea.KeyMsg{Type: tea.KeyEnter})
			m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune(password)})
			view := ansi.Strip(m.View())
			if m.password.EchoMode != textinput.EchoPassword || (password != "" && (strings.Contains(view, password) || !strings.Contains(view, strings.Repeat("*", len(password))))) {
				t.Fatalf("prompt password was not masked: %q", view)
			}
			_, cmd := m.Update(tea.KeyMsg{Type: tea.KeyEnter})
			if cmd == nil || m.busy == "" || m.cancel == nil || m.connected || m.password.Value() != "" || m.password.Focused() || m.cfg.Connections[0].password != password {
				t.Fatal("Enter did not queue a connection and clear the prompt")
			}
			// Inject completion rather than executing the connection command.
			m.Update(connectedMsg{name: "Local"})
			if !m.connected || m.active != "Local" || m.transaction != 'I' || m.screen != queryScreen || !m.editor.Focused() || m.resultsFocused || m.busy != "" || m.cancel != nil {
				t.Fatal("successful connection did not open an idle SQL editor")
			}
		})
	}
}

func TestModelClipboardKeepsSecretsInOriginatingInput(t *testing.T) {
	for _, leave := range []bool{false, true} {
		m := newTestModel(t)
		m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("n")})
		m.Update(tea.KeyMsg{Type: tea.KeyTab})
		m.Update(tea.KeyMsg{Type: tea.KeyTab})
		_, cmd := m.Update(tea.KeyMsg{Type: tea.KeyCtrlV})
		if cmd == nil || m.form[2].KeyMap.Paste.Enabled() {
			t.Fatal("clipboard reads must be handled by the model, not the text widget")
		}
		version := m.inputVersion
		if leave {
			m.Update(tea.KeyMsg{Type: tea.KeyTab})
		}
		m.Update(clipboardMsg{text: "secret-paste", version: version})
		if strings.Contains(ansi.Strip(m.View()), "secret-paste") || m.form[3].Value() != "" {
			t.Fatal("delayed password paste leaked into a visible, persistent field")
		}
		if !leave && m.form[2].Value() != "secret-paste" {
			t.Fatal("paste into the original password input was not accepted")
		}
		if leave && m.form[2].Value() != "" {
			t.Fatal("paste should be discarded after focus changes")
		}
	}
}

func TestModelSQLInputIsNeverSilentlyChanged(t *testing.T) {
	m := newTestModel(t)
	m.Update(connectedMsg{name: "Local"})
	const original = "SELECT 'unchanged';"
	for _, input := range []string{"SELECT 'a\tb';", "SELECT 'a\r\nb';", "SELECT 'a\x1bb';", "SELECT '\ufffd';", strings.Repeat("\n", maxSQLLines)} {
		m.editor.SetValue(original)
		m.failed = false
		m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune(input), Paste: true})
		if !m.failed || m.editor.Value() != original {
			t.Fatalf("unsupported input was altered or partially inserted: %q", m.editor.Value())
		}
	}
	m.editor.SetValue("")
	const sql = "SELECT E'a\\tb';\nSELECT 'caf\u00e9';"
	m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune(sql), Paste: true})
	if m.editor.Value() != sql {
		t.Fatalf("supported SQL was changed: %q", m.editor.Value())
	}
	m.editor.SetValue(strings.Repeat("SELECT 1;\n", 100))
	before := m.editor.Value()
	m.Update(tea.KeyMsg{Type: tea.KeyEnter})
	if m.editor.Value() != before+"\n" {
		t.Fatal("Enter stopped inserting newlines after 99 lines")
	}
}

func TestModelConnectionPasswordSources(t *testing.T) {
	for _, source := range []string{"session", "environment", "missing environment"} {
		t.Run(source, func(t *testing.T) {
			m := newTestModel(t, profile{Name: "Local", URL: uiTestURL})
			switch source {
			case "session":
				m.cfg.Connections[0].password = "session-secret"
			case "environment":
				m.cfg.Connections[0].PasswordEnv = "DB_CLIENT_UI_TEST_PASSWORD"
				t.Setenv("DB_CLIENT_UI_TEST_PASSWORD", "env-secret")
			case "missing environment":
				m.cfg.Connections[0].PasswordEnv = "DB_CLIENT_UI_TEST_MISSING_PASSWORD"
				t.Setenv("DB_CLIENT_UI_TEST_MISSING_PASSWORD", "")
				if err := os.Unsetenv("DB_CLIENT_UI_TEST_MISSING_PASSWORD"); err != nil {
					t.Fatal(err)
				}
			}
			m.Update(tea.KeyMsg{Type: tea.KeyEnter})
			if source == "missing environment" {
				if m.screen != passwordScreen || !m.failed || !strings.Contains(m.status, "not set") || m.busy != "" {
					t.Fatalf("missing password environment did not offer a prompt: %q", m.status)
				}
				m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("override-secret")})
				m.Update(tea.KeyMsg{Type: tea.KeyEnter})
			}
			if m.screen != connectionsScreen || m.busy == "" || m.failed {
				t.Fatal("available password did not queue a connection")
			}
			for _, key := range []tea.KeyMsg{{Type: tea.KeyEnter}, {Type: tea.KeyEsc}, {Type: tea.KeyDown}, {Type: tea.KeyRunes, Runes: []rune("n")}} {
				_, cmd := m.Update(key)
				if cmd != nil || m.screen != connectionsScreen || m.selected != 0 {
					t.Fatalf("%s was not blocked while connecting", key.String())
				}
			}
			m.Update(connectedMsg{err: errors.New("denied\x1b[2J\n\u202e")})
			if m.busy != "" || m.cancel != nil || m.connected || !m.failed || m.screen != connectionsScreen || !strings.Contains(m.status, `connect: denied\x1b[2J\n\u202e`) {
				t.Fatalf("connection error was not safely returned to the picker: %q", m.status)
			}
			m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("p")})
			if m.screen != passwordScreen || !m.password.Focused() || m.password.Value() != "" {
				t.Fatal("p did not allow replacing a rejected password")
			}
			m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("corrected-secret")})
			m.Update(tea.KeyMsg{Type: tea.KeyEnter})
			if m.busy == "" || m.cfg.Connections[0].password != "corrected-secret" || m.password.Value() != "" {
				t.Fatal("corrected password did not override the previous credential source")
			}
		})
	}
}

func TestModelTransactionWarningSurvivesLongName(t *testing.T) {
	m := newTestModel(t)
	m.Update(connectedMsg{name: strings.Repeat("long name ", 20)})
	m.Update(tea.WindowSizeMsg{Width: 48, Height: 18})
	for _, state := range []struct {
		transaction byte
		warning     string
	}{{'T', "[IN TRANSACTION]"}, {'E', "[FAILED TRANSACTION: ROLLBACK needed]"}} {
		m.transaction = state.transaction
		header := strings.Split(ansi.Strip(m.View()), "\n")[0]
		if !strings.Contains(header, state.warning) || ansi.StringWidth(header) > 48 {
			t.Fatalf("transaction warning was hidden by the connection name: %q", header)
		}
	}
	m.connected = false
	if header := strings.Split(ansi.Strip(m.View()), "\n")[0]; !strings.Contains(header, "[DISCONNECTED]") {
		t.Fatalf("disconnected session shows stale transaction state: %q", header)
	}
}

func TestModelConnectionErrorShowsCause(t *testing.T) {
	m := newTestModel(t, profile{Name: "Local", URL: uiTestURL})
	m.Update(tea.WindowSizeMsg{Width: 48, Height: 18})
	m.Update(connectedMsg{err: errors.New("failed to connect to user=postgres database=app: server error: password authentication failed")})
	view := strings.Join(strings.Fields(ansi.Strip(m.View())), " ")
	if !strings.Contains(view, "password authentication failed") || !strings.Contains(view, "> Local") {
		t.Fatalf("connection error hid its cause or selected profile: %q", view)
	}
}

func TestModelSaveConnection(t *testing.T) {
	for _, password := range []string{"", "session-secret"} {
		t.Run(fmt.Sprintf("password=%t", password != ""), func(t *testing.T) {
			m := newTestModel(t, profile{Name: "Existing", URL: uiTestURL})
			m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("n")})
			m.form[0].SetValue("New")
			m.form[1].SetValue(uiTestURL)
			m.form[2].SetValue(password)
			key := tea.KeyCtrlS
			if password == "" {
				for range 3 {
					m.Update(tea.KeyMsg{Type: tea.KeyTab})
				}
				key = tea.KeyEnter
			}
			_, cmd := m.Update(tea.KeyMsg{Type: key})
			if m.busy == "" || len(m.cfg.Connections) != 1 {
				t.Fatal("save must wait for command completion before replacing profiles")
			}
			msg := runSaveCommand(t, cmd)
			if msg.err != nil || !msg.connect || msg.selected != 1 || len(msg.cfg.Connections) != 2 || msg.cfg.Connections[1].password != password {
				t.Fatalf("save result = %+v", msg)
			}
			_, cmd = m.Update(msg)
			if cmd == nil || len(m.cfg.Connections) != 2 || m.selected != 1 || m.cfg.Connections[1].Name != "New" || m.failed {
				t.Fatal("save completion did not select the new profile")
			}
			if password == "" {
				if m.screen != passwordScreen || m.busy != "" {
					t.Fatal("saved profile without credentials should prompt")
				}
			} else if m.screen != connectionsScreen || m.busy == "" || m.form[2].Value() != "" {
				t.Fatal("saved session password should connect without another prompt")
			}
		})
	}
}

func TestModelSaveErrors(t *testing.T) {
	for _, problem := range []string{"empty name", "invalid URL", "duplicate", "write failure"} {
		t.Run(problem, func(t *testing.T) {
			m := newTestModel(t, profile{Name: "Existing", URL: uiTestURL})
			m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("n")})
			m.form[0].SetValue("New")
			m.form[1].SetValue(uiTestURL)
			switch problem {
			case "empty name":
				m.form[0].SetValue("")
			case "invalid URL":
				m.form[1].SetValue("invalid")
			case "duplicate":
				m.form[0].SetValue("Existing")
			case "write failure":
				m.opts.configPath = t.TempDir()
			}
			_, cmd := m.Update(tea.KeyMsg{Type: tea.KeyCtrlS})
			if problem == "write failure" {
				msg := runSaveCommand(t, cmd)
				if msg.err == nil {
					t.Fatal("saving over a directory unexpectedly succeeded")
				}
				_, cmd = m.Update(msg)
			}
			if cmd != nil || !m.failed || m.status == "" || m.busy != "" || m.screen != newConnectionScreen || len(m.cfg.Connections) != 1 || m.form[1].Value() == "" {
				t.Fatalf("save error lost form state or continued connecting: %q", m.status)
			}
		})
	}
}

func TestModelDeleteConnection(t *testing.T) {
	m := newTestModel(t,
		profile{Name: "First", URL: uiTestURL}, profile{Name: "Second", URL: uiTestURL},
		profile{Name: "DATABASE_URL", URL: uiTestURL, transient: true},
	)
	for _, step := range []struct {
		key      tea.KeyType
		selected int
	}{{tea.KeyUp, 0}, {tea.KeyDown, 1}, {tea.KeyDown, 2}, {tea.KeyDown, 2}, {tea.KeyUp, 1}} {
		m.Update(tea.KeyMsg{Type: step.key})
		if m.selected != step.selected {
			t.Fatalf("picker selected %d; want %d", m.selected, step.selected)
		}
	}
	m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("d")})
	if !m.deleteConfirm || len(m.cfg.Connections) != 3 {
		t.Fatal("d must request confirmation without deleting")
	}
	m.Update(tea.KeyMsg{Type: tea.KeyEsc})
	if m.deleteConfirm || len(m.cfg.Connections) != 3 {
		t.Fatal("Esc did not cancel deletion")
	}
	m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("d")})
	_, cmd := m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("y")})
	msg := runSaveCommand(t, cmd)
	if msg.err != nil || msg.connect || len(m.cfg.Connections) != 3 {
		t.Fatalf("delete result = %+v", msg)
	}
	_, cmd = m.Update(msg)
	if cmd != nil || m.busy != "" || m.deleteConfirm || m.selected != 0 || len(m.cfg.Connections) != 2 || m.cfg.Connections[0].Name != "First" || !m.cfg.Connections[1].transient {
		t.Fatal("delete completion did not update the picker without connecting")
	}
	m.Update(tea.KeyMsg{Type: tea.KeyDown})
	_, cmd = m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("d")})
	if cmd != nil || m.deleteConfirm || !strings.Contains(m.status, "DATABASE_URL") || len(m.cfg.Connections) != 2 {
		t.Fatal("transient environment profile should not be deletable")
	}
}

func TestModelQueryGuardsAndCancellation(t *testing.T) {
	for _, runKey := range []tea.KeyType{tea.KeyCtrlR, tea.KeyF5} {
		t.Run(tea.KeyMsg{Type: runKey}.String(), func(t *testing.T) {
			m := newTestModel(t)
			m.screen = queryScreen
			if _, cmd := m.Update(tea.KeyMsg{Type: runKey}); cmd != nil || !m.failed || !strings.Contains(m.status, "not connected") {
				t.Fatal("disconnected query was not rejected")
			}
			m.Update(connectedMsg{name: "Local"})
			m.editor.SetValue(" \n\t ")
			if _, cmd := m.Update(tea.KeyMsg{Type: runKey}); cmd != nil || !m.failed || !strings.Contains(m.status, "write some SQL") {
				t.Fatal("blank SQL was not rejected")
			}
			const sql = "SELECT 1;\nSELECT 2;"
			m.editor.SetValue(sql)
			_, pending := m.Update(tea.KeyMsg{Type: runKey})
			if pending == nil || m.busy == "" || m.cancel == nil || m.failed {
				t.Fatal("run key did not start query work")
			}
			for _, key := range []tea.KeyMsg{{Type: tea.KeyCtrlR}, {Type: tea.KeyF5}, {Type: tea.KeyCtrlO}, {Type: tea.KeyEnter}, {Type: tea.KeyRunes, Runes: []rune("x")}} {
				_, cmd := m.Update(key)
				if cmd != nil || m.screen != queryScreen || m.editor.Value() != sql || m.busy == "" {
					t.Fatalf("%s changed the editor, switched connections, or queued duplicate work", key.String())
				}
			}
			_, cmd := m.Update(tea.KeyMsg{Type: tea.KeyCtrlC})
			if cmd != nil || m.busy == "" || !strings.Contains(m.status, "Cancel requested") {
				t.Fatal("busy Ctrl+C should request cancellation, not quit or finish early")
			}
			if _, cmd := m.Update(tea.KeyMsg{Type: runKey}); cmd != nil {
				t.Fatal("a canceled query must still block duplicate work until completion")
			}
			// The database is a zero value: this command cannot contact PostgreSQL.
			completed := false
			for _, work := range pending().(tea.BatchMsg) {
				if msg, ok := work().(queryDoneMsg); ok {
					completed = true
					if !errors.Is(msg.err, context.Canceled) {
						t.Fatalf("Ctrl+C did not cancel the query context: %v", msg.err)
					}
					m.Update(msg)
				}
			}
			if !completed || m.busy != "" || m.cancel != nil || m.connected || !m.failed || !strings.Contains(m.status, "Verify the outcome") {
				t.Fatalf("canceled completion was not handled: %q", m.status)
			}
		})
	}
}

func TestModelQueryCompletion(t *testing.T) {
	for _, tc := range []struct {
		name, status, header string
		transaction          byte
		err                  error
		disconnected         bool
	}{
		{name: "success", transaction: 'I', status: "3 result(s)."},
		{name: "transaction", transaction: 'T', status: "3 result(s).", header: "[IN TRANSACTION]"},
		{name: "failed transaction", transaction: 'E', err: errors.New("division by zero"), status: "division by zero", header: "[FAILED TRANSACTION: ROLLBACK needed]"},
		{name: "canceled", err: fmt.Errorf("query: %w", context.Canceled), status: "Query canceled. Verify the outcome", disconnected: true},
		{name: "timeout", err: fmt.Errorf("query: %w", context.DeadlineExceeded), status: "Query timed out. Verify the outcome", disconnected: true},
	} {
		t.Run(tc.name, func(t *testing.T) {
			m := newTestModel(t)
			m.Update(connectedMsg{name: "Local"})
			ctx, cancel := context.WithCancel(t.Context())
			m.cancel, m.busy, m.failed, m.resultIndex = cancel, "Executing SQL...", true, 1
			set := resultSet{columns: []string{"value"}, rows: [][]string{{"retained"}}, rowCount: 1, tag: "SELECT 1"}
			_, cmd := m.Update(queryDoneMsg{sets: []resultSet{set}, omittedSets: 2, duration: time.Millisecond, transaction: tc.transaction, err: tc.err, disconnected: tc.disconnected})
			if cmd != nil || ctx.Err() != context.Canceled || m.cancel != nil || m.busy != "" || !m.resultsFocused || m.editor.Focused() || m.resultIndex != 0 || len(m.result.sets) != 1 {
				t.Fatal("query completion did not finish work and focus the first result")
			}
			if m.transaction != tc.transaction || m.connected == tc.disconnected || m.failed != (tc.err != nil) || !strings.Contains(m.status, tc.status) {
				t.Fatalf("wrong completion state: connected=%v transaction=%q failed=%v status=%q", m.connected, m.transaction, m.failed, m.status)
			}
			if tc.disconnected && !strings.Contains(m.status, "Connection lost; Ctrl+O to reconnect") {
				t.Fatal("disconnected completion omitted reconnect guidance")
			}
			header := strings.Split(ansi.Strip(m.View()), "\n")[0]
			if tc.header != "" && !strings.Contains(header, tc.header) {
				t.Fatalf("transaction state missing from header: %q", header)
			}
			if tc.transaction == 'I' && strings.Contains(header, "TRANSACTION") {
				t.Fatalf("idle session has a stale transaction warning: %q", header)
			}
		})
	}
}

func TestModelEditorAndResultsRouting(t *testing.T) {
	m := newTestModel(t)
	m.Update(connectedMsg{name: "Local"})
	m.Update(tea.WindowSizeMsg{Width: 48, Height: 18})
	set := resultSet{columns: []string{"value"}, tag: "SELECT 40", rowCount: 40}
	for i := range 40 {
		set.rows = append(set.rows, []string{fmt.Sprintf("%02d-%s-end", i, strings.Repeat("wide-", 30))})
	}
	m.Update(queryDoneMsg{sets: []resultSet{set, set}, transaction: 'T'})
	m.Update(tea.KeyMsg{Type: tea.KeyTab})
	m.editor.SetValue("")
	for _, text := range []string{"v", "[", "]"} {
		m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune(text)})
	}
	m.Update(tea.KeyMsg{Type: tea.KeyEnter})
	m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("SELECT 1;")})
	const sql = "v[]\nSELECT 1;"
	if m.editor.Value() != sql || m.expanded || m.resultIndex != 0 || m.busy != "" {
		t.Fatalf("editor keys were intercepted as result navigation: %q", m.editor.Value())
	}
	m.Update(tea.KeyMsg{Type: tea.KeyShiftTab})
	if !m.resultsFocused || m.editor.Focused() {
		t.Fatal("Tab did not transfer focus to results")
	}
	for _, step := range []struct {
		key tea.KeyType
		y   int
	}{{tea.KeyDown, 1}, {tea.KeyUp, 0}, {tea.KeyPgDown, m.results.Height}, {tea.KeyPgUp, 0}} {
		m.Update(tea.KeyMsg{Type: step.key})
		if m.results.YOffset != step.y || m.editor.Value() != sql {
			t.Fatalf("%v: result offset=%d, want %d; editor=%q", step.key, m.results.YOffset, step.y, m.editor.Value())
		}
	}
	for _, expanded := range []bool{false, true} {
		if expanded {
			m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("v")})
		}
		left := m.results.View()
		m.Update(tea.KeyMsg{Type: tea.KeyRight})
		if m.expanded != expanded || m.results.View() == left || m.results.HorizontalScrollPercent() <= 0 {
			t.Fatalf("horizontal scroll did not reveal wide values (expanded=%v)", expanded)
		}
		m.Update(tea.KeyMsg{Type: tea.KeyLeft})
		if m.results.View() != left {
			t.Fatal("left arrow did not restore the result view")
		}
	}
	for _, step := range []struct {
		key   string
		index int
	}{{"]", 1}, {"]", 0}, {"[", 1}, {"[", 0}} {
		m.Update(tea.KeyMsg{Type: tea.KeyPgDown})
		m.Update(tea.KeyMsg{Type: tea.KeyRight})
		m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune(step.key)})
		if m.resultIndex != step.index || m.results.YOffset != 0 || m.results.HorizontalScrollPercent() != 0 || m.editor.Value() != sql {
			t.Fatalf("%s did not wrap sets and reset scrolling: index=%d", step.key, m.resultIndex)
		}
	}
	m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("v")})
	if m.expanded || !strings.Contains(m.results.View(), "# |") {
		t.Fatal("v did not return from full values to the table")
	}
	m.Update(tea.KeyMsg{Type: tea.KeyCtrlO})
	if m.screen != connectionsScreen || !m.connected || m.transaction != 'T' {
		t.Fatal("opening the picker should not disconnect the current session")
	}
	m.Update(tea.KeyMsg{Type: tea.KeyEsc})
	if m.screen != queryScreen || !m.editor.Focused() || m.resultsFocused || m.editor.Value() != sql || len(m.result.sets) != 2 {
		t.Fatal("Esc did not return to the existing SQL session")
	}
	m.Update(queryDoneMsg{transaction: 'I'})
	for _, key := range []string{"[", "]"} {
		m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune(key)})
		if m.resultIndex != 0 || m.editor.Value() != sql {
			t.Fatal("empty result-set navigation changed state")
		}
	}
}

func TestModelQuit(t *testing.T) {
	for _, key := range []tea.KeyType{tea.KeyCtrlC, tea.KeyCtrlQ} {
		for _, screen := range []screen{connectionsScreen, newConnectionScreen, passwordScreen, queryScreen} {
			m := newTestModel(t)
			m.screen = screen
			ctx, cancel := context.WithCancel(t.Context())
			defer cancel()
			if key == tea.KeyCtrlQ {
				m.busy, m.cancel = "Working...", cancel
			}
			_, cmd := m.Update(tea.KeyMsg{Type: key})
			if cmd == nil {
				t.Fatalf("%v on screen %d did not quit", key, screen)
			}
			if _, ok := cmd().(tea.QuitMsg); !ok || (key == tea.KeyCtrlQ && ctx.Err() != context.Canceled) {
				t.Fatalf("%v on screen %d did not quit and cancel active work", key, screen)
			}
		}
	}
}

func TestModelResizedViewsFit(t *testing.T) {
	for _, state := range []struct {
		name     string
		screen   screen
		expanded bool
	}{{"picker", connectionsScreen, false}, {"form", newConnectionScreen, false}, {"password", passwordScreen, false}, {"query", queryScreen, false}, {"full values", queryScreen, true}} {
		t.Run(state.name, func(t *testing.T) {
			m := newTestModel(t)
			for i := range 30 {
				m.cfg.Connections = append(m.cfg.Connections, profile{Name: fmt.Sprintf("%d-%s", i, strings.Repeat("\u754c", 70)), URL: uiTestURL + "&application_name=" + strings.Repeat("x", 200)})
			}
			m.selected = len(m.cfg.Connections) - 1
			m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune("n")})
			for i := range m.form {
				m.form[i].SetValue(strings.Repeat("\u754c", 100))
			}
			m.password.SetValue("session-secret")
			m.editor.SetValue(strings.Repeat("SELECT '"+strings.Repeat("\u754c", 80)+"';\n", 25))
			set := resultSet{columns: []string{strings.Repeat("\u754c", 80), "empty", "nullable"}, tag: "SELECT 30", rowCount: 30, truncated: true}
			for range 30 {
				set.rows = append(set.rows, []string{strings.Repeat("\u754c", 100), "", resultNull})
			}
			m.result = queryResult{sets: []resultSet{set}}
			m.screen, m.expanded, m.resultsFocused = state.screen, state.expanded, state.expanded
			m.active, m.transaction = strings.Repeat("\u754c", 80), 'E'
			m.status, m.failed = strings.Repeat("long error ", 30), true
			m.refreshResults()
			for _, size := range []tea.WindowSizeMsg{{Width: 120, Height: 40}, {Width: 80, Height: 24}, {Width: 64, Height: 20}, {Width: 48, Height: 18}, {Width: 47, Height: 18}, {Width: 48, Height: 17}, {Width: 1, Height: 1}, {}, {Width: 80, Height: 24}} {
				m.results.GotoBottom()
				m.results.ScrollRight(1000)
				m.Update(size)
				view := ansi.Strip(m.View())
				lines := strings.Split(view, "\n")
				if !utf8.ValidString(view) || len(lines) > max(1, size.Height) {
					t.Errorf("%dx%d: view has %d lines, valid UTF-8=%v", size.Width, size.Height, len(lines), utf8.ValidString(view))
				}
				for i, line := range lines {
					if width := ansi.StringWidth(line); width > max(1, size.Width) {
						t.Errorf("%dx%d: line %d is %d cells wide: %q", size.Width, size.Height, i+1, width, line)
					}
				}
				if size.Width >= 48 && size.Height >= 18 && state.screen == newConnectionScreen {
					for _, label := range []string{"Name", "PostgreSQL URL", "Password (session only)", "Password environment", "Ctrl+S"} {
						if !strings.Contains(view, label) {
							t.Errorf("%dx%d: form hides %q: %q", size.Width, size.Height, label, view)
						}
					}
				}
			}
		})
	}
}

func TestRunArguments(t *testing.T) {
	t.Setenv("DATABASE_URL", "invalid")
	output, err := os.CreateTemp(t.TempDir(), "flags")
	if err != nil {
		t.Fatal(err)
	}
	stderr := os.Stderr
	os.Stderr = output
	defer func() {
		os.Stderr = stderr
		output.Close()
	}()
	// A directory is deliberately not a valid config file. Help must return
	// before reading it, parsing DATABASE_URL, or starting Bubble Tea.
	if err := run([]string{"--config", t.TempDir(), "--help"}); err != nil {
		t.Fatal(err)
	}
	data, err := os.ReadFile(output.Name())
	if err != nil {
		t.Fatal(err)
	}
	for _, want := range []string{"Usage of db-client:", "-config", "-max-rows", "1000", "-timeout", "30s"} {
		if !strings.Contains(string(data), want) {
			t.Errorf("help lacks %q: %s", want, data)
		}
	}
	for _, tc := range []struct {
		args []string
		want string
	}{
		{[]string{"query.sql"}, "unexpected arguments"},
		{[]string{"--", "--help"}, "unexpected arguments"},
		{[]string{"--unknown"}, "flag provided but not defined"},
		{[]string{"--max-rows", "0"}, "greater than zero"},
		{[]string{"--max-rows", "-1"}, "greater than zero"},
		{[]string{"--max-rows", "many"}, "invalid value"},
		{[]string{"--timeout", "0s"}, "greater than zero"},
		{[]string{"--timeout", "-1s"}, "greater than zero"},
		{[]string{"--timeout", "soon"}, "invalid value"},
		{[]string{"--timeout"}, "flag needs an argument"},
		{[]string{"--config"}, "flag needs an argument"},
	} {
		t.Run(strings.Join(tc.args, " "), func(t *testing.T) {
			args := append([]string{"--config", t.TempDir()}, tc.args...)
			if err := run(args); err == nil || !strings.Contains(err.Error(), tc.want) {
				t.Fatalf("run(%q) = %v; want %q", tc.args, err, tc.want)
			}
		})
	}
}
