const state = {
  bundles: [],
  collection: 0,
  mode: "swipe",
};

const elements = {
  browser: document.querySelector("#book-browser"),
  collection: document.querySelector("#collection"),
  count: document.querySelector("#collection-count"),
  loading: document.querySelector("#loading-state"),
  modeDock: document.querySelector(".mode-dock"),
  random: document.querySelector("#random-book"),
  sheet: document.querySelector("#book-sheet"),
  sheetClose: document.querySelector("#sheet-close"),
  sheetContent: document.querySelector("#sheet-content"),
};

function escapeHtml(value) {
  const node = document.createElement("div");
  node.textContent = value;
  return node.innerHTML;
}

function shortBundleName(name) {
  return name.replace(" by Manning", "");
}

function coverMarkup(book, className = "") {
  return `<img class="${className}" src="${escapeHtml(book.cover_url)}" alt="Cover of ${escapeHtml(book.title)}" loading="lazy" />`;
}

function scoreMarkup(book) {
  const metrics = [
    ["Current", book.scores.current],
    ["Durable", book.scores.durability],
    ["Practical", book.scores.practicality],
  ];

  return `<div class="score-breakdown">${metrics
    .map(
      ([label, value]) => `
    <div class="metric">
      <span>${label}</span>
      <div class="metric-track"><i style="width:${value * 10}%"></i></div>
      <strong>${value.toFixed(1)}</strong>
    </div>`,
    )
    .join("")}</div>`;
}

function publisherLinkMarkup(book) {
  return `
    <a class="publisher-link" href="${escapeHtml(book.url)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHtml(book.title)} on Manning (opens in a new tab)">
      <span>View on Manning</span><span aria-hidden="true">&#8599;</span>
    </a>`;
}

function swipeCard(book, index) {
  return `
    <article class="swipe-card" data-book-index="${index}" tabindex="0">
      <div class="cover-stage">
        <span class="rank-chip">#${String(book.ranking).padStart(2, "0")}</span>
        ${coverMarkup(book)}
      </div>
      <div class="card-copy">
        <div class="title-row">
          <div>
            <h2>${escapeHtml(book.title)}</h2>
            <p class="authors">${book.authors.map(escapeHtml).join(", ")}</p>
            ${publisherLinkMarkup(book)}
          </div>
          <div class="overall-score" aria-label="Overall score ${book.scores.overall.toFixed(2)} out of 10">
            <strong>${book.scores.overall.toFixed(1)}</strong><span>overall</span>
          </div>
        </div>
        <p class="description">${escapeHtml(book.description)}</p>
        <button class="score-toggle" type="button" aria-expanded="false">Score details</button>
        <div class="score-panel"><div>${scoreMarkup(book)}</div></div>
      </div>
    </article>`;
}

function feedCard(book, index) {
  return `
    <article class="feed-card" data-book-index="${index}">
      ${coverMarkup(book, "feed-cover")}
      <div>
        <div class="feed-meta"><span class="feed-rank">#${String(book.ranking).padStart(2, "0")}</span><strong class="feed-score">${book.scores.overall.toFixed(1)}</strong></div>
        <h2>${escapeHtml(book.title)}</h2>
        <p class="authors">${book.authors.map(escapeHtml).join(", ")}</p>
      </div>
      <p class="description">${escapeHtml(book.description)}</p>
      <div class="feed-actions">
        <button class="detail-button" type="button" data-open-sheet>See score breakdown</button>
        ${publisherLinkMarkup(book)}
      </div>
    </article>`;
}

function listBook(book, index) {
  return `
    <button class="list-book" type="button" data-book-index="${index}" data-open-sheet aria-label="Open details for ${escapeHtml(book.title)}">
      <span class="list-rank">${String(book.ranking).padStart(2, "0")}</span>
      ${coverMarkup(book)}
      <span><span class="list-title">${escapeHtml(book.title)}</span><span class="list-authors">${book.authors.map(escapeHtml).join(", ")}</span></span>
      <strong class="list-score">${book.scores.overall.toFixed(1)}</strong>
    </button>`;
}

function currentBooks() {
  return state.bundles[state.collection]?.books || [];
}

