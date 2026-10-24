import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { writersCatalog } from '../src/topics/writers/catalog';
import { writersReviewedEventIds, writersReviewedSources, writersRelations } from '../src/topics/writers/reviewed-works';
import { authorTimeline, writersReadingPaths } from '../src/topics/writers/reading';
import { dateBounds } from '../src/core/time';
import { eventSourceIds, relationEndpoints, relationsFor } from '../src/core/evidence';
import { validateCatalog } from '../src/core/validate';

const event = (id: string) => writersCatalog.events.find(event => event.id === id)!;
const source = (id: string) => writersCatalog.sources.find(source => source.id === id)!;

test('writers remain limited to the three existing authors and pass catalog validation', () => {
  assert.deepEqual(validateCatalog(writersCatalog), []);
  assert.deepEqual(writersCatalog.entities.map(entity => entity.id), ['liu-cixin', 'zi-jin-chen', 'ma-bo-yong']);
  assert.equal(writersReviewedEventIds.length, 13);
  for (const id of writersReviewedEventIds) assert.equal(writersCatalog.events.filter(event => event.id === id).length, 1, id);
});

test('reviewed works cite concrete records without refreshing unrelated source dates', () => {
  const ids = new Set(writersReviewedSources.map(source => source.id));
  for (const source of writersReviewedSources) {
    assert.equal(source.checkedAt, '2026-10-24');
    assert.notEqual(new URL(source.url).pathname, '/', source.id);
    assert.ok(source.locator, source.id);
  }
  for (const id of writersReviewedEventIds) {
    const entry = event(id);
    assert.ok(entry.details?.length, id);
    for (const detail of entry.details!.filter(detail => !detail.editorial)) {
      assert.ok(detail.locator && detail.sourceIds?.length, `${id}: missing detail provenance`);
      assert.ok(detail.sourceIds.every(sourceId => ids.has(sourceId)), `${id}: generic source`);
    }
    assert.ok(eventSourceIds(entry).every(sourceId => ids.has(sourceId)), id);
  }
  assert.equal(source('sfs-archive').checkedAt, '2026-10-12');
  assert.equal(source('hunan-lit-press').checkedAt, '2026-10-12');
});

test('Three-Body serialization, book, translation and Hugo reception keep separate dates', () => {
  assert.deepEqual(event('liu-cixin-three-body-1').time.start, { year: 2006, month: 5 });
  assert.deepEqual(event('liu-cixin-three-body-book').time.start, { year: 2008, month: 1 });
  assert.deepEqual(event('liu-cixin-three-body-2').time.start, { year: 2008, month: 5 });
  assert.deepEqual(event('liu-cixin-three-body-3').time.start, { year: 2010, month: 11 });
  assert.deepEqual(event('liu-cixin-three-body-english').time.start, { year: 2014, month: 11, day: 11 });
  assert.deepEqual(event('liu-cixin-three-body-hugo').time.start, { year: 2015, month: 8, day: 22 });
  assert.match(event('liu-cixin-three-body-hugo').note!, /当地日期/);
  assert.match(event('liu-cixin-three-body-hugo').note!, /第一部/);
});

test('Ma works distinguish seasonal first publication, book edition and advance book news', () => {
  assert.deepEqual(event('ma-bo-yong-lychee-serial').time.start, { year: 2021 });
  assert.match(event('ma-bo-yong-lychee-serial').note!, /访谈刊发日/);
  assert.deepEqual(event('ma-bo-yong-lychee-of-changan').time.start, { year: 2022, month: 10 });
  assert.deepEqual(event('ma-bo-yong-taibai-jinxing').time.start, { year: 2023, month: 6 });
  assert.deepEqual(event('ma-bo-yong-peach-blossom-fine').time.start, { year: 2025, month: 6 });
  assert.equal(source('writers-peach-book').publishedAt, '2025-05-28');
  assert.match(event('ma-bo-yong-peach-blossom-fine').note!, /断续|连续/);
});

