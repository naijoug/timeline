# 全球 AI 时间线：覆盖修订与改版方向

日期：2026-09-29。状态：用户已选择方案一，横向三轨改版及一批已核查的全球节点已实现。以下保留研究依据，候选清单仍不代表全部内容均已导入；当前实现与验证见 README 和 design-qa.md。

## 1. 当前问题

现有 80 个事件并不等于充分的全球覆盖。模型专题的 18 条记录中，12 条属于 Claude，4 条属于 DeepSeek，2 条属于 Grok；GPT、Gemini、Llama、Qwen 等关键路线缺失。Agent 产品页还混入 ELIZA、Roomba、Watson 等早期系统，名称和内容边界不一致。

界面问题也不只是事件数量：每个节点都有大卡片，顶部标题、侧边栏和留白占据较多空间。读者难以在一个屏幕内观察同一时期的技术、模型和应用变化。

当前页面的截图与检查记录见 [页面检查](./design-audit/report.md)。

## 2. 三条主线，三个信息层级

主导航收敛到以下内容，年代/地区/公司作为筛选条件，而不是不断增加一级时间线：

| 主线 | 应回答的问题 | 收录规则 |
| --- | --- | --- |
| AI 技术突破 | 哪种方法、架构或研究成果改变了发展方向？ | 重要理论、算法、数据集、训练范式、科学应用；包括历史上的限制与转折 |
| 模型演进 | 模型能力或可获得性发生了什么实质变化？ | 代表版本、能力跃迁、多模态、长上下文、推理、开放权重；小快照放入展开层 |
| Agent 应用 | 哪个产品让 AI 能以新的方式完成任务？ | 有具体执行工作流的编码、浏览器/电脑、研究、通用任务、个人助理产品 |

概念如 Prompt、Skills、Harness、Loop 保留为方法标签和说明页。它们不是互相取代的产品世代，不全部升为一级导航。

信息层级：

1. 全史总览：约 25–35 个跨时代精选节点，以代表性和解释力为依据，数量是界面容量建议。
2. 年代/专题：进入某一时期再显示各条主线的关键事件，支持全球、中国团队以及具体机构筛选。
3. 事件详情：完整版本变化、来源、条件与关联；常规更新归入对应产品/模型的发展史。

全球候选库可以比当前版更大，但默认视图不应把候选库铺满。不要通过限制底层数据数量解决界面拥挤。

数据上增加主分类 primaryTrack，单个事件在总览只出现一次；secondaryTags 负责交叉关联，announcementGroup 负责一次发布中的多个子事件。概念关系与时间顺序分开。

## 3. 本轮找到的一手来源与代表节点

以下是候选选题，不表示所有型号均应进入全史主线，也不表示该家族的全部版本已核验。日期指表中明确的发布或资料事件。

### 中国团队及中国技术生态

