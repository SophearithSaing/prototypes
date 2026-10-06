const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const PAGE_SIZE = 12;
const STORAGE_KEY = "wellread-reading-list";

const collectionStyles = [
  { label: "Engineering", icon: "code" },
  { label: "AI foundations", icon: "sparkles" },
  { label: "Architecture", icon: "layers" },
  { label: "Programming", icon: "terminal" },
  { label: "AI in production", icon: "cpu" },
  { label: "Cybersecurity", icon: "shield" },
];

function readPreference(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

const storedBooks = readPreference(STORAGE_KEY, []);
const state = {
  collection: "all",
  query: "",
  sort: "overall",
  layout:
    readPreference("wellread-layout", "grid") === "list" ? "list" : "grid",
  view: "library",
  limit: PAGE_SIZE,
  saved: new Set(
    Array.isArray(storedBooks)
      ? storedBooks.filter((id) => typeof id === "string")
      : [],
  ),
};

let collections = [];
let books = [];
let bookMap = new Map();
let toastTimeout;
let loaded = false;

function escapeHTML(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

function safeURL(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol)
      ? escapeHTML(url.href)
      : "";
  } catch {
    return "";
  }
}

function icon(name, extraClass = "") {
  return `<svg class="icon ${extraClass}" aria-hidden="true"><use href="#icon-${name}" /></svg>`;
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(
      /[łøđðþæœß]/g,
      (character) =>
        ({
          ł: "l",
          ø: "o",
          đ: "d",
          ð: "d",
          þ: "th",
          æ: "ae",
          œ: "oe",
          ß: "ss",
        })[character],
    );
}

function getEntry(book) {
  return (
    book.entries.find((entry) => entry.collection.id === state.collection) ??
    book.entries[0]
  );
}

function cover(book, eager = false) {
  return `<span class="cover-object">
    <span class="cover-fallback" aria-hidden="true"><strong>${escapeHTML(book.title)}</strong>${icon("book")}<small>${escapeHTML(book.authors.join(" · "))}</small></span>
    <img class="cover-image" src="${safeURL(book.cover_url)}" alt="" width="250" height="350" loading="${eager ? "eager" : "lazy"}" decoding="async" />
  </span>`;
}

function watchImages(container) {
  container.querySelectorAll(".cover-image").forEach((image) => {
    const showFallback = () => {
      image.hidden = true;
    };
    image.addEventListener("error", showFallback, { once: true });
    if (image.complete && !image.naturalWidth) showFallback();
  });
}

function renderHero() {
  const picks = collections
    .slice(0, 3)
    .map(
      (collection) =>
        collection.books.find((book) => book.ranking === 1) ??
        collection.books[0],
    );
  $("#hero-books").innerHTML = picks
    .map(
      (book, index) => `
    <button class="hero-book hero-book--${index}" data-open-book="${escapeHTML(book.url)}" aria-label="Explore ${escapeHTML(book.title)}">
      ${cover(book, true)}
    </button>
  `,
    )
    .join("");
  watchImages($("#hero-books"));
  $("#total-books").textContent = books.length;
  $("#total-collections").textContent = collections.length;
}

function renderCollectionFilters() {
  const allCollections = [
    { id: "all", label: "All books", icon: "book", bundle: "All collections" },
    ...collections,
  ];
  $("#collection-filters").innerHTML = allCollections
    .map(
      (collection) => `
    <button class="collection-button" data-collection="${collection.id}" aria-pressed="false" title="${escapeHTML(collection.bundle)}">
      ${icon(collection.icon)}<span>${escapeHTML(collection.label)}</span><span class="collection-count"></span>
    </button>
  `,
    )
    .join("");
}

function updateCollectionFilters() {
  $$("[data-collection]").forEach((button) => {
    const id = button.dataset.collection;
    const count = books.filter(
      (book) =>
        (state.view !== "saved" || state.saved.has(book.id)) &&
        (id === "all" ||
          book.entries.some((entry) => entry.collection.id === id)),
    ).length;
    button.classList.toggle("is-active", state.collection === id);
    button.setAttribute("aria-pressed", String(state.collection === id));
    button.querySelector(".collection-count").textContent = count;
  });
}

