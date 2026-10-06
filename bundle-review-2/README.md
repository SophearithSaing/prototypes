# Wellread

A responsive, editorial-style bookshelf powered by `data.json`. Built with plain HTML, CSS, and JavaScript, with no runtime dependencies.

## Run locally

```sh
npm run dev
```

Open **http://localhost:5173**. Requires Node.js 20 or later; there is nothing to install. Alternatively, serve this directory with any static HTTP server.

## Deploy

```sh
npm run build
```

Publish the resulting `dist/` directory to any static host. All URLs are relative, so subdirectory hosting works too. `npm run preview` serves the production directory locally.

## The library

- Searches titles, authors, descriptions, and collections, including accent-insensitive matches. Press `/` to jump to search.
- Filters by collection and sorts by overall score, individual scores, title, or collection rank.
- Offers grid and list layouts, book details, full score breakdowns, and publisher links.
- Saves a personal reading list in the browser’s local storage, synchronized across tabs.
- Shows 126 distinct titles from 132 entries; books shared between collections retain each collection’s ranking.
- Uses the scores supplied by the data file. The ranking explanation reads its weights and notes directly from that file.
- Supports keyboard navigation, native accessible dialogs, reduced-motion preferences, and small screens.
- Includes local fonts. Book cover images come from their source URLs, with a typographic fallback when an image is unavailable.

To update the library, edit `data.json`, preserving its collection/book structure, then rebuild if deploying `dist/`. No backend, account, or API key is needed. Use an HTTP server rather than opening `index.html` as a `file://` URL, so the browser can fetch the data.
