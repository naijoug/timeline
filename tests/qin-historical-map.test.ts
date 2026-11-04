import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { historicalMapPeriodEvents } from '../src/topics/china-history/historical-maps';
import { qinEmpireMap } from '../src/topics/china-history/qin-empire-map';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventSourceIds } from '../src/core/evidence';
import { validateCatalog } from '../src/core/validate';

test('Qin map preserves licensed source pixels and distinguishes depiction from event date', () => {
  const event = chinaHistory.events.find(item => item.id === 'qin-unification')!;
  const map = event.maps![0];
  assert.equal(map, qinEmpireMap);
  assert.equal(event.time.start.year, -221);
  assert.equal(map.kind, 'reconstruction');
  assert.match(map.depictedTime, /鼎盛期.*未指定单一年份/);
  assert.match(map.scopeNote, /不是前221年/);
  assert.match(map.scopeNote, /象郡、桂林郡具体位置未知/);
  assert.match(map.creator, /Brian Lander.*Lynn Carlson/);
  assert.equal(map.license.url, 'https://creativecommons.org/licenses/by/4.0/');
  assert.match(map.createdAt, /2022.*2023/);
  assert.match(map.originalUrl!, /#page=9$/);
  assert.match(map.modificationNote, /未裁切地图、重绘、翻译图内文字或改动符号/);
  const png = readFileSync(`public${map.assetPath}`);
  assert.equal(png.readUInt32BE(16), map.width);
  assert.equal(png.readUInt32BE(20), map.height);
  assert.equal(createHash('sha256').update(png).digest('hex'), '766fb1bc20ee62a1b2ba68f130a67cbed101c743f414f95808d9210ad6d00408');
  assert.ok(png.length < 450_000);
  assert.ok(map.sourceIds.every(id => eventSourceIds(event).includes(id)));
  assert.deepEqual(validateCatalog(chinaHistory), []);
});

test('dynasty map associations are explicit, reuse events and stay out of the client index', () => {
  assert.deepEqual(historicalMapPeriodEvents.qin, ['qin-unification', 'julu']);
  for (const [periodId, eventIds] of Object.entries(historicalMapPeriodEvents)) {
    assert.ok(chinaHistory.periods.some(period => period.id === periodId));
    for (const id of eventIds) {
      const event = chinaHistory.events.find(item => item.id === id)!;
      assert.ok(event.periodIds.includes(periodId));
      assert.ok(event.maps?.length);
    }
  }
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  for (const detail of [qinEmpireMap.assetPath, qinEmpireMap.scopeNote, 'map-qin-lander', 'readingPoints']) assert.ok(!payload.includes(detail), detail);
  assert.ok(!chinaHistory.events.find(event => event.id === 'guandu')?.maps?.some(map => map.id === qinEmpireMap.id));
});

test('Qin reading guide distinguishes symbols, chronology and uncertain southern locations', () => {
  const points = qinEmpireMap.readingPoints!;
  assert.equal(points.length, 3);
  assert.match(points[0].text, /250公里/);
  assert.match(points[1].text, /约前230年至前206年/);
  assert.match(points[1].scopeNote, /不能.*前221年/);
  assert.match(points[2].text, /注25.*位置未知/);
  assert.ok(points.every(point => point.sourceIds.includes('map-qin-lander') && point.locator && point.scopeNote));
});
