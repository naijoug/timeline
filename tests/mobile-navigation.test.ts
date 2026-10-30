import test from 'node:test';
import assert from 'node:assert/strict';
import { restoreMobileExplorer, eventRecordHref, safeTimelineReturn, mobileTimelineReturn } from '../src/core/mobile-navigation';
import { explorerEvents, explorerQuery } from '../src/core/explorer';
import { catalogBounds } from '../src/core/catalog';
import { aiCatalog } from '../src/topics/ai/adapter';
import { aiExplorerPresentation } from '../src/topics/ai/explorer';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { writersCatalog } from '../src/topics/writers/catalog';

test('mobile starts with a full vertical chronology, never an automatically opened overlay', () => {
  for (const catalog of [aiCatalog, chinaHistory, programmingLanguages, writersCatalog]) {
    const presentation = catalog === aiCatalog ? aiExplorerPresentation() : {};
    const state = restoreMobileExplorer('', catalog, '', '', presentation);
    assert.deepEqual([state.from, state.to], catalogBounds(catalog));
    assert.equal(state.selected, '');
    assert.ok(explorerEvents(catalog, state, presentation).length > 0);
  }
});
test('mobile respects legacy AI filters and explicit windows while closing the inline reader', () => {
  const state = restoreMobileExplorer('?from=2023&to=2025&scope=china&lane=models&all=1&q=Qwen&event=qwen-3', aiCatalog, '', '', aiExplorerPresentation());
  assert.equal(state.from, 2023); assert.equal(state.to, 2025);
  assert.equal(state.scope, 'china'); assert.equal(state.category, 'models');
  assert.equal(state.q, 'Qwen'); assert.equal(state.all, true); assert.equal(state.selected, '');
  assert.ok(explorerEvents(aiCatalog, state, aiExplorerPresentation()).some(e => e.id === 'qwen-3'));
});
test('period detail retains its bounded chronology and return query state', () => {
  const state = restoreMobileExplorer('', chinaHistory, 'tang');
  assert.equal(state.period, 'tang');
  assert.ok(state.from > catalogBounds(chinaHistory)[0]);
  assert.deepEqual(restoreMobileExplorer(explorerQuery(state), chinaHistory, 'tang'), state);
});
test('full event links retain aliases, existing queries, nested return filters, and event anchors', () => {
  const back = '/timeline/ai/?from=1943&to=2026&lane=models&q=Kimi&event=#event-kimi';
  const href = eventRecordHref('/timeline/ai/models/kimi/kimi-k3/?x=1#sources', back);
  const url = new URL(href, 'https://naijoug.github.io');
  assert.equal(url.pathname, '/timeline/ai/models/kimi/kimi-k3/');
  assert.equal(url.searchParams.get('x'), '1');
  assert.equal(url.searchParams.get('return'), back);
  assert.equal(url.hash, '#sources');
});
test('return links are local, topic-scoped explorer URLs, including project base paths', () => {
  const origin = 'https://naijoug.github.io', prefix = '/timeline/ai/';
  for (const unsafe of ['https://evil.example/timeline/ai/', '/timeline/writers/', '//evil.example/', '/timeline/ai/events/llama-2/', '/timeline/ai/events/llama-2', '/timeline/ai/models/llama/llama-2/', '/timeline/ai/models/llama/llama-2']) {
    assert.equal(safeTimelineReturn(unsafe, origin, prefix), null);
  }
  assert.equal(safeTimelineReturn('/timeline/ai/models/?q=Kimi', origin, prefix), '/timeline/ai/models/?q=Kimi');
  assert.equal(safeTimelineReturn('/timeline/ai/?q=Kimi&event=#event-kimi', origin, prefix), '/timeline/ai/?q=Kimi&event=#event-kimi');
  assert.equal(safeTimelineReturn('/timeline/china-history/dynasties/tang/?category=all', origin, '/timeline/china-history/'), '/timeline/china-history/dynasties/tang/?category=all');
});

test('a desktop detail return shared to a phone closes the reader instead of redirecting in a loop', () => {
  const desktopReturn = '/timeline/ai/?from=2023&to=2025&lane=models&event=llama-2';
  const mobileReturn = mobileTimelineReturn(desktopReturn);
  const url = new URL(mobileReturn, 'https://naijoug.github.io');
  assert.equal(url.searchParams.get('event'), '');
  assert.equal(url.searchParams.get('lane'), 'models');
  assert.equal(url.hash, '#event-llama-2');
  assert.equal(mobileTimelineReturn(mobileReturn), mobileReturn);
});
