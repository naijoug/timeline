import test from 'node:test';
import assert from 'node:assert/strict';
import { events } from '../src/topics/ai/events';
import { releaseEvents } from '../src/topics/ai/releases';
import { enrichGemini25Lifecycle, gemini25LifecycleSources } from '../src/topics/ai/gemini-25-lifecycle';
import { aiCatalog } from '../src/topics/ai/adapter';
import { validateCatalog } from '../src/core/validate';
const event = events.find(event => event.id === 'gemini-2-5-pro')!;
test('Gemini lifecycle enrichment preserves the original experimental release identity and membership', () => {
  assert.equal(event.date, '2025-03-25');
  assert.equal(event.title, 'Gemini 2.5 Pro 实验版');
  assert.equal(event.kind, '实验版');
  const actualOriginal = releaseEvents.find(item => item.id === event.id)!;
  for (const key of ['date', 'title', 'kind', 'milestone', 'tracks', 'entityIds', 'summary', 'change'] as const) assert.deepEqual(event[key], actualOriginal[key]);
  assert.equal(events.filter(item => item.id === event.id).length, 1);
  assert.deepEqual(validateCatalog(aiCatalog), []);
  const untouched = { ...actualOriginal, id: 'not-gemini-25' };
  assert.equal(enrichGemini25Lifecycle(untouched), untouched);
});
test('Gemini lifecycle separates current Studio deprecation from future stable API routing', () => {
  const [history, pro, flash, migration, editorial] = event.details!;
  assert.match(history.text, /不是整个系列正式开放/);
  assert.match(history.text, /不能据此认定当年的实验端点/);
  assert.match(pro.label, /后续稳定版 API.*2026-11-02/);
  assert.match(pro.text, /不等于 API 已不可用/);
  assert.match(pro.text, /官方计划从2026年12月1日.*gemini-2.5-pro.*gemini-3.8-flash/);
  assert.match(flash.text, /官方计划自2026年12月1日.*gemini-3.5-flash-lite/);
  assert.match(flash.text, /不能外推/);
  assert.match(migration.text, /弃用且忽略/);
  assert.match(migration.text, /没有实际调用 API/);
  assert.equal(editorial.editorial, true);
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
});
test('Gemini lifecycle sources and specific official reading guides remain traceable', () => {
  assert.equal(gemini25LifecycleSources[0].publishedAt, '2026-11-02');
  for (const source of gemini25LifecycleSources) assert.equal(source.checkedAt, '2026-11-03');
  for (const section of event.details!) {
    assert.ok(section.locator);
    assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id)));
  }
  assert.equal(event.recommendedResources!.length, 2);
  for (const resource of event.recommendedResources!) {
    assert.match(resource.url, /#migrate-to-gemini-/);
    assert.match(resource.scopeNote, /未执行 API/);
  }
});
