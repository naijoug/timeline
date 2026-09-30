# timeline

一个可本地运行、可静态部署的多维 AI 发展史网站。使用 Astro、React、TypeScript；无数据库、账号或运行时模型 API。当前已按选定的方案一改为共用时间刻度的横向三轨视图。

## 启动

需要 Node.js 22.12+，推荐 Node.js 22 LTS。

```sh
npm ci
npm run dev
```

打开终端显示的本地 URL，默认 http://127.0.0.1:4321/ai/。

当前 Astro 版本会在后台管理开发服务器，可用 `npx astro dev status` 查看，`npx astro dev stop` 停止。

## 已实现

- AI 技术突破、模型演进、Agent 应用三条共用时间轴的主线。
- 109 个事件、46 个实体（13 个概念、15 个产品、18 个模型家族），86 份来源。
- 全球/中国团队、关键词、年份、主线、关键节点/全部已收录筛选；URL 保存状态及选中事件。
- 历史总览、年份窗口、前后导航、缩放、拖动平移和可用键盘调整的范围滑块。
- 密集节点自动聚合，数量明确标注，右侧可逐条选择组内事件；不静默丢弃条目。
- 桌面右侧阅读区、窄屏下方详情，原始来源、独立事件页和模型版本变化页。
- 概念、产品、模型家族详情与事件列表。
- 同次发布关联、概念与产品关系、模型比较基线与限制说明。
- 深链接、复制事件 URL、返回原时间线位置、空结果和 404 页面。

## 验证与构建

```sh
npm run check       # TypeScript 与 Astro 检查
npm test            # 日期精度、筛选、URL 往返与数据关联测试
npm run validate    # 数据引用、日期、来源及模型变化结构校验
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
src/data/types.ts       数据类型
src/data/events.ts      事件与模型版本变化
src/data/global.ts      全球补充资料、模型与 Agent 产品
src/data/entities.ts    概念、产品、家族与关系
src/data/sources.ts     共享来源目录
src/lib/timeline.ts     筛选、日期和 URL 逻辑
src/lib/atlas.ts        横向时间轴、区域分类、聚合与窗口状态
src/lib/validate.ts     数据图校验
src/components/        时间线与事件详情
src/pages/             静态路由
src/styles/            响应式样式
tests/                 逻辑测试
docs/                  调研与方案
```

## 添加内容

1. 在 `sources.ts` 添加具体论文、公告或档案，不用机构主页代替事件依据。
2. 如需新产品、概念或家族，在 `entities.ts` 添加稳定英文 ID、说明与来源。
3. 在 `events.ts` 添加事件，关联实体与来源；日期保留 `YYYY`、`YYYY-MM` 或 `YYYY-MM-DD` 的真实精度。
4. 模型事件必须有 `change`，明确比较基线、变化、限制、证据类别与来源；有已收录前代时使用 `baselineEventId`。
5. 同一公告中的多个事件使用 `announcementGroup`；实体关系同样需要来源。
6. 运行校验、测试与构建，预览事件及其相关页面。

## 内容边界

这是精选资料集，不是全行业版本数据库。内容核查日期为 2026-09-29，历史日期可能精确到年、月或日。已收录 GPT、Gemini、Llama、Claude、DeepSeek、Qwen、Kimi、GLM、MiniMax、文心、混元、盘古、Step、日日新、Mistral、Command、Falcon、Grok 的代表节点；尚未穷尽全部档位和快照。

地区筛选按已明确的团队/技术生态归类，不按产品显示语言猜测，也不是公司法律注册地清单。归属未明确或跨地区的条目保留在全球范围。横向时间轴每个事件只进入一条主轨道；模型发布优先归入模型，ReAct、Skills 等机制归入技术，ELIZA 等历史系统不作为现代 Agent 应用。

不精确日期的点位使用已知区间的中点。聚合节点的位置是组内事件位置的均值，标签展示该组日期范围；选中后显示每条记录的原始日期精度。

厂商声明不等于独立实测，模型分数不混合不同测试配置。概念页上的事件日期不代表概念发明日。部分早期历史使用机构回顾，来源类型在事件页标明。

外链会随时间变化；结构校验不等于实时外站可用性保证。新内容发布前仍需核对原资料和日期。首版记录见 `docs/verification.md`；改版设计对照见 `design-qa.md`，运行验证见 `docs/verification-v2.md`。
