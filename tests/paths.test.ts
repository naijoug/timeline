import test from 'node:test';
import assert from 'node:assert/strict';
import { sitePath } from '../src/lib/paths';

test('root hosting preserves local paths', () => {
  assert.equal(sitePath('/ai/', '/'), '/ai/');
  assert.equal(sitePath('/favicon.svg', '/'), '/favicon.svg');
});
test('project hosting prefixes assets, pages and query links exactly once', () => {
  assert.equal(sitePath('/ai/', '/timeline/'), '/timeline/ai/');
  assert.equal(sitePath('/favicon.svg', '/timeline'), '/timeline/favicon.svg');
  assert.equal(sitePath('/ai/?event=qwen-3#main', '/timeline/'), '/timeline/ai/?event=qwen-3#main');
  assert.equal(sitePath('/timeline/ai/', '/timeline/'), '/timeline/ai/');
  assert.equal(sitePath('/timeline?event=qwen-3', '/timeline/'), '/timeline?event=qwen-3');
});
test('external sources and hash anchors are not prefixed', () => {
  for (const value of ['https://example.org/paper', '//example.org/file', '#main']) {
    assert.equal(sitePath(value, '/timeline/'), value);
  }
});
