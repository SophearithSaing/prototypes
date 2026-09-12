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

- **`public/portfolio.json`**: the editable source of profile information, contact address, page copy, experiences, projects, and decorative alternative paths. Change it and refresh the page. The site fetches this file at runtime; the content is not embedded in the JavaScript bundle.
- `src/main.ts`: page rendering, interactions, and the built-in project illustrations.
- `src/portfolio-data.ts`: the data types, loading, field validation, and safe text formatting.
- `src/timeline-layout.ts`: count-based placement shared by the Three.js timeline and its fallback.
- `src/style.css`: typography, colors, layout, and CSS project illustrations.
- `src/scene.ts`: the Three.js timeline, lighting, particles, and interaction.
- `src/road-journey.ts`: distance-based, button-controlled travel between experience stops.
- `src/road.css`: the immersive ground-level viewing mode and its controls.
- `index.html`: generic loading metadata and font loading. The title and description are updated from `site` in the JSON when it loads.

The supplied content and projects are examples. Replace them with your own information before publishing. The contact form opens a prefilled email draft using `profile.email`; it does not submit to a server.

### Editing the JSON

- `profile`: name, role, email, availability text, and location coordinates.
- `site`, `hero`, `work`, `about`, `contact`, `footer`: page and dialog copy.
- `milestones`: experience entries in **oldest-to-newest order**. The last entry gets the current marker. Add, remove, or reorder entries; the overview, floating cards, road stops, progress markers, and chapter counters follow the array automatically. An empty array displays an empty state and hides the road entry button.
- `projects`: project cards and their detail dialogs. An empty array displays an empty state.
- `alternatives`: optional decorative path labels; use `[]` to remove them.

All content is plain text. Titles and longer descriptions support `*emphasis*` and `\n` for line breaks. `{name}` inserts `profile.name` into the site metadata and formatted copy. HTML is displayed as text rather than executed.

An experience entry looks like this:

```json
{
  "year": "2027",
  "role": "Independent Developer",
  "note": "A new chapter",
  "title": "Building with *purpose.*",
  "description": "What I worked on and why it mattered.",
  "reflection": "What I learned along the way.",
  "skills": ["TypeScript", "Three.js"]
}
```

Years may be strings or numbers. Keep all the existing section keys and use arrays for `skills`, `stack`, and `paragraphs`. JSON requires double quotes and does not support comments or trailing commas. If loading or validation fails, the page explains the error and provides a retry button.

### Project artwork

Use `"artwork": "orbit"`, `"forma"`, or `"still"` to choose an existing illustration; omitted artwork defaults to `"orbit"`. These illustrations contain decorative mock interfaces in the source code.

To use your own image, place it in `public/images/` and add an `image` field to the project:

```json
"image": "images/my-project.webp"
```

Relative image paths resolve beside `portfolio.json`. HTTP(S) image URLs also work. An image takes precedence over the illustration preset.

### Updating a deployed site

`npm run build` copies the data to **`dist/portfolio.json`**. On a deployed static site, you can replace that JSON file and refresh without rebuilding JavaScript. Keep the source `public/portfolio.json` in sync so the next deployment retains your edits. The page must be served over HTTP(S) for runtime JSON loading, as with the main portfolio itself.

## Interactions & Accessibility

- Click or keyboard-activate any milestone to read a chapter and navigate the timeline.
- Open a project for its concept notes and technology stack.
- Drag the overview scene or move the pointer for subtle perspective changes.
- Choose **View from the ground** to enter the road-level journey. **First stop**, **Next stop**, and **Previous stop** advance through the wavy road with gentle left/right drift and a mostly forward-facing camera. Experiences alternate along both sides. Scroll, touch dragging, and pointer movement do not control the road camera.
- The road and camera share broad S-curves: the camera follows 80% of the line's lateral movement with approximately four degrees of steering each way. The experimental raised viewpoint and its previous height/angle are together in `src/road-journey.ts` for easy adjustment or reversion.
- Each arrival unlocks its floating experience card and **Read this chapter**. **Back to overview** or Escape leaves the road; Escape first closes an open chapter. Reduced-motion visitors move directly between stops.
- Ambient sound is synthesized with the Web Audio API and only starts on request.
- Pause controls and system reduced-motion preferences are supported.
- Rendering pauses when offscreen or in a background tab. A DOM timeline remains available if WebGL cannot initialize.
- Dialogs support keyboard focus management and Escape to dismiss.
- Typography uses Google Fonts with local serif and sans-serif fallbacks.

## Tests

Run `npm test` with Node.js 22.18 or newer. The built-in Node test runner verifies path/camera alignment, raised viewpoint bounds, gentle sway and bounded heading changes, alternating roadside cards, sequential stop boundaries, repeated-command protection, reverse travel, reduced-motion jumps, stationary cameras, and resize/reset behavior.

Data tests also cover the shipped JSON, changing experience counts, numeric years, image/preset validation, field-specific errors, text escaping, runtime fetch behavior, and malformed or unavailable JSON.
