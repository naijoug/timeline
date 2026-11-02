import type { ExplorerCatalog, ExplorerEvent, TimelineDefinition, TimelineEntry } from './types';

/** Explicit ID lists are the authoring format; no inferred category/tag rules. */
export function timelineEntries(ids: string[], importance: TimelineEntry['importance'] = 'key'): TimelineEntry[] {
  return ids.map(eventId => ({ eventId, importance }));
}
export function normalizedTimelineIds(catalog: ExplorerCatalog, ids: string[]): string[] {
  const selected = new Set(ids);
  // Catalog order gives shared URLs one stable representation.
  return (catalog.timelines || []).filter(line => selected.has(line.id)).map(line => line.id);
}
export function selectedTimelines(catalog: ExplorerCatalog, ids: string[] = []): TimelineDefinition[] {
  const selected = new Set(ids);
  return (catalog.timelines || []).filter(line => selected.has(line.id));
}
/** The union is a set of event IDs, not concatenated copies or inherited children. */
export function timelineMembership(catalog: ExplorerCatalog, ids: string[] = []): Map<string, TimelineEntry[]> {
  const membership = new Map<string, TimelineEntry[]>();
  for (const line of selectedTimelines(catalog, ids)) for (const entry of line.entries) {
    membership.set(entry.eventId, [...(membership.get(entry.eventId) || []), entry]);
  }
  return membership;
}
export function timelineEvents<Event extends ExplorerEvent>(catalog: ExplorerCatalog<Event>, ids: string[], keyOnly = false): Event[] {
  const membership = timelineMembership(catalog, ids);
  return catalog.events.filter(event => {
    const entries = membership.get(event.id);
    return entries && (!keyOnly || entries.some(entry => entry.importance === 'key'));
  });
}
