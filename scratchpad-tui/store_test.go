package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"testing"
)

// TestSessionStoreRoundTrip verifies private session persistence.
func TestSessionStoreRoundTrip(t *testing.T) {
	store := sessionStore{path: filepath.Join(t.TempDir(), "nested", "session.json")}
	want := savedSession{
		Version: sessionVersion,
		Active:  1,
		NextID:  5,
		Tabs: []savedTab{
			{ID: 3, Title: "../First", Content: "# an idea\r\n\n- draft\t\x00\xff"},
			{ID: 1, Title: "Second", Content: "another idea\n"},
			{ID: 4, Title: "Empty"},
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

	for _, tab := range want.Tabs {
		path := filepath.Join(filepath.Dir(store.path), fmt.Sprintf("note-%d.md", tab.ID))
		assertStoreFile(t, path, tab.Content)
		assertStorePermissions(t, path, 0o600)
	}
	assertStorePermissions(t, store.path, 0o600)
	assertStorePermissions(t, filepath.Dir(store.path), 0o700)

	data, err := os.ReadFile(store.path)
	if err != nil {
		t.Fatal(err)
	}
	var index struct {
		Version int                          `json:"version"`
		Tabs    []map[string]json.RawMessage `json:"tabs"`
	}
	if err := json.Unmarshal(data, &index); err != nil {
		t.Fatal(err)
	}
	if index.Version != 2 || len(index.Tabs) != len(want.Tabs) {
		t.Fatalf("unexpected index: %s", data)
	}
	for _, tab := range index.Tabs {
		if _, ok := tab["content"]; ok {
			t.Errorf("index contains inline content: %s", data)
		}
		if len(tab) != 2 {
			t.Errorf("tab metadata = %v, want only id and title", tab)
		}
	}
	assertNoStoreTemps(t, filepath.Dir(store.path))

	// Markdown is authoritative on load, including edits made outside the TUI.
	want.Tabs[0].Content = "edited externally\n"
	writeStoreFile(t, store.notePath(3), want.Tabs[0].Content)
	got, err = store.load()
	if err != nil || !reflect.DeepEqual(got, want) {
		t.Fatalf("load after edit = %#v, %v; want %#v", got, err, want)
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

// TestSessionStoreLegacyMigration verifies legacy sessions receive safe IDs and split draft files.
func TestSessionStoreLegacyMigration(t *testing.T) {
	store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
	legacy := `{"version":1,"active":2,"next_id":8,"tabs":[{"id":3,"title":"First","content":"first\n"},{"id":3,"title":"Duplicate","content":"second"},{"id":0,"title":"Zero","content":"third"},{"id":-2,"title":"Negative","content":"fourth"},{"id":1,"title":"Reserved","content":""}]}`
	writeStoreFile(t, store.path, legacy)
	session, err := store.load()
	if err != nil {
		t.Fatal(err)
	}
	want := savedSession{Version: 1, Active: 2, NextID: 8, Tabs: []savedTab{
		{ID: 3, Title: "First", Content: "first\n"},
		{ID: 2, Title: "Duplicate", Content: "second"},
		{ID: 4, Title: "Zero", Content: "third"},
		{ID: 5, Title: "Negative", Content: "fourth"},
		{ID: 1, Title: "Reserved"},
	}}
	if !reflect.DeepEqual(session, want) {
		t.Fatalf("legacy load = %#v, want %#v", session, want)
	}
	assertStoreFile(t, store.path, legacy)
	entries, err := os.ReadDir(filepath.Dir(store.path))
	if err != nil || len(entries) != 1 {
		t.Fatalf("load changed directory: %v, %v", entries, err)
	}
	if err := store.save(session); err != nil {
		t.Fatal(err)
	}
	want.Version = sessionVersion
	got, err := store.load()
	if err != nil || !reflect.DeepEqual(got, want) {
		t.Fatalf("migrated load = %#v, %v; want %#v", got, err, want)
	}
	for _, tab := range want.Tabs {
		assertStoreFile(t, store.notePath(tab.ID), tab.Content)
	}
	data, err := os.ReadFile(store.path)
	if err != nil || strings.Contains(string(data), `"content"`) {
		t.Fatalf("migrated index contains content or cannot be read: %s, %v", data, err)
	}
}

// TestSessionStoreCollisionPreservesLegacy verifies migration does not overwrite unrelated files.
func TestSessionStoreCollisionPreservesLegacy(t *testing.T) {
	store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
	legacy := `{"version":1,"tabs":[{"id":1,"content":"draft one"},{"id":2,"content":"draft two"}]}`
	writeStoreFile(t, store.path, legacy)
	writeStoreFile(t, store.notePath(2), "unrelated markdown")
	session, err := store.load()
	if err != nil {
		t.Fatal(err)
	}
	if err := store.save(session); err == nil {
		t.Fatal("save overwrote a migration collision")
	}
	assertStoreFile(t, store.path, legacy)
	assertStoreFile(t, store.notePath(2), "unrelated markdown")
	if _, err := os.Stat(store.notePath(1)); !os.IsNotExist(err) {
		t.Fatalf("preflight wrote note 1: %v", err)
	}
	if err := os.Remove(store.notePath(2)); err != nil {
		t.Fatal(err)
	}
	if err := store.save(session); err != nil {
		t.Fatalf("retry migration: %v", err)
	}
	assertStoreFile(t, store.notePath(1), "draft one")
	assertStoreFile(t, store.notePath(2), "draft two")
}

// TestSessionStoreInterruptedSaveRestart verifies interrupted draft publication can be recovered.
func TestSessionStoreInterruptedSaveRestart(t *testing.T) {
	for _, tc := range []struct {
		name  string
		index string
		id    int
	}{
		{name: "first save", id: 1},
		{name: "migration", index: `{"version":1,"next_id":3,"tabs":[{"id":1,"content":"legacy one"},{"id":2,"content":"legacy two"}]}`, id: 1},
		{name: "new tab", index: `{"version":2,"next_id":2,"tabs":[{"id":1}]}`, id: 2},
	} {
		for _, published := range []bool{false, true} {
			t.Run(fmt.Sprintf("%s/published=%t", tc.name, published), func(t *testing.T) {
				store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
				if tc.index != "" {
					writeStoreFile(t, store.path, tc.index)
				}
				if tc.name == "new tab" {
					writeStoreFile(t, store.notePath(1), "committed draft")
				}
				original, err := store.load()
				if err != nil {
					t.Fatal(err)
				}
				path := store.notePath(tc.id)
				if published {
					err = writePendingNote(path, []byte("interrupted content"))
				} else {
					// Also represents a crash during recovery after unlinking the note.
					err = writeAtomic(pendingNotePath(path), []byte("interrupted content"), false)
				}
				if err != nil {
					t.Fatal(err)
				}
				assertStorePermissions(t, pendingNotePath(path), 0o600)
				if published {
					marker, err := os.Lstat(pendingNotePath(path))
					if err != nil {
						t.Fatal(err)
					}
					note, err := os.Lstat(path)
					if err != nil || !os.SameFile(marker, note) {
						t.Fatalf("published note has no hard-link ownership proof: %v", err)
					}
				}

				// Restart without committing the index or running save's rollback.
				restarted := sessionStore{path: store.path}
				want, err := restarted.load()
				if err != nil || !reflect.DeepEqual(want, original) {
					t.Fatalf("restart load = %#v, %v; want %#v", want, err, original)
				}
				if tc.name != "migration" {
					want.Tabs = append(want.Tabs, savedTab{ID: tc.id, Content: "reused ID content"})
					want.NextID = tc.id + 1
				}
				want.Version = sessionVersion
				if err := restarted.save(want); err != nil {
					t.Fatalf("save after restart: %v", err)
				}
				got, err := restarted.load()
				if err != nil || !reflect.DeepEqual(got, want) {
					t.Fatalf("recovered load = %#v, %v; want %#v", got, err, want)
				}
				for _, tab := range want.Tabs {
					assertStoreFile(t, restarted.notePath(tab.ID), tab.Content)
				}
				assertNoStoreTemps(t, filepath.Dir(store.path))
			})
		}
	}
}

// TestSessionStorePendingMarkerAfterIndexCommit verifies stale markers are cleaned after restart.
func TestSessionStorePendingMarkerAfterIndexCommit(t *testing.T) {
	for _, closeTab := range []bool{false, true} {
		t.Run(fmt.Sprintf("closed=%t", closeTab), func(t *testing.T) {
			store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
			if err := writePendingNote(store.notePath(1), []byte("committed")); err != nil {
				t.Fatal(err)
			}
			writeStoreFile(t, store.path, `{"version":2,"next_id":2,"tabs":[{"id":1}]}`)
			restarted := sessionStore{path: store.path}
			session, err := restarted.load()
			if err != nil || len(session.Tabs) != 1 || session.Tabs[0].Content != "committed" {
				t.Fatalf("load with committed marker = %#v, %v", session, err)
			}
			if closeTab {
				session.Tabs = nil
			} else {
				session.Tabs[0].Content = "updated"
			}
			if err := restarted.save(session); err != nil {
				t.Fatal(err)
			}
			if closeTab {
				if _, err := os.Stat(store.notePath(1)); !os.IsNotExist(err) {
					t.Fatalf("closed note remains: %v", err)
				}
			} else {
				assertStoreFile(t, store.notePath(1), "updated")
			}
			assertNoStoreTemps(t, filepath.Dir(store.path))
		})
	}
}

// TestSessionStoreRecoveryRejectsUnrelatedNotes verifies recovery requires proof of draft ownership.
func TestSessionStoreRecoveryRejectsUnrelatedNotes(t *testing.T) {
	for _, kind := range []string{"no marker", "different inode", "symlink marker", "symlink note"} {
		t.Run(kind, func(t *testing.T) {
			store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
			legacy := `{"version":1,"tabs":[{"id":1,"content":"same content"}]}`
			writeStoreFile(t, store.path, legacy)
			path := store.notePath(1)
			marker := pendingNotePath(path)
			if kind == "symlink note" {
				writeStoreFile(t, marker, "same content")
				if err := os.Symlink(marker, path); err != nil {
					t.Fatal(err)
				}
			} else {
				writeStoreFile(t, path, "same content")
				if kind == "different inode" {
					writeStoreFile(t, marker, "same content")
				} else if kind == "symlink marker" {
					if err := os.Symlink(path, marker); err != nil {
						t.Fatal(err)
					}
				}
			}
			session, err := store.load()
			if err != nil {
				t.Fatal(err)
			}
			if err := store.save(session); err == nil {
				t.Fatal("recovery adopted an unrelated file")
			}
			assertStoreFile(t, store.path, legacy)
			assertStoreFile(t, path, "same content")
			if kind != "no marker" {
				assertStoreFile(t, marker, "same content")
			}
		})
	}
}

// TestSessionStoreCleanup verifies closed drafts are removed without touching unrelated files.
func TestSessionStoreCleanup(t *testing.T) {
	dir := t.TempDir()
	store := sessionStore{path: filepath.Join(dir, "session.json")}
	session := savedSession{Tabs: []savedTab{{ID: 1, Content: "one"}, {ID: 2, Content: "two"}}}
	if err := store.save(session); err != nil {
		t.Fatal(err)
	}
	for _, name := range []string{"unrelated.md", "note-99.md", "note-01.md"} {
		writeStoreFile(t, filepath.Join(dir, name), "keep me")
	}
	session.Tabs = session.Tabs[1:]
	session.Tabs[0].Content = "updated"
	if err := os.Chmod(store.notePath(2), 0o644); err != nil {
		t.Fatal(err)
	}
	if err := os.Chmod(store.path, 0o644); err != nil {
		t.Fatal(err)
	}
	if err := store.save(session); err != nil {
		t.Fatal(err)
	}
	if _, err := os.Stat(store.notePath(1)); !os.IsNotExist(err) {
		t.Fatalf("closed note remains: %v", err)
	}
	assertStoreFile(t, store.notePath(2), "updated")
	assertStorePermissions(t, store.notePath(2), 0o600)
	assertStorePermissions(t, store.path, 0o600)
	for _, name := range []string{"unrelated.md", "note-99.md", "note-01.md"} {
		assertStoreFile(t, filepath.Join(dir, name), "keep me")
	}
	if err := store.save(savedSession{}); err != nil {
		t.Fatal(err)
	}
	if _, err := os.Stat(store.notePath(2)); !os.IsNotExist(err) {
		t.Fatalf("last closed note remains: %v", err)
	}
	assertNoStoreTemps(t, dir)
}

// TestSessionStoreFailedSaveKeepsClosedNotes verifies cleanup waits for a successful commit.
func TestSessionStoreFailedSaveKeepsClosedNotes(t *testing.T) {
	store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
	original := savedSession{Version: sessionVersion, Tabs: []savedTab{{ID: 1, Content: "keep"}}}
	if err := store.save(original); err != nil {
		t.Fatal(err)
	}
	writeStoreFile(t, store.notePath(2), "unowned")
	if err := store.save(savedSession{Tabs: []savedTab{{ID: 2, Content: "new"}}}); err == nil {
		t.Fatal("save error = nil, want collision")
	}
	got, err := store.load()
	if err != nil || !reflect.DeepEqual(got, original) {
		t.Fatalf("failed save changed session: %#v, %v", got, err)
	}
	assertStoreFile(t, store.notePath(1), "keep")
	assertStoreFile(t, store.notePath(2), "unowned")
}

// TestSessionStoreInvalidIDs verifies invalid tab IDs are rejected on load and save.
func TestSessionStoreInvalidIDs(t *testing.T) {
	for _, ids := range [][]int{{0}, {-1}, {1, 1}} {
		t.Run(fmt.Sprint(ids), func(t *testing.T) {
			store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
			session := savedSession{Version: sessionVersion}
			for _, id := range ids {
				session.Tabs = append(session.Tabs, savedTab{ID: id, Content: "draft"})
			}
			if err := store.save(session); err == nil {
				t.Fatal("save accepted invalid IDs")
			}
			if _, err := os.Stat(store.path); !os.IsNotExist(err) {
				t.Fatalf("invalid save wrote index: %v", err)
			}
			data, err := json.Marshal(session)
			if err != nil {
				t.Fatal(err)
			}
			writeStoreFile(t, store.path, string(data))
			if _, err := store.load(); err == nil {
				t.Fatal("load accepted invalid v2 IDs")
			}
		})
	}
}

// TestSessionStoreIndexFailureRemovesNewNotes verifies failed commits roll back new drafts.
func TestSessionStoreIndexFailureRemovesNewNotes(t *testing.T) {
	// A trailing separator lets directory creation succeed but index publication fail.
	store := sessionStore{path: filepath.Join(t.TempDir(), "session.json") + string(os.PathSeparator)}
	err := store.save(savedSession{Tabs: []savedTab{{ID: 1, Content: "one"}, {ID: 2, Content: "two"}}})
	if err == nil || !strings.Contains(err.Error(), "publish") {
		t.Fatalf("save error = %v, want index publication failure", err)
	}
	for _, id := range []int{1, 2} {
		if _, err := os.Stat(store.notePath(id)); !os.IsNotExist(err) {
			t.Fatalf("failed index save left note %d: %v", id, err)
		}
	}
	assertNoStoreTemps(t, filepath.Dir(store.path))
}

// TestSessionStoreCleanupFailureCommitsIndex verifies cleanup errors do not undo the committed index.
func TestSessionStoreCleanupFailureCommitsIndex(t *testing.T) {
	store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
	if err := store.save(savedSession{Tabs: []savedTab{{ID: 1, Content: "one"}}}); err != nil {
		t.Fatal(err)
	}
	if err := os.Remove(store.notePath(1)); err != nil {
		t.Fatal(err)
	}
	if err := os.Mkdir(store.notePath(1), 0o700); err != nil {
		t.Fatal(err)
	}
	unrelated := filepath.Join(store.notePath(1), "unrelated.md")
	writeStoreFile(t, unrelated, "keep")
	want := savedSession{Version: sessionVersion, Tabs: []savedTab{{ID: 2, Content: "two"}}}
	if err := store.save(want); err == nil || !strings.Contains(err.Error(), "index saved") {
		t.Fatalf("save error = %v, want cleanup error after commit", err)
	}
	got, err := store.load()
	if err != nil || !reflect.DeepEqual(got, want) {
		t.Fatalf("cleanup failure lost committed session: %#v, %v", got, err)
	}
	assertStoreFile(t, unrelated, "keep")
	assertStoreFile(t, store.notePath(2), "two")
	if err := store.save(want); err != nil {
		t.Fatalf("save after cleanup failure: %v", err)
	}
	assertStoreFile(t, unrelated, "keep")
}

// TestSessionStoreMissingOwnedNotes verifies saving recreates missing drafts owned by the index.
func TestSessionStoreMissingOwnedNotes(t *testing.T) {
	store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
	session := savedSession{Tabs: []savedTab{{ID: 1, Content: "one"}, {ID: 2, Content: "two"}}}
	if err := store.save(session); err != nil {
		t.Fatal(err)
	}
	for _, tab := range session.Tabs {
		if err := os.Remove(store.notePath(tab.ID)); err != nil {
			t.Fatal(err)
		}
	}
	session.Tabs = session.Tabs[:1]
	if err := store.save(session); err != nil {
		t.Fatalf("save with missing owned notes: %v", err)
	}
	assertStoreFile(t, store.notePath(1), "one")
}

// TestSessionStoreErrors verifies malformed state and unsafe paths fail without data loss.
func TestSessionStoreErrors(t *testing.T) {
	t.Run("missing index", func(t *testing.T) {
		store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
		if session, err := store.load(); err != nil || len(session.Tabs) != 0 {
			t.Fatalf("load = %#v, %v, want empty session", session, err)
		}
	})
	for _, data := range []string{"{", `{"version":99}`, `{"version":2,"tabs":[{"id":1},{"id":1}]}`} {
		t.Run(data, func(t *testing.T) {
			store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
			writeStoreFile(t, store.path, data)
			if _, err := store.load(); err == nil {
				t.Fatal("load accepted broken index")
			}
			if err := store.save(savedSession{}); err == nil {
				t.Fatal("save replaced broken index")
			}
			assertStoreFile(t, store.path, data)
		})
	}
	t.Run("missing or unreadable note", func(t *testing.T) {
		store := sessionStore{path: filepath.Join(t.TempDir(), "session.json")}
		writeStoreFile(t, store.path, `{"version":2,"tabs":[{"id":1,"content":"must not fall back"}]}`)
		if _, err := store.load(); err == nil || !strings.Contains(err.Error(), "note-1.md") {
			t.Fatalf("load error = %v, want missing note", err)
		}
		if err := os.Mkdir(store.notePath(1), 0o700); err != nil {
			t.Fatal(err)
		}
		if _, err := store.load(); err == nil {
			t.Fatal("load accepted directory as note")
		}
		if err := store.save(savedSession{Tabs: []savedTab{{ID: 1}}}); err == nil {
			t.Fatal("save replaced directory")
		}
	})
	t.Run("state parent is file", func(t *testing.T) {
		parent := filepath.Join(t.TempDir(), "file")
		writeStoreFile(t, parent, "keep")
		if err := (sessionStore{path: filepath.Join(parent, "session.json")}).save(savedSession{}); err == nil {
			t.Fatal("save accepted file as parent")
		}
		assertStoreFile(t, parent, "keep")
	})
	t.Run("symlink collision", func(t *testing.T) {
		dir := t.TempDir()
		store := sessionStore{path: filepath.Join(dir, "session.json")}
		target := filepath.Join(dir, "unrelated.md")
		writeStoreFile(t, target, "keep")
		if err := os.Symlink(target, store.notePath(1)); err != nil {
			t.Fatal(err)
		}
		if err := store.save(savedSession{Tabs: []savedTab{{ID: 1, Content: "new"}}}); err == nil {
			t.Fatal("save accepted symlink collision")
		}
		assertStoreFile(t, target, "keep")
	})
}

// TestWriteAtomicFailures verifies publication failures preserve destinations and remove temporaries.
func TestWriteAtomicFailures(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "note.md")
	writeStoreFile(t, path, "original")
	if err := writeAtomic(path, []byte("replacement"), false); err == nil {
		t.Fatal("new-file publish overwrote existing file")
	}
	assertStoreFile(t, path, "original")
	if err := writeAtomic(dir, []byte("replacement"), true); err == nil {
		t.Fatal("replace directory succeeded")
	}
	if err := writeAtomic(filepath.Join(dir, "missing", "note.md"), nil, true); err == nil {
		t.Fatal("temporary file creation in missing directory succeeded")
	}
	assertNoStoreTemps(t, dir)
	assertNoStoreTemps(t, filepath.Dir(dir))
}

// TestNewSessionStorePaths verifies configured and default state directory resolution.
func TestNewSessionStorePaths(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("SCRATCHPAD_STATE_DIR", dir)
	store, err := newSessionStore()
	if err != nil || store.path != filepath.Join(dir, "session.json") {
		t.Fatalf("override store = %#v, %v", store, err)
	}
	t.Setenv("SCRATCHPAD_STATE_DIR", "")
	config, err := os.UserConfigDir()
	if err != nil {
		t.Fatal(err)
	}
	store, err = newSessionStore()
	if err != nil || store.path != filepath.Join(config, "scratchpad", "session.json") {
		t.Fatalf("default store = %#v, %v", store, err)
	}
}

// writeStoreFile creates test state with the store's expected permissions.
func writeStoreFile(t *testing.T, path, content string) {
	t.Helper()
	if err := os.WriteFile(path, []byte(content), 0o600); err != nil {
		t.Fatal(err)
	}
}

// assertStoreFile checks that a state file contains the expected text.
func assertStoreFile(t *testing.T, path, want string) {
	t.Helper()
	data, err := os.ReadFile(path)
	if err != nil || string(data) != want {
		t.Fatalf("read %s = %q, %v; want %q", path, data, err, want)
	}
}

// assertStorePermissions checks a state file's permission bits.
func assertStorePermissions(t *testing.T, path string, want os.FileMode) {
	t.Helper()
	info, err := os.Stat(path)
	if err != nil {
		t.Fatal(err)
	}
	if info.Mode().Perm() != want {
		t.Errorf("%s permissions = %o, want %o", path, info.Mode().Perm(), want)
	}
}

// assertNoStoreTemps checks that a state directory contains no temporary files.
func assertNoStoreTemps(t *testing.T, dir string) {
	t.Helper()
	matches, err := filepath.Glob(filepath.Join(dir, ".scratchpad-*"))
	if err != nil || len(matches) != 0 {
		t.Fatalf("temporary files remain: %v, %v", matches, err)
	}
}
