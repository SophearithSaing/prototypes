import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { MousePointer2, RotateCw, X } from "lucide-react";
import { getZoneDetails, zoneDetails } from "./scenarios";
import { createDiagramLayout, createDiagramPath } from "./diagramGeometry";
import type { DiagramBoxes } from "./diagramGeometry";
import type { Frame, Scenario, ZoneId } from "./scenarios";

const zones: ZoneId[] = ["stack", "apis", "tasks", "microtasks"];
const connections: { from: ZoneId; to: ZoneId }[] = [
  { from: "stack", to: "apis" },
  { from: "stack", to: "microtasks" },
  { from: "apis", to: "tasks" },
  { from: "microtasks", to: "stack" },
  { from: "tasks", to: "stack" },
  { from: "stack", to: "tasks" },
];

interface Props {
  frame: Frame;
  playing: boolean;
  speed: number;
  runtime: Scenario["runtime"];
}

export default function RuntimeScene({
  frame,
  playing,
  speed,
  runtime,
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Partial<Record<ZoneId, HTMLElement | null>>>({});
  const sceneHandle = useRef<{
    update: (next: Frame) => void;
    wake: () => void;
  } | null>(null);
  const frameRef = useRef(frame);
  const runtimeRef = useRef(runtime);
  const selectedRef = useRef<ZoneId | null>(null);
  const playbackRef = useRef({ playing, speed });
  const arrowId = useId();
  const [selectedZone, setSelectedZone] = useState<ZoneId | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [layout, setLayout] = useState({
    points: {} as Record<string, [number, number][]>,
    paths: {} as Record<string, string>,
    loop: { x: 0, y: 0 },
    delegate: { x: 0, y: 0 },
  });

  useEffect(() => {
    playbackRef.current = { playing, speed };
    sceneHandle.current?.wake();
  }, [playing, speed]);

  useEffect(() => {
    frameRef.current = frame;
    runtimeRef.current = runtime;
    sceneHandle.current?.update(frame);
  }, [frame, runtime]);

  useEffect(() => {
    selectedRef.current = selectedZone;
    sceneHandle.current?.wake();
  }, [selectedZone]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    function measure() {
      const origin = board!.getBoundingClientRect();
      const bounds = Object.fromEntries(
        zones.map((zone) => {
          const rect = nodeRefs.current[zone]!.getBoundingClientRect();
          return [
            zone,
            {
              x: rect.left - origin.left,
              y: rect.top - origin.top,
              width: rect.width,
              height: rect.height,
            },
          ];
        }),
      ) as DiagramBoxes;
      setLayout(createDiagramLayout(bounds));
    }

    const observer = new ResizeObserver(measure);
    observer.observe(board);
    zones.forEach((zone) => observer.observe(nodeRefs.current[zone]!));
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    const board = boardRef.current;
    if (!mount || !board) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setUnavailable(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 2000);
    camera.position.z = 1000;
    scene.add(new THREE.AmbientLight(0xffffff, 1.8));
    const light = new THREE.DirectionalLight(0xffffff, 2.6);
    light.position.set(-350, 500, 800);
    light.castShadow = true;
    light.shadow.mapSize.set(2048, 2048);
    light.shadow.camera.left = -900;
    light.shadow.camera.right = 900;
    light.shadow.camera.top = 900;
    light.shadow.camera.bottom = -900;
    light.shadow.camera.far = 2500;
    light.shadow.normalBias = 0.3;
    light.shadow.radius = 3;
    scene.add(light);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(4000, 4000),
      new THREE.ShadowMaterial({ opacity: 0.13 }),
    );
    ground.position.z = -15;
    ground.receiveShadow = true;
    scene.add(ground);
    const diagram = new THREE.Group();
    scene.add(diagram);

    let width = 1;
    let height = 1;
    let current = frameRef.current;
    let taskMeshes = {} as Record<ZoneId, THREE.Group[]>;
    let zoneMaterials = {} as Record<ZoneId, THREE.MeshStandardMaterial>;
    const boxes = {} as DiagramBoxes;
    let motion: {
      from: ZoneId;
      to: ZoneId;
      sourceIndex: number;
      progress: number;
      manual: boolean;
      mesh: THREE.Group;
      end: THREE.Vector3;
      path: THREE.CurvePath<THREE.Vector3>;
    } | null = null;
    let animationFrame = 0;
    let lastTime: number | null = null;
    let visible = true;
    let disposed = false;
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function disposeDiagram() {
      diagram.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach(
          (material: THREE.Material & { map?: THREE.Texture | null }) => {
            material.map?.dispose();
            material.dispose();
          },
        );
      });
      diagram.clear();
    }

    function position(x: number, y: number, z: number) {
      return new THREE.Vector3(x - width / 2, height / 2 - y, z);
    }

    function slot(zone: ZoneId, index: number) {
      const box = boxes[zone];
      const y =
        zone === "stack"
          ? box.y + box.height - 24 - index * 30
          : box.y + 70 + index * 30;
      return position(box.x + box.width / 2, y, 14);
    }

    function cuboid(
      w: number,
      h: number,
      depth: number,
      color: THREE.ColorRepresentation,
    ) {
      const mesh = new THREE.Mesh(
        new RoundedBoxGeometry(w, h, depth, 3, Math.min(3, depth / 2)),
        new THREE.MeshStandardMaterial({ color, roughness: 0.55 }),
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    }

    function label(
      value: string,
      w: number,
      h: number,
      size: number,
      color = "#43533a",
    ) {
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(w * 2);
      canvas.height = Math.ceil(h * 2);
      const context = canvas.getContext("2d");
      if (context) {
        context.scale(2, 2);
        context.font = `500 ${size}px ${size > 10 ? '"DM Sans", sans-serif' : '"DM Mono", monospace'}`;
        context.fillStyle = color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(value, w / 2, h / 2, w - 4);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
          toneMapped: false,
        }),
      );
    }

    function finish() {
      if (motion) motion.mesh.position.copy(motion.end);
      motion = null;
      mount!.dataset.moving = "false";
    }

    function wake() {
      lastTime = null;
      if (!animationFrame && !disposed)
        animationFrame = requestAnimationFrame(animate);
    }

    function draw() {
      if (!visible || document.hidden || disposed) return;
      zones.forEach((zone) => {
        const material = zoneMaterials[zone];
        if (!material) return;
        material.emissive.set(zoneDetails[zone].color);
        material.emissiveIntensity =
          current.active === zone || selectedRef.current === zone ? 0.22 : 0;
      });
      renderer.render(scene, camera);
      mount!.dataset.renderer = "webgl";
    }

    function rebuild() {
      if (disposed) return;
      const inFlight = motion;
      const viewport = mount!.getBoundingClientRect();
      disposeDiagram();
      taskMeshes = {} as Record<ZoneId, THREE.Group[]>;
      zoneMaterials = {} as Record<ZoneId, THREE.MeshStandardMaterial>;

      zones.forEach((zone) => {
        const element = nodeRefs.current[zone]!;
        const rect = element.getBoundingClientRect();
        const info = getZoneDetails(zone, runtimeRef.current);
        const box = {
          x: rect.left - viewport.left,
          y: rect.top - viewport.top,
          width: rect.width,
          height: rect.height,
        };
        boxes[zone] = box;
        const centerX = box.x + box.width / 2;
        const centerY = box.y + box.height / 2;
        const tint = new THREE.Color(info.color);
        const backing = cuboid(
          box.width,
          box.height,
          16,
          tint.clone().lerp(new THREE.Color("#ffffff"), 0.22),
        );
        backing.position.copy(position(centerX, centerY, 0));
        zoneMaterials[zone] = backing.material;
        diagram.add(backing);

        const inset = cuboid(box.width - 5, box.height - 5, 3, "#fbfcf8");
        inset.position.copy(position(centerX, centerY, 9));
        diagram.add(inset);
        const header = cuboid(
          box.width - 7,
          45,
          5,
          tint.clone().lerp(new THREE.Color("#ffffff"), 0.82),
        );
        header.position.copy(position(centerX, box.y + 25, 12));
        diagram.add(header);

        const small = box.width < 185;
        const title = label(info.title, box.width - 37, 18, small ? 10 : 12);
        title.position.copy(position(centerX - 10, box.y + 19, 15));
        diagram.add(title);
        const caption = label(
          element.querySelector(".zone-caption")!.textContent!,
          box.width - 15,
          12,
          small ? 6 : 7,
          "#5f6e53",
        );
        caption.position.copy(position(centerX, box.y + 36, 15));
        diagram.add(caption);
        const count = cuboid(17, 16, 4, "#f8faf3");
        count.position.copy(position(box.x + box.width - 15, box.y + 19, 16));
        diagram.add(count);
        const countText = label(String(current[zone].length), 15, 14, 8);
        countText.position.copy(
          position(box.x + box.width - 15, box.y + 19, 18.1),
        );
        diagram.add(countText);

        taskMeshes[zone] = current[zone].map((value, index) => {
          const group = new THREE.Group();
          const w = Math.min(180, box.width - 22);
          group.add(cuboid(w, 25, 12, info.color));
          const text = label(
            `${String(index + 1).padStart(2, "0")}  ${value}`,
            w - 10,
            21,
            small ? 8 : 10,
          );
          text.position.z = 6.1;
          group.add(text);
          group.position.copy(slot(zone, index));
          diagram.add(group);
          return group;
        });

        if (!current[zone].length) {
          const bodyY = box.y + 48 + (box.height - 48) / 2;
          const placeholder = cuboid(
            Math.min(150, box.width * 0.65),
            19,
            3,
            tint.clone().lerp(new THREE.Color("#ffffff"), 0.78),
          );
          placeholder.position.copy(position(centerX, bodyY - 10, 12));
          diagram.add(placeholder);
          const empty = label(
            zone === "stack"
              ? "Stack is clear"
              : zone === "apis"
                ? "No host operations"
                : "Nothing queued",
            box.width - 12,
            15,
            small ? 8 : 9,
            "#68715f",
          );
          empty.position.copy(position(centerX, bodyY + 17, 12));
          diagram.add(empty);
        }
      });

      const geometry = createDiagramLayout(boxes);
      const routes: Record<string, THREE.Vector3[]> = {};
      connections.forEach(({ from, to }) => {
        if (runtimeRef.current !== "node" && from === "stack" && to === "tasks")
          return;
        const key = `${from}-${to}`;
        const route = geometry.points[key].map(([x, y]) => position(x, y, 4));
        routes[key] = route;
        const active =
          current.transfer?.from === from && current.transfer.to === to;
        const color = active ? "#648549" : "#aab69b";
        const rail = new THREE.Mesh(
          new THREE.TubeGeometry(
            createDiagramPath(route),
            80,
            active ? 1.35 : 0.9,
            6,
            false,
          ),
          new THREE.MeshStandardMaterial({ color, roughness: 0.65 }),
        );
        rail.castShadow = true;
        diagram.add(rail);
        const tip = route.at(-1)!;
        const direction = tip.clone().sub(route.at(-2)!).normalize();
        const arrow = new THREE.Mesh(
          new THREE.ConeGeometry(3, 7, 4),
          new THREE.MeshStandardMaterial({ color }),
        );
        arrow.position.copy(tip).addScaledVector(direction, -3.5);
        arrow.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction,
        );
        arrow.castShadow = true;
        diagram.add(arrow);
      });

      const loop = position(geometry.loop.x, geometry.loop.y, 12);
      const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(19, 19, 6, 48),
        new THREE.MeshStandardMaterial({ color: "#e0eacb", roughness: 0.55 }),
      );
      disc.rotation.x = Math.PI / 2;
      disc.position.copy(loop);
      disc.castShadow = true;
      diagram.add(disc);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(16, 0.9, 6, 48, Math.PI * 1.75),
        new THREE.MeshStandardMaterial({ color: "#7a965c" }),
      );
      ring.position.copy(loop).setZ(15.5);
      diagram.add(ring);
      const loopLabel = label("EVENT LOOP", 29, 16, 5);
      loopLabel.position.copy(loop).setZ(15.6);
      diagram.add(loopLabel);

      if (inFlight) {
        const { from, to, sourceIndex } = inFlight;
        const rail = routes[`${from}-${to}`];
        const mesh = taskMeshes[to].at(-1);
        if (rail && mesh) {
          const start = slot(from, sourceIndex);
          const end = mesh.position.clone();
          const route = rail.map((point) => point.clone().setZ(14));
          const entrance = route[0];
          const exit = route.at(-1)!;
          const path = createDiagramPath([
            start,
            new THREE.Vector3(entrance.x, start.y, 14),
            ...route,
            new THREE.Vector3(exit.x, end.y, 14),
            end,
          ]);
          motion = { ...inFlight, mesh, end, path };
          const p = motion.progress;
          mesh.position.copy(path.getPointAt(p * p * (3 - 2 * p)));
        } else finish();
      }
      draw();
      wake();
    }

    function update(next: Frame) {
      finish();
      const previous = current;
      current = next;
      if (next.transfer && !motionPreference.matches) {
        const { from, to } = next.transfer;
        const sourceIndex =
          from === "stack"
            ? Math.max(previous.stack.length, next.stack.length, 1) - 1
            : 0;
        // Rebuild binds this transfer to the destination's actual persistent mesh.
        motion = {
          from,
          to,
          sourceIndex,
          progress: 0,
          manual: !playbackRef.current.playing,
          mesh: new THREE.Group(),
          end: new THREE.Vector3(),
          path: new THREE.CurvePath<THREE.Vector3>(),
        };
        mount!.dataset.moving = "true";
      }
      rebuild();
    }

    function animate(now: number) {
      animationFrame = 0;
      if (!visible || document.hidden || disposed) return;
      const canAdvance =
        motion && (motion.manual || playbackRef.current.playing);
      if (motion) {
        if (lastTime !== null && canAdvance)
          motion.progress +=
            (Math.min(now - lastTime, 64) * playbackRef.current.speed) / 1000;
        if (motionPreference.matches || motion.progress >= 1) finish();
        else {
          const p = motion.progress;
          motion.mesh.position.copy(
            motion.path.getPointAt(p * p * (3 - 2 * p)),
          );
        }
      }
      lastTime = now;
      draw();
      if (motion && canAdvance) animationFrame = requestAnimationFrame(animate);
    }

    const resize = () => {
      const changed =
        width !== mount.clientWidth || height !== mount.clientHeight;
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      // Oblique orthographic projection keeps diagram faces aligned, but reveals depth.
      camera.projectionMatrix.elements[8] =
        camera.projectionMatrix.elements[0] * 0.38;
      camera.projectionMatrix.elements[9] =
        camera.projectionMatrix.elements[5] * 0.3;
      camera.projectionMatrix.elements[12] =
        camera.projectionMatrix.elements[8] * (camera.position.z - 20);
      camera.projectionMatrix.elements[13] =
        camera.projectionMatrix.elements[9] * (camera.position.z - 20);
      camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
      if (changed) renderer.setSize(width, height);
      rebuild();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    observer.observe(board);
    zones.forEach((zone) => observer.observe(nodeRefs.current[zone]!));
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      wake();
    });
    visibilityObserver.observe(mount);
    const contextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      finish();
      sceneHandle.current = null;
      disposed = true;
      delete mount.dataset.renderer;
      setUnavailable(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    motionPreference.addEventListener("change", wake);
    document.addEventListener("visibilitychange", wake);
    sceneHandle.current = { update, wake };
    resize();
    update(frameRef.current);
    document.fonts.ready.then(() => {
      if (!disposed) rebuild();
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      finish();
      disposed = true;
      delete mount.dataset.renderer;
      observer.disconnect();
      visibilityObserver.disconnect();
      motionPreference.removeEventListener("change", wake);
      document.removeEventListener("visibilitychange", wake);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      ground.geometry.dispose();
      ground.material.dispose();
      disposeDiagram();
      light.shadow.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
      sceneHandle.current = null;
    };
  }, []);

  const detail = selectedZone ? getZoneDetails(selectedZone, runtime) : null;

  return (
    <div
      className={`scene-viewport ${unavailable ? "scene-fallback" : ""}`}
      ref={mountRef}
    >
      <div className="scene-status">
        <span className={`status-dot ${playing ? "is-live" : ""}`} />
        {playing
          ? "Runtime in motion"
          : frame.logs.length
            ? "Following the flow"
            : "Ready when you are"}
      </div>
      <div className="scene-dimension">
        {unavailable ? "RUNTIME DIAGRAM" : "3D RUNTIME / DIAGRAM VIEW"}
      </div>

      <div className="diagram-board" ref={boardRef}>
        <svg className="diagram-links" aria-hidden="true">
          <defs>
            <marker
              id={`${arrowId}-arrow`}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path
                d="M 1 1 L 7 4 L 1 7"
                fill="none"
                stroke="#a1ac94"
                strokeWidth="1.4"
              />
            </marker>
            <marker
              id={`${arrowId}-active`}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path
                d="M 1 1 L 7 4 L 1 7"
                fill="none"
                stroke="#66874c"
                strokeWidth="1.6"
              />
            </marker>
          </defs>
          {connections
            .filter(
              ({ from, to }) =>
                runtime === "node" || from !== "stack" || to !== "tasks",
            )
            .map(({ from, to }) => {
              const key = `${from}-${to}`;
              const active =
                frame.transfer?.from === from && frame.transfer.to === to;
              return (
                <path
                  key={key}
                  data-route={key}
                  className={`diagram-connection ${active ? "connection-active" : ""}`}
                  d={layout.paths[key] || ""}
                  markerEnd={`url(#${arrowId}-${active ? "active" : "arrow"})`}
                />
              );
            })}
          <text
            className="diagram-link-label"
            x={layout.delegate.x}
            y={layout.delegate.y}
            textAnchor="middle"
          >
            delegate
          </text>
        </svg>

        <div
          className="diagram-loop"
          style={{ left: layout.loop.x, top: layout.loop.y }}
          role="img"
          aria-label="Event loop selects ready callbacks"
        >
          <RotateCw size={17} />
          <span>EVENT LOOP</span>
        </div>

        {zones.map((zone) => {
          const info = getZoneDetails(zone, runtime);
          return (
            <section
              key={zone}
              ref={(element) => {
                nodeRefs.current[zone] = element;
              }}
              className={`diagram-zone zone-${zone} ${frame.active === zone ? "zone-active" : ""} ${selectedZone === zone ? "zone-selected" : ""}`}
              style={{ "--zone-color": info.color } as CSSProperties}
              aria-label={info.title}
            >
              <button
                className="zone-label"
                onClick={() =>
                  setSelectedZone(selectedZone === zone ? null : zone)
                }
                aria-label={`${info.title}: ${frame[zone].length} ${zone === "apis" ? "registered operations" : "items"}. Learn more`}
                aria-expanded={selectedZone === zone}
              >
                <span className="zone-name">
                  <i />
                  {info.title}
                  <span className="zone-count">{frame[zone].length}</span>
                </span>
                <span className="zone-caption">
                  {zone === "stack"
                    ? "LAST IN, FIRST OUT"
                    : zone === "apis"
                      ? "HOST ENVIRONMENT"
                      : zone === "microtasks"
                        ? "01 / DRAIN FIRST"
                        : runtime === "node"
                          ? "02 / PHASE CALLBACKS"
                          : "02 / NEXT READY TASK"}
                </span>
              </button>
              {frame[zone].length ? (
                <ol
                  className="diagram-items"
                  aria-label={`${info.title} contents`}
                >
                  {frame[zone].map((label, index) => (
                    <li
                      className="diagram-item"
                      key={`${index}-${label}`}
                      title={label}
                    >
                      <span className="item-position">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <code>{label}</code>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="diagram-empty">
                  <span aria-hidden="true" />
                  {zone === "stack"
                    ? "Stack is clear"
                    : zone === "apis"
                      ? "No host operations"
                      : "Nothing queued"}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {detail && (
        <div
          className="zone-popover"
          role="region"
          aria-label={`About ${detail.title}`}
        >
          <div>
            <span className="legend-dot" style={{ background: detail.color }} />
            <strong>{detail.title}</strong>
            <button
              className="icon-button"
              onClick={() => setSelectedZone(null)}
              aria-label="Close component explanation"
            >
              <X size={14} />
            </button>
          </div>
          <p>{detail.description}</p>
        </div>
      )}
      <div className="scene-instruction">
        <MousePointer2 size={12} />
        <span>
          {unavailable
            ? "3D unavailable. Diagram and playback still work."
            : "Follow the arrows. Click a component to explore."}
        </span>
      </div>
    </div>
  );
}
