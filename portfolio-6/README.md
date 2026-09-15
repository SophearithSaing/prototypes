# A career, connected

A single-screen, reference-inspired portfolio with a fully modeled, interactive Three.js circuit board.

## Run locally

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

## The experience

- Drag the board to orbit and scroll or pinch to zoom.
- Select a career node or processor to see its details.
- Use **Explore my journey** to step through the career milestones.
- Hover over the instruction card to reveal the reset-view button.
- Press **Escape** to dismiss the detail panel.

The board geometry, component placement, circuit traces, and chip artwork are generated in `src/board.js`. Scene setup and interactions live in `src/main.js`; the responsive interface is in `src/style.css`. Edit the `skills`, `milestones`, and `views` data to personalize the sample portfolio content.

Built with Three.js and Vite. Includes instanced surface components, antialiased rendering, bloom, adaptive pixel density, and reduced-motion support.
