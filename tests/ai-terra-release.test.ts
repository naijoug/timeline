import test from 'node:test';
import assert from 'node:assert/strict';
import { terraEvents, terraSources } from '../src/topics/ai/terra-release';
import { events } from '../src/topics/ai/events';
import { aiPresentation } from '../src/topics/ai/config';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';

test('Terra is a single important hosted release with an actual predecessor and dated primary evidence', () => {
 const e = terraEvents[0];
 assert.equal(events.filter(x => x.id === e.id).length, 1);
 assert.equal(e.date, '2026-10-26'); assert.equal(e.kind, 'API 开放'); assert.equal(e.milestone, true);
 assert.equal(e.change?.baselineEventId, 'gpt-5-6-api'); assert.equal(e.change?.evidence, '厂商报告');
 assert.ok(events.some(x => x.id === e.change?.baselineEventId));
 assert.ok(terraSources.every(s => s.checkedAt === '2026-10-26'));
 assert.equal(aiPresentation.latestEvent, e.id);
 assert.match(e.limitation, /不是权重开放/);
});
test('Terra separates evaluation, cost, modalities and editorial inference, keeping detail server-side', () => {
 const e = terraEvents[0], text = JSON.stringify(e);
 assert.match(text, /272K/); assert.match(text, /Responses API/); assert.match(text, /不支持原生音频或视频/);
 assert.match(text, /未运行模型或复测/); assert.equal(e.details?.filter(d => d.editorial).length, 1);
 assert.ok(e.details?.every(d => d.sourceIds?.length && d.locator));
 assert.ok(e.recommendedResources?.every(r => r.creator && r.match && r.scopeNote));
 const payload = JSON.stringify(createExplorerPayload(aiCatalog));
 assert.ok(payload.includes(e.id)); assert.ok(!payload.includes('terra-61-safety-reading'));
 assert.ok(!payload.includes('成本边界：标准单价不是全部账单'));
});
