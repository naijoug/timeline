import { catalogBounds } from './catalog';
import type { ExplorerCatalog } from './types';
import type { ExplorerState } from './explorer';
import { timeBounds } from './time';

/** Changing one facet preserves the other choices and the reading order. */
export function selectFilterPeriod(catalog: ExplorerCatalog, state: ExplorerState, id: string): ExplorerState {
  const period = catalog.periods.find(item => item.id === id);
  const [min, max] = catalogBounds(catalog);
  const bounds = period ? timeBounds(period.time) : [min, max + 1];
  return { ...state, period: period?.id || '', from: Math.max(min, Math.floor(bounds[0])), to: Math.min(max, Math.ceil(bounds[1]) - 1), selected: '' };
}
export function clearExplorerFilters(catalog: ExplorerCatalog, state: ExplorerState, keepSearch = false): ExplorerState {
  const [from, to] = catalogBounds(catalog);
  return { ...state, from, to, period: '', category: '', scope: '', q: keepSearch ? state.q : '', all: true, selected: '' };
}
/** Coordinates, unlike civil years, cross BCE/CE without introducing year zero. */
export function applyFilterYears(catalog: ExplorerCatalog, state: ExplorerState, years?: number): ExplorerState {
  const [min, max] = catalogBounds(catalog);
  return { ...state, from: years ? Math.max(min, max - years + 1) : min, to: max, period: '', selected: '' };
}
