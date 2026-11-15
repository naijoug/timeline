import { appendFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';

// Additive diagnostics only: never returns a status, changes tests or installs
// browser hooks. The original reporters and acceptance settings remain authoritative.
const CATEGORIES = new Set(['expect', 'fixture', 'hook', 'pw:api', 'test.step', 'test.attach']);
const OPERATIONS = new Set([
  'page.goto', 'page.goBack', 'page.goForward', 'page.reload', 'page.close',
  'page.screenshot', 'page.evaluate', 'page.evaluateHandle', 'page.emulateMedia',
  'page.waitForEvent', 'page.waitForLoadState', 'page.waitForURL',
  'locator.click', 'locator.fill', 'locator.press', 'locator.focus', 'locator.blur',
  'locator.check', 'locator.uncheck', 'locator.selectOption', 'locator.hover',
  'locator.waitFor', 'locator.getAttribute', 'locator.textContent', 'locator.count',
  'locator.evaluate', 'locator.screenshot', 'locator.isVisible', 'locator.scrollIntoViewIfNeeded',
  'browser.newContext', 'browserContext.newPage', 'browserContext.close',
  'browserContext.route', 'browserContext.unroute', 'context.newPage', 'context.close',
  'context.route', 'context.unroute', 'route.fulfill', 'route.continue', 'route.abort',
  'expect.toBe', 'expect.toEqual', 'expect.toHaveText', 'expect.toContainText',
  'expect.toHaveURL', 'expect.toHaveAttribute', 'expect.toBeVisible', 'expect.toBeHidden',
  'expect.toBeFocused', 'expect.toHaveValue', 'expect.toHaveCount', 'expect.toBeChecked',
  'expect.toBeEnabled', 'expect.toBeDisabled', 'expect.toMatch', 'expect.toBeTruthy',
  'expect.toBeFalsy', 'expect.toBeLessThan', 'expect.toBeLessThanOrEqual',
  'expect.toBeGreaterThan', 'expect.toBeGreaterThanOrEqual', 'expect.toBeDefined',
]);
const FIXTURES = new Set(['browser', 'context', 'page', 'request']);
// Playwright 1.57 reporter steps expose rendered human titles, not apiName.
// Prefixes below come from the pinned protocolMetainfo.js. They deliberately
// map page/element/locator operations to coarse labels rather than inventing
// an API identity that the reporter cannot observe. Dynamic suffixes stay private.
const HUMAN_OPERATIONS = new Map([
  ['Screenshot', 'browser.screenshot'], ['Expect screenshot', 'browser.screenshotAssertion'],
  ['Evaluate', 'browser.evaluate'], ['Navigate to', 'browser.navigation'],
  ['Go back', 'browser.historyBack'], ['Go forward', 'browser.historyForward'],
  ['Reload', 'browser.reload'], ['Emulate media', 'browser.emulateMedia'],
  ['Launch browser', 'browser.launch'], ['Create context', 'browser.createContext'],
  ['Create page', 'browser.createPage'], ['Close context', 'browser.closeContext'],
  ['Close page', 'browser.closePage'], ['Close browser', 'browser.close'],
  ['Click', 'browser.click'], ['Double click', 'browser.doubleClick'],
  ['Fill', 'browser.fill'], ['Press', 'browser.press'], ['Type', 'browser.type'],
  ['Focus', 'browser.focus'], ['Blur', 'browser.blur'], ['Hover', 'browser.hover'],
  ['Check', 'browser.check'], ['Uncheck', 'browser.uncheck'],
  ['Select option', 'browser.selectOption'], ['Scroll into view', 'browser.scrollIntoView'],
  ['Wait for event', 'browser.waitForEvent'], ['Wait for selector', 'browser.waitForSelector'],
  ['Wait for function', 'browser.waitForFunction'], ['Wait for timeout', 'browser.waitForTimeout'],
  ['Route requests', 'browser.route'], ['Fulfill request', 'browser.fulfill'],
  ['Get attribute', 'browser.getAttribute'], ['Get text content', 'browser.getText'],
  ['Get inner text', 'browser.getText'], ['Get input value', 'browser.getInputValue'],
  ['Query count', 'browser.queryCount'], ['Is visible', 'browser.isVisible'],
]);
const CPU_FIELDS = ['user', 'nice', 'system', 'idle', 'iowait', 'irq', 'softirq', 'steal'];
const finite = value => typeof value === 'number' && Number.isFinite(value) && value >= 0;
const numberOrNull = value => finite(value) ? value : null;
const status = value => ['passed', 'failed', 'timedOut', 'timedout', 'skipped', 'interrupted'].includes(value) ? value : 'unknown';

export function safeOperation(step) {
  const title = typeof step?.title === 'string' ? step.title : '';
  if (step?.category === 'fixture' && FIXTURES.has(title)) return `fixture.${title}`;
  if (step?.category === 'fixture') {
    const fixture = title.match(/^Fixture "(browser|context|page|request)"$/u)?.[1];
    if (fixture) return `fixture.${fixture}`;
  }
  if (step?.category === 'hook' && title === 'Before Hooks') return 'hook.before';
  if (step?.category === 'hook' && title === 'After Hooks') return 'hook.after';
  if (step?.category === 'pw:api') {
    for (const [prefix, operation] of HUMAN_OPERATIONS) {
      if (title === prefix || title.startsWith(`${prefix} `)) return operation;
    }
  }
  if (step?.category === 'expect') {
    const matcher = title.match(/^Expect "(?:poll )?(?:soft )?(?:not )?([A-Za-z][A-Za-z0-9]*)(?=["\s])/u)?.[1];
    if (OPERATIONS.has(`expect.${matcher}`)) return `expect.${matcher}`;
  }
  const token = title.match(/^([A-Za-z][A-Za-z0-9]*\.[A-Za-z][A-Za-z0-9]*)(?=$|[\s(])/u)?.[1];
  return OPERATIONS.has(token) ? token : 'other';
}

