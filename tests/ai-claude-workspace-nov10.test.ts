import test from 'node:test';
import assert from 'node:assert/strict';
import { claudeWorkspaceNov10Events, claudeWorkspaceNov10Sources, claudeWorkspaceNov10Entities } from '../src/topics/ai/claude-workspace-nov10';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { entities, eventHref } from '../src/topics/ai/entities';
import { aiCatalog } from '../src/topics/ai/adapter';
import { eventLane } from '../src/topics/ai/config';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { defaultAtlas, filterAtlas } from '../src/lib/atlas';

const ids = ['claude-whiteboards-beta', 'claude-sheets-beta', 'claude-data-ga'];
const record = (id: string) => {
  const event = claudeWorkspaceNov10Events.find(item => item.id === id);
  assert.ok(event, id);
  return event;
};
const prose = (id: string) => {
  const event = record(id);
  return [event.summary, event.significance, event.limitation, ...event.details!.map(section => section.text)].join(' ');
};

test('Claude workspace records are unique day-precision product events in one announcement group', () => {
  assert.deepEqual(claudeWorkspaceNov10Events.map(event => event.id), ids);
  const visible = filterAtlas(events, { ...defaultAtlas(), from: 2026, to: 2026, all: true });
  for (const event of claudeWorkspaceNov10Events) {
    assert.equal(event.date, '2026-11-10');
    assert.equal(event.announcementGroup, 'claude-workspace-2026-11-10');
    assert.equal(events.filter(item => item.id === event.id).length, 1, event.id);
    assert.ok(visible.some(item => item.id === event.id), event.id);
    const adapted = aiCatalog.events.filter(item => item.id === event.id);
    assert.equal(adapted.length, 1);
    assert.deepEqual(adapted[0].time.start, { year: 2026, month: 11, day: 10 });
    assert.deepEqual(event.tracks, ['products']);
    assert.equal(eventLane(event), 'methods', 'Office artifacts are not automatically classified as Agent applications');
    assert.equal(event.change, undefined, 'These are product milestones, not new model weights');
    assert.equal(eventHref(event), `/ai/events/${event.id}/`);
  }
  assert.equal(claudeWorkspaceNov10Entities.length, 3);
  for (const entity of claudeWorkspaceNov10Entities) {
    assert.equal(entity.type, 'product');
    assert.deepEqual(entities.filter(item => item.id === entity.id), [entity]);
  }
});

test('Claude workspace sources preserve publication precision, canonical evidence and source locators', () => {
  const sourceMap = new Map(sources.map(source => [source.id, source]));
  assert.equal(claudeWorkspaceNov10Sources.length, 5);
  assert.equal(new Set(claudeWorkspaceNov10Sources.map(source => source.id)).size, 5);
  for (const source of claudeWorkspaceNov10Sources) {
    assert.deepEqual(sourceMap.get(source.id), source);
    assert.equal(source.checkedAt, '2026-11-10');
    assert.ok(source.locator && source.version, source.id);
    assert.match(source.url, /^https:\/\/(?:support\.)?claude\.com\//);
    if (source.type === '官方公告') assert.equal(source.publishedAt, '2026-11-10');
    else assert.equal(source.publishedAt, undefined, 'A dynamic help-page review is not its first publication date');
  }
  for (const event of claudeWorkspaceNov10Events) {
    assert.ok(event.sourceIds.includes('claude-workspace-nov10-announcement'));
    assert.equal(new Set(event.sourceIds).size, event.sourceIds.length);
    assert.ok(event.details!.some(section => section.editorial));
    assert.ok(event.details!.some(section => !section.editorial));
    assert.match(event.significance, /^编辑解读：/);
    for (const section of event.details!) {
      assert.ok(section.locator && section.sourceIds?.length, section.label);
      assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id) && sourceMap.has(id)), section.label);
    }
  }
});

test('Claude workspace recommended reading retains scope notes without bloating the explorer index', () => {
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  for (const event of claudeWorkspaceNov10Events) {
    assert.ok(event.recommendedResources!.length);
    for (const resource of event.recommendedResources!) {
      assert.ok(resource.creator && resource.match && resource.scopeNote && resource.locator);
      assert.equal(resource.checkedAt, '2026-11-10');
      assert.match(resource.scopeNote, /未/);
      assert.ok(claudeWorkspaceNov10Sources.some(source => event.sourceIds.includes(source.id) && source.url === resource.url));
      assert.ok(!payload.includes(resource.id));
    }
  }
});

test('Whiteboards beta does not resolve conflicting official Meetings availability into a rollout claim', () => {
  const event = record(ids[0]);
  assert.equal(event.kind, '产品 beta');
  assert.match(prose(ids[0]), /Enterprise.*管理员启用/);
  assert.match(prose(ids[0]), /HIPAA-ready.*不可用/);
  const conflict = event.details!.find(section => section.label.includes('Meetings'))!;
  assert.ok(conflict);
  assert.deepEqual([...conflict.sourceIds!].sort(), ['claude-workspace-nov10-overview', 'claude-whiteboards-guide'].sort());
  for (const expression of [/即将推出/, /Meetings beta/, /Google Meet/, /不足以确定统一开放范围/, /不把会议功能计作已全面上线/, /不推断 Zoom 或 Teams 支持/]) assert.match(conflict.text, expression);
  assert.ok(!claudeWorkspaceNov10Events.some(item => /meetings/.test(item.id)));
});

test('Sheets beta keeps mobile read-only access and distinguishes the native artifact from integrations', () => {
  assert.equal(record(ids[1]).kind, '产品 beta');
  for (const expression of [/不是既有 Claude for Excel 或 Google Workspace 扩展/, /移动端只有基本只读/, /web 和桌面提供编辑/, /10万/, /VBA/, /不能从连接应用拉取实时数据/, /HIPAA、CMEK、ZDR 尚不支持/, /Enterprise 默认关闭/]) assert.match(prose(ids[1]), expression);
});

test('Data GA preserves the Dashboards lineage and two beta capabilities with separate Enterprise timing', () => {
  assert.equal(record(ids[2]).kind, '产品 GA／更名');
  for (const expression of [/Claude Dashboards.*10月.*beta/, /11月10日.*Claude Data.*正式可用/, /认证查询和实时共享仍是 beta/, /11月19日默认开启/, /不覆盖所有者已保存的设置/, /两项 beta 仍默认关闭/]) assert.match(prose(ids[2]), expression);
});

test('Data refresh and live sharing describe execution conditions and result access rather than blanket permissions', () => {
  for (const expression of [/编辑认证查询会移除认证/, /有人打开仪表板且数据已到刷新间隔/, /不应.*后台按时自动运行/, /每位查看者自己的连接/, /共享者的数据源权限/, /没有底层数据源权限的人也可能看到这些结果/, /查询变更需要编辑者批准/, /不等于授予底层访问/]) assert.match(prose(ids[2]), expression);
});
