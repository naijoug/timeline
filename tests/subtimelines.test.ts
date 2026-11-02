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
  assert.equal(timelineEvents(aiCatalog, [main]).length, 49);
  assert.equal(timelineEvents(aiCatalog, [models]).length, 190);
  assert.equal(timelineEvents(aiCatalog, [agents]).length, 46);
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
