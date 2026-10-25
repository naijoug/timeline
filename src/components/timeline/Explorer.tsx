import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, SlidersHorizontal, SearchX, Copy, X } from 'lucide-react';
import Header from '../Header';
import CategorySelect from './CategorySelect';
import type { ExplorerCatalog, ExplorerEvent } from '../../core/types';
import { catalogBounds, descendants } from '../../core/catalog';
import { civilYear, yearCoordinate, formatYear, formatTime } from '../../core/time';
import { explorerEvents, explorerQuery, type ExplorerState, type ExplorerPresentation } from '../../core/explorer';
import { aiViewQuery } from '../../core/ai-view-state';
import { sitePath } from '../../lib/paths';
import '../../styles/chronicle.css';
import '../../styles/collections.css';
import '../../styles/mobile-timeline.css';
import '../../styles/filter-controls.css';
import { selectFilterPeriod, clearExplorerFilters, applyFilterYears } from '../../core/filter-controls';
import { restoreReadingExplorer, readingExplorerQuery, readingExplorerEvents, eventRecordHref } from '../../core/mobile-navigation';

const emptyPresentation: ExplorerPresentation = {};
const shortYear = (coordinate: number) => { const year = civilYear(coordinate); return year < 0 ? `前${-year}` : String(year); };

