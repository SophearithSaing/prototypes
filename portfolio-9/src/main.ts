import "./style.css";
import { careers, technologies, mobileCareerPositions } from "./data";
import { icons } from "./icons";
import { CareerScene } from "./scene";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <main class="experience" aria-label="Sean D. interactive career portfolio">
    <div class="world" id="world" aria-hidden="true"></div>
    <div class="atmosphere" aria-hidden="true"></div>
    <div class="vignette" aria-hidden="true"></div>
    <div class="grain" aria-hidden="true"></div>

    <header class="header">
      <button class="wordmark" data-action="home" aria-label="Sean D. — return to overview">SEAN D<span>.</span></button>
      <span class="header-role"><span class="status-dot"></span>Software Engineer</span>
      <nav class="navigation" aria-label="Main navigation">
        <button class="nav-link is-active" data-view="home" aria-current="page">Overview</button>
        <button class="nav-link" data-view="journey">Journey</button>
        <button class="nav-link" data-view="stack">Tech stack</button>
        <button class="nav-link" data-view="about">About</button>
      </nav>
      <span class="header-divider" aria-hidden="true"></span>
      <button class="icon-button fullscreen-button" data-action="fullscreen" aria-label="Enter fullscreen" title="Enter fullscreen">${icons.expand}</button>
    </header>

    <section class="intro" aria-label="Introduction">
      <div class="intro-content" id="intro-content"></div>
    </section>

    <div class="scene-note" aria-hidden="true"><span class="note-cross">+</span> A JOURNEY, STILL UNFOLDING <span class="note-line"></span></div>

    <section class="scene-labels" aria-label="Interactive career milestones">
      ${careers
        .map(
          (career, i) => `
        <button class="career-label career-${i}" data-career-label="${i}" data-stage="${i}" style="--accent:${career.color}" aria-label="Explore ${career.year}: ${career.role}">
          <span class="career-year">${career.year}</span>
          <span class="career-role">${career.shortRole}</span>
          <span class="career-summary">${i === 3 ? "Building what’s next." : career.summary.replace("\n", "<br>")}</span>
          <span class="career-discover">Explore chapter ${icons.arrow}</span>
        </button>
        <button class="node-hit" data-career-hit="${i}" data-stage="${i}" style="--accent:${career.color}" aria-label="Select ${career.year} milestone" tabindex="-1"></button>
      `,
        )
        .join("")}
      <div class="summit-badge" aria-hidden="true">${icons.star}</div>
    </section>

    <section class="technology-labels" aria-label="Technologies along the journey">
      ${technologies
        .map(
          (technology) => `
        <button class="tech-label" data-tech-label="${technology.id}" data-tech="${technology.id}" style="--tech-color:${technology.color}" aria-label="Learn about ${technology.name}">
          <span class="tech-icon">${icons[technology.icon]}</span>
          <span class="tech-copy"><span class="tech-name">${technology.name}</span><span class="tech-caption">${technology.caption.replace("\n", "<br>")}</span></span>
        </button>
      `,
        )
        .join("")}
    </section>

    <footer class="scene-footer">
      <div class="explore-hint"><span class="mouse-icon" aria-hidden="true"><span></span></span><span><strong>EVERY LINE HAS A STORY</strong><span class="desktop-hint">Move to explore <span class="hint-dot">·</span> Click to discover</span><span class="mobile-hint">Tap a milestone to discover</span></span></div>
      <nav class="year-navigation" aria-label="Career chapters">
        ${careers.map((career, i) => `<button class="year-button" data-year="${i}" data-stage="${i}" style="--accent:${career.color}" aria-label="Go to ${career.year}: ${career.role}"><span class="year-pip"></span>${career.year}</button>`).join("")}
      </nav>
      <div class="scene-controls">
        <button class="motion-button icon-button" data-action="motion" aria-label="Pause animation" aria-pressed="false" title="Pause animation">${icons.pause}</button>
        <div class="legend" aria-label="Scene layers">
          <div class="legend-row"><span class="legend-line career-line"></span><span>CAREER PATH</span></div>
          <button class="legend-row legend-toggle" data-action="skills" aria-pressed="true" title="Hide technology paths"><span class="legend-line skill-line"></span><span>TECHNOLOGY PATH</span><span class="legend-visibility" aria-hidden="true"></span></button>
        </div>
      </div>
    </footer>
    <div class="sr-only" id="announcement" role="status" aria-live="polite"></div>
  </main>
