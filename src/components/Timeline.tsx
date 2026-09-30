import { sitePath } from '../lib/paths';
import { useEffect, useState, useMemo, useRef } from 'react';
import { Search, SlidersHorizontal, X, ArrowDownUp, ExternalLink, ChevronDown, Bookmark, Sparkles, CalendarDays } from 'lucide-react';
import type { TimelineEvent, Track } from '../data/types';
import { events } from '../data/events';
import { entities, entityMap, entityHref, eventHref } from '../data/entities';
import { sourceMap } from '../data/sources';
import { eras, defaultFilters, readFilters, filterQuery, selectEvents, displayDate, type Filters } from '../lib/timeline';

const headings: Record<Track, [string, string, string]> = {
  history: ['THE STORY SO FAR', '理解 AI 的来时路。', '从一个大胆的问题，到改变世界的技术。沿着时间，发现每一次重要突破。'],
  methods: ['IDEAS THAT MOVE US FORWARD', '追溯思想，理解方法。', '从符号推理到 Agent loop。探索方法的提出、应用，以及它们之间的联系。'],
  products: ['FROM INTELLIGENCE TO ACTION', '看见 AI 如何走进工作。', '沿着产品的发布与更新，观察智能如何变成可以使用的能力。'],
  models: ['EVERY GENERATION, A NEW CHAPTER', '每一代模型，改变了什么？', '跟随模型家族的演进，了解能力、使用条件与变化背后的证据。'],
};
const rememberReturn = (url: string) => { try { sessionStorage.setItem('timeline-return', url); } catch {} };
const names = Object.fromEntries(entities.map(e => [e.id, e.name]));

export function EventCard({ event, returnUrl }: { event: TimelineEvent; returnUrl?: string }) {
  const [open, setOpen] = useState(false);
  const href = eventHref(event);
  return <article className={`event-card ${open ? 'is-expanded' : ''}`} id={`event-${event.id}`}>
    <div className="event-meta"><span className={`kind kind-${event.tracks.includes('models') ? 'models' : event.tracks.includes('products') ? 'products' : 'methods'}`}>{event.kind}</span><span>{event.company || event.tags[0] || 'AI 研究'}</span>{event.milestone && <span className="milestone"><Sparkles size={12} />里程碑</span>}</div>
    <h3><a href={href} onClick={() => { if (returnUrl) rememberReturn(`${returnUrl}#event-${event.id}`); }}>{event.title}</a></h3>
    {event.subtitle && <div className="event-subtitle">{event.subtitle}</div>}
    <p className="event-summary">{event.summary}</p>
    <div className="event-bottom"><div className="event-tags">{event.tags.slice(0, 2).map(t => <span key={t}>{t}</span>)}</div><button className="expand-button" aria-expanded={open} aria-controls={`details-${event.id}`} onClick={() => setOpen(!open)}>{open ? '收起' : '了解这次变化'}<ChevronDown size={15} /></button></div>
    <div id={`details-${event.id}`} hidden={!open} className="inline-detail">
      <div className="detail-caption">为什么重要</div><p>{event.significance}</p>
      {event.change && <><div className="detail-caption">相比 {event.change.baseline}</div><ul>{event.change.improvements.map(x => <li key={x}>{x}</li>)}</ul><p className="caveat">{event.change.evidence} · {event.change.tradeoffs}</p></>}
      <div className="source-links">{event.sourceIds.map(id => <a key={id} href={sourceMap[id].url} target="_blank" rel="noopener noreferrer">{sourceMap[id].publisher} · {sourceMap[id].type}<ExternalLink size={12} /></a>)}</div>
      <a className="text-link" href={href} onClick={() => { if (returnUrl) rememberReturn(`${returnUrl}#event-${event.id}`); }}>查看完整事件</a>
    </div>
  </article>;
}

