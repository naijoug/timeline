import type { ExplorerCatalog, ExplorerEvent, TimelineView } from './types';
import { readAiView } from './ai-view-state';
import { defaultView, readView, selectEvents, viewQuery } from './catalog';

export interface ExplorerState extends TimelineView { scope: string; order?: 'asc' | 'desc' }
export interface EventPresentation {
  title?: string;
  metadata?: string;
  dateLabel?: string;
  tags?: string[];
  href?: string;
  related?: { title: string; href: string }[];
  change?: { baseline: string; improvements: string[]; evidence: string; tradeoffs: string; sourceIds?: string[] };
}
export interface ExplorerPresentation {
  urlFormat?: 'ai';
  subtitle?: string;
  defaultRange?: readonly [number, number];
  defaultEvent?: string;
  latestEvent?: string;
  landmark?: { year: number; title: string; event: string; position: number };
  scopes?: { id: string; title: string; eventIds: string[] }[];
  scopeLabel?: string;
  scopeAllLabel?: string;
  events?: Record<string, EventPresentation>;
  footer?: string;
  readState?: (search: string, category: string) => ExplorerState;
  serializeState?: (state: ExplorerState) => string;
}
export function explorerEvents<Event extends ExplorerEvent>(catalog: ExplorerCatalog<Event>, state: ExplorerState, presentation: ExplorerPresentation = {}): Event[] {
  const scope = presentation.scopes?.find(scope => scope.id === state.scope);
  const allowed = scope ? new Set(scope.eventIds) : undefined;
  return selectEvents(catalog, state).filter(event => !allowed || allowed.has(event.id));
}
export function defaultExplorer(catalog: ExplorerCatalog, period = '', category = '', presentation: ExplorerPresentation = {}): ExplorerState {
  const base = defaultView(catalog, period, category);
  const state: ExplorerState = { ...base, scope: '', ...(presentation.defaultRange && !period ? { from: presentation.defaultRange[0], to: presentation.defaultRange[1] } : {}) };
  const events = explorerEvents(catalog, state, presentation);
  state.selected = events.find(e => e.id === presentation.defaultEvent)?.id || events[0]?.id || '';
  return state;
}
export function restoreExplorer(search: string, catalog: ExplorerCatalog, period = '', category = '', presentation: ExplorerPresentation = {}): ExplorerState {
  if (presentation.urlFormat === 'ai') return readAiView(search, category, catalog, presentation);
  if (presentation.readState) return presentation.readState(search, category);
  const params = new URLSearchParams(search);
  const state: ExplorerState = { ...readView(search, catalog, period, category), scope: params.get('scope') || '' };
  if (!presentation.scopes?.some(scope => scope.id === state.scope)) state.scope = '';
  const fallback = defaultExplorer(catalog, state.period, category, presentation);
  if (!params.has('from')) state.from = fallback.from;
  if (!params.has('to')) state.to = fallback.to;
  if (state.from > state.to) [state.from, state.to] = [state.to, state.from];
  if (!params.has('event')) {
    const events = explorerEvents(catalog, state, presentation);
    state.selected = events.find(e => e.id === presentation.defaultEvent)?.id || events[0]?.id || '';
  }
  return state;
}
export function explorerQuery(state: ExplorerState): string {
  const params = new URLSearchParams(viewQuery(state));
  // An explicitly closed reader must remain closed after refresh.
  params.set('event', state.selected);
  if (state.scope) params.set('scope', state.scope);
  return `?${params}`;
}
