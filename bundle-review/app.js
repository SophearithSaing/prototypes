const state = {
  bundles: [],
  activeBundle: 0,
  query: "",
  sort: "ranking",
  viewerBooks: [],
  viewerIndex: 0,
  lastTrigger: null,
};

const $ = (selector) => document.querySelector(selector);
const elements = {
  heroFigures: $("#hero-figures"),
  weightList: $("#weight-list"),
  methodNote: $("#method-note"),
  tabs: $("#bundle-tabs"),
  collectionKicker: $("#collection-kicker"),
  collectionTitle: $("#collection-title"),
  collectionSummary: $("#collection-summary"),
  resultCount: $("#result-count"),
  featured: $("#featured"),
  featuredGrid: $("#featured-grid"),
  bookGrid: $("#book-grid"),
  emptyState: $("#empty-state"),
  search: $("#search"),
  clearSearch: $("#clear-search"),
  sort: $("#sort"),
  viewer: $("#book-viewer"),
  viewerBook: $("#viewer-book"),
  viewerCount: $("#viewer-count"),
  viewerProgress: $("#viewer-progress"),
  viewerClose: $("#viewer-close"),
  viewerPrevious: $("#viewer-previous"),
  viewerNext: $("#viewer-next"),
};

const scoreLabels = {
  current: "Current",
  durability: "Durability",
  practicality: "Practicality",
};

function formatBundleName(name) {
  return name.replace(" by Manning", "");
}

function renderHero() {
  const totalBooks = state.bundles.reduce((total, bundle) => total + bundle.books.length, 0);
  const averageScore = state.bundles
    .flatMap((bundle) => bundle.books)
    .reduce((total, book, _, books) => total + book.scores.overall / books.length, 0);

  elements.heroFigures.innerHTML = `
    <div><strong>${totalBooks}</strong><span>Selected titles</span></div>
    <div><strong>${state.bundles.length}</strong><span>Curated paths</span></div>
    <div><strong>${averageScore.toFixed(1)}</strong><span>Average score</span></div>`;
}

function renderWeights(bundle) {
  const weights = bundle.ranking_method;
  const rows = [
    ["Current", weights.current_relevance_weight],
    ["Durability", weights.durability_weight],
    ["Practicality", weights.practicality_weight],
  ];
  elements.methodNote.textContent = weights.note;
  elements.weightList.innerHTML = rows.map(([label, weight]) => `
    <div class="weight-row">
      <span>${label}</span>
      <div class="weight-bar"><i style="width:${weight * 100}%"></i></div>
      <strong>${Math.round(weight * 100)}%</strong>
    </div>`).join("");
}

function renderTabs() {
  elements.tabs.innerHTML = state.bundles.map((bundle, index) => `
    <button class="bundle-tab" type="button" role="tab" aria-selected="${index === state.activeBundle}" aria-controls="catalog" data-index="${index}">
      ${String(index + 1).padStart(2, "0")} / ${formatBundleName(bundle.bundle)}
    </button>`).join("");
}

function scoreMarkup(book) {
  return Object.entries(scoreLabels).map(([key, label]) => `
    <div class="score-row">
      <span>${label}</span>
      <div class="score-track"><i style="width:${book.scores[key] * 10}%"></i></div>
      <strong>${book.scores[key].toFixed(1)}</strong>
    </div>`).join("");
}

function featuredCard(book, index) {
  return `
    <article class="feature-card fade-in" data-book-index="${index}" tabindex="0" aria-label="Open ${book.title} in the full screen carousel" style="animation-delay:${index * 90}ms">
      <span class="feature-rank" aria-label="Rank ${book.ranking}">${String(book.ranking).padStart(2, "0")}</span>
      <img class="feature-cover" src="${book.cover_url}" alt="Cover of ${book.title}" loading="${index ? "lazy" : "eager"}" />
      <div class="feature-body">
        <h3>${book.title}</h3>
        <p class="authors">${book.authors.join(", ")}</p>
        <div class="score-tag"><strong>${book.scores.overall.toFixed(2)}</strong><span>overall score</span></div>
      </div>
    </article>`;
}

