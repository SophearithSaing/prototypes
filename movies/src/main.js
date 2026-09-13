import {
  createIcons,
  Plus,
  DoorOpen,
  CircleHelp,
  Mouse,
  Hand,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  Ticket,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  Heart,
  Star,
  Search,
  LockKeyhole,
  Film,
  Play,
  BookOpen,
  X,
  CalendarDays,
  Pencil,
  Check,
  Trash2,
  Map,
  Expand,
  Navigation,
  Armchair,
  House,
} from "lucide";
import { seedFilms, poster, moods } from "./data.js";
import { createArchiveLayout } from "./archive-layout.js";
import { archiveMarkup, mountArchive } from "./archive-view.js";
import "./style.css";
import "./archive.css";

const STORAGE_KEY = "afterhours-journal-v1";
const icons = {
  Plus,
  DoorOpen,
  CircleHelp,
  Mouse,
  Hand,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  Ticket,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  Heart,
  Star,
  Search,
  LockKeyhole,
  Film,
  Play,
  BookOpen,
  X,
  CalendarDays,
  Pencil,
  Check,
  Trash2,
  Map,
  Expand,
  Navigation,
  Armchair,
  House,
};
let films;
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  films =
    Array.isArray(saved) && saved.every((f) => f.id && f.title && f.status)
      ? saved
      : structuredClone(seedFilms);
} catch {
  films = structuredClone(seedFilms);
}
let currentPage = "lobby";
let cinemaState;
let filter = "all";
let query = "";
let cinema;
let soundEnabled = false;
let audio;
let lastFocused;
const app = document.querySelector("#app");
const icon = (name, extra = "") => `<i data-lucide="${name}" ${extra}></i>`;
const esc = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const watchedFilms = () =>
  films
    .filter((f) => f.status === "watched")
    .sort((a, b) => (b.watched || "").localeCompare(a.watched || ""));
const dateLabel = (value) =>
  value
    ? new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "On your list";
const stars = (rating) =>
  `<span class="stars" aria-label="${rating} out of 5 stars">${Array.from({ length: 5 }, (_, i) => `<span class="${rating >= i + 1 ? "filled" : rating > i ? "half" : ""}">★</span>`).join("")}</span>`;
function refreshIcons() {
  createIcons({ icons, attrs: { "stroke-width": 1.5 } });
}
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
    return true;
  } catch {
    toast("Your browser couldn’t save this entry. Keep this tab open.");
    return false;
  }
}
function imageMarkup(film, className = "") {
  return film.image
    ? `<img class="${className}" crossorigin="anonymous" src="${poster(film.image)}" alt="${esc(film.title)} poster" loading="lazy" style="background:${film.color || "#665345"}" onerror="this.style.visibility='hidden'" />`
    : "";
}

app.innerHTML = `
  <header class="site-header">
    <a href="#lobby" class="brand" aria-label="Afterhours home"><svg viewBox="0 0 42 44" fill="none" aria-hidden="true"><path d="M6 36V14h30v22M13 36V8h16v28M19 36V3h4v33M2 38h38" stroke="currentColor" stroke-width="1.5"/></svg><span>AFTERHOURS<small>A PERSONAL PICTURE HOUSE</small></span></a>
    <nav aria-label="Main navigation"><button data-page="lobby" class="nav-link active">The lobby</button><button data-page="journal" class="nav-link">My journal <span class="nav-count">${watchedFilms().length}</span></button><button data-page="watchlist" class="nav-link">Watchlist</button></nav>
    <button class="button button-gold log-film">${icon("plus")}<span>Log a film</span></button>
  </header>
  <main id="main-content"></main>
  <footer class="site-footer"><span class="footer-brand">AFTERHOURS <span>·</span> A little cinema of your own.</span><span>Made for the love of film. ${icon("sparkles")}</span></footer>
  <div class="modal-backdrop" id="modal" hidden></div>
  <div id="toast" role="status" aria-live="polite"></div>
`;

