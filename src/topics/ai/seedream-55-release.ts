import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-11-10';
const announcement = 'https://seed.bytedance.com/en/blog/more-realistic-images-more-stable-editing-across-100-rounds-introducing-seedream-5-5';
const chineseAnnouncement = 'https://seed.bytedance.com/zh/blog/more-realistic-images-more-stable-editing-across-100-rounds-introducing-seedream-5-5?view_from=content_recommend';
const product = 'https://seed.bytedance.com/en/seedream5_5';

export const seedream55Sources: Source[] = [
  { id: 'seedream-55-announcement', title: 'Introducing Seedream 5.5', publisher: 'ByteDance Seed', url: announcement, type: '官方公告', publishedAt: '2026-11-09', checkedAt, locator: 'Introduction; Multi-turn editing; Summary and outlook' },
  { id: 'seedream-55-announcement-zh', title: '生成更真实，百轮编辑更稳定｜Seedream 5.5 发布', publisher: '字节跳动 Seed', url: chineseAnnouncement, type: '官方公告', publishedAt: '2026-11-09', checkedAt, locator: '发布日期；体验入口；总结与展望' },
  { id: 'seedream-55-product', title: 'Seedream 5.5', publisher: 'ByteDance Seed', url: product, type: '官方文档', checkedAt, version: '2026-11-10 核查快照', locator: 'Multi-turn editing; Transparent creatives in one step' },
];

export const seedream55Events: TimelineEvent[] = [{
  id: 'seedream-5-5-release', date: '2026-11-09', dateLabel: '2026年11月9日（官方公告日）',
  title: 'Seedream 5.5：原生透明素材与多轮图像编辑',
  subtitle: '原生 RGBA · 局部编辑 · 渐进上线',
  summary: '字节跳动发布图像创作模型 Seedream 5.5，改善透明素材生成、多轮局部编辑和小字渲染，并陆续接入旗下创作平台。',
  significance: '编辑概述：图像模型更贴近可复用素材与持续修改的设计流程；透明输出和编辑稳定性需要结合具体作品检验。',
  limitation: '能力来自厂商报告与演示，本站未实测；渐进上线不等于所有账户均可用。本轮未核实生产 API 标识、价格或开放权重及许可，5.5 Pro 仍是后续计划。',
  tracks: ['models'], company: '字节跳动', entityIds: ['seedream'],
  sourceIds: seedream55Sources.map(source => source.id), kind: '模型发布', milestone: true,
  announcementGroup: 'seedream-5-5', tags: ['图像生成', '图像编辑', '透明素材'],
  change: {
    baseline: '此前收录的 Seedream 5.0 Pro', baselineEventId: 'seedream-5-pro',
    improvements: ['新增原生 RGBA 透明与半透明素材输出', '厂商报告多轮编辑稳定性、真实感与小字渲染改善'],
    tradeoffs: '本次发布的是标准 Seedream 5.5，不是5.5 Pro；前代对照为5.0 Pro，版本名称不同不代表同一档位。上线范围与实际效果仍须逐渠道核对。',
    evidence: '厂商报告', sourceIds: ['seedream-55-announcement', 'seedream-55-announcement-zh'],
  },
  details: [
    { label: '多轮编辑的演示边界', text: '官方展示对同一人物图像连续100轮修改，称非编辑区域可像素级保持并减少色偏与细节损失。这是厂商演示，不保证任意输入或每轮编辑均能达到同样效果。', sourceIds: ['seedream-55-announcement'], locator: 'Multi-turn editing' },
    { label: '原生透明素材', text: '模型可从文字或参考图生成带 Alpha 通道的 RGBA 素材，支持全透明与半透明区域；产品页展示独立图层和素材提取用途，供后续排版、合成与复用。', sourceIds: ['seedream-55-product'], locator: 'Transparent creatives in one step' },
    { label: '开放边界：逐步上线与后续 Pro 计划', text: '11月9日中文公告称正陆续上线即梦、豆包、豆包工作及火山方舟体验中心。未核实精确发布时刻、时区或各账户可用性；体验入口不能单独证明生产 API 已开放。', sourceIds: ['seedream-55-announcement-zh'], locator: '发布日期；体验入口' },
    { label: '版本与评测分开读', text: '厂商以5.0 Pro为前代对照，报告真实感与小字渲染提升；对外比较使用GPT Image 2.5 Sunburst和Nano Banana 2.1，不能外推至更新版本。5.5 Pro只在展望中预告。', sourceIds: ['seedream-55-announcement'], locator: 'Seedream 5.5 evaluations; Summary and outlook' },
  ],
  recommendedResources: [
    { id: 'seedream-55-announcement-reading', title: 'Seedream 5.5 发布与体验入口', creator: '字节跳动 Seed', kind: 'article', url: chineseAnnouncement, publishedAt: '2026-11-09', checkedAt, match: '核对渐进上线渠道与版本边界。', scopeNote: '官方公告，已核读中文正文；未验证账户实际可用性。', locator: '体验入口；总结与展望' },
    { id: 'seedream-55-product-reading', title: 'Seedream 5.5 编辑与透明素材示例', creator: 'ByteDance Seed', kind: 'article', url: product, checkedAt, match: '了解多轮编辑和透明素材的典型用途。', scopeNote: '厂商精选示例，不是独立复现或所有任务的效果保证。', locator: 'Multi-turn editing; Transparent creatives in one step' },
  ],
}];
