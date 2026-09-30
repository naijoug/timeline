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
}
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
  details?: { label: string; text: string }[];
}
export interface Topic {
  id: string;
  title: string;
  description: string;
  path: string;
  coverage: string;
  categories: { id: string; title: string }[];
  shortcuts?: { title: string; path: string }[];
  periodLabel?: string;
  periodSegment?: string;
}
export interface Catalog {
  topic: Topic;
  periods: Period[];
  events: TimelineEvent[];
  entities: Entity[];
  sources: Source[];
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
