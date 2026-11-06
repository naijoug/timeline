import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-11-06';
const announcement = 'https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/';
const cloudAnnouncement = 'https://cloud.google.com/blog/products/ai-machine-learning/gemini-omni-1-2-flash-generally-available';
const modelDoc = 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-1-2-flash';

export const geminiOmni12Sources: Source[] = [
  { id: 'gemini-omni-12-announcement', title: 'Gemini Omni 1.2 Flash: Fast and cost-effective with longer clips', publisher: 'Google · Anish Nangia', url: announcement, type: '官方公告', publishedAt: '2026-11-05', checkedAt, locator: '视频生成与编辑时长；720p 价格及相对 1.1 的比较；Gemini API 与应用开放范围' },
  { id: 'gemini-omni-12-cloud-announcement', title: 'Gemini Omni 1.2 Flash: Fast, cost-effective, and reliable video generation and editing now generally available', publisher: 'Google Cloud · John Nack', url: cloudAnnouncement, type: '官方公告', publishedAt: '2026-11-05', checkedAt, locator: 'Google Cloud 正式可用；生成与编辑能力；Gemini for business 页首与 Get started 口径差异' },
  { id: 'gemini-omni-12-model-doc', title: 'Gemini Omni 1.2 Flash', publisher: 'Google Cloud Documentation', url: modelDoc, type: '官方文档', checkedAt, version: '2026-11-06 模型文档快照', locator: '模型 ID gemini-omni-1.2-flash；视频时长；首尾帧与延展限制；升分辨率；音频参考访问条件' },
  { id: 'gemini-omni-12-model-card', title: 'Gemini Omni 1.2 Flash Model Card', publisher: 'Google DeepMind', url: 'https://deepmind.google/models/model-cards/gemini-omni-1-2-flash/', type: '官方文档', publishedAt: '2026-11-05', checkedAt, locator: '模型卡版本与模型说明；能力和局限的厂商披露' },
];

