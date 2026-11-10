import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-11-10';
const announcement = 'https://research.meta.ai/blog/muse-ember';
const developer = 'https://dev.meta.ai/resources/blog/build-with-muse-ember';
const model = 'https://dev.meta.ai/docs/muse-ember';
const pricing = 'https://dev.meta.ai/docs/pricing-rate-limits';

export const museEmberSources: Source[] = [
  { id: 'muse-ember-announcement', title: 'Introducing Our Smallest, Most Efficient Model: Muse Ember', publisher: 'Meta', url: announcement, type: '官方公告', publishedAt: '2026-11-09', checkedAt, locator: 'Introduction; Availability' },
  { id: 'muse-ember-developer', title: 'Start building with Muse Ember, our smallest, most efficient model', publisher: 'Meta', url: developer, type: '官方公告', checkedAt, locator: 'Introduction; Muse Ember: An execution model for everyday workflows' },
  { id: 'muse-ember-model-docs', title: 'Muse Ember — Meta Model API', publisher: 'Meta', url: model, type: '官方文档', checkedAt, version: '2026-11-10 核查快照', locator: 'At a glance; Availability' },
  { id: 'muse-ember-pricing', title: 'Pricing and rate limits — Meta Model API', publisher: 'Meta', url: pricing, type: '官方文档', checkedAt, version: '2026-11-10 核查快照', locator: 'Model pricing: Muse Ember; Pricing modes' },
];

export const museEmberEvents: TimelineEvent[] = [{
  id: 'muse-ember-release', date: '2026-11-09', dateLabel: '2026年11月9日（官方公告日）',
  title: 'Muse Ember：面向持续 Agent 工作的高效模型',
  subtitle: '高频子任务 · 多模态输入 · 按上下文长度分档计价',
  summary: 'Meta 发布面向工具调用、编程子任务与文档处理的 Muse Ember，通过 Meta Model API 和 Muse Code 提供使用。',
  significance: '编辑概述：Muse 家族增加处理高频执行任务的同系列模型，可与负责复杂规划的 Wonder 或 Spark 配合。',
  limitation: '不是 Wonder 的全面替代，也不能据此认定 Muse 消费应用同步接入或开放权重。定位与能力为厂商描述；本站未调用 API、实测吞吐或验证所有账户与地区可用性。',
  tracks: ['models'], company: 'Meta', entityIds: ['muse-models'],
  sourceIds: museEmberSources.map(source => source.id), kind: '模型发布', milestone: true,
  announcementGroup: 'muse-ember', tags: ['Agent', '多模态', '编程', '成本'],
  change: {
    baseline: 'Muse Wonder / Wonder Full 所在的 Muse 模型家族', baselineEventId: 'muse-wonder',
    improvements: ['增加面向重复执行、路由与子任务的高效同系列模型', '可与 Wonder 或 Spark 分工，由较大模型负责复杂规划'],
    tradeoffs: '这是家族分工扩展，不是所有任务上的代际升级；长上下文请求适用更高费率，接口额度不等于可靠完成任务的保证。',
    evidence: '厂商报告', sourceIds: ['muse-ember-announcement', 'muse-ember-developer'],
  },
  details: [
    { label: '高效执行，不是通用替代', text: '公告日为11月9日，精确时刻与时区未核实。Ember用于工具调用、编程子任务、路由和文档处理；复杂规划可交给Wonder或Spark，不据定位描述推断全面优于较大模型。', sourceIds: ['muse-ember-announcement', 'muse-ember-developer'], locator: 'Introduction; Muse Ember: An execution model for everyday workflows' },
    { label: '模型入口与消费产品分开', text: '模型标识muse-ember-1.0；Meta Model API仅提供Standard 模式，没有Contributor变体。Muse Code支持按量付费及全部订阅计划。这些入口不等于Muse消费应用已同步接入，也未核实下载权重。', sourceIds: ['muse-ember-model-docs'], locator: 'At a glance; Availability' },
    { label: '价格边界：200K 阈值改变整次请求费率', text: '每百万token按输入/缓存输入/输出计价：输入≤200K时为0.10/0.004/0.50美元；输入>200K时为0.30/0.012/1.50美元。阈值包含缓存与延续对话的历史输入；超过阈值后整次请求适用高档费率，不只加收超出部分。', sourceIds: ['muse-ember-pricing'], locator: 'Model pricing: Muse Ember' },
    { label: '多模态输入与接口上限', text: '文档列出文本、图像、视频、音频及PDF输入，输出文本；上下文1,048,576 token，最大输出524,288 token。支持Responses、Chat Completions和Messages接口；这些是接口规格，不是长任务准确率承诺。', sourceIds: ['muse-ember-model-docs'], locator: 'At a glance' },
  ],
  recommendedResources: [
    { id: 'muse-ember-announcement-reading', title: 'Muse Ember 发布公告', creator: 'Meta', kind: 'article', url: announcement, publishedAt: '2026-11-09', checkedAt, match: '了解高效执行模型在Muse家族中的分工。', scopeNote: '厂商公告；本文不采录不同评测口径的分数，也不把成本优势视为所有任务的保证。', locator: 'Introduction; Availability' },
    { id: 'muse-ember-pricing-reading', title: 'Meta Model API 价格与分档规则', creator: 'Meta', kind: 'article', url: pricing, checkedAt, match: '核对200K阈值、缓存费用和整次请求计价。', scopeNote: '动态价格文档，取11月10日快照；产品订阅、工具调用和渠道费用另查。', locator: 'Model pricing: Muse Ember' },
  ],
}];
