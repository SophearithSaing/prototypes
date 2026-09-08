package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"os"
	"path/filepath"
	"reflect"
	"runtime"
	"strings"
	"testing"
	"time"
)

func isolateConfigEnvironment(t *testing.T) {
	t.Helper()
	for _, entry := range os.Environ() {
		key, _, _ := strings.Cut(entry, "=")
		if strings.HasPrefix(key, "PG") {
			t.Setenv(key, "")
		}
	}
	t.Setenv("PGHOST", "localhost")
	t.Setenv("PGPORT", "5432")
	t.Setenv("PGUSER", "user")
	t.Setenv("PGDATABASE", "app")
	t.Setenv("PGSSLMODE", "disable")
	t.Setenv("PGPASSFILE", filepath.Join(t.TempDir(), "missing.pgpass"))
	t.Setenv("DATABASE_URL", "")
}

func TestDefaultConfigPath(t *testing.T) {
	t.Setenv("XDG_CONFIG_HOME", t.TempDir())
	dir, err := os.UserConfigDir()
	if err != nil {
		t.Fatal(err)
	}
	got, err := defaultConfigPath()
	if err != nil || got != filepath.Join(dir, "db-client", "connections.json") {
		t.Fatalf("defaultConfigPath() = %q, %v", got, err)
	}
	if runtime.GOOS == "linux" {
		if _, err := os.Stat(filepath.Dir(got)); !errors.Is(err, os.ErrNotExist) {
			t.Fatalf("defaultConfigPath created a directory: %v", err)
		}
		t.Setenv("XDG_CONFIG_HOME", "")
		t.Setenv("HOME", "")
		if _, err := defaultConfigPath(); err == nil {
			t.Fatal("expected an error when no user config directory is available")
		}
	}
}

func TestLoadConfigMissing(t *testing.T) {
	path := filepath.Join(t.TempDir(), "absent", "connections.json")
	got, err := loadConfig(path)
	if err != nil || len(got.Connections) != 0 {
		t.Fatalf("loadConfig(missing) = %#v, %v", got, err)
	}
	if _, err := os.Stat(filepath.Dir(path)); !errors.Is(err, os.ErrNotExist) {
		t.Fatalf("loadConfig created a directory: %v", err)
	}
	if _, err := loadConfig(t.TempDir()); err == nil {
		t.Fatal("expected a read error for a directory")
	}
}

func TestConfigRoundTrip(t *testing.T) {
	isolateConfigEnvironment(t)
	path := filepath.Join(t.TempDir(), "connections.json")
	cfg := config{Connections: []profile{
		{Name: "  Local  ", URL: "  postgres://user@localhost/app?application_name=a%20b&sslmode=disable  ", PasswordEnv: "DB_CLIENT_TEST_PASSWORD"},
		{Name: "Other", URL: "postgresql:///other?host=%2Ftmp&sslmode=disable"},
	}}
	before := append([]profile(nil), cfg.Connections...)
	if err := saveConfig(path, cfg); err != nil {
		t.Fatal(err)
	}
	if !reflect.DeepEqual(cfg.Connections, before) {
		t.Fatal("saveConfig mutated its input")
	}
	got, err := loadConfig(path)
	if err != nil {
		t.Fatal(err)
	}
	want := config{Connections: []profile{
		{Name: "Local", URL: "postgres://user@localhost/app?application_name=a%20b&sslmode=disable", PasswordEnv: "DB_CLIENT_TEST_PASSWORD"},
		before[1],
	}}
	if !reflect.DeepEqual(got, want) {
		t.Fatalf("round trip = %#v; want %#v", got, want)
	}
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	if strings.Count(string(data), `"password_env"`) != 1 {
		t.Fatalf("optional password_env was not omitted: %s", data)
	}
	if err := saveConfig(path, config{}); err != nil {
		t.Fatal(err)
	}
	if got, err := loadConfig(path); err != nil || len(got.Connections) != 0 {
		t.Fatalf("empty round trip = %#v, %v", got, err)
	}
}

