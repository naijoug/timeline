import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import BrowserRuntimeReporter, { parseCpuStat, parseMeminfo, parsePressure, safeOperation } from '../scripts/browser-runtime-reporter.mjs';

const cpu = 'cpu  100 2 30 400 5 6 7 8 999 999\ncpu0 1 2 3 4 5 6 7 8\n';
const mem = 'MemTotal: 10000 kB\nMemAvailable: 8000 kB\n';
const pressure = 'some avg10=1.20 avg60=2.30 avg300=3.40 total=1234\nfull avg10=0.00 avg60=0.00 avg300=0.00 total=0\n';
const config = { rootDir: '/repo', workers: 1, globalTimeout: 420000, projects: [{ retries: 0 }, { retries: 0 }] };
const suite = { allTests: () => Array.from({ length: 236 }) };
const makeTest = (id = 'opaque-first', project = 'desktop') => ({ id, location: { file: '/repo/tests/browser/example.spec.ts', line: 12, column: 3 }, parent: { project: () => ({ name: project }) }, title: 'DO-NOT-SERIALIZE-TITLE', titlePath: () => ['secret suite', 'secret test'] });
const makeResult = () => ({ retry: 0, workerIndex: 0, status: 'passed', duration: 123 });

function harness(options: Record<string, unknown> = {}, overrides: Record<string, unknown> = {}) {
  let now = 0;
  let callback: (() => void) | undefined;
  const lines: string[] = [];
  const paths: string[] = [];
  const warnings: string[] = [];
  const cleared: unknown[] = [];
  let interval = 0;
  let unrefs = 0;
  const timer = { unref: () => { unrefs++; } };
  const reporter = new BrowserRuntimeReporter(options, {
    now: () => now,
    mkdir: () => undefined,
    append: (path: string, line: string) => { paths.push(path); lines.push(line); },
    readFile: (path: string) => path === '/proc/stat' ? cpu : path === '/proc/meminfo' ? mem : pressure,
    resourceUsage: () => ({ userCPUTime: 5, systemCPUTime: 3, maxRSS: 100, fsRead: 1, fsWrite: 2, voluntaryContextSwitches: 3, involuntaryContextSwitches: 4, privateField: 'DO-NOT-SERIALIZE-RESOURCE' }),
    setInterval: (fn: () => void, milliseconds: number) => { callback = fn; interval = milliseconds; return timer; },
    clearInterval: (value: unknown) => { cleared.push(value); },
    warn: (value: string) => { warnings.push(value); },
    ...overrides,
  });
  return {
    reporter, lines, paths, warnings, cleared, timer,
    records: () => lines.map(line => JSON.parse(line)),
    advance: (milliseconds: number) => { now += milliseconds; },
    tick: () => callback?.(),
    interval: () => interval,
    unrefs: () => unrefs,
  };
}

test('runtime reporter only appends diagnostics and records unchanged discovery/settings', () => {
  const h = harness();
  h.reporter.onBegin(config, suite);
  const begin = h.records()[0];
  assert.equal(begin.kind, 'begin');
  assert.equal(begin.discovered, 236);
  assert.deepEqual(begin.settings, { workers: 1, retries: [0, 0], globalTimeoutMs: 420000 });
  assert.equal(h.reporter.printsToStdio(), false);
  assert.equal(h.interval(), 5000);
  assert.equal(h.unrefs(), 1);
  assert.equal(h.reporter.onEnd({ status: 'failed', duration: 5 }), undefined);
  assert.equal(h.records().at(-1).status, 'failed');
  assert.deepEqual(config, { rootDir: '/repo', workers: 1, globalTimeout: 420000, projects: [{ retries: 0 }, { retries: 0 }] });
});

