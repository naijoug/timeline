import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Plus,
  Minus,
  X,
} from "lucide-react";
import Header from "../Header";
import type { Catalog, Period, TimelineView } from "../../core/types";
import {
  catalogBounds,
  defaultView,
  descendants,
  readView,
  selectEvents,
  viewQuery,
} from "../../core/catalog";
import {
  clampRange,
  civilYear,
  formatCoordinate,
  formatDate,
  formatTime,
  overlaps,
  timeBounds,
  timePosition,
  yearCoordinate,
  yearTicks,
} from "../../core/time";
import {
  clusterItems,
  intervalGeometry,
  packIntervals,
} from "../../core/layout";
import { sitePath } from "../../lib/paths";
import "../../styles/explorer.css";

function clusterDate(items: Catalog["events"]): string {
  if (items.length === 1) return formatTime(items[0].time);
  const latest = items.reduce((a, b) =>
    timeBounds(b.time)[1] > timeBounds(a.time)[1] ? b : a,
  );
  return `${formatDate(items[0].time.start)} — ${formatDate(latest.time.end || latest.time.start)}`;
}

export default function Explorer({
  catalog,
  initialPeriod = "",
  initialCategory = "",
  viewPath,
}: {
  catalog: Catalog;
  initialPeriod?: string;
  initialCategory?: string;
  viewPath?: string;
}) {
  const { topic, periods } = catalog;
  const [state, setState] = useState(() =>
    defaultView(catalog, initialPeriod, initialCategory),
  );
  const [ready, setReady] = useState(false);
  const [width, setWidth] = useState(800);
  const [message, setMessage] = useState("");
  const [rangeError, setRangeError] = useState("");
  const plot = useRef<HTMLDivElement>(null);
  const detail = useRef<HTMLElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const drag = useRef<{ x: number; from: number; span: number } | null>(null);
  const [min, max] = catalogBounds(catalog);
  const update = (patch: Partial<TimelineView>) =>
    setState((s) => ({ ...s, ...patch }));
  useEffect(() => {
    const restore = () => {
      setState(
        readView(location.search, catalog, initialPeriod, initialCategory),
      );
      setReady(true);
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [catalog, initialPeriod, initialCategory]);
  useEffect(() => {
    if (ready)
      history.replaceState(null, "", location.pathname + viewQuery(state));
  }, [state, ready]);
  useEffect(() => {
    if (!plot.current) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(plot.current);
    return () => observer.disconnect();
  }, []);
  const currentPeriod = periods.find((p) => p.id === state.period);
  const scope = state.period ? descendants(catalog, state.period) : undefined;
  const visiblePeriods = periods.filter(
    (p) =>
      (!scope || scope.has(p.id)) && overlaps(p.time, state.from, state.to),
  );
  const topPeriods = visiblePeriods.filter(
    (p) => p.id === state.period || (!state.period && !p.parentId),
  );
  const expandedPeriods = visiblePeriods.filter(
    (p) =>
      p.id !== state.period &&
      p.parentId &&
      (p.parentId === state.period || state.expanded.includes(p.parentId)),
  );
  const periodRows = packIntervals(topPeriods, (p) => timeBounds(p.time), 1);
  const results = useMemo(() => selectEvents(catalog, state), [catalog, state]);
  const selected = results.find((e) => e.id === state.selected);
  const span = state.to - state.from + 1;
  const ticks = yearTicks(state.from, state.to, width);
  const clusters = clusterItems(
    results,
    (e) => Math.max(0, Math.min(1, (timePosition(e.time) - state.from) / span)),
    width,
  );
  const activeCluster = clusters.find((c) =>
    c.events.some((e) => e.id === selected?.id),
  );
  const sources = new Map(catalog.sources.map((s) => [s.id, s]));
  const categoryTitle = (id: string) =>
    topic.categories.find((c) => c.id === id)?.title || id;
  const periodSegment = topic.periodSegment || "periods";
  const periodHref = (p: Period) =>
    sitePath(`${topic.path}${periodSegment}/${p.id}/`) +
    `?category=${state.category || "all"}${state.all ? "&all=1" : ""}`;
  const eventHref = (id: string) =>
    sitePath(`${topic.path}events/${id}/`) +
    `?return=${encodeURIComponent(sitePath(viewPath || (initialPeriod ? `${topic.path}${periodSegment}/${initialPeriod}/` : topic.path)) + viewQuery(state))}`;
  const reset = () =>
    setState(defaultView(catalog, initialPeriod, initialCategory));
  const close = () => {
    update({ selected: "" });
    opener.current?.focus();
  };
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        update({ selected: "" });
        opener.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  const choose = (id: string, button: HTMLButtonElement) => {
    opener.current = button;
    update({ selected: id });
    requestAnimationFrame(() => {
      detail.current?.focus({ preventScroll: true });
      if (window.matchMedia("(max-width: 900px)").matches)
        detail.current?.scrollIntoView({
          block: "start",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        });
    });
  };
  const zoom = (factor: number) => {
    const newSpan = Math.max(1, Math.round(span * factor));
    const [from, to] = clampRange(
      state.from + (span - newSpan) / 2,
      newSpan,
      min,
      max,
    );
    update({ from, to });
  };
  const move = (direction: number) => {
    const [from, to] = clampRange(
      state.from + direction * Math.max(1, Math.floor(span / 2)),
      span,
      min,
      max,
    );
    update({ from, to });
  };
  const toggle = (id: string) => {
    const subtree = descendants(catalog, id);
    update({
      expanded: state.expanded.includes(id)
        ? state.expanded.filter((v) => !subtree.has(v))
        : [...state.expanded, id],
    });
  };
  const bar = (p: Period) => {
    const [a, b] = timeBounds(p.time),
      geometry = intervalGeometry(a, b, state.from, state.to);
    return (
      <a
        key={p.id}
        className={`period-bar ${p.time.start.approximate ? "approximate" : ""}`}
        style={{ left: `${geometry.left}%`, width: `${geometry.width}%` }}
        href={periodHref(p)}
        title={`${p.title} · ${formatTime(p.time)}`}
        aria-label={`${p.title}，${formatTime(p.time)}，查看时间线`}
      >
        <span>{p.title}</span>
      </a>
    );
  };
  return (
    <div className="topic-app">
      <Header
        topicTitle={topic.title}
        topicPath={topic.path}
        query={state.q}
        onQuery={(q) => update({ q })}
      />
      <main id="main" className="explorer-main">
        <div className="explorer-breadcrumb">
          <a href={sitePath("/")}>所有主题</a>
          <ChevronRight size={13} />
          <a href={sitePath(topic.path)}>{topic.title}</a>
          {currentPeriod && (
            <>
              <ChevronRight size={13} />
              <span>{currentPeriod.title}</span>
            </>
          )}
        </div>
        <header className="explorer-hero">
          <div>
            <p className="explorer-kicker">CHRONICLES / 时间中的线索</p>
            <h1>
              {currentPeriod
                ? `${currentPeriod.title} · 时间线`
                : initialCategory && state.category
                  ? `${categoryTitle(state.category)} · 时间线`
                  : topic.title}
            </h1>
            <p>{currentPeriod?.summary || topic.description}</p>
          </div>
          <button
            className="share-view"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(location.href);
                setMessage("已复制当前时间线链接");
              } catch {
                setMessage("请复制浏览器地址栏中的链接");
              }
            }}
          >
            <Copy size={15} />
            分享这条时间线
          </button>
        </header>
        <div className="explorer-coverage">
          <span className="coverage-dot" />
          {currentPeriod
            ? `${formatTime(currentPeriod.time)} · ${currentPeriod.coverage === "outline" ? "时期骨架，事件待补充" : "精选事件，持续补充"}`
            : topic.coverage}
        </div>
        {currentPeriod?.note && (
          <p className="period-note">纪年说明：{currentPeriod.note}</p>
        )}
        <div className="explorer-shortcuts">
          {topic.shortcuts?.map((s) => (
            <a key={s.path} href={sitePath(s.path)}>
              {s.title}
              <ArrowUpRight size={13} />
            </a>
          ))}
        </div>
        <div className="explorer-controls">
          <label>
            {topic.periodLabel || "时期"}
            <select
              aria-label="选择朝代或时期"
              value={state.period}
              onChange={(e) => {
                const p = periods.find((p) => p.id === e.target.value);
                location.href = p
                  ? periodHref(p)
                  : sitePath(topic.path) +
                    `?category=${state.category || "all"}`;
              }}
            >
              <option value="">全部时期</option>
              {periods.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.parentId ? "　" : ""}
                  {p.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            内容线索
            <select
              aria-label="内容线索"
              value={state.category}
              onChange={(e) =>
                update({ category: e.target.value, selected: "" })
              }
            >
              <option value="">全部类别</option>
              {topic.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
          <label className="explorer-check">
            <input
              type="checkbox"
              checked={state.all}
              onChange={(e) => update({ all: e.target.checked })}
            />
            全部已收录事件
          </label>
          <button className="reset-view" onClick={reset}>
            重置视图
          </button>
        </div>
        <div className={`explorer-workspace ${selected ? "has-detail" : ""}`}>
          <section className="chronicle-board" aria-label="可缩放的历史时间线">
            <div className="chronicle-toolbar">
              <div className="chronicle-window">
                <strong>
                  {formatCoordinate(state.from)} — {formatCoordinate(state.to)}
                </strong>
                <span>同一时间刻度 · 可拖动平移</span>
              </div>
              <div className="chronicle-buttons">
                <button
                  aria-label="更早的时间"
                  disabled={state.from <= min}
                  onClick={() => move(-1)}
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  aria-label="更晚的时间"
                  disabled={state.to >= max}
                  onClick={() => move(1)}
                >
                  <ChevronRight size={17} />
                </button>
                <button
                  aria-label="缩小时间轴"
                  disabled={span >= max - min + 1}
                  onClick={() => zoom(2)}
                >
                  <Minus size={17} />
                </button>
                <button
                  aria-label="放大时间轴"
                  disabled={span <= 1}
                  onClick={() => zoom(0.5)}
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>
            <form
              className="chronicle-range"
              key={`${state.from}:${state.to}`}
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget),
                  a = Number(data.get("from")),
                  b = Number(data.get("to"));
                if (
                  !Number.isInteger(a) ||
                  !Number.isInteger(b) ||
                  a === 0 ||
                  b === 0
                ) {
                  setRangeError("请输入非零整数年份；公元前使用负数。");
                  return;
                }
                const start = yearCoordinate(a),
                  end = yearCoordinate(b);
                if (start > end || start < min || end > max) {
                  setRangeError(
                    `范围须在${formatCoordinate(min)}至${formatCoordinate(max)}之间，且起点不晚于终点。`,
                  );
                  return;
                }
                setRangeError("");
                update({ from: start, to: end });
              }}
            >
              <label>
                起始年
                <input
                  name="from"
                  type="number"
                  required
                  defaultValue={civilYear(state.from)}
                  aria-label="起始年份，公元前为负数"
                />
              </label>
              <span>—</span>
              <label>
                结束年
                <input
                  name="to"
                  type="number"
                  required
                  defaultValue={civilYear(state.to)}
                  aria-label="结束年份，公元前为负数"
                />
              </label>
              <button type="submit">应用范围</button>
              <small>公元前用负数，无公元 0 年</small>
            </form>
            {rangeError && (
              <p className="chronicle-error" role="alert">
                {rangeError}
              </p>
            )}
            <div
              className="chronicle-canvas"
              ref={plot}
              onPointerDown={(e) => {
                if (e.target instanceof Element && e.target.closest("a,button"))
                  return;
                drag.current = { x: e.clientX, from: state.from, span };
                e.currentTarget.setPointerCapture(e.pointerId);
              }}
              onPointerUp={(e) => {
                if (!drag.current) return;
                const delta = drag.current.x - e.clientX;
                if (Math.abs(delta) > 8) {
                  const [from, to] = clampRange(
                    drag.current.from +
                      Math.round((delta / width) * drag.current.span),
                    drag.current.span,
                    min,
                    max,
                  );
                  update({ from, to });
                }
                drag.current = null;
              }}
              onPointerCancel={() => {
                drag.current = null;
              }}
            >
              <div className="chronicle-axis">
                {ticks.map((y) => (
                  <span
                    key={y}
                    style={{ left: `${((y - state.from) / span) * 100}%` }}
                  >
                    {formatCoordinate(y)}
                  </span>
                ))}
              </div>
              <div className="period-heading">
                {topic.periodLabel || "时期"}主线{" "}
                <span>条带表示持续时间；同年交接共用主线</span>
              </div>
              {periodRows.map((row, index) => (
                <div className="period-row" key={index}>
                  {row.map(bar)}
                </div>
              ))}
              {expandedPeriods.map((p) => (
                <div className="expanded-period-row" key={p.id}>
                  <a className="expanded-period-label" href={periodHref(p)}>
                    {p.title} <span>{formatTime(p.time)}</span>
                  </a>
                  <div className="period-row">{bar(p)}</div>
                </div>
              ))}
              {!visiblePeriods.length && (
                <p className="chronicle-empty">
                  当前窗口不与所选时期相交。
                  <button onClick={reset}>返回时期范围</button>
                </p>
              )}
              <div className="period-heading event-axis-heading">
                {state.category ? categoryTitle(state.category) : "历史事件"}
                <span>{results.length} 个已收录节点 · 点击展开</span>
              </div>
              <div className="chronicle-event-plot">
                <div className="chronicle-baseline" />
                {ticks.map((y) => (
                  <div
                    className="chronicle-grid"
                    key={y}
                    style={{ left: `${((y - state.from) / span) * 100}%` }}
                  />
                ))}
                {clusters.map((c) => {
                  const e =
                      c.events.find((e) => e.id === state.selected) ||
                      c.events[0],
                    labelWidth = Math.min(116, width),
                    left = Math.max(
                      0,
                      Math.min(
                        width - labelWidth,
                        c.position * width - labelWidth / 2,
                      ),
                    );
                  return (
                    <button
                      key={c.id}
                      className="chronicle-node"
                      aria-pressed={c.events.some(
                        (e) => e.id === state.selected,
                      )}
                      title={c.events
                        .map((item) => `${formatTime(item.time)} ${item.title}`)
                        .join("\n")}
                      style={{ left, width: labelWidth }}
                      onClick={(ev) => choose(e.id, ev.currentTarget)}
                    >
                      <i style={{ left: c.position * width - left }} />
                      <span>{clusterDate(c.events)}</span>
                      <strong>{e.title}</strong>
                      {c.events.length > 1 && (
                        <small>共 {c.events.length} 个事件</small>
                      )}
                    </button>
                  );
                })}
                {!results.length && (
                  <p className="chronicle-empty">
                    暂无符合条件的已收录事件。可调整类别、关键词或时间范围。
                  </p>
                )}
              </div>
              {results
                .filter((e) => e.time.kind !== "point")
                .map((e) => {
                  const [a, b] = timeBounds(e.time),
                    g = intervalGeometry(a, b, state.from, state.to);
                  return (
                    <div className="duration-event" key={e.id}>
                      <button onClick={(ev) => choose(e.id, ev.currentTarget)}>
                        {e.title} · {formatTime(e.time)}
                      </button>
                      <div className="duration-track">
                        <span
                          style={{ left: `${g.left}%`, width: `${g.width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="chronicle-footnote">
              名称过密时，可从下方目录进入。近似年代用虚线条带表示。
            </div>
          </section>
          {selected && (
            <aside
              ref={detail}
              tabIndex={-1}
              className="chronicle-detail"
              aria-label="事件详情"
            >
              <button
                className="chronicle-close"
                aria-label="关闭事件详情"
                onClick={close}
              >
                <X size={19} />
              </button>
              <span className="explorer-kicker">
                {categoryTitle(selected.category)}
              </span>
              <h2>{selected.title}</h2>
              <p className="chronicle-detail-date">
                {formatTime(selected.time)}
              </p>
              <p>{selected.summary}</p>
              <h3>为什么重要</h3>
              <p>{selected.significance}</p>
              {selected.note && <p className="detail-note">{selected.note}</p>}
              {selected.details?.map((d) => (
                <section key={d.label}>
                  <h3>{d.label}</h3>
                  <p>{d.text}</p>
                </section>
              ))}
              <h3>资料来源</h3>
              {selected.sourceIds.map((id) => {
                const s = sources.get(id)!;
                return (
                  <a
                    className="chronicle-source"
                    key={id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.title}
                    <small>
                      {s.publisher} · {s.type}
                    </small>
                  </a>
                );
              })}
              {activeCluster && activeCluster.events.length > 1 && (
                <section className="chronicle-cluster">
                  <h3>此处的 {activeCluster.events.length} 个事件</h3>
                  {activeCluster.events.map((e) => (
                    <button
                      key={e.id}
                      aria-pressed={selected.id === e.id}
                      onClick={() => update({ selected: e.id })}
                    >
                      {e.title}
                      <small>{formatTime(e.time)}</small>
                    </button>
                  ))}
                </section>
              )}
              <a className="chronicle-full" href={eventHref(selected.id)}>
                阅读完整事件 <ArrowUpRight size={16} />
              </a>
            </aside>
          )}
        </div>
        <section className="period-directory" aria-label="朝代与时期目录">
          <div className="explorer-section-title">
            <h2>{currentPeriod ? "沿着这个时期继续" : "朝代与时期"}</h2>
            <span>展开分期，或进入独立时间线</span>
          </div>
          <div className="period-card-grid">
            {periods
              .filter((p) =>
                currentPeriod ? p.parentId === currentPeriod.id : !p.parentId,
              )
              .map((p) => (
                <article className="period-card" key={p.id}>
                  <a href={periodHref(p)}>
                    <span>{formatTime(p.time)}</span>
                    <h3>
                      {p.title}
                      <ArrowUpRight size={17} />
                    </h3>
                    <p>{p.summary}</p>
                    <small>
                      {p.coverage === "selected" ? "精选事件" : "时期骨架"}
                    </small>
                  </a>
                  {periods.some((c) => c.parentId === p.id) && (
                    <>
                      <button
                        aria-expanded={state.expanded.includes(p.id)}
                        onClick={() => toggle(p.id)}
                      >
                        展开分期 <ChevronDown size={14} />
                      </button>
                      {state.expanded.includes(p.id) && (
                        <div className="period-children">
                          {periods
                            .filter((c) => c.parentId === p.id)
                            .map((c) => (
                              <a href={periodHref(c)} key={c.id}>
                                {c.title}
                                <span>{formatTime(c.time)}</span>
                              </a>
                            ))}
                        </div>
                      )}
                    </>
                  )}
                </article>
              ))}
          </div>
          {currentPeriod &&
            !periods.some((p) => p.parentId === currentPeriod.id) && (
              <p className="directory-note">
                可通过上方内容线索筛选，或返回
                <a href={sitePath(topic.path)}>{topic.title}总览</a>。
              </p>
            )}
        </section>
        <section className="chronicle-event-list" aria-label="当前视图事件列表">
          <div className="explorer-section-title">
            <h2>这条线上的事件</h2>
            <span aria-live="polite">
              {results.length} 条 · {state.all ? "全部已收录" : "关键节点"}
            </span>
          </div>
          {results.map((e) => (
            <a key={e.id} href={eventHref(e.id)}>
              <time>{formatTime(e.time)}</time>
              <strong>{e.title}</strong>
              <span>{categoryTitle(e.category)}</span>
              <ArrowUpRight size={16} />
            </a>
          ))}
          {!results.length && (
            <p className="directory-note">
              此视图尚无匹配内容。没有收录不代表这段历史没有重要事件。
            </p>
          )}
        </section>
        {currentPeriod && (
          <section className="period-references">
            <h2>时期依据与纪年口径</h2>
            <p>
              {currentPeriod.note ||
                "按所列参考资料的年份精度展示，条带边界不表示精确到日。"}
            </p>
            {currentPeriod.sourceIds.map((id) => {
              const s = sources.get(id)!;
              return (
                <a
                  key={id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.title} ↗
                </a>
              );
            })}
          </section>
        )}
        <p role="status" className="share-status">
          {message}
        </p>
      </main>
      <footer className="atlas-footer">
        <span>
          <strong>timeline</strong>
          <i />
          在时间中，发现关联
        </span>
        <a href={sitePath("/about/")}>收录范围与资料说明</a>
      </footer>
    </div>
  );
}
