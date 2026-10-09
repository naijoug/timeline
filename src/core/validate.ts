import type { Catalog } from "./types";
import { dateBounds, validDate, parseDate } from "./time";

export function validateCatalog(catalog: Catalog): string[] {
  const errors: string[] = [];
  const ids = (items: { id: string }[], kind: string) => {
    const known = new Set<string>();
    for (const item of items) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || known.has(item.id))
        errors.push(`${kind}: invalid or duplicate id ${item.id}`);
      known.add(item.id);
    }
    return known;
  };
  const periods = ids(catalog.periods, "period"),
    entities = ids(catalog.entities, "entity"),
    sources = ids(catalog.sources, "source");
  const eventIds = ids(catalog.events, "event");
  const categories = ids(catalog.topic.categories, "category");
  const refs = (values: string[], known: Set<string>, id: string) =>
    values.forEach((v) => {
      if (!known.has(v)) errors.push(`${id}: unknown reference ${v}`);
    });
  for (const item of [...catalog.periods, ...catalog.events]) {
    if (
      !validDate(item.time.start) ||
      (item.time.end && !validDate(item.time.end))
    )
      errors.push(`${item.id}: invalid date`);
    else if (
      item.time.end &&
      dateBounds(item.time.start)[0] > dateBounds(item.time.end)[0]
    )
      errors.push(`${item.id}: reversed interval`);
    if (
      (item.time.kind === "point" && item.time.end) ||
      (item.time.kind !== "point" && !item.time.end)
    )
      errors.push(`${item.id}: invalid interval kind`);
    if (!item.title.trim() || !item.summary.trim())
      errors.push(`${item.id}: missing content`);
    if (!item.sourceIds.length) errors.push(`${item.id}: missing source`);
    refs(item.entityIds, entities, item.id);
    refs(item.sourceIds, sources, item.id);
  }
  for (const e of catalog.events) {
    refs(e.periodIds, periods, e.id);
    if (!categories.has(e.category)) errors.push(`${e.id}: unknown category`);
    for (const section of [...(e.details || []), ...(e.facts || [])]) {
      refs(section.sourceIds || [], sources, e.id);
      if (!section.label.trim() || !section.text.trim()) errors.push(`${e.id}: empty reading section`);
    }
    if (e.change) refs(e.change.sourceIds, sources, e.id);
  }
  for (const p of catalog.periods) {
    const visited = new Set([p.id]);
    let parent = p.parentId;
    while (parent) {
      if (!periods.has(parent)) {
        errors.push(`${p.id}: unknown parent ${parent}`);
        break;
      }
      if (visited.has(parent)) {
        errors.push(`${p.id}: period cycle`);
        break;
      }
      visited.add(parent);
      parent = catalog.periods.find((v) => v.id === parent)?.parentId;
    }
  }
  for (const e of catalog.entities) {
    refs(e.sourceIds, sources, e.id);
    if (!e.sourceIds.length) errors.push(`${e.id}: missing source`);
  }
  for (const s of catalog.sources) {
    try {
      if (new URL(s.url).protocol !== "https:") throw new Error();
    } catch {
      errors.push(`${s.id}: invalid source URL`);
    }
    try {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(s.checkedAt)) throw new Error();
      parseDate(s.checkedAt);
      if (s.checkedAt > new Date().toISOString().slice(0,10)) throw new Error();
    } catch { errors.push(`${s.id}: invalid checkedAt`); }
  }
  ids(catalog.relations || [], 'relation');
  for (const r of catalog.relations || []) {
    refs([r.fromEventId, ...(r.toEventId ? [r.toEventId] : [])], eventIds, r.id);
    refs(r.entityId ? [r.entityId] : [], entities, r.id);
    refs(r.sourceIds, sources, r.id);
    if (Number(!!r.toEventId) + Number(!!r.entityId) !== 1 || !r.sourceIds.length || !r.label.trim() || !r.locator.trim()) errors.push(`${r.id}: incomplete sourced relation`);
    if (r.fromEventId === r.toEventId) errors.push(`${r.id}: self-referencing relation`);
  }
  ids(catalog.collections || [], 'collection');
  for (const c of catalog.collections || []) {
    refs(c.eventIds, eventIds, c.id);
    if (!c.eventIds.length || new Set(c.eventIds).size !== c.eventIds.length || !c.path.startsWith(catalog.topic.path) || !c.path.endsWith('/') || !c.title.trim() || !c.description.trim()) errors.push(`${c.id}: invalid collection`);
  }
  return errors;
}
