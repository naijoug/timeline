import type { ExplorerPresentation, ExplorerState } from '../../core/explorer';
import { aiAtlasData } from './adapter';
import { aiPresentation, eventTitle, chinaCompanies } from './config';
import { atlasQuery, readAtlas, datePosition, type AtlasState } from '../../lib/atlas';
import { displayDate } from '../../lib/timeline';
import { releaseResearchDate } from './releases';

/** Only AI data and legacy URL compatibility live here; layout is shared. */
export function aiExplorerPresentation(data = aiAtlasData): ExplorerPresentation {
  return {
    subtitle: aiPresentation.subtitle,
    defaultRange: aiPresentation.defaultRange,
    defaultEvent: aiPresentation.defaultEvent,
    latestEvent: aiPresentation.latestEvent,
    landmark: { ...aiPresentation.landmark, position: datePosition(aiPresentation.landmark.date) },
    scopes: [{ id: 'china', title: '中国团队', eventIds: data.events.filter(e => chinaCompanies.has(e.company || '')).map(e => e.id) }],
    events: Object.fromEntries(data.events.map(event => [event.id, {
      title: eventTitle(event), metadata: event.company || '研究进展', dateLabel: displayDate(event),
      tags: [...new Set([...event.tags, ...(event.kind === '模型发布' ? [] : [event.kind])])],
      change: event.change, href: data.eventHref(event),
      related: event.entityIds.map(id => ({ title: data.entityMap[id].name, href: data.entityHref(id) })),
    }])),
    footer: `本轮核查 ${releaseResearchDate} · 持续整理`,
    readState: (search, category) => {
      const state = readAtlas(search, (category || 'all') as AtlasState['lane']);
      return { from: state.from, to: state.to, period: '', category: state.lane === 'all' ? '' : state.lane, q: state.q, all: state.all, selected: state.selected, expanded: [], scope: state.scope === 'china' ? 'china' : '' };
    },
    serializeState: (state: ExplorerState) => atlasQuery({ from: state.from, to: state.to, scope: state.scope === 'china' ? 'china' : 'world', all: state.all, q: state.q, selected: state.selected, lane: (state.category || 'all') as AtlasState['lane'] }),
  };
}
