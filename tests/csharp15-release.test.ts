import test from 'node:test';
import assert from 'node:assert/strict';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { csharp15Event as event, csharp15Sources } from '../src/topics/programming-languages/csharp15-release';
import { languagePresentation } from '../src/topics/programming-languages/presentation';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventSourceIds } from '../src/core/evidence';
import { validateCatalog } from '../src/core/validate';

test('C# 15 is a single dated release without displacing the later Rust latest entry', () => {
  assert.deepEqual(validateCatalog(programmingLanguages), []);
  assert.equal(programmingLanguages.events.length, 74);
  assert.equal(programmingLanguages.events.filter(item => item.id === event.id).length, 1);
  assert.deepEqual(event.time.start, { year: 2026, month: 11, day: 10 });
  assert.deepEqual(event.entityIds, ['csharp']);
  assert.deepEqual(event.periodIds, ['modern-safety']);
  assert.equal(event.category, 'release');
  assert.equal(languagePresentation.latestEvent, 'rust-1100');
  assert.equal(languagePresentation.defaultEvent, 'fortran-i');
  assert.equal(event.change?.baselineEventId, undefined);
  assert.match(event.change!.baseline, /C# 14/);
  assert.match(event.change!.baseline, /C# 8 节点不是直接前一版本/);
  for (const id of eventSourceIds(event)) assert.ok(programmingLanguages.sources.some(source => source.id === id));
  assert.equal(csharp15Sources[0].publishedAt, '2026-11-10');
  assert.ok(csharp15Sources.slice(1).every(source => !source.publishedAt));
  assert.ok(csharp15Sources.every(source => source.checkedAt === '2026-11-15' && source.locator && source.url.startsWith('https://')));
});

test('C# 15 preserves stable, preview, toolchain and runtime boundaries', () => {
  const text = JSON.stringify(event);
  for (const pattern of [/不要求 preview/, /内存安全改进仍另列为预览/, /net11\.0/, /旧目标项目/, /不支持使用高于目标框架/, /latest/, /updated-memory-safety-rules/, /AllowUnsafeBlocks/, /实际访问仍需要 unsafe/, /UnionAttribute/, /IUnion/, /default/, /不一定因此警告缺失 null/, /仍可能抛出异常/, /限制不传递/, /同一程序集和模块/, /未运行 C# 编译器/]) assert.match(text, pattern);
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  assert.ok(event.details!.every(section => section.sourceIds?.length && section.locator));
  assert.ok(event.recommendedResources!.every(item => item.creator && item.scopeNote && item.locator));
});

test('C# 15 reading details stay out of the lightweight payload while search summary stays discoverable', () => {
  const payload = createExplorerPayload(programmingLanguages);
  const projected = payload.catalog.events.find(item => item.id === event.id)!;
  assert.equal(projected.summary, event.summary);
  assert.equal(projected.title, event.title);
  for (const key of ['details', 'recommendedResources', 'change', 'note']) assert.ok(!(key in projected));
  assert.ok(!JSON.stringify(payload).includes('csharp15-union-reading'));
  assert.ok(!JSON.stringify(payload).includes('updated-memory-safety-rules'));
});
