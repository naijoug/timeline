import type { ExplorerCatalog } from './types';
import type { ExplorerPresentation, ExplorerState } from './explorer';
import { catalogBounds } from './catalog';

/** Data-free compatibility with previously shared AI URLs. Never import the AI
 * catalog here: this module also runs in every topic's browser bundle. */
export function readAiView(search: string, category: string, catalog: ExplorerCatalog, presentation: ExplorerPresentation): ExplorerState {
  const params = new URLSearchParams(search);
  const [min, max] = catalogBounds(catalog);
  const range = presentation.defaultRange || [min, max];
  const year = (key: string, fallback: number) => /^\d{4}$/.test(params.get(key) || '')
    ? Math.max(min, Math.min(max, Number(params.get(key)))) : fallback;
  let from = year('from', range[0]), to = year('to', range[1]);
  if (from > to) [from, to] = [to, from];
  const lane = params.get('lane');
  const validLane = lane && ['all', 'methods', 'models', 'products'].includes(lane) ? lane : category;
  return {
    from, to, category: validLane === 'all' ? '' : validLane || '', period: '', expanded: [],
    scope: params.get('scope') === 'china' ? 'china' : '',
    q: params.get('q') || '', all: params.get('all') === '1' || params.get('level') === 'all',
    selected: params.has('event') ? params.get('event') || '' : (!category || category === 'all' || category === 'models') ? presentation.defaultEvent || '' : '',
  };
}
export function aiViewQuery(state: ExplorerState): string {
  const params = new URLSearchParams({ from: String(state.from), to: String(state.to) });
  if (state.scope === 'china') params.set('scope', 'china');
  if (state.all) params.set('all', '1');
  if (state.q) params.set('q', state.q);
  params.set('lane', state.category || 'all');
  params.set('event', state.selected);
  return `?${params}`;
}
