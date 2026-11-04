import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chinaHistory } from '../src/topics/china-history/catalog';
import { juluCampaignMap, juluMapSources } from '../src/topics/china-history/julu-campaign-map';
import { historicalMapPeriodEvents } from '../src/topics/china-history/historical-maps';
import { createExplorerPayload } from '../src/core/explorer-payload';
import { eventSourceIds } from '../src/core/evidence';
import { validateCatalog } from '../src/core/validate';

test('Julu map reuses the Qin event, static evidence and original compact artwork', () => {
  const event = chinaHistory.events.find(item => item.id === 'julu')!;
  assert.equal(event.maps?.[0], juluCampaignMap);
  assert.equal(event.time.start.year, -207);
  assert.ok(historicalMapPeriodEvents.qin.includes('julu'));
  assert.ok(!historicalMapPeriodEvents.han.includes('julu'));
  assert.match(juluCampaignMap.license.label, /原创.*未复制第三方地图/);
  assert.ok(juluCampaignMap.sourceIds.every(id => eventSourceIds(event).includes(id)));
  const svg = readFileSync(`public${juluCampaignMap.assetPath}`, 'utf8');
  assert.match(svg, /width="640" height="1270"/);
  assert.ok(Buffer.byteLength(svg) < 7_000);
  assert.doesNotMatch(svg, /<script|<image|<foreignObject|(?:href|src)=/);
  assert.deepEqual(validateCatalog(chinaHistory), []);
  const payload = JSON.stringify(createExplorerPayload(chinaHistory));
  for (const detail of [juluCampaignMap.assetPath, juluCampaignMap.scopeNote, ...juluCampaignMap.sourceIds]) assert.ok(!payload.includes(detail));
});

test('Julu guide preserves narrative disagreement and rejects invented crossing geometry', () => {
  const points = juluCampaignMap.readingPoints!;
  assert.equal(points.length, 4);
  assert.equal(juluCampaignMap.kind, 'schematic');
  assert.match(juluCampaignMap.scopeNote, /四窗独立、非按比例/);
  assert.match(juluCampaignMap.scopeNote, /不将原文的“河”直接指定/);
  assert.match(juluCampaignMap.scopeNote, /不是“破釜沉舟”四字用语的首见年/);
  assert.match(points[0].scopeNote, /南北以巨鹿为参照，不是行军方向/);
  assert.match(points[1].scopeNote, /没有提供精确渡口/);
  assert.match(points[3].text, /先记项羽多次断甬道.*再记悉渡.*随后诸侯参战/);
  assert.match(points[3].scopeNote, /不是两份独立现场报告.*章邯后来投降/);
  assert.ok(points.every(point => point.sourceIds.every(id => juluCampaignMap.sourceIds.includes(id)) && point.locator && point.scopeNote));
  assert.ok(juluMapSources.every(source => new URL(source.url).searchParams.has('oldid')));
  const svg = readFileSync(`public${juluCampaignMap.assetPath}`, 'utf8');
  assert.match(svg, /虚线表示供粮关系，不是粮道走向/);
  assert.match(svg, /对断粮、悉渡、诸侯参战次序不同/);
  assert.doesNotMatch(svg, /漳河|公里|北渡|南渡/);
});
