import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { validateCatalog } from '../src/core/validate';
import { createExplorerPayload } from '../src/core/explorer-payload';
const event = chinaHistory.events.find(e => e.id === 'chengpu')!;
test('Chengpu preserves year precision and distinguishes annals, commentary and inscriptions', () => {
  assert.deepEqual(validateCatalog(chinaHistory), []);
  assert.equal(chinaHistory.events.filter(e => e.id === 'chengpu').length, 1);
  assert.deepEqual(event.time, { kind: 'point', start: { year: -632 } });
  assert.equal(event.category, 'battle');
  assert.match(event.note!, /不裁定现代战场坐标/);
  assert.match(event.note!, /不补未经核定的公历月日/);
  assert.match(event.details![1].text, /退避与临阵佯退是两个层次/);
  assert.match(event.details![3].text, /铭文没有直接出现“城濮”二字/);
  assert.match(event.details![3].text, /战役对应是馆方解释/);
  assert.equal(event.details!.filter(d => d.editorial).length, 1);
  assert.ok(event.details!.filter(d => !d.editorial).every(d => d.locator && d.sourceIds?.every(id => event.sourceIds.includes(id))));
});
test('Chengpu reading is specific, scoped and excluded from client payload', () => {
  const reading = event.recommendedResources![0];
  assert.equal(reading.creator, '国立故宫博物院');
  assert.match(reading.scopeNote, /未观看/);
  assert.equal(reading.url, chinaHistory.sources.find(s => s.id === 'chengpu-npm-bells')!.url);
  assert.equal(chinaHistory.sources.find(s => s.id === 'anc-chengpu')!.checkedAt, '2026-10-24');
  assert.ok(!JSON.stringify(createExplorerPayload(chinaHistory)).includes('chengpu-npm-reading'));
  assert.ok(!JSON.stringify(createExplorerPayload(chinaHistory)).includes('史源对读：铭文与后世解说'));
});
