import test from 'node:test';
import assert from 'node:assert/strict';
import { hySimulmtEvents, hySimulmtSources } from '../src/topics/ai/hy-simulmt-release';
import { events } from '../src/topics/ai/events';
import { aiCatalog } from '../src/topics/ai/adapter';
import { defaultAtlas, filterAtlas } from '../src/lib/atlas';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { aiPresentation } from '../src/topics/ai/config';

test('Hy-SimulMT records announcement, verified weights and specialized output without false baseline', () => {
  const event = hySimulmtEvents[0];
  assert.equal(events.filter(e => e.id === event.id).length, 1);
  assert.equal(event.date, '2026-10-26');
  assert.match(event.dateLabel!, /公告日/);
  assert.equal(event.kind, '权重开放');
  assert.equal(event.milestone, false);
  assert.equal(event.change?.baselineEventId, undefined);
  assert.ok(hySimulmtSources.some(s => s.publishedAt === '2026-10-24'));
  assert.ok(hySimulmtSources.every(s => s.checkedAt === '2026-10-26'));
  assert.match(JSON.stringify(event), /17个 safetensors/);
  assert.match(JSON.stringify(event), /中英双向/);
  assert.match(JSON.stringify(event), /TTS/);
  assert.match(JSON.stringify(event), /llama.cpp 支持尚未合并上游/);
});

test('Hy-SimulMT bounds latency, evaluation and citation claims and keeps detail off the client index', () => {
  const event = hySimulmtEvents[0];
  assert.equal(event.change?.evidence, '厂商报告');
  assert.match(JSON.stringify(event), /不是首次语音输出耗时/);
  assert.match(JSON.stringify(event), /18段.*6名/);
  assert.match(JSON.stringify(event), /离线回放/);
  assert.equal(event.details?.filter(s => s.editorial).length, 1);
  assert.ok(event.details?.every(s => s.sourceIds?.length && s.locator));
  assert.ok(event.recommendedResources?.[0].creator && event.recommendedResources[0].scopeNote);
  const filtered = filterAtlas(events, { ...defaultAtlas(), all: true, scope: 'china', lane: 'models' });
  assert.ok(filtered.some(e => e.id === event.id));
  assert.ok(events.some(e => e.id === aiPresentation.latestEvent && e.date >= event.date));
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(event.id));
  assert.ok(!payload.includes('hy-simulmt-card-reading'));
  assert.ok(!payload.includes('先验证整条链路'));
});
