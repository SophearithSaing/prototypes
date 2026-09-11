import { CatmullRomCurve3, MathUtils, Vector3 } from "three";

// A shared wave keeps the visible line and the ride in phase. The camera
// follows 80% of the road's lateral movement instead of cutting across it.
const ROAD_AMPLITUDE = 1;
const ROAD_WAVES = 2;
const SWAY_AMPLITUDE = 0.8;
const LOOK_AHEAD = 12;
const HEADING_OFFSET = 0.85;

// Experimental raised view: about 13.1 degrees downward at LOOK_AHEAD = 12.
const CAMERA_HEIGHT = 2.4;
const CAMERA_LOOK_DOWN = 2.8;
// Previous low view -- restore these two values to revert the height/angle:
// const CAMERA_HEIGHT = 1.65;
// const CAMERA_LOOK_DOWN = 1.8; // about 8.5 degrees downward
// Previous softer movement: SWAY_AMPLITUDE = 0.45; HEADING_OFFSET = 0.42.

function wavePhase(along: number, span: number): number {
  return span > 0 ? (along * Math.PI * 2 * ROAD_WAVES) / span : 0;
}

/** Replace the road-mode hairpins with broad waves, retaining every stop. */
export function createRoadControls(source: Vector3[], stopIndices: number[]) {
  const origin = source[0];
  const forward = source[source.length - 1].clone().sub(origin).setY(0);
  const span = forward.length();
  if (span < 1e-8)
    return {
      points: source.map((point) => point.clone()),
      stopIndices: [...stopIndices],
    };
  forward.normalize();
  const right = new Vector3(-forward.z, 0, forward.x);
  const points: Vector3[] = [];
  const remap: number[] = [];
  let previousAlong = 0;
  source.forEach((point, index) => {
    const along = point.clone().sub(origin).dot(forward);
    // Dense samples prevent the spline from reintroducing tight turns between
    // the unevenly spaced experience markers.
    const steps =
      index === 0
        ? 0
        : Math.max(1, Math.ceil(Math.abs(along - previousAlong) / 0.6));
    for (let step = index === 0 ? 0 : 1; step <= steps; step++) {
      const at = steps ? MathUtils.lerp(previousAlong, along, step / steps) : 0;
      points.push(
        origin
          .clone()
          .addScaledVector(forward, at)
          .addScaledVector(
            right,
            Math.sin(wavePhase(at, span)) * ROAD_AMPLITUDE,
          ),
      );
    }
    remap.push(points.length - 1);
    previousAlong = along;
  });
  return { points, stopIndices: stopIndices.map((index) => remap[index]) };
}

export interface RoadTravelState {
  stopIndex: number;
  targetIndex: number;
  traveling: boolean;
}

/** A button-driven trip measured in world-space distance, not spline parameter. */
export class RoadJourney {
  private curve: CatmullRomCurve3 | null = null;
  private length = 0;
  private span = 0;
  private stops: number[] = [];
  private distance = 0;
  private stopIndex = -1;
  private targetIndex = -1;
  private transition: {
    from: number;
    to: number;
    elapsed: number;
    duration: number;
  } | null = null;
  private readonly tangent = new Vector3();
  private readonly origin = new Vector3();
  private readonly forward = new Vector3(0, 0, -1);
  private readonly right = new Vector3(1, 0, 0);
  private readonly anchorCamera = new Vector3();

  get state(): RoadTravelState {
    return {
      stopIndex: this.stopIndex,
      targetIndex: this.targetIndex,
      traveling: this.transition !== null,
    };
  }

  setRoute(curve: CatmullRomCurve3, controlIndices: number[]): void {
    const progress = this.transition
      ? this.transition.elapsed / this.transition.duration
      : 0;
    this.curve = curve;
    this.origin.copy(curve.points[0]);
    this.forward
      .subVectors(curve.points[curve.points.length - 1], this.origin)
      .setY(0);
    this.span = this.forward.length();
    if (this.forward.lengthSq() < 1e-8) this.forward.set(0, 0, -1);
    else this.forward.normalize();
    this.right.set(-this.forward.z, 0, this.forward.x);
    const lengths = curve.getLengths();
    this.length = lengths[lengths.length - 1];
    this.stops = controlIndices.map((index) => {
      const sample = (index / (curve.points.length - 1)) * (lengths.length - 1);
      const lower = Math.floor(sample);
      return MathUtils.lerp(
        lengths[lower],
        lengths[Math.min(lower + 1, lengths.length - 1)],
        sample - lower,
      );
    });
    if (this.transition) {
      this.transition = this.makeTransition(this.targetIndex);
      this.transition.elapsed = this.transition.duration * progress;
      this.update(0);
    } else {
      this.distance = this.cameraDistance(this.stopIndex);
    }
  }

