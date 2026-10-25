import test from 'node:test';
import assert from 'node:assert/strict';
import { verificationTrainingEvents, verificationTrainingSources } from '../src/topics/ai/verification-training-updates';
import { aiCatalog } from '../src/topics/ai/adapter';
import { eventLane } from '../src/topics/ai/config';
import { createExplorerPayload } from '../src/core/explorer-payload';

test('formal verification distinguishes reported research, public proofs and assumptions', () => {
  const event = verificationTrainingEvents.find(event => event.id === 'anthropic-theorem-formal-verification')!;
  assert.equal(event.date, '2026-10-22');
  assert.match(event.dateLabel!, /报告发布/);
  assert.deepEqual(event.entityIds, ['formal-software-verification']);
  assert.match(event.details![0].text, /123.*25.*60/);
  assert.match(event.details![1].text, /单线程.*RISC-V\/Linux/);
  assert.match(event.limitation, /不能宣称软件完全无漏洞/);
  assert.match(event.recommendedResources![0].scopeNote, /未下载执行或独立重跑/);
  assert.equal(eventLane(event), 'methods');
});

test('training sessions is a GA platform event, not a model or agent release', () => {
  const event = verificationTrainingEvents.find(event => event.id === 'aws-sagemaker-training-sessions-ga')!;
  assert.equal(event.date, '2026-10-22');
  assert.match(event.dateLabel!, /正式可用公告/);
  assert.equal(eventLane(event), 'methods');
  assert.equal(event.milestone, false);
  assert.match(event.limitation, /不是新基础模型.*模型清单并不完全一致/);
  assert.match(event.details![1].text, /不代表所有区域.*不代表免费/);
  assert.match(event.recommendedResources![0].scopeNote, /未创建云资源/);
});

test('new researched entries have citations, separate commentary and lightweight indexes', () => {
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  for (const event of verificationTrainingEvents) {
    assert.equal(aiCatalog.events.filter(item => item.id === event.id).length, 1);
    assert.equal(event.details!.filter(section => section.editorial).length, 1);
    assert.ok(event.details!.filter(section => !section.editorial).every(section => section.sourceIds?.length && section.locator));
    assert.ok(event.recommendedResources!.every(resource => resource.creator && resource.series && resource.match && resource.checkedAt === '2026-10-25'));
    for (const resource of event.recommendedResources!) assert.ok(!payload.includes(resource.id));
  }
  assert.ok(verificationTrainingSources.every(source => source.checkedAt === '2026-10-25'));
});
