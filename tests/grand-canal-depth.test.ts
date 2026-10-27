import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { transitionEvents } from '../src/topics/china-history/state-transitions';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

const event = chinaHistory.events.find(event => event.id === 'sui-grand-canal')!;
test('Grand Canal depth preserves chronology and exposes per-section evidence', () => {
  assert.deepEqual(validateCatalog(chinaHistory), []);
  assert.equal(chinaHistory.events.length, 145);
  const original = transitionEvents.find(event => event.id === 'sui-grand-canal')!;
  for (const key of ['time', 'category', 'periodIds', 'entityIds', 'milestone'] as const) assert.deepEqual(event[key], original[key]);
  assert.deepEqual(event.time, { kind: 'duration', start: { year: 605 }, end: { year: 610 } });
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  assert.equal(event.details!.filter(section => !section.editorial).length, 5);
  for (const section of event.details!.filter(section => !section.editorial)) {
    assert.ok(section.locator && section.sourceIds?.length);
    assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id)));
  }
  assert.match(event.details!.at(-1)!.label, /编辑总结/);
  assert.match(event.note!, /不是所有河段的起源.*京杭路线/);
  assert.match(event.details![4].text, /不采用.*征工数字.*不把运河.*充分原因/);
});
test('Grand Canal review distinguishes source dates, authorship and static-only reading', () => {
  for (const id of event.sourceIds) assert.equal(chinaHistory.sources.find(source => source.id === id)!.checkedAt, '2026-10-27');
  assert.match(chinaHistory.sources.find(source => source.id === 'huaibei-grand-canal')!.version!, /2021-04-06.*2021-06-02/);
  assert.match(chinaHistory.sources.find(source => source.id === 'canal-he-archaeology')!.version!, /同一作者.*不当作两个独立研究团队/);
  const reading = event.recommendedResources![0];
  assert.equal(reading.url, 'https://www.nju.edu.cn/info/1056/350301.htm');
  assert.equal(reading.kind, 'article');
  assert.equal(reading.creator, '贺云翱');
  assert.ok(reading.series && reading.match && reading.locator && reading.scopeNote);
  assert.equal(reading.publishedAt, '2023-12-15');
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  assert.ok(!payload.includes(reading.id));
  assert.ok(!payload.includes('回洛仓遗址'));
});
