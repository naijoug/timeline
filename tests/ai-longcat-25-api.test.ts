import test from 'node:test';
import assert from 'node:assert/strict';
import { longcat25Events, longcat25Sources } from '../src/topics/ai/longcat-25-api';
import { aiCatalog } from '../src/topics/ai/adapter';
import { timelineEvents } from '../src/core/timelines';
import { eventLane, chinaCompanies } from '../src/topics/ai/config';
import { validateCatalog } from '../src/core/validate';
const event = longcat25Events[0];
test('LongCat 2.5 records the API phase without inventing weights or a new Agent product', () => {
  assert.equal(event.date, '2026-11-02');
  assert.equal(eventLane(event), 'models');
  assert.match(event.change!.baseline, /2026年9月25日.*Preview/);
  assert.equal(event.change!.baselineEventId, undefined);
  assert.match(event.limitation, /未实际调用/);
  assert.match(event.limitation, /未核实2.5权重开放/);
  assert.match(event.dateLabel!, /具体时刻未披露/);
  assert.ok(chinaCompanies.has(event.company!));
  assert.deepEqual(validateCatalog(aiCatalog), []);
  for (const id of ['ai-milestones', 'ai-model-iterations']) assert.ok(timelineEvents(aiCatalog, [id]).some(e => e.id === event.id));
  assert.ok(!timelineEvents(aiCatalog, ['ai-agent-products']).some(e => e.id === event.id));
  assert.equal(timelineEvents(aiCatalog, ['ai-milestones', 'ai-model-iterations']).filter(e => e.id === event.id).length, 1);
});
test('LongCat details keep official evidence, editorial analysis and parameter uncertainty separate', () => {
  assert.equal(event.details!.filter(s => s.editorial).length, 1);
  for (const section of event.details!.filter(s => !s.editorial)) assert.ok(section.locator && section.sourceIds!.every(id => event.sourceIds.includes(id)));
  for (const source of longcat25Sources) assert.equal(source.checkedAt, '2026-11-02');
  assert.doesNotMatch(JSON.stringify(event), /128K|256K|262144|性能第一|全球领先/);
  assert.ok(event.recommendedResources![0].scopeNote.includes('未执行示例'));
});
