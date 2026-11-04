import type { Source, TimelineEvent } from './types';

const sourceIds = ['tencent-hy4-release'];
export const hy4Sources: Source[] = [{
  id: sourceIds[0], title: 'Tencent Launches Hy4', publisher: 'Tencent（PR Newswire 发布）',
  url: 'https://en.prnasia.com/releases/apac/tencent-launches-hy4-joining-the-ranks-of-the-world-s-leading-open-source-ai-models-554689.shtml',
  type: '官方公告', publishedAt: '2026-11-04', checkedAt: '2026-11-04',
  locator: '发布导语；模型能力；Delivering Greater Cost Performance',
  version: '腾讯署名新闻稿；产品可用性与评测为厂商声明，未实际调用 API 或复现基准。',
}];

export const hy4Events: TimelineEvent[] = [{
  id: 'tencent-hy4-release', date: '2026-11-04', title: '腾讯 Hy4 正式版上线产品与 API',
  company: '腾讯', kind: '模型正式发布', tracks: ['models'], entityIds: ['hunyuan'], sourceIds,
  milestone: false, tags: ['正式发布', '视觉理解', '电脑操作'],
  summary: '腾讯宣布 Hy4 正式版已接入 TokenHub、WorkBuddy、CodeBuddy 等产品，并提供 API；正式版权重与系统卡计划近日开放。',
  significance: '编辑解读：从预览到正式服务是独立阶段，产品可用与权重开放应分开记录。',
  limitation: '截至公告，正式版权重与系统卡仍是计划；未调用 API 或独立复现评测。',
  change: {
    baseline: 'Hy4 预览版（2026年8月28日已收录）', baselineEventId: 'tencent-hy4-preview',
    improvements: ['腾讯称新增视觉理解与电脑操作能力', '腾讯报告指令遵循、长上下文及长任务能力改善'],
    tradeoffs: '厂商评测不等于独立结果；预览版权重开放不代表正式版权重已开放。',
    evidence: '厂商报告', sourceIds,
  },
  details: [
    { label: '阶段：服务与权重分开', text: '公告列出腾讯产品可用入口及第三方 API 渠道；正式版权重与系统卡仍待近日发布，不能沿用预览版的开放状态。', sourceIds, locator: '发布导语与产品可用性段落' },
    { label: '评测：保留报告者', text: '能力提升与评测结论来自腾讯新闻稿。本条不据此宣称独立排名，也不将特定任务表现推广为通用可靠性。', sourceIds, locator: '模型能力与评测段落' },
  ],
}];
