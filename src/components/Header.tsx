import { sitePath } from "../lib/paths";
import { Search, Globe2, X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Header({
  query,
  onQuery,
  active = "timeline",
  topicTitle = "全球 AI 时间线",
  topicPath = "/ai/",
}: {
  topicTitle?: string;
  topicPath?: string;
  query?: string;
  onQuery?: (query: string) => void;
  active?: "timeline" | "themes" | "about";
}) {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const shortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  return (
    <header className="atlas-header">
      <a className="atlas-brand" href={sitePath("/")}>
        timeline
      </a>
      <span className="brand-divider" />
      <a className="atlas-name" href={sitePath(topicPath)}>
        {topicTitle}
      </a>
      {topicPath !== "/" && (
        <form
          className="atlas-search"
          action={sitePath(topicPath)}
          role="search"
          onSubmit={onQuery ? (e) => e.preventDefault() : undefined}
        >
          <Search size={17} />
          <input
            ref={input}
            name="q"
            aria-label="搜索事件、对象或关键词"
            placeholder="搜索事件、对象或关键词…"
            value={query}
            onChange={onQuery ? (e) => onQuery(e.target.value) : undefined}
          />
          {!onQuery && topicPath === "/ai/" && (
            <>
              <input type="hidden" name="from" value="1943" />
              <input type="hidden" name="to" value="2026" />
              <input type="hidden" name="all" value="1" />
            </>
          )}
          {query ? (
            <button
              type="button"
              aria-label="清除搜索"
              onClick={() => onQuery?.("")}
            >
              <X size={15} />
            </button>
          ) : onQuery ? (
            <kbd>⌘ K</kbd>
          ) : null}
        </form>
      )}
      <nav className="atlas-nav" aria-label="主要导航">
        <a
          href={sitePath("/")}
          aria-current={topicPath === "/" ? "page" : undefined}
        >
          所有主题
        </a>
        <a
          href={sitePath("/ai/")}
          aria-current={
            topicPath === "/ai/" && active !== "about" ? "page" : undefined
          }
        >
          AI 发展史
        </a>
        <a
          href={sitePath("/china-history/")}
          aria-current={
            topicPath === "/china-history/" && active !== "about"
              ? "page"
              : undefined
          }
        >
          中国历史
        </a>
        <a
          href={sitePath("/about/")}
          aria-current={active === "about" ? "page" : undefined}
        >
          关于
        </a>
      </nav>
      <span className="atlas-language">
        <Globe2 size={17} />
        简体中文
      </span>
    </header>
  );
}
