import test from 'node:test';
import assert from 'node:assert/strict';
import { aiCatalog } from '../src/topics/ai/adapter';

const source = (id: string) => {
  const item = aiCatalog.sources.find(item => item.id === id);
  assert.ok(item, `Missing source ${id}`);
  return item;
};
const event = (id: string) => {
  const item = aiCatalog.events.find(item => item.id === id);
  assert.ok(item, `Missing event ${id}`);
  return item;
};

test('AI citations retain exact historical destinations instead of broken or category URLs', () => {
  assert.equal(source('cursor-agent').url, 'https://cursor.com/changelog/0-43-x');
  assert.equal(source('release-cowork-announcement').url, 'https://support.claude.com/en/articles/12138966-release-notes');
  assert.equal(source('release-glm-4-5v').url, 'https://github.com/zai-org/GLM-V');
  assert.equal(source('gemini15').url, 'https://blog.google/innovation-and-ai/products/google-gemini-next-generation-model-february-2024/');
  assert.ok(event('ui-tars-research').sourceIds.includes('ui-tars-paper'));
  assert.equal(source('ui-tars-paper').url, 'https://arxiv.org/abs/2501.12326');
});

test('AutoGLM phone date describes the verified weight upload, not an unsupported launch day', () => {
  const item = event('autoglm-phone-multilingual');
  assert.deepEqual(item.time.start, { year: 2025, month: 12, day: 9 });
  assert.match(item.title, /权重上传/);
  assert.match(source('release-autoglm-phone-multilingual').url, /\/commit\/118ebd2c2262b40fb64d8adfbb632ccf627af532$/);
  assert.ok(item.sourceIds.includes('autoglm-phone-framework'));
});
