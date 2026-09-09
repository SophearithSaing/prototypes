# Looplab

An interactive playground for understanding the JavaScript event loop. Three.js renders the entire runtime: containers, connectors, labels, and task blocks. A fixed, diagram-like view keeps their layout readable while preserving 3D depth. Built with React, TypeScript, and Vite.

## Run Locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

```sh
npm run build
npm run preview
npm test
```

## Explore

- **The big picture:** synchronous code, a promise, and a zero-delay timer.
- **Micro vs. macro:** FIFO microtasks, nested microtasks, and task priority.
- **Async / await:** suspending a function without blocking its caller.
- **Browser events:** listener registration, user-interaction tasks, and microtask updates.
- **Node.js / libuv:** file I/O, the nextTick queue, check callbacks, and timers.

Run, pause, step, replay, and change speed. Follow the raised connectors between the call stack, host APIs, and queues. All containers and blocks remain 3D, including at rest. During a transfer, a block slides from its source slot to its destination slot at a constant depth, following rounded paths without airborne jumps or tumbling. It stays in the scene when it arrives. Click components for explanations, expand the workspace, copy examples, or open the field guide. Keyboard shortcuts outside focused controls: `Space` to play/pause, `ArrowRight` to step, and `R` to reset.

The simulations use explicit teaching snapshots, not `eval` or real-time measurements. Their speed is pedagogical, not a representation of actual execution duration. Browser task sources and Node phases are deliberately grouped. A file callback is assumed to complete in the Node example, and `button` is assumed to reference an existing DOM element in the browser-events example. The field guide explains the model's limits. An HTML/SVG layer provides accessible text and keyboard targets; it is only drawn as a 2D fallback when WebGL is unavailable. The live queue contents and simulations work in either mode.

## Browser Tests

```sh
npx playwright install chromium
npm run test:e2e
```

The browser suite starts Vite automatically and exercises the simulations, controls, guide, and responsive layout. To add a scenario, extend `src/scenarios.ts` with its source, explanations, and immutable queue snapshots.

To use an existing Chrome installation instead of downloading Chromium:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome npm run test:e2e
```

Tests also check execution order against native JavaScript/Node and run automated accessibility scans with axe-core. The 3D renderer respects reduced-motion preferences and avoids rendering unchanged or off-screen scenes.