/** One layout, palette and interaction model for every timeline topic. */
export default function Explorer({ catalog, initialPeriod = '', initialCategory = '', viewPath, presentation = emptyPresentation }: {
  catalog: ExplorerCatalog; initialPeriod?: string; initialCategory?: string; viewPath?: string; presentation?: ExplorerPresentation;
}) {
  const { topic, periods, events } = catalog;
  const [state, setState] = useState(() => restoreReadingExplorer('', catalog, initialPeriod, initialCategory, presentation));
  const [ready, setReady] = useState(false);
  const restoredPosition = useRef(false);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [rangeError, setRangeError] = useState('');
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const closeFilters = () => { setRangeOpen(false); filterTrigger.current?.focus({ preventScroll: true }); };
  const [message, setMessage] = useState('');
  const update = (patch: Partial<ExplorerState>) => setState(s => ({ ...s, ...patch }));
  const query = useMemo(() => (view: ExplorerState) => readingExplorerQuery(view, presentation.urlFormat === 'ai' ? aiViewQuery : presentation.serializeState || explorerQuery), [presentation]);
  const [min, max] = useMemo(() => catalogBounds(catalog), [catalog]);
  const sourceMap = useMemo(() => new Map(catalog.sources.map(s => [s.id, s])), [catalog.sources]);
  const categoryTitle = (id: string) => topic.categories.find(c => c.id === id)?.title || id;
  const info = (event: ExplorerEvent) => presentation.events?.[event.id] || {};
  const title = (event: ExplorerEvent) => info(event).title || event.title;
  const metadata = (event: ExplorerEvent) => info(event).metadata || periods.filter(p => event.periodIds.includes(p.id)).map(p => p.title).join(' · ') || categoryTitle(event.category);
  const date = (event: ExplorerEvent) => info(event).dateLabel || formatTime(event.time);
  const currentPeriod = periods.find(p => p.id === state.period);
  const periodHref = (id: string) => sitePath(`${topic.path}${topic.periodSegment || 'periods'}/${id}/`) + query(selectFilterPeriod(catalog, state, id));
  const timelinePath = sitePath(viewPath || (initialPeriod ? `${topic.path}${topic.periodSegment || 'periods'}/${initialPeriod}/` : topic.path));
  const returnPath = (event?: ExplorerEvent, view = state) => timelinePath + query(event ? { ...view, selected: '' } : view) + (event ? `#event-${event.id}` : '');
  const eventHref = (event: ExplorerEvent, view = state) => eventRecordHref(info(event).href || sitePath(`${topic.path}events/${event.id}/`), returnPath(event, view));
  useEffect(() => {
    const restore = () => {
      const next = restoreReadingExplorer(location.search, catalog, initialPeriod, initialCategory, presentation);
      const explicitEvent = new URLSearchParams(location.search).get('event');
      const linkedEvent = explicitEvent && events.find(event => event.id === explicitEvent);
      if (linkedEvent) { location.replace(eventHref(linkedEvent, next)); return; }
      setState(next); setReady(true);
    };
    const pop = () => { restoredPosition.current = false; restore(); };
    restore(); window.addEventListener('popstate', pop);
    return () => window.removeEventListener('popstate', pop);
  }, [catalog, initialPeriod, initialCategory, presentation]);
  useEffect(() => { if (ready) history.replaceState(history.state, '', location.pathname + query(state) + location.hash); }, [state, ready, query]);
  useEffect(() => {
    if (!ready || restoredPosition.current) return;
    restoredPosition.current = true;
    let position: { url: string; top: number; filters?: boolean } | undefined;
    try { position = JSON.parse(sessionStorage.getItem('timeline-mobile-position') || 'null') || undefined; } catch { /* Browser Back also restores naturally. */ }
    const current = location.pathname + query(state) + location.hash;
    if (position?.url === current && position.filters) setRangeOpen(true);
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => {
      if (position?.url === current && Number.isFinite(position.top)) window.scrollTo({ top: position.top, behavior: 'instant' });
      else if (location.hash.startsWith('#event-')) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ block: 'center', behavior: 'instant' });
    }));
    return () => cancelAnimationFrame(frame);
  }, [ready]);
  const results = useMemo(() => readingExplorerEvents(catalog, state, presentation), [catalog, state, presentation]);
  const branchSides = useMemo(() => new Map(results.map((event, index) => [event.id, index % 2 ? 'right' : 'left'])), [results]);
  const newestEvent = useMemo(() => explorerEvents(catalog, { ...restoreReadingExplorer('', catalog, '', '', presentation), from: min, to: max, all: true, period: '', category: '', q: '', scope: '' }, presentation).at(-1), [catalog, min, max, presentation]);
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
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && rangeOpen && !document.querySelector('.topic-sidebar.mobile-open')) { e.preventDefault(); closeFilters(); }
    };
    window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape);
  }, [rangeOpen]);
  const sourceCount = new Set(results.flatMap(e => e.sourceIds)).size;
  const filteredOutside = state.q ? explorerEvents(catalog, clearExplorerFilters(catalog, state, true), presentation).length : 0;
  const rangeLabel = state.from === state.to ? shortYear(state.from) : `${shortYear(state.from)} — ${shortYear(state.to)}`;
  const rememberReturn = (event?: ExplorerEvent) => {
    const url = returnPath(event);
    if (event) history.replaceState(history.state, '', url);
    try {
      sessionStorage.setItem('timeline-return', url);
      if (event) sessionStorage.setItem('timeline-mobile-position', JSON.stringify({ url, top: window.scrollY, filters: rangeOpen }));
    } catch { /* The return URL and anchor work without storage. */ }
  };
  const applyFilters = (next: ExplorerState) => {
    setRangeError('');
    // Period landing pages imply a fixed period; leave that route when changing it.
    if (initialPeriod && next.period !== initialPeriod) location.href = sitePath(topic.path) + query(next);
    else setState(next);
  };
  const changePeriod = (id: string) => applyFilters(selectFilterPeriod(catalog, state, id));
  const resetFilters = () => applyFilters(clearExplorerFilters(catalog, state));
  const jumpToYear = (year: string) => document.getElementById(`year-${year}`)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  const searchAll = () => {
    applyFilters(clearExplorerFilters(catalog, state, true));
  };
  const togglePeriod = (id: string) => { const subtree = descendants(catalog, id); update({ expanded: state.expanded.includes(id) ? state.expanded.filter(p => !subtree.has(p)) : [...state.expanded, id] }); };
  const visiblePeriodOptions = periods.filter(p => !p.parentId || state.expanded.includes(p.parentId) || p.id === state.period || p.parentId === state.period);
  return <div className="atlas-app chronicle-app" data-timeline-ready={ready || undefined}>
    <Header screen="timeline" topicTitle={topic.title} topicPath={topic.path} query={state.q} onQuery={q => update({ q })} />
    <main id="main" className="atlas-main">
      <nav className="mobile-topic-back" aria-label="返回主题"><a href={sitePath('/')}><ArrowLeft size={16} />所有主题</a><span>沿时间向下探索</span></nav>
      <section className="history-overview" aria-label="历史总览">
        <div className="overview-heading"><h1 title={`${formatYear(civilYear(min))} — ${formatYear(civilYear(max))}`}>{shortYear(min)} — {shortYear(max)}</h1><p>{presentation.subtitle || topic.description}</p></div>
        {!!catalog.collections?.length && <nav className="chronicle-collections" aria-label="精选专题">专题：{catalog.collections.map(c => <a key={c.id} href={sitePath(c.path)}>{c.title}</a>)}</nav>}

      </section>
      {topic.id === 'ai' && newestEvent && <div className="timeline-freshness"><span>最新已收录 · {date(newestEvent)}</span><a href={eventHref(newestEvent)} onClick={e => { if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) rememberReturn(newestEvent); }}>{title(newestEvent)}<ArrowRight size={15} /></a><small>精选事件持续补充，并非全部发布清单。</small></div>}
      <div className="chronicle-workspace">
        <section className="chronicle-board" aria-label="关键事件时间线">
          <div className="chronicle-toolbar">
            <div className="chronicle-range-row"><div className="range-title"><span className="mobile-range-label">事件时间线</span><span className="range-numbers">{rangeLabel}</span></div><div className="chronicle-range-actions"><button ref={filterTrigger} aria-label="时间与范围筛选" aria-expanded={rangeOpen} aria-controls="chronicle-filters" className={rangeOpen ? 'active' : ''} onClick={() => setRangeOpen(!rangeOpen)}><SlidersHorizontal size={17} /><span className="mobile-filter-label">筛选{activeFilters.length ? ` · ${activeFilters.length}` : ''}</span></button></div></div>
            <div className="chronicle-filter-row"><CategorySelect value={state.category} options={[{ id: '', title: '全部类别' }, ...topic.categories]} onChange={category => update({ category })} /><label className="key-toggle"><input type="checkbox" checked={!state.all} onChange={e => update({ all: !e.target.checked })} /><span>仅关键节点</span></label></div>
          </div>
          {!!activeFilters.length && <div className="chronicle-filter-status" aria-label="已选筛选条件"><div className="filter-chips">{activeFilters.map(filter => <button key={filter.id} className="filter-chip" onClick={filter.clear} aria-label={`移除${filter.label}筛选`}><span>{filter.label}</span><X size={13} aria-hidden="true" /></button>)}</div><button className="filter-clear-all" onClick={resetFilters}>清除全部</button></div>}
          <div id="chronicle-filters" className="chronicle-filters" hidden={!rangeOpen}>
            <div className="filter-panel-heading"><strong>筛选事件</strong><button type="button" aria-label="关闭筛选" onClick={closeFilters}><X size={18} /></button></div>
            {!!periods.length && <label className="filter-period-field">{topic.periodLabel || '时期'}<select aria-label="选择朝代或时期" value={state.period} onChange={e => changePeriod(e.target.value)}><option value="">全部时期</option>{periods.map(p => <option key={p.id} value={p.id}>{p.parentId ? '　' : ''}{p.title} · {formatTime(p.time)}</option>)}</select></label>}
            <div className="filter-presets" aria-label="快捷时间范围"><span>时间范围</span><button type="button" onClick={() => applyFilters(applyFilterYears(catalog, state))} aria-pressed={state.from === min && state.to === max && !state.period}>全部年份</button>{topic.id !== 'china-history' && <><button type="button" onClick={() => applyFilters(applyFilterYears(catalog, state, 1))} aria-pressed={state.from === max && state.to === max && !state.period}>{shortYear(max)} 年</button><button type="button" onClick={() => applyFilters(applyFilterYears(catalog, state, 5))} aria-pressed={state.from === Math.max(min, max - 4) && state.to === max && !state.period}>最近 5 年</button></>}</div>
            <form className="filter-years" key={`${state.from}:${state.to}`} onSubmit={e => { e.preventDefault(); const data = new FormData(e.currentTarget), fromYear = Number(data.get('from')), toYear = Number(data.get('to')); if (!Number.isInteger(fromYear) || !Number.isInteger(toYear) || !fromYear || !toYear) { setRangeError('请输入非零整数年份；公元前使用负数。'); return; } const from = yearCoordinate(fromYear), to = yearCoordinate(toYear); if (from > to || from < min || to > max) { setRangeError(`范围须在${formatYear(civilYear(min))}至${formatYear(civilYear(max))}之间，且起点不晚于终点。`); return; } applyFilters({ ...state, from, to, selected: '' }); }}>
              <label>从<input name="from" type="number" required defaultValue={civilYear(state.from)} aria-label="起始年份，公元前为负数" aria-invalid={!!rangeError} aria-describedby={rangeError ? "filter-range-error" : undefined} /></label><label>至<input name="to" type="number" required defaultValue={civilYear(state.to)} aria-label="结束年份，公元前为负数" aria-invalid={!!rangeError} aria-describedby={rangeError ? "filter-range-error" : undefined} /></label><button type="submit">应用范围</button>
            </form>
            {min <= 0 && <p className="filter-help">公元前用负数表示，无公元 0 年。</p>}{rangeError && <p id="filter-range-error" className="filter-error" role="alert">{rangeError}</p>}
            {!!presentation.scopes?.length && <label className="region-filter">{presentation.scopeLabel || '地区'}<select value={state.scope} onChange={e => update({ scope: e.target.value })}><option value="">{presentation.scopeAllLabel || '全球'}</option>{presentation.scopes.map(scope => <option key={scope.id} value={scope.id}>{scope.title}</option>)}</select></label>}

            <p className="filter-help">{currentPeriod?.summary || topic.coverage}</p>{currentPeriod?.note && <p className="filter-help">{currentPeriod.note}</p>}
            {!!periods.length && <details className="period-directory-control"><summary>{topic.periodLabel || '时期'}目录</summary><div>{visiblePeriodOptions.map(p => <div key={p.id} className={p.parentId ? 'period-child-row' : ''}><a href={periodHref(p.id)}>{p.title}<small>{formatTime(p.time)}</small></a>{periods.some(child => child.parentId === p.id) && <button onClick={() => togglePeriod(p.id)} aria-expanded={state.expanded.includes(p.id)} aria-label={`展开${p.title}分期`}>{state.expanded.includes(p.id) ? '收起' : '分期'}</button>}</div>)}</div></details>}
            {!!currentPeriod?.sourceIds.length && <div className="period-evidence">{currentPeriod.sourceIds.map(id => { const source = sourceMap.get(id)!; return <a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ExternalLink size={12} /></a>; })}</div>}
            {topic.shortcuts && <div className="period-shortcuts">{topic.shortcuts.map(shortcut => <a key={shortcut.path} href={sitePath(shortcut.path)}>{shortcut.title}<ArrowRight size={12} /></a>)}</div>}
            <button className="copy-timeline" onClick={async () => { try { await navigator.clipboard.writeText(location.href); setMessage('时间线链接已复制'); } catch { setMessage('可复制浏览器地址栏中的链接'); } }}><Copy size={14} />复制当前时间线链接</button><span className="filter-help" role="status">{message}</span>
            <p className="filter-help">类别与时期即时生效；自定年份请点击“应用范围”。</p>
            <div className="filter-panel-footer"><span aria-live="polite">匹配 {results.length} 个事件</span><button type="button" onClick={closeFilters}>查看结果</button></div>
          </div>

          <div className="mobile-timeline-guide"><span aria-live="polite">{results.length} 个{state.all ? '事件' : '关键节点'}</span><label className="timeline-order"><span className="sr-only">排列顺序</span><select aria-label="排列顺序" value={state.order || 'asc'} onChange={e => update({ order: e.target.value as 'asc' | 'desc' })}><option value="desc">最新在前</option><option value="asc">从早到晚</option></select></label><label className="timeline-year-jump"><span className="sr-only">跳转年份</span><select aria-label="跳转年份" value="" onChange={e => jumpToYear(e.target.value)}><option value="">跳转年份</option>{years.map(group => <option key={group.year} value={group.year}>{formatYear(group.year)}</option>)}</select></label><button onClick={() => { const latest = state.order === 'desc' ? results[0] : results.at(-1); if (latest) document.getElementById(`event-${latest.id}`)?.scrollIntoView({ behavior: 'instant', block: 'start' }); }}>到最新<ArrowRight size={14} /></button></div>
          <div className="chronicle-event-scroll">
            {years.map(group => <section className="chronicle-year" id={`year-${group.year}`} key={group.year} aria-label={`${formatYear(group.year)}事件`}><h2>{formatYear(group.year)}<span className="mobile-year-count">{group.events.length} 个节点</span></h2><ol>{group.events.map(event => <li id={`event-${event.id}`} key={event.id} className={`chronicle-event branch-${branchSides.get(event.id)} ${event.milestone ? 'is-milestone' : ''}`}>
              <a href={eventHref(event)} data-event-id={event.id} className="chronicle-event-button" aria-label={`${date(event)} ${title(event)}，阅读事件详情`} onClick={e => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                rememberReturn(event);
              }}>
                <span className="chronicle-node" aria-hidden="true" />
                <span className="chronicle-event-copy"><span className="mobile-event-meta"><time>{date(event)}</time>{event.milestone && <span className="mobile-milestone">关键节点</span>}</span><strong>{title(event)}</strong><span>{metadata(event)}</span><span className="mobile-event-summary">{event.summary}</span><span className="mobile-event-footer"><span>{categoryTitle(event.category)}</span><span>阅读事件<ArrowRight size={14} /></span></span></span>
              </a>
            </li>)}</ol></section>)}
            {!results.length && <div className="chronicle-empty"><SearchX size={28} /><h2>{currentPeriod?.coverage === 'outline' ? '这个时期的事件正在补充' : '没有匹配的事件'}</h2><p>{filteredOutside ? `放宽其他筛选后有 ${filteredOutside} 条匹配记录。` : '可调整类别、关键词或时间范围；未收录不代表没有重要事件。'}</p><button onClick={searchAll}>搜索完整历史</button><button onClick={resetFilters}>清除全部筛选</button></div>}
          </div>
          <div className="chronicle-count" aria-live="polite">当前 {results.length} / 全库 {events.length} 个事件<span>·</span>{sourceCount} 份来源</div>
        </section>

      </div>
    </main>
    <footer className="chronicle-footer"><span>理解过去 · 看见可能的未来</span><a href={sitePath('/about/')}>{presentation.footer || '资料来源随节点保留 · 持续整理'}</a></footer>
  </div>;
}
