package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

const sessionVersion = 2

type savedTab struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content,omitempty"`
}

type savedSession struct {
	Version int        `json:"version"`
	Active  int        `json:"active"`
	NextID  int        `json:"next_id"`
	Tabs    []savedTab `json:"tabs"`
}

type sessionStore struct {
	path string
}

// newSessionStore resolves the draft session path.
func newSessionStore() (sessionStore, error) {
	if dir := os.Getenv("SCRATCHPAD_STATE_DIR"); dir != "" {
		return sessionStore{path: filepath.Join(dir, "session.json")}, nil
	}

	dir, err := os.UserConfigDir()
	if err != nil {
		return sessionStore{}, fmt.Errorf("find config directory: %w", err)
	}
	return sessionStore{path: filepath.Join(dir, "scratchpad", "session.json")}, nil
}

// load reads and validates a saved session.
func (s sessionStore) load() (savedSession, error) {
	session, err := s.loadIndex()
	if os.IsNotExist(err) {
		return savedSession{}, nil
	}
	if err != nil {
		return savedSession{}, err
	}
	if session.Version == sessionVersion {
		for i := range session.Tabs {
			path := s.notePath(session.Tabs[i].ID)
			data, err := os.ReadFile(path)
			if err != nil {
				return savedSession{}, fmt.Errorf("read note %s: %w", path, err)
			}
			session.Tabs[i].Content = string(data)
		}
	}
	return session, nil
}

// loadIndex reads, validates, and repairs supported session metadata.
func (s sessionStore) loadIndex() (savedSession, error) {
	data, err := os.ReadFile(s.path)
	if err != nil {
		return savedSession{}, err
	}

	var session savedSession
	if err := json.Unmarshal(data, &session); err != nil {
		return savedSession{}, fmt.Errorf("decode %s: %w", s.path, err)
	}
	if session.Version != 1 && session.Version != sessionVersion {
		return savedSession{}, fmt.Errorf("unsupported session version %d", session.Version)
	}
	if session.Version == 1 {
		// Reserve valid IDs before repairing legacy IDs so no draft is overwritten.
		used := make(map[int]bool, len(session.Tabs))
		for _, tab := range session.Tabs {
			if tab.ID > 0 {
				used[tab.ID] = true
			}
		}
		seen := make(map[int]bool, len(session.Tabs))
		next := 1
		for i, tab := range session.Tabs {
			if tab.ID <= 0 || seen[tab.ID] {
				for used[next] {
					next++
				}
				session.Tabs[i].ID = next
				used[next] = true
			}
			seen[session.Tabs[i].ID] = true
			if session.Tabs[i].ID >= session.NextID {
				session.NextID = session.Tabs[i].ID + 1
			}
		}
	}
	if err := validateTabIDs(session.Tabs); err != nil {
		return savedSession{}, err
	}
	return session, nil
}

// validateTabIDs rejects non-positive and duplicate tab IDs.
func validateTabIDs(tabs []savedTab) error {
	seen := make(map[int]bool, len(tabs))
	for _, tab := range tabs {
		if tab.ID <= 0 || seen[tab.ID] {
			return fmt.Errorf("invalid or duplicate tab ID %d", tab.ID)
		}
		seen[tab.ID] = true
	}
	return nil
}

// notePath returns the draft path for a tab ID.
func (s sessionStore) notePath(id int) string {
	return filepath.Join(filepath.Dir(s.path), fmt.Sprintf("note-%d.md", id))
}

// pendingNotePath returns the ownership marker path for a draft.
func pendingNotePath(path string) string {
	return filepath.Join(filepath.Dir(path), ".scratchpad-"+filepath.Base(path)+".pending")
}

// recoverPendingNote removes an interrupted draft only when its hard-link marker proves ownership.
// Remove the note first so another interruption never loses its ownership proof.
func recoverPendingNote(path string) error {
	marker := pendingNotePath(path)
	staged, err := os.Lstat(marker)
	if os.IsNotExist(err) {
		return nil
	}
	if err != nil {
		return fmt.Errorf("inspect pending note %s: %w", marker, err)
	}
	if !staged.Mode().IsRegular() {
		return fmt.Errorf("invalid pending note %s", marker)
	}
	note, err := os.Lstat(path)
	if err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("inspect note %s: %w", path, err)
	}
	if err == nil {
		if !note.Mode().IsRegular() || !os.SameFile(staged, note) {
			return fmt.Errorf("refusing to recover unrelated note %s", path)
		}
		if err := os.Remove(path); err != nil {
			return fmt.Errorf("remove interrupted note %s: %w", path, err)
		}
	}
	if err := os.Remove(marker); err != nil {
		return fmt.Errorf("remove pending note %s: %w", marker, err)
	}
	return nil
}

