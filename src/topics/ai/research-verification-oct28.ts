import type { Source, TimelineEvent } from './types';
const checkedAt = '2026-10-28';
const revision = '69cb972f587a3ecc035e092253167ff2e303c962';
const repo = `https://github.com/AxiomMath/CFSG/blob/${revision}`;
export const verificationOct28Sources: Source[] = [
  { id: 'axiom-cfsg-announcement', title: 'Formalizing the Enormous Theorem', publisher: 'Axiom Math', url: 'https://axiommath.ai/research/the-enormous-theorem-formalized/', type: '官方公告', publishedAt: '2026-10-26', checkedAt, locator: 'Unleashing the swarm; From completed pieces to a completed proof' },
  { id: 'axiom-cfsg-review-status', title: 'CFSG formalization metadata and review status', publisher: 'Axiom Math', url: `${repo}/formalization.yaml`, type: '官方文档', checkedAt, version: revision, locator: 'review.status: self-assessed; reviewers: Axiom Math' },
  { id: 'axiom-cfsg-comparator', title: 'Comparator/Solution.lean: classification statement bridge', publisher: 'Axiom Math', url: `${repo}/Comparator/Solution.lean`, type: '官方文档', checkedAt, version: revision, locator: 'CFSGComparator.classification; TauCeti.ClassificationStatement; CFSG.Certified.classification_finite_simple_groups' },
  { id: 'axiom-cfsg-statement', title: 'CFSG/Statement.lean: final classification entry', publisher: 'Axiom Math', url: `${repo}/CFSG/Statement.lean#L4923-L4936`, type: '官方文档', checkedAt, version: revision, locator: 'classification_finite_simple_groups; Assembly.classification' },
  { id: 'axiom-cfsg-milestone', title: 'CFSG final milestone: classification and realization', publisher: 'Axiom Math', url: `${repo}/CFSG/Milestones/CFSG_classification.lean#L4633-L4648`, type: '官方文档', checkedAt, version: revision, locator: 'NativeCatalog equivalence and realization obligations' },
  { id: 'axiom-cfsg-dependencies', title: 'CFSG fixed dependency manifest', publisher: 'Axiom Math', url: `${repo}/lake-manifest.json`, type: '官方文档', checkedAt, version: revision, locator: 'Mathlib and TauCeti revisions' },
  { id: 'aa-intelligence-v5-launch', title: 'Announcing Artificial Analysis Intelligence Index v5', publisher: 'Artificial Analysis', url: 'https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5', type: '官方公告', publishedAt: '2026-10-27', checkedAt, locator: 'New to the Intelligence Index; Upgraded; Intelligence Index v5 weights' },
  { id: 'aa-intelligence-v5-method', title: 'Artificial Analysis Intelligence Index methodology', publisher: 'Artificial Analysis', url: 'https://artificialanalysis.ai/methodology/intelligence-benchmarking', type: '官方文档', checkedAt, version: 'v5, October 2026 snapshot', locator: 'Composition; evaluation scope; version history' },
  { id: 'aa-progress-v1-method', title: 'Artificial Analysis Progress Index methodology', publisher: 'Artificial Analysis', url: 'https://artificialanalysis.ai/methodology/progress-index', type: '官方文档', checkedAt, version: 'v1', locator: 'Why a Progress Index; Item Response Theory; cross-generation comparison' },
];
export const verificationOct28Events: TimelineEvent[] = [
  {
    id: 'axiom-cfsg-formalization-materials', date: '2026-10-26', dateLabel: '2026年10月26日（官方公告标注日；10月28日核查固定代码）',
    title: 'Axiom 发布 CFSG 形式化证明材料', company: 'Axiom Math', kind: '研究材料公开', tracks: ['methods'], entityIds: [], milestone: true,
    summary: 'Axiom 公布有限单群分类定理的 Lean 形式化项目，公开最终命题入口、依赖与证明材料；团队声称完成形式化，审阅元数据仍标为自评。',
    significance: '编辑解读：重要之处在于把大型历史证明转为可检查的依赖网络，而不是 AI 从零发现分类定理。材料公开和独立复核是两个阶段。',
    limitation: '本次只读固定版本的命题入口、审阅状态和依赖，未运行完整 Lean 构建、未审查全部传递依赖；不能据此宣布本站已独立验证证明或形成学术共识。不是模型、API 或权重发布。',
    sourceIds: ['axiom-cfsg-announcement', 'axiom-cfsg-review-status', 'axiom-cfsg-comparator', 'axiom-cfsg-statement', 'axiom-cfsg-milestone', 'axiom-cfsg-dependencies'], tags: ['科学研究', '形式化验证', 'Lean', '群论', '研究材料'],
    details: [
      { label: '经过：公告日期不等于代码首次公开时刻', text: '官方文章标注10月26日，介绍数学家、工程师与多代理协作进行形式化。本站在10月28日核读固定提交69cb972；该提交的10月27日时间不能反推项目首次公开时刻。', sourceIds: ['axiom-cfsg-announcement', 'axiom-cfsg-review-status'], locator: '公告日期与项目经过；固定提交元数据' },
      { label: '背景：形式化承接既有数学成果', text: '项目处理的是长期集体研究形成的有限单群分类。历史证明、已有 Lean 库和人类数学判断仍是基础；将命题写进机器语言，并不自动确认它恰好表达了数学家原本想证明的内容。', sourceIds: ['axiom-cfsg-announcement'], locator: 'From completed pieces to a completed proof; Acknowledgements' },
      { label: '入口：对照命题与证明需要真正连接', text: '固定版本的 Comparator/Solution.lean 将 TauCeti 的分类命题连接到 Axiom 的最终证明入口。Statement.lean 以群、有限性及单纯性为前提接入分类分支；另一个最终里程碑还处理目录等价和所列群的实现义务，不只是展示分类名单。', sourceIds: ['axiom-cfsg-comparator', 'axiom-cfsg-statement', 'axiom-cfsg-milestone'], locator: 'CFSGComparator.classification；Statement lines4923–4936；Milestones lines4633–4648' },
      { label: '复核边界：团队自评不是本站验证', text: 'formalization.yaml 明确写有 self-assessed，审阅方为 Axiom Math。依赖清单固定了 Mathlib 与 TauCeti 版本。本次未重新构建或遍历全部证明链，记录可审查材料，不替团队的完整性主张背书。', sourceIds: ['axiom-cfsg-review-status', 'axiom-cfsg-dependencies'], locator: 'review.status / reviewers；packages revisions' },
      { label: '编辑分析：先查命题和依赖，再讨论突破', text: '阅读顺序宜是最终命题、定义对应、证明入口、依赖及复现步骤，最后才是规模与速度。某条历史论证需要修补不等于分类定理被推翻；同样，代码量或成功构建声明也不能代替对形式命题含义的审查。', editorial: true, sourceIds: ['axiom-cfsg-announcement', 'axiom-cfsg-review-status', 'axiom-cfsg-comparator'], locator: '编辑归纳，不是独立数学结论' },
    ],
    recommendedResources: [{ id: 'axiom-ugt-preprint-reading', title: 'The Unbalanced Group Theorem', creator: 'Colin Defant、Ken Ono', series: 'Hexagon · 2610.00575 v1', kind: 'article', url: 'https://hexagonmath.org/2610.00575?version=1', publishedAt: '2026-10-27', checkedAt, match: '具体讨论形式化中遇到的一条旧 UGT 证明路线的闭包断言问题与替代论证，帮助理解证明修补和定理本身的区别。', scopeNote: '已核对预印本元数据与摘要；直接访问可能受限。非独立同行评审认证，未完整复核论文证明，不能说它反驳 UGT 或 CFSG。', locator: 'Abstract；Theorem2.3；Remark9.5' }],
  },
  {
    id: 'aa-intelligence-index-v5', date: '2026-10-27', title: 'Intelligence Index v5：评测量尺更新', company: 'Artificial Analysis', kind: '评测方法更新', tracks: ['methods'], entityIds: ['ai-evaluation', 'harness'], milestone: false,
    summary: 'Artificial Analysis 更新综合指数 v5，引入 FrontierCode 2.0 和 Terminal-Bench-Science，并发布用于跨年代比较的 Progress Index v1。',
    significance: '编辑解读：评测任务与权重变化本身值得记录，避免把换量尺后的分数差误读成模型能力突然提升或下降。',
    limitation: '这是评测方法更新，不是模型发布。新旧 Intelligence Index 分数不能直接相减；主要英语文本范围不代表完整多语言或多模态能力，本站未复跑基准。',
    sourceIds: ['aa-intelligence-v5-launch', 'aa-intelligence-v5-method', 'aa-progress-v1-method'], tags: ['评测', '榜单', '方法论', '版本边界'],
    details: [
      { label: '经过：新增任务，也更换既有评测', text: '10月27日公告引入 FrontierCode 2.0 与 Terminal-Bench-Science，并升级知识、科学等评测。公告所说60%指指数基于私有测试集或保留答案的评测占比，不能改写成所有测试数据均公开或60%的题目都私有。', sourceIds: ['aa-intelligence-v5-launch'], locator: 'Opening；New to the Intelligence Index；Upgraded' },
      { label: '方法：四类能力等权，但任务并不相同', text: 'v5 将知识工作、编程、科学、通用能力各设为25%，共组合9项评测。FrontierCode 2.0 与科研终端任务各占15%。不同任务的环境与评分不同，综合分数不是一个实际工程项目的交付概率。', sourceIds: ['aa-intelligence-v5-method'], locator: 'Index composition and evaluation-specific methodology' },
      { label: '比较：当前用途与长期进展分开', text: '同期 Progress Index v1 使用项目反应理论，联合估计模型能力与任务难度，并通过共同任务连接不同年代。它旨在处理长期比较问题，仍依赖统计假设，不是把不同版本综合分数直接拼接，也不是通用智能判定。', sourceIds: ['aa-progress-v1-method'], locator: 'Why a Progress Index；Item Response Theory' },
      { label: '编辑分析：榜单应带版本和任务条件', text: '选型时应同时记录指数版本、推理档位、执行框架、成本与业务回归结果。私有任务可以降低公开题污染风险，但外界复核也更依赖评测机构披露的方法。历史节点中的旧版分数应保留日期，不能自动改成新版分数。', editorial: true, sourceIds: ['aa-intelligence-v5-method', 'aa-progress-v1-method'], locator: '编辑归纳，非本项目实测或机构原话' },
    ],
    recommendedResources: [{ id: 'frontiercode2-reading', title: 'FrontierCode 2.0', creator: 'The Cognition Team', series: 'Cognition 官方博客', kind: 'article', url: 'https://cognition.com/blog/frontier-code-2.0', publishedAt: '2026-10-27', checkedAt, match: '结合真实仓库修改与维护者的合并条件，理解为什么通过测试不等于改动适合合并。', scopeNote: '基准作者说明，作者同时是编码产品厂商；不是独立性能复现，也不把它与旧版1.1榜单混为一谈。', locator: 'Task design；mergeability and blocking criteria' }],
  },
];
