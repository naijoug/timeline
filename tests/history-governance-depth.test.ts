import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { historyReviewedEventPatches } from '../src/topics/china-history/reviewed-records';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

const entry = (id: string) => {
  const found = chinaHistory.events.find(event => event.id === id);
  assert.ok(found, id);
  return found;
};

test('Tang–Song detail patches survive catalog ordering without changing event chronology', () => {
  assert.deepEqual(validateCatalog(chinaHistory), []);
  assert.equal(chinaHistory.events.length, 145);
  assert.deepEqual(entry('an-shi').time, { kind: 'duration', start: { year: 755 }, end: { year: 763 } });
  assert.deepEqual(entry('wang-anshi-reforms').time, { kind: 'point', start: { year: 1069 } });
  for (const id of ['an-shi', 'wang-anshi-reforms']) {
    const event = entry(id);
    assert.equal(chinaHistory.events.filter(candidate => candidate.id === id).length, 1);
    for (const previous of historyReviewedEventPatches[id].details!.filter(section => !section.editorial)) {
      assert.ok(event.details!.some(section => JSON.stringify(section) === JSON.stringify(previous)), `${id}: preserved reviewed section`);
    }
    assert.ok(event.details!.filter(section => !section.editorial).length >= 5);
    assert.equal(event.details!.filter(section => section.editorial).length, 1);
    for (const section of event.details!.filter(section => !section.editorial)) {
      assert.ok(section.sourceIds?.length && section.locator, `${id}: ${section.label}`);
      // EventRecord only receives event.sourceIds; a globally valid but omitted source cannot render.
      assert.ok(section.sourceIds.every(sourceId => event.sourceIds.includes(sourceId)), `${id}: hidden evidence`);
    }
  }
});

test('evidence distinguishes bibliography, public abstracts, objects and policy intentions', () => {
  const source = (id: string) => chinaHistory.sources.find(source => source.id === id)!;
  assert.ok(entry('an-shi').sourceIds.includes('an-shi-cambridge-provinces'));
  assert.ok(!entry('an-shi').sourceIds.includes('an-shi'));
  assert.match(source('an-shi-cambridge-provinces').version!, /只读取公开摘要.*未读取付费章节全文/);
  assert.match(source('an-shi-yan-memorial').version!, /403.*未获取原卷高清图/);
  assert.match(source('wang-anshi-crop-loans').version!, /不证明普遍实施成效.*1068/);
  assert.match(entry('an-shi').note!, /不以户籍减少直接计算死亡人数/);
  assert.match(entry('wang-anshi-reforms').note!, /不把离任等同全部新法终止/);
  for (const id of ['an-shi-pulleyblank', 'an-shi-cambridge-provinces', 'an-shi-yan-memorial', 'wang-anshi-crop-loans', 'wang-anshi-smith-policy']) {
    assert.equal(source(id).checkedAt, '2026-10-25');
    assert.ok(source(id).locator && source(id).version);
  }
  assert.equal(source('backbone-tang-met-review').checkedAt, '2026-10-25');
  // Only the explicitly reread review entry is redated; old bibliographic/base records stay honest.
  assert.equal(source('an-shi').checkedAt, '2026-09-30');
  assert.equal(source('tang-met').checkedAt, '2026-09-30');
  assert.equal(source('anc-wanganshi').checkedAt, '2026-10-28');
});

test('specific primary-text and academic readings supplement rather than replace existing videos', () => {
  const resources = ['npm-yan-memorial-reading', 'columbia-crop-loans-reading', 'ucpress-smith-new-policies-reading'];
  const all = chinaHistory.events.flatMap(event => event.recommendedResources || []);
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  for (const id of resources) {
    const matches = all.filter(resource => resource.id === id);
    assert.equal(matches.length, 1);
    const resource = matches[0];
    assert.equal(resource.kind, 'article');
    assert.ok(resource.creator && resource.series && resource.locator && resource.scopeNote);
    assert.equal(resource.checkedAt, '2026-10-25');
    assert.ok(!payload.includes(id));
  }
  assert.equal(entry('an-shi').recommendedResources!.find(resource => resource.id === 'cctv-an-lushan')!.checkedAt, '2026-10-24');
  assert.equal(entry('wang-anshi-reforms').recommendedResources!.find(resource => resource.id === 'civilization-1074')!.url, 'https://www.youtube.com/watch?v=TuuHp2BW3HA');
  assert.equal('details' in createExplorerPayload(chinaHistory).catalog.events.find(event => event.id === 'an-shi')!, false);
});
