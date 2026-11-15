import test from 'node:test';
import assert from 'node:assert/strict';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { rust1100Event as event, rust1100Sources } from '../src/topics/programming-languages/rust-1100-release';
import { languagePresentation } from '../src/topics/programming-languages/presentation';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventSourceIds } from '../src/core/evidence';
import { validateCatalog } from '../src/core/validate';

test('Rust 1.100 is one dated release with resolved evidence and no invented predecessor link', () => {
  assert.deepEqual(validateCatalog(programmingLanguages), []);
  assert.equal(programmingLanguages.events.filter(item => item.id === event.id).length, 1);
  assert.equal(programmingLanguages.events.length, 74);
  assert.deepEqual(event.time.start, { year: 2026, month: 11, day: 12 });
  assert.deepEqual(event.entityIds, ['rust']);
  assert.deepEqual(event.periodIds, ['modern-safety']);
  assert.equal(event.category, 'release');
  assert.equal(event.change?.baselineEventId, undefined);
  assert.match(event.change!.baseline, /1\.99\.1/);
  assert.match(event.change!.baseline, /1\.85 并非直接前一版本/);
  assert.equal(languagePresentation.latestEvent, event.id);
  assert.equal(languagePresentation.defaultEvent, 'fortran-i');
  assert.ok(languagePresentation.scopes!.find(scope => scope.id === 'rust')!.eventIds.includes(event.id));
  for (const id of eventSourceIds(event)) assert.ok(programmingLanguages.sources.some(source => source.id === id));
  assert.equal(rust1100Sources.find(source => source.id === 'rust1100-release-notes')!.publishedAt, '2026-11-12');
  assert.ok(rust1100Sources.filter(source => source.id !== 'rust1100-release-notes').every(source => !source.publishedAt));
  assert.ok(rust1100Sources.every(source => source.checkedAt === '2026-11-14' && source.locator));
});

test('Rust 1.100 separates new stable APIs from migration and unsafe responsibilities', () => {
  const text = JSON.stringify(event);
  for (const pattern of [/没有任何值的类型/, /不是新 edition/, /不是 Rust 2\.0/, /所有 editions/, /Infallible/, /lint 已移除/, /没有自动修复/, /unsafe trait/, /const 支持仍标为 unstable/, /未运行 Rust 1\.100/]) assert.match(text, pattern);
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  assert.ok(event.details!.every(section => section.sourceIds?.length && section.locator));
  assert.equal(event.recommendedResources!.length, 1);
  assert.ok(event.recommendedResources![0].creator && event.recommendedResources![0].scopeNote);
});

test('Rust 1.100 details stay out of the lightweight explorer index', () => {
  const payload = createExplorerPayload(programmingLanguages);
  const projected = payload.catalog.events.find(item => item.id === event.id)!;
  assert.equal(projected.summary, event.summary);
  for (const key of ['details', 'recommendedResources', 'change', 'note']) assert.ok(!(key in projected));
  assert.ok(!JSON.stringify(payload).includes('rust1100-fallback-reading'));
});