func TestConfigPermissionsAndAtomicReplace(t *testing.T) {
	if runtime.GOOS == "windows" {
		t.Skip("POSIX permissions and inode identity")
	}
	isolateConfigEnvironment(t)
	root := t.TempDir()
	if err := os.Chmod(root, 0o755); err != nil {
		t.Fatal(err)
	}
	path := filepath.Join(root, "one", "two", "connections.json")
	if err := saveConfig(path, config{}); err != nil {
		t.Fatal(err)
	}
	for name, want := range map[string]os.FileMode{root: 0o755, filepath.Join(root, "one"): 0o700, filepath.Dir(path): 0o700, path: 0o600} {
		info, err := os.Stat(name)
		if err != nil {
			t.Fatal(err)
		}
		if got := info.Mode().Perm(); got != want {
			t.Errorf("%s permissions = %o; want %o", name, got, want)
		}
	}
	if err := os.Chmod(path, 0o644); err != nil {
		t.Fatal(err)
	}
	oldInfo, err := os.Stat(path)
	if err != nil {
		t.Fatal(err)
	}
	if err := saveConfig(path, config{Connections: []profile{{Name: "Local", URL: "postgres://user@localhost/app"}}}); err != nil {
		t.Fatal(err)
	}
	newInfo, err := os.Stat(path)
	if err != nil {
		t.Fatal(err)
	}
	if os.SameFile(oldInfo, newInfo) || newInfo.Mode().Perm() != 0o600 {
		t.Fatal("save must replace the file atomically with a new 0600 file")
	}
	entries, err := os.ReadDir(filepath.Dir(path))
	if err != nil || len(entries) != 1 {
		t.Fatalf("unexpected temporary files after save: %v, %v", entries, err)
	}
}

func TestLoadConfigInvalid(t *testing.T) {
	isolateConfigEnvironment(t)
	for _, data := range []string{
		"", "{", "null", "[]", "{} {}",
		`{"connections":"postgres://user:secret@localhost/app"}`,
		`{"connections":[null]}`,
		`{"connections":[{"name":false,"url":"postgres://user:secret@localhost/app"}]}`,
		`{"connections":[{"name":"Local","url":"postgres://user:secret@localhost/app"}`,
		`{"connections":[{"name":"","url":"postgres://user:secret@localhost/app"}]}`,
		`{"connections":[{"name":"Local","url":"postgres://user:secret@localhost/app?sslmode=invalid"}]}`,
	} {
		path := filepath.Join(t.TempDir(), "connections.json")
		if err := os.WriteFile(path, []byte(data), 0o600); err != nil {
			t.Fatal(err)
		}
		if _, err := loadConfig(path); err == nil {
			t.Errorf("loadConfig accepted %q", data)
		} else if strings.Contains(err.Error(), "secret") || strings.Contains(err.Error(), "postgres://user") {
			t.Errorf("loadConfig exposed credentials: %v", err)
		}
	}
}

func TestConfigDuplicateNamesAndFailedSave(t *testing.T) {
	isolateConfigEnvironment(t)
	path := filepath.Join(t.TempDir(), "connections.json")
	original := []byte("{\"connections\": []}\n")
	if err := os.WriteFile(path, original, 0o600); err != nil {
		t.Fatal(err)
	}
	cfg := config{Connections: []profile{
		{Name: "Local", URL: "postgres://user@localhost/app"},
		{Name: " Local ", URL: "postgres://user:secret@localhost/other"},
	}}
	if err := saveConfig(path, cfg); err == nil || !strings.Contains(err.Error(), "connection 2: duplicate name") {
		t.Fatalf("expected a duplicate name error, got %v", err)
	}
	data, err := os.ReadFile(path)
	if err != nil || !bytes.Equal(data, original) {
		t.Fatalf("failed save modified original: %q, %v", data, err)
	}
	data, err = json.Marshal(cfg)
	if err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(path, data, 0o600); err != nil {
		t.Fatal(err)
	}
	if _, err := loadConfig(path); err == nil || !strings.Contains(err.Error(), "duplicate name") {
		t.Fatalf("expected duplicate name on load, got %v", err)
	}
	root := t.TempDir()
	if err := os.Mkdir(filepath.Join(root, "connections.json"), 0o700); err != nil {
		t.Fatal(err)
	}
	if err := saveConfig(filepath.Join(root, "connections.json"), config{}); err == nil {
		t.Fatal("expected rename failure when destination is a directory")
	}
	entries, err := os.ReadDir(root)
	if err != nil || len(entries) != 1 {
		t.Fatalf("failed save left temporary files: %v, %v", entries, err)
	}
}

