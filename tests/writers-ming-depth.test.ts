import test from 'node:test';
import assert from 'node:assert/strict';
import { writersCatalog } from '../src/topics/writers/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

test('Ming microscope separates publication month, interviews and adaptation evidence', () => {
  assert.deepEqual(validateCatalog(writersCatalog), []);
  const e = writersCatalog.events.find(e => e.id === 'ma-bo-yong-ming-microscope')!;
  assert.deepEqual(e.time.start, { year: 2019, month: 1 });
  assert.equal(e.category, 'non-fiction');
  assert.equal(e.details?.length, 4);
  assert.equal(e.details?.filter(d => d.editorial).length, 1);
  assert.ok(e.details?.every(d => d.sourceIds?.length && d.locator));
  assert.match(JSON.stringify(e), /未逐件核验/);
  assert.match(JSON.stringify(e), /第一篇/);
  assert.doesNotMatch(JSON.stringify(e), /豆瓣评分|8\.7|开创/);
  assert.equal(e.recommendedResources?.[0].publishedAt, '2023-02-21');
  assert.equal(e.sourceIds.length, 4);
});
test('Ming depth keeps stable ID and old audit date, excludes reading from client index', () => {
  assert.equal(writersCatalog.events.filter(e => e.id === 'ma-bo-yong-ming-microscope').length, 1);
  assert.equal(writersCatalog.sources.find(s => s.id === 'writers-audit-ming-microscope')?.checkedAt, '2026-10-26');
  const payload = JSON.stringify(createExplorerPayload(writersCatalog));
  assert.ok(payload.includes('ma-bo-yong-ming-microscope'));
  assert.ok(!payload.includes('ming-microscope-adaptation-reading'));
  assert.ok(!payload.includes('从税案线索到文书阅读'));
});
