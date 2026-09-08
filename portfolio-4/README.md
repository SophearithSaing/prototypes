# Alex Rivera / Career, Visualized

A reference-inspired portfolio with a real, interactive Three.js career map. Built with React, TypeScript, and Vite.

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

## Interactions

- Drag the career map to orbit. Use the on-screen controls or Ctrl + scroll to zoom. Ordinary scrolling navigates the page.
- Select a milestone to explore that chapter of the career timeline.
- Select a floating technology to jump to its highlighted skill card.
- Toggle possible paths in the map legend or reset the camera from the map controls.
- Filter the toolkit and open project case studies.
- Copy the contact email or compose a message in your default email app. The site does not silently send or store form submissions.
- Keyboard navigation, accessible dialogs, reduced-motion preferences, and a WebGL-unavailable timeline fallback are supported.

## Personalization

The identity, companies, project case studies, metrics, and contact address are demonstration content based on the reference. Update `src/data.ts` for milestones, skills, and projects. Update `src/App.tsx` for your name, biography, and contact information, and `index.html` for page metadata. The 3D scene is in `src/CareerScene.tsx`; the responsive visual system is in `src/styles.css`.

The project previews are custom HTML/CSS compositions, not external image dependencies. Fonts load from Google Fonts, with local system fallbacks.

## Browser Tests

```sh
npx playwright install chromium
npm test
```

To use an existing Google Chrome installation instead, run `PLAYWRIGHT_CHANNEL=chrome npm test`. Tests cover desktop, mobile, tablet, map controls, dialogs, skill filters, clipboard copying, and the WebGL fallback. Screenshots are written to the ignored `test-results/` directory.
