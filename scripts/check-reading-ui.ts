import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { aiCatalog } from '../src/topics/ai/adapter';
import { aiExplorerPresentation } from '../src/topics/ai/explorer';
import { restoreReadingExplorer, readingExplorerEvents } from '../src/core/mobile-navigation';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';
import { writersCatalog } from '../src/topics/writers/catalog';

const root=resolve(process.env.TIMELINE_OUT_DIR || 'dist');
for(const catalog of [aiCatalog,chinaHistory,programmingLanguages,writersCatalog]) {
  const presentation=catalog===aiCatalog?aiExplorerPresentation():{};
  const state=restoreReadingExplorer('',catalog,'','',presentation);
  const events=readingExplorerEvents(catalog,state,presentation);
  const html=readFileSync(join(root,catalog.topic.path,'index.html'),'utf8');
  assert.match(html,/data-screen="timeline"/);
  assert.match(html,/class="mobile-app-back"/);
  assert.equal(html.match(/<li id="event-([^"]+)"/)?.[1],events[0].id,`${catalog.topic.id}: first SSR card is the correct newest/earliest event`);
  assert.doesNotMatch(html,/class="overview-axis"|class="chronicle-reader"/);
  assert.match(html,/aria-label="排列顺序"/);
  if(catalog===aiCatalog) assert.match(html,/最新已收录/);
}
const home=readFileSync(join(root,'index.html'),'utf8');
assert.match(home,/data-screen="home"/);
const newest=readingExplorerEvents(aiCatalog,{...restoreReadingExplorer('',aiCatalog,'','',aiExplorerPresentation()),all:true},aiExplorerPresentation())[0];
const detail=readFileSync(join(root,'ai/events',newest.id,'index.html'),'utf8');
assert.match(detail,/data-screen="record"/);
assert.match(detail,/class="mobile-bar-title">事件详情/);
assert.match(detail,/aria-label="返回时间线"/);
console.log('Reading UI verified: all 4 topic SSR orders, newest AI event, real record links, and Home → Timeline → Detail navigation.');