export function parseCpuStat(text) {
  const line = String(text).split('\n').find(value => /^cpu\s/u.test(value));
  if (!line) return null;
  const fields = line.trim().split(/\s+/u).slice(1);
  if (fields.length < 8 || fields.slice(0, 8).some(value => !/^\d+$/u.test(value))) return null;
  const values = fields.slice(0, 8).map(Number);
  if (values.some(value => !Number.isSafeInteger(value))) return null;
  return Object.fromEntries(CPU_FIELDS.map((key, i) => [key, values[i]]));
}

export function parseMeminfo(text) {
  const result = {};
  for (const key of ['MemTotal', 'MemAvailable']) {
    const match = String(text).match(new RegExp(`^${key}:\\s+(\\d+)\\s+kB\\s*$`, 'm'));
    const value = match ? Number(match[1]) : NaN;
    if (!Number.isSafeInteger(value)) return null;
    result[key === 'MemTotal' ? 'totalKb' : 'availableKb'] = value;
  }
  return result.availableKb <= result.totalKb ? result : null;
}

export function parsePressure(text) {
  const result = {};
  for (const line of String(text).trim().split('\n')) {
    const match = line.match(/^(some|full) avg10=(\d+(?:\.\d+)?) avg60=(\d+(?:\.\d+)?) avg300=(\d+(?:\.\d+)?) total=(\d+)$/u);
    if (!match) return null;
    const [avg10, avg60, avg300, totalUs] = match.slice(2).map(Number);
    if (![avg10, avg60, avg300].every(value => finite(value) && value <= 100) || !Number.isSafeInteger(totalUs)) return null;
    if (result[match[1]]) return null;
    result[match[1]] = { avg10, avg60, avg300, totalUs };
  }
  return result.some ? result : null;
}

function cpuDelta(previous, current) {
  if (!previous || !current) return null;
  const delta = Object.fromEntries(CPU_FIELDS.map(key => [key, current[key] - previous[key]]));
  return Object.values(delta).every(finite) ? delta : null;
}

