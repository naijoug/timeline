import test from 'node:test';
import assert from 'node:assert/strict';
import { groot2Entities, groot2Events, groot2Sources } from '../src/topics/ai/groot2-research';

test('GR00T 2 uses the announcement day without inventing a precise research date', () => {
  const event = groot2Events[0];
  assert.equal(event.date, '2026-11-09');
  assert.match(event.dateLabel!, /官方公告日期/);
  assert.equal(groot2Sources[0].publishedAt, '2026-11-09');
  assert.equal(groot2Sources[1].publishedAt, '2026-11');
  assert.deepEqual(event.tracks, ['models']);
  assert.equal(event.milestone, false);
  assert.equal(event.kind, '机器人模型研究公告');
});

test('GR00T 2 separates research claims from availability and editorial interpretation', () => {
  const event = groot2Events[0];
  assert.match(event.limitation, /不是现有下载或 API 开放公告/);
  assert.match(event.limitation, /Code Available in December/);
  assert.match(event.limitation, /权重与许可未核验/);
  assert.match(event.details![3].text, /不是 GR00T 2 模型权重/);
  assert.match(event.details![2].text, /厂商报告.*未复现实验/);
  assert.match(event.details![1].text, /联合去噪未来视频与动作/);
  assert.equal(event.change!.evidence, '厂商报告');
  assert.ok(event.change!.improvements.length > 0);
  assert.equal(event.details!.length, 5);
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  assert.doesNotMatch(JSON.stringify(event), /Isaac Lab 3\.0.*首次发布/);
});

test('GR00T 2 local evidence references resolve and offer a scoped reading entry', () => {
  const sourceIds = new Set(groot2Sources.map(source => source.id));
  const entityIds = new Set(groot2Entities.map(entity => entity.id));
  const event = groot2Events[0];
  for (const id of event.entityIds) assert.ok(entityIds.has(id));
  for (const item of [...groot2Entities, event, event.change!, ...event.details!]) {
    assert.ok(item.sourceIds?.length);
    for (const id of item.sourceIds!) assert.ok(sourceIds.has(id));
  }
  assert.ok(event.details!.every(section => section.locator));
  assert.ok(groot2Sources.every(source => source.checkedAt === '2026-11-10'));
  assert.ok(event.recommendedResources!.every(resource => resource.creator && resource.match && resource.scopeNote && resource.locator));
});
