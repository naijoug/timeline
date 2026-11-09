import test from 'node:test';
import assert from 'node:assert/strict';
import { qwenworkEvents, qwenworkEntities, qwenworkSources } from '../src/topics/ai/qwenwork-2-release';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiTimelines } from '../src/topics/ai/timelines';
import { eventLane, entityLane, chinaCompanies } from '../src/topics/ai/config';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';

const event = qwenworkEvents[0];
const text = event.details!.map(section => section.text).join('\n');
test('QwenWork records the version log date without inventing first availability', () => {
  assert.equal(event.date, '2026-11-09');
  assert.equal(event.kind, '产品版本发布');
  for (const phrase of ['11月7日已记录协作数字员工', '11月4日已记录资料空间', '不推定产品或这些能力的最早开放时间']) assert.ok(text.includes(phrase));
  assert.match(event.limitation, /不是新基础模型、API 或权重发布/);
  assert.match(event.limitation, /全量开放或套餐范围/);
  assert.deepEqual(event.tracks, ['products']);
  assert.equal(event.change, undefined);
});
test('QwenWork keeps execution and permission limits explicit and routes as a Chinese Agent product', () => {
  for (const phrase of ['原有权限约束', '云电脑或本地', '定时任务按计划在本地', '同一账号和组织', '默认禁止', '需管理员确认开启', '不是独立评测结果']) assert.ok(text.includes(phrase), phrase);
  assert.equal(eventLane(event), 'products');
  assert.equal(entityLane(qwenworkEntities[0]), 'products');
  assert.ok(chinaCompanies.has(event.company!));
  assert.ok(qwenworkEntities[0].sourceIds.includes('qwenwork-operator-policy'));
});
test('QwenWork sources, reading and curated membership remain traceable without bloating the index', () => {
  assert.equal(events.filter(item => item.id === event.id).length, 1);
  for (const source of qwenworkSources) {
    assert.equal(source.checkedAt, '2026-11-09');
    assert.ok(source.locator);
    assert.equal(sources.filter(item => item.id === source.id).length, 1);
  }
  for (const section of event.details!) {
    assert.ok(section.sourceIds?.length && section.locator);
    for (const id of section.sourceIds!) assert.ok(event.sourceIds.includes(id));
  }
  assert.ok(event.details!.some(section => section.editorial));
  for (const resource of event.recommendedResources!) assert.ok(resource.creator && resource.series && resource.match && resource.scopeNote && resource.locator);
  for (const id of ['ai-milestones', 'ai-agent-products']) assert.equal(aiTimelines.find(line => line.id === id)!.entries.filter(entry => entry.eventId === event.id).length, 1);
  assert.ok(!aiTimelines.find(line => line.id === 'ai-model-iterations')!.entries.some(entry => entry.eventId === event.id));
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(event.id));
  for (const section of event.details!) assert.ok(!payload.includes(section.label));
  for (const resource of event.recommendedResources!) assert.ok(!payload.includes(resource.id));
});
