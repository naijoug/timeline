# AI 时间线覆盖报告

本轮研究核查日期：2026-09-30。运行 `npm run report:ai` 从实际数据重新生成本报告。

## 收录范围

当前共 242 个事件、68 个对象、196 份来源；本轮新增 133 条，并把已存在的 BERT、GPT-3 论文归入模型主轨道，保留原事件 ID。

| 主线 | 全部已收录 | 关键节点 | 中国团队筛选 |
| --- | ---: | ---: | ---: |
| AI 技术突破 | 49 | 25 | 0 |
| 模型演进 | 142 | 74 | 58 |
| Agent 应用 | 51 | 34 | 9 |

“当前显示”受时间窗口、关键词、地区、主线和关键节点筛选共同影响；页面同时显示全库和每轨总数。聚合不删除事件，打开组内目录可逐条阅读。

## 研究与日期规则

- 优先使用论文、官方单篇公告、官方仓库和有日期的更新日志；不把媒体转述或搜索摘要的推测写成已确认事实。
- 原始论文、研究预览、公告、权重开放、API 开放和正式开放分别标记；不以模型名称中的快照日期代替发布日期。
- Replit 首发只记 2024-09；Qwen2.5-VL 与 Qwen3-Coder 保留月份。Qwen3.5 采用仓库权重开放日 2026-02-16，而非更早的博客元数据。
- Opus 4.5 公告为 2025-11-24；DeepSeek-V3-0324 的更新公告为 2025-03-25；Kimi k1.5 论文首稿为 2025-01-22。
- Manus Browser Operator 的 2025-11-18 公告与 11 月 22 日全量开放分开说明。Seedance 2.0 使用发布说明日期，不推断更早的灰度上线日。
- Cowork 原文已重定向到当前产品页面。2026-01-12 来自官方博客历史目录的搜索索引；仅收录当时公告的工作方向，后续功能不倒填。
- 模型记录包含比较基线、变化和限制；只对已有且相同家族的前代建立链接。首个已收录版本不自动宣称为公司最早模型。
- “为什么重要”是编辑解读。模型提升引用论文或厂商报告，未进行独立性能实测，也不拼接不同评测设置的排名。
- 同页发布模型与产品时保留两条事件、关联同次公告，共用一个来源；多个模型尺寸通常作为系列事件，不靠拆尺寸凑数量。

## 尚未穷尽的范围

本轮重点补齐语言、推理、编码模型及 Agent 的公开演进，增加视觉、图像和视频生成代表路线。全球覆盖包括中国、美国、欧洲、加拿大、阿联酋、日本和韩国团队；这不等于覆盖每家公司、每个地区或每个快照。

- 文心、混元、盘古、Step、日日新、Falcon 等仍以代表节点为主；微软 Phi、IBM Granite、更多地区语言模型及垂直模型值得下一批系统研究。
- 视觉、音频、视频、具身与世界模型当前只收录部分代表事件，尚未形成各系列的完整版本链。
- Agent 框架如 AutoGen、LangGraph、CrewAI 应按方法/开发框架单独整理，不直接当作面向用户的应用来增加数量。
- Manus 最初邀请测试的精确一手发布时间、本轮未核实的产品小版本暂不补猜。已有多个后续重要升级可追踪。
- 资料截至本次核查；外链可能跳转或改写。OpenAI 部分公告拒绝普通 HTTP 抓取，采用可读取的官方网页索引交叉核对；结构测试不等于实时外链全部可访问。

## 按对象的覆盖

