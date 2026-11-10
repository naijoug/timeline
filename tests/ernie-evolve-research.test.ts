import test from 'node:test';
import assert from 'node:assert/strict';
import { ernieEvolveEntities, ernieEvolveEvents, ernieEvolveSources } from '../src/topics/ai/ernie-evolve-research';

test('ERNIE Evolve remains a day-dated research disclosure, not a model launch', () => {
  assert.equal(ernieEvolveEvents.length, 1);
  const event = ernieEvolveEvents[0];
  assert.equal(event.date, '2026-11-09');
  assert.match(event.dateLabel!, /研究披露日期/);
  assert.deepEqual(event.tracks, ['methods']);
  assert.equal(event.kind, '研究系统公开');
  assert.equal(event.milestone, false);
  assert.equal(event.change, undefined);
  assert.match(event.limitation, /不是 API、完整系统或模型权重发布/);
  assert.match(event.limitation, /ERNIE-5\.5-Flash 仍在开发中/);
});

test('ERNIE Evolve separates author evaluation, result artifacts and editorial analysis', () => {
  const event = ernieEvolveEvents[0];
  assert.ok(event.details!.length <= 5);
  const text = event.details!.map(section => section.text).join('\n');
  assert.match(text, /外层选择研究方向，内层修改、测试/);
  assert.match(text, /作者系统内部的独立评估程序，不是第三方复现/);
  assert.match(text, /不等于开放完整研究系统、API 或模型权重/);
  assert.match(event.limitation, /性能为作者报告.*未经本项目复测.*未核实第三方复现/);
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  assert.match(event.details!.find(section => section.editorial)!.text, /不能推出开放式递归自我改进已经实现/);
});

test('ERNIE Evolve local candidate has resolvable citations and concrete reading entry points', () => {
  const sources = new Set(ernieEvolveSources.map(source => source.id));
  const entities = new Set(ernieEvolveEntities.map(entity => entity.id));
  const event = ernieEvolveEvents[0];
  assert.ok(event.entityIds.every(id => entities.has(id)));
  assert.ok(event.sourceIds.every(id => sources.has(id)));
  assert.ok(ernieEvolveEntities.every(entity => entity.sourceIds.every(id => sources.has(id))));
  for (const section of event.details!) {
    assert.ok(section.locator && section.sourceIds?.length);
    assert.ok(section.sourceIds!.every(id => sources.has(id)));
  }
  assert.ok(ernieEvolveSources.every(source => source.checkedAt === '2026-11-10' && source.locator));
  assert.equal(ernieEvolveSources[0].publishedAt, '2026-11-09');
  assert.equal(ernieEvolveSources[1].publishedAt, undefined);
  assert.equal(event.recommendedResources!.length, 2);
  for (const resource of event.recommendedResources!) {
    assert.ok(resource.creator && resource.series && resource.match && resource.scopeNote && resource.locator);
    assert.ok(ernieEvolveSources.some(source => source.url === resource.url));
  }
});