export const geminiOmni12Events: TimelineEvent[] = [{
  id: 'gemini-omni-1-2-flash-ga',
  date: '2026-11-05',
  dateLabel: '2026年11月5日（Gemini API 与 Google Cloud 正式可用公告日）',
  title: 'Gemini Omni 1.2 Flash 在 API 与 Google Cloud 正式可用',
  subtitle: '视频生成与编辑 · 3–15 秒原生片段 · 应用端另有开放节奏',
  summary: 'Google 宣布 Gemini Omni 1.2 Flash 在 Gemini API 与 Google Cloud 正式可用，提供 3–15 秒原生视频生成与编辑；应用端开放范围需另行区分。',
  significance: '编辑概述：更长片段与较低标价让视频模型迭代同时涉及创作空间和试错成本；能否降低成片成本，仍取决于输出可用率与具体工作流。',
  limitation: '正式可用不代表全部应用或功能同时开放，也不是权重发布。时长、价格与能力依据官方公告及文档，本站未调用 API、生成视频或独立复测；升分辨率输出不能称为原生 4K。',
  company: 'Google', kind: 'API 与云端正式可用', tracks: ['models'], entityIds: ['gemini'],
  sourceIds: geminiOmni12Sources.map(source => source.id),
  tags: ['视频生成', '视频编辑', 'Gemini API', '正式可用'], milestone: true,
  change: {
    baseline: 'Gemini Omni 1.1（官方价格比较对象；本站尚未单独收录该前代事件）',
    improvements: ['原生视频生成与编辑覆盖 3–15 秒片段', 'Google 公布 720p 每秒 0.07 美元，并称较 1.1 降低 30%', 'Gemini API 与 Google Cloud 的 1.2 Flash 模型进入正式可用阶段'],
    tradeoffs: '首尾帧和延展仍有每步最多 10 秒的限制；音频参考需要白名单授权。较低秒价不保证总项目成本按相同比例下降。',
    evidence: '厂商报告', sourceIds: ['gemini-omni-12-announcement', 'gemini-omni-12-cloud-announcement', 'gemini-omni-12-model-doc'],
  },
  details: [
    { label: '经过：公告日与可用渠道', text: '11月5日，Google 与 Google Cloud 分别发布公告，模型文档列出的正式模型 ID 为 gemini-omni-1.2-flash。本事件记录 Gemini API 与 Google Cloud 的正式可用。两份官方公告对 Gemini for business 的文字不完全一致：The Keyword 将其写为 generally available，Cloud 公告页首也称可用，但 Get started 仍写 coming soon。本站保留这一来源差异，不据此断言该应用对所有用户同时开放；Gemini app 另标为向 Google AI Ultra 订阅者分批推出。', sourceIds: ['gemini-omni-12-announcement', 'gemini-omni-12-cloud-announcement', 'gemini-omni-12-model-doc'], locator: '两份公告的发布日期与可用渠道；模型文档 Model ID' },
    { label: '背景：视频生成与编辑的同一轮迭代', text: '这次更新同时覆盖生成和编辑工作流。官方以 Gemini Omni 1.1 作为价格比较对象，重点介绍更长片段与较低标价；这不等于公布模型权重，也不能据此推断所有视频任务的质量均有提升。', sourceIds: ['gemini-omni-12-announcement', 'gemini-omni-12-cloud-announcement'], locator: '生成与编辑能力；价格比较；正式可用说明' },
    { label: '时长：原生片段与分步操作不同', text: '一般视频生成与编辑支持 3–15 秒原生片段；指定首尾帧及视频延展仍受每步最多 10 秒限制。不能把 15 秒上限套用到所有调用模式，也不能把多步拼接或延展的总时长称为一次原生生成。', sourceIds: ['gemini-omni-12-announcement', 'gemini-omni-12-model-doc'], locator: '视频时长；first and last frame；video extension' },
    { label: '分辨率与价格：保留计费口径', text: '官方列出 720p 每秒 0.07 美元，并称相较 1.1 降低 30%；这是厂商标价比较，不是本站实测账单。模型提供升分辨率（upscale）能力，不能将其描述为原生 4K；较高分辨率与具体操作的费用应按各自计费条件核对。', sourceIds: ['gemini-omni-12-announcement', 'gemini-omni-12-model-doc'], locator: '720p pricing；upscale 与输出分辨率' },
    { label: '访问边界：按功能与模型 ID 核查', text: '音频参考功能仍需要白名单授权，不能由模型正式可用推断所有输入方式均已无门槛开放。旧预览模型的退役安排应按各自模型 ID 区分，不能移植为 gemini-omni-1.2-flash 的退役日期；官方模型卡也不等于独立评测。', sourceIds: ['gemini-omni-12-model-doc', 'gemini-omni-12-model-card'], locator: '音频参考访问条件；模型 ID；模型卡版本与说明' },
    { label: '编辑分析：按可交付片段验收迭代', text: '这轮变化值得从单次可编辑时长、输出可用率和多轮返工成本共同评估。较长片段和较低秒价提供更大的试验空间，但只有在相同分辨率、相同任务和相同验收标准下比较，才能判断是否真正省下制作时间与预算。以上是编辑归纳，不是官方或独立评测结论。', editorial: true, sourceIds: ['gemini-omni-12-announcement', 'gemini-omni-12-model-doc'], locator: '编辑归纳，依据时长、计价和功能边界' },
  ],
  recommendedResources: [
    { id: 'gemini-omni-12-release-reading', title: 'Gemini Omni 1.2 Flash: Fast and cost-effective with longer clips', creator: 'Anish Nangia · Product Manager, Google DeepMind', series: 'Google 官方博客', kind: 'article', url: announcement, publishedAt: '2026-11-05', checkedAt, match: '对照本次发布的片段时长、标价与开放渠道，理解官方所说的更长和更低成本各指什么。', scopeNote: '厂商发布说明；未实测模型，也未把嵌入示例视为独立质量评测。', locator: '视频生成与编辑；定价；可用范围' },
    { id: 'gemini-omni-12-editing-guide', title: 'Edit videos', creator: 'Google Cloud Documentation', series: 'Google Cloud · 视频编辑文档', kind: 'article', url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/edit-videos', checkedAt, match: '将发布说明落到具体视频编辑流程，阅读输入、编辑请求与限制如何影响实际调用。', scopeNote: '动态技术文档，仅核查阅读入口与相关内容；未执行示例或发起付费请求，支持范围以所用模型 ID 的文档为准。', locator: '视频编辑请求与使用限制' },
  ],
}];
