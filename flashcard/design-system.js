// Describe the tokens here; their values always come from the active theme.
const colorTokens = [
  ["canvas", "Warm ivory", "Gallery background"],
  ["paper", "Paper", "Mobile screen background"],
  ["ink", "Charcoal", "Primary text"],
  ["accent", "Muted blue", "Buttons and selected states"],
  ["accent-muted", "Soft blue", "Progress and toggles"],
  ["accent-soft", "Blue wash", "Selected surfaces and badges"],
  ["surface", "Ivory surface", "Navigation and toolbar"],
  ["surface-muted", "Warm neutral", "Cards and input fields"],
  ["border", "Warm border", "Outlines and dividers"],
  ["muted", "Secondary text", "Supporting copy"],
  ["text-faint", "Faint text", "Subtle labels and separators"],
  ["accent-border", "Blue border", "Selected outlines"],
  ["accent-pale", "Pale blue", "Decorative illustrations"],
  ["review-surface", "Review surface", "Incorrect-answer card"],
  ["review-ink", "Review text", "Revisit badge text"],
];

export function readDesignSystem() {
  const theme = getComputedStyle(document.documentElement);
  return {
    app: "Echo",
    palette: "Warm ivory, charcoal, and muted blue",
    colors: Object.fromEntries(
      colorTokens.map(([token, name, usage]) => [
        token,
        {
          name,
          cssVariable: `--${token}`,
          hex: theme.getPropertyValue(`--${token}`).trim(),
          usage,
        },
      ]),
    ),
  };
}

export function createColorPalette(designSystem) {
  const card = document.createElement("div");
  card.className = "color-export-card";
  card.setAttribute("aria-hidden", "true");
  const eyebrow = document.createElement("div");
  eyebrow.className = "color-export-eyebrow";
  eyebrow.textContent = "ECHO · DESIGN SYSTEM";
  const title = document.createElement("h2");
  title.textContent = "A little color. A clear intention.";
  const description = document.createElement("p");
  description.textContent = `${designSystem.palette}. Exact color tokens from the active theme.`;
  const grid = document.createElement("div");
  grid.className = "color-export-grid";
  for (const color of Object.values(designSystem.colors)) {
    const item = document.createElement("div");
    item.className = "color-export-item";
    const swatch = document.createElement("div");
    swatch.className = "color-export-swatch";
    swatch.style.backgroundColor = color.hex;
    const label = document.createElement("strong");
    label.textContent = color.name;
    const value = document.createElement("code");
    value.textContent = `${color.cssVariable} · ${color.hex.toUpperCase()}`;
    const usage = document.createElement("span");
    usage.textContent = color.usage;
    item.append(swatch, label, value, usage);
    grid.append(item);
  }
  card.append(eyebrow, title, description, grid);
  document.body.append(card);
  return card;
}

export function colorTokenCSS(designSystem) {
  const declarations = Object.values(designSystem.colors).map(
    (color) => `  ${color.cssVariable}: ${color.hex};`,
  );
  return `/* Echo color tokens — exported from the active theme */\n:root {\n${declarations.join("\n")}\n}\n`;
}
