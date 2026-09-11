# Sophearith / A Story in Motion

A responsive creative developer portfolio inspired by a luminous, branching career timeline. Built with TypeScript, Vite, and Three.js. All scene elements and project illustrations are rendered with code; `reference.png` is the original visual reference, not a background image.

## Run

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to any static host.

## Build Journal

Open `public/build-notes.html` directly in a browser for the standalone technical build journal. It covers the architecture, rendering and layout decisions, source excerpts, debugging notes, verification results, and remaining limitations.

The journal is self-contained and readable offline without JavaScript, dependencies, or a running server. Optional JavaScript adds code-copy buttons, reading progress, and print/PDF controls. Vite copies it unchanged into the production build, where it is available at `/build-notes.html`.

## Personalize

- `src/main.ts`: name, email address, career milestones, project descriptions, and page copy. The supplied projects are clearly labeled independent concepts. Replace sample career information with your own experience.
- `src/style.css`: typography, colors, layout, and CSS project illustrations.
- `src/scene.ts`: the Three.js timeline, lighting, particles, and interaction.
- `src/road-journey.ts`: distance-based, button-controlled travel between experience stops.
- `src/road.css`: the immersive ground-level viewing mode and its controls.
- `index.html`: title, description, and font loading.

The contact form opens a prefilled email draft. It does not submit to a server or claim to deliver messages. Update `email` in `src/main.ts` before publishing, and the contact address in the `index.html` no-JavaScript message.

## Interactions & Accessibility

- Click or keyboard-activate any milestone to read a chapter and navigate the timeline.
- Open a project for its concept notes and technology stack.
- Drag the overview scene or move the pointer for subtle perspective changes.
- Choose **View from the ground** to enter the road-level journey. **First stop**, **Next stop**, and **Previous stop** move the camera along the same wavy line, turning with its curves. Scroll, touch dragging, and pointer movement do not control the road camera.
- Each arrival unlocks its floating experience card and **Read this chapter**. **Back to overview** or Escape leaves the road; Escape first closes an open chapter. Reduced-motion visitors move directly between stops.
- Ambient sound is synthesized with the Web Audio API and only starts on request.
- Pause controls and system reduced-motion preferences are supported.
- Rendering pauses when offscreen or in a background tab. A DOM timeline remains available if WebGL cannot initialize.
- Dialogs support keyboard focus management and Escape to dismiss.
- Typography uses Google Fonts with local serif and sans-serif fallbacks.

## Road Navigation Tests

Run `npm test` with Node.js 22.18 or newer. The built-in Node test runner verifies curve-following and turning, sequential stop boundaries, repeated-command protection, reverse travel, reduced-motion jumps, stationary cameras, and resize/reset behavior.
