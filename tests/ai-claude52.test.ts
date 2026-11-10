import test from 'node:test';
import assert from 'node:assert/strict';
import { claude52Events, claude52Sources } from '../src/topics/ai/claude-52-release';
import { events } from '../src/topics/ai/events';
import { aiTimelines } from '../src/topics/ai/timelines';

test('Claude 5.2 keeps one dated model record, real baseline and bounded availability', () => {
  assert.equal(claude52Events.length, 1);
  const event = claude52Events[0];
  assert.equal(event.date, '2026-11-09');
  assert.equal(event.change?.baselineEventId, 'claude-fable-mythos-5-1');
  assert.ok(events.some(e => e.id === event.change?.baselineEventId));
  assert.equal(event.change?.evidence, '厂商报告');
  assert.match(event.summary, /Mythos 5.2 仍通过验证项目/);
  assert.match(event.limitation, /不是两个独立架构/);
  assert.match(event.limitation, /未调用 API、复现评测或通读系统卡/);
  for (const id of ['ai-milestones', 'ai-model-iterations']) {
    assert.equal(aiTimelines.find(t => t.id === id)?.entries.filter(e => e.eventId === event.id).length, 1);
  }
});

test('Claude 5.2 separates standard pricing, fast mode and source review dates', () => {
  const event = claude52Events[0];
  assert.equal(claude52Sources.length, 3);
  assert.ok(claude52Sources.every(s => s.checkedAt === '2026-11-10'));
  assert.equal(claude52Sources[0].publishedAt, '2026-11-09');
  assert.equal(claude52Sources[1].publishedAt, undefined);
  assert.match(event.details![1].text, /8\/40美元/);
  assert.match(event.details![1].text, /16\/80美元/);
  assert.match(event.details![3].text, /各实验室任务不同/);
  assert.match(event.change!.improvements[0], /最高提升30%/);
  assert.match(event.details![1].text, /2.5倍/);
  assert.match(event.details![1].text, /不是相对5.1的30%提升/);
  assert.match(event.details![2].text, /claude-fable-5-2/);
  assert.match(event.details![2].text, /上下文1M token，最大输出128K token/);
  assert.equal(event.recommendedResources?.length, 2);
});