function renderPage() {
  if (cinema) cinemaState = cinema.getState();
  cinema?.dispose();
  cinema = null;
  document
    .querySelectorAll("[data-page]")
    .forEach((el) =>
      el.classList.toggle("active", el.dataset.page === currentPage),
    );
  document.querySelector(".nav-count").textContent = watchedFilms().length;
  const main = document.querySelector("#main-content");
  if (currentPage === "lobby") {
    const watched = watchedFilms();
    const layout = createArchiveLayout(films);
    const hours = Math.round(
      watched.reduce((n, f) => n + Number(f.runtime || 0), 0) / 60,
    );
    main.innerHTML = `
      <section class="welcome"><div><div class="eyebrow"><span class="status-dot"></span>THE WORLD CAN WAIT A WHILE</div><h1>Good films. <em>Lasting feelings.</em></h1><p>A place for the films you’ve seen, and the pieces of them you keep.</p></div><div class="stats"><div><strong>${watched.length.toString().padStart(2, "0")}</strong><span>FILMS WATCHED</span></div><div><strong>${hours}<small>h</small></strong><span>WORLDS AWAY</span></div><div><strong>${watched
        .filter((f) => f.favorite)
        .length.toString()
        .padStart(
          2,
          "0",
        )}</strong><span>ALL-TIME LOVES</span></div></div></section>
      <section class="cinema-section" aria-label="Interactive 3D movie theater">
        ${archiveMarkup(layout, soundEnabled)}
      </section>
      <section class="recent-section"><div class="recent-heading"><div><div class="eyebrow">NOTES FROM THE DARK</div><h2>Fresh from the journal<span>.</span></h2></div><button class="text-button" data-page="journal">All journal entries ${icon("arrow-up-right")}</button></div><div class="recent-grid">${watched.slice(0, 3).map(journalCard).join("") || '<div class="empty-state">Your next favorite memory starts with a film. Log your first one above.</div>'}</div></section>
      <div class="closing-note">“We are the sum of the films we carry with us.”<span>KEEP THE TICKET. KEEP THE FEELING.</span></div>`;
    refreshIcons();
    try {
      cinema = mountArchive(layout, openFilm, cinemaState, refreshIcons);
    } catch (error) {
      console.error(error);
      document.querySelector(".scene-loading")?.classList.add("loaded");
      document.querySelector("#scene-container").innerHTML =
        `<div class="archive-webgl-fallback"><h3>Your films are still here.</h3><p>This browser couldn’t open the 3D picture house. Explore your complete collection in the journal.</p><button class="button button-gold" data-page="journal">Open my journal ${icon("arrow-right")}</button></div>`;
    }
    document.querySelector("#reset-view").onclick = () => cinema?.reset();
    document.querySelector("#sound-toggle").onclick = toggleSound;
    document.querySelector("#fullscreen").onclick = async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.querySelector("#cinema").requestFullscreen();
      } catch {
        toast("Fullscreen isn’t available in this browser.");
      }
    };
  } else {
    const isWatchlist = currentPage === "watchlist";
    main.innerHTML = `<section class="collection-page"><div class="eyebrow"><span class="status-dot"></span>${isWatchlist ? "SOMETHING TO LOOK FORWARD TO" : "THE FEELINGS, ON RECORD"}</div><div class="collection-title"><div><h1>${isWatchlist ? "The next" : "Your life,"} <em>${isWatchlist ? "great escape." : "in films."}</em></h1><p>${isWatchlist ? "For a rainy afternoon, a late night, or just the right moment." : "The stories you watched. The stories you brought home."}</p></div><button class="button button-gold log-film">${icon("plus")} ${isWatchlist ? "Add to watchlist" : "Log a film"}</button></div><div class="collection-toolbar"><div class="filter-tabs"><button data-filter="all" class="${filter === "all" ? "active" : ""}">All ${isWatchlist ? "films" : "entries"}</button>${!isWatchlist ? `<button data-filter="favorites" class="${filter === "favorites" ? "active" : ""}">${icon("heart")} Favorites</button><button data-filter="top" class="${filter === "top" ? "active" : ""}">${icon("star")} Top rated</button>` : ""}</div><label class="search-box">${icon("search")}<input type="search" id="search" placeholder="Find a film or a feeling…" value="${esc(query)}" aria-label="Search your films" /></label></div><div class="collection-grid" id="collection-grid"></div><div class="collection-bottom">${icon("lock-keyhole")} Your little corner of cinema. Saved in this browser, just for you.</div></section>`;
    renderCollection();
    document.querySelector("#search").oninput = (e) => {
      query = e.target.value;
      renderCollection();
    };
  }
  refreshIcons();
}

function journalCard(f) {
  return `<button class="journal-card" data-film="${f.id}"><div class="journal-thumb">${imageMarkup(f)}<span>${esc(f.title)}</span></div><div class="journal-card-content"><div class="card-date">${dateLabel(f.watched)}<span>${f.favorite ? icon("heart", 'class="is-favorite"') : icon("arrow-up-right")}</span></div><h3>${esc(f.title)}</h3><div class="card-rating">${stars(f.rating)}<span>${f.year}</span></div><p>${esc(f.review || "A story waiting for your words.")}</p><span class="mood-tag">${esc(f.mood || "In the journal")}</span></div></button>`;
}

