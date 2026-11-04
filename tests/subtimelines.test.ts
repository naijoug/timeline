import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCatalog } from '../src/core/validate';
import { timelineEvents, timelineMembership, normalizedTimelineIds } from '../src/core/timelines';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { aiCatalog } from '../src/topics/ai/adapter';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { writersCatalog } from '../src/topics/writers/catalog';

const main = 'ai-milestones', models = 'ai-model-iterations', agents = 'ai-agent-products';
test('timelines have one authoritative membership, shared facts and contextual importance', () => {
  for (const catalog of [aiCatalog, chinaHistory, writersCatalog]) {
    assert.deepEqual(validateCatalog(catalog), []);
    assert.equal('collections' in catalog, false);
    for (const event of catalog.events) assert.equal('timelineIds' in event, false);
    for (const line of catalog.timelines!) assert.equal('eventIds' in line, false);
    const payload = createExplorerPayload(catalog).catalog;
    assert.deepEqual(payload.timelines, catalog.timelines);
    assert.equal(payload.events.some(event => 'details' in event), false);
  }
  const selected = timelineEvents(aiCatalog, [main, models]);
  assert.equal(selected.filter(event => event.id === 'transformer').length, 1);
  assert.equal(selected.find(event => event.id === 'transformer'), aiCatalog.events.find(event => event.id === 'transformer'));
  assert.equal(timelineMembership(aiCatalog, [main, models]).get('transformer')?.length, 2);
  assert.equal(timelineEvents(aiCatalog, [main]).length, 53);
  assert.equal(timelineEvents(aiCatalog, [models]).length, 195);
  assert.equal(timelineEvents(aiCatalog, [agents]).length, 47);
  assert.ok(!timelineEvents(aiCatalog, [main]).some(event => event.id === 'gpt-4o-mini'), 'a parent does not inherit its child');
  assert.ok(timelineEvents(aiCatalog, [models]).some(event => event.id === 'gpt-4o-mini'));
  assert.ok(!timelineEvents(aiCatalog, [models], true).some(event => event.id === 'gpt-4o-mini'), 'importance is local to the line');
  assert.deepEqual(normalizedTimelineIds(aiCatalog, [models,main,models,'missing']), [main,models]);
});
test('Agent products do not conflate conversation, mechanisms or research with a product launch', () => {
  const ids = new Set(timelineEvents(aiCatalog, [agents]).map(event => event.id));
  for (const id of ['chatgpt','eliza','react','mcp-standard','skills-introduction','swe-agent-paper','muse-design']) assert.ok(!ids.has(id), id);
  assert.ok(ids.has('chatgpt-agent-launch'));
  for (const event of timelineEvents(aiCatalog, [agents])) assert.ok(event.sourceIds.length);
});
test('legacy history and writer routes retain curated members, real precision and source records', () => {
  const wars = chinaHistory.timelines!.find(line => line.id === 'wars-and-turning-points')!;
  assert.equal(wars.path, '/china-history/collections/wars-and-turning-points/');
  assert.ok(wars.entries.some(entry => entry.eventId === 'guandu'));
  for (const author of writersCatalog.entities) {
    const ids = timelineEvents(writersCatalog, [author.id]).map(event => event.id).sort();
    assert.deepEqual(ids, writersCatalog.events.filter(event => event.entityIds.includes(author.id)).map(event => event.id).sort());
    assert.equal(writersCatalog.timelines!.find(line => line.id === author.id)?.path, `/writers/authors/${author.id}/`);
  }
});
test('validation rejects invalid references, duplicates, paths, themes, importance and parent cycles', () => {
  const broken = structuredClone(aiCatalog), lines = broken.timelines!;
  lines[0].entries.push(lines[0].entries[0], {eventId:'unknown-event', importance:'key'});
  lines[1].parentId = lines[2].id; lines[2].parentId = lines[1].id;
  lines[1].themeId = 'writers'; lines[1].path = lines[0].path;
  lines[2].entries[0].importance = 'invalid' as 'key';
  lines[3].parentId = 'missing-line'; broken.topic.defaultTimelineId = 'missing-line';
  const errors = validateCatalog(broken).join('\n');
  for (const fragment of ['unknown-event','invalid timeline membership','timeline parent cycle','timeline theme','duplicate timeline path','invalid timeline entry','unknown timeline parent','unknown default timeline']) assert.ok(errors.includes(fragment), fragment);
});

