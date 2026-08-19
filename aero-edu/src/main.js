import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import "./style.css";

const icon = (name, className = "") => {
  const icons = {
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5a2.5 2.5 0 0 1 2.5 2.5z"/>',
    layers:
      '<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 3v9h7"/>',
    trend: '<path d="m3 17 6-7 4 4 8-10"/><path d="M16 4h5v5"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    retry: '<path d="M20 7v5h-5"/><path d="M19 12a7 7 0 1 0-2 5"/>',
    star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    mouse:
      '<rect x="7" y="3" width="10" height="18" rx="5"/><path d="M12 3v6"/>',
    plane:
      '<path d="M22 16.2 13.7 13v6.1l2.3 1.6v1L12 21l-4 .7v-1l2.3-1.6V13L2 16.2v-1.7l8.3-6.2V3.8C10.3 2.8 11 2 12 2s1.7.8 1.7 1.8v4.5l8.3 6.2z" fill="currentColor" stroke="none"/>',
  };
  return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
};

const slides = [
  {
    id: "anatomy",
    component: "fuselage",
    title: "Aircraft Anatomy",
    subtitle: "Complete aircraft view",
    description:
      "An aircraft is made up of several key components that work together to ensure safe and efficient flight. Explore each part to understand its function.",
    points: [
      [
        "Cockpit",
        "The flight deck where pilots control the aircraft and manage systems.",
      ],
      [
        "Fuselage",
        "The main body houses the crew, passengers, cargo, and systems.",
      ],
      [
        "Wings",
        "Generate lift and provide stability while supporting engines.",
      ],
      ["Engines", "Produce thrust to move the aircraft forward."],
      [
        "Landing Gear",
        "Supports the aircraft on the ground and during landing.",
      ],
      ["Tail", "Provides stability and control in yaw, pitch, and roll."],
    ],
    camera: [-4.4, 2.6, 6.4],
    target: [0, 0, 0],
    meshTerms: [],
  },
  {
    id: "wings",
    component: "wing",
    title: "Wings",
    subtitle: "Lift and stability",
    description:
      "Wings shape the airflow above and below the aircraft. This pressure difference generates lift and keeps the aircraft stable through every phase of flight.",
    points: [
      [
        "Airfoil",
        "The curved wing profile accelerates airflow over the upper surface.",
      ],
      [
        "Ailerons",
        "Hinged surfaces near the tips control the aircraft in roll.",
      ],
      [
        "Flaps",
        "Extend during takeoff and landing to increase lift at low speed.",
      ],
      ["Winglets", "Reduce drag created by vortices at each wing tip."],
    ],
    camera: [-1.2, 4.9, 6.7],
    target: [0, -0.1, 0.35],
    meshTerms: ["wing"],
  },
  {
    id: "engines",
    component: "engine",
    title: "Engines",
    subtitle: "Power and thrust",
    description:
      "Aircraft engines convert fuel energy into thrust. Air is drawn in, compressed, mixed with fuel, ignited, and expelled at high speed.",
    points: [
      ["Intake", "Guides a smooth stream of air into the compressor."],
      [
        "Compressor",
        "Raises air pressure before it reaches the combustion chamber.",
      ],
      [
        "Combustion",
        "Fuel ignites in compressed air to release thermal energy.",
      ],
      ["Turbine", "Extracts energy from hot gases to drive the compressor."],
    ],
    camera: [-3.6, 1.1, 4.4],
    target: [-1, -0.35, 1.25],
    meshTerms: ["wing_details"],
  },
  {
    id: "landing-gear",
    component: "gear",
    title: "Landing Gear",
    subtitle: "Ground support and landing",
    description:
      "The landing gear carries the aircraft while taxiing, absorbs landing loads, and provides braking and directional control on the ground.",
    points: [
      [
        "Main Gear",
        "Carries most of the aircraft weight during landing and taxi.",
      ],
      ["Nose Gear", "Steers the aircraft and supports the forward fuselage."],
      ["Shock Struts", "Absorb vertical energy at touchdown."],
      ["Brakes", "Slow the aircraft after landing and while taxiing."],
    ],
    camera: [-4.4, 0.15, 4.8],
    target: [-0.9, -0.6, 0.45],
    meshTerms: [],
  },
  {
    id: "tail",
    component: "tail",
    title: "Tail",
    subtitle: "Control and stability",
    description:
      "The tail assembly stabilizes the aircraft and contains control surfaces that let pilots command pitch and yaw.",
    points: [
      [
        "Vertical Stabilizer",
        "Keeps the aircraft aligned and resists unwanted yaw.",
      ],
      ["Rudder", "Controls left and right movement around the vertical axis."],
      [
        "Horizontal Stabilizer",
        "Balances forces around the center of gravity.",
      ],
      ["Elevator", "Controls the aircraft nose-up and nose-down pitch motion."],
    ],
    camera: [5.2, 2.4, 3.8],
    target: [2.35, 0.35, 0],
    meshTerms: ["tail", "back_wing"],
  },
  {
    id: "cockpit",
    component: "cockpit",
    title: "Cockpit",
    subtitle: "The command center",
    description:
      "The cockpit puts flight controls, instruments, navigation, and communication systems within reach of the flight crew.",
    points: [
      ["Primary Controls", "The yoke and pedals command pitch, roll, and yaw."],
      [
        "Flight Displays",
        "Present speed, altitude, attitude, heading, and route data.",
      ],
      ["Thrust Levers", "Set engine power for takeoff, cruise, and landing."],
      [
        "Overhead Panel",
        "Houses electrical, hydraulic, fuel, and lighting controls.",
      ],
    ],
    camera: [-5.5, 1.35, 2.7],
    target: [-2.45, 0.15, 0],
    meshTerms: [],
  },
];

