import * as THREE from "three";
import { columnHeight, type ActivityDay } from "./activity-data";

export interface ActivityScene {
  setDays: (days: ActivityDay[]) => void;
  dispose: () => void;
}

export function createActivityScene(
  canvas: HTMLCanvasElement,
  onInspect: (day: ActivityDay, keyboard: boolean, screenX: number) => void,
): ActivityScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    // Keep the on-demand render visible between interactions and scrolls.
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-20, 20, 8, -8, 0.1, 100);
  camera.position.set(6, 18, 23);
  camera.lookAt(0, 0.4, 0);

  scene.add(new THREE.HemisphereLight(0xdaf8ee, 0x112024, 2.4));
  const light = new THREE.DirectionalLight(0xf2ffe6, 3);
  light.position.set(-8, 18, -10);
  light.castShadow = true;
  light.shadow.mapSize.set(2048, 1024);
  light.shadow.camera.left = -22;
  light.shadow.camera.right = 22;
  light.shadow.camera.top = 12;
  light.shadow.camera.bottom = -12;
  light.shadow.normalBias = 0.025;
  scene.add(light);
  const rim = new THREE.DirectionalLight(0x00dce7, 1.1);
  rim.position.set(8, 4, 10);
  scene.add(rim);

  const geometry = new THREE.BoxGeometry(0.48, 1, 0.48);
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.38,
    metalness: 0.18,
  });
  const deckMaterial = new THREE.MeshStandardMaterial({
    color: "#0e1b20",
    roughness: 0.75,
    metalness: 0.3,
  });
  const selectionBox = new THREE.BoxGeometry(0.5, 1, 0.5);
  const outlineGeometry = new THREE.EdgesGeometry(selectionBox);
  selectionBox.dispose();
  const outlineMaterial = new THREE.LineBasicMaterial({ color: "#e3ffb8" });
  const selected = new THREE.LineSegments(outlineGeometry, outlineMaterial);
  selected.visible = false;
  scene.add(selected);

  let days: ActivityDay[] = [];
  let bars: THREE.InstancedMesh | undefined;
  let deck: THREE.Mesh | undefined;
  let frame: THREE.LineSegments | undefined;
  const labels = new THREE.Group();
  scene.add(labels);
  const heights: number[] = [];
  const positions: THREE.Vector3[] = [];
  const dummy = new THREE.Object3D();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const color = new THREE.Color();
  const low = new THREE.Color("#126c64");
  const high = new THREE.Color("#a6ee61");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let width = 34;
  let selectedIndex = -1;
  let animationStart = 0;
  let animationFrame = 0;
  let intersecting = false;
  let disposed = false;
  let progress = 1;

  function clearLabels() {
    for (const child of [...labels.children]) {
      const mesh = child as THREE.Mesh<
        THREE.PlaneGeometry,
        THREE.MeshBasicMaterial
      >;
      mesh.geometry.dispose();
      mesh.material.map?.dispose();
      mesh.material.dispose();
      labels.remove(mesh);
    }
  }

  function addLabel(text: string, x: number, z: number, labelWidth = 1.5) {
    const image = document.createElement("canvas");
    image.width = 192;
    image.height = 64;
    const context = image.getContext("2d")!;
    context.font = '500 52px "DM Sans", sans-serif';
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#9fb4b3";
    context.fillText(text, 96, 32);
    const texture = new THREE.CanvasTexture(image);
    texture.colorSpace = THREE.SRGBColorSpace;
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(labelWidth, 0.56),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      }),
    );
    label.rotation.x = -Math.PI / 2;
    label.position.set(x, 0.012, z);
    labels.add(label);
  }

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    const aspect = w / h;
    const halfWidth = Math.max((width + 4.5) / 2, 7.2 * aspect);
    camera.left = -halfWidth;
    camera.right = halfWidth;
    camera.top = halfWidth / aspect;
    camera.bottom = -halfWidth / aspect;
    camera.updateProjectionMatrix();
    render();
  }

  function updateColumns(amount: number) {
    if (!bars) return;
    for (let index = 0; index < days.length; index++) {
      const height = 0.055 + (heights[index] - 0.055) * amount;
      dummy.position.copy(positions[index]);
      dummy.position.y = height / 2;
      dummy.scale.set(1, height, 1);
      dummy.updateMatrix();
      bars.setMatrixAt(index, dummy.matrix);
    }
    bars.instanceMatrix.needsUpdate = true;
    bars.computeBoundingSphere();
    if (selectedIndex >= 0) positionSelection();
  }

  function render() {
    if (!disposed && intersecting && !document.hidden)
      renderer.render(scene, camera);
  }

  function animate(time: number) {
    animationFrame = 0;
    if (disposed || !intersecting || document.hidden) return;
    if (!animationStart) animationStart = time;
    const elapsed = Math.min((time - animationStart) / 900, 1);
    progress = 1 - Math.pow(1 - elapsed, 3);
    updateColumns(progress);
    render();
    if (elapsed < 1) animationFrame = requestAnimationFrame(animate);
  }

  function resume() {
    if (!intersecting || document.hidden || disposed) return;
    if (progress < 1 && !animationFrame)
      animationFrame = requestAnimationFrame(animate);
    else render();
  }

  function positionSelection() {
    const height = 0.055 + (heights[selectedIndex] - 0.055) * progress;
    selected.position.copy(positions[selectedIndex]);
    selected.position.y = height / 2 + 0.012;
    selected.scale.set(1, height + 0.025, 1);
  }

  function inspect(index: number, keyboard = false) {
    if (index < 0 || index >= days.length || days[index].future) return;
    if (index === selectedIndex && !keyboard) return;
    selectedIndex = index;
    selected.visible = true;
    positionSelection();
    const projected = selected.position.clone().project(camera);
    onInspect(
      days[index],
      keyboard,
      ((projected.x + 1) * canvas.clientWidth) / 2,
    );
    render();
  }

  function pick(event: PointerEvent) {
    if (!bars) return -1;
    const rect = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObject(bars)[0]?.instanceId ?? -1;
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    const index = pick(event);
    canvas.classList.toggle("is-hovering", index >= 0 && !days[index].future);
    inspect(index);
  }

  let pointerDown: [number, number] | undefined;
  function onPointerDown(event: PointerEvent) {
    pointerDown = [event.clientX, event.clientY];
  }
  function onPointerUp(event: PointerEvent) {
    if (
      pointerDown &&
      Math.hypot(
        event.clientX - pointerDown[0],
        event.clientY - pointerDown[1],
      ) < 8
    )
      inspect(pick(event));
    pointerDown = undefined;
  }
  function onPointerCancel() {
    pointerDown = undefined;
  }
  function onKeyDown(event: KeyboardEvent) {
    const offsets: Record<string, number> = {
      ArrowLeft: -7,
      ArrowRight: 7,
      ArrowUp: -1,
      ArrowDown: 1,
    };
    let last = days.length - 1;
    while (last >= 0 && days[last].future) last--;
    if (last < 0) return;
    const current = selectedIndex < 0 ? last : selectedIndex;
    if (event.key in offsets || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? last
            : current + offsets[event.key];
      inspect(THREE.MathUtils.clamp(next, 0, last), true);
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    intersecting = entry.isIntersecting;
    resume();
  });
  visibilityObserver.observe(canvas);
  document.addEventListener("visibilitychange", resume);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerCancel);
  canvas.addEventListener("keydown", onKeyDown);

  return {
    setDays(nextDays) {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      days = nextDays;
      selectedIndex = -1;
      selected.visible = false;
      clearLabels();
      if (bars) {
        scene.remove(bars);
        bars.dispose();
      }
      if (deck) {
        scene.remove(deck);
        deck.geometry.dispose();
      }
      if (frame) {
        scene.remove(frame);
        frame.geometry.dispose();
        (frame.material as THREE.Material).dispose();
      }
      const weeks = (days[days.length - 1]?.week ?? 52) + 1;
      width = weeks * 0.62;
      const peak = Math.max(
        1,
        ...days.filter((day) => !day.future).map((day) => day.count),
      );
      bars = new THREE.InstancedMesh(geometry, material, days.length);
      bars.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      bars.castShadow = true;
      bars.receiveShadow = true;
      heights.length = positions.length = 0;
      let lastLabelWeek = -2;
      days.forEach((day, index) => {
        const x = day.week * 0.62 - (width - 0.62) / 2;
        positions.push(new THREE.Vector3(x, 0, (day.weekday - 3) * 0.62));
        heights.push(columnHeight(day.future ? 0 : day.count, peak));
        if (day.future) color.set("#0c181d");
        else if (day.count === 0) color.set("#1c3438");
        else color.copy(low).lerp(high, Math.sqrt(day.count / peak));
        bars!.setColorAt(index, color);
        if (
          (index === 0 || day.date.endsWith("-01")) &&
          day.week - lastLabelWeek >= 2
        ) {
          const month = new Intl.DateTimeFormat("en", {
            month: "short",
            timeZone: "UTC",
          }).format(new Date(`${day.date}T00:00:00Z`));
          addLabel(month, x, 2.8);
          lastLabelWeek = day.week;
        }
      });
      bars.instanceColor!.needsUpdate = true;
      scene.add(bars);
      deck = new THREE.Mesh(
        new THREE.BoxGeometry(width + 2.4, 0.18, 7),
        deckMaterial,
      );
      deck.position.set(-0.3, -0.12, 0.25);
      deck.receiveShadow = true;
      scene.add(deck);
      frame = new THREE.LineSegments(
        new THREE.EdgesGeometry(deck.geometry),
        new THREE.LineBasicMaterial({
          color: "#294849",
          transparent: true,
          opacity: 0.65,
        }),
      );
      frame.position.copy(deck.position);
      scene.add(frame);
      for (const [row, text] of [
        [1, "Mon"],
        [3, "Wed"],
        [5, "Fri"],
      ] as const)
        addLabel(text, -width / 2 - 0.9, (row - 3) * 0.62, 1.15);
      progress = reducedMotion ? 1 : 0;
      animationStart = 0;
      updateColumns(progress);
      resize();
      resume();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", resume);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("keydown", onKeyDown);
      clearLabels();
      bars?.dispose();
      deck?.geometry.dispose();
      frame?.geometry.dispose();
      if (frame) (frame.material as THREE.Material).dispose();
      geometry.dispose();
      material.dispose();
      deckMaterial.dispose();
      outlineGeometry.dispose();
      outlineMaterial.dispose();
      light.shadow.dispose();
      renderer.dispose();
    },
  };
}
