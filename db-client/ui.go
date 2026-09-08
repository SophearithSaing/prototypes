package main

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"
	"unicode"

	"github.com/atotto/clipboard"
	"github.com/charmbracelet/bubbles/spinner"
	"github.com/charmbracelet/bubbles/textarea"
	"github.com/charmbracelet/bubbles/textinput"
	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/x/ansi"
)

type screen int

const maxSQLLines = 10000

const (
	connectionsScreen screen = iota
	newConnectionScreen
	passwordScreen
	queryScreen
)

var (
	accent = lipgloss.NewStyle().Foreground(lipgloss.Color("80"))
	muted  = lipgloss.NewStyle().Foreground(lipgloss.Color("245"))
	danger = lipgloss.NewStyle().Foreground(lipgloss.Color("203"))
)

type connectedMsg struct {
	name string
	err  error
}

type queryDoneMsg queryResult

type clipboardMsg struct {
	text    string
	err     error
	version uint64
}

type savedMsg struct {
	cfg      config
	selected int
	connect  bool
	err      error
}

type model struct {
	ctx            context.Context
	db             *database
	cfg            config
	opts           options
	width, height  int
	screen         screen
	selected       int
	active         string
	connected      bool
	transaction    byte
	editor         textarea.Model
	results        viewport.Model
	resultsFocused bool
	result         queryResult
	resultIndex    int
	expanded       bool
	form           [4]textinput.Model
	field          int
	password       textinput.Model
	spinner        spinner.Model
	busy           string
	cancel         context.CancelFunc
	status         string
	failed         bool
	deleteConfirm  bool
	inputVersion   uint64
}

func newModel(ctx context.Context, db *database, cfg config, opts options) *model {
	editor := textarea.New()
	editor.Prompt = ""
	editor.Placeholder = "Write SQL here. Ctrl+R or F5 executes the whole buffer."
	editor.SetValue("SELECT current_database(), current_user;")
	editor.CharLimit = 0
	editor.MaxWidth = 0
	editor.MaxHeight = maxSQLLines
	editor.KeyMap.Paste.SetEnabled(false)
	editor.FocusedStyle.CursorLine = lipgloss.NewStyle()
	editor.FocusedStyle.LineNumber = muted
	editor.FocusedStyle.CursorLineNumber = accent
	editor.BlurredStyle.LineNumber = muted
	editor.Blur()
	password := textinput.New()
	password.Prompt = "> "
	password.EchoMode = textinput.EchoPassword
	password.EchoCharacter = '*'
	password.Placeholder = "Leave blank for .pgpass or passwordless authentication"
	password.KeyMap.Paste.SetEnabled(false)
	spin := spinner.New(spinner.WithSpinner(spinner.Line), spinner.WithStyle(accent))
	m := &model{
		ctx: ctx, db: db, cfg: cfg, opts: opts, editor: editor, password: password,
		results: viewport.New(0, 0), spinner: spin,
		status: "Select a connection, or press n to add one.",
	}
	m.results.SetHorizontalStep(8)
	m.resize(80, 24)
	m.refreshResults()
	return m
}

func (m *model) Init() tea.Cmd { return nil }

