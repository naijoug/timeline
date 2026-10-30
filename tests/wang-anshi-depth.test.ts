import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';
const event = chinaHistory.events.find(event => event.id === 'wang-anshi-reforms')!;
test('Wang Anshi preserves the existing event and distinguishes evidence from interpretation', () => {
  assert.deepEqual(validateCatalog(chinaHistory), []);
  assert.equal(chinaHistory.events.length, 145);
  assert.deepEqual(event.time, { kind: 'point', start: { year: 1069 } });
  assert.equal(event.milestone, true);
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  for (const section of event.details!.filter(section => !section.editorial)) {
    assert.ok(section.locator && section.sourceIds?.length);
    assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id)));
  }
  assert.match(event.note!, /不是公历9月/);
  assert.match(event.details!.find(section => section.label.startsWith('研究视角：新法'))!.text, /不是.*定论/);
  assert.match(event.details!.at(-1)!.label, /编辑总结/);
});
test('Wang Anshi reading is an identified lecture report, not an invented video', () => {
  for (const id of ['anc-wanganshi', 'wang-anshi-qingmiao-study', 'wang-anshi-regional-lecture']) assert.equal(chinaHistory.sources.find(source => source.id === id)!.checkedAt, '2026-10-28');
  const reading = event.recommendedResources!.find(resource => resource.id === 'wang-anshi-regional-reading')!;
  assert.equal(reading.kind, 'article');
  assert.equal(reading.publishedAt, '2026-05-14');
  assert.match(reading.scopeNote!, /2026-03-23.*2026-05-14/);
  assert.match(reading.creator!, /张呈忠.*李振华/);
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  assert.ok(!payload.includes(reading.id));
  assert.ok(!payload.includes('王廷老'));
});
