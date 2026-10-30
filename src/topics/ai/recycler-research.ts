import type { Source, TimelineEvent } from './types';

// Official publication and paper checked 2026-10-25. Research, not a model launch.
export const recyclerSources: Source[] = [
  {
    id: 'seed-recycler-publication',
    title: 'Recycler: Cost-Free Latent Reasoning via Hidden State Recycling',
    publisher: 'ByteDance Seed',
    url: 'https://seed.bytedance.com/en/public_papers/recycler-cost-free-latent-reasoning-via-hidden-state-recycling',
    type: '官方公告', publishedAt: '2026-10-25', checkedAt: '2026-10-25',
    locator: 'Publication date; Abstract; Download PDF',
  },
  {
    id: 'seed-recycler-paper',
    title: 'Recycler: Cost-Free Latent Reasoning via Hidden State Recycling（论文）',
    publisher: 'ByteDance Seed',
    url: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/hyvsmeh7uhobf/recycler_arxiv%20(2).pdf',
    type: '原始论文', publishedAt: '2026-10-25', checkedAt: '2026-10-25',
    locator: 'p.1 date and abstract; §2.2.1–2.2.3; §2.3.1, pp.4–5',
  },
];

export const recyclerEvents: TimelineEvent[] = [
  {
    id: 'seed-recycler-research', date: '2026-10-25',
    dateLabel: '2026年10月25日（论文公开日期）',
    title: 'ByteDance Seed 提出 Recycler：跨 token 回收隐藏状态',
    company: '字节跳动', kind: '架构研究公开', tracks: ['methods'],
    summary: 'ByteDance Seed 公开 Recycler 研究，将前一个 token 的顶层隐藏状态经轻量适配器传给下一步，探索保留连续语义的推理架构。',
    significance: '编辑解读：除扩大模型和延长思维链外，跨解码步骤复用内部状态也可作为效率研究的方向。',
    limitation: '“Cost-Free”不等于零计算或免费 API；论文的低开销主张针对解码。此条不是产品或权重发布，实验结果未经本项目复测。',
    entityIds: ['seed', 'transformer'],
    sourceIds: ['seed-recycler-publication', 'seed-recycler-paper'],
    tags: ['架构', '隐藏状态', '推理效率', '研究论文'], milestone: false,
    details: [
      {
        label: '日期与公开状态',
        text: '官方研究页与论文首页均标注10月25日，仅确认到日。可读取论文，但未核实代码、权重或正式产品接口的发布。',
        sourceIds: ['seed-recycler-publication', 'seed-recycler-paper'],
        locator: 'Publication date; Download PDF; paper p.1',
      },
      {
        label: '把三种计算成本分开',
        text: '逐 token 解码不增加骨干网络的前向遍数；预填充可选一遍或两遍。论文的两遍训练方案成本为标准模型的2倍，不能概括成训练和推理均零额外成本。',
        sourceIds: ['seed-recycler-paper'],
        locator: '§2.2.1 Decoding, p.3; §2.2.3 Prefill, p.4; §2.3.1 Pretraining, p.5',
      },
      {
        label: '编辑解读：怎样读效率标题',
        text: '先区分训练、提示预填充与逐 token 解码，再比较任务质量和总资源预算；标题中的成本表述不是所有部署场景的保证。',
        sourceIds: ['seed-recycler-paper'], editorial: true,
        locator: '编辑归纳，依据§2.2–2.3的阶段划分，不是独立性能结论',
      },
    ],
    recommendedResources: [
      {
        id: 'recycler-architecture-reading',
        title: 'Recycler：隐藏状态回收研究（标题节译）', creator: 'ByteDance Seed',
        series: 'ByteDance Seed · 研究论文', kind: 'article',
        url: 'https://seed.bytedance.com/en/public_papers/recycler-cost-free-latent-reasoning-via-hidden-state-recycling',
        publishedAt: '2026-10-25', checkedAt: '2026-10-25',
        match: '从官方摘要进入论文，比较解码、预填充与训练的计算代价。',
        scopeNote: '已核验官方页面及论文相关章节；未运行实验，未核实代码或权重开放。',
        locator: 'Abstract; linked PDF §2.2–2.3',
      },
    ],
  },
];