export default function Timeline({ track = 'history', entityId }: { track?: Track; entityId?: string }) {
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters(track), ...(entityId ? { entity: entityId, level: 'all' as const } : {}) });
  const [advanced, setAdvanced] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeEra, setActiveEra] = useState('');
  useEffect(() => {
    const restore = () => { const f = readFilters(window.location.search, track); setFilters(entityId ? { ...f, entity: entityId, level: 'all' } : f); setReady(true); };
    restore(); window.addEventListener('popstate', restore); return () => window.removeEventListener('popstate', restore);
  }, [track, entityId]);
  useEffect(() => {
    if (!ready) return;
    const query = filterQuery(filters, track);
    window.history.replaceState(null, '', `${window.location.pathname}${query}${window.location.hash}`);
    const links = document.querySelectorAll<HTMLAnchorElement>('[data-track-link]');
    links.forEach(link => {
      const p = new URLSearchParams(); if (filters.from) p.set('from', filters.from); if (filters.to) p.set('to', filters.to); if (filters.q) p.set('q', filters.q);
      link.href = `${link.dataset.path}${p.size ? `?${p.toString()}` : ''}`;
    });
  }, [filters, ready, track]);
  const results = useMemo(() => selectEvents(events, entityId ? 'history' : track, filters, names), [track, filters, entityId]);
  const hashRestored = useRef(false);
  useEffect(() => { if (ready && !hashRestored.current) { hashRestored.current = true; const hash = window.location.hash.slice(1); if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView()); } }, [ready, results]);
  const groups = useMemo(() => {
    const map = new Map<string, TimelineEvent[]>();
    results.forEach(e => { const key = track === 'history' ? e.date.slice(0, 4) : e.date.slice(0, 7); map.set(key, [...(map.get(key) || []), e]); }); return [...map.entries()];
  }, [results, track]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { const visible = entries.filter(e => e.isIntersecting); if (visible.length) setActiveEra((visible[0].target as HTMLElement).dataset.era || ''); }, { rootMargin: '-100px 0px -55% 0px' });
    document.querySelectorAll('.time-group').forEach(el => observer.observe(el)); return () => observer.disconnect();
  }, [groups]);
  const update = (patch: Partial<Filters>) => setFilters(f => ({ ...f, ...patch }));
  const reset = () => { setFilters({ ...defaultFilters(track), ...(entityId ? { entity: entityId, level: 'all' as const } : {}) }); setAdvanced(false); };
  const candidates = entities.filter(e => track === 'methods' ? e.type === 'concept' : track === 'products' ? e.type === 'product' : track === 'models' ? e.type === 'family' : true);
  const companies = [...new Set(events.filter(e => track === 'history' || e.tracks.includes(track)).map(e => e.company).filter(Boolean))].sort() as string[];
  const availableEras = eras.filter(era => results.some(e => +e.date.slice(0, 4) >= era.from && +e.date.slice(0, 4) <= era.to));
  const sourceCount = new Set(events.flatMap(e => e.sourceIds)).size;
  const [eyebrow, title, intro] = headings[track];
  const returnUrl = typeof window === 'undefined' ? sitePath('/ai/') : `${window.location.pathname}${filterQuery(filters, track)}`;
  const hasFilters = !!(filters.q || filters.from || filters.to || filters.company || (!entityId && filters.entity));
  return <>
    {!entityId && <header className="page-intro"><div className="eyebrow"><span></span>{eyebrow}</div><h1>{title}</h1><p>{intro}</p><div className="intro-meta"><span><CalendarDays size={14} />1943 — 2026</span><span>{events.length} 个已收录事件</span><span>{sourceCount} 份来源</span></div></header>}
    {!entityId && track !== 'history' && <div className="entity-strip" aria-label="快速选择对象">{candidates.map(e => <button key={e.id} className={filters.entity === e.id ? 'selected' : ''} onClick={() => update({ entity: filters.entity === e.id ? '' : e.id })} aria-pressed={filters.entity === e.id}>{e.name}</button>)}</div>}
    {!entityId && filters.entity && entityMap[filters.entity] && <div className="selected-entity-link"><span>{entityMap[filters.entity].name}</span><a href={entityHref(filters.entity)}>查看完整发展史与关联</a></div>}
    <section className="explore-area" aria-label="探索时间线">
      <div className="explore-toolbar"><div className="view-switch" aria-label="事件密度">{!entityId && <><button className={filters.level === 'milestones' ? 'selected' : ''} onClick={() => update({ level: 'milestones' })} aria-pressed={filters.level === 'milestones'}><Sparkles size={14} />精选里程碑</button><button className={filters.level === 'all' ? 'selected' : ''} onClick={() => update({ level: 'all' })} aria-pressed={filters.level === 'all'}>全部已收录</button></>}{entityId && <span className="section-label">发布与演进</span>}</div>
      <div className="toolbar-actions"><button className={advanced ? 'icon-action active' : 'icon-action'} onClick={() => setAdvanced(!advanced)} aria-expanded={advanced} aria-controls="advanced-filters"><SlidersHorizontal size={15} />筛选{hasFilters && <span className="filter-indicator" />}</button><button className="icon-action" onClick={() => update({ order: filters.order === 'asc' ? 'desc' : 'asc' })}><ArrowDownUp size={15} />{filters.order === 'asc' ? '从早到晚' : '最新优先'}</button></div></div>
      <div className="search-row"><label className="timeline-search"><Search size={17} /><span className="sr-only">搜索事件、模型或产品</span><input type="search" aria-label="搜索事件、模型或产品" value={filters.q} onChange={e => update({ q: e.target.value })} placeholder="搜索事件、模型或产品…" />{filters.q && <button aria-label="清除搜索" onClick={() => update({ q: '' })}><X size={15} /></button>}</label><span className="result-count" aria-live="polite">{results.length} 个事件</span></div>
      <div id="advanced-filters" className="advanced-filters" hidden={!advanced}>
        <label>从哪一年<input type="number" min="1943" max="2026" placeholder="1943" value={filters.from} onChange={e => update({ from: e.target.value })} /></label>
        <label>到哪一年<input type="number" min="1943" max="2026" placeholder="2026" value={filters.to} onChange={e => update({ to: e.target.value })} /></label>
        <label>公司 / 机构<select value={filters.company} onChange={e => update({ company: e.target.value })}><option value="">全部机构</option>{companies.map(c => <option key={c}>{c}</option>)}</select></label>
        {!entityId && <label>关注对象<select value={filters.entity} onChange={e => update({ entity: e.target.value })}><option value="">全部对象</option>{candidates.map(e => <option value={e.id} key={e.id}>{e.name}</option>)}</select></label>}
        <button className="text-link" onClick={reset}>重置筛选</button>
      </div>
      {hasFilters && <div className="active-filters"><span>当前范围</span>{filters.from || filters.to ? <span>{filters.from || '1943'} — {filters.to || '2026'}</span> : null}{filters.company && <span>{filters.company}</span>}{!entityId && filters.entity && <span>{entityMap[filters.entity]?.name || filters.entity}</span>}{filters.q && <span>“{filters.q}”</span>}<button onClick={reset}>清除筛选<X size={12} /></button></div>}
      {filters.from && filters.to && +filters.from > +filters.to && <p role="alert" className="range-error">起始年份不能晚于结束年份，请调整时间范围。</p>}
      <h2 className="sr-only">按时间浏览事件</h2><div className="timeline-layout"><div className="timeline-list">
        {groups.map(([key, items]) => {
          const era = eras.find(e => +key.slice(0, 4) >= e.from && +key.slice(0, 4) <= e.to);
          return <section className="time-group" key={key} id={`year-${key}`} data-era={era?.short}><div className="time-label"><span className="year-number">{key.slice(0, 4)}</span>{key.includes('-') && <span className="month-label">{Number(key.slice(5))} 月</span>}<span className="time-dot" /></div><div className="year-events">{items.map(e => <div className="event-wrap" key={e.id}><div className="event-date">{displayDate(e)}</div><EventCard event={e} returnUrl={returnUrl} /></div>)}</div></section>;
        })}
        {!results.length && <div className="empty-state"><Search size={30} /><h2>这一段历史，还没有匹配的记录</h2><p>试试其他关键词，或扩大年份与对象范围。</p><button className="primary-button" onClick={reset}>清除筛选</button></div>}
        {!!results.length && <div className="timeline-end"><span />历史仍在继续<p>已收录事件更新至 2026 年 9 月 · 持续整理中</p></div>}
      </div><aside className="era-rail"><div className="rail-inner"><div className="rail-heading">时光索引</div>{availableEras.map(era => { const target = groups.find(([key]) => +key.slice(0, 4) >= era.from && +key.slice(0, 4) <= era.to)?.[0]; return <a key={era.short} href={`#year-${target}`} className={activeEra === era.short ? 'active' : ''}><span>{era.short}</span><strong>{era.label}</strong></a>; })}<div className="rail-note"><Bookmark size={16} /><p>按时间排序，间距不代表实际时间长度。</p></div>{entityId && <a className="text-link" href={entityHref(entityId)}>关于 {entityMap[entityId]?.name}</a>}</div></aside></div>
    </section>
  </>;
}
