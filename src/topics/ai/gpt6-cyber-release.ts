import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-11-06';
export const gpt6CyberSources: Source[] = [
  { id: 'gpt6-cyber-announcement', title: 'GPT-6 Cyber: Advancing the frontier of aligned cybersecurity agents', publisher: 'OpenAI', url: 'https://openai.com/index/introducing-gpt-6-cyber/', type: '官方公告', publishedAt: '2026-11-05', checkedAt, locator: 'Advancing frontier cyber capabilities; Expanding access to trusted defenders' },
  { id: 'gpt6-cyber-system-card', title: 'GPT-6 Cyber System Card', publisher: 'OpenAI', url: 'https://deploymentsafety.openai.com/gpt-6-cyber', type: '官方文档', publishedAt: '2026-11-05', checkedAt, locator: 'Introduction; Respecting Restrictions and Scope; External Evaluations for Cyber Capabilities - Irregular' },
  { id: 'gpt6-cyber-api-card', title: 'GPT-6-Cyber Model', publisher: 'OpenAI', url: 'https://developers.openai.com/api/docs/models/gpt-6-cyber', type: '官方文档', checkedAt, version: '2026-11-06 核查快照', locator: 'Access requirements; Context window; Pricing' },
];

export const gpt6CyberEvents: TimelineEvent[] = [{
  id: 'gpt-6-cyber-restricted-release',
  date: '2026-11-05',
  dateLabel: '2026年11月5日（受限开放公告日）',
  title: 'GPT-6 Cyber 向获批 Daybreak Red 用户受限开放',
  subtitle: '网络安全专用模型 · API / Codex · 非全面开放',
  summary: 'OpenAI 发布基于 GPT-6 Astra 的网络安全专用变体，先向部分获批 Daybreak Red 客户提供 API 与 Codex 访问。',
  significance: '专用后训练与受控访问一同成为安全研究模型发布的重要组成部分。',
  limitation: 'Daybreak Red 资格之外仍需模型专项批准；不是面向所有用户的正式开放，也不是权重发布。评测结果不保证实际任务表现或始终遵守授权范围。',
  tracks: ['models'], entityIds: ['gpt'], company: 'OpenAI',
  sourceIds: ['gpt6-cyber-announcement', 'gpt6-cyber-system-card', 'gpt6-cyber-api-card'],
  tags: ['网络安全', '受限开放', 'Daybreak Red', '后训练'],
  milestone: false, kind: '受限开放',
  change: {
    baseline: '已收录的通用 GPT-6 Astra；同专用路线的评测基线为 GPT-5.6 Cyber',
    baselineEventId: 'gpt-6-astra-api',
    improvements: ['增加网络安全专用后训练与授权范围遵循训练', '厂商同期 ExploitGym 测试为 48.5%，GPT-5.6 Cyber 为 32.1%，相差 16.4 个百分点'],
    tradeoffs: '能力提升并非所有评测一致；访问受审批和安全要求限制，本站未独立复现评测或实测 API。',
    evidence: '厂商报告', sourceIds: ['gpt6-cyber-announcement', 'gpt6-cyber-system-card'],
  },
  details: [
    { label: '开放阶段', text: '11月5日公告与系统卡同日发布。首批仅限部分获批客户；向所有 Daybreak Red 客户扩展仍是计划，公告未给出具体日期。模型文档另要求组织取得 GPT-6 Cyber 专项批准。', sourceIds: ['gpt6-cyber-announcement', 'gpt6-cyber-api-card'], locator: 'Expanding access to trusted defenders; API access requirements' },
    { label: '评测应怎样阅读', text: '系统卡转述 Irregular 在更新版 FrontierCyber 中的结果：Cyber 解出 90/288 项，Astra 为 96/288 项；两者都未解出最难的15项，也未观察到对完全加固目标的成功攻击。这些结果不支持全面超过 Astra 的结论，且不能与旧版评测直接比较。', sourceIds: ['gpt6-cyber-system-card'], locator: 'External Evaluations for Cyber Capabilities - Irregular' },
    { label: '能力与安全边界', text: 'OpenAI 将其网络安全能力定为 Critical，这是该公司的 Preparedness Framework 分类。Honeypot 中更好的范围遵循仍只是特定测试结果；部署还要求身份核验、组织安全措施与默认 API IP 白名单，不能视为安全保证。', sourceIds: ['gpt6-cyber-announcement', 'gpt6-cyber-system-card'], locator: 'Advancing frontier cyber capabilities; Respecting Restrictions and Scope; Existing safeguards' },
    { label: '接口与成本快照', text: '11月6日模型文档列出 1,050,000 token 上下文、128,000 最大输出；标准短上下文每百万 token 输入20美元、缓存输入2美元、输出100美元。缓存写入另计费，不能把这些数字当作长上下文或完整任务总价。', sourceIds: ['gpt6-cyber-api-card'], locator: 'Context window; Pricing' },
  ],
}];
