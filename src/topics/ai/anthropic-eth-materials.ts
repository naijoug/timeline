import type { Source, TimelineEvent } from './types';
const checkedAt = '2026-10-27';
const revision = '16a5ce41304fcdaea4e0be7c132e1c361dc26da5';
const raw = `https://raw.githubusercontent.com/anthropics/formal-math/${revision}/eth`;
export const ethSources: Source[] = [
  { id: 'anthropic-eth-merge', title: 'Add eth: paper and Lean 4 formalization of A 2^o(n) Time Algorithm for 3-SAT', publisher: 'Anthropic / anthropics/formal-math', url: 'https://github.com/anthropics/formal-math/pull/31', type: '官方文档', checkedAt, publishedAt: checkedAt, version: revision, locator: 'Merged Oct 27, 2026; merge commit 16a5ce4; project files and checks' },
  { id: 'anthropic-eth-readme', title: 'A 2^o(n) Time Algorithm for 3-SAT：研究材料说明', publisher: 'Anthropic', url: `${raw}/README.md`, type: '官方文档', checkedAt, version: revision, locator: 'Opening claims and asymptotic limitation; Lean proof; model attribution' },
  { id: 'anthropic-eth-statements', title: 'MainResults.lean：命题、机型与形式化边界', publisher: 'Anthropic', url: `${raw}/MainResults.lean`, type: '官方文档', checkedAt, version: revision, locator: 'Header: The machine / Why this machine suffices; ETHIsFalse; MainTheorem' },
];
export const ethEvents: TimelineEvent[] = [{
  id: 'anthropic-eth-research-materials', date: checkedAt, dateLabel: '2026年10月27日（官方仓库合并公开材料）',
  title: 'Anthropic 公开 ETH 研究材料，供进一步审查', company: 'Anthropic', kind: '研究材料公开', tracks: ['methods'], entityIds: [], milestone: true,
  summary: 'Anthropic 的 formal-math 仓库新增涉及指数时间假设（ETH）的 3-SAT 次指数算法论文及 Lean 4 文件；这是可查的研究材料公开，不等于相关主张已获学界公认。',
  significance: '编辑解读：将 AI 生成的复杂性研究带入可检查的命题与证明材料层面；后续评价仍须区分形式化覆盖、论文含义和实际应用。',
  limitation: '不是新模型、API 或权重发布。本站未运行 Lean、未完整审阅论文证明，也未建立独立学术共识；不据此宣布 P=NP 或实际 SAT 求解已获普遍加速。',
  sourceIds: ethSources.map(source => source.id), tags: ['科学研究', '计算复杂性', 'ETH', '形式化验证', 'Lean'],
  details: [
    { label: '经过：公开日与研究主张分开', text: '官方 PR #31 在10月27日合并，新增独立的 eth 项目，包括论文、命题定义、证明入口与比较检查配置。本节点记录这次材料公开，不把此前研究或生成日期当成公开时间，也不与软件验证合作混作同一事件。', sourceIds: ['anthropic-eth-merge'], locator: 'Merged date; PR description; files eth/paper.pdf, MainResults.lean, Solution.lean, comparator.json' },
    { label: '主张：次指数算法与实际速度有别', text: 'README 将结果归于内部研究 Claude 模型，并声称给出 3-SAT 的次指数时间算法及计数版本。发布方同时明确：结果是渐近性质，不说明现实规模公式能多快求解。这里记录发布方主张，不把它写成已经独立确认的数学结论。', sourceIds: ['anthropic-eth-readme'], locator: 'Opening paragraphs; model attribution; purely asymptotic limitation' },
    { label: '核验：检查证明不等于检查所有语义', text: '材料列出 Lean 构建和额外比较检查步骤，但也提醒：机器不会自动核对形式命题是否表达了论文所说的内容。MainResults.lean 本身只定义命题，证明在其他文件中；不能仅见这个文件就认定证明已完成独立复核。', sourceIds: ['anthropic-eth-readme', 'anthropic-eth-statements'], locator: 'Lean proof: Read the statement; MainResults header: definitions only' },
    { label: '边界：机型、输入约束与未形式化环节', text: '命题以 Mathlib 的有限栈机型表达，并对公式中变量、子句等设置明确条件。文件说明，通常计算模型对该机型的模拟及输入重写，并不属于这里的 Lean 命题或证明。理解形式化结果必须连同这些定义和说明阅读，不能省略它们直接宣传普遍结论。', sourceIds: ['anthropic-eth-statements'], locator: 'The machine; Why this machine suffices; MainTheorem conditions' },
    { label: '编辑分析：先确认可以审查什么', text: '可按“公开了什么—形式命题是什么—证明如何检查—与论文如何对应—独立专家如何评价”的顺序跟进。次指数界不能仅凭名称改写成多项式时间结论；本条的重要性标记针对材料公开，不代表本站替数学界认证结果。', editorial: true, sourceIds: ['anthropic-eth-readme', 'anthropic-eth-statements'], locator: '编辑归纳，依据研究说明与命题范围；非独立数学证明' },
  ],
  recommendedResources: [
    { id: 'anthropic-eth-reading-guide', title: 'A 2^o(n) Time Algorithm for 3-SAT：如何检查研究材料', creator: 'Anthropic', series: 'GitHub / anthropics/formal-math / eth', kind: 'article', url: `${raw}/README.md`, checkedAt, match: '具体列出阅读命题和验证证明的顺序，并注明渐近复杂度与实际速度的区别。', scopeNote: '一手研究说明，不是独立节目解读；核读文字但未执行验证命令、未完整评审论文。', locator: 'Lean proof: Read the statement / Check the proofs' },
    { id: 'anthropic-eth-statement-reading', title: 'MainResults.lean：先读被证明的命题', creator: 'Anthropic', series: 'GitHub / anthropics/formal-math / eth', kind: 'article', url: `${raw}/MainResults.lean`, checkedAt, match: '文件注释解释机型、输入编码及形式化未覆盖的模拟环节，适合在阅读结论前核对范围。', scopeNote: '已核对定义和范围说明，未执行 Lean；该文件不是证明全文，不作为独立验证结论。', locator: 'Header comments; ETHIsFalse; MainTheorem' },
  ],
}];
