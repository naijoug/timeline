import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { selectFilterPeriod, clearExplorerFilters, applyFilterYears } from '../src/core/filter-controls';
import { catalogBounds } from '../src/core/catalog';
import { civilYear } from '../src/core/time';
import { restoreReadingExplorer, readingExplorerQuery } from '../src/core/mobile-navigation';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';

test('period changes preserve independent filters and ordering, replace stale year range', () => {
  const state = { ...restoreReadingExplorer('', chinaHistory), q: '制度', category: 'politics', scope: 'chosen', all: true, order: 'desc' as const };
  const next = selectFilterPeriod(chinaHistory, state, 'tang');
  assert.equal(next.period, 'tang');
  for (const key of ['q', 'category', 'scope', 'all', 'order'] as const) assert.equal(next[key], state[key]);
  assert.ok(next.from > state.from);
  const restored = restoreReadingExplorer(readingExplorerQuery(next), chinaHistory);
  assert.equal(restored.period, 'tang');
  assert.equal(restored.q, state.q);
  assert.deepEqual([restored.from, restored.to], [next.from, next.to]);
  assert.deepEqual([selectFilterPeriod(chinaHistory, next, '').from, selectFilterPeriod(chinaHistory, next, '').to], catalogBounds(chinaHistory));
});
test('clear all really clears search and facets while retaining selected reading order', () => {
  const state = { ...restoreReadingExplorer('?q=Python&category=language&all=1&order=desc', programmingLanguages), scope: 'scope', period: 'period' };
  const clear = clearExplorerFilters(programmingLanguages, state);
  assert.equal(clear.q, ''); assert.equal(clear.category, ''); assert.equal(clear.scope, ''); assert.equal(clear.period, '');
  assert.equal(clear.all, true); assert.equal(clear.order, 'desc');
  assert.equal(clearExplorerFilters(programmingLanguages, state, true).q, 'Python');
});
test('year shortcuts keep unrelated choices, clear conflicting period and use coordinate arithmetic', () => {
  const state = { ...restoreReadingExplorer('', chinaHistory), period: 'tang', q: '文字', all: true };
  const next = applyFilterYears(chinaHistory, state, 5);
  assert.equal(next.to - next.from, 4); assert.equal(next.period, ''); assert.equal(next.q, '文字'); assert.equal(next.all, true);
  const full = applyFilterYears(chinaHistory, next);
  assert.deepEqual([full.from, full.to], catalogBounds(chinaHistory));
  assert.ok(civilYear(full.from) < 0);
});
test('filters expose removable chips, clear semantics, panel status and focus return', () => {
  const source = readFileSync(new URL('../src/components/timeline/Explorer.tsx', import.meta.url), 'utf8');
  assert.match(source, /aria-label={`移除\$\{filter.label\}筛选`}/);
  assert.match(source, /className="filter-clear-all" onClick={resetFilters}>清除全部/);
  assert.match(source, /filterTrigger.current\?\.focus\({ preventScroll: true }\)/);
  assert.match(source, /onChange={e => changePeriod\(e.target.value\)}/);
  assert.match(source, /initialPeriod && next.period !== initialPeriod/);
  assert.doesNotMatch(source, /className="filter-zoom"/);
});
