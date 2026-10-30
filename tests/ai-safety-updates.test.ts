import test from 'node:test';
import assert from 'node:assert/strict';
import { safetyEvents, safetySources, safetyEntities } from '../src/topics/ai/safety-updates';
import { aiCatalog } from '../src/topics/ai/adapter';
import { validateCatalog } from '../src/core/validate';
import { createExplorerPayload } from '../src/core/explorer-payload';

test('AI safety additions retain distinct announcement and assessment status', () => {
  assert.deepEqual(validateCatalog(aiCatalog), []);
  assert.equal(safetyEvents.length, 2);
  const [lab, analysis] = safetyEvents;
  assert.equal(lab.date, '2026-10-24');
  assert.equal(analysis.date, '2026-10-23');
  assert.match(lab.summary, /正在设立/);
  assert.match(JSON.stringify(lab), /最高 1 亿英镑/);
  assert.match(JSON.stringify(lab), /不能全部当成现金到账/);
  assert.match(analysis.title, /分别发布/);
  assert.match(analysis.limitation, /不是原事件发生日/);
  assert.match(JSON.stringify(analysis.details), /43.*9/);
  assert.match(JSON.stringify(analysis.details), /情境.*较低的越界率不必然等于对齐改善/);
  assert.equal(safetySources.find(source => source.id === 'aisi-organisation-date-index')!.publishedAt, undefined);
  assert.equal(safetyEntities[0].type, 'organization');
  for (const event of safetyEvents) {
    assert.ok(event.milestone);
    assert.equal(event.details!.filter(section => section.editorial).length, 1);
    assert.ok(event.recommendedResources?.[0].url.startsWith('https://'));
  }
});
test('AI safety source records are specific, dated, and excluded from browser detail payloads', () => {
  for (const source of safetySources) {
    assert.ok(source.locator);
    assert.equal(source.checkedAt, '2026-10-24');
    assert.notEqual(new URL(source.url).pathname, '/');
  }
  const payload = JSON.stringify(createExplorerPayload(aiCatalog));
  assert.ok(!payload.includes('uk-aibl-scope-reading'));
  assert.ok(!payload.includes('Methods limitations'));
});
