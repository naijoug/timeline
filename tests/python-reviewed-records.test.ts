import test from 'node:test';
import assert from 'node:assert/strict';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventSourceIds } from '../src/core/evidence';
import { validateCatalog } from '../src/core/validate';

test('Python depth review preserves two stable routes, inventory and official release dates', () => {
  assert.deepEqual(validateCatalog(programmingLanguages), []);
  assert.equal(programmingLanguages.events.length, 71);
  for (const [id, year, month, day] of [['python-3', 2008, 12, 3], ['python-311', 2022, 10, 24]] as const) {
    const matching = programmingLanguages.events.filter(event => event.id === id);
    assert.equal(matching.length, 1);
    const event = matching[0];
    assert.deepEqual(event.time.start, { year, month, day });
    assert.equal(event.details?.length, 4);
    assert.equal(event.details?.filter(section => section.editorial).length, 1);
    for (const section of event.details!.filter(section => !section.editorial)) {
      assert.ok(section.sourceIds?.length);
      assert.ok(section.locator);
    }
    for (const sourceId of eventSourceIds(event)) assert.ok(programmingLanguages.sources.some(source => source.id === sourceId));
    assert.equal(event.recommendedResources?.length, 1);
    assert.ok(event.recommendedResources![0].creator);
    assert.ok(event.recommendedResources![0].scopeNote);
    assert.equal(event.recommendedResources![0].checkedAt, '2026-10-25');
  }
});

test('Python history separates text migration and implementation-specific benchmark claims', () => {
  const py3 = JSON.stringify(programmingLanguages.events.find(event => event.id === 'python-3'));
  const py311 = JSON.stringify(programmingLanguages.events.find(event => event.id === 'python-311'));
  assert.match(py3, /Python 2 已有 Unicode/);
  assert.doesNotMatch(py3, /Python 2 的 ASCII 字符串|生态花费十余年完成迁移/);
  assert.match(py3, /转换器不能进行数据流分析或类型推断/);
  assert.match(py311, /1\.22×/);
  assert.match(py311, /1\.25×/);
  assert.match(py311, /GCC、Ubuntu Linux 与 pyperformance/);
  assert.match(py311, /不必生成机器码/);
  assert.match(py311, /未在本项目独立重跑/);
});

test('Python interpretation and reading remain outside lightweight browser indexes', () => {
  const payload = JSON.stringify(createExplorerPayload(programmingLanguages));
  assert.ok(!payload.includes('recommendedResources'));
  assert.ok(!payload.includes('python311-mark-shannon-specialization'));
  assert.ok(!payload.includes('本次读取的 3.11.0 发布页'));
  for (const id of ['python-3', 'python-311']) assert.ok(payload.includes(id));
});
