import * as THREE from "three";

export const CYAN = new THREE.Color("#00e8f2");
export const LIME = new THREE.Color("#bdff78");
const WIDTH = 15.2;
const DEPTH = 11.4;
let seed = 42;
function random() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}
const range = (a, b) => a + random() * (b - a);

export const skills = [
  {
    id: "typescript",
    name: "TypeScript",
    x: -2.7,
    z: 2.0,
    size: 1.75,
    color: CYAN,
    description:
      "A strong foundation for ambitious applications. I use TypeScript to build reliable, expressive systems that are a pleasure to maintain.",
    tags: ["Type safety", "Web applications", "Developer experience"],
  },
  {
    id: "react",
    name: "React",
    x: 0.0,
    z: -0.1,
    size: 1.8,
    color: CYAN,
    description:
      "Thoughtful interfaces, built component by component. My focus is on responsive experiences, accessible interactions, and clean, reusable architecture.",
    tags: ["React", "Next.js", "Design systems"],
  },
  {
    id: "node",
    name: "Node.js",
    x: 1.25,
    z: 2.55,
    size: 1.85,
    color: CYAN,
    description:
      "The engine behind the experience. Scalable services and well-designed APIs that connect the interface to everything it needs.",
    tags: ["REST & GraphQL", "Backend services", "PostgreSQL"],
  },
  {
    id: "three",
    name: "Three.js",
    x: 4.6,
    z: -2.0,
    size: 1.8,
    color: LIME,
    description:
      "Bringing another dimension to the web. Real-time graphics, custom shaders, and playful interactions that make digital experiences feel tangible.",
    tags: ["WebGL", "Creative development", "3D interaction"],
  },
  {
    id: "aws",
    name: "AWS",
    x: 5.1,
    z: 0.5,
    size: 1.75,
    color: LIME,
    description:
      "From a local idea to a global service. Resilient cloud infrastructure designed with performance, observability, and simplicity in mind.",
    tags: ["Cloud architecture", "Serverless", "Infrastructure as code"],
  },
  {
    id: "cicd",
    name: "CI/CD",
    x: 5.0,
    z: 3.15,
    size: 1.8,
    color: LIME,
    description:
      "Great engineering keeps moving. Automated pipelines that turn small, confident changes into dependable production releases.",
    tags: ["GitHub Actions", "Docker", "Automated delivery"],
  },
  {
    id: "system",
    name: "System Design",
    x: 0.1,
    z: 4.6,
    size: 1.85,
    color: CYAN,
    description:
      "Seeing the whole board. Balancing the details of each component with the needs of the larger system, from the first sketch to production scale.",
    tags: ["Architecture", "Distributed systems", "Scalability"],
  },
];

export const milestones = [
  {
    id: "2019",
    year: "2019",
    name: "Junior Developer",
    x: -4.6,
    z: 2.6,
    color: CYAN,
    description:
      "The first connection. Turning curiosity into craft, shipping my first production features, and discovering how much I love building for the web.",
    tags: ["The foundations", "JavaScript", "HTML & CSS"],
  },
  {
    id: "2020",
    year: "2020",
    name: "Software Engineer",
    x: -3.45,
    z: -0.45,
    color: CYAN,
    description:
      "From features to full products. Taking ownership of end-to-end experiences and connecting great interface design with dependable backend systems.",
    tags: ["Full-stack development", "React", "TypeScript"],
  },
  {
    id: "2022",
    year: "2022",
    name: "Senior Engineer",
    x: 0.9,
    z: -3.05,
    color: LIME,
    description:
      "Building with a wider perspective. Leading complex projects, shaping system architecture, and helping other engineers do their best work.",
    tags: ["Technical ownership", "System design", "Mentorship"],
  },
  {
    id: "2024",
    year: "2024",
    name: "Lead Engineer",
    x: 3.6,
    z: -4.3,
    color: LIME,
    description:
      "Connecting people, technology, and possibility. Guiding teams from an ambitious idea to a thoughtfully engineered product.",
    tags: ["Engineering leadership", "Technical strategy", "Team growth"],
  },
];

function roundedShape(w, h, r) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r);
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  s.lineTo(-w / 2, -h / 2 + r);
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return s;
}

