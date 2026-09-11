import { CatmullRomCurve3, MathUtils, Vector3 } from "three";

export interface RoadTravelState {
  stopIndex: number;
  targetIndex: number;
  traveling: boolean;
}

/** A button-driven trip measured in world-space distance, not spline parameter. */
export class RoadJourney {
  private curve: CatmullRomCurve3 | null = null;
  private length = 0;
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
    this.sample(this.distance, position);
    this.sample(this.distance + 3.5, lookAt);
    position.y += 1.65;
    lookAt.y += 1.05;
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