function filteredBooks() {
  const words = normalize(state.query.trim()).split(/\s+/).filter(Boolean);
  return books
    .filter((book) => {
      if (state.view === "saved" && !state.saved.has(book.id)) return false;
      if (
        state.collection !== "all" &&
        !book.entries.some((entry) => entry.collection.id === state.collection)
      )
        return false;
      return words.every((word) => book.searchText.includes(word));
    })
    .sort((a, b) => {
      if (state.sort === "title") return a.title.localeCompare(b.title);
      const first = getEntry(a);
      const second = getEntry(b);
      const difference =
        state.sort === "ranking"
          ? first.ranking - second.ranking
          : second.scores[state.sort] - first.scores[state.sort];
      return difference || a.title.localeCompare(b.title);
    });
}

function bookCard(book, index) {
  const entry = getEntry(book);
  const saved = state.saved.has(book.id);
  return `<article class="book-card theme-${entry.collection.theme}" style="animation-delay: ${Math.min(index, 7) * 25}ms">
    <div class="cover-stage">
      ${entry.ranking === 1 ? `<span class="top-pick" title="Ranked #1 in ${escapeHTML(entry.collection.bundle)}">${icon("star")} TOP PICK</span>` : ""}
      <button class="cover-button" data-open-book="${escapeHTML(book.id)}" aria-label="Explore ${escapeHTML(entry.title)}">${cover(entry, index < 4)}</button>
      <button class="icon-button save-button${saved ? " is-saved" : ""}" data-save="${escapeHTML(book.id)}" aria-label="${saved ? "Remove" : "Save"} ${escapeHTML(book.title)} ${saved ? "from" : "to"} your reading list" aria-pressed="${saved}" title="${saved ? "Remove from reading list" : "Save to reading list"}">${icon("bookmark")}</button>
    </div>
    <div class="book-information">
      <p class="book-category"><span class="category-dot"></span>${escapeHTML(entry.collection.label)}${book.entries.length > 1 && state.collection === "all" ? `<span title="In ${book.entries.length} collections">+${book.entries.length - 1}</span>` : ""}</p>
      <h3><button class="book-title-button" data-open-book="${escapeHTML(book.id)}">${escapeHTML(entry.title)}</button></h3>
      <p class="book-authors" title="${escapeHTML(entry.authors.join(", "))}">${escapeHTML(entry.authors.join(", "))}</p>
      <p class="book-description">${escapeHTML(entry.description)}</p>
      <div class="book-card-footer">
        <span class="score" aria-label="Overall score: ${entry.scores.overall.toFixed(2)} out of 10">${icon("star")}<strong>${entry.scores.overall.toFixed(2)}</strong><span>/ 10</span></span>
        <button class="book-details-link" data-open-book="${escapeHTML(book.id)}" aria-label="Details for ${escapeHTML(entry.title)}"><span>Take a look</span>${icon("arrow-up")}</button>
      </div>
    </div>
  </article>`;
}

function emptyState() {
  if (
    state.view === "saved" &&
    !books.some((book) => state.saved.has(book.id))
  ) {
    return `<div class="empty-state">${icon("bookmark")}<h3>Your next reads belong here.</h3><p>See something that sparks your curiosity? Tap the bookmark to keep it on your own little shelf.</p><button class="button button-primary" data-explore>Explore the library ${icon("arrow")}</button></div>`;
  }
  return `<div class="empty-state">${icon("search")}<h3>A different shelf, perhaps?</h3><p>No books match these filters. Try another title, author, or idea.</p><button class="button button-secondary" data-clear-filters>Clear filters ${icon("arrow")}</button></div>`;
}

function renderBooks() {
  if (!loaded) return;
  const filtered = filteredBooks();
  const visible = filtered.slice(0, state.limit);
  const grid = $("#book-grid");
  grid.classList.toggle("is-list", state.layout === "list");
  grid.innerHTML = visible.length
    ? visible.map(bookCard).join("")
    : emptyState();
  grid.setAttribute("aria-busy", "false");
  watchImages(grid);

  $("#result-count").innerHTML =
    `<strong>${filtered.length}</strong> ${filtered.length === 1 ? "book" : "books"}<span class="result-context">${state.query || state.collection !== "all" ? " found" : " to explore"}</span>`;
  $("#load-more-section").hidden = filtered.length === 0;
  $("#showing-count").textContent =
    `You’ve explored ${visible.length} of ${filtered.length} books`;
  $("#reading-progress").style.width =
    `${filtered.length ? (visible.length / filtered.length) * 100 : 0}%`;
  $("#load-more").hidden = visible.length >= filtered.length;
  $("#clear-search").hidden = !state.query;
  $("#search-shortcut").hidden = Boolean(state.query);
  updateCollectionFilters();
  updateNavigation();
  updateLayoutButtons();
}

