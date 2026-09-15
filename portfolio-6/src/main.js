import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { createBoard, milestones, skills } from "./board.js";

const container = document.querySelector("#scene");
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const scene = new THREE.Scene();
scene.background = new THREE.Color("#03080b");
scene.fog = new THREE.FogExp2("#03080b", 0.018);
const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 100);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);
renderer.domElement.setAttribute(
  "aria-label",
  "Circuit board. Drag to rotate, scroll to zoom, and click a glowing node to explore.",
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.enablePan = false;
controls.minDistance = 13;
controls.maxDistance = 33;
controls.minPolarAngle = 0.3;
controls.maxPolarAngle = Math.PI / 2.55;
controls.rotateSpeed = 0.45;
controls.zoomSpeed = 0.6;
controls.enableZoom = true;

scene.add(new THREE.HemisphereLight("#b5d9e4", "#081014", 0.7));
const key = new THREE.DirectionalLight("#d1e5ee", 2.2);
key.position.set(-3, 12, -5);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = -11;
key.shadow.camera.right = 11;
key.shadow.camera.top = 10;
key.shadow.camera.bottom = -10;
key.shadow.normalBias = 0.025;
key.shadow.bias = -0.0001;
scene.add(key);
const fill = new THREE.DirectionalLight("#568a9d", 0.8);
fill.position.set(5, 5, 8);
scene.add(fill);
const cyanLight = new THREE.PointLight("#00bdde", 20, 16, 2);
cyanLight.position.set(-5, 2, 5);
scene.add(cyanLight);
const greenLight = new THREE.PointLight("#b6fa76", 12, 12, 2);
greenLight.position.set(5, 2, -3);
scene.add(greenLight);

const board = createBoard();
scene.add(board.group);
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(180, 180),
  new THREE.MeshStandardMaterial({
    color: "#010304",
    metalness: 0.15,
    roughness: 0.95,
  }),
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.63;
floor.receiveShadow = true;
scene.add(floor);

// Soft pools of reflected signal light beneath the board.
const glowCanvas = document.createElement("canvas");
glowCanvas.width = glowCanvas.height = 128;
const gc = glowCanvas.getContext("2d");
const gradient = gc.createRadialGradient(64, 64, 0, 64, 64, 64);
gradient.addColorStop(0, "#ffffff");
gradient.addColorStop(0.35, "#ffffff55");
gradient.addColorStop(1, "#ffffff00");
gc.fillStyle = gradient;
gc.fillRect(0, 0, 128, 128);
const glowMap = new THREE.CanvasTexture(glowCanvas);
for (const [x, z, color, sx, sz] of [
  [-4, 4, "#00a6c5", 9, 6],
  [6, -2, "#84b743", 6, 7],
]) {
  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(sx, sz),
    new THREE.MeshBasicMaterial({
      map: glowMap,
      color,
      transparent: true,
      opacity: 0.13,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.set(x, -0.615, z);
  scene.add(glow);
}

const renderTarget = new THREE.WebGLRenderTarget(1, 1, {
  type: THREE.HalfFloatType,
});
renderTarget.samples = 4;
const composer = new EffectComposer(renderer, renderTarget);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.5, 0.95);
composer.addPass(bloom);
composer.addPass(new OutputPass());

function defaultView() {
  const mobile = container.clientWidth < 600;
  camera.position.set(
    mobile ? 9 : 6.12,
    mobile ? 17.5 : 11.88,
    mobile ? 20.5 : 13.82,
  );
  controls.target.set(0, 0, 0);
  controls.update();
}

let wasMobile = container.clientWidth < 600;
function resize() {
  const w = container.clientWidth,
    h = container.clientHeight;
  const mobile = w < 600;
  camera.aspect = w / h;
  if (mobile !== wasMobile) {
    defaultView();
    wasMobile = mobile;
  }
  camera.fov = mobile ? 49 : w / h < 1.3 ? 44 : 32;
  // Off-axis composition gives the board room beside the editorial introduction.
  camera.setViewOffset(
    w,
    h,
    -w * (mobile ? 0.02 : 0.1),
    h * (mobile ? -0.11 : 0.06),
    w,
    h,
  );
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
}
defaultView();
resize();
window.addEventListener("resize", resize);
document.querySelector("#reset-view").addEventListener("click", defaultView);

const panel = document.querySelector("#detail-panel");
const tooltip = document.querySelector("#tooltip");
let lastTrigger = null;
function showDetail(data, trigger) {
  lastTrigger = trigger || document.activeElement;
  document.querySelector("#detail-eyebrow").textContent =
    data.eyebrow ||
    (data.year
      ? `CAREER MILESTONE / ${data.year}`
      : "CONNECTED SKILL / CORE TECHNOLOGY");
  document.querySelector("#detail-title").textContent = data.name;
  document.querySelector("#detail-description").textContent = data.description;
  const tags = document.querySelector("#detail-tags");
  tags.replaceChildren();
  (data.tags || []).forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    tags.appendChild(element);
  });
  if (data.email) {
    const link = document.createElement("a");
    link.href = `mailto:${data.email}`;
    link.textContent = data.email;
    tags.appendChild(link);
  }
  document.querySelector("#detail-footer").textContent =
    data.footer || "PART OF THE BIGGER PICTURE";
  panel.hidden = false;
  tooltip.style.opacity = "0";
  document.querySelector("#close-panel").focus({ preventScroll: true });
}
function closePanel() {
  panel.hidden = true;
  if (lastTrigger instanceof HTMLElement)
    lastTrigger.focus({ preventScroll: true });
}
document.querySelector("#close-panel").addEventListener("click", closePanel);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanel();
});

