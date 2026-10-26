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
async function hydrate(path, search = '', headerOnly = false, beforeHydrate) {
  const errors = [];
  const console = new VirtualConsole();
  console.on('error', (...args) => errors.push(args.map(String).join(' ')));
  console.on('jsdomError', error => errors.push(String(error)));
  const dom = new JSDOM(readFileSync(join(root, path, 'index.html'), 'utf8'), {
    url: `https://timeline.example${base}/${path}/${search}`,
    referrer: `https://timeline.example${base}/`, runScripts:'outside-only', pretendToBeVisual:true, virtualConsole:console,
  });
  const w = dom.window;
  const mediaQueries = [];
  let currentMobile = false;
  w.matchMedia = query => {
    const listeners = new Set();
    const media = { matches:query === '(max-width: 760px)' && currentMobile, media:query, addEventListener(_type, listener){ listeners.add(listener); }, removeEventListener(_type, listener){ listeners.delete(listener); } };
    mediaQueries.push({ media, listeners });
    return media;
  };
  const setMobile = mobile => {
    currentMobile = mobile;
    mediaQueries.forEach(({ media, listeners }) => {
    if (media.media !== '(max-width: 760px)') return;
    media.matches = mobile;
    listeners.forEach(listener => listener(media));
    });
  };
  w.HTMLElement.prototype.scrollTo = () => {};
  w.scrollTo = () => {};
  w.HTMLDialogElement.prototype.showModal = function() { this.open = true; };
  w.HTMLDialogElement.prototype.close = function() { this.open = false; };
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
  const island = w.document.querySelector(headerOnly ? 'astro-island[component-url*="Header"]' : 'astro-island[component-url*="TopicExplorer"]');
  assert.ok(island);
  const props = Object.fromEntries(Object.entries(JSON.parse(island.getAttribute('props'))).map(([key, [, value]]) => [key, value]));
  const firstCard = w.document.querySelector('.chronicle-event-button');
  const component = await load(island.getAttribute('component-url'));
  const renderer = await load(island.getAttribute('renderer-url'));
  // Execute the real parser-blocking guard, as a browser does before hydration.
  for (const script of w.document.querySelectorAll('script[data-timeline-search-capture]')) w.eval(script.textContent);
  beforeHydrate?.(w);
  renderer.default(island)(component.default, props, {}, { client:'load' });
  await waitFor(() => headerOnly ? w.document.documentElement.style.getPropertyValue('--navigation-header-height') : w.document.querySelector('[data-timeline-ready="true"]'), `${path}: hydration did not finish`);
  assert.equal(errors.length, 0, errors.join('\n'));
  if (!search) assert.equal(w.document.querySelector('.chronicle-event-button'), firstCard, `${path}: hydration replaced SSR instead of reusing it`);
  return { dom, w, errors, setMobile };
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
  await waitFor(() => w.document.querySelector('#chronicle-filters')?.open, `${topic}: filter drawer did not open`);
  const toggle = w.document.querySelector('.filter-sheet-key input');
  toggle.click();
  await waitFor(() => !toggle.checked, 'draft changes key-only selection');
  w.document.querySelector('.filter-sheet-apply').click();
  await waitFor(() => w.location.search.includes('all=1'), `${topic}: all-event control failed`);
  const payload = JSON.parse(w.document.querySelector(`#timeline-payload-${topic}`).textContent);
  assert.equal(cards().length, payload.catalog.events.length, `${topic}: hidden/lost events after hydration`);
  const link = cards()[0];
  // Prevent jsdom navigation, but let React run the actual return-state handler.
  w.document.addEventListener('click', event => event.preventDefault(), { once:true });
  link.click();
  const saved = JSON.parse(w.sessionStorage.getItem('timeline-mobile-position'));
  assert.equal(new URL(link.href).searchParams.get('return'), saved.url);
  assert.equal(saved.filters, false);
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

// Exercise the built shared header, including repeat toggles and phone-to-desktop cleanup.
{
  const { dom, w, errors, setMobile } = await hydrate('', '', true);
  const toggle = w.document.querySelector('.header-sidebar-toggle');
  assert.equal(w.document.querySelectorAll('[aria-label="收拢侧栏"]').length, 1);
  assert.equal(w.document.querySelectorAll('.sidebar-toggle').length, 0);
  assert.equal(toggle.getAttribute('aria-controls'), 'topic-sidebar');
  for (const collapsed of [true, false, true, false]) {
    toggle.click();
    await waitFor(() => toggle.getAttribute('aria-expanded') === String(!collapsed), 'desktop toggle state');
    assert.equal(w.document.documentElement.dataset.sidebar, collapsed ? 'collapsed' : 'expanded');
    assert.equal(w.localStorage.getItem('timeline-sidebar-collapsed'), String(collapsed));
  }
  const menu = w.document.querySelector('.mobile-nav-open');
  setMobile(true);
  menu.click();
  await waitFor(() => w.document.querySelector('[role="dialog"]'), 'phone menu open');
  assert.equal(menu.getAttribute('aria-expanded'), 'true');
  assert.equal(w.document.querySelector('main').inert, true);
  w.dispatchEvent(new w.KeyboardEvent('keydown', { key:'Escape', bubbles:true }));
  await waitFor(() => !w.document.querySelector('[role="dialog"]'), 'Escape closes phone drawer');
  await waitFor(() => w.document.activeElement === menu, 'Escape restores opener focus');
  assert.notEqual(w.document.querySelector('main').inert, true);
  menu.click();
  await waitFor(() => w.document.querySelector('[role="dialog"]'), 'phone menu reopen');
  setMobile(false);
  await waitFor(() => !w.document.querySelector('[role="dialog"]'), 'resize closes phone drawer');
  await waitFor(() => w.document.activeElement === toggle, 'resize focuses sole desktop toggle');
  assert.equal(w.document.body.style.overflow, '');
  assert.equal(errors.length, 0, errors.join('\n'));
  dom.window.close();
  console.log('Home header hydration: sole toggle, repeated state, Escape and resize cleanup passed');
}

// Filter regression checks run on the real production component and serialized URLs.
{
  const { dom, w, errors } = await hydrate('ai', '?q=Kimi&scope=china&lane=models&order=asc');
  const chips = () => [...w.document.querySelectorAll('.filter-chip')];
  assert.equal(chips().length, 4);
  chips().find(button => button.textContent.includes('仅关键节点')).click();
  await waitFor(() => w.location.search.includes('all=1'), 'chip removes key-only restriction');
  assert.equal(new URLSearchParams(w.location.search).get('q'), 'Kimi');
  w.document.querySelector('.filter-clear-all').click();
  await waitFor(() => chips().length === 0, 'clear-all removes every facet');
  assert.equal(new URLSearchParams(w.location.search).get('order'), 'asc');
  assert.equal(new URLSearchParams(w.location.search).get('q'), null);
  const trigger = w.document.querySelector('[aria-label="时间与范围筛选"]');
  trigger.click();
  await waitFor(() => w.document.querySelector('#chronicle-filters')?.open, 'open filters');
  const latestYear = Number(w.document.querySelector('.filter-sheet-years [name=to]').value);
  [...w.document.querySelectorAll('.filter-sheet-presets button')].find(button => button.textContent === '最近 5 年').click();
  await waitFor(() => w.document.querySelector('[name=from]').value === String(latestYear - 4), 'recent five years updates draft');
  assert.notEqual(new URLSearchParams(w.location.search).get('from'), String(latestYear - 4), 'draft must not edit URL');
  w.document.querySelector('.filter-sheet-apply').click();
  await waitFor(() => new URLSearchParams(w.location.search).get('from') === String(latestYear - 4), 'apply commits draft');
  trigger.click();
  await waitFor(() => w.document.querySelector('#chronicle-filters')?.open, 'reopen filters');
  const input = w.document.querySelector('.filter-sheet-years [name=from]');
  Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype, 'value').set.call(input, String(latestYear + 1));
  input.dispatchEvent(new w.Event('input', { bubbles:true }));
  await waitFor(() => w.document.querySelector('.filter-sheet-error'), 'invalid range is explained');
  assert.equal(new URLSearchParams(w.location.search).get('from'), String(latestYear - 4));
  w.document.querySelector('#chronicle-filters').dispatchEvent(new w.Event('cancel', { cancelable:true }));
  await waitFor(() => !w.document.querySelector('#chronicle-filters'), 'Escape cancels filter panel');
  await waitFor(() => w.document.activeElement === trigger, 'focus restored after dialog unmount');
  assert.equal(w.document.activeElement, trigger);
  assert.equal(errors.length, 0, errors.join('\n')); dom.window.close();
}
{
  const { dom, w, errors } = await hydrate('china-history', '?q=制度&all=1&order=desc');
  w.document.querySelector('[aria-label="时间与范围筛选"]').click();
  await waitFor(() => w.document.querySelector('#chronicle-filters')?.open, 'open history filters');
  const select = w.document.querySelector('[aria-label="选择朝代或时期"]');
  select.value = 'tang'; select.dispatchEvent(new w.Event('change', { bubbles:true }));
  await waitFor(() => select.value === 'tang', 'period draft selection');
  w.document.querySelector('.filter-sheet-apply').click();
  await waitFor(() => new URLSearchParams(w.location.search).get('period') === 'tang', 'period filters in place');
  assert.equal(new URLSearchParams(w.location.search).get('q'), '制度');
  assert.equal(new URLSearchParams(w.location.search).get('all'), '1');
  assert.equal(new URLSearchParams(w.location.search).get('order'), 'desc');
  assert.equal(w.location.pathname, `${base}/china-history/`);
  w.dispatchEvent(new w.PopStateEvent('popstate'));
  await waitFor(() => w.document.querySelector('.filter-chip')?.textContent.includes('制度'), 'query survives restore');
  assert.equal(new URLSearchParams(w.location.search).get('period'), 'tang');
  assert.equal(errors.length, 0, errors.join('\n')); dom.window.close();
}
console.log('Filter chips, full clear, year presets, invalid input, focus restoration and period context passed.');

