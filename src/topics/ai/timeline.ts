import { sitePath } from '../../lib/paths';
import type { TimelineEvent, Track } from './types';
export const trackLabels: Record<Track, string> = { history: 'AI 全史', methods: '技术与方法', products: 'Agent 产品', models: '模型演进' };
export const trackPaths: Record<Track, string> = { history: sitePath('/ai/'), methods: sitePath('/ai/methods/'), products: sitePath('/ai/agents/'), models: sitePath('/ai/models/') };
export const eras = [
  { from: 1943, to: 1956, label: '思想的起点', short: '1943—1956' },
  { from: 1957, to: 1979, label: '探索与早期系统', short: '1957—1979' },
  { from: 1980, to: 1999, label: '学习与转折', short: '1980—1999' },
  { from: 2000, to: 2011, label: '数据与计算', short: '2000—2011' },
  { from: 2012, to: 2021, label: '深度学习时代', short: '2012—2021' },
  { from: 2022, to: 2026, label: '生成与行动', short: '2022—2026' },
];
export interface Filters { q: string; from: string; to: string; company: string; entity: string; level: 'milestones' | 'all'; order: 'asc' | 'desc' }
export const defaultFilters = (track: Track): Filters => ({ q: '', from: '', to: '', company: '', entity: '', level: track === 'history' ? 'milestones' : 'all', order: 'asc' });
export function readFilters(search: string, track: Track): Filters {
  const p = new URLSearchParams(search), d = defaultFilters(track);
  return { q: p.get('q') || '', from: /^\d{4}$/.test(p.get('from') || '') ? p.get('from')! : '', to: /^\d{4}$/.test(p.get('to') || '') ? p.get('to')! : '', company: p.get('company') || '', entity: p.get('entity') || '', level: p.get('level') === 'all' ? 'all' : p.get('level') === 'milestones' ? 'milestones' : d.level, order: p.get('order') === 'desc' ? 'desc' : 'asc' };
}
export function filterQuery(f: Filters, track: Track): string {
  const p = new URLSearchParams(), d = defaultFilters(track);
  Object.entries(f).forEach(([k, v]) => { if (v !== '' && v !== d[k as keyof Filters]) p.set(k, v); });
  return p.size ? `?${p.toString()}` : '';
}
export function selectEvents(events: TimelineEvent[], track: Track, f: Filters, names: Record<string, string> = {}) {
  const query = f.q.trim().normalize('NFKC').toLocaleLowerCase();
  return events.filter(e => (track === 'history' || e.tracks.includes(track)) && (f.level === 'all' || e.milestone)
    && (!f.from || Number(e.date.slice(0, 4)) >= Number(f.from)) && (!f.to || Number(e.date.slice(0, 4)) <= Number(f.to))
    && (!f.company || e.company === f.company) && (!f.entity || e.entityIds.includes(f.entity))
    && (!query || [e.title, e.subtitle, e.summary, e.company, ...e.tags, ...e.entityIds.map(id => names[id] || id)].join(' ').normalize('NFKC').toLocaleLowerCase().includes(query)))
    .sort((a, b) => (a.date.localeCompare(b.date) || a.id.localeCompare(b.id)) * (f.order === 'asc' ? 1 : -1));
}
export function displayDate(e: Pick<TimelineEvent, 'date' | 'dateLabel'>) {
  if (e.dateLabel) return e.dateLabel;
  const [y, m, d] = e.date.split('-');
  return `${y} 年${m ? ` ${Number(m)} 月` : ''}${d ? ` ${Number(d)} 日` : ''}`;
}
