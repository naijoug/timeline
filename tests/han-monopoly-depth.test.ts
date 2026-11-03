import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { validateCatalog } from '../src/core/validate';
const event = chinaHistory.events.find(item => item.id === 'han-state-monopolies')!;
test('Han monopoly preserves identity while marking the disputed starting year', () => {
  assert.deepEqual(event.time, { kind: 'point', start: { year: -119, approximate: true } });
  assert.equal(chinaHistory.events.filter(item => item.id === event.id).length, 1);
  assert.deepEqual(event.periodIds, ['western-han']);
  assert.match(event.note!, /前117年异说/);
  assert.match(event.note!, /不是.*连续实施/);
  assert.deepEqual(validateCatalog(chinaHistory), []);
});
test('Han monopoly distinguishes material evidence, later debate and editorial inference', () => {
  const details = event.details!;
  assert.match(details[1].text, /单组陶范不能证明/);
  assert.match(details[2].text, /前81年/);
  assert.match(details[2].text, /不是.*创设年份/);
  assert.match(details[3].text, /双方论点.*不能直接当作/);
  assert.match(details[4].text, /不宜当成.*逐字记录/);
  assert.equal(details.filter(item => item.editorial).length, 1);
  assert.match(details.at(-1)!.label, /编辑总结/);
  for (const detail of details.filter(item => !item.editorial)) {
    assert.ok(detail.locator);
    assert.ok(detail.sourceIds?.every(id => event.sourceIds.includes(id)));
  }
});
test('Han monopoly reading links have verified identities and bounded claims', () => {
  assert.equal(event.recommendedResources!.length, 2);
  const interview = event.recommendedResources![1];
  assert.match(interview.creator!, /Dan Turello.*Kenneth Pomeranz/);
  assert.equal(interview.publishedAt, '2020-05-15');
  assert.match(interview.locator!, /第一问/);
  assert.match(interview.scopeNote!, /现代解释.*不是汉代原文/);
  assert.equal(event.recommendedResources![0].publishedAt, undefined);
});
