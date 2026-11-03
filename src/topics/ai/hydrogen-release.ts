import type { Entity, Source, TimelineEvent } from './types';

const checkedAt = '2026-11-03';
const announcement = 'https://blog.deepprinciple.com/introducing-hydrogen-1.0/';
const modelCard = 'https://huggingface.co/deep-principle/Hydrogen-1.0';
export const hydrogenSources: Source[] = [
  { id: 'hydrogen-announcement', title: 'Introducing Hydrogen-1.0', publisher: 'Deep Principle', url: announcement, type: '官方公告', publishedAt: '2026-11-02', checkedAt, locator: 'Scientific reasoning from an open foundation；How we train Hydrogen-1.0；Availability' },
  { id: 'hydrogen-release-date', title: '深度原理博客 · Hydrogen-1.0 发布日期', publisher: 'Deep Principle', url: 'https://blog.deepprinciple.com/zh/', type: '官方公告', checkedAt, locator: 'Hydrogen-1.0 正式发布条目：Nov 2, 2026；动态列表核查快照' },
  { id: 'hydrogen-model-card', title: 'Hydrogen-1.0 · model card and access conditions', publisher: 'Deep Principle · Hugging Face', url: modelCard, type: '官方文档', checkedAt, locator: '访问条件提示；Model details；Limitations and biases；License and attribution；Safetensors model size' },
];
export const hydrogenEntities: Entity[] = [{ id: 'hydrogen', name: 'Hydrogen', type: 'family', company: 'Deep Principle', description: '以科学任务后训练为重点的模型；1.0 基于 GLM-5.3，模型输出仍需研究者验证。', tags: ['科学模型', '领域后训练'], sourceIds: ['hydrogen-model-card'] }];
export const hydrogenEvents: TimelineEvent[] = [{
  id: 'hydrogen-1-release', date: '2026-11-02', dateLabel: '2026年11月2日（官方博客目录日期；未取得发布小时）',
  title: 'Hydrogen-1.0 发布：面向科学任务的领域后训练', company: 'Deep Principle', kind: '模型发布与受限权重访问', tracks: ['models'], entityIds: ['hydrogen'], milestone: true,
  summary: 'Deep Principle 发布基于 GLM-5.3 的科学模型 Hydrogen-1.0；将领域数据、实验记录与发现轨迹用于后训练。',
  significance: '编辑解读：将研究过程中的反馈纳入模型训练，补充通用模型之外的科学专门化路线。',
  limitation: '评测均为厂商报告，未独立复现。Hugging Face 的 BF16 权重需登录并同意分享账户信息；本次未接受条件、下载或运行。NeuroSpark API 与 Mira 仅核对公告，未实测。',
  tags: ['科学模型', '领域后训练', '实验记录', '受限权重访问'], sourceIds: hydrogenSources.map(s => s.id),
  change: { baselineEventId: 'glm-5-3', baseline: 'GLM-5.3 基础模型；此处比较科学后训练路线，不宣称通用能力全面提升', improvements: ['以化学、材料和生命科学数据进行 SFT 与 RL', '纳入实验记录与多步科学发现轨迹', '厂商报告特定科学任务评测改善'], tradeoffs: '训练数据与完整配方未随权重公开；专门任务成绩不是独立科学发现或实验安全的保证。', evidence: '厂商报告', sourceIds: ['hydrogen-announcement', 'hydrogen-model-card'] },
  details: [
    { label: '经过：日期与发布阶段分开核对', text: '官方博客目录将发布标为11月2日。公告列出权重、NeuroSpark API 与 Mira 入口；这里记录模型发布，不将公告等同于所有渠道已实测可用。', sourceIds: ['hydrogen-release-date', 'hydrogen-announcement'], locator: '博客目录 Nov 2, 2026；Availability' },
    { label: '背景：从通用基础到科学任务', text: 'Hydrogen-1.0 基于 GLM-5.3，官方训练说明结合 SFT 与 RL，并使用领域知识、实验室记录和发现轨迹。它不是从零训练的新架构。', sourceIds: ['hydrogen-announcement'], locator: 'How we train Hydrogen-1.0' },
    { label: '规格：容量声明不等于运行保证', text: '模型页显示753B参数，模型卡声明1M上下文及128K最大输出。实际预算仍受框架、服务配置与资源约束；本次没有执行推理。', sourceIds: ['hydrogen-model-card'], locator: 'Model details；Safetensors model size；Deployment' },
    { label: '访问：许可标签与下载条件不同', text: '模型卡标注 BF16 权重采用 MIT 许可，但页面要求登录并同意分享 Hugging Face 账户信息才能访问文件。本次未接受门槛，不称作匿名可下载；也未验证量化仓库文件。', sourceIds: ['hydrogen-model-card'], locator: 'You need to agree to share your Hugging Face information；License and attribution' },
    { label: '评测：保留任务与验证边界', text: '公告中的基准与科研示例属于厂商报告，不构成独立复现。模型卡提醒输出可能含事实、计算与引用错误，科学结论仍需独立验证。', sourceIds: ['hydrogen-announcement', 'hydrogen-model-card'], locator: 'Scientific scenarios in practice；Limitations and biases' },
    { label: '编辑分析：把候选答案与科学证据分开', text: '应分别验收科学问题回答、工具工作流与实验结果，而不是从单项基准推断模型已能可靠自主发现。', editorial: true, sourceIds: ['hydrogen-model-card'], locator: '编辑归纳，依据 Intended uses 与 Limitations and biases' },
  ],
  recommendedResources: [{ id: 'hydrogen-release-reading', title: 'Introducing Hydrogen-1.0', creator: 'Deep Principle', series: 'Deep Principle 官方博客', kind: 'article', url: announcement, publishedAt: '2026-11-02', checkedAt, match: '阅读科学后训练如何连接领域数据与研究过程，并区分发布声明和独立验证。', scopeNote: '厂商发布材料；未复现评测、运行模型或完整播放嵌入演示。', locator: 'How we train Hydrogen-1.0；Scientific scenarios in practice；Availability' }],
}];