func (m *model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case clipboardMsg:
		// Drop clipboard reads if input or focus changed while they were pending.
		if msg.version != m.inputVersion || m.busy != "" {
			return m, nil
		}
		if msg.err != nil {
			m.setError(fmt.Errorf("read clipboard: %w", msg.err))
			return m, nil
		}
		return m.Update(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune(msg.text), Paste: true})
	case tea.WindowSizeMsg:
		m.resize(msg.Width, msg.Height)
		return m, nil
	case spinner.TickMsg:
		if m.busy != "" {
			var cmd tea.Cmd
			m.spinner, cmd = m.spinner.Update(msg)
			return m, cmd
		}
		return m, nil
	case connectedMsg:
		m.finishWork()
		if msg.err != nil {
			m.screen = connectionsScreen
			m.setError(fmt.Errorf("connect: %w", msg.err))
			return m, nil
		}
		m.connected, m.active, m.transaction = true, msg.name, 'I'
		m.screen, m.resultsFocused = queryScreen, false
		m.status = "Connected. SQL runs in this session; changes are not automatically rolled back."
		return m, m.editor.Focus()
	case queryDoneMsg:
		m.finishWork()
		m.result, m.resultIndex = queryResult(msg), 0
		m.transaction, m.connected = msg.transaction, !msg.disconnected
		m.resultsFocused = true
		m.editor.Blur()
		m.status = fmt.Sprintf("Finished in %s. %d result(s).", msg.duration.Round(time.Millisecond), len(msg.sets)+msg.omittedSets)
		if msg.err != nil {
			m.setError(msg.err)
			if errors.Is(msg.err, context.Canceled) {
				m.status = "Query canceled. Verify the outcome before retrying writes."
			} else if errors.Is(msg.err, context.DeadlineExceeded) {
				m.status = "Query timed out. Verify the outcome before retrying writes."
			}
		}
		if msg.disconnected {
			m.status = "Connection lost; Ctrl+O to reconnect. " + m.status
		}
		m.refreshResults()
		return m, nil
	case savedMsg:
		m.finishWork()
		if msg.err != nil {
			m.setError(msg.err)
			return m, nil
		}
		m.cfg, m.selected = msg.cfg, msg.selected
		m.screen, m.deleteConfirm = connectionsScreen, false
		m.status = "Connection profiles saved. Passwords were not written to disk."
		if msg.connect {
			return m, m.startConnection("", true)
		}
		return m, nil
	case tea.KeyMsg:
		m.inputVersion++
		switch msg.String() {
		case "ctrl+q":
			if m.cancel != nil {
				m.cancel()
			}
			return m, tea.Quit
		case "ctrl+c":
			if m.busy == "" {
				return m, tea.Quit
			}
			if m.cancel != nil {
				m.cancel()
				m.status = "Cancel requested; waiting for PostgreSQL..."
			}
			return m, nil
		}
		if m.busy != "" && m.screen != queryScreen {
			return m, nil
		}
		editingSQL := m.screen == queryScreen && !m.resultsFocused
		editingInput := m.screen == newConnectionScreen || m.screen == passwordScreen
		if msg.String() == "ctrl+v" {
			if m.busy == "" && (editingSQL || editingInput) {
				version := m.inputVersion
				return m, func() tea.Msg {
					text, err := clipboard.ReadAll()
					return clipboardMsg{text: text, err: err, version: version}
				}
			}
			return m, nil
		}
		if m.busy == "" && (editingSQL || editingInput) && msg.Type == tea.KeyRunes {
			for _, r := range msg.Runes {
				if r == unicode.ReplacementChar || (unicode.IsControl(r) && !(editingSQL && r == '\n')) {
					m.setError(fmt.Errorf("input rejected: U+%04X would be altered by the editor; use spaces, LF newlines or SQL escapes", r))
					return m, nil
				}
			}
		}
		if m.busy == "" && editingSQL {
			newlines := strings.Count(string(msg.Runes), "\n")
			if msg.Type == tea.KeyEnter {
				newlines = 1
			}
			if m.editor.LineCount()+newlines > maxSQLLines {
				m.setError(fmt.Errorf("input rejected: SQL editor supports up to %d lines", maxSQLLines))
				return m, nil
			}
		}
		switch m.screen {
		case connectionsScreen:
			return m, m.updateConnections(msg)
		case newConnectionScreen:
			switch msg.String() {
			case "esc":
				m.form = [4]textinput.Model{}
				m.screen, m.status, m.failed = connectionsScreen, "", false
				return m, nil
			case "ctrl+s":
				return m, m.saveNewConnection()
			case "tab", "shift+tab", "enter":
				if msg.String() == "enter" && m.field == len(m.form)-1 {
					return m, m.saveNewConnection()
				}
				m.form[m.field].Blur()
				delta := 1
				if msg.String() == "shift+tab" {
					delta = -1
				}
				m.field = (m.field + delta + len(m.form)) % len(m.form)
				return m, m.form[m.field].Focus()
			}
		case passwordScreen:
			switch msg.String() {
			case "esc":
				m.password.Reset()
				m.password.Blur()
				m.screen, m.status, m.failed = connectionsScreen, "", false
				return m, nil
			case "enter":
				return m, m.startConnection(m.password.Value(), false)
			}
		case queryScreen:
			switch msg.String() {
			case "ctrl+r", "f5":
				return m, m.executeSQL()
			case "ctrl+o":
				if m.busy == "" {
					m.screen, m.deleteConfirm = connectionsScreen, false
					m.editor.Blur()
					m.status = "Switching connections closes the current session. Esc returns without switching."
					m.failed = false
				}
				return m, nil
			case "tab", "shift+tab":
				m.resultsFocused = !m.resultsFocused
				if m.resultsFocused {
					m.editor.Blur()
					return m, nil
				}
				return m, m.editor.Focus()
			case "[", "]":
				if m.resultsFocused && len(m.result.sets) > 0 {
					delta := 1
					if msg.String() == "[" {
						delta = -1
					}
					m.resultIndex = (m.resultIndex + delta + len(m.result.sets)) % len(m.result.sets)
					m.refreshResults()
					return m, nil
				}
			case "v":
				if m.resultsFocused {
					m.expanded = !m.expanded
					m.refreshResults()
					return m, nil
				}
			}
		}
	}
	var cmd tea.Cmd
	switch m.screen {
	case newConnectionScreen:
		m.form[m.field], cmd = m.form[m.field].Update(msg)
	case passwordScreen:
		m.password, cmd = m.password.Update(msg)
	case queryScreen:
		if m.resultsFocused {
			m.results, cmd = m.results.Update(msg)
		} else if m.busy == "" {
			m.editor, cmd = m.editor.Update(msg)
		}
	}
	return m, cmd
}

