import test from 'node:test';
import assert from 'node:assert/strict';
import { events } from '../src/topics/ai/events';
import { entities, entityMap, entityHref, eventHref } from '../src/topics/ai/entities';
import { sources, sourceMap } from '../src/topics/ai/sources';
import { aiCatalog } from '../src/topics/ai/adapter';
import { verified2026Events, verified2026Sources, verified2026Entities, verified2026ResearchDate } from '../src/topics/ai/verified-2026';
import { defaultAtlas, filterAtlas, eventLane } from '../src/lib/atlas';

const expected = new Map([
  ['gemma-4', '2026-04-02'], ['ernie-5-1', '2026-05-09'],
  ['minimax-m3', '2026-06-01'], ['claude-fable-mythos-5', '2026-06-09'],
  ['seedream-5-pro', '2026-07-08'], ['seedance-2-5', '2026-07-31'],
  ['tencent-hy4-preview', '2026-08-28'], ['claude-fable-mythos-5-1', '2026-09-01'],
  ['opus-5-5', '2026-09-22'], ['codex-cloud-2026', '2026-09-29'],
  ['gemini-4-argon-preview', '2026-09-30'], ['mistral-large-4-preview', '2026-10-06'],
  ['haiku-5-5', '2026-10-07'], ['muse-wonder', '2026-10-12'],
  ['gemini-4-argon-ga', '2026-10-13'], ['muse-spark-open', '2026-10-15'],
  ['minimax-m3-1-flash', '2026-10-19'], ['minimax-m3-1-flash-weights', '2026-10-23'],
  ['tencent-hy-nomas', '2026-10-23'],
]);
const byId = new Map(events.map(event => [event.id, event]));
const get = (id: string) => byId.get(id)!;

test('the 2026 gap review remains a bounded 19-event batch with exact verified dates', () => {
  assert.equal(verified2026Events.length, expected.size);
  assert.deepEqual(new Set(verified2026Events.map(event => event.id)), new Set(expected.keys()));
  assert.equal(verified2026ResearchDate, '2026-10-24');
  for (const event of verified2026Events) {
    assert.equal(event.date, expected.get(event.id), event.id);
    assert.ok(event.date <= verified2026ResearchDate, event.id);
    assert.equal(events.filter(item => item.id === event.id).length, 1, event.id);
    assert.equal(aiCatalog.events.filter(item => item.id === event.id).length, 1, event.id);
    assert.ok(event.sourceIds.some(id => sourceMap[id]?.publishedAt === event.date), event.id);
    assert.ok(event.sourceIds.every(id => sourceMap[id]), event.id);
    assert.ok(event.entityIds.every(id => entityMap[id]), event.id);
    assert.ok(eventHref(event).endsWith(`/${event.id}/`), event.id);
    for (const section of event.details || []) {
      assert.ok(section.locator && section.sourceIds?.length, event.id);
      assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id)), event.id);
    }
  }
});

test('new primary sources retain individual review dates without refreshing older evidence', () => {
  assert.equal(verified2026Sources.length, 23);
  assert.equal(new Set(verified2026Sources.map(source => source.url)).size, verified2026Sources.length);
  for (const source of verified2026Sources) {
    assert.equal(source.checkedAt, verified2026ResearchDate);
    assert.ok(source.locator, source.id);
    assert.ok(['官方公告', '官方文档'].includes(source.type), source.id);
    assert.ok(!source.publishedAt || source.publishedAt <= source.checkedAt, source.id);
    assert.equal(sources.filter(item => item.id === source.id).length, 1, source.id);
  }
  assert.equal(sourceMap['skills-aaif'].checkedAt, '2026-10-23');
  assert.equal(sourceMap['release-gemma-3'].checkedAt, '2026-09-30');
});

