import test from 'node:test';
import assert from 'node:assert/strict';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiCatalog, toCoreEvent } from '../src/topics/ai/adapter';
import { timelineEvents } from '../src/core/timelines';

test('Kimi weight visibility is a separate confirmation event, not a fabricated release date', () => {
  const event = events.find(item => item.id === 'kimi-k3-1-pro-weights-confirmed')!;
  assert.equal(events.filter(item => item.id === event.id).length, 1);
  assert.equal(event.date, '2026-11-04');
  assert.match(event.dateLabel!, /检索确认日，非首次公开日/);
  assert.match(JSON.stringify(toCoreEvent(event)), /检索确认日/);
  assert.equal(event.change?.baselineEventId, 'kimi-k3-1-pro');
  assert.equal(events.find(item => item.id === 'kimi-k3-1-pro')?.date, '2026-10-24');
  assert.ok(timelineEvents(aiCatalog, ['ai-model-iterations']).some(item => item.id === event.id));
  assert.ok(!timelineEvents(aiCatalog, ['ai-milestones']).some(item => item.id === event.id));
});

test('Kimi weight evidence explicitly bounds downloads, completeness and license', () => {
  const event = events.find(item => item.id === 'kimi-k3-1-pro-weights-confirmed')!;
  const text = JSON.stringify(event);
  for (const phrase of ['16:06 UTC', '前39个', '未核全96个分片', '未下载二进制', '未运行推理', 'Kimi K3.1-Pro License', '不是MIT', 'MaaS', '另签协议']) assert.ok(text.includes(phrase), phrase);
  for (const id of event.sourceIds) {
    const source = sources.find(item => item.id === id)!;
    assert.equal(source.checkedAt, '2026-11-04');
    assert.equal(source.publishedAt, undefined);
    assert.ok(source.url.startsWith('https://huggingface.co/moonshotai/Kimi-K3.1-Pro'));
  }
});
