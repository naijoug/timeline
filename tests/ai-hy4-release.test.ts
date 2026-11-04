import test from 'node:test';
import assert from 'node:assert/strict';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiTimelines } from '../src/topics/ai/timelines';

test('Hy4 formal release stays distinct from preview and planned weights', () => {
  const matches = events.filter(e => e.id === 'tencent-hy4-release');
  assert.equal(matches.length, 1);
  const event = matches[0];
  assert.equal(event.date, '2026-11-04');
  assert.equal(event.change?.baselineEventId, 'tencent-hy4-preview');
  assert.equal(events.find(e => e.id === 'tencent-hy4-preview')?.date, '2026-08-28');
  assert.equal(event.change?.evidence, '厂商报告');
  assert.match(event.summary, /权重与系统卡计划近日开放/);
  assert.match(event.limitation, /未调用 API/);
  assert.ok(!event.tags.includes('开放权重'));
  assert.equal(sources.filter(s => s.id === 'tencent-hy4-release').length, 1);
  assert.ok(aiTimelines.find(t => t.id === 'ai-model-iterations')?.entries.some(e => e.eventId === event.id));
});