// Anchors use the centered source model's coordinates so they inherit every model transform.
const components = [
  {
    id: "cockpit",
    label: "Cockpit",
    slide: 5,
    anchor: [1260, 0, -70],
    slot: "left-mid",
  },
  {
    id: "fuselage",
    label: "Fuselage",
    slide: 0,
    anchor: [150, 0, -20],
    slot: "top-mid",
  },
  {
    id: "tail",
    label: "Tail",
    slide: 4,
    anchor: [-1260, 0, -180],
    slot: "right-top",
  },
  {
    id: "wing",
    label: "Wings",
    slide: 1,
    anchor: [-50, 1050, 10],
    slot: "right-mid",
  },
  {
    id: "engine",
    label: "Engines",
    slide: 2,
    anchor: [400, 700, -180],
    slot: "right-low",
  },
  {
    id: "gear",
    label: "Landing Gear",
    slide: 3,
    anchor: [0, 250, -330],
    slot: "bottom-mid",
  },
];

const cardPreview = (id) => {
  const details = {
    anatomy:
      '<path class="preview-plane" d="M8 43 31 34l24-22 5 2-12 24 25-2 8 4-35 8-8 17-5-1 3-15-28-1z"/>',
    wings:
      '<path class="preview-plane" d="m10 47 35-12 34 8-2 6-31-3-27 16z"/><path d="M46 19v34"/>',
    engines:
      '<circle class="preview-ring" cx="50" cy="39" r="20"/><circle cx="50" cy="39" r="9"/><path d="M50 19v40M30 39h40M36 25l28 28M64 25 36 53"/>',
    "landing-gear":
      '<path class="preview-plane" d="M15 29h58l10 8-13 4H20z"/><path d="M34 39v17m31-17v17"/><circle cx="34" cy="60" r="6"/><circle cx="65" cy="60" r="6"/>',
    tail: '<path class="preview-plane" d="M20 57h59L55 45 48 14 36 17l1 29z"/><path d="m38 45-18-9v9"/>',
    cockpit:
      '<path class="preview-plane" d="M16 56c7-27 20-39 43-39 12 0 20 8 24 24L70 56z"/><path d="m32 33 13-9 3 14H30zm20-9 12 4 6 10H53z"/>',
  };
  return `<svg class="card-preview" viewBox="0 0 100 76" aria-hidden="true">${details[id]}</svg>`;
};

