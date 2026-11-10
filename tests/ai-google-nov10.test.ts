import test from 'node:test';
import assert from 'node:assert/strict';
import { googleNov10Events, googleNov10Sources } from '../src/topics/ai/google-nov10';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { entities, eventHref } from '../src/topics/ai/entities';
import { aiTimelines } from '../src/topics/ai/timelines';
import { aiCatalog } from '../src/topics/ai/adapter';
import { eventLane } from '../src/topics/ai/config';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { defaultAtlas, filterAtlas } from '../src/lib/atlas';

const ids = ['gemini-4-carbon-wider-access', 'gemini-robotics-25-partner-rollout', 'alphaproof-code-verification'];
const record = (id: string) => {
  const event = googleNov10Events.find(item => item.id === id);
  assert.ok(event, id);
  return event;
};
const prose = (id: string) => {
  const event = record(id);
  return [event.summary, event.significance, event.limitation, ...event.details!.map(section => section.text), event.change?.baseline, event.change?.tradeoffs].join(' ');
};

test('November 10 additions remain unique day-precision records and searchable across the full library', () => {
  assert.deepEqual(googleNov10Events.map(event => event.id).sort(), [...ids].sort());
  const visible = filterAtlas(events, { ...defaultAtlas(), from: 2026, to: 2026, all: true });
  for (const event of googleNov10Events) {
    assert.equal(event.date, '2026-11-10', event.id);
    assert.equal(events.filter(item => item.id === event.id).length, 1, event.id);
    assert.ok(visible.some(item => item.id === event.id), event.id);
    const adapted = aiCatalog.events.filter(item => item.id === event.id);
    assert.equal(adapted.length, 1, event.id);
    assert.deepEqual(adapted[0].time.start, { year: 2026, month: 11, day: 10 });
  }
});

test('November 10 records retain canonical model and research routes with a distinct Robotics family', () => {
  assert.equal(eventHref(record(ids[0])), '/ai/models/gemini/gemini-4-carbon-wider-access/');
  assert.equal(eventHref(record(ids[1])), '/ai/models/gemini-robotics/gemini-robotics-25-partner-rollout/');
  assert.equal(eventHref(record(ids[2])), '/ai/events/alphaproof-code-verification/');
  const roboticsFamily = entities.filter(entity => entity.id === 'gemini-robotics');
  assert.equal(roboticsFamily.length, 1);
  assert.equal(roboticsFamily[0].type, 'family');
  assert.deepEqual(record(ids[1]).entityIds, ['gemini-robotics']);
  const models = aiTimelines.find(timeline => timeline.id === 'ai-model-iterations');
  assert.ok(models);
  assert.ok(!models.entries.some(entry => entry.eventId === ids[2]));
});

test('November 10 evidence and reading links resolve, retain review dates and distinguish editorial interpretation', () => {
  const sourceMap = new Map(sources.map(source => [source.id, source]));
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.equal(new Set(googleNov10Sources.map(source => source.id)).size, googleNov10Sources.length);
  for (const source of googleNov10Sources) {
    assert.equal(source.checkedAt, '2026-11-10', source.id);
    assert.ok(source.locator, source.id);
    assert.match(source.url, /^https:\/\//, source.id);
    assert.deepEqual(sourceMap.get(source.id), source);
  }
  for (const event of googleNov10Events) {
    assert.ok(event.sourceIds.some(id => sourceMap.get(id)?.publishedAt === '2026-11-10'), event.id);
    assert.ok(event.details!.some(section => section.editorial), event.id);
    assert.ok(event.details!.some(section => !section.editorial), event.id);
    for (const section of event.details!) {
      assert.ok(section.locator && section.sourceIds?.length, event.id);
      assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id) && sourceMap.has(id)), event.id);
    }
    assert.ok(event.recommendedResources!.length, event.id);
    for (const resource of event.recommendedResources!) {
      assert.ok(resource.creator && resource.match && resource.scopeNote && resource.locator, resource.id);
      assert.equal(resource.checkedAt, '2026-11-10', resource.id);
      assert.match(resource.url, /^https:\/\//, resource.id);
      assert.ok(!payload.includes(resource.id), resource.id);
    }
  }
});

test('Carbon broader access preserves its October announcement rather than rewriting the baseline', () => {
  const event = record(ids[0]);
  assert.equal(eventLane(event), 'models');
  assert.equal(event.change?.baselineEventId, 'gemini-4-carbon-announced');
  assert.equal(events.find(item => item.id === event.change!.baselineEventId)?.date, '2026-10-28');
  assert.equal(event.change?.evidence, '厂商报告');
  assert.match(prose(ids[0]), /付费/);
  assert.match(prose(ids[0]), /API/);
  assert.match(prose(ids[0]), /Ultra/);
  assert.match(prose(ids[0]), /逐步|分批/);
  assert.match(prose(ids[0]), /cyber|网络安全/i);
  assert.match(prose(ids[0]), /申请/);
  assert.match(prose(ids[0]), /Carbon for cyber.*Fairwind Program 申请/);
  assert.match(event.limitation, /逐步开放/);
  assert.match(event.limitation, /未宣布公开模型权重/);
});

test('Robotics 2.5 partner VLA rollout is distinct from the earlier ER2 cloud preview', () => {
  const event = record(ids[1]);
  assert.equal(eventLane(event), 'models');
  assert.match(prose(ids[1]), /VLA/);
  assert.match(prose(ids[1]), /伙伴/);
  assert.match(prose(ids[1]), /ER.?2/);
  assert.match(prose(ids[1]), /高层/);
  assert.match(prose(ids[1]), /API/);
  assert.match(prose(ids[1]), /权重/);
  assert.match(event.change!.baseline, /Gemini Robotics 2 VLA.*不是高层推理 Gemini Robotics ER 2/);
  assert.match(event.limitation, /不是公开 API、权重下载或全面 GA/);
  assert.match(prose(ids[1]), /ASIMOV-Jailbreak.*不是模型权重/);
});

test('AlphaProof code verification remains a scoped research result, not a general model release', () => {
  const event = record(ids[2]);
  assert.equal(eventLane(event), 'methods');
  assert.equal(event.change, undefined);
  for (const expression of [/libsignal v0\.105\.4/i, /AArch64/, /一对一会话代码.*init、send、recv/, /限定会话模型/, /多会话规模/, /keygen 密钥生成不在已验证路径内/, /可信/, /群聊/, /多设备/, /规格、密码原语假设、机器语义及 Lean 内核/]) {
    assert.match(prose(ids[2]), expression);
  }
  assert.match(event.limitation, /公开证明材料不等于通用模型 API 或完整代理服务/);
  assert.match(prose(ids[2]), /不能宣称完整后量子安全/);
  assert.ok(event.recommendedResources!.some(resource => resource.url === 'https://google-deepmind.github.io/code-verification/'));
  assert.ok(event.recommendedResources!.some(resource => resource.url === 'https://github.com/google-deepmind/code-verification'));
});
