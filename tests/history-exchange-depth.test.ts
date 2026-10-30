import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { ancientEvents } from '../src/topics/china-history/ancient-backbone';
import { exchangeDepthEventPatches, exchangeDepthSources } from '../src/topics/china-history/exchange-depth';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

const entry = (id: string) => {
  const found = chinaHistory.events.find(event => event.id === id);
  assert.ok(found, id);
  return found;
};
const source = (id: string) => {
  const found = chinaHistory.sources.find(source => source.id === id);
  assert.ok(found, id);
  return found;
};

test('exchange-history depth preserves node identity, dates and evidence visibility', () => {
  assert.deepEqual(validateCatalog(chinaHistory), []);
  assert.equal(chinaHistory.events.length, 145);
  for (const id of ['zhang-qian', 'zheng-he-voyages']) {
    const event = entry(id);
    const original = ancientEvents.find(candidate => candidate.id === id)!;
    assert.equal(chinaHistory.events.filter(candidate => candidate.id === id).length, 1);
    for (const key of ['time', 'category', 'periodIds', 'entityIds'] as const) assert.deepEqual(event[key], original[key]);
    assert.deepEqual(event.details, exchangeDepthEventPatches[id].details);
    assert.equal(event.details!.filter(section => section.editorial).length, 1);
    assert.ok(event.details!.filter(section => !section.editorial).length >= 5);
    for (const section of event.details!.filter(section => !section.editorial)) {
      assert.ok(section.sourceIds?.length && section.locator, `${id}: ${section.label}`);
      assert.ok(section.sourceIds.every(sourceId => event.sourceIds.includes(sourceId)), `${id}: evidence must render`);
    }
  }
  assert.deepEqual(entry('zhang-qian').time.start, { year: -138, approximate: true });
  assert.deepEqual(entry('zheng-he-voyages').time, { kind: 'duration', start: { year: 1405 }, end: { year: 1433 } });
});

test('reviewed exchange sources distinguish text versions, observation and historical scope', () => {
  assert.equal(exchangeDepthSources.length, 7);
  for (const reviewed of exchangeDepthSources) {
    assert.equal(chinaHistory.sources.filter(source => source.id === reviewed.id).length, 1);
    assert.equal(source(reviewed.id).checkedAt, '2026-10-26');
    assert.ok(reviewed.locator && reviewed.version);
  }
  assert.equal(source('anc-zhangqian').checkedAt, '2026-10-26');
  assert.equal(source('anc-zhenghe').checkedAt, '2026-10-26');
  assert.equal(source('anc-zhangqian-scio').checkedAt, '2026-10-24');
  assert.equal(source('anc-hexi').checkedAt, '2026-10-24');
  assert.match(source('zhangqian-uw-han-text').version!, /1917.*不是张骞手稿/);
  assert.match(entry('zhang-qian').note!, /前139年.*前138年.*503.*正文仍待复核/);
  assert.match(entry('zhang-qian').details!.find(section => section.label.startsWith('商人'))!.text, /不能据它复原一条全程路线/);
  assert.match(source('zhenghe-npm-yingya').version!, /万历刊本不是航行当年的手稿/);
  assert.match(entry('zheng-he-voyages').note!, /外交不等于从未动武.*不等于全部海外贸易终止/);
  assert.equal(entry('zheng-he-voyages').details!.find(section => section.label.startsWith('外交'))!.sourceIds!.length, 2);
  assert.equal(entry('zheng-he-voyages').details!.find(section => section.label.startsWith('后续'))!.sourceIds!.length, 2);
  assert.match(source('zhenghe-columbia-maritime-context').version!, /明显错年及大西洋表述.*未用作证据/);
});

test('specific exchange-history readings preserve creators, exact match and playback limits', () => {
  const ids = ['uw-zhangqian-primary-reading', 'penn-zhenghe-great-voyages', 'nmc-zhenghe-bell-reading'];
  const all = chinaHistory.events.flatMap(event => event.recommendedResources || []);
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  for (const id of ids) {
    const matches = all.filter(resource => resource.id === id);
    assert.equal(matches.length, 1);
    const resource = matches[0];
    assert.ok(resource.creator && resource.series && resource.match && resource.locator && resource.scopeNote);
    assert.equal(resource.checkedAt, '2026-10-26');
    assert.ok(!payload.includes(id));
  }
  const lecture = entry('zheng-he-voyages').recommendedResources![0];
  assert.equal(lecture.url, 'https://collections.penn.museum/collections/videos/video/93');
  assert.match(lecture.scopeNote, /未验证完整播放或逐字讲稿/);
  assert.equal(lecture.publishedAt, '2013-10-02');
  assert.ok(!chinaHistory.sources.some(source => source.url === lecture.url));
  assert.equal('details' in createExplorerPayload(chinaHistory).catalog.events.find(event => event.id === 'zhang-qian')!, false);
});
