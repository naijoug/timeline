# 开发指南

本文记录稳定的开发、内容维护与部署约定。项目简介见 [README](../README.md)，每日维护与批次更新见 [更新记录](changelog.md)。

## 启动

需要 Node.js 22.12+，推荐 Node.js 22 LTS。

```sh
npm ci
npm run dev
```

打开终端显示的本地 URL，默认 http://127.0.0.1:4321/；AI 入口为 `/ai/`，编程语言入口为 `/programming-languages/`，中国历史入口为 `/china-history/`，作家作品入口为 `/writers/`。

当前 Astro 版本会在后台管理开发服务器，可用 `npx astro dev status` 查看，`npx astro dev stop` 停止。

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

构建后还可运行以下检查；GitHub Pages 工作流会执行这些检查：

```sh
npm run check:links        # 静态站点内部链接
npm run check:reading      # 首屏顺序、层级导航与事件链接
npm run check:performance  # 客户端依赖与体积预算
npm run test:hydration     # 生产脚本的 DOM 模拟回归
```

验证子路径产物时，上述命令也需设置相同的 `TIMELINE_BASE_PATH` 和 `TIMELINE_OUT_DIR`。DOM 模拟测试不替代真实浏览器和移动设备验收。

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
src/topics/programming-languages/  编程语言、标准与版本演进
src/topics/writers/            作家、作品、版本与阅读资料
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

可将同一次有明确范围的研究批次放在独立模块（如 `verified-2026.ts`），再经下列汇总文件导出，避免把批次散落到历史记录中。

1. 在 `sources.ts` 添加具体论文、公告或档案，不用机构主页代替事件依据。
2. 如需新产品、概念或家族，在 `entities.ts` 添加稳定英文 ID、说明与来源。
3. 在 `events.ts` 添加事件，关联实体与来源；日期保留 `YYYY`、`YYYY-MM` 或 `YYYY-MM-DD` 的真实精度。
4. 模型事件必须有 `change`，明确比较基线、变化、限制、证据类别与来源；有已收录前代时使用 `baselineEventId`。
5. 同一公告中的多个事件使用 `announcementGroup`；实体关系同样需要来源。
6. 运行校验、测试与构建，预览事件及其相关页面。

## 内容边界

这是持续扩充的精选资料集。每份来源保留各自的核查日期，单次更新不代表全库复核；各批次范围和核验结果见 [更新记录](changelog.md)，AI 收录范围见 [覆盖报告](ai-coverage.md)。

地区筛选按已明确的团队/技术生态归类，不按产品显示语言猜测，也不是公司法律注册地清单。归属未明确或跨地区的条目保留在全球范围。每个事件只有一个主要类别；模型发布优先归入模型，ReAct、Skills 等机制归入技术，ELIZA 等历史系统不作为现代 Agent 应用。

不精确日期保留年份或月份精度，纵向节点不会补造月日；持续事件保留起止范围。年份范围控件使用连续年份坐标，界面显示历史年份。

厂商声明不等于独立实测，模型分数不混合不同测试配置。概念页上的事件日期不代表概念发明日。部分早期历史使用机构回顾，来源类型在事件页标明。

外链会随时间变化；结构校验不等于实时外站可用性保证。新内容发布前仍需核对原资料和日期。首版记录见 [首版验证](verification.md)；改版设计对照见 [设计对照](../design-qa.md)，运行验证见 [改版验证](verification-v2.md)。

## 添加历史内容或新主题

中国历史在 `src/topics/china-history/catalog.ts` 维护。新增事件必须有稳定 ID、`TimeSpan`、分类、明确的 `periodIds`／`entityIds` 和来源；不要按年份自动推断朝代归属。同一事件可引用多个时期，只存储一次。

通用 `HistoricalDate.year` 使用非零的历史年份（-1 表示前1年），`yearCoordinate()` 转为内部连续坐标（0 表示前1年）。URL 使用历史年份，界面不会显示0年。`duration` 是持续过程，`uncertain` 是不确定日期范围，两者均保留端点；月日计算采用前推公历，古代原始历法须先核对换算，不能直接填写为公历月日。

