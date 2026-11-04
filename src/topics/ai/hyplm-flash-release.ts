import type { Entity, Source, TimelineEvent } from './types';

const checkedAt = '2026-11-04';
const repo = 'https://github.com/Tencent-Hunyuan/Hyra-results';
const release = `${repo}/releases/tag/hyplm-flash-weights`;
const sourceIds = ['hyplm-release-news', 'hyplm-model-readme', 'hyplm-weights', 'hyplm-license'];
export const hyplmSources: Source[] = [
  { id: sourceIds[0], title: 'Hyra-results · News', publisher: 'Tencent Hunyuan', url: repo, type: '官方公告', checkedAt, publishedAt: '2026-11-02', locator: 'News: 2026-11-02 HyPLM-Flash release' },
  { id: sourceIds[1], title: 'HyPLM-Flash · model and inference documentation', publisher: 'Tencent Hunyuan', url: `${repo}/blob/main/AI4Science/hyplm_flash/README.md`, type: '官方文档', checkedAt, locator: 'Model description; inference precision; License', version: '核读官方 raw README；未安装或运行推理代码。' },
  { id: sourceIds[2], title: 'HyPLM-Flash model weights', publisher: 'Tencent Hunyuan', url: release, type: '官方公告', checkedAt, locator: 'FP32 weights; two shards; merge and SHA-256 instructions', version: '已核对发布页与下载指令，未下载2.61 GB权重或独立校验其哈希。' },
  { id: sourceIds[3], title: 'HyPLM-Flash · MIT License', publisher: 'Tencent Hunyuan', url: `${repo}/blob/main/AI4Science/hyplm_flash/LICENSE`, type: '官方文档', checkedAt, locator: '子目录 README 标注 MIT；LICENSE 含第三方模型权重等许可保留说明' },
];
export const hyplmEntities: Entity[] = [{ id: 'hyplm', name: 'HyPLM', type: 'family', company: '腾讯', description: '腾讯混元蛋白质语言模型；本专题记录 Flash 650M 的权重与推理实现发布。', tags: ['蛋白质语言模型', '科学模型'], sourceIds }];
export const hyplmEvents: TimelineEvent[] = [{
  id: 'hyplm-flash-release', date: '2026-11-02', dateLabel: '2026年11月2日（官方仓库公告日；仅日精度）',
  title: '腾讯混元发布 HyPLM-Flash 650M 蛋白质语言模型', company: '腾讯', kind: '科学模型权重与推理实现发布', tracks: ['models'], entityIds: ['hyplm'], sourceIds, milestone: false,
  summary: '腾讯混元公开 HyPLM-Flash 的6.5亿参数模型权重、推理代码和技术报告，面向蛋白质序列表征与突变评分等研究任务。',
  significance: '编辑解读：蛋白质语言模型的研究价值不仅取决于任务表现，也取决于研究者能否取得权重、复现推理并理解许可范围。',
  limitation: '仅核读官方材料，未下载权重、运行推理或复现性能。该项模型发布不表示 Hyra 平台整体开源，也不等同于实验或临床验证。',
  tags: ['蛋白质语言模型', '科学模型', '开放权重', '推理优化'],
  change: { baseline: '本专题首次收录 HyPLM；比较范围为权重与推理实现的发布内容，不推断相对未收录前代的能力提升', improvements: ['公开650M蛋白质语言模型权重', '提供INT8 GPU推理引擎与BF16模式', '提供技术报告及权重分片合并校验说明'], tradeoffs: '发布权重为FP32，INT8是推理实现选项；性能属于团队报告，未独立复现。', evidence: '厂商报告', sourceIds },
  details: [
    { label: '发布：聚焦一项研究成果', text: 'Hyra-results 的 News 将 HyPLM-Flash 发布标为2026年11月2日，并列出模型权重、推理代码和报告。这里记录其中一项蛋白质模型成果，不把同批项目或整个 Hyra 平台都称为开源。', sourceIds: [sourceIds[0]], locator: 'News: 2026-11-02' },
    { label: '权重：FP32发布与INT8推理分开', text: 'Release 提供约2.61 GB的FP32权重，拆为两个分片，并说明合并与SHA-256校验方法。文档中的默认INT8 GPU推理和BF16模式是运行选项，不能把已发布文件本身称为INT8权重。', sourceIds: [sourceIds[1], sourceIds[2]], locator: 'Inference precision; Release download and merge instructions' },
    { label: '许可：以模型子目录为准', text: 'HyPLM-Flash 子目录 README 标注MIT，LICENSE 对软件与相关文档给出MIT条款，并注明第三方模型权重、数据集与兼容实现保留各自许可。仓库根默认采用Apache-2.0，但允许另行指定。本次未确认Release权重是否另有专门许可声明，不将目录许可直接表述为所有权重的许可。', sourceIds: [sourceIds[1], sourceIds[3]], locator: 'License; model-specific LICENSE' },
    { label: '验证：公开文件不等于独立复现', text: '本次核对了官方发布页、文档和许可文本，没有下载2.61 GB二进制、验证合并哈希或运行模型。吞吐量与任务成绩如见于报告，均为团队报告，不是本站独立结果；研究预测仍需相应实验验证。', sourceIds: [sourceIds[1], sourceIds[2]], locator: '官方说明与本站核验范围' },
  ],
  recommendedResources: [{ id: 'hyplm-flash-reading', title: 'HyPLM-Flash 模型与推理说明', creator: 'Tencent Hunyuan', kind: 'article', url: `${repo}/blob/main/AI4Science/hyplm_flash/README.md`, checkedAt, match: '对照模型用途、权重格式、推理精度与许可边界阅读。', scopeNote: '官方研究文档；未运行推理、复现基准或验证实验结论。' }],
}];
