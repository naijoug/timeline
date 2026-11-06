import test from 'node:test';
import assert from 'node:assert/strict';
import { teammatesEvents, teammatesSources } from '../src/topics/ai/perplexity-teammates';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiTimelines } from '../src/topics/ai/timelines';
import { eventLane, entityLane } from '../src/topics/ai/config';
import { teammatesEntities } from '../src/topics/ai/perplexity-teammates';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';

const event = teammatesEvents[0];
const text = event.details!.map(section => section.text).join('\n');
test('Teammates records the UTC availability announcement separately from blog and changelog dates', () => {
  assert.equal(event.date, '2026-11-05');
  assert.equal(event.kind, '研究预览');
  assert.match(text, /11月5日17:05:47 UTC/);
  assert.match(text, /博客索引标11月4日，汇总日志标11月6日/);
  assert.match(event.limitation, /最早实际开放日/);
  assert.match(teammatesSources.find(s => s.id === 'perplexity-teammates-launch-post')!.version!, /2026-11-05T17:05:47.000Z/);
  assert.equal(teammatesSources.find(s => s.id === 'perplexity-teammates-announcement')!.publishedAt, undefined);
});
test('Teammates keeps preview eligibility, client plans, model identity and permissions explicit', () => {
  for (const expected of ['research preview', '个人 Max', 'Pro 不包含', 'Enterprise Pro / Max 也不默认包含', 'iOS 仍是后续计划', 'Claude Opus 5.5', '月度 credits', '不意味着自动获得额外权限', '厂商对产品能力的描述']) assert.ok(text.includes(expected), expected);
  assert.match(event.limitation, /不是新基础模型、公开 API 或权重发布/);
  assert.deepEqual(event.tracks, ['products']);
  assert.equal(eventLane(event), 'products');
  assert.equal(entityLane(teammatesEntities[0]), 'products');
  assert.equal(createExplorerPayload(aiCatalog).catalog.events.find(e => e.id === event.id)!.category, 'products');
  assert.equal(event.change, undefined);
});
test('Teammates has concrete attributable reading, curated membership and no long content in the index', () => {
  assert.equal(events.filter(item => item.id === event.id).length, 1);
  for (const source of teammatesSources) {
    assert.equal(source.checkedAt, '2026-11-06');
    assert.ok(source.locator);
    assert.equal(sources.filter(item => item.id === source.id).length, 1);
  }
  assert.ok(event.details!.some(s => s.editorial && s.label.startsWith('编辑分析')));
  for (const section of event.details!) {
    assert.ok(section.sourceIds?.length && section.locator);
    for (const id of section.sourceIds!) assert.ok(event.sourceIds.includes(id));
  }
  for (const resource of event.recommendedResources!) assert.ok(resource.creator && resource.series && resource.match && resource.scopeNote && resource.locator);
  for (const id of ['ai-milestones', 'ai-agent-products']) assert.equal(aiTimelines.find(line => line.id === id)!.entries.filter(entry => entry.eventId === event.id).length, 1);
  assert.ok(!aiTimelines.find(line => line.id === 'ai-model-iterations')!.entries.some(entry => entry.eventId === event.id));
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(event.id));
  for (const section of event.details!) assert.ok(!payload.includes(section.label));
  for (const resource of event.recommendedResources!) assert.ok(!payload.includes(resource.id));
});
