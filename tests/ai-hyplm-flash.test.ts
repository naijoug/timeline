import test from 'node:test';
import assert from 'node:assert/strict';
import { hyplmEvents, hyplmEntities, hyplmSources } from '../src/topics/ai/hyplm-flash-release';
import { events } from '../src/topics/ai/events';
import { entities } from '../src/topics/ai/entities';
import { sources } from '../src/topics/ai/sources';

test('HyPLM release preserves date, weight precision, license and verification scope', () => {
  const event = hyplmEvents[0];
  assert.equal(event.date, '2026-11-02');
  assert.equal(events.filter(e => e.id === event.id).length, 1);
  assert.ok(entities.some(e => e.id === hyplmEntities[0].id));
  for (const source of hyplmSources) assert.ok(sources.some(s => s.id === source.id));
  const text = JSON.stringify(event);
  for (const phrase of ['FP32', 'INT8', 'MIT', 'Apache-2.0', '未下载', 'Hyra 平台整体开源']) assert.ok(text.includes(phrase));
  assert.ok(event.change?.baseline.includes('首次收录'));
  assert.equal(event.change?.evidence, '厂商报告');
});
