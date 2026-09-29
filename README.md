# Chronicle · AI Timeline

一个可本地运行、可静态部署的多维 AI 发展史网站。使用 Astro、React、TypeScript；无数据库、账号或运行时模型 API。

## 启动

需要 Node.js 22.12+，推荐 Node.js 22 LTS。

```sh
npm ci
npm run dev
```

打开终端显示的本地 URL，默认 http://127.0.0.1:4321/ai/。

当前 Astro 版本会在后台管理开发服务器，可用 `npx astro dev status` 查看，`npx astro dev stop` 停止。

## 已实现

- AI 全史、技术与方法、Agent 产品、模型演进四个入口。
- 80 个事件、26 个精选里程碑、23 个实体（13 个概念、7 个产品、3 个模型家族）。
- 关键词、年份、机构、对象筛选；正反时间排序；URL 保存筛选状态。
- 桌面年代索引，近年专题按月组织；手机单列布局。
- 内联展开、原始来源、独立事件页、模型版本变化页。
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

`dist/` 为静态产物，可部署到支持目录 index.html 的静态托管服务。没有绑定域名或部署到公网。构建不抓取外部资料；页面字体有系统字体回退。

## 目录

```text
src/data/types.ts       数据类型
src/data/events.ts      事件与模型版本变化
src/data/entities.ts    概念、产品、家族与关系
src/data/sources.ts     共享来源目录
src/lib/timeline.ts     筛选、日期和 URL 逻辑
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

这是精选资料集，不是全行业版本数据库。内容核查日期为 2026-09-29，历史日期可能精确到年、月或日。模型家族目前为 Claude、DeepSeek、Grok 的代表版本；尚未穷尽全部档位和快照。

厂商声明不等于独立实测，模型分数不混合不同测试配置。概念页上的事件日期不代表概念发明日。部分早期历史使用机构回顾，来源类型在事件页标明。

外链会随时间变化；结构校验不等于实时外站可用性保证。新内容发布前仍需核对原资料和日期。实现阶段的浏览器验证记录见 `docs/verification.md`。
