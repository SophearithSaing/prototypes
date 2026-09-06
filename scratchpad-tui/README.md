# Scratchpad

A keyboard-first terminal scratchpad for quickly capturing thoughts. Notes live in tabs and are automatically restored the next time the app opens. Edit Markdown directly or switch to a rendered view powered by Glamour. Any tab can be exported to a regular file when it is ready to keep.

## Run

Go 1.25.8 or newer is required. The module selects Go 1.26.6 for security fixes; Go downloads it automatically with the default `GOTOOLCHAIN=auto` setting.

```sh
go run .
```

To install it on your `PATH`:

```sh
go install .
```

## Keys

| Key                          | Action                                      |
| ---------------------------- | ------------------------------------------- |
| `Ctrl+N`                     | Open a new tab                              |
| `Ctrl+W`                     | Close the current tab                       |
| `Ctrl+Left`, `Ctrl+Right`    | Switch tabs                                 |
| `Ctrl+[`, `Ctrl+]`           | Switch tabs (terminal-friendly alternative) |
| `Ctrl+S`                     | Export the current note to a file           |
| `Ctrl+P`                     | Toggle editing / rendered Markdown view     |
| `Esc`                        | Return from view mode to editing            |
| `Up`, `Down`, `PgUp`, `PgDn` | Scroll the rendered view                    |
| `F1`                         | Show all shortcuts                          |
| `Ctrl+C`                     | Save drafts and quit                        |

View mode is read-only. Switching tabs keeps you in view mode; opening a new tab returns to editing. Export writes the original Markdown, not the rendered terminal output, and returns to the previous mode.

## Draft Storage

Drafts are stored in the operating system's user config directory under `scratchpad/` (usually `~/.config/scratchpad/` on Linux). Set `SCRATCHPAD_STATE_DIR` to use a different state directory.

- `note-1.md`, `note-2.md`, etc. contain each tab's plain Markdown text, with stable filenames based on tab IDs.
- `session.json` is a small metadata index for tab order, titles, the active tab, and the next ID. It does not contain note text.
- Closing a tab removes its draft file on the next save. Export it first if you want a separate permanent copy.
- Files are private (`0600`) and each file is replaced atomically. A save across multiple files is not a single atomic transaction.

You can edit a draft file while Scratchpad is closed; its contents are read on the next launch. Do not modify the draft files while the app is running, since autosave can overwrite those changes. These files stay in the config directory, not the system temp directory.
