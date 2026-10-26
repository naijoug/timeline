import { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { ExplorerCatalog } from '../../core/types';
import type { ExplorerPresentation, ExplorerState } from '../../core/explorer';
import { readingExplorerEvents } from '../../core/mobile-navigation';
import { catalogBounds } from '../../core/catalog';
import { civilYear, formatYear } from '../../core/time';
import { applyFilterYears, clearExplorerFilters, selectFilterPeriod, validateFilterYearRange } from '../../core/filter-controls';
import YearRange from './YearRange';

/** A draft transaction: dismissal never edits the live timeline or its URL. */
export default function FilterSheet({ catalog, state, presentation, onApply, onCancel }: {
  catalog: ExplorerCatalog; state: ExplorerState; presentation: ExplorerPresentation;
  onApply: (state: ExplorerState) => void; onCancel: () => void;
}) {
  const [draft, setDraft] = useState(state);
  const [fromText, setFromText] = useState(String(civilYear(state.from)));
  const [toText, setToText] = useState(String(civilYear(state.to)));
  const dialog = useRef<HTMLDialogElement>(null);
  const [min, max] = useMemo(() => catalogBounds(catalog), [catalog]);
  const validation = validateFilterYearRange(fromText, toText, min, max);
  const count = useMemo(() => readingExplorerEvents(catalog, draft, presentation).length, [catalog, draft, presentation]);
  const change = (patch: Partial<ExplorerState>) => setDraft(value => ({ ...value, ...patch, selected: '' }));
  const replace = (next: ExplorerState) => { setDraft(next); setFromText(String(civilYear(next.from))); setToText(String(civilYear(next.to))); };
  const changeYears = (from: number, to: number) => replace({ ...draft, from, to, period: '', selected: '' });
  const editYear = (side: 'from' | 'to', text: string) => {
    if (side === 'from') setFromText(text); else setToText(text);
    const next = validateFilterYearRange(side === 'from' ? text : fromText, side === 'to' ? text : toText, min, max);
    if (next.ok) change({ from: next.from, to: next.to, period: '' });
  };
  useEffect(() => {
    const element = dialog.current!;
    const body = document.body, top = window.scrollY;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow };
    // Native dialog supplies top-layer, focus trapping and inert background.
    element.showModal();
    body.style.position = 'fixed'; body.style.top = `-${top}px`; body.style.width = '100%'; body.style.overflow = 'hidden';
    const viewport = window.visualViewport;
    const resize = () => {
      element.style.setProperty('--filter-viewport', `${viewport?.height || window.innerHeight}px`);
      element.style.setProperty('--filter-keyboard-offset', `${Math.max(0, window.innerHeight - (viewport?.height || window.innerHeight) - (viewport?.offsetTop || 0))}px`);
    };
    resize(); viewport?.addEventListener('resize', resize); viewport?.addEventListener('scroll', resize);
    return () => {
      viewport?.removeEventListener('resize', resize); viewport?.removeEventListener('scroll', resize);
      if (element.open) element.close();
      Object.assign(body.style, previous);
      window.scrollTo({ top, behavior: 'instant' });
    };
  }, []);
  return <dialog ref={dialog} id="chronicle-filters" className="filter-sheet" aria-labelledby="filter-sheet-title" onKeyDown={event => {
    if (event.key !== 'Tab') return;
    const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), a[href]')];
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }} onCancel={event => { event.preventDefault(); onCancel(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onCancel();
  }}>
    <form className="filter-sheet-form" onSubmit={event => { event.preventDefault(); if (validation.ok) onApply({ ...draft, from: validation.from, to: validation.to }); }}>
      <header className="filter-sheet-heading"><div className="filter-sheet-handle" aria-hidden="true" /><div><h2 id="filter-sheet-title">筛选时间线</h2><button type="button" aria-label="关闭筛选，不保存更改" autoFocus onClick={onCancel}><X size={20}/></button></div></header>
      <div className="filter-sheet-body">
        <section className="filter-sheet-section" aria-labelledby="filter-time-title"><div className="filter-section-heading"><h3 id="filter-time-title">时间范围</h3><span>{formatYear(civilYear(draft.from))} — {formatYear(civilYear(draft.to))}</span></div>
          <YearRange min={min} max={max} from={draft.from} to={draft.to} onChange={changeYears}/>
          <div className="filter-sheet-presets"><button type="button" aria-pressed={draft.from === min && draft.to === max && !draft.period} onClick={() => replace(applyFilterYears(catalog, draft))}>全部时间</button>{catalog.topic.id !== 'china-history' && <><button type="button" aria-pressed={draft.from === max && draft.to === max && !draft.period} onClick={() => replace(applyFilterYears(catalog, draft, 1))}>{formatYear(civilYear(max))}</button><button type="button" aria-pressed={draft.from === Math.max(min, max - 4) && draft.to === max && !draft.period} onClick={() => replace(applyFilterYears(catalog, draft, 5))}>最近 5 年</button></>}</div>
          <div className="filter-sheet-years"><label>起始年份<input name="from" type="number" step="1" value={fromText} onChange={event => editYear('from', event.target.value)} aria-invalid={!validation.ok} aria-describedby="filter-year-hint"/></label><span aria-hidden="true">—</span><label>结束年份<input name="to" type="number" step="1" value={toText} onChange={event => editYear('to', event.target.value)} aria-invalid={!validation.ok} aria-describedby="filter-year-hint"/></label></div>
          <p id="filter-year-hint" className={!validation.ok ? 'filter-sheet-error' : 'filter-sheet-hint'} role={!validation.ok ? 'alert' : undefined}>{!validation.ok ? validation.error : min <= 0 ? '拖动两端，或输入年份。公元前用负数，没有公元 0 年。' : '拖动两端快速选择，也可以输入精确年份。'}</p>
        </section>
        <section className="filter-sheet-fields" aria-label="筛选条件">
          <label>类别<select value={draft.category} onChange={event => change({ category: event.target.value })}><option value="">全部类别</option>{catalog.topic.categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}</select></label>
          {!!catalog.periods.length && <label>{catalog.topic.periodLabel || '时期'}<select aria-label="选择朝代或时期" value={draft.period} onChange={event => replace(selectFilterPeriod(catalog, draft, event.target.value))}><option value="">全部时期</option>{catalog.periods.map(period => <option key={period.id} value={period.id}>{period.parentId ? '　' : ''}{period.title}</option>)}</select></label>}
          {!!presentation.scopes?.length && <label>{presentation.scopeLabel || '地区'}<select value={draft.scope} onChange={event => change({ scope: event.target.value })}><option value="">{presentation.scopeAllLabel || '全球'}</option>{presentation.scopes.map(scope => <option key={scope.id} value={scope.id}>{scope.title}</option>)}</select></label>}
          <label>排列顺序<select value={draft.order || 'asc'} onChange={event => change({ order: event.target.value as 'asc' | 'desc' })}><option value="desc">最新在前</option><option value="asc">从早到晚</option></select></label>
        </section>
        <label className="filter-sheet-key"><span>仅关键节点<small>集中浏览影响较大的转折</small></span><input type="checkbox" role="switch" checked={!draft.all} onChange={event => change({ all: !event.target.checked })}/></label>
        {draft.q && <div className="filter-sheet-search"><span>同时搜索“{draft.q}”</span><button type="button" onClick={() => change({ q: '' })}>清除搜索</button></div>}
      </div>
      <footer className="filter-sheet-footer"><button type="button" className="filter-sheet-reset" onClick={() => replace(clearExplorerFilters(catalog, draft))}>重置</button><button type="submit" className="filter-sheet-apply" disabled={!validation.ok}>查看 {validation.ok ? count : '—'} 个结果</button><span className="sr-only" aria-live="polite">{validation.ok ? `匹配 ${count} 个事件，点击查看结果后生效` : validation.error}</span></footer>
    </form>
  </dialog>;
}
