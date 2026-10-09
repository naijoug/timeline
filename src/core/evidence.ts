import type { Catalog, EventRelation, TimelineEvent } from './types';
export function eventSourceIds(event: TimelineEvent): string[] {
  return [...new Set([...event.sourceIds, ...(event.change?.sourceIds || []), ...(event.details?.flatMap(s => s.sourceIds || []) || []), ...(event.facts?.flatMap(s => s.sourceIds || []) || [])])];
}
export function relationsFor(catalog: Catalog, eventId: string) {
  return (catalog.relations || []).filter(r => r.fromEventId === eventId || r.toEventId === eventId);
}
/** Always retain the recorded direction, including when reading the target event. */
export function relationEndpoints(catalog: Catalog, relation: EventRelation) {
  const subject = catalog.events.find(e => e.id === relation.fromEventId)!;
  const object = relation.toEventId
    ? { id: relation.toEventId, title: catalog.events.find(e => e.id === relation.toEventId)!.title, kind: 'event' as const }
    : { id: relation.entityId!, title: catalog.entities.find(e => e.id === relation.entityId)!.name, kind: 'entity' as const };
  return { subject, object };
}
