# Echo

A static design gallery for a minimal, language-focused mobile flashcard app. Twelve mockups cover decks, reversible translation practice, partial sessions, self-grading, incorrect-answer review, card creation, and import/export.

## Run

```sh
npm install
npm run dev
```

Use `npm run build` to create a deployable static site in `dist/`, or `npm run preview` to preview the build.

The sidebar, practice-flow shortcut, and zoom controls navigate the gallery. Controls drawn inside the mobile screens are intentionally non-interactive mockups, not a functioning flashcard application.

## Export mockups

- Use the download button above any screen to save a **4× resolution PNG**, without the surrounding gallery UI.
- Use **Export screens** in the toolbar to download `echo-mockups.zip`, containing all 12 PNGs and `screens.json` with screen names, order, and image dimensions.
- The ZIP also includes `echo-colors.png` (a visual palette), `design-system.json` (color names, exact hex values, CSS variables, and usage), and `design-system.css` (ready-to-use color tokens). Colors are read from the active theme, not duplicated in the exporter.
- Export resolution is independent of gallery zoom. Fonts are bundled locally and embedded using `html-to-image`, with no Google Fonts requests needed. Image and ZIP generation happen locally in your browser.

For AI implementation, provide the exported screenshots alongside the HTML/CSS source and a description of the intended app behavior.