document.querySelector("#app").innerHTML = `
  <main class="app-shell">
    <header class="topbar">
      <div class="brand" aria-label="Aero Academy">
        <svg class="brand-mark" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r="23" fill="#06162a" stroke="#0c4a7d"/>
          <path d="M11 34c7-12 14-9 30-24-3 10-10 20-24 25 7-1 14-4 20-9-4 10-15 15-23 14z" fill="#eef4fb"/>
          <path d="M11 34c10-2 18-7 27-17-8 14-17 18-27 20z" fill="#078df5"/>
          <path d="M12 31c8 0 15-3 23-10" fill="none" stroke="#0b60cf" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <div><div class="brand-name">AERO<span>ACADEMY</span></div><div class="brand-tagline">Learn. Understand. Fly.</div></div>
      </div>
      <nav class="main-nav" aria-label="Primary navigation">
        <button class="nav-item active" type="button" aria-current="page">${icon("book")}<span>Lessons</span></button>
        <button class="nav-item" type="button" disabled title="Library coming soon">${icon("layers")}<span>Library</span></button>
        <button class="nav-item" type="button" disabled title="Quizzes coming soon">${icon("clock")}<span>Quizzes</span></button>
        <button class="nav-item" type="button" disabled title="Progress coming soon">${icon("trend")}<span>Progress</span></button>
      </nav>
      <button class="project-trigger" type="button" aria-haspopup="dialog" aria-controls="project-dialog">${icon("info")}<span>Project info</span></button>
    </header>

    <section class="workspace">
      <section class="lesson-main" aria-label="Interactive lesson">
        <div class="lesson-progress">
          <div class="lesson-title"><span class="eyebrow">Lesson 1 of 10</span><span class="title-divider"></span><strong>Aircraft Anatomy</strong></div>
          <div class="progress-track">
            <div class="progress-fill" role="progressbar" aria-label="Lesson slide progress" aria-valuemin="1" aria-valuemax="${slides.length}" aria-valuenow="1" aria-valuetext="Slide 1 of ${slides.length}"></div>
            <div class="progress-dots">
              ${slides.map((slide, i) => `<button type="button" class="progress-dot ${i === 0 ? "active" : ""}" data-slide="${i}" aria-label="Go to ${slide.title}"></button>`).join("")}
            </div>
          </div>
        </div>

        <div class="scene-wrap" aria-label="Aircraft viewer">
          <canvas id="scene-canvas" aria-label="Interactive 3D model of a passenger aircraft">The interactive model requires WebGL. All lesson content is also available beside the viewer.</canvas>
          <div class="aircraft-glow" aria-hidden="true"></div>
          <div class="scene-loading" role="status" aria-live="polite">
            <svg class="loading-mark" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="23"/><path d="M11 34c7-12 14-9 30-24-3 10-10 20-24 25 7-1 14-4 20-9-4 10-15 15-23 14z"/></svg>
            <strong>Preparing interactive aircraft</strong>
            <span class="loading-detail">Loading flight model...</span>
            <div class="loading-track" aria-hidden="true"><span></span></div>
            <span class="loading-percent">0%</span>
            <div class="loading-actions"></div>
          </div>
          <div class="hotspots">
            <svg class="hotspot-lines" aria-hidden="true">${components.map((component) => `<line data-line="${component.id}"/><circle data-marker="${component.id}" r="4"/>`).join("")}</svg>
            ${components.map((component) => `<button class="hotspot" type="button" data-component="${component.id}" data-slot="${component.slot}" data-slide="${component.slide}" hidden><span>${component.label}</span></button>`).join("")}
          </div>
          <div class="scene-help">${icon("mouse")} <span>Drag to orbit · Scroll to zoom</span></div>
        </div>

        <div class="slide-strip" role="tablist" aria-label="Lesson slides">
          ${slides.map((slide, i) => `<button id="slide-tab-${i}" type="button" class="slide-card ${i === 0 ? "active" : ""}" data-slide="${i}" role="tab" aria-selected="${i === 0}" aria-controls="lesson-panel" tabindex="${i === 0 ? "0" : "-1"}"><span class="card-art">${cardPreview(slide.id)}</span><span class="card-number">${i + 1}</span><span class="card-copy"><strong>${slide.title}</strong><span>${slide.subtitle}</span></span></button>`).join("")}
        </div>
      </section>

      <aside id="lesson-panel" class="info-panel" role="tabpanel" aria-labelledby="slide-tab-0" tabindex="0">
        <div class="panel-content">
          <span class="eyebrow slide-count">Story slide 1 of ${slides.length}</span>
          <h1>Aircraft Anatomy</h1>
          <div class="accent-rule"></div>
          <p class="slide-description">${slides[0].description}</p>
          <div class="points-box">
            <div class="points-title"><span class="star-icon">${icon("star")}</span><span>Key Points</span></div>
            <ul class="points-list"></ul>
          </div>
        </div>
      </aside>
    </section>

    <footer class="bottom-bar">
      <button type="button" class="footer-btn back-btn" disabled>${icon("chevronLeft")}<span>Back</span></button>
      <div class="flight-path" aria-hidden="true">${icon("plane", "footer-plane")}</div>
      <button type="button" class="footer-btn continue-btn"><span>Continue</span>${icon("chevronRight")}</button>
    </footer>
  </main>

  <dialog id="project-dialog" class="project-dialog" aria-labelledby="project-title">
    <form method="dialog" class="dialog-top"><div><span class="eyebrow">Behind the experience</span><h2 id="project-title">Project information</h2></div><button class="dialog-close" value="close" aria-label="Close project information">${icon("close")}</button></form>
    <p>Aero Academy is an interactive aviation education concept built to make aircraft systems easier to explore visually.</p>
    <div class="project-grid">
      <section><h3>Technology</h3><p>Three.js, WebGL, Vite, semantic HTML, and responsive CSS.</p></section>
      <section><h3>Controls</h3><p><strong>Mouse:</strong> drag to orbit, scroll to zoom.<br><strong>Touch:</strong> drag to orbit, pinch to zoom.<br><strong>Keyboard:</strong> use arrow keys on the lesson tabs or viewer.</p></section>
      <section><h3>Aircraft asset</h3><p><code>11803_Airplane_v1_l1</code>, bundled with the original prototype. Its author, source URL, and license were not included; verify usage rights before redistribution.</p></section>
      <section><h3>Motion</h3><label class="motion-toggle"><input type="checkbox" class="motion-checkbox"> <span>Reduce camera and interface motion</span></label></section>
    </div>
  </dialog>
  <div class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>
`;

