import test from 'node:test';
import assert from 'node:assert/strict';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

test('Rust async history separates Future stabilization, syntax and edition', () => {
  assert.deepEqual(validateCatalog(programmingLanguages), []);
  const e = programmingLanguages.events.find(e => e.id === 'rust-139-async')!;
  assert.deepEqual(e.time.start, { year: 2019, month: 11, day: 7 });
  assert.equal(e.details?.length, 4);
  assert.equal(e.details?.filter(d => d.editorial).length, 1);
  assert.ok(e.details?.every(d => d.sourceIds?.length && d.locator));
  assert.match(JSON.stringify(e.details), /2019年7月4日/);
  assert.match(JSON.stringify(e.details), /不会自行调度/);
  assert.match(JSON.stringify(e.details), /不等于启动新线程/);
  assert.match(e.note!, /当前教程只用于解释执行模型/);
  assert.equal(e.recommendedResources?.[0].publishedAt, '2019-11-07');
  assert.equal(e.sourceIds.length, 6);
});
test('Rust async preserves old identity and source audit dates, excludes long reading from payload', () => {
  assert.equal(programmingLanguages.events.filter(e => e.id === 'rust-139-async').length, 1);
  assert.equal(programmingLanguages.sources.find(s => s.id === 'rust139-release')?.checkedAt, '2026-10-24');
  assert.equal(programmingLanguages.sources.find(s => s.id === 'rust136-future-release')?.publishedAt, '2019-07-04');
  const payload = JSON.stringify(createExplorerPayload(programmingLanguages));
  assert.ok(payload.includes('rust-139-async'));
  assert.ok(!payload.includes('rust139-async-reading'));
  assert.ok(!payload.includes('先稳定 Future，再交付语法'));
});
