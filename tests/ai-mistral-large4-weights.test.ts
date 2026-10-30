import test from 'node:test';
import assert from 'node:assert/strict';
import { mistralLarge4Events, mistralLarge4Sources } from '../src/topics/ai/mistral-large4-weights';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { isKeyEvent } from '../src/topics/ai/config';
test('Mistral weight release is an important dated increment after the distinct API preview', () => {
 const e = mistralLarge4Events[0]; assert.equal(e.date, '2026-10-29'); assert.ok(isKeyEvent(e));
 assert.equal(e.change?.baselineEventId, 'mistral-large-4-preview');
 assert.equal(events.find(x => x.id === e.change?.baselineEventId)?.date, '2026-10-06');
 assert.equal(events.filter(x => x.id === e.id).length, 1);
 assert.match(e.limitation, /Public Preview/); assert.match(e.limitation, /并非无条件MIT/);
 assert.match(e.limitation, /未下载完整权重/);
 assert.ok(mistralLarge4Sources.find(x => x.id === 'mistral-large4-fixed-files')?.url.includes('f12dabdc0c1e99e7f7924461a6f308859b05af4d'));
});
test('Mistral release keeps provenance, editorial analysis and deep reading outside the client payload', () => {
 const e = mistralLarge4Events[0]; assert.equal(e.details?.filter(x => x.editorial).length, 1);
 for (const detail of e.details!) { assert.ok(detail.locator); assert.ok(detail.sourceIds?.every(id => e.sourceIds.includes(id))); }
 for (const s of mistralLarge4Sources) { assert.equal(sources.filter(x => x.id === s.id).length, 1); assert.equal(s.checkedAt, '2026-10-29'); }
 const payload = JSON.stringify(createExplorerPayload(aiCatalog)); assert.ok(payload.includes(e.id));
 assert.ok(!payload.includes('mistral-large4-serving-reading')); assert.ok(!payload.includes('许可：开放权重不等于无条件开源'));
});
