import test from 'node:test';
import assert from 'node:assert/strict';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventSourceIds } from '../src/core/evidence';
import { validateCatalog } from '../src/core/validate';

test('Rust depth preserves routes and inventory while pinning real release dates', () => {
  assert.deepEqual(validateCatalog(programmingLanguages), []);
  assert.equal(programmingLanguages.events.length, 71);
  for (const [id, year, month, day] of [['rust-10', 2015, 5, 15], ['rust-2024', 2025, 2, 20]] as const) {
    const matching = programmingLanguages.events.filter(event => event.id === id);
    assert.equal(matching.length, 1);
    const event = matching[0];
    assert.deepEqual(event.time.start, { year, month, day });
    assert.equal(event.details?.length, 4);
    assert.equal(event.details?.filter(section => section.editorial).length, 1);
    for (const section of event.details!.filter(section => !section.editorial)) {
      assert.ok(section.sourceIds?.length && section.locator);
    }
    for (const sourceId of eventSourceIds(event)) assert.ok(programmingLanguages.sources.some(source => source.id === sourceId));
    assert.equal(event.recommendedResources?.length, 1);
    assert.ok(event.recommendedResources![0].creator && event.recommendedResources![0].scopeNote);
    assert.equal(event.recommendedResources![0].checkedAt, '2026-10-25');
  }
});

test('Rust distinguishes stability, edition migration, warnings and unsafe responsibilities', () => {
  const stable = JSON.stringify(programmingLanguages.events.find(event => event.id === 'rust-10'));
  const edition = JSON.stringify(programmingLanguages.events.find(event => event.id === 'rust-2024'));
  assert.match(stable, /2015-05-15/);
  assert.match(stable, /第三方库需要自己的版本兼容策略/);
  assert.match(stable, /编译器错误.*安全漏洞/);
  assert.match(edition, /2024 是 edition 名称/);
  assert.match(edition, /默认触发警告，并非一律成为编译错误/);
  assert.match(edition, /不能验证 extern 声明的签名/);
  assert.match(edition, /虚拟 workspace 仍需显式设置 resolver/);
});

test('Rust deep reading and editorials stay out of the lightweight browser index', () => {
  const payload = JSON.stringify(createExplorerPayload(programmingLanguages));
  assert.ok(!payload.includes('rust10-stability-reading'));
  assert.ok(!payload.includes('rust2024-unsafe-extern-reading'));
  assert.ok(!payload.includes('把升级拆成两张检查表'));
  assert.ok(payload.includes('rust-10') && payload.includes('rust-2024'));
});
