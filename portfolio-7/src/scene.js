import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { careers, technologies } from "./data.js";

const CYAN = new THREE.Color("#19e6e1");
const GREEN = new THREE.Color("#65f0b5");
const GOLD = new THREE.Color("#ffbd56");

function randomGenerator(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let n = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    n = (n + Math.imul(n ^ (n >>> 7), 61 | n)) ^ n;
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
  };
}

export class CareerScene {
  constructor(container, { reducedMotion, onLayout }) {
    this.container = container;
    this.reducedMotion = reducedMotion;
    this.onLayout = onLayout;
    this.width = container.clientWidth;
    this.height = container.clientHeight;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#050c12");
    this.scene.fog = new THREE.FogExp2("#050c12", 0.017);
    this.camera = new THREE.PerspectiveCamera(
      43,
      this.width / this.height,
      0.1,
      230,
    );
    this.camera.position.set(9, 20, 29);
    this.camera.lookAt(0, 0, -5);
    this.camera.updateMatrixWorld();
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.setSize(this.width, this.height);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    container.appendChild(this.renderer.domElement);

    const renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
      type: THREE.HalfFloatType,
      samples: 4,
    });
    this.composer = new EffectComposer(this.renderer, renderTarget);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(this.width, this.height),
      0.65,
      0.45,
      0.85,
    );
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
    this.scene.add(new THREE.HemisphereLight("#709bb9", "#071019", 1.6));
    const key = new THREE.DirectionalLight("#a0c5d2", 2.6);
    key.position.set(-8, 20, -8);
    this.scene.add(key);
    const rim = new THREE.DirectionalLight("#258ba5", 0.75);
    rim.position.set(20, 8, 20);
    this.scene.add(rim);
    this.createBoard();
    this.mapGroup = new THREE.Group();
    this.scene.add(this.mapGroup);
    this.raycaster = new THREE.Raycaster();
    this.ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.16);
    this.clock = new THREE.Clock();
    this.activeIndex = -1;
    this.createMap();
    this.animate = this.animate.bind(this);
    this.renderer.setAnimationLoop(this.animate);
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.handleVisibility = () =>
      this.renderer.setAnimationLoop(document.hidden ? null : this.animate);
    document.addEventListener("visibilitychange", this.handleVisibility);
  }

  createBoard() {
    const random = randomGenerator(1049);
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(220, 220),
      new THREE.MeshStandardMaterial({
        color: "#040b12",
        roughness: 0.72,
        metalness: 0.65,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.075;
    this.scene.add(floor);

    const tiles = [];
    const edges = [];
    const insets = [];
    const line = (array, x1, z1, x2, z2, y = 0.025) =>
      array.push(x1, y, z1, x2, y, z2);
    for (let x = -52; x < 52; x += 2.7) {
      for (let z = -90; z < 45; z += 2.15) {
        if (random() < 0.045) continue;
        const w = 2.47 - random() * 0.13;
        const d = 1.92 - random() * 0.13;
        const h = 0.035 + random() * 0.09;
        tiles.push({ x, z, w, d, h, shade: 0.45 + random() * 1.1 });
        line(edges, x, z, x + w, z, h);
        line(edges, x + w, z, x + w, z + d, h);
        line(edges, x + w, z + d, x, z + d, h);
        line(edges, x, z + d, x, z, h);
        if (random() > 0.53) {
          const margin = 0.11;
          line(
            insets,
            x + margin,
            z + margin,
            x + w - margin,
            z + margin,
            h + 0.004,
          );
          line(
            insets,
            x + w - margin,
            z + margin,
            x + w - margin,
            z + d - margin,
            h + 0.004,
          );
        }
      }
    }
    const tileMaterial = new THREE.MeshStandardMaterial({
      color: "#12212a",
      metalness: 0.55,
      roughness: 0.52,
    });
    const tileMesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      tileMaterial,
      tiles.length,
    );
    const transform = new THREE.Object3D();
    tiles.forEach((tile, i) => {
      transform.position.set(
        tile.x + tile.w / 2,
        tile.h / 2 - 0.022,
        tile.z + tile.d / 2,
      );
      transform.scale.set(tile.w, tile.h, tile.d);
      transform.updateMatrix();
      tileMesh.setMatrixAt(i, transform.matrix);
      tileMesh.setColorAt(i, new THREE.Color().setScalar(tile.shade));
    });
    this.scene.add(tileMesh);
    this.addSegments(edges, "#344e59", 0.3);
    this.addSegments(insets, "#41555d", 0.24);

    const tracks = [[], [], []];
    const dotPositions = [];
    const dotColors = [];
    for (let i = 0; i < 430; i++) {
      let x = (random() - 0.5) * 110;
      let z = random() * 125 - 85;
      const group = random() < 0.085 ? 2 : random() > 0.6 ? 1 : 0;
      const length = 2 + Math.floor(random() * 5);
      for (let j = 0; j < length; j++) {
        const nx =
          x +
          (j % 2 === 0 ? (random() * 4 + 0.3) * (random() > 0.5 ? 1 : -1) : 0);
        const nz =
          z +
          (j % 2 === 1 ? (random() * 4 + 0.3) * (random() > 0.5 ? 1 : -1) : 0);
        line(tracks[group], x, z, nx, nz, 0.095);
        if (random() > 0.6) {
          line(
            tracks[group],
            x + 0.075,
            z + 0.075,
            nx + 0.075,
            nz + 0.075,
            0.095,
          );
        }
        x = nx;
        z = nz;
      }
      if (random() < 0.6) {
        dotPositions.push(x, 0.12, z);
        const color = new THREE.Color(
          group === 2 ? "#f8bb60" : group === 1 ? "#13b9da" : "#119bad",
        );
        color.multiplyScalar(group === 2 ? 3.2 : 2.8);
        dotColors.push(color.r, color.g, color.b);
      }
    }
    this.addSegments(tracks[0], "#0b5a72", 0.3);
    this.addSegments(tracks[1], "#1485a4", 0.4);
    this.addSegments(tracks[2], "#967348", 0.4);

    // Dense rows of tiny solder contacts make the ground a physical circuit board.
    const vias = [];
    const contactLines = [];
    const chips = [];
    for (let i = 0; i < 420; i++) {
      const x = (random() - 0.5) * 96;
      const z = random() * 105 - 66;
      const count = 5 + Math.floor(random() * 13);
      const horizontal = random() > 0.5;
      for (let j = 0; j < count; j++) {
        const px = x + (horizontal ? j * 0.16 : 0);
        const pz = z + (horizontal ? 0 : j * 0.16);
        vias.push(px, 0.1, pz);
        if (random() > 0.84) {
          dotPositions.push(px, 0.105, pz);
          const color = new THREE.Color("#0a738b").multiplyScalar(
            0.5 + random(),
          );
          dotColors.push(color.r, color.g, color.b);
        }
      }
      if (i % 3 === 0) {
        chips.push({ x, z });
        for (let k = 0; k < 7; k++) {
          line(
            contactLines,
            x - 0.52,
            z - 0.36 + k * 0.12,
            x - 0.65,
            z - 0.36 + k * 0.12,
            0.14,
          );
          line(
            contactLines,
            x + 0.52,
            z - 0.36 + k * 0.12,
            x + 0.65,
            z - 0.36 + k * 0.12,
            0.14,
          );
        }
      }
    }
    const chipMesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 0.1, 0.84),
      new THREE.MeshStandardMaterial({
        color: "#030c13",
        roughness: 0.42,
        metalness: 0.6,
      }),
      chips.length,
    );
    chips.forEach(({ x, z }, i) => {
      transform.position.set(x, 0.12, z);
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      chipMesh.setMatrixAt(i, transform.matrix);
    });
    this.scene.add(chipMesh);
    this.addSegments(contactLines, "#39545b", 0.65);
    this.addDots(vias, null, "#143542", 0.07);
    this.addDots(dotPositions, dotColors, "#ffffff", 0.135);
  }

  addSegments(vertices, color, opacity, parent = this.scene) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
    });
    const mesh = new THREE.LineSegments(geometry, material);
    parent.add(mesh);
    return mesh;
  }

  addDots(positions, colors, color, size, parent = this.scene) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    if (colors)
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3),
      );
    const material = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity: 0.9,
      vertexColors: !!colors,
      depthWrite: false,
    });
    material.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <clipping_planes_fragment>",
        "#include <clipping_planes_fragment>\nfloat radius = length(gl_PointCoord - vec2(0.5));\nif (radius > 0.5) discard;",
      );
    };
    const points = new THREE.Points(geometry, material);
    parent.add(points);
    return points;
  }

  screenToWorld(x, y, elevation = 0.16) {
    this.raycaster.setFromCamera(
      new THREE.Vector2(x * 2 - 1, 1 - y * 2),
      this.camera,
    );
    this.ground.constant = -elevation;
    return (
      this.raycaster.ray.intersectPlane(this.ground, new THREE.Vector3()) ||
      new THREE.Vector3()
    );
  }

  pathColor(t) {
    if (t < 0.53) return CYAN.clone();
    if (t < 0.69) return CYAN.clone().lerp(GREEN, (t - 0.53) / 0.16);
    return GREEN.clone().lerp(GOLD, Math.min((t - 0.69) / 0.13, 1));
  }

  createMap() {
    this.mapGroup.traverse((object) => {
      object.geometry?.dispose();
      if (object.material) object.material.dispose();
    });
    this.mapGroup.clear();
    const mobile = this.width < 700;
    const positions = careers.map((career) =>
      mobile ? career.mobilePosition : career.position,
    );
    const [a, b, c, d] = positions;
    const points = mobile
      ? [
          [-0.1, 1.04],
          a,
          [0.22, 0.855],
          b,
          [0.48, 0.69],
          c,
          [0.7, 0.535],
          [0.74, 0.43],
          d,
          [0.88, 0.345],
          [0.78, 0.31],
          [0.94, 0.28],
          [1.1, 0.26],
        ]
      : [
          [-0.06, 1.01],
          [0.065, 0.85],
          a,
          [0.161, 0.81],
          [0.28, 0.703],
          b,
          [0.455, 0.614],
          [0.56, 0.526],
          c,
          [0.683, 0.463],
          [0.725, 0.382],
          [0.79, 0.306],
          [0.845, 0.267],
          [0.8, 0.241],
          d,
          [0.99, 0.18],
          [1.1, 0.17],
        ];
    this.curve = new THREE.CatmullRomCurve3(
      points.map(([x, y]) => this.screenToWorld(x, y)),
      false,
      "centripetal",
      0.18,
    );
    const pathGeometry = new THREE.TubeGeometry(
      this.curve,
      600,
      mobile ? 0.034 : 0.042,
      8,
      false,
    );
    const pathColors = [];
    const vertices = pathGeometry.attributes.position;
    const vertex = new THREE.Vector3();
    for (let i = 0; i <= 600; i++) {
      const center = this.curve.getPointAt(i / 600);
      const screen = center.clone().project(this.camera);
      const color = this.pathColor((screen.x + 1) / 2).multiplyScalar(1.7);
      const size = this.camera.position.distanceTo(center) / 30;
      for (let j = 0; j <= 8; j++) {
        pathColors.push(color.r, color.g, color.b);
        vertex
          .fromBufferAttribute(vertices, i * 9 + j)
          .sub(center)
          .multiplyScalar(size)
          .add(center);
        vertices.setXYZ(i * 9 + j, vertex.x, vertex.y, vertex.z);
      }
    }
    pathGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(pathColors, 3),
    );
    this.mapGroup.add(
      new THREE.Mesh(
        pathGeometry,
        new THREE.MeshBasicMaterial({ vertexColors: true, fog: false }),
      ),
    );

    // A wide, transparent ribbon gives the light a soft reflection on the board.
    const ribbonGeometry = new THREE.TubeGeometry(
      this.curve,
      320,
      0.14,
      6,
      false,
    );
    const ribbonMaterial = new THREE.MeshBasicMaterial({
      color: "#07d8cb",
      transparent: true,
      opacity: 0.028,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.mapGroup.add(new THREE.Mesh(ribbonGeometry, ribbonMaterial));

    this.rings = [];
    this.halos = [];
    this.nodeLights = [];
    positions.forEach(([x, y], i) => {
      const world = this.screenToWorld(x, y);
      const distance = this.camera.position.distanceTo(world);
      const scale = distance * (mobile ? 0.015 : 0.013);
      const color = (i === 3 ? GOLD : CYAN).clone().multiplyScalar(1.9);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(scale, scale * 0.12, 10, 64),
        new THREE.MeshBasicMaterial({ color, fog: false }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.copy(world);
      ring.position.y += 0.09;
      this.mapGroup.add(ring);
      this.rings.push(ring);
      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(scale * 0.85, 48),
        new THREE.MeshBasicMaterial({ color: "#07252b", fog: false }),
      );
      disc.rotation.x = -Math.PI / 2;
      disc.position.copy(ring.position);
      disc.position.y -= 0.006;
      this.mapGroup.add(disc);
      const center = new THREE.Mesh(
        new THREE.CircleGeometry(scale * 0.23, 24),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color("#affff0").multiplyScalar(1.8),
          fog: false,
        }),
      );
      center.rotation.x = -Math.PI / 2;
      center.position.copy(ring.position);
      center.position.y += 0.004;
      this.mapGroup.add(center);
      const outerRing = new THREE.Mesh(
        new THREE.RingGeometry(scale * 1.4, scale * 1.45, 48),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.19,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      outerRing.rotation.x = -Math.PI / 2;
      outerRing.position.copy(ring.position);
      this.mapGroup.add(outerRing);
      this.halos.push(outerRing);
      const light = new THREE.PointLight(
        i === 3 ? "#ffc472" : "#09e8cd",
        4,
        3.5,
        1.5,
      );
      light.position.copy(world);
      light.position.y += 0.35;
      this.mapGroup.add(light);
      this.nodeLights.push(light);

      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: { glowColor: { value: (i === 3 ? GOLD : CYAN).clone() } },
        vertexShader:
          "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
        fragmentShader:
          "varying vec2 vUv; uniform vec3 glowColor; void main(){ float d = length(vUv - 0.5) * 2.0; float a = pow(max(0.0, 1.0 - d), 3.0); gl_FragColor = vec4(glowColor, a * 0.16); }",
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const glowPool = new THREE.Mesh(
        new THREE.PlaneGeometry(scale * 17, scale * 17),
        glowMaterial,
      );
      glowPool.rotation.x = -Math.PI / 2;
      glowPool.position.copy(world);
      glowPool.position.y = 0.135;
      this.mapGroup.add(glowPool);

      if (i < 3) {
        const stemEnd = this.screenToWorld(
          x,
          y - (mobile ? 0.027 : 0.04),
          0.16,
        );
        const stem = [
          world.x,
          world.y,
          world.z,
          stemEnd.x,
          stemEnd.y + 0.08,
          stemEnd.z,
        ];
        this.addSegments(stem, "#31eadd", 0.85, this.mapGroup);
        this.addDots(
          [stemEnd.x, stemEnd.y + 0.08, stemEnd.z],
          null,
          "#60fff2",
          0.105,
          this.mapGroup,
        );
      }
    });

    if (!mobile)
      technologies.forEach((tech) => {
        const [tx, ty] = tech.position;
        const [ox, oy] = tech.origin;
        const below = ty > oy;
        const endpoint = [tx, ty + 0.014];
        const bendY = below ? ty - 0.09 : ty + 0.092;
        const middleX = ox + (tx - ox) * 0.6;
        const coordinates = [
          [ox, oy],
          [middleX, oy + (below ? 0.045 : -0.04)],
          [middleX, bendY],
          [tx, bendY + (below ? 0.04 : 0.025)],
          endpoint,
        ];
        const worldPoints = coordinates.map(([x, y]) =>
          this.screenToWorld(x, y, 0.13),
        );
        const segments = [];
        for (let j = 1; j < worldPoints.length; j++)
          segments.push(
            ...worldPoints[j - 1].toArray(),
            ...worldPoints[j].toArray(),
          );
        this.addSegments(segments, tech.color, 0.6, this.mapGroup);
        const dots = worldPoints.slice(1).flatMap((p) => p.toArray());
        this.addDots(dots, null, tech.color, 0.08, this.mapGroup);
        const finalPoint = worldPoints.at(-1);
        const glow = new THREE.Mesh(
          new THREE.SphereGeometry(0.055, 8, 6),
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(tech.color).multiplyScalar(1.7),
          }),
        );
        glow.position.copy(finalPoint);
        this.mapGroup.add(glow);
      });

    this.travelers = [];
    for (let i = 0; i < 3; i++) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 6),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color("#d5fff7").multiplyScalar(3),
          transparent: true,
          opacity: 0.85,
        }),
      );
      this.mapGroup.add(mesh);
      this.travelers.push(mesh);
    }
    this.onLayout(positions);
  }

  select(index) {
    this.activeIndex = index;
    if (this.reducedMotion) this.renderFrame(0);
  }

  resize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.createMap();
    this.renderFrame(0);
  }

  renderFrame(time) {
    this.halos.forEach((halo, i) => {
      const selected = this.activeIndex === i;
      const pulse = this.reducedMotion
        ? 1
        : Math.sin(time * 1.5 - i * 0.9) * 0.15 + 1;
      halo.scale.setScalar(pulse * (selected ? 1.5 : 1));
      halo.material.opacity = selected ? 0.35 : 0.1 + pulse * 0.035;
      this.nodeLights[i].intensity = selected ? 1.6 : 0.65;
    });
    this.travelers.forEach((particle, i) => {
      const t = ((time * 0.022 + i / 3) % 0.94) + 0.02;
      particle.position.copy(this.curve.getPointAt(t));
      const screenX =
        (particle.position.clone().project(this.camera).x + 1) / 2;
      particle.material.color.copy(this.pathColor(screenX).multiplyScalar(2.5));
      particle.visible = !this.reducedMotion;
    });
    this.composer.render();
  }

  animate() {
    if (this.reducedMotion && this.hasRendered) return;
    this.renderFrame(this.clock.getElapsedTime());
    this.hasRendered = true;
  }
}
