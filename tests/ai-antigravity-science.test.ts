import test from 'node:test';
import assert from 'node:assert/strict';
import { antigravityScienceEvents, antigravityScienceSources, antigravityScienceEntities } from '../src/topics/ai/antigravity-science';
import { aiCatalog } from '../src/topics/ai/adapter';
import { aiPresentation, eventLane } from '../src/topics/ai/config';
import { events } from '../src/topics/ai/events';
import { createExplorerPayload } from '../src/core/explorer-payload';

const event = antigravityScienceEvents[0];
test('Antigravity science records a day-level workflow release, not a model launch', () => {
  assert.equal(event.date, '2026-11-03');
  assert.match(event.dateLabel!, /仅日精度/);
  assert.equal(eventLane(event), 'methods');
  assert.deepEqual(event.tracks, ['methods']);
  assert.equal(event.change, undefined);
  assert.match(event.summary, /Science 插件.*不是新模型/);
  assert.match(event.details![0].text, /企业用户/);
  assert.ok(!JSON.stringify(event).includes('17:01'));
  assert.equal(aiPresentation.latestEvent, [...events].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id)).at(-1)!.id);
});

test('Antigravity science keeps deterministic tools and experimental validation explicit', () => {
  assert.match(event.details![1].text, /RDKit.*确定性.*ChEMBL.*PubChem/);
  assert.match(event.limitation, /未安装插件或运行工作流/);
  assert.match(event.limitation, /须合成并经实验验证/);
  assert.match(event.details![2].text, /待检验的假设/);
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  assert.ok(event.details!.every(section => section.sourceIds?.length && section.locator));
  assert.ok(antigravityScienceSources.every(source => source.publishedAt === event.date && source.checkedAt === '2026-11-03'));
});

test('Antigravity science integrates exactly once with selected timelines and a lean client payload', () => {
  assert.equal(aiCatalog.events.filter(item => item.id === event.id).length, 1);
  for (const source of antigravityScienceSources) assert.equal(aiCatalog.sources.filter(item => item.id === source.id).length, 1);
  for (const entity of antigravityScienceEntities) assert.equal(aiCatalog.entities.filter(item => item.id === entity.id).length, 1);
  for (const id of ['ai-milestones', 'ai-agent-products']) {
    assert.equal(aiCatalog.timelines!.find(item => item.id === id)!.entries.filter(item => item.eventId === event.id).length, 1);
  }
  assert.ok(!aiCatalog.timelines!.find(item => item.id === 'ai-model-iterations')!.entries.some(item => item.eventId === event.id));
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(event.id));
  assert.ok(!payload.includes('边界：候选仍要回到实验'));
  assert.ok(!payload.includes('antigravity-cheminformatics-reading'));
});
