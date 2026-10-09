import test from 'node:test';
import assert from 'node:assert/strict';
import { events } from '../src/topics/ai/events';
import { sources } from '../src/topics/ai/sources';
import { instructionCollection, instructionRelations } from '../src/topics/ai/instruction-following';
import { aiCatalog } from '../src/topics/ai/adapter';
import { aiEventDetails } from '../src/topics/ai/narrative';
import { eventSourceIds } from '../src/core/evidence';
import { validateCatalog } from '../src/core/validate';

test('instruction collection reuses unique records and preserves publication stages', () => {
  assert.equal(instructionCollection.eventIds.length, 14);
  for (const id of instructionCollection.eventIds) {
    const matches = events.filter(e=>e.id===id);
    assert.equal(matches.length,1,id);
    const e=matches[0];
    assert.ok(e.details?.every(s=>s.sourceIds?.length && s.locator),id);
    assert.deepEqual(aiEventDetails(e),e.details);
  }
  assert.equal(events.find(e=>e.id==='bert')!.date,'2018-10-11');
  assert.equal(events.find(e=>e.id==='chinchilla')!.date,'2022-03-29');
  assert.equal(events.find(e=>e.id==='constitutional-ai')!.date,'2022-12-15');
  assert.equal(events.find(e=>e.id==='dpo')!.date,'2023-05-29');
  assert.equal(events.find(e=>e.id==='gpt-2-full')!.date,'2019-11-05');
  assert.equal(events.find(e=>e.id==='chatgpt')!.kind,'研究预览');
  const stages = sources.filter(s=>['bert','dpo','gpt3'].includes(s.id));
  assert.ok(stages.every(s=>s.version==='arXiv v1' && s.url.endsWith('v1')));
  assert.equal(sources.find(s=>s.id==='manus2')!.checkedAt,'2026-09-29');
});
test('relations encode evidence and distinguish experiments from adoption', () => {
  assert.ok(instructionRelations.every(r=>r.sourceIds.length && r.locator));
  assert.match(instructionRelations.find(r=>r.id==='lora-experiments-gpt3')!.note!,/不代表/);
  assert.ok(!instructionRelations.some(r=>r.fromEventId==='chatgpt'&&r.toEventId==='dpo'));
  const record=aiCatalog.events.find(e=>e.id==='gpt-1')!;
  assert.ok(eventSourceIds(record).includes('gpt1-paper'));
});
test('nested citations, source review dates and relationship endpoints are guarded', () => {
  assert.deepEqual(validateCatalog(aiCatalog),[]);
  const broken=structuredClone(aiCatalog);
  broken.events[0].details=[{label:'断言',text:'断言',sourceIds:['missing']}];
  broken.sources[0].checkedAt='2026-02-30';
  broken.relations![0].toEventId='missing-event';
  broken.collections![0].eventIds.push(broken.collections![0].eventIds[0]);
  const errors=validateCatalog(broken);
  for(const fragment of ['unknown reference missing','checkedAt','missing-event','invalid collection']) assert.ok(errors.some(e=>e.includes(fragment)),fragment);
});
