import { catalogBounds } from './catalog';
import type { ExplorerCatalog } from './types';
import type { ExplorerState } from './explorer';
import { timeBounds, yearCoordinate } from './time';

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

/** Civil-year fields validate before converting to year-zero-free coordinates. */
export function validateFilterYearRange(fromText: string, toText: string, min: number, max: number): { ok: true; from: number; to: number } | { ok: false; error: string } {
  const fromYear = Number(fromText), toYear = Number(toText);
  if (!fromText.trim() || !toText.trim() || !Number.isInteger(fromYear) || !Number.isInteger(toYear) || !fromYear || !toYear) return { ok: false, error: '请输入非零整数年份；公元前使用负数。' };
  const from = yearCoordinate(fromYear), to = yearCoordinate(toYear);
  if (from > to) return { ok: false, error: '起始年份不能晚于结束年份。' };
  if (from < min || to > max) return { ok: false, error: '年份超出本主题范围，请拖动滑块选择。' };
  return { ok: true, from, to };
}
