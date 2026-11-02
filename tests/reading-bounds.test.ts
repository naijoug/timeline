import test from 'node:test';
import assert from 'node:assert/strict';
import { catalogBounds } from '../src/core/catalog';
import { readingBounds } from '../src/core/timelines';
import { applyFilterYears, clearExplorerFilters, filterControlBounds, selectFilterPeriod } from '../src/core/filter-controls';
import { restoreReadingExplorer, readingExplorerEvents, readingExplorerQuery } from '../src/core/mobile-navigation';
import { civilYear, yearCoordinate } from '../src/core/time';
import { writersCatalog as writers } from '../src/topics/writers/catalog';
import { chinaHistory } from '../src/topics/china-history/catalog';
import type { ExplorerCatalog } from '../src/core/types';

const author = 'li-bu-bai';
const initial = () => restoreReadingExplorer('', writers, '', '', {}, author);

test('line defaults and resets use every member, not theme periods or visible results', () => {
  assert.ok(writers.timelines?.some(line => line.id === author));
  const state = initial();
  assert.deepEqual(readingBounds(writers, [author]), [2019, 2024]);
  assert.deepEqual([state.from, state.to], [2019, 2024]);
  const filtered = { ...state, q:'大航海', category:'work', all:false, from:2022, to:2022 };
  assert.deepEqual(readingBounds(writers, filtered.timelineIds), [2019, 2024]);
  const reset = clearExplorerFilters(writers, filtered);
  assert.deepEqual([reset.from, reset.to], [2019, 2024]);
  assert.deepEqual(reset.timelineIds, [author]);
  assert.equal(readingExplorerEvents(writers, reset).length, 5);
  assert.deepEqual([applyFilterYears(writers, filtered, 5).from, applyFilterYears(writers, filtered, 5).to], [2020, 2024]);
  assert.deepEqual(readingBounds(writers), catalogBounds(writers));
});

test('merged bounds use the deduplicated member union and do not inherit parent periods', () => {
  const other = writers.timelines!.find(line => line.id !== author && line.entries.some(entry => entry.eventId.includes('liu')))!;
  const ids = [author, other.id];
  const membership = new Set(writers.timelines!.filter(line => ids.includes(line.id)).flatMap(line => line.entries.map(entry => entry.eventId)));
  const expected = catalogBounds({...writers, periods:[], events:writers.events.filter(event => membership.has(event.id))});
  assert.deepEqual(readingBounds(writers, ids), expected);
  assert.deepEqual(readingBounds(writers, [author, author]), [2019, 2024]);
});

test('explicit saved ranges survive even outside a line; missing endpoints do not fabricate matches', () => {
  for (const search of ['?from=1999&to=2026', '?from=2000&to=2001', '?from=2025&to=2026', '?from=2020&to=2022']) {
    const state = restoreReadingExplorer(search, writers, '', '', {}, author);
    const params = new URLSearchParams(search);
    assert.deepEqual([state.from,state.to],[Number(params.get('from')),Number(params.get('to'))]);
    assert.deepEqual(restoreReadingExplorer(readingExplorerQuery(state),writers,'','',{},author),state);
    const [min,max]=filterControlBounds(writers,state);
    assert.ok(min <= state.from && max >= state.to);
  }
  assert.equal(readingExplorerEvents(writers, restoreReadingExplorer('?from=2000&to=2001',writers,'','',{},author)).length,0);
  for (const [search, expected] of [['?from=2025',[2025,2025]],['?to=2001',[2001,2001]],['?from=2020',[2020,2024]],['?to=2022',[2019,2022]]] as const) {
    const state=restoreReadingExplorer(search,writers,'','',{},author);
    assert.deepEqual([state.from,state.to],expected);
  }
  assert.deepEqual([restoreReadingExplorer('?from=0&to=oops',writers,'','',{},author).from,restoreReadingExplorer('?from=0&to=oops',writers,'','',{},author).to],[2019,2024]);
});

test('a nonoverlapping period remains an empty result with a valid range and clear returns to line', () => {
  const state=restoreReadingExplorer('',chinaHistory,'','',{},'idiom-backgrounds');
  const tang=selectFilterPeriod(chinaHistory,state,'tang');
  assert.ok(tang.from<=tang.to);
  assert.equal(readingExplorerEvents(chinaHistory,tang).length,0);
  const reset=selectFilterPeriod(chinaHistory,tang,'');
  assert.deepEqual([reset.from,reset.to],readingBounds(chinaHistory,['idiom-backgrounds']));
  assert.equal(readingExplorerEvents(chinaHistory,reset).length,2);
});

test('BCE, duration, single-year, empty and invalid membership have stable inclusive bounds', () => {
  assert.deepEqual(readingBounds(chinaHistory,['idiom-backgrounds']).map(civilYear),[-207,383]);
  const template=writers.events[0];
  const synthetic:ExplorerCatalog={...writers,events:[
    {...template,id:'cross',time:{kind:'duration',start:{year:-1},end:{year:2}}},
    {...template,id:'single',time:{kind:'point',start:{year:2024,month:2,day:3}}},
  ],timelines:[
    {id:'cross-line',themeId:writers.topic.id,title:'cross',description:'cross',kind:'curated',note:'Synthetic test fixture.',path:'/writers/cross/',entries:[{eventId:'cross',importance:'supporting'}]},
    {id:'single-line',themeId:writers.topic.id,title:'single',description:'single',kind:'curated',note:'Synthetic test fixture.',path:'/writers/single/',entries:[{eventId:'single',importance:'key'}]},
    {id:'empty',themeId:writers.topic.id,title:'empty',description:'empty',kind:'curated',note:'Synthetic test fixture.',path:'/writers/empty/',entries:[]},
  ]};
  assert.deepEqual(readingBounds(synthetic,['cross-line']),[yearCoordinate(-1),yearCoordinate(2)]);
  assert.deepEqual(readingBounds(synthetic,['single-line']),[2024,2024]);
  assert.deepEqual(readingBounds(synthetic,['empty']),catalogBounds(synthetic));
  assert.deepEqual(readingBounds(synthetic,['unknown']),catalogBounds(synthetic));
  assert.deepEqual(readingBounds({...synthetic,periods:[],events:[]},['empty']),[1,1]);
});

test('AI one-sided legacy years do not get swapped with its presentation default', async () => {
  const { aiCatalog } = await import('../src/topics/ai/adapter');
  const { aiExplorerPresentation } = await import('../src/topics/ai/explorer');
  const state=restoreReadingExplorer('?to=1960',aiCatalog,'','',aiExplorerPresentation(),'ai-model-iterations');
  assert.equal(state.to,1960);
  assert.ok(state.from<=state.to);
});
