import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultExplorer, restoreExplorer, explorerEvents, explorerQuery } from '../src/core/explorer';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { aiCatalog } from '../src/topics/ai/adapter';
import { aiExplorerPresentation } from '../src/topics/ai/explorer';
import { yearCoordinate } from '../src/core/time';

test('shared history view selects a real node, but preserves an explicitly closed reader', () => {
  const initial = defaultExplorer(chinaHistory);
  assert.ok(explorerEvents(chinaHistory, initial).some(e => e.id === initial.selected));
  const closed = { ...initial, selected: '' };
  assert.deepEqual(restoreExplorer(explorerQuery(closed), chinaHistory), closed);
});
test('history BCE windows and selected periods survive shared view URLs without year zero', () => {
  const state = { ...defaultExplorer(chinaHistory), from: yearCoordinate(-221), to: 1, selected: 'qin-unification' };
  const restored = restoreExplorer(explorerQuery(state), chinaHistory);
  assert.equal(restored.from, yearCoordinate(-221));
  assert.equal(restored.to, 1);
  assert.equal(restored.selected, state.selected);
  assert.ok(!explorerQuery(state).includes('from=0'));
  const tang = defaultExplorer(chinaHistory, 'tang');
  assert.ok(explorerEvents(chinaHistory, tang).length > 0);
  assert.ok(explorerEvents(chinaHistory, tang).every(e => e.periodIds.includes('tang')));
});
test('shared explorer retains duration events when a window overlaps only their middle', () => {
  const duration = chinaHistory.events.find(e => e.time.end && e.time.end.year - e.time.start.year > 2)!;
  assert.ok(duration);
  const year = duration.time.start.year + 1;
  const state = { ...defaultExplorer(chinaHistory), from: yearCoordinate(year), to: yearCoordinate(year), all: true };
  assert.ok(explorerEvents(chinaHistory, state).some(e => e.id === duration.id));
});
test('AI legacy links and regional filters retain their behavior in the shared explorer', () => {
  const presentation = aiExplorerPresentation();
  const state = restoreExplorer('?from=2023&to=2025&scope=china&lane=models&all=1&q=Qwen&event=qwen-3', aiCatalog, '', '', presentation);
  assert.equal(state.category, 'models');
  assert.equal(state.scope, 'china');
  assert.equal(state.selected, 'qwen-3');
  const results = explorerEvents(aiCatalog, state, presentation);
  assert.ok(results.some(e => e.id === 'qwen-3'));
  assert.ok(!results.some(e => e.id === 'llama-2'));
  assert.deepEqual(restoreExplorer(presentation.serializeState!(state), aiCatalog, '', '', presentation), state);
  assert.ok(presentation.events?.['llama-2'].change?.improvements.length);
});
test('AI events expose structured facts and source-backed change evidence in the shared reader', () => {
  for (const event of aiCatalog.events) {
    assert.ok(event.facts?.some(fact => fact.label === '发布 / 发表方'), `${event.id} missing publisher fact`);
    assert.ok(event.facts?.some(fact => fact.label === '时间口径'), `${event.id} missing date fact`);
    for (const fact of event.facts || []) for (const id of fact.sourceIds || []) assert.ok(aiCatalog.sources.some(source => source.id === id), `${event.id}: unknown fact source ${id}`);
  }
  const llama = aiCatalog.events.find(event => event.id === 'llama-2')!;
  assert.ok(llama.change?.improvements.length);
  assert.ok(llama.change.sourceIds.every(id => aiCatalog.sources.some(source => source.id === id)));
});
test('AI reading uses curated sections when supplied and retains fallback verification guidance', () => {
  for (const event of aiCatalog.events) {
    const curated = event.details?.some(section => section.locator);
    if (curated) {
      assert.ok(event.details!.length >= 2, `${event.id} lacks context or limits`);
      assert.ok(event.details!.every(section => section.locator && section.text.trim()), `${event.id} lacks traceable reading`);
    } else {
      assert.deepEqual(event.details?.map(section => section.label), ['事件经过', event.change ? '实质变化与解读' : '解读', '怎样核对原文'], `${event.id} missing fallback sections`);
      assert.ok((event.details?.reduce((total, section) => total + section.text.length, 0) || 0) >= 180, `${event.id} fallback is too thin`);
    }
    for (const section of event.details || []) assert.ok((section.sourceIds || []).length, `${event.id}: ${section.label} missing source`);
    assert.ok(event.details?.every(section => section.text.includes('核对原文时先读') || section.label !== '怎样核对原文'));
  }
});
