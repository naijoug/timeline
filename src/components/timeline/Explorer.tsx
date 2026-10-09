import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, ExternalLink, SlidersHorizontal, Maximize2, Minimize2, MousePointer2, SearchX, Copy, Info } from 'lucide-react';
import Header from '../Header';
import CategorySelect from './CategorySelect';
import type { Catalog, TimelineEvent } from '../../core/types';
import { catalogBounds, descendants } from '../../core/catalog';
import { civilYear, yearCoordinate, formatYear, formatTime, clampRange, yearTicks } from '../../core/time';
import { defaultExplorer, restoreExplorer, explorerEvents, explorerQuery, type ExplorerState, type ExplorerPresentation } from '../../core/explorer';
import { sitePath } from '../../lib/paths';
import '../../styles/chronicle.css';
import '../../styles/collections.css';
import { eventSourceIds, relationEndpoints, relationsFor } from '../../core/evidence';

const emptyPresentation: ExplorerPresentation = {};
const shortYear = (coordinate: number) => { const year = civilYear(coordinate); return year < 0 ? `前${-year}` : String(year); };
function shortDate(event: TimelineEvent) {
  const { month, day } = event.time.start;
  if (event.time.end) return `至${event.time.end.year < 0 ? '前' : ''}${Math.abs(event.time.end.year)}`;
  return month ? day ? `${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}` : `${month}月` : '年份';
}

