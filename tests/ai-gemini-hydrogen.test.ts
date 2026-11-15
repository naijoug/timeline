import test from 'node:test';
import assert from 'node:assert/strict';
import { geminiHydrogenEvents, geminiHydrogenSources } from '../src/topics/ai/gemini-hydrogen-release';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiTimelines } from '../src/topics/ai/timelines';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';

const event = geminiHydrogenEvents[0];
const body = event.details!.map(section => section.text).join('\n');
test('Gemini Hydrogen keeps release date, Carbon baseline and enterprise versus consumer scope', () => {
  assert.equal(geminiHydrogenEvents.length, 1);
  assert.equal(event.date, '2026-11-12');
  assert.deepEqual(event.entityIds, ['gemini']);
  assert.deepEqual(event.tracks, ['models']);
  assert.equal(event.change!.baselineEventId, 'gemini-4-carbon-announced');
  assert.equal(event.change!.evidence, '厂商报告');
  assert.match(body, /由 Gemini 4 Carbon 适配而来/);
  assert.match(body, /页面另标11月13日更新/);
  assert.match(body, /gemini-4-hydrogen 列为 GA/);
  assert.match(body, /不能把企业模型 GA 推导为所有消费端账户已经开通/);
  assert.match(body, /付费 Google AI Pro、Ultra/);
  assert.match(body, /自动模型选择.*不应据此承诺可以手动指定 Hydrogen/);
  assert.match(event.limitation, /不是开放权重发布/);
});
test('Gemini Hydrogen shared budget, segment ceiling and future policy remain distinct', () => {
  assert.match(body, /输入与输出共享预算为 1,048,576 tokens/);
  assert.match(body, /输出包含思考、工具调用和最终回答/);
  assert.match(body, /分段上限为 65,536 tokens.*续接.*剩余共享预算/);
  assert.match(body, /不能把.*独立的 1M 输入加 1M 输出/);
  assert.match(body, /low、medium、high、xhigh.*high 为默认值/);
  assert.match(body, /2027年1月12日.*未来安排/);
  assert.match(body, /Safety & Security Report 仍为后续材料/);
  assert.match(body, /Orchestrator.*不能归给 Hydrogen 单模型/);
});
test('Gemini Hydrogen primary sources retain date precision, attribution and linked readings', () => {
  assert.equal(geminiHydrogenSources.length, 3);
  assert.equal(geminiHydrogenSources[0].publishedAt, '2026-11-12');
  assert.equal(geminiHydrogenSources[1].publishedAt, undefined);
  assert.equal(geminiHydrogenSources[2].publishedAt, '2026-11');
  for (const source of geminiHydrogenSources) {
    assert.equal(source.checkedAt, '2026-11-15');
    assert.ok(source.locator && source.publisher);
    assert.equal(sources.filter(item => item.id === source.id).length, 1);
  }
  for (const section of event.details!) {
    assert.ok(section.locator && section.sourceIds?.length);
    section.sourceIds!.forEach(id => assert.ok(event.sourceIds.includes(id)));
  }
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  assert.equal(event.recommendedResources!.length, 2);
  event.recommendedResources!.forEach(resource => {
    assert.ok(resource.creator && resource.locator && resource.match && resource.scopeNote);
    assert.equal(resource.checkedAt, '2026-11-15');
  });
});
test('Gemini Hydrogen remains nonduplicate, model-line only, with long reading outside payload', () => {
  assert.equal(events.filter(item => item.id === event.id).length, 1);
  const other = events.find(item => item.id === 'hydrogen-1-release')!;
  assert.ok(other);
  assert.notDeepEqual(other.entityIds, event.entityIds);
  assert.equal(other.date, '2026-11-02');
  assert.equal(aiTimelines.find(line => line.id === 'ai-model-iterations')!.entries.filter(entry => entry.eventId === event.id).length, 1);
  assert.ok(!aiTimelines.find(line => line.id === 'ai-milestones')!.entries.some(entry => entry.eventId === event.id));
  assert.ok(!aiTimelines.find(line => line.id === 'ai-agent-products')!.entries.some(entry => entry.eventId === event.id));
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(event.id));
  for (const section of event.details!) assert.ok(!payload.includes(section.label));
  for (const resource of event.recommendedResources!) assert.ok(!payload.includes(resource.id));
});
