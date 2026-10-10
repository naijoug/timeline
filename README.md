# timeline

一个可本地运行、可静态部署的通用时间线网站。使用 Astro、React、TypeScript；无数据库、账号或运行时模型 API。当前包含 AI 发展史与中国历史两个主题，共用时间计算、筛选、时间线界面和事件详情模板。

## 启动

需要 Node.js 22.12+，推荐 Node.js 22 LTS。

```sh
npm ci
npm run dev
```

打开终端显示的本地 URL，默认 http://127.0.0.1:4321/；AI 入口为 `/ai/`，中国历史入口为 `/china-history/`。

当前 Astro 版本会在后台管理开发服务器，可用 `npx astro dev status` 查看，`npx astro dev stop` 停止。

## 通用底座与中国历史

- 首页提供主题入口，主题数据独立加载。
- 36 个朝代与时期的阅读骨架，34 个精选事件、29 份来源；唐代 12 个事件（默认 11 个关键节点），宋辽夏金提供跨政权示例。
- 统一的横向总览、纵向节点与右侧宽阅读区；朝代选择、分期目录和独立时期页保留并存政权与明确纪年，时期树不推断历史隶属。
- 朝代＋类别筛选、战役专题、搜索、时间窗口移动、缩放、年份范围、详情面板与独立事件页。
- 视图参数与选中事件可分享，详情返回恢复原视图；原根路径中的 AI 查询链接自动转到 `/ai/`。
- 公元前年份、无公元0年的连续坐标、年／月／日精度、近似日期、不确定范围和持续事件重叠查询。

- 辛亥革命 1911—1912 专题新增 14 个节点、13 个人物／机构、15 份来源与 10 条事件证据关系；通过中国历史首页的专题入口进入，独立事件页保留段落定位、来源版本与关系依据。清末民初与 1912 建政分期呈现并行和跨时期归属。

中国历史首版为**时期骨架＋精选样例**，并非完整通史。各时期单独注明收录深度与纪年口径；更多历史事件可继续按来源扩充。

## AI 已实现

- AI 技术突破、模型演进、Agent 应用三类事件，沿同一纵向时间线排列。
- 248 个事件、84 个对象、206 份来源；6 条对象关系与 22 条事件证据关系分别统计。
- “从视觉学习到协作系统”专题复用并完善 7 个重要节点，新增 Whisper、Phi-1、AutoGen；逐段标注原文定位，分别说明研究发布和论文首版。AutoGen 按开发框架归入技术与方法。第二批内容已随主分支发布。
- 2026-09-30 扩充 133 条事件，补连续模型版本、编码/浏览器/手机/研究 Agent、多 Agent 及图像视频代表路线；[覆盖报告与原始依据](docs/ai-coverage.md)。
- 全球/中国团队、关键词、年份、主线、关键节点/全部已收录筛选；URL 保存状态及选中事件。
- 历史总览、年份窗口、前后导航、缩放和可用键盘调整的范围滑块。
- 事件逐条展示，按年份分组；选中节点与前后事件切换保持可见，不因节点密集隐藏条目。
- 桌面右侧宽阅读区、窄屏整宽详情、可收拢且记住状态的主题侧栏；原始来源、独立事件页和模型版本比较保留。
- 概念、产品、模型家族详情与事件列表。
- 同次发布关联、概念与产品关系、模型比较基线与限制说明。
- 深链接、复制事件 URL、返回原时间线位置、空结果和 404 页面。

## 验证与构建

```sh
npm run check       # TypeScript 与 Astro 检查
npm test            # 日期精度、筛选、URL 往返与数据关联测试
npm run validate    # 数据引用、日期、来源及模型变化结构校验
npm run report:ai   # 重新生成覆盖统计、家族清单与本轮来源报告
npm run build       # 内容校验 + 静态构建
npm run preview     # 预览 dist
```

`dist/` 为静态产物，可部署到支持目录 index.html 的静态托管服务。构建不抓取外部资料；页面字体有系统字体回退。

## GitHub Pages

仓库：`git@github.com:naijoug/timeline.git`。已适配项目站点的 `/timeline/` 子路径，包括导航、详情页、搜索表单、返回链接和静态资源。

1. 在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
2. 在 **Actions → Deploy to GitHub Pages → Run workflow** 手动运行部署。
3. 工作流成功后，站点预期位于 `https://naijoug.github.io/timeline/`。

工作流只配置 `workflow_dispatch`：普通 push 不会自动发布，后续更新同样手动运行。GitHub 仓库是否允许使用 Pages 取决于仓库和账户设置；这里没有自动修改发布设置。

本地根路径仍是默认行为。验证 Pages 构建可以运行：

```sh
TIMELINE_BASE_PATH=/timeline TIMELINE_OUT_DIR=dist-pages npm run build
TIMELINE_BASE_PATH=/timeline TIMELINE_OUT_DIR=dist-pages npm run check:links
```

部署使用 `dist/`，`dist-pages/` 仅用于本地隔离验证且不会提交。`TIMELINE_BASE_PATH` 省略时为 `/`；未来使用自定义域名时应同步调整 Astro 的 `site` 与工作流的 base 配置。

## 目录

