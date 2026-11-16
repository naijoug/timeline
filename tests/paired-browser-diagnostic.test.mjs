import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { diagnosticConfig, PLAN, REFS, TITLES, testInventory, assertPassed } from '../scripts/paired-browser-diagnostic.mjs';
const original = () => ({
  timeout: 45000, globalTimeout: 420000, workers: 1, retries: 0, expect: { timeout: 10000 },
  reporter: [['old-observer']],
  use: { baseURL: 'http://127.0.0.1:4179/', trace: 'retain-on-failure', screenshot: 'only-on-failure', video: 'off' },
  projects: [{ name: 'desktop', use: { viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 } }, { name: 'mobile', use: { viewport: { width: 375, height: 812 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, defaultBrowserType: 'chromium' } }],
  webServer: { command: 'node scripts/serve-built.mjs', reuseExistingServer: false, timeout: 15000, url: 'http://127.0.0.1:4179/ai/' },
});
const report = () => ({ errors: [], suites: [{ suites: [{ specs: TITLES.map(title => ({ title, tests: ['desktop', 'mobile'].map(projectName => ({ projectName, expectedStatus: 'passed', results: [{ status: 'passed' }] })) })) }] }] });
test('plan pins exact source commits and bounded untraced ABBA / traced AB cohorts', () => {
  assert.deepEqual(REFS, { A: 'aa79d2115c73067e34b51527585a2b321da11cd1', B: '012ce7acb7b438653acf679323d7fc8e1f824c49' });
  assert.deepEqual(PLAN.map(x => x.source), ['A','B','B','A','A','B']);
  assert.deepEqual(PLAN.map(x => x.trace), ['off','off','off','off','on','on']);
  assert.equal(new Set(PLAN.map(x => x.id)).size, 6);
});
test('config preserves original settings, devices and screenshot policy without mutation', () => {
  const base = original(); const copy = structuredClone(base); const cfg = diagnosticConfig(base, '/exact/A', '/outputs/01', 'off');
  assert.deepEqual(base, copy);
  for (const key of ['workers','retries','timeout','globalTimeout','expect','projects']) assert.deepEqual(cfg[key], base[key]);
  assert.equal(cfg.projects, base.projects);
  assert.deepEqual(cfg.use, { ...base.use, trace: 'off' });
  assert.deepEqual(cfg.webServer, { ...base.webServer, cwd: '/exact/A' });
  assert.equal(cfg.testDir, '/exact/A/tests/browser'); assert.equal(cfg.testMatch, 'research-nov9.spec.ts');
  assert.equal(cfg.outputDir, '/outputs/01/artifacts');
});
test('both sources use the same built-in observers and isolated outputs', () => {
  for (const run of PLAN) {
    const cfg = diagnosticConfig(original(), '/exact/' + run.source, '/outputs/' + run.id, run.trace);
    assert.deepEqual(cfg.reporter, [['list'], ['json', { outputFile: '/outputs/' + run.id + '/results.json' }]]);
  }
});
test('only the original two GR00T 2 test titles match', () => {
  const { grep } = diagnosticConfig(original(), '/exact/A', '/outputs/01', 'off');
  TITLES.forEach(t => assert.ok(grep.test('desktop research-nov9.spec.ts ' + t)));
  assert.ok(!grep.test(TITLES[0] + ' extra'));
  assert.ok(!grep.test(TITLES[0].replace('nvidia-groot2-research', 'baidu-ernie-evolve-research')));
  assert.ok(!grep.test('nvidia-groot2-research: JavaScript disabled sources, boundaries, layout and native return stay usable'));
});
test('fail closed on changed acceptance settings or output inside source', () => {
  for (const [key,value] of [['workers',2],['retries',1],['timeout',60000],['globalTimeout',600000]]) assert.throws(() => diagnosticConfig({ ...original(), [key]: value }, '/A', '/O', 'off'));
  assert.throws(() => diagnosticConfig(original(), '/A', '/A/output', 'off'));
  assert.throws(() => diagnosticConfig(original(), '/A', '/O', 'retain-on-failure'));
  assert.throws(() => diagnosticConfig({ ...original(), projects: [] }, '/A', '/O', 'off'));
});
test('list collection requires all four unique project/title pairs', () => {
  assert.equal(testInventory(report()).length, 4);
  const missing=report();missing.suites[0].suites[0].specs[0].tests.pop();assert.throws(() => testInventory(missing));
  const duplicate=report();duplicate.suites[0].suites[0].specs[0].tests[1].projectName='desktop';assert.throws(() => testInventory(duplicate));
  const wrong=report();wrong.suites[0].suites[0].specs[0].title='other';assert.throws(() => testInventory(wrong));
});
test('failures, skips, retries, expected failures and global errors never count as a pass', () => {
  assert.doesNotThrow(() => assertPassed(report()));
  for (const status of ['failed','timedOut','skipped','interrupted']) { const r=report();r.suites[0].suites[0].specs[0].tests[0].results[0].status=status;assert.throws(() => assertPassed(r)); }
  const r=report();r.suites[0].suites[0].specs[0].tests[0].results.push({status:'passed'});assert.throws(() => assertPassed(r));
  const e=report();e.errors.push({message:'global timeout'});assert.throws(() => assertPassed(e));
  const f=report();f.suites[0].suites[0].specs[0].tests[0].expectedStatus='failed';assert.throws(() => assertPassed(f));
});
test('workflow is exact-branch diagnostic with read-only access and no deployment', () => {
  const y=readFileSync(fileURLToPath(new URL('../.github/workflows/paired-browser-diagnostic.yml', import.meta.url)), 'utf8');
  assert.match(y,/branches: \['diagnostics\/paired-browser-20261116-2000'\]/);
  assert.match(y,/permissions:\n  contents: read/);assert.match(y,/runs-on: ubuntu-24.04/);assert.match(y,/node-version: 22/);
  assert.equal((y.match(/actions\/checkout@v7/g)||[]).length,3);assert.equal((y.match(/persist-credentials: false/g)||[]).length,3);
  assert.ok(y.includes(REFS.A)&&y.includes(REFS.B));
  assert.doesNotMatch(y,/pull_request_target|workflow_dispatch|contents: write|pages: write|id-token: write|deploy-pages|git push|force:|continue-on-error|--workers|--retries/);
  assert.match(y,/if: always\(\)/);assert.match(y,/retention-days: 7/);
});