function renderCollection() {
  const list = films
    .filter(
      (f) =>
        f.status === (currentPage === "watchlist" ? "watchlist" : "watched"),
    )
    .filter((f) =>
      filter === "favorites"
        ? f.favorite
        : filter === "top"
          ? f.rating >= 4.5
          : true,
    )
    .filter((f) =>
      `${f.title} ${f.director} ${f.review} ${f.mood}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  document.querySelector("#collection-grid").innerHTML = list.length
    ? list
        .map(
          (f) =>
            `<button class="collection-card" data-film="${f.id}"><div class="collection-poster" style="background:${f.color || "#665345"}">${imageMarkup(f)}<span class="poster-fallback-title">${esc(f.title)}</span><span class="collection-hover">${icon(currentPage === "watchlist" ? "play" : "book-open")} ${currentPage === "watchlist" ? "A future favorite?" : "Open the journal"}</span>${f.favorite ? `<span class="favorite-badge">${icon("heart")}</span>` : ""}</div><div class="collection-card-title"><h3>${esc(f.title)}</h3><span>${f.year}</span></div><div class="collection-card-info">${f.status === "watched" ? stars(f.rating) : `<span>${esc(f.director)}</span>`}<span>${dateLabel(f.watched)}</span></div></button>`,
        )
        .join("")
    : `<div class="empty-state">${icon("film")}<h3>${query ? "No films in this frame." : "A blank page. A new beginning."}</h3><p>${query ? "Try another title, director, or feeling." : "Add a film and make yourself a memory."}</p></div>`;
  refreshIcons();
}

function showModal(html) {
  lastFocused = document.activeElement;
  const modal = document.querySelector("#modal");
  modal.innerHTML = `<section class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close icon-button" aria-label="Close dialog">${icon("x")}</button>${html}</section>`;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  refreshIcons();
  modal.querySelector(".modal-close").focus();
}
function closeModal() {
  document.querySelector("#modal").hidden = true;
  document.body.classList.remove("modal-open");
  lastFocused?.isConnected && lastFocused.focus();
}

