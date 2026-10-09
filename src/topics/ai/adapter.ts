import type { TimelineEvent as AIEvent } from "./types";
import type { Catalog, TimelineEvent } from "../../core/types";
import { parseDate } from "../../core/time";
import { isKeyEvent, eventLane } from "./config";
import { events } from "./events";
import { entities, entityMap, entityHref, eventHref } from "./entities";
import { sources, sourceMap } from "./sources";
import { aiEventDetails } from "./narrative";
import { instructionCollection, instructionRelations } from './instruction-following';

export function toCoreEvent(e: AIEvent): TimelineEvent {
  const entityList = e.entityIds.map(id => entities.find(entity => entity.id === id)).filter(entity => !!entity);
  const entitySources = [...new Set(entityList.flatMap(entity => entity!.sourceIds))];
  const datePrecision = e.dateLabel || (e.date.length === 4 ? '年份精度' : e.date.length === 7 ? '月份精度' : '日期精度');
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
    details: aiEventDetails(e),
    facts: [
      { label: '发布 / 发表方', text: e.company || entityList[0]?.name || '见原始资料', sourceIds: e.sourceIds },
      { label: '事件类型', text: e.kind, sourceIds: e.sourceIds },
      { label: '时间口径', text: datePrecision, sourceIds: e.sourceIds },
      ...(entityList.length ? [{ label: '涉及对象', text: entityList.map(entity => entity!.name).join(' · '), sourceIds: entitySources }] : []),
      ...(e.tags.length ? [{ label: '关键标签', text: e.tags.join(' / '), sourceIds: e.sourceIds }] : []),
    ],
    change: e.change,
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
  collections: [instructionCollection],
  relations: instructionRelations,
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