```text
src/core/                      通用类型、日期、筛选、URL、布局、校验
src/topics/ai/                 AI 数据、类型、规则、校验与通用模型适配器
src/topics/china-history/      历史数据、时期骨架、类别与来源
src/data/                     原 AI 数据导入的兼容出口
src/lib/atlas.ts               AI 视图状态适配，复用 core 的时间、筛选与聚合
src/lib/timeline.ts            原 AI 列表 API 兼容出口
src/lib/paths.ts               项目站点子路径
src/components/Atlas.tsx       AI 数据与旧链接适配，复用通用浏览器
src/components/timeline/      所有主题共用的 Explorer 与 EventRecord
src/pages/                    静态路由
src/styles/                   响应式样式
tests/                        通用逻辑与 AI 兼容测试
docs/                         研究、设计与重构说明
```

## 添加 AI 内容

AI 内容文件已移动到 `src/topics/ai/`；`src/data/` 只保留兼容导出。

1. 在 `sources.ts` 添加具体论文、公告或档案，不用机构主页代替事件依据。
2. 如需新产品、概念或家族，在 `entities.ts` 添加稳定英文 ID、说明与来源。
3. 在 `events.ts` 添加事件，关联实体与来源；日期保留 `YYYY`、`YYYY-MM` 或 `YYYY-MM-DD` 的真实精度。
4. 模型事件必须有 `change`，明确比较基线、变化、限制、证据类别与来源；有已收录前代时使用 `baselineEventId`。
5. 同一公告中的多个事件使用 `announcementGroup`；实体关系同样需要来源。
6. 运行校验、测试与构建，预览事件及其相关页面。

## 内容边界

这是持续扩充的精选资料集，不是全行业版本数据库。本轮新增内容核查于 2026-09-30，每份来源保留各自核查日期。模型覆盖语言、推理、编程及部分视觉/图像/视频路线；新增 EXAONE、Sakana Evo、Seed/豆包、Seedance、Gemma、CLIP、DALL·E、Stable Diffusion、FLUX、Wan 等对象。每个系列的实际收录数量、跨度和剩余空白见 [覆盖报告](docs/ai-coverage.md)，不把代表性节点称为已穷尽全部版本。

地区筛选按已明确的团队/技术生态归类，不按产品显示语言猜测，也不是公司法律注册地清单。归属未明确或跨地区的条目保留在全球范围。每个事件只有一个主要类别；模型发布优先归入模型，ReAct、Skills 等机制归入技术，ELIZA 等历史系统不作为现代 Agent 应用。

不精确日期保留年份或月份精度，纵向节点不会补造月日；持续事件保留起止范围。顶部横向总览使用连续年份坐标。

厂商声明不等于独立实测，模型分数不混合不同测试配置。概念页上的事件日期不代表概念发明日。部分早期历史使用机构回顾，来源类型在事件页标明。

外链会随时间变化；结构校验不等于实时外站可用性保证。新内容发布前仍需核对原资料和日期。首版记录见 `docs/verification.md`；改版设计对照见 `design-qa.md`，运行验证见 `docs/verification-v2.md`。


## 添加历史内容或新主题

中国历史在 `src/topics/china-history/catalog.ts` 维护。新增事件必须有稳定 ID、`TimeSpan`、分类、明确的 `periodIds`／`entityIds` 和来源；不要按年份自动推断朝代归属。同一事件可引用多个时期，只存储一次。

通用 `HistoricalDate.year` 使用非零的历史年份（-1 表示前1年），`yearCoordinate()` 转为内部连续坐标（0 表示前1年）。URL 使用历史年份，界面不会显示0年。`duration` 是持续过程，`uncertain` 是不确定日期范围，两者均保留端点；月日计算采用前推公历，古代原始历法须先核对换算，不能直接填写为公历月日。

新主题实现步骤：

1. 在 `src/topics/<topic>/` 添加符合 `Catalog` 的数据，配置分类、范围说明、快捷入口和时期路由段。
2. 生成主题、时期、事件路由：全部使用 `Explorer` 和 `EventRecord` 共用界面，不创建主题独立配色或详情布局。补充内容通过 `details`、`ExplorerPresentation` 或共用事件模板的内容槽提供。
3. 在 `src/core/topics.ts` 与主题首页添加入口，在 `scripts/validate.ts` 注册内容校验。
4. 添加该主题特有的约束与关键测试，运行检查、构建和子路径链接验证。

通用校验只管日期、ID、引用、时期层级和基础内容；AI 模型比较基线等规则留在主题校验器中。当前浏览器按主题载入整个小型精选数据集；海量数据的分片和全文检索后置。

统一展示层说明见 [共用时间线与主题接入](docs/shared-timeline.md)。

## 外观

全站采用电子墨水屏风格的黑白灰配色。侧栏底部可选择浅色、深色或跟随系统；刷新、切换页面和同源标签页会保持同步，收拢侧栏和手机抽屉内也可操作。默认跟随系统。

样式统一使用 `src/styles/paper.css` 的灰阶变量，页面绘制前恢复偏好以避免深色刷新闪白。外观逻辑、存储不可用时的降级以及文字对比度包含在 `npm test` 中。
