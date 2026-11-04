import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { historicalMapPeriodEvents } from '../src/topics/china-history/historical-maps';
import { createExplorerPayload } from '../src/core/explorer-payload';
test('Battle maps enter the appropriate dynasty reading notes without implying territory', () => {
  assert.deepEqual(historicalMapPeriodEvents['eastern-han'], ['guandu']);
  assert.deepEqual(historicalMapPeriodEvents['eastern-jin'], ['feishui']);
  assert.deepEqual(historicalMapPeriodEvents['sixteen-kingdoms'], ['feishui']);
  assert.equal(historicalMapPeriodEvents.wei, undefined);
  assert.equal(historicalMapPeriodEvents['western-jin'], undefined);
  for (const [period, eventIds] of Object.entries(historicalMapPeriodEvents)) {
    assert.ok(chinaHistory.periods.some(p => p.id === period));
    for (const id of eventIds) {
      const event = chinaHistory.events.find(e => e.id === id)!;
      assert.ok(event.maps?.length);
      for (const map of event.maps!) {
        assert.ok(map.sourceIds.every(sourceId => chinaHistory.sources.some(s => s.id === sourceId)));
        assert.ok(!JSON.stringify(createExplorerPayload(chinaHistory)).includes(map.assetPath));
      }
    }
  }
});
