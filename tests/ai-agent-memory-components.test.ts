import test from 'node:test';
import assert from 'node:assert/strict';
import { agentMemoryEvents, agentMemorySources } from '../src/topics/ai/agent-memory-components';
import { events } from '../src/topics/ai/events';
import { sourceMap } from '../src/topics/ai/sources';
import { aiTimelines } from '../src/topics/ai/timelines';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
const event = agentMemoryEvents[0];

test('agent memory records an engineering article, not a model or product launch', () => {
  assert.equal(events.filter(e => e.id === event.id).length, 1);
  assert.equal(event.date, '2026-11-06');
  assert.equal(event.kind, '工程评估公开');
  assert.deepEqual(event.tracks, ['methods']);
  assert.equal(event.milestone, false);
  assert.equal(event.change, undefined);
  assert.ok(aiTimelines.every(line => !line.entries.some(e => e.eventId === event.id)), 'this supporting record does not expand curated lines');
  assert.equal(sourceMap['anthropic-dreaming-workflow-cookbook'].publishedAt, '2026-11-02');
  assert.equal(sourceMap['anthropic-agent-memory-components'].publishedAt, '2026-11-06');
});

test('memory evaluation keeps definition, score units and preview boundaries', () => {
  const text = event.details!.map(d => d.text).join(' ');
  for (const pattern of [/不包括权重更新/, /25题/, /54%升至61%/, /纯搜索为53%/, /不能当作任务成功率/, /并非普遍有效/, /错误或过时/, /不能把11月6日写成.*首次推出/, /Managed Agents beta/, /research preview/, /只读挂载/]) assert.match(text, pattern);
  assert.match(event.limitation, /未运行示例或独立复现/);
  assert.ok(event.details!.every(d => d.locator && d.sourceIds?.length && d.sourceIds.every(id => sourceMap[id])));
  assert.equal(event.details!.filter(d => d.editorial).length, 1);
  assert.ok(agentMemorySources.every(s => s.checkedAt === '2026-11-09' && s.locator));
});

test('specific memory readings remain static and outside the compact explorer payload', () => {
  assert.equal(event.recommendedResources!.length, 2);
  assert.ok(event.recommendedResources!.every(r => r.creator && r.locator && r.checkedAt === '2026-11-09'));
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(event.id));
  assert.ok(!payload.includes('agent-memory-workflow-reading'));
  assert.ok(!payload.includes('机制：跨会话上下文'));
});
