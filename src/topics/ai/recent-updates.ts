import type { Entity, Source, TimelineEvent } from './types';

// Source-reviewed updates. Each source keeps its own verification date; advancing
// the latest research date does not imply older sources were checked again.
export const recentResearchDate = '2026-10-24';

export const recentSources: Source[] = [
  {
    id: 'aa-kimi-k31-launch-evaluation', title: 'Kimi K3.1 Pro 发布评测（标题节译）',
    publisher: 'Artificial Analysis', url: 'https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks',
    type: '机构回顾', checkedAt: '2026-10-24', publishedAt: '2026-10-23',
    version: '2026-10-23 评测文章快照', locator: '标题中的 Intelligence Index 55；Additional model details → Weights and license',
  },
  {
    id: 'aa-intelligence-methodology-432', title: 'Artificial Analysis Intelligence Benchmarking Methodology',
    publisher: 'Artificial Analysis', url: 'https://artificialanalysis.ai/methodology/intelligence-benchmarking',
    type: '官方文档', checkedAt: '2026-10-24',
    version: 'Intelligence Index v4.3.2；2026-10-24 核查快照', locator: 'Artificial Analysis Intelligence Index；10 evaluations；primarily text-based, English-language evaluation suite',
  },
  {
    id: 'kimi-k3-1-pro-announcement', title: 'Introducing Kimi K3.1 Pro',
    publisher: '月之暗面', url: 'https://www.kimi.com/en/blog/kimi-k3-1-pro',
    type: '官方公告', checkedAt: '2026-10-24', publishedAt: '2026-10-24',
    locator: 'Opening announcement; Advancing the Frontier of Open Intelligence; Availability; date cross-checked in the official research index',
  },
  {
    id: 'kimi-k3-1-pro-release-date', title: 'Kimi Research: Kimi K3.1 Pro dated entry',
    publisher: '月之暗面', url: 'https://www.kimi.com/en/blog/',
    type: '官方文档', checkedAt: '2026-10-24',
    version: 'Kimi K3.1 Pro entry, 2026-10-24', locator: 'Research → Kimi K3.1 Pro → 2026-10-24',
  },
  {
    id: 'kimi-code-k3-1-pro-rollout', title: 'Kimi Code: K3.1 Pro Series is live',
    publisher: '月之暗面', url: 'https://www.kimi.com/code/docs/en/kimi-code/whats-new.html',
    type: '官方公告', checkedAt: '2026-10-24', publishedAt: '2026-10-23',
    version: 'K3.1 Pro rollout entry', locator: 'K3.1 Pro Series is live → October 23, 2026; Membership access',
  },
  {
    id: 'decisions-api-ga', title: 'Build more responsive apps with the Decisions API',
    publisher: 'OpenAI', url: 'https://openai.com/index/decisions-api/',
    type: '官方公告', checkedAt: '2026-10-23', publishedAt: '2026-10-22',
    locator: 'Opening announcement; Select the type of decision your application needs',
  },
  {
    id: 'skills-aaif', title: 'Donating Agent Skills to the Agentic AI Foundation',
    publisher: 'Anthropic', url: 'https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation',
    type: '官方公告', checkedAt: '2026-10-23', publishedAt: '2026-10-22',
    locator: 'Donating Agent Skills to AAIF; What comes next',
  },
  {
    id: 'deepseek-flash-1017-changelog', title: 'DeepSeek API Change Log: 2026-10-17',
    publisher: 'DeepSeek', url: 'https://api-docs.deepseek.com/updates/',
    type: '官方公告', checkedAt: '2026-10-23', publishedAt: '2026-10-17',
    version: '2026-10-17 update', locator: 'Date: 2026-10-17 → DeepSeek-V4.1-Flash-1017 Update',
  },
  {
    id: 'deepseek-flash-1017-card', title: 'DeepSeek-V4.1-Flash-1017 model card',
    publisher: 'DeepSeek', url: 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017',
    type: '官方文档', checkedAt: '2026-10-23',
    version: 'DeepSeek-V4.1-Flash-1017', locator: 'Introduction; benchmark table and harness footnote',
  },
  {
    id: 'aa-robotics-v01', title: 'Welcome to the era of embodied AI: Introducing AA-Robotics v0.1',
    publisher: 'Artificial Analysis', url: 'https://artificialanalysis.ai/articles/aa-robotics',
    type: '官方公告', checkedAt: '2026-10-23', publishedAt: '2026-10-14',
    version: 'v0.1 research preview', locator: 'Introducing AA-Robotics v0.1; The eight tasks; Results',
  },
  {
    id: 'aa-frontiercode-launch', title: 'Announcing FrontierCode on Artificial Analysis: can AI models write code maintainers would merge?',
    publisher: 'Artificial Analysis', url: 'https://artificialanalysis.ai/articles/frontiercode',
    type: '官方公告', checkedAt: '2026-10-23', publishedAt: '2026-10-12',
    version: 'FrontierCode 1.1 launch results, 2026-10-12', locator: 'Overview; How FrontierCode works → Methodology',
  },
];

