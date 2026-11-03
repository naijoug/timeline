import test from 'node:test';
import assert from 'node:assert/strict';
import { hydrogenEvents, hydrogenEntities, hydrogenSources } from '../src/topics/ai/hydrogen-release';
import { events } from '../src/topics/ai/events';
import { entities } from '../src/topics/ai/entities';
import { sources } from '../src/topics/ai/sources';
import { aiTimelines } from '../src/topics/ai/timelines';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { isKeyEvent } from '../src/topics/ai/config';

test('Hydrogen has dated primary provenance, a baseline and bounded scientific claims', () => {
  assert.equal(hydrogenEvents.length, 1);
  const e = hydrogenEvents[0];
  assert.equal(e.date, '2026-11-02');
  assert.match(e.dateLabel!, /未取得发布小时/);
  assert.ok(isKeyEvent(e));
  assert.deepEqual(e.tracks, ['models']);
  assert.match(e.change!.baseline, /GLM-5.3/);
  assert.equal(e.change!.baselineEventId, 'glm-5-3');
  assert.equal(e.change!.evidence, '厂商报告');
  assert.match(e.limitation, /未独立复现/);
  assert.ok(e.details!.every(s => s.sourceIds?.length && s.locator));
  assert.equal(e.details!.filter(s => s.editorial).length, 1);
  for (const id of [...e.sourceIds, ...e.details!.flatMap(s => s.sourceIds || []), ...e.change!.sourceIds]) assert.ok(hydrogenSources.some(s => s.id === id));
  assert.ok(hydrogenSources.every(s => s.checkedAt === '2026-11-03'));
});
test('Hydrogen distinguishes MIT label, gated files and untested hosted access', () => {
  const e = hydrogenEvents[0], text = JSON.stringify(e);
  assert.match(e.kind, /受限/);
  assert.match(e.limitation, /登录并同意分享账户信息/);
  assert.match(e.limitation, /NeuroSpark API 与 Mira.*未实测/);
  assert.match(text, /MIT/); assert.match(text, /不称作匿名可下载/);
  assert.match(text, /未验证量化仓库/); assert.match(text, /1M上下文/);
});
test('Hydrogen is integrated once and detail remains outside compact explorer payloads', () => {
  const e = hydrogenEvents[0];
  assert.equal(events.filter(x => x.id === e.id).length, 1);
  for (const s of hydrogenSources) assert.equal(sources.filter(x => x.id === s.id).length, 1);
  for (const entity of hydrogenEntities) assert.equal(entities.filter(x => x.id === entity.id).length, 1);
  for (const id of ['ai-milestones', 'ai-model-iterations']) assert.equal(aiTimelines.find(t => t.id === id)!.entries.filter(x => x.eventId === e.id).length, 1);
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(e.id));
  assert.ok(!payload.includes('hydrogen-release-reading'));
  assert.ok(!payload.includes('访问：许可标签与下载条件不同'));
});