// Native edits before the React chunk arrives must beat only the INITIAL URL.
for (const [topic, initial, draft] of [['china-history', '张骞', '郑和'], ['ai', 'Kimi', 'Claude'], ['programming-languages', 'Python', 'Rust'], ['writers', '三体', '球状闪电'], ['china-history', '张骞', '']]) {
  const { dom, w, errors } = await hydrate(topic, `?q=${initial}&order=desc`, false, w => {
    const input = w.document.querySelector('#current-topic-search input[name=q]');
    input.value = 'temporary'; input.dispatchEvent(new w.Event('input', { bubbles:true }));
    input.value = draft; input.dispatchEvent(new w.Event('input', { bubbles:true }));
  });
  const input = w.document.querySelector('#current-topic-search input[name=q]');
  assert.equal(input.value, draft, 'initial URL restoration must not overwrite newer typing or an explicit clear');
  assert.equal(new URLSearchParams(w.location.search).get('q') || '', draft);
  assert.equal(new URLSearchParams(w.location.search).get('order'), 'desc');
  assert.equal(input.__timelineSearchDraft, undefined, 'consume initial draft');
  w.history.pushState(null, '', `?q=${initial}&order=asc`);
  w.dispatchEvent(new w.PopStateEvent('popstate'));
  await waitFor(() => input.value === initial, 'later history navigation must use new URL, not old draft');
  assert.equal(w.document.querySelector('[aria-label="排列顺序"]').value, 'asc');
  const setValue = Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype, 'value').set;
  setValue.call(input, draft); input.dispatchEvent(new w.Event('input', { bubbles:true }));
  await waitFor(() => (new URLSearchParams(w.location.search).get('q') || '') === draft, 'later typing still works');
  assert.equal(input.__timelineSearchDraft, undefined, 'temporary capture listener removed');
  assert.equal(errors.length, 0, errors.join('\n')); dom.window.close();
}
{
  const { dom, w, errors } = await hydrate('china-history', '?q=张骞&order=desc', false, w => {
    const input = w.document.querySelector('#current-topic-search input[name=q]');
    input.dispatchEvent(new w.CompositionEvent('compositionstart', { bubbles:true }));
    input.value = '郑'; input.dispatchEvent(new w.InputEvent('input', { bubbles:true, isComposing:true }));
  });
  const input = w.document.querySelector('#current-topic-search input[name=q]');
  assert.equal(input.value, '郑');
  Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype, 'value').set.call(input, '郑和');
  input.dispatchEvent(new w.CompositionEvent('compositionend', { bubbles:true, data:'郑和' }));
  input.dispatchEvent(new w.InputEvent('input', { bubbles:true }));
  await waitFor(() => new URLSearchParams(w.location.search).get('q') === '郑和', 'composition crossing hydration retains final input');
  assert.equal(input.value, '郑和');
  assert.ok(w.document.querySelector('[data-event-id="zheng-he-voyages"]'));
  assert.equal(errors.length, 0, errors.join('\n')); dom.window.close();
}
console.log('Early search: four topics, clear-to-empty, IME handoff, later typing and URL history restoration passed.');

{
  // Selection/paste may start before the first input event; do not insert the
  // old URL value between focusing an empty SSR field and the ensuing typing.
  const { dom, w } = await hydrate('china-history', '?q=张骞&order=desc', false, w => {
    w.document.querySelector('#current-topic-search input[name=q]').focus();
  });
  const input = w.document.querySelector('#current-topic-search input[name=q]');
  assert.equal(input.value, '', 'a field already being edited must not change under the cursor');
  Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype, 'value').set.call(input, '郑和');
  input.dispatchEvent(new w.Event('input', { bubbles:true }));
  await waitFor(() => new URLSearchParams(w.location.search).get('q') === '郑和', 'focus-to-input hydration gap');
  dom.window.close();
}
console.log('Focus/selection before the first input event also survives hydration.');
