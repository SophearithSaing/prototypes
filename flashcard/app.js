import "@fontsource-variable/dm-sans";
import "@fontsource-variable/lora";
import "@fontsource-variable/lora/wght-italic.css";

const paths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  layers:
    '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
  folder:
    '<path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',
  leaf: '<path d="M20 3c-9-1-17 4-15 12 1 4 6 6 10 3 4-3 5-9 5-15Z"/><path d="M3 21 14 10"/>',
  play: '<path d="m9 5 11 7-11 7V5Z"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  back: '<path d="m15 5-7 7 7 7"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  home: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9Z"/>',
  book: '<path d="M12 5v15M3 4c3-1 6 0 9 2 3-2 6-3 9-2v15c-3-1-6 0-9 2-3-2-6-3-9-2V4Z"/>',
  chart: '<path d="M5 20V10m7 10V4m7 16v-7"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
  swap: '<path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  volume:
    '<path d="m11 4-6 5H2v6h3l6 5V4Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  rotate: '<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7"/>',
  shuffle:
    '<path d="m3 5 4 0 10 14h4M17 15l4 4-4 4M3 19h4l3-4m4-6 3-4h4m-4-4 4 4-4 4"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  upload: '<path d="M12 16V3m-5 5 5-5 5 5M4 15v5h16v-5"/>',
  download: '<path d="M12 3v13m-5-5 5 5 5-5M4 15v5h16v-5"/>',
  file: '<path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8m-8 4h8"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  spark:
    '<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z"/>',
};
const icon = (name, cls = "") =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.book}</svg>`;
document
  .querySelectorAll("[data-icon]")
  .forEach((el) => (el.innerHTML = icon(el.dataset.icon)));

const status =
  '<div class="phone-status"><span>9:41</span><div><span class="signal">▂▄▆</span><svg viewBox="0 0 16 12" fill="none"><path d="M1 4a10 10 0 0 1 14 0M4 7a6 6 0 0 1 8 0M7 10h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span class="battery"></span></div></div>';
const nav = (selected = "home") =>
  `<div class="phone-nav">${[
    ["home", "Home"],
    ["book", "Decks"],
    ["chart", "Progress"],
    ["user", "You"],
  ]
    .map(
      ([i, label]) =>
        `<div class="${selected === i ? "selected" : ""}">${icon(i)}<span>${label}</span></div>`,
    )
    .join("")}</div>`;
const appButton = (text, name = "arrow", cls = "") =>
  `<div class="app-button ${cls}"><span>${text}</span>${name ? icon(name) : ""}</div>`;
const top = (title, right = "more") =>
  `<div class="phone-top">${icon("back")}<span>${title}</span>${icon(right)}</div>`;
const deckRow = (symbol, name, desc, color = "") =>
  `<div class="deck-row"><div class="deck-symbol ${color}">${symbol}</div><div><strong>${name}</strong><span>${desc}</span></div>${icon("back", "chevron-right")}</div>`;
const field = (label, value, extra = "") =>
  `<div class="field-label">${label}</div><div class="input-field">${value}${extra}</div>`;
const screens = [
  {
    group: "overview",
    name: "A warm welcome",
    tag: "HOME",
    content: `<div class="phone-content home-content"><div class="greeting-row"><span class="mini-brand">echo.</span><div class="avatar">A</div></div><div class="small-greeting">MONDAY, MAY 18</div><h3>A little every day.<br><em>A long way to go.</em></h3><p class="app-muted">Good morning, Alex. Let’s keep growing.</p><div class="streak-panel"><div class="streak-icon">${icon("spark")}</div><div><strong>7 days of showing up</strong><span>Your little habit is taking root.</span></div><div class="week-dots"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span class="today">S</span></div></div><div class="app-section-title">Pick up where you left off ${icon("arrow")}</div><div class="featured-deck"><div class="featured-top"><span class="deck-symbol">☀</span><span class="pill">EN ↔ RU</span></div><h4>Everyday Russian</h4><p>Little words. Real conversations.</p><div class="deck-progress"><span></span></div><div class="deck-meta"><span>32 of 100 words explored</span><span>32%</span></div>${appButton("Let’s practice")}</div></div>${nav()}`,
  },
  {
    group: "overview",
    name: "Your little library",
    tag: "DECKS",
    content: `<div class="phone-content"><div class="title-row"><h3>Your decks<span class="title-dot">.</span></h3><div class="square-icon">${icon("plus")}</div></div><p class="app-muted">A world of words, neatly collected.</p><div class="app-search">${icon("search")} Find a deck</div><div class="app-tabs"><span class="active">All decks <b>4</b></span><span>Recently practiced</span></div>${deckRow("☀", "Everyday Russian", "100 cards · EN ↔ RU")}${deckRow("✿", "Out & about", "48 cards · EN ↔ FR", "pink")}${deckRow("☕", "Coffee & conversation", "32 cards · EN ↔ IT", "peach")}${deckRow("⌘", "The little essentials", "64 cards · EN ↔ ES", "blue")}<div class="import-inline">${icon("download")} Bring your words with you <span>Import a deck</span></div></div>${nav("book")}`,
  },
  {
    group: "overview",
    name: "A deck, a new possibility",
    tag: "DECK DETAIL",
    content: `${top("Your collection")}<div class="phone-content deck-detail"><div class="deck-heading"><div><div class="small-greeting">ENGLISH ↔ RUSSIAN</div><h3>Everyday<br>Russian</h3></div><div class="deck-symbol large">☀</div></div><p class="app-muted">For greetings, good coffee, and<br>everything in between.</p><div class="deck-stats"><div><strong>100</strong><span>cards</span></div><div><strong>32</strong><span>explored</span></div><div><strong>12</strong><span>to revisit</span></div></div>${appButton("Practice this deck")}<div class="outline-button">${icon("rotate")} Review 12 tricky words</div><div class="app-section-title">A peek inside <span>View all ${icon("arrow")}</span></div><div class="word-preview"><span>Hello</span><span>Привет</span></div><div class="word-preview"><span>Thank you</span><span>Спасибо</span></div><div class="word-preview"><span>Good morning</span><span>Доброе утро</span></div></div>`,
  },
  {
    group: "overview",
    name: "Practice, your way",
    tag: "SESSION SETUP",
    content: `${top("Set your intention", "close")}<div class="phone-content setup-content"><div class="small-greeting">EVERYDAY RUSSIAN</div><h3>A little or a lot.<br><em>It’s up to you.</em></h3><p class="app-muted">Make room for a moment of learning.</p><div class="field-label">Which way are we going?</div><div class="direction-select"><span><b>EN</b> English</span>${icon("swap")}<span><b>RU</b> Russian</span></div><p class="field-hint">Tap to switch. Same deck, a fresh perspective.</p><div class="field-label">How many cards today?</div><div class="quantity-options"><span class="chosen">10</span><span>20</span><span>50</span><span>All</span></div><div class="session-estimate">10 of 100 cards <span>About 3 minutes</span></div><div class="settings-row"><span>${icon("shuffle")} Shuffle cards</span><span class="toggle on"></span></div><div class="settings-row"><span>${icon("rotate")} Unfamiliar cards first</span><span class="toggle"></span></div><div class="gentle-note">${icon("leaf")} Small sessions count, too.</div>${appButton("Begin practice")}</div>`,
  },
  {
    group: "practice",
    name: "A moment to remember",
    tag: "QUESTION",
    content: `<div class="practice-top">${icon("close")}<span>Everyday Russian</span>${icon("more")}</div><div class="session-progress"><span style="width:40%"></span></div><div class="practice-meta"><span>ENGLISH → RUSSIAN</span><span>4 <i>/ 10</i></span></div><div class="flashcard"><span class="card-language">ENGLISH</span><div class="card-word">Good morning</div><div class="pronunciation">A fresh start, in two words.</div><div class="card-decoration">✳</div><span class="card-prompt">How would you say this in Russian?</span></div><div class="practice-bottom"><p>Take your time. Say it to yourself.</p>${appButton("Reveal translation", "rotate")}<span class="practice-footnote">No typing. Just a little remembering.</span></div>`,
  },
  {
    group: "practice",
    name: "The other side of the word",
    tag: "REVEAL & REFLECT",
    content: `<div class="practice-top">${icon("close")}<span>Everyday Russian</span>${icon("more")}</div><div class="session-progress"><span style="width:40%"></span></div><div class="practice-meta"><span>ENGLISH → RUSSIAN</span><span>4 <i>/ 10</i></span></div><div class="flashcard revealed"><span class="card-language">RUSSIAN</span><div class="card-word cyrillic" lang="ru">Доброе утро</div><div class="pronunciation">Dobroye utro ${icon("volume")}</div><div class="card-divider"></div><span class="translation-label">Good morning</span><p class="example" lang="ru">Доброе утро, как дела?</p><p class="example-translation">Good morning, how are you?</p></div><div class="practice-bottom"><p>How did you do? You’re the judge.</p><div class="grade-buttons"><div class="again">${icon("close")} Not quite</div><div class="correct">${icon("check")} Got it</div></div><span class="practice-footnote">An honest answer is a step forward.</span></div>`,
  },
  {
    group: "practice",
    name: "Room to try again",
    tag: "INCORRECT ANSWER",
    content: `<div class="practice-top">${icon("close")}<span>Everyday Russian</span>${icon("more")}</div><div class="session-progress"><span style="width:40%"></span></div><div class="practice-meta"><span>ENGLISH → RUSSIAN</span><span>4 <i>/ 10</i></span></div><div class="flashcard revealed revisit-card"><span class="card-language">RUSSIAN</span><div class="card-word cyrillic" lang="ru">Доброе утро</div><div class="pronunciation">Dobroye utro ${icon("volume")}</div><div class="card-divider"></div><span class="translation-label">Good morning</span><div class="revisit-chip">${icon("rotate")} Saved for another look</div></div><div class="practice-bottom"><p class="encouragement">Not yet is not never.</p><p class="encouragement-sub">You can revisit this word after your session.</p>${appButton("On to the next word")}<span class="practice-footnote">Learning isn’t a straight line.</span></div>`,
  },
  {
    group: "practice",
    name: "Small wins add up",
    tag: "SESSION COMPLETE",
    content: `<div class="phone-content complete-content"><div class="completion-art"><span class="art-ring"></span><span class="art-stem"></span><span class="art-leaf leaf-one"></span><span class="art-leaf leaf-two"></span><span class="art-leaf leaf-three"></span><span class="art-spark">✳</span><span class="art-dot"></span></div><div class="small-greeting">A LITTLE MORE THAN YESTERDAY</div><h3>Look at you<br><em>growing.</em></h3><p class="app-muted">Ten words practiced.<br>A little more confidence gained.</p><div class="result-stats"><div><span class="result-icon green">${icon("check")}</span><strong>7</strong><span>Got it</span></div><div><span class="result-icon rose">${icon("rotate")}</span><strong>3</strong><span>To revisit</span></div><div><span class="result-icon neutral">${icon("layers")}</span><strong>10<span>/100</span></strong><span>Practiced</span></div></div>${appButton("Revisit 3 tricky words", "rotate")}<div class="text-button">All done for now ${icon("arrow")}</div><span class="practice-footnote">You showed up. That’s what matters.</span></div>`,
  },
  {
    group: "collection",
    name: "Not quite. Not forgotten.",
    tag: "REVIEW MISTAKES",
    content: `${top("A second look")}<div class="phone-content"><div class="small-greeting">EVERYDAY RUSSIAN</div><h3>Some words need<br><em>a little more love.</em></h3><p class="app-muted">Only the cards you marked “Not quite”.<br>No starting over. Just moving forward.</p><div class="review-label"><span>3 WORDS TO REVISIT</span><span class="pill">EN → RU</span></div><div class="review-word"><div><strong>Good morning</strong><span lang="ru">Доброе утро</span></div>${icon("volume")}</div><div class="review-word"><div><strong>Please</strong><span lang="ru">Пожалуйста</span></div>${icon("volume")}</div><div class="review-word"><div><strong>See you soon</strong><span lang="ru">До скорого</span></div>${icon("volume")}</div><div class="review-note">${icon("leaf")} A word learned twice is a word<br>that stays a little longer.</div>${appButton("Practice these 3 words", "rotate")}</div>`,
  },
  {
    group: "collection",
    name: "Words that mean something",
    tag: "CREATE A CARD",
    content: `${top("Add a little knowledge", "close")}<div class="phone-content editor-content"><h3>A new word.<br><em>A new connection.</em></h3><div class="editing-deck">${icon("book")} Everyday Russian ${icon("down")}</div>${field("FRONT · ENGLISH", "Thank you")}${field("BACK · RUSSIAN", '<span lang="ru">Спасибо</span>')}${field("PRONUNCIATION <span>optional</span>", "Spasibo")}${field("A LITTLE CONTEXT <span>optional</span>", '<span lang="ru">Спасибо за помощь!</span><small>Thank you for your help!</small>')}<div class="editor-note">${icon("swap")} One card. Both directions.</div>${appButton("Save this word", "plus")}</div>`,
  },
  {
    group: "collection",
    name: "Bring your words along",
    tag: "IMPORT DECK",
    content: `${top("Import a deck", "close")}<div class="phone-content import-content"><div class="transfer-icon">${icon("download")}</div><h3>Your words.<br><em>A new home.</em></h3><p class="app-muted">Bring a collection you already love.<br>We’ll take care of the rest.</p><div class="drop-zone">${icon("file")}<strong>Choose a file</strong><span>CSV, TSV, or Echo JSON</span></div><div class="import-file">${icon("file")}<div><strong>everyday-russian.csv</strong><span>100 cards · 18 KB</span></div>${icon("check")}</div><div class="import-preview"><div class="field-label">A QUICK PREVIEW <span>100 cards found</span></div><div class="preview-head"><span>English</span><span>Russian</span></div><div><span>Hello</span><span lang="ru">Привет</span></div><div><span>Thank you</span><span lang="ru">Спасибо</span></div></div>${appButton("Import 100 cards", "download")}<span class="practice-footnote">Your collection, always yours.</span></div>`,
  },
  {
    group: "collection",
    name: "Yours to keep. Or share.",
    tag: "EXPORT DECK",
    content: `${top("Export a deck", "close")}<div class="phone-content export-content"><div class="transfer-icon export">${icon("upload")}</div><h3>Good words<br><em>travel well.</em></h3><p class="app-muted">Back up your learning or share<br>a little knowledge with a friend.</p><div class="export-deck">${deckRow("☀", "Everyday Russian", "100 cards · EN ↔ RU")}</div><div class="field-label">CHOOSE A FORMAT</div><div class="format-row selected"><span class="radio selected"></span><div><strong>CSV</strong><span>Simple. Open it anywhere.</span></div><span class="pill">UNIVERSAL</span></div><div class="format-row"><span class="radio"></span><div><strong>Echo JSON</strong><span>All your words, notes & progress.</span></div></div><div class="settings-row export-setting"><span>Include example sentences</span><span class="toggle on"></span></div>${appButton("Export 100 cards", "upload")}<span class="practice-footnote">No lock-in. Just your learning.</span></div>`,
  },
];

screens.forEach((screen, i) => {
  const el = document.createElement("article");
  el.className = "screen-item";
  el.innerHTML = `<div class="screen-label"><span class="screen-index">${String(i + 1).padStart(2, "0")}</span><span class="screen-name">${screen.name}</span><button class="screen-export" data-screen="${i}" aria-label="Export screen ${i + 1}: ${screen.name} as PNG" title="Export PNG · 4× resolution">${icon("download")}</button></div><div class="phone" role="img" aria-label="${screen.tag}: ${screen.name}">${status}${screen.content}<div class="home-indicator"></div></div><div class="screen-caption"><span class="caption-dot"></span>${screen.tag}</div>`;
  document.getElementById(`${screen.group}-screens`).append(el);
});

const links = [...document.querySelectorAll(".nav-link")];
function markActive(id) {
  links.forEach((link) => {
    const active = link.dataset.section === id;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
links.forEach((link) =>
  link.addEventListener("click", () => markActive(link.dataset.section)),
);
document.getElementById("view-flow").addEventListener("click", () => {
  document
    .getElementById("practice")
    .scrollIntoView({ behavior: "smooth", block: "start" });
  markActive("practice");
});
let zoom = 100;
function changeZoom(delta) {
  zoom = Math.min(120, Math.max(70, zoom + delta));
  document.documentElement.style.setProperty("--screen-zoom", zoom / 100);
  document.getElementById("zoom-value").textContent = `${zoom}%`;
  document.getElementById("zoom-out").disabled = zoom === 70;
  document.getElementById("zoom-in").disabled = zoom === 120;
}
document
  .getElementById("zoom-out")
  .addEventListener("click", () => changeZoom(-10));
document
  .getElementById("zoom-in")
  .addEventListener("click", () => changeZoom(10));
const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) markActive(visible[0].target.id);
  },
  { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
);
document
  .querySelectorAll(".screen-section")
  .forEach((section) => observer.observe(section));

const exportAllButton = document.getElementById("export-screens");
const exportLabel = exportAllButton.querySelector(".export-button-label");
const exportStatus = document.getElementById("export-status");
const exportButtons = [
  exportAllButton,
  ...document.querySelectorAll(".screen-export"),
];
let exporting = false;
let statusTimer;

function showExportStatus(message, isError = false) {
  clearTimeout(statusTimer);
  exportStatus.hidden = false;
  exportStatus.textContent = message;
  exportStatus.classList.toggle("is-error", isError);
}

async function runExport(button, index) {
  if (exporting) return;
  exporting = true;
  exportButtons.forEach((el) => (el.disabled = true));
  button.setAttribute("aria-busy", "true");
  showExportStatus("Preparing high-resolution mockups…");
  try {
    // Load the image and ZIP libraries only when an export is requested.
    const { exportScreen, exportScreens } = await import("./export.js");
    const phones = [...document.querySelectorAll(".phone")];
    if (index === undefined) {
      await exportScreens(phones, screens, (done, total, stage) => {
        exportLabel.textContent =
          stage === "colors" ? "Color palette" : `${done}/${total} screens`;
        showExportStatus(
          stage === "colors"
            ? "Preparing the color palette and design tokens…"
            : `Preparing screen ${done} of ${total}…`,
        );
      });
      showExportStatus(
        "ZIP ready: 12 mockups, a color palette, and design tokens.",
      );
    } else {
      await exportScreen(phones[index], screens[index], index);
      showExportStatus(`PNG ready: ${screens[index].name}.`);
    }
  } catch (error) {
    console.error("Mockup export failed:", error);
    showExportStatus("Couldn’t export the mockups. Please try again.", true);
  } finally {
    exporting = false;
    exportButtons.forEach((el) => (el.disabled = false));
    button.removeAttribute("aria-busy");
    exportLabel.textContent = "Export screens";
    statusTimer = setTimeout(() => (exportStatus.hidden = true), 7000);
  }
}

exportAllButton.addEventListener("click", () => runExport(exportAllButton));
document.querySelectorAll(".screen-export").forEach((button) => {
  button.addEventListener("click", () =>
    runExport(button, Number(button.dataset.screen)),
  );
});
