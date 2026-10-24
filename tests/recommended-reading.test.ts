import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { validateCatalog } from '../src/core/validate';
import type { Catalog, RecommendedResource } from '../src/core/types';

const resource: RecommendedResource = {
  id: 'example-lecture', title: '专题讲座', creator: '研究机构',
  kind: 'lecture', url: 'https://example.org/lectures/event',
  match: '本集直接讨论此事件的背景与史料。',
  scopeNote: '讲座的解释与评价属于作者，不替代事实来源。',
  checkedAt: '2026-10-24', locator: '课程内容提要',
};
const withResource = (value: RecommendedResource): Catalog => ({
  ...chinaHistory,
  events: chinaHistory.events.map((event, index) => index ? event : { ...event, recommendedResources: [value] }),
});

test('recommended reading validates identity, exact topic match, scope and HTTPS independently from sources', () => {
  assert.deepEqual(validateCatalog(withResource(resource)), []);
  for (const invalid of [
    { ...resource, url: 'javascript:alert(1)' },
    { ...resource, match: '' },
    { ...resource, scopeNote: '' },
    { ...resource, creator: '' },
    { ...resource, checkedAt: '2026-02-30' },
  ]) assert.ok(validateCatalog(withResource(invalid)).some(error => error.includes(resource.id)));
  const duplicated = withResource(resource);
  duplicated.events[0].recommendedResources!.push(resource);
  assert.ok(validateCatalog(duplicated).some(error => error.includes('duplicate id')));
});

test('recommendations never become timeline evidence or leak into browser search indexes', () => {
  const catalog = withResource(resource);
  const payload = createExplorerPayload(catalog);
  assert.equal('recommendedResources' in payload.catalog.events[0], false);
  assert.ok(!JSON.stringify(payload).includes(resource.url));
  assert.ok(!catalog.sources.some(source => source.url === resource.url));
});

test('static recommendations explicitly separate author interpretation, event matching and access caveats', () => {
  const component = readFileSync('src/components/timeline/RecommendedReading.astro', 'utf8');
  const page = readFileSync('src/pages/china-history/events/[slug].astro', 'utf8');
  assert.match(component, /不替代上面的史料依据/);
  assert.match(component, /resource\.match/);
  assert.match(component, /resource\.scopeNote/);
  assert.match(component, /resource\.creator/);
  assert.match(component, /rel="noopener noreferrer"/);
  assert.match(page, /slot="further-reading" resources=\{event\.recommendedResources\}/);
});
