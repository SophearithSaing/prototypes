import "./style.css";
import "./road.css";
import type { createJourneyScene, RoadSceneState } from "./scene";

const icons = {
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  down: '<path d="M12 4v15m-6-6 6 6 6-6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  sound:
    '<path d="m11 5-6 4H2v6h3l6 4V5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  muted: '<path d="m11 5-6 4H2v6h3l6 4V5Zm5 4 5 6m-5 0 5-6"/>',
  pause: '<path d="M9 5v14M15 5v14"/>',
  play: '<path d="m8 5 11 7-11 7V5Z"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  road: '<path d="M7 3 3 21M17 3l4 18M12 3v3m0 5v3m0 5v2"/>',
};

function icon(name: keyof typeof icons, className = "") {
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
}

const spark =
  '<svg class="spark" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 2v36M2 20h36M7.3 7.3l25.4 25.4M7.3 32.7 32.7 7.3" stroke="currentColor" stroke-width="1.3"/><circle cx="20" cy="20" r="7" stroke="currentColor" stroke-width="1.3"/><circle cx="20" cy="20" r="2.2" fill="currentColor"/></svg>';
const email = "hello@sophearith.dev";

const milestones = [
  {
    year: "2018",
    role: "Computer Science",
    note: "A spark of curiosity",
    title: "It started with a <em>what if.</em>",
    description:
      "A blank editor, a blinking cursor, and the realization that a few lines of code could become something people could use. Studying computer science gave that curiosity a foundation.",
    reflection:
      "The most important thing I learned was not a programming language. It was how to stay curious when I did not have the answer.",
    skills: [
      "The fundamentals",
      "Creative problem-solving",
      "First experiments",
    ],
  },
  {
    year: "2020",
    role: "Frontend Developer",
    note: "Ideas into interfaces",
    title: "Making things <em>real.</em>",
    description:
      "My first full-time role brought ideas out of the classroom and into the browser. I found my place in the space between design and engineering, making interfaces that felt as good as they worked.",
    reflection:
      "Small details are not small when someone interacts with them every day. This is where my love for thoughtful frontend development began.",
    skills: ["JavaScript", "Responsive interfaces", "Design systems"],
  },
  {
    year: "2022",
    role: "Software Engineer",
    note: "Growth & possibility",
    title: "Finding my <em>stride.</em>",
    description:
      "Moving beyond individual screens, I began thinking in systems. Collaborating across disciplines taught me to connect the details of implementation with the bigger picture of a product.",
    reflection:
      "Good software is a team sport. Listening well and asking the right questions turned out to be just as useful as writing the right code.",
    skills: ["React & TypeScript", "Product thinking", "Collaboration"],
  },
  {
    year: "2024",
    role: "Senior Engineer",
    note: "The bigger picture",
    title: "Room to <em>grow.</em>",
    description:
      "Leading projects meant finding clarity in ambiguity, helping other developers grow, and making technical decisions with care. The work became less about what I could build alone and more about what we could build together.",
    reflection:
      "Keep the architecture simple, the conversation open, and the person on the other side of the screen at the center.",
    skills: ["Technical direction", "Mentorship", "Craft at scale"],
  },
  {
    year: "2026",
    role: "Building my vision",
    note: "The story continues",
    title: "A path of my <em>own.</em>",
    description:
      "Today, I am bringing design sensibility and engineering experience together as an independent creative developer. Exploring the web as a place for useful tools, unexpected interactions, and a little wonder.",
    reflection:
      "Not every possibility becomes a path. But every experiment teaches me something. I am excited about the ones still ahead.",
    skills: [
      "Independent practice",
      "Creative development",
      "Three.js & WebGL",
    ],
  },
];

