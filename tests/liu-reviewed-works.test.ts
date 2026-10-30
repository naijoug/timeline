import test from 'node:test';
import assert from 'node:assert/strict';
import { writersCatalog } from '../src/topics/writers/catalog';
import { liuReviewedEvents, liuReviewedSources } from '../src/topics/writers/liu-reviewed-works';
import { validateCatalog } from '../src/core/validate';
import { eventSourceIds } from '../src/core/evidence';
import { createExplorerPayload } from '../src/core/explorer-payload';

test('Liu review replaces two nodes and distinguishes July 2004 version from June 2005', () => {
  assert.deepEqual(validateCatalog(writersCatalog), []);
  assert.equal(writersCatalog.events.length, 59);
  assert.equal(liuReviewedEvents[0].milestone, false);
  assert.equal(liuReviewedEvents[1].milestone, true);
  for (const event of liuReviewedEvents) assert.deepEqual(writersCatalog.events.filter(e => e.id === event.id), [event]);
  assert.deepEqual(liuReviewedEvents[0].time.start, { year: 2003, month: 1 });
  assert.deepEqual(liuReviewedEvents[1].time.start, { year: 2004, month: 7 });
  assert.match(JSON.stringify(liuReviewedEvents[1]), /2005年6月/);
  assert.match(JSON.stringify(liuReviewedEvents[0]), /1989年/);
  assert.match(JSON.stringify(liuReviewedEvents[0]), /1990年/);
  assert.match(liuReviewedEvents[0].note!, /未据原稿裁定/);
  assert.match(liuReviewedEvents[0].details![1].text, /回答.*未重述精确起始年/);
});
test('Liu reviewed facts cite specific evidence and keep editorial material separate', () => {
  const ids = new Set(liuReviewedSources.map(s => s.id));
  assert.equal(ids.size, 7);
  for (const source of liuReviewedSources) { assert.equal(source.checkedAt, '2026-10-26'); assert.notEqual(new URL(source.url).pathname, '/'); }
  for (const event of liuReviewedEvents) {
    assert.ok(eventSourceIds(event).every(id => ids.has(id)));
    assert.equal(event.details!.filter(s => s.editorial).length, 1);
    assert.ok(event.details!.filter(s => !s.editorial).every(s => s.sourceIds?.length && s.locator));
    assert.ok(event.facts!.every(f => f.sourceIds?.length));
  }
});
test('Liu version and interpretation boundaries remain explicit', () => {
  assert.match(JSON.stringify(liuReviewedEvents[0]), /2019年10月22日/);
  assert.match(JSON.stringify(liuReviewedEvents[0]), /未逐稿校勘/);
  assert.match(JSON.stringify(liuReviewedEvents[1]), /2018年8月14日/);
  assert.match(JSON.stringify(liuReviewedEvents[1]), /不是现实球状闪电已获证实/);
  assert.match(liuReviewedEvents[1].significance, /不把本书定为/);
  assert.doesNotMatch(liuReviewedEvents[1].significance, /惊艳绝伦|推向极致/);
});
test('specific Liu interviews disclose attribution and archival-date limits', () => {
  const [supernova, ball] = liuReviewedEvents.map(e => e.recommendedResources![0]);
  assert.match(supernova.creator, /王瑶/);
  assert.match(supernova.scopeNote, /第一章/);
  assert.match(ball.creator, /小π/);
  assert.match(ball.scopeNote, /不把档案路径/);
  assert.equal(ball.publishedAt, undefined);
  for (const resource of [supernova, ball]) assert.ok(resource.series && resource.match && resource.locator && resource.scopeNote);
});
test('Liu long-form evidence remains out of lightweight explorer payload', () => {
  const payload = JSON.stringify(createExplorerPayload(writersCatalog));
  assert.ok(!payload.includes('recommendedResources'));
  assert.ok(!payload.includes('liu-ball-lightning-pi-conversation'));
  assert.ok(!payload.includes('未逐稿校勘'));
});
