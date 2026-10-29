import test from 'node:test';
import assert from 'node:assert/strict';
import { writersCatalog } from '../src/topics/writers/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

test('Great Healer separates initial publication, reprints, volumes and fiction', () => {
  assert.deepEqual(validateCatalog(writersCatalog), []);
  const e = writersCatalog.events.find(e => e.id === 'ma-bo-yong-great-healer')!;
  assert.deepEqual(e.time.start, { year: 2022, month: 9 });
  assert.equal(e.category, 'historical');
  assert.equal(e.details?.length, 4);
  assert.equal(e.details?.filter(d => d.editorial).length, 1);
  assert.ok(e.details?.every(d => d.sourceIds?.length && d.locator));
  assert.match(JSON.stringify(e), /2022年12月/);
  assert.match(JSON.stringify(e), /每篇各有上下两册/);
  assert.match(JSON.stringify(e), /并无一比一/);
  assert.match(JSON.stringify(e), /不作现实医疗建议/);
  assert.equal(e.sourceIds.length, 4);
});
test('Great Healer specific media preserve evidence boundary and compact payload', () => {
  const e = writersCatalog.events.find(e => e.id === 'ma-bo-yong-great-healer')!;
  assert.equal(writersCatalog.events.filter(x => x.id === e.id).length, 1);
  assert.equal(writersCatalog.sources.find(s => s.id === 'writers-audit-great-healer')?.checkedAt, '2026-10-26');
  assert.equal(e.recommendedResources?.length, 2);
  const p = e.recommendedResources?.find(r => r.kind === 'audio')!;
  assert.match(p.url, /xiaoyuzhoufm.com\/episode\//);
  assert.equal(p.publishedAt, undefined);
  assert.match(p.scopeNote!, /未完整收听/);
  const payload = JSON.stringify(createExplorerPayload(writersCatalog));
  assert.ok(payload.includes(e.id));
  assert.ok(!payload.includes('great-healer-ritan-483'));
  assert.ok(!payload.includes('三位主人公不是三份人物传记'));
});
