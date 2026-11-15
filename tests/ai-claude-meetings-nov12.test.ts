import test from 'node:test';
import assert from 'node:assert/strict';
import { claudeMeetingsNov12Events, claudeMeetingsNov12Entities, claudeMeetingsNov12Sources } from '../src/topics/ai/claude-meetings-nov12';
import { events } from '../src/topics/ai/events';
import { entities } from '../src/topics/ai/entities';
import { sources } from '../src/topics/ai/sources';
import { aiCatalog } from '../src/topics/ai/adapter';
import { eventLane, entityLane } from '../src/topics/ai/config';
import { createExplorerPayload } from '../src/core/explorer-payload';
const event = claudeMeetingsNov12Events[0];
const prose = [event.summary, event.limitation, ...event.details!.map(section => section.text)].join(' ');

test('Meetings has one dated gradual beta product record and a single Agent subline membership', () => {
  assert.equal(claudeMeetingsNov12Events.length, 1);
  assert.equal(event.date, '2026-11-12');
  assert.equal(event.kind, '产品 beta');
  assert.equal(event.change, undefined);
  assert.equal(event.milestone, false);
  assert.deepEqual(events.filter(item => item.id === event.id), [event]);
  assert.equal(eventLane(event), 'products');
  const entity = claudeMeetingsNov12Entities[0];
  assert.equal(entityLane(entity), 'products');
  assert.deepEqual(entities.filter(item => item.id === entity.id), [entity]);
  assert.deepEqual(aiCatalog.events.find(item => item.id === event.id)!.time.start, { year: 2026, month: 11, day: 12 });
  const memberships = aiCatalog.timelines!.filter(line => line.entries.some(entry => entry.eventId === event.id));
  assert.deepEqual(memberships.map(line => line.id), ['ai-agent-products']);
});
test('Meetings sources retain publication dates, dynamic guide precision and independently scoped review', () => {
  assert.equal(claudeMeetingsNov12Sources.length, 3);
  for (const source of claudeMeetingsNov12Sources) {
    assert.deepEqual(sources.filter(item => item.id === source.id), [source]);
    assert.equal(source.checkedAt, '2026-11-15');
    assert.equal(source.publishedAt, source.type === '官方公告' ? '2026-11-12' : undefined);
    assert.ok(source.locator && source.version);
  }
  for (const section of event.details!) {
    assert.ok(section.locator && section.sourceIds!.length);
    assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id) && sources.some(source => source.id === id)));
  }
  for (const id of ['claude-sheets-guide', 'claude-data-guide', 'claude-workspace-nov10-announcement']) assert.equal(sources.find(source => source.id === id)!.checkedAt, '2026-11-10');
  assert.equal(events.find(item => item.id === 'claude-whiteboards-beta')!.date, '2026-11-10');
});
test('Meetings keeps access, permission, guest, storage and bounded beta pricing distinctions', () => {
  for (const pattern of [/逐步 beta/, /Team、Enterprise/, /Claude Desktop/, /Google Meet/, /Enterprise.*管理员/, /ZDR、HIPAA-ready、CMEK/, /不推断 Zoom 或 Teams/, /个人权限/, /首次请求授权/, /口头调用仍逐次确认/, /所有与会者可见/, /Team 默认允许、Enterprise 默认仅内部会议/, /不完全一致/, /不向外宾开放内部会议页面/, /允许外宾的会议中，Claude 记录转录与笔记，但不在 Meet 聊天中回复/, /转录、摘要和屏幕描述.*而非音频/, /同意转录/, /2027年2月10日/, /连接工具使用仍计入用量/, /不能概括成.*永久免费/]) assert.match(prose, pattern);
  assert.match(event.significance, /^编辑解读：/);
  assert.ok(event.details!.some(section => section.editorial));
});
test('Meetings static reading has checked source scope and is absent from the lightweight explorer index', () => {
  const resource = event.recommendedResources![0];
  assert.equal(resource.checkedAt, '2026-11-15');
  assert.match(resource.scopeNote, /未登录实测/);
  assert.ok(resource.locator && resource.match);
  assert.ok(!JSON.stringify(createExplorerPayload(aiCatalog)).includes(resource.id));
});
