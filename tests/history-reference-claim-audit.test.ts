import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
const event = (id: string) => chinaHistory.events.find(item => item.id === id)!;
const source = (id: string) => chinaHistory.sources.find(item => item.id === id)!;

test('historical date explanations do not invent unsupported calendar or accession equivalences', () => {
  const wu = chinaHistory.periods.find(item => item.id === 'wu')!;
  assert.match(wu.note!, /222.*改元黄武/);
  assert.doesNotMatch(wu.note!, /称吴王的222/);
  assert.ok(wu.sourceIds.includes('anc-sunwu'));
  assert.doesNotMatch(event('julu').note!, /秦历岁首.*造成/);
  assert.doesNotMatch(event('shaoxing-peace').note!, /1142/);
  assert.doesNotMatch(event('huang-chao').note!, /875/);
  assert.ok(event('yuan-named').sourceIds.includes('anc-mongols'));
});

test('new first-party materials replace inaccessible sole supports and metadata matches the document', () => {
  assert.deepEqual(event('western-xia-founded').sourceIds, ['anc-westernxia-yinchuan']);
  assert.match(source('anc-westernxia-yinchuan').url, /^https:\/\/dag\.yinchuan\.gov\.cn\/.+\.pdf$/);
  assert.ok(chinaHistory.periods.find(item => item.id === 'wu-zhou')!.sourceIds.includes('anc-wuzhou-gold-tablet'));
  assert.equal(source('anc-feishui').title, '顾绣东山图');
  assert.equal(source('anc-zhengtaiwan').title, '郑成功的火药弹');
  assert.match(source('anc-poyang').locator!, /陈友谅.*1363/);
});

test('partial-source access and unplayed recommendations remain explicit, not silently verified', () => {
  assert.match(event('chengpu').note!, /503.*索引/);
  assert.match(event('yongjia-crisis').note!, /摘要.*非论文全文/);
  assert.match(event('white-lotus-rebellion').note!, /访问异常.*索引/);
  assert.match(event('xuanwu').summary, /被杀；李世民随后/);
  const recommendation = event('xuanwu').recommendedResources![0];
  assert.match(recommendation.scopeNote!, /未.*核|未.*播放|仅.*标题/);
  assert.doesNotMatch(recommendation.match, /李建成.*政治集团/);
});
