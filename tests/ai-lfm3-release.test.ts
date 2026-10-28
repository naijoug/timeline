import test from 'node:test';
import assert from 'node:assert/strict';
import { lfm3Events, lfm3Sources } from '../src/topics/ai/lfm3-release';
import { events } from '../src/topics/ai/events';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { isKeyEvent } from '../src/topics/ai/config';
test('LFM3 records a verified ordinary weight release, not an unconditional open-source milestone', () => {
 const e = lfm3Events[0]; assert.equal(events.filter(x => x.id === e.id).length, 1);
 assert.equal(e.date, '2026-10-27'); assert.equal(isKeyEvent(e), false);
 assert.match(e.limitation, /商业使用门槛/); assert.match(e.limitation, /未下载完整权重或执行推理/);
 assert.ok(lfm3Sources.find(s => s.id === 'lfm3-weight-files')?.url.includes('40ebe0aa6662c9d40389c2f5d565b6a2c6aebacd'));
 assert.equal(e.details?.filter(s => s.editorial).length, 1);
 assert.ok(e.details?.every(s => s.sourceIds?.length && s.locator));
});
test('LFM3 preserves modality, workload and memory boundaries without inflating the client index', () => {
 const e = lfm3Events[0], text = JSON.stringify(e);
 assert.match(text, /文本模型/); assert.match(text, /不能当作完整运行内存承诺/);
 assert.match(text, /不推荐用于代理式编码或复杂多步推理/);
 const payload = JSON.stringify(createExplorerPayload(aiCatalog)); assert.ok(payload.includes(e.id));
 assert.ok(!payload.includes('lfm3-release-reading')); assert.ok(!payload.includes('技术：混合模块不是免费长上下文'));
});