function slab(w, d, h, r, material) {
  const geo = new THREE.ExtrudeGeometry(roundedShape(w, d, r), {
    depth: h,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.025,
    bevelThickness: 0.025,
    curveSegments: 7,
  });
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function canvasTexture(canvas) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function substrateTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1536;
  const c = canvas.getContext("2d");
  c.fillStyle = "#081518";
  c.fillRect(0, 0, 2048, 1536);
  // Fine copper runs under the solder mask, with angled PCB-style corners.
  for (let i = 0; i < 2700; i++) {
    const x = Math.floor(range(20, 2020) / 8) * 8;
    const y = Math.floor(range(20, 1510) / 8) * 8;
    const l = range(15, 140);
    const direction = random() > 0.5 ? 1 : -1;
    c.strokeStyle = ["#10272b", "#122a2e", "#163036", "#061013", "#1a3033"][
      i % 5
    ];
    c.lineWidth = i % 3 === 0 ? 1.5 : 0.7;
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + l * 0.4, y);
    c.lineTo(x + l * 0.65, y + l * 0.25 * direction);
    c.lineTo(x + l, y + l * 0.25 * direction);
    c.stroke();
    if (i % 3 === 0) {
      c.strokeStyle = "#31403b";
      c.beginPath();
      c.arc(x, y, 1.8, 0, Math.PI * 2);
      c.stroke();
    }
  }
  for (let i = 0; i < 250; i++) {
    const x = range(20, 1950),
      y = range(20, 1450);
    c.strokeStyle = "#213338";
    c.lineWidth = 0.7;
    c.strokeRect(x, y, range(14, 60), range(9, 30));
    c.fillStyle = "#425251";
    c.font = "5px monospace";
    c.fillText(`${["R", "C", "U", "D"][i % 4]}${100 + i}`, x, y - 3);
  }
  c.strokeStyle = "#24424a";
  c.lineWidth = 2;
  c.strokeRect(18, 18, 2012, 1500);
  c.font = "10px monospace";
  c.fillStyle = "#466366";
  c.fillText("AR / ENGINEERING THE CONNECTIONS", 65, 1490);
  c.fillText("REV 05.24     •     DESIGNED TO EVOLVE", 1610, 1490);
  return canvasTexture(canvas);
}