test('2026 models have sourced changes and only backward same-family baseline links', () => {
  const families = new Set(entities.filter(entity => entity.type === 'family').map(entity => entity.id));
  for (const event of verified2026Events) {
    assert.equal(eventLane(event), event.id === 'codex-cloud-2026' ? 'products' : 'models', event.id);
    if (!event.tracks.includes('models')) continue;
    assert.ok(event.change?.baseline && event.change.improvements.length && event.change.tradeoffs, event.id);
    assert.equal(event.change!.evidence, '厂商报告');
    assert.ok(event.change!.sourceIds.every(id => event.sourceIds.includes(id)), event.id);
    if (!event.change!.baselineEventId) continue;
    const baseline = get(event.change!.baselineEventId);
    assert.ok(baseline.date < event.date, event.id);
    assert.ok(event.entityIds.some(id => families.has(id) && baseline.entityIds.includes(id)), event.id);
  }
  // A different branch must not be presented as the direct predecessor.
  assert.equal(get('muse-spark-open').change!.baselineEventId, undefined);
  assert.equal(get('tencent-hy-nomas').change!.baselineEventId, undefined);
});

test('new model families do not overwrite Muse assistant or merge image and video products', () => {
  assert.deepEqual(new Set(verified2026Entities.map(entity => entity.id)), new Set(['muse-models', 'seedream']));
  assert.equal(entityMap.muse.type, 'product');
  assert.equal(entityMap['muse-models'].type, 'family');
  assert.match(entityHref('muse'), /\/products\/muse\/$/);
  assert.match(entityHref('muse-models'), /\/models\/muse-models\/$/);
  assert.deepEqual(get('muse-wonder').entityIds, ['muse-models']);
  assert.deepEqual(get('muse-spark-open').entityIds, ['muse-models']);
  assert.deepEqual(get('seedream-5-pro').entityIds, ['seedream']);
  assert.deepEqual(get('seedance-2-5').entityIds, ['seedance']);
});

test('announcement, restricted access, API preview and actual weights stay distinct', () => {
  assert.equal(get('gemini-4-argon-preview').kind, '公布与受限开放');
  assert.equal(get('gemini-4-argon-ga').kind, '公开可用范围扩展');
  assert.equal(get('gemini-4-argon-ga').change!.baselineEventId, 'gemini-4-argon-preview');
  assert.equal(get('minimax-m3-1-flash').kind, '模型发布');
  assert.equal(get('minimax-m3-1-flash-weights').kind, '权重开放');
  assert.equal(get('minimax-m3-1-flash-weights').change!.baselineEventId, 'minimax-m3-1-flash');
  assert.equal(get('minimax-m3-1-flash-weights').milestone, false);
  assert.equal(get('mistral-large-4-preview').kind, '公开预览');
  assert.match(get('mistral-large-4-preview').limitation, /仍计划.*不能记为已经开放/);
  assert.match(get('seedance-2-5').limitation, /API 当时仍为后续计划/);
  assert.match(get('codex-cloud-2026').limitation, /不是 2025 年.*首次/);
});

test('safeguards, license terms and video playback specifications retain their caveats', () => {
  assert.match(get('claude-fable-mythos-5').limitation, /6 月 12 日暂停.*7 月 1 日恢复/);
  assert.match(get('claude-fable-mythos-5-1').summary, /Mythos 5.1 限受信任访问/);
  assert.match(get('muse-spark-open').limitation, /Muse Model License.*不是无条件开源/);
  assert.match(get('minimax-m3-1-flash-weights').limitation, /minimax-community.*不能写成无条件开源/);
  assert.match(get('tencent-hy-nomas').limitation, /24 FPS 是输出播放帧率，不是实时生成速度/);
  assert.match(get('tencent-hy-nomas').limitation, /技术报告仍待发布/);
  assert.match(get('ernie-5-1').limitation, /0508/);
});

test('2026 gap events are visible through year, keyword and China filters', () => {
  const state = { ...defaultAtlas(), from: 2026, to: 2026, all: true };
  const all = filterAtlas(events, state);
  const china = filterAtlas(events, { ...state, scope: 'china' });
  for (const event of verified2026Events) assert.ok(all.some(item => item.id === event.id), event.id);
  for (const id of ['ernie-5-1', 'minimax-m3', 'seedream-5-pro', 'seedance-2-5', 'tencent-hy4-preview', 'tencent-hy-nomas']) {
    assert.ok(china.some(item => item.id === id), id);
  }
  const keyword = filterAtlas(events, { ...state, q: 'Seedream' });
  assert.ok(keyword.some(item => item.id === 'seedream-5-pro'));
  assert.ok(keyword.every(item => item.title.includes('Seedream')));
  assert.ok(!china.some(item => item.id === 'muse-wonder'));
  assert.ok(!china.some(item => item.id === 'gemini-4-argon-ga'));
});
