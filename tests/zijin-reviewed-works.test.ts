import test from 'node:test';
import assert from 'node:assert/strict';
import { writersCatalog } from '../src/topics/writers/catalog';
import { zijinReviewedEvents, zijinReviewedSources } from '../src/topics/writers/zijin-reviewed-works';
import { writersReadingPaths } from '../src/topics/writers/reading';
import { eventSourceIds } from '../src/core/evidence';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

const badKids = zijinReviewedEvents.find(event => event.id === 'zi-jin-chen-bad-kids')!;
const longNight = zijinReviewedEvents.find(event => event.id === 'zi-jin-chen-long-night')!;

test('Zijin review replaces two existing novels without changing dates, authors or node count', () => {
  assert.deepEqual(validateCatalog(writersCatalog), []);
  assert.equal(writersCatalog.events.length, 59);
  assert.equal(writersCatalog.entities.length, 3);
  assert.deepEqual(badKids.time.start, { year: 2014, month: 8 });
  assert.deepEqual(longNight.time.start, { year: 2017, month: 1 });
  for (const event of zijinReviewedEvents) {
    assert.deepEqual(writersCatalog.events.filter(entry => entry.id === event.id), [event]);
    assert.deepEqual(event.entityIds, ['zi-jin-chen']);
    assert.match(event.note!, /首销日/);
    assert.match(event.note!, /未核定.*连载/);
  }
});

test('Zijin facts and factual sections cite concrete reviewed records, with editorial analysis separate', () => {
  const sourceIds = new Set(zijinReviewedSources.map(source => source.id));
  assert.equal(sourceIds.size, 9);
  for (const source of zijinReviewedSources) {
    assert.equal(source.checkedAt, '2026-10-25');
    assert.notEqual(new URL(source.url).pathname, '/');
    assert.ok(source.locator);
  }
  for (const event of zijinReviewedEvents) {
    assert.ok(eventSourceIds(event).every(id => sourceIds.has(id)));
    assert.equal(event.details!.filter(section => section.editorial).length, 1);
    assert.match(event.details!.find(section => section.editorial)!.label, /编辑解读/);
    for (const section of event.details!.filter(section => !section.editorial)) {
      assert.ok(section.sourceIds?.length && section.locator);
    }
    assert.ok(event.facts!.every(fact => fact.sourceIds?.length));
  }
  assert.equal(writersCatalog.sources.find(source => source.id === 'jiangsu-lit-press'), undefined);
});

test('Bad Kids does not leak adaptation-only characters, setting or rescue motive into the novel', () => {
  const text = JSON.stringify(badKids);
  assert.match(text, /湖南文艺出版社/);
  assert.doesNotMatch(text, /江苏文艺出版社|严良|六峰山|普普弟弟|治病|三十万元/);
  assert.match(badKids.summary, /朱朝阳/);
  assert.match(text, /不把电视剧/);
  assert.match(text, /不是家庭经历必然导致犯罪/);
});

test('Bad Kids separates domestic edition, regional translations, shortlist and award winning', () => {
  const text = JSON.stringify(badKids);
  assert.match(text, /2022年8月4日/);
  assert.match(text, /2023年6月6日/);
  assert.match(text, /Michelle Deeter/);
  assert.match(text, /短名单入围，非获奖/);
  assert.match(text, /2018年印刷时间/);
  assert.match(text, /past-winners.*Shortlisted/);
  assert.ok(badKids.sourceIds.includes('writers-bad-kids-cwa'));
});

test('Long Night replaces undated rating and superlatives with bounded award and author evidence', () => {
  const text = JSON.stringify(longNight);
  assert.doesNotMatch(text, /豆瓣评分|9\.0|最高口碑|丰碑|巅峰收官/);
  assert.match(text, /第二届网络文学双年奖铜奖/);
  assert.match(text, /尚待上线/);
  assert.match(text, /作者自述/);
  assert.match(text, /不是法律实务指南/);
  assert.match(text, /直连超时/);
  assert.match(writersReadingPaths['zi-jin-chen'][0].note, /各自独立叙事/);
});

test('recommended interviews have exact authorship, platform, locator and publication dates', () => {
  const resources = zijinReviewedEvents.map(event => event.recommendedResources![0]);
  assert.equal(resources[0].publishedAt, '2020-06-29');
  assert.equal(resources[1].publishedAt, '2024-02-02');
  assert.match(resources[0].creator, /郭冠华/);
  assert.match(resources[1].creator, /张小童/);
  for (const resource of resources) {
    assert.equal(resource.kind, 'article');
    assert.ok(resource.series && resource.locator && resource.match);
    assert.match(resource.scopeNote, /人物.*情节|人物和情节/);
    assert.equal(resource.checkedAt, '2026-10-25');
  }
});

test('Zijin interview records and full paragraphs stay out of the compact browser index', () => {
  const payload = JSON.stringify(createExplorerPayload(writersCatalog));
  assert.ok(!payload.includes('zijin-long-night-character-conversation'));
  assert.ok(!payload.includes('recommendedResources'));
  assert.ok(!payload.includes('一、创作：检察官题材缘起'));
  assert.ok(!payload.includes('不意味着小说是某宗真实案件的完整复原'));
});
