package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"unicode"
	"unicode/utf8"

	"github.com/jackc/pgx/v5"
)

type profile struct {
	Name        string `json:"name"`
	URL         string `json:"url"`
	PasswordEnv string `json:"password_env,omitempty"`
	password    string
	transient   bool
}

type config struct {
	Connections []profile `json:"connections"`
}

func defaultConfigPath() (string, error) {
	dir, err := os.UserConfigDir()
	if err != nil {
		return "", fmt.Errorf("locate config directory: %w", err)
	}
	return filepath.Join(dir, "db-client", "connections.json"), nil
}

func loadConfig(path string) (config, error) {
	data, err := os.ReadFile(path)
	if errors.Is(err, os.ErrNotExist) {
		return config{}, nil
	}
	if err != nil {
		return config{}, fmt.Errorf("read config: %w", err)
	}
	var cfg *config
	if err := json.Unmarshal(data, &cfg); err != nil {
		var syntaxErr *json.SyntaxError
		if errors.As(err, &syntaxErr) {
			return config{}, fmt.Errorf("invalid config JSON at byte %d", syntaxErr.Offset)
		}
		return config{}, errors.New("invalid config JSON: expected an object with a connections array of profiles")
	}
	if cfg == nil {
		return config{}, errors.New("invalid config JSON: expected an object, not null")
	}
	return normalizeConfig(*cfg)
}

func normalizeConfig(cfg config) (config, error) {
	normalized := config{Connections: make([]profile, 0, len(cfg.Connections))}
	names := make(map[string]int, len(cfg.Connections))
	for i, p := range cfg.Connections {
		p, err := normalizeProfile(p)
		if err != nil {
			return config{}, fmt.Errorf("connection %d: %w", i+1, err)
		}
		if previous, exists := names[p.Name]; exists {
			return config{}, fmt.Errorf("connection %d: duplicate name (also used by connection %d)", i+1, previous)
		}
		names[p.Name] = i + 1
		normalized.Connections = append(normalized.Connections, p)
	}
	return normalized, nil
}

func saveConfig(path string, cfg config) error {
	persistent := config{Connections: make([]profile, 0, len(cfg.Connections))}
	for _, p := range cfg.Connections {
		if !p.transient {
			persistent.Connections = append(persistent.Connections, p)
		}
	}
	persistent, err := normalizeConfig(persistent)
	if err != nil {
		return err
	}
	data, err := json.MarshalIndent(persistent, "", "  ")
	if err != nil {
		return errors.New("encode config: invalid profile data")
	}
	data = append(data, '\n')
	dir := filepath.Dir(path)
	if err := os.MkdirAll(dir, 0o700); err != nil {
		return fmt.Errorf("create config directory: %w", err)
	}
	file, err := os.CreateTemp(dir, ".connections-*.tmp")
	if err != nil {
		return fmt.Errorf("create temporary config: %w", err)
	}
	defer func() {
		file.Close()
		os.Remove(file.Name())
	}()
	if err := file.Chmod(0o600); err != nil {
		return fmt.Errorf("set config permissions: %w", err)
	}
	if _, err := file.Write(data); err != nil {
		return fmt.Errorf("write config: %w", err)
	}
	if err := file.Sync(); err != nil {
		return fmt.Errorf("sync config: %w", err)
	}
	if err := file.Close(); err != nil {
		return fmt.Errorf("close config: %w", err)
	}
	if err := os.Rename(file.Name(), path); err != nil {
		return fmt.Errorf("replace config: %w", err)
	}
	return nil
}

func normalizeProfile(p profile) (profile, error) {
	if !utf8.ValidString(p.Name) || strings.ContainsFunc(p.Name, unicode.IsControl) {
		return profile{}, errors.New("profile name must be valid text without control characters")
	}
	p.Name = strings.TrimSpace(p.Name)
	if p.Name == "" {
		return profile{}, errors.New("profile name must not be empty")
	}
	if strings.ContainsAny(p.PasswordEnv, "=\x00") || strings.ContainsFunc(p.PasswordEnv, unicode.IsControl) {
		return profile{}, errors.New("password_env must be an environment variable name without '=' or control characters")
	}
	p.URL = strings.TrimSpace(p.URL)
	if !strings.HasPrefix(p.URL, "postgres://") && !strings.HasPrefix(p.URL, "postgresql://") {
		return profile{}, errors.New("connection URL must start with postgres:// or postgresql://; keyword DSNs are not supported")
	}
	u, err := url.Parse(p.URL)
	if err != nil {
		return profile{}, errors.New("invalid PostgreSQL URL")
	}
	if strings.Contains(p.URL, "#") {
		return profile{}, errors.New("PostgreSQL URL must not contain a fragment")
	}
	query, err := url.ParseQuery(u.RawQuery)
	if err != nil {
		return profile{}, errors.New("invalid PostgreSQL URL query parameters")
	}
	for key := range query {
		lower := strings.ToLower(key)
		if key != "password" && (strings.Contains(lower, "password") || strings.Contains(lower, "secret") || strings.Contains(lower, "token")) {
			return profile{}, errors.New("URL query credentials other than password are not supported; use environment variables or credential files")
		}
	}
	changed := false
	if embedded, present := u.User.Password(); present {
		p.password = embedded
		u.User = url.User(u.User.Username())
		changed = true
	}
	if passwords, present := query["password"]; present {
		// Like pgx, the first query value overrides a userinfo password, even if empty.
		p.password = passwords[0]
		parts := strings.Split(u.RawQuery, "&")
		kept := parts[:0]
		for _, part := range parts {
			key, _, _ := strings.Cut(part, "=")
			key, _ = url.QueryUnescape(key) // ParseQuery already validated the encoding.
			if key != "password" {
				kept = append(kept, part)
			}
		}
		u.RawQuery = strings.Join(kept, "&")
		changed = true
	}
	if changed {
		p.URL = u.String()
	}
	// Never wrap parser errors: pgx and net/url errors can contain credentials.
	if _, err := pgx.ParseConfig(p.URL); err != nil {
		return profile{}, errors.New("invalid PostgreSQL URL or pgx environment configuration")
	}
	return p, nil
}

func environmentProfile() (profile, bool, error) {
	raw := os.Getenv("DATABASE_URL")
	if raw == "" {
		return profile{}, false, nil
	}
	p, err := normalizeProfile(profile{Name: "DATABASE_URL", URL: raw, transient: true})
	if err != nil {
		return profile{}, true, fmt.Errorf("DATABASE_URL: %w", err)
	}
	return p, true, nil
}

func profileConnConfig(p profile, password string) (*pgx.ConnConfig, error) {
	conn, err := pgx.ParseConfig(p.URL)
	if err != nil {
		return nil, errors.New("invalid PostgreSQL URL or pgx environment configuration")
	}
	switch {
	case password != "":
		conn.Password = password
	case p.password != "":
		conn.Password = p.password
	case p.PasswordEnv != "":
		value, present := os.LookupEnv(p.PasswordEnv)
		if !present {
			return nil, errors.New("password_env environment variable is not set")
		}
		conn.Password = value
	}
	return conn, nil
}
