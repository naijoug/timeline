import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('reading typography pairs self-hosted Fira Code with local CJK sans without remote font requests', () => {
  const paper = source('src/styles/paper.css');
  assert.match(paper, /--paper-sans:'Fira Code',system-ui[^;]*'PingFang SC'[^;]*'Noto Sans CJK SC'[^;]*sans-serif;/);
  for (const file of readdirSync(new URL('../src/styles/', import.meta.url)).filter(file => file.endsWith('.css'))) {
    const css = source(`src/styles/${file}`);
    assert.doesNotMatch(css, /fonts\.googleapis\.com|font-family:\s*['"]?(?:Newsreader|Georgia|Songti)/, file);
  }
});

test('mobile event summaries remain complete and the document remains the scroll surface', () => {
  const css = source('src/styles/mobile-timeline.css');
  assert.doesNotMatch(css, /line-clamp|text-overflow:\s*ellipsis/);
  assert.match(css, /\.chronicle-app\s*\{[^}]*height:auto;[^}]*overflow:visible;/);
  assert.match(css, /\.chronicle-event-scroll\s*\{[^}]*overflow:visible;/);
  assert.match(css, /border-radius:7px 24px 7px 24px/);
  assert.match(source('src/components/timeline/Explorer.tsx'), /<span className="mobile-event-summary">\{event\.summary\}<\/span>/);
});

test('homepage retains four distinct real topic links and mobile offers one readable column', () => {
  const home = source('src/pages/index.astro');
  for (const path of ['/ai/', '/programming-languages/', '/china-history/', '/writers/']) assert.ok(home.includes(`path: '${path}'`));
  assert.match(home, /class="topic-card" href=\{sitePath\(topic\.path\)\}/);
  assert.match(source('src/styles/library.css'), /grid-template-columns:minmax\(0,1fr\);/);
});

test('theme-color bootstrap and appearance changes match the actual paper backgrounds', () => {
  const css = source('src/styles/paper.css');
  for (const color of [css.match(/html:root\s*\{\s*--paper-bg:(#[\da-f]+)/)![1], css.match(/html\[data-theme='dark'\]\s*\{\s*--paper-bg:(#[\da-f]+)/)![1]]) {
    assert.ok(source('src/lib/appearance.ts').includes(color));
    assert.ok(source('src/layouts/Layout.astro').includes(color));
  }
});

test('Fira Code is a small genuine bundled variable WOFF2 with its redistributable license', () => {
  const font = readFileSync(new URL('../src/assets/fonts/fira-code-latin-wght-normal.woff2', import.meta.url));
  assert.equal(font.subarray(0, 4).toString(), 'wOF2');
  assert.ok(font.length < 50000);
  assert.equal(createHash('sha256').update(font).digest('hex'), '771bf4b79a97fc005d12866168bd39d868a9dd3d5903008fe8b796723c8a56f4');
  assert.match(source('public/fonts/FiraCode-OFL.txt'), /SIL OPEN FONT LICENSE Version 1.1/);
  const css = source('src/styles/paper.css');
  assert.match(css, /font-family:'Fira Code';/);
  assert.match(css, /font-weight:300 700;/);
  assert.match(css, /font-display:swap;/);
  assert.match(source('src/layouts/Layout.astro'), /rel="preload" href=\{firaCodeUrl\} as="font" type="font\/woff2" crossorigin="anonymous"/);
});
