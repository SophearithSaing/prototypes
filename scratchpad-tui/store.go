package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

const sessionVersion = 1

type savedTab struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
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

func (s sessionStore) load() (savedSession, error) {
	data, err := os.ReadFile(s.path)
	if err != nil {
		return savedSession{}, err
	}

	var session savedSession
	if err := json.Unmarshal(data, &session); err != nil {
		return savedSession{}, fmt.Errorf("decode %s: %w", s.path, err)
	}
	if session.Version != sessionVersion {
		return savedSession{}, fmt.Errorf("unsupported session version %d", session.Version)
	}
	return session, nil
}

func (s sessionStore) save(session savedSession) error {
	dir := filepath.Dir(s.path)
	if err := os.MkdirAll(dir, 0o700); err != nil {
		return fmt.Errorf("create state directory: %w", err)
	}

	data, err := json.MarshalIndent(session, "", "  ")
	if err != nil {
		return fmt.Errorf("encode session: %w", err)
	}
	data = append(data, '\n')

	tmp, err := os.CreateTemp(dir, ".session-*")
	if err != nil {
		return fmt.Errorf("create temporary session: %w", err)
	}
	tmpName := tmp.Name()
	defer os.Remove(tmpName)

	if err := tmp.Chmod(0o600); err != nil {
		tmp.Close()
		return fmt.Errorf("secure temporary session: %w", err)
	}
	if _, err := tmp.Write(data); err != nil {
		tmp.Close()
		return fmt.Errorf("write temporary session: %w", err)
	}
	if err := tmp.Sync(); err != nil {
		tmp.Close()
		return fmt.Errorf("sync temporary session: %w", err)
	}
	if err := tmp.Close(); err != nil {
		return fmt.Errorf("close temporary session: %w", err)
	}
	if err := os.Rename(tmpName, s.path); err != nil {
		return fmt.Errorf("replace session: %w", err)
	}
	return nil
}
