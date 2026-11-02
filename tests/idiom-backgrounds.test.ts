import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { idiomBackgroundTimeline } from '../src/topics/china-history/idiom-backgrounds';
import { timelineEvents } from '../src/core/timelines';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

test('idiom contexts reuse two battle records, keep dates and deduplicate merged reading', () => {
  assert.deepEqual(validateCatalog(chinaHistory), []);
  assert.equal(chinaHistory.events.length, 145);
  assert.equal(idiomBackgroundTimeline.title, '成语故事的历史背景');
  assert.match(idiomBackgroundTimeline.note, /背景年代.*不表示成语在该年首次出现/);
  const selected = timelineEvents(chinaHistory, ['idiom-backgrounds']);
  assert.deepEqual(selected.map(e => e.id).sort(), ['feishui', 'julu']);
  for (const [id, year] of [['julu', -207], ['feishui', 383]] as const) {
    const event = selected.find(e => e.id === id)!;
    assert.equal(event, chinaHistory.events.find(e => e.id === id));
    assert.deepEqual(event.time, { kind: 'point', start: { year } });
    assert.equal(event.milestone, true);
    assert.match(event.note!, /不是.*首见年/);
    assert.match(event.note!, /尚未核实/);
  }
  assert.equal(timelineEvents(chinaHistory, ['wars-and-turning-points', 'idiom-backgrounds']).length, 53);
  assert.equal(timelineEvents(chinaHistory, ['idiom-backgrounds'], true).length, 0);
  assert.equal(timelineEvents(chinaHistory, ['china-through-the-ages']).length, 77);
});

test('idiom details separate attributed texts, later usages, uncertainty and editorial interpretation', () => {
  for (const id of ['julu', 'feishui']) {
    const event = chinaHistory.events.find(e => e.id === id)!;
    assert.equal(event.details!.length, 4);
    assert.equal(event.details!.filter(s => s.editorial).length, 1);
    for (const section of event.details!.filter(s => !s.editorial)) {
      assert.ok(section.locator && section.sourceIds?.length);
      assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id)));
    }
  }
  const julu = chinaHistory.events.find(e => e.id === 'julu')!;
  const feishui = chinaHistory.events.find(e => e.id === 'feishui')!;
  assert.match(julu.details![0].text, /《史记·项羽本纪》记/);
  assert.match(feishui.details![0].text, /唐修《晋书.*叙述/);
  assert.match(feishui.details![1].text, /并非直接使用这四字/);
  assert.match(feishui.details![2].text, /不宣布.*绝对最早/);
  assert.match(chinaHistory.sources.find(s => s.id === 'idiom-jinshu-fujian')!.version!, /不是两份独立战场证据/);
});

test('specific Julu interpretation stays separate from evidence and the lightweight index', () => {
  const event = chinaHistory.events.find(e => e.id === 'julu')!;
  const reading = event.recommendedResources!.find(r => r.id === 'julu-chiculture-reading')!;
  assert.equal(reading.creator, '陈佳荣');
  assert.equal(reading.publishedAt, '2024-01-08');
  assert.match(reading.scopeNote, /不替代原典/);
  assert.equal(chinaHistory.sources.some(s => s.url === reading.url), false);
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  assert.equal(payload.includes(reading.url), false);
  assert.equal(payload.includes('梁章钜'), false);
  assert.ok(payload.includes('草木皆兵'), 'idiom search uses tags, not full details');
});
