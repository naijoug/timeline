import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { containmentEvents } from '../src/topics/ai/containment-report';

const event = (id: string) => chinaHistory.events.find(event => event.id === id)!;
test('social history deepening preserves dates, nodes and separate editorial reasoning', () => {
  assert.equal(chinaHistory.events.length, 145);
  assert.equal(chinaHistory.sources.find(source => source.id === 'tax')!.title, '隋、唐');
  assert.deepEqual(event('diamond-sutra').time.start, { year: 868 });
  assert.deepEqual(event('two-tax').time.start, { year: 780 });
  assert.deepEqual(event('abolish-examinations').time.start, { year: 1905, month: 9, day: 2 });
  for (const id of ['two-tax', 'diamond-sutra', 'abolish-examinations']) {
    const entry = event(id);
    assert.equal(entry.details!.filter(section => section.editorial).length, 1);
    assert.ok(entry.details!.filter(section => !section.editorial).every(section => section.sourceIds?.length && section.locator));
    assert.equal(entry.recommendedResources?.length, 1);
    assert.ok(entry.recommendedResources![0].creator && entry.recommendedResources![0].scopeNote);
  }
  assert.match(event('diamond-sutra').note!, /不是印刷术发明年份/);
  assert.match(event('abolish-examinations').note!, /1906/);
  assert.match(event('two-tax').note!, /不.*税负/);
  assert.equal(chinaHistory.sources.find(source => source.id === 'diamond')!.checkedAt, '2026-10-24');
});
test('new learning links have explicit verification limits and remain outside client indexes', () => {
  assert.match(event('two-tax').recommendedResources![0].scopeNote, /未验证播放/);
  assert.match(event('diamond-sutra').recommendedResources![0].scopeNote, /未成功打开/);
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  for (const id of ['cctv-tang-tax-reform', 'idp-diamond-object-reading', 'columbia-keju-social-reading']) assert.ok(!payload.includes(id));
});
test('OpenAI containment publication preserves report date and vendor attribution', () => {
  const report = containmentEvents[0];
  assert.equal(report.date, '2026-10-23');
  assert.match(report.dateLabel!, /报告发布/);
  assert.match(report.details![0].text, /9月20日.*10月1日/);
  assert.match(report.limitation, /厂商.*不等同独立安全认证/);
  assert.equal(report.details!.filter(section => section.editorial).length, 1);
  assert.equal(aiCatalog.events.filter(event => event.id === report.id).length, 1);
  assert.ok(!JSON.stringify(createExplorerPayload(aiCatalog)).includes('openai-containment-engineering-reading'));
});
