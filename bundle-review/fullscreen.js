const state = {
  bundles: [],
  collectionIndex: 0,
  bookIndex: 0,
  isTransitioning: false,
};

const elements = {
  stage: document.querySelector("#book-stage"),
  collectionPicker: document.querySelector("#collection-picker"),
  collectionTrigger: document.querySelector("#collection-trigger"),
  collectionValue: document.querySelector("#collection-value"),
  collectionMenu: document.querySelector("#collection-menu"),
  rankWatermark: document.querySelector("#rank-watermark"),
  coverRank: document.querySelector("#cover-rank"),
  cover: document.querySelector("#book-cover"),
  position: document.querySelector("#book-position"),
  category: document.querySelector("#book-category"),
  title: document.querySelector("#book-title"),
  authors: document.querySelector("#book-authors"),
  description: document.querySelector("#book-description"),
  overall: document.querySelector("#overall-score"),
  metrics: document.querySelector("#metrics"),
  bookLink: document.querySelector("#book-link"),
  previous: document.querySelector("#previous"),
  next: document.querySelector("#next"),
  shuffle: document.querySelector("#shuffle"),
  slider: document.querySelector("#book-slider"),
  sliderEnd: document.querySelector("#scrubber-end"),
  loading: document.querySelector("#loading"),
};

const transitionClasses = [
  "is-ready",
  "is-leaving-next",
  "is-leaving-previous",
  "is-entering-next",
  "is-entering-previous",
];

function shortBundleName(name) {
  return name.replace(" by Manning", "");
}

function categoryName(name) {
  return shortBundleName(name).replace(" and Applications", "");
}

function collectionOptionsMarkup() {
  return state.bundles
    .map(
      (bundle, index) => `
    <button class="collection-option" type="button" role="option" aria-selected="${index === state.collectionIndex}" data-collection-index="${index}">
      <span class="collection-option-index">${padded(index + 1)}</span>
      <span class="collection-option-name">${shortBundleName(bundle.bundle)}</span>
      <span class="collection-option-count">${bundle.books.length} books</span>
      <span class="collection-option-check" aria-hidden="true">${index === state.collectionIndex ? "&#10003;" : ""}</span>
    </button>`,
    )
    .join("");
}

function setCollectionMenu(open) {
  elements.collectionTrigger.setAttribute("aria-expanded", String(open));
  elements.collectionMenu.classList.toggle("is-open", open);

  if (open) {
    const selected = elements.collectionMenu.querySelector(
      '[aria-selected="true"]',
    );
    selected?.focus();
  }
}

function renderCollectionControl() {
  elements.collectionValue.textContent = shortBundleName(
    state.bundles[state.collectionIndex].bundle,
  );
  elements.collectionMenu.innerHTML = collectionOptionsMarkup();
}

function currentBooks() {
  return state.bundles[state.collectionIndex]?.books || [];
}

function padded(value) {
  return String(value).padStart(2, "0");
}

function metricMarkup(book) {
  const metrics = [
    ["Current", book.scores.current],
    ["Durability", book.scores.durability],
    ["Practical", book.scores.practicality],
  ];

  return metrics
    .map(
      ([label, score]) => `
    <div class="metric">
      <span>${label}</span>
      <div class="metric-track"><i style="width:${score * 10}%"></i></div>
      <strong>${score.toFixed(1)}</strong>
    </div>`,
    )
    .join("");
}

function updateSlider(length) {
  const progress = length > 1 ? (state.bookIndex / (length - 1)) * 100 : 0;
  elements.slider.max = length;
  elements.slider.value = state.bookIndex + 1;
  elements.slider.style.setProperty("--progress", `${progress}%`);
  elements.sliderEnd.textContent = padded(length);
  elements.slider.setAttribute(
    "aria-valuetext",
    `${state.bookIndex + 1} of ${length}`,
  );
}

