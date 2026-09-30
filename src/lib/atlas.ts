import type { TimelineEvent } from "../data/types";

import {
  MIN_YEAR,
  MAX_YEAR,
  chinaCompanies,
  eventLane,
  aiPresentation,
  type Lane,
} from "../topics/ai/config";
export * from "../topics/ai/config";
import {
  clampRange,
  parseDate,
  timePosition,
  yearTicks as coreYearTicks,
} from "../core/time";
import { clusterItems } from "../core/layout";
import { selectEvents } from "../core/catalog";
import { toCoreEvent } from "../topics/ai/adapter";
export interface AtlasState {
  from: number;
  to: number;
  scope: "world" | "china";
  all: boolean;
  q: string;
  selected: string;
  lane: Lane | "all";
}
export function defaultAtlas(lane: AtlasState["lane"] = "all"): AtlasState {
  return {
    from: aiPresentation.defaultRange[0],
    to: aiPresentation.defaultRange[1],
    scope: "world",
    all: false,
    q: "",
    selected:
      lane === "all" || lane === "models" ? aiPresentation.defaultEvent : "",
    lane,
  };
}
export function clampWindow(from: number, span: number): [number, number] {
  return clampRange(from, span, MIN_YEAR, MAX_YEAR);
}
export function readAtlas(
  search: string,
  lane: AtlasState["lane"] = "all",
): AtlasState {
  const p = new URLSearchParams(search),
    d = defaultAtlas(lane);
  const year = (key: string, fallback: number) =>
    /^\d{4}$/.test(p.get(key) || "")
      ? Math.max(MIN_YEAR, Math.min(MAX_YEAR, Number(p.get(key))))
      : fallback;
  let from = year("from", d.from),
    to = year("to", d.to);
  if (from > to) [from, to] = [to, from];
  const requestedLane = p.get("lane");
  return {
    from,
    to,
    scope: p.get("scope") === "china" ? "china" : "world",
    all: p.get("all") === "1" || p.get("level") === "all",
    q: p.get("q") || "",
    selected: p.has("event") ? p.get("event") || "" : d.selected,
    lane:
      requestedLane &&
      ["all", "methods", "models", "products"].includes(requestedLane)
        ? (requestedLane as AtlasState["lane"])
        : lane,
  };
}
export function atlasQuery(s: AtlasState): string {
  const p = new URLSearchParams({ from: String(s.from), to: String(s.to) });
  if (s.scope === "china") p.set("scope", "china");
  if (s.all) p.set("all", "1");
  if (s.q) p.set("q", s.q);
  p.set("lane", s.lane);
  p.set("event", s.selected);
  return `?${p.toString()}`;
}
export function filterAtlas(
  events: TimelineEvent[],
  s: AtlasState,
  names: Record<string, string> = {},
): TimelineEvent[] {
  const candidates = events.filter(
    (e) =>
      (s.scope !== "china" || chinaCompanies.has(e.company || "")) &&
      (s.lane === "all" || eventLane(e) === s.lane),
  );
  const selected = new Set(
    selectEvents(
      {
        topic: {
          id: "ai",
          title: "AI",
          path: "/ai/",
          description: "",
          coverage: "",
          categories: [],
        },
        periods: [],
        sources: [],
        entities: Object.entries(names).map(([id, name]) => ({
          id,
          name,
          type: "ai",
          sourceIds: [],
        })),
        events: candidates.map(toCoreEvent),
      },
      {
        from: s.from,
        to: s.to,
        period: "",
        category: "",
        q: s.q,
        all: s.all,
        selected: s.selected,
        expanded: [],
      },
    ).map((e) => e.id),
  );
  return candidates
    .filter((e) => selected.has(e.id))
    .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}
// A partial date is represented at the midpoint of its known interval, never
// presented to the reader as an invented January 1st or first day of a month.
export function datePosition(date: string): number {
  return timePosition({ kind: "point", start: parseDate(date) });
}
export interface Cluster {
  id: string;
  events: TimelineEvent[];
  position: number;
}
export function clusterEvents(
  events: TimelineEvent[],
  from: number,
  to: number,
  width: number,
): Cluster[] {
  return clusterItems(
    events,
    (e) => (datePosition(e.date) - from) / (to - from + 1),
    width,
  );
}

export function yearTicks(from: number, to: number, width: number): number[] {
  return coreYearTicks(from, to, (width * 100) / 64);
}
