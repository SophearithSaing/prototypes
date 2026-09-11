import { test } from "node:test";
import assert from "node:assert/strict";
import { CatmullRomCurve3, Vector3 } from "three";
import { RoadJourney } from "../src/road-journey.ts";

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

test("camera travels on the curve and turns with its look-ahead point", () => {
  const { curve, journey } = fixture();
  journey.move(1, true);
  journey.move(1, true);
  const before = new Vector3(),
    beforeLook = new Vector3();
  journey.getPose(before, beforeLook);
  journey.move(1);
  journey.update(0.7);
  const position = new Vector3(),
    lookAt = new Vector3();
  journey.getPose(position, lookAt);
  assert.ok(position.distanceTo(before) > 0.1);
  let nearest = Infinity;
  const groundPosition = position.clone();
  groundPosition.y -= 1.65;
  for (let i = 0; i <= 10000; i++)
    nearest = Math.min(
      nearest,
      curve.getPointAt(i / 10000).distanceTo(groundPosition),
    );
  assert.ok(nearest < 0.01, "camera stays on the luminous centerline");
  const beforeDirection = beforeLook.sub(before).normalize();
  const direction = lookAt.sub(position).normalize();
  assert.ok(
    direction.angleTo(beforeDirection) > 0.1,
    "view heading follows the bend",
  );
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