// Dependency injection is solely for Node tests. No environment, command lines,
// error contents, test/step titles, arguments or URL values are serialized.
export default class BrowserRuntimeReporter {
  constructor(options = {}, dependencies = {}) {
    this.label = options.label === 'pages' ? 'pages' : 'root';
    this.outputDir = options.outputDir ?? `test-results/browser-${this.label}`;
    this.outputFile = options.outputFile;
    this.deps = {
      now: () => performance.now(),
      readFile: path => readFileSync(path, 'utf8'),
      append: (path, line) => appendFileSync(path, line, 'utf8'),
      mkdir: path => mkdirSync(path, { recursive: true }),
      setInterval: (callback, milliseconds) => setInterval(callback, milliseconds),
      clearInterval: timer => clearInterval(timer),
      resourceUsage: () => process.resourceUsage(),
      warn: text => process.stderr.write(`${text}\n`),
      ...dependencies,
    };
    this.active = new Map();
    this.results = new WeakMap();
    this.steps = new WeakMap();
    this.sequence = 0;
    this.ioFailed = false;
    this.started = false;
    this.ended = false;
    this.cpuPrevious = null;
    this.callbackMs = 0;
    this.callbackCount = 0;
  }

  printsToStdio() { return false; }

  elapsed() { return Math.max(0, this.deps.now() - this.start); }

  warning() {
    if (this.ioFailed) return;
    this.ioFailed = true;
    try { this.deps.warn('Timeline runtime diagnostics unavailable: evidence write failed.'); } catch { /* no effect on acceptance */ }
  }

  emit(record) {
    if (this.ioFailed) return;
    try {
      this.deps.append(this.file, `${JSON.stringify({ schema: 1, label: this.label, ...record })}\n`);
    } catch { this.warning(); }
  }

  read(path, parser) {
    try { return parser(this.deps.readFile(path)); } catch { return null; }
  }

  resources() {
    const cpu = this.read('/proc/stat', parseCpuStat);
    const sample = {
      // Host aggregate counters; deltas are ticks, not milliseconds or per-process CPU.
      hostCpuTicks: cpu,
      hostCpuDeltaTicks: cpuDelta(this.cpuPrevious, cpu),
      hostMemory: this.read('/proc/meminfo', parseMeminfo),
      hostPressure: Object.fromEntries(['cpu', 'memory', 'io'].map(key => [key, this.read(`/proc/pressure/${key}`, parsePressure)])),
      reporterProcess: null,
    };
    this.cpuPrevious = cpu;
    try {
      const usage = this.deps.resourceUsage();
      sample.reporterProcess = Object.fromEntries([
        'userCPUTime', 'systemCPUTime', 'maxRSS', 'fsRead', 'fsWrite',
        'voluntaryContextSwitches', 'involuntaryContextSwitches',
      ].map(key => [key, numberOrNull(usage[key])]));
    } catch { /* unavailable is null, never an error object */ }
    return sample;
  }

  onBegin(config, suite) {
    if (this.started) return;
    this.started = true;
    this.start = this.deps.now();
    this.lastSample = this.start;
    this.rootDir = resolve(config.rootDir ?? '.');
    this.file = this.outputFile ? resolve(this.outputFile) : resolve(this.outputDir, 'runtime-diagnostics.ndjson');
    try { this.deps.mkdir(dirname(this.file)); } catch { this.warning(); }
    this.emit({
      kind: 'begin', elapsedMs: 0, discovered: suite.allTests().length,
      settings: { workers: numberOrNull(config.workers), retries: config.projects?.map(project => numberOrNull(project.retries)) ?? [], globalTimeoutMs: numberOrNull(config.globalTimeout) },
      resources: this.resources(),
    });
    this.timer = this.deps.setInterval(() => this.snapshot(), 5000);
    this.timer?.unref?.();
  }

  identity(test) {
    const location = test.location ?? {};
    // FullConfig.rootDir is the Playwright test root, not necessarily repo root.
    const candidate = typeof location.file === 'string' ? relative(this.rootDir, resolve(location.file)) : '';
    const file = candidate && !candidate.startsWith(`..${sep}`) && candidate !== '..' && !isAbsolute(candidate) && /^[\w./\\-]+$/u.test(candidate)
      ? candidate.split(sep).join('/') : 'other';
    const rawProject = test.parent?.project?.()?.name;
    const project = ['desktop', 'mobile'].includes(rawProject) ? rawProject : 'other';
    const line = numberOrNull(location.line);
    const column = numberOrNull(location.column);
    // Native test ID or full ancestry differentiates same-titled nested tests.
    // The preimage stays in memory; only a fixed-length digest is persisted.
    const id = createHash('sha256').update(JSON.stringify([project, file, line, column, test.id ?? test.titlePath?.() ?? []])).digest('hex').slice(0, 24);
    return { id, project, file, line, column };
  }