func (m *model) updateConnections(msg tea.KeyMsg) tea.Cmd {
	if m.deleteConfirm {
		switch msg.String() {
		case "y", "enter":
			profiles := append([]profile(nil), m.cfg.Connections[:m.selected]...)
			profiles = append(profiles, m.cfg.Connections[m.selected+1:]...)
			return m.persist(config{Connections: profiles}, max(0, m.selected-1), false)
		case "esc", "n":
			m.deleteConfirm, m.status = false, ""
		}
		return nil
	}
	switch msg.String() {
	case "q":
		return tea.Quit
	case "up", "k":
		m.selected = max(0, m.selected-1)
	case "down", "j":
		m.selected = max(0, min(len(m.cfg.Connections)-1, m.selected+1))
	case "enter":
		return m.startConnection("", true)
	case "p":
		if len(m.cfg.Connections) > 0 {
			m.screen, m.status, m.failed = passwordScreen, "Enter a password to override the saved profile's credential source.", false
			m.password.Reset()
			return m.password.Focus()
		}
	case "esc":
		if m.connected {
			m.screen, m.resultsFocused = queryScreen, false
			m.status, m.failed = "", false
			return m.editor.Focus()
		}
	case "n":
		m.screen, m.field, m.status, m.failed = newConnectionScreen, 0, "", false
		for i := range m.form {
			m.form[i] = textinput.New()
			m.form[i].Prompt = "> "
			m.form[i].Width = max(1, m.width-8)
			m.form[i].KeyMap.Paste.SetEnabled(false)
		}
		m.form[0].Placeholder = "local"
		m.form[0].CharLimit = 80
		m.form[1].SetValue("postgres://postgres@localhost:5432/postgres?sslmode=disable")
		m.form[2].EchoMode, m.form[2].EchoCharacter = textinput.EchoPassword, '*'
		m.form[2].Placeholder = "optional, kept only for this session"
		m.form[3].Placeholder = "optional, e.g. LOCAL_PG_PASSWORD"
		return m.form[0].Focus()
	case "d":
		if len(m.cfg.Connections) > 0 {
			if m.cfg.Connections[m.selected].transient {
				m.status = "This profile comes from DATABASE_URL. Unset it to remove the profile."
			} else {
				m.deleteConfirm = true
				m.status = "Delete selected profile? y confirms / Esc cancels."
			}
		}
	}
	return nil
}

func (m *model) saveNewConnection() tea.Cmd {
	p, err := normalizeProfile(profile{
		Name: m.form[0].Value(), URL: m.form[1].Value(), PasswordEnv: strings.TrimSpace(m.form[3].Value()),
	})
	if err != nil {
		m.setError(err)
		return nil
	}
	if password := m.form[2].Value(); password != "" {
		p.password = password
	}
	for _, existing := range m.cfg.Connections {
		if existing.Name == p.Name {
			m.setError(errors.New("a connection with this name already exists"))
			return nil
		}
	}
	profiles := append(append([]profile(nil), m.cfg.Connections...), p)
	return m.persist(config{Connections: profiles}, len(profiles)-1, true)
}

