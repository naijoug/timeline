import test from 'node:test';
import assert from 'node:assert/strict';
import { writersCatalog } from '../src/topics/writers/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';

const event = writersCatalog.events.find(e => e.id === 'zi-jin-chen-burning-ice')!;
test('Burning Ice retains year precision and exposes conflicting chronology without inventing a month', () => {
  assert.deepEqual(validateCatalog(writersCatalog), []);
  assert.deepEqual(event.time, { kind: 'point', start: { year: 2014 } });
  assert.equal(writersCatalog.events.filter(e => e.id === event.id).length, 1);
  assert.deepEqual(event.entityIds, ['zi-jin-chen']);
  assert.equal(event.category, 'suspense');
  assert.match(event.details![0].text, /2012年.*冲突.*不补首版月日/);
  assert.match(event.note!, /未读取初版版权页/);
  assert.match(JSON.stringify(event.facts), /数学教师，不是剧集中的片警/);
  assert.equal(event.details?.filter(d => d.editorial).length, 1);
  assert.ok(event.details?.filter(d => !d.editorial).every(d => d.sourceIds?.length && d.locator));
});
test('Burning Ice distinguishes interview participants, real-case limits and spoiler-sensitive reading', () => {
  assert.match(event.details!.find(d => d.label.startsWith('系列边界'))!.text, /采访者.*作者随后/);
  assert.match(event.details!.find(d => d.label.startsWith('创作缘起'))!.text, /未独立核查新闻原案/);
  const resource = event.recommendedResources![0];
  assert.equal(event.recommendedResources!.length, 1);
  assert.equal(resource.publishedAt, '2024-02-02');
  assert.equal(resource.checkedAt, '2026-11-09');
  assert.match(resource.scopeNote, /情节和动机.*读完后/);
  assert.equal(resource.url, 'https://wyb.chinawriter.com.cn/content/202402/02/content73422.html');
  const payload = JSON.stringify(createExplorerPayload(writersCatalog));
  assert.ok(payload.includes(event.id));
  assert.ok(!payload.includes(resource.id));
  assert.ok(!payload.includes('创作缘起：新闻启发不是真案复述'));
  assert.equal(writersCatalog.sources.find(s => s.id === 'writers-three-body-chronology')?.checkedAt, '2026-10-24');
});