新主题实现步骤：

1. 在 `src/topics/<topic>/` 添加符合 `Catalog` 的数据，配置分类、范围说明、快捷入口和时期路由段。
2. 生成主题、时期、事件路由：全部使用 `Explorer` 和 `EventRecord` 共用界面，不创建主题独立配色或详情布局。补充内容通过 `details`、`ExplorerPresentation` 或共用事件模板的内容槽提供。
3. 在 `src/core/topics.ts` 与主题首页添加入口，在 `scripts/validate.ts` 注册内容校验。
4. 添加该主题特有的约束与关键测试，运行检查、构建和子路径链接验证。

通用校验只管日期、ID、引用、时期层级和基础内容；AI 模型比较基线等规则留在主题校验器中。浏览器按主题只载入时间线展示、搜索与筛选需要的轻量索引；完整正文、来源档案和关系保留在静态详情页。新主题需在 `src/core/topic-payloads.server.ts` 注册服务端目录，页面使用 `ExplorerIsland.astro`；不要把完整目录导入客户端。海量数据的分片和全文检索后置。

统一展示层说明见 [共用时间线与主题接入](shared-timeline.md)。

## 外观

全站采用统一的黑白灰阅读界面，英文、数字与时间标签优先使用自托管 Fira Code，中文回退至系统中文无衬线字体，不依赖外部字体请求。首页使用编号主题索引；移动端叶片事件卡保留细时间轴，摘要完整显示，独立详情页按正文阅读比例排版。侧栏底部可选择浅色、深色或跟随系统；刷新、切换页面和同源标签页会保持同步，收拢侧栏和手机抽屉内也可操作。默认跟随系统。

样式统一使用 `src/styles/paper.css` 的灰阶变量，页面绘制前恢复偏好以避免深色刷新闪白。外观逻辑、存储不可用时的降级以及文字对比度包含在 `npm test` 中。

### 字体

Fira Code Latin variable WOFF2 来自 `@fontsource-variable/fira-code@5.3.0` 的官方分发，内部字体版本为 5.002，支持 300–700 字重。文件仅 36,276 字节，随静态站点部署并使用 `font-display: swap`；中文使用苹方、微软雅黑或 Noto Sans CJK 等本机字体回退。

- 来源：https://github.com/fontsource/font-files/blob/main/fonts/variable/fira-code/files/fira-code-latin-wght-normal.woff2
- 作者：https://github.com/tonsky/FiraCode
- 许可：SIL Open Font License 1.1，完整文本保留在 `public/fonts/FiraCode-OFL.txt`。
- SHA-256：`771bf4b79a97fc005d12866168bd39d868a9dd3d5903008fe8b796723c8a56f4`。

## 主题导航性能

主题入口与事件入口保留原生链接和静态首屏。完整档案不再随主题时间线重复进入客户端；轻量 JSON 索引放在可阅读内容之后，并为主题链接启用按意图预取。性能测量、边界与回归覆盖见 [导航性能报告](performance-navigation.md)。

构建后运行 `npm run check:performance` 检查依赖与体积预算，运行 `npm run test:hydration` 用真实生产脚本验证静态内容复用、筛选与返回状态。后者是 DOM 模拟测试，不替代真实浏览器和移动设备验收。

## 文档维护约定

- 根目录 `README.md` 只保留项目定位、主要主题、启动方式与文档入口；不追加每日进度、批次统计或验收日志。
- 每次有实际变更时，在 [更新记录](changelog.md) 增加简短条目并链接详细文档；没有变化无需写日报。
- 日常核验沿用 `docs/maintenance-YYYY-MM-DD-HHMM.md`，AI 资料巡查沿用 `docs/ai-radar-YYYY-MM-DD-HHMM.md`；记录中明确时区、核查范围与验证结果。
- 主题研究、设计和验收材料继续放在 `docs/` 对应目录。只有需要用户执行迁移步骤时，才新增升级指南。