func (m *model) persist(cfg config, selected int, connect bool) tea.Cmd {
	m.busy, m.status, m.failed = "Saving profiles...", "", false
	path := m.opts.configPath
	return tea.Batch(m.spinner.Tick, func() tea.Msg {
		return savedMsg{cfg: cfg, selected: selected, connect: connect, err: saveConfig(path, cfg)}
	})
}

func (m *model) startConnection(password string, prompt bool) tea.Cmd {
	if len(m.cfg.Connections) == 0 {
		m.status = "Press n to create your first connection."
		return nil
	}
	p := m.cfg.Connections[m.selected]
	cfg, err := profileConnConfig(p, password)
	if prompt && (err != nil || cfg.Password == "") {
		m.screen, m.status, m.failed = passwordScreen, "Password is never saved to disk.", false
		m.password.Reset()
		if err != nil {
			m.setError(err)
		}
		return m.password.Focus()
	}
	if err != nil {
		m.setError(err)
		return nil
	}
	if password != "" {
		m.cfg.Connections[m.selected].password = password
	}
	m.password.Reset()
	m.password.Blur()
	m.form = [4]textinput.Model{}
	m.screen = connectionsScreen
	m.connected, m.active, m.transaction = false, "", 0
	m.result, m.resultIndex = queryResult{}, 0
	m.refreshResults()
	m.busy, m.status, m.failed = "Connecting...", "", false
	ctx, cancel := context.WithTimeout(m.ctx, 10*time.Second)
	m.cancel = cancel
	db := m.db
	return tea.Batch(m.spinner.Tick, func() tea.Msg {
		defer cancel()
		return connectedMsg{name: p.Name, err: db.connect(ctx, cfg)}
	})
}

func (m *model) executeSQL() tea.Cmd {
	if m.busy != "" {
		return nil
	}
	if !m.connected {
		m.setError(errors.New("not connected; Ctrl+O to select a connection"))
		return nil
	}
	sql := m.editor.Value()
	if strings.TrimSpace(sql) == "" {
		m.setError(errors.New("write some SQL before executing"))
		return nil
	}
	m.busy, m.status, m.failed = "Executing SQL...", "", false
	ctx, cancel := context.WithTimeout(m.ctx, m.opts.timeout)
	m.cancel = cancel
	db, maxRows := m.db, m.opts.maxRows
	return tea.Batch(m.spinner.Tick, func() tea.Msg {
		defer cancel()
		return queryDoneMsg(db.execute(ctx, sql, maxRows))
	})
}

func (m *model) finishWork() {
	if m.cancel != nil {
		m.cancel()
		m.cancel = nil
	}
	m.busy, m.failed = "", false
}

func (m *model) setError(err error) {
	m.status, _ = sanitizeResultText([]byte(err.Error()))
	m.failed = true
}

func (m *model) resize(width, height int) {
	m.width, m.height = max(1, width), max(1, height)
	editorHeight := min(10, max(3, (height-9)/3))
	m.editor.SetWidth(max(1, width-2))
	m.editor.SetHeight(editorHeight)
	m.results.Width, m.results.Height = max(1, width-2), max(1, height-9-editorHeight)
	m.results.SetYOffset(m.results.YOffset)
	m.results.ScrollLeft(0)
	resizeInput := func(input *textinput.Model) {
		position := input.Position()
		input.Width = max(1, width-8)
		// Width alone does not invalidate textinput's cached horizontal window.
		input.CursorEnd()
		input.SetCursor(position)
	}
	resizeInput(&m.password)
	for i := range m.form {
		resizeInput(&m.form[i])
	}
}