const orbitArt = `<div class="project-art orbit-art" aria-hidden="true">
  <div class="orbit-aura"></div><div class="orbit-window">
    <div class="mock-sidebar"><span class="mock-brand">o.</span><i class="selected"></i><i></i><i></i><i></i><span class="mock-avatar">S</span></div>
    <div class="mock-dashboard"><div class="mock-top"><span>Workspace overview</span><span class="mock-period">Last 30 days &#8964;</span></div>
      <div class="mock-greeting">A little clarity.<br>A lot of possibility.</div>
      <div class="mock-metrics"><div><small>Total revenue</small><strong>$48,290<span>+18.6%</span></strong></div><div><small>Active customers</small><strong>2,408<span>+12.4%</span></strong></div></div>
      <div class="mock-chart-title">Revenue over time <span>&#8599;</span></div>
      <svg class="mock-chart" viewBox="0 0 320 110" preserveAspectRatio="none"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#b5a0ff" stop-opacity=".24"/><stop offset="1" stop-color="#b5a0ff" stop-opacity="0"/></linearGradient></defs><path d="M0 28H320M0 58H320M0 88H320" stroke="#ffffff" stroke-opacity=".055"/><path d="M0 93 22 82 40 86 59 59 78 65 96 46 113 57 138 31 161 39 182 24 201 32 226 15 249 24 271 8 292 16 320 2V110H0Z" fill="url(#chart-fill)"/><path d="M0 93 22 82 40 86 59 59 78 65 96 46 113 57 138 31 161 39 182 24 201 32 226 15 249 24 271 8 292 16 320 2" fill="none" stroke="#b9a4f3" stroke-width="2" stroke-linejoin="round"/></svg>
    </div>
  </div><span class="art-corner">LESS NOISE. MORE SIGNAL.</span>
</div>`;

const formaArt = `<div class="project-art forma-art" aria-hidden="true">
  <div class="forma-browser"><div class="forma-nav"><b>forma<span>&reg;</span></b><span>Spaces &nbsp;&nbsp; Our approach &nbsp;&nbsp; &#8599;</span></div>
    <div class="forma-title">Spaces for<br><i>living well.</i></div><div class="architecture"><div class="arch-shadow"></div><div class="arch arch-back"></div><div class="arch arch-front"></div><div class="arch-block"></div><div class="arch-ball"></div></div>
    <div class="forma-foot"><span>CONSIDERED SPACES.<br>EXTRAORDINARY EVERYDAY.</span><span class="forma-circle">&#8599;</span></div>
  </div><span class="art-corner">A SENSE OF PLACE.</span>
</div>`;

const stillArt = `<div class="project-art still-art" aria-hidden="true">
  <div class="still-ripple ripple-one"></div><div class="still-ripple ripple-two"></div><div class="still-ripple ripple-three"></div>
  <span class="still-wordmark">still<span>&reg;</span></span><div class="still-orb"></div><div class="still-title">A moment.<br>Just for you.</div><span class="still-breathe">BREATHE IN. &nbsp; LET GO.</span><span class="still-play">${icon("play")}</span>
</div>`;

