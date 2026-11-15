import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-11-15';
const announcement = 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/';
const modelDoc = 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-hydrogen';
const modelCard = 'https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-4-Hydrogen-Model-Card.pdf';

export const geminiHydrogenSources: Source[] = [
  { id: 'gemini4-hydrogen-announcement', title: 'Introducing Gemini 4 Hydrogen', publisher: 'Google · Koray Kavukcuoglu', url: announcement, type: '官方公告', publishedAt: '2026-11-12', checkedAt, version: '公告11月12日，页面更新11月13日；不把更新日期当首次发布。', locator: '发布日期；编程与 agent 工作；Gemini 4 Hydrogen, available to everyone today 及免费用户自动选模脚注' },
  { id: 'gemini4-hydrogen-model-doc', title: 'Gemini 4 Hydrogen', publisher: 'Google Cloud Documentation', url: modelDoc, type: '官方文档', checkedAt, version: '2026-11-15 核查快照；模型版本 GA 日期与文档更新日分开。', locator: 'Model ID；Token limits；Thinking；Versions 的 GA 与 November 12, 2026' },
  { id: 'gemini4-hydrogen-model-card', title: 'Gemini 4 Hydrogen Model Card', publisher: 'Google DeepMind', url: modelCard, type: '官方文档', publishedAt: '2026-11', checkedAt, locator: 'Model Information；adapted from Gemini 4 Carbon；共享上下文；Limitations 与 Safety & Security Report 预告' },
];

