import { test } from "node:test";
import assert from "node:assert/strict";
import { CatmullRomCurve3, Vector3 } from "three";
import { RoadJourney, createRoadControls } from "../src/road-journey.ts";

function fixture() {
  const curve = new CatmullRomCurve3(
    [
      new Vector3(0, 0, 5),
      new Vector3(0, 0, 0),
      new Vector3(5, 0, -5),
      new Vector3(-3, 0, -12),
      new Vector3(4, 0, -20),
      new Vector3(0, 0, -30),
      new Vector3(3, 0, -40),
    ],
    false,
    "centripetal",
  );
  curve.arcLengthDivisions = 600;
  const journey = new RoadJourney();
  journey.setRoute(curve, [1, 2, 3, 4, 5]);
  return { curve, journey };
}

test("starts before the first stop and cannot go behind the beginning", () => {
  const { journey } = fixture();
  assert.deepEqual(journey.state, {
    stopIndex: -1,
    targetIndex: -1,
    traveling: false,
  });
  assert.equal(journey.move(-1), false);
  assert.ok(Math.abs(journey.distanceToStop(0) - 8) < 1e-8);
});

test("every stop is visited once; repeated commands cannot skip a moving leg", () => {
  const { journey } = fixture();
  for (let stop = 0; stop < 5; stop++) {
    assert.equal(journey.move(1), true);
    assert.equal(journey.move(1), false);
    assert.equal(journey.move(-1), false);
    assert.equal(journey.state.stopIndex, stop - 1);
    assert.equal(journey.update(10), true);
    assert.equal(journey.update(10), false);
    assert.equal(journey.state.stopIndex, stop);
    assert.ok(Math.abs(journey.distanceToStop(stop) - 4.5) < 1e-8);
  }
  assert.equal(journey.move(1), false);
  for (let stop = 3; stop >= -1; stop--) {
    assert.equal(journey.move(-1, true), true);
    assert.equal(journey.state.stopIndex, stop);
  }
});

test("camera glides forward with bounded sway and no sharp turns", () => {
  const { curve, journey } = fixture();
  const origin = curve.points[0];
  const forward = curve.points.at(-1).clone().sub(origin).setY(0).normalize();
  const right = new Vector3(-forward.z, 0, forward.x);
  const position = new Vector3(),
    lookAt = new Vector3();
  let previousAlong = -Infinity,
    previousYaw;
  let minSway = Infinity,
    maxSway = -Infinity;
  for (let stop = 0; stop < 5; stop++) {
    journey.move(1);
    while (journey.state.traveling) {
      journey.update(1 / 60);
      journey.getPose(position, lookAt);
      const relative = position.clone().sub(origin);
      const along = relative.dot(forward);
      const sway = relative.dot(right);
      const heading = lookAt.clone().sub(position).setY(0).normalize();
      const yaw = Math.atan2(heading.dot(right), heading.dot(forward));
      assert.ok(Math.abs(sway) < 0.85, "lateral movement stays controlled");
      assert.ok(Math.abs(yaw) < Math.PI / 36, "yaw stays under five degrees");
      assert.ok(
        along >= previousAlong - 1e-5,
        "advances without doubling back",
      );
      if (previousYaw !== undefined)
        assert.ok(
          Math.abs(yaw - previousYaw) < Math.PI / 360,
          "no sudden heading jump",
        );
      minSway = Math.min(minSway, sway);
      maxSway = Math.max(maxSway, sway);
      previousAlong = along;
      previousYaw = yaw;
    }
  }
  assert.ok(
    minSway < -0.65 && maxSway > 0.65,
    "more noticeable sway in both directions",
  );
});

test("road mode softens the line without mutating the overview or losing stops", () => {
  const { curve: original } = fixture();
  const before = original.points.map((point) => point.toArray());
  const layout = createRoadControls(original.points, [1, 2, 3, 4, 5]);
  const origin = original.points[0];
  const forward = original.points
    .at(-1)
    .clone()
    .sub(origin)
    .setY(0)
    .normalize();
  const right = new Vector3(-forward.z, 0, forward.x);
  assert.deepEqual(
    original.points.map((point) => point.toArray()),
    before,
  );
  assert.equal(layout.stopIndices.length, 5);
  assert.ok(layout.points.length > original.points.length);
  layout.stopIndices.forEach((index, stop) => {
    const along = layout.points[index].clone().sub(origin).dot(forward);
    const originalAlong = original.points[stop + 1]
      .clone()
      .sub(origin)
      .dot(forward);
    assert.ok(
      Math.abs(along - originalAlong) < 1e-8,
      "retains each experience's forward location",
    );
  });
  for (const point of layout.points) {
    assert.ok(
      Math.abs(point.clone().sub(origin).dot(right)) <= 1.01,
      "wide bends stay within one unit of the center",
    );
  }
});

