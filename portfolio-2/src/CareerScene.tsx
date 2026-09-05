import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Atom,
  Infinity as InfinityIcon,
  Layers3,
  RotateCcw,
} from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { milestones, sceneSkills } from "./data";

const positions = [
  new THREE.Vector3(-6.35, -2.05, 0),
  new THREE.Vector3(-2.15, -0.15, -0.12),
  new THREE.Vector3(2.15, 1.35, -0.24),
  new THREE.Vector3(6.55, 2.85, -0.36),
];

function SkillIcon({ name }: { name: string }) {
  if (name === "React") return <Atom size={29} strokeWidth={1.15} />;
  if (name === "System Design") return <Layers3 size={29} strokeWidth={1.15} />;
  if (name === "CI/CD") return <InfinityIcon size={31} strokeWidth={1.25} />;
  if (name === "TypeScript") return <span className="typescript-icon">TS</span>;
  if (name === "Node.js")
    return (
      <svg
        viewBox="0 0 32 36"
        width="28"
        height="31"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m16 1 14 8v18l-14 8L2 27V9Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <text
          x="8"
          y="24"
          fontSize="16"
          fontFamily="DM Sans, sans-serif"
          fill="currentColor"
        >
          JS
        </text>
      </svg>
    );
  return (
    <svg
      viewBox="0 0 36 36"
      width="30"
      height="30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m3 4 30 1-15 28L3 4Zm0 0 19 10-4 19m15-28L22 14 11 21M3 4l8 17"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CareerSceneProps = {
  onMilestoneSelect: (index: number) => void;
  onSkillSelect: (index: number) => void;
  paused: boolean;
};

export default function CareerScene({
  onMilestoneSelect,
  onSkillSelect,
  paused,
}: CareerSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const skillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const resetRef = useRef<() => void>(() => {});
  const pausedRef = useRef(paused);
  const selectionRef = useRef(onMilestoneSelect);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
  useEffect(() => {
    selectionRef.current = onMilestoneSelect;
  }, [onMilestoneSelect]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setFailed(true);
      return;
    }

    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-10.7, 10.7, 7, -7, 0.1, 100);
    camera.position.set(0.2, 0.4, 22);
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0.2, 0.4, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.065;
    controls.enablePan = false;
    controls.enableZoom = !coarsePointer.matches;
    controls.rotateSpeed = 0.45;
    controls.zoomSpeed = 0.4;
    controls.minZoom = 0.78;
    controls.maxZoom = 1.55;
    controls.minAzimuthAngle = -0.45;
    controls.maxAzimuthAngle = 0.45;
    controls.minPolarAngle = Math.PI / 2 - 0.3;
    controls.maxPolarAngle = Math.PI / 2 + 0.3;
    controls.touches.ONE = THREE.TOUCH.ROTATE;
    controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    canvas.style.touchAction = "pan-y";
    controls.update();
    controls.saveState();
    resetRef.current = () => {
      // Flush orbit inertia before restoring the saved camera.
      controls.enableDamping = false;
      controls.update();
      controls.reset();
      controls.enableDamping = true;
    };
    let needsRender = true;
    controls.addEventListener("change", () => {
      needsRender = true;
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    renderer.setClearColor(0x030709, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const renderTarget = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.HalfFloatType,
      samples: 4,
    });
    const composer = new EffectComposer(renderer, renderTarget);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(1, 1),
      0.48,
      0.45,
      0.55,
    );
    composer.addPass(bloom);
    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    let seed = 416;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = glowCanvas.height = 128;
    const context = glowCanvas.getContext("2d")!;
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.08, "rgba(255,255,255,.9)");
    gradient.addColorStop(0.2, "rgba(255,255,255,.28)");
    gradient.addColorStop(0.48, "rgba(255,255,255,.065)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);

    function glow(
      color: THREE.ColorRepresentation,
      size: number,
      opacity: number,
    ) {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture,
          color,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      sprite.scale.set(size, size, 1);
      return sprite;
    }

    function line(
      points: THREE.Vector3[],
      color: THREE.ColorRepresentation,
      opacity: number,
      dashed = false,
    ) {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = dashed
        ? new THREE.LineDashedMaterial({
            color,
            transparent: true,
            opacity,
            dashSize: 0.035,
            gapSize: 0.065,
            depthWrite: false,
          })
        : new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });
      const object = new THREE.Line(geometry, material);
      if (dashed) object.computeLineDistances();
      return object;
    }

    const starsGeometry = new THREE.BufferGeometry();
    const starPositions: number[] = [];
    const starColors: number[] = [];
    for (let i = 0; i < 740; i++) {
      const x = (random() - 0.5) * 23;
      const y = (random() - 0.5) * 12;
      starPositions.push(x, y, -2 - random() * 5);
      const color = new THREE.Color(
        x > 2 && random() > 0.7 ? "#90ab48" : "#147a9d",
      );
      color.multiplyScalar(0.08 + random() * 0.42);
      starColors.push(color.r, color.g, color.b);
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3),
    );
    starsGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(starColors, 3),
    );
    const stars = new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    scene.add(stars);

    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.z = 0.31;
    orbitGroup.position.set(0.3, -0.15, -1.8);
    scene.add(orbitGroup);
    const satellites: {
      sprite: THREE.Sprite;
      radius: number;
      height: number;
      phase: number;
      speed: number;
    }[] = [];
    for (let index = 0; index < 7; index++) {
      const rx = 8.05 + index * 0.45;
      const ry = 2.7 + index * 0.25;
      const points = Array.from({ length: 301 }, (_, i) => {
        const angle = (i / 300) * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(angle) * rx,
          Math.sin(angle) * ry,
          Math.sin(angle) * 1.4,
        );
      });
      orbitGroup.add(
        line(
          points,
          index % 3 === 0 ? "#00b8db" : "#076578",
          index === 6 ? 0.32 : 0.07 + random() * 0.15,
        ),
      );
      const arcStart = random() * Math.PI * 2;
      const arc = Array.from({ length: 70 }, (_, i) => {
        const angle = arcStart + (i / 69) * 0.9;
        return new THREE.Vector3(
          Math.cos(angle) * rx,
          Math.sin(angle) * ry,
          Math.sin(angle) * 1.4,
        );
      });
      orbitGroup.add(line(arc, "#00cfea", 0.48));
      for (let s = 0; s < 2; s++) {
        const sprite = glow("#00bfff", s === 0 ? 0.24 : 0.12, 1.5);
        orbitGroup.add(sprite);
        satellites.push({
          sprite,
          radius: rx,
          height: ry,
          phase: random() * Math.PI * 2,
          speed: (0.006 + random() * 0.009) * (s === 0 ? 1 : -1),
        });
      }
    }

    const rings: { object: THREE.Group; speed: number }[] = [];
    const cores: THREE.Sprite[] = [];
    const anchors: THREE.Object3D[] = [];
    const portalMaterials: THREE.MeshBasicMaterial[] = [];
    const hitAreas: THREE.Mesh[] = [];

    milestones.forEach((milestone, index) => {
      const portal = new THREE.Group();
      portal.position.copy(positions[index]);
      portal.rotation.y = -0.77;
      const scale = 1.11 - index * 0.048;
      portal.scale.setScalar(scale);
      scene.add(portal);
      const color = new THREE.Color(milestone.color);
      const w = 1.4;
      const bottom = -2.25;
      const top = 3.5;
      const radius = 0.15;
      const shape = new THREE.Shape();
      shape.moveTo(-w + radius, bottom);
      shape.lineTo(w - radius, bottom);
      shape.quadraticCurveTo(w, bottom, w, bottom + radius);
      shape.lineTo(w, top - radius);
      shape.quadraticCurveTo(w, top, w - radius, top);
      shape.lineTo(-w + radius, top);
      shape.quadraticCurveTo(-w, top, -w, top - radius);
      shape.lineTo(-w, bottom + radius);
      shape.quadraticCurveTo(-w, bottom, -w + radius, bottom);
      const geometry = new THREE.ShapeGeometry(shape, 16);
      const vertices = geometry.getAttribute("position");
      for (let i = 0; i < vertices.count; i++)
        vertices.setY(i, vertices.getY(i) + vertices.getX(i) * 0.51);
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.025,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      portalMaterials.push(material);
      const panel = new THREE.Mesh(geometry, material);
      panel.userData.milestone = index;
      portal.add(panel);
      hitAreas.push(panel);
      const outline = shape
        .getPoints(32)
        .map((p) => new THREE.Vector3(p.x, p.y + p.x * 0.51, 0));
      portal.add(line(outline, color, 0.37));
      const topEdge = [
        new THREE.Vector3(-w + 0.1, top - w * 0.51, 0),
        new THREE.Vector3(w - 0.1, top + w * 0.51, 0),
      ];
      portal.add(line(topEdge, color, 0.35));

      const specks: number[] = [];
      const speckColors: number[] = [];
      for (let i = 0; i < 660; i++) {
        const x = (random() - 0.5) * 2.65;
        const y = bottom + random() * (top - bottom);
        specks.push(x, y + x * 0.51, (random() - 0.5) * 0.12);
        const c = color
          .clone()
          .multiplyScalar(0.06 + Math.pow(random(), 3) * 0.5);
        speckColors.push(c.r, c.g, c.b);
      }
      const dustGeometry = new THREE.BufferGeometry();
      dustGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(specks, 3),
      );
      dustGeometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(speckColors, 3),
      );
      portal.add(
        new THREE.Points(
          dustGeometry,
          new THREE.PointsMaterial({
            size: 0.025,
            vertexColors: true,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        ),
      );

      const ringGroup = new THREE.Group();
      ringGroup.position.z = 0.025;
      portal.add(ringGroup);
      for (let r = 0; r < 12; r++) {
        const ringRadius = 0.44 + r * 0.089;
        const start = random() * Math.PI * 2;
        const arcLength =
          r % 3 === 0 ? Math.PI * 2 : Math.PI * (0.65 + random() * 1.15);
        const points = Array.from({ length: 150 }, (_, j) => {
          const a = start + (j / 149) * arcLength;
          const distortion = 0.012 * Math.sin(a * 12 + r);
          return new THREE.Vector3(
            Math.cos(a) * (ringRadius + distortion),
            Math.sin(a) * (ringRadius + distortion),
            Math.sin(a * 3) * 0.045,
          );
        });
        ringGroup.add(
          line(points, color, r % 3 === 0 ? 0.35 : 0.07 + random() * 0.3),
        );
      }

      const tickPoints: THREE.Vector3[] = [];
      for (let j = 0; j < 100; j++) {
        const a = (j / 100) * Math.PI * 2;
        const rad = j % 5 === 0 ? 1.405 : 1.43;
        tickPoints.push(
          new THREE.Vector3(Math.cos(a) * rad, Math.sin(a) * rad, 0.02),
        );
        tickPoints.push(
          new THREE.Vector3(Math.cos(a) * 1.46, Math.sin(a) * 1.46, 0.02),
        );
      }
      const ticks = new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(tickPoints),
        new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.32,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      ringGroup.add(ticks);
      rings.push({ object: ringGroup, speed: (index % 2 ? 1 : -1) * 0.045 });

      const ringDust: number[] = [];
      for (let j = 0; j < 240; j++) {
        const angle = random() * Math.PI * 2;
        const r = 0.4 + random() * 1.05;
        ringDust.push(Math.cos(angle) * r, Math.sin(angle) * r, random() * 0.2);
      }
      const ringDustGeometry = new THREE.BufferGeometry();
      ringDustGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(ringDust, 3),
      );
      ringGroup.add(
        new THREE.Points(
          ringDustGeometry,
          new THREE.PointsMaterial({
            color,
            size: 0.023,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        ),
      );

      const ambientGlow = glow(color, 3.4, 0.2);
      ambientGlow.position.z = 0.08;
      portal.add(ambientGlow);

      const core = new THREE.Group();
      core.position.copy(positions[index]);
      core.position.z += 0.25;
      scene.add(core);
      core.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(0.075, 16, 16),
          new THREE.MeshBasicMaterial({ color: "#ffffff" }),
        ),
      );
      const halo = glow(color, 0.95, 1.1);
      core.add(halo);
      cores.push(halo);
      core.add(
        new THREE.Mesh(
          new THREE.TorusGeometry(0.225, 0.012, 8, 64),
          new THREE.MeshBasicMaterial({
            color: color.clone().multiplyScalar(1.8),
          }),
        ),
      );
      core.add(
        new THREE.Mesh(
          new THREE.TorusGeometry(0.31, 0.005, 6, 64),
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.55,
          }),
        ),
      );
      const cross = glow(color, 1.15, 0.6);
      cross.scale.y = 0.11;
      cross.rotation.z = 0.3;
      core.add(cross);

      const anchor = new THREE.Object3D();
      anchor.position.set(-1.08, 2.55, 0.1);
      portal.add(anchor);
      anchors.push(anchor);
    });

    const pathPoints = [
      new THREE.Vector3(-8.4, -4.7, 0.3),
      new THREE.Vector3(-8.4, -3.95, 0.3),
      positions[0].clone().add(new THREE.Vector3(0, 0, 0.28)),
      new THREE.Vector3(-4.3, -0.9, 0.22),
      positions[1].clone().add(new THREE.Vector3(0, 0, 0.28)),
      new THREE.Vector3(0.1, 0.35, 0.1),
      positions[2].clone().add(new THREE.Vector3(0, 0, 0.28)),
      new THREE.Vector3(4.35, 1.85, 0.0),
      positions[3].clone().add(new THREE.Vector3(0, 0, 0.28)),
      new THREE.Vector3(8.4, 3.7, 0.25),
    ];
    const careerPath = new THREE.CatmullRomCurve3(
      pathPoints,
      false,
      "catmullrom",
      0.5,
    );
    const tube = new THREE.TubeGeometry(careerPath, 280, 0.012, 6, false);
    const colors: number[] = [];
    const cyan = new THREE.Color("#25e5ff");
    const lime = new THREE.Color("#daff8d");
    for (let i = 0; i <= 280; i++) {
      const t = i / 280;
      const color = cyan
        .clone()
        .lerp(lime, THREE.MathUtils.smoothstep(t, 0.37, 0.94))
        .multiplyScalar(1.9);
      for (let j = 0; j <= 6; j++) colors.push(color.r, color.g, color.b);
    }
    tube.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    scene.add(
      new THREE.Mesh(tube, new THREE.MeshBasicMaterial({ vertexColors: true })),
    );
    const softTube = new THREE.TubeGeometry(careerPath, 200, 0.043, 6, false);
    scene.add(
      new THREE.Mesh(
        softTube,
        new THREE.MeshBasicMaterial({
          color: "#91ffcc",
          transparent: true,
          opacity: 0.08,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    );
    const arrowTip = careerPath.getPoint(1);
    const tangent = careerPath.getTangent(1);
    const normal = new THREE.Vector3(-tangent.y, tangent.x, 0);
    const arrowBack = arrowTip.clone().addScaledVector(tangent, -0.23);
    const arrowPoints = [
      arrowBack.clone().addScaledVector(normal, 0.12),
      arrowTip,
      arrowBack.clone().addScaledVector(normal, -0.12),
    ];
    scene.add(
      line(arrowPoints, new THREE.Color("#dbff9a").multiplyScalar(2.5), 1),
    );
    const arrowGlow = glow("#beff76", 0.6, 0.5);
    arrowGlow.position.copy(arrowTip);
    scene.add(arrowGlow);

    const travelers = Array.from({ length: 3 }, (_, i) => {
      const sprite = glow(i < 2 ? "#60f1ff" : "#d6ff8f", 0.18, 1.2);
      scene.add(sprite);
      return sprite;
    });

    const skillAnchors = sceneSkills.map((skill, index) => {
      const target = new THREE.Vector3(...skill.position);
      const source = positions[skill.milestone].clone();
      const curve = new THREE.CatmullRomCurve3([
        source,
        source
          .clone()
          .add(new THREE.Vector3(index % 2 ? 0.9 : -0.75, -0.6, 0.4)),
        new THREE.Vector3(target.x - 0.85, target.y + 0.55, 0.5),
        target,
      ]);
      scene.add(line(curve.getPoints(120), skill.color, 0.48, true));
      const anchor = new THREE.Object3D();
      anchor.position.copy(target);
      scene.add(anchor);
      return anchor;
    });

    const projected = new THREE.Vector3();
    let width = 0;
    let height = 0;
    function resize() {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      const aspect = width / height;
      const viewWidth = aspect < 1 ? 20.8 : 21.8;
      const viewHeight = Math.max(viewWidth / aspect, 12.1);
      camera.left = (-viewHeight * aspect) / 2;
      camera.right = (viewHeight * aspect) / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
      needsRender = true;
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let visible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "100px" },
    );
    intersectionObserver.observe(container);

    let elapsed = 0;
    let lastFrame = 0;
    let animationFrame = 0;
    function animate(now: number) {
      animationFrame = requestAnimationFrame(animate);
      if (!visible || document.hidden || now - lastFrame < 1000 / 45) return;
      const delta = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;
      controls.update();
      if (pausedRef.current && !needsRender) return;
      const updateLabels = needsRender;
      needsRender = false;
      if (!pausedRef.current) elapsed += delta;
      rings.forEach(({ object, speed }) => {
        object.rotation.z = elapsed * speed;
      });
      cores.forEach((sprite, i) => {
        sprite.material.opacity = 1.0 + Math.sin(elapsed * 1.2 + i) * 0.12;
      });
      portalMaterials.forEach((material, i) => {
        material.opacity = 0.013 + Math.sin(elapsed * 0.4 + i) * 0.002;
      });
      satellites.forEach(
        ({ sprite, radius, height: orbitHeight, phase, speed }) => {
          const angle = phase + elapsed * speed;
          sprite.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * orbitHeight,
            Math.sin(angle) * 1.4,
          );
        },
      );
      travelers.forEach((sprite, i) => {
        sprite.position.copy(
          careerPath.getPoint((elapsed * 0.026 + i / 3) % 1),
        );
      });
      scene.updateMatrixWorld();
      camera.updateMatrixWorld();
      if (updateLabels)
        anchors.forEach((anchor, i) => {
          const label = labelRefs.current[i];
          if (!label) return;
          anchor.getWorldPosition(projected).project(camera);
          label.style.transform = `translate(${(projected.x * 0.5 + 0.5) * width}px, ${(-projected.y * 0.5 + 0.5) * height}px)`;
          label.style.visibility =
            Math.abs(projected.x) > 1.05 || Math.abs(projected.y) > 1.1
              ? "hidden"
              : "visible";
        });
      if (updateLabels)
        skillAnchors.forEach((anchor, i) => {
          const label = skillRefs.current[i];
          if (!label) return;
          anchor.getWorldPosition(projected).project(camera);
          label.style.transform = `translate(${(projected.x * 0.5 + 0.5) * width}px, ${(-projected.y * 0.5 + 0.5) * height}px) translate(-50%, -50%)`;
          label.style.visibility =
            Math.abs(projected.x) > 0.96 || Math.abs(projected.y) > 1.05
              ? "hidden"
              : "visible";
        });
      composer.render();
    }

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const pointerStart = new THREE.Vector2();
    function getPortal(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        (-(event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      return raycaster.intersectObjects(hitAreas, false)[0];
    }
    function pointerDown(event: PointerEvent) {
      pointerStart.set(event.clientX, event.clientY);
    }
    function pointerUp(event: PointerEvent) {
      if (
        pointerStart.distanceTo(
          new THREE.Vector2(event.clientX, event.clientY),
        ) > 6
      )
        return;
      const hit = getPortal(event);
      if (hit) selectionRef.current(hit.object.userData.milestone as number);
    }
    function pointerMove(event: PointerEvent) {
      if (event.buttons) return;
      canvas!.style.cursor = getPortal(event) ? "pointer" : "grab";
    }
    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointermove", pointerMove);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setFailed(true);
      cancelAnimationFrame(animationFrame);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);
    animationFrame = requestAnimationFrame(animate);
    setReady(true);

    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointermove", pointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      controls.dispose();
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Points
        )
          object.geometry.dispose();
        if ("material" in object) {
          const materials = (object as THREE.Mesh).material;
          (Array.isArray(materials) ? materials : [materials]).forEach(
            (material) => material.dispose(),
          );
        }
      });
      glowTexture.dispose();
      bloom.dispose();
      outputPass.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`career-scene${ready ? " is-ready" : ""}${failed ? " scene-fallback" : ""}`}
      ref={containerRef}
    >
      <canvas
        ref={canvasRef}
        aria-label="Interactive 3D career constellation. Drag horizontally to orbit, or select a career milestone using the buttons."
      />
      <div className="scene-labels" role="group" aria-label="Career milestones">
        {milestones.map((milestone, index) => (
          <button
            type="button"
            className={`milestone-label milestone-label-${index}`}
            style={{ "--node-color": milestone.color } as React.CSSProperties}
            key={milestone.year}
            ref={(element) => {
              labelRefs.current[index] = element;
            }}
            onClick={() => onMilestoneSelect(index)}
            aria-label={`${milestone.year}: ${milestone.title}. View career milestone`}
          >
            <span className="milestone-year">{milestone.year}</span>
            <span className="milestone-title">
              {milestone.title.split(" ")[0]}
              <br />
              {milestone.title.split(" ").slice(1).join(" ")}
            </span>
            <span className="milestone-discover">
              Explore chapter <ArrowUpRight size={12} />
            </span>
          </button>
        ))}
      </div>
      <div className="scene-skills" role="group" aria-label="Explore my skills">
        {sceneSkills.map((skill, index) => (
          <button
            type="button"
            className={`scene-skill scene-skill-${index}`}
            style={{ "--node-color": skill.color } as React.CSSProperties}
            key={skill.name}
            ref={(element) => {
              skillRefs.current[index] = element;
            }}
            onClick={() => onSkillSelect(index)}
            aria-label={`Explore ${skill.name}`}
          >
            <SkillIcon name={skill.name} />
            <span>{skill.name}</span>
          </button>
        ))}
      </div>
      {failed && (
        <p className="scene-fallback-message">
          A journey in four chapters. Select one to explore.
        </p>
      )}
      <button
        className="scene-reset"
        type="button"
        onClick={() => resetRef.current()}
        aria-label="Reset 3D view"
        title="Reset view"
        hidden={failed}
      >
        <RotateCcw size={14} />
        <span>Reset view</span>
      </button>
    </div>
  );
}