const projects = [
  {
    name: "Orbit",
    category: "PRODUCT DESIGN & DEVELOPMENT",
    year: "2026",
    summary: "A calmer way to see the bigger picture.",
    art: orbitArt,
    description:
      "An independent dashboard concept that turns complex business data into a clear, focused workspace. Built around a simple question: what if analytics helped you think, instead of making you work harder?",
    detail:
      "The exploration brings together a modular interface, purposeful data visualization, and a quiet visual system. Every interaction is designed to make the next decision a little easier.",
    stack: ["React", "TypeScript", "Data visualization"],
    kind: "Independent concept",
  },
  {
    name: "Forma",
    category: "DESIGN & CREATIVE DEVELOPMENT",
    year: "2025",
    summary: "Digital space for considered spaces.",
    art: formaArt,
    description:
      "A digital identity and website concept for an architecture practice. Warm materials, generous typography, and a deliberate pace translate the feeling of a physical space into the browser.",
    detail:
      "The design pairs an editorial grid with subtle, scroll-led transitions. An exercise in knowing what to leave out, and letting the work speak for itself.",
    stack: ["Next.js", "CSS animation", "Art direction"],
    kind: "Independent concept",
  },
  {
    name: "Still",
    category: "INTERACTIVE WEB EXPERIENCE",
    year: "2025",
    summary: "A small pause in a very noisy world.",
    art: stillArt,
    description:
      "An experimental breathing and ambient sound experience. A living, light-filled sphere responds to a gentle breathing rhythm, creating a small pocket of calm right in your browser.",
    detail:
      "An exploration of how real-time graphics and generative audio can make the web feel less like a tool and more like a place. Designed to be quiet, accessible, and unhurried.",
    stack: ["Three.js", "Web Audio", "GLSL"],
    kind: "Creative exploration",
  },
];

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="#journey" aria-label="Sophearith, back to the journey">${spark}<span class="brand-type">SOPHEARITH<span>CREATIVE DEVELOPER</span></span></a>
    <nav aria-label="Main navigation"><a class="nav-link active" href="#journey">The journey<span class="nav-dot"></span></a><a class="nav-link" href="#work">Selected work<span class="nav-dot"></span></a><a class="nav-link" href="#about">About me<span class="nav-dot"></span></a></nav>
    <button class="header-contact" data-contact aria-label="Let's talk about your next project"><span class="availability-dot"></span><span>Let's talk</span>${icon("diagonal")}</button>
  </header>
  <main id="main">
    <section class="hero" id="journey" aria-labelledby="hero-title">
      <div class="ambient-stars" aria-hidden="true">${Array.from({ length: 42 }, (_, i) => `<i style="--x:${(i * 73.17 + 3) % 100}%;--y:${(i * 37.91 + 7) % 100}%;--opacity:${0.13 + (i % 5) * 0.08}"></i>`).join("")}</div>
      <div class="hero-intro">
        <p class="eyebrow"><span class="little-line"></span>A STORY, STILL UNFOLDING</p>
        <h1 id="hero-title">Every path<br>led me <em>here.</em></h1>
        <p class="hero-description">I'm Sophearith, a creative developer.<br>I turn curiosity into thoughtful digital<br class="desktop-break"> experiences. This is my journey so far.</p>
        <a class="button button-primary" href="#work">Explore my work ${icon("diagonal")}</a>
        <button class="road-entry" type="button" aria-haspopup="dialog" aria-controls="road-dialog" disabled>${icon("road")}<span>View from the ground</span>${icon("arrow")}</button>
        <div class="intro-note"><span class="availability-dot"></span>Open to good people & interesting projects</div>
      </div>
      <div class="scene-stage" role="group" aria-label="Interactive career timeline from 2018 to 2026">
        <div class="scene-heading"><span></span>ONE JOURNEY. INFINITE POSSIBILITIES.</div>
        ${milestones.map((milestone, index) => `<button class="milestone ${index === 4 ? "milestone-current" : ""}" data-milestone="${index}" aria-label="${milestone.year}: ${milestone.role}. Read this chapter."><span class="milestone-top"><span class="milestone-year">${milestone.year}</span>${index === 4 ? '<span class="now-badge">NOW</span>' : icon("diagonal", "milestone-arrow")}</span><span class="milestone-role">${milestone.role}</span><span class="milestone-note">${milestone.note}</span></button>`).join("")}
        <div class="possibility possibility-one" aria-hidden="true"><span>2023</span>A different city<small>Another possibility</small></div>
        <div class="possibility possibility-two" aria-hidden="true"><span>2021</span>The startup route<small>A path not taken</small></div>
        <div class="origin-caption" aria-hidden="true">IT STARTED WITH CURIOSITY</div>
        <span class="scene-fallback-note">Every choice, a new possibility.</span>
      </div>
      <div class="hero-bottom"><a href="#work" class="scroll-cue"><span class="scroll-circle">${icon("down")}</span>THERE'S MORE BELOW</a><p class="scene-instruction"><span class="mini-cross">+</span>MOVE TO EXPLORE <span class="instruction-divider">/</span> CLICK A MILESTONE</p><div class="scene-controls"><button class="sound-toggle" aria-pressed="false" aria-label="Enable ambient sound">${icon("muted")}<span>SOUND OFF</span></button><span class="control-divider"></span><button class="motion-toggle" aria-pressed="false" aria-label="Pause scene animation">${icon("pause")}</button></div></div>
    </section>

    <section class="work-section content-section" id="work" aria-labelledby="work-title">
      <div class="section-kicker"><span>01 / SELECTED WORK</span><span>A FEW THINGS I'VE PUT INTO THE WORLD</span></div>
      <div class="section-heading"><h2 id="work-title">Ideas, made <em>real.</em></h2><p>Thoughtful design. Purposeful code.<br>A little something you didn't expect.</p></div>
      <div class="project-grid">${projects.map((project, index) => `<button class="project-card" data-project="${index}" aria-label="Explore ${project.name}: ${project.summary}"><div class="project-image">${project.art}<span class="project-open">${icon("diagonal")}</span><span class="project-number">0${index + 1}</span></div><div class="project-meta"><span>${project.category}</span><span>${project.year}</span></div><div class="project-title-row"><h3>${project.name}</h3>${icon("diagonal")}</div><p>${project.summary}</p></button>`).join("")}</div>
      <div class="work-footnote"><span>Selected independent concepts & explorations.</span><span>Made with care, from the first sketch to the last pixel.</span></div>
    </section>

    <section class="about-section content-section" id="about" aria-labelledby="about-title">
      <div class="section-kicker"><span>02 / THE PERSON BEHIND THE PIXELS</span><span>ALWAYS A WORK IN PROGRESS</span></div>
      <div class="about-layout"><div class="about-visual" aria-hidden="true"><div class="about-orbit orbit-a"></div><div class="about-orbit orbit-b"></div><div class="about-orbit orbit-c"></div><div class="about-core">${spark}</div><span class="orbit-label label-design">DESIGN</span><span class="orbit-label label-code">CODE</span><span class="orbit-label label-curiosity">CURIOSITY</span><span class="about-coordinate">11.5564&deg; N &nbsp; 104.9282&deg; E</span><span class="about-visual-note">A MIND AT THE INTERSECTION.</span></div><div class="about-copy"><p class="eyebrow">DEVELOPER BY TRADE. EXPLORER AT HEART.</p><h2 id="about-title">A curious mind.<br>A maker's <em>heart.</em></h2><p>I like making things that make people feel something. Sometimes that's a beautifully simple interface. Sometimes it's a small, unexpected interaction that makes you pause.</p><p>My work lives where design and engineering meet. I care about the details, ask a lot of questions, and believe the best digital experiences feel effortlessly human.</p><div class="skill-list"><span>Creative development</span><span>Interface design</span><span>React & TypeScript</span><span>Three.js & WebGL</span></div><a class="text-link" href="#contact">Enough about me. What are you working on? ${icon("diagonal")}</a></div></div>
    </section>

    <section class="contact-section content-section" id="contact" aria-labelledby="contact-title"><div class="contact-orbit" aria-hidden="true"></div><p class="eyebrow"><span class="availability-dot"></span>THE NEXT CHAPTER IS UNWRITTEN</p><h2 id="contact-title">Let's make<br>something <em>matter.</em></h2><p>Have an idea, a possibility, or just a good question?<br>I'd love to hear it.</p><button class="button button-primary" data-contact>Start a conversation ${icon("diagonal")}</button><a class="contact-email" href="mailto:${email}">${email}</a></section>
  </main>
  <footer class="site-footer"><a class="footer-brand" href="#journey">${spark}<span>SOPHEARITH</span></a><p>Built with intention. And a little wonder.</p><div><span>&copy; ${new Date().getFullYear()}</span><a href="#journey" aria-label="Back to top">BACK TO TOP ${icon("diagonal")}</a></div></footer>
  <dialog class="road-dialog" id="road-dialog" aria-labelledby="road-title" aria-describedby="road-help">
    <div class="road-stage-host"></div>
    <header class="road-header"><div><p class="eyebrow">${icon("road")}THE GROUND-LEVEL JOURNEY</p><h2 id="road-title">A story, one stop at a time.</h2></div><button class="road-close" type="button" aria-label="Back to overview" autofocus>Back to overview ${icon("close")}</button></header>
    <div class="road-hud">
      <ol class="road-stations" aria-label="Journey stops">${milestones.map((milestone, index) => `<li data-road-station="${index}"><span class="station-dot" aria-hidden="true"></span><span>${milestone.year}</span></li>`).join("")}</ol>
      <div class="road-stop-info"><p class="road-stop-kicker">THE BEGINNING <span class="road-count">00 / 05</span></p><h3 class="road-stop-title">It starts with curiosity.</h3><p class="road-stop-note">Take the road, one experience at a time.</p><button class="road-read text-link" type="button" hidden>Read this chapter ${icon("diagonal")}</button></div>
      <div class="road-navigation" role="group" aria-label="Navigate the experience stops"><button class="road-previous" type="button" disabled>${icon("arrow")}<span>Previous stop</span></button><button class="road-next button button-primary" type="button"><span>First stop</span>${icon("arrow")}</button></div>
      <p id="road-help">Use the buttons to follow the road. Scroll and drag do not move the camera.</p>
    </div>
    <p class="road-announcement sr-only" role="status" aria-live="polite" aria-atomic="true"></p>
  </dialog>
  <dialog class="detail-dialog" aria-labelledby="dialog-title"><button class="close-dialog" aria-label="Close dialog">${icon("close")}</button><div class="dialog-content"></div></dialog>
  <div class="toast" role="status" aria-live="polite"></div>
