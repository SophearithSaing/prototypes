import * as THREE from "three";
import { poster } from "./data.js";
import {
  isWalkable,
  roomAtPosition,
  posterSlots,
  ROW_SPACING,
} from "./archive-layout.js";

const EYE_HEIGHT = 2.15;
const ACTIVE_ROW_RADIUS = 1;

export class Cinema {
  constructor(container, labels, layout, onSelect, { state, onMove } = {}) {
    this.container = container;
    this.labels = labels;
    this.layout = layout;
    this.onSelect = onSelect;
    this.onMove = onMove;
    this.keys = new Set();
    this.activeRows = new Map();
    this.posters = [];
    this.paused = false;
    this.disposed = false;
    this.yaw = 0;
    this.pitch = 0;
    this.position = new THREE.Vector3(0, EYE_HEIGHT, 10);
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#171512");
    this.scene.fog = new THREE.Fog("#171512", 26, 83);
    this.camera = new THREE.PerspectiveCamera(62, 1, 0.08, 90);
    this.camera.rotation.order = "YXZ";
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.domElement.tabIndex = 0;
    this.renderer.domElement.setAttribute(
      "aria-label",
      "Walk through the cinema. WASD to move, arrow keys or drag to turn, Shift to walk faster. Select posters to open your journal.",
    );
    container.appendChild(this.renderer.domElement);
    this.boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    this.planeGeometry = new THREE.PlaneGeometry(1, 1);
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = haloCanvas.height = 128;
    const haloContext = haloCanvas.getContext("2d");
    const halo = haloContext.createRadialGradient(64, 64, 2, 64, 64, 64);
    halo.addColorStop(0, "rgba(255,202,110,.42)");
    halo.addColorStop(0.2, "rgba(255,180,72,.19)");
    halo.addColorStop(1, "rgba(255,156,45,0)");
    haloContext.fillStyle = halo;
    haloContext.fillRect(0, 0, 128, 128);
    this.haloTexture = new THREE.CanvasTexture(haloCanvas);
    this.materials = {
      wall: new THREE.MeshStandardMaterial({
        color: "#403129",
        roughness: 0.85,
      }),
      wood: new THREE.MeshStandardMaterial({
        color: "#241e19",
        roughness: 0.65,
      }),
      panel: new THREE.MeshStandardMaterial({
        color: "#302820",
        roughness: 0.7,
      }),
      brass: new THREE.MeshStandardMaterial({
        color: "#a88a52",
        metalness: 0.55,
        roughness: 0.4,
      }),
      trim: new THREE.MeshStandardMaterial({
        color: "#6d5536",
        metalness: 0.3,
        roughness: 0.65,
      }),
      floor: new THREE.MeshStandardMaterial({
        color: "#332e26",
        roughness: 0.45,
        metalness: 0.2,
      }),
      carpet: new THREE.MeshStandardMaterial({
        color: "#3c2425",
        roughness: 1,
      }),
      velvet: new THREE.MeshStandardMaterial({
        color: "#542c2d",
        roughness: 1,
      }),
      ceiling: new THREE.MeshStandardMaterial({
        color: "#201f1a",
        roughness: 1,
      }),
      light: new THREE.MeshBasicMaterial({ color: "#ffe4ab" }),
    };
    this.scene.add(new THREE.HemisphereLight("#ffe2b9", "#3a2925", 2.25));
    const light = new THREE.DirectionalLight("#ffe1ab", 2.5);
    light.position.set(-3, 8, 10);
    this.scene.add(light, new THREE.AmbientLight("#d7c5ae", 0.35));
    this.entrance = this.makeSection();
    this.buildEntrance(this.entrance);
    this.flushBoxes(this.entrance);
    if (state) this.restoreState(state);
    this.updateCamera();
    this.streamRooms();
    this.bindEvents();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();
    this.lastTime = performance.now();
    this.lastUIUpdate = 0;
    this.animate();
  }

  makeSection() {
    const section = {
      group: new THREE.Group(),
      boxes: new Map(),
      textures: new Set(),
      materials: new Set(),
      posters: [],
      disposed: false,
    };
    this.scene.add(section.group);
    return section;
  }

  box(section, material, x, y, z, w, h, d, yaw = 0) {
    if (!section.boxes.has(material)) section.boxes.set(material, []);
    section.boxes.get(material).push({ x, y, z, w, h, d, yaw });
  }

