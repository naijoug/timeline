import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-11-06';
const announcement = 'https://openai.com/index/introducing-images-2-6/';
const changelog = 'https://developers.openai.com/api/docs/changelog';
const systemCard = 'https://deploymentsafety.openai.com/chatgpt-images-2-6';
const guide = 'https://developers.openai.com/api/docs/guides/image-generation';
const modelUrl = (variant: string) => `https://developers.openai.com/api/docs/models/gpt-image-2.6-${variant}`;

export const images26Sources: Source[] = [
  { id: 'images-26-announcement', title: 'Introducing Images 2.6', publisher: 'OpenAI', url: announcement, type: '官方公告', publishedAt: '2026-11-04', checkedAt, locator: 'Pricing and availability；Flare 与 Sunburst 定位；厂商速度陈述' },
  { id: 'images-26-changelog', title: 'OpenAI API Changelog · November 4, 2026', publisher: 'OpenAI', url: changelog, type: '官方文档', publishedAt: '2026-11-04', checkedAt, locator: 'Nov 4：两款 2.6 模型与 Images generations / edits；Sep 8 的 2.5 与 Apr 21 的 2 为背景' },
  { id: 'images-26-system-card', title: 'ChatGPT Images 2.6 System Card', publisher: 'OpenAI', url: systemCard, type: '官方文档', publishedAt: '2026-11-04', checkedAt, locator: 'Introduction：GIF 与 SVG 渠道；3.2.1：离线安全评测的解释边界' },
  ...(['flare', 'sunburst'] as const).map(variant => ({ id: `images-26-${variant}-model`, title: `GPT-Image-2.6 ${variant === 'flare' ? 'Flare' : 'Sunburst'} Model`, publisher: 'OpenAI API', url: modelUrl(variant), type: '官方文档' as const, checkedAt, version: '2026-11-06 模型文档快照', locator: '模型身份与生成/编辑定位；complexity、markup、SVG、GIF 指南入口' })),
  { id: 'images-26-guide', title: 'Image generation · GPT Image 2.6', publisher: 'OpenAI API', url: guide, type: '官方文档', checkedAt, version: '2026-11-06 指南快照', locator: 'GPT Image 2.6 / Set image complexity / Guide an edit with markup' },
];