`;

const stage = document.querySelector<HTMLElement>(".scene-stage")!;
const stageMarker = document.createComment("overview timeline position");
stage.before(stageMarker);
const milestoneElements = Array.from(
  document.querySelectorAll<HTMLButtonElement>(".milestone"),
);
let journey: ReturnType<typeof createJourneyScene> | undefined;

const dialog = document.querySelector<HTMLDialogElement>(".detail-dialog")!;
const dialogContent =
  document.querySelector<HTMLDivElement>(".dialog-content")!;
let focusedMilestone: number | null = null;
const roadDialog = document.querySelector<HTMLDialogElement>(".road-dialog")!;
const roadEntry = document.querySelector<HTMLButtonElement>(".road-entry")!;
const roadPrevious =
  document.querySelector<HTMLButtonElement>(".road-previous")!;
const roadNext = document.querySelector<HTMLButtonElement>(".road-next")!;
const roadRead = document.querySelector<HTMLButtonElement>(".road-read")!;
const roadStations = Array.from(
  document.querySelectorAll<HTMLElement>("[data-road-station]"),
);
let roadState: RoadSceneState = {
  stopIndex: -1,
  targetIndex: -1,
  traveling: false,
  available: true,
};

function updateRoad(state: RoadSceneState) {
  roadState = state;
  roadEntry.disabled = !state.available;
  roadEntry.querySelector("span")!.textContent = state.available
    ? "View from the ground"
    : "Ground view temporarily unavailable";
  const index = state.traveling ? state.targetIndex : state.stopIndex;
  const milestone = milestones[index];
  roadDialog.dataset.stopIndex = String(state.stopIndex);
  roadDialog.dataset.traveling = String(state.traveling);
  roadDialog.dataset.available = String(state.available);
  roadDialog.querySelector(".road-stop-kicker")!.innerHTML =
    `${state.traveling ? "ON THE WAY" : milestone ? milestone.year : "THE BEGINNING"}<span class="road-count">${String(index + 1).padStart(2, "0")} / 05</span>`;
  roadDialog.querySelector(".road-stop-title")!.textContent =
    milestone?.role ?? "It starts with curiosity.";
  roadDialog.querySelector(".road-stop-note")!.textContent = !state.available
    ? "The 3D view was interrupted. You can return to the overview."
    : state.traveling
      ? "Following the curve..."
      : (milestone?.note ?? "Take the road, one experience at a time.");
  roadPrevious.disabled = state.stopIndex < 0 || !state.available;
  roadNext.disabled = !state.available;
  roadPrevious.setAttribute(
    "aria-disabled",
    String(state.traveling || roadPrevious.disabled),
  );
  roadNext.setAttribute(
    "aria-disabled",
    String(state.traveling || roadNext.disabled),
  );
  roadNext.querySelector("span")!.textContent = state.traveling
    ? "On the way..."
    : state.stopIndex === milestones.length - 1
      ? "Back to overview"
      : state.stopIndex < 0
        ? "First stop"
        : "Next stop";
  roadRead.hidden = state.stopIndex < 0 || state.traveling || !state.available;
  roadStations.forEach((station, stationIndex) => {
    station.classList.toggle("is-visited", stationIndex < state.stopIndex);
    station.classList.toggle("is-current", stationIndex === state.stopIndex);
    station.classList.toggle(
      "is-next",
      state.traveling && stationIndex === state.targetIndex,
    );
    if (stationIndex === state.stopIndex)
      station.setAttribute("aria-current", "step");
    else station.removeAttribute("aria-current");
  });
  roadDialog.querySelector(".road-announcement")!.textContent = !state.available
    ? "The 3D view is unavailable. Back to overview remains available."
    : state.traveling
      ? `Moving to ${milestone?.year ?? "the beginning"}.`
      : milestone
        ? `Stop ${index + 1} of ${milestones.length}: ${milestone.year}, ${milestone.role}.`
        : "At the beginning. Choose First stop to start the journey.";
}

roadEntry.addEventListener("click", () => {
  if (!journey || stage.classList.contains("is-context-lost")) return;
  roadDialog.querySelector(".road-stage-host")!.append(stage);
  roadDialog.showModal();
  document.body.classList.add("road-open");
  journey.setView("road");
});
roadDialog
  .querySelector(".road-close")!
  .addEventListener("click", () => roadDialog.close());
roadDialog.addEventListener("close", () => {
  stageMarker.after(stage);
  document.body.classList.remove("road-open");
  journey?.setView("overview");
  journey?.setPaused(isPaused || dialog.open);
  roadEntry.focus({ preventScroll: true });
});
roadDialog.addEventListener(
  "wheel",
  (event) => {
    if (!event.ctrlKey) event.preventDefault();
  },
  { passive: false },
);
roadPrevious.addEventListener("click", () => {
  if (!roadState.traveling && roadState.available) journey?.moveToStop(-1);
});
roadNext.addEventListener("click", () => {
  if (roadState.traveling || !roadState.available) return;
  if (roadState.stopIndex === milestones.length - 1) roadDialog.close();
  else journey?.moveToStop(1);
});
roadRead.addEventListener("click", () => {
  if (!roadState.traveling && roadState.stopIndex >= 0)
    showMilestone(roadState.stopIndex);
});

function openDialog(content: string, kind: string) {
  journey?.setPaused(true);
  dialogContent.innerHTML = content;
  dialog.dataset.kind = kind;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add("dialog-open");
  dialog.scrollTop = 0;
  const title = dialogContent.querySelector<HTMLElement>("#dialog-title")!;
  title.tabIndex = -1;
  title.focus({ preventScroll: true });
}

function showMilestone(index: number) {
  if (roadDialog.open && (roadState.traveling || index !== roadState.stopIndex))
    return;
  const milestone = milestones[index];
  focusedMilestone = index;
  journey?.setFocusedMilestone(index);
  const chapterNavigation = roadDialog.open
    ? '<p class="road-reading-note">Close this chapter to continue along the road.</p>'
    : `<div class="chapter-navigation"><button class="text-link previous-chapter" ${index === 0 ? "disabled" : ""}>${icon("arrow")}Previous chapter</button><button class="text-link next-chapter" ${index === milestones.length - 1 ? "disabled" : ""}>Next chapter${icon("arrow")}</button></div>`;
  openDialog(
    `<div class="chapter-year">${milestone.year}<span>CHAPTER 0${index + 1} / 05</span></div><p class="eyebrow">${milestone.role}</p><h2 id="dialog-title">${milestone.title}</h2><p class="dialog-description">${milestone.description}</p><blockquote>${milestone.reflection}</blockquote><div class="skill-list">${milestone.skills.map((skill) => `<span>${skill}</span>`).join("")}</div>${chapterNavigation}`,
    "milestone",
  );
  dialogContent
    .querySelector(".previous-chapter")
    ?.addEventListener("click", () => showMilestone(index - 1));
  dialogContent
    .querySelector(".next-chapter")
    ?.addEventListener("click", () => showMilestone(index + 1));
}

milestoneElements.forEach((element, index) => {
  element.addEventListener("click", () => showMilestone(index));
  element.addEventListener("pointerenter", () =>
    journey?.setFocusedMilestone(index),
  );
  element.addEventListener("pointerleave", () =>
    journey?.setFocusedMilestone(focusedMilestone),
  );
  element.addEventListener("focus", () => journey?.setFocusedMilestone(index));
  element.addEventListener("blur", () =>
    journey?.setFocusedMilestone(focusedMilestone),
  );
});

document
  .querySelectorAll<HTMLButtonElement>("[data-project]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const project = projects[Number(button.dataset.project)];
      openDialog(
        `<div class="dialog-project-art">${project.art.replaceAll("chart-fill", "dialog-chart-fill")}</div><p class="eyebrow">${project.kind} / ${project.year}</p><h2 id="dialog-title">${project.name}<span class="project-dialog-arrow">${icon("diagonal")}</span></h2><p class="dialog-subtitle">${project.summary}</p><p class="dialog-description">${project.description}</p><p class="dialog-description">${project.detail}</p><div class="skill-list">${project.stack.map((skill) => `<span>${skill}</span>`).join("")}</div><button class="text-link project-contact">Have something in mind? Let's talk ${icon("diagonal")}</button>`,
        "project",
      );
      dialogContent
        .querySelector(".project-contact")
        ?.addEventListener("click", showContact);
    });
  });