function bookCard(book, index) {
  const scoreId = `score-${book.ranking}-${index}`;
  const descriptionId = `description-${book.ranking}-${index}`;
  return `
    <article class="book-card fade-in" data-book-index="${index}" tabindex="0" aria-label="Open ${book.title} in the full screen carousel" style="animation-delay:${Math.min(index * 35, 350)}ms">
      <span class="book-rank" aria-label="Rank ${book.ranking}">#${String(book.ranking).padStart(2, "0")}</span>
      <img class="book-cover" src="${book.cover_url}" alt="Cover of ${book.title}" loading="lazy" />
      <div class="book-content">
        <h3>${book.title}</h3>
        <p class="authors">${book.authors.join(", ")}</p>
        <p class="book-summary" id="${descriptionId}">${book.description}</p>
        <button class="description-toggle" type="button" aria-expanded="false" aria-controls="${descriptionId}">Read full note</button>
        <button class="details-toggle" type="button" aria-expanded="false" aria-controls="${scoreId}">
          <span>${book.scores.overall.toFixed(2)}</span>
          <span>View score</span>
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1v10M1 6h10" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>
        </button>
        <div class="score-details" id="${scoreId}">${scoreMarkup(book)}</div>
      </div>
    </article>`;
}

function filteredBooks() {
  const books = [...state.bundles[state.activeBundle].books];
  const query = state.query.trim().toLocaleLowerCase();
  const matchingBooks = query
    ? books.filter((book) => [book.title, book.authors.join(" "), book.description].join(" ").toLocaleLowerCase().includes(query))
    : books;

  return matchingBooks.sort((a, b) => state.sort === "ranking"
    ? a.ranking - b.ranking
    : b.scores[state.sort] - a.scores[state.sort] || a.ranking - b.ranking);
}

function installImageFallbacks() {
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.style.background = "var(--paper-deep)";
      image.style.boxShadow = "none";
      image.alt = `${image.alt} (image unavailable)`;
    }, { once: true });
  });
}

function renderCollection() {
  const bundle = state.bundles[state.activeBundle];
  const books = filteredBooks();
  const isFiltered = state.query.trim() || state.sort !== "ranking";
  state.viewerBooks = books;

  renderTabs();
  renderWeights(bundle);
  elements.collectionKicker.textContent = `Collection ${String(state.activeBundle + 1).padStart(2, "0")}`;
  elements.collectionTitle.textContent = formatBundleName(bundle.bundle);
  elements.collectionSummary.textContent = `${bundle.books.length} books evaluated for relevance, durability, and usefulness in real work.`;
  elements.resultCount.textContent = `${books.length} of ${bundle.books.length} titles`;
  elements.featured.hidden = Boolean(isFiltered);
  elements.featuredGrid.innerHTML = isFiltered ? "" : bundle.books.slice(0, 3).map(featuredCard).join("");
  elements.bookGrid.innerHTML = books.map(bookCard).join("");
  elements.emptyState.hidden = books.length > 0;
  installImageFallbacks();
}

function viewerMarkup(book) {
  return `
    <div class="viewer-cover-wrap"><img class="viewer-cover" src="${book.cover_url}" alt="Cover of ${book.title}" /></div>
    <div class="viewer-content">
      <p class="eyebrow">Rank ${String(book.ranking).padStart(2, "0")} / Selected title</p>
      <h2 id="viewer-title">${book.title}</h2>
      <p class="viewer-authors">${book.authors.join(", ")}</p>
      <p class="viewer-summary">${book.description}</p>
      <div class="viewer-score"><strong>${book.scores.overall.toFixed(2)}</strong><span>Overall score</span></div>
      <div class="viewer-scores">${scoreMarkup(book)}</div>
    </div>`;
}