| 对象 | 团队 | 主轨事件数 | 最早已收录 | 最近已收录 |
| --- | --- | ---: | --- | --- |
| AutoGLM | 智谱 | 2 | 2024-10-28 | 2025-12-11 |
| BERT | Google | 1 | 2018-10 | 2018-10 |
| Claude | Anthropic | 20 | 2023-03-14 | 2026-09-28 |
| Claude Code | Anthropic | 4 | 2025-02-24 | 2026-02-05 |
| Claude Cowork | Anthropic | 1 | 2026-01-12 | 2026-01-12 |
| CLIP | OpenAI | 1 | 2021-01-05 | 2021-01-05 |
| Codex | OpenAI | 5 | 2025-04-16 | 2026-02-02 |
| Command | Cohere | 2 | 2024-03 | 2025-03-13 |
| Cue | Manus | 1 | 2026-09 | 2026-09 |
| Cursor Agent | Cursor | 4 | 2024-11-24 | 2025-10-29 |
| DALL·E | OpenAI | 1 | 2021-01-05 | 2021-01-05 |
| DeepSeek | DeepSeek | 14 | 2024-01-25 | 2026-09-10 |
| Devin | Cognition | 2 | 2024-03 | 2025-04-03 |
| ERNIE / 文心 | 百度 | 1 | 2025-06-30 | 2025-06-30 |
| EXAONE | LG AI Research | 1 | 2024-08-07 | 2024-08-07 |
| Falcon | TII | 1 | 2023-09-06 | 2023-09-06 |
| FLUX | Black Forest Labs | 1 | 2024-08-01 | 2024-08-01 |
| Gemini | Google | 6 | 2023-12-06 | 2026-02-19 |
| Gemini CLI | Google | 1 | 2025-06-25 | 2025-06-25 |
| Gemma | Google | 3 | 2024-02-21 | 2025-03-12 |
| Generative Agents | Stanford / Google Research | 1 | 2023-04-07 | 2023-04-07 |
| GitHub Copilot | GitHub | 1 | 2025-05-19 | 2025-05-19 |
| GLM | 智谱 | 9 | 2025-07-28 | 2026-08-26 |
| GPT | OpenAI | 25 | 2018-06-11 | 2026-09-29 |
| Grok | xAI | 5 | 2024-08-13 | 2026-09-21 |
| Grok Bot | xAI | 1 | 2026-08-11 | 2026-08-11 |
| Hunyuan / 混元 | 腾讯 | 1 | 2025-03-21 | 2025-03-21 |
| Jules | Google | 2 | 2025-05-20 | 2025-08-06 |
| Kimi | 月之暗面 | 6 | 2025-01-22 | 2026-07-16 |
| Kimi Agent | 月之暗面 | 2 | 2025-09-26 | 2026-01-27 |
| Llama | Meta | 7 | 2023-02-24 | 2025-04-05 |
| Manus | Manus | 8 | 2025-07-31 | 2026-09 |
| Manus Studio | Manus | 1 | 2026-09 | 2026-09 |
| MiniMax | MiniMax | 4 | 2025-06-16 | 2026-02-12 |
| MiniMax Agent | MiniMax | 2 | 2025-06-19 | 2025-10-27 |
| Mistral | Mistral AI | 7 | 2023-09-27 | 2025-12-09 |
| Mistral Vibe | Mistral AI | 1 | 2025-12-09 | 2025-12-09 |
| Muse | Meta | 1 | 2026-09 | 2026-09 |
| OpenHands / OpenDevin | OpenHands 社区 | 1 | 2024-07-23 | 2024-07-23 |
| Operator / ChatGPT agent | OpenAI | 3 | 2025-01-23 | 2025-07-17 |
| Pangu / 盘古 | 华为 | 1 | 2025-06-30 | 2025-06-30 |
| Qwen / 通义千问 | 阿里巴巴 | 14 | 2024-02-04 | 2026-08-12 |
| Qwen Code | 阿里巴巴 | 1 | 2025-07 | 2025-07 |
| Replit Agent | Replit | 4 | 2024-09 | 2026-03-11 |
| Sakana Evo 系列 | Sakana AI | 1 | 2024-03-21 | 2024-03-21 |
| Seed / 豆包基础模型 | 字节跳动 | 3 | 2025-05-13 | 2026-06-23 |
| Seedance | 字节跳动 | 2 | 2025-12-16 | 2026-02-12 |
| SenseNova / 日日新 | 商汤 | 1 | 2025-04-10 | 2025-04-10 |
| Stable Diffusion | Stability AI | 1 | 2022-08-22 | 2022-08-22 |
| Step | 阶跃星辰 | 1 | 2025-07-31 | 2025-07-31 |
| SWE-agent | Princeton / Stanford | 1 | 2024-05-06 | 2024-05-06 |
| T5 | Google | 1 | 2019-10-23 | 2019-10-23 |
| TRAE | 字节跳动 | 1 | 2025-07-17 | 2025-07-17 |
| UI-TARS | 字节跳动 | 1 | 2025-01 | 2025-01 |
| Wan / 通义万相 | 阿里巴巴 | 1 | 2025-02-25 | 2025-02-25 |

