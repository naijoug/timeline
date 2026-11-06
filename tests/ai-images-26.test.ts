import test from 'node:test';
import assert from 'node:assert/strict';
import { images26Events, images26Sources } from '../src/topics/ai/images-26-release';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { entities } from '../src/topics/ai/entities';
import { aiTimelines } from '../src/topics/ai/timelines';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';

const event = images26Events[0];
const text = event.details!.map(section => section.text).join('\n');
test('Images 2.6 records product/API release and exact model identities without weight claims', () => {
  assert.equal(images26Events.length, 1);
  assert.equal(event.date, '2026-11-04');
  assert.equal(event.kind, '产品与 API 发布');
  assert.deepEqual(event.tracks, ['models']);
  assert.deepEqual(event.entityIds, ['gpt']);
  for (const expected of ['gpt-image-2.6-flare', 'gpt-image-2.6-sunburst', '/v1/images/generations', '/v1/images/edits', '所有订阅档位全球可用']) assert.ok(text.includes(expected));
  assert.match(event.limitation, /不是权重发布/);
  assert.match(event.limitation, /未调用 API、生成图片或独立复测/);
  assert.equal(event.change?.evidence, '厂商报告');
  assert.match(event.change!.baseline, /2.5.*尚未单独收录/);
  assert.equal(event.change!.baselineEventId, undefined);
  assert.match(text, /4月21日.*9月8日/);
});
test('Images 2.6 keeps format, markup, complexity and quality boundaries explicit', () => {
  for (const expected of ['GIF 生成覆盖 ChatGPT 与 API', 'SVG 输出仅在 API', 'GPT Image 2.5 模型提供标记引导编辑，并非 2.6 独有', 'complexity 调整渲染前的规划', 'low / medium / high', '均默认 high', 'quality 单独控制渲染质量', '50%', 'quality=low 时最快约 6 秒', '厂商陈述，不是平均延迟承诺', '3,077 条挑战请求', '生产违规率']) assert.ok(text.includes(expected), expected);
  assert.match(event.change!.tradeoffs, /非预期修改/);
});
test('Images 2.6 separates attributable evidence, editorial analysis and further reading', () => {
  assert.equal(images26Sources.length, 6);
  for (const source of images26Sources) {
    assert.equal(source.checkedAt, '2026-11-06');
    assert.ok(source.locator);
    assert.ok(event.sourceIds.includes(source.id));
  }
  for (const id of ['images-26-announcement', 'images-26-changelog', 'images-26-system-card']) assert.equal(images26Sources.find(s => s.id === id)!.publishedAt, '2026-11-04');
  for (const id of ['images-26-guide', 'images-26-flare-model', 'images-26-sunburst-model']) assert.equal(images26Sources.find(s => s.id === id)!.publishedAt, undefined);
  for (const section of event.details!) {
    assert.ok(section.locator && section.sourceIds?.length);
    for (const id of section.sourceIds!) assert.ok(event.sourceIds.includes(id));
  }
  const editorial = event.details!.filter(section => section.editorial);
  assert.equal(editorial.length, 1);
  assert.match(editorial[0].label, /编辑分析/);
  assert.match(editorial[0].text, /不是官方或独立评测结论/);
  assert.equal(event.recommendedResources!.length, 3);
  for (const resource of event.recommendedResources!) {
    assert.ok(resource.creator && resource.series && resource.match && resource.scopeNote && resource.locator);
    assert.equal(resource.checkedAt, '2026-11-06');
    assert.ok(images26Sources.some(source => source.url === resource.url));
  }
});
test('Images 2.6 enters both curated lines once and excludes long reading from explorer payload', () => {
  assert.equal(events.filter(item => item.id === event.id).length, 1);
  assert.equal(entities.filter(item => item.id === 'gpt').length, 1);
  for (const source of images26Sources) assert.equal(sources.filter(item => item.id === source.id).length, 1);
  for (const id of ['ai-milestones', 'ai-model-iterations']) assert.equal(aiTimelines.find(line => line.id === id)!.entries.filter(entry => entry.eventId === event.id).length, 1);
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(event.id));
  for (const section of event.details!) assert.ok(!payload.includes(section.label));
  for (const resource of event.recommendedResources!) assert.ok(!payload.includes(resource.id));
});
