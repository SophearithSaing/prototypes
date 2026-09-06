package main

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"
	"github.com/charmbracelet/x/ansi"
)

// TestNewModelRestoresSession verifies restoration of tabs and focus.
func TestNewModelRestoresSession(t *testing.T) {
	session := savedSession{
		Version: sessionVersion,
		Active:  1,
		NextID:  8,
		Tabs: []savedTab{
			{ID: 2, Title: "One", Content: "alpha"},
			{ID: 7, Title: "Two", Content: "beta"},
		},
	}

	m := newModel(sessionStore{}, session)
	if len(m.tabs) != 2 || m.active != 1 || m.nextID != 8 {
		t.Fatalf("restored model = %d tabs, active %d, next ID %d", len(m.tabs), m.active, m.nextID)
	}
	if got := m.tabs[1].editor.Value(); got != "beta" {
		t.Errorf("active content = %q, want beta", got)
	}
}

// TestTabLifecycle verifies keyboard-driven tab creation and removal.
func TestTabLifecycle(t *testing.T) {
	m := newModel(sessionStore{}, savedSession{})

	updated, _ := m.Update(tea.KeyPressMsg{Code: 'n', Mod: tea.ModCtrl})
	m = updated.(model)
	if len(m.tabs) != 2 || m.active != 1 {
		t.Fatalf("after Ctrl+N = %d tabs, active %d", len(m.tabs), m.active)
	}

	updated, _ = m.Update(tea.KeyPressMsg{Code: 'w', Mod: tea.ModCtrl})
	m = updated.(model)
	if len(m.tabs) != 1 || m.active != 0 {
		t.Fatalf("after Ctrl+W = %d tabs, active %d", len(m.tabs), m.active)
	}
}

// TestAutosaveMessagePersistsCurrentDraft verifies revision persistence.
func TestAutosaveMessagePersistsCurrentDraft(t *testing.T) {
	store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
	m := newModel(store, savedSession{})
	m.tabs[0].editor.SetValue("remember this")
	m.revision = 3

	updated, _ := m.Update(autosaveMsg(3))
	m = updated.(model)
	if m.savedRev != 3 {
		t.Fatalf("saved revision = %d, want 3", m.savedRev)
	}

	session, err := store.load()
	if err != nil {
		t.Fatal(err)
	}
	if got := session.Tabs[0].Content; got != "remember this" {
		t.Errorf("saved content = %q", got)
	}
}

// TestWriteExport verifies nested file export.
func TestWriteExport(t *testing.T) {
	path := filepath.Join(t.TempDir(), "ideas", "today.md")
	if err := writeExport(path, "first thought\n"); err != nil {
		t.Fatalf("writeExport() error = %v", err)
	}
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	if string(data) != "first thought\n" {
		t.Errorf("exported content = %q", data)
	}
}

// TestTabTitleUsesFirstContentLine verifies automatic tab labels.
func TestTabTitleUsesFirstContentLine(t *testing.T) {
	tab := newTab(1, "Note 1", "\n# A useful heading\nbody")
	if got := tab.title(); got != "A useful heading" {
		t.Errorf("title() = %q", got)
	}
}

// TestSanitizeFilename verifies safe export suggestions.
func TestSanitizeFilename(t *testing.T) {
	got := sanitizeFilename("  project/notes: one  ")
	if got != "project-notes- one" {
		t.Errorf("sanitizeFilename() = %q", got)
	}
	if strings.ContainsAny(got, "/\\:") {
		t.Errorf("sanitizeFilename() left a path separator in %q", got)
	}
}

// TestViewFitsNarrowTerminal verifies responsive frame dimensions.
func TestViewFitsNarrowTerminal(t *testing.T) {
	m := newModel(sessionStore{}, savedSession{})
	for range 4 {
		m.addTab()
	}
	m.tabs[m.active].editor.SetValue("A note with a title that is intentionally long\nAnd some body text.")
	m.width, m.height = 42, 10
	m.status = "A deliberately long status message that must be truncated"
	m.resizeEditors()

	view := m.View()
	if !view.AltScreen || view.WindowTitle != "Scratchpad" {
		t.Errorf("view terminal settings = AltScreen %t, title %q", view.AltScreen, view.WindowTitle)
	}
	for lineNumber, line := range strings.Split(view.Content, "\n") {
		if width := lipgloss.Width(line); width > m.width {
			t.Errorf("line %d width = %d, terminal width = %d", lineNumber+1, width, m.width)
		}
	}
	if height := lipgloss.Height(view.Content); height != m.height {
		t.Errorf("view height = %d, terminal height = %d", height, m.height)
	}
}

