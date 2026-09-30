import type { Catalog, TimelineEvent, TimelineView } from "./types";
import {
  civilYear,
  dateBounds,
  overlaps,
  timeBounds,
  yearCoordinate,
} from "./time";

export function catalogBounds(catalog: Catalog): [number, number] {
  const ranges = [...catalog.periods, ...catalog.events].map((item) =>
    timeBounds(item.time),
  );
  return ranges.length
    ? [
        Math.floor(Math.min(...ranges.map((r) => r[0]))),
        Math.ceil(Math.max(...ranges.map((r) => r[1]))) - 1,
      ]
    : [1, 1];
}
export function descendants(catalog: Catalog, id: string): Set<string> {
  const ids = new Set([id]);
  for (let changed = true; changed;) {
    changed = false;
    for (const p of catalog.periods)
      if (p.parentId && ids.has(p.parentId) && !ids.has(p.id)) {
        ids.add(p.id);
        changed = true;
      }
  }
  return ids;
}
export function defaultView(
  catalog: Catalog,
  period = "",
  category = "",
): TimelineView {
  const p = catalog.periods.find((p) => p.id === period);
  const [from, end] = p
    ? timeBounds(p.time)
    : [catalogBounds(catalog)[0], catalogBounds(catalog)[1] + 1];
  return {
    from: Math.floor(from),
    to: Math.ceil(end) - 1,
    period: p?.id || "",
    category,
    q: "",
    all: false,
    selected: "",
    expanded: [],
  };
}
export function selectEvents(
  catalog: Catalog,
  view: TimelineView,
): TimelineEvent[] {
  const periods = view.period ? descendants(catalog, view.period) : undefined;
  const q = view.q.trim().normalize("NFKC").toLocaleLowerCase();
  const names = new Map(catalog.entities.map((e) => [e.id, e.name]));
  return catalog.events
    .filter(
      (e) =>
        overlaps(e.time, view.from, view.to) &&
        (!periods || e.periodIds.some((id) => periods.has(id))) &&
        (!view.category || e.category === view.category) &&
        (view.all || e.milestone) &&
        (!q ||
          [
            e.title,
            e.summary,
            ...e.tags,
            ...e.entityIds.map((id) => names.get(id) || id),
          ]
            .join(" ")
            .normalize("NFKC")
            .toLocaleLowerCase()
            .includes(q)),
    )
    .sort(
      (a, b) =>
        dateBounds(a.time.start)[0] - dateBounds(b.time.start)[0] ||
        a.id.localeCompare(b.id),
    );
}
export function viewQuery(view: TimelineView): string {
  const p = new URLSearchParams({
    from: String(civilYear(view.from)),
    to: String(civilYear(view.to)),
  });
  if (view.period) p.set("period", view.period);
  p.set("category", view.category || "all");
  if (view.q) p.set("q", view.q);
  if (view.all) p.set("all", "1");
  if (view.selected) p.set("event", view.selected);
  if (view.expanded.length) p.set("expand", view.expanded.join(","));
  return `?${p}`;
}
export function readView(
  search: string,
  catalog: Catalog,
  initialPeriod = "",
  initialCategory = "",
): TimelineView {
  const p = new URLSearchParams(search);
  const period =
    initialPeriod ||
    (catalog.periods.some((v) => v.id === p.get("period"))
      ? p.get("period")!
      : "");
  const category =
    p.get("category") === "all"
      ? ""
      : catalog.topic.categories.some((c) => c.id === p.get("category"))
        ? p.get("category")!
        : initialCategory;
  const d = defaultView(catalog, period, category),
    [min, max] = catalogBounds(catalog);
  const readYear = (key: string, fallback: number) => {
    const raw = p.get(key) || "";
    return /^-?\d{1,6}$/.test(raw) && Number(raw) !== 0
      ? Math.max(min, Math.min(max, yearCoordinate(Number(raw))))
      : fallback;
  };
  let from = readYear("from", d.from),
    to = readYear("to", d.to);
  if (from > to) [from, to] = [to, from];
  return {
    ...d,
    from,
    to,
    q: p.get("q") || "",
    all: p.get("all") === "1",
    selected: catalog.events.some((e) => e.id === p.get("event"))
      ? p.get("event")!
      : "",
    expanded: (p.get("expand") || "")
      .split(",")
      .filter(
        (id, i, all) =>
          catalog.periods.some((v) => v.id === id) && all.indexOf(id) === i,
      ),
  };
}