test('runtime stable IDs distinguish tests, nested names and projects without persisting titles', () => {
  const h = harness(); h.reporter.onBegin(config, suite);
  const first = h.reporter.identity(makeTest());
  assert.deepEqual(h.reporter.identity(makeTest()), first);
  assert.match(first.id, /^[a-f0-9]{24}$/u);
  assert.equal(first.file, 'tests/browser/example.spec.ts');
  assert.notEqual(h.reporter.identity(makeTest('opaque-second')).id, first.id);
  assert.notEqual(h.reporter.identity(makeTest('opaque-first', 'mobile')).id, first.id);
  const noIdA = { ...makeTest(), id: undefined, titlePath: () => ['outer-a', 'identical'] };
  const noIdB = { ...makeTest(), id: undefined, titlePath: () => ['outer-b', 'identical'] };
  assert.notEqual(h.reporter.identity(noIdA).id, h.reporter.identity(noIdB).id);
  assert.equal(h.reporter.identity({ ...makeTest(), location: { file: '/private/secret', line: 1 } }).file, 'other');
  h.reporter.onEnd({ status: 'passed' });
});

test('runtime operation extraction is an allowlist, not redaction of arbitrary title text', () => {
  assert.equal(safeOperation({ category: 'pw:api', title: 'page.goto(https://secret.example/token)' }), 'page.goto');
  assert.equal(safeOperation({ category: 'pw:api', title: 'page.gotoUnexpected(private)' }), 'other');
  assert.equal(safeOperation({ category: 'pw:api', title: 'https://secret.example' }), 'other');
  assert.equal(safeOperation({ category: 'fixture', title: 'context' }), 'fixture.context');
  assert.equal(safeOperation({ category: 'fixture', title: 'Fixture "context"' }), 'fixture.context');
  assert.equal(safeOperation({ category: 'fixture', title: 'Fixture "private-secret"' }), 'other');
  assert.equal(safeOperation({ category: 'hook', title: 'Before Hooks' }), 'hook.before');
  assert.equal(safeOperation({ category: 'fixture', title: 'custom-secret-fixture' }), 'other');
  assert.equal(safeOperation({ category: 'expect', title: 'expect.toBeVisible with timeout 10000ms' }), 'expect.toBeVisible');
});

test('runtime pinned Playwright 1.57 rendered titles classify without leaking dynamic suffixes', () => {
  const marker = 'SECRET_REAL_SHAPE';
  const cases = [
    ['Screenshot', 'browser.screenshot'],
    [`Screenshot locator('${marker}')`, 'browser.screenshot'],
    [`Navigate to "https://${marker}.example/path?token=${marker}"`, 'browser.navigation'],
    [`Evaluate locator('${marker}')`, 'browser.evaluate'],
    [`Click getByRole('button', { name: '${marker}' })`, 'browser.click'],
    [`Fill "${marker}" locator('input')`, 'browser.fill'],
    [`Press "${marker}" locator('input')`, 'browser.press'],
    ['Go back', 'browser.historyBack'], ['Go forward', 'browser.historyForward'],
    ['Emulate media', 'browser.emulateMedia'], ['Create context', 'browser.createContext'],
    ['Create page', 'browser.createPage'], ['Close context', 'browser.closeContext'],
    ['Close page', 'browser.closePage'], [`Wait for event "${marker}"`, 'browser.waitForEvent'],
  ];
  const h = harness(); const spec = makeTest(); const result = makeResult();
  h.reporter.onBegin({ ...config, rootDir: '/repo/tests/browser' }, suite);
  h.reporter.onTestBegin(spec, result);
  assert.equal(h.records().at(-1).test.file, 'example.spec.ts');
  for (const [title, operation] of cases) {
    const step = { category: 'pw:api', title, duration: 3 };
    assert.equal(safeOperation(step), operation);
    h.reporter.onStepBegin(spec, result, step); h.reporter.onStepEnd(spec, result, step);
  }
  assert.equal(safeOperation({ category: 'expect', title: `Expect "toBeVisible" getByText('${marker}')` }), 'expect.toBeVisible');
  assert.equal(safeOperation({ category: 'expect', title: `Expect "not toHaveText" locator('${marker}')` }), 'expect.toHaveText');
  assert.equal(safeOperation({ category: 'expect', title: `Expect "toBeVisibleSecret" ${marker}` }), 'other');
  assert.equal(safeOperation({ category: 'pw:api', title: `ScreenshotUnexpected ${marker}` }), 'other');
  assert.equal(safeOperation({ category: 'test.step', title: `Screenshot ${marker}` }), 'other');
  h.reporter.onTestEnd(spec, result); h.reporter.onEnd({ status: 'passed' });
  assert.equal(h.records().find(record => record.kind === 'testEnd').completedSteps.every((step: { operation: string }) => step.operation !== 'other'), true);
  assert.equal(h.lines.join('').includes(marker), false);
  assert.equal(h.lines.join('').includes('https://'), false);
});

