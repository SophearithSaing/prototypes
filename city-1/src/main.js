import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { GTAOPass } from "three/addons/postprocessing/GTAOPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { createCity } from "./city.js";
import { iconMarkup } from "./icons.js";
import "./style.css";

const canvas = document.querySelector("#city");
const scene = new THREE.Scene();
scene.background = new THREE.Color("#241943");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.94;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const camera = new THREE.OrthographicCamera(-12, 12, 9, -9, 0.1, 150);
const initialTarget = new THREE.Vector3(0, 1.03, 0.5);
const initialPosition = initialTarget
  .clone()
  .add(new THREE.Vector3(26, 28, 26));
camera.position.copy(initialPosition);
camera.lookAt(initialTarget);

const controls = new OrbitControls(camera, canvas);
controls.target.copy(initialTarget);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.enablePan = false;
controls.rotateSpeed = 0.38;
controls.zoomSpeed = 0.65;
controls.minZoom = 0.85;
controls.maxZoom = 1.7;
controls.minPolarAngle = 0.69;
controls.maxPolarAngle = 1.12;
controls.minAzimuthAngle = Math.PI / 4 - 0.5;
controls.maxAzimuthAngle = Math.PI / 4 + 0.5;
controls.saveState();
canvas.addEventListener("dblclick", () => controls.reset());

scene.add(new THREE.HemisphereLight("#c4ceff", "#b977a4", 1.05));
const key = new THREE.DirectionalLight("#fff0ec", 2.7);
key.position.set(-6, 22, 8);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
Object.assign(key.shadow.camera, {
  left: -15,
  right: 15,
  top: 15,
  bottom: -15,
  near: 0.5,
  far: 55,
});
key.shadow.normalBias = 0.035;
key.shadow.bias = -0.00015;
key.shadow.radius = 5;
key.shadow.blurSamples = 8;
scene.add(key);
const rim = new THREE.DirectionalLight("#9b9dff", 1.35);
rim.position.set(7, 9, -9);
scene.add(rim);
const fill = new THREE.DirectionalLight("#fb8ec8", 0.3);
fill.position.set(4, 3, 12);
scene.add(fill);

// A seamless aubergine backdrop, with soft violet light spilling below the island.
const groundMaterial = new THREE.ShaderMaterial({
  uniforms: {
    baseColor: { value: new THREE.Color("#3c315f") },
    glowColor: { value: new THREE.Color("#8b277f") },
  },
  vertexShader: `varying vec3 vPosition;
    void main() { vPosition = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `uniform vec3 baseColor; uniform vec3 glowColor; varying vec3 vPosition;
    void main() {
      vec2 p = vPosition.xy;
      float halo = exp(-dot(p / vec2(13.0, 12.0), p / vec2(13.0, 12.0)) * 1.7);
      float pool = exp(-dot((p - vec2(2.0,-7.0)) / 7.0, (p - vec2(2.0,-7.0)) / 7.0) * 2.0);
      vec3 col = mix(baseColor, glowColor, halo * 0.22 + pool * 0.45);
      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
});
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  groundMaterial,
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.86;
scene.add(ground);
const groundShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.ShadowMaterial({ color: "#100c28", opacity: 0.22 }),
);
groundShadow.rotation.x = -Math.PI / 2;
groundShadow.position.y = -0.85;
groundShadow.receiveShadow = true;
scene.add(groundShadow);

const city = createCity(scene);

// Batch repeated planting, mullions, and paving details without changing their shading.
scene.updateMatrixWorld(true);
const batches = new Map();
const isAnimated = (object) => {
  for (let current = object; current; current = current.parent)
    if (current.userData.animated) return true;
  return false;
};
city.root.traverse((object) => {
  if (!object.isMesh || object.material.transparent || isAnimated(object))
    return;
  if (
    !["RoundedBoxGeometry", "BoxGeometry", "CylinderGeometry"].includes(
      object.geometry.type,
    )
  )
    return;
  const id = `${object.geometry.uuid}:${object.material.uuid}:${object.castShadow}:${object.receiveShadow}`;
  if (!batches.has(id)) batches.set(id, []);
  batches.get(id).push(object);
});
for (const objects of batches.values()) {
  if (objects.length < 4) continue;
  const first = objects[0];
  const instances = new THREE.InstancedMesh(
    first.geometry,
    first.material,
    objects.length,
  );
  instances.castShadow = first.castShadow;
  instances.receiveShadow = first.receiveShadow;
  objects.forEach((object, index) =>
    instances.setMatrixAt(index, object.matrixWorld),
  );
  instances.instanceMatrix.needsUpdate = true;
  scene.add(instances);
  objects.forEach((object) => object.removeFromParent());
}

const staticMeshes = new Map();
city.root.traverse((object) => {
  if (
    !object.isMesh ||
    Array.isArray(object.material) ||
    object.material.transparent ||
    isAnimated(object)
  )
    return;
  const id = `${object.material.uuid}:${object.castShadow}:${object.receiveShadow}`;
  if (!staticMeshes.has(id)) staticMeshes.set(id, []);
  staticMeshes.get(id).push(object);
});
for (const objects of staticMeshes.values()) {
  if (objects.length < 2) continue;
  const geometries = objects.map((object) => {
    const geometry = object.geometry.index
      ? object.geometry.toNonIndexed()
      : object.geometry.clone();
    geometry.applyMatrix4(object.matrixWorld);
    return geometry;
  });
  const combined = new THREE.Mesh(
    mergeGeometries(geometries),
    objects[0].material,
  );
  combined.castShadow = objects[0].castShadow;
  combined.receiveShadow = objects[0].receiveShadow;
  scene.add(combined);
  geometries.forEach((geometry) => geometry.dispose());
  objects.forEach((object) => object.removeFromParent());
}

