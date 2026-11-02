/** Reveal one selected reading path without moving the document or fighting a visible selection. */
export function selectedTimelineScrollLeft(
  viewport: { left: number; width: number; scrollLeft: number; scrollWidth: number },
  selected: { left: number; right: number }[],
): number | undefined {
  if (viewport.width <= 0 || viewport.scrollWidth <= viewport.width || !selected.length) return;
  const right = viewport.left + viewport.width;
  // With several selected lines, a visible one is sufficient. Never cycle through them.
  if (selected.some(card => card.left >= viewport.left - 1 && card.right <= right + 1)) return;
  const candidates = selected.map(card => {
    const delta = card.left < viewport.left ? card.left - viewport.left : card.right - right;
    return Math.max(0, Math.min(viewport.scrollWidth - viewport.width, viewport.scrollLeft + delta));
  });
  return candidates.reduce((nearest, candidate) => Math.abs(candidate - viewport.scrollLeft) < Math.abs(nearest - viewport.scrollLeft) ? candidate : nearest);
}
