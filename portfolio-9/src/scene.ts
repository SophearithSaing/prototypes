import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { careers, technologies, mobileCareerPositions } from "./data";

interface Anchor {
  element: HTMLElement;
  position: THREE.Vector3;
}

interface Pulse {
  mesh: THREE.Mesh;
  phase: number;
  material: THREE.MeshBasicMaterial;
}

const mobileSkillPositions: [number, number][] = [
  [0.17, 0.648],
  [0.31, 0.534],
  [0.46, 0.884],
  [0.5, 0.455],
  [0.63, 0.788],
  [0.77, 0.353],
  [0.84, 0.676],
];

export class CareerScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(43, 1, 0.1, 350);
  private composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private baseCamera = new THREE.Vector3(25, 28, 28);
  private target = new THREE.Vector3(0, 0, -7);
  private pointer = new THREE.Vector2();
  private smoothPointer = new THREE.Vector2();
  private ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private raycaster = new THREE.Raycaster();
  private dynamic = new THREE.Group();
  private branches = new THREE.Group();
  private anchors: Anchor[] = [];
  private pulses: Pulse[] = [];
  private travellers: THREE.Sprite[] = [];
  private curve = new THREE.CatmullRomCurve3();
  private glowTexture: THREE.CanvasTexture;
  private elapsed = 0;
  private lastTime = 0;
  private resizeFrame = 0;
  private paused = false;
  private needsRender = true;
  private mobile = false;
  private skillsVisible = true;
  private stackView = false;
  private selected = -1;
  private width = 1;
  private height = 1;
  private seed = 347;
  private reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;

  constructor(private container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    this.renderer.setClearColor(0x050b11);
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    container.prepend(this.renderer.domElement);
    this.camera.position.copy(this.baseCamera);
    this.camera.lookAt(this.target);
    this.scene.fog = new THREE.FogExp2(0x050b11, 0.0105);
    this.glowTexture = this.createGlow();

    this.composer = new EffectComposer(
      this.renderer,
      new THREE.WebGLRenderTarget(1, 1, {
        type: THREE.HalfFloatType,
        samples: 4,
      }),
    );
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.45, 0.25, 1.25);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    this.buildBoard();
    this.scene.add(this.dynamic);
    this.paused = this.reducedMotion;
    this.resize();
    window.addEventListener("resize", this.onResize);
    window.addEventListener("pointermove", this.onPointerMove, {
      passive: true,
    });
    document.addEventListener("visibilitychange", this.onVisibility);
    this.renderer.setAnimationLoop(this.render);
    requestAnimationFrame(() => document.body.classList.add("scene-ready"));
  }

  setPaused(paused: boolean) {
    this.paused = paused;
    this.needsRender = true;
    this.lastTime = 0;
  }

  setSelected(index: number) {
    this.selected = index;
    this.needsRender = true;
    this.pulses.forEach((pulse, i) => {
      pulse.material.opacity = index < 0 || i === index ? 0.5 : 0.12;
    });
  }

  setSkillsVisible(visible: boolean) {
    this.skillsVisible = visible;
    this.updateBranchVisibility();
  }

  setStackView(active: boolean) {
    this.stackView = active;
    this.updateBranchVisibility();
  }

  private updateBranchVisibility() {
    this.branches.visible =
      this.skillsVisible && (!this.mobile || this.stackView);
    this.needsRender = true;
  }

  private random() {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  private createGlow() {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const context = canvas.getContext("2d")!;
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.07, "rgba(255,255,255,.8)");
    gradient.addColorStop(0.22, "rgba(255,255,255,.28)");
    gradient.addColorStop(0.48, "rgba(255,255,255,.07)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }

  private createBoardTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#25323e";
    ctx.fillRect(0, 0, 1024, 1024);

    for (let i = 0; i < 26000; i++) {
      const shade = this.random() > 0.5 ? "255,255,255" : "0,0,0";
      ctx.fillStyle = `rgba(${shade},${this.random() * 0.055})`;
      ctx.fillRect(this.random() * 1024, this.random() * 1024, 1, 1);
    }

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const x = col * 128;
        const y = row * 128;
        ctx.strokeStyle = "#3b4c59";
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 4, y + 4, 120, 120);
        ctx.strokeStyle = "#0a131a";
        ctx.strokeRect(x + 7, y + 7, 114, 114);
        const kind = this.random();
        if (kind < 0.35) {
          for (let a = 0; a < 7; a++) {
            for (let b = 0; b < 7; b++) {
              ctx.fillStyle = "#070f15";
              ctx.beginPath();
              ctx.arc(x + 25 + a * 13, y + 25 + b * 13, 2.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = "#283740";
              ctx.fillRect(x + 24 + a * 13, y + 27 + b * 13, 2, 1);
            }
          }
        } else if (kind < 0.65) {
          for (let a = 0; a < 8; a++) {
            ctx.fillStyle = "#0a151c";
            ctx.fillRect(x + 15, y + 17 + a * 12, 98, 5);
            ctx.fillStyle = "#263742";
            ctx.fillRect(x + 15, y + 22 + a * 12, 98, 1);
          }
        } else if (kind < 0.82) {
          ctx.fillStyle = "#0a141d";
          ctx.fillRect(x + 37, y + 35, 54, 58);
          ctx.strokeStyle = "#3a4a51";
          ctx.strokeRect(x + 37, y + 35, 54, 58);
          for (let a = 0; a < 8; a++) {
            ctx.fillStyle = "#40505a";
            ctx.fillRect(x + 30, y + 40 + a * 6, 6, 2);
            ctx.fillRect(x + 92, y + 40 + a * 6, 6, 2);
            ctx.fillRect(x + 41 + a * 6, y + 29, 2, 5);
            ctx.fillRect(x + 41 + a * 6, y + 94, 2, 5);
          }
        } else {
          ctx.strokeStyle = "#2a414f";
          for (let a = 0; a < 6; a++) {
            ctx.beginPath();
            ctx.moveTo(x + 12 + a * 5, y + 118);
            ctx.lineTo(x + 12 + a * 5, y + 78 - a * 5);
            ctx.lineTo(x + 72 + a * 5, y + 18);
            ctx.stroke();
          }
        }
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(
      this.renderer.capabilities.getMaxAnisotropy(),
      8,
    );
    return texture;
  }

  private buildBoard() {
    const environment = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(environment, 0.04).texture;
    this.scene.environmentIntensity = 0.19;
    environment.dispose();
    pmrem.dispose();
    this.scene.add(new THREE.AmbientLight(0x719ab4, 0.6));
    const key = new THREE.DirectionalLight(0x8ba7be, 1.5);
    key.position.set(-15, 30, 12);
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0x1d728d, 1.0);
    rim.position.set(20, 6, -30);
    this.scene.add(rim);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(260, 260),
      new THREE.MeshStandardMaterial({
        color: 0x6b8190,
        map: this.createBoardTexture(),
        metalness: 0.42,
        roughness: 0.53,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -0.07, -45);
    this.scene.add(floor);

    const panelCount = 1350;
    const panelMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.65,
      roughness: 0.37,
    });
    const panels = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      panelMaterial,
      panelCount,
    );
    const detailPanels = [0, 1, 2].map(
      (pattern) =>
        new THREE.InstancedMesh(
          new THREE.PlaneGeometry(1, 1),
          new THREE.MeshStandardMaterial({
            map: this.createPanelTexture(pattern),
            metalness: 0.48,
            roughness: 0.58,
          }),
          panelCount,
        ),
    );
    const detailCounts = [0, 0, 0];
    const detailDummy = new THREE.Object3D();
    const dummy = new THREE.Object3D();
    const edgePositions: number[] = [];
    const edgesColors: number[] = [];
    const lightPositions: number[] = [];
    const lightColors: number[] = [];
    const tracePositions: number[] = [];
    const traceColors: number[] = [];

    const addSegment = (
      positions: number[],
      colors: number[],
      a: [number, number, number],
      b: [number, number, number],
      color: THREE.Color,
    ) => {
      positions.push(...a, ...b);
      colors.push(color.r, color.g, color.b, color.r, color.g, color.b);
    };

    for (let i = 0; i < panelCount; i++) {
      const col = i % 30;
      const row = Math.floor(i / 30);
      const x = (col - 15) * 4.45;
      const z = 30 - row * 4.45;
      const w = this.random() > 0.3 ? 3.98 : 1.5 + this.random() * 2.3;
      const d = this.random() > 0.35 ? 3.98 : 1.6 + this.random() * 2.2;
      const h = 0.035 + this.random() * 0.12;
      dummy.position.set(x, h / 2 - 0.04, z);
      dummy.scale.set(w, h, d);
      dummy.updateMatrix();
      panels.setMatrixAt(i, dummy.matrix);
      const value = 0.018 + this.random() * 0.03;
      panels.setColorAt(
        i,
        new THREE.Color().setRGB(value * 0.65, value * 0.87, value * 1.05),
      );
      if (this.random() > 0.36) {
        const pattern = Math.floor(this.random() * 3);
        detailDummy.position.set(x, h - 0.039, z);
        detailDummy.rotation.set(
          -Math.PI / 2,
          0,
          this.random() > 0.5 ? Math.PI : 0,
        );
        detailDummy.scale.set(w * 0.94, d * 0.94, 1);
        detailDummy.updateMatrix();
        detailPanels[pattern].setMatrixAt(
          detailCounts[pattern],
          detailDummy.matrix,
        );
        detailPanels[pattern].setColorAt(
          detailCounts[pattern],
          new THREE.Color().setRGB(value * 0.65, value * 0.87, value * 1.05),
        );
        detailCounts[pattern]++;
      }
      const ec = new THREE.Color()
        .setRGB(0.016, 0.031, 0.04)
        .multiplyScalar(0.45 + this.random());
      const y = h - 0.035;
      const corners: [number, number, number][] = [
        [x - w / 2, y, z - d / 2],
        [x + w / 2, y, z - d / 2],
        [x + w / 2, y, z + d / 2],
        [x - w / 2, y, z + d / 2],
      ];
      for (let k = 0; k < 4; k++)
        addSegment(
          edgePositions,
          edgesColors,
          corners[k],
          corners[(k + 1) % 4],
          ec,
        );

      const tx = x + 2.13;
      const tz = z + 2.13;
      const traceColor = new THREE.Color(
        this.random() > 0.94
          ? 0x726049
          : this.random() > 0.79
            ? 0x086680
            : 0x193c4c,
      ).multiplyScalar(0.2 + this.random() * 0.36);
      for (let k = 0; k < 2 + Math.floor(this.random() * 3); k++) {
        const offset = k * 0.09;
        const end = 2.3 + this.random() * 4;
        addSegment(
          tracePositions,
          traceColors,
          [tx + offset, 0.06, tz + 1],
          [tx + offset, 0.06, tz - end],
          traceColor,
        );
        addSegment(
          tracePositions,
          traceColors,
          [tx + offset, 0.06, tz - end],
          [tx + 0.65 + offset, 0.06, tz - end - 0.65],
          traceColor,
        );
        addSegment(
          tracePositions,
          traceColors,
          [tx + 0.65 + offset, 0.06, tz - end - 0.65],
          [tx + 2.4, 0.06, tz - end - 0.65],
          traceColor,
        );
      }

      if (this.random() > 0.28) {
        const lightColor = new THREE.Color(
          this.random() > 0.88
            ? "#ffc77e"
            : this.random() > 0.92
              ? "#7bf2bc"
              : "#06b7db",
        );
        const count =
          this.random() > 0.7 ? 1 : 3 + Math.floor(this.random() * 7);
        for (let k = 0; k < count; k++) {
          lightPositions.push(tx + k * 0.23, 0.11, tz + 0.1);
          lightColors.push(
            lightColor.r * 2.7,
            lightColor.g * 2.7,
            lightColor.b * 2.7,
          );
        }
      }
    }
    this.scene.add(panels);
    detailPanels.forEach((mesh, i) => {
      mesh.count = detailCounts[i];
      this.scene.add(mesh);
    });

    const makeLines = (positions: number[], colors: number[]) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3),
      );
      return new THREE.LineSegments(
        geometry,
        new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: 0.95,
        }),
      );
    };
    this.scene.add(
      makeLines(edgePositions, edgesColors),
      makeLines(tracePositions, traceColors),
    );

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(lightPositions, 3),
    );
    pointsGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lightColors, 3),
    );
    this.scene.add(
      new THREE.Points(
        pointsGeometry,
        new THREE.PointsMaterial({
          size: 0.25,
          map: this.glowTexture,
          vertexColors: true,
          transparent: true,
          opacity: 1,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          toneMapped: false,
        }),
      ),
    );
  }

  private createPanelTexture(pattern: number) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#c2c7cb";
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = "#d0d4d5";
    ctx.strokeRect(3, 3, 250, 250);
    ctx.strokeStyle = "#6a7882";
    ctx.strokeRect(7, 7, 242, 242);
    if (pattern === 0) {
      for (let row = 0; row < 12; row++) {
        for (let col = 0; col < 10; col++) {
          const x = 34 + col * 21;
          const y = 24 + row * 19;
          ctx.fillStyle = "#e3e6e7";
          ctx.beginPath();
          ctx.ellipse(x, y + 1.5, 4.4, 4.4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#101e2a";
          ctx.beginPath();
          ctx.arc(x, y, 4.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (pattern === 1) {
      for (let row = 0; row < 15; row++) {
        ctx.fillStyle = "#1b2c39";
        ctx.fillRect(22, 19 + row * 15, 212, 5);
        ctx.fillStyle = "#e4e8e9";
        ctx.fillRect(22, 24 + row * 15, 212, 1);
      }
    } else {
      ctx.fillStyle = "#263846";
      ctx.fillRect(63, 58, 130, 140);
      ctx.strokeStyle = "#e0e5e7";
      ctx.strokeRect(64, 59, 128, 138);
      ctx.strokeStyle = "#73818c";
      ctx.strokeRect(69, 64, 118, 128);
      for (let pin = 0; pin < 14; pin++) {
        ctx.fillStyle = "#384c5c";
        ctx.fillRect(49, 67 + pin * 9, 13, 4);
        ctx.fillRect(194, 67 + pin * 9, 13, 4);
        ctx.fillRect(70 + pin * 8, 44, 4, 13);
        ctx.fillRect(70 + pin * 8, 199, 4, 13);
        ctx.fillStyle = "#eceded";
        ctx.fillRect(50, 67 + pin * 9, 11, 1);
        ctx.fillRect(195, 67 + pin * 9, 11, 1);
      }
      ctx.fillStyle = "#59707e";
      ctx.font = "8px monospace";
      ctx.fillText("SC-2025", 93, 125);
      ctx.fillText("INTEGRATED", 87, 138);
      ctx.fillStyle = "#9ca9ae";
      ctx.beginPath();
      ctx.arc(80, 77, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(
      this.renderer.capabilities.getMaxAnisotropy(),
      8,
    );
    return texture;
  }

  private screenToGround(x: number, y: number, elevation = 0.21) {
    this.camera.updateMatrixWorld();
    this.raycaster.setFromCamera(
      new THREE.Vector2(x * 2 - 1, 1 - y * 2),
      this.camera,
    );
    this.ground.constant = -elevation;
    const point = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(this.ground, point);
    return point;
  }

  private pixelScale(point: THREE.Vector3) {
    return (
      (2 *
        point.distanceTo(this.camera.position) *
        Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2))) /
      this.height
    );
  }

  private sprite(
    color: THREE.ColorRepresentation,
    size: number,
    opacity: number,
  ) {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.glowTexture,
        color,
        opacity,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
        fog: false,
      }),
    );
    sprite.scale.set(size, size, 1);
    return sprite;
  }

  private pathColor(t: number) {
    const cyan = new THREE.Color("#00ddff");
    const aqua = new THREE.Color("#0dffde");
    const mint = new THREE.Color("#81ffb4");
    const gold = new THREE.Color("#ffc15a");
    if (t < 0.46) return cyan.lerp(aqua, t / 0.46);
    if (t < 0.73) return aqua.lerp(mint, (t - 0.46) / 0.27);
    return mint.lerp(gold, Math.min((t - 0.73) / 0.19, 1));
  }

  private buildJourney() {
    this.disposeGroup(this.dynamic);
    this.anchors = [];
    this.pulses = [];
    this.travellers = [];
    this.branches = new THREE.Group();
    this.dynamic.add(this.branches);
    this.updateBranchVisibility();

    const route: [number, number][] = this.mobile
      ? [
          [-0.12, 0.96],
          [0.06, 0.878],
          mobileCareerPositions[0],
          [0.225, 0.836],
          [0.33, 0.776],
          mobileCareerPositions[1],
          [0.48, 0.746],
          [0.59, 0.685],
          mobileCareerPositions[2],
          [0.731, 0.642],
          [0.79, 0.596],
          [0.881, 0.572],
          [0.817, 0.562],
          mobileCareerPositions[3],
        ]
      : [
          [-0.05, 0.963],
          [0.039, 0.884],
          careers[0].position,
          [0.15, 0.825],
          [0.204, 0.781],
          [0.28, 0.718],
          [0.338, 0.678],
          careers[1].position,
          [0.443, 0.655],
          [0.472, 0.642],
          [0.531, 0.592],
          careers[2].position,
          [0.672, 0.521],
          [0.71, 0.459],
          [0.772, 0.4],
          [0.819, 0.366],
          [0.853, 0.312],
          [0.89, 0.267],
          [0.848, 0.243],
          [0.844, 0.234],
          careers[3].position,
        ];
    const points = route.map(([x, y]) => this.screenToGround(x, y));
    this.curve = new THREE.CatmullRomCurve3(points, false, "centripetal", 0.2);
    const pathPositions: number[] = [];
    const pathColors: number[] = [];
    this.curve.getPoints(700).forEach((point) => {
      pathPositions.push(point.x, point.y, point.z);
      const screenPoint = point.clone().project(this.camera);
      const color = this.pathColor((screenPoint.x + 1) / 2).multiplyScalar(2.1);
      pathColors.push(color.r, color.g, color.b);
    });
    const geometry = new LineGeometry();
    geometry.setPositions(pathPositions);
    geometry.setColors(pathColors);
    const material = new LineMaterial({
      linewidth: 2.1,
      vertexColors: true,
      toneMapped: false,
      fog: false,
      alphaToCoverage: true,
    });
    material.resolution.set(this.width, this.height);
    this.dynamic.add(new Line2(geometry, material));

    const underglowGeometry = new LineGeometry();
    underglowGeometry.setPositions(pathPositions);
    underglowGeometry.setColors(pathColors);
    const underglowMaterial = new LineMaterial({
      linewidth: 7,
      vertexColors: true,
      transparent: true,
      opacity: 0.04,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
      fog: false,
    });
    underglowMaterial.resolution.set(this.width, this.height);
    this.dynamic.add(new Line2(underglowGeometry, underglowMaterial));

    const coreGeometry = new LineGeometry();
    coreGeometry.setPositions(pathPositions);
    const coreMaterial = new LineMaterial({
      color: new THREE.Color(2.3, 2.7, 2.6),
      linewidth: 0.8,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
      depthTest: false,
      toneMapped: false,
      fog: false,
    });
    coreMaterial.resolution.set(this.width, this.height);
    const pathCore = new Line2(coreGeometry, coreMaterial);
    pathCore.renderOrder = 2;
    this.dynamic.add(pathCore);

    careers.forEach((career, i) => {
      const [x, y] = this.mobile ? mobileCareerPositions[i] : career.position;
      const position = this.screenToGround(x, y, 0.23);
      const scale = this.pixelScale(position);
      const color = new THREE.Color(career.color);
      const ringRadius = scale * (this.mobile ? 12 : 14);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(ringRadius, scale * 1.7, 8, 48),
        new THREE.MeshBasicMaterial({
          color: color.clone().multiplyScalar(3),
          toneMapped: false,
          fog: false,
        }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.copy(position);
      this.dynamic.add(ring);

      const ringCore = new THREE.Mesh(
        new THREE.TorusGeometry(ringRadius, scale * 0.6, 6, 48),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(2.3, 2.8, 2.65),
          toneMapped: false,
          fog: false,
          depthTest: false,
          depthWrite: false,
        }),
      );
      ringCore.rotation.x = -Math.PI / 2;
      ringCore.position.copy(position);
      ringCore.renderOrder = 3;
      this.dynamic.add(ringCore);

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(scale * 3.2, 12, 8),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(2.3, 2.8, 2.65),
          toneMapped: false,
          fog: false,
        }),
      );
      core.position.copy(position);
      this.dynamic.add(core);

      const halo = this.sprite(color, scale * 66, 0.12);
      halo.position.copy(position);
      this.dynamic.add(halo);

      const pool = new THREE.Mesh(
        new THREE.PlaneGeometry(scale * 160, scale * 160),
        new THREE.MeshBasicMaterial({
          map: this.glowTexture,
          color,
          transparent: true,
          opacity: 0.12,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      pool.rotation.x = -Math.PI / 2;
      pool.position.copy(position).y = 0.17;
      this.dynamic.add(pool);

      const light = new THREE.PointLight(color, i === 3 ? 14 : 6, 8, 2);
      light.position.copy(position).y += 0.8;
      this.dynamic.add(light);

      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: color.clone().multiplyScalar(1.3),
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        toneMapped: false,
        fog: false,
      });
      const pulse = new THREE.Mesh(
        new THREE.RingGeometry(ringRadius * 1.5, ringRadius * 1.54, 64),
        pulseMaterial,
      );
      pulse.rotation.x = -Math.PI / 2;
      pulse.position.copy(position).y += 0.003;
      this.dynamic.add(pulse);
      this.pulses.push({
        mesh: pulse,
        material: pulseMaterial,
        phase: i * 0.6,
      });

      const stalkTop = position.clone();
      stalkTop.y += scale * (i === 3 ? 43 : 29);
      const stalkGeometry = new THREE.BufferGeometry().setFromPoints([
        position,
        stalkTop,
      ]);
      this.dynamic.add(
        new THREE.Line(
          stalkGeometry,
          new THREE.LineBasicMaterial({
            color: color.clone().multiplyScalar(1.5),
            transparent: true,
            opacity: 0.85,
            toneMapped: false,
            fog: false,
          }),
        ),
      );
      const topLight = this.sprite(color, scale * 12, 1);
      topLight.position.copy(stalkTop);
      this.dynamic.add(topLight);

      const label = document.querySelector<HTMLElement>(
        `[data-career-label="${i}"]`,
      )!;
      const hit = document.querySelector<HTMLElement>(
        `[data-career-hit="${i}"]`,
      )!;
      this.anchors.push(
        { element: label, position: i === 3 ? stalkTop : position },
        { element: hit, position },
      );
      if (i === 3) {
        this.anchors.push({
          element: document.querySelector<HTMLElement>(".summit-badge")!,
          position: stalkTop,
        });
      }
    });

    technologies.forEach((technology, i) => {
      const [x, y] = this.mobile
        ? mobileSkillPositions[i]
        : technology.position;
      let branch: [number, number][] = technology.branch;
      if (this.mobile) {
        const from = mobileCareerPositions[technology.stage];
        branch = [
          from,
          [(from[0] + x) / 2, from[1] - 0.03],
          [(from[0] + x) / 2, y + 0.06],
          [x, y + 0.028],
        ];
      }
      const branchPoints = branch.map(([px, py]) =>
        this.screenToGround(px, py, 0.21),
      );
      const top = this.screenToGround(x, y + 0.011, 0.85);
      const base = top.clone();
      base.y = 0.21;
      branchPoints.push(base, top);
      const color = new THREE.Color(technology.color);
      const branchGeometry = new THREE.BufferGeometry().setFromPoints(
        branchPoints,
      );
      this.branches.add(
        new THREE.Line(
          branchGeometry,
          new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity: 0.7,
            toneMapped: false,
            fog: false,
          }),
        ),
      );
      for (let k = 1; k < branchPoints.length; k++) {
        const point = branchPoints[k];
        const size =
          this.pixelScale(point) * (k === branchPoints.length - 1 ? 3.0 : 1.75);
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(size, 8, 6),
          new THREE.MeshBasicMaterial({
            color: color.clone().multiplyScalar(1.55),
            toneMapped: false,
            fog: false,
          }),
        );
        dot.position.copy(point);
        this.branches.add(dot);
      }
      const label = document.querySelector<HTMLElement>(
        `[data-tech-label="${technology.id}"]`,
      )!;
      this.anchors.push({ element: label, position: top });
    });

    for (let i = 0; i < 4; i++) {
      const traveller = this.sprite(0xbafff5, 0.44, 0.9);
      this.travellers.push(traveller);
      this.dynamic.add(traveller);
    }
    this.setSelected(this.selected);
  }

  private onResize = () => {
    cancelAnimationFrame(this.resizeFrame);
    this.resizeFrame = requestAnimationFrame(() => this.resize());
  };

  private resize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.mobile = this.width < 760;
    this.camera.aspect = this.width / this.height;
    this.camera.position.copy(this.baseCamera);
    this.camera.lookAt(this.target);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
    this.buildJourney();
    this.positionLabels();
  }

  private onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || this.reducedMotion) return;
    this.pointer.set(
      (event.clientX / this.width) * 2 - 1,
      (event.clientY / this.height) * 2 - 1,
    );
  };

  private onVisibility = () => {
    this.lastTime = 0;
    this.needsRender = true;
  };

  private positionLabels() {
    for (const anchor of this.anchors) {
      const p = anchor.position.clone().project(this.camera);
      anchor.element.style.left = `${(p.x * 0.5 + 0.5) * this.width}px`;
      anchor.element.style.top = `${(-p.y * 0.5 + 0.5) * this.height}px`;
    }
  }

  private render = (now: number) => {
    if (document.hidden || (this.paused && !this.needsRender)) return;
    const delta = this.lastTime
      ? Math.min((now - this.lastTime) / 1000, 0.05)
      : 0;
    this.lastTime = now;
    if (!this.paused) this.elapsed += delta;
    if (!this.paused && !this.reducedMotion) {
      this.smoothPointer.lerp(this.pointer, 1 - Math.exp(-delta * 2));
      this.camera.position.copy(this.baseCamera);
      this.camera.position.x += this.smoothPointer.x * 0.27;
      this.camera.position.y -= this.smoothPointer.y * 0.13;
      this.camera.lookAt(this.target);
    }

    this.pulses.forEach((pulse, i) => {
      const phase = (this.elapsed * 0.38 + pulse.phase) % 1;
      pulse.mesh.scale.setScalar(0.75 + phase * 0.7);
      pulse.material.opacity =
        (1 - phase) * (this.selected < 0 || this.selected === i ? 0.28 : 0.075);
    });
    this.travellers.forEach((traveller, i) => {
      const t = (this.elapsed * 0.022 + i / this.travellers.length) % 1;
      traveller.position.copy(this.curve.getPointAt(t));
      traveller.material.color
        .copy(
          this.pathColor(
            (traveller.position.clone().project(this.camera).x + 1) / 2,
          ),
        )
        .multiplyScalar(1.4);
    });
    this.positionLabels();
    this.composer.render();
    this.needsRender = false;
  };

  private disposeGroup(group: THREE.Group) {
    group.traverse((object) => {
      if (
        object instanceof THREE.Mesh ||
        object instanceof THREE.Line ||
        object instanceof THREE.Sprite
      ) {
        if ("geometry" in object) object.geometry.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => material.dispose());
      }
    });
    group.clear();
  }

  dispose() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("visibilitychange", this.onVisibility);
    cancelAnimationFrame(this.resizeFrame);
    this.renderer.setAnimationLoop(null);
    this.disposeGroup(this.dynamic);
    this.scene.traverse((object) => {
      if (
        object instanceof THREE.Mesh ||
        object instanceof THREE.Points ||
        object instanceof THREE.Line
      ) {
        object.geometry.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => {
          if ("map" in material && material.map instanceof THREE.Texture)
            material.map.dispose();
          material.dispose();
        });
      }
    });
    this.glowTexture.dispose();
    this.scene.environment?.dispose();
    this.composer.passes.forEach((pass) => pass.dispose());
    this.composer.dispose();
    this.renderer.dispose();
  }
}
