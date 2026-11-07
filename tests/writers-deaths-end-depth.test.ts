import test from 'node:test';
import assert from 'node:assert/strict';
import { writersCatalog } from '../src/topics/writers/catalog';
import { deathsEndSources } from '../src/topics/writers/deaths-end-depth';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

const event = writersCatalog.events.find(e => e.id === 'liu-cixin-three-body-3')!;
test('Death’s End keeps Chinese publication distinct from translation and Hugo finalist status', () => {
  assert.deepEqual(validateCatalog(writersCatalog), []);
  assert.deepEqual(event.time, { kind: 'point', start: { year: 2010, month: 11 } });
  assert.equal(writersCatalog.events.filter(e => e.id === event.id).length, 1);
  assert.equal(event.category, 'sci-fi');
  assert.deepEqual(event.entityIds, ['liu-cixin']);
  const facts = JSON.stringify(event.facts);
  assert.match(facts, /2016年9月20日/);
  assert.match(facts, /9780765377104/);
  assert.match(facts, /Ken Liu/);
  assert.match(facts, /决选入围；不是该奖项获奖作品/);
  assert.ok(event.facts?.find(f => f.label === '雨果奖记录')?.sourceIds?.includes('writers-hugo-2017-results'));
  assert.equal(event.details?.filter(d => d.editorial).length, 1);
  assert.ok(event.details?.filter(d => !d.editorial).every(d => d.sourceIds?.length && d.locator));
  assert.equal(event.details?.filter(d => d.editorial)[0].sourceIds, undefined);
});
test('Death’s End identifies the actual interview and keeps English-only verification explicit', () => {
  const resource = event.recommendedResources![0];
  assert.equal(event.recommendedResources?.length, 1);
  assert.equal(resource.url, 'https://mithilareview.com/liu_01_17/');
  assert.match(resource.creator!, /Salik Shah.*Shaoyan Hu/);
  assert.match(resource.scopeNote!, /英文访谈.*中文原文链接本次超时/);
  assert.equal(resource.publishedAt, undefined);
  assert.ok(deathsEndSources.every(s => s.checkedAt === '2026-11-07'));
  assert.equal(writersCatalog.sources.find(s => s.id === 'writers-three-body-chronology')?.checkedAt, '2026-10-24');
  const payload = JSON.stringify(createExplorerPayload(writersCatalog));
  assert.ok(payload.includes(event.id));
  assert.ok(!payload.includes(resource.id));
  assert.ok(!payload.includes('作者解释：价值选择与处境'));
});
