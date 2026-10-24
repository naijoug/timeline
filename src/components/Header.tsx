import { sitePath } from '../lib/paths';
import { topics } from '../core/topics';
import { canUseParentHistoryBack, canUseTimelineHistoryBack, safeTimelineReturn, timelineReadingReturn } from '../core/mobile-navigation';
import { Search, Globe2, X, BookOpen, ChartNoAxesColumn, Grid2X2, Info, ArrowLeft, ArrowRight, PanelLeftClose, PanelLeftOpen, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import '../styles/navigation.css';
import AppearanceControl from './AppearanceControl';

export default function Header({ query, onQuery, active = 'timeline', topicTitle = '全球 AI 时间线', topicPath = '/ai/', screen = 'timeline' }: {
  topicTitle?: string; topicPath?: string; query?: string;
  screen?: 'home' | 'timeline' | 'record';
  onQuery?: (query: string) => void; active?: 'timeline' | 'themes' | 'about';
}) {
  const input = useRef<HTMLInputElement>(null);
  const header = useRef<HTMLElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLButtonElement>(null);
  const desktopMenu = useRef<HTMLButtonElement>(null);
  const searchToggle = useRef<HTMLButtonElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [topicQuery, setTopicQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [backHref, setBackHref] = useState(screen === 'record' && active !== 'about' ? sitePath(topicPath) : sitePath('/'));
  const currentTopic = topics.find(t => t.path === topicPath);
  const mobileTitle = active === 'about' ? '关于 timeline' : screen === 'home' ? '探索时间线' : screen === 'record' ? '事件详情' : currentTopic?.title || topicTitle;
  const visibleTopics = topics.filter(t => t.title.toLocaleLowerCase().includes(topicQuery.trim().toLocaleLowerCase()));
  const resolveBackHref = () => {
    if (screen !== 'record' || active === 'about') return sitePath('/');
    const prefix = sitePath(topicPath);
    let value = new URLSearchParams(location.search).get('return');
    if (!value && safeTimelineReturn(document.referrer, location.origin, prefix)) { try { value = sessionStorage.getItem('timeline-return'); } catch { /* The topic link still works. */ } }
    const destination = safeTimelineReturn(value, location.origin, prefix);
    return destination ? timelineReadingReturn(destination) : prefix;
  };
  useEffect(() => { setBackHref(resolveBackHref()); }, [screen, topicPath, active]);
  const openSearch = () => {
    setSearchOpen(true);
    requestAnimationFrame(() => input.current?.focus({ preventScroll: true }));
  };
  const closeSearch = () => {
    setSearchOpen(false);
    requestAnimationFrame(() => searchToggle.current?.focus({ preventScroll: true }));
  };
  useEffect(() => {
    try { setCollapsed(localStorage.getItem('timeline-sidebar-collapsed') === 'true'); } catch { /* Storage is optional. */ }
    const shortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && input.current && !header.current?.inert) { e.preventDefault(); openSearch(); }
    };
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, []);
  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const root = document.documentElement;
    const previousHeight = root.style.getPropertyValue('--navigation-header-height');
    // Search expands on phones, so anchor clearance follows the actual header,
    // including safe areas, font loading, zoom, and orientation changes.
    const measure = () => root.style.setProperty('--navigation-header-height', `${Math.ceil(element.getBoundingClientRect().height)}px`);
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure);
    observer?.observe(element);
    window.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
      if (previousHeight) root.style.setProperty('--navigation-header-height', previousHeight);
      else root.style.removeProperty('--navigation-header-height');
    };
  }, []);
  useEffect(() => { document.documentElement.dataset.sidebar = collapsed ? 'collapsed' : 'expanded'; }, [collapsed]);
  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    if (next) setTopicQuery('');
    try { localStorage.setItem('timeline-sidebar-collapsed', String(next)); } catch { /* Still works without storage. */ }
  };
  const closeMobile = () => { setMobileOpen(false); requestAnimationFrame(() => menu.current?.focus({ preventScroll: true })); };
  useEffect(() => {
    if (!mobileOpen) return;
    sidebar.current?.scrollTo({ top: 0, behavior: 'instant' });
    sidebar.current?.querySelector<HTMLButtonElement>('.mobile-nav-close')?.focus({ preventScroll: true });
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
      const outside = !sidebar.current?.contains(document.activeElement);
      if (e.shiftKey && (document.activeElement === first || outside)) { e.preventDefault(); last?.focus(); }
      if (!e.shiftKey && (document.activeElement === last || outside)) { e.preventDefault(); first?.focus(); }
    };
    const media = window.matchMedia('(max-width: 760px)');
    const resize = () => {
      if (!media.matches) {
        setMobileOpen(false);
        requestAnimationFrame(() => desktopMenu.current?.focus({ preventScroll: true }));
      }
    };
    media.addEventListener('change', resize);
    window.addEventListener('keydown', keyboard);
    return () => { background.forEach((el, i) => { el.inert = previousInert[i]; }); document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', keyboard); media.removeEventListener('change', resize); };
  }, [mobileOpen]);
  return <div className="navigation-root" data-screen={screen}>
    {mobileOpen && <div className="nav-scrim" onClick={closeMobile} aria-hidden="true" />}
    <aside id="topic-sidebar" ref={sidebar} className={`topic-sidebar ${mobileOpen ? 'mobile-open' : ''}`} aria-label="主题导航" role={mobileOpen ? 'dialog' : undefined} aria-modal={mobileOpen || undefined}>
      <div className="sidebar-brand-row">
        <a className="sidebar-wordmark" href={sitePath('/')} aria-label="timeline 首页"><span className="sidebar-long-brand">timeline</span><span className="sidebar-short-brand">t.</span></a>
        <button type="button" className="sidebar-toggle" onClick={toggle} aria-label={collapsed ? '展开侧栏' : '收拢侧栏'} aria-expanded={!collapsed} aria-controls="topic-navigation" title={collapsed ? '展开侧栏' : '收拢侧栏'}>{collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}</button>
        <button type="button" className="mobile-nav-close" aria-label="关闭主题导航" onClick={closeMobile}><X size={22} /></button>
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
    <header ref={header} className="atlas-header library-header" data-search-open={searchOpen || undefined}>
      <button ref={desktopMenu} type="button" className="header-sidebar-toggle" onClick={toggle} aria-label={collapsed ? '展开侧栏' : '收拢侧栏'} aria-expanded={!collapsed} aria-controls="topic-navigation" title={collapsed ? '展开侧栏' : '收拢侧栏'}>{collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}</button>
      {screen !== 'home' && <a className="mobile-app-back" href={backHref} aria-label={screen === 'record' && active !== 'about' ? '返回时间线' : '返回首页'} onClick={event => {
        // Recheck at activation as well as hydration, without guessing browser history.
        const destination = resolveBackHref();
        event.currentTarget.href = destination;
        setBackHref(destination);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        if (screen !== 'record' || active === 'about') {
          if (canUseParentHistoryBack(destination, location.origin, document.referrer, history.length)) history.back();
          else location.replace(destination);
          return;
        }
        let savedPositionUrl: string | undefined;
        try { savedPositionUrl = JSON.parse(sessionStorage.getItem('timeline-mobile-position') || 'null')?.url; } catch { /* Direct links use the safe topic destination. */ }
        if (!location.hash && canUseTimelineHistoryBack(destination, location.origin, document.referrer, history.length, savedPositionUrl)) history.back();
        else location.replace(destination);
      }}><ArrowLeft size={22} aria-hidden="true" /></a>}
      <span className="mobile-bar-title">{mobileTitle}</span>
      <div className="header-topic"><a href={sitePath(topicPath)}>{active === 'about' ? '关于 timeline' : currentTopic?.title || topicTitle}</a>{currentTopic && active !== 'about' && <span>{currentTopic.subtitle}</span>}</div>
      <div className="mobile-header-actions">
        {topicPath !== '/' && <button ref={searchToggle} type="button" className="mobile-search-toggle" onClick={searchOpen ? closeSearch : openSearch} aria-label={searchOpen ? '关闭搜索' : '搜索当前主题'} aria-expanded={searchOpen} aria-controls="current-topic-search">{searchOpen ? <X size={20} /> : <Search size={20} />}</button>}
        <AppearanceControl />
        <button ref={menu} type="button" className="mobile-nav-open" onClick={() => { setSearchOpen(false); setMobileOpen(true); }} aria-label="打开主题导航" aria-expanded={mobileOpen} aria-controls="topic-sidebar" aria-haspopup="dialog"><Menu size={23} /></button>
      </div>
      {topicPath !== '/' && <form id="current-topic-search" className="atlas-search" action={sitePath(topicPath)} role="search" onSubmit={onQuery ? event => {
        event.preventDefault();
        if (window.matchMedia('(max-width: 760px)').matches) closeSearch();
      } : undefined} onKeyDown={event => {
        if (event.key === 'Escape' && searchOpen && window.matchMedia('(max-width: 760px)').matches) { event.preventDefault(); event.stopPropagation(); closeSearch(); }
      }}>
        <Search size={17} /><input ref={input} name="q" aria-label="搜索事件、对象或关键词" placeholder="搜索当前主题…" value={query} onChange={onQuery ? e => onQuery(e.target.value) : undefined} />
        {!onQuery && topicPath === '/ai/' && <input type="hidden" name="all" value="1" />}
        {query && onQuery ? <button type="button" aria-label="清除搜索" onClick={() => onQuery('')}><X size={15} /></button> : <kbd>⌘ K</kbd>}
      </form>}
    </header>
  </div>;
}
