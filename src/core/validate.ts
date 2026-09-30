import type { Catalog } from "./types";
import { dateBounds, validDate } from "./time";

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
  ids(catalog.events, "event");
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
  }
  return errors;
}
