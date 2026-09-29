import type { Entity, Relation, Source, TimelineEvent } from '../data/types';
export function validateCatalog(events: TimelineEvent[], entities: Entity[], sources: Source[], relations: Relation[]): string[] {
  const errors: string[] = [];
  const ids = (items: { id: string }[], label: string) => {
    const set = new Set<string>(); for (const item of items) { if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) errors.push(`${label}: invalid id ${item.id}`); if (set.has(item.id)) errors.push(`${label}: duplicate id ${item.id}`); set.add(item.id); } return set;
  };
  const eventIds = ids(events, 'event'), entityIds = ids(entities, 'entity'), sourceIds = ids(sources, 'source');
  const refs = (values: string[], known: Set<string>, label: string) => values.forEach(id => { if (!known.has(id)) errors.push(`${label}: unknown reference ${id}`); });
  for (const e of events) {
    const p = e.date.split('-').map(Number);
    if (!/^\d{4}(-\d{2})?(-\d{2})?$/.test(e.date) || p[0] < 1900 || p[0] > 2026 || (p[1] !== undefined && (p[1] < 1 || p[1] > 12)) || (p[2] !== undefined && (p[2] < 1 || p[2] > new Date(Date.UTC(p[0], p[1], 0)).getUTCDate()))) errors.push(`${e.id}: invalid date ${e.date}`);
    if (!e.title.trim() || !e.summary.trim() || !e.significance.trim()) errors.push(`${e.id}: missing editorial content`);
    if (!e.sourceIds.length) errors.push(`${e.id}: missing source`);
    if (!e.tracks.length || e.tracks.some(t => !['history','methods','products','models'].includes(t))) errors.push(`${e.id}: invalid track`);
    refs(e.sourceIds, sourceIds, e.id); refs(e.entityIds, entityIds, e.id);
    if (e.tracks.includes('models') && !e.change) errors.push(`${e.id}: missing model change`);
    if (e.change) {
      if (!e.change.baseline || !e.change.improvements.length || !e.change.tradeoffs || !e.change.sourceIds.length) errors.push(`${e.id}: incomplete change evidence`);
      refs(e.change.sourceIds, sourceIds, e.id);
      if (e.change.baselineEventId) { refs([e.change.baselineEventId], eventIds, e.id); if (e.change.baselineEventId === e.id) errors.push(`${e.id}: self-referencing baseline`); }
    }
  }
  for (const entity of entities) { refs(entity.sourceIds, sourceIds, entity.id); if (!entity.sourceIds.length) errors.push(`${entity.id}: missing entity source`); }
  for (const source of sources) { try { if (new URL(source.url).protocol !== 'https:') errors.push(`${source.id}: insecure URL`); } catch { errors.push(`${source.id}: invalid URL`); } }
  for (const r of relations) { refs([r.from, r.to], entityIds, 'relation'); refs(r.sourceIds, sourceIds, 'relation'); if (!r.sourceIds.length) errors.push('relation: missing evidence'); }
  return errors;
}
