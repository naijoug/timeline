import { catalogBounds } from './catalog';
import { restoreExplorer, type ExplorerPresentation, type ExplorerState } from './explorer';
import type { Catalog } from './types';

/** A phone opens the whole chronology, not the desktop's focused reading window. */
export function restoreMobileExplorer(search: string, catalog: Catalog, period = '', category = '', presentation: ExplorerPresentation = {}): ExplorerState {
  const state = restoreExplorer(search, catalog, period, category, presentation);
  const params = new URLSearchParams(search);
  if (!params.has('from') && !params.has('to') && !state.period) {
    [state.from, state.to] = catalogBounds(catalog);
  }
  return { ...state, selected: '' };
}

/** Preserve existing event routes, including AI model aliases and project base paths. */
export function eventRecordHref(href: string, returnPath: string): string {
  const [pathAndQuery, hash] = href.split('#');
  const [path, search = ''] = pathAndQuery.split('?');
  const params = new URLSearchParams(search);
  params.set('return', returnPath);
  return `${path}?${params}${hash ? `#${hash}` : ''}`;
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

/** A desktop reader URL becomes a list anchor when returning from a phone detail. */
export function mobileTimelineReturn(value: string): string {
  const url = new URL(value, 'https://timeline.invalid');
  const event = url.searchParams.get('event');
  if (event) {
    url.searchParams.set('event', '');
    url.hash = `event-${event}`;
  }
  return url.pathname + url.search + url.hash;
}
