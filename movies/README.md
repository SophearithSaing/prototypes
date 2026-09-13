# Afterhours

A personal picture house for the films you've watched and the feelings you kept. Built with Three.js and Vite, with a connected art-deco cinema archive, movie journals, ratings, favorites, and a watchlist.

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

### Inside the cinema

- Walk freely along the grand concourse and through open gallery doorways. Use **WASD** to move, **drag** to look in any direction, **← →** or **Q / E** to turn, and **↑ ↓** to move forward and backward. Hold **Shift** to walk faster. Click the cinema first to focus its keyboard controls.
- Select a poster to read or edit a journal entry.
- Each **viewing year** gets its own galleries, with twelve films per room and more rooms added automatically. The watchlist has a separate coming-attractions wing.
- Open the **floor plan** or press **F** while exploring to find a room, viewing year, movie, or director. Travel straight to a gallery or locate an individual film on its wall.
- The live minimap tracks your position and viewing direction. The travel selector provides a quick route to any gallery.
- On touchscreens, use the walking pad and drag to turn. All navigation also works in fullscreen.
- The home control returns you to the entrance. Editing a journal preserves your location in the building.
- The sound control enables a softly generated ambient room sound.
- Log any film, give it a rating, write a note, and keep a favorite.
- Browse and search your journal, or save a film to watch another night.

Entries are saved to this browser's local storage. The first visit includes a small sample collection. Film posters are loaded from TMDB's image CDN; new custom titles receive a locally generated art-deco poster in the cinema. Fonts are served by Google Fonts with local fallbacks. No API key or backend is required.

### Growing the archive

The layout is generated from your actual entries and their **watched-on dates**, not film release years. Undated entries remain available in an Undated gallery. New installations include sample memories from 2023–2026; existing saved collections are preserved.

Only the current concourse row and its immediate neighbors are loaded into Three.js (at most six galleries). Distant rooms, poster textures, and labels are disposed as you move away. Repeated architectural elements use instanced geometry. The complete archive remains searchable without loading every film into the 3D scene.

### Checks

```sh
npm test
npm run build
```

The layout tests cover 1,000 films across twenty viewing years, room capacity, connected doorways, wall boundaries, undated entries, empty archives, and large watchlists.
