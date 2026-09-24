import "./style.css";
import "./responsive.css";
import { careers, technologies, icons } from "./data.js";
import { CareerScene } from "./scene.js";

const milestones = document.querySelector("#milestones");
const technologyContainer = document.querySelector("#technologies");
const detailPanel = document.querySelector("#detail-panel");
const stackPanel = document.querySelector("#stack-panel");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let selected = -1;
let scene;
let returnFocus;

milestones.innerHTML = careers
  .map(
    (career, index) => `
  <button class="milestone milestone-${index}" data-index="${index}" aria-label="${career.year}: ${career.role}. Explore ${career.chapter.toLowerCase()}." aria-expanded="false" aria-controls="detail-panel">
    ${index === 3 ? '<span class="milestone-beacon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/></svg></span>' : ""}
    <span class="milestone-label">
      ${index === 3 ? '<span class="current-badge">THE LATEST CHAPTER</span>' : `<span class="milestone-number">0${index + 1} / ${career.chapter.toUpperCase()}</span>`}
      <span class="milestone-year">${career.year}</span>
      <span class="milestone-role">${career.role}</span>
      <span class="milestone-note">${career.note}</span>
    </span>
  </button>
`,
  )
  .join("");

technologyContainer.innerHTML = technologies
  .map(
    (tech) => `
  <button class="technology" data-career="${tech.career}" style="left:${tech.position[0] * 100}%;top:${tech.position[1] * 100}%;--tech-color:${tech.color}" aria-label="Explore ${tech.name} in ${careers[tech.career].year}">
    <span class="tech-icon" aria-hidden="true">${icons[tech.icon]}</span>
    <span><span class="tech-name">${tech.name}</span><span class="tech-note">${tech.note}</span></span>
  </button>
`,
  )
  .join("");

document.querySelector("#stack-content").innerHTML = careers
  .map(
    (career, i) => `
  <div class="stack-group"><p class="stack-group-heading">${career.year} <span> / ${career.role.toUpperCase()}</span></p><div class="detail-tags">${career.technologies.map((tech) => `<button data-career="${i}" aria-label="Explore ${tech} in ${career.year}">${tech}</button>`).join("")}</div></div>
`,
  )
  .join("");

function positionMilestones(positions) {
  document.querySelectorAll(".milestone").forEach((element, index) => {
    element.style.left = `${positions[index][0] * 100}%`;
    element.style.top = `${positions[index][1] * 100}%`;
  });
}

function updateNavigation(view) {
  document.querySelectorAll(".nav-link").forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
}

function selectMilestone(index, moveFocus = false) {
  if (index < 0 || index >= careers.length) return;
  if (detailPanel.hidden)
    returnFocus = stackPanel.contains(document.activeElement)
      ? document.querySelector('[data-view="stack"]')
      : document.activeElement;
  selected = index;
  const career = careers[index];
  stackPanel.hidden = true;
  detailPanel.hidden = false;
  document.querySelector("#detail-kicker").textContent =
    `CHAPTER 0${index + 1} / ${career.chapter.toUpperCase()}`;
  document.querySelector("#detail-content").innerHTML =
    `<p class="detail-year"${index === 3 ? ' style="color:var(--gold)"' : ""}>${career.year}</p><h2 id="detail-title">${career.role}</h2><p class="panel-description">${career.description}</p><div class="detail-tags">${career.technologies.map((tech) => `<span>${tech}</span>`).join("")}</div>`;
  document.querySelector("#detail-progress").textContent =
    `0${index + 1} / 0${careers.length}`;
  document.querySelector("#previous-milestone").disabled = index === 0;
  document.querySelector("#next-milestone").disabled =
    index === careers.length - 1;
  document.querySelectorAll(".milestone").forEach((element, i) => {
    element.classList.toggle("selected", i === index);
    element.setAttribute("aria-expanded", String(i === index));
  });
  document
    .querySelectorAll(".technology")
    .forEach((element) =>
      element.classList.toggle(
        "dimmed",
        Number(element.dataset.career) !== index,
      ),
    );
  document
    .querySelectorAll(".map-index i")
    .forEach(
      (element, i) =>
        (element.style.background = i <= index ? "var(--cyan)" : ""),
    );
  document.querySelector(".map-index>span").textContent = `0${index + 1}`;
  updateNavigation("journey");
  scene?.select(index);
  if (moveFocus)
    detailPanel.querySelector(".close-panel").focus({ preventScroll: true });
}

