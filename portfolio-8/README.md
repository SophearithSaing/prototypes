# Trajectory

A single-screen, interactive Three.js career journey inspired by `reference.png`, with milestones from `careers.md`.

## Run

```sh
npm install
npm run dev
```

`npm run build` creates the production site in `dist/`. Use `npm run preview` to preview it.

## Explore

- Select a milestone or a glowing node to read its chapter.
- **Follow my path** walks through the four career milestones.
- Select an alternate role to explore its imagined possibility.
- **Paths not taken** toggles the alternate paths; **Reset view** restores the scene.
- Move the cursor for gentle parallax. Reduced-motion preferences are respected.

Career content lives in `src/data.js`, the Three.js scene in `src/scene.js`, and screen interactions in `src/main.js`.
