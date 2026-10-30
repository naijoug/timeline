import test from 'node:test';
import assert from 'node:assert/strict';
import { monitoringEvents, monitoringSources } from '../src/topics/ai/misalignment-monitoring';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
test('monitoring disclosure separates historical audit, simulation and API coverage', () => {
 const e = monitoringEvents[0];
 assert.equal(e.date, '2026-10-29'); assert.ok(e.milestone); assert.deepEqual(e.tracks, ['methods']);
 const body=e.details!.map(d=>d.text).join('\n');
 assert.match(body,/事后模拟重放/); assert.match(body,/METR明确未评估/);
 assert.match(body,/Chat Completions/); assert.match(body,/只配webhook并不会/);
 assert.match(e.dateLabel!,/不是首次启用/); assert.match(e.limitation,/未测试/);
 assert.equal(e.details!.filter(d=>d.editorial).length,1);
 assert.ok(e.details!.every(d=>d.sourceIds?.length && d.locator));
 assert.equal(monitoringSources[1].publishedAt,'2026-10-22');
 assert.match(monitoringSources[1].version!,/10-29/);
});
test('monitoring integrates once and long evidence stays off the timeline client',()=>{
 const e=monitoringEvents[0];
 assert.equal(events.filter(x=>x.id===e.id).length,1);
 for(const s of monitoringSources) assert.equal(sources.filter(x=>x.id===s.id).length,1);
 const p=JSON.stringify(createExplorerPayload(aiCatalog));
 assert.ok(p.includes(e.id)); assert.ok(!p.includes('独立证据：历史测试与当前声明分开'));
 assert.ok(!p.includes('metr-monitoring-reading'));
});
