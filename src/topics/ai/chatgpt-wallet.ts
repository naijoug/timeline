import type { Entity, Source, TimelineEvent } from './types';
const checkedAt = '2026-11-16';
const announcement = 'https://openai.com/index/introducing-chatgpt-wallet/';
const guide = 'https://help.openai.com/en/articles/20001654-making-purchases-with-chatgpt-wallet';
const notes = 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes';
export const chatgptWalletSources: Source[] = [
  { id: 'chatgpt-wallet-announcement', title: 'Introducing ChatGPT Wallet', publisher: 'OpenAI', url: announcement, type: '官方公告', publishedAt: '2026-11-13', checkedAt, locator: '发布说明；支付凭据；未来完全委托计划；商户边界', version: '核读官方正文，日期精确到日；未来计划不写成已上线能力。' },
  { id: 'chatgpt-wallet-guide', title: 'Making purchases with ChatGPT Wallet', publisher: 'OpenAI Help Center', url: guide, type: '官方文档', checkedAt, locator: 'Availability；Approve a purchase；Get help；FAQ', version: '当前动态帮助不是发布当日冻结快照；未设置卡片、登录账户或执行交易。' },
  { id: 'chatgpt-wallet-release-notes', title: 'ChatGPT release notes · November 13, 2026', publisher: 'OpenAI Help Center', url: notes, type: '官方公告', publishedAt: '2026-11-13', checkedAt, locator: 'November 13, 2026 / Introducing ChatGPT Wallet', version: '日期只指 Wallet 条目，不是持续更新日志的首次发布日期。' },
];
export const chatgptWalletEntities: Entity[] = [{ id: 'chatgpt-wallet', name: 'ChatGPT Wallet', type: 'product', company: 'OpenAI', description: 'dots 中的支付功能：用户逐笔授权后，通过替代支付凭据协助完成商户结账；2026年11月开始有限范围逐步推出。', tags: ['支付', '授权', 'dots'], sourceIds: ['chatgpt-wallet-announcement', 'chatgpt-wallet-guide'] }];
export const chatgptWalletEvents: TimelineEvent[] = [{
  id: 'chatgpt-wallet-rollout', date: '2026-11-13', dateLabel: '2026年11月13日（逐步推出公告日）', title: 'ChatGPT Wallet：让 dots 在逐笔授权后结账', company: 'OpenAI', kind: '产品功能逐步推出', tracks: ['products'], entityIds: ['chatgpt-wallet'], milestone: false,
  summary: 'OpenAI 开始在 dots 中逐步推出 Wallet，让用户核对并批准购买后，由助手使用替代支付凭据完成结账。',
  significance: '编辑解读：Agent 从帮助选择走向交易执行，批准什么、是否成交及谁负责售后必须成为清晰可查的不同状态。',
  limitation: '不是新模型、全球全量开放或完全委托支付。并非所有商户都能完成结账；本轮未设置卡片或实测交易。',
  sourceIds: chatgptWalletSources.map(source => source.id), tags: ['dots', '支付', '逐笔授权', '渐进上线'],
  details: [
    { label: '日期与开放范围', text: '11月13日更新日志确认开始逐步推出，面向美国年满18岁的 ChatGPT Pro 用户，要求符合资格的美国发行信用卡与美国账单地址。符合条件也不代表账号已经开放。', sourceIds: ['chatgpt-wallet-release-notes', 'chatgpt-wallet-guide'], locator: 'November 13, 2026 / Introducing ChatGPT Wallet；帮助 Availability 与 FAQ 的信用卡资格' },
    { label: '入口与批准不是成交', text: '当前帮助限定在 dots 对话使用，不适用于 Chat、Work 或独立 Codex 线程。购买前核对商户、项目、总额与所选卡片，再用支持设备的生物验证批准；Ready to check out 只表示授权完成，不能替代商户订单确认。', sourceIds: ['chatgpt-wallet-guide'], locator: 'Availability；Approve a purchase' },
    { label: '替代凭据，不是没有支付凭据', text: '批准后生成支付 token，代替真实卡片信息供结账使用。商户与 Agent 不接触底层真实卡片资料，不等于 Agent 完全不使用支付凭据。公告所述未来按限额、类别或期限完全委托购买，仍是计划，不能当作此次已交付功能。', sourceIds: ['chatgpt-wallet-announcement'], locator: '支付 token 与未来完全委托段落' },
    { label: '订单、售后与重复扣款边界', text: '用户仍直接与商户交易，商户负责履约、退换和客服。遇到结账失败或结果不明，应先核对订单，不能把批准或对话报错当作成交或未成交的证据；商户的后续周期扣款取决于用户同意的付款安排。', sourceIds: ['chatgpt-wallet-announcement', 'chatgpt-wallet-guide'], locator: '商户责任；Approve a purchase；FAQ 的结账结果与周期付款' },
    { label: '编辑分析：把交接点写清楚', text: '选择商品、批准付款、收到订单确认是三个不同交接点。评估此类 Agent 产品，应检查每个交接点能否被用户识别，而不只看能否自动填完结账表单。', editorial: true, sourceIds: ['chatgpt-wallet-guide'], locator: '依据购买批准与订单确认区别归纳；非交易实测' },
  ],
  recommendedResources: [{ id: 'chatgpt-wallet-guide-reading', title: 'Making purchases with ChatGPT Wallet', creator: 'OpenAI', series: 'ChatGPT Help Center', kind: 'article', url: guide, checkedAt, match: '从准入、逐笔批准读到订单结果不明的处理，分清授权与成交。', locator: 'Availability → Approve a purchase → FAQ', scopeNote: '核读当前官方帮助，非发布日快照；未登录、添加卡片或执行购买。' }],
}];
