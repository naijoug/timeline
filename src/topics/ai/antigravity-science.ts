import type { Entity, Source, TimelineEvent } from './types';

const checkedAt = '2026-11-03';
const announcement = 'https://deepmind.google/blog/agentic-cheminformatics-with-google-antigravity/';
const sourceIds = ['antigravity-cheminformatics-announcement'];
export const antigravityScienceSources: Source[] = [{
  id: sourceIds[0], title: 'Agentic cheminformatics with Google Antigravity', publisher: 'Google DeepMind',
  url: announcement, type: '官方公告', publishedAt: checkedAt, checkedAt,
  locator: 'November 3, 2026; Collaborative Intelligence; limitations; Acknowledgements / Science plugin availability',
}];
export const antigravityScienceEntities: Entity[] = [{
  id: 'google-antigravity', name: 'Google Antigravity', type: 'product', company: 'Google',
  description: '可借助专业技能和本地工具组织任务的工作空间；本专题记录其科学工作流扩展，不将插件视为新基础模型。',
  tags: ['科学工作流', '工具调用'], sourceIds,
}];
export const antigravityScienceEvents: TimelineEvent[] = [{
  id: 'antigravity-cheminformatics-skills', date: checkedAt,
  dateLabel: '2026年11月3日（官方公告日；仅日精度）',
  title: 'Antigravity 发布化学信息学技能，扩展科学工作流',
  company: 'Google DeepMind', kind: '科学工作流功能发布', tracks: ['methods'],
  entityIds: ['google-antigravity', 'agent'], sourceIds, milestone: true,
  summary: 'Google DeepMind 公布 Antigravity Cheminformatics Skills，通过 Science 插件提供化学信息学工作流；这是专业工具扩展，不是新模型发布。',
  significance: '编辑解读：把专业技能、确定性工具和人机协作放进同一工作空间，让科研流程成为 Agent 应用的观察对象。',
  limitation: '仅核读官方发布材料，未安装插件或运行工作流。计算候选不是成品药物，每项设计仍须合成并经实验验证；不能据此宣称已发现新药。',
  tags: ['科学工作流', '化学信息学', '专业技能', '实验验证'],
  details: [
    { label: '发布：插件而非模型', text: '官方11月3日公告称，技能已通过 Antigravity 的 Science 插件提供，企业用户也可使用业务账号入口。这里只记录公告中的开放说明，不代表本站完成接入验收。', sourceIds, locator: 'Publication date; Acknowledgements: Science plugin / Use Business Account' },
    { label: '分工：推理与计算分别承担', text: '语言模型组织流程和科学推理，RDKit 执行确定性化学计算，并连接 ChEMBL、PubChem 资源。官方示例串联文献整理、分子配对分析、预测建模和候选设计。', sourceIds, locator: 'Opening: division of labour; Collaborative Intelligence' },
    { label: '边界：候选仍要回到实验', text: '发布方提醒，数据稀疏、跨实验室测量噪声等会限制预测精度。候选设计是待检验的假设，必须合成并实验验证；演示不构成疗效证明。', sourceIds, locator: 'Collaborative Intelligence: limitations before Acknowledgements' },
    { label: '编辑分析：工作流与结果分开评价', text: '应分别检查工具输出、来源追溯和实验结果。流程整合值得跟踪，但不能用发布演示代替独立复现或真实科研成果。', editorial: true, sourceIds, locator: '依据官方流程及实验边界的编辑归纳，非独立实测' },
  ],
  recommendedResources: [{
    id: 'antigravity-cheminformatics-reading', title: 'Antigravity 化学信息学工作流与验证边界',
    creator: 'Google DeepMind', series: 'Google DeepMind Science', kind: 'article', url: announcement,
    publishedAt: checkedAt, checkedAt, match: '对照工具分工与实验限制阅读官方流程。',
    scopeNote: '一手发布材料；未安装、运行或独立复现，不能作为药物有效性的验证。',
    locator: 'Collaborative Intelligence; limitations; Acknowledgements',
  }],
}];