test('runtime nested steps retain hierarchy and inclusive timing without duplicate counting', () => {
  const h = harness(); const result = makeResult(); const spec = makeTest();
  h.reporter.onBegin(config, suite); h.reporter.onTestBegin(spec, result);
  const parent = { category: 'hook', title: 'Before Hooks', duration: 20 };
  const child = { category: 'pw:api', title: 'page.goto(secret)', parent, duration: 10 };
  h.reporter.onStepBegin(spec, result, parent);
  h.advance(2); h.reporter.onStepBegin(spec, result, child);
  h.advance(10); h.reporter.onStepEnd(spec, result, child);
  h.reporter.onStepEnd(spec, result, child); // Defensive duplicate callback handling.
  h.advance(8); h.reporter.onStepEnd(spec, result, parent);
  h.reporter.onTestEnd(spec, result);
  const end = h.records().find(record => record.kind === 'testEnd');
  assert.equal(end.stepCount, 2);
  assert.equal(end.completedSteps[0].parentId, end.completedSteps[1].id);
  assert.equal(end.completedSteps[0].durationMs, 10);
  assert.equal(end.completedSteps[1].durationMs, 20);
  assert.equal(end.completedSteps[1].parentId, null);
  assert.equal(end.aggregates.length, 2);
  assert.equal(h.reporter.active.size, 0);
  h.reporter.onEnd({ status: 'passed' });
});

test('runtime five-second incremental evidence survives missing final callback', () => {
  const h = harness(); const result = makeResult(); const spec = makeTest();
  h.reporter.onBegin(config, suite); h.reporter.onTestBegin(spec, result);
  const done = { category: 'pw:api', title: 'page.goto(secret)', duration: 12 };
  const pending = { category: 'expect', title: 'expect.toBeVisible(secret)' };
  h.reporter.onStepBegin(spec, result, done); h.reporter.onStepEnd(spec, result, done);
  h.reporter.onStepBegin(spec, result, pending);
  h.advance(5000); h.tick();
  const first = h.records().at(-1);
  assert.equal(first.kind, 'sample'); assert.equal(first.intervalMs, 5000);
  assert.equal(first.activeTests[0].completedSteps.length, 1);
  assert.equal(first.activeTests[0].activeSteps[0].ageMs, 5000);
  h.advance(5000); h.tick();
  assert.equal(h.records().at(-1).activeTests[0].completedSteps.length, 0);
  assert.equal(h.records().some(record => record.kind === 'end'), false);
  assert.ok(h.lines.every(line => line.endsWith('\n') && JSON.parse(line).schema === 1));
  h.reporter.onEnd({ status: 'timedout', duration: 420000 });
  assert.equal(h.records().at(-1).incompleteTests, 1);
});

test('runtime diagnostics never serialize titles, params, URLs, errors, stdout or env', () => {
  const h = harness(); const marker = 'SECRET_CANARY_987654';
  const spec = { ...makeTest(marker), title: marker, titlePath: () => [marker] };
  const result = { ...makeResult(), error: { message: marker }, stdout: [marker], stderr: [marker] };
  h.reporter.onBegin({ ...config, metadata: { env: marker } }, suite);
  h.reporter.onTestBegin(spec, result);
  const step = { category: marker, title: `page.goto(https://${marker}.example/)`, params: { password: marker }, duration: 1, error: { message: marker } };
  h.reporter.onStepBegin(spec, result, step); h.reporter.onStepEnd(spec, result, step);
  h.reporter.onTestEnd(spec, result); h.reporter.onEnd({ status: 'failed', error: marker });
  const output = h.lines.join('');
  for (const secret of [marker, 'https://', 'DO-NOT-SERIALIZE', 'secret suite', 'secret test']) assert.equal(output.includes(secret), false);
  assert.equal(h.records().find(record => record.kind === 'testEnd').completedSteps[0].error, true);
  assert.equal(output.includes('privateField'), false);
});

