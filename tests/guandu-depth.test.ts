import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';
const event = chinaHistory.events.find(event => event.id === 'guandu')!;
test('Guandu preserves identity and separates documented stages from editorial interpretation', () => {
  assert.deepEqual(validateCatalog(chinaHistory), []);
  assert.equal(chinaHistory.events.length, 145);
  assert.deepEqual(event.time, { kind: 'point', start: { year: 200 } });
  assert.equal(event.milestone, true);
  assert.equal(event.details!.length, 5);
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  for (const section of event.details!.filter(section => !section.editorial)) {
    assert.ok(section.locator && section.sourceIds?.length);
    assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id)));
  }
  assert.match(event.details![0].text, /阳武.*不是官渡或乌巢/);
  assert.match(event.details![2].text, /裴松之.*质疑/);
  assert.match(event.details![3].text, /不意味着200年北方已经统一/);
  assert.match(event.note!, /不直接换算为公历10月/);
});
test('Guandu reading identifies its author and limits while keeping long text out of explorer payload', () => {
  const reading = event.recommendedResources![0];
  assert.equal(reading.creator, '陈万雄');
  assert.equal(reading.kind, 'article');
  assert.equal(reading.publishedAt, undefined);
  assert.match(reading.scopeNote!, /未通读全书/);
  assert.match(reading.scopeNote!, /有误/);
  assert.equal(chinaHistory.sources.find(source => source.id === 'guandu-wudi-chronicle')!.checkedAt, '2026-10-29');
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  assert.ok(!payload.includes(reading.id));
  assert.ok(!payload.includes('曹瞒传'));
});
