import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const palette = {
  blush: "#f4bfdc",
  trim: "#ffe0f3",
  pink: "#df98c7",
  mauve: "#b972ab",
  lavender: "#a783e9",
  violet: "#8053d7",
  purple: "#6345b4",
  deep: "#4d368e",
  roof: "#615bb3",
  grass: "#65b74f",
  leaf: "#44bd68",
  leafLight: "#70c451",
  wood: "#d77845",
  trunk: "#925137",
  road: "#856283",
  metal: "#51436c",
};

export function createCity(scene) {
  const root = new THREE.Group();
  scene.add(root);
  const animations = [];
  const anchors = {};
  const materialCache = new Map();
  const geometryCache = new Map();
  let seed = 7;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const material = (color, extra = {}) => {
    const key = color + JSON.stringify(extra);
    if (!materialCache.has(key))
      materialCache.set(
        key,
        new THREE.MeshStandardMaterial({ color, roughness: 0.64, ...extra }),
      );
    return materialCache.get(key);
  };
  const M = Object.fromEntries(
    Object.entries(palette).map(([key, color]) => [key, material(color)]),
  );
  const neon = (color, strength = 2.5) =>
    material(color, {
      emissive: color,
      emissiveIntensity: strength,
      roughness: 0.3,
    });
  const blueNeon = neon("#35bdff", 3);
  const purpleNeon = neon("#a16bff", 2.4);
  const whiteNeon = neon("#f7e6ff", 1.1);
  const pinkNeon = neon("#ff76ed", 2.7);
  const warmNeon = neon("#ffdf88", 1.9);
  const mesh = (geo, mat, parent, x = 0, y = 0, z = 0) => {
    const object = new THREE.Mesh(
      geo,
      typeof mat === "string" ? material(mat) : mat,
    );
    object.position.set(x, y, z);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  };
  const box = (parent, w, h, d, x, y, z, mat, radius = 0.035) => {
    const key = `box:${w}:${h}:${d}:${radius}`;
    if (!geometryCache.has(key))
      geometryCache.set(
        key,
        radius > 0
          ? new RoundedBoxGeometry(
              w,
              h,
              d,
              2,
              Math.min(radius, w / 3, h / 3, d / 3),
            )
          : new THREE.BoxGeometry(w, h, d),
      );
    return mesh(geometryCache.get(key), mat, parent, x, y, z);
  };
  const cylinder = (parent, rt, rb, h, x, y, z, mat, segments = 48) => {
    const key = `cyl:${rt}:${rb}:${h}:${segments}`;
    if (!geometryCache.has(key))
      geometryCache.set(key, new THREE.CylinderGeometry(rt, rb, h, segments));
    return mesh(geometryCache.get(key), mat, parent, x, y, z);
  };
  const sphere = (parent, r, x, y, z, mat, sx = 1, sy = 1, sz = 1) => {
    const key = `sphere:${r}`;
    if (!geometryCache.has(key))
      geometryCache.set(key, new THREE.SphereGeometry(r, 24, 16));
    const object = mesh(geometryCache.get(key), mat, parent, x, y, z);
    object.scale.set(sx, sy, sz);
    return object;
  };
  const group = (x, y, z, parent = root) => {
    const object = new THREE.Group();
    object.position.set(x, y, z);
    parent.add(object);
    return object;
  };
  const torus = (parent, r, tube, x, y, z, mat) => {
    const object = mesh(
      new THREE.TorusGeometry(r, tube, 10, 64),
      mat,
      parent,
      x,
      y,
      z,
    );
    object.rotation.x = Math.PI / 2;
    return object;
  };
  const tube = (parent, points, radius, mat) =>
    mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
        40,
        radius,
        6,
        false,
      ),
      mat,
      parent,
    );

  // Small, painted contact shadows keep the miniature grounded even in soft light.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 128;
  const shadowContext = shadowCanvas.getContext("2d");
  const shadowGradient = shadowContext.createRadialGradient(
    64,
    64,
    8,
    64,
    64,
    64,
  );
  shadowGradient.addColorStop(0, "#26153880");
  shadowGradient.addColorStop(0.45, "#301c4542");
  shadowGradient.addColorStop(1, "#301c4500");
  shadowContext.fillStyle = shadowGradient;
  shadowContext.fillRect(0, 0, 128, 128);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.CanvasTexture(shadowCanvas),
    transparent: true,
    depthWrite: false,
  });
  const contact = (parent, x, z, w, d, y = 0.225) => {
    const object = mesh(
      new THREE.PlaneGeometry(w, d),
      shadowMaterial,
      parent,
      x,
      y,
      z,
    );
    object.rotation.x = -Math.PI / 2;
    object.castShadow = object.receiveShadow = false;
  };

  const tileCanvas = document.createElement("canvas");
  tileCanvas.width = tileCanvas.height = 128;
  const tc = tileCanvas.getContext("2d");
  tc.fillStyle = "#fff5fa";
  tc.fillRect(0, 0, 128, 128);
  tc.strokeStyle = "#d6a9c5";
  tc.lineWidth = 1.7;
  tc.strokeRect(0, 0, 128, 128);
  tc.strokeStyle = "#ffffff";
  tc.lineWidth = 1;
  tc.strokeRect(2, 2, 124, 124);
  const tileTexture = new THREE.CanvasTexture(tileCanvas);
  tileTexture.colorSpace = THREE.SRGBColorSpace;
  tileTexture.wrapS = tileTexture.wrapT = THREE.RepeatWrapping;
  tileTexture.repeat.set(1.4, 1.4);
  tileTexture.anisotropy = 8;
  const tileMat = new THREE.MeshStandardMaterial({
    map: tileTexture,
    color: "#f9c0d6",
    roughness: 0.85,
  });

  const roundedShape = (w, d, r = 0.2) => {
    const s = new THREE.Shape();
    const x = -w / 2,
      y = -d / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + d - r);
    s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
    s.lineTo(x + r, y + d);
    s.quadraticCurveTo(x, y + d, x, y + d - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  };
  const sidewalk = (x, z, w, d) => {
    box(root, w, 0.22, d, x, 0.105, z, M.pink, 0.16);
    const top = mesh(
      new THREE.ShapeGeometry(roundedShape(w - 0.03, d - 0.03, 0.18)),
      tileMat,
      root,
      x,
      0.22,
      z,
    );
    top.rotation.x = -Math.PI / 2;
    top.castShadow = false;
  };

  const outline = [
    [-8.7, -4.9],
    [-8.0, -4.9],
    [-8.0, -7.7],
    [1.55, -7.7],
    [1.55, -7.2],
    [8.9, -7.2],
    [8.9, -0.8],
    [8.65, -0.8],
    [11.6, 1.6],
    [11.6, 7.1],
    [5.35, 7.1],
    [5.35, 8.15],
    [3.05, 8.15],
    [3.05, 10.2],
    [-5.15, 10.2],
    [-5.15, 7.1],
    [-8.7, 7.1],
  ];
  const baseShape = new THREE.Shape();
  outline.forEach(([x, z], i) =>
    i ? baseShape.lineTo(x, -z) : baseShape.moveTo(x, -z),
  );
  baseShape.closePath();
  const baseGeometry = new THREE.ExtrudeGeometry(baseShape, {
    depth: 0.65,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.045,
    bevelThickness: 0.045,
  });
  baseGeometry.rotateX(-Math.PI / 2);
  mesh(baseGeometry, [M.road, M.mauve], root, 0, -0.68, 0);
  sidewalk(-3.25, -4.35, 9.3, 6.55);
  sidewalk(-6.25, 3.15, 4.65, 7.65);
  sidewalk(-1.05, 7.66, 8.0, 4.85);
  sidewalk(5.99, -4.1, 5.55, 6.03);
  sidewalk(8.45, 4.28, 6.12, 5.42);
  sidewalk(4.08, 6.99, 2.6, 2.17);

  // Painted lane markings and four pedestrian crossings.
  const stripe = material("#f8d7ee", { roughness: 0.9 });
  for (let x = -8; x < 8.5; x += 0.95) {
    if (Math.abs(x) < 3.1) continue;
    box(root, 0.49, 0.012, 0.075, x, 0.025, -0.04, stripe, 0);
  }
  for (let z = -6.8; z < 8.8; z += 0.95) {
    if (z > -2.3 && z < 4.2) continue;
    box(root, 0.075, 0.012, 0.48, 2.25, 0.025, z, stripe, 0);
  }
  for (let i = 0; i < 5; i++) {
    box(root, 0.12, 0.014, 1.06, -3.22 + i * 0.23, 0.027, 0.55, stripe, 0);
    box(root, 0.12, 0.014, 1.06, 3.12 + i * 0.23, 0.027, 0.1, stripe, 0);
    box(root, 1.05, 0.014, 0.12, 0.25, 0.027, -2.15 + i * 0.23, stripe, 0);
    box(root, 1.05, 0.014, 0.12, 1.95, 0.027, 4.28 + i * 0.23, stripe, 0);
  }

  const garden = (parent, x, z, w, d) => {
    box(parent, w + 0.13, 0.12, d + 0.13, x, 0.29, z, M.blush, 0.09);
    box(parent, w, 0.1, d, x, 0.38, z, M.grass, 0.07);
  };
  const shrub = (parent, x, z, scale = 0.5, y = 0.25) => {
    const leaf = [
      M.leaf,
      M.leafLight,
      material("#59ad56"),
      material("#6bbf68"),
    ][Math.floor(random() * 4)];
    box(
      parent,
      scale,
      scale * 0.9,
      scale * 0.9,
      x,
      y + scale * 0.45,
      z,
      leaf,
      scale * 0.17,
    );
    contact(parent, x, z, scale * 1.55, scale * 1.5, y + 0.006);
  };
  const planter = (parent, x, z, w = 1, d = 0.5) => {
    box(parent, w, 0.34, d, x, 0.39, z, M.blush, 0.035);
    box(parent, w - 0.1, 0.05, d - 0.1, x, 0.575, z, material("#659b61"), 0.02);
    for (let i = 0; i < Math.floor(w / 0.42); i++)
      shrub(parent, x - w / 2 + 0.27 + i * 0.43, z, 0.44, 0.59);
  };
  const treeProfile = [
    [0, 0],
    [0.22, 0.04],
    [0.4, 0.2],
    [0.51, 0.47],
    [0.52, 0.8],
    [0.47, 1.17],
    [0.38, 1.58],
    [0.26, 1.96],
    [0.13, 2.22],
    [0, 2.32],
  ];
  const treeGeometry = new THREE.LatheGeometry(
    treeProfile.map(([r, y]) => new THREE.Vector2(r, y)),
    24,
  );
  const tree = (parent, x, z, scale = 1, variant = 0) => {
    const t = group(x, 0.28, z, parent);
    cylinder(
      t,
      0.1 * scale,
      0.13 * scale,
      0.85 * scale,
      0,
      0.42 * scale,
      0,
      M.trunk,
      10,
    );
    const foliage = mesh(
      treeGeometry,
      variant ? material("#37b77e") : M.leaf,
      t,
      0,
      0.42 * scale,
      0,
    );
    foliage.scale.set(scale * 1.1, scale, scale * 1.1);
    contact(parent, x, z, 1.65 * scale, 1.35 * scale);
    return t;
  };
  const bench = (parent, x, z, angle = 0) => {
    const b = group(x, 0.25, z, parent);
    b.rotation.y = angle;
    for (const xx of [-0.36, 0.36]) {
      box(b, 0.09, 0.4, 0.1, xx, 0.2, 0.13, M.wood, 0.015);
      box(b, 0.09, 0.4, 0.1, xx, 0.2, -0.16, M.wood, 0.015);
    }
    for (let i = 0; i < 3; i++)
      box(b, 1.02, 0.085, 0.12, 0, 0.43, -0.17 + i * 0.135, M.wood, 0.018);
    for (let i = 0; i < 2; i++)
      box(
        b,
        1.02,
        0.1,
        0.07,
        0,
        0.6 + i * 0.13,
        -0.25,
        material("#e58c53"),
        0.018,
      );
    contact(parent, x, z, 1.4, 0.9);
  };
  const lamp = (parent, x, z, height = 1.6, pillar = false) => {
    const l = group(x, 0.23, z, parent);
    if (pillar) {
      box(l, 0.34, height, 0.34, 0, height / 2, 0, M.trim, 0.025);
      box(l, 0.41, 0.09, 0.41, 0, height, 0, M.blush, 0.025);
    } else {
      cylinder(l, 0.13, 0.16, 0.1, 0, 0.05, 0, M.metal);
      cylinder(l, 0.042, 0.065, height, 0, height / 2, 0, M.metal, 12);
      cylinder(l, 0.1, 0.09, 0.08, 0, height, 0, M.wood, 16);
    }
    sphere(l, pillar ? 0.125 : 0.14, 0, height + 0.15, 0, warmNeon);
    torus(l, 0.135, 0.025, 0, height + 0.08, 0, material("#ffcb77"));
    return l;
  };

  const windowCanvas = document.createElement("canvas");
  windowCanvas.width = 128;
  windowCanvas.height = 256;
  const wc = windowCanvas.getContext("2d");
  const wg = wc.createLinearGradient(0, 0, 0, 256);
  wg.addColorStop(0, "#4366d9");
  wg.addColorStop(0.2, "#9c72d4");
  wg.addColorStop(0.44, "#ff9a59");
  wg.addColorStop(0.76, "#ffd16b");
  wg.addColorStop(1, "#ffe69a");
  wc.fillStyle = wg;
  wc.fillRect(0, 0, 128, 256);
  wc.fillStyle = "#ffffff15";
  wc.fillRect(8, 0, 12, 256);
  const windowTexture = new THREE.CanvasTexture(windowCanvas);
  windowTexture.colorSpace = THREE.SRGBColorSpace;
  const windowMat = new THREE.MeshStandardMaterial({
    map: windowTexture,
    emissiveMap: windowTexture,
    emissive: "#ffffff",
    emissiveIntensity: 1.05,
    roughness: 0.3,
    metalness: 0.04,
  });
  const warmWindow = material("#ffc86e", {
    emissive: "#ffb746",
    emissiveIntensity: 0.7,
    roughness: 0.3,
  });

  const windowPanel = (
    parent,
    x,
    y,
    z,
    w,
    h,
    cols = 2,
    rows = 2,
    side = false,
    warm = false,
  ) => {
    const p = group(x, y, z, parent);
    if (side) p.rotation.y = Math.PI / 2;
    box(p, w + 0.15, h + 0.15, 0.09, 0, 0, 0, M.pink, 0.012);
    const glass = mesh(
      new THREE.PlaneGeometry(w, h),
      warm ? warmWindow : windowMat,
      p,
      0,
      0,
      0.055,
    );
    glass.castShadow = false;
    box(p, 0.065, h + 0.13, 0.1, -w / 2 - 0.035, 0, 0.05, M.trim, 0.008);
    box(p, 0.065, h + 0.13, 0.1, w / 2 + 0.035, 0, 0.05, M.trim, 0.008);
    box(p, w + 0.2, 0.07, 0.11, 0, -h / 2 - 0.035, 0.05, M.blush, 0.008);
    box(p, w + 0.2, 0.07, 0.11, 0, h / 2 + 0.035, 0.05, M.blush, 0.008);
    for (let i = 1; i < cols; i++)
      box(p, 0.033, h, 0.065, -w / 2 + (w * i) / cols, 0, 0.08, M.pink, 0.005);
    for (let i = 1; i < rows; i++)
      box(p, w, 0.033, 0.065, 0, -h / 2 + (h * i) / rows, 0.08, M.pink, 0.005);
    return p;
  };
  const roof = (parent, x, y, z, w, d, color = M.trim) => {
    box(parent, w, 0.13, d, x, y, z, color, 0.025);
    box(parent, w - 0.23, 0.045, d - 0.23, x, y + 0.09, z, M.roof, 0.012);
    box(parent, w, 0.15, 0.11, x, y + 0.14, z - d / 2 + 0.055, color, 0.018);
    box(parent, w, 0.15, 0.11, x, y + 0.14, z + d / 2 - 0.055, color, 0.018);
    box(parent, 0.11, 0.15, d, x - w / 2 + 0.055, y + 0.14, z, color, 0.018);
    box(parent, 0.11, 0.15, d, x + w / 2 - 0.055, y + 0.14, z, color, 0.018);
  };

  const iconTextures = new Map();
  const icon = (
    parent,
    name,
    x,
    y,
    z,
    w,
    h,
    color = "#ffffff",
    rotation = 0,
  ) => {
    if (!iconTextures.has(name)) {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 256;
      const c = canvas.getContext("2d");
      c.strokeStyle = c.fillStyle = "white";
      c.lineWidth = 15;
      c.lineCap = c.lineJoin = "round";
      if (name === "code") {
        c.beginPath();
        c.moveTo(77, 68);
        c.lineTo(30, 115);
        c.lineTo(77, 162);
        c.moveTo(177, 68);
        c.lineTo(224, 115);
        c.lineTo(177, 162);
        c.moveTo(146, 40);
        c.lineTo(110, 189);
        c.stroke();
      } else if (name === "cloud") {
        c.beginPath();
        c.moveTo(48, 189);
        c.bezierCurveTo(-1, 185, 1, 119, 43, 115);
        c.bezierCurveTo(29, 67, 83, 41, 112, 74);
        c.bezierCurveTo(127, 10, 205, 37, 207, 101);
        c.bezierCurveTo(259, 110, 259, 185, 216, 189);
        c.closePath();
        c.fill();
      } else if (name === "phone") {
        c.lineWidth = 11;
        c.beginPath();
        c.roundRect(83, 31, 90, 194, 8);
        c.stroke();
        c.lineWidth = 7;
        c.beginPath();
        c.moveTo(110, 51);
        c.lineTo(145, 51);
        c.stroke();
        c.beginPath();
        c.arc(128, 205, 4, 0, Math.PI * 2);
        c.fill();
      } else if (name === "brain") {
        c.lineWidth = 10;
        c.beginPath();
        c.moveTo(128, 223);
        c.lineTo(128, 47);
        c.bezierCurveTo(112, 10, 77, 26, 76, 55);
        c.bezierCurveTo(43, 45, 26, 78, 44, 100);
        c.bezierCurveTo(8, 115, 17, 155, 46, 161);
        c.bezierCurveTo(35, 197, 75, 214, 95, 193);
        c.bezierCurveTo(104, 214, 120, 212, 128, 206);
        c.stroke();
        c.beginPath();
        c.moveTo(128, 47);
        c.bezierCurveTo(144, 10, 179, 26, 180, 55);
        c.bezierCurveTo(213, 45, 230, 78, 212, 100);
        c.bezierCurveTo(248, 115, 239, 155, 210, 161);
        c.bezierCurveTo(221, 197, 181, 214, 161, 193);
        c.bezierCurveTo(152, 214, 136, 212, 128, 206);
        c.stroke();
        c.beginPath();
        c.moveTo(78, 58);
        c.quadraticCurveTo(68, 88, 100, 95);
        c.lineTo(128, 110);
        c.moveTo(180, 58);
        c.quadraticCurveTo(190, 88, 158, 95);
        c.lineTo(128, 110);
        c.moveTo(46, 161);
        c.quadraticCurveTo(80, 167, 89, 143);
        c.lineTo(128, 133);
        c.moveTo(210, 161);
        c.quadraticCurveTo(176, 167, 167, 143);
        c.lineTo(128, 133);
        c.stroke();
      } else if (name === "network") {
        c.lineWidth = 7;
        c.beginPath();
        c.moveTo(44, 60);
        c.lineTo(128, 195);
        c.lineTo(217, 54);
        c.stroke();
        for (const [cx, cy] of [
          [44, 60],
          [128, 195],
          [217, 54],
        ]) {
          c.beginPath();
          c.arc(cx, cy, 22, 0, Math.PI * 2);
          c.fill();
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      iconTextures.set(name, texture);
    }
    const mat = new THREE.MeshBasicMaterial({
      map: iconTextures.get(name),
      color,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    });
    mat.color.multiplyScalar(1.8);
    const object = mesh(new THREE.PlaneGeometry(w, h), mat, parent, x, y, z);
    object.rotation.y = rotation;
    object.castShadow = object.receiveShadow = false;
    return object;
  };

  // FULL-STACK — the terraced, glass-fronted house at the top of the neighborhood.
  const mansion = group(-3.35, 0.23, -4.25);
  contact(mansion, 0, 0, 7.8, 6, 0.002);
  garden(mansion, -2.85, 0.2, 2.1, 5.45);
  garden(mansion, 2.225, 0.2, 3.35, 5.45);
  box(mansion, 6.35, 2.65, 3.75, 0, 1.76, -0.2, M.blush);
  box(mansion, 2.1, 3.65, 2.4, -2.13, 2.26, 0.45, M.lavender);
  box(mansion, 3.62, 3.75, 3.65, 1.3, 2.31, -0.25, M.lavender);
  box(mansion, 1.48, 4.83, 2.3, -0.65, 2.86, 0.45, M.blush);
  roof(mansion, -2.13, 4.12, 0.45, 2.25, 2.55);
  roof(mansion, 1.33, 4.23, -0.25, 3.84, 3.9);
  roof(mansion, -0.65, 5.32, 0.45, 1.73, 2.5);
  windowPanel(mansion, -0.65, 3.95, 1.76, 1.12, 2.46, 3, 4);
  windowPanel(mansion, -2.2, 2.4, 1.75, 1.52, 2.76, 3, 2);
  windowPanel(mansion, 1.62, 2.46, 1.75, 2.35, 2.6, 4, 2);
  windowPanel(mansion, 3.19, 2.5, -0.55, 2.35, 2.6, 3, 2, true);
  box(mansion, 6.45, 0.16, 0.15, 0, 2.55, 1.83, M.trim, 0.02);
  box(mansion, 0.15, 0.16, 3.77, 3.23, 2.55, -0.1, M.trim, 0.02);
  for (const x of [-1.37, 0.07])
    box(mansion, 0.15, 4.83, 0.15, x, 2.86, 1.71, M.trim, 0.02);
  // A recessed front door, a deep canopy, and a generous flight of pink steps.
  windowPanel(mansion, -0.64, 1.45, 1.72, 1.5, 1.88, 2, 1, false, true);
  for (const x of [-1.65, 0.39]) {
    box(mansion, 0.19, 2.1, 0.24, x, 1.5, 2.01, M.trim);
    box(mansion, 0.3, 0.12, 0.34, x, 0.51, 2.01, M.pink);
  }
  box(mansion, 2.53, 0.18, 1.14, -0.63, 2.59, 1.92, M.trim);
  box(mansion, 2.32, 0.04, 0.98, -0.63, 2.71, 1.92, M.roof);
  for (let i = 0; i < 5; i++)
    box(
      mansion,
      2.16,
      0.12 * (i + 1),
      0.31,
      -0.64,
      0.06 * (i + 1),
      3.05 - i * 0.29,
      M.blush,
      0.02,
    );
  box(mansion, 1.35, 2.95, 1.18, 2.71, 1.91, 1.01, M.pink);
  roof(mansion, 2.71, 3.42, 1.01, 1.52, 1.35);
  windowPanel(mansion, 2.71, 1.93, 1.625, 0.42, 2.17, 1, 2, false, true);
  box(mansion, 1.25, 0.055, 0.055, 2.71, 3.26, 1.71, pinkNeon, 0.01);
  for (let i = 0; i < 3; i++) shrub(mansion, 2.23 + i * 0.46, 1.01, 0.38, 3.54);
  box(mansion, 1.65, 0.42, 1.34, 1.16, 4.51, -0.29, M.purple);
  for (let i = 0; i < 3; i++) {
    box(
      mansion,
      0.88,
      0.1,
      0.88,
      1.16,
      4.69 + i * 0.22,
      -0.29,
      M.violet,
      0.025,
    );
    box(
      mansion,
      0.88,
      0.035,
      0.88,
      1.16,
      4.755 + i * 0.22,
      -0.29,
      material("#f6e9ff", { emissive: "#d3b5ff", emissiveIntensity: 0.7 }),
      0.012,
    );
  }
  for (let i = 0; i < 5; i++)
    shrub(mansion, -2.82 + i * 0.37, 0.63, 0.35, 4.29);
  for (let i = 0; i < 4; i++)
    shrub(mansion, -2.75 + i * 0.4, -0.36, 0.37, 4.29);
  // Courtyard walls, gateposts, and clipped hedges.
  box(mansion, 2.02, 0.51, 0.18, -2.9, 0.45, 2.84, M.trim);
  box(mansion, 2.66, 0.51, 0.18, 2.43, 0.45, 2.84, M.trim);
  box(mansion, 0.18, 0.51, 5.4, 3.88, 0.45, 0.2, M.trim);
  box(mansion, 0.18, 0.51, 5.4, -3.88, 0.45, 0.2, M.trim);
  for (const [x, z] of [
    [-3.9, 2.86],
    [-1.84, 2.86],
    [0.57, 2.86],
    [3.9, 2.86],
    [3.9, -2.48],
    [-3.9, -2.48],
  ])
    lamp(mansion, x, z, 0.64, true);
  for (let i = 0; i < 4; i++) shrub(mansion, 1.25 + i * 0.65, 2.29, 0.55, 0.43);
  for (let i = 0; i < 4; i++) shrub(mansion, -3.0 + i * 0.53, 2.12, 0.48, 0.43);
  for (let i = 0; i < 5; i++) shrub(mansion, 3.43, -1.6 + i * 0.6, 0.52, 0.43);
  tree(mansion, -3.8, 1.7, 0.92, 1);
  tree(mansion, 3.43, 1.5, 0.95, 1);
  tree(mansion, 3.45, -2, 0.93, 1);
  tree(mansion, -2.77, 1.48, 0.65);
  tree(mansion, 1.87, 2.22, 0.39);
  anchors.fullstack = new THREE.Vector3(-2.3, 5.3, -5.35);

  // FRONTEND — a slender violet studio with a striped shop awning.
  const front = group(-6.5, 0.23, 3.3);
  front.scale.y = 0.96;
  contact(front, 0, 0, 4.6, 4.7, 0.004);
  box(front, 2.24, 4.27, 2.44, -0.17, 2.15, 0.1, M.violet);
  box(front, 1.26, 5.18, 2.2, 0.7, 2.62, -0.3, M.lavender);
  box(front, 0.85, 2.25, 2.35, -1.55, 1.13, -0.03, M.lavender);
  roof(front, -0.27, 4.31, 0.12, 2.43, 2.62);
  roof(front, 0.69, 5.24, -0.3, 1.45, 2.37);
  roof(front, -1.54, 2.32, -0.03, 1.0, 2.51);
  windowPanel(front, -0.35, 1.43, 1.355, 1.25, 2.35, 2, 3);
  windowPanel(front, 1.36, 3.05, -0.25, 1.76, 3.84, 3, 5, true);
  windowPanel(front, -1.57, 1.49, 1.175, 0.48, 1.31, 2, 1);
  icon(front, "code", -0.26, 3.45, 1.385, 1.55, 1.55);
  box(front, 1.26, 1.17, 1.14, 0.44, 5.78, -0.35, M.lavender);
  roof(front, 0.44, 6.36, -0.35, 1.3, 1.2, M.blush);
  cylinder(
    front,
    0.035,
    0.045,
    1.0,
    0.44,
    6.92,
    -0.35,
    material("#c58dff"),
    12,
  );
  cylinder(front, 0.11, 0.11, 0.06, 0.44, 6.44, -0.35, M.violet, 16);
  const antenna = sphere(front, 0.075, 0.44, 7.45, -0.35, pinkNeon);
  antenna.userData.animated = true;
  animations.push((time) =>
    antenna.scale.setScalar(1 + Math.sin(time * 2) * 0.08),
  );
  box(front, 0.94, 1.6, 0.91, 1.14, 0.82, 1.07, M.pink);
  windowPanel(front, 1.15, 0.83, 1.546, 0.73, 1.34, 2, 1, false, true);
  const awning = group(1.15, 1.66, 1.6, front);
  awning.rotation.x = 0.22;
  for (let i = 0; i < 6; i++) {
    const mat = i % 2 ? M.trim : material("#df76e8");
    box(awning, 0.19, 0.1, 0.71, -0.475 + i * 0.19, 0, 0.1, mat, 0.012);
    box(awning, 0.19, 0.17, 0.08, -0.475 + i * 0.19, -0.075, 0.43, mat, 0.012);
  }
  garden(front, -2.0, 1.25, 1.07, 1.53);
  tree(front, -2.04, 1.1, 0.91, 1);
  shrub(front, -1.8, 1.89, 0.49);
  planter(front, -1.04, 1.8, 0.65, 0.58);
  planter(front, 0.49, 2.0, 1.0, 0.56);
  planter(front, 1.77, 0.4, 0.72, 0.58);
  tree(front, 1.76, 0.42, 0.49);
  bench(front, -0.48, 1.9, 0);
  anchors.frontend = new THREE.Vector3(-7.15, 4.9, 3.7);

  // MOBILE APP — a giant illuminated phone integrated into a little corner shop.
  const mobile = group(6.03, 0.23, -4.03);
  contact(mobile, 0, 0, 4.8, 4.4, 0.002);
  box(mobile, 3.05, 3.76, 2.65, 0, 1.91, 0, M.lavender);
  roof(mobile, 0, 3.83, 0, 3.26, 2.87);
  box(mobile, 1.59, 0.38, 1.56, 0.25, 4.09, -0.31, M.violet);
  box(mobile, 1.58, 4.55, 1.48, -0.43, 2.3, 1.02, M.blush);
  roof(mobile, -0.43, 4.63, 1.02, 1.77, 1.66);
  box(
    mobile,
    1.38,
    0.04,
    1.22,
    -0.43,
    4.74,
    1.02,
    material("#cf7aea", { emissive: "#bf53f2", emissiveIntensity: 0.45 }),
  );
  windowPanel(mobile, -0.43, 0.65, 1.79, 1.1, 1.17, 2, 1, false, true);
  windowPanel(mobile, 1.55, 1.21, 0.23, 2.11, 2.12, 3, 2, true, true);
  windowPanel(mobile, -1.19, 2.47, 1.34, 0.48, 1.71, 1, 2, false, true);
  box(mobile, 1.5, 3.17, 0.16, -0.43, 2.89, 1.84, M.deep, 0.13);
  box(mobile, 1.24, 2.95, 0.08, -0.43, 2.89, 1.94, material("#8250d3"), 0.1);
  box(
    mobile,
    1.12,
    2.78,
    0.03,
    -0.43,
    2.89,
    2.0,
    material("#bd72ef", { emissive: "#a052e3", emissiveIntensity: 0.55 }),
    0.1,
  );
  icon(mobile, "phone", -0.43, 2.91, 2.033, 1.23, 1.8);
  windowPanel(mobile, 1.09, 2.4, 1.35, 0.66, 1.61, 1, 2, false, true);
  box(mobile, 1.13, 0.3, 0.63, 1.1, 1.77, 1.65, M.blush);
  box(mobile, 1.03, 0.07, 0.07, 1.1, 1.69, 2.0, pinkNeon, 0.01);
  for (let i = 0; i < 2; i++) shrub(mobile, 0.87 + i * 0.43, 1.64, 0.43, 1.94);
  box(mobile, 0.09, 0.91, 2.34, 1.58, 3.05, -0.05, M.purple, 0.015);
  for (let i = 0; i < 2; i++)
    box(
      mobile,
      0.04,
      0.065,
      1.64,
      1.64,
      2.9 + i * 0.2,
      -0.04,
      whiteNeon,
      0.012,
    );
  box(mobile, 0.79, 0.12, 0.6, -1.43, 1.25, 1.54, M.violet);
  windowPanel(mobile, -1.44, 0.67, 1.65, 0.53, 0.98, 1, 1, false, true);
  planter(mobile, 1.78, 0.55, 0.61, 0.72);
  planter(mobile, 0.38, 2.08, 0.94, 0.57);
  planter(mobile, -1.63, 1.99, 0.65, 0.5);
  garden(mobile, 2.3, -2.3, 0.83, 1.3);
  tree(mobile, 2.3, -2.3, 0.92, 1);
  shrub(mobile, 2.12, -0.1, 0.53);
  tree(mobile, -1.85, 0.63, 0.53);
  anchors.mobile = new THREE.Vector3(6.05, 4.85, -4.72);

  // BACKEND — cloud headquarters with an exposed, electric-blue server rack.
  const backend = group(-0.38, 0.23, 8.6);
  backend.scale.setScalar(0.88);
  contact(backend, 0, 0, 5.6, 4.35, 0.003);
  box(backend, 2.83, 3.43, 2.56, -0.22, 1.73, -0.13, M.violet);
  roof(backend, -0.22, 3.49, -0.13, 3.02, 2.77);
  box(backend, 0.65, 0.15, 0.63, -0.39, 3.73, -0.05, M.lavender, 0.09);
  box(backend, 0.53, 0.02, 0.5, -0.39, 3.82, -0.05, M.blush, 0.1);
  icon(backend, "cloud", -0.38, 2.54, 1.188, 1.44, 1.34, "#c5f6ff");
  box(backend, 1.29, 1.47, 0.27, -0.33, 0.75, 1.28, M.blush);
  windowPanel(backend, -0.33, 0.73, 1.425, 0.91, 1.26, 2, 1, false, true);
  box(backend, 1.17, 2.63, 1.83, 1.7, 1.34, 0.12, M.deep, 0.04);
  box(backend, 1.25, 0.18, 1.92, 1.7, 2.72, 0.12, M.violet, 0.04);
  for (let i = 0; i < 5; i++) {
    const y = 0.38 + i * 0.46;
    box(backend, 1.19, 0.36, 1.8, 1.72, y, 0.12, M.purple, 0.035);
    box(backend, 0.035, 0.25, 1.54, 2.33, y, 0.12, M.deep, 0.015);
    box(backend, 0.047, 0.046, 0.95, 2.356, y + 0.01, 0.21, blueNeon, 0.008);
    sphere(backend, 0.026, 2.36, y, -0.48, blueNeon);
    box(backend, 0.85, 0.23, 0.04, 1.69, y, 1.04, M.deep, 0.015);
    box(backend, 0.42, 0.045, 0.05, 1.77, y, 1.07, blueNeon, 0.008);
    sphere(backend, 0.024, 1.38, y, 1.075, blueNeon);
  }
  box(backend, 0.88, 1.75, 1.2, -2.03, 0.89, 0.0, M.lavender);
  box(backend, 0.95, 0.13, 1.27, -2.03, 1.79, 0.0, M.blush);
  for (let i = 0; i < 2; i++) {
    box(backend, 0.35, 1.33, 0.06, -2.24 + i * 0.42, 0.82, 0.63, M.lavender);
    box(
      backend,
      0.035,
      0.16,
      0.08,
      -2.1 + i * 0.42,
      0.77,
      0.68,
      M.purple,
      0.005,
    );
  }
  box(backend, 0.65, 0.74, 0.77, 2.4, 0.38, 1.01, M.blush);
  box(backend, 0.68, 1.53, 1.14, 2.18, 0.77, -1.08, M.lavender);
  windowPanel(backend, 2.55, 0.91, -1.11, 0.66, 0.81, 1, 2, true);
  planter(backend, 1.26, 1.61, 1.85, 0.58);
  planter(backend, -1.72, 1.31, 0.92, 0.58);
  shrub(backend, 2.54, 1.46, 0.39);
  garden(backend, -3.4, 0.8, 1.16, 1.9);
  tree(backend, -3.4, 0.8, 1.02, 1);
  for (const [x, z] of [
    [-3.83, 1.46],
    [-3.05, 1.56],
    [-3.82, 0.07],
  ])
    shrub(backend, x, z, 0.43);
  anchors.backend = new THREE.Vector3(-2.4, 2.45, 8.3);

  // TRAINED MODEL — a glass observatory with a living, orbiting neural core.
  const ai = group(8.7, 0.23, 3.7);
  contact(ai, 0, 0, 5.6, 4.5, 0.003);
  box(ai, 3.42, 1.94, 2.62, 0, 1.0, -0.05, M.purple);
  roof(ai, 0, 2.0, -0.05, 3.55, 2.75);
  box(ai, 1.0, 1.75, 1.55, -1.6, 0.91, 0.21, M.blush);
  roof(ai, -1.6, 1.81, 0.21, 1.16, 1.69);
  windowPanel(ai, -1.61, 0.87, 1.01, 0.68, 1.39, 2, 2, false, true);
  box(ai, 0.93, 1.72, 1.03, 0.67, 0.88, 1.06, M.blush);
  roof(ai, 0.67, 1.81, 1.06, 1.09, 1.18);
  windowPanel(ai, 0.67, 0.87, 1.6, 0.56, 1.39, 1, 2, false, true);
  windowPanel(ai, 1.16, 0.87, 1.08, 0.53, 1.38, 1, 2, true, true);
  box(ai, 1.0, 1.36, 0.12, -0.53, 0.92, 1.32, M.violet);
  for (let i = 0; i < 3; i++)
    box(
      ai,
      0.045,
      0.57 - i * 0.06,
      0.05,
      -0.83 + i * 0.23,
      0.98,
      1.4,
      blueNeon,
      0.008,
    );
  icon(ai, "network", 1.744, 1.02, -0.09, 1.7, 1.25, "#8eeeff", Math.PI / 2);
  cylinder(ai, 1.2, 1.23, 0.16, 0, 2.23, -0.09, M.lavender);
  cylinder(
    ai,
    1.1,
    1.1,
    0.05,
    0,
    2.33,
    -0.09,
    material("#6256d2", { emissive: "#5145cc", emissiveIntensity: 0.3 }),
  );
  torus(ai, 1.12, 0.038, 0, 2.36, -0.09, blueNeon);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: "#8378ff",
    metalness: 0.12,
    roughness: 0.12,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false,
    clearcoat: 1,
  });
  const dome = mesh(
    new THREE.SphereGeometry(1.16, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2),
    glassMat,
    ai,
    0,
    2.34,
    -0.09,
  );
  dome.castShadow = false;
  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI) / 3;
    const points = [];
    for (let j = 0; j <= 32; j++) {
      const theta = (j / 32) * Math.PI;
      points.push([
        Math.cos(theta) * Math.cos(angle) * 1.17,
        2.34 + Math.sin(theta) * 1.17,
        -0.09 + Math.cos(theta) * Math.sin(angle) * 1.17,
      ]);
    }
    const rib = tube(
      ai,
      points,
      0.012,
      material("#c5c0ff", {
        emissive: "#8175ff",
        emissiveIntensity: 1.1,
        transparent: true,
        opacity: 0.8,
      }),
    );
    rib.castShadow = false;
  }
  cylinder(ai, 0.64, 0.69, 0.16, 0, 2.44, -0.09, M.purple);
  torus(ai, 0.68, 0.026, 0, 2.55, -0.09, purpleNeon);
  const brain = icon(ai, "brain", 0.2, 2.92, 0.38, 1.18, 1.18, "#fff1ff", 0.65);
  brain.userData.animated = true;
  animations.push((time) => {
    brain.position.y = 2.92 + Math.sin(time * 1.3) * 0.045;
  });
  for (let i = 0; i < 5; i++) {
    const node = sphere(ai, i === 0 ? 0.085 : 0.043, 0, 0, 0, blueNeon);
    node.userData.animated = true;
    node.castShadow = false;
    animations.push((time) => {
      const angle = time * 0.23 + i * Math.PI * 0.4;
      const y = 0.24 + (Math.sin(angle * 1.4 + i) + 1) * 0.36;
      const r = Math.sqrt(1.17 ** 2 - y ** 2);
      node.position.set(
        Math.cos(angle) * r,
        2.34 + y,
        -0.09 + Math.sin(angle) * r,
      );
    });
  }
  box(
    ai,
    0.47,
    0.57,
    0.5,
    1.95,
    0.3,
    0.74,
    material("#9ac7f6", { emissive: "#77a4ff", emissiveIntensity: 0.35 }),
  );
  box(ai, 0.33, 0.35, 0.38, 2.0, 0.19, -0.06, M.lavender);
  box(ai, 0.55, 0.39, 0.57, -1.23, 2.05, -1.13, M.lavender);
  planter(ai, -0.95, 1.71, 1.43, 0.55);
  shrub(ai, 0.57, 1.97, 0.56);
  shrub(ai, 1.55, 1.7, 0.33);
  garden(ai, 2.21, -1.04, 0.93, 1.55);
  tree(ai, 2.22, -1.04, 0.85);
  garden(ai, -2.42, -0.17, 0.92, 1.65);
  tree(ai, -2.43, -0.34, 0.92);
  shrub(ai, -2.39, 0.4, 0.41);
  anchors.ai = new THREE.Vector3(11.7, 2.0, 2.05);

  // The small park that stitches together the two foreground plots.
  garden(root, 3.94, 7.1, 3.02, 0.96);
  tree(root, 2.93, 7.1, 1.02, 1);
  tree(root, 4.25, 7.1, 0.74, 1);
  shrub(root, 5.14, 7.1, 0.49, 0.43);
  shrub(root, 3.58, 7.25, 0.45, 0.43);

  // A tiled circular plaza with a three-tier, gently rippling fountain.
  const plaza = group(0.58, 0, 0.8);
  cylinder(plaza, 2.72, 2.72, 0.19, 0, 0.095, 0, M.pink, 96);
  cylinder(plaza, 2.68, 2.68, 0.035, 0, 0.205, 0, M.blush, 96);
  const grout = material("#cf97ba");
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    const line = box(
      plaza,
      0.01,
      0.008,
      1.4,
      Math.sin(a) * 1.97,
      0.228,
      Math.cos(a) * 1.97,
      grout,
      0,
    );
    line.rotation.y = a;
  }
  torus(plaza, 2.09, 0.007, 0, 0.231, 0, grout);
  torus(plaza, 2.63, 0.007, 0, 0.231, 0, grout);
  contact(plaza, 0, 0, 3.5, 3.5, 0.235);
  cylinder(plaza, 1.45, 1.46, 0.22, 0, 0.36, 0, M.trim, 80);
  cylinder(
    plaza,
    1.32,
    1.32,
    0.035,
    0,
    0.487,
    0,
    material("#147ce7", {
      emissive: "#005aff",
      emissiveIntensity: 0.65,
      roughness: 0.19,
      metalness: 0.25,
    }),
    80,
  );
  torus(plaza, 1.39, 0.065, 0, 0.49, 0, M.blush);
  cylinder(plaza, 0.77, 0.83, 0.19, 0, 0.65, 0, M.lavender);
  cylinder(plaza, 0.9, 0.8, 0.13, 0, 0.81, 0, M.trim);
  cylinder(
    plaza,
    0.75,
    0.75,
    0.025,
    0,
    0.887,
    0,
    material("#119aee", {
      emissive: "#0078ff",
      emissiveIntensity: 0.65,
      roughness: 0.2,
    }),
  );
  torus(plaza, 0.83, 0.06, 0, 0.88, 0, M.blush);
  cylinder(plaza, 0.15, 0.2, 0.42, 0, 1.08, 0, M.lavender);
  cylinder(plaza, 0.37, 0.28, 0.12, 0, 1.31, 0, M.trim);
  cylinder(
    plaza,
    0.29,
    0.29,
    0.025,
    0,
    1.38,
    0,
    material("#259ce9", { emissive: "#0088ff", emissiveIntensity: 0.7 }),
  );
  torus(plaza, 0.34, 0.04, 0, 1.38, 0, M.blush);
  cylinder(plaza, 0.025, 0.043, 0.72, 0, 1.75, 0, blueNeon, 12);
  const dropletPoints = [
    [0, 0],
    [0.095, 0.02],
    [0.14, 0.11],
    [0.105, 0.2],
    [0.035, 0.32],
    [0, 0.4],
  ].map((p) => new THREE.Vector2(...p));
  const droplet = mesh(
    new THREE.LatheGeometry(dropletPoints, 24),
    material("#91eeff", {
      emissive: "#31c5ff",
      emissiveIntensity: 1.5,
      roughness: 0.1,
    }),
    plaza,
    0,
    2.0,
    0,
  );
  droplet.userData.animated = true;
  animations.push((time) => {
    droplet.position.y = 2.0 + Math.sin(time * 2) * 0.045;
  });
  for (let i = 0; i < 3; i++) {
    const rippleMat = new THREE.MeshBasicMaterial({
      color: "#b6edff",
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });
    const ripple = torus(plaza, 1, 0.012, 0, 0.51, 0, rippleMat);
    ripple.userData.animated = true;
    ripple.castShadow = false;
    animations.push((time) => {
      const phase = (time * 0.18 + i / 3) % 1;
      ripple.scale.setScalar(0.83 + phase * 0.47);
      rippleMat.opacity = 0.4 * (1 - phase);
    });
  }
  for (const a of [
    -0.45, -0.12, 0.22, 1.02, 1.35, 2.63, 2.96, 3.3, 4.15, 4.48,
  ]) {
    const r = 2.34;
    shrub(
      plaza,
      Math.sin(a) * r,
      Math.cos(a) * r,
      0.48 + random() * 0.06,
      0.24,
    );
  }
  bench(plaza, -1.99, 0.87, -0.5);
  bench(plaza, 2.01, 0.8, 0.62);
  lamp(root, -2.68, 0.05, 1.5);
  lamp(root, -0.89, 3.4, 1.47);
  lamp(root, 3.02, 3.64, 1.47);
  lamp(root, 3.34, -1.12, 1.5);

  // A candy-pink compact car on the quiet east street.
  const car = group(5.43, 0.13, -0.65);
  car.userData.animated = true;
  car.rotation.y = Math.PI / 2;
  const carPaint = material("#fa5ba8", { roughness: 0.32, metalness: 0.15 });
  box(car, 0.71, 0.3, 1.17, 0, 0.35, 0, carPaint, 0.12);
  box(car, 0.59, 0.34, 0.64, 0, 0.61, -0.05, carPaint, 0.1);
  const carGlass = material("#554887", { metalness: 0.35, roughness: 0.25 });
  const windshield = box(car, 0.48, 0.24, 0.03, 0, 0.63, 0.287, carGlass, 0.02);
  windshield.rotation.x = 0.24;
  box(car, 0.025, 0.22, 0.47, 0.303, 0.63, -0.06, carGlass, 0.03);
  box(car, 0.025, 0.22, 0.47, -0.303, 0.63, -0.06, carGlass, 0.03);
  box(car, 0.035, 0.24, 0.045, 0.32, 0.63, -0.04, carPaint, 0.01);
  for (const x of [-0.35, 0.35])
    for (const z of [-0.35, 0.35]) {
      const wheel = cylinder(
        car,
        0.145,
        0.145,
        0.11,
        x,
        0.22,
        z,
        material("#3c3151"),
        16,
      );
      wheel.rotation.z = Math.PI / 2;
      const hub = cylinder(car, 0.065, 0.065, 0.118, x, 0.22, z, M.blush, 16);
      hub.rotation.z = Math.PI / 2;
    }
  for (const x of [-0.23, 0.23]) {
    box(car, 0.15, 0.095, 0.035, x, 0.37, 0.584, warmNeon, 0.025);
    box(car, 0.15, 0.08, 0.035, x, 0.37, -0.583, pinkNeon, 0.02);
  }
  contact(root, 5.43, -0.65, 1.8, 1.4, 0.035);
  animations.push((time) => {
    car.position.y = 0.13 + Math.sin(time * 1.3) * 0.007;
  });

  // A few real lights add color to the already luminous architectural materials.
  const light = (color, intensity, distance, x, y, z) => {
    const l = new THREE.PointLight(color, intensity, distance, 2);
    l.position.set(x, y, z);
    root.add(l);
    return l;
  };
  light("#ffb06d", 1.3, 4, -4.0, 1.2, -1.4);
  light("#ff985e", 1.1, 3, -6.3, 1.0, 4.9);
  light("#ffbb70", 1.1, 3, -1.2, 0.8, 8.9);
  light("#ffb271", 1.2, 3, 5.5, 1.0, -2.0);
  light("#4c77ff", 2, 4, 8.7, 3.0, 3.7);
  light("#419dff", 0.6, 3, 0.58, 1.2, 0.8);

  return {
    root,
    anchors,
    update(time) {
      for (const animate of animations) animate(time);
    },
  };
}