const state = {
  activeSlide: 0,
  modelReady: false,
  modelError: false,
  cameraTransition: null,
  panelToken: 0,
  reduceMotion: false,
  errorMessage: "",
};

const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
const storedMotion = localStorage.getItem("aero-reduce-motion");
state.reduceMotion =
  storedMotion === null ? motionMedia.matches : storedMotion === "true";
document.documentElement.classList.toggle("reduce-motion", state.reduceMotion);

const canvas = document.querySelector("#scene-canvas");
const sceneWrap = document.querySelector(".scene-wrap");
const sceneLoading = document.querySelector(".scene-loading");
const loadingDetail = document.querySelector(".loading-detail");
const loadingPercent = document.querySelector(".loading-percent");
const loadingBar = document.querySelector(".loading-track span");
const loadingActions = document.querySelector(".loading-actions");
const panel = document.querySelector(".info-panel");
const panelContent = document.querySelector(".panel-content");
const pointsList = document.querySelector(".points-list");
const progressFill = document.querySelector(".progress-fill");
const backButton = document.querySelector(".back-btn");
const continueButton = document.querySelector(".continue-btn");
const liveRegion = document.querySelector(".sr-only");
const motionCheckbox = document.querySelector(".motion-checkbox");
motionCheckbox.checked = state.reduceMotion;
components.forEach((component) => {
  component.buttonElement = document.querySelector(
    `[data-component="${component.id}"]`,
  );
  component.lineElement = document.querySelector(
    `[data-line="${component.id}"]`,
  );
  component.markerElement = document.querySelector(
    `[data-marker="${component.id}"]`,
  );
});