import { restoreReadingExplorer, readingExplorerEvents, readingExplorerQuery, eventRecordHref, safeTimelineReturn } from '../src/core/mobile-navigation';
import { aiExplorerPresentation } from '../src/topics/ai/explorer';
import { aiViewQuery } from '../src/core/ai-view-state';
import { clearExplorerFilters } from '../src/core/filter-controls';

test('independent and merged line state survives URL serialization, filters and safe record returns', () => {
  const presentation = aiExplorerPresentation();
  const payload = createExplorerPayload(aiCatalog, presentation);
  for (const ids of [[main],[models],[agents],[main,models],[models,agents],[]]) {
    const state = { ...restoreReadingExplorer('?lines=all&all=1', payload.catalog, '', '', payload.presentation), timelineIds:ids, all:false, q:'GPT', scope:'china', order:'asc' as const };
    const query = readingExplorerQuery(state, aiViewQuery);
    const restored = restoreReadingExplorer(query, payload.catalog, '', '', payload.presentation);
    assert.deepEqual(restored, state);
    assert.deepEqual(readingExplorerEvents(payload.catalog, state, payload.presentation), readingExplorerEvents(payload.catalog, restored, payload.presentation));
    const back = `/timeline/ai/${query}#event-gpt-4-report`;
    const record = eventRecordHref('/timeline/ai/models/gpt/gpt-4/', back);
    assert.equal(new URL(record,'https://example.com').searchParams.get('return'), back);
    assert.equal(safeTimelineReturn(back,'https://example.com','/timeline/ai/'),back);
  }
  const standalone = restoreReadingExplorer('?lines=all', payload.catalog,'','',payload.presentation,agents);
  assert.deepEqual(standalone.timelineIds,[agents]);
  assert.equal(readingExplorerEvents(payload.catalog, standalone, payload.presentation).length,47);
  assert.deepEqual(clearExplorerFilters(payload.catalog,standalone).timelineIds,[agents], 'reset filters does not silently leave a reading path');
  assert.deepEqual(restoreReadingExplorer('?lines=unknown',payload.catalog,'','',payload.presentation).timelineIds,[main]);
  assert.deepEqual(restoreReadingExplorer('?all=1&lane=models',payload.catalog,'','',payload.presentation).timelineIds,[], 'legacy filtered URLs do not become curated mainline URLs');
});
test('merged filtering deduplicates before counting, using any selected line importance', () => {
  const state = {...restoreReadingExplorer('',aiCatalog), timelineIds:[main,models], all:true};
  const events = readingExplorerEvents(aiCatalog,state);
  assert.equal(new Set(events.map(event => event.id)).size, events.length);
  const expected = new Set([...timelineEvents(aiCatalog,[main]),...timelineEvents(aiCatalog,[models])].map(event => event.id));
  assert.equal(events.length,expected.size);
  const key = readingExplorerEvents(aiCatalog,{...state,all:false});
  assert.ok(key.some(event => event.id==='transformer'));
  assert.ok(!key.some(event => event.id==='gpt-4o-mini'));
});

import { readFileSync } from 'node:fs';
test('freshness and notes preserve the originating view, and restoration responds to popstate state changes', () => {
  const explorer = readFileSync('src/components/timeline/Explorer.tsx','utf8');
  assert.match(explorer, /returnPath\(\) \+ '#timeline-freshness'/);
  assert.match(explorer, /rememberReturn\(undefined, state, '#timeline-freshness'\)/);
  assert.match(explorer, /\[ready, state, query\]/);
  assert.match(explorer, /history\.state\?\.timelinePosition/);
  const notes = readFileSync('src/components/timeline/TimelinePage.astro','utf8');
  assert.match(notes, /\['pointerover', 'focusin', 'contextmenu', 'auxclick'\]/);
  assert.match(notes, /location\.pathname \+ location\.search \+ '#timeline-notes'/);
  assert.match(notes, /class="timeline-page-shell"/);
  assert.match(readFileSync('src/styles/collections.css','utf8'), /\.timeline-page-shell \.chronicle-app \{ display:contents;/);
});