function renderViewer(direction = "next") {
  const book = state.viewerBooks[state.viewerIndex];
  if (!book) return;
  elements.viewerBook.innerHTML = viewerMarkup(book);
  elements.viewerBook.classList.remove("is-entering-next", "is-entering-previous");
  void elements.viewerBook.offsetWidth;
  elements.viewerBook.classList.add(`is-entering-${direction}`);
  elements.viewerCount.textContent = `${String(state.viewerIndex + 1).padStart(2, "0")} / ${String(state.viewerBooks.length).padStart(2, "0")}`;
  elements.viewerProgress.innerHTML = state.viewerBooks.map((_, index) => `<i class="${index === state.viewerIndex ? "is-active" : ""}"></i>`).join("");
  elements.viewerPrevious.disabled = state.viewerBooks.length < 2;
  elements.viewerNext.disabled = state.viewerBooks.length < 2;
  installImageFallbacks();
}

function openViewer(index, trigger) {
  state.viewerIndex = index;
  state.lastTrigger = trigger;
  renderViewer();
  document.body.classList.add("viewer-open");
  elements.viewer.showModal();
  elements.viewerClose.focus();
}

function closeViewer() {
  elements.viewer.close();
}

function changeViewer(step) {
  if (state.viewerBooks.length < 2) return;
  state.viewerIndex = (state.viewerIndex + step + state.viewerBooks.length) % state.viewerBooks.length;
  renderViewer(step > 0 ? "next" : "previous");
}

function resetSearch() {
  state.query = "";
  elements.search.value = "";
  elements.clearSearch.hidden = true;
  renderCollection();
}

function attachEvents() {
  elements.tabs.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-index]");
    if (!tab) return;
    state.activeBundle = Number(tab.dataset.index);
    state.query = "";
    elements.search.value = "";
    elements.clearSearch.hidden = true;
    renderCollection();
  });

  elements.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    elements.clearSearch.hidden = !state.query;
    renderCollection();
  });

  elements.clearSearch.addEventListener("click", resetSearch);
  $("#reset-search").addEventListener("click", resetSearch);
  elements.sort.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderCollection();
  });

  elements.bookGrid.addEventListener("click", (event) => {
    const descriptionToggle = event.target.closest(".description-toggle");
    if (descriptionToggle) {
      const card = descriptionToggle.closest(".book-card");
      const isOpen = card.classList.toggle("is-description-open");
      descriptionToggle.setAttribute("aria-expanded", String(isOpen));
      descriptionToggle.textContent = isOpen ? "Show less" : "Read full note";
      return;
    }

    const toggle = event.target.closest(".details-toggle");
    if (toggle) {
      const card = toggle.closest(".book-card");
      const isOpen = card.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.querySelector("span:nth-child(2)").textContent = isOpen ? "Hide score" : "View score";
      return;
    }

    const card = event.target.closest("[data-book-index]");
    if (card) openViewer(Number(card.dataset.bookIndex), card);
  });

  elements.featuredGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-book-index]");
    if (card) openViewer(Number(card.dataset.bookIndex), card);
  });

  [elements.bookGrid, elements.featuredGrid].forEach((grid) => grid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (event.target.closest("button")) return;
    const card = event.target.closest("[data-book-index]");
    if (!card) return;
    event.preventDefault();
    openViewer(Number(card.dataset.bookIndex), card);
  }));

  elements.viewerClose.addEventListener("click", closeViewer);
  elements.viewerPrevious.addEventListener("click", () => changeViewer(-1));
  elements.viewerNext.addEventListener("click", () => changeViewer(1));
  elements.viewer.addEventListener("close", () => {
    document.body.classList.remove("viewer-open");
    state.lastTrigger?.focus();
  });
  elements.viewer.addEventListener("click", (event) => {
    if (event.target === elements.viewer) closeViewer();
  });
  document.addEventListener("keydown", (event) => {
    if (!elements.viewer.open) return;
    if (event.key === "ArrowLeft") changeViewer(-1);
    if (event.key === "ArrowRight") changeViewer(1);
  });

  let touchStartX = 0;
  elements.viewerBook.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  elements.viewerBook.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) changeViewer(distance < 0 ? 1 : -1);
  }, { passive: true });
}

async function init() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("Could not load data.json");
    state.bundles = await response.json();
    renderHero();
    renderCollection();
    attachEvents();
  } catch (error) {
    elements.collectionTitle.textContent = "The shelf is unavailable.";
    elements.collectionSummary.textContent = "Serve this folder with a local web server so the book data can be loaded.";
    console.error(error);
  }
}

init();
