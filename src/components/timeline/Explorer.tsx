import { selectedTimelines, normalizedTimelineIds, timelineMembership } from '../../core/timelines';
import FilterSheet from './FilterSheet';
import { selectedTimelineScrollLeft } from '../../core/timeline-picker';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, SlidersHorizontal, SearchX, X } from 'lucide-react';
import Header from '../Header';
import type { ExplorerCatalog, ExplorerEvent } from '../../core/types';
import { catalogBounds } from '../../core/catalog';
import { civilYear, formatYear, formatTime } from '../../core/time';
import { explorerEvents, explorerQuery, type ExplorerState, type ExplorerPresentation } from '../../core/explorer';
import { aiViewQuery } from '../../core/ai-view-state';
import { sitePath } from '../../lib/paths';
import '../../styles/chronicle.css';
import '../../styles/collections.css';
import '../../styles/mobile-timeline.css';
import '../../styles/filter-controls.css';
import { selectFilterPeriod, clearExplorerFilters } from '../../core/filter-controls';
import { restoreReadingExplorer, readingExplorerQuery, readingExplorerEvents, eventRecordHref } from '../../core/mobile-navigation';

const emptyPresentation: ExplorerPresentation = {};
const shortYear = (coordinate: number) => { const year = civilYear(coordinate); return year < 0 ? `前${-year}` : String(year); };