const composer = new EffectComposer(
  renderer,
  new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 }),
);
composer.addPass(new RenderPass(scene, camera));
const ao = new GTAOPass(scene, camera, 1, 1, undefined, {
  radius: 0.32,
  thickness: 1,
  distanceExponent: 1.5,
  scale: 1,
  samples: 8,
});
ao.blendIntensity = 0.44;
composer.addPass(ao);
const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.26, 0.4, 1.2);
composer.addPass(bloom);
composer.addPass(new OutputPass());

const labelContainer = document.querySelector("#labels");
const leaderSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
leaderSVG.classList.add("label-leader");
leaderSVG.setAttribute("aria-hidden", "true");
labelContainer.append(leaderSVG);

const definitions = [
  { name: "frontend", title: "Frontend", color: "#8a5bff", side: -1, lift: 77 },
  {
    name: "fullstack",
    title: "Full-Stack",
    color: "#f74c9d",
    side: 1,
    lift: 65,
  },
  { name: "mobile", title: "Mobile App", color: "#ff7b72", side: 1, lift: 78 },
  { name: "backend", title: "Backend", color: "#528dff", side: -1, lift: 70 },
  { name: "ai", title: "Trained Model", color: "#9661ff", side: 1, lift: 66 },
];

const labels = definitions.map((definition) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "city-label";
  button.dataset.name = definition.name;
  button.setAttribute("aria-label", `Illuminate ${definition.title}`);
  button.innerHTML = `${iconMarkup(definition.name)}<span>${definition.title}</span>`;
  labelContainer.append(button);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", definition.color);
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  circle.setAttribute("stroke", definition.color);
  leaderSVG.append(path, circle);
  const light = new THREE.PointLight(definition.color, 0, 8, 2);
  light.position.copy(city.anchors[definition.name]);
  light.position.y -= 1.25;
  scene.add(light);
  const label = {
    ...definition,
    button,
    path,
    circle,
    light,
    hovered: false,
    pulse: 0,
  };
  button.addEventListener("pointerenter", () => {
    label.hovered = true;
  });
  button.addEventListener("pointerleave", () => {
    label.hovered = false;
  });
  button.addEventListener("focus", () => {
    label.hovered = true;
  });
  button.addEventListener("blur", () => {
    label.hovered = false;
  });
  button.addEventListener("click", () => {
    label.pulse = 1;
  });
  return label;
});

let width = 0,
  height = 0,
  labelScale = 1;
const projected = new THREE.Vector3();
function positionLabels() {
  for (const label of labels) {
    projected.copy(city.anchors[label.name]).project(camera);
    const ax = (projected.x * 0.5 + 0.5) * width;
    const ay = (-projected.y * 0.5 + 0.5) * height;
    const w = label.button.offsetWidth * labelScale;
    const h = 56 * labelScale;
    const gap = 25 * labelScale;
    let x = label.side > 0 ? ax + gap : ax - gap - w;
    let y = ay - label.lift * labelScale;
    x = THREE.MathUtils.clamp(x, 12, width - w - 12);
    y = THREE.MathUtils.clamp(y, 12, height - h - 12);
    label.button.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${labelScale})`;
    const ex = label.side > 0 ? x + 2 : x + w - 2;
    const ey = y + h * 0.54;
    label.path.setAttribute(
      "d",
      `M${ax},${ay} C${ax},${ey} ${ax},${ey} ${ex},${ey}`,
    );
    label.path.setAttribute("stroke-width", 4 * labelScale);
    label.circle.setAttribute("cx", ax);
    label.circle.setAttribute("cy", ay);
    label.circle.setAttribute("r", 6.5 * labelScale);
    label.circle.setAttribute("stroke-width", 4 * labelScale);
  }
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  const aspect = width / height;
  const viewHeight = Math.max(18.65, 25.6 / aspect);
  camera.left = (-viewHeight * aspect) / 2;
  camera.right = (viewHeight * aspect) / 2;
  camera.top = viewHeight / 2;
  camera.bottom = -viewHeight / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  composer.setSize(width, height);
  ao.setSize(Math.round(width * 0.8), Math.round(height * 0.8));
  labelScale = Math.min(width / 1448, height / 1086) * 1.02;
  labelScale = THREE.MathUtils.clamp(labelScale, 0.44, 1.15);
  leaderSVG.setAttribute("viewBox", `0 0 ${width} ${height}`);
  positionLabels();
}
window.addEventListener("resize", resize);
resize();
document.fonts.ready.then(positionLabels);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const timer = new THREE.Timer();
timer.connect(document);
let elapsed = 0;
function animate(timestamp) {
  timer.update(timestamp);
  const delta = Math.min(timer.getDelta(), 0.05);
  elapsed += delta;
  controls.update();
  city.update(reducedMotion.matches ? 0 : elapsed);
  for (const label of labels) {
    label.pulse = Math.max(0, label.pulse - delta * 0.45);
    const intensity =
      (label.hovered ? 5 : 0) + Math.sin(label.pulse * Math.PI) * 18;
    label.light.intensity = THREE.MathUtils.lerp(
      label.light.intensity,
      intensity,
      Math.min(delta * 8, 1),
    );
  }
  positionLabels();
  composer.render();
}
renderer.setAnimationLoop(animate);
document.addEventListener("visibilitychange", () => {
  renderer.setAnimationLoop(document.hidden ? null : animate);
});

// Useful to browser-based checks without adding any visual chrome to the scene.
window.__city = { renderer, scene, camera, controls, ready: true };
