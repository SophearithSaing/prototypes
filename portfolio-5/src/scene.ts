import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { boardItems, milestones, skills, type BoardItem } from "./data";

const CYAN = new THREE.Color("#00e5ed");
const LIME = new THREE.Color("#b0f76a");
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function roundedRect(width: number, height: number, radius: number) {
  const x = -width / 2,
    y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function faceGeometry(width: number, height: number, radius: number) {
  const geometry = new THREE.ShapeGeometry(
    roundedRect(width, height, radius),
    20,
  );
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < position.count; i++)
    uv.setXY(
      i,
      (position.getX(i) + width / 2) / width,
      (position.getY(i) + height / 2) / height,
    );
  return geometry;
}

function canvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  draw(ctx);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function surfaceTexture() {
  return canvasTexture(1024, 1024, (ctx) => {
    const image = ctx.createImageData(1024, 1024);
    let seed = 729;
    for (let i = 0; i < image.data.length; i += 4) {
      seed = (seed * 16807) % 2147483647;
      const noise = (seed / 2147483647) * 7;
      image.data[i] = 24 + noise;
      image.data[i + 1] = 31 + noise;
      image.data[i + 2] = 35 + noise;
      image.data[i + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
  });
}

function drawIcon(ctx: CanvasRenderingContext2D, id: string, color: string) {
  ctx.save();
  ctx.translate(256, 155);
  ctx.scale(1.14, 1.14);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (id === "react") {
    for (const rotation of [0, Math.PI / 3, -Math.PI / 3]) {
      ctx.save();
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, 75, 28, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.fill();
  } else if (id === "typescript") {
    ctx.strokeStyle = "#139fe7";
    ctx.lineWidth = 4;
    ctx.strokeRect(-60, -52, 120, 108);
    ctx.fillStyle = "#139fe7";
    ctx.font = '500 69px "DM Sans", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText("TS", 2, 34);
  } else if (id === "node") {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      const x = Math.cos(a) * 61,
        y = Math.sin(a) * 61;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.font = '600 60px "DM Sans", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText("JS", 0, 22);
  } else if (id === "system") {
    ctx.lineWidth = 4;
    for (const y of [-27, 0, 27]) {
      ctx.beginPath();
      ctx.moveTo(-67, y);
      ctx.lineTo(0, y + 33);
      ctx.lineTo(67, y);
      if (y === -27) {
        ctx.lineTo(0, y - 33);
        ctx.closePath();
      }
      ctx.stroke();
    }
  } else if (id === "three") {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-67, -43);
    ctx.lineTo(67, -43);
    ctx.lineTo(26, 61);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-67, -43);
    ctx.lineTo(15, -17);
    ctx.lineTo(67, -43);
    ctx.moveTo(15, -17);
    ctx.lineTo(26, 61);
    ctx.stroke();
  } else if (id === "cicd") {
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-26, -45, -85, -47, -85, 0);
    ctx.bezierCurveTo(-85, 47, -26, 45, 0, 0);
    ctx.bezierCurveTo(26, -45, 85, -47, 85, 0);
    ctx.bezierCurveTo(85, 47, 26, 45, 0, 0);
    ctx.stroke();
    ctx.strokeStyle = "#13231d";
    ctx.lineWidth = 11;
    ctx.beginPath();
    ctx.moveTo(-5, 9);
    ctx.lineTo(5, -9);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-11, 16);
    ctx.lineTo(11, -16);
    ctx.stroke();
  }
  ctx.restore();
}

function tileTexture(item: BoardItem) {
  return canvasTexture(512, 448, (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 512, 448);
    gradient.addColorStop(0, "#151f24");
    gradient.addColorStop(0.6, "#11191e");
    gradient.addColorStop(1, "#0c1318");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 448);
    // Fine grain keeps the face tactile without distracting from its icon.
    let seed = 431;
    for (let i = 0; i < 11000; i++) {
      seed = (seed * 16807) % 2147483647;
      const x = seed % 512;
      seed = (seed * 16807) % 2147483647;
      ctx.fillStyle = i % 2 ? "#ffffff04" : "#00000009";
      ctx.fillRect(x, seed % 448, 1, 1);
    }
    drawIcon(ctx, item.id, item.color);
    ctx.fillStyle = "#edf2f2";
    ctx.textAlign = "center";
    ctx.font = '400 59px "DM Sans", sans-serif';
    if (item.id === "system") {
      ctx.fillText("System", 256, 303);
      ctx.fillText("Design", 256, 361);
    } else ctx.fillText(item.title, 256, 324);
  });
}

