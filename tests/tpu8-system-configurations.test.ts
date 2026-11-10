import test from 'node:test';
import assert from 'node:assert/strict';
import { tpu8Events, tpu8Sources, tpu8Entities } from '../src/topics/ai/tpu8-system-configurations';
import { events } from '../src/topics/ai/events';
import { sourceMap } from '../src/topics/ai/sources';
import { aiTimelines } from '../src/topics/ai/timelines';
import { eventLane, entityLane } from '../src/topics/ai/config';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
const event = tpu8Events[0];

test('TPU systems are one infrastructure announcement, not a model or Agent launch', () => {
  assert.equal(events.filter(e => e.id === event.id).length, 1);
  assert.equal(event.date, '2026-11-09');
  assert.equal(eventLane(event), 'methods');
  assert.equal(entityLane(tpu8Entities[0]), 'methods');
  assert.equal(event.kind, '基础设施系统公告');
  assert.equal(event.milestone, false);
  assert.equal(event.change, undefined);
  assert.ok(aiTimelines.every(line => !line.entries.some(e => e.eventId === event.id)));
});
test('TPU records preserve silicon, availability and evidence boundaries', () => {
  const text = event.details!.map(d => d.text).join(' ');
  for (const p of [/沿用8t硅片/, /两颗8i/, /Cloud Pathways/, /GKE dynamic slicing/, /TPU agent suite仍标预览/, /不能把.*软件阶段转移/]) assert.match(text, p);
  assert.match(event.limitation, /不认定硬件已正式可用/);
  assert.match(event.limitation, /地区、价格和客户准入未确认/);
  assert.equal(event.details!.filter(d => d.editorial).length, 1);
  assert.ok(event.details!.every(d => d.locator && d.sourceIds?.length && d.sourceIds.every(id => sourceMap[id])));
  assert.ok(tpu8Sources.every(s => s.checkedAt === '2026-11-10' && s.locator));
  assert.equal(tpu8Sources[0].publishedAt, '2026-11-09');
  assert.equal(tpu8Sources[1].publishedAt, undefined);
});
test('specific TPU readings remain static outside the explorer payload', () => {
  assert.equal(event.recommendedResources!.length, 2);
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(event.id));
  assert.ok(!payload.includes('tpu8-systems-reading'));
  assert.ok(!payload.includes('开放边界：软件 GA 不等于硬件 GA'));
});
