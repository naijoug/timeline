import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ExternalLink, SlidersHorizontal, SearchX, Copy, Info } from 'lucide-react';
import Header from '../Header';
import CategorySelect from './CategorySelect';
import type { Catalog, TimelineEvent } from '../../core/types';
import { catalogBounds, descendants } from '../../core/catalog';
import { civilYear, yearCoordinate, formatYear, formatTime, clampRange } from '../../core/time';
import { explorerEvents, explorerQuery, type ExplorerState, type ExplorerPresentation } from '../../core/explorer';
import { sitePath } from '../../lib/paths';
import '../../styles/chronicle.css';
import '../../styles/collections.css';
import '../../styles/mobile-timeline.css';
import { restoreReadingExplorer, readingExplorerQuery, readingExplorerEvents, eventRecordHref } from '../../core/mobile-navigation';

const emptyPresentation: ExplorerPresentation = {};
const shortYear = (coordinate: number) => { const year = civilYear(coordinate); return year < 0 ? `前${-year}` : String(year); };

/** One layout, palette and interaction model for every timeline topic. */
export default function Explorer({ catalog, initialPeriod = '', initialCategory = '', viewPath, presentation = emptyPresentation }: {
  catalog: Catalog; initialPeriod?: string; initialCategory?: string; viewPath?: string; presentation?: ExplorerPresentation;
}) {
  const { topic, periods, events } = catalog;
  const [state, setState] = useState(() => restoreReadingExplorer('', catalog, initialPeriod, initialCategory, presentation));
  const [ready, setReady] = useState(false);
  const restoredPosition = useRef(false);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [rangeError, setRangeError] = useState('');
  const [message, setMessage] = useState('');
  const update = (patch: Partial<ExplorerState>) => setState(s => ({ ...s, ...patch }));
  const query = useMemo(() => (view: ExplorerState) => readingExplorerQuery(view, presentation.serializeState || explorerQuery), [presentation]);
  const [min, max] = useMemo(() => catalogBounds(catalog), [catalog]);
  const sourceMap = useMemo(() => new Map(catalog.sources.map(s => [s.id, s])), [catalog.sources]);
  const categoryTitle = (id: string) => topic.categories.find(c => c.id === id)?.title || id;
  const info = (event: TimelineEvent) => presentation.events?.[event.id] || {};
  const title = (event: TimelineEvent) => info(event).title || event.title;
  const metadata = (event: TimelineEvent) => info(event).metadata || periods.filter(p => event.periodIds.includes(p.id)).map(p => p.title).join(' · ') || categoryTitle(event.category);
  const date = (event: TimelineEvent) => info(event).dateLabel || formatTime(event.time);
  const currentPeriod = periods.find(p => p.id === state.period);
  const periodHref = (id: string) => sitePath(`${topic.path}${topic.periodSegment || 'periods'}/${id}/`) + `?category=${state.category || 'all'}${state.all ? '&all=1' : ''}`;
  const timelinePath = sitePath(viewPath || (initialPeriod ? `${topic.path}${topic.periodSegment || 'periods'}/${initialPeriod}/` : topic.path));
  const returnPath = (event?: TimelineEvent, view = state) => timelinePath + query(event ? { ...view, selected: '' } : view) + (event ? `#event-${event.id}` : '');
  const eventHref = (event: TimelineEvent, view = state) => eventRecordHref(info(event).href || sitePath(`${topic.path}events/${event.id}/`), returnPath(event, view));
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
  const activeFilters = [state.q && `搜索：${state.q}`, state.scope && (presentation.scopes?.find(scope => scope.id === state.scope)?.title || state.scope), state.category && categoryTitle(state.category), state.period && currentPeriod?.title, (state.from !== min || state.to !== max) && '限定年份', !state.all && '仅关键节点'].filter(Boolean);
  const years = useMemo(() => [...new Set(results.map(e => e.time.start.year))].map(year => ({ year, events: results.filter(e => e.time.start.year === year) })), [results]);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.querySelector('.topic-sidebar.mobile-open')) setRangeOpen(false);
    };
    window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape);
  }, []);
  const span = state.to - state.from + 1, totalYears = max - min + 1;
  const move = (direction: number) => { const [from, to] = clampRange(state.from + direction * Math.max(1, Math.floor(span / 2)), span, min, max); update({ from, to }); };
  const zoom = (direction: number) => { const newSpan = direction < 0 ? Math.max(1, Math.ceil(span / 2)) : Math.min(totalYears, span * 2); const [from, to] = clampRange(Math.floor((state.from + state.to - newSpan + 1) / 2), newSpan, min, max); update({ from, to }); };
  const sourceCount = new Set(results.flatMap(e => e.sourceIds)).size;
  const filteredOutside = state.q ? explorerEvents(catalog, { ...state, from: min, to: max, all: true, period: '' }, presentation).length : 0;
  const rangeLabel = state.from === state.to ? shortYear(state.from) : `${shortYear(state.from)} — ${shortYear(state.to)}`;
  const rememberReturn = (event?: TimelineEvent) => {
    const url = returnPath(event);
    if (event) history.replaceState(history.state, '', url);
    try {
      sessionStorage.setItem('timeline-return', url);
      if (event) sessionStorage.setItem('timeline-mobile-position', JSON.stringify({ url, top: window.scrollY, filters: rangeOpen }));
    } catch { /* The return URL and anchor work without storage. */ }
  };
  const resetFilters = () => setState(restoreReadingExplorer('', catalog, initialPeriod, initialCategory, presentation));
  const jumpToYear = (year: string) => document.getElementById(`year-${year}`)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  const searchAll = () => {
    const nextState = { ...state, from: min, to: max, all: true, scope: '', category: '', period: '', selected: '' };
    if (initialPeriod || viewPath) location.href = sitePath(topic.path) + query(nextState);
    else setState(nextState);
  };
  const togglePeriod = (id: string) => { const subtree = descendants(catalog, id); update({ expanded: state.expanded.includes(id) ? state.expanded.filter(p => !subtree.has(p)) : [...state.expanded, id] }); };
  const visiblePeriodOptions = periods.filter(p => !p.parentId || state.expanded.includes(p.parentId) || p.id === state.period || p.parentId === state.period);
  return <div className="atlas-app chronicle-app">
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
            <div className="chronicle-range-row"><button className="range-title" onClick={() => setRangeOpen(!rangeOpen)} aria-expanded={rangeOpen} aria-controls="chronicle-filters"><span className="mobile-range-label">事件时间线</span><span className="range-numbers">{rangeLabel}</span></button><div className="chronicle-range-actions"><button aria-label="时间与范围筛选" aria-expanded={rangeOpen} aria-controls="chronicle-filters" className={rangeOpen || state.scope ? 'active' : ''} onClick={() => setRangeOpen(!rangeOpen)}><SlidersHorizontal size={17} /><span className="mobile-filter-label">筛选</span></button></div></div>
            <div className="chronicle-filter-row"><CategorySelect value={state.category} options={[{ id: '', title: '全部类别' }, ...topic.categories]} onChange={category => update({ category })} /><label className="key-toggle"><input type="checkbox" checked={!state.all} onChange={e => update({ all: !e.target.checked })} /><span>关键节点</span></label></div>
          </div>
          {!!periods.length && <div className="chronicle-period-select"><label>{topic.periodLabel || '时期'}<select aria-label="选择朝代或时期" value={state.period} onChange={e => { location.href = e.target.value ? periodHref(e.target.value) : sitePath(topic.path) + `?category=${state.category || 'all'}`; }}><option value="">全部时期</option>{periods.map(p => <option key={p.id} value={p.id}>{p.parentId ? '　' : ''}{p.title} · {formatTime(p.time)}</option>)}</select></label><button onClick={() => setRangeOpen(!rangeOpen)} title="收录说明与时期目录" aria-label="收录说明与时期目录"><Info size={17} /></button></div>}
          <div id="chronicle-filters" className="chronicle-filters" hidden={!rangeOpen}>
            <form className="filter-years" key={`${state.from}:${state.to}`} onSubmit={e => { e.preventDefault(); const data = new FormData(e.currentTarget), fromYear = Number(data.get('from')), toYear = Number(data.get('to')); if (!Number.isInteger(fromYear) || !Number.isInteger(toYear) || !fromYear || !toYear) { setRangeError('请输入非零整数年份；公元前使用负数。'); return; } const from = yearCoordinate(fromYear), to = yearCoordinate(toYear); if (from > to || from < min || to > max) { setRangeError(`范围须在${formatYear(civilYear(min))}至${formatYear(civilYear(max))}之间，且起点不晚于终点。`); return; } setRangeError(''); update({ from, to }); }}>
              <label>从<input name="from" type="number" required defaultValue={civilYear(state.from)} aria-label="起始年份，公元前为负数" /></label><label>至<input name="to" type="number" required defaultValue={civilYear(state.to)} aria-label="结束年份，公元前为负数" /></label><button type="submit">应用范围</button>
            </form>
            {min <= 0 && <p className="filter-help">公元前用负数表示，无公元 0 年。</p>}{rangeError && <p className="filter-error" role="alert">{rangeError}</p>}
            {!!presentation.scopes?.length && <label className="region-filter">{presentation.scopeLabel || '地区'}<select value={state.scope} onChange={e => update({ scope: e.target.value })}><option value="">{presentation.scopeAllLabel || '全球'}</option>{presentation.scopes.map(scope => <option key={scope.id} value={scope.id}>{scope.title}</option>)}</select></label>}
            <div className="filter-zoom"><button aria-label="更早的时间" onClick={() => move(-1)} disabled={state.from === min}><ChevronLeft size={17} /></button><button aria-label="更晚的时间" onClick={() => move(1)} disabled={state.to === max}><ChevronRight size={17} /></button><button aria-label="缩小时间轴" onClick={() => zoom(1)} disabled={span >= totalYears}><ZoomOut size={17} /></button><button aria-label="放大时间轴" onClick={() => zoom(-1)} disabled={span <= 1}><ZoomIn size={17} /></button><button onClick={resetFilters}>重置</button>{presentation.latestEvent && <button onClick={() => update({ from: max - 1, to: max, selected: '', scope: '', q: '', category: '', period: '' })}>最近</button>}<button onClick={() => setRangeOpen(false)}>完成</button></div>
            <p className="filter-help">{currentPeriod?.summary || topic.coverage}</p>{currentPeriod?.note && <p className="filter-help">{currentPeriod.note}</p>}
            {!!periods.length && <details className="period-directory-control"><summary>{topic.periodLabel || '时期'}目录</summary><div>{visiblePeriodOptions.map(p => <div key={p.id} className={p.parentId ? 'period-child-row' : ''}><a href={periodHref(p.id)}>{p.title}<small>{formatTime(p.time)}</small></a>{periods.some(child => child.parentId === p.id) && <button onClick={() => togglePeriod(p.id)} aria-expanded={state.expanded.includes(p.id)} aria-label={`展开${p.title}分期`}>{state.expanded.includes(p.id) ? '收起' : '分期'}</button>}</div>)}</div></details>}
            {!!currentPeriod?.sourceIds.length && <div className="period-evidence">{currentPeriod.sourceIds.map(id => { const source = sourceMap.get(id)!; return <a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ExternalLink size={12} /></a>; })}</div>}
            {topic.shortcuts && <div className="period-shortcuts">{topic.shortcuts.map(shortcut => <a key={shortcut.path} href={sitePath(shortcut.path)}>{shortcut.title}<ArrowRight size={12} /></a>)}</div>}
            <button className="copy-timeline" onClick={async () => { try { await navigator.clipboard.writeText(location.href); setMessage('时间线链接已复制'); } catch { setMessage('可复制浏览器地址栏中的链接'); } }}><Copy size={14} />复制当前时间线链接</button><span className="filter-help" role="status">{message}</span>
          </div>
          {!!activeFilters.length && <div className="chronicle-filter-status"><span>{activeFilters.join(' · ')}</span><button onClick={searchAll}>查看全部</button></div>}
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
            {!results.length && <div className="chronicle-empty"><SearchX size={28} /><h2>{currentPeriod?.coverage === 'outline' ? '这个时期的事件正在补充' : '没有匹配的事件'}</h2><p>{filteredOutside ? `其他年份还有 ${filteredOutside} 条匹配记录。` : '可调整类别、关键词或时间范围；未收录不代表没有重要事件。'}</p><button onClick={searchAll}>搜索完整历史</button><button onClick={resetFilters}>重置筛选</button></div>}
          </div>
          <div className="chronicle-count" aria-live="polite">当前 {results.length} / 全库 {events.length} 个事件<span>·</span>{sourceCount} 份来源</div>
        </section>

      </div>
    </main>
    <footer className="chronicle-footer"><span>理解过去 · 看见可能的未来</span><a href={sitePath('/about/')}>{presentation.footer || '资料来源随节点保留 · 持续整理'}</a></footer>
  </div>;
}