function render() {
  const books = currentBooks();
  elements.count.textContent = `${books.length} books`;

  if (state.mode === "swipe") {
    elements.browser.innerHTML = `
      <div class="browser-intro"><p>Swipe sideways, no decisions needed.</p><strong>01 / ${String(books.length).padStart(2, "0")}</strong></div>
      <div class="swipe-track">${books.map(swipeCard).join("")}</div>`;
    installSwipeCounter();
  } else if (state.mode === "feed") {
    elements.browser.innerHTML = `
      <div class="browser-intro"><p>Scroll naturally, pause anywhere.</p><strong>Long view</strong></div>
      <div class="feed-view">${books.map(feedCard).join("")}</div>`;
  } else {
    elements.browser.innerHTML = `
      <div class="browser-intro"><p>Scan the whole ranking quickly.</p><strong>Compact</strong></div>
      <div class="list-view">${books.map(listBook).join("")}</div>`;
  }

  installImageFallbacks();
}

function installSwipeCounter() {
  const track = elements.browser.querySelector(".swipe-track");
  const counter = elements.browser.querySelector(".browser-intro strong");
  const cards = [...track.querySelectorAll(".swipe-card")];
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = cards.indexOf(visible.target);
      counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    },
    { root: track, threshold: [0.55, 0.75] },
  );
  cards.forEach((card) => observer.observe(card));
}

function installImageFallbacks() {
  elements.browser.querySelectorAll("img").forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        image.style.visibility = "hidden";
      },
      { once: true },
    );
  });
}

function openSheet(index) {
  const book = currentBooks()[index];
  if (!book) return;
  elements.sheetContent.innerHTML = `
    <article class="sheet-book">
      <div class="sheet-heading">
        ${coverMarkup(book)}
        <div>
          <span class="sheet-overall">${book.scores.overall.toFixed(1)} overall</span>
          <h2 id="sheet-title">${escapeHtml(book.title)}</h2>
          <p class="authors">${book.authors.map(escapeHtml).join(", ")}</p>
        </div>
      </div>
      <p class="description">${escapeHtml(book.description)}</p>
      ${scoreMarkup(book)}
      ${publisherLinkMarkup(book)}
    </article>`;
  elements.sheet.showModal();
}

function showRandomBook() {
  const books = currentBooks();
  const index = Math.floor(Math.random() * books.length);

  if (state.mode === "swipe") {
    elements.browser
      .querySelector(`[data-book-index="${index}"]`)
      ?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
  } else {
    openSheet(index);
  }
}

function attachEvents() {
  elements.collection.addEventListener("change", (event) => {
    state.collection = Number(event.target.value);
    render();
  });

  elements.modeDock.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mode]");
    if (!button || button.dataset.mode === state.mode) return;
    state.mode = button.dataset.mode;
    elements.modeDock.querySelectorAll("[data-mode]").forEach((modeButton) => {
      modeButton.setAttribute("aria-pressed", String(modeButton === button));
    });
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  elements.browser.addEventListener("click", (event) => {
    const scoreToggle = event.target.closest(".score-toggle");
    if (scoreToggle) {
      const panel = scoreToggle.nextElementSibling;
      const isOpen = panel.classList.toggle("is-open");
      scoreToggle.setAttribute("aria-expanded", String(isOpen));
      return;
    }

    const details = event.target.closest("[data-open-sheet]");
    if (details)
      openSheet(Number(details.closest("[data-book-index]").dataset.bookIndex));
  });

  elements.random.addEventListener("click", showRandomBook);
  elements.sheetClose.addEventListener("click", () => elements.sheet.close());
  elements.sheet.addEventListener("click", (event) => {
    if (event.target === elements.sheet) elements.sheet.close();
  });
}

async function init() {
  try {
    const response = await fetch("data.json");
    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`);
    state.bundles = await response.json();
    elements.collection.innerHTML = state.bundles
      .map(
        (bundle, index) => `
      <option value="${index}">${escapeHtml(shortBundleName(bundle.bundle))}</option>`,
      )
      .join("");
    elements.loading.hidden = true;
    attachEvents();
    render();
  } catch (error) {
    elements.loading.hidden = true;
    elements.browser.innerHTML = `<p class="error-state"><strong>The shelf did not load.</strong>Run this folder through a local web server so the prototype can fetch data.json.</p>`;
    console.error(error);
  }
}

init();
