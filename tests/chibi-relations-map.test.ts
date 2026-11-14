import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { chibiRelationsMap as map } from '../src/topics/china-history/chibi-relations-map';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventSourceIds } from '../src/core/evidence';
import { historicalMapPeriodEvents } from '../src/topics/china-history/historical-maps';
import { validateCatalog } from '../src/core/validate';

test('Chibi map reuses one event and existing primary evidence without client payload growth', () => {
  const events = chinaHistory.events.filter(event => event.id === 'chibi');
  assert.equal(events.length, 1);
  assert.equal(events[0].maps?.[0], map);
  assert.deepEqual(historicalMapPeriodEvents['eastern-han'], ['guandu', 'chibi']);
  assert.deepEqual(Object.entries(historicalMapPeriodEvents).filter(([, ids]) => ids.includes('chibi')).map(([id]) => id), ['eastern-han']);
  assert.equal(events[0].time.start.year, 208);
  assert.ok(map.sourceIds.every(id => eventSourceIds(events[0]).includes(id)));
  assert.deepEqual(validateCatalog(chinaHistory), []);
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  for (const value of [map.assetPath, map.scopeNote]) assert.ok(!payload.includes(value));
  assert.deepEqual(map.sourceIds, ['chibi-zhouyu-chronicle', 'chibi-wudi-chronicle']);
});

test('Chibi relation panes preserve attribution, uncertainty and reuse boundaries', () => {
  assert.equal(map.readingPoints?.length, 3);
  assert.equal(map.kind, 'schematic');
  assert.match(map.scopeNote, /三窗独立、非按比例，不作坐标对齐/);
  assert.match(map.readingPoints![0].text, /初战失利.*曹军移次江北/);
  assert.match(map.readingPoints![1].scopeNote!, /裴注.*东南风.*不转写/);
  assert.match(map.readingPoints![2].text, /《武帝纪》正文.*裴注.*《山阳公载记》.*孙盛.*先后异文/);
  assert.match(map.readingPoints![2].scopeNote!, /南郡地区与江陵城不是同一层级/);
  assert.ok(map.readingPoints!.every(point => point.locator && point.scopeNote && point.sourceIds.every(id => map.sourceIds.includes(id))));
  assert.match(map.license.label, /原创.*未复制第三方地图/);
  const svg = readFileSync(`public${map.assetPath}`, 'utf8');
  assert.match(svg, /width="640" height="1080"/);
  assert.match(svg, /不作坐标对齐/);
  assert.match(svg, /箭头不是舰船航线或风向/);
  assert.ok(Buffer.byteLength(svg) < 6500);
  assert.doesNotMatch(svg, /<script|<image|<foreignObject|(?:href|src)=|公里|经度|纬度/);
});
