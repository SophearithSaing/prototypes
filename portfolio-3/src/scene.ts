import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import {
  RoadJourney,
  createRoadControls,
  type RoadTravelState,
} from "./road-journey";
import { timelineLayout } from "./timeline-layout";

export interface RoadSceneState extends RoadTravelState {
  available: boolean;
}

export function createJourneyScene(
  container: HTMLElement,
  milestoneElements: HTMLElement[],
  onRoadChange?: (state: RoadSceneState) => void,
): {
  dispose(): void;
  setPaused(paused: boolean): void;
  setFocusedMilestone(index: number | null): void;
  setView(view: "overview" | "road"): void;
  moveToStop(direction: -1 | 1): void;
} {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const originalPositions = milestoneElements.map((element) => ({
    left: element.style.left,
    top: element.style.top,
  }));
  const hadReadyClass = container.classList.contains("is-ready");
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = glowCanvas.height = 128;
  const context = glowCanvas.getContext("2d");
  if (!context) throw new Error("Unable to create the journey glow texture.");
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.08, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.24, "rgba(255,255,255,0.3)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.065)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const glowTexture = new THREE.CanvasTexture(glowCanvas);
  glowTexture.colorSpace = THREE.SRGBColorSpace;

  // Let WebGL initialization errors reach the caller's fallback.
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
    premultipliedAlpha: true,
  });
  renderer.setClearColor(0x080b10, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:absolute;inset:0;display:block;width:100%;height:100%;pointer-events:auto;touch-action:pan-y;cursor:grab;";

  const scene = new THREE.Scene();
  const layoutCamera = new THREE.PerspectiveCamera(40, 1, 0.1, 180);
  layoutCamera.position.set(0, 17, 25);
  layoutCamera.lookAt(0, 0, -4);
  layoutCamera.updateMatrixWorld();
  const camera = layoutCamera.clone();
  const composer = new EffectComposer(renderer);
  const samples = Math.min(2, renderer.capabilities.maxSamples);
  composer.renderTarget1.samples = samples;
  composer.renderTarget2.samples = samples;
  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(1, 1),
    0.43,
    0.6,
    1.1,
  );
  const outputPass = new ShaderPass({
    uniforms: { tDiffuse: { value: null } },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      void main() {
        gl_FragColor = texture2D(tDiffuse, vUv);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        // Bloom's alpha is opaque. Restore a premultiplied, feathered stage edge.
        float edge = smoothstep(0.0, 0.095, vUv.x)
          * smoothstep(0.0, 0.075, 1.0 - vUv.x)
          * smoothstep(0.0, 0.075, vUv.y)
          * smoothstep(0.0, 0.065, 1.0 - vUv.y);
        gl_FragColor = vec4(gl_FragColor.rgb * edge, edge);
      }
    `,
  });
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);

  const atmosphere = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms: { uRoad: { value: 0 } },
      depthTest: false,
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.999, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uRoad;
        varying vec2 vUv;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
        }
        void main() {
          vec2 p = vUv;
          float cloud = noise(p * vec2(7.0, 11.0)) * 0.57
            + noise(p * 29.0) * 0.28 + noise(p * 73.0) * 0.15;
          vec2 blueCenter = vec2(0.55, mix(0.69, 0.48, uRoad));
          float blue = exp(-dot((p - blueCenter) * vec2(2.7, 2.0),
            (p - blueCenter) * vec2(2.7, 2.0)));
          float gold = exp(-dot((p - vec2(0.47, 0.24)) * vec2(5.8, 3.0),
            (p - vec2(0.47, 0.24)) * vec2(5.8, 3.0)));
          vec3 color = vec3(0.007, 0.010, 0.016);
          color += vec3(0.014, 0.024, 0.052) * blue * cloud * cloud;
          color += vec3(0.028, 0.016, 0.007) * gold * cloud * 0.5;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    }),
  );
  atmosphere.frustumCulled = false;
  atmosphere.renderOrder = -100;
  scene.add(atmosphere);

  function glow(
    parent: THREE.Object3D,
    color: THREE.ColorRepresentation,
    size: number,
    opacity: number,
  ): THREE.Sprite {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color,
        opacity,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      }),
    );
    sprite.scale.set(size, size, 1);
    parent.add(sprite);
    return sprite;
  }

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      map: glowTexture,
      color: 0x4b658e,
      opacity: 0.13,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.scale.set(80, 100, 1);
  floor.position.set(0, -0.12, -20);
  scene.add(floor);

  const mainMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(3.4, 2.3, 1.3),
  });
  const goldMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(1.7, 0.78, 0.24),
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const mainCore = new THREE.Mesh(new THREE.BufferGeometry(), mainMaterial);
  const mainGold = new THREE.Mesh(new THREE.BufferGeometry(), goldMaterial);
  scene.add(mainGold, mainCore);
  const mainMist = Array.from({ length: 15 }, () =>
    glow(scene, 0xeab978, 4, 0.022),
  );
  const alternativeLines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.27,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  scene.add(alternativeLines);

  const pointMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
    vertexShader: `
      uniform float uTime;
      uniform float uPixelRatio;
      attribute float aSize;
      attribute float aPhase;
      varying vec3 vColor;
      varying float vLight;
      void main() {
        vColor = color;
        vLight = 0.82 + 0.18 * sin(uTime * 0.65 + aPhase);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uPixelRatio;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vLight;
      void main() {
        vec2 p = gl_PointCoord * 2.0 - 1.0;
        float radius = dot(p, p);
        float light = exp(-radius * 7.0) * 0.4 + exp(-radius * 45.0);
        gl_FragColor = vec4(vColor, light * vLight * (1.0 - smoothstep(0.5, 1.0, radius)));
      }
    `,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
  });
  const stars = new THREE.Points(new THREE.BufferGeometry(), pointMaterial);
  const particles = new THREE.Points(new THREE.BufferGeometry(), pointMaterial);
  particles.frustumCulled = false;
  scene.add(stars, particles);

  const portal = new THREE.Group();
  const portalDetails = new THREE.Group();
  portal.add(portalDetails);
  scene.add(portal);
  const metalMaterial = new THREE.MeshBasicMaterial({
    color: 0x263243,
    transparent: true,
    opacity: 0.44,
    side: THREE.DoubleSide,
  });
  for (const radius of [1.15, 2.3, 2.8, 3.55, 4.35, 5.15]) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(radius, radius + (radius > 3 ? 0.09 : 0.14), 144),
      metalMaterial,
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -radius * 0.025;
    portal.add(ring);
  }
  const ringPositions: number[] = [];
  const ringColors: number[] = [];
  function ringSegment(
    a: THREE.Vector3,
    b: THREE.Vector3,
    color: THREE.Color,
  ): void {
    ringPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    ringColors.push(color.r, color.g, color.b, color.r, color.g, color.b);
  }
  const ringColor = new THREE.Color();
  for (const [index, radius] of [
    0.43, 0.64, 0.88, 1.38, 2.26, 2.51, 2.97, 3.6, 4.15, 4.48, 5.2, 5.65,
  ].entries()) {
    const steps = 144;
    for (let step = 0; step < steps; step++) {
      const angle = (step / steps) * Math.PI * 2;
      const next = ((step + 1) / steps) * Math.PI * 2;
      const intensity = 0.35 + 0.65 * Math.pow(Math.sin(angle * 2 + index), 8);
      ringColor.setRGB(
        index % 3 ? 0.26 : 0.7,
        index % 3 ? 0.36 : 0.44,
        index % 3 ? 0.55 : 0.2,
      );
      ringColor.multiplyScalar(intensity * (index < 4 ? 0.8 : 0.36));
      ringSegment(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          0.01 - radius * 0.025,
          Math.sin(angle) * radius,
        ),
        new THREE.Vector3(
          Math.cos(next) * radius,
          0.01 - radius * 0.025,
          Math.sin(next) * radius,
        ),
        ringColor,
      );
    }
  }
  for (let i = 0; i < 96; i++) {
    const angle = (i / 96) * Math.PI * 2;
    const inner = i % 8 === 0 ? 4.55 : 5.28;
    ringSegment(
      new THREE.Vector3(
        Math.cos(angle) * inner,
        -0.09,
        Math.sin(angle) * inner,
      ),
      new THREE.Vector3(Math.cos(angle) * 5.57, -0.09, Math.sin(angle) * 5.57),
      new THREE.Color(0.13, 0.18, 0.26),
    );
  }
  const ringGeometry = new THREE.BufferGeometry();
  ringGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(ringPositions, 3),
  );
  ringGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(ringColors, 3),
  );
  portalDetails.add(
    new THREE.LineSegments(
      ringGeometry,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ),
  );
  for (let i = 0; i < 13; i++) {
    const angle = i * 2.39996;
    const radius = 2.4 + (i % 4) * 0.91;
    const fleck = glow(
      portalDetails,
      new THREE.Color(0.55, 1.5, 2.8),
      0.38,
      0.65,
    );
    fleck.position.set(
      Math.cos(angle) * radius,
      0.025,
      Math.sin(angle) * radius,
    );
  }
  const portalCore = new THREE.Mesh(
    new THREE.CircleGeometry(0.3, 48),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(5, 3.5, 1.8) }),
  );
  portalCore.rotation.x = -Math.PI / 2;
  portalCore.position.y = 0.065;
  portal.add(portalCore);
  const portalGlow = glow(portal, 0xf7bd72, 5, 0.14);
  portalGlow.position.y = 0.14;
  const portalFlare = glow(portal, new THREE.Color(2.8, 1.8, 0.8), 3, 0.5);
  portalFlare.scale.set(3.6, 0.35, 1);
  portalFlare.position.y = 0.12;

  const horizon = new THREE.Group();
  scene.add(horizon);
  glow(horizon, 0x638fd3, 19, 0.19);
  glow(horizon, new THREE.Color(0.6, 1.2, 2.3), 7, 0.52);
  glow(horizon, new THREE.Color(2.4, 2.8, 3.2), 1.1, 0.9);
  const horizonStreak = glow(horizon, new THREE.Color(0.7, 1.3, 2.3), 1, 0.45);
  horizonStreak.scale.set(16, 0.2, 1);
  const horizonWarmth = glow(horizon, 0xfbc995, 6, 0.3);
  horizonWarmth.position.x = 1.7;
  horizonWarmth.scale.y = 0.75;

  const nodeGeometry = new THREE.SphereGeometry(1, 20, 14);
  const anchors = timelineLayout(milestoneElements.length);
  const nodes = anchors.map((anchor) => {
    const group = new THREE.Group();
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(4.2, 3.1, 1.8),
    });
    const sphere = new THREE.Mesh(nodeGeometry, material);
    sphere.scale.setScalar(3.9 - anchor.progress * 0.8);
    group.add(sphere);
    const halo = glow(group, 0xffce89, 34, 0.54);
    const haze = glow(group, 0xe8b675, 88, 0.12);
    scene.add(group);
    return { group, material, halo, haze, unit: 1, focus: 0 };
  });

  const raycaster = new THREE.Raycaster();
  const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.16);
  const screen = new THREE.Vector2();
  const projected = new THREE.Vector3();
  const sample = new THREE.Vector3();
  const previousSample = new THREE.Vector3();
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const wander = new THREE.Vector2();
  const wanderTarget = new THREE.Vector2();
  const pointerPrevious = new THREE.Vector2();
  let activePointer: number | null = null;
  let mainCurve: THREE.CatmullRomCurve3;
  let alternativeCurves: THREE.CatmullRomCurve3[] = [];
  let flows: {
    curve: THREE.CatmullRomCurve3;
    offset: number;
    speed: number;
  }[] = [];
  let particlePositions = new Float32Array(0);
  let width = 0;
  let height = 0;
  let pixelRatio = 0;
  let cardWidths: number[] = [];
  let frame = 0;
  let lastTime = 0;
  let time = 0;
  let paused = reducedMotion.matches;
  let disposed = false;
  let contextLost = false;
  let ready = false;
  let focusedMilestone: number | null = null;
  const road = new RoadJourney();
  const roadLookAt = new THREE.Vector3();
  let view: "overview" | "road" = "overview";
  let layoutView: "overview" | "road" = view;
  const initialBounds = container.getBoundingClientRect();
  let inViewport =
    initialBounds.bottom > 0 &&
    initialBounds.top < window.innerHeight &&
    initialBounds.right > 0 &&
    initialBounds.left < window.innerWidth;
  const labelPositions = milestoneElements.map(() => ({ x: NaN, y: NaN }));

  function notifyRoad(): void {
    onRoadChange?.({ ...road.state, available: !disposed && !contextLost });
  }

  function restoreMilestones(): void {
    for (const element of milestoneElements) {
      element.hidden = false;
      element.inert = false;
      element.classList.remove("is-road-stop");
      element.style.removeProperty("--road-scale");
      element.style.removeProperty("--road-opacity");
      element.style.removeProperty("z-index");
    }
  }

  function floorPoint(x: number, y: number): THREE.Vector3 {
    screen.set(x * 2 - 1, 1 - y * 2);
    raycaster.setFromCamera(screen, layoutCamera);
    return raycaster.ray.intersectPlane(ground, new THREE.Vector3())!;
  }

  function replaceGeometry(
    object: THREE.Mesh | THREE.Points | THREE.LineSegments,
    geometry: THREE.BufferGeometry,
  ): void {
    object.geometry.dispose();
    object.geometry = geometry;
  }

  function resize(): void {
    if (disposed || contextLost) return;
    const nextWidth = container.clientWidth;
    const nextHeight = container.clientHeight;
    const nextRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const nextCards = milestoneElements.map(
      (element) =>
        element.offsetWidth ||
        parseFloat(getComputedStyle(element).width) ||
        170,
    );
    if (
      nextWidth === width &&
      nextHeight === height &&
      nextRatio === pixelRatio &&
      layoutView === view &&
      nextCards.every((value, index) => value === cardWidths[index])
    )
      return;
    width = nextWidth;
    height = nextHeight;
    cardWidths = nextCards;
    layoutView = view;
    if (!width || !height) {
      syncActivity();
      return;
    }
    pixelRatio = nextRatio;
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    composer.setPixelRatio(pixelRatio);
    composer.setSize(width, height);
    // A softer, lower-resolution bloom leaves the actual path and stars sharp.
    bloomPass.setSize(width * pixelRatio * 0.72, height * pixelRatio * 0.72);
    pointMaterial.uniforms.uPixelRatio.value = pixelRatio;
    // A fixed authoring viewport keeps the road's world geometry consistent
    // across phones and desktops. Only the viewing camera changes aspect.
    const layoutWidth = view === "road" ? 1050 : width;
    const layoutHeight = view === "road" ? 730 : height;
    layoutCamera.aspect = layoutWidth / layoutHeight;
    camera.aspect = width / height;
    camera.fov = view === "road" ? 66 : 40;
    layoutCamera.updateProjectionMatrix();
    camera.updateProjectionMatrix();

    let seed = 81273;
    const random = (): number => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    // Author in screen space, then intersect the perspective floor. This keeps
    // 66px cards evenly spaced without flattening the journey's depth.
    const nodeX = anchors.map(({ x }, index) => {
      const space = (view === "road" ? 178 : (cardWidths[index] ?? 170)) + 42;
      const min = index % 2 ? Math.min(0.7, space / layoutWidth) : 0.2;
      const max = index % 2 ? 0.8 : Math.max(0.3, 1 - space / layoutWidth);
      return THREE.MathUtils.clamp(x, min, max);
    });
    const nodeY = anchors.map(({ y }) => y);
    const spacing = nodes.length > 1 ? 0.6 / (nodes.length - 1) : 0.6;
    let controls = [floorPoint(0.45, 0.83), floorPoint(0.455, 0.792)];
    let nodeControlIndices: number[] = [];
    for (let index = 0; index < nodes.length; index++) {
      nodeControlIndices.push(controls.length);
      controls.push(floorPoint(nodeX[index], nodeY[index]));
      if (index < nodes.length - 1) {
        const bulge =
          layoutWidth < 600
            ? 0.63 - anchors[index].progress * 0.048
            : 0.605 - anchors[index].progress * 0.064;
        controls.push(floorPoint(bulge, nodeY[index] - spacing * 0.3666667));
        controls.push(
          floorPoint(
            (nodeX[index + 1] + bulge) / 2,
            nodeY[index] - spacing * 0.6533333,
          ),
        );
      }
    }
    controls.push(floorPoint(0.56, 0.135), floorPoint(0.53, 0.125));
    if (view === "road") {
      const roadLayout = createRoadControls(controls, nodeControlIndices);
      controls = roadLayout.points;
      nodeControlIndices = roadLayout.stopIndices;
    }
    mainCurve = new THREE.CatmullRomCurve3(controls, false, "centripetal");
    mainCurve.arcLengthDivisions = 600;
    road.setRoute(mainCurve, nodeControlIndices);
    replaceGeometry(
      mainCore,
      new THREE.TubeGeometry(mainCurve, 440, 0.026, 7, false),
    );
    replaceGeometry(
      mainGold,
      new THREE.TubeGeometry(mainCurve, 440, 0.059, 7, false),
    );
    for (const [index, node] of nodes.entries()) {
      node.group.position.copy(controls[nodeControlIndices[index]]);
      sample
        .copy(node.group.position)
        .applyMatrix4(layoutCamera.matrixWorldInverse);
      node.unit =
        (-sample.z *
          2 *
          Math.tan(THREE.MathUtils.degToRad(layoutCamera.fov / 2))) /
        layoutHeight;
    }
    for (const [index, mist] of mainMist.entries()) {
      mainCurve.getPointAt((index + 0.3) / mainMist.length, mist.position);
      mist.scale.setScalar(3.1 + index * 0.15);
    }
    portal.position.copy(controls[0]);
    portal.position.y = 0;
    portal.scale.setScalar(
      THREE.MathUtils.clamp(layoutWidth / layoutHeight / 1.2, 0.52, 1),
    );
    horizon.position.copy(controls[controls.length - 1]);
    horizon.position.y += 0.08;

    const threadPositions: number[] = [];
    const threadColors: number[] = [];
    const threadColor = new THREE.Color();
    const horizontalScale = layoutWidth / layoutHeight / (1050 / 730);
    alternativeCurves = [];
    for (let lane = 0; lane < 30; lane++) {
      const side = lane % 2 ? 1 : -1;
      const spread = 0.055 + Math.floor(lane / 2) * 0.045;
      const phase = random() * Math.PI * 2;
      const frequency = 2.2 + random() * 1.7;
      const amplitude = 0.05 + random() * 0.075;
      const endY = 0.108 + random() * 0.028;
      const endX = 0.51 + random() * 0.035;
      const branch = lane % 5 === 0;
      const origin = branch
        ? mainCurve.getPointAt(0.12 + random() * 0.6)
        : null;
      const originScreen = origin?.clone().project(layoutCamera);
      const startY = originScreen ? 0.5 - originScreen.y * 0.5 : 1.04;
      const points: THREE.Vector3[] = [];
      for (let step = 0; step <= 48; step++) {
        const t = step / 48;
        const envelope = Math.pow(1 - t, 0.55);
        let x =
          endX +
          side * spread * envelope +
          Math.sin(t * Math.PI * 2 * frequency + phase) *
            amplitude *
            Math.pow(Math.sin(Math.PI * t), 0.6);
        if (originScreen) {
          x = THREE.MathUtils.lerp(
            originScreen.x * 0.5 + 0.5,
            x,
            Math.sin((t * Math.PI) / 2),
          );
        }
        const point = floorPoint(x, THREE.MathUtils.lerp(startY, endY, t));
        point.y = 0.12 + Math.sin(t * 11 + phase) * 0.055;
        points.push(point);
      }
      if (origin) points[0].copy(origin);
      const curve = new THREE.CatmullRomCurve3(points);
      alternativeCurves.push(curve);
      curve.getPoint(0, previousSample);
      for (let step = 1; step <= 180; step++) {
        const t = step / 180;
        curve.getPoint(t, sample);
        threadPositions.push(
          previousSample.x,
          previousSample.y,
          previousSample.z,
          sample.x,
          sample.y,
          sample.z,
        );
        const brightness =
          (0.14 + 0.86 * Math.pow(Math.sin(t * 13 + phase), 6)) *
          Math.pow(Math.sin(Math.PI * t), 0.3) *
          (1 - lane / 48);
        threadColor
          .setRGB(lane % 3 ? 0.24 : 0.39, 0.32, lane % 3 ? 0.65 : 0.62)
          .multiplyScalar(brightness);
        threadColors.push(
          threadColor.r,
          threadColor.g,
          threadColor.b,
          threadColor.r,
          threadColor.g,
          threadColor.b,
        );
        previousSample.copy(sample);
      }
    }
    const threadGeometry = new THREE.BufferGeometry();
    threadGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(threadPositions, 3),
    );
    threadGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(threadColors, 3),
    );
    replaceGeometry(alternativeLines, threadGeometry);

    const starPositions: number[] = [];
    const starColors: number[] = [];
    const starSizes: number[] = [];
    const starPhases: number[] = [];
    for (let index = 0; index < 1150; index++) {
      if (view === "road") {
        sample.set(
          (random() - 0.5) * 180,
          4 + random() * 65,
          -90 + random() * 180,
        );
      } else if (index < 900) {
        sample
          .set(random() * 2.2 - 1.1, random() * 2.2 - 1.1, 0.5)
          .unproject(layoutCamera);
        sample
          .sub(layoutCamera.position)
          .normalize()
          .multiplyScalar(70 + random() * 60)
          .add(layoutCamera.position);
      } else {
        sample.copy(horizon.position);
        sample.x += (random() - 0.5) * 30 * horizontalScale;
        sample.y += (random() - 0.5) * 10;
        sample.z += (random() - 0.5) * 25;
      }
      starPositions.push(sample.x, sample.y, sample.z);
      const light = 0.13 + Math.pow(random(), 3) * 0.9;
      const warm = random() > 0.87;
      starColors.push(
        light * (warm ? 1 : 0.5),
        light * (warm ? 0.8 : 0.7),
        light * (warm ? 0.58 : 1),
      );
      starSizes.push(1.1 + Math.pow(random(), 5) * 3.8);
      starPhases.push(random() * Math.PI * 2);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3),
    );
    starGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(starColors, 3),
    );
    starGeometry.setAttribute(
      "aSize",
      new THREE.Float32BufferAttribute(starSizes, 1),
    );
    starGeometry.setAttribute(
      "aPhase",
      new THREE.Float32BufferAttribute(starPhases, 1),
    );
    replaceGeometry(stars, starGeometry);

    flows = [];
    const flowColors: number[] = [];
    const flowSizes: number[] = [];
    const flowPhases: number[] = [];
    for (let index = 0; index < 116; index++) {
      const isGold = index < 26;
      flows.push({
        curve: isGold
          ? mainCurve
          : alternativeCurves[(index - 26) % alternativeCurves.length],
        offset: random(),
        speed: isGold ? 0.012 + random() * 0.007 : 0.004 + random() * 0.009,
      });
      flowColors.push(...(isGold ? [3.2, 2.2, 1.1] : [0.6, 1.05, 1.8]));
      flowSizes.push(isGold ? 3.6 + random() * 2.7 : 2.4 + random() * 3.9);
      flowPhases.push(random() * Math.PI * 2);
    }
    particlePositions = new Float32Array(flows.length * 3);
    const flowGeometry = new THREE.BufferGeometry();
    flowGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    );
    flowGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(flowColors, 3),
    );
    flowGeometry.setAttribute(
      "aSize",
      new THREE.Float32BufferAttribute(flowSizes, 1),
    );
    flowGeometry.setAttribute(
      "aPhase",
      new THREE.Float32BufferAttribute(flowPhases, 1),
    );
    replaceGeometry(particles, flowGeometry);
    syncActivity();
  }

  function canRender(): boolean {
    return (
      !disposed &&
      !contextLost &&
      !document.hidden &&
      inViewport &&
      width > 0 &&
      height > 0
    );
  }

  function requestRender(): void {
    if (!frame && canRender()) frame = window.requestAnimationFrame(render);
  }

  function syncActivity(): void {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    requestRender();
  }

  function render(timestamp: number): void {
    frame = 0;
    if (!canRender()) return;
    const moving = !paused;
    const traveling = view === "road" && road.state.traveling;
    const frameDelta = lastTime
      ? Math.min((timestamp - lastTime) / 1000, 0.05)
      : 0;
    lastTime = moving || traveling ? timestamp : 0;
    const delta = moving ? frameDelta : 0;
    time += delta;
    if (moving && view === "overview") {
      pointer.x = THREE.MathUtils.damp(pointer.x, pointerTarget.x, 3, delta);
      pointer.y = THREE.MathUtils.damp(pointer.y, pointerTarget.y, 3, delta);
      wander.x = THREE.MathUtils.damp(wander.x, wanderTarget.x, 3, delta);
      wander.y = THREE.MathUtils.damp(wander.y, wanderTarget.y, 3, delta);
    }
    if (view === "road") {
      if (road.update(frameDelta, reducedMotion.matches)) notifyRoad();
      road.getPose(camera.position, roadLookAt);
      camera.lookAt(roadLookAt);
    } else {
      const offsetX = pointer.x * 0.16 + wander.x;
      const offsetY = pointer.y * 0.08 + wander.y;
      camera.position.set(offsetX, 17 - offsetY, 25);
      camera.lookAt(offsetX * 0.35, 0, -4 + offsetY * 0.3);
    }
    camera.updateMatrixWorld();
    pointMaterial.uniforms.uTime.value = time;
    portalDetails.rotation.y = time * 0.025;
    portalGlow.material.opacity = 0.14 + Math.sin(time * 0.8) * 0.008;
    for (const [index, node] of nodes.entries()) {
      const target =
        index === (view === "road" ? road.state.targetIndex : focusedMilestone)
          ? 1
          : 0;
      node.focus = moving
        ? THREE.MathUtils.damp(node.focus, target, 9, delta)
        : target;
      const pulse = 1 + Math.sin(time * 1.4 + index * 1.7) * 0.025;
      node.group.scale.setScalar(
        (view === "road" ? 0.016 : node.unit) * pulse * (1 + node.focus * 0.3),
      );
      node.material.color.setRGB(
        4.2 + node.focus * 1.8,
        3.1 + node.focus * 1.7,
        1.8 + node.focus * 1.3,
      );
      node.halo.material.opacity = 0.54 + node.focus * 0.25;
      node.haze.material.opacity = 0.12 + node.focus * 0.13;
    }
    for (const [index, flow] of flows.entries()) {
      flow.curve.getPointAt((flow.offset + time * flow.speed) % 1, sample);
      sample.y += 0.025;
      sample.toArray(particlePositions, index * 3);
    }
    particles.geometry.getAttribute("position").needsUpdate = true;
    composer.render(delta);
    const roadLabels: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    }[] = [];
    for (
      let index = 0;
      index < Math.min(nodes.length, milestoneElements.length);
      index++
    ) {
      const element = milestoneElements[index];
      if (view === "road") {
        const side = index % 2 ? -1 : 1;
        road.getStopAnchor(
          index,
          Math.min(1.65, camera.aspect * 1.5) * side,
          projected,
        );
      } else {
        nodes[index].group.getWorldPosition(projected);
      }
      projected.project(camera);
      let x = (projected.x * 0.5 + 0.5) * width;
      let y = (-projected.y * 0.5 + 0.5) * height;
      if (view === "road") {
        const selected =
          index === road.state.stopIndex && !road.state.traveling;
        const distance = road.distanceToStop(index);
        const scale = THREE.MathUtils.clamp(
          5.5 / Math.max(1, distance),
          0.42,
          1,
        );
        element.hidden =
          (index < road.state.stopIndex && index !== road.state.targetIndex) ||
          projected.z < -1 ||
          projected.z > 1 ||
          distance < 0 ||
          (!selected && (distance > 34 || Math.abs(projected.x) > 1.2));
        element.inert = !selected;
        element.classList.toggle("is-road-stop", selected);
        element.style.setProperty("--road-scale", scale.toFixed(3));
        element.style.setProperty(
          "--road-opacity",
          selected ? "1" : String(Math.max(0.25, 0.65 - distance / 90)),
        );
        element.style.zIndex = String(100 - index);
        if (selected) {
          const halfWidth = element.offsetWidth / 2 + 20;
          const compact = height <= 600 && width >= 540;
          x = THREE.MathUtils.clamp(
            x,
            halfWidth,
            Math.max(halfWidth, width - halfWidth),
          );
          y = THREE.MathUtils.clamp(
            y,
            215,
            Math.max(215, height - (compact ? 106 : 300)),
          );
        }
        if (!element.hidden) {
          const box = {
            left: x - (element.offsetWidth * scale) / 2,
            right: x + (element.offsetWidth * scale) / 2,
            top: y - element.offsetHeight * scale,
            bottom: y,
          };
          // Distant labels naturally converge; keep the nearest one readable.
          const overlaps = roadLabels.some(
            (other) =>
              box.left < other.right + 12 &&
              box.right > other.left - 12 &&
              box.top < other.bottom + 12 &&
              box.bottom > other.top - 12,
          );
          if (!selected && overlaps) element.hidden = true;
          else roadLabels.push(box);
        }
      }
      const previous = labelPositions[index];
      if (
        !Number.isFinite(previous.x) ||
        Math.abs(x - previous.x) > 0.05 ||
        Math.abs(y - previous.y) > 0.05
      ) {
        element.style.left = `${x.toFixed(2)}px`;
        element.style.top = `${y.toFixed(2)}px`;
        previous.x = x;
        previous.y = y;
      }
    }
    if (!ready) {
      ready = true;
      container.classList.add("is-ready");
    }
    if (moving || (view === "road" && road.state.traveling)) requestRender();
  }

  function isInteractive(event: PointerEvent): boolean {
    return (
      event.target instanceof Element &&
      Boolean(
        event.target.closest(
          'button, a, input, select, textarea, [contenteditable="true"]',
        ),
      )
    );
  }

  function onPointerDown(event: PointerEvent): void {
    if (
      view === "road" ||
      paused ||
      isInteractive(event) ||
      !event.isPrimary ||
      event.button !== 0 ||
      activePointer !== null
    )
      return;
    activePointer = event.pointerId;
    pointerPrevious.set(event.clientX, event.clientY);
    container.setPointerCapture(event.pointerId);
    canvas.style.cursor = "grabbing";
  }

  function onPointerMove(event: PointerEvent): void {
    if (view === "road" || paused || isInteractive(event) || !event.isPrimary)
      return;
    const bounds = container.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    if (event.pointerType === "mouse") {
      pointerTarget.set(
        THREE.MathUtils.clamp(
          ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
          -1,
          1,
        ),
        THREE.MathUtils.clamp(
          ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
          -1,
          1,
        ),
      );
    }
    if (activePointer === event.pointerId) {
      wanderTarget.x = THREE.MathUtils.clamp(
        wanderTarget.x - (event.clientX - pointerPrevious.x) / bounds.width,
        -0.22,
        0.22,
      );
      wanderTarget.y = THREE.MathUtils.clamp(
        wanderTarget.y +
          ((event.clientY - pointerPrevious.y) / bounds.height) * 0.4,
        -0.1,
        0.1,
      );
      pointerPrevious.set(event.clientX, event.clientY);
    }
  }

  function endDrag(event?: PointerEvent): void {
    if (event && activePointer !== null && event.pointerId !== activePointer)
      return;
    const pointerId = activePointer;
    activePointer = null;
    if (pointerId !== null && container.hasPointerCapture(pointerId))
      container.releasePointerCapture(pointerId);
    canvas.style.cursor = view === "road" ? "default" : "grab";
  }

  function onPointerLeave(): void {
    pointerTarget.set(0, 0);
  }

  function onMotionChange(): void {
    endDrag();
    paused = reducedMotion.matches;
    if (reducedMotion.matches) {
      pointer.set(0, 0);
      pointerTarget.set(0, 0);
      wander.set(0, 0);
      wanderTarget.set(0, 0);
    }
    syncActivity();
  }

  function onContextLost(event: Event): void {
    event.preventDefault();
    contextLost = true;
    ready = false;
    endDrag();
    container.classList.remove("is-ready");
    container.classList.add("is-context-lost");
    notifyRoad();
    syncActivity();
  }

  function onContextRestored(): void {
    if (disposed) return;
    contextLost = false;
    container.classList.remove("is-context-lost");
    pixelRatio = 0;
    resize();
    notifyRoad();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  for (const element of milestoneElements) resizeObserver.observe(element);
  const intersectionObserver = new IntersectionObserver((entries) => {
    inViewport = entries.some((entry) => entry.isIntersecting);
    if (!inViewport) endDrag();
    syncActivity();
  });
  intersectionObserver.observe(container);
  container.addEventListener("pointerdown", onPointerDown);
  container.addEventListener("pointermove", onPointerMove, { passive: true });
  container.addEventListener("pointerup", endDrag);
  container.addEventListener("pointercancel", endDrag);
  container.addEventListener("lostpointercapture", endDrag);
  container.addEventListener("pointerleave", onPointerLeave);
  canvas.addEventListener("webglcontextlost", onContextLost);
  canvas.addEventListener("webglcontextrestored", onContextRestored);
  document.addEventListener("visibilitychange", syncActivity);
  window.addEventListener("resize", resize, { passive: true });
  reducedMotion.addEventListener("change", onMotionChange);
  container.prepend(canvas);
  resize();

  return {
    setView(nextView): void {
      if (disposed || nextView === view) return;
      endDrag();
      view = nextView;
      road.reset();
      pointer.set(0, 0);
      pointerTarget.set(0, 0);
      wander.set(0, 0);
      wanderTarget.set(0, 0);
      restoreMilestones();
      container.dataset.view = view;
      canvas.style.cursor = view === "road" ? "default" : "grab";
      canvas.style.touchAction = view === "road" ? "none" : "pan-y";
      atmosphere.material.uniforms.uRoad.value = view === "road" ? 1 : 0;
      resize();
      notifyRoad();
    },
    moveToStop(direction): void {
      if (disposed || contextLost || view !== "road") return;
      if (road.move(direction, reducedMotion.matches)) {
        notifyRoad();
        requestRender();
      }
    },
    setPaused(value: boolean): void {
      if (disposed || paused === value) return;
      paused = value;
      if (paused) endDrag();
      syncActivity();
    },
    setFocusedMilestone(index: number | null): void {
      if (disposed) return;
      focusedMilestone =
        index !== null &&
        Number.isInteger(index) &&
        index >= 0 &&
        index < nodes.length
          ? index
          : null;
      requestRender();
    },
    dispose(): void {
      if (disposed) return;
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", endDrag);
      container.removeEventListener("pointercancel", endDrag);
      container.removeEventListener("lostpointercapture", endDrag);
      container.removeEventListener("pointerleave", onPointerLeave);
      endDrag();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      document.removeEventListener("visibilitychange", syncActivity);
      window.removeEventListener("resize", resize);
      reducedMotion.removeEventListener("change", onMotionChange);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Points
        ) {
          geometries.add(object.geometry);
        }
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Points ||
          object instanceof THREE.Sprite
        ) {
          for (const material of Array.isArray(object.material)
            ? object.material
            : [object.material])
            materials.add(material);
        }
      });
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      glowTexture.dispose();
      renderPass.dispose();
      bloomPass.dispose();
      bloomPass.materialHighPassFilter.dispose();
      outputPass.dispose();
      composer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      scene.clear();
      canvas.remove();
      if (!hadReadyClass) container.classList.remove("is-ready");
      container.classList.remove("is-context-lost");
      restoreMilestones();
      delete container.dataset.view;
      for (const [index, element] of milestoneElements.entries()) {
        element.style.left = originalPositions[index].left;
        element.style.top = originalPositions[index].top;
      }
    },
  };
}
