import type { Entity, Source, TimelineEvent } from './types';

const checkedAt = '2026-11-06';
const announcement = 'https://www.perplexity.ai/en-GB/hub/blog/teammates-are-agents-for-complex-ongoing-work';
const post = 'https://x.com/perplexity_ai/status/2118389326459670825';
const help = 'https://www.perplexity.ai/help-center/en/articles/2026102601-perplexity-teammates';
const changelog = 'https://www.perplexity.ai/changelog/teammates-fully-local-computer-on-mac-and-voice-mode';

export const teammatesSources: Source[] = [
  { id: 'perplexity-teammates-help', title: 'Perplexity Teammates', publisher: 'Perplexity Help Center', url: help, type: '官方文档', checkedAt, version: 'Last modified November 5, 2026', locator: 'Research preview；individual Max；Enterprise资格；模型选择与credits' },
  { id: 'perplexity-teammates-announcement', title: 'Teammates are agents for complex, ongoing work', publisher: 'Perplexity', url: announcement, type: '官方公告', checkedAt, locator: '持续任务、Computer 会话协作、权限和初始开放范围；正文未显示独立发布日期' },
  { id: 'perplexity-teammates-launch-post', title: 'Introducing teammates', publisher: 'Perplexity · X', url: post, type: '官方公告', publishedAt: '2026-11-05', checkedAt, version: '帖子 time 元素：2026-11-05T17:05:47.000Z', locator: '官方账号公开宣布 Max 网页版现已可用；日期采用 UTC，不采用浏览器本地显示日期' },
  { id: 'perplexity-teammates-blog-date', title: 'Perplexity Blog · Teammates 索引条目', publisher: 'Perplexity', url: 'https://www.perplexity.ai/en-GB/hub/blog', type: '官方文档', checkedAt, version: '2026-11-06 索引快照', locator: 'Teammates 条目标为 4 Nov 2026；只用于说明日期差异，不据此认定最早上线' },
  { id: 'perplexity-teammates-changelog', title: 'Teammates, fully local Computer on Mac, and voice mode', publisher: 'Perplexity', url: changelog, type: '官方文档', publishedAt: '2026-11-06', checkedAt, locator: '11/06/26 汇总日志的 Teammates 部分；Max 网页版，持续任务与 Slack 协作' },
];

export const teammatesEntities: Entity[] = [{
  id: 'perplexity-teammates', name: 'Perplexity Teammates', type: 'product', company: 'Perplexity',
  description: '在 Computer 内承接持续工作的 Agent 产品，连接项目记忆、工具和多任务协作；与基础模型发布分开追踪。',
  tags: ['持续任务', '多 Agent', '工作协作'], sourceIds: ['perplexity-teammates-announcement'],
}];

