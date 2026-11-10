import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-11-10';
const announcement = 'https://www.anthropic.com/claude-fable-and-mythos-5-2';
const product = 'https://www.anthropic.com/claude/fable';
const models = 'https://platform.claude.com/docs/en/models/overview';

export const claude52Sources: Source[] = [
  { id: 'claude-52-announcement', title: 'Introducing Claude Fable 5.2 and Claude Mythos 5.2', publisher: 'Anthropic', url: announcement, type: '官方公告', publishedAt: '2026-11-09', checkedAt, locator: 'Introduction; Safety and alignment; Availability' },
  { id: 'claude-52-product', title: 'Claude Fable 5.2', publisher: 'Anthropic', url: product, type: '官方文档', checkedAt, version: '2026-11-10 核查快照', locator: 'Announcements; Availability and pricing; Benchmarks及脚注' },
  { id: 'claude-52-model-docs', title: 'Models overview', publisher: 'Anthropic', url: models, type: '官方文档', checkedAt, version: '2026-11-10 核查快照', locator: 'Compare models: Claude Fable 5.2 的 API ID、上下文和输出上限' },
];

export const claude52Events: TimelineEvent[] = [{
  id: 'claude-fable-mythos-5-2', date: '2026-11-09', dateLabel: '2026年11月9日（官方公告日）',
  title: 'Claude Fable 5.2 与 Mythos 5.2：能力升级与分级访问',
  subtitle: '同一底层模型 · 不同安全配置 · 5.1 后续版本',
  summary: 'Anthropic 更新面向复杂技术工作的 Claude 旗舰模型；Fable 5.2 当天上线，Mythos 5.2 仍通过验证项目提供访问。',
  significance: '编辑概述：模型迭代同时涉及任务能力、成本和安全配置；使用者需要按实际准入条件比较版本。',
  limitation: '不是两个独立架构，也不是开放权重发布。能力与速度属于厂商报告；本站未调用 API、复现评测或通读系统卡，不将低风险判断当作安全保证。',
  tracks: ['models'], company: 'Anthropic', entityIds: ['claude'],
  sourceIds: claude52Sources.map(source => source.id), kind: '模型发布', milestone: true,
  announcementGroup: 'claude-5-2', tags: ['编程', '推理', '分级访问', '成本'],
  change: {
    baseline: 'Claude Fable 5.1 / Mythos 5.1', baselineEventId: 'claude-fable-mythos-5-1',
    improvements: ['厂商报告编程、推理与视觉改善，输出速度最高提升30%', 'Fable标准输入/输出单价从每百万token 10/50美元降至8/40美元'],
    tradeoffs: '最高速度提升不等于每项任务同幅提速；安全回退与受限准入仍影响可完成任务，快速模式单独计价。',
    evidence: '厂商报告', sourceIds: ['claude-52-announcement', 'claude-52-product'],
  },
  details: [
    { label: '同一模型，不同准入', text: '官方说明两者共享底层模型。Fable带有网络安全与生物领域防护；相关专业组织可申请Mythos验证项目。公告日期与产品页索引均为11月9日，未核实精确发布时刻或各地区上线时刻。', sourceIds: ['claude-52-announcement', 'claude-52-product'], locator: 'Introduction; Availability; Announcements' },
    { label: '价格与速度分别看', text: 'Fable标准输入/输出为每百万token 8/40美元；快速模式为16/80美元，厂商称生成速度最高为常规模式的2.5倍。后者不是相对5.1的30%提升，也不是完整任务总费用；缓存、地域和渠道条件另查。', sourceIds: ['claude-52-product'], locator: 'Availability and pricing' },
    { label: '接口规格不是实际能力保证', text: '本轮模型文档列出claude-fable-5-2，支持文本与图像输入、文本输出；上下文1M token，最大输出128K token。额度表示接口边界，不保证模型可靠使用整段上下文或完成任意长任务。', sourceIds: ['claude-52-model-docs'], locator: 'Compare models' },
    { label: '评测与安全的阅读边界', text: '产品页表格混合不同effort和防护配置；CyScenarioBench脚注说明各实验室任务不同，因此不据此制作跨厂商胜负排行。本文未逐项复核系统卡；实际部署仍须评估工具权限、数据保留和失败恢复。', sourceIds: ['claude-52-product'], locator: 'Benchmarks及脚注', editorial: true },
  ],
  recommendedResources: [
    { id: 'claude-52-announcement-reading', title: 'Fable 5.2 / Mythos 5.2 发布公告', creator: 'Anthropic', kind: 'article', url: announcement, publishedAt: '2026-11-09', checkedAt, match: '了解同一模型的安全配置与访问条件。', scopeNote: '厂商公告；未独立复现能力演示或系统卡评测。', locator: 'Introduction; Availability' },
    { id: 'claude-52-models-reading', title: 'Claude 模型规格对照', creator: 'Anthropic', kind: 'article', url: models, checkedAt, match: '核对API标识、输入输出类型和token上限。', scopeNote: '动态文档，取11月10日快照；不等于账户实际准入或任务可靠性。', locator: 'Compare models' },
  ],
}];