| 团队 | 已定位的代表节点 | 应关注的变化 | 一手资料 |
| --- | --- | --- | --- |
| 阿里巴巴 / Qwen | Qwen3，2025-04-29 | 思考/非思考模式、不同规模与开放权重、Agent 工具能力 | [Qwen 官方发布](https://qwenlm.github.io/blog/qwen3/) |
| DeepSeek | R1，2025-01-20；R1-0528，2025-05-28 | 推理能力、公开权重、工具使用更新 | [R1 公告](https://api-docs.deepseek.com/news/news250120/)、[0528 公告](https://api-docs.deepseek.com/news/news250528/) |
| 月之暗面 / Kimi | K2，2025-07-11 | 代码与 Agent 工具使用路线 | [官方研究索引](https://www.kimi.com/en/blog/)、[开放平台发布索引](https://platform.kimi.com/blog)；正式入库需绑定对应单篇发布 |
| 智谱 / Z.ai | GLM-4.5，2025-07-28 | 推理、代码和 Agent 能力的整合 | [官方发布](https://z.ai/blog/glm-4.5)；搜索索引可读，直接页面本轮抽取为空，入库前复核正文 |
| MiniMax | M1，2025-06-16 | 混合注意力与长上下文推理 | [官方发布](https://www.minimax.io/news/minimaxm1) |
| MiniMax | MiniMax Agent，2025-06-19 | 长任务规划与端到端执行的应用形态 | [产品发布](https://www.minimax.io/news/minimax-agent) |
| 百度 / 文心 | ERNIE 4.5 开放权重，2025-06-30 | 模型可获得性、多模态与部署生态 | [官方中文公告](https://ernie.baidu.com/blog/zh/posts/ernie4.5/)；这是开放权重日期，不等于模型最初公布日 |
| 腾讯 / 混元 | Hunyuan-T1 正式发布，2025-03-21 | 深度推理路线 | [腾讯云发布动态](https://cloud.tencent.com/product/events/detail/6702)；与此前预览及后续快照区分 |
| 字节跳动 / Seed | UI-TARS 论文，2025-01；UI-TARS-1.5，2025-04-17 | 原生 GUI Agent、电脑操作 | [Seed 官方研究索引](https://seed.bytedance.com/en/blog_list/frontier-research)、[官方模型目录](https://seed.bytedance.com/models?view_from=homepage_tab)；正式入库补单篇论文/公告 |
| 华为 / 盘古 | 7B 与 Pro MoE 72B 开放，2025-06-30 | 开放模型和推理生态 | [华为官方公告](https://www.huawei.com/cn/news/2025/7/pangu-opensource)；URL 中的月份与正文事件日不同，按正文核对 |
| 阶跃星辰 | Step3，2025-07-31 | 多模态推理与计算效率 | [官方研究文章](https://chat.stepfun.com/research/en/step3) |
| 商汤 | SenseNova V6，2025-04-10；V6.5，2025-07-27 | 多模态推理与交错思考路线 | [V6 公告](https://www.sensetime.com/cn/news/51169469)、[V6.5 公告](https://www.sensetime.com/cn/news/51169859) |

### 其他地区的重要路线

| 团队 | 已定位的代表节点 | 应关注的变化 | 一手资料 |
| --- | --- | --- | --- |
| OpenAI | GPT-4o API 发布，2024-05-13；Codex CLI，2025-04-16 | 模型能力与工具产品分线记录 | [API 更新日志](https://developers.openai.com/api/docs/changelog)；GPT-4、o 系列等仍需补完整关键节点 |
| Google / DeepMind | Gemini 1.5，2024-02-15；Gemini 2.0 实验版，2024-12-11 | 长上下文、多模态、工具连接 | [1.5 官方说明](https://blog.google/innovation-and-ai/products/long-context-window-ai-models/)、[2.0 官方发布摘要](https://blog.google/feed/gemini-jules-colab-updates/) |
| Google | Jules 公开测试，2025-05-20；正式开放，2025-08-06 | 异步云端编码 Agent | [公开测试公告](https://blog.google/innovation-and-ai/models-and-research/google-labs/jules/)、[正式开放公告](https://blog.google/innovation-and-ai/models-and-research/google-labs/jules-now-available/) |
| Anthropic | Claude 3.7 与 Claude Code，2025-02-24；Claude 4 与 Claude Code GA，2025-05-22 | 模型与产品事件拆开，减少重复占位 | [2 月公告](https://www.anthropic.com/news/claude-3-7-sonnet)、[5 月公告](https://www.anthropic.com/news/claude-4) |
| Meta | Llama 2，2023-07-18；Llama 3，2024-04-18；Llama 3.1，2024-07-23 | 可获得模型生态、多语言、上下文与工具使用 | [Llama 2](https://ai.meta.com/blog/llama-2/)、[Llama 3](https://ai.meta.com/blog/meta-llama-3)、[Llama 3.1](https://ai.meta.com/blog/meta-llama-3-1/) |
| Mistral，法国 | Mixtral 8×7B，2023-12-11 | 稀疏专家开放权重路线 | [官方发布](https://mistral.ai/news/mixtral-of-experts/) |
| Cohere，加拿大 | Command R，2024-03 | 面向企业检索与工具使用 | [发布博客](https://cohere.com/blog/command-r)、[官方 changelog](https://docs.cohere.com/changelog/command-r-retrieval-augmented-generation-at-production-scale)；两个页面日期不同，先保留月份 |
| TII，阿联酋 | Falcon 180B，2023-09-06 | 其他地区的大规模开放模型路线 | [官方公告](https://www.tii.ae/news/technology-innovation-institute-introduces-worlds-most-powerful-open-llm-falcon-180b) |
| GitHub / Microsoft | Copilot coding agent，2025-05-19 | 从 issue 到后台执行与 PR 的工作流 | [官方发布](https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/) |
| Replit | Agent v2 early access，2025-02-25 | 更自主的应用构建与实时设计预览 | [官方发布](https://replit.com/blog/agent-v2)；首次产品发布另行核对 |
| xAI | Grok Bot，2026-08-11 | 持续云电脑与后台 Agent | [官方更新日志](https://docs.x.ai/developers/release-notes)、[产品介绍](https://x.ai/bot) |
| Meta / Muse | 2026-09 官方设计介绍 | 个人 Agent、长期目标、主动跟进 | [官方设计文章](https://introducing.muse.ai/)；只明确到月份，不能补具体首发日 |
| Manus / Studio / Cue | 2026-09 产品发布 | 框架、协作创作与独立个人 Agent | [Manus 2.0 公告](https://manus.im/zh-cn/blog/introducing-manus-2-0) |

地区标签用于浏览开发团队/技术生态，不作为法律注册地或国籍断言。跨地区团队保留多地区或“跨地区”信息，尤其不按产品语言判定地区。

## 4. 需要进一步补核的方向

- Agent 应用：Cursor Agent、Devin、TRAE SOLO、Kimi Agent/OK Computer、AutoGLM/Open-AutoGLM；找到产品与研究线索后仍需分别核对首发、预览和正式开放日期。
- [Open-AutoGLM 官方仓库](https://github.com/zai-org/Open-AutoGLM)可以确认手机 Agent 的对象与形态；不能将仓库当前状态直接当作某个历史日期的状态。
- [Kimi Agent 帮助文档](https://www.kimi.com/en/help/agent/agent-overview)包含产品演进，但 K2 日期与研究博客初版日期存在口径差异：研究索引标初版 2025-07-11，帮助文档提及 2025-09-05。应区分初版与 0905 更新，不能直接照抄。
- 模型：为 GPT、Gemini、Qwen、Kimi 等补齐代表前代，版本变化必须有明确比较基线。不是给每家公司放一个名字就宣称完成全球覆盖。
- 非中美覆盖：法国、加拿大、阿联酋已定位一手材料；韩国、日本及其他地区仍需继续调查，不能宣称本轮穷尽全球。
- 全史：补充统计学习、数据集、AI for Science 和重要挫折，避免近年模型发布挤占整个历史叙事。

## 5. 什么能进入“关键节点”

候选至少能解释一种变化：新的方法范式、可验证的能力跃迁、使用门槛显著改变、独特应用工作流、广泛采用，或重要历史转折。每个候选写清 whyIncluded。

首次发布不自动等于历史里程碑；榜单第一不自动等于全面领先；同一天发布十种模型尺寸不拆成十个顶级节点；同一厂商常规快照不挤占默认视图。

模型的“提升了什么”保留三层：任务能力变化、成本/速度/开放条件变化、来源及测试条件。厂商自报的改善单独标明，不拼接不同评测设置的数字。

先广泛检索，再按同一规则筛选。用覆盖检查发现盲区，不采用简单国别配额或公司数量榜单。

## 6. 三个视觉方向

当前对话已显示三个独立设计稿。顺序按实际显示顺序：

1. 并行时间轴：白底，共用横向时间刻度与三个主题轨道，侧边阅读事件详情。
2. 编年索引：白底，紧凑行式年表、主题标签与行内展开，强调扫读。
3. 章节探索：深色，以年代章节缩小范围，再并列展示三条主题线。

设计稿是视觉方向，不是已实现页面，也不是数据依据。图中个别标注、主题归类或时间位置不能用于发布；实施时由校验过的数据生成刻度、事件和分类，尤其不得把模型发布全部归入技术突破，或将时间位置手绘后当作准确刻度。

## 7. 选定后的实施顺序

1. 保留当前已提交 MVP，按所选视觉方向修改共享布局与时间线视图。
2. 增加明确的主分类与层级；历史总览不重复显示同一事件。
3. 将已核查的全球代表节点导入，补齐家族/产品的来源和关联；未核准条目保留为研究候选。
4. 提供地区、机构、年代筛选；默认关键节点，细节按需展开。
5. 保留独立详情和原始链接，检验键盘、手机、返回导航及密集年份。

后续实施已更新应用源码与本地预览；公网发布通过独立的手动工作流执行。
