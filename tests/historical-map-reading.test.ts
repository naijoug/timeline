import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { validateCatalog } from '../src/core/validate';
import { eventSourceIds } from '../src/core/evidence';
import { createExplorerPayload } from '../src/core/explorer-payload';

const event = chinaHistory.events.find(item => item.id === 'feishui')!;
const map = event.maps![0];

test('map guide matches both SVG windows and separates their specific evidence', () => {
  const points = map.readingPoints!;
  assert.deepEqual(points.map(point => point.label), ['A 城上所望', 'B 隔岸对峙']);
  const svg = readFileSync(`public${map.assetPath}`, 'utf8');
  for (const point of points) {
    assert.ok(svg.includes(`>${point.label}</text>`));
    assert.ok(point.sourceIds.every(id => map.sourceIds.includes(id) && eventSourceIds(event).includes(id)));
    assert.ok(point.locator && point.scopeNote);
  }
  assert.deepEqual(points.map(point => point.sourceIds), [['idiom-jinshu-fujian'], ['map-feishui-edb']]);
  assert.match(points[0].text, /唐修《晋书》记述/);
  assert.match(points[0].scopeNote, /不是.*现场测绘/);
  assert.match(points[1].text, /现代教学材料.*对峙阶段/);
  assert.match(points[1].locator, /第11页.*第12页/);
  assert.match(points[1].scopeNote, /不代表全战役的固定阵位/);
  assert.deepEqual(event.time.start, { year: 383 });
  assert.equal(map.createdAt, '2026-11-02');
  assert.deepEqual(validateCatalog(chinaHistory), []);
});

test('map guide is optional and remains outside the lightweight client index', () => {
  const catalog = structuredClone(chinaHistory);
  delete catalog.events.find(item => item.id === 'feishui')!.maps![0].readingPoints;
  assert.deepEqual(validateCatalog(catalog), []);
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  assert.ok(!payload.includes('readingPoints'));
  for (const point of map.readingPoints!) assert.ok(!payload.includes(point.text));
});

test('map guide rejects empty fields, duplicate labels and sources outside the map', () => {
  for (const field of ['label', 'text', 'locator', 'scopeNote'] as const) {
    const catalog = structuredClone(chinaHistory);
    catalog.events.find(item => item.id === 'feishui')!.maps![0].readingPoints![0][field] = ' ';
    assert.ok(validateCatalog(catalog).some(error => error.includes('map reading point: incomplete content or evidence')), field);
  }
  for (const sourceIds of [[], ['missing-map-source'], [chinaHistory.sources.find(source => !map.sourceIds.includes(source.id))!.id]]) {
    const catalog = structuredClone(chinaHistory);
    catalog.events.find(item => item.id === 'feishui')!.maps![0].readingPoints![0].sourceIds = sourceIds;
    assert.ok(validateCatalog(catalog).some(error => error.includes('map reading point:')), JSON.stringify(sourceIds));
  }
  const catalog = structuredClone(chinaHistory);
  const points = catalog.events.find(item => item.id === 'feishui')!.maps![0].readingPoints!;
  points[1].label = ` ${points[0].label} `;
  assert.ok(validateCatalog(catalog).some(error => error.includes('map reading point: duplicate label')));
});