function icon(c, id, color) {
  c.strokeStyle = color;
  c.fillStyle = color;
  c.lineWidth = 5;
  c.lineJoin = "round";
  const cx = 256,
    cy = 178;
  if (id === "react") {
    for (let a = 0; a < 3; a++) {
      c.save();
      c.translate(cx, cy);
      c.rotate((a * Math.PI) / 3);
      c.beginPath();
      c.ellipse(0, 0, 71, 26, 0, 0, Math.PI * 2);
      c.stroke();
      c.restore();
    }
    c.beginPath();
    c.arc(cx, cy, 9, 0, Math.PI * 2);
    c.fill();
  } else if (id === "typescript") {
    c.strokeRect(201, 126, 110, 103);
    c.font = "500 67px Arial";
    c.textAlign = "center";
    c.fillText("TS", 258, 209);
  } else if (id === "node") {
    c.beginPath();
    for (let a = 0; a < 6; a++) {
      const angle = (a * Math.PI) / 3 - Math.PI / 6;
      const x = cx + Math.cos(angle) * 66,
        y = cy + Math.sin(angle) * 60;
      if (a === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.closePath();
    c.stroke();
    c.font = "500 58px Arial";
    c.textAlign = "center";
    c.fillText("JS", 256, 197);
  } else if (id === "three") {
    c.beginPath();
    c.moveTo(193, 120);
    c.lineTo(330, 170);
    c.lineTo(218, 238);
    c.closePath();
    c.moveTo(193, 120);
    c.lineTo(251, 188);
    c.lineTo(330, 170);
    c.moveTo(251, 188);
    c.lineTo(218, 238);
    c.moveTo(218, 151);
    c.lineTo(272, 191);
    c.stroke();
  } else if (id === "aws") {
    c.fillStyle = "#edf1ed";
    c.textAlign = "center";
    c.font = "100 90px Arial";
    c.fillText("aws", 256, 203);
    c.strokeStyle = "#ffac35";
    c.lineWidth = 6;
    c.beginPath();
    c.moveTo(188, 225);
    c.quadraticCurveTo(250, 268, 323, 225);
    c.stroke();
    c.beginPath();
    c.moveTo(305, 225);
    c.lineTo(326, 222);
    c.lineTo(321, 243);
    c.stroke();
  } else if (id === "cicd") {
    c.lineWidth = 8;
    c.beginPath();
    c.moveTo(256, 178);
    c.bezierCurveTo(135, 69, 133, 269, 256, 178);
    c.bezierCurveTo(379, 69, 379, 269, 256, 178);
    c.stroke();
  } else {
    for (let i = 2; i >= 0; i--) {
      const y = 139 + i * 26;
      c.beginPath();
      c.moveTo(200, y);
      c.lineTo(267, y - 20);
      c.lineTo(321, y + 16);
      c.lineTo(252, y + 37);
      c.closePath();
      c.fillStyle = "#081518";
      c.fill();
      c.stroke();
    }
  }
}

function chipTexture(skill) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 512;
  const c = canvas.getContext("2d");
  c.fillStyle = "#091013";
  c.fillRect(0, 0, 512, 512);
  const gradient = c.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, "#182527");
  gradient.addColorStop(0.5, "#0b1417");
  gradient.addColorStop(1, "#071012");
  c.fillStyle = gradient;
  c.beginPath();
  c.roundRect(13, 13, 486, 486, 28);
  c.fill();
  c.strokeStyle = "#344246";
  c.lineWidth = 2;
  c.stroke();
  c.strokeStyle = "#172a2d";
  c.lineWidth = 1;
  c.beginPath();
  c.roundRect(23, 23, 466, 466, 23);
  c.stroke();
  const color = ["node", "cicd", "three"].includes(skill.id)
    ? "#91f2a3"
    : "#00e4f1";
  c.save();
  c.translate(256, 178);
  c.scale(1.16, 1.16);
  c.translate(-256, -178);
  icon(c, skill.id, color);
  c.restore();
  c.fillStyle = "#edf2ee";
  c.textAlign = "center";
  c.font = "400 52px Arial";
  if (skill.id === "system") {
    c.fillText("System", 256, 325);
    c.fillText("Design", 256, 377);
  } else if (skill.id !== "aws") c.fillText(skill.name, 256, 328);
  c.fillStyle = "#48605e";
  c.textAlign = "left";
  c.font = "12px monospace";
  c.fillText("AR " + skill.id.toUpperCase() + " / 01", 47, 462);
  c.fillStyle = "#64807c";
  c.beginPath();
  c.arc(43, 43, 5, 0, Math.PI * 2);
  c.fill();
  return canvasTexture(canvas);
}

function tube(points, radius, material) {
  const curve = new THREE.CurvePath();
  for (let i = 1; i < points.length; i++)
    curve.add(new THREE.LineCurve3(points[i - 1], points[i]));
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(
      curve,
      Math.max(12, points.length * 6),
      radius,
      5,
      false,
    ),
    material,
  );
  return mesh;
}

function ring(radius, thickness, material) {
  const mesh = new THREE.Mesh(
    new THREE.TorusGeometry(radius, thickness, 8, 40),
    material,
  );
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

function labelTexture(item) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const c = canvas.getContext("2d");
  c.textAlign = "center";
  c.fillStyle = item.color === CYAN ? "#36f3ed" : "#b4f68a";
  c.font = "500 56px Arial";
  c.fillText(item.year, 256, 65);
  c.fillStyle = "#edf4ef";
  c.font = "400 52px Arial";
  const words = item.name.split(" ");
  c.fillText(words[0], 256, 122);
  c.fillText(words[1], 256, 174);
  return canvasTexture(canvas);
}

