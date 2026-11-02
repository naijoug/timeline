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
    ids(e.maps || [], `${e.id}: map`);
    for (const map of e.maps || []) {
      refs(map.sourceIds, sources, `${e.id}/${map.id}`);
      if (!map.sourceIds.length || ![map.title, map.depictedTime, map.alt, map.description, map.scopeNote, map.creator, map.createdAt, map.license?.label, map.modificationNote].every(value => value?.trim()))
        errors.push(`${e.id}/${map.id}: incomplete map provenance`);
      if (!['reconstruction', 'schematic'].includes(map.kind) || !/^\/maps\/[a-z0-9-]+\.(svg|png|webp)$/.test(map.assetPath) || !Number.isInteger(map.width) || !Number.isInteger(map.height) || map.width <= 0 || map.height <= 0)
        errors.push(`${e.id}/${map.id}: invalid map asset`);
      for (const url of [map.originalUrl, map.license?.url].filter(Boolean)) {
        try { if (new URL(url!).protocol !== 'https:') throw new Error(); }
        catch { errors.push(`${e.id}/${map.id}: invalid map provenance URL`); }
      }
    }
    if (e.change) refs(e.change.sourceIds, sources, e.id);
    ids(e.recommendedResources || [], `${e.id}: recommended resource`);
    for (const resource of e.recommendedResources || []) {
      if (![resource.title, resource.creator, resource.match, resource.scopeNote].every(value => value?.trim()))
        errors.push(`${e.id}/${resource.id}: incomplete recommended resource`);
      if (!['video', 'audio', 'lecture', 'article'].includes(resource.kind))
        errors.push(`${e.id}/${resource.id}: invalid recommended resource kind`);
      try {
        if (new URL(resource.url).protocol !== 'https:') throw new Error();
      } catch { errors.push(`${e.id}/${resource.id}: invalid recommended resource URL`); }
      try {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(resource.checkedAt)) throw new Error();
        parseDate(resource.checkedAt);
        if (resource.checkedAt > new Date().toISOString().slice(0,10)) throw new Error();
      } catch { errors.push(`${e.id}/${resource.id}: invalid recommended resource checkedAt`); }
    }
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
  const lines = catalog.timelines || [];
  const timelineIds = ids(lines, 'timeline');
  const paths = new Set<string>();
  for (const line of lines) {
    const members = line.entries.map(entry => entry.eventId);
    refs(members, eventIds, line.id);
    if (!members.length || new Set(members).size !== members.length || !line.title.trim() || !line.description.trim()) errors.push(`${line.id}: invalid timeline membership or content`);
    if (line.themeId !== catalog.topic.id || !['main', 'curated', 'entity'].includes(line.kind)) errors.push(`${line.id}: invalid timeline theme or kind`);
    if (!line.path.startsWith(catalog.topic.path) || !/^\/[a-z0-9/-]+\/$/.test(line.path) || line.path.includes('//') || paths.has(line.path)) errors.push(`${line.id}: invalid or duplicate timeline path`);
    paths.add(line.path);
    for (const entry of line.entries) {
      if (!['key', 'supporting'].includes(entry.importance) || (entry.context !== undefined && !entry.context.trim())) errors.push(`${line.id}/${entry.eventId}: invalid timeline entry`);
    }
    const visited = new Set([line.id]);
    let parent = line.parentId;
    while (parent) {
      if (!timelineIds.has(parent)) { errors.push(`${line.id}: unknown timeline parent ${parent}`); break; }
      if (visited.has(parent)) { errors.push(`${line.id}: timeline parent cycle`); break; }
      visited.add(parent);
      parent = lines.find(value => value.id === parent)?.parentId;
    }
  }
  if (catalog.topic.defaultTimelineId && !timelineIds.has(catalog.topic.defaultTimelineId)) errors.push(`${catalog.topic.id}: unknown default timeline`);
  return errors;
}