function softHalo(color: string) {
  return canvasTexture(128, 128, (ctx) => {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, color + "b0");
    gradient.addColorStop(0.25, color + "55");
    gradient.addColorStop(0.55, color + "16");
    gradient.addColorStop(1, color + "00");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  });
}

function smoothPath(points: number[][], z: number, radius = 0.11) {
  const curve = new THREE.CurvePath<THREE.Vector3>();
  const vectors = points.map(([x, y]) => new THREE.Vector3(x, y, z));
  let previous = vectors[0];
  for (let i = 1; i < vectors.length - 1; i++) {
    const current = vectors[i];
    const before = current.clone().add(
      vectors[i - 1]
        .clone()
        .sub(current)
        .normalize()
        .multiplyScalar(
          Math.min(radius, current.distanceTo(vectors[i - 1]) / 3),
        ),
    );
    const after = current.clone().add(
      vectors[i + 1]
        .clone()
        .sub(current)
        .normalize()
        .multiplyScalar(
          Math.min(radius, current.distanceTo(vectors[i + 1]) / 3),
        ),
    );
    curve.add(new THREE.LineCurve3(previous, before));
    curve.add(new THREE.QuadraticBezierCurve3(before, current, after));
    previous = after;
  }
  curve.add(new THREE.LineCurve3(previous, vectors[vectors.length - 1]));
  return curve;
}

export interface CareerScene {
  select: (id: string | null) => void;
  reset: () => void;
  dispose: () => void;
}

