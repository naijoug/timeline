import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

export const REFS = Object.freeze({ A: 'aa79d2115c73067e34b51527585a2b321da11cd1', B: '012ce7acb7b438653acf679323d7fc8e1f824c49' });
export const TITLES = Object.freeze([
  'nvidia-groot2-research: evidence, availability boundaries and light/dark reading',
  'nvidia-groot2-research: full-library search, return focus and two Back/Forward cycles',
]);
export const PLAN = Object.freeze([
  { id: '01-A-off', source: 'A', trace: 'off' },
  { id: '02-B-off', source: 'B', trace: 'off' },
  { id: '03-B-off', source: 'B', trace: 'off' },
  { id: '04-A-off', source: 'A', trace: 'off' },
  { id: '05-A-on', source: 'A', trace: 'on' },
  { id: '06-B-on', source: 'B', trace: 'on' },
]);
const escapeRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export function diagnosticConfig(original, source, output, trace) {
  if (!['off', 'on'].includes(trace)) throw new Error('Invalid diagnostic trace cohort');
  if (original.workers !== 1 || original.retries !== 0 || original.timeout !== 45000 || original.globalTimeout !== 420000) throw new Error('Original acceptance settings changed');
  if (original.use?.trace !== 'retain-on-failure' || original.use?.baseURL !== 'http://127.0.0.1:4179/' || original.webServer?.reuseExistingServer !== false) throw new Error('Unexpected source config');
  if (original.projects?.map(p => p.name).join(',') !== 'desktop,mobile') throw new Error('Unexpected source projects');
  source = resolve(source); output = resolve(output);
  if (output === source || output.startsWith(source + '/')) throw new Error('Diagnostic output must be outside source');
  return {
    ...original,
    testDir: join(source, 'tests/browser'),
    testMatch: 'research-nov9.spec.ts',
    grep: new RegExp(`(?:${TITLES.map(escapeRegex).join('|')})$`),
    outputDir: join(output, 'artifacts'),
    reporter: [['list'], ['json', { outputFile: join(output, 'results.json') }]],
    use: { ...original.use, trace },
    webServer: { ...original.webServer, cwd: source },
  };
}
export function testInventory(report) {
  if ((report.errors ?? []).length) throw new Error('Report contains global errors');
  const entries = [];
  const visit = suite => {
    for (const spec of suite.specs ?? []) for (const test of spec.tests ?? []) entries.push({ title: spec.title, project: test.projectName, test });
    for (const child of suite.suites ?? []) visit(child);
  };
  for (const suite of report.suites ?? []) visit(suite);
  if (entries.length !== 4) throw new Error(`Expected exactly 4 common cases, got ${entries.length}`);
  const keys = entries.map(e => `${e.project}:${e.title}`).sort();
  const wanted = ['desktop', 'mobile'].flatMap(p => TITLES.map(t => `${p}:${t}`)).sort();
  if (JSON.stringify(keys) !== JSON.stringify(wanted)) throw new Error('Unexpected or duplicate diagnostic cases');
  return entries;
}
export function assertPassed(report) {
  const entries = testInventory(report);
  if ((report.errors ?? []).length || entries.some(({ test }) => test.expectedStatus !== 'passed' || test.results?.length !== 1 || test.results[0].status !== 'passed')) throw new Error('Diagnostic failure; do not selectively rerun');
}
const run = (cmd, args, cwd, capture = false) => {
  const result = spawnSync(cmd, args, { cwd, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit', maxBuffer: 32 * 1024 * 1024, env: { ...process.env, TIMELINE_BASE_PATH: '', TIMELINE_OUT_DIR: 'dist', ASTRO_TELEMETRY_DISABLED: '1' } });
  if (result.error || result.status !== 0) throw new Error(`${cmd} failed (${result.status ?? 'spawn'}); stopping diagnostic`);
  return result.stdout?.trim();
};
export function configSource(source, output, trace) {
  const helper = pathToFileURL(import.meta.filename).href;
  return `import original from ${JSON.stringify(join(resolve(source), 'playwright.config.ts'))};\nimport { diagnosticConfig } from ${JSON.stringify(helper)};\nexport default diagnosticConfig(original, ${JSON.stringify(resolve(source))}, ${JSON.stringify(resolve(output))}, ${JSON.stringify(trace)});\n`;
}
export function execute(workspace) {
  workspace = resolve(workspace);
  const out = join(workspace, 'paired-diagnostic-evidence'); mkdirSync(out, { recursive: true });
  const sources = { A: join(workspace, 'baseline'), B: join(workspace, 'candidate') };
  const manifest = { purpose: 'diagnostic-only, NOT release acceptance', refs: REFS, plan: PLAN, warmups: 'none; order retained, first runs may be colder', runs: [] };
  const save = () => writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n'); save();
  const paths = ['package-lock.json', 'playwright.config.ts', 'tests/browser/research-nov9.spec.ts', 'scripts/serve-built.mjs'];
  const hashes = {};
  for (const [label, source] of Object.entries(sources)) {
    if (run('git', ['rev-parse', 'HEAD'], source, true) !== REFS[label]) throw new Error('Checkout SHA mismatch');
    run('git', ['diff', '--exit-code'], source); run('git', ['diff', '--cached', '--exit-code'], source);
    hashes[label] = Object.fromEntries(paths.map(p => [p, createHash('sha256').update(readFileSync(join(source, p))).digest('hex')]));
  }
  if (JSON.stringify(hashes.A) !== JSON.stringify(hashes.B)) throw new Error('Common lock/config/test/server differ; revise design before running');
  manifest.commonSourceHashes = hashes; save();
  for (const item of PLAN) {
    const output = join(out, item.id); mkdirSync(output, { recursive: true });
    const source = sources[item.source];
    const config = join(output, 'diagnostic.config.mts');
    writeFileSync(config, configSource(source, output, item.trace));
    const state = { ...item, status: 'listing', startedAt: new Date().toISOString() }; manifest.runs.push(state); save();
    try {
      const listing = run('node', [join(source, 'node_modules/@playwright/test/cli.js'), 'test', '--config', config, '--list', '--reporter=json'], source, true);
      writeFileSync(join(output, 'inventory.json'), listing + '\n'); testInventory(JSON.parse(listing));
      state.status = 'running'; save();
      run('node', [join(source, 'node_modules/@playwright/test/cli.js'), 'test', '--config', config], source);
      assertPassed(JSON.parse(readFileSync(join(output, 'results.json'), 'utf8')));
      state.status = 'passed';
    } catch (error) { state.status = 'failed'; throw error; }
    finally { state.finishedAt = new Date().toISOString(); save(); }
    run('git', ['diff', '--exit-code'], source); run('git', ['diff', '--cached', '--exit-code'], source);
  }
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  if (process.argv.length !== 3) throw new Error('Usage: node paired-browser-diagnostic.mjs WORKSPACE');
  execute(process.argv[2]);
}
