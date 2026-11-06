import test from 'node:test';
import assert from 'node:assert/strict';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

const event = programmingLanguages.events.find(event => event.id === 'typescript-20')!;

test('TypeScript 2.0 distinguishes final release, opt-in checking and expanded analysis', () => {
  assert.deepEqual(validateCatalog(programmingLanguages), []);
  assert.deepEqual(event.time, { kind: 'point', start: { year: 2016, month: 9, day: 22 } });
  assert.match(event.summary, /可选择启用的 strictNullChecks/);
  assert.match(event.summary, /扩展控制流/);
  assert.match(event.note!, /不是 Beta 或 RC/);
  assert.match(event.note!, /不等于自动启用/);
  assert.equal(event.details?.length, 4);
  assert.equal(event.details?.filter(section => section.editorial).length, 1);
  assert.ok(event.details?.every(section => section.sourceIds?.length && section.locator));
  const details = JSON.stringify(event.details);
  assert.match(details, /不是首次出现类型守卫/);
  assert.match(details, /return 和 break/);
  assert.match(details, /不会插入空值检查/);
  assert.match(event.change!.tradeoffs, /不提供运行时检查/);
  assert.match(event.significance!, /^编辑解读/);
});

test('TypeScript source review is scoped and reading recommendations name the official resource', () => {
  const sources = new Map(programmingLanguages.sources.map(source => [source.id, source]));
  assert.equal(sources.get('typescript20-exact-release')?.publishedAt, '2016-09-22');
  assert.equal(sources.get('typescript20-exact-release')?.checkedAt, '2026-11-06');
  assert.equal(sources.get('typescript20-versioned-notes')?.checkedAt, '2026-11-06');
  assert.equal(sources.get('typescript20-versioned-notes')?.version, 'TypeScript 2.0');
  // A focused review must not silently refresh adjacent versions or infer a notes publication date.
  assert.equal(sources.get('typescript-release-notes')?.checkedAt, '2026-10-26');
  assert.equal(sources.get('typescript50-exact-release')?.checkedAt, '2026-10-26');
  assert.equal(sources.get('typescript20-versioned-notes')?.publishedAt, undefined);
  const reading = event.recommendedResources![0];
  assert.equal(reading.title, 'TypeScript 2.0');
  assert.equal(reading.creator, 'Microsoft / TypeScript 文档贡献者');
  assert.match(reading.series!, /TypeScript 官网/);
  assert.match(reading.match, /检查边界/);
  assert.equal(reading.url, sources.get('typescript20-versioned-notes')?.url);
  assert.equal(reading.publishedAt, undefined);
});

test('TypeScript depth keeps one existing event and leaves long reading outside the client index', () => {
  assert.equal(programmingLanguages.events.filter(candidate => candidate.id === 'typescript-20').length, 1);
  assert.deepEqual(event.entityIds, ['typescript']);
  assert.deepEqual(event.periodIds, ['modern-safety']);
  const payload = createExplorerPayload(programmingLanguages);
  const projected = payload.catalog.events.find(candidate => candidate.id === event.id)!;
  assert.equal(projected.summary, event.summary);
  for (const field of ['details', 'recommendedResources', 'change', 'note']) assert.ok(!(field in projected));
  const serialized = JSON.stringify(payload);
  assert.ok(!serialized.includes('typescript20-null-checking-reading'));
  assert.ok(!serialized.includes('边界：断言不是运行时守卫'));
});
