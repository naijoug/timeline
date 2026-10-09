import test from 'node:test';
import assert from 'node:assert/strict';
import { events } from '../src/topics/ai/events';
import { entities } from '../src/topics/ai/entities';
import { sources } from '../src/topics/ai/sources';
import { releaseEvents, releaseSources, releaseResearchDate } from '../src/topics/ai/releases';
import { defaultAtlas, eventLane, filterAtlas, clusterEvents } from '../src/lib/atlas';

test('version baselines point backwards within a shared model family', () => {
  const byId = new Map(events.map(e => [e.id, e]));
  const families = new Set(entities.filter(e => e.type === 'family').map(e => e.id));
  for (const event of releaseEvents) {
    assert.ok(event.date <= releaseResearchDate, `future event: ${event.id}`);
    if (!event.change?.baselineEventId) continue;
    const baseline = byId.get(event.change.baselineEventId)!;
    assert.ok(baseline.date < event.date, `${event.id} -> ${baseline.id}`);
    assert.ok(event.entityIds.some(id => families.has(id) && baseline.entityIds.includes(id)), `${event.id}: unrelated baseline`);
  }
});

test('release dates retain the distinction between snapshot, paper, announcement and availability', () => {
  const byId = new Map(events.map(e => [e.id, e]));
  for (const [id, date, kind] of [
    ['opus-4-5', '2025-11-24', '模型发布'],
    ['deepseek-v3-0324', '2025-03-25', '模型发布'],
    ['kimi-k1-5-paper', '2025-01-22', '论文首发'],
    ['qwen-3-5', '2026-02-16', '权重开放'],
    ['gpt-5-3-codex-api', '2026-02-24', 'API 开放'],
    ['replit-agent-first', '2024-09', '产品发布'],
    ['manus-browser-operator', '2025-11-18', '产品公告'],
  ]) {
    const event = byId.get(id)!;
    assert.equal(event.date, date, id);
    assert.equal(event.kind, kind, id);
  }
});

test('full history and dense clusters expose every newly researched model and agent', () => {
  const state = { ...defaultAtlas(), from: 1943, to: 2026, all: true };
  const visible = filterAtlas(events, state);
  assert.equal(visible.length, events.length);
  for (const lane of ['models', 'products'] as const) {
    const records = visible.filter(e => eventLane(e) === lane);
    for (const width of [160, 360, 760, 1200]) {
      const flattened = clusterEvents(records, 1943, 2026, width).flatMap(c => c.events.map(e => e.id));
      assert.deepEqual(flattened, records.map(e => e.id));
    }
  }
  for (const event of releaseEvents) {
    assert.equal(eventLane(event), event.tracks[0], event.id);
    assert.ok(visible.some(e => e.id === event.id), event.id);
  }
  const china = filterAtlas(events, { ...state, scope: 'china' });
  for (const id of ['qwen-code', 'autoglm-paper', 'trae-solo', 'seed-2', 'wan-2-1', 'kimi-agent-swarm']) assert.ok(china.some(e => e.id === id), id);
  assert.ok(!china.some(e => e.id === 'exaone-3'));
});

test('model and application releases share evidence without duplicating source pages', () => {
  assert.equal(new Set(releaseSources.map(s => s.url)).size, releaseSources.length);
  const knownSources = new Set(sources.map(s => s.id));
  for (const event of releaseEvents) {
    assert.equal(new Set(event.sourceIds).size, event.sourceIds.length);
    assert.ok(event.sourceIds.every(id => knownSources.has(id)), event.id);
  }
  for (const [model, product] of [['qwen-3-coder', 'qwen-code'], ['devstral-2', 'mistral-vibe'], ['kimi-k2-5', 'kimi-agent-swarm']]) {
    const a = events.find(e => e.id === model)!, b = events.find(e => e.id === product)!;
    assert.equal(a.announcementGroup, b.announcementGroup);
    assert.deepEqual(a.sourceIds, b.sourceIds);
    assert.notEqual(eventLane(a), eventLane(b));
  }
});