func (m *model) View() string {
	if m.width < 48 || m.height < 18 {
		return ansi.Truncate("Resize to at least 48 x 18. Ctrl+Q quits.", m.width, "")
	}
	header := accent.Bold(true).Render(" db-client ") + muted.Render("/ POSTGRESQL")
	if m.active != "" {
		name, _ := sanitizeResultText([]byte(m.active))
		header += " / " + name
	}
	badge := ""
	switch m.transaction {
	case 'T':
		badge = accent.Render(" [IN TRANSACTION]")
	case 'E':
		badge = danger.Render(" [FAILED TRANSACTION: ROLLBACK needed]")
	}
	if !m.connected && m.active != "" {
		badge = danger.Render(" [DISCONNECTED]")
	}
	header = ansi.Truncate(header, m.width-ansi.StringWidth(badge), "...") + badge
	var body, help string
	if m.screen == queryScreen {
		pane := lipgloss.NewStyle().Border(lipgloss.NormalBorder()).BorderForeground(lipgloss.Color("240"))
		editorPane, resultPane := pane, pane
		if m.resultsFocused {
			resultPane = pane.BorderForeground(lipgloss.Color("80"))
		} else {
			editorPane = pane.BorderForeground(lipgloss.Color("80"))
		}
		label := " Results"
		if len(m.result.sets) > 0 {
			set := m.result.sets[m.resultIndex]
			label += fmt.Sprintf(" %d/%d | %s | %d/%d rows shown", m.resultIndex+1, len(m.result.sets), set.tag, len(set.rows), set.rowCount)
			if set.truncated {
				label += " [LIMITED]"
			}
		}
		body = " SQL / whole buffer\n" + editorPane.Render(m.editor.View()) + "\n" +
			ansi.Truncate(label, m.width, "...") + "\n" + resultPane.Render(m.results.View())
		help = "F5/Ctrl+R run | Tab results | Ctrl+O conn | Ctrl+Q quit"
		if m.resultsFocused {
			help = "Arrows scroll | [ ] sets | v values | Tab SQL | Ctrl+O conn | Ctrl+Q quit"
		}
		if m.width < 75 {
			help = "F5 run | Tab results | Ctrl+O conn | Ctrl+Q quit"
			if m.resultsFocused {
				help = "Tab SQL | [ ] sets | v values | Ctrl+Q quit"
			}
		}
	} else {
		body, help = m.connectionView()
		body = lipgloss.NewStyle().Width(m.width).Height(m.height - 3).MaxHeight(m.height - 3).Render(body)
	}
	status, style := m.status, muted
	if m.failed {
		style = danger
	}
	if m.busy != "" {
		if status == "" {
			status = m.busy + " Ctrl+C cancels."
		}
		status, style = m.spinner.View()+" "+status, accent
	}
	return ansi.Truncate(header, m.width, "...") + "\n" + body + "\n" +
		style.Render(ansi.Truncate(status, m.width, "...")) + "\n" + muted.Render(ansi.Truncate(help, m.width, "..."))
}

func (m *model) connectionView() (string, string) {
	line := func(text string) string {
		safe, _ := sanitizeResultText([]byte(text))
		return "  " + ansi.Truncate(safe, m.width-4, "...")
	}
	switch m.screen {
	case newConnectionScreen:
		lines := []string{"", line("New Connection"), ""}
		for i, label := range []string{"Name", "PostgreSQL URL (put the password in the next field)", "Password (session only)", "Password environment variable (optional)"} {
			lines = append(lines, line(label), "  "+m.form[i].View())
		}
		lines = append(lines, "", line("Use sslmode=verify-full for remote servers."))
		return strings.Join(lines, "\n"), "Tab next | Ctrl+S save + connect | Esc back"
	case passwordScreen:
		p := m.cfg.Connections[m.selected]
		return strings.Join([]string{
			"", line("Connect to " + p.Name), "", line(p.URL), "", line("Password (session only)"),
			"  " + m.password.View(), "", line("Blank uses pgx defaults, including .pgpass."),
		}, "\n"), "Enter connect | Esc back | Ctrl+Q quit"
	default:
		lines := []string{"", line(fmt.Sprintf("Connections / %d", len(m.cfg.Connections))), ""}
		if m.failed {
			details := strings.Split(ansi.Wrap(m.status, m.width-4, ""), "\n")
			for _, detail := range details[:min(6, len(details))] {
				lines = append(lines, "  "+danger.Render(detail))
			}
			lines = append(lines, "")
		}
		if len(m.cfg.Connections) == 0 {
			lines = append(lines, line("No connections yet."), line("Press n to add one, or set DATABASE_URL."))
		}
		slots := max(1, (m.height-4-len(lines))/3)
		start := max(0, m.selected-slots+1)
		for i := start; i < min(len(m.cfg.Connections), start+slots); i++ {
			p := m.cfg.Connections[i]
			name := "  " + p.Name
			if p.transient {
				name += " [environment]"
			}
			if i == m.selected {
				name = accent.Bold(true).Render(line("> " + strings.TrimPrefix(name, "  ")))
			} else {
				name = line(name)
			}
			lines = append(lines, name, muted.Render(line("  "+p.URL)), "")
		}
		lines = append(lines, muted.Render(line("Config: "+m.opts.configPath)))
		return strings.Join(lines, "\n"), "Enter connect | p pass | n new | d del | q quit"
	}
}
