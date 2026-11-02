import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createRequire } from 'node:module';
// Only the standard DOM surface is used; no new test dependency is needed.
const { JSDOM } = createRequire(import.meta.url)('jsdom') as { JSDOM: new (html: string) => { window: Window & { document: Document } } };
import { aiCatalog } from '../src/topics/ai/adapter';
import { aiExplorerPresentation } from '../src/topics/ai/explorer';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { writersCatalog } from '../src/topics/writers/catalog';
import { writersPresentation } from '../src/topics/writers/presentation';
import { restoreReadingExplorer, readingExplorerEvents } from '../src/core/mobile-navigation';

const root = resolve(process.env.TIMELINE_OUT_DIR || 'dist');
const base = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
let pages=0, links=0;
for (const [catalog,presentation] of [[aiCatalog,aiExplorerPresentation()],[chinaHistory,{}],[writersCatalog,writersPresentation]] as const) {
  for (const line of catalog.timelines || []) {
    const html=readFileSync(join(root,line.path,'index.html'),'utf8');
    const dom=new JSDOM(html), doc=dom.window.document;
    const cards=[...doc.querySelectorAll<HTMLAnchorElement>('.chronicle-event-button')];
    const state=restoreReadingExplorer('',catalog,'','',presentation,line.id);
    const expected=readingExplorerEvents(catalog,state,presentation).map(event=>event.id);
    assert.deepEqual(cards.map(link=>link.dataset.eventId),expected,`${line.id}: all SSR membership in reading order`);
    assert.equal(new Set(expected).size,line.entries.length);
    assert.equal(doc.querySelectorAll('main').length,1);
    assert.equal(doc.querySelector('h1')?.textContent,line.title);
    assert.equal(doc.querySelector('#current-topic-search')?.getAttribute('action'),base+line.path);
    assert.equal(doc.querySelector<HTMLInputElement>('#current-topic-search input[name=lines]')?.value,line.id);
    assert.ok(doc.querySelector('#timeline-notes'),'static notes retain sources/reading context');
    const island=doc.querySelector('astro-island[component-url*="TopicExplorer"]');
    assert.ok(island,'one shared reader, not a data-heavy legacy Timeline island');
    assert.ok((island.getAttribute('props') || '').length < 1_000);
    const payload=JSON.parse(doc.querySelector(`#timeline-payload-${catalog.topic.id}`)!.textContent!);
    assert.deepEqual(payload.catalog.timelines,catalog.timelines);
    assert.equal(payload.catalog.events.length,catalog.events.length);
    for(const link of cards) {
      const record=new URL(link.getAttribute('href')!,'https://timeline.example');
      const back=new URL(record.searchParams.get('return')!,'https://timeline.example');
      assert.equal(back.pathname,base+line.path);
      assert.equal(back.searchParams.get('lines'),line.id);
      assert.equal(back.hash,`#event-${link.dataset.eventId}`);
      links++;
    }
    pages++;dom.window.close();
  }
}
console.log(`Subtimeline SSR verified: ${pages} independent routes, ${links} exact return links, all memberships/order, native scoped search, compact shared islands and static reading notes.`);
