import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
const root = resolve('dist');
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)]))).flat();
}
const pages = (await files(root)).filter(p => p.endsWith('.html'));
const errors = [];
let checked = 0;
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const path = new URL(href.replaceAll('&amp;', '&'), 'http://local.test').pathname;
    const target = join(root, decodeURIComponent(path), path.endsWith('/') ? 'index.html' : '');
    try { if (!(await stat(target)).isFile()) throw new Error('not file'); }
    catch { errors.push(`${page.slice(root.length)} -> ${path}`); }
    checked++;
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Static links verified: ${checked} internal links across ${pages.length} pages.`);
