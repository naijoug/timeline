import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-10-26';
export const terraSources: Source[] = [
  { id: 'terra-61-announcement', title: 'Introducing GPT-6.1 Terra', publisher: 'OpenAI', url: 'https://openai.com/index/introducing-gpt-6-1-terra/', type: '官方公告', checkedAt, publishedAt: checkedAt, locator: 'Pricing and availability; A significant step up on factuality and coding' },
  { id: 'terra-61-api-card', title: 'GPT-6.1 Terra Model', publisher: 'OpenAI', url: 'https://developers.openai.com/api/docs/models/gpt-6.1-terra', type: '官方文档', checkedAt, version: '2026-10-26 核查快照', locator: 'Model overview; Pricing; Modalities; Tools' },
  { id: 'terra-61-safety-card', title: 'Addendum to GPT-6 Astra System Card: GPT-6.1 Terra', publisher: 'OpenAI', url: 'https://deploymentsafety.openai.com/gpt-6-1-terra', type: '官方文档', checkedAt, publishedAt: checkedAt, locator: 'Published October 26, 2026; Model Data and Training; Prompt Injection; Alignment; Preparedness' },
];

export const terraEvents: TimelineEvent[] = [{
  id: 'openai-gpt-6-1-terra', date: '2026-10-26', dateLabel: '2026年10月26日（官方发布日）',
  title: 'GPT-6.1 Terra 发布：视觉推理、计算机使用与低成本档位',
  company: 'OpenAI', kind: 'API 开放', tracks: ['models'], entityIds: ['gpt'], milestone: true,
  summary: 'OpenAI 将 GPT-6.1 Terra 提供给 ChatGPT Work、Codex 及 API，面向视觉理解、计算机操作与日常编程工作。',
  significance: '编辑解读：效率档位进入重要主线，关注可完成的任务与成本，而非只追求最高单项分数。',
  limitation: '这是托管产品/API 开放，不是权重开放。成绩属于特定评测配置；本站未运行模型或复测。',
  sourceIds: terraSources.map(s => s.id), tags: ['视觉推理', '计算机使用', 'API', '成本效率'],
  change: {
    baseline: 'GPT-5.6 Terra；关联前代系列节点，不把系列所有档位视为同一性能基线', baselineEventId: 'gpt-5-6-api',
    improvements: ['厂商报告视觉推理、计算机使用和编程评测相对前代改进', '补充 GPT-6.1 系列的效率档位'],
    tradeoffs: '复杂编程仍需与 Sol / Astra 按同任务比较；推理档位、工具环境及长上下文计价都会影响成本。',
    evidence: '厂商报告', sourceIds: ['terra-61-announcement', 'terra-61-api-card'],
  },
  details: [
    { label: '经过：产品与 API 同日开放', text: '官方宣布 Plus、Pro、Enterprise、Edu 用户可在 ChatGPT Work 与 Codex 使用，API 标识为 gpt-6.1-terra。安全卡标注10月26日；未据搜索抓取或 HN 发帖推定精确上线时刻，也没有将托管访问写成开源。', sourceIds: ['terra-61-announcement', 'terra-61-safety-card'], locator: 'Pricing and availability; system-card publication date' },
    { label: '接口范围：图像输入不等于原生音视频', text: '模型卡列出1,050,000上下文窗口和128,000最大输出 tokens；支持文本输入输出、图像输入，不支持原生音频或视频。工具调用要求 Responses API；应用层处理视频的演示不能改写为模型原生视频接口。', sourceIds: ['terra-61-api-card'], locator: 'Overview; Modalities; Tool calling requires the Responses API' },
    { label: '成本边界：标准单价不是全部账单', text: '核查时标准 API 每百万 tokens 输入1美元、缓存输入0.05美元、输出5美元。超过272K输入 tokens 的整次请求有长上下文倍率；缓存写入、工具调用、Fast 等也有独立规则，因此不能把标准单价当成每项任务总成本。', sourceIds: ['terra-61-api-card'], locator: 'Pricing; cache writes; long-context adjustments; Fast mode' },
    { label: '评测与安全：配置和残余风险仍重要', text: '发布文按不同推理 effort 比较视觉、桌面操作与编程任务，不支持“所有任务胜过旗舰”的结论。安全卡另列提示注入、幻觉、权限边界和 Preparedness 评估；这是发布方披露，不是独立安全认证，更不意味着自动操作不需权限和复核。', sourceIds: ['terra-61-announcement', 'terra-61-safety-card'], locator: 'Benchmark comparisons; Prompt Injection; Hallucinations; Alignment; Preparedness' },
    { label: '编辑分析：按任务选择，而非按名字升级', text: '我们建议先用同一批可验收任务比较正确率、失败恢复、延迟和完整费用，再决定是否替换既有流程。效率模型可能适合高频工作，但涉及不可逆操作时，审批边界不应因模型更快或更便宜而放宽。', editorial: true, sourceIds: ['terra-61-api-card', 'terra-61-safety-card'], locator: '编辑归纳，依据接口、计价与安全披露范围' },
  ],
  recommendedResources: [
    { id: 'terra-61-api-reading', title: 'GPT-6.1 Terra：API 能力与计价说明', creator: 'OpenAI', series: 'OpenAI API Documentation', kind: 'article', url: 'https://developers.openai.com/api/docs/models/gpt-6.1-terra', checkedAt, match: '适合核对上下文、模态、工具接口与长上下文费用，避免只读宣传页就集成。', scopeNote: '已核对模型卡正文；没有调用 API 或测量实际成本。', locator: 'Overview; Pricing; Modalities; Tools' },
    { id: 'terra-61-safety-reading', title: 'GPT-6.1 Terra 系统卡补充说明', creator: 'OpenAI', series: 'Deployment Safety Hub', kind: 'article', url: 'https://deploymentsafety.openai.com/gpt-6-1-terra', publishedAt: checkedAt, checkedAt, match: '与发布说明配合，查看提示注入、权限遵循等部署边界，而非把能力演示视为安全保证。', scopeNote: '厂商安全披露；未独立复现测试。', locator: 'Prompt Injection; Alignment; Preparedness' },
  ],
}];