function openFilm(id) {
  if (document.fullscreenElement) {
    document
      .exitFullscreen()
      .then(() => openFilm(id))
      .catch(() => toast("Exit fullscreen to open your journal."));
    return;
  }
  const f = films.find((f) => f.id === id);
  if (!f) return;
  showModal(
    `<div class="entry-layout"><div class="entry-poster" style="background:${f.color || "#665345"}">${imageMarkup(f)}<span class="entry-ticket">AFTERHOURS PICTURE HOUSE<br><b>ADMIT ONE · KEEP FOREVER</b></span></div><div class="entry-content"><div class="eyebrow">${f.status === "watched" ? "A PAGE FROM YOUR JOURNAL" : "WAITING IN THE WINGS"}</div><h2 id="modal-title">${esc(f.title)}</h2><div class="entry-details">${f.year} <span>·</span> ${esc(f.director)} <span>·</span> ${f.runtime} min</div><div class="entry-genre">${esc(f.genre || "Your personal collection")}</div>${
      f.status === "watched"
        ? `<div class="entry-rating">${stars(f.rating)}<span>${f.rating} / 5</span><button class="favorite-toggle ${f.favorite ? "selected" : ""}" data-favorite="${f.id}" aria-label="${f.favorite ? "Remove from" : "Add to"} favorites">${icon("heart")}</button></div><div class="entry-watched">${icon("calendar-days")} Watched ${new Date(`${f.watched}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div><div class="entry-review">${esc(
            f.review ||
              "Some feelings take a little time to find their words. Add a note whenever you’re ready.",
          )
            .split("\n")
            .map((p) => (p ? `<p>${p}</p>` : ""))
            .join(
              "",
            )}</div>${f.mood ? `<span class="mood-tag">${icon("sparkles")} ${esc(f.mood)}</span>` : ""}`
        : '<div class="entry-review"><p>Somewhere ahead, a new world is waiting. Save this one for just the right evening.</p></div>'
    }<div class="entry-actions"><button class="button button-gold" data-edit="${f.id}">${icon(f.status === "watched" ? "pencil" : "check")} ${f.status === "watched" ? "Edit this memory" : "I watched this"}</button><button class="text-button delete-entry" data-delete="${f.id}" aria-label="Delete ${esc(f.title)}">${icon("trash-2")}</button></div></div></div>`,
  );
}

function openEditor(id) {
  const f = films.find((f) => f.id === id);
  const watchlist = !f && currentPage === "watchlist";
  const today = new Date().toLocaleDateString("en-CA");
  showModal(
    `<form id="film-form" class="film-form"><div class="eyebrow">${f ? "THE FEELING IS YOURS TO KEEP" : "ANOTHER TICKET FOR THE COLLECTION"}</div><h2 id="modal-title">${watchlist ? "The next" : f ? "Revisit the" : "Keep the"} <em>${watchlist ? "great film." : "feeling."}</em></h2><p class="form-intro">${watchlist ? "Give your next movie night something to look forward to." : "A few details. A few words. A little piece of your life."}</p><input type="hidden" name="id" value="${f?.id || ""}" /><div class="form-row"><label class="wide">Film title<input name="title" required maxlength="100" placeholder="What did you watch?" value="${esc(f?.title || "")}" /></label><label>Year<input name="year" type="number" min="1888" max="2100" required value="${f?.year || new Date().getFullYear()}" /></label></div><div class="form-row equal"><label>Director<input name="director" placeholder="Behind the camera" maxlength="100" value="${esc(f?.director || "")}" /></label><label>Runtime (minutes)<input name="runtime" type="number" min="1" max="1500" value="${f?.runtime || 120}" required /></label></div><label class="status-field">Add to<select name="status"><option value="watched" ${!watchlist ? "selected" : ""}>My journal — I watched it</option><option value="watchlist" ${watchlist ? "selected" : ""}>Watchlist — for another night</option></select></label><div class="watched-fields" ${watchlist ? "hidden" : ""}><div class="form-row equal"><label>Watched on<input name="watched" type="date" value="${f?.watched || today}" max="${today}" ${!watchlist ? "required" : ""} /></label><label>The feeling<select name="mood"><option value="">Choose a feeling</option>${moods.map((m) => `<option ${f?.mood === m ? "selected" : ""}>${m}</option>`).join("")}</select></label></div><div class="rating-field"><span>Your rating</span><div class="rating-input">${Array.from({ length: 5 }, (_, i) => `<button type="button" data-rating="${i + 1}" aria-label="Rate ${i + 1} stars" class="${(f?.rating || 0) >= i + 1 ? "selected" : ""}">★</button>`).join("")}<select name="rating" aria-label="Precise star rating"><option value="0">Unrated</option>${Array.from({ length: 10 }, (_, i) => `<option value="${(i + 1) / 2}" ${f?.rating === (i + 1) / 2 ? "selected" : ""}>${(i + 1) / 2} / 5</option>`).join("")}</select></div></div><label>Your journal<textarea name="review" rows="4" maxlength="12000" placeholder="A scene that stayed. A line you loved. How it felt when the credits rolled…">${esc(f?.review || "")}</textarea></label><label class="checkbox-label"><input type="checkbox" name="favorite" ${f?.favorite ? "checked" : ""} />${icon("heart")} This one has a place in my heart</label></div><div class="form-footer"><span>${icon("lock-keyhole")} Saved just for you, in this browser.</span><button type="submit" class="button button-gold">${icon("check")} Save ${watchlist ? "film" : "memory"}</button></div></form>`,
  );
  const form = document.querySelector("#film-form");
  form.elements.status.onchange = () => {
    const watched = form.elements.status.value === "watched";
    form.querySelector(".watched-fields").hidden = !watched;
    form.elements.watched.required = watched;
  };
  form.elements.rating.onchange = () =>
    updateRating(form, Number(form.elements.rating.value));
  form
    .querySelectorAll("[data-rating]")
    .forEach(
      (btn) =>
        (btn.onclick = () => updateRating(form, Number(btn.dataset.rating))),
    );
  form.onsubmit = (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const title = data.get("title").trim();
    if (!title) {
      form.elements.title.setCustomValidity("Give this film a title.");
      form.elements.title.reportValidity();
      form.elements.title.oninput = () =>
        form.elements.title.setCustomValidity("");
      return;
    }
    const matched = seedFilms.find(
      (s) => s.title.toLowerCase() === title.toLowerCase(),
    );
    const entry = {
      ...(f || matched || {}),
      id: f?.id || crypto.randomUUID(),
      title,
      year: Number(data.get("year")),
      director: data.get("director").trim() || "Unknown director",
      runtime: Number(data.get("runtime")),
      status: data.get("status"),
      watched: data.get("watched"),
      mood: data.get("mood"),
      rating: Number(data.get("rating")),
      review: data.get("review").trim(),
      favorite: data.has("favorite"),
      image: f?.image || matched?.image || "",
      color: f?.color || matched?.color || "#75634f",
    };
    if (f) films = films.map((item) => (item.id === f.id ? entry : item));
    else films.unshift(entry);
    const persisted = save();
    closeModal();
    renderPage();
    if (persisted)
      toast(
        entry.status === "watched"
          ? "A new memory, kept. Your journal is saved."
          : "Added to your list. Something good awaits.",
      );
  };
}
function updateRating(form, value) {
  form.elements.rating.value = value;
  form
    .querySelectorAll("[data-rating]")
    .forEach((b) =>
      b.classList.toggle("selected", Number(b.dataset.rating) <= value),
    );
}
let toastTimer;
function toast(message) {
  const el = document.querySelector("#toast");
  el.innerHTML = `${icon("check")}<span>${esc(message)}</span>`;
  refreshIcons();
  el.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("visible"), 4200);
}

async function toggleSound() {
  try {
    if (!audio) {
      const context = new AudioContext();
      const gain = context.createGain();
      gain.gain.value = 0;
      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 220;
      const buffer = context.createBuffer(
        1,
        context.sampleRate * 4,
        context.sampleRate,
      );
      const channel = buffer.getChannelData(0);
      for (let i = 0; i < channel.length; i++)
        channel[i] = Math.random() * 2 - 1;
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      source.start();
      audio = { context, gain };
    }
    await audio.context.resume();
    soundEnabled = !soundEnabled;
    audio.gain.gain.setTargetAtTime(
      soundEnabled ? 0.12 : 0,
      audio.context.currentTime,
      0.7,
    );
    const btn = document.querySelector("#sound-toggle");
    btn.innerHTML = icon(soundEnabled ? "volume-2" : "volume-x");
    btn.setAttribute(
      "aria-label",
      `Turn ambient sound ${soundEnabled ? "off" : "on"}`,
    );
    btn.classList.toggle("active", soundEnabled);
    refreshIcons();
  } catch {
    toast("Ambient audio isn’t available in this browser.");
  }
}

document.addEventListener("click", (e) => {
  const page = e.target.closest("[data-page]");
  if (page) {
    currentPage = page.dataset.page;
    filter = "all";
    query = "";
    renderPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (e.target.closest(".brand")) {
    e.preventDefault();
    currentPage = "lobby";
    renderPage();
  }
  if (e.target.closest(".log-film")) openEditor();
  const film = e.target.closest("[data-film]");
  if (film) openFilm(film.dataset.film);
  const edit = e.target.closest("[data-edit]");
  if (edit) openEditor(edit.dataset.edit);
  if (
    e.target.closest(".modal-close") ||
    e.target === document.querySelector("#modal")
  )
    closeModal();
  const favorite = e.target.closest("[data-favorite]");
  if (favorite) {
    const f = films.find((f) => f.id === favorite.dataset.favorite);
    f.favorite = !f.favorite;
    save();
    renderPage();
    openFilm(f.id);
  }
  const del = e.target.closest("[data-delete]");
  if (del) {
    const id = del.dataset.delete;
    const f = films.find((f) => f.id === id);
    showModal(
      `<div class="delete-confirm"><div class="eyebrow">ONE LAST LOOK</div><h2 id="modal-title">Let this one go?</h2><p>“${esc(f.title)}” and its journal entry will be removed from your collection.</p><div><button class="button" id="cancel-delete">Keep the memory</button><button class="button button-gold" id="confirm-delete">Remove film</button></div></div>`,
    );
    document.querySelector("#cancel-delete").onclick = () => openFilm(id);
    document.querySelector("#confirm-delete").onclick = () => {
      films = films.filter((f) => f.id !== id);
      save();
      closeModal();
      renderPage();
      toast("The film has been removed from your collection.");
    };
  }
  const tab = e.target.closest("[data-filter]");
  if (tab) {
    filter = tab.dataset.filter;
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.classList.toggle("active", b === tab));
    renderCollection();
  }
});
document.addEventListener("keydown", (e) => {
  const modal = document.querySelector("#modal");
  if (modal.hidden) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab") {
    const focusable = [
      ...modal.querySelectorAll(
        'button, input, select, textarea, [tabindex="0"]',
      ),
    ].filter((el) => !el.disabled && el.getClientRects().length);
    const first = focusable[0],
      last = focusable.at(-1);
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
renderPage();
