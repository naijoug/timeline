import test from 'node:test';
import assert from 'node:assert/strict';
import { ethEvents, ethSources } from '../src/topics/ai/anthropic-eth-materials';
import { events } from '../src/topics/ai/events';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
test('ETH materials record a distinct dated disclosure, not a model release or consensus', () => {
 const e = ethEvents[0];
 assert.equal(events.filter(x => x.id === e.id).length, 1);
 assert.equal(e.date, '2026-10-27'); assert.equal(e.kind, '研究材料公开'); assert.equal(e.milestone, true);
 assert.deepEqual(e.entityIds, []); assert.deepEqual(e.tracks, ['methods']);
 assert.match(e.dateLabel!, /仓库合并/); assert.match(e.limitation, /未运行 Lean/);
 assert.match(e.summary, /不等于.*学界公认/);
 assert.match(e.limitation, /不据此宣布 P=NP/);
 assert.match(JSON.stringify(e), /内部研究 Claude/);
});
test('ETH details retain source locators, exact revision and semantic verification limits', () => {
 const e = ethEvents[0];
 assert.ok(e.details?.every(d => d.sourceIds?.length && d.locator));
 assert.equal(e.details?.filter(d => d.editorial).length, 1);
 assert.ok(ethSources.every(s => s.checkedAt === '2026-10-27' && s.version === '16a5ce41304fcdaea4e0be7c132e1c361dc26da5'));
 assert.ok(ethSources.slice(1).every(s => s.url.includes(s.version!)));
 assert.match(JSON.stringify(e.details), /输入重写/); assert.match(JSON.stringify(e.details), /并不属于/);
 assert.ok(e.recommendedResources?.every(r => r.creator && r.match && r.scopeNote && r.locator));
});
test('ETH full evidence and readings remain outside compact client index', () => {
 const payload = JSON.stringify(createExplorerPayload(aiCatalog));
 assert.ok(payload.includes(ethEvents[0].id));
 assert.ok(!payload.includes('anthropic-eth-reading-guide'));
 assert.ok(!payload.includes('边界：机型、输入约束与未形式化环节'));
});
