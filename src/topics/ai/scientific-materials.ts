import type { Source, TimelineEvent } from './types';
const checkedAt = '2026-10-27';
const revision = '7ef5c0cc5ca4b0e072b7a050fca09ab24bc6fa3a';
const raw = `https://raw.githubusercontent.com/openai/math/${revision}`;
export const scientificSources: Source[] = [
  { id: 'openai-science-community-announcement', title: 'Building scientific understanding with academic communities', publisher: 'OpenAI', url: 'https://openai.com/index/building-scientific-understanding-with-academic-communities/', type: '官方公告', checkedAt, publishedAt: '2026-10-26', locator: 'Mathematics; Computer science; Physics; external working groups' },
  { id: 'openai-math-collection-scope', title: 'OpenAI math：研究材料与核验范围说明', publisher: 'OpenAI', url: `${raw}/README.md`, type: '官方文档', checkedAt, version: revision, locator: 'Collection overview; verification status; unnamed internal model' },
  { id: 'openai-math-079-scope', title: 'Local smoothing：Lean 形式化范围', publisher: 'OpenAI', url: `${raw}/lean/docs/079.md`, type: '官方文档', checkedAt, version: revision, locator: 'Scope; comparator statements' },
  { id: 'openai-math-378-scope', title: 'ETH：Lean 形式化范围', publisher: 'OpenAI', url: `${raw}/lean/docs/378.md`, type: '官方文档', checkedAt, version: revision, locator: 'Scope; stronger manuscript bounds' },
];
export const scientificEvents: TimelineEvent[] = [{
  id: 'openai-scientific-research-materials', date: '2026-10-26', dateLabel: '2026年10月26日（材料公开公告）',
  title: 'OpenAI 公开科学研究材料，交由学界检验',
  company: 'OpenAI', kind: '研究材料公开', tracks: ['methods'], entityIds: [], milestone: true,
  summary: 'OpenAI 公布数学与计算机科学研究材料，并说明与外部学者协作检验的方式；物理方向采取不同的披露安排。',
  significance: '编辑解读：重要性在于提供可审查材料，而不是把研究主张直接升级为学界定论。',
  limitation: '不是新模型、API 或权重发布，也不代表数学难题已获公认解决。本站未运行 Lean 或独立验证证明。',
  sourceIds: scientificSources.map(s => s.id), tags: ['科学研究', '形式化验证', 'Lean', '学术检验'],
  details: [
    { label: '经过：公开材料与生成时间分开', text: '10月26日公告介绍数学、计算机科学与物理三个方向。数学及 ETH 相关材料对外公开，物理材料暂未公开，由外部合作方决定披露；因此本节点记录公告，不把先前生成或形式化的日期当成发布日期。', sourceIds: ['openai-science-community-announcement'], locator: 'Mathematics; Computer science; Physics' },
    { label: '来源边界：不是 Terra 的科研成绩', text: '仓库说明材料来自未命名、未发布的内部模型，属于原始研究材料而非完成学术评议的论文集。不同结果处于不同核验阶段，并非每项都有 Lean 形式化；没有形式化的结果可能存在问题。不能因与 Terra 同日出现就归因于 Terra。', sourceIds: ['openai-math-collection-scope'], locator: 'README: model attribution; raw research; verification status' },
    { label: '阅读方法：先看形式化究竟覆盖什么', text: '079 范围文档列出局部平滑及相关比较命题；378 文档区分形式化的计数 SAT 复杂度界与手稿中更强的界。存在证明文件，不等于每一句手稿结论都已机械检验。本页固定材料版本，避免后续仓库更新悄然改变引用对象。', sourceIds: ['openai-math-079-scope', 'openai-math-378-scope'], locator: '079 Scope and comparator statements; 378 Scope and manuscript bounds' },
    { label: '争议与解释：声明、检验和共识不是同一层', text: '公告邀请外部学者理解和核验结果。本站记录发布方的研究主张及可查材料，不宣布 ETH 已获学界定论，也不从此次公告推出 P 与 NP 问题已有结论或杨–米尔斯难题已解决。材料可获得与完整学术评价应分别追踪。', sourceIds: ['openai-science-community-announcement', 'openai-math-378-scope'], locator: 'External academic review; Computer science; Physics; 378 Scope' },
    { label: '编辑分析：把可审查性作为下一阶段观察点', text: '后续应分别观察形式化命题是否准确对应研究问题、他人能否复现验证，以及专家如何评价意义与局限。公开材料让这些问题更容易被讨论，但不会自动回答它们；我们没有运行 Lean，也未完整审阅论文证明。', editorial: true, sourceIds: ['openai-math-collection-scope', 'openai-math-079-scope', 'openai-math-378-scope'], locator: '编辑归纳，依据仓库核验声明与具体范围文档' },
  ],
  recommendedResources: [
    { id: 'openai-science-collection-reading', title: 'OpenAI math：如何理解这批研究材料', creator: 'OpenAI', series: 'GitHub / openai/math', kind: 'article', url: `${raw}/README.md`, checkedAt, match: '先读模型归属、核验状态和署名说明，再判断具体研究主张；与同日模型发布分开理解。', scopeNote: '一手技术说明，不是独立节目解读；已核对正文，固定仓库版本。', locator: 'README: verification and attribution' },
    { id: 'openai-science-eth-scope-reading', title: 'ETH 相关结果：形式化覆盖范围', creator: 'OpenAI', series: 'GitHub / openai/math / Lean docs', kind: 'article', url: `${raw}/lean/docs/378.md`, checkedAt, match: '具体区分 Lean 覆盖的复杂度界与手稿的更强表述，避免只读论文标题。', scopeNote: '已阅读范围文档；未运行 Lean、未独立证明，也不作为学界共识的证据。', locator: 'Scope; sharper manuscript bounds' },
  ],
}];
