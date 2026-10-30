import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Timeline from '../src/components/Timeline';

test('entity timeline does not contradict newer events with a hard-coded cutoff month', () => {
  const html = renderToStaticMarkup(createElement(Timeline, { track: 'methods', entityId: 'aws-sagemaker-training-sessions' }));
  assert.match(html, /2026年10月22日/);
  assert.match(html, /持续整理中 · 日期与资料见各事件/);
  assert.doesNotMatch(html, /已收录事件更新至/);
});
