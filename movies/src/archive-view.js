import { Cinema } from "./scene.js";

const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const glyph = (name) => `<i data-lucide="${name}"></i>`;

export function archiveMarkup(layout, soundEnabled) {
  const latest = layout.rooms.find((room) => room.type === "year");
  return `
    <div class="section-topline archive-topline">
      <h2>${glyph("door-open")} The cinema <span class="live-badge">AN OPEN WORLD</span></h2>
      <span class="archive-scale">${layout.watchedCount} films <span>·</span> ${layout.years.length} viewing ${layout.years.length === 1 ? "year" : "years"} <span>·</span> ${layout.rooms.length} connected rooms</span>
      <div class="archive-toolbar"><button class="text-button" id="map-toggle" aria-expanded="false" aria-controls="archive-drawer">${glyph("map")} Floor plan</button><button class="text-button" id="help-button" aria-label="How to explore">${glyph("circle-help")}</button></div>
    </div>
    <div class="cinema archive-cinema" id="cinema">
      <div id="scene-container"></div><div class="cinema-vignette archive-vignette"></div>
      <div class="archive-location"><span class="eyebrow"><span class="status-dot"></span>YOU ARE HERE</span><h3 id="location-title">The grand concourse</h3><p id="location-detail">One building. A lifetime of films.</p></div>
      <button class="archive-find" id="find-film">${glyph("search")}<span>Find a film or a year</span><kbd>F</kbd></button>
      <div id="poster-labels"></div><div class="scene-loading"><span></span>Building your picture house…</div>
      <div class="archive-crosshair" aria-hidden="true"></div>
      <div class="archive-invitation" id="archive-invitation"><span>THERE’S MORE THROUGH EVERY DOOR</span><p>A place for every chapter.</p><button id="enter-gallery">${latest ? `Step into ${escape(latest.title)}` : "Explore the picture house"} ${glyph("arrow-right")}</button></div>
      <button class="mini-map" id="mini-map" aria-label="Open the cinema floor plan"><div><span>HOUSE MAP</span>${glyph("expand")}</div><svg id="mini-map-svg" viewBox="-24 -32 48 56" aria-hidden="true"><g id="mini-map-rooms"></g><g id="mini-map-person"><circle r="1.4" fill="#e8d3a2"/><path d="M-2.5,-2.3 L0,-5 L2.5,-2.3" fill="none" stroke="#e8d3a2" stroke-width=".65"/></g></svg><span class="mini-map-legend"><b></b> YOU <span>CLICK TO EXPLORE</span></span></button>
      <div class="touch-navigation" aria-label="Walking controls"><span>WALK</span><div><button data-move="w" aria-label="Walk forward">${glyph("arrow-up")}</button><button data-move="a" aria-label="Step left">${glyph("arrow-left")}</button><button data-move="s" aria-label="Walk backward">${glyph("arrow-down")}</button><button data-move="d" aria-label="Step right">${glyph("arrow-right")}</button></div></div>
      <div class="cinema-bottom archive-bottom"><div class="walk-hint"><span class="keyboard-key">W A S D</span><span>walk</span><span class="hint-divider"></span>${glyph("mouse")}<span>drag to look</span><span class="hint-divider"></span><span class="keyboard-key">SHIFT</span><span>walk faster</span></div><span class="poster-hint">${glyph("hand")} Click a poster to open its journal</span><div class="scene-actions"><button id="reset-view" aria-label="Return to the entrance" title="Return to the entrance">${glyph("house")}</button><button id="sound-toggle" aria-label="Turn ambient sound ${soundEnabled ? "off" : "on"}" title="Ambient sound">${glyph(soundEnabled ? "volume-2" : "volume-x")}</button><button id="fullscreen" aria-label="Expand cinema" title="Expand cinema">${glyph("maximize")}</button></div></div>
      <section class="explore-help" hidden aria-label="Cinema controls"><h3>A whole cinema to wander.</h3><p><b>W A S D</b> to walk. <b>Drag</b> to look in any direction. Use <b>← →</b> or <b>Q / E</b> to turn, <b>↑ ↓</b> to move. Hold <b>Shift</b> to walk faster.</p><p>Every viewing year has its own open gallery. Walk through its doorway, or use the <b>floor plan</b> to travel straight there. Full galleries grow into additional rooms.</p><p>Click a poster to open its journal. On your phone, use the walking pad and drag to turn.</p><button class="text-button" id="close-help">Let’s explore ${glyph("arrow-right")}</button></section>
      <aside class="archive-drawer" id="archive-drawer" aria-label="Cinema floor plan" hidden>
        <div class="drawer-header"><div class="eyebrow">THE AFTERHOURS DIRECTORY</div><button class="icon-button" id="close-map" aria-label="Close floor plan">${glyph("x")}</button></div>
        <h3>A lifetime <em>in cinema.</em></h3><p>Find a year. Revisit a feeling. Pick a room and we’ll take you there.</p>
        <label class="archive-search">${glyph("search")}<input id="archive-search" type="search" placeholder="Search years, films, directors…" aria-label="Search cinema archive" /></label>
        <div class="drawer-scroll"><div id="archive-search-results" hidden></div><div id="archive-directory">
          <div class="directory-heading">YOUR VIEWING YEARS <span>${layout.years.length}</span></div>
          ${
            layout.years
              .map((year) => {
                const rooms = layout.rooms.filter((r) => r.year === year);
                return `<div class="directory-year"><div><strong>${escape(year)}</strong><span>${layout.byYear.get(year).length} films <span>·</span> ${rooms.length} ${rooms.length === 1 ? "gallery" : "galleries"}</span></div>${rooms.map((room) => `<button data-room="${escape(room.id)}"><span>${glyph("door-open")} ${room.parts > 1 ? `Gallery ${room.part}` : "Enter the gallery"}</span>${glyph("arrow-up-right")}</button>`).join("")}</div>`;
              })
              .join("") ||
            '<p class="directory-empty">Your first journal entry opens your first year gallery.</p>'
          }
          <div class="directory-heading other-spaces">ELSEWHERE IN THE HOUSE</div>
          ${layout.rooms
            .filter((r) => r.type !== "year")
            .map(
              (room) =>
                `<button class="directory-space" data-room="${escape(room.id)}"><span>${glyph(room.type === "watchlist" ? "film" : "armchair")}<span>${escape(room.label)}<small>${room.films.length ? `${room.films.length} films waiting` : escape(room.subtitle)}</small></span></span>${glyph("arrow-up-right")}</button>`,
            )
            .join("")}
          <div class="directory-heading other-spaces">THE BUILDING AT A GLANCE</div>
          <div class="building-plan"><div class="plan-entrance"><button id="plan-entrance">ENTRANCE ${glyph("arrow-down")}</button></div>${Array.from(
            { length: layout.rows },
            (_, row) =>
              `<div class="plan-row">${layout.rooms
                .slice(row * 2, row * 2 + 2)
                .map(
                  (room) =>
                    `<button data-room="${escape(room.id)}" title="${escape(room.label)}"><span>${escape(room.type === "year" ? room.year : room.type === "watchlist" ? "UP NEXT" : "LOUNGE")}</span><small>${room.type === "year" ? `GALLERY ${room.part}` : escape(room.type === "watchlist" ? `ROOM ${room.part}` : "STAY A WHILE")}</small></button>`,
                )
                .join('<span class="plan-corridor"></span>')}</div>`,
          ).join("")}</div>
        </div></div><div class="drawer-footer">${glyph("sparkles")} The house grows with your collection.</div>
      </aside>
    </div>
    <div class="cinema-caption archive-caption"><span><span class="status-dot"></span> ONE CONNECTED PICTURE HOUSE</span><span>Not just the films. The years between them.</span><label>TRAVEL TO <select id="year-travel" aria-label="Travel to a cinema gallery"><option value="entrance">The grand concourse</option>${layout.rooms.map((room) => `<option value="${escape(room.id)}">${escape(room.label)}</option>`).join("")}</select></label></div>`;
}

