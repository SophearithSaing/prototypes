export const icons = {
  frontend:
    '<rect x="4" y="5" width="24" height="18" rx="1.5"/><path d="M16 23v5m-6 0h12"/>',
  fullstack:
    '<path d="m16 2 14 7-14 7L2 9Z" fill="currentColor" stroke-width="1"/><path d="m3 16 13 7 13-7M3 23l13 7 13-7"/>',
  mobile:
    '<rect x="8" y="2" width="16" height="28" rx="2"/><path d="M13 5h6"/><circle cx="16" cy="26" r=".8" fill="currentColor"/>',
  backend:
    '<ellipse cx="16" cy="6" rx="11" ry="5" fill="currentColor" stroke="none"/><path d="M5 10v5c0 6 22 6 22 0v-5c-5 5-17 5-22 0Zm0 9v5c0 7 22 7 22 0v-5c-5 5-17 5-22 0Z" fill="currentColor" stroke="none"/>',
  ai: '<circle cx="16" cy="6" r="4"/><circle cx="5" cy="26" r="4"/><circle cx="27" cy="26" r="4"/><path d="m14 10-7 12m11-12 7 12M9 26h14"/>',
};

export const iconMarkup = (name) =>
  `<svg viewBox="0 0 32 32" aria-hidden="true">${icons[name]}</svg>`;