function showContact() {
  openDialog(
    `<p class="eyebrow"><span class="availability-dot"></span>OPEN TO NEW POSSIBILITIES</p><h2 id="dialog-title">Good things start<br>with a <em>hello.</em></h2><p class="dialog-description">Tell me a little about what you have in mind. Big ideas, small details, and friendly hellos are all welcome.</p><div class="email-copy-row"><a href="mailto:${email}">${email}</a><button class="copy-email" aria-label="Copy email address">${icon("copy")}</button></div><form class="contact-form"><div class="form-row"><label>Your name<input name="name" autocomplete="name" placeholder="Alex, for example" required maxlength="100"></label><label>Email address<input type="email" name="email" autocomplete="email" placeholder="you@somewhere.com" required maxlength="254"></label></div><label>What's on your mind?<textarea name="message" rows="4" placeholder="I have this idea..." required maxlength="4000"></textarea></label><button class="button button-primary" type="submit">Open email draft ${icon("diagonal")}</button><p class="form-note" role="status">Opens your email app with everything ready to send.</p></form>`,
    "contact",
  );
  dialogContent
    .querySelector<HTMLButtonElement>(".copy-email")!
    .addEventListener("click", async (event) => {
      const button = event.currentTarget as HTMLButtonElement;
      try {
        await navigator.clipboard.writeText(email);
        button.innerHTML = icon("check");
        button.setAttribute("aria-label", "Email address copied");
        dialogContent.querySelector(".form-note")!.textContent =
          "Email copied to your clipboard. Write whenever you're ready.";
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(
          dialogContent.querySelector(".email-copy-row a")!,
        );
        selection?.removeAllRanges();
        selection?.addRange(range);
        dialogContent.querySelector(".form-note")!.textContent =
          "Select and copy the email address, or click it to open your email app.";
      }
    });
  dialogContent
    .querySelector<HTMLFormElement>("form")!
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget as HTMLFormElement);
      const subject = `A new possibility from ${data.get("name")}`;
      const body = `Hi Sophearith,\n\n${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      dialogContent.querySelector(".form-note")!.textContent =
        "Your email draft is ready in your email app. If it did not open, copy the address above and send your message directly.";
    });
}

document
  .querySelectorAll("[data-contact]")
  .forEach((button) => button.addEventListener("click", showContact));
document
  .querySelector(".close-dialog")!
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  focusedMilestone = null;
  journey?.setFocusedMilestone(null);
  journey?.setPaused(isPaused);
});

let toastTimeout: ReturnType<typeof setTimeout>;
function notify(message: string) {
  const toast = document.querySelector<HTMLElement>(".toast")!;
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("visible"), 4200);
}

const motionButton =
  document.querySelector<HTMLButtonElement>(".motion-toggle")!;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let isPaused = reducedMotion.matches;
function updateMotion() {
  journey?.setPaused(isPaused || dialog.open);
  motionButton.setAttribute("aria-pressed", String(isPaused));
  motionButton.setAttribute(
    "aria-label",
    isPaused ? "Resume scene animation" : "Pause scene animation",
  );
  motionButton.innerHTML = icon(isPaused ? "play" : "pause");
}
motionButton.addEventListener("click", () => {
  isPaused = !isPaused;
  updateMotion();
});
reducedMotion.addEventListener("change", () => {
  isPaused = reducedMotion.matches;
  updateMotion();
});
updateMotion();
motionButton.disabled = true;

let audioContext: AudioContext | undefined;
let soundEnabled = false;
const soundButton = document.querySelector<HTMLButtonElement>(".sound-toggle")!;
soundButton.addEventListener("click", async () => {
  soundButton.disabled = true;
  try {
    if (!audioContext) {
      audioContext = new AudioContext();
      const master = audioContext.createGain();
      master.gain.value = 0.045;
      const filter = audioContext.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 380;
      filter.connect(master);
      master.connect(audioContext.destination);
      [110, 164.81, 220, 277.18].forEach((frequency, index) => {
        const oscillator = audioContext!.createOscillator();
        const gain = audioContext!.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        oscillator.detune.value = index % 2 ? 4 : -4;
        gain.gain.value = 0.24 / (index + 1);
        oscillator.connect(gain);
        gain.connect(filter);
        oscillator.start();
        const breath = audioContext!.createOscillator();
        const breathGain = audioContext!.createGain();
        breath.frequency.value = 0.07 + index * 0.013;
        breathGain.gain.value = gain.gain.value * 0.35;
        breath.connect(breathGain);
        breathGain.connect(gain.gain);
        breath.start();
      });
    }
    const nextEnabled = !soundEnabled;
    if (nextEnabled) await audioContext.resume();
    else await audioContext.suspend();
    soundEnabled = nextEnabled;
    soundButton.innerHTML = `${icon(soundEnabled ? "sound" : "muted")}<span>SOUND ${soundEnabled ? "ON" : "OFF"}</span>`;
    soundButton.setAttribute("aria-pressed", String(soundEnabled));
    soundButton.setAttribute(
      "aria-label",
      soundEnabled ? "Mute ambient sound" : "Enable ambient sound",
    );
  } catch {
    notify(
      "Ambient sound is not available in this browser. The journey is just as good in silence.",
    );
  } finally {
    soundButton.disabled = false;
  }
});

document.addEventListener("visibilitychange", () => {
  if (!audioContext || !soundEnabled) return;
  void (document.hidden ? audioContext.suspend() : audioContext.resume()).catch(
    () => {},
  );
});

const header = document.querySelector<HTMLElement>(".site-header")!;
const navigation = Array.from(
  document.querySelectorAll<HTMLAnchorElement>(".nav-link"),
);
const sections = Array.from(
  document.querySelectorAll<HTMLElement>("main > section"),
);
let scrollScheduled = false;
function updateNavigation() {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
  let current = "journey";
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.4)
      current = section.id;
  });
  navigation.forEach((link) => {
    const active = link.hash === `#${current}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scrollScheduled = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scrollScheduled) {
      requestAnimationFrame(updateNavigation);
      scrollScheduled = true;
    }
  },
  { passive: true },
);
updateNavigation();

// Font metrics affect the scene's responsive label positions.
void document.fonts.ready.then(() => window.dispatchEvent(new Event("resize")));
void import("./scene")
  .then(({ createJourneyScene }) => {
    journey = createJourneyScene(stage, milestoneElements, updateRoad);
    journey.setPaused(isPaused || dialog.open);
    motionButton.disabled = false;
    roadEntry.disabled = false;
  })
  .catch((error: unknown) => {
    console.warn(
      "The 3D journey is unavailable. Showing the accessible timeline.",
      error,
    );
    stage.querySelector("canvas")?.remove();
    stage.classList.add("scene-fallback", "is-ready");
    motionButton.hidden = true;
    roadEntry.disabled = true;
    roadEntry.querySelector("span")!.textContent = "Ground view requires WebGL";
  });
window.addEventListener("pagehide", (event) => {
  if (event.persisted) return;
  journey?.dispose();
  void audioContext?.close();
});
