import type { Entity, Source, TimelineEvent } from './types';

// Metadata-only verification on 2026-10-26: no model download or inference.
const checkedAt = '2026-10-26';
const root = 'https://huggingface.co/Nanbeige/Nanbeige4.3-33B';
export const nanbeigeSources: Source[] = [
  {
    id: 'nanbeige43-model-card', title: 'Nanbeige4.3-33B model card', publisher: 'Nanbeige LLM Lab',
    url: root, type: '官方文档', checkedAt,
    version: 'README c1093c5, 2026-10-25',
    locator: '§1 Introduction; §2 Model Performance and footnotes; §3 Quickstart; license and Inference Providers',
  },
  {
    id: 'nanbeige43-upload-commit', title: 'Upload folder using huggingface_hub — 0dacc64', publisher: 'Nanbeige LLM Lab',
    url: `${root}/commit/0dacc64718ab6a5a7cbfc74cacc663d6c5c3de05`,
    type: '官方文档', publishedAt: '2026-10-24', checkedAt,
    version: '0dacc64718ab6a5a7cbfc74cacc663d6c5c3de05',
    locator: 'Files changed (23): config.json, 14 safetensor shards and model.safetensors.index.json',
  },
  {
    id: 'nanbeige43-commit-history', title: 'Nanbeige4.3-33B commit history', publisher: 'Nanbeige LLM Lab',
    url: `${root}/commits/main`, type: '官方文档', checkedAt,
    locator: 'Oct 24: 11:57 upload 0dacc64; Oct 25: README updates ending c1093c5; display timezone unestablished',
  },
  {
    id: 'nanbeige43-files', title: 'Nanbeige4.3-33B files', publisher: 'Nanbeige LLM Lab',
    url: `${root}/tree/main`, type: '官方文档', checkedAt,
    locator: '66.3 GB file tree; model-00001-of-00014.safetensors through model-00014-of-00014.safetensors',
  },
  {
    id: 'nanbeige-lab-profile', title: 'Nanbeige LLM Lab organization card', publisher: 'Nanbeige LLM Lab',
    url: 'https://huggingface.co/Nanbeige', type: '官方文档', checkedAt,
    locator: 'Organization Card: Nanbeige / 南北阁; research team at BOSS Zhipin',
  },
  {
    id: 'nanbeige43-report-status', title: 'paper? — maintainer response #6', publisher: 'Nanbeige LLM Lab',
    url: `${root}/discussions/6`, type: '官方文档', checkedAt,
    locator: 'leran1995, Nanbeige LLM Lab org: technical report and Nanbeige4.3-3B remain upcoming',
  },
];

export const nanbeigeEntities: Entity[] = [
  {
    id: 'nanbeige', name: 'Nanbeige / 南北阁', type: 'family', company: '南北阁',
    description: 'BOSS直聘的南北阁研究团队所开发的模型家族；本资料集目前从4.3-33B的权重记录开始，不表示这是团队首个模型。',
    tags: ['开放权重', '编程', 'Agent'], sourceIds: ['nanbeige-lab-profile', 'nanbeige43-model-card'],
  },
];

export const nanbeigeEvents: TimelineEvent[] = [
  {
    id: 'nanbeige43-33b-weights', date: '2026-10-24',
    dateLabel: '2026年10月24日（官方仓库权重上传日）',
    title: 'Nanbeige4.3-33B：面向 Agent 的开放权重教师模型',
    company: '南北阁', kind: '权重开放', tracks: ['models'],
    summary: '南北阁公开33B参数的Nanbeige4.3-33B权重，面向编程与办公任务，并作为后续小模型蒸馏的教师。模型卡标注Apache-2.0许可及最长512K token上下文。',
    significance: '编辑解读：开放中等规模教师模型，为自部署任务型Agent与后续蒸馏研究增加一个可检查的选项。',
    limitation: '日期采用权重提交记录，不据此推定仓库转为公开的精确时刻。评测为厂商自报，未独立复测；3B学生模型和技术报告仍是后续计划。',
    entityIds: ['nanbeige'], sourceIds: nanbeigeSources.map(source => source.id),
    tags: ['开放权重', '教师模型', '编程', '工具调用'], milestone: false,
    change: {
      baseline: '本资料集首次收录Nanbeige家族；不是相对前代的独立对照测试',
      improvements: ['提供33B教师模型权重，面向编程、工具调用与办公任务', '模型卡支持最长524,288 token上下文及可配置推理模式'],
      tradeoffs: '性能表来自团队对指定模型和执行框架的比较，不能概括为普遍领先；BF16文件约66.3GB，不等同于完整部署内存需求。',
      evidence: '厂商报告', sourceIds: ['nanbeige43-model-card', 'nanbeige43-files'],
    },
    details: [
      {
        label: '日期：上传、文档更新与公开状态分开',
        text: '官方提交历史把0dacc64权重上传列在10月24日，模型卡随后于10月25日更新。此条按上传日期归档；本次确认仓库公开可读，未核实首次转为公开的时刻，也不把本次发现日写成发布日。',
        sourceIds: ['nanbeige43-upload-commit', 'nanbeige43-commit-history', 'nanbeige43-files'],
        locator: 'Oct 24 upload 0dacc64; Oct 25 README c1093c5; current Files tree',
      },
      {
        label: '实际权重与可用渠道',
        text: '上传提交包含14个safetensors分片及索引，当前文件页列出约66.3GB文件。核查仅查看文件元数据和下载入口，未下载或运行模型；Hugging Face卡片当时未列托管推理提供商，不等于存在已验证的官方API。',
        sourceIds: ['nanbeige43-upload-commit', 'nanbeige43-files', 'nanbeige43-model-card'],
        locator: 'Upload commit Files changed; Files tree; Inference Providers',
      },
      {
        label: '教师模型已经开放，学生仍待发布',
        text: '团队将33B版本定位为教师模型。维护者说明Nanbeige4.3系列技术报告将与后续3B学生模型一起发布；不能把现有权重、未来学生和未发布报告合并成一次完成的系列发布。',
        sourceIds: ['nanbeige43-model-card', 'nanbeige43-report-status'],
        locator: '§1 Introduction; discussion #6, leran1995 org response',
      },
      {
        label: '编辑解读：先读测试条件，再看成绩',
        text: '评测表的结论依赖思考强度、任务子集和执行框架。读者应先核对脚注，再决定是否在自己的任务上复测；本条不把厂商比较写成独立排名或部署保证。',
        sourceIds: ['nanbeige43-model-card'], editorial: true,
        locator: '编辑归纳，依据§2 Model Performance及12条脚注',
      },
    ],
    recommendedResources: [
      {
        id: 'nanbeige43-card-reading', title: 'Nanbeige4.3-33B：模型卡与评测条件',
        creator: 'Nanbeige LLM Lab', series: '官方模型卡', kind: 'article', url: root,
        checkedAt, match: '适合比较开放权重、教师模型定位与Agent测试条件。',
        scopeNote: '已读模型卡、提交与文件元数据；未下载权重、运行推理或复测分数。技术报告仍待发布。',
        locator: '§1–3; Model Performance footnotes; Files and Community #6',
      },
    ],
  },
];
