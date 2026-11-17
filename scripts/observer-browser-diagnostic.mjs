import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

export const SOURCE_SHA = '012ce7acb7b438653acf679323d7fc8e1f824c49';
export const EVENTS = ['nvidia-groot2-research', 'baidu-ernie-evolve-research'];
export const FILE = 'research-nov9.spec.ts';
export const PLAN = [
  { id: '01-N', observer: 'N' }, { id: '02-R', observer: 'R' },
  { id: '03-R', observer: 'R' }, { id: '04-N', observer: 'N' },
];
export const CASE_PATHS = EVENTS.flatMap(id => [
  [FILE, `${id}: evidence, availability boundaries and light/dark reading`],
  [FILE, `${id}: JavaScript disabled`, 'sources, boundaries, layout and native return stay usable'],
  [FILE, `${id}: full-library search, return focus and two Back/Forward cycles`],
]);
export const SOURCE_FILES = ['package-lock.json', 'playwright.config.ts', `tests/browser/${FILE}`, 'scripts/serve-built.mjs', 'scripts/browser-runtime-reporter.mjs', 'scripts/runtime-resource-sampler.mjs'];
export function diagnosticConfig(original, source, output, observer) {
  if (!['N', 'R'].includes(observer)) throw new Error('Invalid observer');
  if (original.workers !== 1 || original.retries !== 0 || original.timeout !== 45000 || original.globalTimeout !== 420000 || original.expect?.timeout !== 10000) throw new Error('Original acceptance settings changed');
  if (original.use?.trace !== 'retain-on-failure' || original.use?.screenshot !== 'only-on-failure' || original.use?.video !== 'off' || original.use?.baseURL !== 'http://127.0.0.1:4179/' || original.webServer?.reuseExistingServer !== false) throw new Error('Unexpected source config');
  if (original.projects?.map(p => p.name).join(',') !== 'desktop,mobile') throw new Error('Unexpected projects');
  if (original.reporter?.length !== 3 || original.reporter[0][0] !== 'list' || original.reporter[1][0] !== 'json' || original.reporter[2][0] !== './scripts/browser-runtime-reporter.mjs') throw new Error('Unexpected original observers');
  source = resolve(source); output = resolve(output);
  if (output === source || output.startsWith(source + '/')) throw new Error('Outputs must be outside exact source');
  const reporter = [['list'], ['json', { outputFile: join(output, 'results.json') }]];
  if (observer === 'R') reporter.push([join(source, 'scripts/browser-runtime-reporter.mjs'), { label: 'root', outputFile: join(output, 'runtime-diagnostics.ndjson') }]);
  return { ...original, testDir: join(source, 'tests/browser'), testMatch: FILE, outputDir: join(output, 'artifacts'), reporter, webServer: { ...original.webServer, cwd: source } };
}
export function testInventory(report) {
  if ((report.errors ?? []).length) throw new Error('Global errors');
  const entries = [];
  function visit(suite, parent = []) {
    const ancestry = [...parent, suite.title];
    for (const spec of suite.specs ?? []) for (const test of spec.tests ?? []) {
      if (spec.file !== FILE) throw new Error('Wrong source file');
      entries.push({ path: [...ancestry, spec.title], project: test.projectName, test });
    }
    for (const child of suite.suites ?? []) visit(child, ancestry);
  }
  for (const suite of report.suites ?? []) visit(suite);
  const key = (project, path) => JSON.stringify([project, ...path]);
  const wanted = ['desktop', 'mobile'].flatMap(p => CASE_PATHS.map(path => key(p, path))).sort();
  const actual = entries.map(e => key(e.project, e.path)).sort();
  if (JSON.stringify(actual) !== JSON.stringify(wanted)) throw new Error('Expected exactly 12 unique source ancestry/project cases');
  return entries;
}
export function assertPassed(report) {
  const entries = testInventory(report);
  if (entries.some(({test}) => test.expectedStatus !== 'passed' || test.results?.length !== 1 || test.results[0].status !== 'passed')) throw new Error('Incomplete/failed observation; no selective rerun');
}
export function assertObserverEvidence(text) {
  const rows = text.trim().split('\n').map(line => JSON.parse(line));
  const begins = rows.filter(r => r.kind === 'begin'), ends = rows.filter(r => r.kind === 'end'), tests = rows.filter(r => r.kind === 'testEnd');
  if (begins.length !== 1 || begins[0].discovered !== 12 || begins[0].settings?.workers !== 1 || begins[0].settings?.globalTimeoutMs !== 420000 || JSON.stringify(begins[0].settings?.retries) !== '[0,0]' || ends.length !== 1 || ends[0].status !== 'passed' || ends[0].incompleteTests !== 0 || !(ends[0].reporterStepCallbackCount > 0) || tests.length !== 12 || tests.some(t => t.status !== 'passed' || t.attempt !== 0) || new Set(tests.map(t => t.id)).size !== 12) throw new Error('Observer evidence incomplete; cannot compare');
}
export function configSource(source, output, observer) {
  return `import original from ${JSON.stringify(join(resolve(source), 'playwright.config.ts'))};\nimport { diagnosticConfig } from ${JSON.stringify(pathToFileURL(import.meta.filename).href)};\nexport default diagnosticConfig(original, ${JSON.stringify(resolve(source))}, ${JSON.stringify(resolve(output))}, ${JSON.stringify(observer)});\n`;
}
function run(cmd, args, cwd, capture = false, evidencePrefix = null) {
  const result = spawnSync(cmd, args, { cwd, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit', maxBuffer: 32 * 1024 * 1024, env: { ...process.env, TIMELINE_BASE_PATH: '', TIMELINE_OUT_DIR: 'dist', ASTRO_TELEMETRY_DISABLED: '1' } });
  if (evidencePrefix) {
    writeFileSync(evidencePrefix + '.stdout.txt', result.stdout ?? '');
    writeFileSync(evidencePrefix + '.stderr.txt', result.stderr ?? '');
  }
  if (result.error || result.status !== 0) throw new Error(`Diagnostic process failed (${result.status ?? 'spawn'}); stop`);
  return result.stdout?.trim();
}
function hashes(source) { return Object.fromEntries(SOURCE_FILES.map(p => [p, createHash('sha256').update(readFileSync(join(source,p))).digest('hex')])); }
export function execute(workspace) {
  workspace = resolve(workspace);
  const source = join(workspace, 'candidate'), out = join(workspace, 'observer-diagnostic-evidence');
  mkdirSync(out, {recursive:true});
  const manifest = { purpose: 'diagnostic only, NOT acceptance or a performance fix', sourceSha: SOURCE_SHA, trace: 'retain-on-failure in every cohort', plan: PLAN, warmups: 'none', runs: [] };
  const save = () => writeFileSync(join(out,'manifest.json'), JSON.stringify(manifest,null,2)+'\n'); save();
  const integrity = () => {
    if (run('git',['rev-parse','HEAD'],source,true) !== SOURCE_SHA) throw new Error('Wrong source SHA');
    run('git',['diff','--exit-code'],source); run('git',['diff','--cached','--exit-code'],source);
    const now = hashes(source);
    if (manifest.sourceHashes && JSON.stringify(now) !== JSON.stringify(manifest.sourceHashes)) throw new Error('Source hash changed');
    return now;
  };
  manifest.sourceHashes = integrity(); save();
  for (const item of PLAN) {
    const output = join(out,item.id); mkdirSync(output,{recursive:true});
    const config = join(output,'diagnostic.config.mts'); writeFileSync(config,configSource(source,output,item.observer));
    const state = {...item,status:'listing',startedAt:new Date().toISOString()}; manifest.runs.push(state);save();
    try {
      integrity();
      const listing=run('node',[join(source,'node_modules/@playwright/test/cli.js'),'test','--config',config,'--list','--reporter=json'],source,true,join(output,'listing'));
      writeFileSync(join(output,'inventory.json'),listing+'\n');testInventory(JSON.parse(listing));
      state.status='running';save();
      run('node',[join(source,'node_modules/@playwright/test/cli.js'),'test','--config',config],source);
      assertPassed(JSON.parse(readFileSync(join(output,'results.json'),'utf8')));
      if (item.observer === 'R') assertObserverEvidence(readFileSync(join(output,'runtime-diagnostics.ndjson'),'utf8'));
      else if (existsSync(join(output,'runtime-diagnostics.ndjson'))) throw new Error('Unexpected observer in N cohort');
      integrity();state.status='passed';
    } catch(error) {state.status='failed';throw error;}
    finally {state.finishedAt=new Date().toISOString();save();}
  }
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  if (process.argv.length !== 3) throw new Error('Usage: node observer-browser-diagnostic.mjs WORKSPACE');
  execute(process.argv[2]);
}
