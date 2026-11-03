import test from 'node:test';
import assert from 'node:assert/strict';
import { sensenova68Events, sensenova68Sources } from '../src/topics/ai/sensenova-68-flash';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiTimelines } from '../src/topics/ai/timelines';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventLane, isKeyEvent } from '../src/topics/ai/config';

test('SenseNova Flash uses the article date and distinguishes the historical Lite preview', () => {
  assert.equal(sensenova68Events.length, 1);
  const e = sensenova68Events[0];
  assert.equal(e.date, '2026-11-02');
  assert.match(e.dateLabel!, /不取URL日期/);
  assert.equal(eventLane(e), 'models'); assert.ok(isKeyEvent(e));
  assert.deepEqual(e.entityIds, ['sensenova']);
  assert.match(e.change!.baseline, /不同型号/);
  assert.equal(e.change!.evidence, '厂商报告');
  assert.ok(!e.change!.baselineEventId, 'The unrecorded Lite preview must not point at the old V6 event');
  assert.ok(e.details!.every(s => s.sourceIds?.length && s.locator));
  for (const id of [...e.sourceIds, ...e.details!.flatMap(s => s.sourceIds || []), ...e.change!.sourceIds]) assert.ok(sensenova68Sources.some(s => s.id === id));
  assert.ok(sensenova68Sources.every(s => s.checkedAt === '2026-11-03'));
  assert.equal(sensenova68Sources.find(s => s.id === 'sensenova-68-flash-release')!.publishedAt, e.date);
});
test('SenseNova Flash preserves internal demos, experimental access and untested claims', () => {
  const e = sensenova68Events[0], text = JSON.stringify(e);
  assert.match(e.limitation, /内部研发版/); assert.match(e.limitation, /Design 实验版/);
  assert.match(e.limitation, /未独立复现或调用/); assert.match(e.limitation, /未核实本模型权重开放/);
  assert.match(text, /Blender.*本地环境.*多轮/);
  assert.match(text, /Loop-9B-Preview.*另一模型/);
  assert.equal(e.details!.filter(s => s.editorial).length, 1);
});
test('SenseNova Flash appears once in model and main lines without inflating client detail', () => {
  const e = sensenova68Events[0];
  assert.equal(events.filter(x => x.id === e.id).length, 1);
  for (const s of sensenova68Sources) assert.equal(sources.filter(x => x.id === s.id).length, 1);
  for (const id of ['ai-milestones', 'ai-model-iterations']) assert.equal(aiTimelines.find(t => t.id === id)!.entries.filter(x => x.eventId === e.id).length, 1);
  assert.ok(!aiTimelines.find(t => t.id === 'ai-agent-products')!.entries.some(x => x.eventId === e.id));
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(e.id));
  assert.ok(!payload.includes('sensenova-68-release-reading'));
  assert.ok(!payload.includes('边界：主动交互仍是内部演示'));
});