  onTestBegin(test, result) {
    if (!this.started || this.ended) return;
    const identity = this.identity(test);
    const state = { ...identity, attempt: numberOrNull(result.retry), worker: numberOrNull(result.workerIndex), startMs: this.elapsed(), nextStep: 0, completed: [], active: new Map(), aggregates: new Map(), stepCount: 0 };
    state.key = `${identity.id}:${++this.sequence}`;
    this.results.set(result, state);
    this.active.set(state.key, state);
    this.emit({ kind: 'testBegin', elapsedMs: this.elapsed(), test: identity, attempt: state.attempt, worker: state.worker });
  }

  onStepBegin(_test, result, step) {
    const begin = this.deps.now();
    const state = this.results.get(result);
    if (!state || this.ended) return;
    const parent = step.parent ? this.steps.get(step.parent) : null;
    const record = {
      id: ++state.nextStep, parentId: parent?.id ?? null,
      category: CATEGORIES.has(step.category) ? step.category : 'other',
      operation: safeOperation(step), startMs: this.elapsed(),
    };
    this.steps.set(step, record);
    state.active.set(record.id, record);
    this.callbackMs += Math.max(0, this.deps.now() - begin);
    this.callbackCount++;
  }

  onStepEnd(_test, result, step) {
    const begin = this.deps.now();
    const state = this.results.get(result);
    const record = this.steps.get(step);
    if (!state || !record || this.ended) return;
    // Nested durations are inclusive. Keep hierarchy; consumers must not sum
    // parent and child values as though they were disjoint wall-clock intervals.
    const completed = { ...record, durationMs: numberOrNull(step.duration), error: Boolean(step.error) };
    state.active.delete(record.id);
    this.steps.delete(step);
    state.completed.push(completed);
    state.stepCount++;
    const key = `${record.category}:${record.operation}`;
    const aggregate = state.aggregates.get(key) ?? { category: record.category, operation: record.operation, count: 0, inclusiveMs: 0, maxMs: 0 };
    aggregate.count++;
    if (finite(step.duration)) { aggregate.inclusiveMs += step.duration; aggregate.maxMs = Math.max(aggregate.maxMs, step.duration); }
    state.aggregates.set(key, aggregate);
    this.callbackMs += Math.max(0, this.deps.now() - begin);
    this.callbackCount++;
  }

  snapshot() {
    if (!this.started || this.ended) return;
    const now = this.deps.now();
    const activeTests = Array.from(this.active.values(), state => ({
      id: state.id, attempt: state.attempt, startMs: state.startMs,
      completedSteps: state.completed.splice(0),
      activeSteps: Array.from(state.active.values(), record => ({ ...record, ageMs: Math.max(0, this.elapsed() - record.startMs) })),
    }));
    this.emit({ kind: 'sample', elapsedMs: this.elapsed(), intervalMs: Math.max(0, now - this.lastSample), activeTests, resources: this.resources(), reporterStepCallbackMs: this.callbackMs, reporterStepCallbackCount: this.callbackCount });
    this.lastSample = now;
  }

  onTestEnd(_test, result) {
    const state = this.results.get(result);
    if (!state || this.ended) return;
    this.emit({ kind: 'testEnd', elapsedMs: this.elapsed(), id: state.id, attempt: state.attempt, status: status(result.status), durationMs: numberOrNull(result.duration), stepCount: state.stepCount, completedSteps: state.completed.splice(0), unfinishedSteps: Array.from(state.active.values()), aggregates: Array.from(state.aggregates.values()) });
    this.active.delete(state.key);
    this.results.delete(result);
  }

  onEnd(result) {
    if (!this.started || this.ended) return;
    this.snapshot();
    this.ended = true;
    if (this.timer) this.deps.clearInterval(this.timer);
    this.timer = null;
    this.emit({ kind: 'end', elapsedMs: this.elapsed(), status: status(result.status), durationMs: numberOrNull(result.duration), incompleteTests: this.active.size, reporterStepCallbackMs: this.callbackMs, reporterStepCallbackCount: this.callbackCount });
    this.active.clear();
    // Explicitly no return value: diagnostic failures cannot turn failed CI green.
  }

  async onExit() {
    if (this.timer) this.deps.clearInterval(this.timer);
    this.timer = null;
    if (this.started && !this.ended) this.onEnd({ status: 'interrupted' });
  }
}
