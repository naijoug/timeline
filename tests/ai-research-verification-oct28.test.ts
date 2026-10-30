import test from 'node:test';
import assert from 'node:assert/strict';
import { verificationOct28Events, verificationOct28Sources } from '../src/topics/ai/research-verification-oct28';
import { events } from '../src/topics/ai/events';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { isKeyEvent } from '../src/topics/ai/config';
test('CFSG materials preserve self-review, fixed dependencies and independent verification boundaries', () => {
 const e = verificationOct28Events[0]; assert.equal(events.filter(x => x.id === e.id).length, 1);
 assert.equal(e.date, '2026-10-26'); assert.equal(isKeyEvent(e), true);
 assert.match(JSON.stringify(e), /self-assessed/); assert.match(e.limitation, /未运行完整 Lean 构建/);
 assert.ok(verificationOct28Sources.filter(s => s.id.startsWith('axiom') && s.version).every(s => s.url.includes('69cb972f587a3ecc035e092253167ff2e303c962')));
 assert.equal(e.recommendedResources?.[0].publishedAt, '2026-10-27');
});
test('AA index refresh distinguishes versions and does not become a model milestone', () => {
 const e = verificationOct28Events[1]; assert.equal(e.date, '2026-10-27'); assert.equal(isKeyEvent(e), false);
 assert.match(e.limitation, /新旧 Intelligence Index 分数不能直接相减/);
 assert.match(events.find(x => x.id === 'aa-frontiercode-leaderboard')!.limitation, /1.1.*2.0/);
 assert.match(JSON.stringify(events.find(x => x.id === 'kimi-k3-1-pro')), /2026年10月24日核查/);
 for (const item of verificationOct28Events) {
   assert.equal(item.details?.filter(s => s.editorial).length, 1);
   assert.ok(item.details?.every(s => s.sourceIds?.length && s.locator));
 }
 const payload = JSON.stringify(createExplorerPayload(aiCatalog));
 assert.ok(payload.includes(e.id)); assert.ok(!payload.includes('axiom-ugt-preprint-reading'));
 assert.ok(!payload.includes('方法：四类能力等权'));
});
