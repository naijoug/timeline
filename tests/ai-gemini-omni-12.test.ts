import test from 'node:test';
import assert from 'node:assert/strict';
import { geminiOmni12Events, geminiOmni12Sources } from '../src/topics/ai/gemini-omni-12-release';
import { events } from '../src/topics/ai/events';
import { entities } from '../src/topics/ai/entities';
import { sources } from '../src/topics/ai/sources';
import { aiTimelines } from '../src/topics/ai/timelines';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';

test('Gemini Omni 1.2 content records dated API and Cloud GA without blanket app or weight access', () => {
  assert.equal(geminiOmni12Events.length, 1);
  const event = geminiOmni12Events[0];
  assert.equal(event.id, 'gemini-omni-1-2-flash-ga');
  assert.equal(event.date, '2026-11-05');
  assert.equal(event.kind, 'API 与云端正式可用');
  assert.deepEqual(event.entityIds, ['gemini']);
  assert.deepEqual(event.tracks, ['models']);
  assert.match(event.summary, /Gemini API 与 Google Cloud 正式可用/);
  assert.match(event.summary, /应用端开放范围需另行区分/);
  assert.match(event.limitation, /不是权重发布/);
  assert.match(event.limitation, /未调用 API、生成视频或独立复测/);
  assert.ok(!event.tags.includes('开放权重'));
  const details = event.details!.map(section => section.text).join('\n');
  assert.match(details, /模型 ID 为 gemini-omni-1\.2-flash/);
  assert.match(details, /Gemini for business 标为 coming soon/);
  assert.match(details, /不能移植为 gemini-omni-1\.2-flash 的退役日期/);
});

test('Gemini Omni 1.2 content distinguishes native duration, special modes, upscaling and vendor pricing', () => {
  const event = geminiOmni12Events[0];
  const details = event.details!.map(section => section.text).join('\n');
  assert.match(details, /3–15 秒原生片段/);
  assert.match(details, /首尾帧及视频延展仍受每步最多 10 秒限制/);
  assert.match(details, /不能将其描述为原生 4K/);
  assert.match(details, /720p 每秒 0\.07 美元/);
  assert.match(details, /相较 1\.1 降低 30%.*厂商标价比较/);
  assert.match(details, /音频参考功能仍需要白名单授权/);
  assert.equal(event.change?.evidence, '厂商报告');
  assert.match(event.change!.baseline, /Gemini Omni 1\.1.*本站尚未单独收录/);
  assert.equal(event.change?.baselineEventId, undefined);
  assert.match(event.change!.tradeoffs, /不保证总项目成本按相同比例下降/);
});

test('Gemini Omni 1.2 content keeps source provenance and editorial analysis explicit', () => {
  const event = geminiOmni12Events[0];
  assert.equal(geminiOmni12Sources.length, 4);
  assert.equal(new Set(geminiOmni12Sources.map(source => source.id)).size, 4);
  for (const source of geminiOmni12Sources) {
    assert.equal(source.checkedAt, '2026-11-06');
    assert.ok(source.locator);
    assert.ok(source.url.startsWith('https://'));
    assert.ok(event.sourceIds.includes(source.id));
  }
  for (const id of ['gemini-omni-12-announcement', 'gemini-omni-12-cloud-announcement', 'gemini-omni-12-model-card']) {
    assert.equal(geminiOmni12Sources.find(source => source.id === id)!.publishedAt, '2026-11-05');
  }
  assert.equal(geminiOmni12Sources.find(source => source.id === 'gemini-omni-12-model-doc')!.publishedAt, undefined);
  for (const section of event.details!) {
    assert.ok(section.sourceIds?.length && section.locator);
    for (const id of section.sourceIds!) assert.ok(event.sourceIds.includes(id));
  }
  for (const id of event.change!.sourceIds) assert.ok(event.sourceIds.includes(id));
  const editorial = event.details!.filter(section => section.editorial);
  assert.equal(editorial.length, 1);
  assert.match(editorial[0].label, /编辑分析/);
  assert.match(editorial[0].text, /不是官方或独立评测结论/);
});

test('Gemini Omni 1.2 content recommends specific attributed release and editing articles', () => {
  const resources = geminiOmni12Events[0].recommendedResources!;
  assert.equal(resources.length, 2);
  assert.equal(resources[0].creator, 'Anish Nangia · Product Manager, Google DeepMind');
  const guide = resources.find(resource => resource.id === 'gemini-omni-12-editing-guide')!;
  assert.equal(guide.title, 'Edit videos');
  assert.equal(guide.url, 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/edit-videos');
  assert.match(guide.scopeNote, /未执行示例或发起付费请求/);
  assert.equal(guide.publishedAt, undefined);
  for (const resource of resources) {
    assert.equal(resource.kind, 'article');
    assert.equal(resource.checkedAt, '2026-11-06');
    assert.ok(resource.creator && resource.series && resource.match && resource.scopeNote && resource.locator);
  }
});

test('Gemini Omni 1.2 integration is unique and keeps long reading outside the explorer payload', () => {
  const event = geminiOmni12Events[0];
  assert.equal(events.filter(item => item.id === event.id).length, 1);
  assert.equal(entities.filter(entity => entity.id === 'gemini').length, 1);
  for (const source of geminiOmni12Sources) assert.equal(sources.filter(item => item.id === source.id).length, 1);
  assert.equal(aiTimelines.find(line => line.id === 'ai-model-iterations')!.entries.filter(entry => entry.eventId === event.id).length, 1);
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(event.id));
  for (const section of event.details!) assert.ok(!payload.includes(section.label));
  for (const resource of event.recommendedResources!) assert.ok(!payload.includes(resource.id));
});