export const images26Events: TimelineEvent[] = [{
  id: 'openai-images-2-6-release', date: '2026-11-04',
  dateLabel: '2026年11月4日（官方产品公告与 API 发布日志日期）',
  title: 'OpenAI Images 2.6 发布：Flare 与 Sunburst',
  subtitle: 'ChatGPT、Codex 与 API · GIF 动画 · 可控编辑',
  summary: 'OpenAI 发布 Images 2.6，ChatGPT 与 Codex 当日全球上线，API 提供 Flare 和 Sunburst；GIF 覆盖 ChatGPT 与 API，SVG 输出仅在 API 提供。',
  significance: '编辑概述：图像迭代进一步连接局部修改、动画与矢量交付；选择模型之外，还需按任务分别设置生成规划和画面质量。',
  limitation: '这是产品与 API 发布，不是权重发布。速度与质量提升属于厂商陈述，本站未调用 API、生成图片或独立复测；功能开放不保证每次输出满足交付要求。',
  company: 'OpenAI', kind: '产品与 API 发布', tracks: ['models'], entityIds: ['gpt'],
  sourceIds: images26Sources.map(source => source.id), tags: ['图像生成', '图像编辑', 'GIF', 'SVG', 'GPT Image'], milestone: true,
  change: {
    baseline: 'GPT Image 2.5 Flare / Sunburst（直接前代；本站尚未单独收录 Images 2 或 2.5 事件）',
    improvements: ['两款 2.6 模型分别面向快速迭代和细致视觉编辑', '增加 GIF 动画与 API SVG 输出', 'complexity 与 quality 分别控制规划和渲染，API 增加标记引导编辑'],
    tradeoffs: '标记引导编辑也覆盖支持的 2.5 模型，并非 2.6 独有；较高 complexity 可能增加延迟和非预期修改。',
    evidence: '厂商报告', sourceIds: ['images-26-changelog', 'images-26-guide', 'images-26-flare-model', 'images-26-sunburst-model'],
  },
  details: [
    { label: '背景：从 Images 2 到 2.5 双模型', text: 'API 日志将 GPT Image 2 的发布记于4月21日，将 2.5 Sunburst / Flare 记于9月8日。2.6 延续双模型路线；本站尚未单独收录这两个前代事件，因此不建立虚构的前代事件链接。', sourceIds: ['images-26-changelog'], locator: 'Apr 21、Sep 8、Nov 4 发布条目' },
    { label: '经过：产品与 API 同日发布', text: '11月4日公告称 Images 2.6 在 ChatGPT、Codex 的所有订阅档位全球可用，覆盖桌面、移动和网页端。同日 API 日志列出 gpt-image-2.6-flare 与 gpt-image-2.6-sunburst，以及 /v1/images/generations、/v1/images/edits 两个端点。', sourceIds: ['images-26-announcement', 'images-26-changelog'], locator: 'Pricing and availability；Nov 4 Feature' },
    { label: '模型选择：速度陈述保留条件', text: '模型页将 Flare 定位于交互式生成与编辑，Sunburst 定位于精细构图和编辑。OpenAI 宣称整体生成速度提升 50%，Flare 在 quality=low 时最快约 6 秒；Sunburst 在 medium / high 质量下侧重细节和多轮编辑一致性。这些是厂商陈述，不是平均延迟承诺或本站实测。', sourceIds: ['images-26-announcement', 'images-26-flare-model', 'images-26-sunburst-model'], locator: 'Faster iteration；两款模型的用途描述' },
    { label: '输出边界：GIF 双端，SVG 仅 API', text: '系统卡明确 GIF 生成覆盖 ChatGPT 与 API，SVG 输出仅在 API 提供。产品上线范围不能直接当作所有渠道的格式支持清单，也不能把 GIF 生成功能当作通用视频模型发布。', sourceIds: ['images-26-system-card'], locator: '1. Introduction' },
    { label: '编辑控制：markup、complexity 与 quality', text: 'markup 用标记层指明修改位置，API 此次也向支持的 GPT Image 2.5 模型提供标记引导编辑，并非 2.6 独有。complexity 调整渲染前的规划，支持 low / medium / high，省略时两款模型均默认 high；quality 单独控制渲染质量。指南提醒，高复杂度可能增加延迟和非预期修改，不能当作越高越好的统一质量档。', sourceIds: ['images-26-guide', 'images-26-changelog'], locator: 'Set image complexity；Guide an edit with markup；Nov 4' },
    { label: '安全证据：离线挑战集不代表线上比例', text: '系统卡沿用 2.5 的安全框架，并补充 GIF 防护。其安全评测基于同一组 3,077 条挑战请求的保存输出，对比各自的 2.5 基线；未被拦截的不安全输出是离线结果，不能解释为实际交付给用户的比例或生产违规率。', sourceIds: ['images-26-system-card'], locator: '1. Introduction；3.2.1 Safety Evaluations 与指标定义' },
    { label: '编辑分析：按修改成功率选择工作流', text: '这次迭代的价值不只在首次出图更快，也在于能否少返工并交付需要的格式。适合用同一素材比较局部修改成功率、未指定区域的稳定性和总耗时，再选择模型及参数。以上是编辑归纳，不是官方或独立评测结论。', editorial: true, sourceIds: ['images-26-guide', 'images-26-system-card'], locator: '编辑归纳，依据编辑控制与格式边界' },
  ],
  recommendedResources: [
    { id: 'images-26-release-reading', title: 'Introducing Images 2.6', creator: 'OpenAI', series: 'OpenAI 官方发布', kind: 'article', url: announcement, publishedAt: '2026-11-04', checkedAt, match: '先读模型定位与开放范围，保留速度陈述所附的质量条件。', scopeNote: '厂商公告，不是独立性能评测。', locator: 'Faster iteration；Pricing and availability' },
    { id: 'images-26-guide-reading', title: 'Image generation · GPT Image 2.6', creator: 'OpenAI API', series: '开发者指南', kind: 'article', url: guide, checkedAt, match: '对照 complexity、quality 和 markup 的职责，检查 2.5 与 2.6 支持范围。', scopeNote: '动态文档；未执行示例或发起付费请求。', locator: 'Set image complexity；Guide an edit with markup' },
    { id: 'images-26-safety-reading', title: 'ChatGPT Images 2.6 System Card', creator: 'OpenAI', series: 'Deployment Safety Hub', kind: 'article', url: systemCard, publishedAt: '2026-11-04', checkedAt, match: '核对 GIF / SVG 的渠道边界，理解安全评测分母与离线结果。', scopeNote: '厂商安全披露，不代表生产环境违规率。', locator: 'Introduction；3.2.1 Safety Evaluations' },
  ],
}];
