import test from 'node:test';
import assert from 'node:assert/strict';
import { RuntimeResourceSampler, parseProcessStat, parseProcessIo, parseRss, parseCpuMax, parseCgroupStat, parseCpuSet, ownCgroupPaths, parseHardware } from '../scripts/runtime-resource-sampler.mjs';
import BrowserRuntimeReporter from '../scripts/browser-runtime-reporter.mjs';

function stat(pid: number, ppid: number, start = 100, user = 20, system = 5, comm = 'secret (name)') {
  const f = Array.from({ length: 21 }, () => '0');
  f[0] = String(ppid); f[10] = String(user); f[11] = String(system); f[18] = String(start);
  return `${pid} (${comm}) S ${f.join(' ')}\n`;
}
function fixture() {
  const files: Record<string, string> = {
    '/proc/cpuinfo': 'processor : 0\nmodel name : Example CPU 2.0\nserial : PRIVATE_SERIAL\nprocessor : 1\nmodel name : Example CPU 2.0\n',
    '/proc/self/cgroup': '0::/jobs/PRIVATE_CGROUP\n',
    '/sys/fs/cgroup/jobs/PRIVATE_CGROUP/cpu.max': '200000 100000\n',
    '/sys/fs/cgroup/jobs/PRIVATE_CGROUP/cpu.stat': 'usage_usec 100\nuser_usec 80\nsystem_usec 20\nnr_periods 2\nnr_throttled 1\nthrottled_usec 15\n',
    '/sys/fs/cgroup/jobs/PRIVATE_CGROUP/cpuset.cpus.effective': '0-1\n',
    '/sys/fs/cgroup/cpu.max': 'max 100000\n',
    '/proc/10/stat': stat(10, 1),
    '/proc/20/stat': stat(20, 10), '/proc/20/comm': 'node\n',
    '/proc/20/io': 'read_bytes: 12\nwrite_bytes: 34\nprivate: PRIVATE_IO\n', '/proc/20/status': 'Name: PRIVATE_NAME\nVmRSS: 128 kB\n',
    '/proc/30/stat': stat(30, 20), '/proc/30/comm': 'headless_shell\n',
    '/proc/30/io': 'read_bytes: 100\nwrite_bytes: 200\n', '/proc/30/status': 'VmRSS: 256 kB\n',
    '/proc/40/stat': stat(40, 1), '/proc/40/comm': 'UNRELATED_SECRET\n',
  };
  const reads: string[] = []; let clock = 0;
  const deps = { pid: 10, readlink: () => { throw Error('PRIVATE_LINK'); }, readFile: (path: string) => { reads.push(path); if (!(path in files)) throw Error('PRIVATE_MISSING ' + path); return files[path]; }, readdir: () => ['10', '20', '30', '40', 'self'], now: () => clock++ };
  return { files, reads, deps, sampler: new RuntimeResourceSampler(deps) };
}

// Successful fixture expectations are runtime assertions as well as type guards.
function sample(sampler: RuntimeResourceSampler) {
  const result = sampler.sample();
  assert.ok(result);
  return result;
}
function processSample(sampler: RuntimeResourceSampler) {
  const result = sample(sampler);
  assert.ok(result.processes);
  return { ...result, processes: result.processes };
}

test('process parser handles comm parentheses but returns only numeric allowlisted counters', () => {
  assert.deepEqual(parseProcessStat(stat(20, 10)), { pid: 20, ppid: 10, userTicks: 20, systemTicks: 5, startTicks: 100 });
  assert.equal(parseProcessStat('20 (private) S 1 2'), null);
  assert.equal(parseProcessStat(stat(20, 10).replace(' 20 ', ' -20 ')), null);
  assert.deepEqual(parseProcessIo('read_bytes: 5\nwrite_bytes: 6\nsecret: DO_NOT_PERSIST'), { readBytes: 5, writeBytes: 6 });
  assert.equal(parseProcessIo('read_bytes: 5'), null);
  assert.equal(parseRss('VmRSS: 120 kB\n'), 120);
  assert.equal(parseRss('VmRSS: 120 bytes'), null);
});

test('cgroup parsers distinguish unlimited, unavailable, missing counters and malformed membership', () => {
  assert.deepEqual(parseCpuMax('max 100000\n'), { unlimited: true, quotaUs: null, periodUs: 100000 });
  assert.deepEqual(parseCpuMax('50000 100000'), { unlimited: false, quotaUs: 50000, periodUs: 100000 });
  for (const input of ['0 100000', '1000 0', '-1 100', '100 100 secret', '9007199254740992 100']) assert.equal(parseCpuMax(input), null);
  assert.equal(parseCgroupStat('nr_throttled 4'), null);
  assert.equal(parseCgroupStat('usage_usec 4\nusage_usec 5'), null);
  const counters = parseCgroupStat('usage_usec 4'); assert.ok(counters);
  assert.equal(counters.throttled_usec, null);
  assert.equal(parseCpuSet('0-2,2,5'), 4);
  assert.equal(parseCpuSet(Array(400).fill('0-65535').join(',')), 65536);
  for (const input of ['', '4-2', '0-65536', 'a', '-1']) assert.equal(parseCpuSet(input), null);
  assert.deepEqual(ownCgroupPaths('0::/a/b'), ['/sys/fs/cgroup/a/b', '/sys/fs/cgroup/a', '/sys/fs/cgroup']);
  for (const input of ['1:cpu:/a', '0::/a/../b', '0::relative', '0::/a\n0::/b', '0::/a\\b']) assert.equal(ownCgroupPaths(input), null);
});

