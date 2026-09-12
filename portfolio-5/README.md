# Career Circuit

A single-screen, reference-inspired portfolio built with Three.js, TypeScript, and Vite. The circuit board is fully modeled and rendered in WebGL, with procedural textures, raised skill tiles, illuminated connections, and bloom post-processing.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Controls

- **Drag / swipe** to rotate the board.
- **Scroll** over the board to zoom.
- **Click / tap** a career milestone or skill tile for its details.
- **Explore my journey** steps through the four career milestones.
- The reset icon in the mouse-guide panel restores the original view.
- With the canvas focused, use **arrow keys** to rotate, **+ / −** to zoom, **0** to reset, and **Enter** to explore. Individual board items are also keyboard-accessible.

The layout adapts to mobile screens, honors reduced-motion preferences, and pauses rendering while the page is hidden. Navigation opens compact overlays within the same screen.

## Main files

- `src/scene.ts` — board geometry, textures, lighting, rendering, and pointer controls.
- `src/data.ts` — career milestones, skills, descriptions, and board coordinates.
- `src/main.ts` — interface interactions and dialogs.
- `src/style.css` and `src/responsive.css` — layout and responsive styling.

Fonts load from Google Fonts, with local fallbacks. All board artwork is generated in code; `reference.png` is used as the design reference, not as a background image.
