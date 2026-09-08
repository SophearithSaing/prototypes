import { useEffect, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ArrowUpRight } from "lucide-react";
import BrandIcon from "./BrandIcon";
import { milestones } from "./data";
import type { Milestone, SkillName } from "./data";

export type SceneActions = {
  reset: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
};

type Props = {
  onMilestoneSelect: (milestone: Milestone) => void;
  onSkillSelect: (skill: SkillName) => void;
  showPossiblePaths: boolean;
  actionsRef: RefObject<SceneActions | null>;
  onReady: (ready: boolean) => void;
};

const sceneSkills: {
  name: SkillName;
  position: [number, number];
  mobilePosition: [number, number];
  color: string;
}[] = [
  {
    name: "React",
    position: [0.413, 0.895],
    mobilePosition: [0.22, 0.91],
    color: "#00d9f2",
  },
  {
    name: "TypeScript",
    position: [0.591, 0.803],
    mobilePosition: [0.62, 0.83],
    color: "#00d9e8",
  },
  {
    name: "Node.js",
    position: [0.716, 0.929],
    mobilePosition: [0.75, 0.99],
    color: "#b2e641",
  },
  {
    name: "System design",
    position: [0.786, 0.634],
    mobilePosition: [0.75, 0.61],
    color: "#8cec65",
  },
  {
    name: "Three.js",
    position: [0.886, 0.477],
    mobilePosition: [0.23, 0.31],
    color: "#b1eb48",
  },
  {
    name: "CI/CD",
    position: [0.933, 0.713],
    mobilePosition: [0.89, 0.75],
    color: "#b8e947",
  },
];

