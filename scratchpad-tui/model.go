package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"
	"unicode/utf8"

	"charm.land/bubbles/v2/textarea"
	"charm.land/bubbles/v2/textinput"
	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"
)

const autosaveDelay = 350 * time.Millisecond

var (
	colorInk     = lipgloss.Color("#E9E5D6")
	colorMuted   = lipgloss.Color("#77756F")
	colorFaint   = lipgloss.Color("#34332F")
	colorPaper   = lipgloss.Color("#171816")
	colorRaised  = lipgloss.Color("#232420")
	colorAccent  = lipgloss.Color("#6EA8FE")
	colorBlue    = lipgloss.Color("#9CCAFF")
	colorDanger  = lipgloss.Color("#FF7A72")
	styleLogo    = lipgloss.NewStyle().Bold(true).Foreground(colorPaper).Background(colorAccent).Padding(0, 1)
	styleTab     = lipgloss.NewStyle().Foreground(colorMuted).Padding(0, 1)
	styleTabOn   = lipgloss.NewStyle().Bold(true).Foreground(colorInk).Background(colorRaised).Padding(0, 1)
	styleMuted   = lipgloss.NewStyle().Foreground(colorMuted)
	styleAccent  = lipgloss.NewStyle().Foreground(colorAccent)
	styleDanger  = lipgloss.NewStyle().Foreground(colorDanger)
	styleOverlay = lipgloss.NewStyle().Border(lipgloss.RoundedBorder()).BorderForeground(colorFaint).Background(colorRaised).Padding(1, 2)
	styleEditor  = lipgloss.NewStyle().Border(lipgloss.NormalBorder()).BorderForeground(colorFaint).Margin(0, 1).Padding(0, 1)
)

type tab struct {
	id       int
	fallback string
	editor   textarea.Model
}

type inputMode int

const (
	modeEdit inputMode = iota
	modeExport
)

type model struct {
	store       sessionStore
	tabs        []tab
	active      int
	nextID      int
	width       int
	height      int
	mode        inputMode
	pathInput   textinput.Model
	showHelp    bool
	status      string
	statusError bool
	revision    uint64
	savedRev    uint64
}

type autosaveMsg uint64

// newModel builds the application state from a saved session.
func newModel(store sessionStore, session savedSession) model {
	m := model{store: store, nextID: 1}
	for _, saved := range session.Tabs {
		id := saved.ID
		if id < 1 {
			id = m.nextID
		}
		m.tabs = append(m.tabs, newTab(id, saved.Title, saved.Content))
		if id >= m.nextID {
			m.nextID = id + 1
		}
	}
	if session.NextID > m.nextID {
		m.nextID = session.NextID
	}
	if len(m.tabs) == 0 {
		m.addTab()
	}
	if session.Active >= 0 && session.Active < len(m.tabs) {
		m.active = session.Active
	}

	m.pathInput = textinput.New()
	m.pathInput.Prompt = "  Save to  "
	m.pathInput.Placeholder = "notes.md"
	m.pathInput.CharLimit = 4096
	pathStyles := m.pathInput.Styles()
	pathStyles.Cursor.Color = colorAccent
	m.pathInput.SetStyles(pathStyles)
	m.focusActive()
	return m
}

// newTab creates a configured note editor.
func newTab(id int, fallback, content string) tab {
	if fallback == "" {
		fallback = fmt.Sprintf("Note %d", id)
	}
	editor := textarea.New()
	editor.Prompt = ""
	editor.Placeholder = "Start typing. This draft saves itself..."
	editor.SetValue(content)
	editor.ShowLineNumbers = false
	editor.CharLimit = 0
	styles := editor.Styles()
	styles.Focused.Base = lipgloss.NewStyle().Foreground(colorInk)
	styles.Focused.CursorLine = lipgloss.NewStyle()
	styles.Blurred.Base = lipgloss.NewStyle().Foreground(colorInk)
	styles.Cursor.Color = colorAccent
	editor.SetStyles(styles)
	return tab{id: id, fallback: fallback, editor: editor}
}

// Init starts cursor blinking.
func (m model) Init() tea.Cmd {
	return textarea.Blink
}

