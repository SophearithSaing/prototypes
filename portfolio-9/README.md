# A Journey in Code

A fullscreen, interactive Three.js portfolio inspired by `reference.png`, with career milestones from `careers.md`.

## Run

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

## Explore

- Select a glowing milestone or year to open its chapter.
- Select a technology to explore its role in the journey.
- Use the header to switch between the overview, journey, technology stack, and introduction.
- Use the technology legend to toggle the branch layer, the pause button to stop motion, or the header’s fullscreen button for an immersive view.
- In the journey, use the left/right arrow keys to change chapters and Escape to return to the overview.

The scene adapts to mobile, respects reduced-motion preferences, and includes a fallback when WebGL is unavailable. No scrolling or additional pages are required.

## Files

- `src/data.ts` — career milestones, technologies, descriptions, and scene coordinates.
- `src/scene.ts` — procedural circuit board, animated paths, bloom, camera, and projected labels.
- `src/main.ts` — interface and interactions.
- `src/style.css` — fullscreen composition and responsive layouts.

Built with Three.js, TypeScript, and Vite. All scene graphics are generated procedurally; the reference image is not used as a background.
