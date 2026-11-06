import type { Entity, Source, TimelineEvent } from './types';

const checkedAt = '2026-11-06';
const announcement = 'https://thinkingmachines.ai/news/inkling-2-small/';
const modelCard = 'https://thinkingmachines.ai/model-card/inkling-2-small/';
const previousCard = 'https://thinkingmachines.ai/model-card/inkling-small/';
const cookbook = 'https://tinker-docs.thinkingmachines.ai/cookbook/inkling/';
const effortGuide = 'https://tinker-docs.thinkingmachines.ai/cookbook/inkling/thinking-effort/';

export const inkling2SmallSources: Source[] = [
  { id: 'inkling2-small-announcement', title: 'Introducing Inkling 2 Small', publisher: 'Thinking Machines Lab', url: announcement, type: '官方公告', publishedAt: '2026-11-05', checkedAt, locator: '开篇的闭权重发布与后续开放条件；联合 RL 训练说明' },
  { id: 'inkling2-small-model-card', title: 'Inkling 2 Small Model Card', publisher: 'Thinking Machines Lab', url: modelCard, type: '官方文档', publishedAt: '2026-11-05', checkedAt, locator: '1. General information；2. Model properties；3. Methods of distribution；7. Bias, risks and limitations' },
  { id: 'inkling-small-baseline-card', title: 'Inkling-Small Model Card', publisher: 'Thinking Machines Lab', url: previousCard, type: '官方文档', publishedAt: '2026-07-30', checkedAt, locator: '1. General information；2. Model properties：前代日期、参数与音频输入' },
  { id: 'inkling-cookbook-guide', title: 'Using Inkling', publisher: 'Thinking Machines Lab · Tinker', url: cookbook, type: '官方文档', checkedAt, version: '2026-11-06 文档快照', locator: 'Get started：Inkling-2-Small 模型名、renderer 与微调工作流' },
  { id: 'inkling-effort-guide', title: 'Thinking effort', publisher: 'Thinking Machines Lab · Tinker', url: effortGuide, type: '官方文档', checkedAt, version: '2026-11-06 文档快照', locator: 'Choose an effort level；Generate at a fixed effort；Behavior to keep in mind' },
];

export const inkling2SmallEntities: Entity[] = [{
  id: 'inkling', name: 'Inkling', type: 'family', company: 'Thinking Machines Lab',
  description: 'Thinking Machines Lab 面向推理、工具使用与定制的模型家族；各代输入模态和权重开放状态分别核对。',
  tags: ['MoE', '模型定制', '可变推理'], sourceIds: ['inkling-cookbook-guide', 'inkling2-small-model-card'],
}];

