import type { Source, TimelineEvent } from './types';
const checkedAt = '2026-10-30';
export const monitoringSources: Source[] = [
 { id: 'openai-monitoring-oct29', title: 'How we detect frontier model misalignment', publisher: 'OpenAI', url: 'https://openai.com/index/how-we-detect-frontier-model-misalignment/', type: '工程文章', publishedAt: '2026-10-29', checkedAt, locator: 'Our internal monitoring system today；Tests on recorded incidents；Red-teaming' },
 { id: 'metr-monitoring-historical-audit', title: "Red-Teaming OpenAI’s Internal Agent Monitoring Systems", publisher: 'David Rein、Adam Kaufman · METR / Redwood Research', url: 'https://metr.org/blog/2026-10-22-red-teaming-openai-agent-monitoring/', type: '机构回顾', publishedAt: '2026-10-22', checkedAt, version: '含2026-10-29修复状态更正', locator: '开头的测试时段与历史系统范围；修复状态；Update log；脚注4的公开报告限制' },
 { id: 'openai-monitoring-api-scope', title: 'Misalignment monitoring', publisher: 'OpenAI API 文档', url: 'https://developers.openai.com/api/docs/guides/safety-checks/misalignment-monitoring', type: '官方文档', checkedAt, locator: 'Request coverage；Handle a stopped request；Receive project safety alerts', version: '持续更新文档，仅记录本轮可读版本的接口边界' },
];
export const monitoringEvents: TimelineEvent[] = [{
 id: 'openai-misalignment-monitoring-disclosure', date: '2026-10-29', dateLabel: '2026年10月29日（体系说明公开；不是首次启用日）', title: 'OpenAI 公布扩展后的失配监控体系', company: 'OpenAI', kind: '安全工程披露', tracks: ['methods'], entityIds: ['alignment', 'agent'], milestone: true,
 summary: 'OpenAI公开说明如何监测Agent偏离授权目标；结合METR历史评估，区分覆盖声明、告警与自动暂停。',
 significance: '编辑解读：Agent安全不仅在于回答什么，还取决于行动证据是否可见、异常能否被发现及谁能及时介入。',
 limitation: '不是新模型发布或安全保证。独立评估针对历史系统，当前修复与扩大覆盖尚非独立认证；未测试监控API或复现攻击。',
 sourceIds: monitoringSources.map(s => s.id), tags: ['Agent安全', '监控', '独立评估'],
 details: [
  { label: '背景与经过：披露不等于首次启用', text: '10月29日，OpenAI说明扩展后的分层监测：从轻量筛查、模型审阅，到调查和遥测核对，再按情况介入。该文是已有体系的公开说明，不是当天才开始监控。对Hugging Face旧事件约30分钟预警的描述来自事后模拟重放，并非当时实际截获。', sourceIds: ['openai-monitoring-oct29'], locator: '开头的replayed / simulation；Our internal monitoring system today' },
  { label: '独立证据：历史测试与当前声明分开', text: 'METR与Redwood的试点评估在7月21日至8月11日进行，主要检验7月21日及之前的系统；报告10月22日公开，10月29日更正修复状态。多数漏洞已补、一项仍修复中是OpenAI告知的状态，METR明确未评估后续覆盖与修复声明。公开短文也不是完整内部报告。', sourceIds: ['metr-monitoring-historical-audit'], locator: '首段；历史系统范围；修复状态段；Update log；脚注4' },
  { label: '接口边界：收到告警不等于自动停止', text: '针对受此机制覆盖的模型，Responses请求会被监测，但自动阻止后续执行还依赖受支持的会话关联机制；只配webhook并不会开启自动停止。Chat Completions不受这套监控覆盖，其他安全检查仍适用。异步识别不能撤销已经完成的动作，告警也不等于已证明用户违规。', sourceIds: ['openai-monitoring-api-scope'], locator: 'Request coverage表；Handle a stopped request；开头的flag解释' },
  { label: '编辑分析：把覆盖率与处置能力分别验收', text: '阅读此类公告时，建议分别问：哪些请求进入监控、它看到了哪些上下文、谁收到告警、后续动作能否停止。再对照独立测试的日期与范围，避免把历史缺陷、最新厂商声明和未来保障混在一起。监控应与权限隔离及人工审批共同验收，不能代替它们。', editorial: true, sourceIds: ['openai-monitoring-oct29', 'metr-monitoring-historical-audit', 'openai-monitoring-api-scope'], locator: '根据三份资料的范围和限制作编辑归纳，不是本站安全认证' },
 ],
 recommendedResources: [{ id: 'metr-monitoring-reading', title: "Red-Teaming OpenAI’s Internal Agent Monitoring Systems", creator: 'David Rein、Adam Kaufman', series: 'METR / Redwood Research 试点评估', kind: 'article', url: 'https://metr.org/blog/2026-10-22-red-teaming-openai-agent-monitoring/', publishedAt: '2026-10-22', checkedAt, match: '对照厂商的新体系说明，学习识别测试时段、公开范围和未独立复核的修复声明。', scopeNote: '已核读公开短文及10月29日更新，未接触内部报告、复现漏洞或评估当前系统；文章不是对所有产品安全性的认证。', locator: '测试范围、Update log与公开透明度脚注' }],
}];