function renderPoints(points) {
  pointsList.innerHTML = points
    .map(
      ([title, copy]) =>
        `<li><span class="point-dot"></span><details open><summary>${title}</summary><p>${copy}</p></details></li>`,
    )
    .join("");
}

function renderPanel(slide, index) {
  panel.querySelector("h1").textContent = slide.title;
  panel.querySelector(".slide-description").textContent = slide.description;
  panel.querySelector(".slide-count").textContent =
    `Story slide ${index + 1} of ${slides.length}`;
  panel.setAttribute("aria-labelledby", `slide-tab-${index}`);
  renderPoints(slide.points);
  liveRegion.textContent = `${slide.title}. Slide ${index + 1} of ${slides.length}.`;
}

renderPoints(slides[0].points);

let scene;
let camera;
let renderer;
let controls;
let aircraft;
let aircraftBounds;
let floor;
let grid;
let animationFrame;
const projectedPosition = new THREE.Vector3();

function updateLoading(progress, detail = "Loading flight model...") {
  if (state.modelError) return;
  const percent = Math.max(0, Math.min(100, Math.round(progress)));
  loadingDetail.textContent = detail;
  loadingPercent.textContent = `${percent}%`;
  loadingBar.style.width = `${percent}%`;
}

function showLoadError(message, allowFallback = false) {
  state.modelError = true;
  state.errorMessage = message;
  sceneLoading.classList.add("error");
  sceneLoading.classList.remove("hidden");
  sceneLoading.setAttribute("role", "alert");
  loadingDetail.textContent = message;
  loadingActions.innerHTML = `<button type="button" class="loading-retry">${icon("retry")} Retry</button>${allowFallback ? '<button type="button" class="loading-dismiss">Continue with lesson</button>' : ""}`;
  loadingActions
    .querySelector(".loading-retry")
    .addEventListener("click", () => window.location.reload());
  loadingActions
    .querySelector(".loading-dismiss")
    ?.addEventListener("click", () => sceneLoading.classList.add("hidden"));
}

function finishLoading() {
  if (!state.modelReady) return;
  updateLoading(100, "Aircraft ready");
  window.setTimeout(
    () => sceneLoading.classList.add("hidden"),
    state.reduceMotion ? 0 : 240,
  );
}

