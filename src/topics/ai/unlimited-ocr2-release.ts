import type { Entity, Source, TimelineEvent } from './types';

const checkedAt = '2026-10-27';
const root = 'https://huggingface.co/baidu/Unlimited-OCR-2';
const revision = '04647c7a6098d8d58915f003536a741c82eafb40';
export const unlimitedOcrSources: Source[] = [
  { id: 'unlimited-ocr2-card', title: 'Unlimited OCR Works 2 · model card', publisher: '百度', url: `${root}/blob/${revision}/README.md`, type: '官方文档', publishedAt: checkedAt, checkedAt, version: revision, locator: 'Release; What’s New in 2; Inference; Notes on the knobs that matter for memory' },
  { id: 'unlimited-ocr2-index', title: 'Unlimited-OCR-2 · weight index', publisher: '百度', url: `${root}/blob/${revision}/model.safetensors.index.json`, type: '官方文档', checkedAt, version: revision, locator: 'metadata.total_size and weight_map: two safetensors shards' },
  { id: 'unlimited-ocr2-project', title: 'Unlimited-OCR · official project', publisher: '百度', url: 'https://github.com/baidu/Unlimited-OCR', type: '官方文档', checkedAt, locator: 'Release: 2026/10/27; What’s New in 2; Inference' },
  { id: 'unlimited-ocr2-license', title: 'Unlimited-OCR · MIT License', publisher: '百度', url: 'https://github.com/baidu/Unlimited-OCR/blob/main/LICENSE', type: '官方文档', checkedAt, locator: 'MIT License; Copyright (c) 2026 Baidu' },
];
export const unlimitedOcrEntities: Entity[] = [{ id: 'unlimited-ocr', name: 'Unlimited-OCR', type: 'family', company: '百度', description: '面向跨页文档解析的 OCR 模型路线；与文心通用模型分开记录。', tags: ['文档解析', 'OCR', '开放权重'], sourceIds: ['unlimited-ocr2-card'] }];
export const unlimitedOcrEvents: TimelineEvent[] = [{
  id: 'unlimited-ocr2-open-weights', date: checkedAt, dateLabel: '2026年10月27日（官方发布公告日）',
  title: 'Unlimited-OCR 2 开放权重：面向超长文档的跨页解析',
  company: '百度', kind: '权重开放', tracks: ['models'], entityIds: ['unlimited-ocr'], milestone: false,
  summary: '百度发布 Unlimited-OCR 2，提出稀疏参考滑动窗口注意力（SR-SWA），并公开模型权重、推理代码和跨页文档解析说明。',
  significance: '编辑解读：把关注点从单页识字扩展到长文档中的跨页上下文与部署成本，为文档处理提供可检查的专门模型。',
  limitation: '“Unlimited”是项目命名和团队技术主张，不代表任意长度、任意硬件都能无损解析；未下载权重、运行推理或独立复测评测。',
  sourceIds: unlimitedOcrSources.map(source => source.id), tags: ['OCR', '跨页解析', '长文档', '开放权重'],
  change: { baseline: '官方将2026年6月22日发布的 Unlimited-OCR 第一代作为项目历史背景，不直接推定所有部署性能提升', improvements: ['SR-SWA 使用有限参考集合组织长序列注意力', '提供多页联合解析与单页解析接口', '公开两片权重及 Transformers、定制 SGLang 部署说明'], tradeoffs: '页面窗口缩小可降低内存峰值，但官方提醒跨窗口连续内容可能丢失上下文；需要按文档与硬件条件测试。', evidence: '厂商报告', sourceIds: ['unlimited-ocr2-card', 'unlimited-ocr2-project'] },
  details: [
    { label: '背景：从单页文字到跨页文档', text: '表格、段落与结构可能跨页延续。官方项目在2026年6月发布第一代，本次第二代针对长文档解析提出 SR-SWA；这是专门的文档模型更新，不是文心通用模型的新版本。', sourceIds: ['unlimited-ocr2-card', 'unlimited-ocr2-project'], locator: 'Release; What’s New in 2' },
    { label: '发布状态：已列出权重，不只是计划', text: '官方模型卡和代码仓库都把发布公告记为10月27日。核验时公开模型仓库列出两个 safetensors 分片，固定版本的权重索引记录总大小6,687,958,536字节。此处核验文件元数据和下载入口，不把仓库创建时间视为首次公开时间，也未下载完整权重。模型卡标记 MIT，代码仓库提供 MIT 许可证。', sourceIds: ['unlimited-ocr2-card', 'unlimited-ocr2-index', 'unlimited-ocr2-license'], locator: 'Release; YAML license; metadata.total_size; weight_map; LICENSE' },
    { label: '方法主张：有限参考，不等于无限资源', text: '团队称 SR-SWA 将文本与视觉信息的注意力交互压缩到固定大小的工作参考集合，并据此降低长文档逐步解码的开销。这是团队的机制解释与性能主张，不代表全部处理阶段、所有文档质量和总运行时间都与长度无关。', sourceIds: ['unlimited-ocr2-card'], locator: 'What’s New in 2; Inference' },
    { label: '部署边界：窗口大小仍有代价', text: '官方提供 Transformers 多页与单页接口，并推荐定制 SGLang 服务配置；说明中列出的测试硬件是 NVIDIA A800-80GB。官方明确提醒，缩小页面窗口可降低内存峰值，但跨窗口的连续内容可能失去上下文。这里不承诺普通电脑开箱即用，也不把模型卡自报的领先结果视为独立评测。', sourceIds: ['unlimited-ocr2-card'], locator: 'Inference → Transformers; SGLang → Notes on the knobs that matter for memory' },
    { label: '编辑分析：用完整文档验收，而非只看页数', text: '我们认为实际选型应同时检查跨页表格、阅读顺序、遗漏和资源占用，并保留原页供人工核对。开放模型与代码有助于复现，但“可获取”与“已在自己的业务数据上可靠运行”是两项不同的验收。', editorial: true, sourceIds: ['unlimited-ocr2-card'], locator: '编辑归纳，依据部署说明的窗口与资源边界' },
  ],
  recommendedResources: [{ id: 'unlimited-ocr2-reading', title: 'Unlimited OCR Works 2：方法更新与推理配置', creator: '百度 Unlimited-OCR 团队', series: 'Hugging Face 官方模型卡', kind: 'article', url: `${root}/blob/${revision}/README.md`, publishedAt: checkedAt, checkedAt, match: '具体阅读多页接口、SGLang 配置和内存说明，理解跨页解析能力与工程限制为何需要一起判断。', scopeNote: '核验了模型卡、权重索引和官方代码说明；没有实际运行推理、复测榜单或完整评审论文。此为一手技术资料，不是独立节目解读。', locator: 'What’s New in 2; Inference; Notes on the knobs that matter for memory' }],
}];
