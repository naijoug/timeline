import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import { SourceTextModule } from 'node:vm';
import { JSDOM, VirtualConsole } from 'jsdom';

// Execute the REAL production chunks against their SSR HTML, not a mock React
// tree. This checks hydration and navigation state, not browser layout/timing.
const root = resolve(process.env.TIMELINE_OUT_DIR || 'dist');
const base = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const waitFor = async (check, message) => {
  const deadline = Date.now() + 3000;
  while (Date.now() < deadline) { if (check()) return; await new Promise(resolve => setTimeout(resolve, 10)); }
  assert.ok(check(), message);
};
async function hydrate(path, search = '') {
  const errors = [];
  const console = new VirtualConsole();
  console.on('error', (...args) => errors.push(args.map(String).join(' ')));
  console.on('jsdomError', error => errors.push(String(error)));
  const dom = new JSDOM(readFileSync(join(root, path, 'index.html'), 'utf8'), {
    url: `https://timeline.example${base}/${path}/${search}`,
    referrer: `https://timeline.example${base}/`, runScripts:'outside-only', pretendToBeVisual:true, virtualConsole:console,
  });
  const w = dom.window;
  w.matchMedia = query => ({ matches: false, media:query, addEventListener(){}, removeEventListener(){} });
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  const context = dom.getInternalVMContext();
  const modules = new Map();
  const moduleFor = file => {
    file = join(root, '_astro', basename(file));
    if (!modules.has(file)) modules.set(file, new SourceTextModule(readFileSync(file, 'utf8'), { context, identifier:file }));
    return modules.get(file);
  };
  const load = async file => {
    const module = moduleFor(file);
    if (module.status === 'unlinked') await module.link(specifier => moduleFor(specifier));
    if (module.status !== 'evaluated') await module.evaluate();
    return module.namespace;
  };
  const island = w.document.querySelector('astro-island[component-url*="TopicExplorer"]');
  assert.ok(island);
  const props = Object.fromEntries(Object.entries(JSON.parse(island.getAttribute('props'))).map(([key, [, value]]) => [key, value]));
  const firstCard = w.document.querySelector('.chronicle-event-button');
  const component = await load(island.getAttribute('component-url'));
  const renderer = await load(island.getAttribute('renderer-url'));
  renderer.default(island)(component.default, props, {}, { client:'load' });
  await waitFor(() => w.document.querySelector('[data-timeline-ready="true"]'), `${path}: hydration did not finish`);
  assert.equal(errors.length, 0, errors.join('\n'));
  if (!search) assert.equal(w.document.querySelector('.chronicle-event-button'), firstCard, `${path}: hydration replaced SSR instead of reusing it`);
  return { dom, w, errors };
}
for (const topic of ['ai','programming-languages','china-history','writers']) {
  const { dom, w, errors } = await hydrate(topic);
  const cards = () => [...w.document.querySelectorAll('.chronicle-event-button')];
  assert.ok(cards().length);
  const original = cards().map(card => card.dataset.eventId);
  const order = w.document.querySelector('[aria-label="排列顺序"]');
  order.value = order.value === 'asc' ? 'desc' : 'asc';
  order.dispatchEvent(new w.Event('change', { bubbles:true }));
  await waitFor(() => cards()[0].dataset.eventId === original.at(-1), `${topic}: order control failed`);
  assert.deepEqual(cards().map(card => card.dataset.eventId), [...original].reverse());
  w.document.querySelector('[aria-label="时间与范围筛选"]').click();
  await waitFor(() => !w.document.querySelector('#chronicle-filters').hidden, `${topic}: filter drawer did not open`);
  const toggle = w.document.querySelector('.key-toggle input');
  toggle.click();
  await waitFor(() => w.location.search.includes('all=1'), `${topic}: all-event control failed`);
  const payload = JSON.parse(w.document.querySelector(`#timeline-payload-${topic}`).textContent);
  assert.equal(cards().length, payload.catalog.events.length, `${topic}: hidden/lost events after hydration`);
  const link = cards()[0];
  // Prevent jsdom navigation, but let React run the actual return-state handler.
  w.document.addEventListener('click', event => event.preventDefault(), { once:true });
  link.click();
  const saved = JSON.parse(w.sessionStorage.getItem('timeline-mobile-position'));
  assert.equal(new URL(link.href).searchParams.get('return'), saved.url);
  assert.equal(saved.filters, true);
  assert.ok(saved.url.includes('all=1') && saved.url.includes('order=') && saved.url.includes('#event-'));
  assert.equal(w.location.hash, `#event-${link.dataset.eventId}`);
  // Repeated in-document restoration must retain query and not duplicate cards.
  w.dispatchEvent(new w.PopStateEvent('popstate'));
  await new Promise(resolve => setTimeout(resolve, 60));
  assert.equal(cards().length, payload.catalog.events.length);
  assert.equal(errors.length, 0, errors.join('\n'));
  dom.window.close();
  console.log(`${topic}: SSR reused, controls, all events, ordering, exact record return state and popstate passed`);
}
for (const path of ['ai/models','ai/agents','ai/methods','china-history/dynasties/tang','china-history/themes/battles']) {
  const { dom, errors } = await hydrate(path);
  assert.equal(errors.length,0,errors.join('\n'));
  dom.window.close();
}
const filtered = await hydrate('ai', '?lane=models&scope=china&all=1&q=Kimi&order=asc');
assert.ok(filtered.w.document.querySelectorAll('.chronicle-event-button').length > 1);
assert.ok([...filtered.w.document.querySelectorAll('.chronicle-event-button')].every(link => /Kimi/i.test(link.textContent)));
assert.equal(filtered.w.document.querySelector('[aria-label="排列顺序"]').value,'asc');
assert.equal(filtered.errors.length,0,filtered.errors.join('\n'));
filtered.dom.window.close();
console.log('Production hydration smoke checks passed, including filtered AI legacy links and specialized routes. Browser layout remains a separate live QA check.');
