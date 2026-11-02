import test from 'node:test';
import assert from 'node:assert/strict';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

test('Java 21 distinguishes GA, final features, previews and version-specific limits', () => {
  assert.deepEqual(validateCatalog(programmingLanguages), []);
  const e = programmingLanguages.events.find(e => e.id === 'java-21')!;
  assert.deepEqual(e.time.start, { year: 2023, month: 9, day: 19 });
  assert.equal(e.details?.length, 4);
  assert.equal(e.details?.filter(d => d.editorial).length, 1);
  assert.ok(e.details?.every(d => d.sourceIds?.length && d.locator));
  const body = JSON.stringify(e.details);
  assert.match(body, /Structured Concurrency 仍是 Preview/);
  assert.match(body, /不会让代码执行得更快/);
  assert.match(body, /在 Java 21 中，synchronized/);
  assert.match(e.note!, /不泛化各发行商期限/);
  assert.match(e.note!, /不代表所有后续版本/);
});

test('Java 21 retains identity and keeps detailed reading out of the explorer payload', () => {
  const matches = programmingLanguages.events.filter(e => e.id === 'java-21');
  assert.equal(matches.length, 1);
  assert.deepEqual(matches[0].entityIds, ['java']);
  assert.deepEqual(matches[0].periodIds, ['modern-safety']);
  const resource = matches[0].recommendedResources?.[0];
  assert.equal(resource?.url, 'https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html');
  assert.equal(resource?.creator, 'Oracle');
  assert.equal(resource?.publishedAt, undefined);
  assert.equal(programmingLanguages.sources.find(s => s.id === 'java21-arrival')?.checkedAt, '2026-10-26');
  const payload = JSON.stringify(createExplorerPayload(programmingLanguages));
  assert.ok(payload.includes('java-21'));
  assert.ok(!payload.includes('java21-virtual-threads-reading'));
  assert.ok(!payload.includes('把三种承诺分开阅读'));
});
