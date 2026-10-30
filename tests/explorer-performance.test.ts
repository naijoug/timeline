import test from 'node:test';
import assert from 'node:assert/strict';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { payloadJson } from '../src/core/payload-json';
import { aiViewQuery } from '../src/core/ai-view-state';
import { aiCatalog } from '../src/topics/ai/adapter';
import { aiExplorerPresentation } from '../src/topics/ai/explorer';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { languagePresentation } from '../src/topics/programming-languages/presentation';
import { writersCatalog } from '../src/topics/writers/catalog';
import { writersPresentation } from '../src/topics/writers/presentation';
import { restoreReadingExplorer, readingExplorerQuery, readingExplorerEvents } from '../src/core/mobile-navigation';
import type { Catalog } from '../src/core/types';
import type { ExplorerPresentation } from '../src/core/explorer';
import { explorerQuery, restoreExplorer } from '../src/core/explorer';

const topics: readonly [Catalog, ExplorerPresentation][] = [[aiCatalog, aiExplorerPresentation()], [chinaHistory, {}], [programmingLanguages, languagePresentation], [writersCatalog, writersPresentation]];

test('compact JSON indexes keep every searchable event, summary, time, source count, custom alias and period source', () => {
  for (const [catalog, presentation] of topics) {
    const payload = JSON.parse(payloadJson(createExplorerPayload(catalog, presentation)));
    assert.equal(payload.catalog.events.length, catalog.events.length);
    for (const [i, event] of catalog.events.entries()) {
      const compact = payload.catalog.events[i];
      for (const key of ['id', 'title', 'summary', 'time', 'tags', 'entityIds', 'periodIds', 'sourceIds', 'category', 'milestone'] as const) assert.deepEqual(compact[key], event[key]);
      for (const key of ['details', 'significance', 'facts', 'change', 'note', 'recommendedResources']) assert.equal(key in compact, false);
      const fullPresentation = presentation.events?.[event.id];
      for (const key of ['title', 'metadata', 'dateLabel', 'href'] as const) assert.equal(payload.presentation.events?.[event.id]?.[key], fullPresentation?.[key]);
    }
    for (const period of catalog.periods) for (const id of period.sourceIds) {
      const source = payload.catalog.sources.find((source: {id:string}) => source.id === id);
      assert.equal(source.url, catalog.sources.find(source => source.id === id)!.url);
    }
    assert.equal(JSON.stringify(payload).includes('"readState"'), false);
    assert.equal(JSON.stringify(payload).includes('"serializeState"'), false);
  }
});

test('full and serialized compact views agree for search, order, scopes, categories, periods and ranges', () => {
  for (const [catalog, presentation] of topics) {
    const payload = JSON.parse(payloadJson(createExplorerPayload(catalog, presentation)));
    const defaults = restoreReadingExplorer('', catalog, '', '', presentation);
    const variants = [defaults, {...defaults, all:true}, {...defaults, order:'desc' as const},
      ...['Kimi', 'Ｑｗｅｎ', 'Python', '唐', '三体', '不存在的内容'].map(q => ({...defaults, all:true, q})),
      ...catalog.topic.categories.map(category => ({...defaults, category:category.id, all:true})),
      ...catalog.periods.map(period => ({...defaults, period:period.id, all:true})),
      ...(presentation.scopes || []).map(scope => ({...defaults, scope:scope.id, all:true})),
      {...defaults, from:defaults.to, to:defaults.to, all:true}];
    for (const state of variants) assert.deepEqual(
      readingExplorerEvents(payload.catalog, state, payload.presentation).map(event => event.id),
      readingExplorerEvents(catalog, state, presentation).map(event => event.id), `${catalog.topic.id}: ${JSON.stringify(state)}`);
  }
});

test('data-free AI parser and serializer exactly preserve old lane/year/empty-event/level links after JSON round trip', () => {
  const presentation = aiExplorerPresentation();
  const payload = JSON.parse(payloadJson(createExplorerPayload(aiCatalog, presentation)));
  const searches = ['', '?event=', '?event=kimi-k3-1-pro&lane=models&scope=china&level=all', '?from=0000&to=9999', '?from=2026&to=2023', '?from=-221&to=20266&lane=invalid', '?all=1&q=Qwen&order=asc', '?lane=all', '?lane=methods&scope=world', '?category=models&scope=bad&level=all'];
  for (const category of ['', 'all', 'methods', 'models', 'products']) for (const search of searches) {
    assert.deepEqual(restoreExplorer(search, payload.catalog, '', category, payload.presentation), restoreExplorer(search, aiCatalog, '', category, presentation));
    const actual = restoreReadingExplorer(search, payload.catalog, '', category, payload.presentation);
    const expected = restoreReadingExplorer(search, aiCatalog, '', category, presentation);
    assert.deepEqual(actual, expected);
    assert.equal(readingExplorerQuery(actual, aiViewQuery), readingExplorerQuery(expected, presentation.serializeState || explorerQuery));
  }
});

test('JSON data cannot close its script, execute markup or change text on reserialization', () => {
  const input = { text:'</script><script>alert(1)</script>&"\u2028\u2029', nested:{ value:'中文 < >' } };
  const encoded = payloadJson(input);
  assert.ok(!encoded.includes('<'));
  assert.deepEqual(JSON.parse(encoded), input);
  assert.equal(payloadJson(JSON.parse(encoded)), encoded);
});