/** One layout, palette and interaction model for every timeline topic. */
export default function Explorer({ catalog, initialPeriod = '', initialCategory = '', initialTimelineId = '', notesHref, viewPath, presentation = emptyPresentation }: {
  catalog: ExplorerCatalog; initialPeriod?: string; initialCategory?: string; initialTimelineId?: string; notesHref?: string; viewPath?: string; presentation?: ExplorerPresentation;
}) {
  const { topic, periods, events } = catalog;
  const [state, setState] = useState(() => restoreReadingExplorer('', catalog, initialPeriod, initialCategory, presentation, initialTimelineId));
  const [ready, setReady] = useState(false);
  const restoredPosition = useRef(false);
  const restoredInitialState = useRef(false);
  const explorerRoot = useRef<HTMLDivElement>(null);
  const [rangeOpen, setRangeOpen] = useState(false);
  const timelineOptions = useRef<HTMLDivElement>(null);
  const timelineSelectionKey = (state.timelineIds || []).join(',');
  const [selectionRestoreVersion, setSelectionRestoreVersion] = useState(0);
  const seenSelectionRestore = useRef(0);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const closeFilters = () => { setRangeOpen(false); requestAnimationFrame(() => filterTrigger.current?.focus({ preventScroll: true })); };
  const update = (patch: Partial<ExplorerState>) => setState(s => ({ ...s, ...patch }));
  const query = useMemo(() => (view: ExplorerState) => readingExplorerQuery(view, presentation.urlFormat === 'ai' ? aiViewQuery : presentation.serializeState || explorerQuery), [presentation]);
  const [min, max] = useMemo(() => catalogBounds(catalog), [catalog]);
  const categoryTitle = (id: string) => topic.categories.find(c => c.id === id)?.title || id;
  const info = (event: ExplorerEvent) => presentation.events?.[event.id] || {};
  const title = (event: ExplorerEvent) => info(event).title || event.title;
  const metadata = (event: ExplorerEvent) => info(event).metadata || periods.filter(p => event.periodIds.includes(p.id)).map(p => p.title).join(' · ') || categoryTitle(event.category);
  const date = (event: ExplorerEvent) => info(event).dateLabel || formatTime(event.time);
  const currentPeriod = periods.find(p => p.id === state.period);
  const lines = useMemo(() => selectedTimelines(catalog, state.timelineIds), [catalog, state.timelineIds]);
  const membership = useMemo(() => timelineMembership(catalog, state.timelineIds), [catalog, state.timelineIds]);
  const lineTitle = lines.length === 1 ? lines[0].title : lines.length > 1 ? '合并阅读' : '';
  const eventIsKey = (event: ExplorerEvent) => lines.length ? membership.get(event.id)?.some(entry => entry.importance === 'key') : event.milestone;
  const parentLine = lines.length === 1 ? catalog.timelines?.find(line => line.id === lines[0].parentId) : undefined;
  const timelinePath = sitePath(viewPath || (initialPeriod ? `${topic.path}${topic.periodSegment || 'periods'}/${initialPeriod}/` : topic.path));
  const returnPath = (event?: ExplorerEvent, view = state) => timelinePath + query(event ? { ...view, selected: '' } : view) + (event ? `#event-${event.id}` : '');
  const eventHref = (event: ExplorerEvent, view = state) => eventRecordHref(info(event).href || sitePath(`${topic.path}events/${event.id}/`), returnPath(event, view));
  useLayoutEffect(() => {
    const restore = (initial = false) => {
      const next = restoreReadingExplorer(location.search, catalog, initialPeriod, initialCategory, presentation, initialTimelineId);
      if (initial) {
        // A native edit made while JS loads is newer than the URL, including
        // an explicit clear. Only the first restore consumes this draft.
        const input = explorerRoot.current?.querySelector<HTMLInputElement & { __timelineSearchDraft?: { value: string } }>('#current-topic-search input[name="q"]');
        if (input?.__timelineSearchDraft) {
          next.q = input.value;
          delete input.__timelineSearchDraft;
        }
        document.dispatchEvent(new Event('timeline:search-hydrated'));
      }
      const explicitEvent = new URLSearchParams(location.search).get('event');
      const linkedEvent = explicitEvent && events.find(event => event.id === explicitEvent && (!next.timelineIds?.length || timelineMembership(catalog, next.timelineIds).has(event.id)));
      if (linkedEvent) { location.replace(eventHref(linkedEvent, next)); return; }
      setSelectionRestoreVersion(version => version + 1);
      setState(next); setReady(true);
    };
    const pop = () => { setRangeOpen(false); restoredPosition.current = false; restore(); };
    if (!restoredInitialState.current) { restoredInitialState.current = true; restore(true); }
    window.addEventListener('popstate', pop);
    return () => window.removeEventListener('popstate', pop);
  }, [catalog, initialPeriod, initialCategory, presentation, initialTimelineId]);
  useEffect(() => { if (ready) history.replaceState(history.state, '', location.pathname + query(state) + location.hash); }, [state, ready, query]);
  useLayoutEffect(() => {
    const options = timelineOptions.current;
    if (!ready || !options) return;
    const restoring = seenSelectionRestore.current !== selectionRestoreVersion;
    seenSelectionRestore.current = selectionRestoreVersion;
    // Back/Forward restores a reading path even if focus remains on an old checkbox.
    // Keep focus itself untouched; suppress movement only during direct rail edits.
    if (!restoring && options.contains(document.activeElement)) return;
    const bounds = options.getBoundingClientRect();
    const left = selectedTimelineScrollLeft({
      left: bounds.left + options.clientLeft, width: options.clientWidth,
      scrollLeft: options.scrollLeft, scrollWidth: options.scrollWidth,
    }, [...options.querySelectorAll<HTMLElement>('.timeline-option.is-selected')].map(card => card.getBoundingClientRect()));
    // Only the horizontal rail moves, instantly (including reduced-motion mode).
    // Filter edits and manual rail scrolling do not retrigger this selection effect.
    if (left !== undefined) options.scrollTo({ left, behavior: 'instant' });
  }, [ready, timelineSelectionKey, selectionRestoreVersion]);
  useEffect(() => {
    if (!ready || restoredPosition.current) return;
    restoredPosition.current = true;
    let position: { url: string; top: number; filters?: boolean } | undefined;
    try { position = history.state?.timelinePosition || JSON.parse(sessionStorage.getItem('timeline-mobile-position') || 'null') || undefined; } catch { /* Browser Back also restores naturally. */ }
    const current = location.pathname + query(state) + location.hash;
    if (position?.url === current && position.filters) setRangeOpen(true);
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => {
      if (position?.url === current && Number.isFinite(position.top)) window.scrollTo({ top: position.top, behavior: 'instant' });
      else if (location.hash.startsWith('#event-')) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ block: 'center', behavior: 'instant' });
      if (!position?.filters && location.hash.startsWith('#event-')) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.querySelector<HTMLAnchorElement>('a[data-event-id]')?.focus({ preventScroll: true });
    }));
    return () => cancelAnimationFrame(frame);
  }, [ready, state, query]);
  useEffect(() => {
    if (!ready) return;
    const rememberDocumentPosition = () => {
      const position = { url: location.pathname + location.search + location.hash, top: window.scrollY, filters: rangeOpen };
      // Native subline/breadcrumb navigation also leaves this document. Refresh
      // older event-return positions rather than overriding a later Browser Back.
      try { history.replaceState({ ...history.state, timelinePosition: position }, '', position.url); } catch { /* Native restoration remains available. */ }
      try { sessionStorage.setItem('timeline-mobile-position', JSON.stringify(position)); } catch { /* Storage is optional. */ }
    };
    window.addEventListener('pagehide', rememberDocumentPosition);
    return () => window.removeEventListener('pagehide', rememberDocumentPosition);
  }, [ready, rangeOpen]);
  const results = useMemo(() => readingExplorerEvents(catalog, state, presentation), [catalog, state, presentation]);
  const branchSides = useMemo(() => new Map(results.map((event, index) => [event.id, index % 2 ? 'right' : 'left'])), [results]);
  const newestEvent = useMemo(() => explorerEvents(catalog, { ...restoreReadingExplorer('', catalog, '', '', presentation), from: min, to: max, all: true, period: '', category: '', q: '', scope: '', timelineIds: [] }, presentation).at(-1), [catalog, min, max, presentation]);
  const activeFilters: { id: string; label: string; clear: () => void }[] = [];
  if (state.q) activeFilters.push({ id: 'search', label: `搜索：${state.q}`, clear: () => update({ q: '' }) });
  if (state.scope) activeFilters.push({ id: 'scope', label: presentation.scopes?.find(scope => scope.id === state.scope)?.title || state.scope, clear: () => update({ scope: '' }) });
  if (state.category) activeFilters.push({ id: 'category', label: categoryTitle(state.category), clear: () => update({ category: '' }) });
  if (state.period) activeFilters.push({ id: 'period', label: currentPeriod?.title || state.period, clear: () => changePeriod('') });
  const periodRange = selectFilterPeriod(catalog, state, state.period);
  if (state.from !== periodRange.from || state.to !== periodRange.to) activeFilters.push({ id: 'years', label: `${shortYear(state.from)}—${shortYear(state.to)}`, clear: () => applyFilters(periodRange) });
  if (!state.all) activeFilters.push({ id: 'key', label: '仅关键节点', clear: () => update({ all: true }) });
  const years = useMemo(() => {
    const groups = new Map<number, ExplorerEvent[]>();
    for (const event of results) {
      const year = event.time.start.year;
      const group = groups.get(year);
      if (group) group.push(event); else groups.set(year, [event]);
    }
    return [...groups].map(([year, events]) => ({ year, events }));
  }, [results]);
  const sourceCount = new Set(results.flatMap(e => e.sourceIds)).size;
  const filteredOutside = state.q ? explorerEvents(catalog, clearExplorerFilters(catalog, state, true), presentation).length : 0;
  const rangeLabel = state.from === state.to ? shortYear(state.from) : `${shortYear(state.from)} — ${shortYear(state.to)}`;
  const rememberReturn = (event?: ExplorerEvent, view = state, anchor = '') => {
    const url = returnPath(event, view) + anchor;
    if (event || anchor) history.replaceState({ ...history.state, timelinePosition: { url, top: window.scrollY, filters: rangeOpen } }, '', url);
    try {
      sessionStorage.setItem('timeline-return', url);
      if (event || anchor) sessionStorage.setItem('timeline-mobile-position', JSON.stringify({ url, top: window.scrollY, filters: rangeOpen }));
    } catch { /* The return URL and anchor work without storage. */ }
  };
  const applyFilters = (next: ExplorerState) => {
    // Period landing pages imply a fixed period; leave that route when changing it.
    if (initialPeriod && next.period !== initialPeriod) location.href = sitePath(topic.path) + query(next);
    else setState(next);
  };
  const chooseTimelines = (ids: string[]) => {
    const timelineIds = normalizedTimelineIds(catalog, ids);
    const next = { ...clearExplorerFilters(catalog, state), timelineIds };
    if (initialTimelineId || initialPeriod) { location.href = sitePath(topic.path) + query(next); return; }
    // A reading-path change is navigable; filter edits still replace their current history entry.
    const previousUrl = location.pathname + query(state) + location.hash;
    history.replaceState({ ...history.state, timelinePosition: { url: previousUrl, top: window.scrollY, filters: rangeOpen } }, '', previousUrl);
    history.pushState(null, '', timelinePath + query(next));
    setState(next);
  };
  const changePeriod = (id: string) => applyFilters(selectFilterPeriod(catalog, state, id));
  const resetFilters = () => applyFilters(clearExplorerFilters(catalog, state));
  const jumpToYear = (year: string) => document.getElementById(`year-${year}`)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  const searchAll = () => {
    applyFilters(clearExplorerFilters(catalog, state, true));
  };
  return <div ref={explorerRoot} className="atlas-app chronicle-app" data-timeline-ready={ready || undefined}>
    <Header screen="timeline" topicTitle={topic.title} topicPath={topic.path} searchPath={timelinePath} parentPath={initialTimelineId ? parentLine?.path || topic.path : undefined} searchTimelineIds={state.timelineIds} query={state.q} onQuery={q => update({ q })} />
    <main id="main" className="atlas-main">
      <nav className="mobile-topic-back" aria-label="返回主题"><a href={sitePath('/')}><ArrowLeft size={16} />所有主题</a><span>沿时间向下探索</span></nav>
      <section className="history-overview" aria-label="历史总览">
        {initialTimelineId && <nav className="timeline-breadcrumb" aria-label="时间线层级"><a href={sitePath(topic.path)}>{topic.title}</a>{parentLine && <><span aria-hidden="true">/</span><a href={sitePath(parentLine.path)}>{parentLine.title}</a></>}<span aria-hidden="true">/</span><span aria-current="page">{lineTitle}</span></nav>}
        <div className={`overview-heading ${lineTitle ? 'has-line-title' : ''}`}><h1 title={`${formatYear(civilYear(min))} — ${formatYear(civilYear(max))}`}>{lineTitle || `${shortYear(min)} — ${shortYear(max)}`}</h1><p>{lines.length === 1 ? lines[0].description : lines.length > 1 ? `${lines.map(line => line.title).join(' + ')} · 同一事件只展示一次` : presentation.subtitle || topic.description}</p></div>
        {!!catalog.timelines?.length && <section className="timeline-navigation" aria-label="子时间线">
          <div className="timeline-navigation-heading"><h2>阅读路径</h2><a className={!lines.length ? 'is-active' : ''} aria-current={!lines.length ? 'true' : undefined} href={sitePath(topic.path) + '?lines=all&all=1'} onClick={event => { if (!ready || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); chooseTimelines([]); }}>全部事件 · {events.length}</a></div>
          <p className="timeline-navigation-hint">单独打开一条，或勾选多条融合阅读；分类与关键词仍可叠加筛选。</p>
          <div ref={timelineOptions} className="subtimeline-options">{catalog.timelines.map(line => <div className={`timeline-option ${state.timelineIds?.includes(line.id) ? 'is-selected' : ''}`} key={line.id}>
            <label><input type="checkbox" aria-label={`合并${line.title}`} checked={!!state.timelineIds?.includes(line.id)} disabled={!ready} onChange={event => chooseTimelines(event.target.checked ? [...(state.timelineIds || []), line.id] : (state.timelineIds || []).filter(id => id !== line.id))}/><span>{line.title}<small>{line.kind === 'main' ? '精选主线' : '子时间线'} · {line.entries.length} 个节点</small></span></label>
            <a href={sitePath(line.path)} aria-label={`独立阅读${line.title}`}>独立阅读<ArrowRight size={13}/></a>
          </div>)}</div>
          {lines.length === 1 && <p className="timeline-scope-note">{lines[0].note}</p>}
          {notesHref && <a className="timeline-notes-link" href={notesHref}>阅读说明与资料<ArrowRight size={13}/></a>}
        </section>}

      </section>
      {topic.id === 'ai' && !initialTimelineId && newestEvent && <div className="timeline-freshness" id="timeline-freshness"><span>最新已收录 · {date(newestEvent)}</span><a href={eventRecordHref(info(newestEvent).href || sitePath(`${topic.path}events/${newestEvent.id}/`), returnPath() + '#timeline-freshness')} onClick={e => { if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) rememberReturn(undefined, state, '#timeline-freshness'); }}>{title(newestEvent)}<ArrowRight size={15} /></a><small>精选事件持续补充，并非全部发布清单。</small></div>}
      <div className="chronicle-workspace">
        <section className="chronicle-board" aria-label="关键事件时间线">
          <div className="chronicle-toolbar">
            <div className="chronicle-range-row"><div className="range-title"><span className="mobile-range-label">事件时间线</span><span className="range-numbers">{rangeLabel}</span></div><div className="chronicle-range-actions"><button ref={filterTrigger} aria-label="时间与范围筛选" aria-expanded={rangeOpen} aria-controls="chronicle-filters" className={rangeOpen ? 'active' : ''} aria-haspopup="dialog" onClick={() => setRangeOpen(true)}><SlidersHorizontal size={17} /><span className="mobile-filter-label">筛选{activeFilters.length ? ` · ${activeFilters.length}` : ''}</span></button></div></div>

          </div>
          {!!activeFilters.length && <div className="chronicle-filter-status" aria-label="已选筛选条件"><div className="filter-chips">{activeFilters.map(filter => <button key={filter.id} className="filter-chip" onClick={filter.clear} aria-label={`移除${filter.label}筛选`}><span>{filter.label}</span><X size={13} aria-hidden="true" /></button>)}</div><button className="filter-clear-all" onClick={resetFilters}>清除全部</button></div>}
          {rangeOpen && <FilterSheet catalog={catalog} state={state} presentation={presentation} onCancel={closeFilters} onApply={next => { applyFilters(next); closeFilters(); }} />}

          <div className="mobile-timeline-guide"><span aria-live="polite">{results.length} 个{state.all ? '事件' : '关键节点'}</span><label className="timeline-order"><span className="sr-only">排列顺序</span><select aria-label="排列顺序" value={state.order || 'asc'} onChange={e => update({ order: e.target.value as 'asc' | 'desc' })}><option value="desc">最新在前</option><option value="asc">从早到晚</option></select></label><label className="timeline-year-jump"><span className="sr-only">跳转年份</span><select aria-label="跳转年份" value="" onChange={e => jumpToYear(e.target.value)}><option value="">跳转年份</option>{years.map(group => <option key={group.year} value={group.year}>{formatYear(group.year)}</option>)}</select></label><button onClick={() => { const latest = state.order === 'desc' ? results[0] : results.at(-1); if (latest) document.getElementById(`event-${latest.id}`)?.scrollIntoView({ behavior: 'instant', block: 'start' }); }}>到最新<ArrowRight size={14} /></button></div>
          <div className="chronicle-event-scroll">
            {years.map(group => <section className="chronicle-year" id={`year-${group.year}`} key={group.year} aria-label={`${formatYear(group.year)}事件`}><h2>{formatYear(group.year)}<span className="mobile-year-count">{group.events.length} 个节点</span></h2><ol>{group.events.map(event => <li id={`event-${event.id}`} key={event.id} className={`chronicle-event branch-${branchSides.get(event.id)} ${eventIsKey(event) ? 'is-milestone' : ''}`}>
              <a href={eventHref(event)} data-event-id={event.id} className="chronicle-event-button" aria-label={`${date(event)} ${title(event)}，阅读事件详情`} onClick={e => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                rememberReturn(event);
              }}>
                <span className="chronicle-node" aria-hidden="true" />
                <span className="chronicle-event-copy"><span className="mobile-event-meta"><time>{date(event)}</time>{eventIsKey(event) && <span className="mobile-milestone">关键节点</span>}</span><strong>{title(event)}</strong><span>{metadata(event)}</span><span className="mobile-event-summary">{event.summary}</span>{lines.length > 1 && <span className="timeline-event-lines">{lines.filter(line => line.entries.some(entry => entry.eventId === event.id)).map(line => line.title).join(' · ')}</span>}{lines.length === 1 && membership.get(event.id)?.[0].context && <span className="timeline-entry-context">本线提示 · {membership.get(event.id)![0].context}</span>}<span className="mobile-event-footer"><span>{categoryTitle(event.category)}</span><span>阅读事件<ArrowRight size={14} /></span></span></span>
              </a>
            </li>)}</ol></section>)}
            {!results.length && <div className="chronicle-empty"><SearchX size={28} /><h2>{currentPeriod?.coverage === 'outline' ? '这个时期的事件正在补充' : '没有匹配的事件'}</h2><p>{filteredOutside ? `放宽其他筛选后有 ${filteredOutside} 条匹配记录。` : '可调整类别、关键词或时间范围；未收录不代表没有重要事件。'}</p><button onClick={searchAll}>{lines.length ? '放宽本线筛选' : '搜索完整历史'}</button><button onClick={resetFilters}>清除全部筛选</button></div>}
          </div>
          <div className="chronicle-count" aria-live="polite">当前 {results.length}{lines.length ? ` / 所选线路 ${membership.size}` : ` / 全库 ${events.length}`} 个事件<span>·</span>{sourceCount} 份来源</div>
        </section>

      </div>
    </main>
    {!notesHref && <footer className="chronicle-footer"><span>理解过去 · 看见可能的未来</span><a href={sitePath('/about/')}>{presentation.footer || '资料来源随节点保留 · 持续整理'}</a></footer>}
  </div>;
}
