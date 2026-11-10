import type { Entity, Source, TimelineEvent } from './types';

// Announcement day comes from the NVIDIA blog; the research page gives only November 2026.
export const groot2Sources: Source[] = [
  {
    id: 'nvidia-groot2-corl-announcement',
    title: 'Practice Makes Precise: At CoRL, NVIDIA and Partners Reveal How Robots Rehearse Delicate Work in Simulation',
    publisher: 'NVIDIA', type: '官方公告',
    url: 'https://blogs.nvidia.com/blog/robotics-simulation-advancements-corl/',
    publishedAt: '2026-11-09', checkedAt: '2026-11-10',
    locator: 'November 9, 2026; World Action Models Enable Next Level of Robot Autonomy',
  },
  {
    id: 'nvidia-groot2-research-page',
    title: 'GR00T 2: Scaling Robot Foundation Models for Generalization, Dexterity, and Adaptation',
    publisher: 'NVIDIA Research', type: '官方文档',
    url: 'https://research.nvidia.com/labs/gear/gr00t-2/',
    publishedAt: '2026-11', checkedAt: '2026-11-10',
    locator: 'November 2026; Code Available in December; Model Architecture; Pretraining Data; X-Adaptability',
  },
];

export const groot2Entities: Entity[] = [
  {
    id: 'nvidia-groot', name: 'NVIDIA GR00T', type: 'family', company: 'NVIDIA',
    description: '面向机器人感知与动作学习的模型家族；本条记录 GR00T 2 世界动作模型研究公告，不代表代码或权重已开放。',
    tags: ['机器人', '世界动作模型', '具身智能'],
    sourceIds: ['nvidia-groot2-corl-announcement', 'nvidia-groot2-research-page'],
  },
];

export const groot2Events: TimelineEvent[] = [
  {
    id: 'nvidia-groot2-research', date: '2026-11-09',
    dateLabel: '2026年11月9日（官方公告日期）',
    title: 'NVIDIA 公布 GR00T 2：联合预测未来视频与机器人动作',
    company: 'NVIDIA', kind: '机器人模型研究公告', tracks: ['models'],
    summary: 'NVIDIA 在 CoRL 期间公布 GR00T 2 世界动作模型研究：联合预测未来视频和动作，探索从人类视频学习、少样本适应与跨机器人机体的技能迁移。',
    significance: '编辑解读：让视觉预测参与动作生成，把“环境将如何变化”与“机器人应如何行动”放进同一学习问题，是具身模型值得跟踪的路线。',
    limitation: '这是研究公告，不是现有下载或 API 开放公告。研究页标注 Code Available in December；权重与许可未核验，厂商实验未经本项目复测。',
    entityIds: ['nvidia-groot'],
    sourceIds: ['nvidia-groot2-corl-announcement', 'nvidia-groot2-research-page'],
    tags: ['机器人', '世界动作模型', '视频学习', '跨机体迁移', '研究公告'],
    milestone: false,
    change: {
      baseline: '本资料集首次收录 GR00T 家族；这里记录研究机制与公开边界，不作相对前代的独立性能比较',
      improvements: [
        '厂商研究提出由同一扩散 Transformer 联合去噪未来视频与机器人动作，再通过各机体的动作头输出控制命令',
        '厂商展示从人类视频、手持或可穿戴设备示范中学习，并迁移到未示范该任务的机器人机体',
      ],
      tradeoffs: '研究展示不等于任意机器人均可直接部署；代码计划12月提供，权重与许可未核验，实验任务及平台限制仍需阅读原始研究。',
      evidence: '厂商报告', sourceIds: ['nvidia-groot2-research-page'],
    },
    details: [
      {
        label: '背景：从动作预测走向世界动作模型',
        text: '官方公告在11月9日介绍 GR00T 2；研究页只标注2026年11月，因此以公告日定位事件，不为研究页补造精确发表日。研究关注机器人对物理变化的预测与操作技能，而非通用聊天模型更新。',
        sourceIds: ['nvidia-groot2-corl-announcement', 'nvidia-groot2-research-page'],
        locator: '公告日期；研究页页首 November 2026; Introducing GR00T 2',
      },
      {
        label: '变化：未来视频与动作联合生成',
        text: '按 NVIDIA 的研究说明，同一扩散 Transformer 联合去噪未来视频与动作。输入包含近期视频、指令和机器人状态，各机体的动作头把预测转成控制命令；模型执行一段动作后再次观察与预测。',
        sourceIds: ['nvidia-groot2-research-page'], locator: 'Model Architecture',
      },
      {
        label: '证据：视频学习与跨机体迁移实验',
        text: 'NVIDIA 展示了从人类视频、手持夹爪与可穿戴设备示范中学习，再迁移到其他机器人机体的实验。它们是厂商报告的具体任务结果，不证明所有机器人或真实环境均能可靠泛化；本项目未复现实验。',
        sourceIds: ['nvidia-groot2-research-page'], locator: 'Pretraining Data; X-Adaptability; Fast Adaptation',
      },
      {
        label: '开放边界：代码仍是12月计划',
        text: '研究页明确写着 Code Available in December，只能确认代码计划12月提供。权重与许可未核验，也未确认公开 API。页面链接的 Human-1M-100K 是人类第一视角数据，不是 GR00T 2 模型权重；不能用数据集公开推导模型已可下载。',
        sourceIds: ['nvidia-groot2-research-page'], locator: '页首 Code Available in December; Pretraining Data: Humans, Handheld Grippers, and Robots',
      },
      {
        label: '编辑分析：观察技能如何迁移，而非只看演示',
        text: '值得跟踪的是视频预测是否改善真实机器人的数据效率，以及跨机体迁移在新任务、硬件和环境中能否重复。后续代码、训练配方与许可公开情况，会决定外部研究者能验证多少结论；本条不把 CoRL 展示等同于生产部署成熟度。',
        sourceIds: ['nvidia-groot2-research-page'], editorial: true,
        locator: '编辑归纳，依据 Model Architecture; X-Adaptability; 页首代码计划',
      },
    ],
    recommendedResources: [
      {
        id: 'groot2-research-reading', title: 'GR00T 2：机制、跨机体实验与代码计划',
        creator: 'NVIDIA Research', series: 'NVIDIA GEAR · 机器人研究', kind: 'article',
        url: 'https://research.nvidia.com/labs/gear/gr00t-2/',
        publishedAt: '2026-11', checkedAt: '2026-11-10',
        match: '先读 Model Architecture，再读 X-Adaptability，区分联合预测机制与特定任务演示。',
        scopeNote: '已核验官方研究页与公告；未复现实验，未核验权重及许可。研究页代码计划为12月，日期仅到月。',
        locator: 'Model Architecture; X-Adaptability; Code Available in December',
      },
    ],
  },
];
