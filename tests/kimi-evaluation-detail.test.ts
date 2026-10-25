import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { events } from '../src/topics/ai/events';
import { aiCatalog, toCoreEvent } from '../src/topics/ai/adapter';
import { sources } from '../src/topics/ai/sources';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';
import { eventSourceIds } from '../src/core/evidence';

test('Kimi independent measurement remains dated, bounded and separate from launch availability', () => {
  const event = events.find(event => event.id === 'kimi-k3-1-pro')!;
  assert.equal(events.length, 278);
  assert.equal(event.date, '2026-10-24');
  const text = JSON.stringify(event.details);
  assert.match(text, /2026-10-23/);
  assert.match(text, /得分为 55/);
  assert.match(text, /v4\.3\.2/);
  assert.match(text, /英语/);
  assert.match(text, /2026 年 11 月 4 日前/);
  assert.match(text, /不记录为权重开放/);
  assert.ok(event.details!.some(section => section.editorial));
  const evaluation = sources.find(source => source.id === 'aa-kimi-k31-launch-evaluation')!;
  assert.equal(evaluation.publishedAt, '2026-10-23');
  assert.equal(evaluation.checkedAt, '2026-10-24');
  assert.ok(eventSourceIds(toCoreEvent(event)).includes(evaluation.id));
});

test('AI recommendations retain metadata for validation and static output without enlarging the client index', () => {
  assert.deepEqual(validateCatalog(aiCatalog), []);
  const event = events.find(event => event.id === 'kimi-k3-1-pro')!;
  assert.equal(toCoreEvent(event).recommendedResources, event.recommendedResources);
  assert.equal(event.recommendedResources?.length, 1);
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(!payload.includes('recommendedResources'));
  assert.ok(!payload.includes('aa-benchmark-reading'));
  assert.match(readFileSync('src/components/EventDetail.astro', 'utf8'), /slot="further-reading" resources=\{event\.recommendedResources\}/);
});