  flushBoxes(section) {
    const transform = new THREE.Object3D();
    for (const [key, boxes] of section.boxes) {
      const mesh = new THREE.InstancedMesh(
        this.boxGeometry,
        this.materials[key],
        boxes.length,
      );
      boxes.forEach((box, i) => {
        transform.position.set(box.x, box.y, box.z);
        transform.rotation.set(0, box.yaw, 0);
        transform.scale.set(box.w, box.h, box.d);
        transform.updateMatrix();
        mesh.setMatrixAt(i, transform.matrix);
      });
      mesh.computeBoundingSphere();
      section.group.add(mesh);
    }
    section.boxes.clear();
  }

  canvasTexture(section, width, height, draw) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    draw(canvas.getContext("2d"), width, height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    section.textures.add(texture);
    return texture;
  }

  plane(section, texture, x, y, z, w, h, yaw = 0) {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      toneMapped: false,
    });
    section.materials.add(material);
    const mesh = new THREE.Mesh(this.planeGeometry, material);
    mesh.userData.nonBlocking = true;
    mesh.position.set(x, y, z);
    mesh.rotation.y = yaw;
    mesh.scale.set(w, h, 1);
    section.group.add(mesh);
    return mesh;
  }

  sign(section, title, subtitle, x, y, z, w = 5, h = 1.2, yaw = 0) {
    const texture = this.canvasTexture(section, 1024, 256, (ctx, width) => {
      ctx.textAlign = "center";
      ctx.fillStyle = "#dcc392";
      ctx.font = "48px Georgia";
      ctx.fillText(title, width / 2, 110, 930);
      ctx.fillStyle = "#a49b82";
      ctx.font = "17px sans-serif";
      ctx.fillText(subtitle.toUpperCase(), width / 2, 178, 930);
      ctx.strokeStyle = "#8c744c";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(250, 215);
      ctx.lineTo(774, 215);
      ctx.stroke();
    });
    return this.plane(section, texture, x, y, z, w, h, yaw);
  }

  sconce(section, x, z, yaw = 0) {
    this.box(section, "brass", x, 3.8, z, 0.28, 1.2, 0.2, yaw);
    this.box(
      section,
      "light",
      x + Math.sin(yaw) * 0.13,
      3.85,
      z + Math.cos(yaw) * 0.13,
      0.16,
      0.85,
      0.16,
      yaw,
    );
    for (const y of [3.38, 4.31])
      this.box(section, "brass", x, y, z, 0.32, 0.07, 0.25, yaw);
    const glow = this.plane(
      section,
      this.haloTexture,
      x + Math.sin(yaw) * 0.18,
      3.85,
      z + Math.cos(yaw) * 0.18,
      3.8,
      5.1,
      yaw,
    );
    glow.material.blending = THREE.AdditiveBlending;
    glow.material.depthWrite = false;
  }

  bench(section, x, z, yaw = 0) {
    this.box(section, "wood", x, 0.3, z, 3.5, 0.5, 1.15, yaw);
    this.box(section, "velvet", x, 0.65, z, 3.65, 0.45, 1.25, yaw);
    this.box(
      section,
      "velvet",
      x + Math.sin(yaw) * 0.5,
      1.1,
      z + Math.cos(yaw) * 0.5,
      3.65,
      0.9,
      0.25,
      yaw,
    );
    for (const side of [-1, 1])
      this.box(
        section,
        "brass",
        x + Math.cos(yaw) * side * 1.72,
        0.75,
        z - Math.sin(yaw) * side * 1.72,
        0.1,
        0.12,
        1.3,
        yaw,
      );
  }

  buildEntrance(section) {
    this.box(section, "floor", 0, -0.12, 12, 10.3, 0.2, 14);
    this.box(section, "carpet", 0, 0.005, 12, 5.7, 0.02, 14);
    this.box(section, "ceiling", 0, 7.1, 12, 10.3, 0.2, 14);
    this.box(section, "wall", 0, 3.5, 19.2, 10.4, 7, 0.3);
    for (const side of [-1, 1]) {
      this.box(section, "wall", side * 5.15, 3.5, 12, 0.3, 7, 14);
      this.box(section, "brass", side * 2.8, 0.02, 12, 0.035, 0.025, 14);
      this.box(section, "trim", side * 4.94, 5.8, 12, 0.09, 0.1, 14);
      this.sconce(section, side * 4.9, 13, (-side * Math.PI) / 2);
    }
    this.box(section, "wood", 0, 2.3, 18.95, 4.7, 4.6, 0.15);
    this.box(section, "brass", 0, 2.3, 18.84, 0.05, 4.4, 0.1);
    this.sign(
      section,
      "AFTERHOURS",
      "A personal picture house · The entrance",
      0,
      5.45,
      18.9,
      7,
      1.7,
      Math.PI,
    );
    this.box(section, "wood", 0, 5.55, 1.35, 8.6, 1.55, 0.2);
    for (const y of [4.78, 6.32])
      this.box(section, "brass", 0, y, 1.5, 8.6, 0.035, 0.05);
    this.sign(
      section,
      "THE GRAND CONCOURSE",
      "Every year, another doorway.",
      0,
      5.53,
      1.51,
      8.1,
      1.65,
    );
  }

  buildConcourse(section, row) {
    const z = -row * ROW_SPACING - 6;
    this.box(section, "floor", 0, -0.12, z, 10.4, 0.2, 24);
    this.box(section, "carpet", 0, 0.005, z, 5.7, 0.02, 24);
    this.box(section, "ceiling", 0, 7.1, z, 10.5, 0.2, 24);
    for (const side of [-1, 1]) {
      this.box(section, "brass", side * 2.8, 0.025, z, 0.035, 0.025, 24);
      this.box(section, "trim", side * 2.65, 0.025, z, 0.015, 0.025, 24);
      this.box(section, "wood", side * 4.8, 3.5, z - 11, 0.4, 7, 0.65);
      this.box(section, "brass", side * 4.57, 3.5, z - 11, 0.08, 6.8, 0.7);
      this.box(section, "wall", side * 5.1, 3.5, z - 12, 0.3, 7, 4);
    }
    this.box(section, "wood", 0, 6.15, z - 11, 9.6, 1.3, 0.6);
    this.box(section, "brass", 0, 5.52, z - 10.68, 9.6, 0.045, 0.1);
    this.box(section, "brass", 0, 6.65, z - 10.68, 9.6, 0.045, 0.1);
    for (const offset of [-6, 5]) {
      this.box(section, "brass", 0, 6.82, z + offset, 2.8, 0.12, 1.7);
      this.box(section, "light", 0, 6.73, z + offset, 2.6, 0.06, 1.5);
      for (let i = -1; i <= 1; i++)
        this.box(
          section,
          "brass",
          i * 0.65,
          6.68,
          z + offset,
          0.045,
          0.07,
          1.5,
        );
    }
    const next = this.layout.rooms[(row + 1) * 2];
    this.sign(
      section,
      next ? "MORE STORIES AHEAD" : "THE ARCHIVE CONTINUES WITH YOU",
      next
        ? `${next.label}  ·  Follow the concourse`
        : "Room for a lifetime of cinema",
      0,
      6.08,
      z - 10.6,
      7,
      1.1,
    );
    for (let dz = -10; dz < 12; dz += 3)
      for (const x of [-1.7, 0, 1.7])
        this.box(
          section,
          "trim",
          x,
          0.022,
          z + dz,
          0.075,
          0.025,
          0.075,
          Math.PI / 4,
        );
    if (row === this.layout.rows - 1) {
      this.box(section, "wall", 0, 3.5, this.layout.minZ - 0.15, 10.4, 7, 0.3);
      this.sign(
        section,
        "To be continued.",
        "Your next favorite film is still out there.",
        0,
        3.3,
        this.layout.minZ + 0.05,
        7,
        1.8,
      );
    }
  }

  buildGallery(section, room) {
    const { side, x, z } = room;
    this.box(section, "floor", x, -0.12, z, 16, 0.2, 20);
    this.box(section, "carpet", x, 0.008, z, 14.9, 0.02, 18.9);
    this.box(section, "ceiling", x, 7.1, z, 16.3, 0.2, 20.3);
    this.box(section, "wall", side * 21.1, 3.5, z, 0.2, 7, 20.3);
    for (const dir of [-1, 1]) {
      this.box(section, "wall", x, 3.5, z + dir * 10.1, 16.3, 7, 0.2);
      this.box(section, "wall", side * 5.08, 3.5, z + dir * 7.25, 0.18, 7, 5.5);
      this.box(
        section,
        "wood",
        side * 4.85,
        3.15,
        z + dir * 4.5,
        0.55,
        6.3,
        0.35,
      );
      this.box(
        section,
        "brass",
        side * 4.53,
        3.15,
        z + dir * 4.5,
        0.08,
        6.3,
        0.13,
      );
      this.box(section, "wood", x, 0.6, z + dir * 9.91, 15.9, 1.2, 0.12);
      this.box(section, "brass", x, 1.2, z + dir * 9.83, 15.9, 0.05, 0.1);
      this.box(section, "trim", x, 5.85, z + dir * 9.85, 15.9, 0.09, 0.1);
      this.box(section, "trim", x, 0.027, z + dir * 9.13, 14.5, 0.025, 0.04);
      // Drawn-back velvet drapes frame a genuinely open doorway.
      for (let i = 0; i < 5; i++)
        this.box(
          section,
          i % 2 ? "carpet" : "velvet",
          side * 5.35,
          2.8,
          z + dir * (4.6 + i * 0.17),
          0.35,
          5.6,
          0.2,
        );
    }
    this.box(section, "wall", side * 5.08, 6.55, z, 0.2, 0.9, 9.1);
    this.box(section, "wood", side * 4.8, 5.65, z, 0.6, 0.9, 9.3);
    this.box(section, "brass", side * 4.45, 5.18, z, 0.08, 0.04, 9.3);
    this.sign(
      section,
      room.title,
      `${room.subtitle} · ${room.films.length} ${room.type === "watchlist" ? "on your list" : "films"}`,
      side * 4.42,
      5.68,
      z,
      7.5,
      1.3,
      (-side * Math.PI) / 2,
    );
    this.sign(
      section,
      room.type === "year"
        ? room.year
        : room.type === "watchlist"
          ? "UP NEXT"
          : "LOUNGE",
      room.type === "year"
        ? `Gallery ${room.part} · ${room.films.length} films`
        : "Make yourself at home",
      side * 4.93,
      3.25,
      z + 6.8,
      3.2,
      2.1,
      (-side * Math.PI) / 2,
    );
    this.sign(
      section,
      room.title,
      room.type === "year"
        ? `WATCHED IN ${room.year} · ${room.subtitle}`
        : room.subtitle,
      x,
      5.95,
      z - 9.88,
      10,
      1.45,
    );
    this.box(section, "wood", side * 20.93, 0.6, z, 0.1, 1.2, 20);
    this.box(section, "brass", side * 20.85, 1.2, z, 0.1, 0.05, 20);
    this.box(section, "trim", side * 20.85, 5.85, z, 0.1, 0.09, 20);
    for (const xx of [-6, 6])
      this.box(section, "trim", x + xx, 6.96, z, 0.08, 0.12, 19.6);
    for (const zz of [-7, 0, 7])
      this.box(section, "wood", x, 6.95, z + zz, 16, 0.18, 0.2);
    this.box(section, "brass", x, 6.7, z, 3.1, 0.1, 3.1);
    this.box(section, "light", x, 6.6, z, 2.85, 0.08, 2.85);
    for (const zz of [-7.1, 7.1])
      this.sconce(section, side * 5.25, z + zz, (side * Math.PI) / 2);
    for (const xx of [9.075, 12.825, 16.575])
      this.sconce(section, side * xx, z - 9.72);
    for (const dz of [-4.5, 0, 4.5])
      this.sconce(section, side * 20.8, z + dz, (-side * Math.PI) / 2);
    // A bench is a landmark in every gallery. Keep the walking route clear.
    this.bench(section, side * 7.3, z + 7.8);
    const slots = posterSlots(room);
    for (const slot of slots) {
      const nx = Math.sin(slot.yaw),
        nz = Math.cos(slot.yaw);
      this.box(
        section,
        "wood",
        slot.x - nx * 0.06,
        3.25,
        slot.z - nz * 0.06,
        3.55,
        5.05,
        0.06,
        slot.yaw,
      );
      this.box(
        section,
        "panel",
        slot.x - nx * 0.01,
        3.25,
        slot.z - nz * 0.01,
        3.39,
        4.87,
        0.035,
        slot.yaw,
      );
      for (const offset of [-1.76, 1.76])
        this.box(
          section,
          "trim",
          slot.x + Math.cos(slot.yaw) * offset,
          3.25,
          slot.z - Math.sin(slot.yaw) * offset,
          0.035,
          5.08,
          0.06,
          slot.yaw,
        );
      this.box(
        section,
        "trim",
        slot.x,
        5.77,
        slot.z,
        3.55,
        0.035,
        0.06,
        slot.yaw,
      );
    }
    for (let dx = -5; dx <= 5; dx += 2.5)
      for (let dz = -7.5; dz <= 7.5; dz += 2.5)
        this.box(
          section,
          "trim",
          x + dx,
          0.025,
          z + dz,
          0.055,
          0.025,
          0.055,
          Math.PI / 4,
        );
    room.films.forEach((film, i) =>
      this.buildPoster(section, room, film, slots[i]),
    );
    if (!room.films.length) {
      this.sign(
        section,
        room.type === "lounge"
          ? "The credits have rolled."
          : "The best is yet to come.",
        room.type === "lounge"
          ? "Let the feeling stay a little longer."
          : "New films and viewing years get their own galleries.",
        x,
        3.3,
        z - 9.75,
        12,
        3,
      );
      this.bench(section, x - 3, z - 5, Math.PI);
      this.bench(section, x + 3, z - 5, Math.PI);
      this.box(section, "wood", x, 0.45, z - 2.8, 2.5, 0.9, 1.5);
      this.box(section, "brass", x, 0.93, z - 2.8, 2.55, 0.04, 1.55);
    }
  }

  fallbackTexture(section, film) {
    return this.canvasTexture(section, 320, 480, (ctx, w, h) => {
      ctx.fillStyle = film.color || "#75634f";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#c6b184";
      ctx.strokeRect(16, 16, w - 32, h - 32);
      ctx.strokeRect(21, 21, w - 42, h - 42);
      ctx.globalAlpha = 0.22;
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.arc(w / 2, 210, 35 + i * 18, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#f0e2c7";
      ctx.textAlign = "center";
      ctx.font = "9px sans-serif";
      ctx.fillText("A F T E R H O U R S   P R E S E N T S", w / 2, 60);
      ctx.font = "25px Georgia";
      const lines = this.wrapText(ctx, film.title, 260);
      lines.forEach((line, i) => ctx.fillText(line, w / 2, 210 + i * 32));
      ctx.font = "13px sans-serif";
      ctx.fillText(String(film.year || ""), w / 2, 430);
    });
  }

  wrapText(ctx, text, width) {
    const lines = [];
    let line = "";
    String(text)
      .split(" ")
      .forEach((word) => {
        if (line && ctx.measureText(`${line} ${word}`).width > width) {
          lines.push(line);
          line = word;
        } else line += `${line ? " " : ""}${word}`;
      });
    if (line) lines.push(line);
    return lines.slice(0, 4);
  }

  buildPoster(section, room, film, slot) {
    const { x, z, yaw } = slot;
    const normal = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
    this.box(section, "wood", x, 3.35, z, 2.86, 4.06, 0.2, yaw);
    this.box(
      section,
      "brass",
      x + normal.x * 0.11,
      3.35,
      z + normal.z * 0.11,
      2.76,
      3.96,
      0.07,
      yaw,
    );
    const fallback = this.fallbackTexture(section, film);
    const mesh = this.plane(
      section,
      fallback,
      x + normal.x * 0.16,
      3.35,
      z + normal.z * 0.16,
      2.6,
      3.8,
      yaw,
    );
    mesh.userData.filmId = film.id;
    mesh.userData.nonBlocking = false;
    if (film.image)
      new THREE.TextureLoader().load(
        poster(film.image),
        (texture) => {
          if (section.disposed) {
            texture.dispose();
            return;
          }
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = Math.min(
            this.renderer.capabilities.getMaxAnisotropy(),
            4,
          );
          section.textures.add(texture);
          mesh.material.map = texture;
          mesh.material.needsUpdate = true;
          fallback.dispose();
          section.textures.delete(fallback);
        },
        undefined,
        () => {},
      );
    const plaque = this.canvasTexture(section, 512, 160, (ctx, width) => {
      ctx.textAlign = "center";
      ctx.fillStyle = "#e2d7bf";
      ctx.font = "24px Georgia";
      const lines = this.wrapText(ctx, film.title, 485);
      lines
        .slice(0, 2)
        .forEach((line, i) => ctx.fillText(line, width / 2, 39 + i * 29));
      ctx.fillStyle = "#b6a68d";
      ctx.font = "13px sans-serif";
      ctx.fillText(`${film.year}  ·  ${film.director}`, width / 2, 105, 490);
      ctx.fillStyle = "#c5a66c";
      ctx.font = "17px Georgia";
      ctx.fillText(
        film.status === "watched"
          ? `${"★".repeat(Math.max(0, Math.min(5, Math.floor(film.rating || 0))))}  ${film.rating || "Unrated"}`
          : "COMING ATTRACTIONS",
        width / 2,
        140,
      );
    });
    this.plane(
      section,
      plaque,
      x + normal.x * 0.17,
      0.94,
      z + normal.z * 0.17,
      3.05,
      0.95,
      yaw,
    );
    const btn = document.createElement("button");
    btn.className = "archive-poster-button";
    btn.setAttribute("aria-label", `Open journal for ${film.title}`);
    btn.textContent = "OPEN JOURNAL ↗";
    btn.hidden = true;
    btn.onclick = () => this.onSelect(film.id);
    this.labels.appendChild(btn);
    const entry = { mesh, btn, film, normal, room, section };
    section.posters.push(entry);
    this.posters.push(entry);
  }

  streamRooms() {
    const row = THREE.MathUtils.clamp(
      Math.round((-this.position.z - 6) / ROW_SPACING),
      0,
      this.layout.rows - 1,
    );
    if (row === this.currentRow) return;
    this.currentRow = row;
    for (const [index, section] of this.activeRows) {
      if (Math.abs(index - row) > ACTIVE_ROW_RADIUS) {
        this.disposeSection(section);
        this.activeRows.delete(index);
      }
    }
    for (
      let index = Math.max(0, row - ACTIVE_ROW_RADIUS);
      index <= Math.min(this.layout.rows - 1, row + ACTIVE_ROW_RADIUS);
      index++
    ) {
      if (this.activeRows.has(index)) continue;
      const section = this.makeSection();
      this.buildConcourse(section, index);
      this.layout.rooms
        .slice(index * 2, index * 2 + 2)
        .forEach((room) => this.buildGallery(section, room));
      this.flushBoxes(section);
      this.activeRows.set(index, section);
    }
    this.scene.updateMatrixWorld(true);
  }

  getState() {
    const room = roomAtPosition(this.layout, this.position.x, this.position.z);
    return {
      x: this.position.x,
      z: this.position.z,
      yaw: this.yaw,
      pitch: this.pitch,
      roomId: room?.id,
      roomSide: room?.side,
      localX: room ? this.position.x - room.x : 0,
      localZ: room ? this.position.z - room.z : 0,
    };
  }

  restoreState(state) {
    const room = this.layout.rooms.find((r) => r.id === state.roomId);
    if (state.roomId && !room) return;
    const mirror = room && state.roomSide ? room.side / state.roomSide : 1;
    const x = room ? room.x + (state.localX || 0) * mirror : state.x;
    const z = room ? room.z + state.localZ : state.z;
    if (isWalkable(this.layout, x, z)) {
      this.position.set(x, EYE_HEIGHT, z);
      this.yaw = (state.yaw || 0) * mirror;
      this.pitch = state.pitch || 0;
    }
  }

  goToRoom(id) {
    const room = this.layout.rooms.find((r) => r.id === id);
    if (!room) return;
    this.position.set(room.x, EYE_HEIGHT, room.z + 5.4);
    this.yaw = 0;
    this.pitch = 0.04;
    this.keys.clear();
    this.streamRooms();
    this.updateCamera();
    this.publishPosition();
  }

  goToFilm(id) {
    const room = this.layout.rooms.find((r) =>
      r.films.some((f) => f.id === id),
    );
    if (!room) return;
    const slot = posterSlots(room)[room.films.findIndex((f) => f.id === id)];
    this.position.set(
      slot.x + Math.sin(slot.yaw) * 5,
      EYE_HEIGHT,
      slot.z + Math.cos(slot.yaw) * 5,
    );
    this.yaw = slot.yaw;
    this.pitch = 0.2;
    this.keys.clear();
    this.streamRooms();
    this.updateCamera();
    this.publishPosition();
  }

  reset() {
    this.position.set(0, EYE_HEIGHT, 10);
    this.yaw = 0;
    this.pitch = 0;
    this.keys.clear();
    this.streamRooms();
    this.updateCamera();
    this.publishPosition();
  }

  setPaused(paused) {
    this.paused = paused;
    this.keys.clear();
  }

  bindEvents() {
    const canvas = this.renderer.domElement;
    const signal = (this.abortController = new AbortController()).signal;
    let dragging = false,
      travel = 0,
      lastX = 0,
      lastY = 0;
    canvas.addEventListener(
      "pointerdown",
      (e) => {
        if (e.button !== 0 || this.paused) return;
        dragging = true;
        travel = 0;
        lastX = e.clientX;
        lastY = e.clientY;
        canvas.setPointerCapture(e.pointerId);
        canvas.focus({ preventScroll: true });
        canvas.classList.add("dragging");
      },
      { signal },
    );
    canvas.addEventListener(
      "pointermove",
      (e) => {
        this.pointer.set(e.clientX, e.clientY);
        if (!dragging || this.paused) return;
        const dx = e.clientX - lastX,
          dy = e.clientY - lastY;
        travel += Math.abs(dx) + Math.abs(dy);
        this.yaw += dx * 0.004;
        this.pitch = THREE.MathUtils.clamp(this.pitch + dy * 0.003, -0.7, 0.7);
        lastX = e.clientX;
        lastY = e.clientY;
      },
      { signal },
    );
    canvas.addEventListener(
      "pointerup",
      (e) => {
        if (dragging && travel < 7 && !this.paused) {
          const film = this.pickPoster(e.clientX, e.clientY);
          if (film) this.onSelect(film.id);
        }
        dragging = false;
        canvas.classList.remove("dragging");
      },
      { signal },
    );
    canvas.addEventListener(
      "pointercancel",
      () => {
        dragging = false;
        canvas.classList.remove("dragging");
      },
      { signal },
    );
    window.addEventListener(
      "keydown",
      (e) => {
        if (this.paused || document.body.classList.contains("modal-open"))
          return;
        const focused = document.activeElement;
        if (
          !this.container.parentElement.contains(focused) ||
          /INPUT|TEXTAREA|SELECT/.test(focused.tagName)
        )
          return;
        const key = e.key.toLowerCase();
        if (
          [
            "w",
            "a",
            "s",
            "d",
            "q",
            "e",
            "arrowup",
            "arrowdown",
            "arrowleft",
            "arrowright",
            "shift",
          ].includes(key)
        ) {
          e.preventDefault();
          this.keys.add(key);
        }
        if (key === "enter" && focused === canvas) {
          const rect = canvas.getBoundingClientRect();
          const film = this.pickPoster(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
          );
          if (film) this.onSelect(film.id);
        }
      },
      { signal },
    );
    window.addEventListener(
      "keyup",
      (e) => this.keys.delete(e.key.toLowerCase()),
      { signal },
    );
    window.addEventListener(
      "blur",
      () => {
        this.keys.clear();
        dragging = false;
      },
      { signal },
    );
    document.addEventListener("visibilitychange", () => this.keys.clear(), {
      signal,
    });
    this.container.parentElement
      .querySelectorAll("[data-move]")
      .forEach((button) => {
        button.addEventListener(
          "pointerdown",
          (e) => {
            e.preventDefault();
            button.setPointerCapture(e.pointerId);
            this.keys.add(button.dataset.move);
            button.classList.add("pressed");
          },
          { signal },
        );
        const release = () => {
          this.keys.delete(button.dataset.move);
          button.classList.remove("pressed");
        };
        button.addEventListener("pointerup", release, { signal });
        button.addEventListener("pointercancel", release, { signal });
        button.addEventListener("lostpointercapture", release, { signal });
      });
  }

  pickPoster(clientX, clientY) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.raycaster.setFromCamera(
      new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        (-(clientY - rect.top) / rect.height) * 2 + 1,
      ),
      this.camera,
    );
    const hit = this.raycaster
      .intersectObjects(this.scene.children, true)
      .find((hit) => !hit.object.userData.nonBlocking);
    return hit && hit.distance < 24
      ? this.posters.find((p) => p.mesh === hit.object)?.film
      : null;
  }

  move(dt) {
    if (this.keys.has("arrowleft") || this.keys.has("q")) this.yaw += dt * 1.4;
    if (this.keys.has("arrowright") || this.keys.has("e")) this.yaw -= dt * 1.4;
    let forward =
      Number(this.keys.has("w") || this.keys.has("arrowup")) -
      Number(this.keys.has("s") || this.keys.has("arrowdown"));
    let strafe = Number(this.keys.has("d")) - Number(this.keys.has("a"));
    const length = Math.hypot(forward, strafe);
    if (!length) return;
    forward /= length;
    strafe /= length;
    const speed = (this.keys.has("shift") ? 9 : 4.8) * dt;
    const dx =
      (-Math.sin(this.yaw) * forward + Math.cos(this.yaw) * strafe) * speed;
    const dz =
      (-Math.cos(this.yaw) * forward - Math.sin(this.yaw) * strafe) * speed;
    // Axis-separated collision permits sliding along walls instead of sticking.
    // Substeps prevent fast walking from tunneling through doorway edges.
    const steps = Math.max(1, Math.ceil(speed / 0.12));
    for (let i = 0; i < steps; i++) {
      if (
        isWalkable(this.layout, this.position.x + dx / steps, this.position.z)
      )
        this.position.x += dx / steps;
      if (
        isWalkable(this.layout, this.position.x, this.position.z + dz / steps)
      )
        this.position.z += dz / steps;
    }
    this.streamRooms();
  }

  updateCamera() {
    this.camera.position.copy(this.position);
    this.camera.rotation.set(this.pitch, this.yaw, 0, "YXZ");
    this.camera.updateMatrixWorld();
  }

  publishPosition() {
    const room = roomAtPosition(this.layout, this.position.x, this.position.z);
    this.container.dataset.room = room?.id || "concourse";
    this.container.dataset.position = `${this.position.x.toFixed(2)},${this.position.z.toFixed(2)}`;
    this.container.dataset.activeRooms = String(this.activeRows.size * 2);
    this.onMove?.({
      x: this.position.x,
      z: this.position.z,
      yaw: this.yaw,
      room,
      row: this.currentRow,
    });
    const width = this.container.clientWidth,
      height = this.container.clientHeight;
    for (const p of this.posters) {
      p.btn.hidden = true;
      if (this.paused || document.body.classList.contains("modal-open"))
        continue;
      if (room?.id !== p.room.id) continue;
      const toCamera = this.position.clone().sub(p.mesh.position);
      if (toCamera.dot(p.normal) < 0 || toCamera.length() > 23) continue;
      const point = p.mesh.position.clone().project(this.camera);
      if (
        point.z > 1 ||
        point.z < -1 ||
        Math.abs(point.x) > 0.9 ||
        Math.abs(point.y) > 0.78
      )
        continue;
      p.btn.hidden = false;
      p.btn.style.left = `${((point.x + 1) * width) / 2}px`;
      p.btn.style.top = `${((-point.y + 1) * height) / 2}px`;
    }
  }

  resize() {
    const w = this.container.clientWidth,
      h = this.container.clientHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.fov = w < 650 ? 76 : 62;
    this.camera.updateProjectionMatrix();
  }

  animate = () => {
    if (this.disposed) return;
    this.frame = requestAnimationFrame(this.animate);
    const now = performance.now(),
      dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;
    if (document.hidden) return;
    if (document.body.classList.contains("modal-open") || this.paused)
      this.keys.clear();
    else this.move(dt);
    this.updateCamera();
    this.renderer.render(this.scene, this.camera);
    if (now - this.lastUIUpdate > 100) {
      this.publishPosition();
      this.lastUIUpdate = now;
    }
  };

  disposeSection(section) {
    section.disposed = true;
    section.group.removeFromParent();
    section.group.traverse((object) => {
      if (object.isInstancedMesh) object.dispose();
    });
    section.textures.forEach((texture) => texture.dispose());
    section.materials.forEach((material) => material.dispose());
    section.posters.forEach((p) => p.btn.remove());
    this.posters = this.posters.filter((p) => p.section !== section);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.abortController.abort();
    this.resizeObserver.disconnect();
    this.cleanupUI?.();
    this.activeRows.forEach((section) => this.disposeSection(section));
    this.disposeSection(this.entrance);
    Object.values(this.materials).forEach((material) => material.dispose());
    this.boxGeometry.dispose();
    this.planeGeometry.dispose();
    this.haloTexture.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
    this.labels.replaceChildren();
  }
}
