# Windows release guide

Scratchpad targets 64-bit Windows through the MSYS2 UCRT64 environment. The
result is a normal Win32 GTK application; end users do not need MSYS2 or a
separate GTK installation when using the packaged ZIP.

## 1. Prepare MSYS2

Install MSYS2, open its **UCRT64** shell, and install the required packages:

```sh
pacman -Syu
pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain \
  mingw-w64-ucrt-x86_64-gtk4
```

If `pacman -Syu` asks you to close the shell, do so, reopen UCRT64, run the
update command again, and then install the packages.

## 2. Build a developer executable

From the project directory:

```sh
make clean
make
./scratchpad.exe
```

The Windows build automatically:

- links as a GUI application with `-mwindows`, so no console window appears;
- embeds `assets/scratchpad.ico` into the executable;
- embeds product name, version, copyright, and filename metadata;
- embeds and privately registers JetBrains Mono for editor text;
- requests per-monitor V2 DPI awareness and long-path support;
- runs with ordinary user privileges (`asInvoker`).

## 3. Produce the portable release

```sh
make package-windows VERSION=0.1.0
```

This creates:

```text
dist/
├── scratchpad-0.1.0-windows-x86_64/
└── scratchpad-0.1.0-windows-x86_64.zip
```

The packaging script recursively discovers linked UCRT64 DLLs, adds runtime
loaded GTK/GIO/GdkPixbuf modules, and copies GTK schemas, icon themes,
translations, MIME data, notices, and available dependency licenses.

## 4. Verify before publishing

Test the extracted ZIP on a clean Windows 10 or Windows 11 virtual machine that
does not have MSYS2 installed.

Release checks:

1. Launch `scratchpad.exe` directly from the extracted folder.
2. Confirm that no console window appears.
3. Confirm the executable and taskbar show the Scratchpad icon.
4. Create several tabs and type into each one.
5. Close and reopen the app; confirm every draft and the active tab return.
6. Test Save and Save As with a path containing spaces and non-ASCII text.
7. Test tab removal and its confirmation dialog.
8. Test light and dark Windows themes at 100%, 150%, and 200% display scale.
9. Move the extracted folder elsewhere and launch it again to verify that the
   bundle is relocatable.
10. Check `SHA256SUMS.txt` and scan the archive with Microsoft Defender.

Drafts are stored below the current user's local application-data directory,
normally `%LOCALAPPDATA%\scratchpad`.

## 5. Signing and publishing

The generated executable is unsigned. For public distribution, sign
`scratchpad.exe` with an Authenticode certificate before creating the final ZIP,
and timestamp the signature. Code-signing credentials are intentionally not
stored or handled by this repository.

Pushing a tag such as `v0.1.0` triggers
`.github/workflows/windows-release.yml`, which builds and uploads the portable
ZIP as a GitHub Actions artifact. It does not automatically publish a GitHub
Release or sign the executable.

Keep `THIRD_PARTY_NOTICES.md` and the generated `licenses/` directory in every
published package. Review the included dependency licenses before release.
