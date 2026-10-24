import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { transitionCollection, transitionEvents, transitionRelations, transitionSources, transitionSourceReviews } from '../src/topics/china-history/state-transitions';
import { defaultView, selectEvents } from '../src/core/catalog';
import { parseDate, overlaps, yearCoordinate } from '../src/core/time';
import { validateCatalog } from '../src/core/validate';

const event = (id: string) => chinaHistory.events.find(e => e.id === id)!;

test('state transitions add eight unique sourced records and a reachable reading route', () => {
  assert.deepEqual(validateCatalog(chinaHistory), []);
  assert.equal(transitionEvents.length, 8);
  assert.equal(transitionSources.length, 10);
  for (const e of transitionEvents) {
    assert.equal(chinaHistory.events.filter(other => other.id === e.id).length, 1, e.id);
    assert.ok(e.milestone);
    assert.ok(e.details!.every(s => s.sourceIds?.length && s.locator), e.id);
    assert.ok(e.significance.length > 20 && e.note, e.id);
  }
  assert.ok(chinaHistory.collections?.includes(transitionCollection));
  assert.ok(chinaHistory.topic.shortcuts?.some(s => s.path === transitionCollection.path));
  assert.ok(existsSync('src/pages/china-history/collections/state-transitions.astro'));
  assert.equal(transitionCollection.eventIds.length, 21);
  const years = transitionCollection.eventIds.map(id => yearCoordinate(event(id).time.start.year));
  assert.deepEqual(years, [...years].sort((a, b) => a - b));
  assert.match(transitionCollection.note, /不自动表示因果/);
});

test('founding, reunification and infrastructure retain distinct dates and precisions', () => {
  const yearly = {
    'western-han-founded': -202, 'western-jin-reunification': 280,
    'sui-reunification': 589, 'ming-founded': 1368, 'qing-enters-beijing': 1644,
  };
  for (const [id, year] of Object.entries(yearly)) assert.deepEqual(event(id).time.start, { year });
  assert.equal(chinaHistory.periods.find(p => p.id === 'sui')!.time.start.year, 581);
  assert.deepEqual(event('sui-grand-canal').time, {
    kind: 'duration', start: { year: 605 }, end: { year: 610 },
  });
  assert.ok(overlaps(event('sui-grand-canal').time, 608, 608));
  assert.match(event('western-han-founded').note!, /前206年/);
  assert.match(event('western-jin-reunification').note!, /不是西晋王朝存续期/);
  assert.match(event('sui-grand-canal').note!, /不是.*全部历史/);
  assert.match(event('qing-enters-beijing').note!, /不是|不把/);
  // Preserve established uncertainty and non-zero BCE chronology.
  assert.equal(chinaHistory.periods.find(p => p.id === 'xia')!.time.start.approximate, true);
  assert.ok(chinaHistory.events.every(e => e.time.start.year !== 0));
});

test('treaty and examination dates distinguish signing, ratification and implementation', () => {
  assert.deepEqual(event('treaty-nanjing').time.start, parseDate('1842-08-29'));
  assert.match(event('treaty-nanjing').details!.find(s => s.label === '签署不等于换约')!.text, /1843年6月26日/);
  assert.match(event('treaty-nanjing').note!, /不将后续条约/);
  assert.deepEqual(event('abolish-examinations').time.start, parseDate('1905-09-02'));
  assert.match(event('abolish-examinations').details![0].text, /1906/);
  assert.match(event('abolish-examinations').note!, /单一原因/);
  assert.match(transitionSources.find(s => s.id === 'frus-1905-examinations')!.type, /英译/);
});

test('period attribution is explicit and new institutional nodes remain discoverable', () => {
  for (const [period, ids] of [
    ['han', ['western-han-founded']],
    ['division', ['western-jin-reunification', 'sui-reunification']],
    ['sui', ['sui-reunification', 'sui-grand-canal']],
    ['ming', ['ming-founded', 'qing-enters-beijing']],
    ['qing', ['qing-enters-beijing', 'treaty-nanjing', 'abolish-examinations']],
  ] as const) {
    const selected = selectEvents(chinaHistory, defaultView(chinaHistory, period));
    for (const id of ids) assert.ok(selected.some(e => e.id === id), `${period}: ${id}`);
    assert.equal(chinaHistory.periods.find(p => p.id === period)!.coverage, 'selected');
  }
  const institutions = selectEvents(chinaHistory, { ...defaultView(chinaHistory), category: 'institution' });
  for (const id of ['sui-grand-canal', 'two-tax', 'abolish-examinations']) assert.ok(institutions.some(e => e.id === id), id);
  assert.ok(!selectEvents(chinaHistory, defaultView(chinaHistory, 'qing')).some(e => e.id === 'sun-inauguration'));
});

test('source reviews are scoped and relationships cite claims rather than mere order', () => {
  for (const s of transitionSources) assert.equal(s.checkedAt, '2026-10-24');
  for (const id of Object.keys(transitionSourceReviews)) assert.equal(chinaHistory.sources.find(s => s.id === id)!.checkedAt, '2026-10-24');
  assert.equal(chinaHistory.sources.find(s => s.id === 'chronology')!.checkedAt, '2026-09-30');
  assert.equal(chinaHistory.sources.find(s => s.id === 'xinhai-chronology')!.checkedAt, '2026-10-09');
  assert.equal(transitionRelations.length, 3);
  assert.ok(transitionRelations.every(r => r.sourceIds.length && r.locator && r.note));
  assert.equal(transitionRelations.find(r => r.id === 'han-adapts-qin-order')!.toEventId, 'qin-unification');
  assert.equal(transitionRelations.find(r => r.id === 'exam-abolition-yuan-memorial')!.entityId, 'yuan-shikai');
  assert.equal(transitionRelations.find(r => r.id === 'qing-inherits-ming-institutions')!.toEventId, 'ming-founded');
  for (const id of ['qin-unification', 'two-tax']) assert.ok(event(id).details!.every(s => s.sourceIds?.length && s.locator));
});
