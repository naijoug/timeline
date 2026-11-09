import type { Entity, Source, TimelineEvent } from './types';

const checkedAt = '2026-11-09';
const desktop = 'https://docs.qwenwork.cn/release-notes/desktop';
const web = 'https://docs.qwenwork.cn/release-notes/web';

export const qwenworkSources: Source[] = [
  { id: 'qwenwork-operator-policy', title: '千问办公隐私政策', publisher: '钉钉 / 千问办公', url: 'https://terms.alicdn.com/legal-agreement/terms/privacy_policy_full/20260709092132640/20260709092132640.html', type: '官方文档', language: '简体中文', checkedAt, version: '生效日期2026年9月19日', locator: '引言、第1.1条：钉钉科技有限公司与钉钉（中国）信息技术有限公司开发运营；仅核读，不接受协议' },
  { id: 'qwenwork-desktop-2-log', title: '千问办公客户端更新日志', publisher: '千问办公', url: desktop, type: '官方文档', language: '简体中文', publishedAt: '2026-11-09', checkedAt, version: '2026年11月09日 · 千问办公 2.0.0', locator: '2.0.0：协作空间、资料空间、自动任务、移动端远控与云端任务续接' },
  { id: 'qwenwork-web-2-log', title: '千问办公网页端更新日志', publisher: '千问办公', url: web, type: '官方文档', language: '简体中文', publishedAt: '2026-11-09', checkedAt, version: '2026年11月09日条目；对照11月7日与11月4日条目', locator: '11月9日：远程控制默认禁止、自动任务；11月7日：协作数字员工；11月4日：资料空间' },
];

export const qwenworkEntities: Entity[] = [{
  id: 'qwenwork', name: '千问办公 QwenWork', type: 'product', company: '钉钉',
  description: '面向办公任务的 Agent 产品，连接团队协作、工作资料与跨端任务；产品版本和基础模型分开记录。',
  tags: ['办公协作', '事件触发', '跨端任务'], sourceIds: ['qwenwork-desktop-2-log', 'qwenwork-operator-policy'],
}];

export const qwenworkEvents: TimelineEvent[] = [{
  id: 'qwenwork-2-release', date: '2026-11-09', dateLabel: '2026年11月9日（官方 2.0.0 更新日志）',
  title: '千问办公 2.0：团队协作与事件触发任务',
  subtitle: 'QwenWork 2.0.0 · 跨端续接 · 权限约束',
  summary: '千问办公 2.0.0 更新日志汇总团队数字员工、资料复用与自动任务，连接云端工作和获授权的本地电脑操作。',
  significance: '编辑概述：办公 Agent 从单轮交付进一步连接团队共享材料、跨端续接和事件触发；执行权限仍需逐项确认。',
  limitation: '这是产品版本记录，不是新基础模型、API 或权重发布。日志未给出精确时刻、全量开放或套餐范围；部分能力此前已见于网页端日志，不能全当11月9日首次上线。本站未登录产品或实测任务。',
  company: '钉钉', kind: '产品版本发布', tracks: ['products'], entityIds: ['qwenwork', 'agent'],
  sourceIds: qwenworkSources.map(source => source.id), tags: ['办公协作', '数字员工', '事件触发', '跨端任务'], milestone: true,
  details: [
    { label: '日期边界：版本汇总不等于每项功能首发', text: '桌面端将2.0.0标为2026年11月9日，网页端同日也有对应条目。但网页端11月7日已记录协作数字员工，11月4日已记录资料空间。这里以2.0.0日志日期建档，不推定产品或这些能力的最早开放时间。', sourceIds: ['qwenwork-desktop-2-log', 'qwenwork-web-2-log'], locator: '桌面端2.0.0；网页端11月9日、7日、4日条目' },
    { label: '协作与资料：保留任务上下文', text: '官方介绍协作空间可配置专属数字员工；资料空间集中查找文件及关联会话，便于接着处理。共享入口不意味着权限全部放开：在线文档、表格和应用仍受原有权限约束。', sourceIds: ['qwenwork-desktop-2-log'], locator: '协作空间；资料空间及在线文件原有权限' },
    { label: '自动任务：区分触发条件与执行位置', text: '定时任务归入“自动任务”，新增消息、审批、待办等事件触发。日志区分触发任务可在云电脑或本地执行，以及定时任务按计划在本地执行；不能一概理解为关机后仍能完成所有任务。', sourceIds: ['qwenwork-desktop-2-log', 'qwenwork-web-2-log'], locator: '自动任务：触发任务与定时任务' },
    { label: '跨端续接：远控必须先获授权', text: '云端任务可跨网页、移动端、钉钉与客户端接续。手机远控需目标电脑开启远控，并使用同一账号和组织；网页日志还明确，企业未配置远控策略时默认禁止，需管理员确认开启。这是厂商说明，不是本站对远控可靠性的验证。', sourceIds: ['qwenwork-desktop-2-log', 'qwenwork-web-2-log'], locator: '云端任务续接；移动端远控；远程控制安全策略' },
    { label: '编辑分析：把接续能力与执行可靠性分开', text: '任务能在另一端打开，不等于它会正确保留约束、处理冲突或按时交付。可先用低风险任务检查授权提示、交接记录与失败恢复，再判断是否适合持续办公；这是编辑验收建议，不是独立评测结果。', editorial: true, sourceIds: ['qwenwork-desktop-2-log', 'qwenwork-web-2-log'], locator: '基于任务接续与权限机制的编辑分析' },
  ],
  recommendedResources: [
    { id: 'qwenwork-desktop-2-reading', title: '千问办公客户端更新日志', creator: '千问办公', series: '产品更新日志', kind: 'article', url: desktop, publishedAt: '2026-11-09', checkedAt, match: '从2.0.0条目核对任务类型、跨端续接与资料权限。', scopeNote: '动态厂商日志；版本日期不是每项能力首次上线日，未实际运行任务。', locator: '2026年11月09日 · 千问办公 2.0.0' },
    { id: 'qwenwork-web-2-reading', title: '千问办公网页端更新日志', creator: '千问办公', series: '产品更新日志', kind: 'article', url: web, publishedAt: '2026-11-09', checkedAt, match: '对照前几日条目和企业远控默认禁止的安全边界。', scopeNote: '页面记录不证明全量开放、具体套餐或独立执行可靠性。', locator: '11月9日远控策略；11月7日协作；11月4日资料空间' },
  ],
}];