test('runtime Linux parsers accept only numeric selected fields and reject malformed data', () => {
  assert.deepEqual(parseCpuStat(cpu), { user: 100, nice: 2, system: 30, idle: 400, iowait: 5, irq: 6, softirq: 7, steal: 8 });
  for (const value of ['', 'cpu 1 2', 'cpu 1 2 3 4 5 6 7 NaN', 'cpu 1 2 3 4 5 6 7 -1', 'cpu 1 2 3 4 5 6 7 99999999999999999']) assert.equal(parseCpuStat(value), null);
  assert.deepEqual(parseMeminfo(mem), { totalKb: 10000, availableKb: 8000 });
  assert.equal(parseMeminfo('MemTotal: 100 kB\nMemAvailable: 101 kB'), null);
  assert.equal(parseMeminfo('MemTotal: 100 kB\nMemAvailable: SECRET'), null);
  assert.deepEqual(parsePressure(pressure), { some: { avg10: 1.2, avg60: 2.3, avg300: 3.4, totalUs: 1234 }, full: { avg10: 0, avg60: 0, avg300: 0, totalUs: 0 } });
  for (const value of ['', 'SECRET', 'some avg10=101 avg60=0 avg300=0 total=1', 'some avg10=0 avg60=0 avg300=0 total=-1']) assert.equal(parsePressure(value), null);
});

test('runtime resources report missing or invalid counters explicitly without exception text', () => {
  const h = harness({}, { readFile: () => { throw Error('PRIVATE_PATH_SECRET'); }, resourceUsage: () => { throw Error('PRIVATE_ENV_SECRET'); } });
  h.reporter.onBegin(config, suite);
  const sample = h.records()[0].resources;
  assert.equal(sample.hostCpuTicks, null); assert.equal(sample.hostMemory, null); assert.equal(sample.reporterProcess, null);
  assert.deepEqual(sample.hostPressure, { cpu: null, memory: null, io: null });
  assert.equal(h.lines.join('').includes('SECRET'), false);
  h.reporter.onEnd({ status: 'passed' });
});

test('runtime CPU deltas reject counter resets and never double count guest fields', () => {
  let sample = cpu;
  const h = harness({}, { readFile: (path: string) => path === '/proc/stat' ? sample : path === '/proc/meminfo' ? mem : pressure });
  h.reporter.onBegin(config, suite);
  sample = 'cpu 110 4 35 410 5 7 9 9 99999 99999'; h.advance(5000); h.tick();
  assert.deepEqual(h.records().at(-1).resources.hostCpuDeltaTicks, { user: 10, nice: 2, system: 5, idle: 10, iowait: 0, irq: 1, softirq: 2, steal: 1 });
  sample = cpu; h.advance(5000); h.tick();
  assert.equal(h.records().at(-1).resources.hostCpuDeltaTicks, null);
  h.reporter.onEnd({ status: 'passed' });
});

test('runtime write failure emits one static warning and never overrides test status', () => {
  const h = harness({}, { append: () => { throw Error('secret path, token and URL'); } });
  assert.doesNotThrow(() => h.reporter.onBegin(config, suite));
  h.advance(5000); h.tick();
  assert.equal(h.reporter.onEnd({ status: 'failed', duration: 420000 }), undefined);
  assert.deepEqual(h.warnings, ['Timeline runtime diagnostics unavailable: evidence write failed.']);
  assert.equal(h.reporter.ioFailed, true);
  assert.equal(h.cleared.length, 1);
});