/** One layout, palette and interaction model for every timeline topic. */
export default function Explorer({ catalog, initialPeriod = '', initialCategory = '', viewPath, presentation = emptyPresentation }: {
  catalog: Catalog; initialPeriod?: string; initialCategory?: string; viewPath?: string; presentation?: ExplorerPresentation;
}) {
  const { topic, periods, events } = catalog;
  const [state, setState] = useState(() => defaultExplorer(catalog, initialPeriod, initialCategory, presentation));
  const [ready, setReady] = useState(false);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [rangeError, setRangeError] = useState('');
  const [message, setMessage] = useState('');
  const [overviewWidth, setOverviewWidth] = useState(900);
  const details = useRef<HTMLElement>(null), reader = useRef<HTMLDivElement>(null), list = useRef<HTMLDivElement>(null), axis = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const update = (patch: Partial<ExplorerState>) => setState(s => ({ ...s, ...patch }));
  const query = presentation.serializeState || explorerQuery;
  const [min, max] = useMemo(() => catalogBounds(catalog), [catalog]);
  const sourceMap = useMemo(() => new Map(catalog.sources.map(s => [s.id, s])), [catalog.sources]);
  const categoryTitle = (id: string) => topic.categories.find(c => c.id === id)?.title || id;
  const info = (event: TimelineEvent) => presentation.events?.[event.id] || {};
  const title = (event: TimelineEvent) => info(event).title || event.title;
  const metadata = (event: TimelineEvent) => info(event).metadata || periods.filter(p => event.periodIds.includes(p.id)).map(p => p.title).join(' · ') || categoryTitle(event.category);
  const date = (event: TimelineEvent) => info(event).dateLabel || formatTime(event.time);
  const eventSources = (event: TimelineEvent) => [...new Set([...eventSourceIds(event), ...relationsFor(catalog,event.id).flatMap(r=>r.sourceIds)])].map(id => sourceMap.get(id)!).filter(Boolean);
  const sourceChips = (ids?: string[]) => !!ids?.length && <span className="reader-evidence-links">{ids.map(id => { const source = sourceMap.get(id); const number = eventSources(selected).findIndex(item => item.id === id) + 1; if (!source || !number) return null; return <a key={id} href={source.url} target="_blank" rel="noopener noreferrer" title={`${source.title} · ${source.publisher}`}>{number}<ExternalLink size={11} /></a>; })}</span>;
  const currentPeriod = periods.find(p => p.id === state.period);
  const periodHref = (id: string) => sitePath(`${topic.path}${topic.periodSegment || 'periods'}/${id}/`) + `?category=${state.category || 'all'}${state.all ? '&all=1' : ''}`;
  const eventHref = (event: TimelineEvent) => info(event).href || sitePath(`${topic.path}events/${event.id}/`) + `?return=${encodeURIComponent(sitePath(viewPath || (initialPeriod ? `${topic.path}${topic.periodSegment || 'periods'}/${initialPeriod}/` : topic.path)) + query(state))}`;
  const related = (event: TimelineEvent) => info(event).related || periods.filter(p => event.periodIds.includes(p.id)).map(p => ({ title: p.title, href: periodHref(p.id) }));
  useEffect(() => {
    const restore = () => { setState(restoreExplorer(location.search, catalog, initialPeriod, initialCategory, presentation)); setReady(true); };
    restore(); window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [catalog, initialPeriod, initialCategory, presentation]);
  useEffect(() => { if (ready) history.replaceState(null, '', location.pathname + query(state)); }, [state, ready, query]);
  useEffect(() => {
    if (!axis.current) return;
    const observer = new ResizeObserver(([entry]) => setOverviewWidth(entry.contentRect.width));
    observer.observe(axis.current); return () => observer.disconnect();
  }, []);
  const results = useMemo(() => explorerEvents(catalog, state, presentation), [catalog, state, presentation]);
  const selectedIndex = results.findIndex(e => e.id === state.selected), selected = results[selectedIndex];
  const previous = results[selectedIndex - 1], next = results[selectedIndex + 1];
  const years = useMemo(() => [...new Set(results.map(e => e.time.start.year))].map(year => ({ year, events: results.filter(e => e.time.start.year === year) })), [results]);
  useEffect(() => {
    reader.current?.scrollTo({ top: 0 });
    if (!selected) setExpanded(false);
    if (!ready || !selected || !list.current) return;
    const container = list.current;
    const revealSelection = () => {
      const node = [...container.querySelectorAll<HTMLElement>('[data-event-id]')].find(node => node.dataset.eventId === selected.id);
      if (!node || !container.clientHeight || !container.clientWidth) return;
      const bounds = container.getBoundingClientRect(), item = node.getBoundingClientRect();
      if (item.top > bounds.top + bounds.height * .65 || item.top < bounds.top + 48) container.scrollTop += item.top - bounds.top - Math.max(60, bounds.height / 3);
    };
    revealSelection(); const observer = new ResizeObserver(revealSelection); observer.observe(container); return () => observer.disconnect();
  }, [selected?.id, ready, expanded]);
  const choose = (id: string, button?: HTMLButtonElement) => {
    if (button) opener.current = button;
    update({ selected: id });
    if (window.matchMedia('(max-width: 1050px)').matches) requestAnimationFrame(() => details.current?.focus({ preventScroll: true }));
  };
  const closeDetails = () => {
    const id = state.selected; update({ selected: '' }); setExpanded(false);
    requestAnimationFrame(() => ([...(list.current?.querySelectorAll<HTMLButtonElement>('[data-event-id]') || [])].find(node => node.dataset.eventId === id) || opener.current)?.focus());
  };
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || document.querySelector('.topic-sidebar.mobile-open')) return;
      if (rangeOpen) setRangeOpen(false); else if (expanded) setExpanded(false); else if (selected) closeDetails();
    };
    window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape);
  }, [state.selected, rangeOpen, expanded]);
  const span = state.to - state.from + 1, totalYears = max - min + 1;
  const move = (direction: number) => { const [from, to] = clampRange(state.from + direction * Math.max(1, Math.floor(span / 2)), span, min, max); update({ from, to }); };
  const zoom = (direction: number) => { const newSpan = direction < 0 ? Math.max(1, Math.ceil(span / 2)) : Math.min(totalYears, span * 2); const [from, to] = clampRange(Math.floor((state.from + state.to - newSpan + 1) / 2), newSpan, min, max); update({ from, to }); };
  const sourceCount = new Set(results.flatMap(e => e.sourceIds)).size;
  const filteredOutside = state.q ? explorerEvents(catalog, { ...state, from: min, to: max, all: true, period: '' }, presentation).length : 0;
  const overviewPosition = (year: number) => (year - min) / totalYears * 100;
  const overviewTicks = useMemo(() => [...new Set([min, ...yearTicks(min + 1, max - 1, overviewWidth).filter(year => (year - min) / totalYears * overviewWidth > 58 && (max - year) / totalYears * overviewWidth > 58), max])], [min, max, overviewWidth]);
  const rangeLabel = state.from === state.to ? shortYear(state.from) : `${shortYear(state.from)} — ${shortYear(state.to)}`;
  const rememberReturn = () => { try { sessionStorage.setItem('timeline-return', location.pathname + query(state)); } catch { /* Optional context. */ } };
  const searchAll = () => {
    const nextState = { ...state, from: min, to: max, all: true, scope: '', category: '', period: '', selected: '' };
    if (initialPeriod || viewPath) location.href = sitePath(topic.path) + query(nextState);
    else setState(nextState);
  };
  const togglePeriod = (id: string) => { const subtree = descendants(catalog, id); update({ expanded: state.expanded.includes(id) ? state.expanded.filter(p => !subtree.has(p)) : [...state.expanded, id] }); };
  const visiblePeriodOptions = periods.filter(p => !p.parentId || state.expanded.includes(p.parentId) || p.id === state.period || p.parentId === state.period);
  return <div className="atlas-app chronicle-app">
    <Header topicTitle={topic.title} topicPath={topic.path} query={state.q} onQuery={q => update({ q })} />
    <main id="main" className="atlas-main">
      <section className="history-overview" aria-label="历史总览">
        <div className="overview-heading"><h1 title={`${formatYear(civilYear(min))} — ${formatYear(civilYear(max))}`}>{shortYear(min)} — {shortYear(max)}</h1><p>{presentation.subtitle || topic.description}</p></div>
        {!!catalog.collections?.length && <nav className="chronicle-collections" aria-label="精选专题">专题：{catalog.collections.map(c => <a key={c.id} href={sitePath(c.path)}>{c.title}</a>)}</nav>}
        <div className="overview-axis" ref={axis} role="group" aria-label="选择历史时间窗口">
          <div className="overview-rule" /><div className="overview-selection" style={{ left: `${overviewPosition(state.from)}%`, width: `${span / totalYears * 100}%` }}><span className="window-label">{rangeLabel}</span></div>
          <input className="overview-range" type="range" min={min} max={max + 1} step="1" value={state.from} aria-label="时间窗口起点" aria-valuetext={formatYear(civilYear(state.from))} onChange={e => update({ from: Math.min(state.to, Number(e.target.value)) })} />
          <input className="overview-range" type="range" min={min} max={max + 1} step="1" value={state.to + 1} aria-label="时间窗口终点" aria-valuetext={`${formatYear(civilYear(state.to))}结束`} onChange={e => update({ to: Math.max(state.from, Number(e.target.value) - 1) })} />
          {overviewTicks.map(year => <button className="overview-tick" key={year} style={{ left: `${overviewPosition(year + .5)}%` }} onClick={() => { const [from, to] = clampRange(year, span, min, max); update({ from, to }); }} aria-label={`从 ${formatYear(civilYear(year))}开始浏览`}><span />{shortYear(year)}</button>)}
          {presentation.landmark && <button className="overview-landmark" style={{ left: `${overviewPosition(presentation.landmark.position)}%` }} onClick={() => { const mark = presentation.landmark!; const [from, to] = clampRange(mark.year - 1, 3, min, max); update({ from, to, selected: mark.event, scope: '', q: '', category: '', period: '' }); }}><strong>{shortYear(presentation.landmark.year)}</strong><span>{presentation.landmark.title}</span><i /></button>}
        </div>
      </section>
      <div className={`chronicle-workspace ${selected ? 'has-selection' : ''} ${expanded ? 'reader-expanded' : ''}`}>
        <section className="chronicle-board" aria-label="关键事件时间线">
          <div className="chronicle-toolbar">
            <div className="chronicle-range-row"><button className="range-title" onClick={() => setRangeOpen(!rangeOpen)} aria-expanded={rangeOpen} aria-controls="chronicle-filters">{rangeLabel}</button><div className="chronicle-range-actions"><button aria-label="时间与范围筛选" aria-expanded={rangeOpen} aria-controls="chronicle-filters" className={rangeOpen || state.scope ? 'active' : ''} onClick={() => setRangeOpen(!rangeOpen)}><SlidersHorizontal size={17} /></button></div></div>
            <div className="chronicle-filter-row"><CategorySelect value={state.category} options={[{ id: '', title: '全部类别' }, ...topic.categories]} onChange={category => update({ category })} /><label className="key-toggle"><input type="checkbox" checked={!state.all} onChange={e => update({ all: !e.target.checked })} /><span>关键节点</span></label></div>
          </div>
          {!!periods.length && <div className="chronicle-period-select"><label>{topic.periodLabel || '时期'}<select aria-label="选择朝代或时期" value={state.period} onChange={e => { location.href = e.target.value ? periodHref(e.target.value) : sitePath(topic.path) + `?category=${state.category || 'all'}`; }}><option value="">全部时期</option>{periods.map(p => <option key={p.id} value={p.id}>{p.parentId ? '　' : ''}{p.title} · {formatTime(p.time)}</option>)}</select></label><button onClick={() => setRangeOpen(!rangeOpen)} title="收录说明与时期目录" aria-label="收录说明与时期目录"><Info size={17} /></button></div>}
          <div id="chronicle-filters" className="chronicle-filters" hidden={!rangeOpen}>
            <form className="filter-years" key={`${state.from}:${state.to}`} onSubmit={e => { e.preventDefault(); const data = new FormData(e.currentTarget), fromYear = Number(data.get('from')), toYear = Number(data.get('to')); if (!Number.isInteger(fromYear) || !Number.isInteger(toYear) || !fromYear || !toYear) { setRangeError('请输入非零整数年份；公元前使用负数。'); return; } const from = yearCoordinate(fromYear), to = yearCoordinate(toYear); if (from > to || from < min || to > max) { setRangeError(`范围须在${formatYear(civilYear(min))}至${formatYear(civilYear(max))}之间，且起点不晚于终点。`); return; } setRangeError(''); update({ from, to }); }}>
              <label>从<input name="from" type="number" required defaultValue={civilYear(state.from)} aria-label="起始年份，公元前为负数" /></label><label>至<input name="to" type="number" required defaultValue={civilYear(state.to)} aria-label="结束年份，公元前为负数" /></label><button type="submit">应用范围</button>
            </form>
            {min <= 0 && <p className="filter-help">公元前用负数表示，无公元 0 年。</p>}{rangeError && <p className="filter-error" role="alert">{rangeError}</p>}
            {!!presentation.scopes?.length && <label className="region-filter">地区<select value={state.scope} onChange={e => update({ scope: e.target.value })}><option value="">全球</option>{presentation.scopes.map(scope => <option key={scope.id} value={scope.id}>{scope.title}</option>)}</select></label>}
            <div className="filter-zoom"><button aria-label="更早的时间" onClick={() => move(-1)} disabled={state.from === min}><ChevronLeft size={17} /></button><button aria-label="更晚的时间" onClick={() => move(1)} disabled={state.to === max}><ChevronRight size={17} /></button><button aria-label="缩小时间轴" onClick={() => zoom(1)} disabled={span >= totalYears}><ZoomOut size={17} /></button><button aria-label="放大时间轴" onClick={() => zoom(-1)} disabled={span <= 1}><ZoomIn size={17} /></button><button onClick={() => setState(defaultExplorer(catalog, initialPeriod, initialCategory, presentation))}>重置</button>{presentation.latestEvent && <button onClick={() => update({ from: max - 1, to: max, selected: presentation.latestEvent!, scope: '', q: '', category: '', period: '' })}>最近</button>}<button onClick={() => setRangeOpen(false)}>完成</button></div>
            <p className="filter-help">{currentPeriod?.summary || topic.coverage}</p>{currentPeriod?.note && <p className="filter-help">{currentPeriod.note}</p>}
            {!!periods.length && <details className="period-directory-control"><summary>{topic.periodLabel || '时期'}目录</summary><div>{visiblePeriodOptions.map(p => <div key={p.id} className={p.parentId ? 'period-child-row' : ''}><a href={periodHref(p.id)}>{p.title}<small>{formatTime(p.time)}</small></a>{periods.some(child => child.parentId === p.id) && <button onClick={() => togglePeriod(p.id)} aria-expanded={state.expanded.includes(p.id)} aria-label={`展开${p.title}分期`}>{state.expanded.includes(p.id) ? '收起' : '分期'}</button>}</div>)}</div></details>}
            {!!currentPeriod?.sourceIds.length && <div className="period-evidence">{currentPeriod.sourceIds.map(id => { const source = sourceMap.get(id)!; return <a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ExternalLink size={12} /></a>; })}</div>}
            {topic.shortcuts && <div className="period-shortcuts">{topic.shortcuts.map(shortcut => <a key={shortcut.path} href={sitePath(shortcut.path)}>{shortcut.title}<ArrowRight size={12} /></a>)}</div>}
            <button className="copy-timeline" onClick={async () => { try { await navigator.clipboard.writeText(location.href); setMessage('时间线链接已复制'); } catch { setMessage('可复制浏览器地址栏中的链接'); } }}><Copy size={14} />复制当前时间线链接</button><span className="filter-help" role="status">{message}</span>
          </div>
          {(state.q || state.scope) && <div className="chronicle-filter-status"><span>{state.q ? `“${state.q}”` : ''}{state.scope ? ` · ${presentation.scopes?.find(s => s.id === state.scope)?.title || ''}` : ''}</span><button onClick={() => update({ q: '', scope: '' })} aria-label="清除搜索与地区筛选"><X size={14} /></button></div>}
          <div className="chronicle-event-scroll" ref={list}>
            {years.map(group => <section className="chronicle-year" key={group.year} aria-label={`${formatYear(group.year)}事件`}><h2>{formatYear(group.year)}</h2><ol>{group.events.map(event => <li key={event.id} className="chronicle-event"><button data-event-id={event.id} className={`chronicle-event-button ${event.id === selected?.id ? 'selected' : ''}`} aria-pressed={event.id === selected?.id} aria-label={`${date(event)} ${title(event)}`} onClick={e => choose(event.id, e.currentTarget)}><time title={date(event)}>{shortDate(event)}</time><span className="chronicle-node" aria-hidden="true" /><span className="chronicle-event-copy"><strong>{title(event)}</strong><span>{metadata(event)}</span></span></button></li>)}</ol></section>)}
            {!results.length && <div className="chronicle-empty"><SearchX size={28} /><h2>{currentPeriod?.coverage === 'outline' ? '这个时期的事件正在补充' : '没有匹配的事件'}</h2><p>{filteredOutside ? `其他年份还有 ${filteredOutside} 条匹配记录。` : '可调整类别、关键词或时间范围；未收录不代表没有重要事件。'}</p><button onClick={searchAll}>搜索完整历史</button><button onClick={() => setState(defaultExplorer(catalog, initialPeriod, initialCategory, presentation))}>重置筛选</button></div>}
          </div>
          <div className="chronicle-count" aria-live="polite">当前 {results.length} / 全库 {events.length} 个事件<span>·</span>{sourceCount} 份来源</div>
        </section>
        {selected ? <aside className="chronicle-reader" ref={details} tabIndex={-1} aria-label="事件详情">
          <div className="chronicle-reader-scroll" ref={reader}>
            <div className="reader-controls"><button onClick={() => setExpanded(!expanded)} aria-label={expanded ? '退出展开阅读' : '展开阅读'} aria-pressed={expanded} title={expanded ? '退出展开阅读' : '展开阅读'}>{expanded ? <Minimize2 size={19} /> : <Maximize2 size={19} />}</button><button onClick={closeDetails} aria-label="关闭事件详情" title="关闭事件详情"><X size={21} /></button></div>
            <span className="detail-lane-label">{categoryTitle(selected.category)}</span><h2>{title(selected)}</h2><div className="detail-date">{date(selected)}<span>·</span>{metadata(selected)}</div>
            <p className="chronicle-lead">{selected.summary}{sourceChips(selected.sourceIds)}</p><div className="detail-tags">{(info(selected).tags || selected.tags).filter(Boolean).map(tag => <span key={tag}>{tag}</span>)}</div>
            {!!selected.facts?.length && <section className="reader-section reader-facts" aria-label="事件档案"><h3>关键信息</h3><div>{selected.facts.filter(fact => fact.text).map(fact => <div key={fact.label}><span>{fact.label}</span><strong>{fact.text}</strong>{sourceChips(fact.sourceIds)}</div>)}</div></section>}
            <section className="reader-section"><h3>为什么重要 · 编辑概述</h3><p>{selected.significance}</p></section>
            {selected.details?.map(section => <section className="reader-section" key={section.label}><h3>{section.label}{section.editorial && ' · 编辑解读'}</h3><p>{section.text}{!section.editorial && sourceChips(section.sourceIds || selected.sourceIds)}</p>{section.locator && <small className="evidence-locator">原文定位：{section.locator}</small>}</section>)}
            {(info(selected).change || selected.change) && <details className="chronicle-change" open><summary>变化、证据与边界<ChevronRight size={17} /></summary>{(() => { const change = (info(selected).change || selected.change)!; return <div><p className="change-baseline">比较基线：{change.baseline}</p><ul>{change.improvements.map(text => <li key={text}>{text}</li>)}</ul><p className="reader-caveat">{change.evidence} · {change.tradeoffs}{sourceChips(change.sourceIds)}</p></div>; })()}</details>}
            {selected.note && <section className="reader-section"><h3>阅读边界</h3><p>{selected.note}{sourceChips(selected.sourceIds)}</p></section>}
            <section className="reader-section reader-sources"><h3>来源与背景资料</h3>{eventSources(selected).map(source => <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={17} /><span><span className="reader-source-title">{source.title}</span><small>{source.publisher} · {source.format || source.type} · 核查于 {source.checkedAt}{source.version && ` · ${source.version}`}{source.locator && ` · ${source.locator}`}</small></span></a>)}</section>
            {!!relationsFor(catalog,selected.id).length && <section className="reader-section"><h3>有据关系</h3>{relationsFor(catalog,selected.id).map(r => { const { subject, object } = relationEndpoints(catalog,r); return <p key={r.id}><a href={sitePath(`${topic.path}events/${subject.id}/`)}>{subject.title}</a> · {r.label} · {object.kind === 'event' ? <a href={sitePath(`${topic.path}events/${object.id}/`)}>{object.title}</a> : <strong>{object.title}</strong>}<small className="evidence-locator">依据：{r.locator} {r.sourceIds.map(id=><a key={id} href={sourceMap.get(id)!.url} target="_blank" rel="noopener noreferrer">{sourceMap.get(id)!.title}</a>)}</small>{r.note}</p>; })}</section>}
            {!!related(selected).length && <div className="reader-related"><span>继续探索</span>{related(selected).map(item => <a key={item.href} href={item.href}>{item.title}<ArrowRight size={13} /></a>)}</div>}
            <a className="reader-full-record" href={eventHref(selected)} onClick={rememberReturn}>阅读完整事件<ExternalLink size={14} /></a>
          </div>
          <nav className="reader-pagination" aria-label="相邻事件"><button disabled={!previous} onClick={() => previous && choose(previous.id)} aria-label={previous ? `上一节点：${title(previous)}` : '已经是第一个节点'}><ArrowLeft size={20} /><span><small>上一节点</small><strong>{previous ? title(previous) : '已到起点'}</strong></span></button><button disabled={!next} onClick={() => next && choose(next.id)} aria-label={next ? `下一节点：${title(next)}` : '已经是最后一个节点'}><span><small>下一节点</small><strong>{next ? title(next) : '已到终点'}</strong></span><ArrowRight size={20} /></button></nav>
        </aside> : <aside className="chronicle-reader-placeholder" aria-label="阅读提示"><MousePointer2 size={30} strokeWidth={1.4} /><h2>{currentPeriod?.title || '选择一个节点，走进它的故事'}</h2><p>{currentPeriod?.summary || '沿着左侧时间线浏览，在这里阅读事件的背景、意义与来源。'}</p>{currentPeriod && <button onClick={() => setRangeOpen(true)}>查看时期依据与分期<ArrowRight size={14} /></button>}</aside>}
      </div>
    </main>
    <footer className="chronicle-footer"><span>理解过去 · 看见可能的未来</span><a href={sitePath('/about/')}>{presentation.footer || '资料来源随节点保留 · 持续整理'}</a></footer>
  </div>;
}