## 本轮新增事件与原始依据

| 日期 | 事件 | 事件口径 | 原始来源 |
| --- | --- | --- | --- |
| 2018-06-11 | GPT：生成式语言预训练 | 模型发布 | [OpenAI](https://openai.com/index/language-unsupervised/) |
| 2019-02-14 | GPT-2：零样本任务迁移 | 模型发布 | [OpenAI](https://openai.com/index/better-language-models/) |
| 2019-10-23 | T5：统一的文本到文本模型 | 论文首发 | [Google](https://arxiv.org/abs/1910.10683) |
| 2019-11-05 | GPT-2 完整权重开放 | 权重开放 | [OpenAI](https://openai.com/index/gpt-2-1-5b-release/) |
| 2021-01-05 | CLIP：连接文本与图像 | 研究发布 | [OpenAI](https://openai.com/index/clip/) |
| 2021-01-05 | DALL·E：文字生成图像 | 研究发布 | [OpenAI](https://openai.com/index/dall-e/) |
| 2021-07-07 | Codex 代码模型论文 | 论文首发 | [OpenAI](https://arxiv.org/abs/2107.03374) |
| 2022-08-22 | Stable Diffusion 公开发布 | 权重开放 | [Stability AI](https://stability.ai/news-updates/stable-diffusion-public-release) |
| 2023-02-24 | LLaMA 首次公布 | 模型发布 | [Meta](https://ai.meta.com/blog/large-language-model-llama-meta-ai/) |
| 2023-03-14 | Claude / Claude Instant | 模型发布 | [Anthropic](https://www.anthropic.com/news/introducing-claude) |
| 2023-04-07 | Generative Agents：记忆、反思与规划 | 论文首发 | [Stanford / Google Research](https://arxiv.org/abs/2304.03442) |
| 2023-09-27 | Mistral 7B | 模型发布 | [Mistral AI](https://mistral.ai/news/announcing-mistral-7b/) |
| 2023-11-06 | GPT-4 Turbo 预览 | API 预览 | [OpenAI](https://developers.openai.com/api/docs/changelog) |
| 2023-12-06 | Gemini 1.0 | 模型发布 | [Google](https://blog.google/technology/ai/google-gemini-ai/) |
| 2024-01-25 | DeepSeek-Coder 技术论文 | 论文首发 | [DeepSeek](https://arxiv.org/abs/2401.14196) |
| 2024-02-04 | Qwen1.5 | 模型发布 | [阿里巴巴](https://qwenlm.github.io/blog/qwen1.5/) |
| 2024-02-21 | Gemma 开放模型 | 模型发布 | [Google](https://blog.google/technology/developers/gemma-open-models/) |
| 2024-02-26 | Mistral Large | 模型发布 | [Mistral AI](https://mistral.ai/news/mistral-large/) |
| 2024-03-13 | Claude 3 Haiku | 模型发布 | [Anthropic](https://www.anthropic.com/news/claude-3-haiku) |
| 2024-03-21 | EvoLLM-JP / EvoVLM-JP | 研究发布 | [Sakana AI](https://sakana.ai/evolutionary-model-merge/) |
| 2024-05-06 | SWE-agent：为 Agent 设计电脑接口 | 论文首发 | [Princeton / Stanford](https://arxiv.org/abs/2405.15793) |
| 2024-06-07 | Qwen2 | 模型发布 | [阿里巴巴](https://qwenlm.github.io/blog/qwen2/) |
| 2024-06-17 | DeepSeek-Coder-V2 技术论文 | 论文首发 | [DeepSeek](https://arxiv.org/abs/2406.11931) |
| 2024-06-27 | Gemma 2 | 模型发布 | [Google](https://blog.google/technology/developers/google-gemma-2/) |
| 2024-07-18 | GPT-4o mini | 模型发布 | [OpenAI](https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/) |
| 2024-07-23 | OpenDevin / OpenHands 平台论文 | 论文首发 | [OpenHands 社区](https://arxiv.org/abs/2407.16741) |
| 2024-07-24 | Mistral Large 2 | 模型发布 | [Mistral AI](https://mistral.ai/news/mistral-large-2407/) |
| 2024-08-01 | FLUX.1 | 模型发布 | [Black Forest Labs](https://bfl.ai/blog/24-08-01-bfl) |
| 2024-08-07 | EXAONE 3.0 研究权重开放 | 权重开放 | [LG AI Research](https://github.com/LG-AI-EXAONE/EXAONE-3.0) |
| 2024-08-13 | Grok-2 / mini 测试版 | 测试版 | [xAI](https://x.ai/news/grok-2) |
| 2024-08-29 | Qwen2-VL | 模型发布 | [阿里巴巴](https://qwenlm.github.io/blog/qwen2-vl/) |
| 2024-09 | Replit Agent 首次推出 | 产品发布 | [Replit](https://replit.com/blog/introducing-replit-agent) |
| 2024-09-05 | DeepSeek-V2.5 | 模型发布 | [DeepSeek](https://api-docs.deepseek.com/news/news0905/) |
| 2024-09-12 | o1-preview / o1-mini | 研究预览 | [OpenAI](https://openai.com/index/introducing-openai-o1-preview/) |
| 2024-09-25 | Llama 3.2：视觉与端侧 | 模型发布 | [Meta](https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/) |
| 2024-10-28 | AutoGLM：浏览器与手机 GUI Agent | 论文首发 | [智谱](https://arxiv.org/abs/2411.00820) |
| 2024-11-12 | Qwen2.5-Coder 完整系列 | 模型发布 | [阿里巴巴](https://qwenlm.github.io/blog/qwen2.5-coder-family/) |
| 2024-12 | Llama 3.3 70B | 模型发布 | [Meta](https://ai.meta.com/blog/future-of-ai-built-with-llama/) |
| 2024-12-17 | o1 开放 API | API 开放 | [OpenAI](https://developers.openai.com/api/docs/changelog) |
| 2025-01 | Qwen2.5-VL | 模型发布 | [阿里巴巴](https://qwenlm.github.io/blog/qwen2.5-vl/) |
| 2025-01-22 | Kimi k1.5 技术论文 | 论文首发 | [月之暗面](https://arxiv.org/abs/2501.12599) |
| 2025-01-23 | Operator 研究预览 | 研究预览 | [OpenAI](https://openai.com/index/introducing-operator/) |
| 2025-01-31 | o3-mini | 模型发布 | [OpenAI](https://openai.com/index/openai-o3-mini/) |
| 2025-02-02 | ChatGPT deep research | 产品发布 | [OpenAI](https://openai.com/index/introducing-deep-research/) |
| 2025-02-19 | Grok 3 推理路线公告 | 技术公告 | [xAI](https://x.ai/blog/grok-3) |
| 2025-02-25 | Wan2.1 开放视频模型 | 权重开放 | [阿里巴巴](https://github.com/Wan-Video/Wan2.1) |
| 2025-02-27 | GPT-4.5 研究预览 | 研究预览 | [OpenAI](https://openai.com/index/introducing-gpt-4-5/) |
| 2025-03-06 | QwQ-32B | 模型发布 | [阿里巴巴](https://qwenlm.github.io/blog/qwq-32b/) |
| 2025-03-12 | Gemma 3 | 模型发布 | [Google](https://blog.google/technology/developers/gemma-3/) |
| 2025-03-13 | Command A | 模型发布 | [Cohere](https://docs.cohere.com/changelog/command-a) |
| 2025-03-25 | DeepSeek-V3-0324 更新公告 | 模型发布 | [DeepSeek](https://api-docs.deepseek.com/news/news250325/) |
| 2025-03-25 | Gemini 2.5 Pro 实验版 | 实验版 | [Google](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-model-thinking-updates-march-2025/) |
| 2025-04-03 | Devin 2.0 | 产品更新 | [Cognition](https://cognition.ai/blog/devin-2) |
| 2025-04-05 | Llama 4 Scout / Maverick | 模型发布 | [Meta](https://ai.meta.com/blog/llama-4-multimodal-intelligence/) |
| 2025-04-14 | GPT-4.1 系列 | API 开放 | [OpenAI](https://openai.com/index/gpt-4-1/)、[OpenAI](https://developers.openai.com/api/docs/changelog) |
| 2025-04-16 | o3 / o4-mini | 模型发布 | [OpenAI](https://openai.com/index/introducing-o3-and-o4-mini/) |
| 2025-05-13 | Seed1.5-VL 技术公告 | 技术公告 | [字节跳动](https://seed.bytedance.com/en/blog/first-release-of-seed-vlm-tech-report-comprehensive-solutions-for-image-video-gui-and-game) |
| 2025-05-15 | Cursor Background Agents 预览 | 早期预览 | [Cursor](https://cursor.com/changelog/0-50) |
| 2025-05-16 | Codex 云端研究预览 | 研究预览 | [OpenAI](https://openai.com/index/introducing-codex/) |
| 2025-05-21 | Devstral：软件工程模型 | 模型发布 | [Mistral AI](https://mistral.ai/news/devstral/) |
| 2025-06-04 | Cursor 1.0：后台 Agent 与 Bugbot | 产品更新 | [Cursor](https://cursor.com/changelog/1-0) |
| 2025-06-10 | Magistral：多语言推理 | 模型发布 | [Mistral AI](https://mistral.ai/news/magistral/) |
| 2025-06-25 | Gemini CLI 开源 | 开源发布 | [Google](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-cli-open-source-ai-agent/) |
| 2025-07 | Qwen3-Coder | 模型发布 | [阿里巴巴](https://qwenlm.github.io/blog/qwen3-coder/) |
| 2025-07 | Qwen Code 发布 | 开源发布 | [阿里巴巴](https://qwenlm.github.io/blog/qwen3-coder/) |
| 2025-07-09 | Grok 4 / Heavy | 模型发布 | [xAI](https://x.ai/news/grok-4) |
| 2025-07-17 | ChatGPT agent | 产品发布 | [OpenAI](https://openai.com/index/introducing-chatgpt-agent/) |
| 2025-07-17 | TRAE SOLO 模式 | 产品发布 | [字节跳动](https://www.trae.ai/blog/product_solo) |
| 2025-07-31 | Manus Wide Research | 产品更新 | [Manus](https://manus.im/blog/introducing-wide-research) |
| 2025-08-05 | Claude Opus 4.1 | 模型发布 | [Anthropic](https://www.anthropic.com/news/claude-opus-4-1) |
| 2025-08-07 | GPT-5 系列 API | API 开放 | [OpenAI](https://developers.openai.com/api/docs/models/gpt-5)、[OpenAI](https://developers.openai.com/api/docs/changelog) |
| 2025-08-11 | GLM-4.5V | 模型发布 | [智谱](https://docs.z.ai/release-notes/new-released) |
| 2025-08-21 | DeepSeek-V3.1 | 模型发布 | [DeepSeek](https://api-docs.deepseek.com/news/news250821/) |
| 2025-09-10 | Replit Agent 3 | 产品更新 | [Replit](https://replit.com/blog/introducing-agent-3-our-most-autonomous-agent-yet) |
| 2025-09-11 | Qwen3-Next | 模型发布 | [阿里巴巴](https://github.com/QwenLM/Qwen3.8) |
| 2025-09-29 | DeepSeek-V3.2-Exp | 实验版 | [DeepSeek](https://api-docs.deepseek.com/news/news250929/) |
| 2025-09-30 | GLM-4.6 | 模型发布 | [智谱](https://docs.z.ai/release-notes/new-released) |
| 2025-10-06 | Codex 正式开放 | 正式开放 | [OpenAI](https://openai.com/index/codex-now-generally-available/) |
| 2025-10-15 | Claude Haiku 4.5 | 模型发布 | [Anthropic](https://www.anthropic.com/news/claude-haiku-4-5) |
| 2025-10-16 | Manus 1.5 | 产品更新 | [Manus](https://manus.im/blog/manus-1.5-release) |
| 2025-10-20 | Claude Code 网页研究预览 | 研究预览 | [Anthropic](https://claude.com/blog/claude-code-on-the-web) |
| 2025-10-27 | MiniMax Agent 随 M2 升级 | 产品更新 | [MiniMax](https://www.minimax.io/news/minimax-m2) |
| 2025-10-27 | MiniMax-M2 | 模型发布 | [MiniMax](https://www.minimax.io/news/minimax-m2) |
| 2025-10-29 | Cursor 2.0：并行 Agent | 产品更新 | [Cursor](https://cursor.com/changelog/2-0) |
| 2025-11-06 | Kimi K2 Thinking | 模型发布 | [月之暗面](https://www.kimi.com/blog/kimi-k2-thinking) |
| 2025-11-13 | GPT-5.1 API | API 开放 | [OpenAI](https://developers.openai.com/api/docs/models/gpt-5.1)、[OpenAI](https://developers.openai.com/api/docs/changelog) |
| 2025-11-18 | Gemini 3 预览 | 预览发布 | [Google](https://blog.google/products-and-platforms/products/gemini/gemini-3-gemini-app/) |
| 2025-11-18 | Manus Browser Operator 公布 | 产品公告 | [Manus](https://manus.im/blog/manus-browser-operator) |
| 2025-11-24 | Claude Opus 4.5 | 模型发布 | [Anthropic](https://www.anthropic.com/news/claude-opus-4-5) |
| 2025-12-01 | DeepSeek-V3.2 | 模型发布 | [DeepSeek](https://api-docs.deepseek.com/news/news251201/) |
| 2025-12-01 | Manus Projects | 产品更新 | [Manus](https://manus.im/blog/manus-projects) |
| 2025-12-09 | Devstral 2 | 模型发布 | [Mistral AI](https://mistral.ai/news/devstral-2-vibe-cli/) |
| 2025-12-09 | Mistral Vibe CLI | 开源发布 | [Mistral AI](https://mistral.ai/news/devstral-2-vibe-cli/) |
| 2025-12-11 | AutoGLM-Phone 多语言版 | 产品更新 | [智谱](https://docs.z.ai/release-notes/new-released) |
| 2025-12-11 | GPT-5.2 API | API 开放 | [OpenAI](https://developers.openai.com/api/docs/models/gpt-5.2)、[OpenAI](https://developers.openai.com/api/docs/changelog) |
| 2025-12-16 | Seedance 1.5 pro | 模型发布 | [字节跳动](https://seed.bytedance.com/en/blog/sound-and-vision-all-in-one-take-the-official-release-of-seedance-1-5-pro) |
| 2025-12-22 | GLM-4.7 | 模型发布 | [智谱](https://docs.z.ai/release-notes/new-released) |
| 2025-12-23 | MiniMax-M2.1 | 模型发布 | [MiniMax](https://www.minimax.io/news/minimax-m21) |
| 2026-01-12 | Cowork：从编码走向日常工作 | 产品公告 | [Anthropic](https://claude.com/blog-category/agents) |
| 2026-01-27 | Kimi Agent Swarm 预览 | 预览发布 | [月之暗面](https://www.kimi.com/blog/kimi-k2-5) |
| 2026-01-27 | Kimi K2.5 | 模型发布 | [月之暗面](https://www.kimi.com/blog/kimi-k2-5) |
| 2026-02-02 | Codex macOS 应用 | 产品发布 | [OpenAI](https://openai.com/index/introducing-the-codex-app/) |
| 2026-02-05 | Claude Code Agent Teams 预览 | 研究预览 | [Anthropic](https://www.anthropic.com/news/claude-opus-4-6) |
| 2026-02-05 | Claude Opus 4.6 | 模型发布 | [Anthropic](https://www.anthropic.com/news/claude-opus-4-6) |
| 2026-02-12 | GLM-5 | 模型发布 | [智谱](https://docs.z.ai/release-notes/new-released) |
| 2026-02-12 | MiniMax-M2.5 | 模型发布 | [MiniMax](https://www.minimax.io/news/minimax-m25) |
| 2026-02-12 | Seedance 2.0 发布说明 | 技术公告 | [字节跳动](https://seed.bytedance.com/en/blog/seedance-2-0-official-launch) |
| 2026-02-14 | Seed2.0 | 模型发布 | [字节跳动](https://seed.bytedance.com/blog/seed-2-0-official-launch) |
| 2026-02-16 | Qwen3.5 首批权重 | 权重开放 | [阿里巴巴](https://github.com/QwenLM/Qwen3.8) |
| 2026-02-19 | Gemini 3.1 Pro 预览 | 预览发布 | [Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/) |
| 2026-02-24 | GPT-5.3-Codex API | API 开放 | [OpenAI](https://developers.openai.com/api/docs/models/gpt-5.3-codex)、[OpenAI](https://developers.openai.com/api/docs/changelog) |
| 2026-03-02 | Qwen3.5 轻量系列 | 模型发布 | [阿里巴巴](https://github.com/QwenLM/Qwen3.8) |
| 2026-03-05 | GPT-5.4 API | API 开放 | [OpenAI](https://developers.openai.com/api/docs/models/gpt-5.4)、[OpenAI](https://developers.openai.com/api/docs/changelog) |
| 2026-03-11 | Replit Agent 4 | 产品更新 | [Replit](https://replit.com/blog/introducing-agent-4-built-for-creativity) |
| 2026-04-07 | GLM-5.1 | 模型发布 | [智谱](https://docs.z.ai/release-notes/new-released) |
| 2026-04-16 | Claude Opus 4.7 | 模型发布 | [Anthropic](https://www.anthropic.com/news/claude-opus-4-7) |
| 2026-04-16 | Qwen3.6-35B-A3B | 模型发布 | [阿里巴巴](https://github.com/QwenLM/Qwen3.8) |
| 2026-04-20 | Kimi K2.6 | 模型发布 | [月之暗面](https://www.kimi.com/blog/kimi-k2-6) |
| 2026-04-24 | DeepSeek-V4 Pro / Flash 预览 | 预览发布 | [DeepSeek](https://api-docs.deepseek.com/news/news260424/) |
| 2026-04-24 | GPT-5.5 API | API 开放 | [OpenAI](https://developers.openai.com/api/docs/models/gpt-5.5)、[OpenAI](https://developers.openai.com/api/docs/changelog) |
| 2026-06-16 | GLM-5.2 | 模型发布 | [智谱](https://docs.z.ai/release-notes/new-released) |
| 2026-06-23 | Seed2.1 | 模型发布 | [字节跳动](https://seed.bytedance.com/en/blog/seed2-1-officially-released-advancing-ai-productivity) |
| 2026-07-09 | GPT-5.6：Sol / Terra / Luna | API 开放 | [OpenAI](https://developers.openai.com/api/docs/changelog) |
| 2026-07-16 | Kimi K3 公布 | 模型公告 | [月之暗面](https://www.kimi.com/blog/kimi-k3) |
| 2026-08-12 | Qwen3.8 首批权重 | 权重开放 | [阿里巴巴](https://github.com/QwenLM/Qwen3.8) |
| 2026-08-13 | DeepSeek-V4-Pro 正式版 | 正式开放 | [DeepSeek](https://api-docs.deepseek.com/news/news260813/) |
| 2026-08-18 | GLM-5.3 | 模型发布 | [智谱](https://docs.z.ai/release-notes/new-released) |
| 2026-08-26 | GLM-5.3-Flash | 模型发布 | [智谱](https://docs.z.ai/release-notes/new-released) |
| 2026-09-03 | GPT-6 Astra API | API 开放 | [OpenAI](https://developers.openai.com/api/docs/changelog) |
| 2026-09-10 | DeepSeek-V4.1-Flash | 模型发布 | [DeepSeek](https://api-docs.deepseek.com/news/news260910/) |
| 2026-09-22 | GPT-6 Sol / Luna API | API 开放 | [OpenAI](https://developers.openai.com/api/docs/changelog) |
| 2026-09-28 | Claude Sonnet 5.5 | 模型发布 | [Anthropic](https://www.anthropic.com/claude-sonnet-5-5) |
| 2026-09-29 | GPT-6.1 Sol API | API 开放 | [OpenAI](https://developers.openai.com/api/docs/changelog) |
