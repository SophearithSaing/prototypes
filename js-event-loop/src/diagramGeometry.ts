import { CurvePath, LineCurve3, QuadraticBezierCurve3, Vector3 } from "three";
import type { ZoneId } from "./scenarios";

export type DiagramBoxes = Record<
  ZoneId,
  { x: number; y: number; width: number; height: number }
>;

export function createDiagramLayout(boxes: DiagramBoxes) {
  const { stack: s, apis: a, tasks: t, microtasks: m } = boxes;
  const right = s.x + s.width;
  const bottom = s.y + s.height;
  const middle = (right + a.x) / 2;
  const gap = (bottom + t.y) / 2;
  const points: Record<string, [number, number][]> = {
    "stack-apis": [
      [right, s.y + 44],
      [a.x, a.y + 44],
    ],
    "stack-microtasks": [
      [right, s.y + 104],
      [middle + 10, s.y + 104],
      [middle + 10, m.y + 35],
      [m.x, m.y + 35],
    ],
    "apis-tasks": [
      [a.x + a.width * 0.7, a.y + a.height],
      [a.x + a.width * 0.7, gap + 12],
      [t.x + t.width * 0.72, gap + 12],
      [t.x + t.width * 0.72, t.y],
    ],
    "microtasks-stack": [
      [m.x, m.y + 78],
      [middle - 10, m.y + 78],
      [middle - 10, gap - 12],
      [s.x + s.width * 0.73, gap - 12],
      [s.x + s.width * 0.73, bottom],
    ],
    "tasks-stack": [
      [t.x + t.width * 0.25, t.y],
      [s.x + s.width * 0.25, bottom],
    ],
    "stack-tasks": [
      [s.x + s.width * 0.49, bottom],
      [t.x + t.width * 0.49, t.y],
    ],
  };
  return {
    points,
    paths: Object.fromEntries(
      Object.entries(points).map(([key, route]) => [
        key,
        route
          .map(([x, y], index) => `${index ? "L" : "M"} ${x} ${y}`)
          .join(" "),
      ]),
    ),
    loop: { x: t.x + t.width * 0.25, y: gap },
    delegate: { x: middle, y: s.y + 33 },
  };
}

export function createDiagramPath(points: readonly Vector3[]) {
  const distinct = points.filter(
    (point, index) =>
      index === 0 || point.distanceToSquared(points[index - 1]) > 0.0001,
  );
  const path = new CurvePath<Vector3>();
  let previous = distinct[0];

  for (let index = 1; index < distinct.length - 1; index++) {
    const corner = distinct[index];
    const before = distinct[index - 1];
    const after = distinct[index + 1];
    const radius = Math.min(
      7,
      corner.distanceTo(before) / 2,
      corner.distanceTo(after) / 2,
    );
    const entry = corner
      .clone()
      .lerp(before, radius / corner.distanceTo(before));
    const exit = corner.clone().lerp(after, radius / corner.distanceTo(after));
    path.add(new LineCurve3(previous, entry));
    path.add(new QuadraticBezierCurve3(entry, corner, exit));
    previous = exit;
  }

  if (previous) path.add(new LineCurve3(previous, distinct.at(-1)!));
  return path;
}
