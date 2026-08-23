# scratchpad

A lightweight GTK 4 text editor for endless, disposable braindumps. Every tab is
auto-saved in the background and restored the next time the app starts. Notes can
also be exported to ordinary text files whenever you want.

## Features

- Multiple reorderable tabs
- Automatic draft saving after every edit
- Session and active-tab restoration
- Save and Save As to any local file
- Confirmation before an auto-saved tab is permanently removed
- Embedded JetBrains Mono editor font with no system-wide installation
- Adjustable editor text size, remembered between launches

Drafts live in `$XDG_DATA_HOME/scratchpad` (normally
`~/.local/share/scratchpad`). This private app-data folder is created with mode
`0700`.

The editor font is embedded into the executable and registered privately for
the running app. Scratchpad caches a copy under the user's cache directory so
Pango can load it; the system font collection is not modified.

The application icon is embedded as size-specific GTK resources from 16 through
256 pixels, so source-tree runs and high-DPI window switchers do not need to
rescale a single image. `make install` installs the same sizes into the standard
`hicolor` theme and refreshes the desktop caches when their utilities are
available. Maintainers can regenerate the PNG and Windows ICO layers from
`assets/scratchpad.png` with `scripts/generate-icons.py` (requires Pillow).

Desktop shells—especially under Wayland—match taskbar and launcher icons using
the installed desktop entry. Install Scratchpad for the current user with:

```sh
make install-user
```

Then launch **Scratchpad** from the application menu. No administrator access is
required.

## Build

Install a C compiler, `pkg-config`, `make`, and the GTK 4.12 or newer
development package.
For example:

```sh
# Debian / Ubuntu
sudo apt install build-essential pkg-config libgtk-4-dev

# Fedora
sudo dnf install gcc make pkgconf-pkg-config gtk4-devel
```

Then build and run:

```sh
make
make run
```

The repository includes `compile_commands.json`, so Clangd and other compatible
IDE language servers can resolve GTK types and headers. VS Code is configured to
use it automatically. If diagnostics were already open before GTK was installed,
restart the language server or reload the IDE window once.

## Shortcuts

| Shortcut           | Action                                     |
| ------------------ | ------------------------------------------ |
| `Ctrl+N`           | New tab                                    |
| `Ctrl+S`           | Save to the current file, or choose one    |
| `Ctrl+Shift+S`     | Save As                                    |
| `Ctrl+Tab`         | Switch to the next tab                     |
| `Ctrl+Shift+Tab`   | Switch to the previous tab                 |
| `Ctrl+W`           | Remove the current tab (with confirmation) |
| `Ctrl+mouse wheel` | Increase or decrease the editor text size  |
| `Ctrl++`           | Increase the editor text size              |
| `Ctrl+-`           | Decrease the editor text size              |
| `Ctrl+0`           | Reset the editor text size                 |

To install it system-wide, run `sudo make install`. Override `PREFIX` for a
different destination, for example `make install PREFIX="$HOME/.local"`.

## Windows release

Scratchpad builds as a native 64-bit Windows GUI application from the MSYS2
UCRT64 shell. The Windows build embeds version information, a high-DPI manifest,
and a multi-resolution application icon. It does not open a console window.

Install the release toolchain in MSYS2:

```sh
pacman -Syu
pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain \
  mingw-w64-ucrt-x86_64-gtk4
```

Then open the **MSYS2 UCRT64** shell in the project directory and create a
self-contained portable release:

```sh
make clean
make package-windows VERSION=0.1.0
```

The finished archive is written to
`dist/scratchpad-0.1.0-windows-x86_64.zip`. It contains the executable, GTK
DLLs, dynamically loaded GTK modules, themes, icons, schemas, translations,
checksums, and third-party license files. See [windows/README.md](windows/README.md)
for the complete release and verification checklist.
