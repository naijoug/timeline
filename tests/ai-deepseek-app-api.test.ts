import test from 'node:test';
import assert from 'node:assert/strict';
import { deepseekAppApiEvents, deepseekAppApiSources } from '../src/topics/ai/deepseek-app-api';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiCatalog } from '../src/topics/ai/adapter';
import { eventLane } from '../src/topics/ai/config';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventHref } from '../src/topics/ai/entities';
const event = deepseekAppApiEvents[0];
const prose = JSON.stringify(event);
test('DeepSeek App API is one dated developer capability event, not another model release', () => {
  assert.equal(deepseekAppApiEvents.length, 1);
  assert.deepEqual(events.filter(item => item.id === event.id), [event]);
  assert.equal(event.date, '2026-11-13');
  assert.equal(event.change, undefined);
  assert.equal(event.milestone, false);
  assert.equal(eventLane(event), 'methods');
  assert.deepEqual(event.entityIds, ['deepseek']);
  assert.match(eventHref(event), /\/ai\/events\/deepseek-app-api-release\/$/);
  assert.deepEqual(aiCatalog.timelines!.filter(line => line.entries.some(entry => entry.eventId === event.id)).map(line => line.id), ['ai-agent-products']);
  assert.deepEqual(aiCatalog.events.find(item => item.id === event.id)!.time.start, { year: 2026, month: 11, day: 13 });
});
test('DeepSeek sources preserve source dates and specific reading scope', () => {
  assert.equal(deepseekAppApiSources.length, 6);
  for (const source of deepseekAppApiSources) {
    assert.deepEqual(sources.filter(item => item.id === source.id), [source]);
    assert.equal(source.checkedAt, '2026-11-15');
    assert.equal(source.publishedAt, source.id === 'deepseek-app-api-announcement' ? '2026-11-13' : undefined);
    assert.ok(source.locator && source.version);
  }
  for (const section of event.details!) {
    assert.ok(section.locator && section.sourceIds!.length);
    assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id)));
  }
  assert.match(event.recommendedResources![0].scopeNote, /未提交密钥/);
  assert.equal(events.find(item => item.id === 'deepseek-v4-1-flash-1017')!.date, '2026-10-17');
});
test('DeepSeek integration keeps chronology, state, moderation and usage boundaries explicit', () => {
  for (const pattern of [/独立 Search API 已.*10月17日/, /V4\.1-Flash-1017/, /不是新模型/, /Messages、Responses 与 Chat Completions/, /server_tool_calls/, /low 是默认内容检查，不是关闭/, /终审拒绝/, /拒绝前消耗的 token 仍计费/, /每个推理步骤/, /不是整轮总输出上限/, /未调用 API/, /不替代服务提供者/]) assert.match(prose, pattern);
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  assert.match(event.significance, /^编辑解读/);
});
test('DeepSeek static reading is excluded from the lightweight explorer payload', () => {
  const payload = createExplorerPayload(aiCatalog);
  assert.ok(!JSON.stringify(payload).includes(event.recommendedResources![0].id));
  assert.ok(!JSON.stringify(payload).includes('server_tool_calls'));
  assert.equal(payload.catalog.events.find(item => item.id === event.id)!.summary, event.summary);
});
