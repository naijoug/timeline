import { catalogBounds } from './catalog';
import { restoreExplorer, explorerQuery, explorerEvents, type ExplorerPresentation, type ExplorerState } from './explorer';
import type { Catalog } from './types';

/** The document timeline opens the whole chronology at every viewport width. */
export function restoreReadingExplorer(search: string, catalog: Catalog, period = '', category = '', presentation: ExplorerPresentation = {}): ExplorerState {
  const state = restoreExplorer(search, catalog, period, category, presentation);
  const params = new URLSearchParams(search);
  if (!params.has('from') && !params.has('to') && !state.period) {
    [state.from, state.to] = catalogBounds(catalog);
  }
  return { ...state, selected: '', order: params.get('order') === 'asc' ? 'asc' : params.get('order') === 'desc' ? 'desc' : catalog.topic.id === 'ai' ? 'desc' : 'asc' };
}

/** Preserve existing event routes, including AI model aliases and project base paths. */
export function eventRecordHref(href: string, returnPath: string): string {
  const [pathAndQuery, hash] = href.split('#');
  const [path, search = ''] = pathAndQuery.split('?');
  const params = new URLSearchParams(search);
  params.set('return', returnPath);
  return `${path}?${params}${hash ? `#${hash}` : ''}`;
}

/** Carry the originating reading context through related records, not entity or external links. */
export function recordContinuationHref(href: string, returnPath: string, origin: string, topicPrefix: string): string | null {
  const destination = safeTimelineReturn(returnPath, origin, topicPrefix);
  if (!destination) return null;
  try {
    const url = new URL(href, origin);
    const isRecord = /\/events\/[^/]+\/?$/.test(url.pathname) || /\/models\/[^/]+\/[^/]+\/?$/.test(url.pathname);
    if (url.origin !== origin || !url.pathname.startsWith(topicPrefix) || !isRecord) return null;
    return eventRecordHref(url.pathname + url.search + url.hash, timelineReadingReturn(destination));
  } catch { return null; }
}

/** Only return to an explorer within this topic; never to another detail or origin. */
export function safeTimelineReturn(value: string | null, origin: string, topicPrefix: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value, origin);
    if (url.origin !== origin || !url.pathname.startsWith(topicPrefix) || /\/events\/[^/]+(?:\/|$)/.test(url.pathname) || /\/models\/[^/]+\/[^/]+(?:\/|$)/.test(url.pathname)) return null;
    return url.pathname + url.search + url.hash;
  } catch { return null; }
}

/** Legacy inline-reader URLs become list anchors when returning from a full event. */
export function timelineReadingReturn(value: string): string {
  const url = new URL(value, 'https://timeline.invalid');
  const event = url.searchParams.get('event');
  if (event) {
    url.searchParams.set('event', '');
    url.hash = `event-${event}`;
  }
  return url.pathname + url.search + url.hash;
}

// Keep existing imports and shared links compatible with the former mobile-only layout.
export const restoreMobileExplorer = restoreReadingExplorer;
export const mobileTimelineReturn = timelineReadingReturn;

/** Native Back is safe only when the previous document is the intended same-origin parent. */
export function canUseParentHistoryBack(destination: string, origin: string, referrer: string, historyLength: number): boolean {
  if (historyLength <= 1 || !referrer) return false;
  try {
    const target = new URL(destination, origin), previous = new URL(referrer);
    return target.origin === origin && previous.origin === origin && previous.pathname === target.pathname && previous.search === target.search;
  } catch { return false; }
}
/** Record Back additionally requires the exact saved timeline context, including its anchor. */
export function canUseTimelineHistoryBack(destination: string, origin: string, referrer: string, historyLength: number, savedPositionUrl?: string): boolean {
  return savedPositionUrl === destination && canUseParentHistoryBack(destination, origin, referrer, historyLength);
}

/** Sorting is part of the shared view, including legacy AI query serialization. */
export function readingExplorerQuery(state: ExplorerState, serialize: (state: ExplorerState) => string = explorerQuery): string {
  const params = new URLSearchParams(serialize(state));
  params.set('order', state.order || 'asc');
  return `?${params}`;
}
export function readingExplorerEvents(catalog: Catalog, state: ExplorerState, presentation: ExplorerPresentation = {}) {
  const chronological = explorerEvents(catalog, state, presentation);
  return state.order === 'desc' ? chronological.reverse() : chronological;
}
