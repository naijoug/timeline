import test from 'node:test';
import assert from 'node:assert/strict';
import { events } from '../src/data/events';
import { atlasQuery, clampWindow, clusterEvents, datePosition, defaultAtlas, eventLane, filterAtlas, readAtlas, yearTicks } from '../src/lib/atlas';

test('atlas share URL restores range, region, topic, density, and selection',()=>{
  const state={...defaultAtlas(),from:2024,to:2026,scope:'china' as const,all:true,q:'千问',lane:'models' as const,selected:'qwen-3'};
  assert.deepEqual(readAtlas(atlasQuery(state)),state);
  assert.equal(readAtlas('?event=').selected,'');
  assert.deepEqual(readAtlas(atlasQuery(defaultAtlas()),'methods'),defaultAtlas());
});
test('untrusted ranges are bounded and reversed years normalized',()=>{
  assert.deepEqual(clampWindow(2026,3),[2024,2026]);
  assert.deepEqual(clampWindow(1800,200),[1943,2026]);
  assert.equal(readAtlas('?from=2026&to=2023').from,2023);
  assert.equal(readAtlas('?from=oops').from,2023);
});
test('model releases, methods, and early AI systems are not misclassified as agents',()=>{
  const lane=(id:string)=>eventLane(events.find(e=>e.id===id)!);
  assert.equal(lane('qwen-3'),'models'); assert.equal(lane('react'),'methods');
  assert.equal(lane('skills-introduction'),'methods'); assert.equal(lane('eliza'),'methods');
  assert.equal(lane('roomba'),'methods'); assert.equal(lane('minimax-agent-launch'),'products');
});
test('China filter includes model and application milestones without inferring unknown affiliations',()=>{
  const result=filterAtlas(events,{...defaultAtlas(),scope:'china'});
  for(const id of ['qwen-3','deepseek-r1','kimi-k2','glm-4-5','minimax-agent-launch','hunyuan-t1','ernie-4-5-open'])assert.ok(result.some(e=>e.id===id));
  assert.ok(!result.some(e=>e.id==='llama-2')); assert.ok(!result.some(e=>e.id==='manus-2'));
});
test('clustering preserves every event and avoids overlapping labels at all target widths',()=>{
  const models=filterAtlas(events,defaultAtlas()).filter(e=>eventLane(e)==='models');
  for(const width of [160,245,500,850,1200]){
    const clusters=clusterEvents(models,2023,2025,width);
    assert.deepEqual(clusters.flatMap(c=>c.events.map(e=>e.id)),models.map(e=>e.id));
    const labelWidth=Math.min(116,width),left=(x:number)=>Math.max(0,Math.min(width-labelWidth,x*width-labelWidth/2));
    clusters.slice(1).forEach((c,i)=>assert.ok(left(c.position)>=left(clusters[i].position)+labelWidth+8));
  }
});
test('partial dates use interval midpoints; precise dates stay chronological',()=>{
  assert.equal(datePosition('2025'),2025.5);
  assert.equal(datePosition('2025-01'),2025+.5/12);
  assert.ok(datePosition('2025-01-31')<datePosition('2025-02-01'));
});
test('year ticks stay legible when zooming out on a narrow screen',()=>{
  assert.deepEqual(yearTicks(2023,2025,850),[2023,2024,2025]);
  for(const [from,to] of [[2010,2021],[1943,2026],[2023,2026]]){
    const ticks=yearTicks(from,to,175);
    ticks.slice(1).forEach((year,i)=>assert.ok((year-ticks[i])/(to-from+1)*175>=55));
  }
});
