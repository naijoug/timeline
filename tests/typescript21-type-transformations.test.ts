import test from 'node:test';
import assert from 'node:assert/strict';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { validateCatalog } from '../src/core/validate';
import { createExplorerPayload } from '../src/core/explorer-payload';

const event = programmingLanguages.events.find(event => event.id === 'typescript-21')!;
test('TypeScript 2.1 records final release and type-level transformations once', () => {
  assert.deepEqual(validateCatalog(programmingLanguages), []);
  assert.equal(programmingLanguages.events.filter(item => item.id === event.id).length, 1);
  assert.deepEqual(event.time, { kind: 'point', start: { year: 2016, month: 12, day: 7 } });
  assert.deepEqual(event.entityIds, ['typescript']);
  assert.deepEqual(event.periodIds, ['modern-safety']);
  assert.match(event.note!, /不是 RC/);
  assert.match(event.note!, /未运行 TypeScript 2.1/);
  assert.match(event.summary, /keyof、索引访问与映射类型/);
  assert.equal(event.details?.filter(section => section.editorial).length, 1);
  assert.ok(event.details?.every(section => section.sourceIds?.length && section.locator));
  const body = JSON.stringify(event.details);
  assert.match(body, /Partial、Readonly、Record、Pick/);
  assert.match(body, /不等于运行时自动复制或冻结/);
  assert.match(body, /全局 Promise/);
  assert.match(body, /lib 选项/);
  assert.match(body, /类型声明不能代替运行时实现/);
});
test('TypeScript 2.1 keeps dated announcement distinct from versioned reference', () => {
  const sources = new Map(programmingLanguages.sources.map(source => [source.id, source]));
  assert.equal(sources.get('typescript21-announcement')?.publishedAt, '2016-12-07');
  assert.equal(sources.get('typescript21-versioned-notes')?.publishedAt, undefined);
  assert.equal(sources.get('typescript21-versioned-notes')?.version, 'TypeScript 2.1');
  assert.equal(sources.get('typescript21-versioned-notes')?.checkedAt, '2026-11-07');
  const reading = event.recommendedResources![0];
  assert.equal(reading.url, sources.get('typescript21-versioned-notes')?.url);
  assert.equal(reading.publishedAt, undefined);
  assert.match(reading.scopeNote!, /不声称通读/);
  assert.equal(sources.get('typescript20-versioned-notes')?.checkedAt, '2026-11-06');
});
test('TypeScript 2.1 detailed reading remains outside lightweight explorer payload', () => {
  const payload = createExplorerPayload(programmingLanguages);
  const projected = payload.catalog.events.find(item => item.id === event.id)!;
  assert.equal(projected.summary, event.summary);
  for (const key of ['details', 'recommendedResources', 'change', 'note']) assert.ok(!(key in projected));
  assert.ok(!JSON.stringify(payload).includes('typescript21-type-transformations-reading'));
});
