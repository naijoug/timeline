# 共用时间线与主题接入

所有主题共用一套电子墨水屏灰阶视觉与交互，不通过主题 ID 分支渲染不同页面。

- `src/components/timeline/Explorer.tsx`：横向时间总览、范围/类别筛选、纵向节点、详情与前后节点切换。朝代/时期、地区等控件由提供的数据启用。
- `src/components/timeline/EventRecord.astro`：所有独立事件页的标题、摘要、意义、补充段落、来源、相关对象、复制与返回入口。
- `src/styles/chronicle.css`、`record.css`、`navigation.css`：共用布局；颜色统一引用 `paper.css` 的灰阶语义变量，分类用文字而非彩色区分。
- `src/core/explorer.ts`：共用默认选择、范围/分类/关键词/地区筛选与视图 URL。空 `event=` 表示关闭详情，刷新保持关闭。
- `src/topics/ai/explorer.ts`：AI 专用数据适配，包括公司、模型版本比较、完整事件路径、地区条目集合，以及 `lane` 等旧 URL 参数。这里不写 JSX 或主题样式。
- `src/components/Atlas.tsx`：兼容现有 AI 路由，提供适配后的 Catalog 与展示数据，界面仍由 Explorer 渲染。

新增主题先创建 `Catalog`，再通过主题、时期、类别路由向同一个 Explorer 传入数据；独立事件路由把内容映射给 EventRecord。将主题注册到 `src/core/topics.ts` 和首页，再注册内容校验。不要复制 Explorer 或创建单独的主题样式表。

`ExplorerPresentation` 仅提供可选的默认范围、默认/最近事件、里程碑、地区范围、节点显示信息及兼容 URL 的读写函数。新主题通常无需提供自定义 URL 编解码。标题、类别、来源和补充事实始终来自该主题的内容数据。

历史数据用 `HistoricalDate.year` 表示历史年份（无 0 年）；交互范围用连续坐标，输入与 URL 转回历史年份。持续事件按区间相交选择，不能简化为“起点落在窗口中”。时期成员关系来自 `periodIds`，不是从年代自动推断。

## 浅色、深色与系统模式

侧栏底部只显示一个图标按钮，点击按浅色 → 深色 → 跟随系统循环；太阳、月亮、显示器图标表示当前模式。展开、收拢和手机抽屉使用同一控件，支持 Enter 和空格操作。`src/lib/appearance.ts` 管理偏好、系统变更及跨标签同步；`Layout.astro` 在正文绘制前恢复选择。偏好键为 `timeline-appearance`，新访客默认跟随系统。

新增样式只使用 `src/styles/paper.css` 中的 `--paper-*` 变量。不要按主题写颜色，也不要用页面整体滤镜模拟深色模式。正文与辅助文字在页面、侧栏和选中背景上均有对比度测试。
