import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = resolve(process.env.TIMELINE_OUT_DIR || 'dist');
const base = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const topics = ['ai', 'programming-languages', 'china-history', 'writers'];
export function pageMetrics(root, path) {
  const html = readFileSync(join(root, path, 'index.html'), 'utf8');
  const assets = new Set();
  const visit = url => {
    const asset = basename(url);
    if (!asset.endsWith('.js') || assets.has(asset)) return;
    const file = join(root, '_astro', asset);
    if (!existsSync(file)) return;
    assets.add(asset);
    const text = readFileSync(file, 'utf8');
    for (const match of text.matchAll(/["']\.\/([^"']+\.js)["']/g)) visit(match[1]);
  };
  for (const match of html.matchAll(/(?:component-url|renderer-url|src)="([^"]+\.js)"/g)) visit(match[1]);
  const files = [...assets].map(asset => readFileSync(join(root, '_astro', asset)));
  return {
    html: Buffer.byteLength(html), htmlGzip: gzipSync(html).length,
    js: files.reduce((n, b) => n + b.length, 0), jsGzip: files.reduce((n, b) => n + gzipSync(b).length, 0),
    assets: [...assets],
  };
}
const home = pageMetrics(root, '');
const metrics = {};
for (const topic of topics) {
  const html = readFileSync(join(root, topic, 'index.html'), 'utf8');
  const result = pageMetrics(root, topic);
  metrics[topic] = { ...result, newJsFromHome: result.assets.filter(asset => !home.assets.includes(asset)).reduce((n, asset) => n + readFileSync(join(root, '_astro', asset)).length, 0) };
  assert.ok(result.js < 290_000, `${topic}: browser JS exceeded 290 KB (full catalog must stay server-only)`);
  assert.ok(!result.assets.some(name => /^(Atlas|Timeline|timeline)\./.test(name)), `${topic}: old data-heavy client bundle leaked into the route`);
  const island = html.match(/<astro-island[^>]*component-url="[^"]*TopicExplorer[^>]*>/)?.[0] || '';
  assert.match(island, /await-children/, 'hydration must wait for its trailing data script');
  const props = island.match(/props="([^"]*)"/)?.[1] || '';
  assert.ok(props.length < 1_000, `${topic}: full props attribute blocks streamed content`);
  const dataMatch = html.match(new RegExp(`<script id="timeline-payload-${topic}" type="application/json">([\\s\\S]*?)<\\/script>`));
  assert.ok(dataMatch, `${topic}: missing compact index`);
  const payload = JSON.parse(dataMatch[1]);
  assert.equal(payload.catalog.topic.id, topic);
  assert.ok(html.indexOf('class="chronicle-event-button"') < dataMatch.index, `${topic}: visible SSR cards must precede data`);
  assert.ok(html.indexOf('<!--astro:end-->', dataMatch.index) > dataMatch.index, `${topic}: data must be inside the island hydration boundary`);
  for (const event of payload.catalog.events) {
    for (const field of ['significance', 'details', 'facts', 'change', 'note', 'recommendedResources']) assert.equal(field in event, false, `${topic}/${event.id}: ${field} leaked into index`);
  }
  assert.ok(Buffer.byteLength(dataMatch[1]) < payload.catalog.events.length * 750 + 30_000, `${topic}: index grows faster than the summary/search data budget`);
  // Complete static cards and real destinations remain usable before hydration.
  assert.match(html, new RegExp(`href="${base}/${topic}/(?:events|models)/`));
}
const homeHtml = readFileSync(join(root, 'index.html'), 'utf8');
assert.equal((homeHtml.match(/class="topic-card"[^>]*data-astro-prefetch/g) || []).length, 4);
console.log(JSON.stringify({ home, topics: metrics }, null, 2));
console.log('Performance guards passed: compact post-content indexes, no full topic data in route JS, native SSR links and opt-in topic prefetch.');