func TestNormalizeProfileInvalid(t *testing.T) {
	isolateConfigEnvironment(t)
	for _, name := range []string{"", " \t ", "Local\n", "a\x1b[2J", "a\x7fb", "a\u009bb", "\xff"} {
		if _, err := normalizeProfile(profile{Name: name, URL: "postgres://user:secret@localhost/app"}); err == nil || !strings.Contains(err.Error(), "name") {
			t.Errorf("expected invalid name error for %q, got %v", name, err)
		}
	}
	for _, raw := range []string{
		"", "host=localhost user=user password=secret", "https://user:secret@localhost/app", "postgres:app",
		"postgres://user:secret%zz@localhost/app", "postgres://user:secret@localhost:99999/app",
		"postgres://user:secret@localhost/app?sslmode=secret", "postgres://user:secret@localhost/app?connect_timeout=secret",
		"postgres://user@localhost/app?password=secret%zz", "postgres://user@localhost/app?password=secret;sslmode=disable",
		"postgres://user@localhost/app?sslpassword=secret", "postgres://user@localhost/app?ssl%70assword=secret",
		"postgres://user@localhost/app?PASSWORD=secret", "postgres://user@localhost/app?client_secret=secret",
		"postgres://user@localhost/app?access_token=secret", "postgres://user@localhost/app#secret",
	} {
		got, err := normalizeProfile(profile{Name: "Local", URL: raw})
		if err == nil {
			t.Errorf("normalizeProfile accepted %q", raw)
			continue
		}
		if got != (profile{}) || strings.Contains(err.Error(), "secret") || (raw != "" && strings.Contains(err.Error(), raw)) {
			t.Errorf("normalization error exposed input: %#v, %v", got, err)
		}
	}
	for _, name := range []string{"PASSWORD=value", "PASSWORD\x00", "PASSWORD\n"} {
		if _, err := normalizeProfile(profile{Name: "Local", URL: "postgres://localhost/app", PasswordEnv: name}); err == nil || !strings.Contains(err.Error(), "password_env") {
			t.Errorf("expected invalid password_env for %q, got %v", name, err)
		}
	}
}

func TestNormalizeProfilePasswords(t *testing.T) {
	isolateConfigEnvironment(t)
	t.Setenv("PGPASSWORD", "default-not-embedded")
	for _, tc := range []struct {
		name, raw, wantURL, wantPassword string
	}{
		{"userinfo", "postgres://user:p%40ss%3Aword@localhost/app", "postgres://user@localhost/app", "p@ss:word"},
		{"query", "postgres://user@localhost/app?application_name=a%20b&password=p%2Bss+word&sslmode=disable", "postgres://user@localhost/app?application_name=a%20b&sslmode=disable", "p+ss word"},
		{"both", "postgres://user:old@localhost/app?password=new", "postgres://user@localhost/app", "new"},
		{"repeated", "postgres://user@localhost/app?password=first&password=second", "postgres://user@localhost/app", "first"},
		{"encoded key", "postgres://user@localhost/app?pass%77ord=embedded", "postgres://user@localhost/app", "embedded"},
		{"empty userinfo", "postgres://user:@localhost/app", "postgres://user@localhost/app", ""},
		{"empty query", "postgres://user:old@localhost/app?password=", "postgres://user@localhost/app", ""},
		{"no password", "postgresql://user@localhost/app?application_name=a%20b&sslmode=disable", "postgresql://user@localhost/app?application_name=a%20b&sslmode=disable", "in-memory"},
	} {
		t.Run(tc.name, func(t *testing.T) {
			got, err := normalizeProfile(profile{Name: " Local ", URL: tc.raw, PasswordEnv: "DB_CLIENT_TEST_PASSWORD", password: "in-memory", transient: true})
			if err != nil {
				t.Fatal(err)
			}
			want := profile{Name: "Local", URL: tc.wantURL, PasswordEnv: "DB_CLIENT_TEST_PASSWORD", password: tc.wantPassword, transient: true}
			if got != want {
				t.Fatalf("normalizeProfile() = %#v; want %#v", got, want)
			}
			if again, err := normalizeProfile(got); err != nil || again != got {
				t.Fatalf("normalization is not idempotent: %#v, %v", again, err)
			}
		})
	}
}

