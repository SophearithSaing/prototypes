# Third-party notices

The Windows package produced by `scripts/package-windows.sh` bundles GTK 4 and
its runtime dependencies from MSYS2 UCRT64. Those components are not covered by
Scratchpad's MIT license; each remains under its own license.

The packaging script copies the license files shipped by MSYS2 into the
`licenses/` directory of the release bundle. The corresponding package metadata
and source archives are available from:

- <https://packages.msys2.org/>
- <https://www.gtk.org/>

Before publishing a binary release, retain the generated `licenses/` directory
and verify that it covers every bundled library. This notice is informational
and is not legal advice.

## JetBrains Mono

Scratchpad embeds JetBrains Mono Regular for its editor text. Copyright 2020
The JetBrains Mono Project Authors. The font is distributed under the SIL Open
Font License, Version 1.1. The full license is included in
`assets/fonts/OFL.txt` and as `licenses/JetBrainsMono-OFL.txt` in Windows
release bundles.
