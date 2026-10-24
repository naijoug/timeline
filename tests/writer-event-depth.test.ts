import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { writersCatalog } from '../src/topics/writers/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

const ids = ['ma-bo-yong-lychee-of-changan', 'ma-bo-yong-taibai-jinxing', 'ma-bo-yong-peach-blossom-fine'];
test('writer depth review keeps publication precision and distinguishes editorial interpretation', () => {
  assert.deepEqual(validateCatalog(writersCatalog), []);
  assert.equal(writersCatalog.events.length, 59);
  for (const [index, id] of ids.entries()) {
    const event = writersCatalog.events.find(event => event.id === id)!;
    assert.deepEqual(event.time.start, [{ year: 2022, month: 10 }, { year: 2023, month: 6 }, { year: 2025, month: 6 }][index]);
    assert.equal(event.details?.filter(section => section.editorial).length, 1);
    for (const section of event.details!.filter(section => !section.editorial)) {
      assert.ok(section.sourceIds?.length);
      assert.ok(section.locator);
    }
    assert.equal(event.recommendedResources?.length, 1);
    assert.equal(event.recommendedResources![0].kind, 'article');
    assert.ok(event.recommendedResources![0].creator);
    assert.ok(event.recommendedResources![0].scopeNote.includes('情节') || event.recommendedResources![0].scopeNote.includes('人物'));
  }
});
test('writer resources preserve factual and literary boundaries, and exact original section', () => {
  const text = (id: string) => JSON.stringify(writersCatalog.events.find(event => event.id === id));
  assert.match(text(ids[0]), /并非已证实的唐代路线/);
  assert.match(text(ids[1]), /前言/);
  assert.doesNotMatch(text(ids[1]), /后记/);
  assert.match(text(ids[2]), /不是连续写作十余年的证明/);
});
test('writer further reading stays on static detail pages, not compact client indexes', () => {
  const payload = JSON.stringify(createExplorerPayload(writersCatalog));
  assert.ok(!payload.includes('recommendedResources'));
  assert.ok(!payload.includes('32070554'));
  const page = readFileSync('src/pages/writers/events/[slug].astro', 'utf8');
  assert.match(page, /slot="further-reading" resources=\{event\.recommendedResources\}/);
});