export const recentEntities: Entity[] = [
  {
    id: 'decisions-api', name: 'Decisions API', type: 'concept', company: 'OpenAI',
    description: '面向有限答案问题的结构化决策 API，支持概率、选项与评分；不是独立 Agent 产品。',
    tags: ['API', '结构化决策'], sourceIds: ['decisions-api-ga'],
  },
  {
    id: 'ai-evaluation', name: 'AI 评测与榜单', type: 'concept',
    description: '通过任务集、执行框架和评分规则观察模型或 Agent 的能力；不同评测口径不能直接拼成统一排名。',
    tags: ['评测', '榜单', '方法论'], sourceIds: ['aa-robotics-v01', 'aa-frontiercode-launch'],
  },
];

export const recentEvents: TimelineEvent[] = [
  {
    id: 'kimi-k3-1-pro', date: '2026-10-24', title: 'Kimi K3.1 Pro 发布：强化长程编程与 Agent',
    company: '月之暗面', kind: '模型发布', tracks: ['models'],
    summary: '月之暗面发布 K3.1 系列首款模型 Kimi K3.1 Pro，支持 100 万 token 上下文，面向编程、3D 创作与长程 Agent 任务。',
    significance: '基础模型的升级继续围绕完整任务的执行质量展开，长上下文与后训练共同服务于更长的工作流程。',
    limitation: '本条按官方研究索引的 10 月 24 日记录；Kimi Code 更新日志标为 10 月 23 日，两者保留各自日期，不推断具体发布时刻。完整模型权重仍为后续计划。',
    entityIds: ['kimi'], sourceIds: ['kimi-k3-1-pro-announcement', 'kimi-k3-1-pro-release-date', 'kimi-code-k3-1-pro-rollout', 'aa-kimi-k31-launch-evaluation', 'aa-intelligence-methodology-432'],
    tags: ['编程', '长上下文', '3D 创作', 'Agent', '模型发布'], milestone: true,
    change: {
      baseline: 'Kimi K3（2026-07-16 公告）', baselineEventId: 'kimi-k3',
      improvements: ['在 K3 基础上扩大后训练，官方报告编程、3D 创作与 Agent 能力改善', '同步推出 Highspeed 版本，官方称速度约为 Pro 的 2–3 倍'],
      tradeoffs: '能力与速度提升均为厂商报告，不是本项目独立实测；百万 token 上下文并非相对 K3 新增，实际可用范围取决于渠道和套餐。',
      evidence: '厂商报告', sourceIds: ['kimi-k3-1-pro-announcement', 'kimi-code-k3-1-pro-rollout'],
    },
    details: [
      { label: '发布日期口径', text: '官方研究索引把 K3.1 Pro 列在 2026 年 10 月 24 日；Kimi Code 的上线条目标为 10 月 23 日。本条采用研究发布日，同时保留产品渠道日期。', sourceIds: ['kimi-k3-1-pro-release-date', 'kimi-code-k3-1-pro-rollout'], locator: 'Research → Kimi K3.1 Pro; K3.1 Pro Series is live → October 23, 2026' },
      { label: '已上线与待发布', text: 'Kimi、Kimi Work、Kimi Code 与 API 已上线。完整模型权重计划于 2026 年 11 月 4 日前发布，本条不记录为权重开放。', sourceIds: ['kimi-k3-1-pro-announcement'], locator: 'Availability' },
      { label: '上下文与使用范围', text: 'Kimi Code 更新日志说明：Pro 模型从 Plus / Moderato 档可用，100 万 token 上下文和 Highspeed 从 Pro / Allegretto 档开放；这不是所有套餐统一提供的额度。', sourceIds: ['kimi-code-k3-1-pro-rollout'], locator: 'Membership access' },
      { label: '第三方评测快照', text: 'Artificial Analysis 的 2026-10-23 评测文章报告 K3.1 Pro 的 Intelligence Index 得分为 55，并明确当时权重尚未公开。这是评测方在其测试设置下的报告，不是本项目复测，也不把文章时间替代模型官方研究日期。', sourceIds: ['aa-kimi-k31-launch-evaluation'], locator: '标题；Additional model details → Weights and license' },
      { label: '测量范围与版本', text: '本次核查时方法页标为 Intelligence Index v4.3.2，由 10 项评测组合，主要面向文本和英语任务；图像、语音与多语言能力另行评测。综合分数不能直接代替中文任务、特定代码库或实际产品效果的验证。', sourceIds: ['aa-intelligence-methodology-432'], locator: 'Artificial Analysis Intelligence Index：版本、评测组成与语言范围' },
      { label: '怎样阅读这个增量', text: '我们的判断是：独立评测为厂商能力声明提供了另一组观察，但不等于所有使用场景都同步改善。保留带日期的分数与方法说明比固定“第几名”更有用；持续变化的榜单排名不写成模型的永久属性。', editorial: true, sourceIds: ['aa-kimi-k31-launch-evaluation', 'aa-intelligence-methodology-432'], locator: '编辑基于评测快照与方法范围的归纳，不是评测方原话' },
    ],
    recommendedResources: [{
      id: 'kimi-k31-aa-benchmark-reading', title: 'Kimi K3.1 Pro 发布评测（标题节译）', creator: 'Artificial Analysis',
      series: 'Artificial Analysis · 模型发布评测', kind: 'article',
      url: 'https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks', publishedAt: '2026-10-23', checkedAt: '2026-10-24',
      match: '逐项查看该模型的 Agent、代码与其他测评结果，理解综合指数之外的能力差异。',
      scopeNote: '已核验文章正文；数字与标题排名是文章发布时的快照，不代表当前固定名次，也不是本项目独立实测。权重可用状态仍需以厂商后续实际发布为准。',
      locator: 'Key results；Individual eval results；Additional model details',
    }],
  },
  {
    id: 'decisions-api-ga', date: '2026-10-22', title: 'Decisions API 正式开放：把小决策接入应用',
    company: 'OpenAI', kind: '正式开放', tracks: ['methods'],
    summary: 'OpenAI 将基于 GPT-6 Luna 的 Decisions API 从公开测试推进到正式可用，用概率、选项或评分回答有限答案问题。',
    significance: '应用可以把分类、路由和下一步行动选择拆成专门的结构化决策，而非每次都生成长回答。',
    limitation: '这是 API 正式开放，不是 GPT-6 Luna 首发。速度与成本收益来自厂商报告，不能视为所有任务上的独立结论。',
    entityIds: ['decisions-api', 'agent'], sourceIds: ['decisions-api-ga'],
    tags: ['API', '结构化决策', '正式开放'], milestone: true,
    details: [
      { label: '正式开放的范围', text: '本次 GA 增加 GPT-Live 集成、提示缓存与美欧推理驻留，并将每次请求的问题上限提高到 400。', sourceIds: ['decisions-api-ga'], locator: 'Opening announcement, paragraphs 1–2' },
      { label: '输出边界', text: '开发者先定义问题与允许的答案；predicate 返回概率，choice 选择给定选项，score 按有序评分标准输出结果。', sourceIds: ['decisions-api-ga'], locator: 'Select the type of decision your application needs' },
    ],
  },
  {
    id: 'skills-aaif-donation', date: '2026-10-22', title: 'Agent Skills 捐赠给 Agentic AI Foundation',
    company: 'Anthropic', kind: '标准治理更新', tracks: ['methods'],
    summary: 'Anthropic 宣布将 Agent Skills 标准及其名称、标识、GitHub 组织和域名捐赠给 Linux Foundation 旗下的 AAIF。',
    significance: '技能包的跨平台复用进一步走向中立治理，而不只依赖最初提出它的单一厂商。',
    limitation: '这是治理变化，不是 Skills 首次发布或首次开放标准。版本发布、提案流程与安全指引属于提出的后续路线图，不能写成已经落地。',
    entityIds: ['skills', 'agent'], sourceIds: ['skills-aaif'],
    tags: ['开放标准', '互操作', '治理'], milestone: true,
    details: [
      { label: '治理与参与', text: '标准由来自多家公司的工程师以个人身份维护；使用或贡献标准不要求加入 AAIF。', sourceIds: ['skills-aaif'], locator: 'Donating Agent Skills to AAIF' },
      { label: '与既有节点的区别', text: 'Skills 的产品方案于 2025 年 10 月推出，开放标准于同年 12 月公布；本条只记录 2026 年的基金会捐赠。', sourceIds: ['skills-aaif'], locator: 'Opening paragraph; Agent interoperability through simplicity' },
    ],
  },
  {
    id: 'deepseek-v4-1-flash-1017', date: '2026-10-17', title: 'DeepSeek-V4.1-Flash-1017 更新',
    company: 'DeepSeek', kind: '模型更新', tracks: ['models'],
    summary: 'DeepSeek 将网页、App 与 deepseek-flash API 更新为 V4.1-Flash-1017，调用方式和价格不变；官方报告推理、编程、Agent 与视觉任务改善。',
    significance: '同一模型分支继续围绕任务完成质量、耗时和输出长度做效率迭代。',
    limitation: '日期来自 10 月 17 日官方更新日志，不从版本后缀推断。模型卡属于厂商评测，不同基准采用不同框架，不能合并为统一排名。',
    entityIds: ['deepseek'], sourceIds: ['deepseek-flash-1017-changelog', 'deepseek-flash-1017-card'],
    tags: ['编程', '多模态', '效率'], milestone: false,
    change: {
      baseline: 'DeepSeek-V4.1-Flash（2026-09-10）', baselineEventId: 'deepseek-v4-1-flash',
      improvements: ['官方报告多类任务表现提升，并减少任务耗时与输出长度', '官方同表报告 Terminal-Bench 4.0 从 31.2 提高到 42.3'],
      tradeoffs: 'Terminal-Bench 4.0 使用 Claude Code，DeepSWE 使用 Mini-SWE-V2；HLE 全集与纯文本子集需区分。这些成绩不是本项目的独立实测。',
      evidence: '厂商报告', sourceIds: ['deepseek-flash-1017-changelog', 'deepseek-flash-1017-card'],
    },
    details: [
      { label: '发布口径', text: '官方更新日志明确网页、App 和 API 同步更新，deepseek-flash 仍是调用名称；本条不是一个新模型家族的首次发布。', sourceIds: ['deepseek-flash-1017-changelog'], locator: 'Date: 2026-10-17 → DeepSeek-V4.1-Flash-1017 Update' },
      { label: '比较条件', text: '模型卡给出新旧版本的同表比较及执行框架脚注；仅引用其中明确说明的变化，不外推为所有工作流的收益。', sourceIds: ['deepseek-flash-1017-card'], locator: 'Introduction; benchmark table and harness footnote' },
    ],
  },
  {
    id: 'aa-robotics-v01-preview', date: '2026-10-14', title: 'AA-Robotics v0.1：让语言模型操作真实机械臂',
    company: 'Artificial Analysis', kind: '评测研究预览', tracks: ['methods'],
    summary: 'Artificial Analysis 发布 AA-Robotics v0.1 研究预览，用八项桌面任务观察五个前沿模型控制六轴机械臂的表现。',
    significance: '评测从屏幕内的回答与代码，延伸到感知、规划和物理动作共同决定的任务结果。',
    limitation: '只有八项初始任务，且模型使用不同 Agent 框架；结果反映模型与框架的组合，不是纯模型公平排名，也不代表已达到生产机器人要求。',
    entityIds: ['ai-evaluation', 'agent', 'harness'], sourceIds: ['aa-robotics-v01'],
    tags: ['评测', '具身智能', '机器人', '研究预览'], milestone: false,
    details: [
      { label: '任务与计分', text: '任务包括按按钮、倒饮料、积木整理与测量盒子等，每次尝试按完成情况给出 0–100 分，允许部分得分。', sourceIds: ['aa-robotics-v01'], locator: 'The eight tasks; Results' },
      { label: '运行框架限制', text: 'GPT、Claude、Gemini 分别运行于 Codex、Claude Code 和 Antigravity，均使用 high effort；发布方同时指出速度与成本仍不适合生产用途。', sourceIds: ['aa-robotics-v01'], locator: 'Introducing AA-Robotics v0.1; Results, harness note' },
    ],
  },
  {
    id: 'aa-frontiercode-leaderboard', date: '2026-10-12', title: 'Artificial Analysis 上线 FrontierCode 1.1 榜单',
    company: 'Artificial Analysis', kind: '独立评测榜单上线', tracks: ['methods'],
    summary: 'Artificial Analysis 上线基于 Cognition FrontierCode 1.1 的独立榜单，在同一 Stirrup 框架中评测真实开源仓库任务是否满足维护者的合并要求。',
    significance: '代码评测不只检查测试是否通过，也开始约束修改范围、无关改动和维护成本。',
    limitation: '10 月 12 日是 AA 榜单上线日；FrontierCode 于 6 月公布、1.1 于 7 月发布。该榜单不属于 AA Intelligence Index，得分与通过率也不是同一指标。',
    entityIds: ['ai-evaluation', 'harness'], sourceIds: ['aa-frontiercode-launch'],
    tags: ['评测', '榜单', '编程', '工程质量'], milestone: true,
    details: [
      { label: '统一执行条件', text: 'AA 采用 100 项私有 Main 任务，每个模型每题尝试三次，统一使用 Stirrup，每次最多 250 轮；任务得分先按尝试平均，再对任务等权平均。', sourceIds: ['aa-frontiercode-launch'], locator: 'How FrontierCode works → Methodology' },
      { label: '不把得分写成通过率', text: '上线文章中最高平均得分为 52%，对应通过率为 58%。通过率只统计满足全部阻断条件的尝试，平均得分还反映非阻断标准。', sourceIds: ['aa-frontiercode-launch'], locator: 'Overview; How FrontierCode works → Benchmark overview' },
    ],
  },
];
