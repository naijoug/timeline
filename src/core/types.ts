/** Civil years: -1 = 1 BCE, 1 = 1 CE. Year zero is never accepted as content. */
export interface HistoricalDate {
  year: number;
  month?: number;
  day?: number;
  approximate?: boolean;
  note?: string;
}
export interface TimeSpan {
  start: HistoricalDate;
  end?: HistoricalDate;
  kind: "point" | "duration" | "uncertain";
}
export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  type: string;
  checkedAt: string;
  format?: string;
  version?: string;
  locator?: string;
  publishedAt?: string;
}
export interface ReadingSection {
  label: string;
  text: string;
  sourceIds?: string[];
  locator?: string;
  editorial?: boolean;
}
/** Optional interpretation or teaching material, separate from evidence for facts.
 * These records are rendered only on static detail pages, never in the client index. */
export interface RecommendedResource {
  id: string;
  title: string;
  creator: string;
  series?: string;
  url: string;
  kind: "video" | "audio" | "lecture" | "article";
  match: string;
  scopeNote: string;
  checkedAt: string;
  publishedAt?: string;
  locator?: string;
}
/** Detail-only geography, with the depicted period distinct from the image's creation. */
export interface HistoricalMap {
  id: string;
  title: string;
  depictedTime: string;
  kind: 'reconstruction' | 'schematic';
  assetPath: string;
  width: number;
  height: number;
  alt: string;
  description: string;
  scopeNote: string;
  creator: string;
  createdAt: string;
  license: { label: string; url?: string };
  originalUrl?: string;
  modificationNote: string;
  sourceIds: string[];
}
/** A sourced statement, never an edge inferred merely from chronological order. */
export interface EventRelation {
  id: string;
  fromEventId: string;
  toEventId?: string;
  entityId?: string;
  label: string;
  sourceIds: string[];
  locator: string;
  note?: string;
}
/** Membership is stored only here, never again on TimelineEvent. */
export interface TimelineEntry {
  eventId: string;
  importance: 'key' | 'supporting';
  /** Editorial reading context, not a second copy of the event's facts. */
  context?: string;
}
export interface TimelineDefinition {
  id: string;
  themeId: string;
  title: string;
  description: string;
  path: string;
  /** Navigation only: parents do not inherit child memberships. */
  parentId?: string;
  kind: 'main' | 'curated' | 'entity';
  entries: TimelineEntry[];
  note: string;
}
/** Existing collection routes are now first-class timelines. */
export type Collection = TimelineDefinition;
export interface Entity {
  id: string;
  name: string;
  type: string;
  sourceIds: string[];
}
export interface Period {
  id: string;
  title: string;
  time: TimeSpan;
  parentId?: string;
  entityIds: string[];
  summary: string;
  note?: string;
  sourceIds: string[];
  coverage: "outline" | "selected";
}
export interface TimelineEvent {
  id: string;
  title: string;
  time: TimeSpan;
  summary: string;
  significance: string;
  note?: string;
  category: string;
  entityIds: string[];
  periodIds: string[];
  sourceIds: string[];
  tags: string[];
  milestone: boolean;
  facts?: { label: string; text: string; sourceIds?: string[] }[];
  details?: ReadingSection[];
  recommendedResources?: RecommendedResource[];
  maps?: HistoricalMap[];
  change?: {
    baseline: string;
    baselineEventId?: string;
    improvements: string[];
    tradeoffs: string;
    evidence: string;
    sourceIds: string[];
  };
}
export interface Topic {
  id: string;
  title: string;
  description: string;
  path: string;
  coverage: string;
  categories: { id: string; title: string }[];
  shortcuts?: { title: string; path: string }[];
  defaultTimelineId?: string;
  periodLabel?: string;
  periodSegment?: string;
}
export interface Catalog {
  topic: Topic;
  periods: Period[];
  events: TimelineEvent[];
  entities: Entity[];
  sources: Source[];
  relations?: EventRelation[];
  timelines?: TimelineDefinition[];
}
/** from/to use the internal continuous year coordinate, including coordinate 0 (1 BCE). */
export interface TimelineView {
  from: number;
  to: number;
  period: string;
  category: string;
  q: string;
  all: boolean;
  selected: string;
  expanded: string[];
}

/** The complete, searchable timeline index, without detail-only reading records. */
export type ExplorerEvent = Pick<TimelineEvent, 'id' | 'title' | 'time' | 'summary' | 'category' | 'entityIds' | 'periodIds' | 'sourceIds' | 'tags' | 'milestone'>;
export interface ExplorerCatalog<Event extends ExplorerEvent = ExplorerEvent> {
  topic: Topic;
  periods: Period[];
  events: Event[];
  entities: Pick<Entity, 'id' | 'name'>[];
  sources: Pick<Source, 'id' | 'title' | 'url'>[];
  timelines?: TimelineDefinition[];
}
