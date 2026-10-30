import type { CSSProperties } from 'react';
import { civilYear, formatYear } from '../../core/time';

/** Native range controls retain touch, keyboard and assistive-technology support. */
export default function YearRange({ min, max, from, to, onChange }: { min: number; max: number; from: number; to: number; onChange: (from: number, to: number) => void }) {
  const span = Math.max(1, max - min);
  const style = { '--range-start': `${(from - min) / span * 100}%`, '--range-end': `${(to - min) / span * 100}%` } as CSSProperties;
  return <div className={`filter-year-range${from === to ? ' is-collapsed' : ''}`} style={style}>
    <div className="filter-year-rail" aria-hidden="true"><span /></div>
    <input className="filter-year-start" type="range" min={min} max={max} step="1" value={from} aria-label="拖动起始年份" aria-valuetext={formatYear(civilYear(from))} onChange={event => onChange(Math.min(Number(event.target.value), to), to)}/>
    <input className="filter-year-end" type="range" min={min} max={max} step="1" value={to} aria-label="拖动结束年份" aria-valuetext={formatYear(civilYear(to))} onChange={event => onChange(from, Math.max(Number(event.target.value), from))}/>
    <div className="filter-year-limits" aria-hidden="true"><span>{formatYear(civilYear(min))}</span><span>{formatYear(civilYear(max))}</span></div>
  </div>;
}