func TestLoadedPasswordsStayInMemory(t *testing.T) {
	isolateConfigEnvironment(t)
	path := filepath.Join(t.TempDir(), "connections.json")
	original := []byte(`{"connections":[{"name":"Local","url":"postgres://user:userinfo-secret@localhost/app?password=query-secret&application_name=example"}]}`)
	if err := os.WriteFile(path, original, 0o600); err != nil {
		t.Fatal(err)
	}
	cfg, err := loadConfig(path)
	if err != nil {
		t.Fatal(err)
	}
	if len(cfg.Connections) != 1 || cfg.Connections[0].password != "query-secret" || strings.Contains(cfg.Connections[0].URL, "secret") {
		t.Fatalf("embedded password not normalized: %#v", cfg)
	}
	data, err := os.ReadFile(path)
	if err != nil || !bytes.Equal(data, original) {
		t.Fatalf("loadConfig must not rewrite the file: %q, %v", data, err)
	}
	encoded, err := json.Marshal(cfg)
	if err != nil || bytes.Contains(encoded, []byte("secret")) || bytes.Contains(encoded, []byte(`"password"`)) || bytes.Contains(encoded, []byte(`"transient"`)) {
		t.Fatalf("unexported fields were encoded: %s, %v", encoded, err)
	}
	if err := saveConfig(path, cfg); err != nil {
		t.Fatal(err)
	}
	data, err = os.ReadFile(path)
	if err != nil || bytes.Contains(data, []byte("secret")) || bytes.Contains(data, []byte("password")) {
		t.Fatalf("saved config contains embedded passwords: %s, %v", data, err)
	}
	if cfg.Connections[0].password != "query-secret" {
		t.Fatal("saveConfig discarded the caller's in-memory password")
	}
	loaded, err := loadConfig(path)
	if err != nil || loaded.Connections[0].password != "" {
		t.Fatalf("saved password survived reload: %#v, %v", loaded, err)
	}
}

