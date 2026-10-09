import test from 'node:test';
import assert from 'node:assert/strict';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { xinhaiCollection, xinhaiEvents, xinhaiRelations, xinhaiSources } from '../src/topics/china-history/xinhai';
import { aiCatalog } from '../src/topics/ai/adapter';
import { relationEndpoints, relationsFor } from '../src/core/evidence';
import { defaultView, selectEvents } from '../src/core/catalog';
import { parseDate, overlaps } from '../src/core/time';
import { validateCatalog } from '../src/core/validate';

const event = (id:string) => xinhaiEvents.find(e=>e.id===id)!;
test('Xinhai records are unique, cited and discoverable across the transition',()=>{
  assert.deepEqual(validateCatalog(chinaHistory),[]);
  assert.equal(xinhaiCollection.eventIds.length,14);
  assert.ok(chinaHistory.topic.shortcuts?.some(s=>s.path===xinhaiCollection.path));
  assert.ok(chinaHistory.collections?.includes(xinhaiCollection));
  for (const e of xinhaiEvents) {
    assert.equal(chinaHistory.events.filter(other=>other.id===e.id).length,1,e.id);
    assert.ok(e.details?.every(s=>s.sourceIds?.length && s.locator),e.id);
  }
  const republic = selectEvents(chinaHistory, defaultView(chinaHistory,'early-republic'));
  const qing = selectEvents(chinaHistory, defaultView(chinaHistory,'qing'));
  assert.ok(republic.some(e=>e.id==='shanghai-peace-talks'));
  assert.ok(republic.some(e=>e.id==='qing-abdication'));
  assert.ok(qing.some(e=>e.id==='qing-abdication'));
  assert.ok(!qing.some(e=>e.id==='sun-inauguration'));
  assert.ok(!qing.some(e=>e.id==='provisional-constitution'));
  assert.ok(!qing.some(e=>e.id==='yuan-presidential-transfer'));
  assert.ok(overlaps(event('shanghai-peace-talks').time,1912,1912));
  assert.ok(chinaHistory.periods.find(p=>p.id==='early-republic')!.time.start.year===1912);
});
test('election, inauguration, negotiations and constitutional stages keep distinct dates',()=>{
  assert.deepEqual(event('sun-provisional-election').time.start,parseDate('1911-12-29'));
  assert.deepEqual(event('sun-inauguration').time.start,parseDate('1912-01-01'));
  assert.match(event('sun-inauguration').details!.find(s=>s.label.includes('组成'))!.text,/政府组成阶段/);
  assert.deepEqual(event('shanghai-peace-talks').time.end,parseDate('1912-01-02'));
  assert.match(event('shanghai-peace-talks').note!,/不是整个/);
  assert.deepEqual(event('yuan-presidential-transfer').time.start,parseDate('1912-02-15'));
  assert.deepEqual(event('yuan-presidential-transfer').time.end,parseDate('1912-04-01'));
  assert.ok(event('yuan-presidential-transfer').details!.some(s=>s.label.includes('3 月 10 日')));
  assert.deepEqual(event('provisional-constitution').time.start,parseDate('1912-03-08'));
  assert.deepEqual(event('provisional-constitution').time.end,parseDate('1912-03-11'));
  assert.match(xinhaiSources.find(s=>s.id==='xinhai-sun-declaration')!.version!,/英文原文未发现/);
  assert.match(event('qing-abdication').note!,/附件未刊出/);
  assert.ok(chinaHistory.sources.filter(s=>!xinhaiSources.includes(s)).every(s=>s.checkedAt==='2026-09-30'));
});
test('incoming event relationships retain the complete directed statement in both topics',()=>{
  for(const [catalog,from,to,label] of [
    [chinaHistory,'sun-provisional-election','sun-inauguration','当选者随后就任'],
    [aiCatalog,'gpt-1','transformer','采用 Transformer 解码器'],
  ] as const) {
    const relation = relationsFor(catalog,to).find(r=>r.fromEventId===from && r.toEventId===to)!;
    assert.ok(relation,from);
    const {subject,object}=relationEndpoints(catalog,relation);
    assert.equal(subject.id,from);
    assert.equal(object.id,to);
    assert.equal(object.kind,'event');
    assert.equal(relation.label,label);
  }
  assert.equal(xinhaiRelations.length,10);
  assert.ok(xinhaiRelations.every(r=>r.sourceIds.length && r.locator));
});
