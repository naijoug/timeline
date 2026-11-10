import type { Entity, Source, TimelineEvent } from './types';

// Research disclosure, not a model/API launch. Primary sources checked 2026-11-10.
export const ernieEvolveSources: Source[] = [
  {
    id: 'baidu-ernie-evolve-research-post',
    title: 'ERNIE Evolve: Toward Automated Research for Real-World AI R&D',
    publisher: 'Baidu ERNIE',
    url: 'https://ernie.baidu.com/research/posts/ernie-evolve/',
    type: '官方公告', publishedAt: '2026-11-09', checkedAt: '2026-11-10',
    locator: 'Research date; ERNIE Evolve; From Benchmarks to Real-World AI R&D; The Path Forward',
  },
  {
    id: 'baidu-ernie-evolve-results-repo',
    title: 'ERNIE Evolve Results：实验结果代码与运行日志',
    publisher: 'Baidu · ernie-research',
    url: 'https://github.com/ernie-research/ERNIE-Evolve-Results',
    type: '官方文档', checkedAt: '2026-11-10',
    locator: 'README: ERNIE Evolve Results; task/result/directory; Reproduce',
  },
];

export const ernieEvolveEntities: Entity[] = [
  {
    id: 'ernie-evolve', name: 'ERNIE Evolve', type: 'concept', company: '百度',
    description: '百度披露的自动化 AI 研发系统，在限定目标与评估规则下迭代代码和实验。',
    tags: ['自动化研究', 'Agent', '推理优化'],
    sourceIds: ['baidu-ernie-evolve-research-post'],
  },
];

export const ernieEvolveEvents: TimelineEvent[] = [
  {
    id: 'baidu-ernie-evolve-research', date: '2026-11-09',
    dateLabel: '2026年11月9日（官方研究披露日期）',
    title: '百度披露 ERNIE Evolve：让 Agent 迭代 AI 研发实验',
    company: '百度', kind: '研究系统公开', tracks: ['methods'],
    summary: 'ERNIE Evolve 把研究方向选择、代码修改、实验与评估串成循环，并公开部分结果代码和运行日志。',
    significance: '编辑解读：值得观察的是研究循环如何保留可检验的改进，而不只是生成代码。',
    limitation: '这是研究披露，不是 API、完整系统或模型权重发布；ERNIE-5.5-Flash 仍在开发中。性能为作者报告，未经本项目复测，也未核实第三方复现。',
    entityIds: ['ernie-evolve'],
    sourceIds: ['baidu-ernie-evolve-research-post', 'baidu-ernie-evolve-results-repo'],
    tags: ['自动化研究', 'Agent', '实验评估', '推理优化'], milestone: false,
    details: [
      {
        label: '目标与日期',
        text: '官方于11月9日披露研究，日期仅精确到日。系统接受代码仓库、优化目标与评估条件，在约束内探索改进。',
        sourceIds: ['baidu-ernie-evolve-research-post'],
        locator: 'Research · November 9, 2026; introduction',
      },
      {
        label: '双循环',
        text: '外层选择研究方向，内层修改、测试候选实现；多个方向并行探索，并把实验经验用于后续选择。',
        sourceIds: ['baidu-ernie-evolve-research-post'], locator: 'ERNIE Evolve',
      },
      {
        label: '隔离评估不是第三方复现',
        text: '执行器在隔离环境改代码，评估程序置于被优化仓库之外且对 Agent 不可见，再由审查环节筛选。这里的 independent evaluator 是作者系统内部的独立评估程序，不是第三方复现。',
        sourceIds: ['baidu-ernie-evolve-research-post'], locator: 'ERNIE Evolve: Executor, Evaluator and Reviewer',
      },
      {
        label: '结果与开放边界',
        text: '作者报告了公开任务及开发中的 ERNIE-5.5-Flash 推理优化结果。Results 仓库提供部分结果代码、测量日志和复现实验说明，不等于开放完整研究系统、API 或模型权重。',
        sourceIds: ['baidu-ernie-evolve-research-post', 'baidu-ernie-evolve-results-repo'],
        locator: 'From Benchmarks to Real-World AI R&D; Results README: task/result/directory, Reproduce',
      },
      {
        label: '编辑解读：先检查约束，再谈自我改进',
        text: '应分别核对优化目标、硬件、基线与正确性检查；有限任务的结果不能推出开放式递归自我改进已经实现。',
        sourceIds: ['baidu-ernie-evolve-research-post', 'baidu-ernie-evolve-results-repo'], editorial: true,
        locator: '编辑归纳，依据 The Path Forward 与 Results README 的复现条件，非独立性能结论',
      },
    ],
    recommendedResources: [
      {
        id: 'ernie-evolve-system-reading', title: 'ERNIE Evolve：自动化研究系统与工程边界',
        creator: 'Baidu ERNIE', series: 'ERNIE · 官方研究', kind: 'article',
        url: 'https://ernie.baidu.com/research/posts/ernie-evolve/',
        publishedAt: '2026-11-09', checkedAt: '2026-11-10',
        match: '先读系统结构，再对照真实研发任务中的约束与评估流程。',
        scopeNote: '作者的一手研究披露，不是独立复现；模型仍在开发中。',
        locator: 'ERNIE Evolve; From Benchmarks to Real-World AI R&D; The Path Forward',
      },
      {
        id: 'ernie-evolve-results-reading', title: 'ERNIE Evolve Results：结果代码与日志入口',
        creator: 'Baidu · ernie-research', series: 'ERNIE · 实验资料', kind: 'article',
        url: 'https://github.com/ernie-research/ERNIE-Evolve-Results',
        checkedAt: '2026-11-10',
        match: '从 README 的任务目录进入代码、运行日志与硬件要求。',
        scopeNote: '已阅读公共仓库；未运行实验。结果工件开放不代表完整系统开放，仓库首发时间未单独确认。',
        locator: 'README: task/result/directory; Reproduce',
      },
    ],
  },
];