function createScene() {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020b18, 0.05);
  camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(...slides[0].camera);

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch (error) {
    canvas.hidden = true;
    document.querySelector(".hotspots").hidden = true;
    document.querySelector(".scene-help").hidden = true;
    showLoadError(
      "WebGL is unavailable. The complete text lesson remains available.",
    );
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.enablePan = false;
  controls.minDistance = 3.8;
  controls.maxDistance = 13;
  controls.maxPolarAngle = Math.PI * 0.68;
  controls.target.set(...slides[0].target);
  controls.addEventListener("start", () => {
    state.cameraTransition = null;
  });

  scene.add(new THREE.HemisphereLight(0xa9d4ff, 0x051020, 2.35));
  const keyLight = new THREE.DirectionalLight(0xffffff, 3.6);
  keyLight.position.set(-4, 8, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x168cff, 2.7);
  rimLight.position.set(6, 2, -5);
  scene.add(rimLight);
  const fillLight = new THREE.DirectionalLight(0x8cc7ff, 1.35);
  fillLight.position.set(-7, 0, -2);
  scene.add(fillLight);

  floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({
      color: 0x061426,
      roughness: 0.94,
      metalness: 0.03,
      transparent: true,
      opacity: 0.62,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.05;
  floor.receiveShadow = true;
  scene.add(floor);
  grid = new THREE.GridHelper(34, 34, 0x16466c, 0x0c2b45);
  grid.position.y = -1.035;
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  loadAircraft();
  animationFrame = requestAnimationFrame(animate);
}

function loadAircraft() {
  const manager = new THREE.LoadingManager();
  manager.onStart = () => updateLoading(3);
  manager.onProgress = (_url, loaded, total) =>
    updateLoading((loaded / total) * 94);
  manager.onError = (url) => {
    console.error(`Failed to load aircraft asset: ${url}`);
    showLoadError(
      `An aircraft asset failed to load: ${url.split("/").pop()}`,
      Boolean(aircraft),
    );
  };
  manager.onLoad = () => {
    if (state.modelError && aircraft) return;
    finishLoading();
  };

  new MTLLoader(manager).setPath(import.meta.env.BASE_URL).load(
    "11803_Airplane_v1_l1.mtl",
    (materials) => {
      materials.preload();
      new OBJLoader(manager)
        .setMaterials(materials)
        .setPath(import.meta.env.BASE_URL)
        .load(
          "11803_Airplane_v1_l1.obj",
          (object) => {
            const sourceBounds = new THREE.Box3().setFromObject(object);
            const center = sourceBounds.getCenter(new THREE.Vector3());
            const size = sourceBounds.getSize(new THREE.Vector3());
            object.position.sub(center);
            aircraft = new THREE.Group();
            aircraft.add(object);
            aircraft.scale.setScalar(6.3 / Math.max(size.x, size.y, size.z));
            aircraft.rotation.set(Math.PI / 2, Math.PI, -0.03);
            object.traverse((child) => {
              if (!child.isMesh) return;
              child.castShadow = true;
              child.receiveShadow = true;
              const materialsForMesh = Array.isArray(child.material)
                ? child.material
                : [child.material];
              const clonedMaterials = materialsForMesh.map((material) => {
                const clone = material.clone();
                clone.side = THREE.DoubleSide;
                clone.shininess = Math.min(clone.shininess || 30, 45);
                clone.userData.baseEmissive = clone.emissive?.getHex() ?? 0;
                return clone;
              });
              child.material = Array.isArray(child.material)
                ? clonedMaterials
                : clonedMaterials[0];
            });
            components.forEach((component) => {
              component.anchorObject = new THREE.Object3D();
              component.anchorObject.position.set(...component.anchor);
              aircraft.add(component.anchorObject);
            });
            scene.add(aircraft);
            aircraft.updateMatrixWorld(true);
            aircraftBounds = new THREE.Box3().setFromObject(aircraft);
            const modelBottom = aircraftBounds.min.y;
            floor.position.y = modelBottom - 0.18;
            grid.position.y = modelBottom - 0.165;
            state.modelReady = true;
            if (state.modelError) showLoadError(state.errorMessage, true);
            fitOverviewCamera(true);
            updateModelHighlight();
          },
          undefined,
          () => showLoadError("The aircraft model could not be loaded."),
        );
    },
    undefined,
    () => showLoadError("The aircraft materials could not be loaded."),
  );
}

function getOverviewView() {
  if (!aircraftBounds || !camera)
    return {
      position: new THREE.Vector3(...slides[0].camera),
      target: new THREE.Vector3(...slides[0].target),
    };
  const size = aircraftBounds.getSize(new THREE.Vector3());
  const target = aircraftBounds.getCenter(new THREE.Vector3());
  target.y -= size.y * 0.08;
  const verticalFov = THREE.MathUtils.degToRad(camera.fov);
  const horizontalFov =
    2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
  const limitingFov = Math.min(verticalFov, horizontalFov);
  const distance = Math.min(
    12.4,
    (Math.max(size.x, size.z) * 0.54) / Math.tan(limitingFov / 2),
  );
  const direction = new THREE.Vector3(-4.4, 2.6, 6.4).normalize();
  return {
    position: target.clone().addScaledVector(direction, distance),
    target,
  };
}

function fitOverviewCamera(immediate = false) {
  if (!camera || !controls || state.activeSlide !== 0) return;
  const view = getOverviewView();
  startCameraTransition(view.position, view.target, immediate);
}

function startCameraTransition(position, target, immediate = false) {
  if (!camera || !controls) return;
  if (immediate || state.reduceMotion) {
    camera.position.copy(position);
    controls.target.copy(target);
    state.cameraTransition = null;
    controls.update();
    return;
  }
  state.cameraTransition = {
    started: performance.now(),
    duration: 800,
    fromPosition: camera.position.clone(),
    toPosition: position.clone(),
    fromTarget: controls.target.clone(),
    toTarget: target.clone(),
  };
}

function transitionCamera(slide) {
  if (!camera || !controls) return;
  if (state.activeSlide === 0 && aircraftBounds) {
    const view = getOverviewView();
    startCameraTransition(view.position, view.target);
    return;
  }
  startCameraTransition(
    new THREE.Vector3(...slide.camera),
    new THREE.Vector3(...slide.target),
  );
}

function updateModelHighlight() {
  if (!aircraft) return;
  const terms = slides[state.activeSlide].meshTerms;
  aircraft.traverse((child) => {
    if (!child.isMesh) return;
    const selected = terms.some((term) =>
      child.name.toLowerCase().includes(term),
    );
    const materialsForMesh = Array.isArray(child.material)
      ? child.material
      : [child.material];
    materialsForMesh.forEach((material) => {
      if (!material.emissive) return;
      material.emissive.setHex(
        selected ? 0x06385e : material.userData.baseEmissive || 0x000000,
      );
      material.emissiveIntensity = selected ? 0.75 : 1;
    });
  });
}

function syncSlideControls(index) {
  const percent = (index / (slides.length - 1)) * 100;
  progressFill.style.width = `${percent}%`;
  progressFill.setAttribute("aria-valuenow", String(index + 1));
  progressFill.setAttribute(
    "aria-valuetext",
    `Slide ${index + 1} of ${slides.length}`,
  );
  document
    .querySelectorAll(".progress-dot")
    .forEach((dot) =>
      dot.classList.toggle("active", Number(dot.dataset.slide) === index),
    );
  document.querySelectorAll(".slide-card").forEach((card) => {
    const selected = Number(card.dataset.slide) === index;
    card.classList.toggle("active", selected);
    card.setAttribute("aria-selected", String(selected));
    card.tabIndex = selected ? 0 : -1;
  });
  backButton.disabled = index === 0;
  continueButton.disabled = index === slides.length - 1;
  const card = document.querySelector(`.slide-card[data-slide="${index}"]`);
  card.scrollIntoView({
    behavior: state.reduceMotion ? "auto" : "smooth",
    block: "nearest",
    inline: "nearest",
  });
}

function changeSlide(index, { focusTab = false } = {}) {
  if (index < 0 || index >= slides.length || index === state.activeSlide)
    return;
  state.activeSlide = index;
  const slide = slides[index];
  const token = ++state.panelToken;
  panelContent.classList.add("changing");
  syncSlideControls(index);
  transitionCamera(slide);
  updateModelHighlight();
  if (focusTab)
    document.querySelector(`.slide-card[data-slide="${index}"]`).focus();
  window.setTimeout(
    () => {
      if (token !== state.panelToken) return;
      renderPanel(slide, index);
      requestAnimationFrame(() => panelContent.classList.remove("changing"));
    },
    state.reduceMotion ? 0 : 130,
  );
}

document.querySelectorAll("[data-slide]").forEach((element) => {
  element.addEventListener("click", () =>
    changeSlide(Number(element.dataset.slide)),
  );
});

document.querySelector(".slide-strip").addEventListener("keydown", (event) => {
  if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? slides.length - 1
        : Math.max(
            0,
            Math.min(
              slides.length - 1,
              state.activeSlide + (event.key === "ArrowRight" ? 1 : -1),
            ),
          );
  changeSlide(next, { focusTab: true });
});

continueButton.addEventListener("click", () =>
  changeSlide(state.activeSlide + 1),
);
backButton.addEventListener("click", () => changeSlide(state.activeSlide - 1));
canvas.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") changeSlide(state.activeSlide + 1);
  if (event.key === "ArrowLeft") changeSlide(state.activeSlide - 1);
});
canvas.tabIndex = 0;

