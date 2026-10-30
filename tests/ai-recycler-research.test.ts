import test from 'node:test';
import assert from 'node:assert/strict';
import { recyclerEvents, recyclerSources } from '../src/topics/ai/recycler-research';
import { aiCatalog } from '../src/topics/ai/adapter';
import { eventLane } from '../src/topics/ai/config';
import { createExplorerPayload } from '../src/core/explorer-payload';

test('Recycler is a dated research method, not a model or weight launch', () => {
  const event = recyclerEvents[0];
  assert.equal(event.date, '2026-10-25');
  assert.match(event.dateLabel!, /论文公开日期/);
  assert.equal(event.kind, '架构研究公开');
  assert.equal(eventLane(event), 'methods');
  assert.equal(event.milestone, false);
  assert.equal(event.change, undefined);
  assert.match(event.limitation, /不是产品或权重发布/);
  assert.match(event.details![0].text, /未核实代码、权重或正式产品接口/);
});

test('Recycler separates decoding cost from training and prompt prefill', () => {
  const event = recyclerEvents[0];
  assert.match(event.limitation, /不等于零计算或免费 API/);
  assert.match(event.details![1].text, /预填充可选一遍或两遍/);
  assert.match(event.details![1].text, /训练方案成本为标准模型的2倍/);
  assert.match(event.details![1].locator!, /§2.2.1.*§2.2.3.*§2.3.1/);
  assert.match(event.limitation, /未经本项目复测/);
});

test('Recycler is deduplicated, cited and excluded from bulky explorer resource payloads', () => {
  const event = recyclerEvents[0];
  assert.equal(aiCatalog.events.filter(item => item.id === event.id).length, 1);
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  assert.ok(event.details!.every(section => section.sourceIds?.length && section.locator));
  assert.ok(recyclerSources.every(source => source.publishedAt === '2026-10-25' && source.checkedAt === '2026-10-25'));
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  for (const resource of event.recommendedResources!) {
    assert.ok(resource.creator && resource.series && resource.match && resource.scopeNote);
    assert.ok(!payload.includes(resource.id));
  }
});
