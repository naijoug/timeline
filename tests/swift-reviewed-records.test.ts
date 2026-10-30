import test from 'node:test';
import assert from 'node:assert/strict';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

test('Swift depth preserves existing release dates and resolved evidence', () => {
  assert.deepEqual(validateCatalog(programmingLanguages), []);
  assert.equal(programmingLanguages.events.length, 71);
  for (const [id, year, month, day] of [['swift-5', 2019, 3, 25], ['swift-6', 2024, 9, 17]] as const) {
    const entries = programmingLanguages.events.filter(item => item.id === id);
    assert.equal(entries.length, 1);
    const event = entries[0];
    assert.deepEqual(event.time.start, { year, month, day });
    assert.equal(event.details?.length, 4);
    assert.equal(event.details?.filter(section => section.editorial).length, 1);
    for (const section of event.details!.filter(section => !section.editorial)) {
      assert.ok(section.locator && section.sourceIds?.length);
      for (const id of section.sourceIds!) assert.ok(programmingLanguages.sources.some(source => source.id === id));
    }
    assert.equal(event.recommendedResources?.[0].checkedAt, '2026-10-26');
  }
});

test('Swift keeps ABI, module stability, language mode and experimental status distinct', () => {
  const five = JSON.stringify(programmingLanguages.events.find(item => item.id === 'swift-5'));
  const six = JSON.stringify(programmingLanguages.events.find(item => item.id === 'swift-6'));
  assert.match(five, /Apple 平台/);
  assert.match(five, /2019年9月20日/);
  assert.match(five, /不把 5.1 功能倒填为 5.0/);
  assert.match(six, /实验性预览/);
  assert.match(six, /升级编译器不等于自动开启新模式/);
  assert.match(six, /未完整播放视频或运行示例/);
});

test('Swift deeper sources and recommended lecture stay out of browser index', () => {
  const payload = JSON.stringify(createExplorerPayload(programmingLanguages));
  assert.ok(!payload.includes('swift6-wwdc-migration-reading'));
  assert.ok(!payload.includes('swift5-library-evolution-reading'));
  assert.ok(!payload.includes('When to enable library evolution support'));
});
