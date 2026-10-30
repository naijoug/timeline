import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { restoreReadingExplorer, readingExplorerQuery, readingExplorerEvents, timelineReadingReturn, canUseParentHistoryBack, canUseTimelineHistoryBack, recordContinuationHref } from '../src/core/mobile-navigation';
import { catalogBounds } from '../src/core/catalog';
import { aiCatalog } from '../src/topics/ai/adapter';
import { aiExplorerPresentation } from '../src/topics/ai/explorer';
import { aiPresentation } from '../src/topics/ai/config';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { writersCatalog } from '../src/topics/writers/catalog';

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('AI initially exposes the newest current data, with no fixed-year range or hydration-only correction', () => {
  const presentation = aiExplorerPresentation();
  const state = restoreReadingExplorer('', aiCatalog, '', '', presentation);
  const [min, max] = catalogBounds(aiCatalog);
  assert.deepEqual([state.from, state.to], [min, max]);
  assert.deepEqual(aiPresentation.defaultRange, [min, max]);
  assert.equal(state.order, 'desc');
  const all = readingExplorerEvents(aiCatalog, { ...state, all:true }, presentation);
  assert.equal(readingExplorerEvents(aiCatalog, state, presentation)[0].time.start.year, all[0].time.start.year);
  assert.equal(aiPresentation.latestEvent, all[0].id);
  assert.equal(aiPresentation.defaultEvent, all[0].id);
  assert.match(source('src/components/timeline/Explorer.tsx'), /useState\(\(\) => restoreReadingExplorer\('', catalog/);
  assert.match(source('src/components/timeline/Explorer.tsx'), /const results = useMemo\(\(\) => readingExplorerEvents/);
});

test('chronological themes retain their meaningful default and all topics can share either ordering', () => {
  for (const catalog of [chinaHistory, programmingLanguages, writersCatalog]) {
    const state = restoreReadingExplorer('', catalog);
    assert.equal(state.order, 'asc');
    const ascending = readingExplorerEvents(catalog, state);
    const descending = readingExplorerEvents(catalog, { ...state, order:'desc' });
    assert.deepEqual(descending.map(event => event.id), ascending.map(event => event.id).reverse());
    assert.equal(restoreReadingExplorer(readingExplorerQuery({ ...state, order:'desc' }), catalog).order, 'desc');
  }
});

test('AI sorting, filters, key-node mode and full range survive the legacy serializer', () => {
  const presentation = aiExplorerPresentation();
  const state = { ...restoreReadingExplorer('', aiCatalog, '', '', presentation), q:'Kimi', category:'models', scope:'china', order:'asc' as const, all:true };
  assert.deepEqual(restoreReadingExplorer(readingExplorerQuery(state, presentation.serializeState), aiCatalog, '', '', presentation), state);
});

test('desktop and phone now share real record links, document scrolling and no inline-reader redirects', () => {
  const explorer = source('src/components/timeline/Explorer.tsx');
  assert.match(explorer, /<a href=\{eventHref\(event\)\}/);
  assert.doesNotMatch(explorer, /className="overview-axis"|className="chronicle-reader"|matchMedia\(/);
  const css = source('src/styles/mobile-timeline.css');
  assert.match(css, /@media\(min-width:1051px\)[\s\S]*\.chronicle-year::before \{ left:50%;/);
  assert.match(css, /\.chronicle-event\.branch-right \{ margin-left:calc\(50% \+ 32px\);/);
  assert.match(explorer, /aria-label="排列顺序"/);
  assert.match(explorer, /最新已收录/);
  assert.match(explorer, /onClick=\{resetFilters\}>清除全部/);
});

test('safe app Back uses the original history entry only for a verified round trip', () => {
  const origin='https://naijoug.github.io';
  const destination='/timeline/ai/?q=Kimi&order=desc#event-kimi-k3-1-pro';
  const referrer=origin+'/timeline/ai/?q=Kimi&order=desc';
  assert.equal(canUseTimelineHistoryBack(destination,origin,referrer,4,destination),true);
  assert.equal(canUseTimelineHistoryBack(destination,origin,referrer,1,destination),false);
  assert.equal(canUseTimelineHistoryBack(destination,origin,'',4,destination),false);
  assert.equal(canUseTimelineHistoryBack(destination,origin,'https://elsewhere.example/timeline/ai/?q=Kimi&order=desc',4,destination),false);
  assert.equal(canUseTimelineHistoryBack(destination,origin,referrer,4,'/timeline/ai/?q=Qwen'),false);
  assert.equal(canUseTimelineHistoryBack(destination,origin,origin+'/timeline/writers/',4,destination),false);
  assert.equal(canUseTimelineHistoryBack('https://elsewhere.example/',origin,referrer,4,'https://elsewhere.example/'),false);
});

test('legacy selected-event returns normalize identically at every viewport and remain idempotent', () => {
  const old='/timeline/ai/?lane=models&event=kimi-k3-1-pro&order=desc';
  const safe=timelineReadingReturn(old);
  assert.equal(new URL(safe,'https://test.invalid').searchParams.get('event'),'');
  assert.equal(new URL(safe,'https://test.invalid').hash,'#event-kimi-k3-1-pro');
  assert.equal(timelineReadingReturn(safe),safe);
  assert.doesNotMatch(source('src/components/timeline/EventRecord.astro'),/matchMedia/);
});

test('topic app Back reuses a real Home entry, while direct links safely replace to Home', () => {
  const origin='https://naijoug.github.io';
  assert.equal(canUseParentHistoryBack('/timeline/',origin,origin+'/timeline/',3),true);
  assert.equal(canUseParentHistoryBack('/timeline/',origin,'',3),false);
  assert.equal(canUseParentHistoryBack('/timeline/',origin,origin+'/timeline/',1),false);
  assert.equal(canUseParentHistoryBack('/timeline/',origin,origin+'/timeline/?event=old',3),false);
  assert.match(source('src/components/Header.tsx'), /!value && safeTimelineReturn\(document.referrer/);
  assert.match(source('src/components/timeline/EventRecord.astro'), /!value && safeTimelineReturn\(document.referrer/);
});

test('app Back does not mistake an in-page hash entry for the originating timeline', () => {
  for (const file of ['src/components/Header.tsx','src/components/timeline/EventRecord.astro']) assert.match(source(file), /!location\.hash && canUseTimelineHistoryBack/);
  assert.match(source('src/components/Header.tsx'), /!location\.hash && canUseParentHistoryBack/);
  assert.match(source('src/components/timeline/Explorer.tsx'), /new Map\(results\.map\(\(event, index\) => \[event\.id, index % 2/);
});

test('related event chains keep the exact original filters, order and reading anchor', () => {
  const origin='https://naijoug.github.io', prefix='/timeline/ai/';
  const destination=prefix+'?q=Kimi&all=1&order=desc#event-kimi-k3';
  for (const path of [prefix+'events/kimi-k3-1-pro/',prefix+'models/kimi/kimi-k2-6/']) {
    const next=recordContinuationHref(path,destination,origin,prefix)!;
    assert.equal(new URL(next,origin).searchParams.get('return'),destination);
    const again=recordContinuationHref(next,destination,origin,prefix)!;
    assert.equal(again,next);
  }
  assert.match(source('src/components/timeline/EventRecord.astro'), /querySelectorAll<HTMLAnchorElement>\('\.event-record a\[href\]'\)/);
  assert.match(source('src/components/timeline/EventRecord.astro'), /if \(href\) link\.href = href/);
});

test('record continuation leaves sources, entity pages and cross-topic links untouched', () => {
  const origin='https://naijoug.github.io', prefix='/timeline/ai/', destination=prefix+'?q=Kimi';
  for (const href of ['https://example.com/events/source/', '/timeline/writers/events/example/',prefix+'models/kimi/',prefix+'collections/transformers/', 'mailto:editor@example.com']) {
    assert.equal(recordContinuationHref(href,destination,origin,prefix),null);
  }
  assert.equal(recordContinuationHref(prefix+'events/example/','https://example.com/',origin,prefix),null);
  const fallback=recordContinuationHref(prefix+'events/example/',prefix,origin,prefix)!;
  assert.equal(new URL(fallback,origin).searchParams.get('return'),prefix);
});
