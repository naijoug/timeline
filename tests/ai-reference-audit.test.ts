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

test('specific facts have readable evidence and gated weights are not described as anonymous downloads', () => {
  assert.ok(event('turing-test').sourceIds.includes('turing-original-scan'));
  assert.match(source('turing-original-scan').url, /csee\.umbc\.edu.*\.pdf$/);
  const feedback = event('constitutional-ai').details?.find(section => section.label === '反馈阶段');
  assert.ok(feedback?.sourceIds?.includes('dpo'));
  assert.match(feedback?.text ?? '', /编辑比较/);
  const billing = event('aws-sagemaker-training-sessions-ga').details?.find(section => section.label === '可用性与费用边界');
  assert.deepEqual(billing?.sourceIds, ['aws-training-sessions-ga']);
  assert.match(billing?.text ?? '', /token 计费/);
  const muse = event('muse-spark-open');
  assert.ok(muse.sourceIds.includes('muse-spark-open-files'));
  assert.match(muse.note ?? '', /未下载或运行/);
  assert.match(muse.details?.[0].text ?? '', /Gated model/);
});

test('citation corrections refresh only the individually checked source dates', () => {
  for (const id of ['cursor-agent', 'gemini15', 'glm45', 'ui-tars-paper', 'release-cowork-announcement', 'release-glm-4-5v', 'release-autoglm-phone-multilingual']) {
    assert.equal(source(id).checkedAt, '2026-10-26', id);
  }
  assert.equal(source('llama2').checkedAt, '2026-09-29');
});


test('thematic concepts are not fabricated as publishers in generated narratives', () => {
  for (const id of ['formal-neuron', 'logic-theorist', 'dartmouth-proposal', 'lisp', 'eliza', 'shakey']) {
    const item = event(id);
    assert.ok(!item.facts?.some(fact => fact.label === '相关机构 / 团队'));
    assert.ok(!item.details?.some(section => /公开资料的发布 \/ 发表方是/.test(section.text)));
  }
  const item = event('cursor-agent-introduction');
  const narrative = item.details?.find(section => section.label === '事件经过');
  assert.ok(narrative?.sourceIds?.includes('cursor-agent'));
  assert.ok(item.details?.some(section => section.editorial));
});


test('Pangu announcement distinguishes available MoE weights from planned 7B availability', () => {
  const item = event('pangu-open');
  assert.match(item.title, /7B 仍待上线/);
  assert.match(item.change?.improvements.join('') ?? '', /7B.*计划/);
  assert.match(item.note ?? '', /不将 7B 的上线计划视为当日可下载/);
});

test('capability and later availability claims retain their precise source scopes', () => {
  for (const [id, sid] of [
    ['gpt-4-turbo-preview', 'gpt4-turbo-devday-announcement'],
    ['o1-api', 'o1-api-developer-announcement'],
    ['gemma-3', 'gemma3-model-card'],
    ['gemini-4-argon-preview', 'gap-gemini-4-argon-ga'],
    ['minimax-m3-1-flash', 'gap-minimax-m3-1-flash-weights'],
    ['muse-spark-open', 'muse-spark-open-files'],
  ]) {
    assert.ok(event(id).sourceIds.includes(sid), id);
    assert.ok(event(id).change?.sourceIds.includes(sid), `${id} comparison`);
  }
  assert.match(source('gpt4-turbo-devday-announcement').locator ?? '', /403（非404）/);
  assert.match(source('o1-api-developer-announcement').locator ?? '', /403（非404）/);
  assert.match(source('glm45-repo').locator ?? '', /不使用后续/);
});
