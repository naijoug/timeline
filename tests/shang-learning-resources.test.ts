import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';

test('Shang era reading pairs a specific recommendation with author interpretation', () => {
  const event = chinaHistory.events.find(event => event.id === 'shang-rise')!;
  assert.deepEqual(event.time.start, { year: -1600, approximate: true });
  assert.deepEqual(event.sourceIds, ['anc-nmc-early', 'anc-yinxu']);
  assert.equal(chinaHistory.events.length, 145);
  assert.equal(chinaHistory.sources.length, 191);
  const [video, interview] = event.recommendedResources!;
  assert.equal(event.recommendedResources!.length, 2);
  assert.equal(video.url, 'https://www.bilibili.com/en/video/BV1xh41177En');
  assert.match(video.creator, /范新（荐书）、罗振宇（主持）/);
  assert.match(video.scopeNote, /2023年4月23日.*4月29日/);
  assert.equal(video.publishedAt, '2023-04-29');
  assert.match(video.scopeNote, /未核实为《罗辑思维》/);
  assert.match(video.scopeNote, /未验证完整播放/);
  assert.match(video.match, /整个商朝.*并非/);
  assert.equal(interview.publishedAt, '2023-01-29');
  assert.equal(interview.url, 'https://www.thepaper.cn/newsDetail_forward_21713167');
  assert.match(interview.scopeNote, /不是.*学界共识/);
});

test('era-level learning resources are not duplicated across Shang events or client payload', () => {
  const ids = ['dedao-423-jianshang', 'thepaper-lishuo-jianshang-interview'];
  const all = chinaHistory.events.flatMap(event => event.recommendedResources || []);
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  for (const id of ids) {
    assert.equal(all.filter(resource => resource.id === id).length, 1);
    assert.ok(!payload.includes(id));
  }
  assert.equal(all.length, 23);
  assert.equal(chinaHistory.events.filter(event => event.recommendedResources?.length).length, 17);
  const muye = chinaHistory.events.find(event => event.id === 'muye')!;
  assert.equal(muye.recommendedResources![0].id, 'nmc-li-gui');
});
