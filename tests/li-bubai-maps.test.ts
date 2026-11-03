import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { writersCatalog } from '../src/topics/writers/catalog';
import { liBubaiEvents, liBubaiTimeline } from '../src/topics/writers/li-bubai';
import { writersReadingPaths, authorTimeline } from '../src/topics/writers/reading';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { validateCatalog } from '../src/core/validate';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventSourceIds } from '../src/core/evidence';

test('Li Bubai joins as five version-specific publication records, not invented biographical dates', () => {
  assert.deepEqual(validateCatalog(writersCatalog), []);
  assert.equal(writersCatalog.events.length, 64);
  assert.equal(writersCatalog.entities.length, 4);
  assert.equal(liBubaiEvents.length, 5);
  assert.deepEqual(authorTimeline(writersCatalog, 'li-bu-bai').map(event => event.id), liBubaiTimeline.entries.map(entry => entry.eventId));
  assert.deepEqual(liBubaiEvents.map(event => event.time.start), [{year:2019,month:12},{year:2020,month:9},{year:2022},{year:2024,month:1},{year:2024,month:8}]);
  for(const event of liBubaiEvents){
    assert.equal(writersCatalog.events.filter(item => item.id === event.id).length, 1);
    assert.ok(event.details!.filter(section => !section.editorial).every(section => section.sourceIds?.length && section.locator));
    assert.ok(event.details!.some(section => section.editorial));
    assert.ok(event.facts!.some(fact => fact.text.includes('未宣称读完')));
  }
  assert.match(liBubaiEvents[1].note!, /2021年7月.*差异原因未核定/);
  assert.match(liBubaiEvents[2].note!, /6月与7月.*年份/);
  assert.match(liBubaiEvents[2].note!, /2021年已有.*未逐页核对/);
  assert.match(writersReadingPaths['li-bu-bai'][0].note, /不是出版顺序/);
});

test('original Feishui map is source-scoped, local and separate from event date and client index', () => {
  assert.deepEqual(validateCatalog(chinaHistory), []);
  const event = chinaHistory.events.find(item => item.id === 'feishui')!;
  const map = event.maps![0];
  assert.deepEqual(event.time.start, {year:383});
  assert.equal(map.createdAt, '2026-11-02');
  assert.equal(map.kind, 'schematic');
  assert.match(map.scopeNote, /两窗不作坐标对位/);
  assert.match(map.scopeNote, /不是383年绘制/);
  assert.match(map.scopeNote, /不表示流向/);
  assert.ok(map.sourceIds.every(id => eventSourceIds(event).includes(id)));
  const file = `public${map.assetPath}`;
  assert.ok(statSync(file).size < 15_000);
  const svg = readFileSync(file, 'utf8');
  assert.match(svg, new RegExp(`width="${map.width}" height="${map.height}"`));
  assert.match(svg, /<title/); assert.match(svg, /<desc/);
  assert.doesNotMatch(svg, /<script|<foreignObject|<image|href=|onload=/i);
  assert.match(svg, /西岸/); assert.match(svg, /东岸/);
  assert.ok(!chinaHistory.events.find(event => event.id === 'guandu')?.maps?.some(other => other.id === map.id));
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  assert.ok(!payload.includes('"maps"')); assert.ok(!payload.includes(map.assetPath));
  assert.ok(!payload.includes(map.scopeNote));
});

test('map provenance validation rejects broken sources, external assets and empty scope', () => {
  const catalog = structuredClone(chinaHistory);
  const map = catalog.events.find(event => event.id === 'feishui')!.maps![0];
  map.sourceIds = ['missing-map-source']; map.assetPath = 'https://example.com/map.svg'; map.scopeNote = ''; map.width = -1;
  const errors = validateCatalog(catalog);
  for(const term of ['unknown reference missing-map-source', 'incomplete map provenance', 'invalid map asset']) assert.ok(errors.some(error => error.includes(term)),term);
});