const views = {
  about: {
    eyebrow: "THE PERSON BEHIND THE BOARD",
    name: "Hi, I’m Alex.",
    description:
      "A software engineer who loves connecting the dots between thoughtful design and well-built technology. This board is a map of my journey — each chip a skill, each connection a step forward.",
    tags: ["Curious by nature", "Engineer by craft", "Always learning"],
  },
  experience: { ...milestones[3], eyebrow: "EXPERIENCE / 2019 — PRESENT" },
  skills: {
    eyebrow: "THE ENGINEERING TOOLKIT",
    name: "Connected by craft.",
    description:
      "A full-stack toolkit, built through years of making things. Select any of the seven processors on the board to explore the technology behind the work.",
    tags: skills.map((skill) => skill.name),
    footer: "7 CORE SKILLS / ONE CONNECTED SYSTEM",
  },
  projects: {
    eyebrow: "SELECTED WORK / 001",
    name: "A career, connected.",
    description:
      "You’re looking at it. A real-time, interactive portfolio built with Three.js — featuring a custom circuit board, illuminated signal paths, and a career you can explore in three dimensions.",
    tags: ["Three.js", "WebGL", "JavaScript", "Creative development"],
    footer: "LIVE PROJECT / DRAG TO EXPLORE",
  },
  contact: {
    eyebrow: "LET’S MAKE A CONNECTION",
    name: "Build something great.",
    description:
      "Have an interesting challenge, a new idea, or a team that cares about craft? I’d love to hear what you’re working on.",
    email: "hello@alexrivera.dev",
    footer: "OPEN TO GOOD CONVERSATIONS",
  },
};
document.querySelectorAll("[data-view]").forEach((button) =>
  button.addEventListener("click", () => {
    const view = button.dataset.view;
    document
      .querySelectorAll(".nav-link")
      .forEach((link) =>
        link.classList.toggle("active", link.dataset.view === view),
      );
    if (view === "home") {
      closePanel();
      defaultView();
    } else showDetail(views[view], button);
  }),
);
document.querySelector(".identity").addEventListener("click", () => {
  closePanel();
  defaultView();
});
let journeyStep = 0;
document.querySelector("#explore").addEventListener("click", (event) => {
  showDetail(milestones[journeyStep], event.currentTarget);
  journeyStep = (journeyStep + 1) % milestones.length;
  event.currentTarget.firstChild.textContent =
    journeyStep === 0 ? "Explore my journey " : "Next connection ";
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let down = null;
let hovering = null;
function intersect(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.set(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1,
  );
  raycaster.setFromCamera(pointer, camera);
  return raycaster.intersectObjects(board.interactive, false)[0]?.object;
}
renderer.domElement.addEventListener("pointerdown", (event) => {
  down = { x: event.clientX, y: event.clientY };
  tooltip.style.opacity = "0";
});
renderer.domElement.addEventListener("pointermove", (event) => {
  if (event.buttons) {
    tooltip.style.opacity = "0";
    return;
  }
  hovering = intersect(event);
  renderer.domElement.style.cursor = hovering ? "pointer" : "grab";
  if (hovering) {
    tooltip.textContent = `${hovering.userData.year ? hovering.userData.year + " / " : ""}${hovering.userData.name} ↗`;
    tooltip.style.left = `${Math.min(event.clientX + 16, window.innerWidth - 230)}px`;
    tooltip.style.top = `${event.clientY - 40}px`;
    tooltip.style.opacity = "1";
  } else tooltip.style.opacity = "0";
});
renderer.domElement.addEventListener("pointerup", (event) => {
  if (down && Math.hypot(event.clientX - down.x, event.clientY - down.y) < 6) {
    const target = intersect(event);
    if (target) showDetail(target.userData);
  }
  down = null;
});
renderer.domElement.addEventListener("pointerleave", () => {
  tooltip.style.opacity = "0";
  hovering = null;
});

const clock = new THREE.Clock();
let running = true;
function render() {
  if (!running) return;
  const time = clock.getElapsedTime();
  controls.update();
  if (!reducedMotion) {
    board.pulses.forEach((ring, i) => {
      const phase = (time * 0.45 + i * 0.27) % 1;
      ring.scale.setScalar(1 + phase * 0.8);
      ring.material.opacity = (1 - phase) * 0.4;
    });
    board.travelers.forEach((dot, i) => {
      dot.position.copy(
        board.pathCurve.getPoint(
          (time * 0.035 + i / board.travelers.length) % 1,
        ),
      );
      dot.position.y += 0.018;
    });
  }
  composer.render();
  requestAnimationFrame(render);
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) running = false;
  else if (!running) {
    running = true;
    render();
  }
});
render();
document.querySelector("#loading").style.opacity = "0";
setTimeout(() => document.querySelector("#loading").remove(), 800);