test("camera and visible line remain aligned throughout every leg", () => {
  const { curve: original } = fixture();
  const layout = createRoadControls(original.points, [1, 2, 3, 4, 5]);
  const curve = new CatmullRomCurve3(layout.points, false, "centripetal");
  curve.arcLengthDivisions = 1200;
  const journey = new RoadJourney();
  journey.setRoute(curve, layout.stopIndices);
  const origin = curve.points[0];
  const forward = curve.points.at(-1).clone().sub(origin).setY(0).normalize();
  const position = new Vector3(),
    lookAt = new Vector3();
  const samples = Array.from({ length: 2401 }, (_, index) =>
    curve.getPointAt(index / 2400),
  );
  for (let stop = 0; stop < 5; stop++) {
    journey.move(1);
    while (journey.state.traveling) {
      journey.update(1 / 30);
      journey.getPose(position, lookAt);
      const height = position.y - origin.y;
      assert.ok(
        height > 2.2 && height < 2.6,
        "raised but still near-ground viewpoint",
      );
      const heading = lookAt.clone().sub(position);
      const pitch =
        (Math.atan2(-heading.y, Math.hypot(heading.x, heading.z)) * 180) /
        Math.PI;
      assert.ok(pitch > 12 && pitch < 15, "modest elevated viewing angle");
      const ground = position.clone().setY(origin.y);
      if (ground.clone().sub(origin).dot(forward) < 0) continue;
      const nearest = Math.min(
        ...samples.map((point) => point.distanceTo(ground)),
      );
      assert.ok(
        nearest < 0.25,
        "camera follows the line instead of crossing unrelated waves",
      );
    }
  }
});

test("experience cards alternate sides of the forward-facing camera", () => {
  const { journey } = fixture();
  const position = new Vector3(),
    lookAt = new Vector3(),
    anchor = new Vector3();
  for (let stop = 0; stop < 5; stop++) {
    journey.move(1, true);
    journey.getPose(position, lookAt);
    const heading = lookAt.clone().sub(position).setY(0).normalize();
    const screenRight = new Vector3(-heading.z, 0, heading.x);
    const side = stop % 2 ? -1 : 1;
    for (const offset of [0.7, 1.65]) {
      journey.getStopAnchor(stop, side * offset, anchor);
      assert.ok(
        anchor.clone().sub(position).dot(screenRight) * side > 0.1,
        "card stays on its intended side at narrow and wide offsets",
      );
    }
  }
});

test("camera remains stationary without a navigation command", () => {
  const { journey } = fixture();
  const a = new Vector3(),
    b = new Vector3(),
    look = new Vector3();
  journey.getPose(a, look);
  journey.update(100);
  journey.getPose(b, look);
  assert.ok(a.equals(b));
  journey.move(1, true);
  journey.getPose(a, look);
  journey.update(100);
  journey.getPose(b, look);
  assert.ok(a.equals(b));
});

test("reduced-motion navigation arrives immediately and can settle a live trip", () => {
  const { journey } = fixture();
  journey.move(1, true);
  assert.deepEqual(journey.state, {
    stopIndex: 0,
    targetIndex: 0,
    traveling: false,
  });
  journey.move(1);
  assert.equal(journey.update(0, true), true);
  assert.deepEqual(journey.state, {
    stopIndex: 1,
    targetIndex: 1,
    traveling: false,
  });
});

test("resize preserves a trip; reset returns to its original starting pose", () => {
  const { journey, curve } = fixture();
  const original = new Vector3(),
    look = new Vector3();
  journey.getPose(original, look);
  journey.move(1);
  journey.update(0.4);
  const midway = new Vector3(),
    rebuilt = new Vector3();
  journey.getPose(midway, look);
  journey.setRoute(curve, [1, 2, 3, 4, 5]);
  journey.getPose(rebuilt, look);
  assert.ok(midway.distanceTo(rebuilt) < 1e-8);
  assert.equal(journey.state.traveling, true);
  journey.reset();
  journey.getPose(rebuilt, look);
  assert.ok(original.distanceTo(rebuilt) < 1e-8);
  assert.equal(journey.state.stopIndex, -1);
});
