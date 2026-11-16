import test from 'node:test';
import assert from 'node:assert/strict';
import { chatgptWalletEvents, chatgptWalletSources, chatgptWalletEntities } from '../src/topics/ai/chatgpt-wallet';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiCatalog } from '../src/topics/ai/adapter';
import { eventLane, entityLane } from '../src/topics/ai/config';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventHref } from '../src/topics/ai/entities';
const event = chatgptWalletEvents[0];
const prose = JSON.stringify(event);
test('Wallet is one dated payment product capability, not a model or main milestone', () => {
  assert.equal(chatgptWalletEvents.length, 1);
  assert.deepEqual(events.filter(item => item.id === event.id), [event]);
  assert.equal(event.date, '2026-11-13');
  assert.equal(event.change, undefined);
  assert.equal(event.milestone, false);
  assert.equal(eventLane(event), 'products');
  assert.equal(entityLane(chatgptWalletEntities[0]), 'products');
  assert.deepEqual(event.entityIds, ['chatgpt-wallet']);
  assert.match(eventHref(event), /\/ai\/events\/chatgpt-wallet-rollout\/$/);
  assert.deepEqual(aiCatalog.timelines!.filter(line => line.entries.some(entry => entry.eventId === event.id)).map(line => line.id), ['ai-agent-products']);
  assert.deepEqual(aiCatalog.events.find(item => item.id === event.id)!.time.start, { year: 2026, month: 11, day: 13 });
});
test('Wallet sources distinguish dated rollout from current help and scoped reading', () => {
  assert.equal(chatgptWalletSources.length, 3);
  for (const source of chatgptWalletSources) {
    assert.deepEqual(sources.filter(item => item.id === source.id), [source]);
    assert.equal(source.checkedAt, '2026-11-16');
    assert.equal(source.publishedAt, source.id === 'chatgpt-wallet-guide' ? undefined : '2026-11-13');
    assert.ok(source.locator && source.version);
  }
  for (const section of event.details!) {
    assert.ok(section.locator && section.sourceIds!.length);
    assert.ok(section.sourceIds!.every(id => event.sourceIds.includes(id)));
  }
  assert.match(event.recommendedResources![0].scopeNote, /未登录、添加卡片或执行购买/);
});
test('Wallet preserves eligibility, substitute credentials and purchase confirmation boundaries', () => {
  for (const pattern of [/逐步推出/, /美国年满18岁/, /ChatGPT Pro/, /美国发行信用卡/, /美国账单地址/, /不适用于 Chat、Work 或独立 Codex/, /生物验证/, /Ready to check out 只表示授权完成/, /不能替代商户订单确认/, /不等于 Agent 完全不使用支付凭据/, /仍是计划/, /周期扣款/, /并非所有商户/, /未设置卡片或实测交易/]) assert.match(prose, pattern);
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  assert.match(event.significance, /^编辑解读/);
});
test('Wallet extended reading stays out of the lightweight explorer payload', () => {
  const payload = createExplorerPayload(aiCatalog);
  assert.ok(!JSON.stringify(payload).includes(event.recommendedResources![0].id));
  assert.ok(!JSON.stringify(payload).includes('Ready to check out'));
  assert.equal(payload.catalog.events.find(item => item.id === event.id)!.summary, event.summary);
});
