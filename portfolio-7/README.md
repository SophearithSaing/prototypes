# Dev. — A journey in code

A single-screen, interactive software engineering portfolio inspired by `reference.png`, with the career milestones from `careers.md`.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`, then serve it with `npm run preview`.

## The experience

- Procedurally generated Three.js circuit board, with raised components, circuit traces, illuminated milestones, and a cyan-to-gold career path.
- Click a year or technology to explore its chapter. Use the panel arrows or the keyboard’s left/right arrows to move between chapters; Escape closes the panel.
- The **Tech stack** panel collects all eight technologies by year.
- Responsive desktop and mobile layouts, reduced-motion support, and an HTML-based timeline that remains accessible if WebGL is unavailable.

## Main files

- `src/data.js` — career content, technology labels, and map coordinates. “JS” and “Node” are expanded to JavaScript and Node.js, and “Hyperleder Fabric” is corrected to Hyperledger Fabric.
- `src/scene.js` — Three.js geometry, lighting, bloom, and animation.
- `src/main.js` — accessible HTML labels and interaction logic.
- `src/style.css`, `src/responsive.css` — typography, overlays, and responsive layouts.

Built with vanilla JavaScript, Three.js, and Vite. Google Fonts supplies DM Sans, Space Grotesk, and IBM Plex Mono, with local font fallbacks.
