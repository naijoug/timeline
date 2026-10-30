import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-10-26';
const root = 'https://huggingface.co/tencent/Hy-SimulMT-30B-A3B-Interleave';
const revision = '2f3d831b8fe28e2597091598ed60a376a3db5bc0';
export const hySimulmtSources: Source[] = [
  { id: 'hy-simulmt-card', title: 'Hy-SimulMT: A Low-Latency, High-Quality Model for Real-Time Simultaneous Translation', publisher: '腾讯混元', url: `${root}/blob/${revision}/README.md`, type: '官方文档', publishedAt: checkedAt, checkedAt, version: revision, locator: 'News: 2026.10.26; Introduction; Results; Model Links; Deploy inference → llama.cpp' },
  { id: 'hy-simulmt-files', title: 'Hy-SimulMT-30B-A3B-Interleave files', publisher: '腾讯混元', url: `${root}/tree/${revision}`, type: '官方文档', checkedAt, version: revision, locator: '17 safetensors shards, index and audio tower; repository size 60.8 GB' },
  { id: 'hy-simulmt-upload', title: 'Hy-SimulMT-30B-A3B-Interleave initial weight upload', publisher: '腾讯混元', url: `${root}/commit/da7f540744bee4c3003935dbb770cae9cf12ab81`, type: '官方文档', publishedAt: '2026-10-24', checkedAt, version: 'da7f540744bee4c3003935dbb770cae9cf12ab81', locator: 'Upload folder using huggingface_hub; weight-file changes, not first-public timestamp' },
  { id: 'hy-simulmt-project', title: 'Hy-SimulMT · SimulInfer and SimulTrain', publisher: '腾讯混元', url: 'https://github.com/Tencent-Hunyuan/Hy-SimulMT', type: '官方文档', checkedAt, locator: 'Introduction; Model Links; Deploy inference; Train — SimulTrain' },
  { id: 'hy-simulmt-license', title: 'Hy-SimulMT LICENSE.txt', publisher: '腾讯混元', url: `${root}/blob/${revision}/LICENSE.txt`, type: '官方文档', checkedAt, version: revision, locator: 'Apache License 2.0; Third-Party Components Notice' },
];

export const hySimulmtEvents: TimelineEvent[] = [{
  id: 'hy-simulmt-open-weights', date: '2026-10-26', dateLabel: '2026年10月26日（官方发布公告日）',
  title: 'Hy-SimulMT 开放权重：中英实时同传与配套工具',
  company: '腾讯', kind: '权重开放', tracks: ['models'], entityIds: ['hunyuan'], milestone: false,
  summary: '腾讯混元发布 Hy-SimulMT 中英双向流式同传模型，提供翻译输出与原文／译文交错输出两类模型资源，以及 SimulInfer 推理和 SimulTrain 训练工具。',
  significance: '编辑解读：把持续音频翻译的等待时间、信息完整性与工程部署放在同一条研究路线中，给实时跨语言应用增加可检查的模型与工具。',
  limitation: '语音输出和声音克隆需另配 TTS 服务，不是下载翻译权重就获得完整语音系统。日期取官方 News；不能用仓库创建或早期上传时间推定首次公开时刻。评测未独立复测。',
  sourceIds: hySimulmtSources.map(source => source.id), tags: ['同声传译', '流式音频', '中英双向', '开放权重'],
  change: {
    baseline: '本资料集首次收录 Hy-SimulMT 专门同传路线；不以混元通用模型为直接性能基线',
    improvements: ['持续接收音频并增量生成中英翻译', '提供 translation-only 与 Interleave 两类输出资源', '配套 SimulInfer 推理服务和 SimulTrain 训练工具'],
    tradeoffs: '约3秒是团队 RealSI 测试的 StreamLAAL 平均滞后，不是首段语音响应时间；TTS、推理硬件及部署配置另有要求。',
    evidence: '厂商报告', sourceIds: ['hy-simulmt-card', 'hy-simulmt-project'],
  },
  details: [
    { label: '背景：边听边译需要权衡等待与语义', text: '同传不能总等一句话结束再翻译。团队把增量理解、翻译质量与等待时间一同评估；本次正文明确支持中英双向，不把模型卡的多语言元数据标签当作已验证的多语言同传能力。', sourceIds: ['hy-simulmt-card'], locator: 'Introduction; Results → Keeping Up Faster, Conveying Meaning More Accurately' },
    { label: '发布与权重：公告日不同于上传日', text: '官方 News 将发布记为2026年10月26日。Interleave 仓库早在10月24日已有权重上传；本次确认公开文件页列出17个 safetensors 分片及音频编码组件，仓库约60.8GB。这里只核验文件元数据和入口，未下载权重或运行推理，也不据提交时间推定首次公开的精确时刻。', sourceIds: ['hy-simulmt-card', 'hy-simulmt-files', 'hy-simulmt-upload'], locator: 'News; pinned Files tree; da7f540 weight upload' },
    { label: '可用范围：模型、语音服务与推理后端分开', text: '普通版输出译文，Interleave 同时输出原文和译文；官方还列出 FP8 与 GGUF 资源。语音输出和声音克隆需要配置 TTS 服务。核查时官方明确说明 llama.cpp 支持尚未合并上游，并建议等待支持该模型的新版本；不能把 GGUF 文件存在写成官方 llama.cpp 已可直接运行。许可证采用 Apache-2.0，第三方组件仍保留原许可要求。', sourceIds: ['hy-simulmt-card', 'hy-simulmt-project', 'hy-simulmt-license'], locator: 'Model Links; Deploy inference → llama.cpp; Introduction; LICENSE Third-Party Components Notice' },
    { label: '评测边界：约3秒不等于语音首包延迟', text: '团队在 RealSI 长音频测试中报告约3秒 StreamLAAL，原文明确它衡量流式翻译滞后，不是首次语音输出耗时。与专业译员的比较仅涉及18段约6分钟录音和6名参与者，不足以概括为普遍替代人类，也未全面评估语音质量或音色相似度；示范视频是离线回放，不作实时延迟测量。', sourceIds: ['hy-simulmt-card'], locator: 'Results → RealSI figure note; A Matched Comparison with Professional Simultaneous Interpreters; Beyond Text demo note' },
    { label: '编辑分析：先验证整条链路，再判断体验', text: '我们认为同传产品应分别测量翻译滞后、首段可听输出、纠错与信息遗漏，而非用单一秒数代表用户体验。开放权重有助于检查和定制，但实际体验还取决于音频输入、TTS 与部署条件；重要场景仍需人工复核。', editorial: true, sourceIds: ['hy-simulmt-card'], locator: '编辑归纳，依据官方评测与部署边界' },
  ],
  recommendedResources: [{ id: 'hy-simulmt-card-reading', title: 'Hy-SimulMT：模型卡、评测口径与部署说明', creator: '腾讯混元 Hy-SimulMT 团队', series: 'Hugging Face 官方模型卡', kind: 'article', url: `${root}/blob/${revision}/README.md`, publishedAt: checkedAt, checkedAt, match: '将中英同传、两类输出形式、延迟指标和 TTS 依赖放在一起阅读，适合判断模型开放与完整产品之间还差哪些环节。', scopeNote: '已核验正文、文件元数据与官方代码仓库；未运行推理、重测分数或播放全部演示视频。页面中的示范视频不能作为实时延迟实测。', locator: 'Introduction; Results; Model Links; Deploy inference' }],
}];
