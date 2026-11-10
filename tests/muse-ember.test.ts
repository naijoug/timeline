import test from 'node:test';
import assert from 'node:assert/strict';
import { museEmberEvents, museEmberSources } from '../src/topics/ai/muse-ember-release';

test('Muse Ember is one dated efficient sibling with bounded product availability', () => {
  assert.equal(museEmberEvents.length, 1);
  const event = museEmberEvents[0];
  assert.equal(event.id, 'muse-ember-release');
  assert.equal(event.date, '2026-11-09');
  assert.deepEqual(event.entityIds, ['muse-models']);
  assert.equal(event.change?.baselineEventId, 'muse-wonder');
  assert.equal(event.change?.evidence, '厂商报告');
  assert.match(event.change!.tradeoffs, /不是所有任务上的代际升级/);
  assert.match(event.limitation, /不是 Wonder 的全面替代/);
  assert.match(event.details![1].text, /Standard 模式，没有Contributor变体/);
  assert.match(event.details![1].text, /不等于Muse消费应用已同步接入/);
  assert.match(event.details![1].text, /未核实下载权重/);
});

test('Muse Ember preserves whole-request long-context pricing and source boundaries', () => {
  const event = museEmberEvents[0];
  const price = event.details![2];
  assert.equal(price.label, '价格边界：200K 阈值改变整次请求费率');
  assert.match(price.text, /输入≤200K时为0.10\/0.004\/0.50美元/);
  assert.match(price.text, /输入>200K时为0.30\/0.012\/1.50美元/);
  assert.match(price.text, /包含缓存与延续对话的历史输入/);
  assert.match(price.text, /整次请求适用高档费率，不只加收超出部分/);
  assert.match(event.details![3].text, /1,048,576 token，最大输出524,288 token/);
  assert.equal(event.details?.length, 4);
  assert.equal(event.recommendedResources?.length, 2);
  assert.equal(museEmberSources.length, 4);
  assert.ok(museEmberSources.every(s => s.checkedAt === '2026-11-10'));
  assert.equal(museEmberSources[0].publishedAt, '2026-11-09');
  assert.ok(museEmberSources.slice(1).every(s => !s.publishedAt));
  const ids = new Set(museEmberSources.map(s => s.id));
  for (const id of [...event.sourceIds, ...event.details!.flatMap(d => d.sourceIds ?? []), ...event.change!.sourceIds]) assert.ok(ids.has(id));
});