test('runtime directory failure is static and timer cleanup is idempotent', async () => {
  const h = harness({}, { mkdir: () => { throw Error('PRIVATE_PATH'); } });
  h.reporter.onBegin(config, suite);
  assert.equal(h.warnings.length, 1); assert.equal(h.lines.length, 0);
  await h.reporter.onExit(); await h.reporter.onExit();
  assert.equal(h.cleared.length, 1);
  assert.equal(h.reporter.timer, null);
  h.tick(); assert.equal(h.lines.length, 0);
});

test('runtime end clears unref timer and exit does not duplicate final records', async () => {
  const h = harness(); h.reporter.onBegin(config, suite);
  h.reporter.onEnd({ status: 'timedout', duration: 420000 });
  const length = h.lines.length;
  h.tick(); await h.reporter.onExit(); h.reporter.onEnd({ status: 'passed' });
  assert.equal(h.lines.length, length); assert.equal(h.cleared.length, 1);
  assert.equal(h.records().at(-1).status, 'timedout');
});

test('runtime outputFile option separates root and Pages artifacts without overwriting', () => {
  const root = harness({ label: 'root', outputFile: 'test-results/browser-root/runtime-diagnostics.ndjson' });
  const pages = harness({ label: 'pages', outputFile: 'test-results/browser-pages/runtime-diagnostics.ndjson' });
  root.reporter.onBegin(config, suite); pages.reporter.onBegin(config, suite);
  assert.notEqual(root.paths[0], pages.paths[0]);
  assert.equal(root.paths[0], resolve('test-results/browser-root/runtime-diagnostics.ndjson'));
  assert.equal(pages.paths[0], resolve('test-results/browser-pages/runtime-diagnostics.ndjson'));
  assert.equal(root.records()[0].label, 'root'); assert.equal(pages.records()[0].label, 'pages');
  root.reporter.onEnd({ status: 'passed' }); pages.reporter.onEnd({ status: 'passed' });
});

test('runtime real append produces valid recoverable NDJSON using only a temporary directory', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'timeline-runtime-unit-'));
  try {
    const file = join(directory, 'nested', 'runtime-diagnostics.ndjson');
    const reporter = new BrowserRuntimeReporter({ label: 'root', outputFile: file });
    reporter.onBegin(config, suite);
    const spec = makeTest(); const result = makeResult();
    reporter.onTestBegin(spec, result); reporter.onTestEnd(spec, result);
    reporter.onEnd({ status: 'passed', duration: 1 }); await reporter.onExit();
    const records = readFileSync(file, 'utf8').trim().split('\n').map(line => JSON.parse(line));
    assert.equal(records[0].kind, 'begin'); assert.equal(records.at(-1).kind, 'end');
    assert.equal(records.filter(record => record.kind === 'testEnd').length, 1);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});

test('runtime large synthetic step stream uses bounded write frequency and measures overhead', t => {
  const h = harness({}, { now: () => performance.now() });
  const spec = makeTest(); const result = makeResult();
  h.reporter.onBegin(config, suite); h.reporter.onTestBegin(spec, result);
  const started = performance.now();
  for (let i = 0; i < 10000; i++) {
    const step = { category: 'pw:api', title: 'locator.click(private argument)', duration: 1 };
    h.reporter.onStepBegin(spec, result, step); h.reporter.onStepEnd(spec, result, step);
  }
  const callbackElapsed = performance.now() - started;
  assert.equal(h.lines.length, 2); // no synchronous write per API callback
  h.reporter.onTestEnd(spec, { ...result }); // unknown attempt is ignored
  assert.equal(h.lines.length, 2);
  h.reporter.onTestEnd(spec, result); h.reporter.onEnd({ status: 'passed' });
  const end = h.records().find(record => record.kind === 'testEnd');
  assert.equal(end.stepCount, 10000); assert.equal(end.completedSteps.length, 10000);
  assert.equal(h.records().at(-1).reporterStepCallbackCount, 20000);
  assert.ok(Number.isFinite(callbackElapsed));
  t.diagnostic(`10000 synthetic steps: ${callbackElapsed.toFixed(2)} ms callbacks; ${h.lines.length} writes; ${Buffer.byteLength(h.lines.join(''))} bytes. This is a Node microbenchmark, not browser overhead acceptance.`);
});
