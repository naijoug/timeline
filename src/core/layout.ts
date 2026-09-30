export interface Cluster<T> {
  id: string;
  events: T[];
  position: number;
}
/** Positions are fractions of the viewport. Clustering never drops content. */
export function clusterItems<T>(
  items: T[],
  position: (item: T) => number,
  width: number,
): Cluster<T>[] {
  const columns = Math.max(1, Math.floor(width / 132));
  const buckets = new Map<number, T[]>();
  for (const item of items) {
    const key = Math.max(
      0,
      Math.min(columns - 1, Math.floor(position(item) * columns)),
    );
    buckets.set(key, [...(buckets.get(key) || []), item]);
  }
  const result = [...buckets.entries()]
    .sort(([a], [b]) => a - b)
    .map(([key, events]) => ({
      id: `bucket-${key}`,
      events,
      position: events.reduce((sum, e) => sum + position(e), 0) / events.length,
    }));
  const labelWidth = Math.min(116, width);
  const left = (c: Cluster<T>) =>
    Math.max(
      0,
      Math.min(width - labelWidth, c.position * width - labelWidth / 2),
    );
  for (let i = 1; i < result.length;) {
    const previous = result[i - 1],
      current = result[i];
    if (left(current) < left(previous) + labelWidth + 8) {
      previous.position =
        (previous.position * previous.events.length +
          current.position * current.events.length) /
        (previous.events.length + current.events.length);
      previous.events.push(...current.events);
      result.splice(i, 1);
      i = Math.max(1, i - 1);
    } else i++;
  }
  return result;
}
export function intervalGeometry(
  start: number,
  end: number,
  from: number,
  to: number,
) {
  const span = to - from + 1;
  const left = Math.max(0, Math.min(1, (start - from) / span));
  const right = Math.max(left, Math.min(1, (end - from) / span));
  return { left: left * 100, width: (right - left) * 100 };
}

/** A shared boundary year may represent succession; larger overlaps need a parallel row. */
export function packIntervals<T>(
  items: T[],
  bounds: (item: T) => [number, number],
  boundaryTolerance = 0,
): T[][] {
  const rows: T[][] = [],
    ends: number[] = [];
  for (const item of [...items].sort((a, b) => bounds(a)[0] - bounds(b)[0])) {
    const [start, end] = bounds(item);
    let row = ends.findIndex((v) => v <= start + boundaryTolerance);
    if (row < 0) {
      row = ends.length;
      rows.push([]);
    }
    ends[row] = end;
    rows[row].push(item);
  }
  return rows;
}
