import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { ancientEvents, ancientSources } from '../src/topics/china-history/ancient-backbone';
import { modernEvents, modernSources } from '../src/topics/china-history/modern-backbone';
import { historyRecommendedResources } from '../src/topics/china-history/recommended-resources';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { defaultView, selectEvents, catalogBounds } from '../src/core/catalog';
import { dateBounds, overlaps } from '../src/core/time';
import { validateCatalog } from '../src/core/validate';

const event = (id: string) => {
  const found = chinaHistory.events.find(event => event.id === id);
  assert.ok(found, id);
  return found;
};

test('the backbone is substantial across eras, not a new isolated sample period', () => {
  assert.ok(ancientEvents.length >= 45);
  assert.ok(modernEvents.length >= 40);
  assert.ok(chinaHistory.events.length >= 125);
  assert.deepEqual(validateCatalog(chinaHistory), []);
  for (const period of ['xia','shang','zhou','qin','han','division','sui','tang','song-era','yuan','ming','later-jin-early-qing','qing','republic-1912-1949','prc-early','reform-opening','contemporary','postwar-taiwan']) {
    assert.ok(selectEvents(chinaHistory, { ...defaultView(chinaHistory, period), all: true }).length, period);
  }
  assert.ok(chinaHistory.events.filter(event => event.category === 'battle').length >= 18);
  assert.ok(chinaHistory.events.filter(event => event.category === 'war').length >= 12);
  assert.equal(catalogBounds(chinaHistory)[1], 2026);
  assert.equal(event('fifteenth-five-year-plan').time.start.year, 2026);
});

test('new details distinguish sourced facts from independent editorial interpretation', () => {
  const sources = new Set(chinaHistory.sources.map(source => source.id));
  for (const entry of [...ancientEvents, ...modernEvents]) {
    assert.ok(entry.note && entry.significance, entry.id);
    const factual = entry.details!.filter(section => !section.editorial);
    const editorial = entry.details!.filter(section => section.editorial);
    assert.ok(factual.length >= 2, `${entry.id}: needs event and context`);
    assert.ok(editorial.length >= 1, `${entry.id}: needs labeled interpretation`);
    for (const section of factual) {
      assert.ok(section.sourceIds?.length && section.locator, `${entry.id}: missing paragraph evidence`);
      assert.ok(section.sourceIds.every(id => sources.has(id)), entry.id);
    }
    assert.ok(editorial.some(section => section.text !== entry.significance), `${entry.id}: repeated interpretation`);
  }
  for (const source of [...ancientSources, ...modernSources]) {
    assert.equal(source.checkedAt, '2026-10-24');
    assert.ok(source.locator, source.id);
  }
  assert.equal(chinaHistory.sources.find(source => source.id === 'chronology')!.checkedAt, '2026-09-30');
});

test('early chronology preserves uncertainty without civil year zero or invented precise dates', () => {
  assert.equal(event('xia-erlitou').time.start.approximate, true);
  assert.match(JSON.stringify(event('xia-erlitou')), /不能|不可|未.*证实|讨论/);
  assert.equal(event('muye').time.start.approximate, true);
  assert.equal(event('zhang-qian').time.start.approximate, true);
  for (const entry of chinaHistory.events) {
    assert.notEqual(entry.time.start.year, 0);
    assert.notEqual(entry.time.end?.year, 0);
  }
  for (const entry of ancientEvents.filter(event => event.time.start.year < 0)) {
    assert.equal(entry.time.start.day, undefined, entry.id);
  }
  const xia = chinaHistory.periods.find(period => period.id === 'xia')!;
  assert.equal(xia.time.start.year, -2070);
  assert.equal(xia.time.start.approximate, true);
});

test('modern political scopes and decisions do not become false terminal dates or accomplished goals', () => {
  const republic = selectEvents(chinaHistory, { ...defaultView(chinaHistory, 'republic-1912-1949'), all: true });
  assert.ok(republic.some(event => event.id === 'sun-inauguration'));
  const early = selectEvents(chinaHistory, { ...defaultView(chinaHistory, 'republican-early'), all: true });
  assert.ok(early.some(event => event.id === 'sun-inauguration'));
  assert.deepEqual(event('taiwan-direct-election').periodIds, ['postwar-taiwan']);
  assert.ok(!selectEvents(chinaHistory, { ...defaultView(chinaHistory, 'prc'), all: true }).some(event => event.id === 'taiwan-direct-election'));
  assert.match(chinaHistory.periods.find(period => period.id === 'republic-1912-1949')!.note!, /不把1949年.*终结/);
  assert.match(chinaHistory.periods.find(period => period.id === 'prc')!.note!, /不是国家存续终点/);
  assert.match(event('un-china-representation').note!, /代表权|台湾|入会/);
  assert.match(event('fifteenth-five-year-plan').note!, /不把.*目标.*已经完成/);
  assert.deepEqual(event('gradual-retirement-reform').time.start, { year: 2025, month: 1, day: 1 });
  assert.ok(dateBounds(event('liaoshen-campaign').time.end!)[1] < dateBounds(event('pingjin-campaign').time.start)[0]);
  assert.ok(overlaps(event('full-scale-war-resistance').time, 1942, 1942));
});

test('collections cover early and contemporary history in actual chronological order', () => {
  for (const id of ['china-through-the-ages','wars-and-turning-points']) {
    const collection = chinaHistory.collections!.find(collection => collection.id === id)!;
    assert.ok(collection && existsSync(`src/pages/china-history/collections/${id}.astro`));
    const dates = collection.eventIds.map(id => dateBounds(event(id).time.start)[0]);
    assert.deepEqual(dates, [...dates].sort((a,b) => a-b));
    assert.equal(new Set(collection.eventIds).size, collection.eventIds.length);
  }
  const backbone = chinaHistory.collections!.find(collection => collection.id === 'china-through-the-ages')!;
  assert.equal(backbone.eventIds[0], 'xia-erlitou');
  assert.equal(backbone.eventIds.at(-1), 'fifteenth-five-year-plan');
  assert.ok(backbone.eventIds.includes('qin-unification') && backbone.eventIds.includes('prc-founding'));
});

test('every recommendation is attached to a real event and stays outside fact sources and the client index', () => {
  const payload = createExplorerPayload(chinaHistory);
  for (const [id, resources] of Object.entries(historyRecommendedResources)) {
    assert.deepEqual(event(id).recommendedResources, resources, id);
    assert.equal('recommendedResources' in payload.catalog.events.find(event => event.id === id)!, false);
    for (const resource of resources) {
      assert.ok(resource.match && resource.scopeNote && resource.creator && resource.checkedAt);
      assert.match(resource.scopeNote, /未验证播放|正文已读取|核对/);
    }
  }
  const home = readFileSync('src/pages/index.astro','utf8');
  assert.match(home, /夏商周 — 当代/);
  assert.doesNotMatch(home, /先秦 — 近代/);
  assert.ok(!JSON.stringify(payload).includes('historyRecommendedResources'));
});
