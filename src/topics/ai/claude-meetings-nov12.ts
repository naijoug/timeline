import type { Entity, Source, TimelineEvent } from './types';

const checkedAt = '2026-11-15';
const announcement = 'https://claude.com/resources/articles/claude-meetings';
const guide = 'https://support.claude.com/en/articles/18325154-use-claude-meetings';
const notes = 'https://support.claude.com/en/articles/12138966-release-notes';
export const claudeMeetingsNov12Sources: Source[] = [
  { id: 'claude-meetings-nov12-announcement', title: 'Introducing Claude Meetings', publisher: 'Anthropic', url: announcement, type: '官方公告', publishedAt: '2026-11-12', checkedAt, locator: '开头 beta rollout；权限、存储与 Getting started', version: '日期精确到日；逐步 beta 不代表所有账号同时开放。外宾默认设置与按套餐帮助页保留差异。' },
  { id: 'claude-meetings-guide', title: 'Use Claude Meetings', publisher: 'Anthropic · Claude Help Center', url: guide, type: '官方文档', checkedAt, locator: '计划资格；组织设置与外部参与者；连接工具；存储与 beta 用量', version: '动态帮助全文核读；核查日不作首次发布日期。未登录或加入会议实测。' },
  { id: 'claude-meetings-nov12-release-notes', title: 'Claude release notes · November 12, 2026', publisher: 'Anthropic · Claude Help Center', url: notes, type: '官方公告', publishedAt: '2026-11-12', checkedAt, locator: 'November 12, 2026 / Claude Meetings', version: '日期仅指本次 Meetings 条目，不是持续更新页面的首次发布日期。' },
];
export const claudeMeetingsNov12Entities: Entity[] = [
  { id: 'claude-meetings', name: 'Claude Meetings', type: 'product', company: 'Anthropic', description: '以可见参与者加入 Google Meet 的 Claude 会议产品，可记录、回答问题及协助生成工作成果；2026年11月逐步推出 beta。', tags: ['会议', '协作', 'beta'], sourceIds: ['claude-meetings-nov12-announcement', 'claude-meetings-guide'] },
];
export const claudeMeetingsNov12Events: TimelineEvent[] = [{
  id: 'claude-meetings-beta', date: '2026-11-12', dateLabel: '2026年11月12日（逐步 beta 公告日）', title: 'Claude Meetings beta：在会议中记录与协作', company: 'Anthropic', kind: '产品 beta', tracks: ['products'], entityIds: ['claude', 'claude-meetings'], milestone: false, announcementGroup: 'claude-meetings-2026-11-12',
  summary: 'Claude Meetings 开始向 Team、Enterprise 逐步推出 beta，以可见参与者加入 Google Meet，在会议中记录、回答问题并协助制作文档与白板。',
  significance: '编辑解读：会议助手从会后摘要走向会中共同工作，工具授权和回答的可见范围因而成为产品能力的一部分。',
  limitation: '不是 GA、基础模型发布或所有账号同步开放；目前仅确认 Google Meet。外宾默认值在公告与按套餐帮助页间仍有差异；未登录测试会议、工具或计费。',
  sourceIds: ['claude-meetings-nov12-announcement', 'claude-meetings-guide', 'claude-meetings-nov12-release-notes'], tags: ['会议', 'Google Meet', 'beta', '工具授权', '协作'],
  details: [
    { label: '日期、阶段与准入', text: '11月12日公告及同日更新日志确认逐步 beta，面向 Team、Enterprise，在 Claude 与 Claude Desktop 使用 Google Meet。Team 默认启用，Enterprise 由管理员为组织或指定角色开启；ZDR、HIPAA-ready、CMEK 组织不可用。不把这一天写成全量开放，也不推断 Zoom 或 Teams 支持。', sourceIds: ['claude-meetings-nov12-release-notes', 'claude-meetings-guide'], locator: 'November 12, 2026；帮助开头资格与组织设置' },
    { label: '从记录到会中成果', text: 'Claude 作为可见参与者记录会议，也能回答问题、协助生成文档、白板与演示稿。其他会议平台以及更多外部会议记录集成仍属后续计划，不能当成本次 beta 已交付能力。', sourceIds: ['claude-meetings-nov12-announcement'], locator: '会议参与方式、实时 artifacts 与未来平台计划' },
    { label: '工具授权不等于全体共享权限', text: '连接工具沿用个人权限，首次请求授权后可继续使用；口头调用仍逐次确认说话者。Meet 聊天中的回答对所有与会者可见，不能把个人数据源访问权与输出受众混为一谈。', sourceIds: ['claude-meetings-nov12-announcement', 'claude-meetings-guide'], locator: '连接工具授权、口头请求确认与 Meet chat' },
    { label: '外宾默认设置仍需核对', text: '公告概括称默认排除外宾、需管理员允许；当前帮助页却分套餐写为 Team 默认允许、Enterprise 默认仅内部会议。两种表述不完全一致，不能归并为一个全局默认值。启用前应检查本组织实际设置。允许外宾的会议中，Claude 记录转录与笔记，但不在 Meet 聊天中回复；也不向外宾开放内部会议页面或会后邮件。', sourceIds: ['claude-meetings-nov12-announcement', 'claude-meetings-guide'], locator: '公告外宾边界；帮助按套餐的 external participants 设置' },
    { label: '保留内容与 beta 用量边界', text: '保存的是转录、摘要和屏幕描述，而非音频；参与者应获知记录并同意转录。beta 的记录、转录及非工具回答免费；会议中生成 artifacts 的免费期截至2027年2月10日，连接工具使用仍计入用量。不能概括成全部会议操作永久免费。', sourceIds: ['claude-meetings-nov12-announcement', 'claude-meetings-guide'], locator: '存储、参与者告知及 beta pricing' },
    { label: '编辑分析：先确定谁能看到结果', text: '能够在会中读取资料和产出文档，减少了会后整理的步骤，却也缩短了权限误解变成信息泄露的距离。评估时应分别检查参加范围、个人工具权限、回答受众与保存内容，而不只比较摘要速度。', editorial: true, sourceIds: ['claude-meetings-guide'], locator: '编辑依据权限、外宾和数据保留边界归纳；非产品实测' },
  ],
  recommendedResources: [{ id: 'claude-meetings-guide-reading', title: 'Use Claude Meetings', creator: 'Anthropic', series: 'Claude Help Center', kind: 'article', url: guide, checkedAt, match: '先核对组织准入、外宾设置、个人工具授权和 beta 用量，再评估会议场景。', scopeNote: '核读官方帮助；未登录实测。公告与帮助对外宾默认值存在差异，不以帮助核查日替代发布日期。', locator: '组织设置；外部参与者；连接工具；存储与 beta 用量' }],
}];
