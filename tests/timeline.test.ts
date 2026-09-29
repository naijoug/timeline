import test from 'node:test';
import assert from 'node:assert/strict';
import { events } from '../src/data/events';
import { entities, relations } from '../src/data/entities';
import { sources } from '../src/data/sources';
import { validateCatalog } from '../src/lib/validate';
import { defaultFilters, displayDate, filterQuery, readFilters, selectEvents } from '../src/lib/timeline';

test('entire content graph has valid dates, evidence, and references', () => assert.deepEqual(validateCatalog(events, entities, sources, relations), []));
test('validator rejects nonexistent evidence and impossible dates', () => {
  const broken = { ...events[0], date: '2025-02-30', sourceIds: ['missing-source'] };
  const errors = validateCatalog([broken], entities, sources, relations);
  assert.ok(errors.some(e => e.includes('invalid date'))); assert.ok(errors.some(e => e.includes('unknown reference')));
});
test('date precision is preserved without fabricated days', () => {
  assert.equal(displayDate({ date: '1956' }), '1956 年'); assert.equal(displayDate({ date: '2026-09' }), '2026 年 9 月'); assert.equal(displayDate({ date: '1956', dateLabel: '1956 年夏' }), '1956 年夏');
});
test('shareable query restores combined state and strips invalid years', () => {
  const state = { ...defaultFilters('products'), q: 'Claude Code', from: '2025', to: '2026', company: 'Anthropic', order: 'desc' as const, entity: 'claude-code' };
  assert.deepEqual(readFilters(filterQuery(state, 'products'), 'products'), state);
  assert.equal(readFilters('?from=hello&to=2026', 'history').from, '');
});
test('filters combine track, date range, company, and entity', () => {
  const result = selectEvents(events, 'products', { ...defaultFilters('products'), from: '2025', to: '2025', entity: 'claude-code', company: 'Anthropic' });
  assert.ok(result.some(e => e.id === 'claude-code-preview')); assert.ok(result.some(e => e.id === 'claude-code-ga')); assert.ok(result.every(e => e.tracks.includes('products') && e.entityIds.includes('claude-code')));
});
test('search handles English case, entity names, and empty results', () => {
  const names = Object.fromEntries(entities.map(e => [e.id,e.name]));
  assert.ok(selectEvents(events, 'models', { ...defaultFilters('models'), q: 'SONNET' }, names).length > 3);
  assert.equal(selectEvents(events, 'history', { ...defaultFilters('history'), q: 'does-not-exist-xyz' }, names).length, 0);
});
test('reversed date range is empty and sort reverses consistently', () => {
  assert.equal(selectEvents(events, 'history', { ...defaultFilters('history'), from: '2026', to: '1943' }).length, 0);
  const asc = selectEvents(events, 'models', defaultFilters('models'));
  const desc = selectEvents(events, 'models', { ...defaultFilters('models'), order: 'desc' });
  assert.deepEqual(desc.map(e => e.id), asc.map(e => e.id).reverse());
});
test('same announcement retains separate product and model events', () => {
  const same = events.filter(e => e.announcementGroup === 'claude-may-2025');
  assert.ok(same.some(e => e.tracks.includes('models'))); assert.ok(same.some(e => e.id === 'claude-code-ga'));
});
