# Scratchpad

A keyboard-first terminal scratchpad for quickly capturing thoughts. Notes live in tabs and are automatically restored the next time the app opens. Any tab can be exported to a regular file when it is ready to keep.

## Run

Go 1.25 or newer is required.

```sh
go run .
```

To install it on your `PATH`:

```sh
go install .
```

## Keys

| Key                       | Action                                      |
| ------------------------- | ------------------------------------------- |
| `Ctrl+N`                  | Open a new tab                              |
| `Ctrl+W`                  | Close the current tab                       |
| `Ctrl+Left`, `Ctrl+Right` | Switch tabs                                 |
| `Ctrl+[`, `Ctrl+]`        | Switch tabs (terminal-friendly alternative) |
| `Ctrl+S`                  | Export the current note to a file           |
| `F1`                      | Show all shortcuts                          |
| `Ctrl+C`                  | Save drafts and quit                        |

Draft state is stored in the operating system's user config directory under `scratchpad/session.json`. Set `SCRATCHPAD_STATE_DIR` to use a different state directory.
