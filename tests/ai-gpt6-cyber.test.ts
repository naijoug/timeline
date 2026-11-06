import test from 'node:test';
import assert from 'node:assert/strict';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiTimelines } from '../src/topics/ai/timelines';

test('GPT-6 Cyber records the announcement date and restricted access, not GA or weights', () => {
  const matches = events.filter(event => event.id === 'gpt-6-cyber-restricted-release');
  assert.equal(matches.length, 1);
  const event = matches[0];
  assert.equal(event.date, '2026-11-05');
  assert.equal(event.kind, '受限开放');
  assert.equal(event.change?.baselineEventId, 'gpt-6-astra-api');
  assert.equal(event.change?.evidence, '厂商报告');
  assert.match(event.summary, /部分获批 Daybreak Red/);
  assert.match(event.limitation, /仍需模型专项批准/);
  assert.match(event.limitation, /不是权重发布/);
  assert.ok(!event.tags.includes('开放权重'));
  const modelLine = aiTimelines.find(line => line.id === 'ai-model-iterations')!;
  assert.equal(modelLine.entries.filter(entry => entry.eventId === event.id).length, 1);
});

test('GPT-6 Cyber keeps current source dates, mixed evaluations and pricing scope', () => {
  const event = events.find(event => event.id === 'gpt-6-cyber-restricted-release')!;
  const announcement = sources.find(source => source.id === 'gpt6-cyber-announcement')!;
  const systemCard = sources.find(source => source.id === 'gpt6-cyber-system-card')!;
  const apiCard = sources.find(source => source.id === 'gpt6-cyber-api-card')!;
  for (const source of [announcement, systemCard, apiCard]) {
    assert.equal(source.checkedAt, '2026-11-06');
    assert.ok(event.sourceIds.includes(source.id));
  }
  assert.equal(announcement.publishedAt, '2026-11-05');
  assert.equal(systemCard.publishedAt, '2026-11-05');
  assert.equal(apiCard.publishedAt, undefined);
  const details = event.details!.map(section => section.text).join('\n');
  for (const text of ['Irregular', '90/288', '96/288', '未给出具体日期', '标准短上下文', '缓存写入另计费']) assert.ok(details.includes(text), text);
  assert.match(event.change!.improvements.join(' '), /16.4 个百分点/);
  assert.match(event.change!.tradeoffs, /本站未独立复现评测或实测 API/);
});
