import test from 'node:test';
import assert from 'node:assert/strict';
import { agenticWorkflowEvents, agenticWorkflowSources } from '../src/topics/ai/agentic-workflows-ga';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
test('Agentic Workflows records GA without claiming free inference or a new model', () => {
 const e = agenticWorkflowEvents[0];
 assert.equal(e.date, '2026-10-28'); assert.ok(e.milestone);
 assert.deepEqual(e.tracks, ['products']); assert.match(e.summary, /不是新模型/);
 assert.match(e.limitation, /Copilot许可/); assert.match(e.limitation, /未安装/);
 assert.match(e.dateLabel!, /未取得发布小时/);
 assert.ok(e.details?.every(x => x.sourceIds?.length && x.locator));
 assert.equal(e.details?.filter(x => x.editorial).length, 1);
});
test('workflow sources integrate once and deep reading stays out of the client index', () => {
 const e = agenticWorkflowEvents[0];
 assert.equal(events.filter(x => x.id === e.id).length, 1);
 for (const s of agenticWorkflowSources) assert.equal(sources.filter(x => x.id === s.id).length, 1);
 const payload = JSON.stringify(createExplorerPayload(aiCatalog));
 assert.ok(payload.includes(e.id));
 assert.ok(!payload.includes('使用条件：先审配置，再看运行结果'));
 assert.ok(!payload.includes('agentic-workflows-quickstart-reading'));
});