export const inkling2SmallEvents: TimelineEvent[] = [{
  id: 'inkling-2-small-release', date: '2026-11-05',
  dateLabel: '2026年11月5日（官方公告与模型卡发布日；11月6日核查）',
  title: 'Inkling 2 Small 发布：先在 Tinker 提供调用与微调',
  subtitle: '第二代 MoE · 视觉输入 · 可变推理',
  summary: 'Thinking Machines Lab 发布 Inkling 2 Small，在 Tinker 提供推理、微调与 Playground 访问；发布初期仍为闭权重。',
  significance: '编辑概述：这一节点补充可定制模型的演进，观察重点是任务适配与开放进程，而非仅凭参数规模或发布榜单判断通用领先。',
  limitation: '截至本次核查，Apache 2.0 开放权重仍是附条件的后续计划，不是已完成开源。本站未调用模型、执行微调或独立复测。',
  company: 'Thinking Machines Lab', kind: '模型与 API 发布', tracks: ['models'], entityIds: ['inkling'],
  sourceIds: inkling2SmallSources.map(source => source.id), tags: ['MoE', '视觉输入', '可变推理', '模型定制'], milestone: false,
  change: {
    baseline: 'Inkling-Small（2026年7月30日发布的前代；本站尚未单独收录，不建立前代事件链接）',
    improvements: ['MoE 规模由前代 276B 总参数、12B 激活变为 594B 总参数、17B 激活', '厂商报告改用联合 RL 训练，以加强长程编码等任务'],
    tradeoffs: '规模变化本身不证明性能提升；前代支持音频输入，本代不支持。权重尚未开放，不能直接按前代 Apache 2.0 许可部署。',
    evidence: '厂商报告', sourceIds: ['inkling-small-baseline-card', 'inkling2-small-model-card', 'inkling2-small-announcement'],
  },
  details: [
    { label: '背景：同一家族不等于能力与许可相同', text: '前代 Inkling-Small 的模型卡记载7月30日发布、276B 总参数和12B 激活参数，并列出文本、图像、音频输入及 Apache 2.0 许可。这些属于前代，不能直接沿用到 Inkling 2 Small。', sourceIds: ['inkling-small-baseline-card'], locator: 'General information；Model properties' },
    { label: '经过：服务先行，权重开放另计', text: '11月5日公告先开放 Tinker 采样、微调及 Playground，计划在完成外部安全测试与红队测试后于下一周按 Apache 2.0 开放权重；检查点下载也须等待权重发布。当前模型卡许可仍为 Tinker Terms of Use。', sourceIds: ['inkling2-small-announcement', 'inkling2-small-model-card'], locator: '公告开篇；模型卡 License 与 Methods of distribution' },
    { label: '技术：稀疏激活与输入输出边界', text: '模型卡列出48层解码器、每 token 从384个专家中选择8个，使用局部与全局注意力。总参数594B、每 token 激活17B；接收文本和图像，输出文本，不支持音频输入。激活参数不等于完整权重的存储规模。', sourceIds: ['inkling2-small-model-card', 'inkling-cookbook-guide'], locator: 'Model properties；Using Inkling 首段的家族模态区分' },
    { label: '使用：模型标识与推理控制', text: 'Cookbook 使用 thinkingmachines/Inkling-2-Small，并通过 renderer 构造输入。effort 接受大于等于0、小于1的有限浮点数，默认0.9；它与 max_tokens 分开控制。设为0只是倾向不推理，并非强制关闭；增大 effort 也不保证每次回答更准确。', sourceIds: ['inkling-cookbook-guide', 'inkling-effort-guide'], locator: 'Get started；Choose an effort level；Behavior to keep in mind' },
    { label: '限制：可调用不等于任务已验证', text: '模型卡提醒仍可能产生幻觉、未精确遵守指令，或在较长的多轮对话中退化。开发者需对自己的语言、任务和使用人群做验证；这里没有把厂商实验或演示当作生产工作流成功率。', sourceIds: ['inkling2-small-model-card'], locator: '7. Bias, risks and limitations' },
    { label: '编辑分析：先验证适配，再判断迁移', text: '可以先在同一任务集上比较正确率、工具误用、推理预算与微调收益，并单独检查原有音频流程是否还成立。服务试用与自托管准备应分开推进，等权重和适用许可实际发布后再评估部署。以上是编辑建议，不是独立评测结论。', editorial: true, sourceIds: ['inkling2-small-model-card', 'inkling-effort-guide', 'inkling-small-baseline-card'], locator: '依据模态差异、部署状态与 effort 文档作编辑归纳' },
  ],
  recommendedResources: [
    { id: 'inkling2-small-cookbook-reading', title: 'Using Inkling', creator: 'Thinking Machines Lab', series: 'Tinker Cookbook', kind: 'article', url: cookbook, checkedAt, match: '从具体模型名与 renderer 入口理解接入方式，再沿链接阅读图像输入与训练示例。', scopeNote: '动态官方指南；本站未执行示例或发起付费调用。', locator: 'Get started；Learn more' },
    { id: 'inkling2-small-effort-reading', title: 'Thinking effort', creator: 'Thinking Machines Lab', series: 'Tinker Cookbook', kind: 'article', url: effortGuide, checkedAt, match: '重点读 effort 与输出预算的区别，以及生成和监督微调如何保持相同设置。', scopeNote: '实现与调参指南，不是独立横评；较大 effort 不是单次质量保证。', locator: 'Generate at a fixed effort；Supervised fine-tuning；Behavior to keep in mind' },
  ],
}];
