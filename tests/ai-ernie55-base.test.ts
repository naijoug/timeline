import test from 'node:test';
import assert from 'node:assert/strict';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiTimelines } from '../src/topics/ai/timelines';

test('ERNIE 5.5 records pretrained base weights separately from post-training and API', () => {
  const found = events.filter(event => event.id === 'ernie-5-5-flash-base');
  assert.equal(found.length, 1);
  const event = found[0];
  assert.equal(event.date, '2026-11-05');
  assert.equal(event.kind, '预训练权重发布');
  assert.deepEqual(event.entityIds, ['ernie']);
  assert.equal(event.change?.baselineEventId, 'ernie-5-1');
  assert.match(event.summary, /中期训练、后训练之前/);
  assert.match(event.limitation, /自定义许可/);
  assert.match(event.limitation, /未下载全部分片/);
  assert.match(event.limitation, /没有据此确认托管 API 已开放/);
  assert.equal(aiTimelines.find(line => line.id === 'ai-model-iterations')!.entries.filter(entry => entry.eventId === event.id).length, 1);
  assert.ok(!aiTimelines.find(line => line.id === 'ai-milestones')!.entries.some(entry => entry.eventId === event.id));
});

test('ERNIE separates announcement date, file visibility, custom license and editorial interpretation', () => {
  const event = events.find(event => event.id === 'ernie-5-5-flash-base')!;
  for (const id of event.sourceIds) assert.equal(sources.find(source => source.id === id)?.checkedAt, '2026-11-06');
  assert.equal(sources.find(source => source.id === 'ernie55-base-date')!.publishedAt, '2026-11-05');
  assert.equal(sources.find(source => source.id === 'ernie55-base-release')!.publishedAt, undefined);
  for (const id of ['ernie55-base-fp8-files', 'ernie55-base-bf16-files']) assert.ok(event.sourceIds.includes(id));
  const text = event.details!.map(section => section.text).join('\n');
  for (const fragment of ['早期提交日期不能证明', '另行发布', '280B', '14B', '128K', '1M', '本地 OpenAI 兼容接口']) assert.ok(text.includes(fragment), fragment);
  assert.ok(event.details!.some(section => section.editorial && section.label.startsWith('编辑分析')));
  assert.ok(event.recommendedResources!.some(resource => resource.url.endsWith('#deployment') && resource.creator === 'Baidu ERNIE Team'));
});
