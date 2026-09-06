# Idiomatic Go Audit

Audited the current working tree for correctness, API design, resource lifecycle, error handling, concurrency, testing, tooling, and standard Go conventions.

## High Severity

### 1. Signal-driven shutdown can lose unsaved drafts

Bubble Tea consumes `QuitMsg` and `InterruptMsg` without calling `Update`, while `run` discards the final model returned by `Program.Run`. SIGTERM, non-TTY SIGINT, or external termination therefore bypasses the save in the `Ctrl+C` handler.

Retrieve the final model and attempt a final save, combining run and save errors when both occur.

References: `main.go:20-34`, `model.go:185-192`

### 2. Export can corrupt an existing file on write failure

`os.WriteFile` truncates an existing destination before writing. Disk-full, interruption, or other I/O failures can therefore destroy the previous file.

Define the overwrite policy and use either exclusive creation or same-directory temporary-file replacement.

References: `model.go:258-290`, `model.go:573-586`

## Medium Severity

### 3. Filesystem I/O blocks Bubble Tea's event loop

Autosave performs write, sync, close, and rename synchronously inside `Update`; export also writes synchronously. Slow filesystems can freeze input and rendering.

Perform I/O in `tea.Cmd` functions and serialize save results by revision so stale saves cannot complete after newer ones.

References: `model.go:147-156`, `model.go:258-290`, `model.go:415-426`, `store.go:93-141`, `store.go:143-263`

### 4. Transient autosave failures are not retried

After a failed autosave, no retry is scheduled. If typing stops, the newest revision remains unsaved.

Add bounded retry with backoff while retaining the revision being saved.

References: `model.go:147-156`, `model.go:408-413`

### 5. Concurrent instances silently overwrite each other

Each process loads and replaces the complete session independently. An older process can overwrite newer drafts written by another instance.

Use an application-lifetime lock or conflict detection.

References: `main.go:20-34`, `model.go:415-426`, `store.go:39-58`, `store.go:143-227`

### 6. Some focus commands are discarded

`focusActive` returns a command needed to restart cursor blinking, but the new-tab path, `closeActive`, and successful export path discard it. Switching tabs and dismissing overlays now return the command correctly.

Return and batch focus commands from focus transitions.

References: `model.go:193-200`, `model.go:258-290`, `model.go:305-321`, `model.go:353-364`

### 7. Persistence test gaps remain

Persistence tests cover pasted-content autosave, repeated replacement, failed writes, malformed JSON, rollback, and recovery. Final shutdown saves, stale autosave timers, autosave retry, and preserving an existing export after failure remain untested. Current statement coverage is 82.8%.

References: `main_test.go:10-20`, `model_test.go:51-86`, `model_test.go:262-282`, `store_test.go:13-445`

## Low Severity

### 8. `expandHome("~")` produces `$HOME/~`

Handle the exact `"~"` case separately and return home-directory lookup errors rather than silently using the original path.

References: `model.go:588-596`

### 9. Unicode tab titles can overflow terminal width

`truncate` counts runes rather than display cells. CJK and other wide graphemes can exceed the calculated header space.

References: `model.go:434-443`, `model.go:485-522`, `model.go:615-625`

### 10. `Ctrl+C` behavior contradicts the help text

In help and export modes, `Ctrl+C` dismisses the modal rather than saving and quitting. Either handle it globally or document the modal behavior.

References: `model.go:157-170`, `model.go:185-192`, `model.go:258-265`, `model.go:553-565`

### 11. Explicit `WithInput(os.Stdin)` disables Bubble Tea's controlling-TTY fallback

Redirected stdin can cause an interactive launch to exit instead of opening the controlling TTY. Keep injected input for tests, but use Bubble Tea's default input in production.

References: `main.go:11-16`, `main.go:19-33`

## Resolved

### Bracketed paste bypassed autosave tracking

All messages forwarded to the textarea now compare content before and after the update and schedule autosave when it changes. A regression test covers pasted Markdown followed by a mode change.

References: `model.go:137-182`, `model.go:241-255`, `model.go:408-413`, `model_test.go:262-282`

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
- `go test -cover ./...`
- `go test -race -count=1 ./...`
- `go vet ./...`
- `staticcheck ./...`
- `gofmt -d .`
- `go mod tidy -diff`
- `go mod verify`
- `govulncheck ./...`
