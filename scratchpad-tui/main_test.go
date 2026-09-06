package main

import (
	"io"
	"path/filepath"
	"strings"
	"testing"
)

// TestRunRejectsMissingDraft verifies startup reports an indexed draft that is absent.
func TestRunRejectsMissingDraft(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("SCRATCHPAD_STATE_DIR", dir)
	path := filepath.Join(dir, "session.json")
	index := `{"version":2,"tabs":[{"id":1}]}`
	writeStoreFile(t, path, index)
	if err := run(strings.NewReader(""), io.Discard); err == nil || !strings.Contains(err.Error(), "note-1.md") {
		t.Fatalf("run() error = %v, want missing draft error", err)
	}
	assertStoreFile(t, path, index)
}
