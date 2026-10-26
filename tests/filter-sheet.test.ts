import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createElement, act } from 'react';
import type { ExplorerCatalog } from '../src/core/types';
import type { ExplorerState, ExplorerPresentation } from '../src/core/explorer';
import { validateFilterYearRange } from '../src/core/filter-controls';
import { civilYear } from '../src/core/time';

// jsdom does not implement native dialog. This polyfill deliberately models only
// open/close state; real focus trapping, touch hit targets and layout need browser QA.
const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><body><button id="trigger">筛选</button><div id="root"></div></body>', { url: 'https://timeline.invalid/ai/?q=kept', pretendToBeVisual: true });
const window = dom.window;
Object.assign(globalThis, { window, document: window.document, HTMLElement: window.HTMLElement, HTMLInputElement: window.HTMLInputElement, IS_REACT_ACT_ENVIRONMENT: true });
Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
window.HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) { this.setAttribute('open', ''); };
window.HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) { this.removeAttribute('open'); };
const scrolls: number[] = [];
window.scrollTo = (value: { top: number }) => { scrolls.push(value.top); };
Object.defineProperty(window, 'scrollY', { value: 315, configurable: true });
const { createRoot } = await import('react-dom/client');
const { default: FilterSheet } = await import('../src/components/timeline/FilterSheet');

