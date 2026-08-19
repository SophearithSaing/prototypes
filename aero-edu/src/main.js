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
    user: '<circle cx="12" cy="8" r="4" fill="currentColor" stroke="none"/><path d="M5 21a7 7 0 0 1 14 0z" fill="currentColor" stroke="none"/>',
    chevronDown: '<path d="m7 9 5 5 5-5"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
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
    title: "Aircraft Anatomy",
    subtitle: "",
    description:
      "An aircraft is made up of several key components that work together to ensure safe and efficient flight. Explore each part to understand its function.",
    points: [
      [
        "Cockpit",
        "The flight deck where pilots control the aircraft and manage systems.",
      ],
      [
        "Fuselage",
        "The main body of the aircraft. It houses the crew, passengers, cargo, and systems.",
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
    target: [0, 0.1, 0],
    zoom: 1,
  },
  {
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
    camera: [-1.2, 5.6, 7.7],
    target: [0.1, -0.15, 0],
    zoom: 1.15,
  },
  {
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
    camera: [-1.9, 1.2, 4.7],
    target: [-0.05, -0.18, 0.3],
    zoom: 1.3,
  },
  {
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
    camera: [-4.2, 0.1, 4.6],
    target: [-0.35, -0.35, 0],
    zoom: 1.15,
  },
  {
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
        "Balances aerodynamic forces around the center of gravity.",
      ],
      ["Elevator", "Controls the aircraft nose-up and nose-down pitch motion."],
    ],
    camera: [4.6, 2.4, 3.8],
    target: [0.55, 0.35, 0],
    zoom: 1.25,
  },
  {
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
    camera: [-5.2, 1.4, 2.5],
    target: [-0.65, 0.05, 0],
    zoom: 1.35,
  },
];

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
        <div>
          <div class="brand-name">AERO<span>ACADEMY</span></div>
          <div class="brand-tagline">Learn. Understand. Fly.</div>
        </div>
      </div>
      <nav class="main-nav" aria-label="Primary navigation">
        <button class="nav-item active" type="button">${icon("book")}<span>Lessons</span></button>
        <button class="nav-item" type="button">${icon("layers")}<span>Library</span></button>
        <button class="nav-item" type="button">${icon("clock")}<span>Quizzes</span></button>
        <button class="nav-item" type="button">${icon("trend")}<span>Progress</span></button>
      </nav>
      <button class="profile" type="button" aria-label="Open profile menu">
        <span class="profile-avatar">${icon("user")}</span>${icon("chevronDown")}
      </button>
    </header>

    <section class="workspace">
      <section class="lesson-main" aria-label="Interactive lesson">
        <div class="lesson-progress">
          <div class="lesson-title">
            <span class="eyebrow">Lesson 1 of 10</span><span class="title-divider"></span><strong>Aircraft Anatomy</strong>
          </div>
          <div class="progress-track" aria-label="Story progress">
            <div class="progress-fill"></div>
            <div class="progress-dots">
              ${slides.map((_, i) => `<button type="button" class="progress-dot ${i === 0 ? "active" : ""}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`).join("")}
            </div>
          </div>
        </div>

        <div class="scene-wrap">
          <canvas id="scene-canvas" aria-label="Interactive 3D model of a passenger aircraft"></canvas>
          <div class="scene-loading"><span class="loader-ring"></span><span>Loading aircraft</span></div>
          <div class="hotspots" aria-hidden="true">
            <div class="hotspot cockpit"><span class="hotspot-label">Cockpit</span><i class="leader"></i></div>
            <div class="hotspot fuselage"><span class="hotspot-label">Fuselage</span><i class="leader"></i></div>
            <div class="hotspot tail"><span class="hotspot-label">Tail</span><i class="leader"></i></div>
            <div class="hotspot wing"><span class="hotspot-label">Wing</span><i class="leader"></i></div>
            <div class="hotspot engine"><span class="hotspot-label">Engine</span><i class="leader"></i></div>
            <div class="hotspot gear"><span class="hotspot-label">Landing Gear</span><i class="leader"></i></div>
          </div>
          <div class="scene-help">${icon("mouse")} Drag to explore</div>
        </div>

        <div class="slide-strip" role="tablist" aria-label="Lesson slides">
          ${slides
            .map(
              (slide, i) => `
            <button type="button" class="slide-card ${i === 0 ? "active" : ""}" data-slide="${i}" role="tab" aria-selected="${i === 0}">
              <span class="card-art">${i === 0 ? '<i class="mini-plane"></i>' : ""}</span>
              <span class="card-number">${i + 1}</span>
              <span class="card-copy"><strong>${slide.title}</strong>${slide.subtitle ? `<span>${slide.subtitle}</span>` : ""}</span>
            </button>
          `,
            )
            .join("")}
        </div>
      </section>

      <aside class="info-panel" aria-live="polite">
        <span class="eyebrow slide-count">Story slide 1 of 6</span>
        <h1>Aircraft Anatomy</h1>
        <div class="accent-rule"></div>
        <p class="slide-description">${slides[0].description}</p>
        <div class="points-box">
          <div class="points-title"><span class="star-icon">${icon("star")}</span><span>Key Points</span></div>
          <ul class="points-list"></ul>
        </div>
      </aside>
    </section>

    <footer class="bottom-bar">
      <button type="button" class="footer-btn back-btn">${icon("chevronLeft")}<span>Back</span></button>
      <div class="flight-path" aria-hidden="true">${icon("plane", "footer-plane")}</div>
      <button type="button" class="footer-btn continue-btn"><span>Continue</span>${icon("chevronRight")}</button>
    </footer>
  </main>
