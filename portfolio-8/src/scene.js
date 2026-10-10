import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { milestones, alternatePaths } from "./data.js";

const GOLD = new THREE.Color(2.9, 1.65, 0.7);
const BLUE = new THREE.Color(0.16, 0.25, 0.48);
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const raycaster = new THREE.Raycaster();

function randomGenerator(seed = 27) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.045, "#fffffff0");
  gradient.addColorStop(0.13, "#ffffff88");
  gradient.addColorStop(0.32, "#ffffff22");
  gradient.addColorStop(0.65, "#ffffff08");
  gradient.addColorStop(1, "#ffffff00");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

function makeSpaceTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  const random = randomGenerator(510);
  context.fillStyle = "#050a11";
  context.fillRect(0, 0, canvas.width, canvas.height);

  function cloud(x, y, radius, color) {
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "transparent");
    context.fillStyle = gradient;
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  cloud(870, 205, 450, "#3a5a8066");
  cloud(740, 550, 440, "#273a503b");
  cloud(745, 870, 310, "#82633e15");
  for (let i = 0; i < 80; i++) {
    const y = 110 + random() * 720;
    const x = 850 - y * 0.1 + (random() - 0.5) * 430;
    cloud(
      x,
      y,
      35 + random() * 180,
      `rgba(60, 83, 119, ${0.008 + random() * 0.015})`,
    );
  }
  for (let i = 0; i < 18000; i++) {
    const alpha = random() * 0.034;
    context.fillStyle = `rgba(122, 155, 190, ${alpha})`;
    context.fillRect(random() * 1536, random() * 1024, 1, 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function getLayout(width) {
  const mobile = width <= 640;
  if (mobile) {
    return {
      mobile,
      main: [
        [0.5, 0.95],
        [0.5, 0.88],
        [0.49, 0.842],
        [0.45, 0.775],
        [0.31, 0.713],
        [0.59, 0.65],
        [0.67, 0.598],
        [0.42, 0.525],
        [0.38, 0.467],
        [0.59, 0.4],
        [0.67, 0.358],
        [0.59, 0.307],
      ],
      milestones: [
        { position: [0.45, 0.775], side: "right" },
        { position: [0.59, 0.65], side: "left" },
        { position: [0.42, 0.525], side: "right" },
        { position: [0.59, 0.4], side: "left" },
      ],
      alternates: [
        { position: [0.3, 0.778], side: "left" },
        { position: [0.96, 0.66], side: "left" },
        { position: [0.3, 0.533], side: "left" },
        { position: [0.96, 0.417], side: "left" },
      ],
      branches: [
        [
          [0.5, 0.88],
          [0.2, 0.825],
          [0.3, 0.778],
          [0.19, 0.716],
          [0.26, 0.659],
          [0.18, 0.54],
          [0.36, 0.45],
          [0.59, 0.307],
        ],
        [
          [0.45, 0.775],
          [0.8, 0.714],
          [0.96, 0.66],
          [0.79, 0.604],
          [0.89, 0.526],
          [0.74, 0.454],
          [0.59, 0.307],
        ],
        [
          [0.59, 0.65],
          [0.25, 0.596],
          [0.3, 0.533],
          [0.18, 0.474],
          [0.36, 0.4],
          [0.59, 0.307],
        ],
        [
          [0.42, 0.525],
          [0.79, 0.476],
          [0.96, 0.417],
          [0.76, 0.37],
          [0.59, 0.307],
        ],
      ],
      origin: [0.5, 0.84],
      platform: [0.5, 0.95],
      end: [0.59, 0.307],
    };
  }
  return {
    mobile,
    main: [
      [0.49, 0.927],
      [0.49, 0.837],
      [0.49, 0.785],
      [0.512, 0.728],
      [0.536, 0.687],
      [0.641, 0.622],
      [0.565, 0.54],
      [0.645, 0.465],
      [0.58, 0.385],
      [0.64, 0.318],
      [0.58, 0.242],
      [0.621, 0.2],
      [0.582, 0.161],
    ],
    milestones,
    alternates: alternatePaths,
    branches: [
      [
        [0.49, 0.785],
        [0.61, 0.733],
        [0.736, 0.695],
        [0.815, 0.653],
        [0.785, 0.615],
        [0.734, 0.554],
        [0.788, 0.487],
        [0.7, 0.423],
        [0.748, 0.349],
        [0.68, 0.28],
        [0.706, 0.225],
        [0.582, 0.161],
      ],
      [
        [0.49, 0.785],
        [0.359, 0.728],
        [0.39, 0.682],
        [0.284, 0.63],
        [0.218, 0.566],
        [0.304, 0.514],
        [0.249, 0.457],
        [0.352, 0.397],
        [0.3, 0.343],
        [0.384, 0.29],
        [0.369, 0.24],
        [0.582, 0.161],
      ],
      [
        [0.565, 0.54],
        [0.462, 0.523],
        [0.422, 0.486],
        [0.343, 0.432],
        [0.376, 0.389],
        [0.49, 0.329],
        [0.424, 0.285],
        [0.512, 0.235],
        [0.582, 0.161],
      ],
      [
        [0.58, 0.385],
        [0.709, 0.356],
        [0.799, 0.322],
        [0.776, 0.28],
        [0.728, 0.253],
        [0.746, 0.224],
        [0.66, 0.192],
        [0.582, 0.161],
      ],
    ],
    origin: [0.49, 0.797],
    platform: [0.49, 0.927],
    end: [0.582, 0.161],
  };
}

export class CareerScene {
  constructor(canvas, onSelect) {
    this.canvas = canvas;
    this.onSelect = onSelect;
    this.pointer = new THREE.Vector2();
    this.parallax = new THREE.Vector2();
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.alternatesVisible = true;
    this.alternateOpacity = 1;
    this.selected = null;
    this.hovered = null;
    this.disposed = false;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    this.renderer.setSize(this.width, this.height);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.scene = new THREE.Scene();
    this.spaceTexture = makeSpaceTexture();
    this.scene.background = this.spaceTexture;
    this.camera = new THREE.PerspectiveCamera(
      43,
      this.width / this.height,
      0.1,
      600,
    );
    this.resetCamera();
    this.glowTexture = makeGlowTexture();
    this.scene.add(new THREE.AmbientLight("#789bc5", 1.6));
    const light = new THREE.DirectionalLight("#e8cc9b", 2.2);
    light.position.set(-8, 15, 7);
    this.scene.add(light);
    this.world = new THREE.Group();
    this.scene.add(this.world);
    this.composer = new EffectComposer(this.renderer);
    this.composer.renderTarget1.samples = 4;
    this.composer.renderTarget2.samples = 4;
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(this.width, this.height),
      0.42,
      0.28,
      1.15,
    );
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
    this.build();
    this.bindEvents();
    this.startTime = performance.now();
    this.lastFrame = this.startTime;
    this.frame = this.frame.bind(this);
    this.animationFrame = requestAnimationFrame(this.frame);
  }

  resetCamera() {
    this.camera.position.set(0, 24, 28);
    this.camera.lookAt(0, 0, -12);
    this.camera.updateMatrixWorld();
  }

  ground(position) {
    raycaster.setFromCamera(
      new THREE.Vector2(position[0] * 2 - 1, 1 - position[1] * 2),
      this.camera,
    );
    const point = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, point);
    return point;
  }

  curve(points) {
    return new THREE.CatmullRomCurve3(
      points.map((point) => this.ground(point)),
      false,
      "centripetal",
      0.5,
    );
  }

  sprite(position, color, size, opacity = 1, parent = this.world) {
    const material = new THREE.SpriteMaterial({
      map: this.glowTexture,
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      toneMapped: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.position.copy(position);
    sprite.scale.set(size, size, 1);
    parent.add(sprite);
    return sprite;
  }

  line(curve, color, opacity, parent = this.world) {
    const points = curve.getPoints(240);
    const colors = [];
    const baseColor = new THREE.Color(color);
    points.forEach((point, index) => {
      const t = index / (points.length - 1);
      const fade = Math.min(1, t * 14, (1 - t) * 17);
      const screen = this.screenPosition(point);
      const x = screen.x / this.width;
      const y = screen.y / this.height;
      const introFade =
        !this.layout.mobile && y > 0.12 && y < 0.46
          ? 0.1 + THREE.MathUtils.smoothstep(x, 0.24, 0.42) * 0.9
          : 1;
      const intensity =
        fade * introFade * (0.58 + Math.sin(t * 29 + point.x) * 0.23);
      colors.push(
        baseColor.r * intensity,
        baseColor.g * intensity,
        baseColor.b * intensity,
      );
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity,
        depthWrite: false,
      }),
    );
    parent.add(line);
    return line;
  }

  build() {
    this.clearWorld();
    this.resetCamera();
    this.layout = getLayout(this.width);
    this.nodes = [];
    this.routes = [];
    this.animatedGlows = [];
    this.alternateGroup = new THREE.Group();
    this.world.add(this.alternateGroup);
    this.makeStars();
    this.makeThreads();
    this.makePlatform();
    this.mainCurve = this.curve(this.layout.main);
    const mainRadius = this.layout.mobile ? 0.033 : 0.062;
    const outer = new THREE.Mesh(
      new THREE.TubeGeometry(this.mainCurve, 500, mainRadius * 2.4, 6, false),
      new THREE.MeshBasicMaterial({
        color: "#f1af63",
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    const ribbon = new THREE.Mesh(
      new THREE.TubeGeometry(this.mainCurve, 500, mainRadius, 8, false),
      new THREE.MeshBasicMaterial({ color: GOLD }),
    );
    const core = new THREE.Mesh(
      new THREE.TubeGeometry(this.mainCurve, 500, mainRadius * 0.38, 6, false),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(3.4, 2.8, 1.9) }),
    );
    this.world.add(outer, ribbon, core);

    this.layout.milestones.forEach((item, index) => {
      const position = this.ground(item.position);
      const distance = this.camera.position.distanceTo(position);
      const radius = distance * (this.layout.mobile ? 0.0028 : 0.004);
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 16, 12),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(3.4, 2.8, 1.8) }),
      );
      sphere.position.copy(position);
      this.world.add(sphere);
      const glow = this.sprite(position, "#ffc683", radius * 12, 0.44);
      this.sprite(position, "#edb77c", radius * 29, 0.045);
      this.nodes.push({
        id: milestones[index].id,
        position,
        sphere,
        glow,
        size: radius * 12,
        type: "main",
      });
    });

    this.layout.branches.forEach((points, index) => {
      const curve = this.curve(points);
      const path = this.line(curve, BLUE, 0.64, this.alternateGroup);
      const glowLine = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 240, 0.025, 5, false),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(0.13, 0.2, 0.44),
          transparent: true,
          opacity: 0.16,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      this.alternateGroup.add(glowLine);
      this.routes.push({
        id: alternatePaths[index].id,
        line: path,
        glow: glowLine,
      });
      const position = this.ground(this.layout.alternates[index].position);
      const radius = this.camera.position.distanceTo(position) * 0.0018;
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 12, 8),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(0.7, 1.2, 2.1),
          transparent: true,
        }),
      );
      sphere.position.copy(position);
      this.alternateGroup.add(sphere);
      const glow = this.sprite(
        position,
        "#85bbff",
        radius * 13,
        0.42,
        this.alternateGroup,
      );
      this.nodes.push({
        id: alternatePaths[index].id,
        position,
        sphere,
        glow,
        size: radius * 13,
        type: "alternate",
      });
      for (let n = 1; n < 8; n++) {
        const point = curve.getPointAt(n / 9);
        const size = this.camera.position.distanceTo(point) * 0.009;
        this.sprite(point, "#92c0ff", size, 0.62, this.alternateGroup);
      }
    });

    const end = this.ground(this.layout.end);
    const endDistance = this.camera.position.distanceTo(end);
    this.endGlow = this.sprite(end, "#82bfff", endDistance * 0.19, 0.39);
    this.sprite(end, "#c6dfff", endDistance * 0.036, 0.95);
    const flare = this.sprite(end, "#b9d9ff", endDistance * 0.13, 0.75);
    flare.scale.y *= 0.055;
    flare.scale.x *= 1.7;
    const flareInner = this.sprite(end, "#ffe4b9", endDistance * 0.085, 0.56);
    flareInner.scale.y *= 0.04;
    this.destinationPosition = end;
    this.originPosition = this.ground(this.layout.origin);
    const originNode = this.ground(
      this.layout.mobile ? [0.495, 0.842] : [0.49, 0.785],
    );
    const originDistance = this.camera.position.distanceTo(originNode);
    this.sprite(originNode, "#ffd59f", originDistance * 0.034, 0.9);
    this.traveler = this.sprite(
      this.mainCurve.getPointAt(0),
      "#fff0d5",
      0.75,
      0.8,
    );
    this.makeJourneyDust();
    this.updateLabels();
  }

  makeStars() {
    const random = randomGenerator(42);
    const count = this.layout.mobile ? 600 : 1300;
    const positions = [];
    const colors = [];
    const sizes = [];
    const phases = [];
    for (let i = 0; i < count; i++) {
      const point = new THREE.Vector3(
        random() * 2.6 - 1.3,
        random() * 2.5 - 1.25,
        0.9,
      ).unproject(this.camera);
      point
        .sub(this.camera.position)
        .normalize()
        .multiplyScalar(100 + random() * 180)
        .add(this.camera.position);
      positions.push(point.x, point.y, point.z);
      const brightness = 0.25 + random() * 0.65;
      colors.push(brightness * 0.6, brightness * 0.78, brightness);
      sizes.push(
        (0.45 + Math.pow(random(), 3) * 1.8) * this.renderer.getPixelRatio(),
      );
      phases.push(random() * Math.PI * 2);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute(
      "aPhase",
      new THREE.Float32BufferAttribute(phases, 1),
    );
    this.starMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `attribute float aSize; attribute float aPhase; varying vec3 vColor; varying float vAlpha; uniform float uTime;
        void main() { vColor = color; vAlpha = 0.68 + sin(aPhase + uTime * 0.3) * 0.23; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = aSize; }`,
      fragmentShader: `varying vec3 vColor; varying float vAlpha;
        void main() { float d = length(gl_PointCoord - 0.5); float alpha = (1.0 - smoothstep(0.05, 0.5, d)) * vAlpha; gl_FragColor = vec4(vColor, alpha); }`,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    this.world.add(new THREE.Points(geometry, this.starMaterial));
  }

  makeThreads() {
    const random = randomGenerator(115);
    const count = this.layout.mobile ? 12 : 19;
    const bottom = this.layout.mobile ? 1.08 : 1.1;
    const top = this.layout.mobile ? 0.265 : 0.06;
    for (let i = 0; i < count; i++) {
      const offset = (i / (count - 1) - 0.5) * 1.7;
      const phase = random() * Math.PI * 2;
      const frequency = 5 + random() * 5;
      const amplitude = 0.085 + random() * 0.1;
      const points = [];
      for (let j = 0; j < 38; j++) {
        const t = j / 37;
        const y = bottom - t * (bottom - top);
        const center = this.layout.mobile ? 0.51 : 0.51 + t * 0.067;
        const x =
          center +
          offset * (1 - t * 0.71) +
          Math.sin(t * Math.PI * frequency + phase) *
            amplitude *
            (1 - t * 0.71);
        points.push([x, y]);
      }
      const curve = this.curve(points);
      const color = i % 3 === 0 ? "#647ca3" : "#3b556f";
      this.line(curve, color, 0.07 + random() * 0.18, this.alternateGroup);
      for (let n = 0; n < 9; n++) {
        const t = random();
        const point = curve.getPointAt(t);
        const size =
          this.camera.position.distanceTo(point) * (0.003 + random() * 0.005);
        this.sprite(
          point,
          n % 4 === 0 ? "#c7c2e5" : "#83b2ea",
          size,
          0.18 + random() * 0.46,
          this.alternateGroup,
        );
      }
    }
  }

  makePlatform() {
    const center = this.ground(this.layout.platform);
    const right = this.ground([
      this.layout.platform[0] + (this.layout.mobile ? 0.4 : 0.245),
      this.layout.platform[1],
    ]);
    const radius = right.distanceTo(center);
    const platform = new THREE.Group();
    platform.position.copy(center);
    platform.position.y = 0.3;
    platform.scale.z = 0.24;
    this.world.add(platform);
    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius * 1.015, 0.18, 160),
      new THREE.MeshStandardMaterial({
        color: "#101a27",
        emissive: "#060c15",
        emissiveIntensity: 0.5,
        roughness: 0.65,
        metalness: 0.45,
      }),
    );
    plate.position.y = -0.2;
    platform.add(plate);
    const ringPositions = [
      0.08, 0.11, 0.15, 0.2, 0.33, 0.38, 0.48, 0.51, 0.62, 0.71, 0.8, 0.91, 1,
    ];
    ringPositions.forEach((fraction, index) => {
      const r = radius * fraction;
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(
          r,
          r + radius * (index % 3 === 0 ? 0.003 : 0.001),
          180,
        ),
        new THREE.MeshBasicMaterial({
          color: index < 4 ? "#a88453" : "#526477",
          transparent: true,
          opacity: index < 4 ? 0.34 : 0.28,
          side: THREE.DoubleSide,
        }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = index * 0.003;
      platform.add(ring);
      if (index > 3 && index % 2 === 0) {
        const band = new THREE.Mesh(
          new THREE.RingGeometry(r - radius * 0.024, r, 180),
          new THREE.MeshStandardMaterial({
            color: "#243243",
            emissive: "#080f19",
            emissiveIntensity: 0.4,
            roughness: 0.52,
            metalness: 0.55,
            side: THREE.DoubleSide,
          }),
        );
        band.rotation.x = -Math.PI / 2;
        band.position.y = 0.015;
        platform.add(band);
        const bevel = new THREE.Mesh(
          new THREE.TorusGeometry(r, radius * 0.004, 5, 160),
          new THREE.MeshStandardMaterial({
            color: "#2e3f51",
            roughness: 0.45,
            metalness: 0.5,
          }),
        );
        bevel.rotation.x = -Math.PI / 2;
        bevel.position.y = 0.025;
        platform.add(bevel);
      }
    });
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      const inner = i % 2 === 0 ? radius * 0.49 : radius * 0.72;
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(
            Math.cos(angle) * inner,
            0.05,
            Math.sin(angle) * inner,
          ),
          new THREE.Vector3(
            Math.cos(angle) * radius,
            0.05,
            Math.sin(angle) * radius,
          ),
        ]),
        new THREE.LineBasicMaterial({
          color: "#617087",
          transparent: true,
          opacity: 0.16,
        }),
      );
      platform.add(line);
    }
    for (let i = 0; i < 5; i++) {
      const angle = i * 1.3 + 0.2;
      const point = new THREE.Vector3(
        Math.cos(angle) * radius * 0.63,
        0.1,
        Math.sin(angle) * radius * 0.63,
      );
      this.sprite(point, "#76baff", radius * 0.037, 0.65, platform);
    }
    const centerDisc = new THREE.Mesh(
      new THREE.CircleGeometry(radius * 0.055, 48),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(4, 2.8, 1.5),
        side: THREE.DoubleSide,
      }),
    );
    centerDisc.rotation.x = -Math.PI / 2;
    centerDisc.position.y = 0.05;
    platform.add(centerDisc);
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.019, 0.027, 1.9, 10),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(3.3, 2.3, 1.2) }),
    );
    beam.position.copy(center);
    beam.position.y = 1.2;
    this.world.add(beam);
    this.sprite(center, "#ffc785", radius * 0.4, 0.36);
    this.sprite(center, "#b78a4e", radius * 1.3, 0.065);
  }

  makeJourneyDust() {
    const random = randomGenerator(73);
    const positions = [];
    for (let i = 0; i < 330; i++) {
      const t = random();
      const point = this.mainCurve.getPointAt(t);
      point.x += (random() - 0.5) * 5;
      point.z += (random() - 0.5) * 5;
      point.y += random() * 1.6;
      positions.push(point.x, point.y, point.z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    this.world.add(
      new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
          color: "#bba783",
          size: 0.025,
          transparent: true,
          opacity: 0.32,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    );
  }

  screenPosition(position) {
    const projected = position.clone().project(this.camera);
    return {
      x: (projected.x * 0.5 + 0.5) * this.width,
      y: (-projected.y * 0.5 + 0.5) * this.height,
    };
  }

  updateLabels() {
    this.nodes.forEach((node, index) => {
      const card = document.querySelector(`[data-node="${node.id}"]`);
      if (!card) return;
      const position = this.screenPosition(node.position);
      const isMain = node.type === "main";
      const data = isMain
        ? this.layout.milestones[index]
        : this.layout.alternates[index - milestones.length];
      const side = data.side;
      const gap = this.layout.mobile ? (isMain ? 17 : 10) : 22;
      const x = position.x + (side === "left" ? -card.offsetWidth - gap : gap);
      const y =
        position.y -
        (isMain
          ? this.layout.mobile
            ? 23
            : 27
          : this.layout.mobile
            ? 14
            : 24);
      card.dataset.side = side;
      card.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
    });
    const destination = document.getElementById("destination");
    const end = this.screenPosition(this.destinationPosition);
    destination.style.transform = `translate3d(${Math.round(end.x - destination.offsetWidth / 2)}px, ${Math.round(end.y - (this.layout.mobile ? 47 : 51))}px, 0)`;
    const origin = document.getElementById("origin");
    const start = this.screenPosition(this.originPosition);
    origin.style.transform = `translate3d(${Math.round(start.x - origin.offsetWidth / 2)}px, ${Math.round(start.y + 4)}px, 0)`;
  }

  bindEvents() {
    this.onPointerMove = (event) => {
      this.pointer.set(
        (event.clientX / this.width) * 2 - 1,
        -((event.clientY / this.height) * 2 - 1),
      );
      if (event.target !== this.canvas) {
        this.canvas.style.cursor = "";
        this.hoveredNode = null;
        return;
      }
      this.hoveredNode = this.nodes.find((node) => {
        if (node.type === "alternate" && !this.alternatesVisible) return false;
        const point = this.screenPosition(node.position);
        return (
          Math.hypot(point.x - event.clientX, point.y - event.clientY) < 17
        );
      });
      this.canvas.style.cursor = this.hoveredNode ? "pointer" : "";
    };
    this.onPointerLeave = () => this.pointer.set(0, 0);
    this.onClick = () => {
      if (this.hoveredNode) this.onSelect(this.hoveredNode.id);
    };
    this.onResize = () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
        this.composer.setSize(this.width, this.height);
        this.build();
      }, 100);
    };
    this.onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(this.animationFrame);
      } else {
        this.lastFrame = performance.now();
        this.animationFrame = requestAnimationFrame(this.frame);
      }
    };
    window.addEventListener("pointermove", this.onPointerMove, {
      passive: true,
    });
    document.addEventListener("pointerleave", this.onPointerLeave);
    this.canvas.addEventListener("click", this.onClick);
    window.addEventListener("resize", this.onResize);
    document.addEventListener("visibilitychange", this.onVisibilityChange);
  }

  select(id) {
    this.selected = id;
  }
  highlight(id) {
    this.hovered = id;
  }
  showAlternates(show) {
    this.alternatesVisible = show;
  }
  reset() {
    this.selected = null;
    this.hovered = null;
    this.pointer.set(0, 0);
    this.alternatesVisible = true;
  }

  frame(now) {
    if (this.disposed) return;
    this.animationFrame = requestAnimationFrame(this.frame);
    // Cap at 45fps on high-refresh screens; movement here is deliberately unhurried.
    if (now - this.lastFrame < 1000 / 45) return;
    this.lastFrame = now;
    const time = this.reducedMotion.matches ? 0 : (now - this.startTime) / 1000;
    const target =
      this.reducedMotion.matches || this.layout.mobile
        ? new THREE.Vector2()
        : this.pointer;
    this.parallax.lerp(target, 0.035);
    this.camera.position.set(
      this.parallax.x * 0.48,
      24 + this.parallax.y * 0.16,
      28,
    );
    this.camera.lookAt(this.parallax.x * 0.07, 0, -12);
    this.camera.updateMatrixWorld();
    this.starMaterial.uniforms.uTime.value = time;
    this.traveler.position.copy(
      this.mainCurve.getPointAt((time * 0.025 + 0.17) % 1),
    );
    this.traveler.material.opacity = this.reducedMotion.matches ? 0 : 0.8;
    this.endGlow.material.opacity = 0.36 + Math.sin(time * 0.6) * 0.035;
    this.alternateOpacity +=
      ((this.alternatesVisible ? 1 : 0.05) - this.alternateOpacity) * 0.065;
    this.alternateGroup.visible =
      this.alternateOpacity > 0.06 || this.alternatesVisible;
    this.nodes.forEach((node, index) => {
      const active = this.selected === node.id || this.hovered === node.id;
      const pulse = 1 + Math.sin(time * 1.1 + index) * 0.065;
      node.glow.scale.setScalar(node.size * pulse * (active ? 1.35 : 1));
      node.sphere.scale.setScalar(active ? 1.2 : 1);
      node.glow.material.opacity =
        (active ? 0.7 : 0.42) *
        (node.type === "alternate" ? this.alternateOpacity : 1);
    });
    this.routes.forEach((route) => {
      const active = this.selected === route.id || this.hovered === route.id;
      route.line.material.opacity = (active ? 1 : 0.6) * this.alternateOpacity;
      route.glow.material.opacity =
        (active ? 0.5 : 0.15) * this.alternateOpacity;
    });
    this.updateLabels();
    this.composer.render();
  }

  clearWorld() {
    this.world.traverse((object) => {
      object.geometry?.dispose();
      if (object.material) {
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => material.dispose());
      }
    });
    this.world.clear();
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.animationFrame);
    clearTimeout(this.resizeTimeout);
    window.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerleave", this.onPointerLeave);
    this.canvas.removeEventListener("click", this.onClick);
    window.removeEventListener("resize", this.onResize);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.clearWorld();
    this.glowTexture.dispose();
    this.spaceTexture.dispose();
    this.composer.passes.forEach((pass) => pass.dispose?.());
    this.composer.dispose();
    this.renderer.dispose();
  }
}
