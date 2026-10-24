import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventSourceIds } from '../src/core/evidence';
import { validateCatalog } from '../src/core/validate';

test('Go release detail review preserves IDs and source-backed exact dates', () => {
  assert.deepEqual(validateCatalog(programmingLanguages), []);
  assert.equal(programmingLanguages.events.length, 69);
  for (const [id, year, month, day] of [['go-10', 2012, 3, 28], ['go-111', 2018, 8, 24], ['go-118', 2022, 3, 15]] as const) {
    const event = programmingLanguages.events.find(event => event.id === id)!;
    assert.deepEqual(event.time.start, { year, month, day });
    assert.equal(event.details?.length, 4);
    assert.equal(event.details?.filter(section => section.editorial).length, 1);
    for (const section of event.details!.filter(section => !section.editorial)) {
      assert.ok(section.sourceIds?.length);
      assert.ok(section.locator);
    }
    for (const sourceId of eventSourceIds(event)) assert.ok(programmingLanguages.sources.some(source => source.id === sourceId));
    assert.equal(event.recommendedResources?.length, 1);
    assert.match(event.recommendedResources![0].url, /^https:\/\/go\.dev\/(blog|talks)\/.+/);
  }
});

test('Go review distinguishes compatibility, experimental modules and version-specific generics', () => {
  const text = (id: string) => JSON.stringify(programmingLanguages.events.find(event => event.id === id));
  assert.match(text('go-10'), /二进制兼容/);
  assert.match(text('go-10'), /安全/);
  assert.match(text('go-111'), /两项当时都被明确标为实验支持/);
  assert.match(text('go-111'), /没有改变语言规格/);
  assert.match(text('go-118'), /不把后续版本完善提前算入/);
  const relation = programmingLanguages.relations!.find(relation => relation.id === 'go118-workspaces-modules')!;
  assert.equal(relation.fromEventId, 'go-118');
  assert.equal(relation.toEventId, 'go-111');
  assert.deepEqual(relation.sourceIds, ['go118-announcement']);
});

test('Go teaching resources render only on static details, outside compact browser indexes', () => {
  const payload = JSON.stringify(createExplorerPayload(programmingLanguages));
  assert.ok(!payload.includes('recommendedResources'));
  assert.ok(!payload.includes('splash.article'));
  assert.ok(!payload.includes('intro-generics'));
  const page = readFileSync('src/pages/programming-languages/events/[slug].astro', 'utf8');
  assert.match(page, /slot="further-reading" resources=\{event\.recommendedResources\}/);
});
