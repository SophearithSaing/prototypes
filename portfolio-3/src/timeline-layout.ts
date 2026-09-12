/** Normalized layout shared by the WebGL scene and its HTML-only fallback. */
export function timelineLayout(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const progress = count === 1 ? 0.5 : index / (count - 1);
    return { x: 0.47 + progress * 0.06, y: 0.75 - progress * 0.6, progress };
  });
}

export function extraTimelineHeight(count: number): number {
  return Math.max(0, count - 5) * 170;
}
