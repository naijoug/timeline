import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-11-07';
const url = 'https://research.meta.ai/blog/specialized-models-for-muse-and-metaai';
const sourceIds = ['muse-specialized-announcement', 'muse-specialized-post'];
export const museSpecializedSources: Source[] = [
  { id: sourceIds[0], title: 'Bringing Specialized Models to Muse and Meta AI', publisher: 'Meta AI Research', url, type: '官方公告', publishedAt: '2026-11-06', checkedAt, locator: 'Remembering What Matters；Working Toward Your Goals；厂商内部评测图表' },
  { id: sourceIds[1], title: 'Specialized models trained using Muse Wonder', publisher: 'AI at Meta · X', url: 'https://x.com/AIatMeta/status/2118768974779634084', type: '官方公告', publishedAt: '2026-11-06', checkedAt, version: 'time datetime: 2026-11-06T18:14:23.000Z', locator: '官方账号原帖；UTC 日期与北京时间显示日期分开' },
];
export const museSpecializedEvents: TimelineEvent[] = [{
  id: 'muse-specialized-rollout', date: '2026-11-06', title: 'Muse 与 Meta AI 接入专门模型：记忆与任务恢复',
  subtitle: '产品逐步推出 · Active Memory / Active Focus',
  summary: 'Meta 宣布将使用 Muse Wonder 训练的既有模型专门版本逐步接入 Muse 与 Meta AI，扩展记忆和任务恢复能力。',
  significance: '编辑概述：把前沿能力带入日常产品，不等同于再次发布 Wonder。',
  limitation: '公告未给出精确模型 ID、API 开放或权重下载；不推定所有账号已可用，也不把厂商评测当作独立验证。本站未运行该模型。',
  company: 'Meta', kind: '产品逐步推出', tracks: ['products'], entityIds: ['muse', 'agent'], sourceIds, tags: ['记忆', '任务恢复'], milestone: false,
  details: [
    { label: '事件与日期', text: '博客日期为11月6日；原帖机器时间为2026年11月6日18:14:23 UTC，北京时间显示为11月7日。两者不是两次发布。此次更新针对产品背后的专门模型，不宣称新的通用基础模型版本。', sourceIds, locator: '官方公告相应小节与发布原帖' },
    { label: '机制：记忆与持续目标', text: '厂商描述 Active Memory 用于判断旧信息何时仍相关、何时已过时；Active Focus 用于遇到障碍后恢复或寻找替代方案。产品逐步推出不代表每个用户同时获得功能。', sourceIds, locator: '官方公告相应小节与发布原帖' },
    { label: '证据边界：厂商自报，不是榜单排名', text: '公告报告 Muse 内部记忆评测从76%至90%；未给出可复现的完整测试集，不能推广为所有任务的可靠性。API、权重及确切模型标识未在公告中提供。', sourceIds: [sourceIds[0]], locator: 'Active Memory Eval 图表及公告开放信息' },
    { label: '编辑分析：应测试失效记忆，而非只看记住多少', text: '编辑建议以约束更正、过期信息和失败恢复的小任务验收持续代理。能记住并不等于能及时忘掉错误前提；这是编辑提出的验收视角，不是对该产品的实测结论。', editorial: true, sourceIds, locator: '官方公告相应小节与发布原帖' },
  ],
  recommendedResources: [{ id: 'muse-specialized-reading', title: 'Bringing Specialized Models to Muse and Meta AI', creator: 'Meta AI Research', series: 'Meta AI Research 官方博客', kind: 'article', url, publishedAt: '2026-11-06', checkedAt, match: '对照记忆、任务恢复和评测口径，区分产品能力描述与开放状态。', scopeNote: '厂商解读，非独立评测；未提供API或权重发布依据。', locator: 'Remembering What Matters；Working Toward Your Goals' }],
}];
