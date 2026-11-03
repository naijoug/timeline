import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { hanFrontierMap } from '../src/topics/china-history/han-frontier-map';
import { historicalMapPeriodEvents } from '../src/topics/china-history/historical-maps';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventSourceIds } from '../src/core/evidence';
import { validateCatalog } from '../src/core/validate';

test('Han frontier figure preserves source image, license and explicit event/period reuse', () => {
  const event = chinaHistory.events.find(item => item.id === 'western-han-founded')!;
  assert.equal(event.maps?.[0], hanFrontierMap);
  assert.equal(event.time.start.year, -202);
  assert.deepEqual(historicalMapPeriodEvents.han, [event.id]);
  assert.deepEqual(historicalMapPeriodEvents['western-han'], [event.id]);
  const png = readFileSync(`public${hanFrontierMap.assetPath}`);
  assert.equal(png.readUInt32BE(16), hanFrontierMap.width);
  assert.equal(png.readUInt32BE(20), hanFrontierMap.height);
  assert.equal(createHash('sha256').update(png).digest('hex'), '79cb7a295ae4b7146ff8c8b2fc421461ab73d126b965a5e20156619afbe11a46');
  assert.ok(png.length < 850_000);
  assert.equal(hanFrontierMap.license.url, 'https://creativecommons.org/licenses/by/4.0/');
  assert.match(hanFrontierMap.creator, /Zehao Li.*Andrew Bevan.*Xu.*Yu/);
  assert.match(hanFrontierMap.originalUrl!, /#page=2$/);
  assert.ok(hanFrontierMap.sourceIds.every(id => eventSourceIds(event).includes(id)));
  assert.deepEqual(validateCatalog(chinaHistory), []);
});

test('Han map makes uncertain solid line and cross-period coverage explicit outside folded sources', () => {
  assert.match(hanFrontierMap.description, /城梁至麻池.*红实线.*推定/);
  assert.match(hanFrontierMap.depictedTime, /不是前202年快照/);
  assert.match(hanFrontierMap.scopeNote, /不是汉朝疆域总图.*行军路线/);
  assert.match(hanFrontierMap.scopeNote, /不能据白点认定.*同时存在或同时使用/);
  const points = hanFrontierMap.readingPoints!;
  assert.equal(points.length, 3);
  assert.match(points[0].text, /现代地理定位/);
  assert.match(points[1].text, /部分路段.*考古证据.*推定和少量遗存/);
  assert.match(points[2].scopeNote, /模型是研究假设/);
  assert.ok(points.every(point => point.sourceIds.every(id => hanFrontierMap.sourceIds.includes(id)) && point.locator && point.scopeNote));
});

test('Han frontier archive remains static and does not invent other period maps', () => {
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  for (const detail of [hanFrontierMap.assetPath, hanFrontierMap.scopeNote, hanFrontierMap.sourceIds[0]]) assert.ok(!payload.includes(detail), detail);
  assert.equal(historicalMapPeriodEvents['eastern-han'], undefined);
  assert.ok(!chinaHistory.events.find(event => event.id === 'guandu')?.maps?.some(map => map.id === hanFrontierMap.id));
});
