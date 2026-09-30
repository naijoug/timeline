import type { TimelineEvent } from '../data/types';

export type Lane = 'methods' | 'models' | 'products';
export interface AtlasState { from: number; to: number; scope: 'world' | 'china'; all: boolean; q: string; selected: string; lane: Lane | 'all' }
export const MIN_YEAR = 1943;
export const MAX_YEAR = 2026;
export const laneInfo: Record<Lane, { title: string; description: string }> = {
  methods: { title: 'AI 技术突破', description: '新的方法、架构与能力\n推动 AI 边界' },
  models: { title: '模型演进', description: '基础模型持续进化\n从语言走向推理与多模态' },
  products: { title: 'Agent 应用', description: '从对话到行动\n走向真实世界的任务执行' },
};
export const chinaCompanies = new Set(['阿里巴巴','DeepSeek','月之暗面','智谱','MiniMax','百度','腾讯','字节跳动','华为','阶跃星辰','商汤']);
const agents = new Set(['claude-code','codex','grok-bot','muse','manus','manus-studio','cue','jules','minimax-agent','kimi-agent','ui-tars','copilot','replit-agent','devin','cursor']);
const technicalOverrides = new Set(['skills-introduction','manus-cascade']);
export function eventLane(e: TimelineEvent): Lane {
  if (e.tracks.includes('models')) return 'models';
  if (!technicalOverrides.has(e.id) && e.tracks.includes('products') && e.entityIds.some(id => agents.has(id))) return 'products';
  return 'methods';
}
const additionalKeys = new Set(['dpo','rag-paper','chain-of-thought','mcp-standard','long-running-harness','context-engineering','sonnet-4','sonnet-3-7']);
export function isKeyEvent(e: TimelineEvent) { return e.milestone || additionalKeys.has(e.id); }
export function defaultAtlas(lane: AtlasState['lane'] = 'all'): AtlasState { return { from: 2023, to: 2025, scope: 'world', all: false, q: '', selected: lane === 'all' || lane === 'models' ? 'llama-2' : '', lane }; }
export function clampWindow(from: number, span: number): [number, number] {
  span = Math.max(1, Math.min(MAX_YEAR - MIN_YEAR + 1, Math.round(span)));
  from = Math.max(MIN_YEAR, Math.min(MAX_YEAR - span + 1, Math.round(from)));
  return [from, from + span - 1];
}
export function readAtlas(search: string, lane: AtlasState['lane'] = 'all'): AtlasState {
  const p = new URLSearchParams(search), d = defaultAtlas(lane);
  const year = (key: string, fallback: number) => /^\d{4}$/.test(p.get(key) || '') ? Math.max(MIN_YEAR, Math.min(MAX_YEAR, Number(p.get(key)))) : fallback;
  let from = year('from', d.from), to = year('to', d.to);
  if (from > to) [from, to] = [to, from];
  const requestedLane=p.get('lane');
  return { from, to, scope: p.get('scope') === 'china' ? 'china' : 'world', all: p.get('all') === '1' || p.get('level') === 'all', q: p.get('q') || '', selected: p.has('event') ? p.get('event') || '' : d.selected, lane: requestedLane && ['all','methods','models','products'].includes(requestedLane) ? requestedLane as AtlasState['lane'] : lane };
}
export function atlasQuery(s: AtlasState): string {
  const p = new URLSearchParams({ from:String(s.from), to:String(s.to) });
  if (s.scope === 'china') p.set('scope','china');
  if (s.all) p.set('all','1');
  if (s.q) p.set('q',s.q);
  p.set('lane',s.lane);
  p.set('event',s.selected);
  return `?${p.toString()}`;
}
export function filterAtlas(events: TimelineEvent[], s: AtlasState, names: Record<string,string> = {}): TimelineEvent[] {
  const q=s.q.trim().normalize('NFKC').toLocaleLowerCase();
  return events.filter(e => Number(e.date.slice(0,4)) >= s.from && Number(e.date.slice(0,4)) <= s.to
    && (s.scope !== 'china' || chinaCompanies.has(e.company || ''))
    && (s.all || isKeyEvent(e)) && (s.lane === 'all' || eventLane(e) === s.lane)
    && (!q || [e.title,e.summary,e.company,...e.tags,...e.entityIds.map(id=>names[id] || id)].join(' ').normalize('NFKC').toLocaleLowerCase().includes(q)))
    .sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
}
// A partial date is represented at the midpoint of its known interval, never
// presented to the reader as an invented January 1st or first day of a month.
export function datePosition(date: string): number {
  const [y,m,d] = date.split('-').map(Number);
  if (!m) return y + .5;
  if (!d) return y + (m - .5) / 12;
  const days = new Date(Date.UTC(y,m,0)).getUTCDate();
  return y + (m - 1 + (d - .5)/days)/12;
}
export interface Cluster { id: string; events: TimelineEvent[]; position: number }
export function clusterEvents(events: TimelineEvent[], from: number, to: number, width: number): Cluster[] {
  const columns=Math.max(1,Math.floor(width/132)), buckets=new Map<number,TimelineEvent[]>();
  for(const e of events) {
    const fraction=(datePosition(e.date)-from)/(to-from+1);
    const key=Math.max(0,Math.min(columns-1,Math.floor(fraction*columns)));
    buckets.set(key,[...(buckets.get(key)||[]),e]);
  }
  const result = [...buckets.entries()].sort(([a],[b])=>a-b).map(([key,items])=>({id:`bucket-${key}`,events:items,position:items.reduce((sum,e)=>sum+(datePosition(e.date)-from)/(to-from+1),0)/items.length}));
  const labelWidth=Math.min(116,width);
  const labelLeft=(c:Cluster)=>Math.max(0,Math.min(width-labelWidth,c.position*width-labelWidth/2));
  // Bucket edges alone cannot prevent neighbouring labels from colliding.
  // Merge overlapping labels until every visible target has its own space.
  for(let i=1;i<result.length;) {
    const previous=result[i-1],current=result[i];
    if(labelLeft(current)<labelLeft(previous)+labelWidth+8) {
      const count=previous.events.length+current.events.length;
      previous.position=(previous.position*previous.events.length+current.position*current.events.length)/count;
      previous.events.push(...current.events);result.splice(i,1);i=Math.max(1,i-1);
    } else i++;
  }
  return result;
}
export const shortTitles: Record<string,string> = {
  'formal-neuron':'形式神经元','turing-test':'图灵测试','dartmouth-workshop':'达特茅斯研究项目',
  'backprop':'反向传播','alexnet':'AlexNet','transformer':'Transformer','gan':'GAN','bert':'BERT','ddpm':'扩散模型',
  'alphago':'AlphaGo','gpt3-paper':'GPT-3 少样本学习','react':'ReAct','chatgpt':'ChatGPT',
  'dpo':'DPO','chain-of-thought':'思维链提示','rag-paper':'RAG','mcp-standard':'MCP',
  'context-engineering':'上下文工程','long-running-harness':'长任务 Harness','skills-introduction':'Agent Skills',
  'deepseek-r1':'DeepSeek-R1','sonnet-3-7':'Claude 3.7 Sonnet','sonnet-4':'Claude Sonnet 4',
  'claude-code-preview':'Claude Code','codex-cli':'Codex CLI','grok-bot-release':'Grok Bot','muse-design':'Muse',
  'jules-beta':'Jules','minimax-agent-launch':'MiniMax Agent','kimi-ok-computer':'Kimi OK Computer',
  'copilot-coding-agent':'Copilot Agent','devin-introduction':'Devin','cursor-agent-introduction':'Cursor Agent',
  'manus-2':'Manus 2.0','manus-studio':'Manus Studio','cue-release':'Cue',
};
export const eventTitle=(e:TimelineEvent)=>shortTitles[e.id] || e.title;

export function yearTicks(from:number,to:number,width:number):number[] {
  const span=to-from+1,capacity=Math.max(1,Math.floor(width/64));
  const needed=Math.ceil(span/capacity);
  const step=[1,2,5,10,20,50,100].find(s=>s>=needed)!;
  const first=step===1?from:Math.ceil(from/step)*step;
  const ticks=[];
  for(let year=first;year<=to;year+=step)ticks.push(year);
  return ticks.length?ticks:[from];
}
