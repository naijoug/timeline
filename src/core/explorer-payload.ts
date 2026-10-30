import type { Catalog, ExplorerCatalog } from './types';
import type { ExplorerPresentation } from './explorer';

/** Build-time projection. Full evidence and narratives belong to static record pages,
 * not every visitor's timeline hydration payload. All searchable events stay here. */
export function createExplorerPayload(catalog: Catalog, presentation: ExplorerPresentation = {}): {
  catalog: ExplorerCatalog; presentation: ExplorerPresentation;
} {
  const periodSources = new Set(catalog.periods.flatMap(period => period.sourceIds));
  return {
    catalog: {
      topic: catalog.topic,
      periods: catalog.periods,
      events: catalog.events.map(({ id, title, time, summary, category, entityIds, periodIds, sourceIds, tags, milestone }) =>
        ({ id, title, time, summary, category, entityIds, periodIds, sourceIds, tags, milestone })),
      entities: catalog.entities.map(({ id, name }) => ({ id, name })),
      sources: catalog.sources.filter(source => periodSources.has(source.id)).map(({ id, title, url }) => ({ id, title, url })),
      collections: catalog.collections?.map(({ id, title, path }) => ({ id, title, path })),
    },
    presentation: {
      subtitle: presentation.subtitle,
      defaultRange: presentation.defaultRange,
      defaultEvent: presentation.defaultEvent,
      latestEvent: presentation.latestEvent,
      scopes: presentation.scopes,
      scopeLabel: presentation.scopeLabel,
      scopeAllLabel: presentation.scopeAllLabel,
      footer: presentation.footer,
      urlFormat: catalog.topic.id === 'ai' ? 'ai' : undefined,
      events: presentation.events && Object.fromEntries(Object.entries(presentation.events).map(([id, { title, metadata, dateLabel, href }]) =>
        [id, { title, metadata, dateLabel, href }])),
    },
  };
}
