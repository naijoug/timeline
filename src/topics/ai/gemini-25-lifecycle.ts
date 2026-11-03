import type { Source, TimelineEvent } from './types';
const checkedAt = '2026-11-03';
export const gemini25LifecycleSources: Source[] = [
  { id: 'gemini-25-deprecation-20261102', title: 'Gemini API changelog — November 2, 2026', publisher: 'Google', url: 'https://aistudio.google.com/docs/changelog', type: '官方公告', publishedAt: '2026-11-02', checkedAt, locator: 'November 2, 2026: gemini-2.5-pro / gemini-2.5-flash', version: '日志日期无具体时刻；12月1日自动路由在本次核查时尚未生效。' },
  { id: 'gemini-38-migration', title: 'Migrate to gemini-3.8-flash', publisher: 'Google', url: 'https://aistudio.google.com/docs/whats-new-gemini-3.8#migrate-to-gemini-3-8-flash', type: '官方文档', checkedAt, locator: 'Migration checklist: Migrate to gemini-3.8-flash', version: '持续更新指南；核读迁移清单，未执行示例或调用 API。' },
  { id: 'gemini-35-lite-migration', title: 'Migrate to gemini-3.5-flash-lite', publisher: 'Google', url: 'https://aistudio.google.com/docs/whats-new-gemini-3.6#migrate-to-gemini-3-5-flash-lite', type: '官方文档', checkedAt, locator: 'Migrate to gemini-3.5-flash-lite; API changes and parameter updates', version: '持续更新指南；未执行迁移或更改账号。' },
];
/** Enrich the historical release; never replace its date, kind or timeline membership. */
export function enrichGemini25Lifecycle(event: TimelineEvent): TimelineEvent {
  if (event.id !== 'gemini-2-5-pro') return event;
  const announcement = ['gemini-25-deprecation-20261102'];
  return { ...event,
    sourceIds: [...event.sourceIds, ...gemini25LifecycleSources.map(source => source.id)],
    details: [
      { label: '原始事件：2025年3月25日的 Pro 实验版', text: '本节点仍记录 Gemini 2.5 Pro 实验版发布与思考模型路线，不是整个系列正式开放的日期。下列补充讨论后续稳定 API 型号的生命周期，不能据此认定当年的实验端点在同一天退役。', sourceIds: event.sourceIds, locator: '原始发布公告；本节点日期与实验版阶段不变' },
      { label: '后续稳定版 API 的生命周期（2026-11-02公告）', text: 'Google 的11月2日日志将稳定型号 gemini-2.5-pro 标为弃用，并说明它已不能在 Google AI Studio 中选择。这不等于 API 已不可用：截至2026年11月3日核查，日志所列自动路由日期仍在未来。官方计划从2026年12月1日起，将发往 gemini-2.5-pro 的 API 请求自动路由至 gemini-3.8-flash，并按后者费率计费。', sourceIds: announcement, locator: 'November 2, 2026: gemini-2.5-pro' },
      { label: '同公告相关型号：Flash 不是本节点的发布事实', text: '同一公告另行说明稳定型号 gemini-2.5-flash 已弃用且在 AI Studio 不可选；官方计划自2026年12月1日起将其 API 请求路由至 gemini-3.5-flash-lite，并按后者费率计费。这个映射与 Pro 不同，不将 Flash 的发布或停用历史合并为2025年3月25日的 Pro 实验版事件。上述范围是 Gemini API 日志，不能外推为所有 Google 产品或部署渠道的统一下线。', sourceIds: announcement, locator: 'November 2, 2026: gemini-2.5-flash' },
      { label: '迁移阅读：不只是替换模型名称', text: '3.8 Flash 迁移清单要求调整 thinking_level、检查工具调用和 thought signature 保留，并移除旧采样参数、candidate_count 与预填充 model 回合。3.5 Flash-Lite 有自己的思考级别建议，不能照搬 Pro 的目标配置。共享参数说明区分“弃用且忽略”的采样参数与会导致400错误的非空预填充 model 回合；不要把所有旧参数都描述成已经报错。本站仅核读指南，没有实际调用 API 或执行迁移。', sourceIds: ['gemini-38-migration', 'gemini-35-lite-migration'], locator: '两份 Migration checklist；Gemini 3.6 API changes and parameter updates' },
      { label: '编辑分析：发布历史与服务状态分开读', text: '一个固定的模型名称不保证未来仍对应同一后端或价格。阅读旧发布节点时应同时核对生命周期；接入方宜在计划切换日前回归提示词、工具调用、输出与费用，而不是把自动路由当成无差别兼容升级。这是依据公告与指南的编辑建议，不是实测兼容性或效果结论。', editorial: true, sourceIds: [...announcement, 'gemini-38-migration', 'gemini-35-lite-migration'], locator: '编辑归纳，非运行测试；本次核查截至2026-11-03' },
    ],
    recommendedResources: gemini25LifecycleSources.slice(1).map(source => ({ id: `${source.id}-reading`, title: source.title, creator: 'Google', series: 'Google AI Studio / Gemini API docs', kind: 'article' as const, url: source.url, checkedAt, match: source.id === 'gemini-38-migration' ? '对应稳定 gemini-2.5-pro 未来路由目标的具体迁移清单。' : '对应稳定 gemini-2.5-flash 未来路由目标，便于区分两个型号的迁移要求。', scopeNote: '官方技术指南，不是独立节目解读；核读文字，未执行 API 调用或迁移。', locator: source.locator })),
  };
}
