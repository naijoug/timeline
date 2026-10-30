import test from 'node:test';
import assert from 'node:assert/strict';
import { carbonFusionEvents, carbonFusionSources } from '../src/topics/ai/carbon-fusion-release';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { isKeyEvent } from '../src/topics/ai/config';

test('Carbon and Fusion have separate important events with day-level official provenance', () => {
 assert.equal(carbonFusionEvents.length, 2);
 assert.equal(new Set(carbonFusionEvents.map(e => e.id)).size, 2);
 for (const e of carbonFusionEvents) {
  assert.equal(e.date, '2026-10-28'); assert.ok(isKeyEvent(e));
  assert.equal(e.details?.filter(s => s.editorial).length, 1);
  assert.ok(e.details?.every(s => s.sourceIds?.length && s.locator));
  assert.ok(e.recommendedResources?.every(r => r.creator && r.match && r.scopeNote && r.locator));
  for (const id of [...e.sourceIds, ...e.details!.flatMap(s => s.sourceIds || [])]) assert.ok(carbonFusionSources.some(s => s.id === id));
 }
 assert.ok(carbonFusionSources.every(s => s.checkedAt === '2026-10-28'));
});
test('Carbon does not turn restricted rollout into public API availability', () => {
 const e = carbonFusionEvents[0], text = JSON.stringify(e);
 assert.deepEqual(e.tracks, ['models']); assert.match(e.kind, /受限/);
 assert.match(e.limitation, /coming soon/); assert.match(e.limitation, /不能视为公开 API 已上线/);
 assert.match(text, /Fairwind/); assert.match(text, /无护栏条件/);
 assert.match(e.dateLabel!, /未取得发布小时/);
});
test('Fusion product GA keeps local routing experimental and cloud-dependent', () => {
 const e = carbonFusionEvents[1], text = JSON.stringify(e);
 assert.deepEqual(e.tracks, ['products']); assert.match(e.summary, /不是新的基础模型/);
 assert.match(e.limitation, /实验预览/); assert.match(e.limitation, /不是离线/);
 assert.match(text, /不会自动撤销/); assert.match(text, /Single、Cascade 或 Critique/);
});
test('integrated release records are unique and reading detail stays out of client indexes', () => {
 const payload = JSON.stringify(createExplorerPayload(aiCatalog));
 for (const e of carbonFusionEvents) {
  assert.equal(events.filter(x => x.id === e.id).length, 1);
  assert.ok(payload.includes(e.id));
  for (const r of e.recommendedResources || []) assert.ok(!payload.includes(r.id));
 }
 for (const s of carbonFusionSources) assert.equal(sources.filter(x => x.id === s.id).length, 1);
 assert.ok(!payload.includes('本地路由：实验预览不等于离线'));
});
