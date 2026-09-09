import { describe, expect, it } from "vitest";
import { Vector3 } from "three";
import { createDiagramPath } from "./diagramGeometry";

describe("3D diagram paths", () => {
  const source = new Vector3(-180, 70, 14);
  const destination = new Vector3(180, -80, 14);
  const points = [
    source,
    new Vector3(-40, 70, 14),
    new Vector3(-40, -80, 14),
    destination,
  ];

  it("starts and finishes at the exact block slots", () => {
    const path = createDiagramPath(points);
    expect(path.getPointAt(0).distanceTo(source)).toBeLessThan(0.0001);
    expect(path.getPointAt(1).distanceTo(destination)).toBeLessThan(0.0001);
  });

  it("rounds corners without jumping or changing depth", () => {
    const path = createDiagramPath(points);
    let previous = path.getPointAt(0);
    for (let index = 1; index <= 100; index++) {
      const point = path.getPointAt(index / 100);
      expect(point.z).toBeCloseTo(14);
      expect(point.distanceTo(previous)).toBeLessThan(
        (path.getLength() / 100) * 1.1,
      );
      expect(point.x).toBeGreaterThanOrEqual(source.x);
      expect(point.x).toBeLessThanOrEqual(destination.x);
      expect(point.y).toBeGreaterThanOrEqual(destination.y);
      expect(point.y).toBeLessThanOrEqual(source.y);
      previous = point;
    }
  });

  it("handles coincident slot and connector points", () => {
    const path = createDiagramPath([
      source,
      source.clone(),
      ...points,
      destination.clone(),
    ]);
    for (const point of path.getPoints(20)) {
      expect([point.x, point.y, point.z].every(Number.isFinite)).toBe(true);
    }
    expect(path.getPointAt(1).distanceTo(destination)).toBeLessThan(0.0001);
  });
});
