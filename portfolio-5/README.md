# Career Circuit

A reference-inspired portfolio built with Three.js, TypeScript, and Vite. The career circuit board is followed by an interactive 3D GitHub contribution landscape. Both visualizations are modeled and rendered in WebGL.

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
- **Ctrl + scroll** (or **⌘ + scroll**) over the board to zoom. Ordinary scrolling moves between sections.
- **Click / tap** a career milestone or skill tile for its details.
- **Explore my journey** steps through the four career milestones.
- The reset icon in the mouse-guide panel restores the original view.
- With the canvas focused, use **arrow keys** to rotate, **+ / −** to zoom, **0** to reset, and **Enter** to explore. Individual board items are also keyboard-accessible.

The layout adapts to mobile screens, honors reduced-motion preferences, and pauses rendering while visualizations are offscreen or the page is hidden. Navigation opens compact overlays.

## GitHub activity

- The section below the career board loads **SophearithSaing**’s public GitHub contribution calendar through [GitHub Contributions API](https://github-contributions-api.jogruber.de/). Change `GITHUB_USERNAME` in `src/activity-data.ts` to use another account.
- Select the past year or one of the five most recent calendar years. Each column represents one day, arranged into weeks. Height uses a square-root scale so smaller contributions remain visible; color also reflects activity. Future dates are dimmed and excluded from statistics.
- Hover or tap a column for its date and contribution count. With the graph focused, **arrow keys** explore days and weeks; **Home / End** select the first or latest elapsed day. On mobile, scroll horizontally through the year.
- These are GitHub **contributions**, including commits, pull requests, issues, and reviews. No access token is needed. The graph is fetched when the section approaches the viewport.
- Successful responses are cached locally. When offline, saved data is explicitly labeled with its retrieval date. Without cached data, the section provides a retry action. The expandable daily table is also available when WebGL is unavailable.

## Main files

- `src/scene.ts` — board geometry, textures, lighting, rendering, and pointer controls.
- `src/data.ts` — career milestones, skills, descriptions, and board coordinates.
- `src/main.ts` — interface interactions and dialogs.
- `src/activity.ts` and `src/activity-data.ts` — GitHub fetching, caching, calendar validation, and statistics.
- `src/activity-scene.ts` — instanced 3D columns, lighting, and graph interactions.
- `src/activity.css` — contribution-section layout and responsive styling.
- `src/style.css` and `src/responsive.css` — layout and responsive styling.

Fonts load from Google Fonts, with local fallbacks. All board artwork is generated in code; `reference.png` is used as the design reference, not as a background image.
