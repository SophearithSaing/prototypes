# Idiomatic Go Audit

Audited the current working tree for correctness, API design, resource lifecycle, error handling, concurrency, testing, tooling, and standard Go conventions.

## High Severity

### 1. Signal-driven shutdown can lose unsaved drafts

Bubble Tea consumes `QuitMsg` and `InterruptMsg` without calling `Update`, while `run` discards the final model returned by `Program.Run`. SIGTERM, non-TTY SIGINT, or external termination therefore bypasses the save in the `Ctrl+C` handler.

Retrieve the final model and attempt a final save, combining run and save errors when both occur.

References: `main.go:30-33`, `model.go:163-170`

### 2. Bracketed paste bypasses autosave tracking

`tea.PasteMsg` changes the textarea through the generic update path, but `changed()` is only called for `tea.KeyPressMsg`. Pasted text remains unsaved until another edit or explicit quit.

Compare editor content before and after every message forwarded to the textarea.

References: `model.go:125-160`, `model.go:195-202`

### 3. Export can corrupt an existing file on write failure

`os.WriteFile` truncates an existing destination before writing. Disk-full, interruption, or other I/O failures can therefore destroy the previous file.

Define the overwrite policy and use either exclusive creation or same-directory temporary-file replacement.

References: `model.go:461-472`

## Medium Severity

### 4. Filesystem I/O blocks Bubble Tea's event loop

Autosave performs write, sync, close, and rename synchronously inside `Update`; export also writes synchronously. Slow filesystems can freeze input and rendering.

Perform I/O in `tea.Cmd` functions and serialize save results by revision so stale saves cannot complete after newer ones.

References: `model.go:131-139`, `model.go:214-238`, `store.go:57-94`

### 5. Transient autosave failures are not retried

After a failed autosave, no retry is scheduled. If typing stops, the newest revision remains unsaved.

Add bounded retry with backoff while retaining the revision being saved.

References: `model.go:131-139`

### 6. Concurrent instances silently overwrite each other

Each process loads and replaces the complete session independently. An older process can overwrite newer drafts written by another instance.

Use an application-lifetime lock or conflict detection.

References: `main.go:20-31`, `store.go:41-94`

### 7. Focus commands are discarded

`textarea.Model.Focus()` returns a command needed to restart cursor blinking, but `focusActive` ignores it. Switching tabs or dismissing overlays can leave a static cursor.

Return and batch focus commands from focus transitions.

References: `model.go:172-192`, `model.go:246-299`

### 8. Persistence tests cover mainly happy paths

There are no tests for pasted-content autosave, final shutdown saves, stale timers, repeated replacement, failed writes, malformed JSON, or preserving an existing export after failure. Current statement coverage is 54.4%.

References: `model_test.go:33-82`, `store_test.go:10-51`

## Low Severity

### 9. `expandHome("~")` produces `$HOME/~`

Handle the exact `"~"` case separately and return home-directory lookup errors rather than silently using the original path.

References: `model.go:475-481`

### 10. Unicode tab titles can overflow terminal width

`truncate` counts runes rather than display cells. CJK and other wide graphemes can exceed the calculated header space.

References: `model.go:342-350`, `model.go:387-423`, `model.go:500-509`

### 11. `Ctrl+C` behavior contradicts the help text

In help and export modes, `Ctrl+C` dismisses the modal rather than saving and quitting. Either handle it globally or document the modal behavior.

References: `model.go:141-151`, `model.go:206-213`, `model.go:446-454`

### 12. Explicit `WithInput(os.Stdin)` disables Bubble Tea's controlling-TTY fallback

Redirected stdin can cause an interactive launch to exit instead of opening the controlling TTY. Keep injected input for tests, but use Bubble Tea's default input in production.

References: `main.go:12-13`, `main.go:30-32`

## Idiomatic Practices Already Present

- Clear package-local naming and an appropriately small command layout.
- No unnecessary interfaces or package fragmentation.
- Errors generally retain their causes through `%w`.
- Session writes use same-directory temporary files, restrictive permissions, `Sync`, and rename.
- Tests use `t.TempDir` and standard-library assertions.
- Dependencies and `go.mod` are tidy.

## Verification

The following checks passed:

- `go test -count=1 ./...`
- `go test -race -count=1 ./...`
- `go vet ./...`
- `staticcheck ./...`
- `gofmt -d .`
- `go mod tidy -diff`
- `go mod verify`
- `govulncheck ./...`
