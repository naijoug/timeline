import test from 'node:test';
import assert from 'node:assert/strict';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { goIterationEvents, goIterationRelations, goIterationSources } from '../src/topics/programming-languages/go-iteration-history';
import { createExplorerPayload } from '../src/core/explorer-payload';
test('Go iteration releases preserve official dates and experimental boundaries', () => {
 const [loop, iter] = goIterationEvents;
 assert.deepEqual(loop.time.start, {year:2024,month:2,day:6});
 assert.deepEqual(iter.time.start, {year:2024,month:8,day:13});
 for (const e of goIterationEvents) {
  assert.equal(programmingLanguages.events.filter(x=>x.id===e.id).length,1);
  assert.equal(e.details!.filter(x=>x.editorial).length,1);
  assert.ok(e.details!.filter(x=>!x.editorial).every(x=>x.sourceIds?.length && x.locator));
 }
 assert.match(JSON.stringify(loop.details),/go.mod.*go 1.22/);
 assert.match(JSON.stringify(loop.details),/:= 声明.*= 赋值/);
 assert.match(JSON.stringify(iter.details),/yield 返回 false/);
 assert.match(JSON.stringify(iter.details),/泛型类型别名仍需实验/);
 assert.equal(goIterationSources.find(x=>x.id==='go123-iteration-explainer')!.publishedAt,'2024-08-20');
});
test('Go relation is evidenced and long reading stays outside the client index',()=>{
 assert.equal(goIterationRelations[0].fromEventId,'go-118');
 assert.ok(goIterationRelations[0].locator);
 const payload=JSON.stringify(createExplorerPayload(programmingLanguages));
 assert.ok(payload.includes('go-123-iterators'));
 assert.ok(!payload.includes('go123-range-reading'));
 assert.ok(!payload.includes('GopherCon 2024 讲座改写稿'));
});
