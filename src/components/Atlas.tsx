import { sitePath } from '../lib/paths';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Cpu, Layers3, Network, Globe2, Building2, CircleDot, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, ExternalLink, SlidersHorizontal } from 'lucide-react';
import Header from './Header';
import { aiAtlasData } from '../topics/ai/adapter';
import { displayDate } from '../lib/timeline';
import { MAX_YEAR, MIN_YEAR, atlasQuery, clampWindow, clusterEvents, datePosition, defaultAtlas, eventLane, eventTitle, filterAtlas, laneInfo, readAtlas, yearTicks, type AtlasState, type Cluster, type Lane, YEAR_COUNT, aiPresentation } from '../lib/atlas';

const lanes = aiPresentation.lanes;
const icons={methods:Cpu,models:Layers3,products:Network};
const motionBehavior=():ScrollBehavior=>window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';
const overviewTicks=[MIN_YEAR,...yearTicks(MIN_YEAR+1,MAX_YEAR-1,650),MAX_YEAR];
function dateSpan(cluster:Cluster) {
  const first=cluster.events[0].date.slice(0,7),last=cluster.events.at(-1)!.date.slice(0,7);
  return first===last?first.replace('-','.'):`${first.replace('-','.')} – ${last.replace('-','.')}`;
}

export default function Atlas({ initialLane='all', data=aiAtlasData }: { initialLane?:AtlasState['lane']; data?:typeof aiAtlasData }) {
  const { events, entities, entityMap, entityHref, eventHref, sourceMap } = data;
  const names=useMemo(()=>Object.fromEntries(entities.map(e=>[e.id,e.name])),[entities]);
  const [state,setState]=useState(()=>defaultAtlas(initialLane));
  const [ready,setReady]=useState(false);
  const [rangeOpen,setRangeOpen]=useState(false);
  const [width,setWidth]=useState(760);
  const plot=useRef<HTMLDivElement>(null);
  const details=useRef<HTMLElement>(null);
  const drag=useRef<{x:number;from:number;span:number;pixels:number}|null>(null);
  const dragged=useRef(false);
  const update=(patch:Partial<AtlasState>)=>setState(s=>({...s,...patch}));
  useEffect(()=>{
    const restore=()=>{setState(readAtlas(location.search,initialLane));setReady(true);};
    restore();window.addEventListener('popstate',restore);return()=>window.removeEventListener('popstate',restore);
  },[initialLane]);
  useEffect(()=>{if(ready)history.replaceState(null,'',location.pathname+atlasQuery(state));},[state,ready]);
  useEffect(()=>{
    if(!plot.current)return;
    const observer=new ResizeObserver(([entry])=>setWidth(entry.contentRect.width));
    observer.observe(plot.current);return()=>observer.disconnect();
  },[]);
  const results=useMemo(()=>filterAtlas(events,state,names),[state]);
  const selected=results.find(e=>e.id===state.selected);
  const grouped=useMemo(()=>Object.fromEntries(lanes.map(lane=>[lane,clusterEvents(results.filter(e=>eventLane(e)===lane),state.from,state.to,width)])) as Record<Lane,Cluster[]>,[results,state.from,state.to,width]);
  useEffect(()=>{details.current?.scrollTo({top:0});},[selected?.id]);
  const activeCluster=selected?grouped[eventLane(selected)].find(c=>c.events.some(e=>e.id===selected.id)):undefined;
  const span=state.to-state.from+1;
  const ticks=useMemo(()=>yearTicks(state.from,state.to,width),[state.from,state.to,width]);
  const move=(direction:number)=>{
    const [from,to]=clampWindow(state.from+direction*Math.max(1,Math.floor(span/2)),span);update({from,to});
  };
  const zoom=(direction:number)=>{
    const newSpan=direction<0?Math.max(1,Math.ceil(span/2)):Math.min(YEAR_COUNT,span*2);
    const [from,to]=clampWindow(Math.floor((state.from+state.to-newSpan+1)/2),newSpan);update({from,to});
  };
  const choose=(id:string)=>{
    update({selected:id});
    if(window.matchMedia('(max-width: 850px)').matches)requestAnimationFrame(()=>details.current?.scrollIntoView({behavior:motionBehavior(),block:'start'}));
  };
  const closeDetails=()=>{const id=state.selected;update({selected:''});requestAnimationFrame(()=>(document.querySelector<HTMLButtonElement>(`[data-event-id="${id}"]`) || document.querySelector<HTMLButtonElement>('.event-node'))?.focus());};
  useEffect(()=>{const esc=(e:KeyboardEvent)=>{if(e.key==='Escape'){setRangeOpen(false);if(selected)closeDetails();}};window.addEventListener('keydown',esc);return()=>window.removeEventListener('keydown',esc);},[state.selected]);
  const sourceCount=new Set(results.flatMap(e=>e.sourceIds)).size;
  const showLanes=state.lane==='all'?lanes:[state.lane];
  const filteredOutside=state.q ? filterAtlas(events,{...state,from:MIN_YEAR,to:MAX_YEAR,all:true},names).length : 0;
  const overviewPosition=(year:number)=>(year-MIN_YEAR)/(MAX_YEAR+1-MIN_YEAR)*100;
  return <div className="atlas-app">
    <Header query={state.q} onQuery={q=>update({q})} active={initialLane==='all'?'timeline':'themes'}/>
    <main id="main" className="atlas-main">
      <section className="history-overview" aria-label="历史总览">
        <div className="overview-heading"><h1>{MIN_YEAR} — {MAX_YEAR}</h1><p>{aiPresentation.subtitle}</p></div>
        <div className="overview-axis" role="group" aria-label="选择历史时间窗口">
          <div className="overview-rule"/>
          <div className="overview-selection" style={{left:`${overviewPosition(state.from)}%`,width:`${span/YEAR_COUNT*100}%`}}><span className="window-label">{state.from} — {state.to}</span></div>
          <input className="overview-range" type="range" min={MIN_YEAR} max={MAX_YEAR+1} step="1" value={state.from} aria-label="时间窗口起点" aria-valuetext={`${state.from} 年`} onChange={e=>update({from:Math.min(state.to,Number(e.target.value))})}/>
          <input className="overview-range" type="range" min={MIN_YEAR} max={MAX_YEAR+1} step="1" value={state.to+1} aria-label="时间窗口终点" aria-valuetext={`${state.to} 年结束`} onChange={e=>update({to:Math.max(state.from,Number(e.target.value)-1)})}/>
          {overviewTicks.map(year=><button className="overview-tick" key={year} style={{left:`${overviewPosition(year+.5)}%`}} onClick={()=>{const[from,to]=clampWindow(year,span);update({from,to});}} aria-label={`从 ${year} 年开始浏览`}><span/>{year}</button>)}
          <button className="overview-landmark" style={{left:`${overviewPosition(datePosition(aiPresentation.landmark.date))}%`}} onClick={()=>update({from:aiPresentation.landmark.year-1,to:aiPresentation.landmark.year+1,selected:aiPresentation.landmark.event,scope:'world',q:'',lane:'all'})}><strong>{aiPresentation.landmark.year}</strong><span>{aiPresentation.landmark.title}</span><i/></button>
        </div>
      </section>
      <div className={`atlas-workspace ${selected?'with-detail':''}`}>
        <section className="atlas-board" aria-label="三轨时间线">
          <div className="atlas-toolbar">
            <div className="range-control"><button className="range-title" onClick={()=>setRangeOpen(!rangeOpen)} aria-expanded={rangeOpen} aria-controls="range-picker">{state.from===state.to?state.from:`${state.from} — ${state.to}`}</button><button className="square-button" aria-label="更早的时间" onClick={()=>move(-1)} disabled={state.from===MIN_YEAR}><ChevronLeft size={18}/></button><button className="square-button" aria-label="更晚的时间" onClick={()=>move(1)} disabled={state.to===MAX_YEAR}><ChevronRight size={18}/></button></div>
            <div className="scope-controls" aria-label="地区筛选"><button aria-pressed={state.scope==='world'} onClick={()=>update({scope:'world'})}><Globe2 size={17}/>全球</button><button aria-pressed={state.scope==='china'} onClick={()=>update({scope:'china'})}><Building2 size={17}/>中国团队</button></div>
            <span className="toolbar-divider"/>
            <div className="density-controls"><span><CircleDot size={16}/>{state.all?'全部已收录':'仅关键节点'}</span><label className="all-switch"><input type="checkbox" checked={state.all} onChange={e=>update({all:e.target.checked})}/><span className="switch-track"/><span>显示全部</span></label></div>
            <div className="zoom-controls"><button className="square-button" aria-label="缩小时间轴" onClick={()=>zoom(1)} disabled={span>=YEAR_COUNT}><ZoomOut size={17}/></button><button className="square-button" aria-label="放大时间轴" onClick={()=>zoom(-1)} disabled={span<=1}><ZoomIn size={17}/></button><button className="latest-button" onClick={()=>update({from:MAX_YEAR-1,to:MAX_YEAR,selected:aiPresentation.latestEvent,q:'',scope:'world'})}>最近</button></div>
          </div>
          <div id="range-picker" className="range-picker" hidden={!rangeOpen}>
            <label>起始年份<select value={state.from} onChange={e=>{const from=Number(e.target.value);update({from,to:Math.max(from,state.to)});}}>{Array.from({length:YEAR_COUNT},(_,i)=>MIN_YEAR+i).map(y=><option key={y}>{y}</option>)}</select></label>
            <label>结束年份<select value={state.to} onChange={e=>{const to=Number(e.target.value);update({to,from:Math.min(to,state.from)});}}>{Array.from({length:YEAR_COUNT},(_,i)=>MIN_YEAR+i).map(y=><option key={y}>{y}</option>)}</select></label>
            <label>关注主线<select aria-label="关注主线" value={state.lane} onChange={e=>update({lane:e.target.value as AtlasState['lane']})}><option value="all">三条主线</option>{lanes.map(l=><option key={l} value={l}>{laneInfo[l].title}</option>)}</select></label><button onClick={()=>setRangeOpen(false)}>完成</button>
          </div>
          {(state.q || state.scope==='china' || state.lane!=='all') && <div className="atlas-filter-status"><span>{state.q?`搜索「${state.q}」 · `:''}{state.scope==='china'?'中国团队 · ':''}{state.lane!=='all'?`${laneInfo[state.lane].title} · `:''}{results.length} 个事件</span><button onClick={()=>setState(defaultAtlas())}>清除筛选<X size={12}/></button></div>}
          <div className="lane-table">
            <div className="axis-row"><div className="axis-corner"><button className="timeline-options" onClick={()=>setRangeOpen(!rangeOpen)}><SlidersHorizontal size={14}/><span>时间范围与主题</span></button></div><div ref={plot} className="main-axis">{ticks.map(year=><div className="year-tick" key={year} style={{left:`${(year-state.from)/span*100}%`,width:`${100/span}%`}}><strong>{year}</strong>{span<=4&&width/span>150?<div className="quarter-labels"><span>1月</span><span>4月</span><span>7月</span><span>10月</span></div>:null}</div>)}</div></div>
            {showLanes.map(lane=>{
              const Icon=icons[lane],clusters=grouped[lane];
              return <section key={lane} className={`atlas-lane lane-${lane}`} aria-label={laneInfo[lane].title}>
                <div className="lane-heading"><Icon size={29} strokeWidth={1.6}/><div><h2>{laneInfo[lane].title}</h2><p>{laneInfo[lane].description}</p><span>{results.filter(e=>eventLane(e)===lane).length} 个事件</span></div></div>
                <div className="lane-plot" onPointerDown={e=>{if(e.target instanceof Element&&e.target.closest('button'))return;drag.current={x:e.clientX,from:state.from,span,pixels:width};dragged.current=false;e.currentTarget.setPointerCapture(e.pointerId);}} onPointerMove={e=>{if(!drag.current)return;const delta=e.clientX-drag.current.x;if(Math.abs(delta)>10)dragged.current=true;}} onPointerUp={e=>{if(!drag.current)return;const delta=Math.round((drag.current.x-e.clientX)/drag.current.pixels*drag.current.span);if(dragged.current){const[from,to]=clampWindow(drag.current.from+delta,span);update({from,to});}drag.current=null;}} onPointerCancel={()=>{drag.current=null;}}>
                  {ticks.map(y=><div key={y} className="grid-line" style={{left:`${(y-state.from)/span*100}%`}}/>)}
                  <div className="lane-baseline"/>
                  {clusters.map(c=>{
                    const preferred=aiPresentation.preferredEvents;
                    const e=c.events.find(item=>item.id===state.selected)||c.events.find(item=>preferred.includes(item.id))||c.events[0];
                    const x=c.position*width,labelWidth=Math.min(116,width),left=Math.max(0,Math.min(width-labelWidth,x-labelWidth/2));
                    return <button key={c.id} data-event-id={e.id} className={`event-node ${c.events.some(e=>e.id===state.selected)?'selected':''}`} style={{left:`${left}px`,width:`${labelWidth}px`}} onClick={()=>choose(e.id)} aria-pressed={c.events.some(e=>e.id===state.selected)} aria-label={`${dateSpan(c)} ${eventTitle(e)}${c.events.length>1?`，共 ${c.events.length} 个事件`:''}`} title={c.events.map(e=>`${e.date} ${e.title}`).join('\n')}>
                      <span className="node-dot" style={{left:`${x-left}px`}}/><time className="node-date">{dateSpan(c)}</time><strong>{eventTitle(e)}</strong><span className="node-company">{e.company||'研究进展'}</span>{c.events.length>1&&<span className="cluster-count">+{c.events.length-1} 个事件</span>}
                    </button>;
                  })}
                  {!clusters.length&&<p className="lane-empty">此范围暂无{state.all?'已收录事件':'关键节点'}</p>}
                </div>
              </section>;
            })}
          </div>
          {!results.length && <div className="atlas-empty"><strong>没有匹配的事件</strong><p>{filteredOutside?`其他年份中还有 ${filteredOutside} 条匹配记录。`:'试试其他关键词、地区或时间范围。'}</p><button onClick={()=>update({from:MIN_YEAR,to:MAX_YEAR,all:true,scope:'world'})}>搜索完整历史</button></div>}
          <div className="board-footnote"><span aria-live="polite">{results.length} 个事件 · {sourceCount} 份来源</span><span>相近节点合并显示，点击查看组内事件</span></div>
        </section>
        {selected&&<aside className={`atlas-detail lane-${eventLane(selected)}`} ref={details} aria-label="事件详情">
          <button className="detail-close" onClick={closeDetails} aria-label="关闭事件详情"><X size={21}/></button>
          <span className="detail-lane-label">{laneInfo[eventLane(selected)].title}</span><h2>{eventTitle(selected)}</h2><div className="detail-date">{displayDate(selected)}<span>·</span>{selected.company||'研究进展'}</div>
          <button className="cluster-jump" hidden={!activeCluster || activeCluster.events.length<2} onClick={()=>details.current?.querySelector('.cluster-picker')?.scrollIntoView({behavior:motionBehavior(),block:'nearest'})}>查看这段时间的 {activeCluster?.events.length} 个事件</button>
          <div className="detail-tags">{[...new Set([...selected.tags,...(selected.kind==='模型发布'?[]:[selected.kind])])].map(t=><span key={t}>{t}</span>)}</div>
          <p className="drawer-summary">{selected.summary}</p>

          <section><h3>为什么重要</h3><p>{selected.significance}</p></section>
          {selected.change&&<details className="drawer-change"><summary>相比上一版本</summary><span className="drawer-baseline">{selected.change.baseline}</span><ul>{selected.change.improvements.map(x=><li key={x}>{x}</li>)}</ul><p className="drawer-caveat">{selected.change.evidence} · {selected.change.tradeoffs}</p></details>}
          <section className="drawer-sources"><h3>来源</h3>{selected.sourceIds.map(id=><a key={id} href={sourceMap[id].url} target="_blank" rel="noopener noreferrer"><ExternalLink size={16}/><span>{sourceMap[id].title}<small>{sourceMap[id].publisher} · {sourceMap[id].type}</small></span></a>)}</section>
          {activeCluster && activeCluster.events.length>1 && <section className="cluster-picker"><h3>这段时间的 {activeCluster.events.length} 个事件</h3>{activeCluster.events.map(e=><button key={e.id} aria-pressed={e.id===selected.id} onClick={()=>update({selected:e.id})}><span>{eventTitle(e)}</span><time>{e.date}</time></button>)}</section>}
          {!!selected.entityIds.length&&<section className="drawer-related"><h3>相关主题</h3>{selected.entityIds.map(id=><a key={id} href={entityHref(id)}>{entityMap[id].name}<span>{entityMap[id].type==='family'?'模型家族':entityMap[id].type==='product'?'产品发展史':'技术方法'}</span></a>)}</section>}
          <a className="full-record" href={eventHref(selected)} onClick={()=>{try{sessionStorage.setItem('timeline-return',location.pathname+atlasQuery(state));}catch{}}}>阅读完整事件<ExternalLink size={14}/></a>
        </aside>}
      </div>
    </main>
    <footer className="atlas-footer"><span><strong>timeline</strong><i/>理解过去 · 看见可能的未来</span><a href={sitePath('/about/')}>资料截止 2026-09-29 · 全球精选，持续整理</a></footer>
  </div>;
}