function closePanels(restoreFocus = false) {
  detailPanel.hidden = true;
  stackPanel.hidden = true;
  selected = -1;
  document.querySelectorAll(".milestone").forEach((element) => {
    element.classList.remove("selected");
    element.setAttribute("aria-expanded", "false");
  });
  document
    .querySelectorAll(".technology")
    .forEach((element) => element.classList.remove("dimmed"));
  document
    .querySelectorAll(".map-index i")
    .forEach((element) => (element.style.background = ""));
  document.querySelector(".map-index>span").textContent = "01";
  scene?.select(-1);
  updateNavigation("overview");
  if (restoreFocus && returnFocus?.isConnected)
    returnFocus.focus({ preventScroll: true });
}

milestones.addEventListener("click", (event) => {
  const button = event.target.closest(".milestone");
  if (button) selectMilestone(Number(button.dataset.index), event.detail === 0);
});

document
  .querySelectorAll("[data-career]")
  .forEach((button) =>
    button.addEventListener("click", (event) =>
      selectMilestone(Number(button.dataset.career), event.detail === 0),
    ),
  );
document
  .querySelector("#explore")
  .addEventListener("click", () => selectMilestone(0, true));
document
  .querySelector("#previous-milestone")
  .addEventListener("click", () => selectMilestone(selected - 1));
document
  .querySelector("#next-milestone")
  .addEventListener("click", () => selectMilestone(selected + 1));
document
  .querySelectorAll(".close-panel")
  .forEach((button) =>
    button.addEventListener("click", () => closePanels(true)),
  );
document.querySelector(".brand").addEventListener("click", (event) => {
  event.preventDefault();
  closePanels();
});
document.querySelectorAll(".nav-link").forEach((button) =>
  button.addEventListener("click", () => {
    if (button.dataset.view === "overview") closePanels();
    if (button.dataset.view === "journey")
      selectMilestone(selected < 0 ? 0 : selected, true);
    if (button.dataset.view === "stack") {
      returnFocus = button;
      closePanels();
      stackPanel.hidden = false;
      updateNavigation("stack");
      stackPanel.querySelector(".close-panel").focus({ preventScroll: true });
    }
  }),
);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && (!detailPanel.hidden || !stackPanel.hidden))
    closePanels(true);
  if (!detailPanel.hidden && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
    selectMilestone(selected + (event.key === "ArrowRight" ? 1 : -1));
  }
});

const setFallbackPositions = () =>
  positionMilestones(
    careers.map((career) =>
      window.innerWidth < 700 ? career.mobilePosition : career.position,
    ),
  );
setFallbackPositions();
try {
  scene = new CareerScene(document.querySelector("#scene"), {
    reducedMotion: motionPreference.matches,
    onLayout: positionMilestones,
  });
} catch (error) {
  console.error("Unable to initialize the 3D career map:", error);
  document.querySelector(".scene-fallback").hidden = false;
  document.querySelector("#scene").classList.add("fallback-grid");
  window.addEventListener("resize", setFallbackPositions);
}

function updateMotionPreference() {
  document.body.classList.toggle("reduced-motion", motionPreference.matches);
  if (scene) {
    scene.reducedMotion = motionPreference.matches;
    scene.hasRendered = false;
  }
}
updateMotionPreference();
motionPreference.addEventListener("change", updateMotionPreference);
