import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { validateCatalog } from '../src/core/validate';
import { createExplorerPayload } from '../src/core/explorer-payload';
const event = chinaHistory.events.find(e => e.id === 'chanyuan')!;

test('Chanyuan preserves year precision and separates obligations from later judgments', () => {
  assert.deepEqual(validateCatalog(chinaHistory), []);
  assert.equal(chinaHistory.events.filter(e => e.id === 'chanyuan').length, 1);
  assert.deepEqual(event.time, { kind: 'point', start: { year: 1005 } });
  assert.equal(event.category, 'diplomacy');
  assert.deepEqual(event.periodIds, ['song', 'northern-song', 'liao']);
  assert.match(event.note!, /不补未经核定的公历月日/);
  assert.match(event.details![1].text, /绢二十万匹、银十万两/);
  assert.match(event.details![2].text, /不是当时签署文书的实物/);
  assert.match(event.details![3].text, /论文摘要/);
  assert.equal(event.details!.filter(d => d.editorial).length, 1);
  assert.ok(event.details!.filter(d => !d.editorial).every(d => d.locator && d.sourceIds?.every(id => event.sourceIds.includes(id))));
  assert.ok(event.sourceIds.every(id => chinaHistory.sources.some(s => s.id === id)));
});

test('Chanyuan scoped reading retains old video limitations and stays outside client payload', () => {
  const reading = event.recommendedResources!;
  assert.equal(reading.length, 4);
  assert.equal(reading[0].url, chinaHistory.sources.find(s => s.id === 'chanyuan-transmitted-oaths')!.url);
  assert.match(reading[1].scopeNote, /只读摘要/);
  assert.ok(reading.filter(r => r.kind === 'video').every(r => r.checkedAt === '2026-10-26' && r.scopeNote.includes('未验证播放')));
  assert.equal(chinaHistory.sources.find(s => s.id === 'chanyuan-zhang-2024')!.publishedAt, '2024-01-15');
  assert.equal(chinaHistory.sources.find(s => s.id === 'chanyuan-wang-2003')!.publishedAt, undefined);
  assert.equal(chinaHistory.sources.find(s => s.id === 'song-rivals')!.checkedAt, '2026-11-09');
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  assert.ok(!payload.includes('chanyuan-oaths-reading'));
  assert.ok(!payload.includes('史料边界：传世誓书不是原件'));
});