test('hardware data keeps bounded model and logical count without serial, path or arbitrary fields', () => {
  assert.deepEqual(parseHardware('processor : 0\nmodel name : AMD EPYC 7763\nserial : PRIVATE'), { logicalCpuCount: 1, model: 'AMD EPYC 7763' });
  assert.equal(parseHardware('processor : 0\nmodel name : https://secret/\n').model, null);
  assert.deepEqual(parseHardware('no hardware'), { logicalCpuCount: null, model: null });
});

test('sampler includes only own descendants, labels estimates, and leaves absent data null', () => {
  const f = fixture(); const r = processSample(f.sampler);
  assert.equal(r.processes.descendantCandidates, 2);
  assert.equal(r.processes.groups.nodeDescendant.count, 1);
  assert.equal(r.processes.groups.chromiumDescendant.rssKb, 256);
  assert.equal(r.processes.groups.nodeDescendant.userDeltaTicks, null);
  assert.equal(r.processes.groups.otherDescendant.userTicks, null);
  assert.ok(r.cgroup);
  assert.ok(r.cgroup.ancestors[0].quota);
  assert.equal(r.cgroup.ancestors.length, 3);
  assert.equal(r.cgroup.ancestors[0].quota.quotaUs, 200000);
  assert.equal(r.cgroup.ancestors[1].quota, null);
  assert.equal(r.cgroup.ancestors[0].delta, null);
  assert.ok(!f.reads.some(path => path.endsWith('/cmdline') || path.endsWith('/environ') || path === '/proc/40/comm' || path === '/proc/40/io'));
  assert.doesNotMatch(JSON.stringify(r), /PRIVATE|UNRELATED|secret|\/proc|\/sys|jobs/);
  assert.ok(r.sampleMs >= 0);
});

test('stable process identities and cgroup counters produce scoped monotonic deltas', () => {
  const f = fixture(); f.sampler.sample();
  f.files['/proc/20/stat'] = stat(20, 10, 100, 27, 9);
  f.files['/proc/20/io'] = 'read_bytes: 20\nwrite_bytes: 40\n';
  f.files['/sys/fs/cgroup/jobs/PRIVATE_CGROUP/cpu.stat'] = 'usage_usec 110\nnr_periods 3\nnr_throttled 2\nthrottled_usec 18\n';
  const r = processSample(f.sampler); const g = r.processes.groups.nodeDescendant;
  assert.equal(g.matchedProcesses, 1); assert.equal(g.userDeltaTicks, 7); assert.equal(g.systemDeltaTicks, 4);
  assert.equal(g.readDeltaBytes, 8); assert.equal(g.writeDeltaBytes, 6);
  assert.ok(r.cgroup); assert.ok(r.cgroup.ancestors[0].delta);
  assert.equal(r.cgroup.ancestors[0].delta.usage_usec, 10);
  assert.equal(r.cgroup.ancestors[0].delta.throttled_usec, 3);
  assert.equal(r.cgroup.ancestors[0].delta.user_usec, null);
});

test('PID reuse, disappearance and counter reset never masquerade as elapsed CPU or IO', () => {
  const f = fixture(); f.sampler.sample();
  f.files['/proc/20/stat'] = stat(20, 10, 200, 1, 1);
  delete f.files['/proc/30/stat'];
  const r = processSample(f.sampler);
  assert.equal(r.processes.groups.nodeDescendant.matchedProcesses, 0);
  assert.equal(r.processes.groups.nodeDescendant.userDeltaTicks, null);
  assert.equal(r.processes.exitedOrLost, 2);
  f.files['/proc/20/stat'] = stat(20, 10, 200, 0, 0);
  f.files['/proc/20/io'] = 'read_bytes: 1\nwrite_bytes: 1\n';
  f.files['/sys/fs/cgroup/jobs/PRIVATE_CGROUP/cpu.stat'] = 'usage_usec 1\nnr_throttled 0\n';
  const reset = processSample(f.sampler);
  assert.equal(reset.processes.groups.nodeDescendant.userDeltaTicks, null);
  assert.equal(reset.processes.groups.nodeDescendant.readDeltaBytes, null);
  assert.ok(reset.cgroup); assert.ok(reset.cgroup.ancestors[0].delta);
  assert.equal(reset.cgroup.ancestors[0].delta.usage_usec, null);
});

