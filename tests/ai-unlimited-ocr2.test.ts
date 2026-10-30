import test from 'node:test';
import assert from 'node:assert/strict';
import { unlimitedOcrEvents, unlimitedOcrSources } from '../src/topics/ai/unlimited-ocr2-release';
import { events } from '../src/topics/ai/events';
import { aiCatalog } from '../src/topics/ai/adapter';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { aiPresentation } from '../src/topics/ai/config';

test('Unlimited-OCR 2 distinguishes announcement, available weights and deployment limits', () => {
  const event = unlimitedOcrEvents[0];
  assert.equal(events.filter(e => e.id === event.id).length, 1);
  assert.equal(event.date, '2026-10-27');
  assert.equal(event.kind, '权重开放');
  assert.equal(event.milestone, false);
  assert.deepEqual(event.entityIds, ['unlimited-ocr']);
  assert.match(JSON.stringify(event), /6,687,958,536/);
  assert.match(event.limitation!, /未下载权重.*独立复测/);
  assert.match(JSON.stringify(event.details), /跨窗口.*上下文/);
  assert.equal(event.change?.evidence, '厂商报告');
  assert.ok(unlimitedOcrSources.every(s => s.checkedAt === '2026-10-27'));
  assert.ok(unlimitedOcrSources.filter(s => s.url.includes('huggingface')).every(s => s.url.includes('04647c7a6098d8d58915f003536a741c82eafb40')));
});

test('Unlimited-OCR detail has attributed evidence and stays out of lightweight explorer data', () => {
  const event = unlimitedOcrEvents[0];
  assert.equal(event.details?.filter(d => d.editorial).length, 1);
  assert.ok(event.details?.every(d => d.sourceIds?.length && d.locator));
  assert.ok(event.recommendedResources?.every(r => r.creator && r.scopeNote && r.match));
  assert.ok(events.some(e => e.id === aiPresentation.latestEvent && e.date >= event.date));
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(payload.includes(event.id));
  assert.ok(!payload.includes('unlimited-ocr2-reading'));
  assert.ok(!payload.includes('6,687,958,536'));
});