// writePendingNote publishes a new draft with a marker retained until the index commits.
func writePendingNote(path string, data []byte) error {
	marker := pendingNotePath(path)
	if err := writeAtomic(marker, data, false); err != nil {
		return err
	}
	// Keep the marker until the index commits, including across process restarts.
	if err := os.Link(marker, path); err != nil {
		return fmt.Errorf("publish note %s: %w", path, err)
	}
	return nil
}

// save commits note files before the index. Each file is atomic, not the session.
func (s sessionStore) save(session savedSession) error {
	if err := validateTabIDs(session.Tabs); err != nil {
		return err
	}
	previous, err := s.loadIndex()
	if err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("read previous index: %w", err)
	}
	owned := make(map[int]bool, len(previous.Tabs))
	if previous.Version == sessionVersion {
		for _, tab := range previous.Tabs {
			owned[tab.ID] = true
		}
	}
	current := make(map[int]bool, len(session.Tabs))
	for _, tab := range session.Tabs {
		current[tab.ID] = true
		path := s.notePath(tab.ID)
		if !owned[tab.ID] {
			if err := recoverPendingNote(path); err != nil {
				return err
			}
		}
		info, err := os.Lstat(path)
		if err != nil && !os.IsNotExist(err) {
			return fmt.Errorf("inspect note %s: %w", path, err)
		}
		if err == nil && (!owned[tab.ID] || !info.Mode().IsRegular()) {
			return fmt.Errorf("refusing to replace existing note %s", path)
		}
	}

	dir := filepath.Dir(s.path)
	if err := os.MkdirAll(dir, 0o700); err != nil {
		return fmt.Errorf("create state directory: %w", err)
	}

	index := session
	index.Version = sessionVersion
	index.Tabs = make([]savedTab, len(session.Tabs))
	for i, tab := range session.Tabs {
		index.Tabs[i] = savedTab{ID: tab.ID, Title: tab.Title}
	}
	data, err := json.MarshalIndent(index, "", "  ")
	if err != nil {
		return fmt.Errorf("encode session: %w", err)
	}
	data = append(data, '\n')

	// Roll back new files on returned errors so a failed migration can be retried.
	var created []string
	committed := false
	defer func() {
		if !committed {
			for _, path := range created {
				recoverPendingNote(path)
			}
		}
	}()
	for _, tab := range session.Tabs {
		path := s.notePath(tab.ID)
		if owned[tab.ID] {
			err = writeAtomic(path, []byte(tab.Content), true)
		} else {
			created = append(created, path)
			err = writePendingNote(path, []byte(tab.Content))
		}
		if err != nil {
			return err
		}
	}
	if err := writeAtomic(s.path, data, true); err != nil {
		return err
	}
	committed = true
	for _, tab := range session.Tabs {
		if err := os.Remove(pendingNotePath(s.notePath(tab.ID))); err != nil && !os.IsNotExist(err) {
			return fmt.Errorf("index saved but remove pending note: %w", err)
		}
	}
	for _, tab := range previous.Tabs {
		if owned[tab.ID] && !current[tab.ID] {
			if err := os.Remove(s.notePath(tab.ID)); err != nil && !os.IsNotExist(err) {
				return fmt.Errorf("index saved but remove closed note: %w", err)
			}
			if err := os.Remove(pendingNotePath(s.notePath(tab.ID))); err != nil && !os.IsNotExist(err) {
				return fmt.Errorf("index saved but remove closed pending note: %w", err)
			}
		}
	}
	return nil
}

// writeAtomic publishes a complete private file, optionally replacing its destination.
func writeAtomic(path string, data []byte, replace bool) error {
	tmp, err := os.CreateTemp(filepath.Dir(path), ".scratchpad-*")
	if err != nil {
		return fmt.Errorf("create temporary file for %s: %w", path, err)
	}
	tmpName := tmp.Name()
	defer os.Remove(tmpName)

	if err := tmp.Chmod(0o600); err != nil {
		tmp.Close()
		return fmt.Errorf("secure temporary file for %s: %w", path, err)
	}
	if _, err := tmp.Write(data); err != nil {
		tmp.Close()
		return fmt.Errorf("write temporary file for %s: %w", path, err)
	}
	if err := tmp.Sync(); err != nil {
		tmp.Close()
		return fmt.Errorf("sync temporary file for %s: %w", path, err)
	}
	if err := tmp.Close(); err != nil {
		return fmt.Errorf("close temporary file for %s: %w", path, err)
	}
	if replace {
		err = os.Rename(tmpName, path)
	} else {
		// Linking publishes a complete new file without clobbering a collision.
		err = os.Link(tmpName, path)
	}
	if err != nil {
		return fmt.Errorf("publish %s: %w", path, err)
	}
	return nil
}
