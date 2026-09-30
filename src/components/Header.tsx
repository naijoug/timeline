import { sitePath } from '../lib/paths';
import { Search, Globe2, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Header({ query, onQuery, active='timeline' }: { query?: string; onQuery?: (query:string)=>void; active?:'timeline'|'themes'|'about' }) {
  const input=useRef<HTMLInputElement>(null);
  useEffect(()=>{
    const shortcut=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();input.current?.focus();}};
    window.addEventListener('keydown',shortcut);return()=>window.removeEventListener('keydown',shortcut);
  },[]);
  return <header className="atlas-header">
    <a className="atlas-brand" href={sitePath('/ai/')}>timeline</a><span className="brand-divider"/><a className="atlas-name" href={sitePath('/ai/')}>全球 AI 时间线</a>
    <form className="atlas-search" action={sitePath('/ai/')} role="search" onSubmit={onQuery ? e=>e.preventDefault():undefined}>
      <Search size={17}/><input ref={input} name="q" aria-label="搜索事件、模型、公司或关键词" placeholder="搜索事件、模型、公司或关键词…" value={query} onChange={onQuery ? e=>onQuery(e.target.value):undefined}/>
      {!onQuery && <><input type="hidden" name="from" value="1943"/><input type="hidden" name="to" value="2026"/><input type="hidden" name="all" value="1"/></>}
      {query ? <button type="button" aria-label="清除搜索" onClick={()=>onQuery?.('')}><X size={15}/></button>:onQuery ? <kbd>⌘ K</kbd>:null}
    </form>
    <nav className="atlas-nav" aria-label="主要导航"><a href={sitePath('/ai/?from=1943&to=2026&event=')} >探索</a><a href={sitePath('/ai/')} aria-current={active==='timeline'?'page':undefined}>时间线</a><a href={sitePath('/ai/methods/')} aria-current={active==='themes'?'page':undefined}>主题</a><a href={sitePath('/about/')} aria-current={active==='about'?'page':undefined}>关于</a></nav>
    <span className="atlas-language"><Globe2 size={17}/>简体中文</span>
  </header>;
}