// Update handles terminal events and component messages.
func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.width, m.height = msg.Width, msg.Height
		m.resizeEditors()
		return m, nil
	case autosaveMsg:
		if uint64(msg) == m.revision && m.savedRev != m.revision {
			if err := m.saveSession(); err != nil {
				m.setStatus("Autosave failed: "+err.Error(), true)
			} else {
				m.savedRev = m.revision
				m.setStatus("Drafts saved", false)
			}
		}
		return m, nil
	case tea.KeyPressMsg:
		if m.showHelp {
			if msg.String() == "f1" || msg.String() == "esc" || msg.String() == "ctrl+c" {
				m.showHelp = false
				m.focusActive()
			}
			return m, nil
		}
		if m.mode == modeExport {
			return m.updateExport(msg)
		}
		return m.updateEditorKey(msg)
	}

	if m.mode == modeEdit && len(m.tabs) > 0 {
		var cmd tea.Cmd
		m.tabs[m.active].editor, cmd = m.tabs[m.active].editor.Update(msg)
		return m, cmd
	}
	return m, nil
}

// updateEditorKey handles shortcuts and editor input.
func (m model) updateEditorKey(msg tea.KeyPressMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "ctrl+c":
		if err := m.saveSession(); err != nil {
			m.setStatus("Autosave failed: "+err.Error(), true)
			return m, nil
		}
		return m, tea.Quit
	case "ctrl+n":
		m.blurActive()
		m.addTab()
		m.resizeEditors()
		m.focusActive()
		return m.changed()
	case "ctrl+w":
		m.closeActive()
		return m.changed()
	case "ctrl+right", "ctrl+]", "alt+l":
		m.switchTab(1)
		return m, nil
	case "ctrl+left", "ctrl+[", "alt+h":
		m.switchTab(-1)
		return m, nil
	case "ctrl+s":
		m.openExport()
		return m, textinput.Blink
	case "f1":
		m.showHelp = true
		m.blurActive()
		return m, nil
	}

	before := m.tabs[m.active].editor.Value()
	var cmd tea.Cmd
	m.tabs[m.active].editor, cmd = m.tabs[m.active].editor.Update(msg)
	if m.tabs[m.active].editor.Value() != before {
		updated, saveCmd := m.changed()
		m = updated.(model)
		return m, tea.Batch(cmd, saveCmd)
	}
	return m, cmd
}

// updateExport handles the export path prompt.
func (m model) updateExport(msg tea.KeyPressMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "esc", "ctrl+c":
		m.mode = modeEdit
		m.pathInput.Blur()
		m.focusActive()
		m.setStatus("Export cancelled", false)
		return m, nil
	case "enter":
		path := strings.TrimSpace(m.pathInput.Value())
		if path == "" {
			m.setStatus("Enter a file path", true)
			return m, nil
		}
		path = expandHome(path)
		if !filepath.IsAbs(path) {
			absolute, err := filepath.Abs(path)
			if err != nil {
				m.setStatus("Export failed: "+err.Error(), true)
				return m, nil
			}
			path = absolute
		}
		if err := writeExport(path, m.tabs[m.active].editor.Value()); err != nil {
			m.setStatus("Export failed: "+err.Error(), true)
			return m, nil
		}
		m.tabs[m.active].fallback = filepath.Base(path)
		m.mode = modeEdit
		m.pathInput.Blur()
		m.focusActive()
		m.setStatus("Saved to "+path, false)
		return m.changed()
	}

	var cmd tea.Cmd
	m.pathInput, cmd = m.pathInput.Update(msg)
	return m, cmd
}

// addTab appends and activates an empty note.
func (m *model) addTab() {
	m.tabs = append(m.tabs, newTab(m.nextID, "", ""))
	m.active = len(m.tabs) - 1
	m.nextID++
}

// closeActive removes the active note or clears the final tab.
func (m *model) closeActive() {
	m.blurActive()
	if len(m.tabs) == 1 {
		m.tabs[0] = newTab(m.nextID, "", "")
		m.nextID++
		m.resizeEditors()
		m.focusActive()
		m.setStatus("Cleared the last tab", false)
		return
	}
	m.tabs = append(m.tabs[:m.active], m.tabs[m.active+1:]...)
	if m.active >= len(m.tabs) {
		m.active = len(m.tabs) - 1
	}
	m.focusActive()
	m.setStatus("Tab closed", false)
}

// switchTab moves focus by a wrapped offset.
func (m *model) switchTab(offset int) {
	if len(m.tabs) < 2 {
		return
	}
	m.blurActive()
	m.active = (m.active + offset + len(m.tabs)) % len(m.tabs)
	m.focusActive()
}

