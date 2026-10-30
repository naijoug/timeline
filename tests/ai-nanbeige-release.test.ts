import test from 'node:test';
import assert from 'node:assert/strict';
import { nanbeigeEvents, nanbeigeSources, nanbeigeEntities } from '../src/topics/ai/nanbeige-release';
import { events } from '../src/topics/ai/events';
import { aiCatalog } from '../src/topics/ai/adapter';
import { eventLane } from '../src/topics/ai/config';
import { defaultAtlas, filterAtlas } from '../src/lib/atlas';
import { createExplorerPayload } from '../src/core/explorer-payload';

test('Nanbeige preserves upload date and actual weights vs future student/report', () => {
  const event = nanbeigeEvents[0];
  assert.equal(event.date, '2026-10-24');
  assert.match(event.dateLabel!, /权重上传日/);
  assert.equal(event.kind, '权重开放');
  assert.equal(eventLane(event), 'models');
  assert.match(event.limitation, /不据此推定.*精确时刻/);
  assert.match(event.details![1].text, /14个.*未下载或运行/);
  assert.match(event.details![2].text, /后续3B学生模型/);
  assert.equal(event.change?.evidence, '厂商报告');
  assert.equal(event.change?.baselineEventId, undefined);
  assert.ok(nanbeigeSources.some(source => source.publishedAt === event.date && source.url.endsWith('0dacc64718ab6a5a7cbfc74cacc663d6c5c3de05')));
  assert.ok(nanbeigeSources.every(source => source.checkedAt === '2026-10-26'));
});

test('Nanbeige is one cited China-model entry with a separate family and bounded reading resource', () => {
  const event = nanbeigeEvents[0];
  assert.equal(events.filter(item => item.id === event.id).length, 1);
  assert.equal(nanbeigeEntities[0].type, 'family');
  const filtered = filterAtlas(events, { ...defaultAtlas(), from: 2026, to: 2026, all: true, scope: 'china', lane: 'models' });
  assert.ok(filtered.some(item => item.id === event.id));
  assert.ok(event.details!.every(section => section.sourceIds?.length && section.locator));
  assert.equal(event.details!.filter(section => section.editorial).length, 1);
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(!payload.includes('nanbeige43-card-reading'));
});