// TestMarkdownViewIsReadOnly verifies preview input cannot modify the draft.
func TestMarkdownViewIsReadOnly(t *testing.T) {
	m := newModel(sessionStore{}, savedSession{})
	source := "Some **bold words** and `code`.\n"
	m.tabs[0].editor.SetValue(source)
	updated, _ := m.Update(tea.WindowSizeMsg{Width: 80, Height: 24})
	m = updated.(model)
	updated, _ = m.Update(tea.KeyPressMsg{Code: 'p', Mod: tea.ModCtrl})
	m = updated.(model)
	if m.mode != modeView || m.tabs[0].editor.Focused() {
		t.Fatal("Ctrl+P did not enter unfocused view mode")
	}
	rendered := ansi.Strip(m.preview.View())
	if !strings.Contains(rendered, "bold words") || strings.Contains(rendered, "**") || strings.Contains(rendered, "`code`") {
		t.Fatalf("Markdown was not rendered: %q", rendered)
	}
	for _, msg := range []tea.Msg{
		tea.KeyPressMsg{Code: 'x', Text: "x"},
		tea.KeyPressMsg{Code: tea.KeyBackspace},
		tea.PasteMsg{Content: "must not insert"},
	} {
		updated, _ = m.Update(msg)
		m = updated.(model)
	}
	if got := m.tabs[0].editor.Value(); got != source || m.revision != 0 {
		t.Fatalf("view input changed draft: %q, revision %d", got, m.revision)
	}
	updated, _ = m.Update(tea.KeyPressMsg{Code: 'p', Mod: tea.ModCtrl})
	m = updated.(model)
	if m.mode != modeEdit || !m.tabs[0].editor.Focused() {
		t.Fatal("Ctrl+P did not restore editor focus")
	}
	updated, _ = m.Update(tea.KeyPressMsg{Code: 'x', Text: "x"})
	m = updated.(model)
	if m.tabs[0].editor.Value() == source || m.revision != 1 {
		t.Fatal("editor input was not restored")
	}
}

// TestMarkdownViewScrollResizeAndTabs verifies preview navigation and layout transitions.
func TestMarkdownViewScrollResizeAndTabs(t *testing.T) {
	m := newModel(sessionStore{}, savedSession{Tabs: []savedTab{
		{ID: 1, Content: strings.Repeat("A **formatted** paragraph.\n\n", 40)},
		{ID: 2, Content: "Second **note**"},
	}})
	updated, _ := m.Update(tea.WindowSizeMsg{Width: 80, Height: 24})
	m = updated.(model)
	updated, _ = m.Update(tea.KeyPressMsg{Code: 'p', Mod: tea.ModCtrl})
	m = updated.(model)
	updated, _ = m.Update(tea.KeyPressMsg{Code: tea.KeyPgDown})
	m = updated.(model)
	if m.preview.YOffset() == 0 {
		t.Fatal("Page Down did not scroll preview")
	}
	for _, width := range []int{42, 100} {
		updated, _ = m.Update(tea.WindowSizeMsg{Width: width, Height: 10})
		m = updated.(model)
		view := m.View().Content
		if lipgloss.Height(view) != m.height {
			t.Fatalf("preview height = %d, want %d", lipgloss.Height(view), m.height)
		}
		for _, line := range strings.Split(view, "\n") {
			if lipgloss.Width(line) > width {
				t.Fatalf("preview line exceeds terminal width %d: %q", width, line)
			}
		}
	}
	updated, _ = m.Update(tea.KeyPressMsg{Code: tea.KeyRight, Mod: tea.ModCtrl})
	m = updated.(model)
	if m.active != 1 || m.mode != modeView || m.preview.YOffset() != 0 || !strings.Contains(ansi.Strip(m.preview.View()), "Second note") {
		t.Fatal("switching tabs did not refresh preview at the top")
	}
	updated, _ = m.Update(tea.KeyPressMsg{Code: 'w', Mod: tea.ModCtrl})
	m = updated.(model)
	if len(m.tabs) != 1 || !strings.Contains(ansi.Strip(m.preview.View()), "formatted") {
		t.Fatal("closing a tab did not refresh preview")
	}
	updated, _ = m.Update(tea.KeyPressMsg{Code: 'n', Mod: tea.ModCtrl})
	m = updated.(model)
	if m.mode != modeEdit || !m.tabs[m.active].editor.Focused() {
		t.Fatal("new tab did not open for editing")
	}
}

