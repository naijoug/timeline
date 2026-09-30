import type { TimelineEvent as AIEvent } from "./types";
import type { Catalog, TimelineEvent } from "../../core/types";
import { parseDate } from "../../core/time";
import { isKeyEvent, eventLane } from "./config";
import { events } from "./events";
import { entities, entityMap, entityHref, eventHref } from "./entities";
import { sources, sourceMap } from "./sources";

export function toCoreEvent(e: AIEvent): TimelineEvent {
  return {
    id: e.id,
    title: e.title,
    time: { kind: "point", start: parseDate(e.date) },
    summary: e.summary,
    significance: e.significance,
    note: e.limitation,
    category: eventLane(e),
    periodIds: [],
    entityIds: e.entityIds,
    sourceIds: e.sourceIds,
    tags: [...e.tags, e.company || "", e.subtitle || ""],
    milestone: isKeyEvent(e),
  };
}
export const aiCatalog: Catalog = {
  topic: {
    id: "ai",
    title: "AI 发展史",
    description: "技术、模型与 Agent 的演进。",
    path: "/ai/",
    coverage: "全球精选事件。",
    categories: [
      { id: "methods", title: "AI 技术突破" },
      { id: "models", title: "模型演进" },
      { id: "products", title: "Agent 应用" },
    ],
  },
  events: events.map(toCoreEvent),
  entities,
  sources,
  periods: [],
};
/** The AI reading presentation retains its model comparison and entity links. */
export const aiAtlasData = {
  events,
  entities,
  entityMap,
  sourceMap,
  entityHref,
  eventHref,
};