function renderBook() {
  const books = currentBooks();
  const book = books[state.bookIndex];
  if (!book) return;

  const rank = padded(book.ranking);
  elements.rankWatermark.textContent = rank;
  elements.coverRank.textContent = rank;
  elements.cover.src = book.cover_url;
  elements.cover.alt = `Cover of ${book.title}`;
  elements.position.textContent = `${padded(state.bookIndex + 1)} / ${padded(books.length)}`;
  elements.category.textContent = categoryName(
    state.bundles[state.collectionIndex].bundle,
  );
  elements.title.textContent = book.title;
  elements.authors.textContent = book.authors.join(", ");
  elements.description.textContent = book.description;
  elements.overall.textContent = book.scores.overall.toFixed(1);
  elements.metrics.innerHTML = metricMarkup(book);
  elements.bookLink.href = book.url;
  elements.bookLink.setAttribute(
    "aria-label",
    `View ${book.title} on Manning (opens in a new tab)`,
  );
  updateSlider(books.length);

  elements.cover.onerror = () => {
    elements.cover.style.visibility = "hidden";
  };
  elements.cover.onload = () => {
    elements.cover.style.visibility = "visible";
  };
}

function showBook(index, direction = "next", immediate = false) {
  const books = currentBooks();
  if (!books.length || state.isTransitioning) return;

  const nextIndex = (index + books.length) % books.length;
  if (nextIndex === state.bookIndex && !immediate) return;

  if (immediate) {
    state.bookIndex = nextIndex;
    renderBook();
    elements.stage.classList.add("is-ready");
    return;
  }

  state.isTransitioning = true;
  elements.stage.classList.remove(...transitionClasses);
  elements.stage.classList.add(`is-leaving-${direction}`);

  window.setTimeout(() => {
    state.bookIndex = nextIndex;
    renderBook();
    elements.stage.classList.remove(...transitionClasses);
    void elements.stage.offsetWidth;
    elements.stage.classList.add(`is-entering-${direction}`, "is-ready");

    window.setTimeout(() => {
      elements.stage.classList.remove(`is-entering-${direction}`);
      state.isTransitioning = false;
    }, 560);
  }, 180);
}

function moveBook(step) {
  showBook(state.bookIndex + step, step > 0 ? "next" : "previous");
}

function changeCollection(index) {
  state.collectionIndex = index;
  state.bookIndex = 0;
  renderCollectionControl();
  setCollectionMenu(false);
  elements.collectionTrigger.focus();
  showBook(0, "next", true);
}

function showRandomBook() {
  const books = currentBooks();
  if (books.length < 2) return;

  let index = state.bookIndex;
  while (index === state.bookIndex)
    index = Math.floor(Math.random() * books.length);
  showBook(index, index > state.bookIndex ? "next" : "previous");
}

function attachEvents() {
  elements.previous.addEventListener("click", () => moveBook(-1));
  elements.next.addEventListener("click", () => moveBook(1));
  elements.shuffle.addEventListener("click", showRandomBook);
  elements.collectionTrigger.addEventListener("click", () => {
    setCollectionMenu(
      elements.collectionTrigger.getAttribute("aria-expanded") !== "true",
    );
  });
  elements.collectionMenu.addEventListener("click", (event) => {
    const option = event.target.closest("[data-collection-index]");
    if (option) changeCollection(Number(option.dataset.collectionIndex));
  });
  elements.collectionPicker.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setCollectionMenu(false);
      elements.collectionTrigger.focus();
      return;
    }

    if (!elements.collectionMenu.classList.contains("is-open")) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setCollectionMenu(true);
      }
      return;
    }

    const options = [
      ...elements.collectionMenu.querySelectorAll(".collection-option"),
    ];
    const currentIndex = options.indexOf(document.activeElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      options[(currentIndex + step + options.length) % options.length].focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!elements.collectionPicker.contains(event.target))
      setCollectionMenu(false);
  });
  elements.slider.addEventListener("change", (event) => {
    const index = Number(event.target.value) - 1;
    showBook(index, index >= state.bookIndex ? "next" : "previous");
  });

  document.addEventListener("keydown", (event) => {
    if (
      elements.collectionPicker.contains(event.target) ||
      event.target.matches("input, a")
    )
      return;
    if (event.key === "ArrowLeft") moveBook(-1);
    if (event.key === "ArrowRight") moveBook(1);
  });

  let touchStartX = 0;
  elements.stage.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true },
  );
  elements.stage.addEventListener(
    "touchend",
    (event) => {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 45) moveBook(distance < 0 ? 1 : -1);
    },
    { passive: true },
  );
}

async function init() {
  try {
    const response = await fetch("data.json");
    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`);

    state.bundles = await response.json();
    renderCollectionControl();
    attachEvents();
    showBook(0, "next", true);
    elements.loading.classList.add("is-hidden");
  } catch (error) {
    elements.loading.querySelector("p").textContent =
      "The collection could not be opened";
    console.error(error);
  }
}

init();
