import test from 'node:test';
import assert from 'node:assert/strict';
import { roboticsErEvents, roboticsErSources } from '../src/topics/ai/robotics-er2-cloud';
import { events } from '../src/topics/ai/events';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { isKeyEvent } from '../src/topics/ai/config';
test('robotics cloud preview preserves original announcement and channel boundaries', () => {
 const e=roboticsErEvents[0]; assert.equal(events.filter(x=>x.id===e.id).length,1);
 assert.equal(e.date,'2026-10-27'); assert.equal(isKeyEvent(e),false);
 assert.equal(roboticsErSources[0].publishedAt,'2026-07-30');
 assert.match(e.limitation,/不是 GA 或权重开放/);
 assert.match(JSON.stringify(e.details),/Gemini Live、Interactions、Chat Completions 均为不支持/);
 assert.equal(e.details?.filter(x=>x.editorial).length,1);
 assert.ok(e.details?.every(x=>x.sourceIds?.length && x.locator));
});
test('mock orchestration reading remains separate and outside lightweight index',()=>{
 const e=roboticsErEvents[0]; assert.match(e.recommendedResources![0].scopeNote,/mock robot API/);
 assert.match(e.recommendedResources![0].scopeNote,/未运行/);
 const payload=JSON.stringify(createExplorerPayload(aiCatalog));
 assert.ok(payload.includes(e.id)); assert.ok(!payload.includes('robotics-er2-task-orchestration-guide'));
});