test('Zijin Chen characters are supported and incomplete publication dates stay year-precision', () => {
  const comic = event('zi-jin-chen-low-iq-crime');
  const tracker = event('zi-jin-chen-tracker');
  assert.match(comic.summary, /张一昂/);
  assert.doesNotMatch(JSON.stringify(comic), /张宝民|三水县/);
  assert.match(tracker.summary, /林奇.*张强.*夏明.*沈研/);
  assert.doesNotMatch(JSON.stringify(tracker), /陈舟|致残|步态识别/);
  assert.deepEqual(comic.time.start, { year: 2020 });
  assert.deepEqual(tracker.time.start, { year: 2018 });
});

test('evidence relations remain directional and distinguish book-series links from sequels', () => {
  assert.equal(writersRelations.length, 8);
  for (const relation of writersRelations) {
    assert.ok(relation.sourceIds.length && relation.locator);
    assert.ok(relationEndpoints(writersCatalog, relation));
  }
  const series = writersRelations.filter(relation => relation.id.startsWith('jianwei'));
  assert.ok(series.every(relation => /不意味着|不要求/.test(relation.note!)));
  assert.ok(relationsFor(writersCatalog, 'liu-cixin-three-body-hugo').some(relation => relation.fromEventId === 'liu-cixin-three-body-english'));
});

test('author timelines are chronological, scoped and leave shared catalog ordering unchanged', () => {
  const originalIds = writersCatalog.events.map(event => event.id);
  for (const author of writersCatalog.entities) {
    const timeline = authorTimeline(writersCatalog, author.id);
    assert.ok(timeline.every(event => event.entityIds.includes(author.id)));
    for (let i = 1; i < timeline.length; i++) {
      assert.ok(dateBounds(timeline[i - 1].time.start)[0] <= dateBounds(timeline[i].time.start)[0]);
    }
    for (const path of writersReadingPaths[author.id]) {
      assert.ok(path.eventIds.every(id => timeline.some(event => event.id === id)));
      assert.ok(path.sourceIds.every(id => source(id)));
    }
  }
  assert.deepEqual(writersCatalog.events.map(event => event.id), originalIds);
  assert.ok(!writersReadingPaths['liu-cixin'][0].eventIds.includes('liu-cixin-ball-lightning'));
  assert.match(writersReadingPaths['zi-jin-chen'][0].note, /编辑阅读建议/);
});

test('writer pages use shared navigation-safe records, chronological helpers and evidence slots', () => {
  const author = readFileSync('src/pages/writers/authors/[slug].astro', 'utf8');
  const record = readFileSync('src/pages/writers/events/[slug].astro', 'utf8');
  assert.match(author, /authorTimeline\(writersCatalog, entity.id\)/);
  assert.match(author, /个作品与传播节点/);
  assert.match(record, /<EventRecord/);
  assert.match(record, /<Relations slot="related"/);
  assert.match(record, /节点时间/);
  assert.match(record, /sourceIds: f.sourceIds/);
  assert.match(record, /eventSourceIds\(event\)/);
});

test('Seven Marquises records its retitled completed edition rather than an unsupported first-publication date', () => {
  const record = event('ma-bo-yong-seven-marquises');
  assert.deepEqual(record.time.start, { year: 2019, month: 4 });
  assert.deepEqual(record.periodIds, ['era-screen-and-bestseller']);
  assert.match(record.summary, /现代少年/);
  assert.match(record.note!, /未核定/);
  assert.equal(source('writers-seven-marquises-book').version, 'ISBN 9787540490805');
});


test('writer counts describe publication stages and detail sources include relation evidence', () => {
  const home = readFileSync('src/pages/index.astro', 'utf8');
  const about = readFileSync('src/pages/about.astro', 'utf8');
  const detail = readFileSync('src/pages/writers/events/[slug].astro', 'utf8');
  assert.match(home, /writersCatalog\.events\.length} 个作品与传播节点/);
  assert.doesNotMatch(home, /writersCatalog\.events\.length} 部代表作/);
  assert.match(about, /节点数不等于不同作品数/);
  assert.match(about, /未逐条重新核查/);
  assert.match(detail, /relationsFor\(writersCatalog, event\.id\)/);
  assert.match(detail, /event\.time\.start\.day/);
});
