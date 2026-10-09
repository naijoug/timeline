import { sitePath } from '../lib/paths';
import { topics } from '../core/topics';
import { Search, Globe2, X, BookOpen, ChartNoAxesColumn, Grid2X2, Info, ArrowRight, PanelLeftClose, PanelLeftOpen, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import '../styles/navigation.css';
import AppearanceControl from './AppearanceControl';

export default function Header({ query, onQuery, active = 'timeline', topicTitle = '全球 AI 时间线', topicPath = '/ai/' }: {
  topicTitle?: string; topicPath?: string; query?: string;
  onQuery?: (query: string) => void; active?: 'timeline' | 'themes' | 'about';
}) {
  const input = useRef<HTMLInputElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLButtonElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [topicQuery, setTopicQuery] = useState('');
  const currentTopic = topics.find(t => t.path === topicPath);
  const visibleTopics = topics.filter(t => t.title.toLocaleLowerCase().includes(topicQuery.trim().toLocaleLowerCase()));
  useEffect(() => {
    try { setCollapsed(localStorage.getItem('timeline-sidebar-collapsed') === 'true'); } catch { /* Storage is optional. */ }
    const shortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); input.current?.focus(); }
    };
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, []);
  useEffect(() => { document.documentElement.dataset.sidebar = collapsed ? 'collapsed' : 'expanded'; }, [collapsed]);
  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    if (next) setTopicQuery('');
    try { localStorage.setItem('timeline-sidebar-collapsed', String(next)); } catch { /* Still works without storage. */ }
  };
  const closeMobile = () => { setMobileOpen(false); requestAnimationFrame(() => menu.current?.focus()); };
  useEffect(() => {
    if (!mobileOpen) return;
    sidebar.current?.querySelector<HTMLButtonElement>('.mobile-nav-close')?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const background = [...document.querySelectorAll<HTMLElement>('main, .library-header, footer, .skip-link')];
    const previousInert = background.map(el => el.inert);
    background.forEach(el => { el.inert = true; });
    const keyboard = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); closeMobile(); }
      if (e.key !== 'Tab') return;
      const elements = [...(sidebar.current?.querySelectorAll<HTMLElement>('a[href], button, input, select') || [])].filter(el => el.getClientRects().length > 0);
      const first = elements[0], last = elements.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    const media = window.matchMedia('(max-width: 760px)');
    const resize = () => { if (!media.matches) setMobileOpen(false); };
    media.addEventListener('change', resize);
    window.addEventListener('keydown', keyboard);
    return () => { background.forEach((el, i) => { el.inert = previousInert[i]; }); document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', keyboard); media.removeEventListener('change', resize); };
  }, [mobileOpen]);
  return <div className="navigation-root">
    {mobileOpen && <div className="nav-scrim" onClick={closeMobile} aria-hidden="true" />}
    <aside id="topic-sidebar" ref={sidebar} className={`topic-sidebar ${mobileOpen ? 'mobile-open' : ''}`} aria-label="主题导航" role={mobileOpen ? 'dialog' : undefined} aria-modal={mobileOpen || undefined}>
      <div className="sidebar-brand-row">
        <a className="sidebar-wordmark" href={sitePath('/')} aria-label="timeline 首页"><span className="sidebar-long-brand">timeline</span><span className="sidebar-short-brand">t.</span></a>
        <button className="sidebar-toggle" onClick={toggle} aria-label={collapsed ? '展开侧栏' : '收拢侧栏'} aria-expanded={!collapsed} aria-controls="topic-navigation" title={collapsed ? '展开侧栏' : '收拢侧栏'}>{collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}</button>
        <button className="mobile-nav-close" aria-label="关闭主题导航" onClick={closeMobile}><X size={22} /></button>
      </div>
      <div className="sidebar-search-section">
        <span className="sidebar-caption">主题库</span>
        <label className="sidebar-topic-search"><Search size={16} /><input aria-label="查找主题" placeholder="查找主题…" value={topicQuery} onChange={e => setTopicQuery(e.target.value)} />{topicQuery && <button aria-label="清除主题搜索" onClick={() => setTopicQuery('')}><X size={14} /></button>}</label>
      </div>
      <nav id="topic-navigation" className="topic-navigation" aria-label="所有主题">
        <a href={sitePath('/')} aria-current={topicPath === '/' && active !== 'about' ? 'page' : undefined} title="所有主题"><Grid2X2 size={19} /><span>所有主题</span></a>
        {visibleTopics.map(topic => <a key={topic.id} href={sitePath(topic.path)} title={topic.title} aria-current={topicPath === topic.path && active !== 'about' ? 'page' : undefined}>{topic.icon === 'book' ? <BookOpen size={20} /> : <ChartNoAxesColumn size={20} />}<span>{topic.title}</span></a>)}
        {!visibleTopics.length && <p className="topic-no-results">没有匹配的主题</p>}
      </nav>
      <div className="sidebar-discovery"><p>更多主题持续收录</p><a href={sitePath('/')}>浏览主题<ArrowRight size={15} /></a></div>
      <div className="sidebar-utilities"><AppearanceControl /><a href={sitePath('/about/')} aria-current={active === 'about' ? 'page' : undefined} title="关于 timeline"><Info size={18} /><span>关于 timeline</span></a><div title="简体中文"><Globe2 size={18} /><span>简体中文</span></div></div>
    </aside>
    <header className="atlas-header library-header">
      <button ref={menu} className="mobile-nav-open" onClick={() => setMobileOpen(true)} aria-label="打开主题导航" aria-expanded={mobileOpen} aria-controls="topic-sidebar"><Menu size={23} /></button>
      <div className="header-topic"><a href={sitePath(topicPath)}>{active === 'about' ? '关于 timeline' : currentTopic?.title || topicTitle}</a>{currentTopic && active !== 'about' && <span>{currentTopic.subtitle}</span>}</div>
      {topicPath !== '/' && <form className="atlas-search" action={sitePath(topicPath)} role="search" onSubmit={onQuery ? e => e.preventDefault() : undefined}>
        <Search size={17} /><input ref={input} name="q" aria-label="搜索事件、对象或关键词" placeholder="搜索当前主题…" value={query} onChange={onQuery ? e => onQuery(e.target.value) : undefined} />
        {!onQuery && topicPath === '/ai/' && <><input type="hidden" name="from" value="1943" /><input type="hidden" name="to" value="2026" /><input type="hidden" name="all" value="1" /></>}
        {query && onQuery ? <button type="button" aria-label="清除搜索" onClick={() => onQuery('')}><X size={15} /></button> : <kbd>⌘ K</kbd>}
      </form>}
    </header>
  </div>;
}