export const teammatesEvents: TimelineEvent[] = [{
  id: 'perplexity-teammates-web-launch', date: '2026-11-05',
  dateLabel: '2026年11月5日（官方 X 宣布可用，UTC；博客索引标11月4日）',
  title: 'Perplexity Teammates 研究预览：持续工作的 Agent 队友',
  subtitle: '个人 Max 网页研究预览 · 持续任务 · Computer 与 Slack 协作',
  summary: 'Perplexity 官方宣布 Teammates 向个人 Max 用户开放网页研究预览，在 Computer 内承接持续任务、保留项目记忆，并协调会话与其他队友。',
  significance: '编辑概述：从逐次委托任务转向持续负责工作，把记忆、监测和协作连接起来；价值仍应由完成质量与可控性检验。',
  limitation: '这是研究预览，不是新基础模型、公开 API 或权重发布。企业套餐不默认包含；iOS 当时仍为后续计划；本站未订阅、运行任务或独立验证可靠性。最早实际开放日仍不能由相互不同的公告日期确定。',
  company: 'Perplexity', kind: '研究预览', tracks: ['products'], entityIds: ['perplexity-teammates', 'agent'],
  sourceIds: teammatesSources.map(source => source.id), tags: ['持续任务', '记忆', '多 Agent', 'Slack', 'Computer'], milestone: true,
  details: [
    { label: '日期口径：公开宣布可用，不推定首次上线', text: '官方 X 帖子的机器可读时间为2026年11月5日17:05:47 UTC；其内容明确表示 Max 网页版已经可用。博客索引标11月4日，汇总日志标11月6日。本站以可核对的公开宣布时间建档，保留差异，不把索引日期、读者本地时区或热榜日期当作最早开放日。', sourceIds: ['perplexity-teammates-launch-post', 'perplexity-teammates-blog-date', 'perplexity-teammates-changelog'], locator: 'X time datetime；博客条目；11/06/26 日志' },
    { label: '背景：复用 Computer 的工作基础', text: 'Teammates 建立在 Computer 已有的项目、技能和记忆之上。它把一次次会话组织成持续工作，而非另行发布一个基础模型。', sourceIds: ['perplexity-teammates-announcement'], locator: 'Computer、projects、skills 与 memory' },
    { label: '经过：监测、协调与交付', text: '官方介绍其可保留项目目标和任务历史，在情况变化时继续跟进，协调 Computer 会话及其他队友；加入 Slack 后，同事可分配工作或查询进度。这是厂商对产品能力的描述，不是本站实测。', sourceIds: ['perplexity-teammates-announcement', 'perplexity-teammates-changelog'], locator: 'ongoing work；coordination；Slack' },
    { label: '开放范围：个人 Max 的网页研究预览', text: '帮助页明确这是 research preview，仅个人 Max 网页用户可用。Pro 不包含，Enterprise Pro / Max 也不默认包含，需联系管理员。iOS 仍是后续计划；同批日志中的本地 Computer 与语音功能不能全部归给 Teammates。', sourceIds: ['perplexity-teammates-help', 'perplexity-teammates-announcement', 'perplexity-teammates-changelog'], locator: 'Who can use Teammates；research preview；各日志小节' },
    { label: '模型与用量：产品不是基础模型', text: '帮助页列默认模型为 Claude Opus 5.5，并允许更换模型；使用计入 Max 月度 credits。不能把产品名称当作新的 Perplexity 基础模型，也不能推断为无限量服务。', sourceIds: ['perplexity-teammates-help'], locator: 'Model selection；credits' },
    { label: '权限边界：隔离环境仍需人的监督', text: '公告称各队友拥有分离的环境和浏览器会话，沿用 Computer 的工具与项目权限；用户可以检查、接管或调整工作方向。环境隔离不是行动零风险的保证，也不意味着自动获得额外权限。', sourceIds: ['perplexity-teammates-announcement'], locator: 'existing tool and project permissions；separate environment；review / take over / redirect' },
    { label: '编辑分析：验收持续工作，而非只看演示', text: '持续代理值得关注的不是多开几个聊天窗口，而是任务跨天后能否记对约束、发现变化、处理失败并留下可检查的结果。编辑建议先用低风险、可撤回的小任务验收，再扩大职责；这是编辑归纳，不是独立评测结论。', editorial: true, sourceIds: ['perplexity-teammates-announcement'], locator: '基于持续任务与人工监督机制的编辑分析' },
  ],
  recommendedResources: [
    { id: 'perplexity-teammates-help-reading', title: 'Perplexity Teammates', creator: 'Perplexity', series: 'Help Center', kind: 'article', url: help, checkedAt, match: '先核对研究预览资格、企业例外、模型选择与用量，再读使用方式。', scopeNote: '动态帮助页；更新日不是独立发布日，未实际创建或运行Teammate。', locator: 'Eligibility；models；credits' },
    { id: 'perplexity-teammates-release-reading', title: 'Teammates are agents for complex, ongoing work', creator: 'Perplexity', series: 'Perplexity 官方博客', kind: 'article', url: announcement, checkedAt, match: '从持续任务、权限到首发资格，阅读产品完整工作方式。', scopeNote: '厂商说明；正文未显示独立发布日期，不能据博客索引认定最早上线。', locator: 'Computer 协作、权限与 initial launch' },
    { id: 'perplexity-teammates-changelog-reading', title: 'Teammates, fully local Computer on Mac, and voice mode', creator: 'Perplexity', series: '产品更新日志', kind: 'article', url: changelog, publishedAt: '2026-11-06', checkedAt, match: '对照 Teammates 与同批其他 Computer 功能，避免混淆客户端和开放范围。', scopeNote: '汇总日志日期不覆盖官方发布帖的 UTC 时间；不是独立使用评测。', locator: 'Teammates 小节' },
  ],
}];