// openExport prepares and focuses the export prompt.
func (m *model) openExport() {
	m.mode = modeExport
	m.blurActive()
	name := sanitizeFilename(m.tabs[m.active].title())
	if filepath.Ext(name) == "" {
		name += ".md"
	}
	m.pathInput.SetValue(name)
	m.pathInput.CursorEnd()
	m.pathInput.Focus()
	m.setStatus("Enter saves here; Esc cancels", false)
}

// focusActive gives input focus only to the active editor.
func (m *model) focusActive() {
	for i := range m.tabs {
		if i == m.active {
			m.tabs[i].editor.Focus()
		} else {
			m.tabs[i].editor.Blur()
		}
	}
}

// blurActive removes focus from the active editor.
func (m *model) blurActive() {
	if len(m.tabs) > 0 {
		m.tabs[m.active].editor.Blur()
	}
}

// resizeEditors fits inputs within the terminal frame.
func (m *model) resizeEditors() {
	width := max(20, m.width-6)
	height := max(1, m.height-4)
	for i := range m.tabs {
		m.tabs[i].editor.SetWidth(width)
		m.tabs[i].editor.SetHeight(height)
	}
	m.pathInput.SetWidth(max(10, m.width-16))
}

// changed advances the revision and schedules autosave.
func (m model) changed() (tea.Model, tea.Cmd) {
	m.revision++
	revision := m.revision
	return m, tea.Tick(autosaveDelay, func(time.Time) tea.Msg { return autosaveMsg(revision) })
}

// saveSession snapshots the current tabs to the session store.
func (m *model) saveSession() error {
	tabs := make([]savedTab, 0, len(m.tabs))
	for _, tab := range m.tabs {
		tabs = append(tabs, savedTab{ID: tab.id, Title: tab.fallback, Content: tab.editor.Value()})
	}
	return m.store.save(savedSession{
		Version: sessionVersion,
		Active:  m.active,
		NextID:  m.nextID,
		Tabs:    tabs,
	})
}

// setStatus updates the footer message.
func (m *model) setStatus(message string, isError bool) {
	m.status = message
	m.statusError = isError
}

// title derives a compact label from the note content.
func (t tab) title() string {
	for _, line := range strings.Split(t.editor.Value(), "\n") {
		line = strings.TrimSpace(strings.TrimLeft(line, "#*- "))
		if line != "" {
			return truncate(line, 22)
		}
	}
	return truncate(t.fallback, 22)
}

// View declares the full-screen terminal view.
func (m model) View() tea.View {
	view := tea.NewView(m.render())
	view.AltScreen = true
	view.WindowTitle = "Scratchpad"
	return view
}

// render composes the current application frame.
func (m model) render() string {
	if m.width == 0 || m.height == 0 {
		return "Loading scratchpad..."
	}
	if m.width < 42 || m.height < 10 {
		return lipgloss.NewStyle().Foreground(colorDanger).Padding(1).Render("Scratchpad needs a terminal at least 42 x 10.")
	}

	header := m.renderHeader()
	body := styleEditor.Render(m.tabs[m.active].editor.View())
	footer := m.renderFooter()
	page := lipgloss.JoinVertical(lipgloss.Left, header, body, footer)

	if m.mode == modeExport {
		panel := styleOverlay.Width(min(64, m.width-8)).Render(
			styleAccent.Bold(true).Render("EXPORT NOTE") + "\n\n" +
				m.pathInput.View() + "\n\n" +
				styleMuted.Render("Relative paths start from the current directory."),
		)
		return placeOverlay(m.width, m.height, panel)
	}
	if m.showHelp {
		panel := styleOverlay.Width(min(58, m.width-8)).Render(m.helpView())
		return placeOverlay(m.width, m.height, panel)
	}
	return page
}

// renderHeader renders the logo and visible tabs.
func (m model) renderHeader() string {
	logo := styleLogo.Render("SCRATCHPAD")
	available := max(0, m.width-lipgloss.Width(logo)-1)
	renderTab := func(i int) string {
		tab := m.tabs[i]
		label := fmt.Sprintf("%d  %s", i+1, tab.title())
		if i == m.active {
			return styleTabOn.Render(label)
		}
		return styleTab.Render(label)
	}

	start, end := m.active, m.active
	used := lipgloss.Width(renderTab(m.active))
	for start > 0 {
		candidate := renderTab(start - 1)
		if used+1+lipgloss.Width(candidate) > available {
			break
		}
		start--
		used += 1 + lipgloss.Width(candidate)
	}
	for end+1 < len(m.tabs) {
		candidate := renderTab(end + 1)
		if used+1+lipgloss.Width(candidate) > available {
			break
		}
		end++
		used += 1 + lipgloss.Width(candidate)
	}

	tabs := make([]string, 0, end-start+1)
	for i := start; i <= end; i++ {
		tabs = append(tabs, renderTab(i))
	}
	return lipgloss.JoinHorizontal(lipgloss.Top, logo, " ", strings.Join(tabs, " "))
}