function updateNavigation() {
  const savedView = state.view === "saved";
  const count = books.filter((book) => state.saved.has(book.id)).length;
  $("#saved-count").textContent = count;
  $("#library-nav").classList.toggle("is-active", !savedView);
  $("#saved-nav").classList.toggle("is-active", savedView);
  $("#library-nav").toggleAttribute("aria-current", !savedView);
  $("#saved-nav").toggleAttribute("aria-current", savedView);
  (savedView ? $("#saved-nav") : $("#library-nav")).setAttribute(
    "aria-current",
    "page",
  );
  $("#library-title").innerHTML = savedView
    ? "Your reading list<span>.</span>"
    : "Explore the shelves<span>.</span>";
  $("#section-subtitle").textContent = savedView
    ? "Good ideas, saved for later."
    : "Find something worth your time.";
  document.title = savedView
    ? "Your reading list — Wellread"
    : "Wellread — Good books. Better thinking.";
}

function updateLayoutButtons() {
  $$("[data-layout]").forEach((button) => {
    const active = button.dataset.layout === state.layout;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function updateSaveButtons() {
  $$("[data-save]").forEach((button) => {
    const book = bookMap.get(button.dataset.save);
    if (!book) return;
    const saved = state.saved.has(book.id);
    button.classList.toggle("is-saved", saved);
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute(
      "aria-label",
      `${saved ? "Remove" : "Save"} ${book.title} ${saved ? "from" : "to"} your reading list`,
    );
    button.title = saved ? "Remove from reading list" : "Save to reading list";
    if (button.classList.contains("detail-save")) {
      button.innerHTML = `${icon("bookmark")}${saved ? "Saved to reading list" : "Save for later"}`;
    }
  });
}

function notify(message) {
  clearTimeout(toastTimeout);
  const toast = $("#toast");
  toast.innerHTML = `${icon("check")}<span>${escapeHTML(message)}</span>`;
  toast.classList.add("is-visible");
  toastTimeout = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function toggleSave(id) {
  const book = bookMap.get(id);
  if (!book) return;
  const willSave = !state.saved.has(id);
  if (willSave) state.saved.add(id);
  else state.saved.delete(id);
  let persisted = true;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.saved]));
  } catch {
    persisted = false;
  }

  // Preserve the focused card while browsing; a saved shelf must also remove it.
  if (state.view === "saved") {
    const focusedOnCard = $("#book-grid").contains(document.activeElement);
    renderBooks();
    if (focusedOnCard)
      (
        $("#book-grid [data-save]") ??
        $("#book-grid button") ??
        $("#library")
      ).focus({ preventScroll: true });
  }
  updateSaveButtons();
  updateNavigation();
  updateCollectionFilters();
  notify(
    willSave
      ? persisted
        ? "A good read, saved for later."
        : "Saved to your reading list for this visit."
      : "Removed from your reading list.",
  );
}

function openDialog(dialog) {
  dialog.showModal();
  document.body.classList.add("modal-open");
}