export function createBoard() {
  const group = new THREE.Group();
  const interactive = [];
  const pulses = [];
  const darkMetal = new THREE.MeshStandardMaterial({
    color: "#142127",
    metalness: 0.85,
    roughness: 0.32,
  });
  const black = new THREE.MeshStandardMaterial({
    color: "#080f12",
    metalness: 0.55,
    roughness: 0.39,
  });
  const silver = new THREE.MeshStandardMaterial({
    color: "#617477",
    metalness: 0.92,
    roughness: 0.28,
  });
  const gold = new THREE.MeshStandardMaterial({
    color: "#92866b",
    metalness: 0.85,
    roughness: 0.4,
  });
  const cyanGlow = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0, 1.5, 1.9),
  });
  const limeGlow = new THREE.MeshBasicMaterial({
    color: new THREE.Color(1.15, 1.8, 0.43),
  });
  const body = slab(WIDTH, DEPTH, 0.26, 0.3, darkMetal);
  body.position.y = -0.28;
  group.add(body);
  const lower = slab(WIDTH - 0.09, DEPTH - 0.06, 0.15, 0.25, black);
  lower.position.y = -0.44;
  group.add(lower);
  const substrate = slab(
    WIDTH - 0.08,
    DEPTH - 0.08,
    0.04,
    0.28,
    new THREE.MeshStandardMaterial({
      color: "#0c1b1d",
      metalness: 0.65,
      roughness: 0.48,
    }),
  );
  group.add(substrate);
  const surface = new THREE.Mesh(
    new THREE.PlaneGeometry(WIDTH - 0.35, DEPTH - 0.35),
    new THREE.MeshStandardMaterial({
      map: substrateTexture(),
      metalness: 0.62,
      roughness: 0.48,
    }),
  );
  surface.rotation.x = -Math.PI / 2;
  surface.position.y = 0.069;
  surface.receiveShadow = true;
  group.add(surface);

  // A thin exposed copper edge catches the same light as the signal paths.
  const edgePoints = roundedShape(WIDTH - 0.02, DEPTH - 0.02, 0.3)
    .getPoints(14)
    .map((p) => new THREE.Vector3(p.x, -0.075, -p.y));
  group.add(
    tube(edgePoints, 0.012, new THREE.MeshBasicMaterial({ color: "#086577" })),
  );
  group.add(
    tube(
      [
        new THREE.Vector3(-7.45, -0.06, 4.9),
        new THREE.Vector3(-7.45, -0.06, 5.35),
        new THREE.Vector3(-7.2, -0.06, 5.64),
        new THREE.Vector3(-0.5, -0.06, 5.64),
      ],
      0.017,
      cyanGlow,
    ),
  );
  group.add(
    tube(
      [
        new THREE.Vector3(7.55, -0.07, -3.8),
        new THREE.Vector3(7.55, -0.07, 3.8),
      ],
      0.014,
      limeGlow,
    ),
  );

  // Mounting holes with inset dark centers and machined metal rims.
  for (const [x, z] of [
    [-7.17, -5.26],
    [7.17, -5.26],
    [-7.17, 5.26],
    [7.17, 5.26],
    [0, -5.26],
    [3.7, 5.26],
    [-7.17, 0],
    [7.17, 0],
  ]) {
    const hole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.012, 20),
      black,
    );
    hole.position.set(x, 0.09, z);
    group.add(hole);
    const rim = ring(0.11, 0.024, silver);
    rim.position.set(x, 0.097, z);
    group.add(rim);
    const outer = ring(0.17, 0.008, gold);
    outer.position.set(x, 0.082, z);
    group.add(outer);
  }

  // Collect all small parts into instanced meshes to keep the rich board inexpensive.
  const instances = { black: [], silver: [], gold: [], cyan: [], lime: [] };
  const addPart = (kind, x, y, z, sx, sy, sz, rotation = 0) =>
    instances[kind].push({ x, y, z, sx, sy, sz, rotation });
  const occupied = (x, z, margin = 0.3) =>
    skills.some(
      (s) =>
        Math.abs(s.x - x) < s.size / 2 + margin &&
        Math.abs(s.z - z) < s.size / 2 + margin,
    ) || milestones.some((s) => Math.hypot(s.x - x, s.z - z) < 0.6);

  for (let i = 0; i < 720; i++) {
    const x = range(-7.05, 7.05),
      z = range(-5.12, 5.12);
    if (occupied(x, z)) continue;
    const rotation = random() > 0.5 ? 0 : Math.PI / 2;
    const w = range(0.055, 0.12),
      d = range(0.11, 0.25),
      h = range(0.035, 0.095);
    addPart("black", x, 0.085 + h / 2, z, w, h, d, rotation);
    for (const side of [-1, 1]) {
      addPart(
        i % 4 === 0 ? "gold" : "silver",
        x + (rotation ? side * d * 0.4 : 0),
        0.09 + h / 2,
        z + (rotation ? 0 : side * d * 0.4),
        w * 1.04,
        h * 0.75,
        d * 0.2,
        rotation,
      );
    }
    if (i % 21 === 0)
      addPart(i % 42 === 0 ? "lime" : "cyan", x, 0.14, z, 0.047, 0.035, 0.042);
  }

  for (let i = 0; i < 100; i++) {
    const x = range(-6.9, 6.9),
      z = range(-4.9, 4.9);
    if (occupied(x, z, 0.65)) continue;
    const w = range(0.3, 0.68),
      d = range(0.3, 0.75);
    addPart("black", x, 0.17, z, w, 0.17, d);
    for (let side = -1; side <= 1; side += 2) {
      for (let p = 0; p < 5; p++)
        addPart(
          "silver",
          x + side * (w / 2 + 0.05),
          0.13,
          z - d * 0.38 + p * d * 0.19,
          0.11,
          0.07,
          0.028,
        );
    }
    addPart("silver", x - w * 0.32, 0.259, z - d * 0.32, 0.024, 0.003, 0.024);
  }

  // Larger capacitors give the surface a recognizably physical silhouette.
  const capGeo = new THREE.CylinderGeometry(0.105, 0.105, 0.24, 14);
  for (let i = 0; i < 29; i++) {
    const x = range(-7, 7),
      z = range(-5, 5);
    if (occupied(x, z, 0.5)) continue;
    const cap = new THREE.Mesh(capGeo, darkMetal);
    cap.position.set(x, 0.2, z);
    group.add(cap);
    const top = ring(0.084, 0.014, silver);
    top.position.set(x, 0.325, z);
    group.add(top);
    addPart("silver", x, 0.33, z, 0.1, 0.005, 0.01);
  }

  for (const skill of skills) {
    const chip = new THREE.Group();
    chip.position.set(skill.x, 0.11, skill.z);
    const base = slab(skill.size + 0.17, skill.size + 0.17, 0.075, 0.13, black);
    chip.add(base);
    const chipBody = slab(skill.size, skill.size, 0.2, 0.12, darkMetal);
    chipBody.position.y = 0.07;
    chip.add(chipBody);
    const texture = chipTexture(skill);
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(skill.size - 0.035, skill.size - 0.035),
      new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.42,
        roughness: 0.5,
        emissive: "#b5d5d4",
        emissiveIntensity: 0.4,
        emissiveMap: texture,
      }),
    );
    face.rotation.x = -Math.PI / 2;
    face.position.y = 0.298;
    chip.add(face);
    face.userData = { type: "skill", ...skill };
    interactive.push(face);
    group.add(chip);
    const pinColor = skill.color === CYAN ? "cyan" : "lime";
    for (const side of [-1, 1]) {
      for (let p = 0; p < 13; p++) {
        const n = (-0.73 * skill.size) / 2 + (p * skill.size * 0.73) / 12;
        addPart(
          "silver",
          skill.x + side * (skill.size / 2 + 0.09),
          0.23,
          skill.z + n,
          0.19,
          0.075,
          0.045,
        );
        addPart(
          pinColor,
          skill.x + side * (skill.size / 2 + 0.165),
          0.188,
          skill.z + n,
          0.036,
          0.085,
          0.03,
        );
        addPart(
          "silver",
          skill.x + n,
          0.23,
          skill.z + side * (skill.size / 2 + 0.09),
          0.045,
          0.075,
          0.19,
        );
        addPart(
          pinColor,
          skill.x + n,
          0.188,
          skill.z + side * (skill.size / 2 + 0.165),
          0.03,
          0.085,
          0.036,
        );
      }
    }

    // Parallel signal lanes leave each processor with clean, forty-five degree turns.
    for (let lane = 0; lane < 7; lane++) {
      const offset = (lane - 3) * 0.1;
      const direction = skill.x > 3 ? -1 : 1;
      const startX = skill.x + direction * (skill.size / 2 + 0.2);
      const startZ = skill.z + offset;
      const extend = 0.3 + lane * 0.075;
      const endZ = Math.min(
        5.15,
        startZ + (skill.z > 2 ? -1 : 1) * (1.1 + lane * 0.095),
      );
      const pts = [
        [startX, startZ],
        [startX + direction * extend, startZ],
        [startX + direction * (extend + 0.45), startZ + (endZ - startZ) * 0.45],
        [startX + direction * (extend + 0.45), endZ - 0.16],
        [startX + direction * (extend + 0.61), endZ],
      ];
      const color = skill.color
        .clone()
        .multiplyScalar(lane % 3 === 0 ? 0.85 : 0.29);
      const mat = new THREE.MeshBasicMaterial({ color });
      group.add(
        tube(
          pts.map(([x, z]) => new THREE.Vector3(x, 0.091, z)),
          lane % 3 === 0 ? 0.011 : 0.006,
          mat,
        ),
      );
      const endpoint = ring(0.035, 0.01, mat);
      endpoint.position.set(pts[4][0], 0.095, pts[4][1]);
      group.add(endpoint);
    }
  }

  // Fine branches connect the career signal to the individual skill processors.
  const branches = [
    { from: [-3.45, -0.45], to: [-2.7, 1.03], color: CYAN },
    { from: [-1.6, -1.7], to: [0, -1.1], color: CYAN },
    { from: [0.9, -3.05], to: [3.58, -2], color: LIME },
    { from: [0.9, -3.05], to: [4.1, 0.5], color: LIME },
    { from: [3.6, -4.3], to: [5.3, -3], color: LIME },
    { from: [-1.6, -1.7], to: [1.25, 1.45], color: CYAN },
  ];
  for (const b of branches) {
    for (let lane = 0; lane < 4; lane++) {
      const o = lane * 0.075;
      const [sx, sz] = b.from,
        [ex, ez] = b.to;
      const pts = [
        [sx + o, sz],
        [sx + o, sz + 0.3 + o],
        [sx + 0.55 + o, sz + 0.85 + o],
        [sx + 0.55 + o, ez - 0.4 - o],
        [sx + 0.95 + o, ez - o],
        [ex, ez - o],
      ];
      group.add(
        tube(
          pts.map(([x, z]) => new THREE.Vector3(x, 0.09, z)),
          0.007,
          new THREE.MeshBasicMaterial({
            color: b.color.clone().multiplyScalar(0.45),
          }),
        ),
      );
    }
  }

  const pathXZ = [
    [-6.35, 4.6],
    [-6.1, 3.9],
    [-5.5, 3.3],
    [-4.6, 2.6],
    [-4.1, 1.8],
    [-3.9, 0.7],
    [-3.45, -0.45],
    [-2.7, -0.9],
    [-1.6, -1.7],
    [-0.75, -2.55],
    [0.9, -3.05],
    [2.15, -3.55],
    [2.6, -4.0],
    [3.6, -4.3],
    [4.25, -5.0],
  ];
  const pathPoints = pathXZ.map(([x, z]) => new THREE.Vector3(x, 0.25, z));
  const pathCurve = new THREE.CurvePath();
  for (let i = 1; i < pathPoints.length; i++) {
    pathCurve.add(new THREE.LineCurve3(pathPoints[i - 1], pathPoints[i]));
    const color = CYAN.clone().lerp(LIME, THREE.MathUtils.smoothstep(i, 6, 11));
    group.add(
      tube(
        [pathPoints[i - 1], pathPoints[i]],
        0.043,
        new THREE.MeshBasicMaterial({
          color: color.clone().multiplyScalar(0.45),
          transparent: true,
          opacity: 0.3,
        }),
      ),
    );
    group.add(
      tube(
        [pathPoints[i - 1], pathPoints[i]],
        0.02,
        new THREE.MeshBasicMaterial({
          color: color.clone().multiplyScalar(2.4),
        }),
      ),
    );
    group.add(
      tube(
        [pathPoints[i - 1], pathPoints[i]],
        0.007,
        new THREE.MeshBasicMaterial({ color: new THREE.Color(2, 2.8, 2.3) }),
      ),
    );
  }

  // Machined, illuminated career nodes sit above the main signal trace.
  for (const item of milestones) {
    const node = new THREE.Group();
    node.position.set(item.x, 0.09, item.z);
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.29, 0.11, 40),
      darkMetal,
    );
    base.position.y = 0.04;
    node.add(base);
    const halo = ring(
      0.22,
      0.027,
      new THREE.MeshBasicMaterial({
        color: item.color.clone().multiplyScalar(2),
      }),
    );
    halo.position.y = 0.18;
    node.add(halo);
    const center = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.19, 0.11, 32),
      new THREE.MeshStandardMaterial({
        color: "#133237",
        metalness: 0.7,
        roughness: 0.2,
        emissive: item.color,
        emissiveIntensity: 0.35,
      }),
    );
    center.position.y = 0.12;
    node.add(center);
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 12, 8),
      new THREE.MeshBasicMaterial({
        color: item.color.clone().multiplyScalar(2),
      }),
    );
    dot.position.y = 0.22;
    node.add(dot);
    const hit = new THREE.Mesh(
      new THREE.SphereGeometry(0.36, 12, 8),
      new THREE.MeshBasicMaterial({ visible: false }),
    );
    hit.userData = { type: "milestone", ...item };
    node.add(hit);
    interactive.push(hit);
    const ripple = ring(
      0.28,
      0.012,
      new THREE.MeshBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.35,
      }),
    );
    ripple.position.y = 0.085;
    node.add(ripple);
    pulses.push(ripple);
    group.add(node);
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(2.15, 1.075),
      new THREE.MeshBasicMaterial({
        map: labelTexture(item),
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    label.rotation.x = -Math.PI / 2;
    label.position.set(item.x - 0.45, 0.17, item.z - 0.86);
    group.add(label);
  }

  for (const [x, z] of [
    [-1.6, -1.7],
    [-0.75, -2.55],
  ]) {
    const small = ring(0.115, 0.019, cyanGlow);
    small.position.set(x, 0.21, z);
    group.add(small);
  }
  const start = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.29, 0.12, 32),
    darkMetal,
  );
  start.position.set(-6.35, 0.14, 4.6);
  group.add(start);
  const startRing = ring(0.19, 0.038, silver);
  startRing.position.set(-6.35, 0.21, 4.6);
  group.add(startRing);

  const finish = new THREE.Group();
  finish.position.set(4.25, 0.35, -5);
  const foot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.29, 0.15, 32),
    darkMetal,
  );
  finish.add(foot);
  const beacon = ring(0.25, 0.021, limeGlow);
  beacon.position.y = 0.1;
  finish.add(beacon);
  const crown = ring(0.41, 0.023, limeGlow);
  crown.position.y = 0.44;
  finish.add(crown);
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.025, 40),
    new THREE.MeshStandardMaterial({
      color: "#152b1b",
      metalness: 0.6,
      roughness: 0.25,
      transparent: true,
      opacity: 0.9,
    }),
  );
  disc.position.y = 0.425;
  finish.add(disc);
  const star = [];
  for (let i = 0; i <= 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2,
      r = i % 2 === 0 ? 0.23 : 0.105;
    star.push(new THREE.Vector3(Math.cos(a) * r, 0.45, Math.sin(a) * r));
  }
  finish.add(tube(star, 0.018, limeGlow));
  group.add(finish);
  const finishHit = new THREE.Mesh(
    new THREE.SphereGeometry(0.48, 12, 8),
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  finishHit.userData = { type: "milestone", ...milestones[3] };
  finishHit.position.y = 0.3;
  finish.add(finishHit);
  interactive.push(finishHit);

  // Edge connectors, slots, and solder pads complete the motherboard silhouette.
  for (let j = 0; j < 3; j++) {
    const x = -5.6 + j * 2;
    addPart("black", x, 0.18, -5.08, 1.55, 0.2, 0.24);
    for (let p = 0; p < 16; p++)
      addPart("gold", x - 0.68 + p * 0.09, 0.24, -5.08, 0.036, 0.12, 0.15);
  }
  for (let j = 0; j < 3; j++) {
    addPart("black", 7.23, 0.14, -2.7 + j * 2.65, 0.25, 0.2, 2.05);
    addPart("silver", 7.39, 0.14, -2.7 + j * 2.65, 0.04, 0.16, 1.8);
  }
  const materials = { black, silver, gold, cyan: cyanGlow, lime: limeGlow };
  const transform = new THREE.Object3D();
  for (const [kind, parts] of Object.entries(instances)) {
    const mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      materials[kind],
      parts.length,
    );
    parts.forEach((p, i) => {
      transform.position.set(p.x, p.y, p.z);
      transform.scale.set(p.sx, p.sy, p.sz);
      transform.rotation.set(0, p.rotation, 0);
      transform.updateMatrix();
      mesh.setMatrixAt(i, transform.matrix);
    });
    mesh.castShadow = kind === "black";
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  const travelers = [];
  for (let i = 0; i < 5; i++) {
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.032, 8, 6),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(1.8, 3, 2.5) }),
    );
    group.add(particle);
    travelers.push(particle);
  }
  return { group, interactive, pulses, travelers, pathCurve };
}
