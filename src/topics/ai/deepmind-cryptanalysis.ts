import type { Source, TimelineEvent } from './types';
const checkedAt = '2026-11-07';
const affineUrl = 'https://storage.googleapis.com/deepmind-media/papers/Faster_Affine_Root_and_a_1024bit%20Computation.pdf';
const fanUrl = 'https://storage.googleapis.com/deepmind-media/papers/Fan_Factories_Multiple_Number_Fields_in_Factorization_Factories_and_Batch_NFS.pdf';
export const cryptanalysisSources: Source[] = [
  { id: 'deepmind-cryptanalysis-announcement', title: 'Google DeepMind：AI 辅助密码分析研究公开公告', publisher: 'Google DeepMind', url: 'https://x.com/GoogleDeepMind/status/2118755418675765656', type: '官方公告', checkedAt, publishedAt: '2026-11-06', locator: '官方发布帖机器时间 2026-11-06T17:20:31Z；研究公告及安全边界说明' },
  { id: 'deepmind-affine-roots-paper', title: 'Modular Roots from a Restricted Oracle: Faster Affine Roots and a 1024-bit Computation', publisher: 'Google DeepMind / 合作研究者', url: affineUrl, type: '原始论文', format: 'PDF', version: 'Working Paper', checkedAt, locator: '摘要及引言 pp. 1–4；实验与资源 pp. 5, 7；局限 p. 22' },
  { id: 'deepmind-fan-factories-paper', title: 'Fan Factories: Multiple Number Fields in Factorization Factories and Batch NFS', publisher: 'Google DeepMind / 合作研究者', url: fanUrl, type: '原始论文', format: 'PDF', version: 'Working Paper（文内日期 2026-11-05）', checkedAt, locator: '封面日期 November 5, 2026；摘要及引言 pp. 1–4；实现与渐近估计局限 p. 14' },
];
export const cryptanalysisEvents: TimelineEvent[] = [{
  id: 'deepmind-ai-cryptanalysis-research', date: '2026-11-06', dateLabel: '2026年11月6日（官方公开公告，UTC）',
  title: 'DeepMind 公布 AI 辅助密码分析研究', company: 'Google DeepMind', kind: '工作论文公开',
  tracks: ['methods'], entityIds: [], milestone: true,
  summary: '人类主导的研究团队借助 AI 推进受限签名/求根黑箱接口（oracle）下的模根分析与批量整数分解，并报告一个 1024-bit 计算实验。两篇工作论文不是通用 RSA 破解，也不是新模型发布。',
  significance: '编辑分析：重要性在于 AI 参与数学推导、实现与计算验证的研究流程；理论改进、同实例工程提速和部署安全结论仍须分别评价。',
  limitation: '工作论文不等于同行评审定论。作者称这些结果不威胁当前 2048-bit 及以上 RSA 部署，这不是绝对安全保证。本站只核读摘要及相关章节，未独立复现计算或完整审查证明。',
  sourceIds: cryptanalysisSources.map(s => s.id), tags: ['科学研究', '密码分析', '人机协作', 'RSA', '工作论文'],
  details: [
    { label: '经过：论文日期与公开公告分开', text: 'Google DeepMind 官方账号于11月6日17:20:31 UTC公告研究。本节点以公告为日期；Fan Factories 文内标注11月5日，不能把两个日期混用。这是研究材料公开，不是模型、API 或权重发布。', sourceIds: ['deepmind-cryptanalysis-announcement', 'deepmind-fan-factories-paper'], locator: '官方帖机器时间；Fan Factories 封面' },
    { label: '条件：先前的 oracle 访问不可省略', text: '第一篇讨论攻击者前期能够访问受限模根或签名 oracle、随后处理目标的模型，并非仅凭任意公开密钥即可分解 RSA。仿射模根算法给出基于数域筛启发式假设的渐近改进；输入格式及可变区块长度会影响适用性。较小可变区块的 affine 算法尚未在密码学规模实跑。', sourceIds: ['deepmind-affine-roots-paper'], locator: '摘要、引言 pp. 1–4；局限 p. 22' },
    { label: '实验：3.5 倍是同实例实现优化', text: '论文在既有的 1024-bit 实例上沿用相同算法、参数与多项式，将报告的首个模根计算成本从约1380降到391 CPU 核年，约3.5倍改善来自实现与执行优化，不是新算法在同一实验中的收益。短日历用时依赖大规模并行资源，不能换算成普通电脑几天即可完成。研究由人类指导，AI 参与实现、调试与实验。', sourceIds: ['deepmind-affine-roots-paper'], locator: '引言及实验说明 pp. 3–5, 7' },
    { label: '理论：30 倍不是实测加速', text: 'Fan Factories 研究多个同尺寸整数共享预计算的批量分解。在先支付约一次通用数域筛计算成本后，对额外 1024-bit 实例约30倍的估计来自渐近主项比较，省略低阶项；不是单个密钥端到端实测。作者尚未实现 fan factory，也未实证它在何种规模胜过优化后的数域筛。Lean 4 检查部分代数恒等式与可行性见证，不等于整项攻击已获形式化或独立验证。', sourceIds: ['deepmind-fan-factories-paper'], locator: '文内日期 2026-11-05；摘要及引言 pp. 1–4；局限 p. 14' },
    { label: '边界：不把特定研究写成 RSA 被攻破', text: '两篇论文的作者明确表示，这些结果不威胁当前 2048-bit 及以上 RSA 部署。这个判断只针对所述结果，不是对所有实现、密钥生成方式或未来攻击的安全担保。工作论文主张仍需要独立研究、实现和审查。', sourceIds: ['deepmind-affine-roots-paper', 'deepmind-fan-factories-paper'], locator: '两篇摘要及引言中的安全范围说明' },
    { label: '编辑分析：把发现、实现和安全影响分层阅读', text: '本条入选重要主线，是因为人类主导的 AI 辅助研究同时给出可检查的理论材料与计算实验，而非宣称密码系统整体失效。后续应分别跟踪独立同行评价、尚未实现方法的实测，以及特定条件是否适用于现实系统；不能用一个速度倍数替代这三种证据。', editorial: true, sourceIds: ['deepmind-affine-roots-paper', 'deepmind-fan-factories-paper'], locator: '编辑归纳，依据两篇论文的实验和局限说明；非独立密码学认证' },
  ],
  recommendedResources: [
    { id: 'deepmind-affine-roots-reading', title: 'Faster Affine Roots：先读 oracle 条件，再读 1024-bit 实验', creator: 'Krishnamurthy (Dj) Dvijotham、Nadia Heninger、Owen Jones 等', kind: 'article', url: affineUrl, checkedAt, match: '对照理论改进、同实例工程优化和未实跑部分，理解实验究竟验证了什么。', scopeNote: '一手工作论文；只核读摘要及相关章节，未独立复现，未完整评审证明。', locator: '摘要、引言；pp. 5, 7, 22' },
    { id: 'deepmind-fan-factories-reading', title: 'Fan Factories：共享预计算的收益与代价', creator: 'Krishnamurthy (Dj) Dvijotham、Nadia Heninger、Owen Jones 等', kind: 'article', url: fanUrl, checkedAt, match: '解释批量分解的预计算前提，以及理论主项估计为何不能等同实际运行时间。', scopeNote: '一手工作论文；只核读摘要及相关章节，方法尚未实现，本站未独立复现。', locator: '文内日期 2026-11-05；摘要及引言 pp. 1–4；局限 p. 14' },
  ],
}];
