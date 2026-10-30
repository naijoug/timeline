import test from 'node:test';
import assert from 'node:assert/strict';
import { genieEvents, genieSources } from '../src/topics/ai/genie4-preview';
import { events } from '../src/topics/ai/events';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { isKeyEvent } from '../src/topics/ai/config';

test('Genie 4 enters the important timeline once as a restricted research preview', () => {
 const e = genieEvents[0];
 assert.equal(events.filter(x => x.id === e.id).length, 1);
 assert.equal(e.date, '2026-10-27'); assert.equal(e.kind, '研究预览'); assert.ok(isKeyEvent(e));
 assert.match(e.limitation, /即将开放/); assert.match(e.limitation, /不代表公开 API 或权重已可用/);
 assert.ok(genieSources.every(s => s.checkedAt === '2026-10-27'));
 assert.equal(e.details?.filter(s => s.editorial).length, 1);
 assert.ok(e.details?.every(s => s.sourceIds?.length && s.locator));
});
test('Genie distinguishes staged demonstrations from real-world success and keeps detail off the client index', () => {
 const e = genieEvents[0], text = JSON.stringify(e);
 assert.match(text, /数分钟/); assert.match(text, /片段经过缩短/);
 assert.match(text, /不是现实机器人已完成/); assert.match(text, /不是独立安全认证/);
 assert.ok(e.recommendedResources?.every(r => r.creator && r.match && r.scopeNote));
 const payload = JSON.stringify(createExplorerPayload(aiCatalog));
 assert.ok(payload.includes(e.id)); assert.ok(!payload.includes('genie4-release-reading'));
 assert.ok(!payload.includes('边界：可探索不等于可靠数字孪生'));
});