function openBook(id) {
  const book = bookMap.get(id);
  if (!book) return;
  const entry = getEntry(book);
  const saved = state.saved.has(id);
  const factors = [
    ["current", "Current relevance"],
    ["durability", "Durability"],
    ["practicality", "Practicality"],
  ];
  $("#book-detail").innerHTML = `
    <div class="detail-top">
      <div class="detail-cover theme-${entry.collection.theme}">${cover(entry, true)}</div>
      <div class="detail-heading">
        <p class="book-category theme-${entry.collection.theme}"><span class="category-dot"></span>${escapeHTML(entry.collection.label)}</p>
        <h2 id="detail-title">${escapeHTML(entry.title)}</h2>
        <p class="detail-authors">By ${escapeHTML(entry.authors.join(", "))}</p>
        ${entry.released ? `<p class="detail-release">Released ${escapeHTML(entry.released)}</p>` : ""}
        <div class="detail-overall" aria-label="Overall score ${entry.scores.overall.toFixed(2)} out of 10">${icon("star")}<strong>${entry.scores.overall.toFixed(2)}</strong><span>/ 10 overall</span></div>
      </div>
    </div>
    <div class="detail-body">
      <h3>What’s inside</h3>
      <p class="detail-description">${escapeHTML(entry.description)}</p>
      <div class="score-breakdown" aria-label="Score breakdown">
        ${factors.map(([key, label]) => `<div class="score-factor"><div class="score-label"><span>${label}</span><strong>${entry.scores[key].toFixed(1)} <span class="sr-only">out of 10</span></strong></div><div class="score-meter" aria-hidden="true"><span style="width: ${Math.max(0, Math.min(100, entry.scores[key] * 10))}%"></span></div></div>`).join("")}
      </div>
      <div class="detail-collections" aria-label="Collection rankings">${book.entries.map((item) => `<span class="detail-collection">#${item.ranking} in ${escapeHTML(item.collection.bundle)}</span>`).join("")}</div>
      <div class="detail-actions">
        <a class="button button-primary" href="${safeURL(entry.url)}" target="_blank" rel="noopener noreferrer">Visit the publisher ${icon("arrow-up")}<span class="sr-only">(opens in a new tab)</span></a>
        <button class="button button-secondary detail-save${saved ? " is-saved" : ""}" data-save="${escapeHTML(id)}" aria-pressed="${saved}">${icon("bookmark")}${saved ? "Saved to reading list" : "Save for later"}</button>
      </div>
    </div>`;
  watchImages($("#book-detail"));
  openDialog($("#book-dialog"));
}

function openRankings() {
  if (!loaded) return;
  const collection =
    collections.find((item) => item.id === state.collection) ?? collections[0];
  const method = collection.ranking_method;
  const factors = [
    {
      label: "Current relevance",
      weight: method.current_relevance_weight,
      text: "How well the ideas meet the challenges of today.",
    },
    {
      label: "Durability",
      weight: method.durability_weight,
      text: "Foundations that stay useful long after the next release.",
    },
    {
      label: "Practicality",
      weight: method.practicality_weight,
      text: "Knowledge you can take off the page and put to work.",
    },
  ];
  $("#rankings-content").innerHTML = `
    ${icon("sparkles")}
    <p class="eyebrow">A LITTLE METHOD TO THE BOOKSHELF</p>
    <h2>Good reads.<br />Thoughtfully ranked.</h2>
    <p class="rankings-intro">Every book is scored out of 10 on three things that matter. The collection’s overall score balances them, so you can find a read that’s worth your time.</p>
    ${factors.map((factor) => `<div class="ranking-factor"><span class="factor-weight">${Math.round(factor.weight * 100)}%</span><div><h3>${factor.label}</h3><p>${factor.text}</p></div></div>`).join("")}
    <p class="rankings-note">${escapeHTML(method.note)} Rankings are relative to each collection. Books in more than one collection appear once in the library, with every collection rank available in their details.</p>
    <a class="rankings-source" href="./data.json" target="_blank" rel="noopener">View the original data ${icon("arrow-up")}<span class="sr-only">(opens in a new tab)</span></a>`;
  openDialog($("#rankings-dialog"));
}

function resetFilters() {
  state.collection = "all";
  state.query = "";
  state.limit = PAGE_SIZE;
  $("#book-search").value = "";
  renderBooks();
}

function switchView(view) {
  state.view = view;
  resetFilters();
  $("#library").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function loadLibrary() {
  loaded = false;
  $("#book-grid").setAttribute("aria-busy", "true");
  try {
    const response = await fetch("./data.json");
    if (!response.ok)
      throw new Error(`Unable to load data (${response.status})`);
    const data = await response.json();
    if (
      !Array.isArray(data) ||
      !data.length ||
      data.some(
        (collection) =>
          !Array.isArray(collection.books) || !collection.books.length,
      )
    ) {
      throw new Error("Expected a collection of books");
    }

    collections = data.map((collection, index) => ({
      ...collection,
      ...(collectionStyles[index] ?? {
        label: collection.bundle,
        icon: "book",
      }),
      id: String(index),
      theme: index % 6,
    }));
    bookMap = new Map();
    collections.forEach((collection) => {
      collection.books.forEach((entry) => {
        const existing = bookMap.get(entry.url);
        if (existing) existing.entries.push({ ...entry, collection });
        else
          bookMap.set(entry.url, {
            ...entry,
            id: entry.url,
            entries: [{ ...entry, collection }],
          });
      });
    });
    books = [...bookMap.values()].map((book) => ({
      ...book,
      searchText: normalize(
        [
          book.title,
          ...book.authors,
          book.description,
          ...book.entries.flatMap((entry) => [
            entry.title,
            entry.collection.bundle,
            entry.collection.label,
          ]),
        ].join(" "),
      ),
    }));
    bookMap = new Map(books.map((book) => [book.id, book]));
    loaded = true;
    renderHero();
    renderCollectionFilters();
    renderBooks();
  } catch (error) {
    console.error("The library could not be opened:", error);
    $("#book-grid").setAttribute("aria-busy", "false");
    $("#book-grid").innerHTML =
      `<div class="empty-state">${icon("book")}<h3>This shelf needs a moment.</h3><p>We couldn’t load the book collection. Please try again.</p><button class="button button-primary" data-retry>Try again ${icon("arrow")}</button></div>`;
    $("#result-count").textContent = "Library unavailable";
    $("#load-more-section").hidden = true;
  }
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.hasAttribute("data-open-book")) openBook(button.dataset.openBook);
  else if (button.hasAttribute("data-save")) toggleSave(button.dataset.save);
  else if (button.hasAttribute("data-open-rankings")) openRankings();
  else if (button.hasAttribute("data-close-dialog"))
    button.closest("dialog").close();
  else if (button.hasAttribute("data-collection")) {
    state.collection = button.dataset.collection;
    state.limit = PAGE_SIZE;
    renderBooks();
  } else if (button.hasAttribute("data-layout")) {
    state.layout = button.dataset.layout;
    try {
      localStorage.setItem("wellread-layout", JSON.stringify(state.layout));
    } catch {
      /* The layout still works for this visit. */
    }
    renderBooks();
  } else if (button.hasAttribute("data-clear-filters")) {
    resetFilters();
    $("#book-search").focus();
  } else if (button.hasAttribute("data-explore")) switchView("library");
  else if (button.hasAttribute("data-retry")) loadLibrary();
});

$("#book-search").addEventListener("input", (event) => {
  state.query = event.target.value;
  state.limit = PAGE_SIZE;
  renderBooks();
});

$("#clear-search").addEventListener("click", () => {
  state.query = "";
  state.limit = PAGE_SIZE;
  $("#book-search").value = "";
  renderBooks();
  $("#book-search").focus();
});

$("#book-sort").addEventListener("change", (event) => {
  state.sort = event.target.value;
  state.limit = PAGE_SIZE;
  renderBooks();
});

$("#load-more").addEventListener("click", () => {
  const previousLimit = state.limit;
  state.limit += PAGE_SIZE;
  renderBooks();
  // Move focus to the first new title, without jumping past its cover.
  $$(".book-title-button")[previousLimit]?.focus({ preventScroll: true });
});

$("#library-nav").addEventListener("click", () => switchView("library"));
$("#saved-nav").addEventListener("click", () => switchView("saved"));

document.addEventListener("keydown", (event) => {
  const isTyping = event.target.matches(
    "input, textarea, select, [contenteditable='true']",
  );
  if (
    event.key === "/" &&
    !isTyping &&
    !$("dialog[open]") &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey
  ) {
    event.preventDefault();
    $("#book-search").focus();
  }
});

window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  const saved = readPreference(STORAGE_KEY, []);
  state.saved = new Set(
    Array.isArray(saved) ? saved.filter((id) => typeof id === "string") : [],
  );
  renderBooks();
  updateSaveButtons();
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    if (!$("dialog[open]")) document.body.classList.remove("modal-open");
  });
});

loadLibrary();
