# A Career, Visualized

A reference-inspired portfolio for Alex Rivera, built with React, TypeScript, Vite, and Three.js. The career constellation is rendered live in WebGL, not from the reference image.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

## Features

- Draggable 3D career portals, orbital particles, neon paths, and bloom lighting.
- Click a portal, milestone label, or skill node to explore its details.
- Desktop scroll-to-zoom, reset-view control, and an animation pause button.
- Responsive navigation, a readable experience timeline, and an interactive toolkit.
- Three project concept case studies with accessible dialogs.
- Email contact and copy-to-clipboard feedback.
- Reduced-motion support, offscreen rendering suspension, and an interactive non-WebGL fallback.

## Customize

- `src/data.ts`: career milestones and constellation skills.
- `src/PortfolioSections.tsx`: biography, toolkit, project concepts, and contact email.
- `src/App.tsx`: name, navigation, and hero text.
- `src/CareerScene.tsx`: procedural 3D artwork and camera controls.
- `src/styles.css` and `src/portfolio.css`: visual theme and responsive layouts.

The identity comes from the supplied reference. Career details, contact information, and project concepts are example content and should be replaced before publishing a personal portfolio. Project buttons open local case studies; no live project URLs are invented.