export const geminiHydrogenEvents: TimelineEvent[] = [{
  id: 'gemini-4-hydrogen-release', date: '2026-11-12', dateLabel: '2026年11月12日（发布公告及企业模型 GA 日期；未取得发布小时）',
  title: 'Google 发布 Gemini 4 Hydrogen，扩展日常 agent 执行模型',
  subtitle: 'Carbon 适配模型 · 企业 GA 与消费端推广分开 · 共享输入输出预算',
  summary: 'Gemini 4 Hydrogen 面向日常编程、工具调用与多模态知识工作。企业文档将该版本列为 GA，消费端入口、订阅层级与自动选模仍有各自边界。',
  significance: '编辑解读：这一分支把模型选型问题落到执行速度、思考开销和任务交付上；可用渠道与真实工作流中的可靠性需要分别验收。',
  limitation: '这是 API 与产品渠道发布，不是开放权重发布，也不表示所有账户已无条件开通。能力与安全结论来自厂商材料；本站未调用模型、验证账户资格或独立复测。',
  company: 'Google DeepMind', kind: '模型发布与企业正式可用', tracks: ['models'], entityIds: ['gemini'],
  sourceIds: [...geminiHydrogenSources.map(source => source.id), 'gemini4-carbon-announcement', 'hydrogen-model-card'],
  tags: ['Gemini', '编程', '工具调用', '多模态', '正式可用'], milestone: false,
  change: {
    baseline: 'Gemini 4 Carbon（10月28日首次公布）；模型卡称 Hydrogen 由 Carbon 适配而来，不代表所有任务上的替代或升级',
    baselineEventId: 'gemini-4-carbon-announced',
    improvements: ['增加面向日常编程和 agent 执行的 Hydrogen 模型分支', '通过开发者、企业与消费产品入口推广，企业版本标记 GA', '提供 low、medium、high、xhigh 四档思考级别'],
    tradeoffs: '输入、思考、工具调用及最终输出共享上下文预算；更高思考级别可能增加 token 消耗，仍可能幻觉或超时。推广和厂商评测不是逐账户可用性或独立质量保证。',
    evidence: '厂商报告', sourceIds: ['gemini4-hydrogen-announcement', 'gemini4-hydrogen-model-doc', 'gemini4-hydrogen-model-card', 'gemini4-carbon-announcement'],
  },
  details: [
    { label: '背景：从 Carbon 适配，不与同名科学模型混淆', text: '官方模型卡说明 Gemini 4 Hydrogen 由 Gemini 4 Carbon 适配而来，侧重日常编程、工具调用和多模态知识工作。本条归入 Gemini 家族，与本站已有的 Deep Principle Hydrogen-1.0 科学模型分别记录，不因 Hydrogen 同名而合并实体或发布日期。', sourceIds: ['gemini4-hydrogen-announcement', 'gemini4-hydrogen-model-card', 'gemini4-carbon-announcement', 'hydrogen-model-card'], locator: '公告模型定位；模型卡 Model Information / adapted from Gemini 4 Carbon；Carbon 原始公告' },
    { label: '经过：11月12日发布，企业 GA 不等于全面推广完成', text: 'Google 公告日期为11月12日，页面另标11月13日更新；企业模型文档的 Versions 将 gemini-4-hydrogen 列为 GA，发布日同为11月12日。开发者可从 Google AI Studio、Gemini API 等入口接入；Gemini app、搜索与企业渠道的产品推广须各自核对，不能把企业模型 GA 推导为所有消费端账户已经开通。', sourceIds: ['gemini4-hydrogen-announcement', 'gemini4-hydrogen-model-doc'], locator: '公告日期与 Gemini 4 Hydrogen, available to everyone today；模型文档 Model ID / Versions' },
    { label: '访问：付费入口与免费自动选模不同', text: '公告将 Antigravity 访问限定于付费 Google AI Pro、Ultra 用户。Gemini 免费用户在适合的提示上通过自动模型选择获得访问，不应据此承诺可以手动指定 Hydrogen，或任意地区和账户都已获得相同权限。本站只记录公开说明，未登录账户测试资格。', sourceIds: ['gemini4-hydrogen-announcement'], locator: 'Gemini 4 Hydrogen, available to everyone today；免费用户 automatic model selection 脚注' },
    { label: '预算：1,048,576 是共享上限，不是两份独立额度', text: '模型文档给出的输入与输出共享预算为 1,048,576 tokens；输出包含思考、工具调用和最终回答。单个前台输出分段上限为 65,536 tokens，更长生成需要续接，并受剩余共享预算约束。因此不能把公告的简写读成独立的 1M 输入加 1M 输出；单段上限也不能当作一次长生成经续接后的总输出上限。', sourceIds: ['gemini4-hydrogen-model-doc', 'gemini4-hydrogen-model-card'], locator: 'Token limits；foreground segment / continuation；模型卡 shared input/output context' },
    { label: '控制与局限：思考强度不是可靠性保证', text: '支持 low、medium、high、xhigh 四档 thinking，high 为默认值。提高思考级别可能增加 token 消耗，模型仍可能幻觉或超时。官方模型卡中的安全评估是厂商披露，完整 Safety & Security Report 仍为后续材料，不能写成已经公开的独立安全审计。动态文档另提2027年1月12日起的 TTL 缓存控制；截至本轮核查仍属未来安排，不算本次已交付功能。', sourceIds: ['gemini4-hydrogen-model-doc', 'gemini4-hydrogen-model-card'], locator: 'Thinking；cache TTL 日期；模型卡 Limitations / Safety & Security Report' },
    { label: '编辑分析：区分单模型与编排工作流的成绩', text: '模型分支的价值应在相同任务、工具权限和交付标准下判断，记录完成质量、延迟、token 消耗与失败恢复。公告中的厂商基准和演示不能代替本站复测；Orchestrator 的多模型工作流成绩也不能归给 Hydrogen 单模型。以上是编辑归纳，不是独立评测结论或动态榜单排名。', editorial: true, sourceIds: ['gemini4-hydrogen-announcement', 'gemini4-hydrogen-model-doc'], locator: '公告基准、编程与 Orchestrator 段；依据使用边界作编辑归纳' },
  ],
  recommendedResources: [
    { id: 'gemini4-hydrogen-release-reading', title: 'Introducing Gemini 4 Hydrogen', creator: 'Koray Kavukcuoglu', series: 'Google 官方博客', kind: 'article', url: announcement, publishedAt: '2026-11-12', checkedAt, match: '先读模型定位和 Gemini 4 Hydrogen, available to everyone today，再看免费自动选模脚注，区分公布的能力与实际访问条件。', scopeNote: '核读公告正文和脚注；未运行模型、完整观看演示或复测基准。页面11月13日更新不改变本条公告日期。', locator: '模型定位；Gemini 4 Hydrogen, available to everyone today；免费用户脚注' },
    { id: 'gemini4-hydrogen-limits-reading', title: 'Gemini 4 Hydrogen', creator: 'Google Cloud Documentation', series: '企业模型文档', kind: 'article', url: modelDoc, checkedAt, match: '对照 Model ID、Token limits、Thinking 与 Versions，理解共享预算、分段续接及企业 GA 的范围。', scopeNote: '动态文档的2026年11月15日核查快照；未来日期的功能不视作已上线，未执行 API 示例。', locator: 'Model ID；Token limits；Thinking；Versions' },
  ],
}];