export function createCareerScene(
  container: HTMLElement,
  onSelect: (item: BoardItem) => void,
): CareerScene {
  const canvas = container.querySelector("canvas")!;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(21.5, 1, 0.1, 100);
  camera.position.set(2, -24, 18);
  camera.lookAt(0.4, -1.6, 0);
  const renderTarget = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    samples: 4,
  });
  const composer = new EffectComposer(renderer, renderTarget);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.38, 0.3, 1.25);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  scene.add(new THREE.AmbientLight(0xb3cedb, 0.85));
  const keyLight = new THREE.DirectionalLight(0xc8e2ec, 0.9);
  keyLight.position.set(-6, 7, 13);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.left = -10;
  keyLight.shadow.camera.right = 10;
  keyLight.shadow.camera.top = 8;
  keyLight.shadow.camera.bottom = -8;
  keyLight.shadow.normalBias = 0.025;
  keyLight.shadow.bias = -0.0002;
  keyLight.shadow.radius = 3;
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x00cadb, 0.12);
  rimLight.position.set(-10, -6, 3);
  scene.add(rimLight);
  const board = new THREE.Group();
  board.rotation.z = 0.1;
  board.scale.y = 1.3;
  scene.add(board);
  const width = 14.8,
    height = 10.35;
  const surfaceMap = surfaceTexture();

  // The chassis is layered: dark machined sidewall, an inset deck, and a fine luminous seam.
  const chassisGeometry = new THREE.ExtrudeGeometry(
    roundedRect(width, height, 0.47),
    {
      depth: 0.27,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.065,
      bevelThickness: 0.06,
      curveSegments: 28,
    },
  );
  const chassis = new THREE.Mesh(
    chassisGeometry,
    new THREE.MeshStandardMaterial({
      color: "#0a1014",
      metalness: 0.75,
      roughness: 0.48,
    }),
  );
  chassis.position.z = -0.36;
  chassis.receiveShadow = true;
  board.add(chassis);
  const frameGeometry = new THREE.ExtrudeGeometry(
    roundedRect(width, height, 0.47),
    {
      depth: 0.075,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.028,
      bevelThickness: 0.028,
      curveSegments: 28,
    },
  );
  const frame = new THREE.Mesh(
    frameGeometry,
    new THREE.MeshStandardMaterial({
      color: "#192127",
      metalness: 0.78,
      roughness: 0.48,
    }),
  );
  frame.position.z = -0.085;
  frame.receiveShadow = true;
  board.add(frame);
  const surface = new THREE.Mesh(
    faceGeometry(width - 0.35, height - 0.35, 0.37),
    new THREE.MeshStandardMaterial({
      map: surfaceMap,
      color: "#828890",
      metalness: 0.15,
      roughness: 0.88,
    }),
  );
  surface.position.z = 0.009;
  surface.receiveShadow = true;
  board.add(surface);

  function outline(
    w: number,
    h: number,
    radius: number,
    z: number,
    color: string,
    opacity = 1,
  ) {
    const points = roundedRect(w, h, radius)
      .getPoints(40)
      .map((p) => new THREE.Vector3(p.x, p.y, z));
    const line = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity }),
    );
    board.add(line);
    return line;
  }
  outline(width - 0.37, height - 0.37, 0.37, 0.017, "#010506");
  outline(width - 0.43, height - 0.43, 0.36, 0.02, "#718894", 0.24);
  outline(width + 0.03, height + 0.03, 0.49, -0.057, "#688591", 0.43);

  const seamPoints = roundedRect(width + 0.15, height + 0.15, 0.49)
    .getPoints(80)
    .map((p) => new THREE.Vector3(p.x, p.y, -0.1));
  const seamGeometry = new THREE.BufferGeometry().setFromPoints(seamPoints);
  const seamColors: number[] = [];
  seamPoints.forEach((p) => {
    const brightness =
      p.y < -4.5 ? Math.max(0.03, 1 - (p.x + 5) / 12) : p.x < -7 ? 0.32 : 0.012;
    const c = CYAN.clone().multiplyScalar(brightness * 2.5);
    seamColors.push(c.r, c.g, c.b);
  });
  seamGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(seamColors, 3),
  );
  board.add(
    new THREE.LineLoop(
      seamGeometry,
      new THREE.LineBasicMaterial({ vertexColors: true, toneMapped: false }),
    ),
  );

  const shadowTexture = canvasTexture(256, 256, (ctx) => {
    const gradient = ctx.createRadialGradient(128, 128, 38, 128, 128, 125);
    gradient.addColorStop(0, "#000000e8");
    gradient.addColorStop(0.65, "#00000085");
    gradient.addColorStop(1, "#00000000");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  });

  function printedLine(points: number[][], color = "#34464d", opacity = 0.2) {
    const geom = new THREE.BufferGeometry().setFromPoints(
      points.map(([x, y]) => new THREE.Vector3(x, y, 0.025)),
    );
    board.add(
      new THREE.Line(
        geom,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
      ),
    );
  }
  printedLine([
    [-6.6, 4.55],
    [-3.9, 4.55],
    [-3.58, 4.22],
    [0.55, 4.22],
    [0.86, 4.55],
    [6.35, 4.55],
  ]);
  printedLine(
    [
      [-6.6, 4.47],
      [-3.96, 4.47],
      [-3.64, 4.14],
      [0.6, 4.14],
      [0.91, 4.47],
      [6.35, 4.47],
    ],
    "#020708",
    0.6,
  );
  printedLine(
    [
      [2.45, -5.03],
      [2.92, -4.65],
      [7.04, -4.65],
    ],
    "#010406",
    1,
  );
  printedLine(
    [
      [2.47, -5.05],
      [2.95, -4.7],
      [7.04, -4.7],
    ],
    "#526168",
    0.35,
  );
  const led = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, 0.023, 0.022),
    new THREE.MeshBasicMaterial({
      color: LIME.clone().multiplyScalar(2),
      toneMapped: false,
    }),
  );
  led.position.set(6.65, -5.23, -0.21);
  board.add(led);

  // Small plated vias make the board feel manufactured, rather than a floating rectangle.
  const viaGeometry = new THREE.RingGeometry(0.014, 0.025, 12);
  const viaMaterial = new THREE.MeshStandardMaterial({
    color: "#718b98",
    metalness: 0.85,
    roughness: 0.4,
  });
  for (const [cornerX, cornerY, cols, rows] of [
    [-6.65, 4.1, 5, 3],
    [-6.65, -4.45, 4, 4],
    [6.45, -4.2, 3, 1],
  ]) {
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++) {
        if (row === 0 && col === cols - 1 && rows > 1) continue;
        const via = new THREE.Mesh(viaGeometry, viaMaterial);
        via.position.set(cornerX + col * 0.19, cornerY + row * 0.16, 0.035);
        board.add(via);
      }
  }

  // Each skill trace follows the same right-angle/45-degree language as a real PCB.
  const branches = [
    {
      color: "#00dce7",
      points: [
        [-4.7, 0.05],
        [-4.45, -0.57],
        [-4.0, -0.57],
        [-3.78, -0.82],
        [-3.78, -1.5],
      ],
    },
    {
      color: "#1de4df",
      points: [
        [-1.55, 0.8],
        [-1.65, 0.08],
        [-2.12, -0.23],
        [-2.38, -1.3],
        [-2.24, -1.49],
        [-1.68, -1.49],
        [-1.55, -1.64],
        [-1.55, -2.05],
      ],
    },
    {
      color: "#2de4d6",
      points: [
        [-1.65, 0.08],
        [-0.8, -0.95],
        [-0.08, -0.95],
        [0.47, -1.53],
        [0.4, -3.68],
      ],
    },
    {
      color: "#82e96b",
      points: [
        [1.9, 1.35],
        [1, 0.67],
        [0.89, 0.06],
        [1.12, -0.17],
        [1.75, -0.67],
        [1.78, -1.46],
      ],
    },
    {
      color: "#a2eb59",
      points: [
        [1.9, 1.35],
        [1.9, 0.5],
        [2.23, 0.17],
        [2.9, -0.6],
        [4.37, -0.6],
      ],
    },
    {
      color: "#a2eb59",
      points: [
        [3.5, -0.6],
        [3.58, -2.35],
        [3.78, -2.6],
        [4.48, -2.6],
      ],
    },
    {
      color: "#8cdc5e",
      points: [
        [5.7, 1.75],
        [5.06, 1.24],
        [5.09, 0.04],
      ],
    },
  ];
  for (const branch of branches) {
    const points = branch.points.map(
      ([x, y]) => new THREE.Vector3(x, y, 0.042),
    );
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(
      geometry,
      new THREE.LineDashedMaterial({
        color: branch.color,
        dashSize: 0.028,
        gapSize: 0.047,
        transparent: true,
        opacity: 0.87,
      }),
    );
    line.computeLineDistances();
    board.add(line);
    branch.points.forEach(([x, y], i) => {
      if (i === 0 || (i !== branch.points.length - 1 && i % 2 === 1)) return;
      const contact = new THREE.Mesh(
        new THREE.CircleGeometry(0.028, 16),
        new THREE.MeshBasicMaterial({ color: branch.color }),
      );
      contact.position.set(x, y, 0.047);
      board.add(contact);
      const contactRing = new THREE.Mesh(
        new THREE.RingGeometry(0.032, 0.038, 16),
        new THREE.MeshBasicMaterial({
          color: branch.color,
          transparent: true,
          opacity: 0.35,
        }),
      );
      contactRing.position.copy(contact.position);
      board.add(contactRing);
    });
  }

  const path = smoothPath(
    [
      [-6.65, -1.43],
      [-5.31, -0.3],
      [-4.7, 0.05],
      [-3.05, 0.12],
      [-2.23, 0.66],
      [-1.55, 0.8],
      [0.33, 0.83],
      [0.98, 1.24],
      [1.9, 1.35],
      [4.6, 1.38],
      [5.04, 1.72],
      [5.7, 1.75],
    ],
    0.093,
  );
  function careerTube(radius: number, strength: number) {
    const geometry = new THREE.TubeGeometry(path, 280, radius, 8, false);
    const colors: number[] = [];
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const blend = THREE.MathUtils.smoothstep(x, -1.0, 2.6);
      const color = CYAN.clone().lerp(LIME, blend);
      if (radius < 0.01) color.lerp(new THREE.Color("white"), 0.8);
      color.multiplyScalar(strength);
      colors.push(color.r, color.g, color.b);
    }
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const tube = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false }),
    );
    if (radius < 0.01) tube.position.z = 0.017;
    board.add(tube);
  }
  careerTube(0.019, 2.6);
  careerTube(0.007, 4.1);

  const hitTargets: THREE.Object3D[] = [];
  const tileGroups = new Map<string, THREE.Group>();
  const markerGroups = new Map<string, THREE.Group>();
  const halos = new Map<string, THREE.Mesh>();

  for (const item of milestones) {
    const [x, y] = item.position;
    const marker = new THREE.Group();
    marker.position.set(x, y, 0.1);
    board.add(marker);
    markerGroups.set(item.id, marker);
    const color = new THREE.Color(item.color);
    const isLast = item.id === "2024",
      radius = isLast ? 0.34 : 0.265;
    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(1.55, 1.55),
      new THREE.MeshBasicMaterial({
        map: softHalo(item.color),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.7,
        toneMapped: false,
      }),
    );
    halo.position.z = -0.057;
    marker.add(halo);
    halos.set(item.id, halo);
    const disk = new THREE.Mesh(
      new THREE.CircleGeometry(radius, 48),
      new THREE.MeshStandardMaterial({
        color: "#193234",
        roughness: 0.4,
        metalness: 0.6,
        emissive: color,
        emissiveIntensity: 0.07,
      }),
    );
    disk.position.z = 0.009;
    marker.add(disk);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.023, 12, 64),
      new THREE.MeshBasicMaterial({
        color: color
          .clone()
          .lerp(new THREE.Color("white"), 0.55)
          .multiplyScalar(2),
        toneMapped: false,
      }),
    );
    ring.position.z = 0.022;
    marker.add(ring);
    const outside = new THREE.Mesh(
      new THREE.TorusGeometry(radius + 0.041, 0.007, 8, 64),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.26 }),
    );
    outside.position.z = 0.021;
    marker.add(outside);
    if (isLast) {
      const star = new THREE.Shape();
      for (let i = 0; i < 10; i++) {
        const a = Math.PI / 2 + (i * Math.PI) / 5;
        const r = i % 2 ? 0.073 : 0.172;
        i
          ? star.lineTo(Math.cos(a) * r, Math.sin(a) * r)
          : star.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      star.closePath();
      const starMesh = new THREE.Mesh(
        new THREE.ShapeGeometry(star),
        new THREE.MeshBasicMaterial({
          color: color.clone().multiplyScalar(3),
          toneMapped: false,
        }),
      );
      starMesh.position.z = 0.033;
      marker.add(starMesh);
      const starCenter = new THREE.Mesh(
        new THREE.ShapeGeometry(star),
        new THREE.MeshBasicMaterial({ color: "#598a25" }),
      );
      starCenter.scale.setScalar(0.54);
      starCenter.position.z = 0.035;
      marker.add(starCenter);
    } else {
      const center = new THREE.Mesh(
        new THREE.CircleGeometry(0.093, 40),
        new THREE.MeshBasicMaterial({
          color: color
            .clone()
            .lerp(new THREE.Color("white"), 0.62)
            .multiplyScalar(2),
          toneMapped: false,
        }),
      );
      center.position.z = 0.033;
      marker.add(center);
    }
    const labelMap = canvasTexture(512, 400, (ctx) => {
      ctx.textAlign = "center";
      ctx.font = '500 72px "DM Sans", sans-serif';
      ctx.fillStyle = item.color;
      ctx.fillText(item.year!, 256, 91);
      ctx.font = '400 67px "DM Sans", sans-serif';
      ctx.fillStyle = "#f2f4f3";
      ctx.fillText(item.lines![0], 256, 189);
      ctx.fillText(item.lines![1], 256, 269);
    });
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(2.04, 1.95),
      new THREE.MeshBasicMaterial({
        map: labelMap,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    label.position.set(x, y + 1.23, 0.045);
    board.add(label);
    const hit = new THREE.Mesh(
      new THREE.CircleGeometry(0.49, 32),
      new THREE.MeshBasicMaterial({ visible: false }),
    );
    hit.position.z = 0.055;
    hit.userData.item = item;
    marker.add(hit);
    hitTargets.push(hit);
    label.userData.item = item;
    hitTargets.push(label);
  }

  for (const item of skills) {
    const [x, y] = item.position;
    const tileWidth = 1.64,
      tileHeight = item.id === "system" ? 1.58 : 1.46;
    const tile = new THREE.Group();
    tile.position.set(x, y, 0.1);
    tile.userData.baseZ = 0.1;
    board.add(tile);
    tileGroups.set(item.id, tile);
    const ao = new THREE.Mesh(
      new THREE.PlaneGeometry(2.7, 2.4),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
        opacity: 0.76,
      }),
    );
    ao.position.set(x + 0.035, y - 0.075, 0.03);
    board.add(ao);
    const body = new THREE.Mesh(
      new THREE.ExtrudeGeometry(roundedRect(tileWidth, tileHeight, 0.21), {
        depth: 0.13,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.037,
        bevelThickness: 0.032,
        curveSegments: 20,
      }),
      new THREE.MeshStandardMaterial({
        color: "#070d10",
        roughness: 0.43,
        metalness: 0.65,
      }),
    );
    body.castShadow = true;
    body.receiveShadow = true;
    tile.add(body);
    const top = new THREE.Mesh(
      faceGeometry(tileWidth, tileHeight, 0.21),
      new THREE.MeshBasicMaterial({
        map: tileTexture(item),
        toneMapped: false,
      }),
    );
    top.position.z = 0.167;
    top.userData.item = item;
    tile.add(top);
    hitTargets.push(top);
    const edge = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        roundedRect(tileWidth, tileHeight, 0.21)
          .getPoints(32)
          .map((p) => new THREE.Vector3(p.x, p.y, 0.173)),
      ),
      new THREE.LineBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.52,
      }),
    );
    tile.add(edge);
    const underEdge = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        roundedRect(tileWidth + 0.025, tileHeight + 0.025, 0.23)
          .getPoints(32)
          .map((p) => new THREE.Vector3(p.x, p.y, 0.012)),
      ),
      new THREE.LineBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.16,
      }),
    );
    tile.add(underEdge);
  }

  // A single light packet quietly travels forward through the career circuit.
  const packet = new THREE.Mesh(
    new THREE.SphereGeometry(0.033, 10, 10),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(3, 4, 4),
      toneMapped: false,
    }),
  );
  board.add(packet);
  packet.visible = !reducedMotion;

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let selectedId: string | null = null;
  let hoveredId: string | null = null;
  let isDragging = false;
  let startX = 0,
    startY = 0,
    lastX = 0,
    lastY = 0;
  let rotationX = 0,
    rotationZ = 0.1,
    zoom = 1;
  let moved = false;
  let disposed = false;
  let visible = !document.hidden;

  function pick(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      (-(event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    const intersection = raycaster.intersectObjects(hitTargets, false)[0];
    return intersection?.object.userData.item as BoardItem | undefined;
  }
  function onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    isDragging = true;
    moved = false;
    startX = lastX = event.clientX;
    startY = lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  }
  function onPointerMove(event: PointerEvent) {
    if (isDragging) {
      if (Math.hypot(event.clientX - startX, event.clientY - startY) > 5)
        moved = true;
      rotationZ = THREE.MathUtils.clamp(
        rotationZ + (event.clientX - lastX) * 0.0025,
        -0.35,
        0.48,
      );
      rotationX = THREE.MathUtils.clamp(
        rotationX + (event.clientY - lastY) * 0.002,
        -0.24,
        0.3,
      );
      lastX = event.clientX;
      lastY = event.clientY;
    } else {
      hoveredId = pick(event)?.id ?? null;
      container.classList.toggle("is-hovering", hoveredId !== null);
    }
  }
  function onPointerUp(event: PointerEvent) {
    if (!isDragging) return;
    isDragging = false;
    if (canvas.hasPointerCapture(event.pointerId))
      canvas.releasePointerCapture(event.pointerId);
    if (!moved) {
      const item = pick(event);
      if (item) {
        selectedId = item.id;
        onSelect(item);
      }
    }
  }
  function onPointerCancel() {
    isDragging = false;
    hoveredId = null;
    container.classList.remove("is-hovering");
  }
  function onPointerLeave() {
    if (!isDragging) {
      hoveredId = null;
      container.classList.remove("is-hovering");
    }
  }
  function onWheel(event: WheelEvent) {
    event.preventDefault();
    zoom = THREE.MathUtils.clamp(zoom - event.deltaY * 0.00055, 0.78, 1.35);
  }
  function onKeyDown(event: KeyboardEvent) {
    if (
      [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "+",
        "-",
        "=",
        "0",
        "Escape",
      ].includes(event.key)
    )
      event.preventDefault();
    if (event.key === "ArrowLeft")
      rotationZ = Math.max(-0.35, rotationZ - 0.055);
    if (event.key === "ArrowRight")
      rotationZ = Math.min(0.48, rotationZ + 0.055);
    if (event.key === "ArrowUp") rotationX = Math.max(-0.24, rotationX - 0.055);
    if (event.key === "ArrowDown") rotationX = Math.min(0.3, rotationX + 0.055);
    if (event.key === "+" || event.key === "=")
      zoom = Math.min(1.35, zoom + 0.08);
    if (event.key === "-") zoom = Math.max(0.78, zoom - 0.08);
    if (event.key === "0" || event.key === "Escape") reset();
    if (event.key === "Enter") {
      const item =
        boardItems.find((entry) => entry.id === selectedId) ?? milestones[0];
      onSelect(item);
      selectedId = item.id;
    }
  }
  function reset() {
    rotationX = 0;
    rotationZ = 0.1;
    zoom = 1;
    selectedId = null;
  }
  function resize() {
    const w = container.clientWidth,
      h = container.clientHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    // Fit the complete PCB on portrait screens, while allowing the desktop's immersive crop.
    camera.fov =
      window.innerWidth <= 760
        ? THREE.MathUtils.radToDeg(
            2 * Math.atan(8.65 / (30.08 * camera.aspect)),
          )
        : 21.5;
    camera.updateProjectionMatrix();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerCancel);
  canvas.addEventListener("pointerleave", onPointerLeave);
  canvas.addEventListener("wheel", onWheel, { passive: false });
  canvas.addEventListener("keydown", onKeyDown);
  const onVisibility = () => {
    visible = !document.hidden;
  };
  document.addEventListener("visibilitychange", onVisibility);
  let lastTime = 0;
  function animate(time: number) {
    if (disposed || !visible) return;
    const delta = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    const ease = reducedMotion ? 1 : 1 - Math.exp(-delta * 9);
    board.rotation.x = THREE.MathUtils.lerp(board.rotation.x, rotationX, ease);
    board.rotation.z = THREE.MathUtils.lerp(board.rotation.z, rotationZ, ease);
    camera.zoom = THREE.MathUtils.lerp(camera.zoom, zoom, ease);
    camera.updateProjectionMatrix();
    for (const [id, tile] of tileGroups) {
      const active = id === hoveredId || id === selectedId;
      tile.position.z = THREE.MathUtils.lerp(
        tile.position.z,
        active ? 0.24 : 0.1,
        ease,
      );
    }
    for (const [id, marker] of markerGroups) {
      const active = id === hoveredId || id === selectedId;
      const scale = active ? 1.12 : 1;
      marker.scale.lerp(new THREE.Vector3(scale, scale, 1), ease);
      const halo = halos.get(id)!;
      (halo.material as THREE.MeshBasicMaterial).opacity = active
        ? 1
        : 0.64 +
          (reducedMotion ? 0 : Math.sin(time * 0.0018 + Number(id)) * 0.09);
    }
    if (!reducedMotion) {
      const progress = (time * 0.000055) % 1;
      packet.position.copy(path.getPoint(progress));
      packet.position.z += 0.021;
    }
    composer.render();
  }
  renderer.setAnimationLoop(animate);
  container.querySelector("#loading")?.classList.add("is-loaded");

  return {
    select(id) {
      selectedId = id;
    },
    reset,
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", onVisibility);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      const textures = new Set<THREE.Texture>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          geometries.add(object.geometry);
          for (const material of Array.isArray(object.material)
            ? object.material
            : [object.material]) {
            materials.add(material);
            for (const value of Object.values(material))
              if (value instanceof THREE.Texture) textures.add(value);
          }
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      composer.dispose();
      bloom.dispose();
      renderer.dispose();
    },
  };
}
