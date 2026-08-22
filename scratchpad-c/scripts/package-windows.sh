#!/usr/bin/env bash
set -euo pipefail

version="${1:-0.1.0}"
project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
mingw_prefix="${MINGW_PREFIX:-}"
executable="$project_dir/scratchpad.exe"
bundle_name="scratchpad-${version}-windows-x86_64"
dist_dir="$project_dir/dist"
bundle_dir="$dist_dir/$bundle_name"
archive="$dist_dir/$bundle_name.zip"

fail() {
  echo "package-windows: $*" >&2
  exit 1
}

[[ "${MSYSTEM:-}" == "UCRT64" ]] ||
  fail "run this script from the MSYS2 UCRT64 shell"
[[ -n "$mingw_prefix" && -d "$mingw_prefix/bin" ]] ||
  fail "MINGW_PREFIX does not point to a valid UCRT64 installation"
[[ -f "$executable" ]] || fail "scratchpad.exe has not been built"

for command_name in ldd bsdtar sha256sum; do
  command -v "$command_name" >/dev/null 2>&1 ||
    fail "required command '$command_name' is not installed"
done

case "$bundle_dir" in
  "$project_dir"/dist/scratchpad-*-windows-x86_64) ;;
  *) fail "refusing to replace unexpected output path: $bundle_dir" ;;
esac

rm -rf -- "$bundle_dir"
rm -f -- "$archive"
mkdir -p "$bundle_dir"

install -m 0755 "$executable" "$bundle_dir/scratchpad.exe"
install -m 0644 "$project_dir/README.md" "$bundle_dir/README.md"
install -m 0644 "$project_dir/windows/README.md" "$bundle_dir/WINDOWS-README.md"
install -m 0644 "$project_dir/CHANGELOG.md" "$bundle_dir/CHANGELOG.md"
install -m 0644 "$project_dir/LICENSE" "$bundle_dir/LICENSE.txt"
install -m 0644 "$project_dir/THIRD_PARTY_NOTICES.md" \
  "$bundle_dir/THIRD_PARTY_NOTICES.md"
install -Dm 0644 "$project_dir/assets/fonts/OFL.txt" \
  "$bundle_dir/licenses/JetBrainsMono-OFL.txt"

declare -A copied_dlls=()
declare -a dependency_queue=("$executable")

collect_dependencies() {
  local binary dependency name
  while ((${#dependency_queue[@]} > 0)); do
    binary="${dependency_queue[0]}"
    dependency_queue=("${dependency_queue[@]:1}")

    while IFS= read -r dependency; do
      [[ -f "$dependency" ]] || continue
      name="$(basename -- "$dependency")"
      if [[ -z "${copied_dlls[$name]:-}" ]]; then
        copied_dlls[$name]=1
        install -m 0755 "$dependency" "$bundle_dir/$name"
        dependency_queue+=("$dependency")
      fi
    done < <(
      ldd "$binary" 2>/dev/null |
        grep -oiE "$mingw_prefix/bin/[^[:space:]]+\.dll" |
        sort -u || true
    )
  done
}

copy_tree() {
  local source="$1"
  local relative_destination="$2"
  [[ -d "$source" ]] || return 0
  mkdir -p "$bundle_dir/$relative_destination"
  cp -a "$source/." "$bundle_dir/$relative_destination/"
}

collect_dependencies

# GTK loads these resources and modules dynamically, so ldd cannot discover
# them from scratchpad.exe alone.
copy_tree "$mingw_prefix/share/glib-2.0/schemas" "share/glib-2.0/schemas"
copy_tree "$mingw_prefix/share/gtk-4.0" "share/gtk-4.0"
copy_tree "$mingw_prefix/share/icons/Adwaita" "share/icons/Adwaita"
copy_tree "$mingw_prefix/share/icons/hicolor" "share/icons/hicolor"
copy_tree "$mingw_prefix/share/mime" "share/mime"
copy_tree "$mingw_prefix/share/locale" "share/locale"
copy_tree "$mingw_prefix/lib/gdk-pixbuf-2.0" "lib/gdk-pixbuf-2.0"
copy_tree "$mingw_prefix/lib/gio/modules" "lib/gio/modules"
copy_tree "$mingw_prefix/lib/gtk-4.0" "lib/gtk-4.0"
copy_tree "$mingw_prefix/etc/gtk-4.0" "etc/gtk-4.0"

# Add dependencies of runtime-loaded GTK modules as well.
while IFS= read -r -d '' module; do
  dependency_queue+=("$module")
done < <(find "$bundle_dir/lib" -type f -iname '*.dll' -print0 2>/dev/null)
collect_dependencies

mkdir -p "$bundle_dir/licenses"
for package_name in \
  adwaita-icon-theme cairo fontconfig freetype2 fribidi gdk-pixbuf2 gettext-runtime \
  glib2 graphene gtk4 harfbuzz hicolor-icon-theme libepoxy libjpeg-turbo libpng \
  librsvg libtiff libwebp pango pcre2 vulkan-loader zlib; do
  if [[ -d "$mingw_prefix/share/licenses/$package_name" ]]; then
    copy_tree "$mingw_prefix/share/licenses/$package_name" "licenses/$package_name"
  fi
done

(
  cd "$bundle_dir"
  sha256sum scratchpad.exe > SHA256SUMS.txt
)

(
  cd "$dist_dir"
  bsdtar -a -cf "$(basename -- "$archive")" "$bundle_name"
)

echo "Created: $archive"
echo "Test the ZIP on a clean Windows VM before publishing it."
