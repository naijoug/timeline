import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { guanduCampaignMap } from '../src/topics/china-history/guandu-campaign-map';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventSourceIds } from '../src/core/evidence';
import { validateCatalog } from '../src/core/validate';

test('Guandu stage diagram is original, static and explicitly tied to its event', () => {
  const event = chinaHistory.events.find(item => item.id === 'guandu')!;
  assert.equal(event.maps?.[0], guanduCampaignMap);
  assert.equal(event.time.start.year, 200);
  assert.equal(guanduCampaignMap.kind, 'schematic');
  assert.match(guanduCampaignMap.license.label, /原创.*未复制第三方地图/);
  assert.ok(guanduCampaignMap.sourceIds.every(id => eventSourceIds(event).includes(id)));
  const svg = readFileSync(`public${guanduCampaignMap.assetPath}`, 'utf8');
  assert.match(svg, /width="640" height="1230"/);
  assert.ok(Buffer.byteLength(svg) < 8_000);
  assert.doesNotMatch(svg, /<script|<image|<foreignObject|(?:href|src)=/);
  assert.deepEqual(validateCatalog(chinaHistory), []);
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  for (const detail of [guanduCampaignMap.assetPath, guanduCampaignMap.scopeNote]) assert.ok(!payload.includes(detail));
});

test('Guandu reading keeps ancient dates, feint, directions and source layers distinct', () => {
  const points = guanduCampaignMap.readingPoints!;
  assert.equal(points.length, 4);
  assert.match(guanduCampaignMap.scopeNote, /各窗独立、非按比例/);
  assert.match(guanduCampaignMap.scopeNote, /不直接换算为公历月份/);
  assert.match(points[0].scopeNote, /不据此认定曹军已.*实际渡河/);
  assert.match(points[1].text, /沿河向西.*袁绍渡河追击/);
  assert.match(points[2].scopeNote, /不是向东或向西行军/);
  assert.match(points[3].text, /乌巢、故市.*裴松之注.*曹瞒传/);
  assert.match(points[3].scopeNote, /相对袁绍营，不是曹营或官渡城.*不换算/);
  assert.ok(points.every(point => point.sourceIds.every(id => guanduCampaignMap.sourceIds.includes(id)) && point.locator && point.scopeNote));
  const svg = readFileSync(`public${guanduCampaignMap.assetPath}`, 'utf8');
  assert.match(svg, /袁绍渡河败退/);
  assert.match(svg, /乌巢地名见裴注/);
  assert.doesNotMatch(svg, /公里|袁绍北归|东北|精准/);
});