motionCheckbox.addEventListener("change", () => {
  state.reduceMotion = motionCheckbox.checked;
  document.documentElement.classList.toggle(
    "reduce-motion",
    state.reduceMotion,
  );
  localStorage.setItem("aero-reduce-motion", String(state.reduceMotion));
  if (state.reduceMotion && state.cameraTransition) {
    camera?.position.copy(state.cameraTransition.toPosition);
    controls?.target.copy(state.cameraTransition.toTarget);
    state.cameraTransition = null;
  }
});

motionMedia.addEventListener("change", (event) => {
  if (localStorage.getItem("aero-reduce-motion") !== null) return;
  state.reduceMotion = event.matches;
  motionCheckbox.checked = state.reduceMotion;
  document.documentElement.classList.toggle(
    "reduce-motion",
    state.reduceMotion,
  );
});

const projectDialog = document.querySelector("#project-dialog");
document
  .querySelector(".project-trigger")
  .addEventListener("click", () => projectDialog.showModal());
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

function resizeRenderer() {
  if (!renderer || !camera) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (!width || !height) return;
  const expectedWidth = Math.floor(width * renderer.getPixelRatio());
  const expectedHeight = Math.floor(height * renderer.getPixelRatio());
  if (canvas.width === expectedWidth && canvas.height === expectedHeight)
    return;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.fov = width < 600 ? 52 : width < 900 ? 42 : 34;
  camera.updateProjectionMatrix();
  fitOverviewCamera(true);
}

