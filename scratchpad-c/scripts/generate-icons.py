#!/usr/bin/env python3
"""Generate sharp, size-specific application icons from the master artwork."""

from __future__ import annotations

import io
import struct
from pathlib import Path

from PIL import Image, ImageFilter


PROJECT_DIR = Path(__file__).resolve().parent.parent
ASSETS_DIR = PROJECT_DIR / "assets"
SOURCE_PATH = ASSETS_DIR / "scratchpad.png"
ICO_PATH = ASSETS_DIR / "scratchpad.ico"
SIZES = (16, 24, 32, 48, 64, 128, 256)


def render_icon(source: Image.Image, size: int) -> Image.Image:
    icon = source.resize((size, size), Image.Resampling.LANCZOS)

    # Downsampling detailed artwork softens its edges at shell-icon sizes.
    # A restrained unsharp pass restores separation without adding halos.
    if size <= 64:
        icon = icon.filter(
            ImageFilter.UnsharpMask(radius=0.65, percent=95, threshold=2)
        )

    return icon


def png_bytes(image: Image.Image) -> bytes:
    output = io.BytesIO()
    image.save(output, format="PNG", optimize=True)
    return output.getvalue()


def write_ico(layers: list[tuple[int, bytes]]) -> None:
    header_size = 6 + 16 * len(layers)
    offset = header_size
    entries = []

    for size, payload in layers:
        dimension = 0 if size == 256 else size
        entries.append(
            struct.pack(
                "<BBBBHHII",
                dimension,
                dimension,
                0,
                0,
                1,
                32,
                len(payload),
                offset,
            )
        )
        offset += len(payload)

    with ICO_PATH.open("wb") as ico:
        ico.write(struct.pack("<HHH", 0, 1, len(layers)))
        ico.writelines(entries)
        ico.writelines(payload for _, payload in layers)


def main() -> None:
    with Image.open(SOURCE_PATH) as source_file:
        source = source_file.convert("RGBA")

    layers = []
    for size in SIZES:
        icon = render_icon(source, size)
        payload = png_bytes(icon)
        (ASSETS_DIR / f"scratchpad-{size}.png").write_bytes(payload)
        layers.append((size, payload))

    write_ico(layers)


if __name__ == "__main__":
    main()
