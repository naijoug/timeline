import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-11-09';
const articleUrl = 'https://www.anthropic.com/research/components-of-agent-memory';
const cookbookUrl = 'https://platform.claude.com/cookbook/managed-agents-cma-dreaming-with-a-dynamic-workflow';

export const agentMemorySources: Source[] = [
  { id: 'anthropic-agent-memory-components', title: 'The components of agent memory', publisher: 'Lance Martin / Anthropic', type: '工程文章', url: articleUrl, publishedAt: '2026-11-06', checkedAt, locator: 'Memory notes；Dreaming can build new memory representations；Thinking backward, looking forward' },
  { id: 'anthropic-dreaming-workflow-cookbook', title: 'Dreaming with a dynamic workflow', publisher: 'Brad Abrams / Anthropic', type: '官方文档', url: cookbookUrl, publishedAt: '2026-11-02', checkedAt, locator: 'Published on November 2, 2026；Dreams research preview；Prerequisites and setup；1. Load your sessions；只读挂载说明' },
];

export const agentMemoryEvents: TimelineEvent[] = [{
  id: 'anthropic-agent-memory-components', date: '2026-11-06', dateLabel: '2026年11月6日（工程文章公开日）',
  title: 'Anthropic 公开 Agent 记忆组件评估', company: 'Anthropic', kind: '工程评估公开',
  tracks: ['methods'], entityIds: ['agent', 'context', 'harness'], milestone: false,
  summary: 'Anthropic 讨论跨会话文件记忆、离线整理与检索的组合，并报告特定任务中的收益和失败。',
  significance: '编辑解读：把“记得更多”拆成信息选择、纠错和检索问题，更便于设计可检查的长任务系统。',
  limitation: '厂商评估，不是普遍持续学习或安全保证；本站未运行示例或独立复现。',
  sourceIds: agentMemorySources.map(s => s.id), tags: ['Agent', '记忆', '上下文工程', 'dreaming', '检索'],
  details: [
    { label: '机制：跨会话上下文，不是权重训练', text: '这里的记忆是供后续会话读取的上下文，不包括权重更新、单会话内学习或上下文压缩。离线整理可校正笔记、组织 wiki，再配合检索。', sourceIds: ['anthropic-agent-memory-components'], locator: 'Memory notes；Dreaming can correct memory；Dreaming can build new memory representations' },
    { label: '评估：25题的评分条件，不是成功率', text: '企业文档评估含25题。随着 wiki 扩充，搜索加 wiki 的总评分由54%升至61%，纯搜索为53%。百分比对应评分条件满足程度，不能当作任务成功率。', sourceIds: ['anthropic-agent-memory-components'], locator: 'Dreaming can build new memory representations；Figure 10' },
    { label: '局限：记忆也会出错和过时', text: '法律任务中 wiki 并非普遍有效。笔记可能错误或过时，维护还需计算资源；材料被载入也不保证模型遵循。', sourceIds: ['anthropic-agent-memory-components'], locator: 'Dreaming can build new memory representations；Dreaming can promote notes up the memory hierarchy；Thinking backward, looking forward' },
    { label: '日期与开放阶段：示例早于本次文章', text: '配套 Cookbook 已于11月2日公开，不能把11月6日写成 dreaming 首次推出。示例要求 Managed Agents beta 访问，并将 Dreams 标为 research preview；默认输入为虚构项目的合成日志，后续会话只读挂载整理后的记忆。这里不记录新模型、API 正式开放或权重发布。', sourceIds: ['anthropic-dreaming-workflow-cookbook'], locator: '发布日期；开篇流程；Prerequisites and setup；1. Load your sessions' },
    { label: '编辑阅读建议：同时检查记住与忘掉', text: '验收时可加入用户更正、过期约束和矛盾笔记，检查系统能否回到原始依据。这个测试建议是编辑分析，不是对某款产品的实测结果。', editorial: true, sourceIds: ['anthropic-agent-memory-components'], locator: 'Dreaming can correct memory；Thinking backward, looking forward' },
  ],
  recommendedResources: [
    { id: 'agent-memory-components-reading', title: '阅读记忆组件评估与失败案例', creator: 'Lance Martin', series: 'Anthropic Engineering', kind: 'article', url: articleUrl, publishedAt: '2026-11-06', checkedAt, match: '对照评分口径、失败案例与维护成本。', scopeNote: '厂商工程文章；未独立复现评估，不作为通用效果保证。', locator: 'Dreaming can build new memory representations；Thinking backward, looking forward' },
    { id: 'agent-memory-workflow-reading', title: '阅读离线整理的动态工作流示例', creator: 'Brad Abrams', series: 'Claude Cookbook', kind: 'article', url: cookbookUrl, publishedAt: '2026-11-02', checkedAt, match: '了解会话日志如何成为可读取的文件记忆。', scopeNote: '示例需 beta 访问；Dreams 为研究预览。本站只核读文档，未运行代码或验证特定成本。', locator: 'How it works；Prerequisites and setup；Make it yours' },
  ],
}];