// renderFooter renders status and shortcut hints.
func (m model) renderFooter() string {
	leftText := ""
	if m.status != "" {
		leftText = m.status
	} else {
		leftText = fmt.Sprintf("tab %d/%d  |  %d chars", m.active+1, len(m.tabs), utf8.RuneCountInString(m.tabs[m.active].editor.Value()))
	}
	rightText := "^N new   ^W close   ^S export   F1 keys"
	if m.width < 80 {
		rightText = "^N new  ^S export  F1 keys"
	}
	leftText = truncateWidth(leftText, max(1, m.width-lipgloss.Width(rightText)-3))
	left := styleMuted.Render(leftText)
	if m.statusError {
		left = styleDanger.Render(leftText)
	}
	right := styleMuted.Render(rightText)
	gap := max(1, m.width-lipgloss.Width(left)-lipgloss.Width(right)-2)
	return lipgloss.NewStyle().Padding(0, 1).Render(left + strings.Repeat(" ", gap) + right)
}

// helpView renders the keyboard reference.
func (m model) helpView() string {
	return styleAccent.Bold(true).Render("KEYBOARD MAP") + "\n\n" +
		keyLine("Ctrl+N", "new tab") +
		keyLine("Ctrl+W", "close tab") +
		keyLine("Ctrl+Left / Right", "switch tabs") +
		keyLine("Ctrl+[ / Ctrl+]", "switch tabs") +
		keyLine("Ctrl+S", "export current note") +
		keyLine("Ctrl+C", "save drafts and quit") +
		"\n" + styleMuted.Render("Drafts autosave between sessions. Press Esc to return.")
}

// keyLine formats one keyboard reference row.
func keyLine(key, description string) string {
	return lipgloss.NewStyle().Width(20).Foreground(colorBlue).Render(key) + description + "\n"
}

// writeExport creates parent directories and writes note content.
func writeExport(path, content string) error {
	info, err := os.Stat(path)
	if err == nil && info.IsDir() {
		return fmt.Errorf("%s is a directory", path)
	}
	if err != nil && !os.IsNotExist(err) {
		return err
	}
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return err
	}
	return os.WriteFile(path, []byte(content), 0o644)
}

// expandHome resolves a leading home-directory shorthand.
func expandHome(path string) string {
	if path == "~" || strings.HasPrefix(path, "~/") {
		if home, err := os.UserHomeDir(); err == nil {
			return filepath.Join(home, strings.TrimPrefix(path, "~/"))
		}
	}
	return path
}

// sanitizeFilename removes path separators from a suggested name.
func sanitizeFilename(name string) string {
	name = strings.TrimSpace(name)
	name = strings.Map(func(r rune) rune {
		switch r {
		case '/', '\\', ':', 0:
			return '-'
		default:
			return r
		}
	}, name)
	if name == "" {
		return "note"
	}
	return name
}

// truncate shortens text by rune count.
func truncate(value string, width int) string {
	runes := []rune(value)
	if len(runes) <= width {
		return value
	}
	if width <= 3 {
		return string(runes[:width])
	}
	return string(runes[:width-3]) + "..."
}

// truncateWidth shortens text by terminal cell width.
func truncateWidth(value string, width int) string {
	if lipgloss.Width(value) <= width {
		return value
	}
	if width <= 3 {
		return ""
	}
	for lipgloss.Width(value+"...") > width && len(value) > 0 {
		_, size := utf8.DecodeLastRuneInString(value)
		value = value[:len(value)-size]
	}
	return value + "..."
}

// placeOverlay centers a panel within the terminal.
func placeOverlay(width, height int, foreground string) string {
	return lipgloss.Place(width, height, lipgloss.Center, lipgloss.Center, foreground,
		lipgloss.WithWhitespaceChars(" "),
		lipgloss.WithWhitespaceStyle(lipgloss.NewStyle().Background(colorPaper)),
	)
}
