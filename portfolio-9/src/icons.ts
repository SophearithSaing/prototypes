const svg = (body: string, viewBox = "0 0 24 24") =>
  `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

export const icons: Record<string, string> = {
  arrow: svg('<path d="M4 12h15M13 5l7 7-7 7"/>'),
  back: svg('<path d="M20 12H5m6-7-7 7 7 7"/>'),
  chevron: svg('<path d="m9 5 7 7-7 7"/>'),
  expand: svg('<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>'),
  close: svg('<path d="m6 6 12 12M6 18 18 6"/>'),
  pause: svg('<path d="M9 5v14M15 5v14"/>'),
  play: svg('<path d="m8 5 11 7-11 7Z"/>'),
  cursor: svg('<path d="m5 3 14 10-7 1-3 7Z"/>'),
  star: svg(
    '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.4l6.1-.9Z"/>',
  ),
  sound: svg('<path d="M9 8 5 11H2v4h3l4 3Zm5 1v8m4-11v14m4-8v2"/>'),
  wordpress: svg(
    '<circle cx="12" cy="12" r="10"/><path d="m4 7 5 14 4-12m-6-2h5m-2 0 5 14 4-12c1-4-3-5-2-2l2 4M3 7h4" stroke-width="1.3"/>',
  ),
  javascript: svg(
    '<rect x="2" y="2" width="20" height="20" rx="2"/><path d="M11 9v7c0 3-4 3-4 0m12-6c-4-3-6 2-3 3l2 1c3 2 0 5-3 3"/>',
  ),
  magento: svg(
    '<path d="m12 2 9 5v10l-4 2.3V9.5l-5-3-5 3v9.8L3 17V7Zm-3 9v9l3 2 3-2v-9l-3-2Z"/>',
  ),
  angular: svg(
    '<path d="m12 2 10 4-2 13-8 4-8-4L2 6Z"/><path d="m7 17 5-11 5 11M9 13h6"/>',
  ),
  node: svg(
    '<path d="m12 1 10 6v11l-10 5-10-5V7Z"/><path d="M8 9v7c0 2-3 2-3 0m13-6c-4-3-6 2-3 3l2 1c3 2 0 4-3 2"/>',
  ),
  nest: svg('<path d="m12 2 10 5-10 5L2 7Zm-10 10 10 5 10-5M2 17l10 5 10-5"/>'),
  fabric: svg(
    '<path d="m8 3-6 3.5v7L8 17l6-3.5v-7Zm8 4 6 3.5v7L16 21l-6-3.5v-7Z"/><path d="m2 6.5 6 3.5 6-3.5M8 10v7m2-6.5 6 3.5 6-3.5M16 14v7"/>',
  ),
};
