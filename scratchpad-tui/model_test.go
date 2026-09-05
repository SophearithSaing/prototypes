package main

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"
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
