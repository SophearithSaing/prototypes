import "./style.css";
import { boardItems, milestones, type BoardItem } from "./data";
import { createCareerScene, type CareerScene } from "./scene";

const $ = <T extends HTMLElement = HTMLElement>(selector: string) =>
  document.querySelector<T>(selector)!;
let scene: CareerScene | undefined;
let selectedItem: BoardItem | undefined;
const card = $("#selection-card");
const dialog = $<HTMLDialogElement>("#info-dialog");

function selectItem(item: BoardItem) {
  selectedItem = item;
  scene?.select(item.id);
  $("#selection-eyebrow").textContent = item.eyebrow;
  $("#selection-eyebrow").style.color = item.color;
  $("#selection-title").textContent = item.year
    ? `${item.year} · ${item.title}`
    : item.title;
  $("#selection-description").textContent = item.description;
  $("#selection-tags").replaceChildren(
    ...item.tags.map((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      return element;
    }),
  );
  $("#next-stop").hidden = !item.year;
  $("#next-stop").firstChild!.textContent =
    item.id === "2024" ? "Back to the beginning " : "Next milestone ";
  card.hidden = false;
}

function closeSelection() {
  card.hidden = true;
  selectedItem = undefined;
  scene?.select(null);
}
$("#close-selection").addEventListener("click", closeSelection);
$("#explore").addEventListener("click", () => {
  selectItem(milestones[0]);
});
$("#next-stop").addEventListener("click", () => {
  const index = milestones.findIndex((item) => item.id === selectedItem?.id);
  selectItem(milestones[(index + 1) % milestones.length]);
});
$("#reset-view").addEventListener("click", () => {
  scene?.reset();
  closeSelection();
});
document.querySelectorAll<HTMLButtonElement>("[data-item]").forEach((button) =>
  button.addEventListener("click", () => {
    const item = boardItems.find((entry) => entry.id === button.dataset.item);
    if (item) selectItem(item);
  }),
);

const dialogContent: Record<string, { label: string; html: string }> = {
  about: {
    label: "A little about me",
    html: '<h2>Engineer by trade.<br><span class="green-text">Builder at heart.</span></h2><p>I’m Alex, a software engineer who loves the space where thoughtful design meets good engineering. I turn complex ideas into useful, intuitive digital experiences.</p><p>This board is a map of that journey. Every connection represents a new skill, a fresh challenge, or a step forward.</p><div class="dialog-stat-row"><div><strong>7+</strong><span>Years of building</span></div><div><strong>6</strong><span>Connected disciplines</span></div><div><strong>∞</strong><span>Things to explore</span></div></div>',
  },
  projects: {
    label: "Selected work / 01—03",
    html: '<h2>Ideas, <span class="cyan-text">made real.</span></h2><div class="project"><span class="project-number">01</span><div><h3>Career Circuit</h3><p>The interactive 3D experience you’re exploring. A different way to connect the dots.</p><span class="project-stack">THREE.JS · TYPESCRIPT · WEBGL</span></div></div><div class="project"><span class="project-number">02</span><div><h3>Forma Design System</h3><p>A shared component language for accessible, consistent product experiences.</p><span class="project-stack">REACT · TYPESCRIPT · STORYBOOK</span></div></div><div class="project"><span class="project-number">03</span><div><h3>Relay Platform</h3><p>An event-driven foundation for reliable services and a smoother path to production.</p><span class="project-stack">NODE.JS · POSTGRESQL · DOCKER</span></div></div>',
  },
  contact: {
    label: "The next connection",
    html: '<h2>Good things start<br>with <span class="green-text">a conversation.</span></h2><p>Have something interesting in mind? I’d love to hear about your team, your idea, or the problem you’re excited to solve.</p><a class="contact-link" href="mailto:hello@alexrivera.dev">hello@alexrivera.dev <span>↗</span></a><div class="availability"><span class="live-indicator"></span>Open to thoughtful collaborations</div>',
  },
};

function navigate(section: string) {
  document
    .querySelectorAll("[data-nav]")
    .forEach((element) =>
      element.classList.toggle(
        "is-active",
        (element as HTMLElement).dataset.nav === section,
      ),
    );
  if (section === "home") {
    scene?.reset();
    closeSelection();
    return;
  }
  if (section === "experience") {
    selectItem(milestones[0]);
    return;
  }
  if (section === "skills") {
    selectItem(boardItems.find((item) => item.id === "react")!);
    return;
  }
  const content = dialogContent[section];
  if (content) {
    $("#dialog-label").textContent = content.label;
    $("#dialog-content").innerHTML = content.html;
    dialog.showModal();
  }
}

document
  .querySelectorAll<HTMLButtonElement>("[data-nav]")
  .forEach((button) =>
    button.addEventListener("click", () => navigate(button.dataset.nav!)),
  );
$(".identity").addEventListener("click", (event) => {
  event.preventDefault();
  navigate("home");
});
$("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("close", () => {
  document
    .querySelectorAll("[data-nav]")
    .forEach((element) =>
      element.classList.toggle(
        "is-active",
        (element as HTMLElement).dataset.nav === "home",
      ),
    );
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dialog.open) closeSelection();
});

if (window.matchMedia("(pointer: coarse)").matches) {
  $(".drag-instruction").textContent = "Swipe to rotate";
  $(".zoom-instruction").textContent = "Tap to explore";
}

async function init() {
  // Wait briefly for the web fonts so that texture labels match the interface.
  await Promise.race([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 1800)),
  ]);
  try {
    scene = createCareerScene($("#scene-container"), selectItem);
  } catch (error) {
    console.error("Unable to initialize the career board:", error);
    $("#loading").hidden = true;
    const fallback = document.createElement("div");
    fallback.className = "scene-error";
    fallback.innerHTML =
      "<strong>A career, connected.</strong><p>The 3D board needs WebGL to run.<br>You can still explore the journey with the button on the left.</p>";
    $("#scene-container").append(fallback);
  }
}

void init();
window.addEventListener("pagehide", (event) => {
  if (!event.persisted) scene?.dispose();
});
