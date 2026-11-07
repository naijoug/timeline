import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { chibiDepthSources } from '../src/topics/china-history/chibi-depth';
import { validateCatalog } from '../src/core/validate';
import { createExplorerPayload } from '../src/core/explorer-payload';

const event = chinaHistory.events.find(e => e.id === 'chibi')!;
test('Red Cliffs keeps one Eastern Han event and year-level date without disputed geography', () => {
  assert.deepEqual(validateCatalog(chinaHistory), []);
  assert.equal(chinaHistory.events.filter(e => e.id === 'chibi').length, 1);
  assert.deepEqual(event.time, { kind: 'point', start: { year: 208 } });
  assert.deepEqual(event.periodIds, ['eastern-han']);
  assert.equal(event.category, 'battle');
  assert.match(event.note!, /不裁定现代赤壁遗址坐标/);
  assert.match(event.note!, /先后次序的异议/);
  assert.match(event.note!, /疫病种类、兵力和伤亡总数不作定数/);
  assert.equal(event.maps, undefined);
});
test('Red Cliffs separates chronicle, commentary and editorial interpretation', () => {
  assert.equal(event.details!.length, 5);
  const comparison = event.details![2];
  assert.match(comparison.text, /先记.*交战不利.*再记大疫/);
  assert.match(comparison.text, /疾病放在初战之前/);
  assert.match(comparison.text, /裴注引《江表传》.*不是现存原信/);
  assert.equal(comparison.sourceIds!.length, 2);
  assert.equal(event.details!.filter(d => d.editorial).length, 1);
  assert.equal(event.details!.at(-1)!.sourceIds, undefined);
  assert.ok(event.details!.filter(d => !d.editorial).every(d => d.locator && d.sourceIds?.every(id => event.sourceIds.includes(id))));
  assert.ok(chibiDepthSources.every(s => s.checkedAt === '2026-11-07'));
  assert.equal(chinaHistory.sources.find(s => s.id === 'anc-chibi-yiling')!.checkedAt, '2026-10-24');
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  assert.ok(payload.includes('chibi'));
  assert.ok(!payload.includes('史源对读：不能只选火攻或疫病'));
});

test('Red Cliffs recommends a specific article with edition and access limits', () => {
  const resource = event.recommendedResources![0];
  assert.equal(event.recommendedResources!.length, 1);
  assert.equal(resource.creator, 'Rafe de Crespigny');
  assert.match(resource.series!, /1991年6月/);
  assert.match(resource.scopeNote, /索引提取正文.*未通读全文.*403/);
  assert.match(resource.locator!, /纸本页码/);
  const source = chibiDepthSources.find(s => s.id === 'chibi-crespigny-three-kingdoms')!;
  assert.equal(resource.url, source.url);
  assert.match(source.version!, /2003.*不作期刊首发年/);
  assert.ok(!JSON.stringify(createExplorerPayload(chinaHistory)).includes(resource.id));
});
