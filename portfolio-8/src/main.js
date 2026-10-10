import "./style.css";
import "./responsive.css";
import { milestones, alternatePaths } from "./data.js";
import { CareerScene, getLayout } from "./scene.js";

const milestoneLayer = document.getElementById("milestones");
const alternateLayer = document.getElementById("alternates");
const chapterPanel = document.getElementById("chapter-panel");
const alternateToggle = document.getElementById("alternate-toggle");
const aboutDialog = document.getElementById("about-dialog");
const allChapters = [...milestones, ...alternatePaths];
let scene;
let selectedId = null;
let previousTrigger = null;

const branchIcon =
  '<svg class="branch-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 3v10m0-5c4 0 6-1 6-5M3 11l2 2 2-2M9 5l2-2 2 2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';

milestones.forEach((milestone) => {
  const button = document.createElement("button");
  button.className = "milestone-card";
  button.dataset.node = milestone.id;
  button.dataset.side = milestone.side;
  button.dataset.current = Boolean(milestone.current);
  button.setAttribute(
    "aria-label",
    `${milestone.year}: ${milestone.title}. ${milestone.skills.join(", ")}. Explore this chapter.`,
  );
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "chapter-panel");
  button.innerHTML = `<span class="card-topline"><span class="card-year">${milestone.year}</span>${milestone.current ? '<span class="current-label">PRESENT</span>' : '<span class="card-arrow" aria-hidden="true">↗</span>'}</span><span class="card-title">${milestone.title}</span><span class="card-subtitle">${milestone.skills.join(' <span aria-hidden="true">·</span> ')}</span>`;
  milestoneLayer.append(button);
});

alternatePaths.forEach((path) => {
  const button = document.createElement("button");
  button.className = "alternate-card";
  button.dataset.node = path.id;
  button.dataset.side = path.side;
  button.setAttribute(
    "aria-label",
    `${path.title}, an alternate possibility. Explore this path.`,
  );
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "chapter-panel");
  button.innerHTML = `<span class="card-topline"><span class="alternate-kicker">ANOTHER POSSIBILITY</span>${branchIcon}</span><span class="card-title">${path.title}</span><span class="card-subtitle">${path.subtitle}</span>`;
  alternateLayer.append(button);
});

function selectChapter(id, trigger) {
  const chapter = allChapters.find((entry) => entry.id === id);
  if (!chapter) return;
  if (trigger) previousTrigger = trigger;
  selectedId = id;
  const index = milestones.findIndex((entry) => entry.id === id);
  const isAlternate = index === -1;
  chapterPanel.classList.toggle("is-alternate", isAlternate);
  document.getElementById("chapter-kicker").textContent = isAlternate
    ? "IN ANOTHER UNIVERSE"
    : `CHAPTER 0${index + 1} / ${chapter.year}`;
  document.getElementById("chapter-title").textContent = chapter.title;
  document.getElementById("chapter-description").textContent =
    chapter.description;
  const skills = document.getElementById("chapter-skills");
  skills.replaceChildren(
    ...chapter.skills.map((skill) => {
      const label = document.createElement("span");
      label.textContent = skill;
      return label;
    }),
  );
  document.getElementById("chapter-navigation").hidden = isAlternate;
  document.getElementById("chapter-count").textContent = `0${index + 1} / 04`;
  document.getElementById("previous-chapter").disabled = index <= 0;
  document.getElementById("next-chapter").innerHTML =
    index === 3
      ? 'Back to the start <span aria-hidden="true">↻</span>'
      : 'Next chapter <span aria-hidden="true">→</span>';
  chapterPanel.hidden = false;
  document.body.classList.add("chapter-open");
  document.querySelectorAll("[data-node]").forEach((card) => {
    const selected = card.dataset.node === id;
    card.classList.toggle("is-selected", selected);
    card.setAttribute("aria-expanded", String(selected));
  });
  scene?.select(id);
}