function seededRandom(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function pathColor(t: number) {
  const colors = ["#007eea", "#00cfff", "#00eee5", "#78f298", "#d0f34d"];
  const scaled = THREE.MathUtils.clamp(t, 0, 0.999) * (colors.length - 1);
  return new THREE.Color(colors[Math.floor(scaled)]).lerp(
    new THREE.Color(colors[Math.floor(scaled) + 1]),
    scaled % 1,
  );
}

export default function CareerScene({
  onMilestoneSelect,
  onSkillSelect,
  showPossiblePaths,
  actionsRef,
  onReady,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const skillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pathsRef = useRef<THREE.Group | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    if (pathsRef.current) pathsRef.current.visible = showPossiblePaths;
  }, [showPossiblePaths]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-12, 12, 7, -7, 0.1, 100);
    camera.position.set(0, 0, 28);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.065;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.45;
    controls.minPolarAngle = Math.PI * 0.3;
    controls.maxPolarAngle = Math.PI * 0.7;
    controls.minAzimuthAngle = -Math.PI * 0.25;
    controls.maxAzimuthAngle = Math.PI * 0.25;
    controls.addEventListener("start", () =>
      container.classList.add("is-orbiting"),
    );
    controls.addEventListener("end", () =>
      container.classList.remove("is-orbiting"),
    );

    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = glowCanvas.height = 128;
    const context = glowCanvas.getContext("2d")!;
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.07, "rgba(255,255,255,0.95)");
    gradient.addColorStop(0.2, "rgba(255,255,255,0.3)");
    gradient.addColorStop(0.48, "rgba(255,255,255,0.075)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);

    let world = new THREE.Group();
    scene.add(world);
    let mainCurve: THREE.CatmullRomCurve3;
    let positions: THREE.Vector3[] = [];
    let skillPositions: THREE.Vector3[] = [];
    let pulses: { sprite: THREE.Sprite; offset: number; speed: number }[] = [];
    let nodeGlows: THREE.Sprite[] = [];
    let width = 0;
    let height = 0;
    let visible = true;
    let animationId = 0;
    let elapsed = 0;
    let lastTime = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function disposeWorld() {
      world.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Points ||
          object instanceof THREE.Sprite
        ) {
          if ("geometry" in object) object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      scene.remove(world);
    }

    function glow(
      parent: THREE.Group,
      position: THREE.Vector3,
      color: THREE.Color,
      size: number,
      opacity = 1,
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
      sprite.position.copy(position);
      sprite.scale.setScalar(size);
      parent.add(sprite);
      return sprite;
    }

    function line(
      parent: THREE.Group,
      points: THREE.Vector3[],
      color: THREE.Color,
      opacity: number,
      dashed = false,
    ) {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = dashed
        ? new THREE.LineDashedMaterial({
            color,
            transparent: true,
            opacity,
            dashSize: 0.025,
            gapSize: 0.045,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        : new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
      const object = new THREE.Line(geometry, material);
      if (dashed) object.computeLineDistances();
      parent.add(object);
      return object;
    }

    function buildScene() {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (!width || !height) return;
      const mobile = width < 760;
      const viewHeight = 13.5;
      const viewWidth = (viewHeight * width) / height;
      camera.left = -viewWidth / 2;
      camera.right = viewWidth / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      disposeWorld();
      world = new THREE.Group();
      scene.add(world);
      const possibilities = new THREE.Group();
      possibilities.visible = pathsRef.current?.visible ?? true;
      pathsRef.current = possibilities;
      world.add(possibilities);
      pulses = [];
      nodeGlows = [];
      const random = seededRandom(71293);
      const at = (x: number, y: number, z = 0) =>
        new THREE.Vector3((x - 0.5) * viewWidth, (0.5 - y) * viewHeight, z);
      const points = mobile
        ? [
            [0.16, 0.74],
            [0.39, 0.56],
            [0.64, 0.38],
            [0.86, 0.2],
          ]
        : [
            [0.327, 0.755],
            [0.486, 0.578],
            [0.654, 0.398],
            [0.871, 0.226],
          ];
      positions = points.map(([x, y]) => at(x, y));
      skillPositions = sceneSkills.map((skill) =>
        at(...(mobile ? skill.mobilePosition : skill.position), 0.3),
      );

      const first = positions[0];
      const last = positions[3];
      mainCurve = new THREE.CatmullRomCurve3(
        [
          first.clone().add(new THREE.Vector3(-viewWidth * 0.094, -0.8, -0.25)),
          first,
          positions[1]
            .clone()
            .lerp(first, 0.5)
            .add(new THREE.Vector3(0.1, -0.28, 0.1)),
          positions[1],
          positions[2]
            .clone()
            .lerp(positions[1], 0.5)
            .add(new THREE.Vector3(0.14, -0.35, 0.2)),
          positions[2],
          positions[3]
            .clone()
            .lerp(positions[2], 0.5)
            .add(new THREE.Vector3(0.05, -0.6, 0.05)),
          last,
          last.clone().add(new THREE.Vector3(viewWidth * 0.049, 0.66, -0.2)),
        ],
        false,
        "catmullrom",
        0.45,
      );

      // Layered emissive tubes give the path a soft bloom without a full-screen postprocessing pass.
      for (const [radius, opacity] of [
        [0.2, 0.03],
        [0.12, 0.07],
        [0.065, 0.19],
        [0.027, 0.95],
        [0.009, 1],
      ]) {
        const segments = 240;
        const sides = 6;
        const geometry = new THREE.TubeGeometry(
          mainCurve,
          segments,
          radius,
          sides,
          false,
        );
        const colors = [];
        for (let i = 0; i < geometry.attributes.position.count; i++) {
          const color = pathColor(Math.floor(i / (sides + 1)) / segments);
          if (radius < 0.01) color.lerp(new THREE.Color("#ffffff"), 0.85);
          colors.push(color.r, color.g, color.b);
        }
        geometry.setAttribute(
          "color",
          new THREE.Float32BufferAttribute(colors, 3),
        );
        world.add(
          new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
              vertexColors: true,
              transparent: true,
              opacity,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            }),
          ),
        );
      }

      // Each branch is a possible path. They share the main path's blue-to-lime chronology.
      const branchCount = mobile ? 29 : 61;
      for (let i = 0; i < branchCount; i++) {
        const t = 0.07 + random() * 0.8;
        const start = mainCurve.getPointAt(t);
        const direction = i % 2 === 0 ? 1 : -1;
        const reach = (0.9 + random() * 3.3) * (mobile ? 0.75 : 1);
        const dx =
          (0.055 + random() * 0.12) * viewWidth * (i % 5 === 0 ? -1 : 1);
        const dz = (random() - 0.5) * 2.2;
        const end = start
          .clone()
          .add(new THREE.Vector3(dx, direction * reach, dz));
        end.x = THREE.MathUtils.clamp(
          end.x,
          -viewWidth * (mobile ? 0.46 : 0.27),
          viewWidth * 0.477,
        );
        if (Math.abs(end.x - start.x) < viewWidth * 0.035) {
          end.x = start.x - viewWidth * (0.065 + random() * 0.08);
        }
        end.y = THREE.MathUtils.clamp(
          end.y,
          -viewHeight * (0.4 + random() * 0.06),
          viewHeight * (0.36 + random() * 0.075),
        );
        const spread = end.x - start.x;
        const curve = new THREE.CubicBezierCurve3(
          start,
          start
            .clone()
            .add(new THREE.Vector3(spread * 0.55, direction * 0.14, dz * 0.3)),
          end
            .clone()
            .add(
              new THREE.Vector3(-spread * 0.65, -direction * 0.12, -dz * 0.25),
            ),
          end,
        );
        const color = pathColor(t + 0.06);
        line(possibilities, curve.getPoints(90), color, 0.16 + random() * 0.2);
        if (i % 3 !== 0)
          line(possibilities, curve.getPoints(90), color, 0.27, true);

        const radius = 0.047 + random() * 0.055;
        const ring = new THREE.EllipseCurve(
          0,
          0,
          radius,
          radius * 1.17,
          0,
          Math.PI * 2,
          false,
          0,
        );
        line(
          possibilities,
          ring
            .getPoints(30)
            .map(
              (point) =>
                new THREE.Vector3(point.x + end.x, point.y + end.y, end.z),
            ),
          color,
          0.53,
        );
        glow(possibilities, end, color, radius * 5, 0.9);

        for (let j = 0; j < 3; j++) {
          const dot = curve.getPoint(0.18 + random() * 0.75);
          glow(possibilities, dot, color, 0.07 + random() * 0.08, 0.9);
        }
        if (i % 4 === 0) {
          const branchStart = curve.getPoint(0.48);
          const branchEnd = end
            .clone()
            .add(new THREE.Vector3(-viewWidth * 0.075, direction * -0.8, -0.4));
          const offshoot = new THREE.CatmullRomCurve3([
            branchStart,
            branchStart
              .clone()
              .lerp(branchEnd, 0.5)
              .add(new THREE.Vector3(0, direction * 0.5, 0)),
            branchEnd,
          ]);
          line(possibilities, offshoot.getPoints(50), color, 0.25, true);
          glow(possibilities, branchEnd, color, 0.2, 0.8);
        }
      }

      for (let k = 0; k < 4; k++) {
        const ringPoints = [];
        const colors = [];
        const center = at(mobile ? 0.53 : 0.63, 0.58, -1.5);
        for (let i = 0; i <= 280; i++) {
          const angle = (i / 280) * Math.PI * 2;
          const x =
            Math.cos(angle) *
            viewWidth *
            (mobile ? 0.43 + k * 0.035 : 0.32 + k * 0.024);
          const y = Math.sin(angle) * viewHeight * (0.22 + k * 0.023);
          ringPoints.push(
            new THREE.Vector3(
              x * Math.cos(0.16) - y * Math.sin(0.16) + center.x,
              x * Math.sin(0.16) + y * Math.cos(0.16) + center.y,
              center.z + Math.sin(angle) * 0.8,
            ),
          );
          const color = pathColor((Math.cos(angle) + 1) / 2);
          colors.push(color.r, color.g, color.b);
        }
        const orbit = line(
          possibilities,
          ringPoints,
          new THREE.Color("#ffffff"),
          0.1 + k * 0.014,
        );
        orbit.geometry.setAttribute(
          "color",
          new THREE.Float32BufferAttribute(colors, 3),
        );
        orbit.material.vertexColors = true;
      }

      positions.forEach((position, index) => {
        const color = new THREE.Color(milestones[index].color);
        glow(world, position, color, 2.85, 0.55);
        nodeGlows.push(glow(world, position, color, 1.06, 1));
        glow(world, position, new THREE.Color("#f0ffff"), 0.27, 1);
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.065, 16, 16),
          new THREE.MeshBasicMaterial({ color: "#f4ffff" }),
        );
        sphere.position.copy(position);
        world.add(sphere);

        for (let r = 0; r < 6; r++) {
          const radius = 0.18 + r * 0.15;
          const ellipse = new THREE.EllipseCurve(
            0,
            0,
            radius * 0.56,
            radius,
            0,
            Math.PI * 2,
            false,
            0.08,
          );
          const ringPoints = ellipse
            .getPoints(100)
            .map(
              (point) =>
                new THREE.Vector3(
                  position.x + point.x,
                  position.y + point.y,
                  position.z + 0.03,
                ),
            );
          line(
            world,
            ringPoints,
            color,
            r === 0 ? 0.95 : 0.4 - r * 0.047,
            r % 2 === 1,
          );
        }
        for (let tick = 0; tick < 16; tick++) {
          const angle = (tick / 16) * Math.PI * 2;
          const inner = new THREE.Vector3(
            position.x + Math.cos(angle) * 0.46,
            position.y + Math.sin(angle) * 0.8,
            0.04,
          );
          const outer = new THREE.Vector3(
            position.x + Math.cos(angle) * 0.49,
            position.y + Math.sin(angle) * 0.85,
            0.04,
          );
          line(world, [inner, outer], color, 0.26);
        }
      });

      for (let i = 0; i < 12; i++) {
        const offset = i / 12;
        const sprite = glow(
          world,
          mainCurve.getPointAt(offset),
          pathColor(offset),
          i % 3 === 0 ? 0.5 : 0.24,
          0.8,
        );
        pulses.push({ sprite, offset, speed: 0.018 + (i % 3) * 0.006 });
      }

      const starPositions = [];
      const starColors = [];
      for (let i = 0; i < (mobile ? 120 : 300); i++) {
        const x = mobile ? random() : 0.2 + random() * 0.8;
        const position = at(x, random(), -3 - random() * 4);
        starPositions.push(position.x, position.y, position.z);
        const color = pathColor(random()).lerp(
          new THREE.Color("#dbefff"),
          random() * 0.7,
        );
        starColors.push(color.r, color.g, color.b);
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
      world.add(
        new THREE.Points(
          starGeometry,
          new THREE.PointsMaterial({
            size: 1.25,
            sizeAttenuation: false,
            vertexColors: true,
            transparent: true,
            opacity: 0.48,
            depthWrite: false,
          }),
        ),
      );
    }

    const projected = new THREE.Vector3();
    function positionLabel(
      element: HTMLButtonElement | null,
      position: THREE.Vector3,
    ) {
      if (!element) return;
      projected.copy(position).project(camera);
      element.style.left = `${(projected.x * 0.5 + 0.5) * width}px`;
      element.style.top = `${(-projected.y * 0.5 + 0.5) * height}px`;
    }

    function animate(time: number) {
      animationId = requestAnimationFrame(animate);
      const delta = Math.min((time - lastTime) / 1000, 0.06);
      lastTime = time;
      if (!visible || document.hidden) return;
      if (!reducedMotion) elapsed += delta;
      controls.update();
      pulses.forEach(({ sprite, offset, speed }) => {
        const t = (elapsed * speed + offset) % 1;
        sprite.position.copy(mainCurve.getPointAt(t));
        sprite.material.color.copy(pathColor(t));
      });
      nodeGlows.forEach((sprite, index) => {
        sprite.material.opacity = 0.85 + Math.sin(elapsed * 1.5 + index) * 0.12;
      });
      positions.forEach((position, index) =>
        positionLabel(milestoneRefs.current[index], position),
      );
      skillPositions.forEach((position, index) =>
        positionLabel(skillRefs.current[index], position),
      );
      renderer.render(scene, camera);
    }

    const zoom = (factor: number) => {
      camera.zoom = THREE.MathUtils.clamp(camera.zoom * factor, 0.7, 1.5);
      camera.updateProjectionMatrix();
    };
    const onWheel = (event: WheelEvent) => {
      // Ordinary scrolling remains page navigation; Ctrl/trackpad-pinch zooms the map.
      if (!event.ctrlKey) return;
      event.preventDefault();
      zoom(Math.exp(-event.deltaY * 0.006));
    };
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    actionsRef.current = {
      reset: () => {
        controls.reset();
        camera.zoom = 1;
        camera.updateProjectionMatrix();
      },
      zoomIn: () => zoom(1.12),
      zoomOut: () => zoom(1 / 1.12),
    };

    const resizeObserver = new ResizeObserver(buildScene);
    resizeObserver.observe(container);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(container);
    buildScene();
    onReady(true);
    controls.saveState();
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      renderer.domElement.removeEventListener("wheel", onWheel);
      controls.dispose();
      disposeWorld();
      glowTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      actionsRef.current = null;
      pathsRef.current = null;
      onReady(false);
    };
  }, [actionsRef, onReady]);

  return (
    <div
      className={`career-scene${webglUnavailable ? " scene-fallback" : ""}`}
      ref={containerRef}
      role="group"
      aria-label="Interactive 3D career map. Drag to orbit, use the zoom buttons to zoom, or select a career milestone."
    >
      {webglUnavailable && (
        <svg
          className="fallback-path"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="fallback-gradient">
              <stop stopColor="#00c8ff" />
              <stop offset="0.5" stopColor="#00e3ef" />
              <stop offset="1" stopColor="#b7ee44" />
            </linearGradient>
          </defs>
          <path
            d="M 240 510 C 340 460 400 470 490 350 S 580 300 650 240 S 800 220 875 135"
            fill="none"
            stroke="url(#fallback-gradient)"
            strokeWidth="2"
          />
        </svg>
      )}
      {webglUnavailable && (
        <p className="fallback-notice">
          3D is unavailable on this device. Select a milestone to explore.
        </p>
      )}
      <div className="scene-labels">
        {milestones.map((milestone, index) => (
          <button
            className={`milestone milestone-${index}`}
            key={milestone.year}
            ref={(element) => {
              milestoneRefs.current[index] = element;
            }}
            style={{ "--accent": milestone.color } as CSSProperties}
            onClick={() => onMilestoneSelect(milestone)}
            aria-label={`Explore ${milestone.year}: ${milestone.role} at ${milestone.company}`}
          >
            <span className="milestone-number">
              0{index + 1} <ArrowUpRight size={10} />
            </span>
            <strong>{milestone.year}</strong>
            <span className="milestone-role">{milestone.role}</span>
            <span className="milestone-orb" />
            <span className="milestone-hint">
              EXPLORE <span>+</span>
            </span>
          </button>
        ))}
        {sceneSkills.map((skill, index) => (
          <button
            className={`floating-skill floating-skill-${index}`}
            key={skill.name}
            ref={(element) => {
              skillRefs.current[index] = element;
            }}
            style={{ "--accent": skill.color } as CSSProperties}
            onClick={() => onSkillSelect(skill.name)}
            aria-label={`Explore my ${skill.name} skills`}
          >
            <BrandIcon name={skill.name} />
            <span>
              {skill.name === "System design" ? (
                <>
                  System
                  <br />
                  design
                </>
              ) : (
                skill.name
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
