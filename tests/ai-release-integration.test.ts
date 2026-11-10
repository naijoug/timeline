import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { entities, relations } from '../src/topics/ai/entities';
import { validateCatalog as validateAI } from '../src/topics/ai/validate';
import { aiCatalog } from '../src/topics/ai/adapter';
import { timelineEvents } from '../src/core/timelines';
import { validateCatalog } from '../src/core/validate';
import { eventLane, isKeyEvent, chinaCompanies } from '../src/topics/ai/config';

test('cumulative release data preserves Hy4, Kimi and GPT-6 Cyber nodes', () => {
  assert.equal(events.length, 318);
  assert.equal(sources.length, 404);
  assert.equal(new Set(events.map(event => event.id)).size, events.length);
  assert.equal(new Set(sources.map(source => source.id)).size, sources.length);
  const models = timelineEvents(aiCatalog, ['ai-model-iterations']);
  assert.equal(models.length, 205);
  for (const id of ['tencent-hy4-release', 'kimi-k3-1-pro-weights-confirmed', 'gpt-6-cyber-restricted-release', 'ernie-5-5-flash-base', 'gemini-omni-1-2-flash-ga', 'openai-images-2-6-release', 'muse-ember-release', 'seedream-5-5-release']) {
    assert.equal(models.filter(event => event.id === id).length, 1);
  }
  assert.equal(events.filter(event => eventLane(event) === 'models').length, 188);
  assert.equal(events.filter(event => eventLane(event) === 'models' && chinaCompanies.has(event.company || '')).length, 78);
  for (const id of ['baidu-ernie-evolve-research', 'nvidia-groot2-research']) {
    assert.equal(events.filter(event => event.id === id).length, 1);
  }
  assert.equal(models.filter(event => event.id === 'nvidia-groot2-research').length, 1);
  assert.ok(!models.some(event => event.id === 'baidu-ernie-evolve-research'));
  assert.equal(eventLane(events.find(event => event.id === 'baidu-ernie-evolve-research')!), 'methods');
  const main = timelineEvents(aiCatalog, ['ai-milestones']);
  for (const id of ['baidu-ernie-evolve-research', 'nvidia-groot2-research']) {
    assert.ok(!main.some(event => event.id === id));
  }
  assert.deepEqual(validateCatalog(aiCatalog), []);
  assert.deepEqual(validateAI(events, entities, sources, relations), []);
});

test('generated coverage preserves the distinction between Kimi announcement and confirmation', () => {
  const generator = readFileSync(new URL('../scripts/ai-coverage.ts', import.meta.url), 'utf8');
  const report = readFileSync(new URL('../docs/ai-coverage.md', import.meta.url), 'utf8');
  assert.ok(report.includes(`当前工作区共 ${events.length} 个事件、${entities.length} 个对象、${sources.length} 份来源`));
  const modelEvents = events.filter(event => eventLane(event) === 'models');
  assert.ok(report.includes(`| 模型演进 | ${modelEvents.length} | ${modelEvents.filter(isKeyEvent).length} | ${modelEvents.filter(event => chinaCompanies.has(event.company || '')).length} |`));
  for (const text of [generator, report]) {
    assert.match(text, /当时的完整权重预告保留为历史快照/);
    assert.match(text, /不推断首次公开日/);
    assert.match(text, /不代表完整下载或推理验证/);
    assert.ok(!text.includes('完整权重计划于 11 月 4 日前发布，不记录为已经开放。'));
  }
});