test('process identity races and unreadable IO are counted without stale attribution', () => {
  const f = fixture(); let calls = 0;
  const sampler = new RuntimeResourceSampler({ ...f.deps, readFile: (path: string) => {
    if (path === '/proc/20/stat' && ++calls === 2) return stat(20, 10, 999);
    return f.deps.readFile(path);
  } });
  const r = processSample(sampler); assert.equal(r.processes.racedOrUnreadable, 2); assert.equal(r.processes.groups.nodeDescendant.count, 0); assert.equal(r.processes.groups.chromiumDescendant.count, 0);
  delete f.files['/proc/30/io']; const p = processSample(f.sampler).processes.groups.chromiumDescendant;
  assert.equal(p.ioObserved, 0); assert.equal(p.readBytes, null); assert.equal(p.rssKb, 256);
});

test('unavailable proc, excessive listings and unsupported cgroups fail closed', () => {
  const f = fixture();
  f.files['/proc/self/cgroup'] = '1:cpu:/private'; assert.equal(sample(f.sampler).cgroup, null);
  const bad = new RuntimeResourceSampler({ ...f.deps, readdir: () => { throw Error('PRIVATE'); } });
  assert.equal(sample(bad).processes, null);
  const huge = new RuntimeResourceSampler({ ...f.deps, readdir: () => Array.from({ length: 4097 }, (_, i) => String(i)) });
  assert.equal(sample(huge).processes, null);
  delete f.files['/proc/10/stat']; assert.equal(sample(f.sampler).processes, null);
});

test('reporter attribution exception cannot alter acceptance or leak error data', () => {
  const lines: string[] = [];
  const reporter = new BrowserRuntimeReporter({}, { resourceSampler: { sample() { throw Error('PRIVATE_ERROR'); } }, readFile: () => { throw Error('PRIVATE_READ'); }, append: (_path: string, line: string) => lines.push(line), mkdir: () => {}, setInterval: () => ({ unref() {} }), clearInterval: () => {}, resourceUsage: () => ({}) });
  reporter.onBegin({ workers: 1, globalTimeout: 420000, projects: [{ retries: 0 }] }, { allTests: () => [] });
  assert.equal(reporter.onEnd({ status: 'failed' }), undefined);
  assert.equal(JSON.parse(lines[0]).resources.attribution, null);
  assert.equal(JSON.parse(lines.at(-1)!).status, 'failed');
  assert.doesNotMatch(lines.join(''), /PRIVATE_ERROR|PRIVATE_READ/);
});


test('changed ancestor identity excludes descendants, and time budget does not emit partial process totals', () => {
  const f = fixture(); let nodeReads = 0;
  const sampler = new RuntimeResourceSampler({ ...f.deps, readFile: (path: string) => {
    if (path === '/proc/20/stat' && ++nodeReads >= 3) return stat(20, 1, 999);
    return f.deps.readFile(path);
  } });
  const r = processSample(sampler);
  assert.equal(r.processes.groups.chromiumDescendant.count, 0);
  assert.equal(r.processes.racedOrUnreadable, 1);
  let time = 0;
  const slow = new RuntimeResourceSampler({ ...f.deps, now: () => time += 20 });
  const partial = sample(slow);
  assert.equal(partial.workLimitReached, 'timeBudget');
  assert.equal(partial.processes, null);
  assert.ok(partial.cgroup);
  assert.equal(partial.cgroup.complete, false);
  assert.ok(partial.sampleMs >= partial.cooperativeBudgetMs);
});


test('generic MainThread is classified only by known executable basename, without persisting target', () => {
  const f = fixture(); f.files['/proc/20/comm'] = 'MainThread';
  const unknown = processSample(f.sampler); assert.equal(unknown.processes.groups.otherDescendant.count, 1);
  const sampler = new RuntimeResourceSampler({ ...f.deps, readlink: (path: string) => path === '/proc/20/exe' ? '/PRIVATE_HOME/toolchain/node' : '/PRIVATE_HOME/unknown' });
  const r = processSample(sampler); assert.equal(r.processes.groups.nodeDescendant.count, 1);
  assert.doesNotMatch(JSON.stringify(r), /PRIVATE_HOME|MainThread|unknown/);
});

test('group sums that exceed safe integer precision become unavailable, not rounded counters', () => {
  const f = fixture();
  f.files['/proc/20/stat'] = stat(20, 10, 100, Number.MAX_SAFE_INTEGER, 1);
  f.files['/proc/30/stat'] = stat(30, 20, 100, Number.MAX_SAFE_INTEGER, 1);
  f.files['/proc/30/comm'] = 'node';
  const r = processSample(f.sampler);
  assert.equal(r.processes.groups.nodeDescendant.count, 2);
  assert.equal(r.processes.groups.nodeDescendant.userTicks, null);
  assert.equal(r.processes.groups.nodeDescendant.systemTicks, 2);
});