func TestProfileConnConfigPasswords(t *testing.T) {
	isolateConfigEnvironment(t)
	t.Setenv("PGPASSWORD", "pg-default")
	t.Setenv("DB_CLIENT_TEST_PASSWORD", "env-password")
	t.Setenv("DB_CLIENT_TEST_EMPTY", "")
	t.Setenv("DB_CLIENT_TEST_MISSING", "")
	if err := os.Unsetenv("DB_CLIENT_TEST_MISSING"); err != nil {
		t.Fatal(err)
	}
	for _, tc := range []struct {
		name, explicit, memory, env, want string
		wantErr                           bool
	}{
		{"explicit", "explicit", "memory", "DB_CLIENT_TEST_PASSWORD", "explicit", false},
		{"memory", "", "memory", "DB_CLIENT_TEST_PASSWORD", "memory", false},
		{"environment", "", "", "DB_CLIENT_TEST_PASSWORD", "env-password", false},
		{"empty environment overrides defaults", "", "", "DB_CLIENT_TEST_EMPTY", "", false},
		{"pgx defaults", "", "", "", "pg-default", false},
		{"missing environment", "", "", "DB_CLIENT_TEST_MISSING", "", true},
		{"explicit bypasses missing environment", "explicit", "", "DB_CLIENT_TEST_MISSING", "explicit", false},
		{"memory bypasses missing environment", "", "memory", "DB_CLIENT_TEST_MISSING", "memory", false},
	} {
		t.Run(tc.name, func(t *testing.T) {
			p := profile{Name: "Local", URL: "postgres://user@localhost:5432/app?connect_timeout=3", PasswordEnv: tc.env, password: tc.memory}
			got, err := profileConnConfig(p, tc.explicit)
			if tc.wantErr {
				if err == nil || got != nil || !strings.Contains(err.Error(), "password_env") {
					t.Fatalf("expected missing environment error, got %v", err)
				}
				return
			}
			if err != nil {
				t.Fatal(err)
			}
			if got.Password != tc.want || got.ConnectTimeout != 3*time.Second || got.ConnString() != p.URL {
				t.Fatalf("password = %q, timeout = %v, URL = %q", got.Password, got.ConnectTimeout, got.ConnString())
			}
		})
	}
	t.Run("pgpass", func(t *testing.T) {
		t.Setenv("PGPASSWORD", "")
		path := filepath.Join(t.TempDir(), "pgpass")
		if err := os.WriteFile(path, []byte("localhost:5432:app:user:pgpass-password\n"), 0o600); err != nil {
			t.Fatal(err)
		}
		t.Setenv("PGPASSFILE", path)
		p := profile{Name: "Local", URL: "postgres://user@localhost:5432/app"}
		got, err := profileConnConfig(p, "")
		if err != nil || got.Password != "pgpass-password" {
			t.Fatalf("pgpass resolution failed: %v", err)
		}
		p, err = normalizeProfile(p)
		if err != nil || p.password != "" {
			t.Fatalf("normalization captured a pgx default password: %#v, %v", p, err)
		}
	})
	for _, raw := range []string{"postgres://user:secret%zz@localhost/app", "postgres://user:secret@localhost/app?sslmode=secret"} {
		if _, err := profileConnConfig(profile{URL: raw}, "override-secret"); err == nil || strings.Contains(err.Error(), "secret") || strings.Contains(err.Error(), raw) {
			t.Fatalf("connection parse error is absent or unsafe: %v", err)
		}
	}
}

func TestEnvironmentProfileAndTransientSave(t *testing.T) {
	isolateConfigEnvironment(t)
	if p, present, err := environmentProfile(); err != nil || present || p != (profile{}) {
		t.Fatalf("empty DATABASE_URL = %#v, %v, %v", p, present, err)
	}
	for _, raw := range []string{"   ", "postgres://user:secret@localhost/app?sslmode=secret"} {
		t.Setenv("DATABASE_URL", raw)
		p, present, err := environmentProfile()
		if err == nil || !present || p != (profile{}) || strings.Contains(err.Error(), "secret") {
			t.Fatalf("invalid DATABASE_URL error is absent or unsafe: %#v, %v, %v", p, present, err)
		}
	}
	t.Setenv("DATABASE_URL", " postgres://user:environment-secret@localhost/app ")
	p, present, err := environmentProfile()
	if err != nil || !present || p.Name != "DATABASE_URL" || !p.transient || p.password != "environment-secret" || p.URL != "postgres://user@localhost/app" {
		t.Fatalf("DATABASE_URL profile = %#v, %v, %v", p, present, err)
	}
	persistent := profile{Name: "DATABASE_URL", URL: "postgres://user:embedded-secret@localhost/other", password: "private-secret"}
	cfg := config{Connections: []profile{p, persistent, {URL: "invalid-transient-secret", transient: true}}}
	before := append([]profile(nil), cfg.Connections...)
	path := filepath.Join(t.TempDir(), "connections.json")
	if err := saveConfig(path, cfg); err != nil {
		t.Fatal(err)
	}
	if !reflect.DeepEqual(cfg.Connections, before) {
		t.Fatal("saveConfig mutated transient or in-memory fields")
	}
	loaded, err := loadConfig(path)
	persistent.URL = "postgres://user@localhost/other"
	persistent.password = ""
	if err != nil || !reflect.DeepEqual(loaded.Connections, []profile{persistent}) {
		t.Fatalf("transient profile persisted: %#v, %v", loaded, err)
	}
	data, err := os.ReadFile(path)
	if err != nil || bytes.Contains(data, []byte("secret")) || bytes.Contains(data, []byte("transient")) {
		t.Fatalf("saved config exposed private state: %s, %v", data, err)
	}
}