`;

const intro = document.querySelector<HTMLDivElement>("#intro-content")!;
const announcement = document.querySelector<HTMLDivElement>("#announcement")!;
let scene: CareerScene | undefined;
let currentStage = -1;
let currentView = "home";
let skillsVisible = true;
let motionPaused = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function setNavigation(view: string) {
  currentView = view;
  document.body.dataset.view = view;
  scene?.setStackView(view === "stack");
  document.querySelectorAll<HTMLElement>("[data-view]").forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("is-active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
}

function renderPanel(content: string) {
  intro.innerHTML = content;
  intro.classList.remove("panel-enter");
  requestAnimationFrame(() => intro.classList.add("panel-enter"));
}

function setSelectedStage(index: number) {
  currentStage = index;
  scene?.setSelected(index);
  document.querySelectorAll<HTMLElement>("[data-stage]").forEach((element) => {
    const selected = Number(element.dataset.stage) === index;
    element.classList.toggle("is-selected", selected);
    element.setAttribute("aria-pressed", String(selected));
  });
  document
    .querySelectorAll<HTMLElement>("[data-tech-label]")
    .forEach((element) => {
      const technology = technologies.find(
        (tech) => tech.id === element.dataset.techLabel,
      );
      element.classList.toggle("is-related", technology?.stage === index);
    });
}

function showHome() {
  setNavigation("home");
  setSelectedStage(-1);
  clearTechnologySelection();
  renderPanel(`
    <p class="eyebrow"><span class="eyebrow-dash"></span> SOFTWARE ENGINEER</p>
    <h1 class="hero-name">SEAN <span>D.</span></h1>
    <p class="hero-description">Building scalable solutions.<br>Turning ideas into meaningful products.</p>
    <span class="intro-rule" aria-hidden="true"></span>
    <button class="journey-button" data-action="explore"><span>EXPLORE MY JOURNEY</span>${icons.arrow}</button>
    <p class="intro-footnote"><span>4 CHAPTERS</span><span class="footnote-dot">·</span><span>ONE CONTINUOUS JOURNEY</span></p>
  `);
}

function showCareer(index: number, focus = false) {
  const career = careers[index];
  if (!career) return;
  setNavigation("journey");
  setSelectedStage(index);
  clearTechnologySelection();
  renderPanel(`
    <button class="back-button" data-action="home">${icons.back} BACK TO OVERVIEW</button>
    <p class="eyebrow chapter-eyebrow"><span class="eyebrow-dash"></span> CHAPTER 0${index + 1} / 04 <span class="chapter-status">${index === 3 ? "THE LATEST CHAPTER" : career.chapter.toUpperCase()}</span></p>
    <h1 class="detail-year" style="--accent:${career.color}" tabindex="-1">${career.year}<span class="detail-year-line"></span></h1>
    <h2 class="detail-role">${career.role}</h2>
    <p class="detail-description">${career.description}</p>
    <div class="skill-pills">${career.skills
      .map((skill) => {
        const tech = technologies.find(
          (item) =>
            item.name.includes(skill) ||
            (skill === "PHP" && item.id === "wordpress"),
        );
        return `<button class="skill-pill" data-tech="${tech?.id ?? ""}">${skill} <span>↗</span></button>`;
      })
      .join("")}</div>
    <div class="chapter-navigation"><span>0${index + 1}<span class="chapter-total"> / 04</span></span><button class="next-chapter" data-stage="${(index + 1) % careers.length}">${index === 3 ? "BACK TO THE BEGINNING" : "NEXT CHAPTER"} ${icons.arrow}</button></div>
  `);
  announcement.textContent = `${career.year}. ${career.role}. ${career.chapter}.`;
  if (focus)
    intro.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
}

function clearTechnologySelection() {
  document
    .querySelectorAll(".tech-label")
    .forEach((element) => element.classList.remove("is-selected"));
}

function showTechnology(id: string) {
  const technology = technologies.find((item) => item.id === id);
  if (!technology) return;
  setNavigation("stack");
  setSelectedStage(technology.stage);
  clearTechnologySelection();
  if (!skillsVisible) toggleSkills(true);
  document
    .querySelector(`[data-tech-label="${id}"]`)
    ?.classList.add("is-selected");
  renderPanel(`
    <button class="back-button" data-action="stack">${icons.back} ALL TECHNOLOGIES</button>
    <p class="eyebrow"><span class="eyebrow-dash"></span> PART OF THE ${careers[technology.stage].year} CHAPTER</p>
    <div class="technology-title" style="--tech-color:${technology.color}"><span class="detail-tech-icon">${icons[technology.icon]}</span><h1 tabindex="-1">${technology.name}</h1></div>
    <p class="detail-description technology-description">${technology.description}</p>
    <div class="tech-context"><span class="context-label">THE CHAPTER</span><button data-stage="${technology.stage}"><span>${careers[technology.stage].year} <span class="context-dot">/</span> ${careers[technology.stage].role}</span>${icons.arrow}</button></div>
    <button class="text-link" data-action="stack">EXPLORE THE FULL STACK ${icons.arrow}</button>
  `);
  announcement.textContent = `${technology.name}. ${technology.description}`;
}

function showStack() {
  setNavigation("stack");
  setSelectedStage(-1);
  clearTechnologySelection();
  if (!skillsVisible) toggleSkills(true);
  renderPanel(`
    <button class="back-button" data-action="home">${icons.back} BACK TO OVERVIEW</button>
    <p class="eyebrow"><span class="eyebrow-dash"></span> THE TOOLS ALONG THE WAY</p>
    <h1 class="section-title">A connected<br><span>perspective.</span></h1>
    <p class="stack-description">Every technology opens a new possibility.<br>Explore the tools that shaped the journey.</p>
    <div class="stack-grid">${technologies.map((technology) => `<button class="stack-item" data-tech="${technology.id}" style="--tech-color:${technology.color}"><span>${icons[technology.icon]}</span>${technology.name}${icons.chevron}</button>`).join("")}</div>
  `);
  announcement.textContent =
    "Technology view. Select a technology to explore its part in the journey.";
}

function showAbout() {
  setNavigation("about");
  setSelectedStage(-1);
  clearTechnologySelection();
  renderPanel(`
    <button class="back-button" data-action="home">${icons.back} BACK TO OVERVIEW</button>
    <p class="eyebrow"><span class="eyebrow-dash"></span> THE PERSON BEHIND THE PATH</p>
    <h1 class="section-title">Always curious.<br><span>Always building.</span></h1>
    <p class="detail-description about-description">I’m Sean, a software engineer with a journey that began on the web and grew into frontend development, backend systems, and technical leadership.</p>
    <p class="detail-description about-description">From WordPress to Angular. From Node.js to distributed systems. Each chapter builds on the last — connected by a drive to turn ideas into things that matter.</p>
    <button class="journey-button" data-action="explore"><span>FOLLOW THE JOURNEY</span>${icons.arrow}</button>
  `);
  announcement.textContent =
    "About Sean. From web development to technical leadership.";
}

function toggleSkills(value = !skillsVisible) {
  skillsVisible = value;
  document.body.classList.toggle("skills-hidden", !value);
  document.querySelector<HTMLElement>(".technology-labels")!.inert = !value;
  scene?.setSkillsVisible(value);
  const toggle = document.querySelector<HTMLElement>('[data-action="skills"]')!;
  toggle.setAttribute("aria-pressed", String(value));
  toggle.title = `${value ? "Hide" : "Show"} technology paths`;
  announcement.textContent = `Technology paths ${value ? "visible" : "hidden"}.`;
}

function updateMotionButton() {
  document.body.classList.toggle("motion-paused", motionPaused);
  const button = document.querySelector<HTMLElement>('[data-action="motion"]')!;
  button.innerHTML = motionPaused ? icons.play : icons.pause;
  button.setAttribute(
    "aria-label",
    motionPaused ? "Resume animation" : "Pause animation",
  );
  button.setAttribute("aria-pressed", String(motionPaused));
  button.title = motionPaused ? "Resume animation" : "Pause animation";
}

app.addEventListener("click", async (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
    "button",
  );
  if (!button) return;
  if (button.dataset.stage !== undefined) {
    showCareer(Number(button.dataset.stage));
    return;
  }
  if (button.dataset.tech) {
    showTechnology(button.dataset.tech);
    return;
  }
  const action = button.dataset.action ?? button.dataset.view;
  switch (action) {
    case "home":
      showHome();
      break;
    case "journey":
    case "explore":
      showCareer(0, true);
      break;
    case "stack":
      showStack();
      break;
    case "about":
      showAbout();
      break;
    case "skills":
      toggleSkills();
      break;
    case "motion":
      motionPaused = !motionPaused;
      scene?.setPaused(motionPaused);
      updateMotionButton();
      break;
    case "fullscreen":
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch {
        announcement.textContent =
          "Fullscreen is not available in this browser.";
      }
      break;
  }
});

document.addEventListener("fullscreenchange", () => {
  const button = document.querySelector<HTMLElement>(
    '[data-action="fullscreen"]',
  )!;
  const label = document.fullscreenElement
    ? "Exit fullscreen"
    : "Enter fullscreen";
  button.setAttribute("aria-label", label);
  button.title = label;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && currentView !== "home") {
    showHome();
    document.querySelector<HTMLButtonElement>('[data-view="home"]')?.focus();
  }
  if (
    currentView === "journey" &&
    (event.key === "ArrowRight" || event.key === "ArrowLeft")
  ) {
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    showCareer(
      (currentStage + direction + careers.length) % careers.length,
      true,
    );
  }
});

showHome();
updateMotionButton();

try {
  scene = new CareerScene(document.querySelector<HTMLElement>("#world")!);
} catch (error) {
  console.warn(
    "The 3D scene could not start; showing the accessible career map.",
    error,
  );
  document.body.classList.add("scene-ready", "scene-fallback");
  const placeFallback = () => {
    const mobile = window.innerWidth < 760;
    const positions = mobile
      ? mobileCareerPositions
      : careers.map((career) => career.position);
    positions.forEach(([x, y], i) => {
      document
        .querySelectorAll<HTMLElement>(
          `[data-career-label="${i}"], [data-career-hit="${i}"]`,
        )
        .forEach((element) => {
          element.style.left = `${x * 100}%`;
          element.style.top = `${y * 100}%`;
        });
    });
    technologies.forEach((technology) => {
      const label = document.querySelector<HTMLElement>(
        `[data-tech-label="${technology.id}"]`,
      )!;
      label.style.left = `${technology.position[0] * 100}%`;
      label.style.top = `${technology.position[1] * 100}%`;
    });
  };
  placeFallback();
  window.addEventListener("resize", placeFallback);
}

if (import.meta.hot) import.meta.hot.dispose(() => scene?.dispose());
