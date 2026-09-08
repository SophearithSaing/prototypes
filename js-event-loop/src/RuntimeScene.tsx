import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { MoveUpRight, X } from "lucide-react";
import { getZoneDetails, zoneDetails } from "./scenarios";
import type { Frame, Scenario, ZoneId } from "./scenarios";

const zones: ZoneId[] = ["stack", "apis", "microtasks", "tasks"];
const positions: Record<ZoneId, THREE.Vector3> = {
  stack: new THREE.Vector3(-3.4, 0, -1.65),
  apis: new THREE.Vector3(3.4, 0, -1.65),
  microtasks: new THREE.Vector3(3.4, 0, 2.1),
  tasks: new THREE.Vector3(-3.4, 0, 2.1),
};

interface Props {
  frame: Frame;
  playing: boolean;
  runtime: Scenario["runtime"];
  resetView: number;
}

interface SceneHandle {
  update: (frame: Frame) => void;
  reset: () => void;
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
      child.geometry.dispose();
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      materials.forEach(
        (material: THREE.Material & { map?: THREE.Texture | null }) => {
          material.map?.dispose();
          material.dispose();
        },
      );
    }
  });
}

export default function RuntimeScene({
  frame,
  playing,
  runtime,
  resetView,
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Partial<Record<ZoneId, HTMLButtonElement | null>>>(
    {},
  );
  const centerLabel = useRef<HTMLDivElement>(null);
  const sceneHandle = useRef<SceneHandle | null>(null);
  const playingRef = useRef(playing);
  const frameRef = useRef(frame);
  const [selectedZone, setSelectedZone] = useState<ZoneId | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);
  useEffect(() => {
    frameRef.current = frame;
    sceneHandle.current?.update(frame);
  }, [frame]);
  useEffect(() => {
    sceneHandle.current?.reset();
  }, [resetView]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setUnavailable(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-8, 8, 4.4, -4.4, 0.1, 80);
    camera.position.set(6, 13, 22);
    camera.lookAt(0, 0.2, 0.25);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.prepend(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.2, 0.25);
    controls.enableDamping = true;
    controls.dampingFactor = 0.065;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = 0.45;
    controls.maxPolarAngle = 1.15;
    controls.minAzimuthAngle = -0.45;
    controls.maxAzimuthAngle = 1.25;
    controls.update();
    controls.saveState();

    scene.add(new THREE.AmbientLight(0xffffff, 1.7));
    const keyLight = new THREE.DirectionalLight(0xfffdf1, 2.6);
    keyLight.position.set(-4, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.left = -9;
    keyLight.shadow.camera.right = 9;
    keyLight.shadow.camera.top = 9;
    keyLight.shadow.camera.bottom = -9;
    keyLight.shadow.normalBias = 0.04;
    keyLight.shadow.bias = -0.0001;
    keyLight.shadow.radius = 4;
    scene.add(keyLight);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.ShadowMaterial({ opacity: 0.11 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.13;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(40, 64, "#ccd3c4", "#ccd3c4");
    grid.position.y = -0.12;
    const gridMaterial = grid.material as THREE.Material;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.16;
    scene.add(grid);

    const stationGroups = {} as Record<ZoneId, THREE.Group>;
    const taskGroups = {} as Record<ZoneId, THREE.Group>;
    const platformMaterials = {} as Record<ZoneId, THREE.MeshStandardMaterial>;

    zones.forEach((zone) => {
      const group = new THREE.Group();
      group.position.copy(positions[zone]);
      scene.add(group);
      stationGroups[zone] = group;

      const baseMaterial = new THREE.MeshStandardMaterial({
        color: zoneDetails[zone].color,
        roughness: 0.6,
        metalness: 0.02,
      });
      platformMaterials[zone] = baseMaterial;
      const base = new THREE.Mesh(
        new RoundedBoxGeometry(2.7, 0.19, 1.65, 4, 0.09),
        baseMaterial,
      );
      base.position.y = 0.02;
      base.castShadow = true;
      base.receiveShadow = true;
      group.add(base);

      const top = new THREE.Mesh(
        new RoundedBoxGeometry(2.54, 0.045, 1.48, 3, 0.02),
        new THREE.MeshStandardMaterial({
          color: zoneDetails[zone].color,
          roughness: 0.8,
          transparent: true,
          opacity: 0.45,
        }),
      );
      top.position.y = 0.135;
      group.add(top);

      const taskGroup = new THREE.Group();
      group.add(taskGroup);
      taskGroups[zone] = taskGroup;

      const start = positions[zone].clone().setY(-0.04);
      const end = start.clone().multiplyScalar(0.33).setY(-0.04);
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([start, end]),
        new THREE.LineDashedMaterial({
          color: "#8f9e8a",
          dashSize: 0.11,
          gapSize: 0.1,
          transparent: true,
          opacity: 0.5,
        }),
      );
      line.computeLineDistances();
      scene.add(line);
    });

    const loopGroup = new THREE.Group();
    loopGroup.position.set(0, 0.015, 0.2);
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(1.36, 1.36, 0.07, 80),
      new THREE.MeshStandardMaterial({
        color: "#e5eadb",
        transparent: true,
        opacity: 0.6,
        roughness: 0.9,
      }),
    );
    disc.position.y = -0.015;
    loopGroup.add(disc);

    const track = new THREE.Mesh(
      new THREE.TorusGeometry(1.17, 0.027, 8, 100),
      new THREE.MeshStandardMaterial({ color: "#7e9b61", roughness: 0.7 }),
    );
    track.rotation.x = Math.PI / 2;
    track.position.y = 0.065;
    loopGroup.add(track);

    const innerTrack = new THREE.Mesh(
      new THREE.TorusGeometry(1.05, 0.009, 6, 80),
      new THREE.MeshBasicMaterial({
        color: "#a9ba95",
        transparent: true,
        opacity: 0.55,
      }),
    );
    innerTrack.rotation.x = Math.PI / 2;
    innerTrack.position.y = 0.065;
    loopGroup.add(innerTrack);

    [0.3, Math.PI + 0.3].forEach((angle) => {
      const arrow = new THREE.Mesh(
        new THREE.ConeGeometry(0.095, 0.24, 3),
        new THREE.MeshStandardMaterial({ color: "#668847", roughness: 0.6 }),
      );
      arrow.position.set(Math.cos(angle) * 1.17, 0.07, Math.sin(angle) * 1.17);
      arrow.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)),
      );
      loopGroup.add(arrow);
    });
    scene.add(loopGroup);

    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.085, 20, 20),
      new THREE.MeshStandardMaterial({
        color: "#496e31",
        emissive: "#9cb766",
        emissiveIntensity: 0.15,
      }),
    );
    loopGroup.add(orb);

    const movingTask = new THREE.Mesh(
      new RoundedBoxGeometry(0.28, 0.28, 0.28, 3, 0.065),
      new THREE.MeshStandardMaterial({ color: "#436b38", roughness: 0.3 }),
    );
    movingTask.castShadow = true;
    movingTask.visible = false;
    scene.add(movingTask);

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reducedMotion = motionPreference.matches;
    const onMotionChange = () => {
      reducedMotion = motionPreference.matches;
      needsRender = true;
    };
    motionPreference.addEventListener("change", onMotionChange);
    let transfer: Frame["transfer"];
    let transferStart = 0;
    let currentActive: ZoneId | null = null;
    let needsRender = true;
    let visible = true;
    const invalidate = () => {
      needsRender = true;
    };
    controls.addEventListener("change", invalidate);

    function update(nextFrame: Frame) {
      needsRender = true;
      currentActive = nextFrame.active;
      transfer = nextFrame.transfer;
      transferStart = performance.now();
      zones.forEach((zone) => {
        const taskGroup = taskGroups[zone];
        disposeObject(taskGroup);
        taskGroup.clear();
        const items = nextFrame[zone];
        const slots = Math.max(items.length, 3);

        for (let index = 0; index < slots; index++) {
          const label = items[index];
          const geometry = new RoundedBoxGeometry(2.18, 0.31, 1.02, 3, 0.06);
          const material = new THREE.MeshStandardMaterial({
            color: zoneDetails[zone].color,
            transparent: true,
            opacity: label ? 0.95 : 0.2,
            roughness: 0.48,
            metalness: 0.01,
            depthWrite: !!label,
          });
          const block = new THREE.Mesh(geometry, material);
          block.position.set(0, 0.34 + index * 0.37, 0);
          block.castShadow = !!label;
          block.receiveShadow = true;
          taskGroup.add(block);

          const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(new THREE.BoxGeometry(2.1, 0.26, 0.96)),
            new THREE.LineBasicMaterial({
              color: zoneDetails[zone].color,
              transparent: true,
              opacity: label ? 0.28 : 0.48,
            }),
          );
          edges.position.copy(block.position);
          taskGroup.add(edges);

          if (label) {
            const canvas = document.createElement("canvas");
            canvas.width = 768;
            canvas.height = 176;
            const context = canvas.getContext("2d");
            if (context) {
              context.font = "500 68px monospace";
              context.fillStyle = "#293c2f";
              context.textAlign = "center";
              context.textBaseline = "middle";
              context.fillText(label, 384, 88, 712);
              const texture = new THREE.CanvasTexture(canvas);
              texture.colorSpace = THREE.SRGBColorSpace;
              texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
              const text = new THREE.Mesh(
                new THREE.PlaneGeometry(2.1, 0.74),
                new THREE.MeshBasicMaterial({
                  map: texture,
                  transparent: true,
                  depthWrite: false,
                  side: THREE.DoubleSide,
                }),
              );
              text.rotation.x = -Math.PI / 2;
              text.position.set(0, block.position.y + 0.159, 0);
              taskGroup.add(text);
            }
          }
        }
      });
    }

    sceneHandle.current = {
      update,
      reset: () => {
        // Clear orbit inertia before restoring the saved camera.
        controls.enableDamping = false;
        controls.update();
        controls.reset();
        controls.enableDamping = true;
      },
    };
    update(frameRef.current);

    let width = 1;
    let height = 1;
    const resize = () => {
      needsRender = true;
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;
      const aspect = width / height;
      const viewHeight = Math.max(6.6, 12.5 / aspect);
      camera.left = (-viewHeight * aspect) / 2;
      camera.right = (viewHeight * aspect) / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) needsRender = true;
    });
    visibilityObserver.observe(mount);
    resize();

    const projected = new THREE.Vector3();
    const center = new THREE.Vector3(0, 0.08, 0.23);
    let animationFrame: number;
    let angle = -0.45;
    let lastTime = performance.now();
    function animate(now: number) {
      animationFrame = requestAnimationFrame(animate);
      const elapsed = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      controls.update();

      const progress = (now - transferStart) / 850;
      const inMotion =
        !reducedMotion &&
        (playingRef.current ||
          (!!transfer && progress < 1) ||
          movingTask.visible);
      if (!visible || document.hidden || (!needsRender && !inMotion)) return;
      needsRender = false;

      if (playingRef.current && !reducedMotion) angle += elapsed * 0.7;
      orb.position.set(Math.cos(angle) * 1.17, 0.115, Math.sin(angle) * 1.17);

      zones.forEach((zone) => {
        platformMaterials[zone].emissive.set(
          currentActive === zone ? zoneDetails[zone].color : "#000000",
        );
        platformMaterials[zone].emissiveIntensity =
          currentActive === zone ? 0.22 : 0;
        stationGroups[zone].position.y =
          currentActive === zone && playingRef.current && !reducedMotion
            ? Math.sin(now * 0.003) * 0.025
            : 0;
        projected
          .copy(positions[zone])
          .add(
            zone === "stack" || zone === "apis"
              ? new THREE.Vector3(0, 1.4, 0)
              : new THREE.Vector3(0, -0.12, 1.13),
          )
          .project(camera);
        const label = labelRefs.current[zone];
        if (label) {
          label.style.left = `${(projected.x * 0.5 + 0.5) * width}px`;
          label.style.top = `${(-projected.y * 0.5 + 0.5) * height}px`;
        }
      });

      projected.copy(center).project(camera);
      if (centerLabel.current) {
        centerLabel.current.style.left = `${(projected.x * 0.5 + 0.5) * width}px`;
        centerLabel.current.style.top = `${(-projected.y * 0.5 + 0.5) * height}px`;
      }

      movingTask.visible = !!transfer && progress < 1 && !reducedMotion;
      if (transfer && movingTask.visible) {
        movingTask.position.lerpVectors(
          positions[transfer.from],
          positions[transfer.to],
          Math.min(progress, 1),
        );
        movingTask.position.y = 0.85 + Math.sin(progress * Math.PI) * 1.5;
        movingTask.rotation.set(progress * Math.PI, progress * Math.PI, 0);
      }
      renderer.render(scene, camera);
    }
    animationFrame = requestAnimationFrame(animate);

    const contextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(animationFrame);
      setUnavailable(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      visibilityObserver.disconnect();
      motionPreference.removeEventListener("change", onMotionChange);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      controls.removeEventListener("change", invalidate);
      controls.dispose();
      disposeObject(scene);
      keyLight.shadow.dispose();
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
      <div className="scene-dimension">3D WORKSPACE</div>
      {unavailable && (
        <p className="fallback-notice">
          3D is unavailable on this device. The live queue view and simulations
          still work.
        </p>
      )}

      <div className="scene-center-label" ref={centerLabel} aria-hidden="true">
        <span>EVENT</span>
        <span>LOOP</span>
      </div>

      {zones.map((zone) => {
        const info = getZoneDetails(zone, runtime);
        return (
          <button
            key={zone}
            ref={(element) => {
              labelRefs.current[zone] = element;
            }}
            className={`zone-label zone-${zone} ${frame.active === zone ? "zone-active" : ""} ${selectedZone === zone ? "zone-selected" : ""}`}
            onClick={() => setSelectedZone(selectedZone === zone ? null : zone)}
            aria-label={`${info.title}: ${frame[zone].length} ${zone === "apis" ? "registered operations" : "items"}. Learn more`}
            aria-expanded={selectedZone === zone}
          >
            <span className="zone-name">
              <i style={{ backgroundColor: info.color }} />
              {info.title}
              <span className="zone-count">{frame[zone].length}</span>
            </span>
            <span className="zone-caption">
              {zone === "stack"
                ? "LAST IN, FIRST OUT"
                : zone === "apis"
                  ? "HOST ENVIRONMENT"
                  : zone === "microtasks"
                    ? "DRAINED BEFORE TASKS"
                    : runtime === "node"
                      ? "POLL / CHECK / TIMERS"
                      : "ONE TASK AT A TIME"}
            </span>
            {unavailable && (
              <span className="fallback-items">
                {frame[zone].join(" / ") || "Empty"}
              </span>
            )}
          </button>
        );
      })}

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
        <MoveUpRight size={12} />
        <span>
          {unavailable
            ? "Click a component to learn more"
            : "Drag to orbit. Click a component to explore."}
        </span>
      </div>
      <div className="scene-axis" aria-hidden="true">
        <span>y</span>
        <i />
        <span>x</span>
        <span>z</span>
      </div>
    </div>
  );
}
