import test from 'node:test';
import assert from 'node:assert/strict';
import type { Catalog } from '../src/core/types';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/topics/ai/validate';
import { inkling2SmallEntities, inkling2SmallEvents, inkling2SmallSources } from '../src/topics/ai/inkling2-small-release';

const event = inkling2SmallEvents[0];
const text = event.details!.map(section => section.text).join('\n');

test('Inkling 2 Small records a service release without promoting planned weights to an open release', () => {
  assert.equal(inkling2SmallEvents.length, 1);
  assert.equal(event.id, 'inkling-2-small-release');
  assert.equal(event.date, '2026-11-05');
  assert.equal(event.kind, '模型与 API 发布');
  assert.deepEqual(event.tracks, ['models']);
  assert.equal(event.milestone, false);
  assert.match(event.summary, /仍为闭权重/);
  assert.match(event.limitation, /附条件的后续计划，不是已完成开源/);
  assert.match(event.limitation, /未调用模型、执行微调或独立复测/);
  assert.match(text, /完成外部安全测试与红队测试后于下一周/);
  assert.match(text, /检查点下载也须等待权重发布/);
  assert.match(text, /Tinker Terms of Use/);
  assert.ok(!event.tags.includes('开放权重'));
});

test('Inkling 2 Small uses an actual predecessor and preserves architecture and modality boundaries', () => {
  assert.match(event.change!.baseline, /Inkling-Small.*2026年7月30日.*尚未单独收录/);
  assert.equal(event.change!.baselineEventId, undefined);
  assert.equal(event.change!.evidence, '厂商报告');
  assert.match(event.change!.tradeoffs, /前代支持音频输入，本代不支持/);
  for (const expected of ['48层', '384个专家中选择8个', '总参数594B', '激活17B', '输出文本，不支持音频输入', '激活参数不等于完整权重的存储规模']) assert.ok(text.includes(expected), expected);
  assert.deepEqual(event.entityIds, ['inkling']);
  assert.equal(inkling2SmallEntities[0].type, 'family');
  assert.deepEqual(validateCatalog(inkling2SmallEvents, inkling2SmallEntities, inkling2SmallSources, []), []);
});

test('Inkling 2 Small separates supported implementation guidance from editorial conclusions', () => {
  for (const expected of ['thinkingmachines/Inkling-2-Small', '大于等于0、小于1', '默认0.9', '与 max_tokens 分开控制', '并非强制关闭', '不保证每次回答更准确', '幻觉']) assert.ok(text.includes(expected), expected);
  const knownSources = new Set(inkling2SmallSources.map(source => source.id));
  assert.equal(knownSources.size, inkling2SmallSources.length);
  for (const source of inkling2SmallSources) {
    assert.equal(source.checkedAt, '2026-11-06');
    assert.ok(source.locator);
    assert.ok(event.sourceIds.includes(source.id));
    assert.equal(new URL(source.url).protocol, 'https:');
  }
  for (const id of ['inkling2-small-announcement', 'inkling2-small-model-card']) assert.equal(inkling2SmallSources.find(source => source.id === id)!.publishedAt, '2026-11-05');
  assert.equal(inkling2SmallSources.find(source => source.id === 'inkling-small-baseline-card')!.publishedAt, '2026-07-30');
  for (const id of ['inkling-cookbook-guide', 'inkling-effort-guide']) assert.equal(inkling2SmallSources.find(source => source.id === id)!.publishedAt, undefined);
  for (const section of event.details!) {
    assert.ok(section.sourceIds?.length && section.locator);
    for (const id of section.sourceIds!) assert.ok(knownSources.has(id), id);
  }
  const editorial = event.details!.filter(section => section.editorial);
  assert.equal(editorial.length, 1);
  assert.match(editorial[0].label, /编辑分析/);
  assert.match(editorial[0].text, /不是独立评测结论/);
  assert.equal(event.recommendedResources!.length, 2);
  for (const resource of event.recommendedResources!) {
    assert.ok(resource.creator && resource.series && resource.match && resource.scopeNote && resource.locator);
    assert.equal(resource.checkedAt, '2026-11-06');
    assert.ok(inkling2SmallSources.some(source => source.url === resource.url));
  }
});

test('Inkling details and technical reading stay outside the lightweight explorer projection', () => {
  const catalog: Catalog = {
    topic: { id: 'ai', title: 'AI', description: '', path: '/ai/', coverage: '', categories: [{ id: 'models', title: '模型演进' }] },
    periods: [], entities: inkling2SmallEntities, sources: inkling2SmallSources,
    events: [{
      id: event.id, title: event.title, time: { kind: 'point', start: { year: 2026, month: 11, day: 5 } },
      summary: event.summary, significance: event.significance, note: event.limitation, category: 'models',
      periodIds: [], entityIds: event.entityIds, sourceIds: event.sourceIds, tags: event.tags,
      milestone: event.milestone, change: event.change, details: event.details, recommendedResources: event.recommendedResources,
    }],
  };
  const payload = JSON.stringify(createExplorerPayload(catalog));
  assert.ok(payload.includes(event.id));
  for (const section of event.details!) assert.ok(!payload.includes(section.label));
  for (const resource of event.recommendedResources!) assert.ok(!payload.includes(resource.id));
  assert.ok(!payload.includes('Tinker Terms of Use'));
  assert.ok(!payload.includes('inkling-small-baseline-card\",\"title'));
});
