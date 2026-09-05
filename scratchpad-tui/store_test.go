package main

import (
	"os"
	"path/filepath"
	"reflect"
	"testing"
)

// TestSessionStoreRoundTrip verifies private session persistence.
func TestSessionStoreRoundTrip(t *testing.T) {
	store := sessionStore{path: filepath.Join(t.TempDir(), "nested", "session.json")}
	want := savedSession{
		Version: sessionVersion,
		Active:  1,
		NextID:  4,
		Tabs: []savedTab{
			{ID: 1, Title: "First", Content: "an idea"},
			{ID: 3, Title: "Second", Content: "another idea\n"},
		},
	}

	if err := store.save(want); err != nil {
		t.Fatalf("save() error = %v", err)
	}
	got, err := store.load()
	if err != nil {
		t.Fatalf("load() error = %v", err)
	}
	if !reflect.DeepEqual(got, want) {
		t.Fatalf("load() = %#v, want %#v", got, want)
	}

	info, err := os.Stat(store.path)
	if err != nil {
		t.Fatalf("stat session: %v", err)
	}
	if info.Mode().Perm() != 0o600 {
		t.Errorf("session permissions = %o, want 600", info.Mode().Perm())
	}
}

// TestSessionStoreRejectsUnknownVersion verifies schema validation.
func TestSessionStoreRejectsUnknownVersion(t *testing.T) {
	path := filepath.Join(t.TempDir(), "session.json")
	if err := os.WriteFile(path, []byte(`{"version":99}`), 0o600); err != nil {
		t.Fatal(err)
	}

	_, err := (sessionStore{path: path}).load()
	if err == nil {
		t.Fatal("load() error = nil, want unsupported version error")
	}
}