`;

const pointsList = document.querySelector(".points-list");
const titleElement = document.querySelector(".info-panel h1");
const descriptionElement = document.querySelector(".slide-description");
const countElement = document.querySelector(".slide-count");
const hotspots = document.querySelector(".hotspots");
const progressFill = document.querySelector(".progress-fill");
const sceneLoading = document.querySelector(".scene-loading");
let activeSlide = 0;

function renderPoints(points) {
  pointsList.innerHTML = points
    .map(
      ([title, copy]) => `
    <li><span class="point-dot"></span><span class="point-copy"><strong>${title}</strong><span>${copy}</span></span></li>
  `,
    )
    .join("");
}

renderPoints(slides[0].points);

const canvas = document.querySelector("#scene-canvas");
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x020b18, 0.06);

const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(...slides[0].camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.enablePan = false;
controls.minDistance = 3.8;
controls.maxDistance = 12;
controls.maxPolarAngle = Math.PI * 0.72;
controls.target.set(...slides[0].target);

scene.add(new THREE.HemisphereLight(0xa9d4ff, 0x051020, 2.5));

const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
keyLight.position.set(-4, 8, 5);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x168cff, 3.2);
rimLight.position.set(6, 2, -5);
scene.add(rimLight);

const fillLight = new THREE.DirectionalLight(0x8cc7ff, 1.7);
fillLight.position.set(-7, 0, -2);
scene.add(fillLight);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40, 40, 40),
  new THREE.MeshStandardMaterial({
    color: 0x061426,
    roughness: 0.92,
    metalness: 0.05,
    transparent: true,
    opacity: 0.78,
    wireframe: false,
  }),
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.18;
floor.receiveShadow = true;
scene.add(floor);

const grid = new THREE.GridHelper(34, 34, 0x16527d, 0x103656);
grid.position.y = -1.165;
grid.material.opacity = 0.31;
grid.material.transparent = true;
scene.add(grid);

const glow = new THREE.Mesh(
  new THREE.CircleGeometry(3.8, 64),
  new THREE.MeshBasicMaterial({
    color: 0x0875c2,
    transparent: true,
    opacity: 0.06,
    depthWrite: false,
  }),
);
glow.rotation.x = -Math.PI / 2;
glow.position.y = -1.14;
scene.add(glow);

let aircraft;
let cameraTransition;

const manager = new THREE.LoadingManager();
manager.onLoad = () => sceneLoading.classList.add("hidden");
manager.onError = () => {
  sceneLoading.innerHTML = "<span>Aircraft model unavailable</span>";
};

new MTLLoader(manager)
  .setPath(import.meta.env.BASE_URL)
  .load("11803_Airplane_v1_l1.mtl", (materials) => {
    materials.preload();
    new OBJLoader(manager)
      .setMaterials(materials)
      .setPath(import.meta.env.BASE_URL)
      .load("11803_Airplane_v1_l1.obj", (object) => {
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        object.position.sub(center);
        aircraft = new THREE.Group();
        aircraft.add(object);
        aircraft.scale.setScalar(6.3 / Math.max(size.x, size.y));
        aircraft.rotation.x = Math.PI / 2;
        aircraft.rotation.y = Math.PI;
        aircraft.rotation.z = -0.03;
        object.traverse((child) => {
          if (!child.isMesh) return;
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;
          child.material.shininess = Math.min(
            child.material.shininess || 30,
            45,
          );
          child.material.needsUpdate = true;
        });
        scene.add(aircraft);
      });
  });

function transitionCamera(slide) {
  cameraTransition = {
    started: performance.now(),
    fromPosition: camera.position.clone(),
    toPosition: new THREE.Vector3(...slide.camera).multiplyScalar(
      1 / slide.zoom,
    ),
    fromTarget: controls.target.clone(),
    toTarget: new THREE.Vector3(...slide.target),
  };
}

function changeSlide(index) {
  if (index < 0 || index >= slides.length) return;
  activeSlide = index;
  const slide = slides[index];
  titleElement.textContent = slide.title;
  descriptionElement.textContent = slide.description;
  countElement.textContent = `Story slide ${index + 1} of ${slides.length}`;
  renderPoints(slide.points);
  hotspots.hidden = index !== 0;
  progressFill.style.width = `${(index / (slides.length - 1)) * 100}%`;
  document.querySelectorAll("[data-slide]").forEach((element) => {
    const selected = Number(element.dataset.slide) === index;
    element.classList.toggle("active", selected);
    if (element.matches(".slide-card"))
      element.setAttribute("aria-selected", String(selected));
  });
  const card = document.querySelector(`.slide-card[data-slide="${index}"]`);
  card.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });
  transitionCamera(slide);
}

document.querySelectorAll("[data-slide]").forEach((element) => {
  element.addEventListener("click", () =>
    changeSlide(Number(element.dataset.slide)),
  );
});

document.querySelector(".continue-btn").addEventListener("click", () => {
  changeSlide(Math.min(activeSlide + 1, slides.length - 1));
});

document.querySelector(".back-btn").addEventListener("click", () => {
  changeSlide(Math.max(activeSlide - 1, 0));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight")
    changeSlide(Math.min(activeSlide + 1, slides.length - 1));
  if (event.key === "ArrowLeft") changeSlide(Math.max(activeSlide - 1, 0));
});

function resizeRenderer() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (
    canvas.width !== Math.floor(width * renderer.getPixelRatio()) ||
    canvas.height !== Math.floor(height * renderer.getPixelRatio())
  ) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = width < 600 ? 57 : width < 900 ? 43 : 34;
    camera.updateProjectionMatrix();
  }
}

function easeInOutCubic(value) {
  return value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
}

function animate(time) {
  requestAnimationFrame(animate);
  resizeRenderer();
  if (cameraTransition) {
    const progress = Math.min((time - cameraTransition.started) / 850, 1);
    const eased = easeInOutCubic(progress);
    camera.position.lerpVectors(
      cameraTransition.fromPosition,
      cameraTransition.toPosition,
      eased,
    );
    controls.target.lerpVectors(
      cameraTransition.fromTarget,
      cameraTransition.toTarget,
      eased,
    );
    if (progress === 1) cameraTransition = null;
  }
  controls.update();
  renderer.render(scene, camera);
}

requestAnimationFrame(animate);