function closeChapter(restoreFocus = false) {
  selectedId = null;
  chapterPanel.hidden = true;
  document.body.classList.remove("chapter-open");
  document.querySelectorAll("[data-node]").forEach((card) => {
    card.classList.remove("is-selected");
    card.setAttribute("aria-expanded", "false");
  });
  scene?.select(null);
  if (restoreFocus && previousTrigger?.isConnected)
    previousTrigger.focus({ preventScroll: true });
}

function setAlternates(show) {
  alternateToggle.setAttribute("aria-pressed", String(show));
  alternateLayer.classList.toggle("is-hidden", !show);
  alternateLayer.inert = !show;
  scene?.showAlternates(show);
  if (!show && alternatePaths.some((path) => path.id === selectedId))
    closeChapter();
}

function resetView(event) {
  event?.preventDefault();
  closeChapter();
  setAlternates(true);
  scene?.reset();
}

document.querySelectorAll("[data-node]").forEach((card) => {
  card.addEventListener("click", () => selectChapter(card.dataset.node, card));
  card.addEventListener("pointerenter", () =>
    scene?.highlight(card.dataset.node),
  );
  card.addEventListener("pointerleave", () => scene?.highlight(null));
  card.addEventListener("focus", () => scene?.highlight(card.dataset.node));
  card.addEventListener("blur", () => scene?.highlight(null));
});

document.getElementById("follow-button").addEventListener("click", (event) => {
  selectChapter(milestones[0].id, event.currentTarget);
  document.getElementById("next-chapter").focus({ preventScroll: true });
});
document
  .getElementById("close-chapter")
  .addEventListener("click", () => closeChapter(true));
document.getElementById("previous-chapter").addEventListener("click", () => {
  const index = milestones.findIndex((entry) => entry.id === selectedId);
  if (index > 0) selectChapter(milestones[index - 1].id);
});
document.getElementById("next-chapter").addEventListener("click", () => {
  const index = milestones.findIndex((entry) => entry.id === selectedId);
  selectChapter(milestones[(index + 1) % milestones.length].id);
});
alternateToggle.addEventListener("click", () =>
  setAlternates(alternateToggle.getAttribute("aria-pressed") !== "true"),
);
document.getElementById("reset-button").addEventListener("click", resetView);
document.querySelector(".brand").addEventListener("click", resetView);
document
  .getElementById("about-button")
  .addEventListener("click", () => aboutDialog.showModal());
document
  .getElementById("close-about")
  .addEventListener("click", () => aboutDialog.close());
aboutDialog.addEventListener("click", (event) => {
  if (event.target !== aboutDialog) return;
  const bounds = aboutDialog.getBoundingClientRect();
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  )
    aboutDialog.close();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !aboutDialog.open && selectedId)
    closeChapter(true);
});

// Keep the content usable if a browser cannot create a WebGL context.
function placeFallbackLabels() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const layout = getLayout(width);
  [...layout.milestones, ...layout.alternates].forEach((item, index) => {
    const card = document.querySelector(
      `[data-node="${allChapters[index].id}"]`,
    );
    const isMain = index < milestones.length;
    const gap = layout.mobile ? (isMain ? 17 : 10) : 22;
    const x =
      item.position[0] * width +
      (item.side === "left" ? -card.offsetWidth - gap : gap);
    card.dataset.side = item.side;
    card.style.transform = `translate(${x}px, ${item.position[1] * height - (isMain ? 27 : 14)}px)`;
  });
  const origin = document.getElementById("origin");
  origin.style.transform = `translate(${layout.origin[0] * width - origin.offsetWidth / 2}px, ${layout.origin[1] * height + 4}px)`;
  const destination = document.getElementById("destination");
  destination.style.transform = `translate(${layout.end[0] * width - destination.offsetWidth / 2}px, ${layout.end[1] * height - 51}px)`;
}

try {
  scene = new CareerScene(document.getElementById("universe"), (id) =>
    selectChapter(id, document.querySelector(`[data-node="${id}"]`)),
  );
} catch (error) {
  console.warn(
    "The interactive canvas is unavailable. The career journey is still accessible.",
    error,
  );
  document.body.classList.add("webgl-unavailable");
  placeFallbackLabels();
  window.addEventListener("resize", placeFallbackLabels);
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => scene?.dispose());
}
