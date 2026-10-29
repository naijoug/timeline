import type { Source, TimelineEvent } from './types';
const checkedAt = '2026-10-29';
const announcement = 'https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/';
const quickstart = 'https://github.github.io/gh-aw/setup/quick-start/';
export const agenticWorkflowSources: Source[] = [
 { id: 'github-agentic-workflows-ga', title: 'GitHub Agentic Workflows generally available', publisher: 'GitHub Changelog', url: announcement, type: '官方公告', publishedAt: '2026-10-28', checkedAt, locator: '开头；Built-in safeguards；Get started', version: '核读搜索工具返回的官方正文；直接打开深链接受工具可访问性限制。日期只确认到日，不断言20UTC后首发。' },
 { id: 'github-agentic-workflows-quickstart', title: 'GitHub Agentic Workflows Quickstart', publisher: 'GitHub', url: quickstart, type: '官方文档', checkedAt, locator: 'Prerequisites；Step 2；Step 3；Configuring authentication', version: '持续更新文档，2026-10-29核查快照。' },
];
export const agenticWorkflowEvents: TimelineEvent[] = [{
 id: 'github-agentic-workflows-ga', date: '2026-10-28', dateLabel: '2026年10月28日（官方GA公告日，未取得发布小时）', title: 'GitHub Agentic Workflows 正式可用：把代理任务接入 Actions', company: 'GitHub', kind: '产品正式发布', tracks: ['products'], entityIds: ['copilot', 'agent'], milestone: true,
 summary: 'GitHub将自然语言描述的仓库任务编译为Actions工作流，用于议题分流、故障分析和文档维护；这是工作流工具，不是新模型。',
 significance: '编辑解读：代理任务进入既有CI治理体系，配置、权限和输出审查成为与模型能力同样重要的交付条件。',
 limitation: 'Free、Team和Enterprise可使用产品，但默认Copilot CLI引擎仍需Copilot许可；正式可用不等于免费推理或无需人工验收。本次未安装工具、运行工作流或复测安全性。',
 sourceIds: ['github-agentic-workflows-ga', 'github-agentic-workflows-quickstart'], tags: ['GitHub Actions', '工作流', '编码 Agent', 'GA'],
 details: [
  { label: '经过：从预览到正式可用', text: '10月28日公告确认Agentic Workflows正式可用。Markdown任务描述转为标准Actions YAML，复用运行器与组织策略；Copilot只是可选执行引擎之一。这里记录产品阶段变化，不把它和同日Fusion模型路由发布合并。', sourceIds: ['github-agentic-workflows-ga'], locator: '开头；Additional capabilities；Get started' },
  { label: '权限：默认只读不等于没有写入', text: '公告描述默认只读执行、沙箱和防火墙，并由safe outputs校验输出、专门任务扫描拟议变更。这些是厂商设计说明，而非独立安全认证；允许的后续输出仍可能改变仓库。', sourceIds: ['github-agentic-workflows-ga'], locator: 'Built-in safeguards' },
  { label: '使用条件：先审配置，再看运行结果', text: '官方入门示例生成仓库状态报告，要求仓库写权限、启用Actions和所选AI引擎的账号配置；向导可加入工作流并触发执行。文档提醒先检查数据处理、仓库敏感性及日志访问，运行成功后仍需查看生成的议题和日志。', sourceIds: ['github-agentic-workflows-quickstart'], locator: 'Prerequisites；Step 2；Step 3' },
  { label: '编辑分析：自动完成不是自动批准', text: '可先用只读分析、小范围输出和明确预算验证价值，再扩大任务范围。把“流程运行结束”“建议正确”“变更可合入”作为三个不同验收点，避免用一次成功运行替代测试与维护者判断。', editorial: true, sourceIds: ['github-agentic-workflows-quickstart'], locator: '编辑归纳，依据前置条件、数据处理提醒与结果检查' },
 ],
 recommendedResources: [{ id: 'agentic-workflows-quickstart-reading', title: 'GitHub Agentic Workflows Quickstart', creator: 'GitHub', series: 'GitHub Agentic Workflows 官方文档', kind: 'article', url: quickstart, checkedAt, match: '用具体的每日仓库报告示例理解配置、执行和产物检查，而不是只看发布宣传。', locator: 'Prerequisites → Step 2 → Step 3', scopeNote: '核读文字和示例，未安装扩展、配置凭据或触发工作流；链接的文档可能持续更新。' }],
}];
