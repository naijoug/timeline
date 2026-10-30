import type { Entity, Source, TimelineEvent } from './types';
const checkedAt = '2026-10-28';
const revision = '40ebe0aa6662c9d40389c2f5d565b6a2c6aebacd';
const blog = 'https://www.liquid.ai/blog/lfm3';
const model = 'https://huggingface.co/LiquidAI/LFM3-1.7B';
export const lfm3Sources: Source[] = [
  { id: 'lfm3-announcement', title: 'Introducing LFM3: Every Modality for Specialized Intelligence', publisher: 'Liquid AI', url: blog, type: '官方公告', publishedAt: '2026-10-27', checkedAt, locator: 'Introducing LFM3；tri-hybrid architecture；model family；performance and availability' },
  { id: 'lfm3-model-card', title: 'LFM3-1.7B model card', publisher: 'Liquid AI', url: `${model}/blob/${revision}/README.md`, type: '官方文档', checkedAt, version: revision, locator: 'Model details；Inference；Performance；use-case limitations' },
  { id: 'lfm3-weight-files', title: 'LFM3-1.7B · fixed-revision weight file inventory', publisher: 'Liquid AI · Hugging Face', url: `https://huggingface.co/api/models/LiquidAI/LFM3-1.7B/tree/${revision}`, type: '官方文档', checkedAt, version: revision, locator: 'model.safetensors：3,457,635,448 bytes；LFS object 135922caef64e81e52af88ede8b7c3ddaa9d6da220a9737fb3065275dbfb4330' },
  { id: 'lfm3-license', title: 'LFM Open License v1.0', publisher: 'Liquid AI', url: `${model}/blob/${revision}/LICENSE`, type: '官方文档', checkedAt, version: revision, locator: 'Threshold definition；section 5 Commercial Use' },
];
export const lfm3Entities: Entity[] = [{ id: 'lfm', name: 'Liquid Foundation Models', type: 'family', company: 'Liquid AI', description: '面向端侧和专门任务的模型家族；文本、视觉、音频及其他分支分别理解，不把家族能力都归给文本检查点。', tags: ['端侧模型', '混合架构'], sourceIds: ['lfm3-announcement'] }];
export const lfm3Events: TimelineEvent[] = [{
  id: 'lfm3-open-weights', date: '2026-10-27', dateLabel: '2026年10月27日（官方发布公告；10月28日核对权重文件）',
  title: 'LFM3 发布：端侧混合架构与专门任务模型', company: 'Liquid AI', kind: '模型发布与权重公开', tracks: ['models'], entityIds: ['lfm'], milestone: false,
  summary: 'Liquid AI 发布 LFM3 家族；已核对 1.7B 文本模型的公开权重、三种模块混合架构及专门任务定位。',
  significance: '编辑解读：这一节点补充小模型与本地部署路线，重点在可核验的权重、资源条件和使用边界，而不是按厂商分数宣布替代所有大模型。',
  limitation: '受 LFM Open License v1.0 及商业使用门槛限制，不等于无条件开源。未下载完整权重或执行推理；家族公告不意味着每个检查点都支持所有模态。',
  sourceIds: lfm3Sources.map(s => s.id), tags: ['端侧模型', '开放权重', '混合架构', '专门任务'],
  change: { baseline: 'Liquid 的端侧专门模型路线；不将不同参数规模与运行条件拼成统一性能结论', improvements: ['文本模型组合短卷积、滑动窗口注意力与全局注意力', '1.7B 文本检查点声明 256K 输入加输出上下文', '家族分别面向文本、视觉、音频等专门任务'], tradeoffs: '公开权重不等于无限制商业使用；长上下文仍消耗缓存内存，小模型并不适合所有推理或编码任务。', evidence: '厂商报告', sourceIds: ['lfm3-announcement', 'lfm3-model-card', 'lfm3-license'] },
  details: [
    { label: '经过：公告与实际文件分别核对', text: 'Liquid AI 于10月27日介绍 LFM3。10月28日核查其官方 Hugging Face 文本模型仓库为公开、无需申请访问，固定版本文件清单含约3.46 GB的 model.safetensors，而不只是模型卡或未来上传承诺。本次未下载完整文件、校验全部权重或运行模型。', sourceIds: ['lfm3-announcement', 'lfm3-weight-files'], locator: '官方公告日期；固定版本权重清单。公开访问状态为核查快照。' },
    { label: '背景：家族与单个检查点不要混写', text: '官方将基础、文本、视觉、音频、全模态与决策用途放在同一家族中。这里深入核验的是后训练文本模型 LFM3-1.7B，模型卡标注约17.3亿参数；不能把视觉或语音分支的输入输出能力直接归给它。', sourceIds: ['lfm3-announcement', 'lfm3-model-card'], locator: 'Model details；Post-trained, text-only language model' },
    { label: '技术：混合模块不是免费长上下文', text: '文本模型的24层由13层门控短卷积、5层滑动窗口注意力与6层全局注意力组成；256K窗口包括输入和输出。厂商约1 GB的4位量化描述不能当作完整运行内存承诺，缓存、上下文长度与推理框架仍影响实际占用。', sourceIds: ['lfm3-model-card', 'lfm3-announcement'], locator: 'Model details；Architecture；Context length；端侧内存测量条件' },
    { label: '适用边界：本地工具调用不等于通用编码代理', text: '模型卡将本地工具调用、结构化输出和领域微调列为用途；知识密集任务建议配合检索或搜索，并明确不推荐用于代理式编码或复杂多步推理。页面性能表属于厂商报告，本项目未复现，也不把任务集成绩推广成所有设备、语言或工作流的保证。', sourceIds: ['lfm3-model-card'], locator: 'Model details 后的用途限制；Performance' },
    { label: '许可：权重可读与商业授权分开', text: '发布采用 LFM Open License v1.0，而非 MIT 或 Apache 2.0。许可包含商业使用门槛及相关条件；部署者应阅读对应版本全文，不能仅凭可下载就推断其商业使用不受限制。此处记录许可状态，不提供个案法律判断。', sourceIds: ['lfm3-license'], locator: 'Threshold；section 5 Commercial Use' },
    { label: '编辑分析：按自己的任务验收小模型', text: '我们更建议把本地可控、专门任务正确率、端到端内存和失败回退分别测量。对固定格式任务，小模型可能值得尝试；是否有价值仍取决于真实输入与部署条件，不能由参数小或上下文长直接推出。', editorial: true, sourceIds: ['lfm3-model-card'], locator: '编辑归纳，依据用途与推理边界，不是独立性能结论' },
  ],
  recommendedResources: [{ id: 'lfm3-release-reading', title: 'Introducing LFM3: Every Modality for Specialized Intelligence', creator: 'Liquid AI', series: 'Liquid AI 官方博客', kind: 'article', url: blog, publishedAt: '2026-10-27', checkedAt, match: '结合混合架构、家族分支与端侧条件阅读，分清公告中的家族目标和具体文本检查点的能力。', scopeNote: '具体厂商技术解读，非独立评测；未运行模型或完整播放嵌入媒体。', locator: 'Architecture；model family；performance and availability' }],
}];
