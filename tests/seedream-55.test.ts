import assert from 'node:assert/strict';
import test from 'node:test';
import { seedream55Events, seedream55Sources } from '../src/topics/ai/seedream-55-release';

test('Seedream 5.5 is one dated release with the existing Seedream baseline', () => {
  assert.equal(seedream55Events.length, 1);
  const event = seedream55Events[0];
  assert.equal(event.id, 'seedream-5-5-release');
  assert.equal(event.date, '2026-11-09');
  assert.deepEqual(event.entityIds, ['seedream']);
  assert.equal(event.change?.baselineEventId, 'seedream-5-pro');
  assert.match(event.change!.baseline, /5\.0 Pro/);
  assert.equal(event.details?.length, 4);
  assert.equal(event.recommendedResources?.length, 2);
});

test('Seedream sources are bounded primary evidence with a checked snapshot', () => {
  assert.equal(seedream55Sources.length, 3);
  const ids = new Set(seedream55Sources.map(source => source.id));
  for (const source of seedream55Sources) {
    assert.equal(new URL(source.url).hostname, 'seed.bytedance.com');
    assert.equal(source.checkedAt, '2026-11-10');
  }
  for (const id of seedream55Events[0].sourceIds) assert.ok(ids.has(id));
  for (const detail of seedream55Events[0].details ?? []) {
    assert.ok(detail.sourceIds);
    for (const id of detail.sourceIds) assert.ok(ids.has(id));
  }
});

test('Seedream copy distinguishes vendor demonstrations, rollout and planned Pro', () => {
  const text = JSON.stringify(seedream55Events[0]);
  for (const phrase of ['100轮', '厂商演示', 'Alpha', '陆续上线', '未核实精确发布时刻', '5.5 Pro 仍是后续计划', '未核实生产 API 标识', '开放权重及许可', 'GPT Image 2.5 Sunburst', '不能外推至更新版本']) assert.ok(text.includes(phrase), phrase);
  assert.equal(seedream55Events[0].change?.evidence, '厂商报告');
});
