import type { Source, TimelineEvent } from './types';
const checkedAt = '2026-10-28';
const carbon = 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/';
const fusion = 'https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/';
const local = 'https://github.blog/changelog/2026-10-28-github-copilot-fusion-now-supports-selection-of-local-models/';
const docs = 'https://docs.github.com/en/enterprise-cloud%40latest/copilot/concepts/models/copilot-fusion';
const accessNote = '核读搜索工具返回的官方正文；直接打开深链接时工具报不可访问。日期确认到日，未取得发布小时，不声称16:00 UTC后首次发布。';
export const carbonFusionSources: Source[] = [
  { id: 'gemini4-carbon-announcement', title: 'Gemini 4 Carbon: our next frontier model', publisher: 'Google · Koray Kavukcuoglu', url: carbon, type: '官方公告', publishedAt: checkedAt, checkedAt, locator: '发布日期；开头分阶段 rollout；Improving coding and reasoning；Coming soon to developers, businesses, and consumers', version: accessNote },
  { id: 'copilot-fusion-ga', title: 'Route and orchestrate models with GitHub Copilot Fusion', publisher: 'GitHub Changelog', url: fusion, type: '官方公告', publishedAt: checkedAt, checkedAt, locator: 'generally available；Smarter choices for developers；Billing；Get started', version: accessNote },
  { id: 'copilot-fusion-local-preview', title: 'GitHub Copilot Fusion now supports selection of local models', publisher: 'GitHub Changelog', url: local, type: '官方公告', publishedAt: checkedAt, checkedAt, locator: 'experimental preview；Bring your own local model；Local inference does not make your session offline', version: accessNote },
  { id: 'copilot-fusion-runtime-docs', title: 'About GitHub Copilot Fusion', publisher: 'GitHub Docs', url: docs, type: '官方文档', checkedAt, locator: 'Overview；Policies and availability；Billing；Copilot Fusion limitations', version: '持续更新文档；核读官方搜索返回正文，状态为2026-10-28快照。' },
];
export const carbonFusionEvents: TimelineEvent[] = [
  {
    id: 'gemini-4-carbon-announced', date: checkedAt, dateLabel: '2026年10月28日（官方公告日，未取得发布小时）',
    title: 'Gemini 4 Carbon 公布：先面向受限防御伙伴投放', company: 'Google DeepMind', kind: '模型公告／受限投放计划', tracks: ['models'], entityIds: ['gemini'], milestone: true,
    summary: 'Google 公布 Gemini 4 Carbon，重点强调长时程工程与网络防御能力；计划本周起先向部分防御者及可信伙伴分阶段提供访问。',
    significance: '编辑解读：这是前沿模型能力与部署门槛同时变化的节点，模型公布、评测可见和公众可用应分开记录。',
    limitation: '面向开发者、企业与消费者的普遍开放仍为 coming soon；不能视为公开 API 已上线或全面 GA。未调用模型、复测指标或验证真实防御效果。',
    sourceIds: ['gemini4-carbon-announcement'], tags: ['Gemini', '长时程任务', '网络防御', '受限访问'],
    change: { baseline: 'Google 以 Gemini 4 Argon 为前代比较；本条不独立验证其性能增益', improvements: ['厂商报告强化复杂工程与长时程任务', '将网络防御作为首批受限投放场景'], tradeoffs: '评测成绩不能替代产品接入资格，也不代表所有环境的可靠性。', evidence: '厂商报告', sourceIds: ['gemini4-carbon-announcement'] },
    details: [
      { label: '经过：公告与普遍开放不是同一天', text: '10月28日公告提出本周起向部分网络防御者提供 Carbon，再通过 Fairwind Program 扩展至可信伙伴；面向一般开发者、企业和消费者的产品入口仍写作即将提供。这里记录公布及分阶段投放计划，不替用户确认已获访问资格。', sourceIds: ['gemini4-carbon-announcement'], locator: '开头 rollout 段；Coming soon to developers, businesses, and consumers' },
      { label: '能力：厂商报告不等于独立验收', text: 'Google 把复杂软件工程、长时程工作及漏洞发现和修复作为重点，报告内部团队的持续编码经验与外部基准成绩。这些材料可以说明发布方的定位，不能直接换算为每个代码库的成功率；公告的网络安全基准还注明在无护栏条件下评测。', sourceIds: ['gemini4-carbon-announcement'], locator: 'Improving coding and reasoning；State-of-the-art cybersecurity performance（evaluated without guardrails）' },
      { label: '编辑分析：分别追踪能力与访问', text: '我们将此节点与公开 API 上线分开：后续若入口扩大，应核对具体渠道、权限和安全限制，而不是凭排行榜出现模型名就改成全面可用。真实工程任务也应保留外部测试与人工复核。', editorial: true, sourceIds: ['gemini4-carbon-announcement'], locator: '编辑归纳，依据分阶段 rollout 与 Coming soon 边界' },
    ],
    recommendedResources: [{ id: 'carbon-official-reading', title: 'Gemini 4 Carbon: our next frontier model', creator: 'Koray Kavukcuoglu', series: 'Google 官方博客', kind: 'article', url: carbon, publishedAt: checkedAt, checkedAt, match: '先读访问范围，再区分厂商能力报告与真实部署证据。', locator: 'rollout；Coming soon；评测条件说明', scopeNote: '核读工具检索返回的一手正文；直接打开受工具可访问性限制。未调用模型、观看完整演示或复测指标。' }],
  },
  {
    id: 'github-copilot-fusion-ga', date: checkedAt, dateLabel: '2026年10月28日（官方 GA 公告日）',
    title: 'GitHub Copilot Fusion 正式可用：路由与编排多个模型', company: 'GitHub', kind: '产品正式发布', tracks: ['products'], entityIds: ['copilot'], milestone: true,
    summary: 'Copilot Fusion 将 HydraFusion 的多模型编排与自动模型选择结合，正式提供任务级路由及不同推理投入档位；它是运行时系统，不是新的基础模型。',
    significance: '编辑解读：开发工具的竞争从单一模型选择进一步延伸到任务执行方式、成本与组织权限的协同管理。',
    limitation: 'Fusion 产品 GA 不代表本地模型路由 GA；后者为选择加入的实验预览，且路由仍在云端，不是离线会话。没有实际运行任务或独立复测成本与性能。',
    sourceIds: ['copilot-fusion-ga', 'copilot-fusion-local-preview', 'copilot-fusion-runtime-docs'], tags: ['编码 Agent', '模型编排', 'GA', 'GitHub Copilot'],
    change: { baseline: '此前的 Project HydraFusion 研究预览与 auto 模型选择', improvements: ['统一为正式可用的运行时路由与编排产品', '按任务选择单模型、级联或审阅流程', '提供 Standard、High、Max 投入档位'], tradeoffs: '多模型步骤可能增加调用和等待；具体模型受计划与管理员策略限制。', evidence: '厂商报告', sourceIds: ['copilot-fusion-ga', 'copilot-fusion-runtime-docs'] },
    details: [
      { label: '经过：从研究预览走向产品 GA', text: '10月28日官方公告确认 Fusion 正式可用，覆盖 VS Code、Copilot app、CLI 与 JetBrains 的所有 Copilot 计划；具体模型仍受订阅和管理员策略约束。此前 auto 与 HydraFusion 用户的选择会迁移至对应档位，不意味着另一个基础模型发布。', sourceIds: ['copilot-fusion-ga', 'copilot-fusion-runtime-docs'], locator: '开头 generally available；Get started；Policies' },
      { label: '机制：选择执行方式，而不只是模型名', text: 'Fusion 按任务需求选择 Single、Cascade 或 Critique：可以单模型完成，也可以先生成再检查、升级或审阅修订。Standard、High、Max 表示投入取向；系统运行时决定具体组合，不能把某一次所用模型名单当作永久固定配置。', sourceIds: ['copilot-fusion-ga', 'copilot-fusion-runtime-docs'], locator: 'Smarter choices for developers；How Copilot Fusion works' },
      { label: '成本与边界：按实际模型调用计费', text: '官方文档说明按所调用模型的标准费率计费，没有独立的 Fusion 收费；多模型流程可能消耗更多 AI credits。若草稿被丢弃，已经写入工作区的文件变更不会自动撤销，因此最终回复不等于工作区已经安全验收。', sourceIds: ['copilot-fusion-runtime-docs'], locator: 'Billing for Copilot Fusion；Copilot Fusion limitations' },
      { label: '本地路由：实验预览不等于离线', text: '同日另发的本地模型路由是选择加入的实验预览。CLI 可配置受支持的本地模型，托管下载体验限 Windows；本地推理仍由云端作路由决策。不能把产品 GA、特定本地模型兼容和离线运行合并成一个承诺。', sourceIds: ['copilot-fusion-local-preview'], locator: 'experimental preview；Managed download；Bring your own local model；offline说明' },
      { label: '编辑分析：验收完整任务，不只看最终回复', text: '模型编排增加了检查机会，也增加了步骤与状态。我们建议按同一任务记录质量、总成本、耗时及文件差异，并保留组织策略和执行权限；一次评测中的成本优势不能直接推广到所有项目。', editorial: true, sourceIds: ['copilot-fusion-ga', 'copilot-fusion-runtime-docs'], locator: '编辑归纳，依据执行模式、计费与文件变更限制' },
    ],
    recommendedResources: [{ id: 'fusion-runtime-reading', title: 'About GitHub Copilot Fusion', creator: 'GitHub Docs', series: 'GitHub Copilot 文档', kind: 'article', url: docs, checkedAt, match: '对照执行模式、计费与草稿撤销边界，理解多模型系统的实际使用限制。', locator: 'How Copilot Fusion works；Billing；Limitations', scopeNote: '核读官方文档检索正文；文档会持续变化，记录的是10月28日状态。未登录产品、运行代码任务或验证费用。' }],
  },
];
