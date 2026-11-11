import test from 'node:test';
import assert from 'node:assert/strict';
import { h3ImageEvents, h3ImageEntities, h3ImageSources } from '../src/topics/ai/minimax-h3-image';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { entities, eventHref } from '../src/topics/ai/entities';
import { aiCatalog } from '../src/topics/ai/adapter';
import { aiTimelines } from '../src/topics/ai/timelines';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventLane } from '../src/topics/ai/config';

const event = h3ImageEvents[0];
const prose = JSON.stringify(event);

test('H3-Image has one canonical model record, separate from language and video models', () => {
  assert.equal(event.id, 'minimax-h3-image-weights');
  assert.equal(events.filter(item => item.id === event.id).length, 1);
  assert.equal(eventLane(event), 'models');
  assert.deepEqual(event.entityIds, ['minimax-h3-image']);
  assert.equal(eventHref(event), '/ai/models/minimax-h3-image/minimax-h3-image-weights/');
  assert.deepEqual(entities.filter(entity => entity.id === 'minimax-h3-image'), h3ImageEntities);
  for (const id of ['ai-milestones', 'ai-model-iterations']) {
    assert.equal(aiTimelines.find(line => line.id === id)!.entries.filter(entry => entry.eventId === event.id).length, 1);
  }
  assert.ok(!aiTimelines.find(line => line.id === 'ai-agent-products')!.entries.some(entry => entry.eventId === event.id));
});

test('H3-Image preserves UTC announcement and distinct blog and file dates', () => {
  assert.equal(event.date, '2026-11-10');
  assert.match(event.dateLabel!, /15:40 UTC.*11月11日/);
  assert.match(prose, /15:40:15 UTC/);
  assert.match(prose, /博客标11月11日且未注明时区/);
  assert.equal(h3ImageSources.find(source => source.id === 'minimax-h3-image-announcement')!.publishedAt, '2026-11-11');
  assert.equal(h3ImageSources.find(source => source.id === 'minimax-h3-image-release-post')!.publishedAt, '2026-11-10');
  assert.match(h3ImageSources.find(source => source.id === 'minimax-h3-image-release-post')!.locator!, /2026-11-10T15:40:15.000Z/);
});

test('H3-Image evidence pins actual release artifacts and preserves verification limits', () => {
  assert.equal(h3ImageSources.length, 6);
  assert.equal(new Set(h3ImageSources.map(source => source.id)).size, 6);
  for (const source of h3ImageSources) {
    assert.deepEqual(sources.find(item => item.id === source.id), source);
    assert.equal(source.checkedAt, '2026-11-11');
    assert.ok(source.locator && source.version);
  }
  for (const id of ['minimax-h3-image-initial-files', 'minimax-h3-image-diffusers-files']) {
    assert.match(h3ImageSources.find(source => source.id === id)!.url, /\/commit\/[a-f0-9]{40}$/);
  }
  for (const id of ['minimax-h3-image-readme', 'minimax-h3-image-license']) {
    assert.match(h3ImageSources.find(source => source.id === id)!.url, /\/blob\/[a-f0-9]{40}\//);
  }
  for (const pattern of [/12个 safetensors 分片/, /Diffusers 格式和文本编码器文件/, /不能说所有版本都缺少编码器/, /未下载完整权重/, /仓库容量也不等于最低显存/]) assert.match(prose, pattern);
});

test('H3-Image license is not flattened into unrestricted open source or a revenue-only threshold', () => {
  for (const pattern of [/不是无条件开源/, /欧盟、英国、韩国和美国/, /年化收入超过100万美元/, /或向第三方提供托管服务/, /事先取得书面授权/, /两项条件是“或”/, /限制用模型或输出改进无关模型/]) assert.match(prose, pattern);
  assert.match(h3ImageSources.find(source => source.id === 'minimax-h3-image-license')!.locator!, /IV、V/);
});

test('H3-Image distinguishes vendor metrics, architectural baseline and editorial judgment', () => {
  assert.equal(event.change!.evidence, '厂商报告');
  assert.equal(event.change!.baselineEventId, undefined);
  assert.match(event.change!.baseline, /去除音频分支/);
  for (const pattern of [/331亿参数/, /六步采样/, /最多16张参考图/, /速度和质量表述来自厂商/, /未验证账号实际可用性/]) assert.match(prose, pattern);
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  assert.match(event.significance, /^编辑解读：/);
  for (const section of event.details!) {
    assert.ok(section.locator && section.sourceIds?.length);
    assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id)));
  }
});

test('H3-Image source-backed reading stays on static details rather than inflating client payload', () => {
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(event.id));
  for (const resource of event.recommendedResources!) {
    assert.equal(resource.checkedAt, '2026-11-11');
    assert.ok(resource.creator && resource.match && resource.scopeNote && resource.locator);
    assert.ok(h3ImageSources.some(source => source.url === resource.url));
    assert.ok(!payload.includes(resource.id));
  }
});