// TestMarkdownViewOverlaysAndExport verifies overlays preserve preview mode and source Markdown.
func TestMarkdownViewOverlaysAndExport(t *testing.T) {
	m := newModel(sessionStore{}, savedSession{})
	source := "Export **original Markdown**\n"
	m.tabs[0].editor.SetValue(source)
	updated, _ := m.Update(tea.WindowSizeMsg{Width: 80, Height: 24})
	m = updated.(model)
	updated, _ = m.Update(tea.KeyPressMsg{Code: 'p', Mod: tea.ModCtrl})
	m = updated.(model)
	updated, _ = m.Update(tea.KeyPressMsg{Code: tea.KeyF1})
	m = updated.(model)
	updated, _ = m.Update(tea.KeyPressMsg{Code: tea.KeyEscape})
	m = updated.(model)
	if m.showHelp || m.mode != modeView || m.tabs[0].editor.Focused() {
		t.Fatal("closing help did not preserve view mode")
	}
	for _, cancel := range []bool{true, false} {
		updated, _ = m.Update(tea.KeyPressMsg{Code: 's', Mod: tea.ModCtrl})
		m = updated.(model)
		updated, _ = m.Update(tea.WindowSizeMsg{Width: 42, Height: 10})
		m = updated.(model)
		path := filepath.Join(t.TempDir(), "export.md")
		m.pathInput.SetValue(path)
		key := tea.KeyEnter
		if cancel {
			key = tea.KeyEscape
		}
		updated, _ = m.Update(tea.KeyPressMsg{Code: key})
		m = updated.(model)
		if m.mode != modeView || m.tabs[0].editor.Focused() {
			t.Fatal("export did not return to view mode")
		}
		if !cancel {
			data, err := os.ReadFile(path)
			if err != nil || string(data) != source {
				t.Fatalf("export = %q, %v, want source Markdown", data, err)
			}
		}
	}
	updated, _ = m.Update(tea.KeyPressMsg{Code: tea.KeyEscape})
	m = updated.(model)
	if m.mode != modeEdit || !m.tabs[0].editor.Focused() {
		t.Fatal("Escape did not restore editing")
	}
}

// TestPastedMarkdownAutosavesFromView verifies pending edits save after entering preview mode.
func TestPastedMarkdownAutosavesFromView(t *testing.T) {
	store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
	m := newModel(store, savedSession{})
	updated, cmd := m.Update(tea.PasteMsg{Content: "# Pasted draft\n\n**Keep this**"})
	m = updated.(model)
	if m.revision != 1 || cmd == nil {
		t.Fatal("paste did not schedule autosave")
	}
	updated, _ = m.Update(tea.KeyPressMsg{Code: 'p', Mod: tea.ModCtrl})
	m = updated.(model)
	updated, _ = m.Update(autosaveMsg(m.revision))
	m = updated.(model)
	if m.savedRev != m.revision || m.statusError {
		t.Fatalf("autosave in view mode failed: %s", m.status)
	}
	data, err := os.ReadFile(store.notePath(m.tabs[0].id))
	if err != nil || string(data) != m.tabs[0].editor.Value() {
		t.Fatalf("saved Markdown = %q, %v", data, err)
	}
}

// TestHelpFitsShortTerminals verifies help remains bounded and scrollable at supported sizes.
func TestHelpFitsShortTerminals(t *testing.T) {
	for _, size := range []tea.WindowSizeMsg{{Width: 42, Height: 10}, {Width: 80, Height: 16}, {Width: 100, Height: 24}} {
		m := newModel(sessionStore{}, savedSession{})
		updated, _ := m.Update(size)
		m = updated.(model)
		updated, _ = m.Update(tea.KeyPressMsg{Code: tea.KeyF1})
		m = updated.(model)
		view := m.View().Content
		if lipgloss.Height(view) != size.Height {
			t.Fatalf("help height = %d, want %d", lipgloss.Height(view), size.Height)
		}
		for _, line := range strings.Split(view, "\n") {
			if lipgloss.Width(line) > size.Width {
				t.Fatalf("help line exceeds terminal width %d: %q", size.Width, line)
			}
		}
		if size.Height < 20 {
			updated, _ = m.Update(tea.KeyPressMsg{Code: tea.KeyPgDown})
			m = updated.(model)
			if m.help.YOffset() == 0 || !m.showHelp {
				t.Fatal("help did not scroll")
			}
		}
	}
}
