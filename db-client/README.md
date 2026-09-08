# db-client

A minimal Go PostgreSQL terminal client: saved connection profiles, a multiline
SQL editor, and scrollable results. Requires Go 1.25+, a terminal at least 48 x 18,
and an existing PostgreSQL server. The client does not create or start a server.

## Start

```sh
go run .
# Or build and run:
go build -o db-client .
./db-client
```

Press `n` to create a profile, or supply a transient startup profile:

```sh
DATABASE_URL='postgres://user@localhost:5432/app?sslmode=disable' go run .
```

`DATABASE_URL` appears in the connection picker; select it and press Enter.
If no password is available, a masked prompt appears. Enter a session-only
password, or leave it blank to try pgx defaults, including `.pgpass` or
passwordless authentication. `PGPASSWORD` is also supported.

## Connections

The new connection form has **Name**, **URL**, **Password (session only)**, and
**Password env** fields. Use Tab / Shift+Tab to move between fields and Ctrl+S
to save and connect. Esc abandons the form or password prompt. A named password
environment variable is optional; it must be set when connecting unless a
session password is supplied.

Profiles use the OS configuration directory:

- Linux: `$XDG_CONFIG_HOME/db-client/connections.json`, or
  `~/.config/db-client/connections.json` when unset.
- macOS: `~/Library/Application Support/db-client/connections.json`.
- Windows: `%AppData%\db-client\connections.json`.

Override the path with `--config /path/to/connections.json`. A missing file is
treated as an empty profile list. Example JSON, with no passwords:

```json
{
  "connections": [
    {
      "name": "local",
      "url": "postgres://user@localhost:5432/app?sslmode=disable",
      "password_env": "LOCAL_PG_PASSWORD"
    }
  ]
}
```

Omit `password_env` to use the prompt or pgx defaults. Only `postgres://` and
`postgresql://` URLs are accepted, not keyword DSNs. Saved profiles never include
passwords. URI credentials from `DATABASE_URL` are held only in memory, and its
profile is not saved. On Unix, saved config files have mode `0600` and newly
created config directories `0700`; existing directory permissions are unchanged.

For remote servers, use `sslmode=verify-full` and configure a trusted root
certificate. The `sslmode=disable` examples are for trusted local development,
not remote connections.

## Keys

| Context | Keys | Action |
| --- | --- | --- |
| Picker | Up / Down, Enter | Select and connect |
| Picker | `p` | Enter a new session password, overriding other credential sources |
| Picker | `n`, `d` | New profile; delete selected profile with `y` confirmation |
| Form / prompt | Esc | Back without saving / connecting |
| Form | Tab / Shift+Tab, Ctrl+S | Move fields; save and connect |
| Editor | Enter | Insert a newline, not execute |
| Editor / form / prompt | Ctrl+V or terminal paste | Paste text; a delayed Ctrl+V paste is discarded if input/focus changes |
| Editor / results | F5 / Ctrl+R | Execute the whole SQL buffer |
| Editor / results | Tab / Shift+Tab | Switch focus |
| Results | Arrows, PgUp / PgDn | Scroll vertically and horizontally |
| Results | `[` / `]`, `v` | Previous / next result set; toggle full-value view |
| SQL session | Ctrl+O | Open connections; Esc returns without switching |
| Anywhere | Ctrl+C | Cancel busy work, or quit when idle |
| Anywhere | Ctrl+Q | Quit, including while busy |

Full-value view also scrolls horizontally for wide values. The picker additionally
accepts `q` to quit. A `DATABASE_URL` profile cannot be deleted; unset the variable
to remove it on the next launch.

## Execution

Connections have a 10-second context timeout. Queries default to 30 seconds;
use `--timeout 2m` to change this. `--max-rows` defaults to 1000 retained rows
across the entire SQL batch. Both options must be greater than zero. See
`go run . --help` for flags.

Display retention is also bounded to 8 MiB of result data, 4 KiB per cell, and
32 result sets. Clipping and omitted results are marked. Table columns visually
cap at 60 terminal cells; press `v` to inspect the full retained value. SQL NULL
is shown as `<NULL>`, empty strings are blank, and command tags show affected-row
counts. Database control characters are escaped rather than sent to the terminal.

The client continues draining results after a display limit is reached, so later
SQL statements still execute unless stopped by SQL errors or cancellation.
**A display cap is not a SQL LIMIT.** Use SQL `LIMIT` when you want the server to
return fewer rows.

One PostgreSQL session is retained between executions. Explicit `BEGIN`
transactions persist until `COMMIT` or `ROLLBACK`; the header marks open and
failed transactions. Switching connections or closing the client disconnects the
session and rolls back any open transaction. Merely opening the picker does not
disconnect. There are no automatic query retries. Cancellation or timeout can
drop the connection and leave a write's outcome uncertain: verify it before
retrying. Partial batch results do not prove that changes committed.

The embedded editor supports up to 10,000 lines. Input with literal tabs, carriage
returns, other control characters, or the Unicode replacement character is
rejected rather than silently changed by the text widgets. Use spaces for
indentation, LF line endings, and SQL escape syntax such as `E'a\tb'` for a tab
inside a SQL value. Passwords containing these characters can use an environment
variable instead of the form.

There is no administration/schema UI, autocomplete, query history, or support for
psql backslash commands. COPY streaming is not implemented and may time out.

## Tests

```sh
go test -race ./...
# Opt in against a disposable PostgreSQL test database:
DB_CLIENT_TEST_DATABASE_URL='postgres://user@localhost/testdb?sslmode=disable' go test -race ./...
```

Default tests do not connect to PostgreSQL or launch an interactive terminal.
Integration tests use only temporary tables and are skipped unless
`DB_CLIENT_TEST_DATABASE_URL` is set. Use a test database, not production.
