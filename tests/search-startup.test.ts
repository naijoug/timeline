import test from 'node:test';
import assert from 'node:assert/strict';
import { aiExplorerPresentation } from '../src/topics/ai/explorer';

test('AI footer points to individual evidence instead of claiming a full-catalog verification date', () => {
  const footer = aiExplorerPresentation().footer;
  assert.equal(footer, '来源与核查日期见各事件 · 持续整理');
  assert.doesNotMatch(footer!, /本轮核查|\d{4}-\d{2}-\d{2}/);
});