export function mountArchive(layout, onSelect, state, refreshIcons) {
  const root = document.querySelector("#cinema");
  const drawer = root.querySelector("#archive-drawer");
  const input = root.querySelector("#archive-search");
  const travel = document.querySelector("#year-travel");
  const invitation = root.querySelector("#archive-invitation");
  const signal = new AbortController();
  let mapOpen = false,
    lastFocus,
    lastRoom,
    mapRow;
  const onMove = (position) => {
    const { room, x, z, yaw, row } = position;
    if (Math.abs(x) > 0.2 || Math.abs(z - 10) > 0.3 || Math.abs(yaw) > 0.15)
      invitation.hidden = true;
    if (lastRoom !== (room?.id || "concourse")) {
      lastRoom = room?.id || "concourse";
      root.querySelector("#location-title").textContent = room
        ? room.type === "year"
          ? `The ${room.year} gallery`
          : room.title
        : "The grand concourse";
      root.querySelector("#location-detail").textContent = room
        ? `${room.films.length} films · ${room.subtitle}`
        : "Follow the years. Find your next doorway.";
      travel.value = room?.id || "entrance";
      drawer
        .querySelectorAll("[data-room]")
        .forEach((button) =>
          button.classList.toggle("current", button.dataset.room === room?.id),
        );
    }
    const map = root.querySelector("#mini-map-svg");
    const centerZ = -row * 24 - 6;
    if (mapRow !== row) {
      mapRow = row;
      map.setAttribute("viewBox", `-24 ${centerZ - 30} 48 64`);
      root.querySelector("#mini-map-rooms").innerHTML =
        `<rect x="-4.7" y="${centerZ - 34}" width="9.4" height="72" fill="#c5ac7c0d" stroke="#b09b6833" stroke-width=".25"/>${layout.rooms
          .filter((r) => Math.abs(r.row - row) <= 1)
          .map(
            (r) =>
              `<g><rect x="${r.side < 0 ? -21 : 5}" y="${r.z - 10}" width="16" height="20" rx=".5" fill="${r.type === "year" ? "#c5ac7c16" : "#ffffff06"}" stroke="#b09b6870" stroke-width=".35"/><rect x="${r.side < 0 ? -5.4 : 4.7}" y="${r.z - 4}" width=".7" height="8" fill="#28281f"/><text x="${r.x}" y="${r.z + 0.8}" text-anchor="middle" fill="#c5b38e" font-family="sans-serif" font-size="2.4">${escape(r.type === "year" ? r.year : r.type === "watchlist" ? "NEXT" : "LOUNGE")}</text></g>`,
          )
          .join("")}`;
    }
    root
      .querySelector("#mini-map-person")
      .setAttribute(
        "transform",
        `translate(${x},${z}) rotate(${(-yaw * 180) / Math.PI})`,
      );
  };
  const cinema = new Cinema(
    root.querySelector("#scene-container"),
    root.querySelector("#poster-labels"),
    layout,
    onSelect,
    { state, onMove },
  );
  cinema.cleanupUI = () => signal.abort();

  function closeMap() {
    mapOpen = false;
    drawer.hidden = true;
    cinema.setPaused(false);
    document
      .querySelector("#map-toggle")
      .setAttribute("aria-expanded", "false");
    if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
  }
  function openMap(search = false) {
    lastFocus = document.activeElement;
    mapOpen = true;
    drawer.hidden = false;
    cinema.setPaused(true);
    root.querySelector(".explore-help").hidden = true;
    document.querySelector("#map-toggle").setAttribute("aria-expanded", "true");
    if (search) input.focus({ preventScroll: true });
    else root.querySelector("#close-map").focus({ preventScroll: true });
  }
  function visit(id) {
    closeMap();
    invitation.hidden = true;
    if (id === "entrance") cinema.reset();
    else cinema.goToRoom(id);
    cinema.renderer.domElement.focus({ preventScroll: true });
  }
  document.querySelector("#map-toggle").onclick = () =>
    mapOpen ? closeMap() : openMap();
  root.querySelector("#mini-map").onclick = () => openMap();
  root.querySelector("#find-film").onclick = () => openMap(true);
  root.querySelector("#close-map").onclick = closeMap;
  root.querySelector("#plan-entrance").onclick = () => visit("entrance");
  travel.onchange = () => visit(travel.value);
  root.querySelector("#enter-gallery").onclick = () =>
    visit(
      layout.rooms.find((r) => r.type === "year")?.id || layout.rooms[0].id,
    );
  drawer.addEventListener(
    "click",
    (e) => {
      const room = e.target.closest("[data-room]");
      if (room) visit(room.dataset.room);
      const film = e.target.closest("[data-locate-film]");
      if (film) {
        closeMap();
        cinema.goToFilm(film.dataset.locateFilm);
        cinema.renderer.domElement.focus({ preventScroll: true });
      }
      const entry = e.target.closest("[data-open-entry]");
      if (entry) {
        closeMap();
        onSelect(entry.dataset.openEntry);
      }
    },
    { signal: signal.signal },
  );
  input.oninput = () => {
    const query = input.value.trim().toLowerCase();
    const results = root.querySelector("#archive-search-results");
    root.querySelector("#archive-directory").hidden = Boolean(query);
    results.hidden = !query;
    if (!query) return;
    const rooms = layout.rooms.filter((r) =>
      `${r.label} ${r.subtitle}`.toLowerCase().includes(query),
    );
    const films = layout.rooms
      .flatMap((room) => room.films.map((film) => ({ room, film })))
      .filter(({ room, film }) =>
        `${film.title} ${film.director} ${film.year} ${room.year || ""}`
          .toLowerCase()
          .includes(query),
      );
    results.innerHTML = `${rooms.length ? `<div class="directory-heading">ROOMS</div>${rooms.map((room) => `<button class="search-room" data-room="${escape(room.id)}">${glyph("door-open")}<span>${escape(room.label)}<small>${room.films.length} films</small></span>${glyph("arrow-up-right")}</button>`).join("")}` : ""}${
      films.length
        ? `<div class="directory-heading">${films.length} ${films.length === 1 ? "FILM" : "FILMS"}${films.length > 50 ? " · FIRST 50 SHOWN" : ""}</div>${films
            .slice(0, 50)
            .map(
              ({ room, film }) =>
                `<div class="archive-film-result"><div><strong>${escape(film.title)}</strong><span>${escape(film.director)} · ${film.year}</span><small>${room.type === "year" ? `Watched in ${escape(room.year)} · Gallery ${room.part}` : "On your watchlist"}</small></div><div><button data-locate-film="${escape(film.id)}">${glyph("navigation")} Find on the wall</button><button data-open-entry="${escape(film.id)}" aria-label="Open journal for ${escape(film.title)}">${glyph("book-open")}</button></div></div>`,
            )
            .join("")}`
        : ""
    }${!rooms.length && !films.length ? '<div class="archive-no-results">No stories found here.<span>Try another year, title or director.</span></div>' : ""}`;
    refreshIcons();
  };
  document.addEventListener(
    "keydown",
    (e) => {
      if (document.body.classList.contains("modal-open")) return;
      if (e.key === "Escape") {
        if (mapOpen) closeMap();
        root.querySelector(".explore-help").hidden = true;
        cinema.setPaused(false);
      }
      if (
        e.key.toLowerCase() === "f" &&
        root.contains(document.activeElement) &&
        !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)
      ) {
        e.preventDefault();
        openMap(true);
      }
      if (e.key === "Tab" && mapOpen) {
        const buttons = [...drawer.querySelectorAll("button, input")].filter(
          (el) => el.getClientRects().length,
        );
        if (e.shiftKey && document.activeElement === buttons[0]) {
          e.preventDefault();
          buttons.at(-1).focus();
        } else if (!e.shiftKey && document.activeElement === buttons.at(-1)) {
          e.preventDefault();
          buttons[0].focus();
        }
      }
    },
    { signal: signal.signal },
  );
  document.querySelector("#help-button").onclick = () => {
    if (mapOpen) closeMap();
    const help = root.querySelector(".explore-help");
    help.hidden = !help.hidden;
    cinema.setPaused(!help.hidden);
  };
  root.querySelector("#close-help").onclick = () => {
    root.querySelector(".explore-help").hidden = true;
    cinema.setPaused(false);
    cinema.renderer.domElement.focus({ preventScroll: true });
  };
  root.querySelector(".scene-loading").classList.add("loaded");
  return cinema;
}