const catalog: ExplorerCatalog = {
  topic: { id: 'china-history', title: '历史测试', path: '/china-history/', description: '', coverage: '', categories: [{ id: 'politics', title: '制度' }, { id: 'culture', title: '文化' }] },
  entities: [], sources: [],
  periods: [{ id: 'early', title: '早期', time: { kind: 'duration', start: { year: -10 }, end: { year: 5 } }, summary: '', coverage: 'selected', sourceIds: [], entityIds: [] }],
  events: [-10, -1, 1, 5, 2026].map((year, index) => ({ id: `e${index}`, title: `事件${index}`, summary: '', time: { kind: 'point' as const, start: { year } }, category: index % 2 ? 'culture' : 'politics', tags: [], entityIds: [], periodIds: index < 4 ? ['early'] : [], sourceIds: [], milestone: index % 2 === 0 })),
};
const initial: ExplorerState = { from: -9, to: 2026, q: '', period: '', category: '', scope: '', all: true, expanded: [], selected: '', order: 'desc' };
const presentation: ExplorerPresentation = { scopes: [{ id: 'subset', title: '子集', eventIds: ['e0', 'e1'] }] };
const doc = window.document as Document;
const select = <T extends Element>(query: string): T => { const node = doc.querySelector<T>(query); assert.ok(node, `Missing ${query}`); return node; };
async function input(query: string, value: string) {
  const element = select<HTMLInputElement | HTMLSelectElement>(query);
  const prototype = element.tagName === 'SELECT' ? window.HTMLSelectElement.prototype : window.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(element, value);
  await act(async () => { element.dispatchEvent(new window.Event(element.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); });
}
async function click(query: string) { await act(async () => { select<HTMLElement>(query).click(); }); }
async function submit() { await act(async () => { select('form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })); }); }
async function mount(state: ExplorerState = initial) {
  const applied: ExplorerState[] = []; let cancelled = 0;
  const root = createRoot(select('#root'));
  await act(async () => root.render(createElement(FilterSheet, { catalog, state: structuredClone(state), presentation, onApply: value => applied.push(value), onCancel: () => { cancelled++; } })));
  return { applied, get cancelled() { return cancelled; }, async cleanup() { await act(async () => root.unmount()); } };
}

test('year text validation rejects empty, reversed, zero and out-of-bounds years without inventing year zero', () => {
  assert.deepEqual(validateFilterYearRange('-1', '1', -9, 2026), { ok: true, from: 0, to: 1 });
  assert.equal(civilYear(0), -1);
  for (const [from, to] of [['', '1'], ['0', '1'], ['-1', '0'], ['5', '1'], ['-11', '1'], ['1', '2027'], ['1.5', '5']]) assert.equal(validateFilterYearRange(from, to, -9, 2026).ok, false, `${from} to ${to}`);
});

test('filter dialog drafts do not change live values or URL until Apply; Cancel discards them', async () => {
  const beforeUrl = window.location.href;
  const fixture = await mount();
  try {
    assert.equal(select<HTMLDialogElement>('dialog').open, true);
    await input('.filter-sheet-fields select', 'culture');
    await input('select[aria-label="选择朝代或时期"]', 'early');
    assert.equal(fixture.applied.length, 0);
    assert.equal(initial.category, ''); assert.equal(initial.period, '');
    assert.equal(window.location.href, beforeUrl);
    await click('button[aria-label="关闭筛选，不保存更改"]');
    assert.equal(fixture.cancelled, 1); assert.equal(fixture.applied.length, 0);
  } finally { await fixture.cleanup(); }
  const reopened = await mount();
  try { assert.equal(select<HTMLSelectElement>('.filter-sheet-fields select').value, ''); assert.equal(select<HTMLInputElement>('[name="to"]').value, '2026'); }
  finally { await reopened.cleanup(); }
});

test('Apply commits period/category/scope/order/key state together and preserves independent search', async () => {
  const fixture = await mount({ ...initial, q: '事件' });
  try {
    await input('.filter-sheet-fields select', 'culture');
    await input('select[aria-label="选择朝代或时期"]', 'early');
    const fields = [...doc.querySelectorAll<HTMLSelectElement>('.filter-sheet-fields select')];
    await input(`.filter-sheet-fields label:nth-child(3) select`, 'subset');
    await input(`.filter-sheet-fields label:nth-child(4) select`, 'asc');
    assert.equal(fields.length, 4);
    await click('input[role="switch"]');
    assert.equal(fixture.applied.length, 0);
    await submit();
    assert.equal(fixture.applied.length, 1);
    assert.deepEqual({ ...fixture.applied[0], expanded: [] }, { ...initial, q: '事件', category: 'culture', scope: 'subset', period: 'early', from: -9, to: 5, order: 'asc', all: false });
  } finally { await fixture.cleanup(); }
});

test('numeric edits and native range input stay synchronized across BCE/CE and clamp crossed handles', async () => {
  const fixture = await mount({ ...initial, period: 'early', to: 5 });
  try {
    await input('input[name="from"]', '-1'); await input('input[name="to"]', '1');
    assert.equal(select<HTMLInputElement>('.filter-year-start').value, '0');
    assert.equal(select<HTMLInputElement>('.filter-year-end').value, '1');
    assert.match(select('.filter-year-start').getAttribute('aria-valuetext')!, /公元前 1 年/);
    await input('.filter-year-start', '5');
    assert.equal(select<HTMLInputElement>('input[name="from"]').value, '1');
    assert.equal(select<HTMLInputElement>('.filter-year-start').value, '1');
    await input('.filter-year-end', '-5');
    assert.equal(select<HTMLInputElement>('.filter-year-end').value, '1');
    await input('.filter-year-start', '0');
    assert.equal(select<HTMLInputElement>('input[name="from"]').value, '-1');
    await submit();
    assert.equal(fixture.applied[0].from, 0); assert.equal(fixture.applied[0].to, 1); assert.equal(fixture.applied[0].period, '');
  } finally { await fixture.cleanup(); }
});

test('invalid input disables Apply, reports error, and cannot submit stale range', async () => {
  const fixture = await mount();
  try {
    await input('input[name="from"]', '0');
    assert.equal(select<HTMLButtonElement>('.filter-sheet-apply').disabled, true);
    assert.equal(select('input[name="from"]').getAttribute('aria-invalid'), 'true');
    assert.match(select('#filter-year-hint').textContent!, /非零整数/);
    await submit(); assert.equal(fixture.applied.length, 0);
    await input('input[name="from"]', '-1');
    assert.equal(select<HTMLButtonElement>('.filter-sheet-apply').disabled, false);
    await submit(); assert.equal(fixture.applied[0].from, 0);
  } finally { await fixture.cleanup(); }
});

test('Reset is a draft operation; preserves sort while clearing all filtering including keyword', async () => {
  const fixture = await mount({ ...initial, q: '词', category: 'culture', scope: 'subset', period: 'early', to: 5, all: false });
  try {
    await click('.filter-sheet-reset');
    assert.equal(fixture.applied.length, 0);
    assert.equal(select<HTMLInputElement>('input[name="to"]').value, '2026');
    assert.equal(doc.querySelector('.filter-sheet-search'), null);
    await submit(); assert.deepEqual(fixture.applied[0], initial);
  } finally { await fixture.cleanup(); }
});

test('native cancellation is handled and scroll-lock styles/position are restored on dismissal', async () => {
  doc.body.style.position = 'relative'; doc.body.style.width = '92%'; doc.body.style.top = '3px'; doc.body.style.overflow = 'clip';
  const fixture = await mount();
  try {
    assert.equal(doc.body.style.position, 'fixed'); assert.equal(doc.body.style.top, '-315px'); assert.equal(doc.body.style.overflow, 'hidden');
    const event = new window.Event('cancel', { cancelable: true });
    await act(async () => { select('dialog').dispatchEvent(event); });
    assert.equal(event.defaultPrevented, true); assert.equal(fixture.cancelled, 1); assert.equal(fixture.applied.length, 0);
  } finally { await fixture.cleanup(); }
  assert.equal(doc.body.style.position, 'relative'); assert.equal(doc.body.style.width, '92%'); assert.equal(doc.body.style.top, '3px'); assert.equal(doc.body.style.overflow, 'clip');
  assert.equal(scrolls.at(-1), 315);
  doc.body.removeAttribute('style');
});

test('Tab and Shift+Tab wrap between the enabled dialog endpoints, skipping a disabled Apply button', async () => {
  const fixture = await mount();
  async function key(element: HTMLElement, shiftKey = false, key = 'Tab') {
    element.focus();
    const event = new window.KeyboardEvent('keydown', { key, shiftKey, bubbles: true, cancelable: true });
    await act(async () => { element.dispatchEvent(event); });
    return event;
  }
  try {
    const first = select<HTMLButtonElement>('button[aria-label="关闭筛选，不保存更改"]');
    const apply = select<HTMLButtonElement>('.filter-sheet-apply');
    const reset = select<HTMLButtonElement>('.filter-sheet-reset');
    let event = await key(apply);
    assert.equal(event.defaultPrevented, true); assert.equal(doc.activeElement, first);
    event = await key(first, true);
    assert.equal(event.defaultPrevented, true); assert.equal(doc.activeElement, apply);
    // Interior Tab navigation is left to the browser; arrow keys are not trapped.
    event = await key(reset);
    assert.equal(event.defaultPrevented, false);
    event = await key(first, false, 'ArrowRight');
    assert.equal(event.defaultPrevented, false); assert.equal(doc.activeElement, first);
    await input('input[name="from"]', '0');
    assert.equal(apply.disabled, true);
    event = await key(first, true);
    assert.equal(event.defaultPrevented, true); assert.equal(doc.activeElement, reset);
    event = await key(reset);
    assert.equal(event.defaultPrevented, true); assert.equal(doc.activeElement, first);
    await input('input[name="from"]', '-1');
    assert.equal(apply.disabled, false);
    event = await key(first, true);
    assert.equal(event.defaultPrevented, true); assert.equal(doc.activeElement, apply);
    assert.equal(fixture.applied.length, 0); assert.equal(fixture.cancelled, 0);
  } finally { await fixture.cleanup(); }
});
