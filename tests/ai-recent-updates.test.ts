import test from 'node:test';
import assert from 'node:assert/strict';
import { events } from '../src/topics/ai/events';
import { entities, entityHref, eventHref } from '../src/topics/ai/entities';
import { sources } from '../src/topics/ai/sources';
import { aiCatalog } from '../src/topics/ai/adapter';
import { recentEvents, recentSources, recentResearchDate } from '../src/topics/ai/recent-updates';
import { defaultAtlas, eventLane, filterAtlas } from '../src/lib/atlas';

test('recent updates are unique, discoverable and backed by dated primary sources', () => {
  const visible = filterAtlas(events, { ...defaultAtlas(), from: 2026, to: 2026, all: true });
  const sourceMap = new Map(sources.map(source => [source.id, source]));
  assert.equal(recentEvents.length, 5);
  assert.equal(new Set(recentSources.map(source => source.url)).size, recentSources.length);
  for (const event of recentEvents) {
    assert.equal(events.filter(item => item.id === event.id).length, 1, event.id);
    assert.ok(visible.some(item => item.id === event.id), event.id);
    assert.ok(event.date <= recentResearchDate, event.id);
    assert.ok(event.sourceIds.some(id => sourceMap.get(id)?.publishedAt === event.date), event.id);
    assert.ok(event.details?.length, event.id);
    for (const section of event.details!) {
      assert.ok(section.locator && section.sourceIds?.length, event.id);
      assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id)), event.id);
    }
    assert.equal(aiCatalog.events.filter(item => item.id === event.id).length, 1, event.id);
    assert.ok(eventHref(event).includes(event.id), event.id);
  }
  for (const source of recentSources) {
    assert.equal(source.checkedAt, recentResearchDate, source.id);
    assert.ok(source.locator, source.id);
    assert.ok(!source.publishedAt || source.publishedAt <= source.checkedAt, source.id);
  }
});

test('recent dates distinguish API GA, governance, model update and benchmark launches', () => {
  for (const [id, date, kind] of [
    ['decisions-api-ga', '2026-10-22', '正式开放'],
    ['skills-aaif-donation', '2026-10-22', '标准治理更新'],
    ['deepseek-v4-1-flash-1017', '2026-10-17', '模型更新'],
    ['aa-robotics-v01-preview', '2026-10-14', '评测研究预览'],
    ['aa-frontiercode-leaderboard', '2026-10-12', '独立评测榜单上线'],
  ]) {
    const event = events.find(item => item.id === id)!;
    assert.equal(event.date, date, id);
    assert.equal(event.kind, kind, id);
  }
});

test('DeepSeek update has a prior same-family baseline and remains vendor-reported', () => {
  const event = recentEvents.find(item => item.id === 'deepseek-v4-1-flash-1017')!;
  const baseline = events.find(item => item.id === event.change?.baselineEventId)!;
  const families = new Set(entities.filter(entity => entity.type === 'family').map(entity => entity.id));
  assert.equal(baseline.id, 'deepseek-v4-1-flash');
  assert.ok(baseline.date < event.date);
  assert.ok(event.entityIds.some(id => families.has(id) && baseline.entityIds.includes(id)));
  assert.equal(event.change?.evidence, '厂商报告');
  assert.match(event.change!.tradeoffs, /Claude Code/);
  assert.match(event.change!.tradeoffs, /Mini-SWE-V2/);
  const china = filterAtlas(events, { ...defaultAtlas(), from: 2026, to: 2026, all: true, scope: 'china' });
  assert.ok(china.some(item => item.id === event.id));
});

test('evaluation and API infrastructure are not misclassified as model or Agent launches', () => {
  assert.equal(entities.find(entity => entity.id === 'decisions-api')!.type, 'concept');
  assert.ok(entityHref('decisions-api').includes('/concepts/decisions-api/'));
  for (const event of recentEvents) {
    assert.equal(eventLane(event), event.id === 'deepseek-v4-1-flash-1017' ? 'models' : 'methods', event.id);
  }
  const frontier = recentEvents.find(item => item.id === 'aa-frontiercode-leaderboard')!;
  assert.match(frontier.limitation, /6 月.*7 月/);
  assert.match(frontier.limitation, /得分与通过率/);
  assert.match(frontier.details!.map(section => section.text).join(' '), /100.*三次.*Stirrup/);
  const robotics = recentEvents.find(item => item.id === 'aa-robotics-v01-preview')!;
  assert.match(robotics.limitation, /不同 Agent 框架/);
  assert.match(robotics.limitation, /不是纯模型公平排名/);
});