function updateHotspots() {
  if (!state.modelReady || !camera) return;
  const sceneRect = sceneWrap.getBoundingClientRect();
  const isMobile = sceneRect.width < 650;
  components.forEach((component) => {
    const button = component.buttonElement;
    const line = component.lineElement;
    const marker = component.markerElement;
    component.anchorObject.getWorldPosition(projectedPosition).project(camera);
    const insideView =
      projectedPosition.z > -1 &&
      projectedPosition.z < 1 &&
      Math.abs(projectedPosition.x) <= 1 &&
      Math.abs(projectedPosition.y) <= 1;
    const selected = slides[state.activeSlide].component === component.id;
    const visibleForSlide = isMobile
      ? selected
      : state.activeSlide === 0 || selected;
    const visible = insideView && visibleForSlide;
    button.hidden = !visible;
    line.style.display = visible ? "" : "none";
    marker.style.display = visible ? "" : "none";
    if (!visible) return;
    const anchorX = (projectedPosition.x * 0.5 + 0.5) * sceneRect.width;
    const anchorY = (-projectedPosition.y * 0.5 + 0.5) * sceneRect.height;
    const buttonRect = button.getBoundingClientRect();
    const labelX = buttonRect.left - sceneRect.left + buttonRect.width / 2;
    const labelY = buttonRect.top - sceneRect.top + buttonRect.height / 2;
    line.setAttribute("x1", String(labelX));
    line.setAttribute("y1", String(labelY));
    line.setAttribute("x2", String(anchorX));
    line.setAttribute("y2", String(anchorY));
    marker.setAttribute("cx", String(anchorX));
    marker.setAttribute("cy", String(anchorY));
  });
}

function easeInOutCubic(value) {
  return value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
}

function animate(time) {
  animationFrame = requestAnimationFrame(animate);
  resizeRenderer();
  if (state.cameraTransition) {
    const progress = Math.min(
      (time - state.cameraTransition.started) / state.cameraTransition.duration,
      1,
    );
    const eased = easeInOutCubic(progress);
    camera.position.lerpVectors(
      state.cameraTransition.fromPosition,
      state.cameraTransition.toPosition,
      eased,
    );
    controls.target.lerpVectors(
      state.cameraTransition.fromTarget,
      state.cameraTransition.toTarget,
      eased,
    );
    if (progress === 1) state.cameraTransition = null;
  }
  controls.update();
  renderer.render(scene, camera);
  updateHotspots();
}

document.addEventListener("visibilitychange", () => {
  if (!renderer) return;
  if (document.hidden && animationFrame) cancelAnimationFrame(animationFrame);
  if (!document.hidden) animationFrame = requestAnimationFrame(animate);
});

createScene();
