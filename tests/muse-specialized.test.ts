import test from 'node:test';
import assert from 'node:assert/strict';
import { museSpecializedEvents, museSpecializedSources } from '../src/topics/ai/muse-specialized';
import { events } from '../src/topics/ai/events';
import { aiTimelines } from '../src/topics/ai/timelines';
const event = museSpecializedEvents[0];
test('Muse specialized rollout is dated by UTC and is not a new model release', () => {
  assert.equal(event.date, '2026-11-06');
  assert.deepEqual(event.tracks, ['products']);
  assert.equal(event.milestone, false);
  assert.equal(event.change, undefined);
  assert.match(event.limitation, /API.*权重/);
  assert.match(museSpecializedSources[1].version!, /2026-11-06T18:14:23.000Z/);
});
test('Muse rollout is uniquely registered with bounded evidence and concrete reading', () => {
  assert.equal(events.filter(e => e.id === event.id).length, 1);
  assert.ok(aiTimelines.find(t => t.id === 'ai-agent-products')!.entries.some(e => e.eventId === event.id));
  assert.ok(event.details!.some(d => d.editorial));
  assert.ok(event.details!.every(d => d.sourceIds?.length));
  assert.match(event.details!.map(d => d.text).join(' '), /厂商|内部/);
  assert.equal(event.recommendedResources![0].url, museSpecializedSources[0].url);
});