  reset(): void {
    this.stopIndex = this.targetIndex = -1;
    this.transition = null;
    this.distance = this.cameraDistance(-1);
  }

  move(direction: -1 | 1, immediate = false): boolean {
    const target = this.stopIndex + direction;
    if (
      !this.curve ||
      this.transition ||
      target < -1 ||
      target >= this.stops.length
    )
      return false;
    this.targetIndex = target;
    this.transition = this.makeTransition(target);
    this.update(0, immediate);
    return true;
  }

  /** Returns true once on arrival; ambient animation can be paused independently. */
  update(delta: number, immediate = false): boolean {
    if (!this.transition) return false;
    const trip = this.transition;
    trip.elapsed = immediate
      ? trip.duration
      : Math.min(trip.duration, trip.elapsed + Math.max(0, delta));
    const t = trip.elapsed / trip.duration;
    const eased = t * t * t * (t * (t * 6 - 15) + 10);
    this.distance = MathUtils.lerp(trip.from, trip.to, eased);
    if (t < 1) return false;
    this.stopIndex = this.targetIndex;
    this.transition = null;
    return true;
  }

  getPose(position: Vector3, lookAt: Vector3): void {
    // Follow the same broad wave as the road with a slightly softer lateral
    // amplitude and modest steering, keeping the horizon level.
    const along = this.sampleRail(this.distance, position);
    const phase = wavePhase(along, this.span);
    position.addScaledVector(this.right, Math.sin(phase) * SWAY_AMPLITUDE);
    position.y += CAMERA_HEIGHT;
    lookAt
      .copy(position)
      .addScaledVector(this.forward, LOOK_AHEAD)
      .addScaledVector(this.right, Math.cos(phase) * HEADING_OFFSET);
    lookAt.y -= CAMERA_LOOK_DOWN;
  }

  getStopAnchor(index: number, sideOffset: number, result: Vector3): void {
    // Place each card beside its arrival view. This is a fixed world anchor,
    // not a camera-following HUD, and keeps its assigned side with stronger sway.
    const markerAlong = this.sampleRail(this.stops[index], result);
    const cameraAlong = this.sampleRail(
      this.cameraDistance(index),
      this.anchorCamera,
    );
    const phase = wavePhase(cameraAlong, this.span);
    const arrivalCenter =
      Math.sin(phase) * SWAY_AMPLITUDE +
      ((markerAlong - cameraAlong) * Math.cos(phase) * HEADING_OFFSET) /
        LOOK_AHEAD;
    result.addScaledVector(this.right, arrivalCenter + sideOffset);
    result.y += 1.8;
  }

  distanceToStop(index: number): number {
    return this.stops[index] - this.distance;
  }

  private cameraDistance(index: number): number {
    // Stop before the marker so the floating experience remains in front of us.
    const first = (this.stops[0] ?? 4.5) - 4.5;
    return index < 0 ? first - 3.5 : this.stops[index] - 4.5;
  }

  private makeTransition(target: number) {
    const from = this.cameraDistance(this.stopIndex);
    const to = this.cameraDistance(target);
    return {
      from,
      to,
      elapsed: 0,
      duration: MathUtils.clamp(Math.abs(to - from) / 7, 1.4, 3),
    };
  }

  private sampleRail(distance: number, result: Vector3): number {
    this.sample(distance, result);
    const along = result.sub(this.origin).dot(this.forward);
    result.copy(this.origin).addScaledVector(this.forward, along);
    return along;
  }

  private sample(distance: number, result: Vector3): void {
    if (!this.curve || !this.length) {
      result.set(0, 0, 0);
      return;
    }
    const bounded = MathUtils.clamp(distance, 0, this.length);
    this.curve.getPointAt(bounded / this.length, result);
    if (distance !== bounded) {
      this.curve.getTangentAt(bounded / this.length, this.tangent);
      result.addScaledVector(this.tangent, distance - bounded);
    }
  }
}
