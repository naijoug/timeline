import { readFileSync, readdirSync, readlinkSync } from 'node:fs';
import { performance } from 'node:perf_hooks';

const integer = value => /^\d+$/u.test(String(value)) && Number.isSafeInteger(Number(value)) ? Number(value) : null;
const safeRead = (read, path, parser) => { try { return parser(read(path)); } catch { return null; } };
const add = (left, right) => left !== null && Number.isSafeInteger(left + right) ? left + right : null;
const ROLES = ['nodeDescendant', 'chromiumDescendant', 'otherDescendant'];
const roleOf = (comm, executable) => {
  // Newer Node versions can use generic comm=MainThread. Inspect only an own
  // descendant's executable basename; the raw symlink target is never emitted.
  const name = typeof executable === 'string' ? executable.split('/').at(-1) : null;
  if (['node', 'nodejs'].includes(name) || ['node', 'nodejs'].includes(comm)) return ROLES[0];
  if (['chrome', 'chromium', 'chromium-browse', 'headless_shell', 'chrome-headless', 'chrome-headless-shell', 'chrome_crashpad'].some(value => value === name || value === comm)) return ROLES[1];
  return ROLES[2];
};

export function parseProcessStat(text) {
  // comm may contain spaces and parentheses; it is never returned or persisted.
  const match = String(text).trim().match(/^(\d+) \(.*\) ([A-Za-z]) (.+)$/u);
  if (!match) return null;
  const fields = match[3].split(/\s+/u);
  const result = { pid: integer(match[1]), ppid: integer(fields[0]), userTicks: integer(fields[10]), systemTicks: integer(fields[11]), startTicks: integer(fields[18]) };
  return Object.values(result).every(value => value !== null) ? result : null;
}
export function parseProcessIo(text) {
  const result = {};
  for (const key of ['read_bytes', 'write_bytes']) {
    const match = String(text).match(new RegExp(`^${key}:\\s+(\\d+)\\s*$`, 'm'));
    result[key === 'read_bytes' ? 'readBytes' : 'writeBytes'] = match ? integer(match[1]) : null;
  }
  return Object.values(result).every(value => value !== null) ? result : null;
}
export function parseRss(text) {
  const match = String(text).match(/^VmRSS:\s+(\d+)\s+kB\s*$/mu);
  return match ? integer(match[1]) : null;
}
export function parseCpuMax(text) {
  const match = String(text).trim().match(/^(max|\d+) (\d+)$/u);
  if (!match) return null;
  const periodUs = integer(match[2]), quotaUs = match[1] === 'max' ? null : integer(match[1]);
  if (!periodUs || (match[1] !== 'max' && !quotaUs)) return null;
  return { unlimited: match[1] === 'max', quotaUs, periodUs };
}
/** @returns {Record<string, number | null> | null} */
export function parseCgroupStat(text) {
  /** @type {Record<string, number | null>} */
  const result = {};
  for (const key of ['usage_usec', 'user_usec', 'system_usec', 'nr_periods', 'nr_throttled', 'throttled_usec']) {
    const matches = [...String(text).matchAll(new RegExp(`^${key} (\\d+)$`, 'gm'))];
    if (matches.length > 1) return null;
    result[key] = matches.length ? integer(matches[0][1]) : null;
  }
  return result.usage_usec === null ? null : result;
}
export function parseCpuSet(text) {
  const raw = String(text).trim();
  if (!raw || raw.length > 4096) return null;
  const ranges = [];
  for (const part of raw.split(',')) {
    const m = part.match(/^(\d+)(?:-(\d+))?$/u); if (!m) return null;
    const lo = integer(m[1]), hi = integer(m[2] ?? m[1]);
    if (lo === null || hi === null || hi < lo || hi > 65535) return null;
    ranges.push([lo, hi]);
  }
  // Merge ranges instead of expanding adversarial repeated 0-65535 lists.
  ranges.sort((a, b) => a[0] - b[0]);
  let count = 0, end = -1;
  for (const [lo, hi] of ranges) if (hi > end) { count += hi - Math.max(lo, end + 1) + 1; end = hi; }
  return count;
}
export function ownCgroupPaths(text) {
  const lines = String(text).trim().split('\n');
  const v2 = lines.filter(line => line.startsWith('0::'));
  if (v2.length !== 1) return null;
  const path = v2[0].slice(3);
  if (!path.startsWith('/') || path.includes('\\') || /[\x00-\x1f\x7f]/u.test(path)) return null;
  const parts = path.split('/').filter(Boolean);
  if (parts.length > 32 || parts.some(part => part === '.' || part === '..')) return null;
  return Array.from({ length: parts.length + 1 }, (_, depth) => '/sys/fs/cgroup' + (parts.length > depth ? '/' + parts.slice(0, parts.length - depth).join('/') : ''));
}
export function parseHardware(text) {
  const raw = String(text);
  const processorCount = [...raw.matchAll(/^processor\s*:\s*\d+\s*$/gm)].length;
  // Only hardware model characters, never arbitrary CPU-info fields or host IDs.
  const models = [...raw.matchAll(/^model name\s*:\s*([^\n]+)$/gm)].map(match => match[1].trim());
  const unique = [...new Set(models)];
  const model = unique.length === 1 && /^[A-Za-z0-9 ()@.,+_-]{1,120}$/u.test(unique[0]) ? unique[0] : null;
  return { logicalCpuCount: processorCount > 0 && processorCount <= 65536 ? processorCount : null, model };
}
function delta(current, previous) {
  if (!current || !previous) return null;
  /** @type {Record<string, number | null>} */
  const out = {};
  for (const key of Object.keys(current)) {
    out[key] = current[key] !== null && previous[key] !== null && current[key] >= previous[key] ? current[key] - previous[key] : null;
  }
  return out;
}

// No browser hooks, launch flags, status changes or subprocesses. Only read-only
// proc/cgroup metadata. Short-lived processes and inaccessible counters are not
// inferred; role labels are comm/executable-name estimates, not exact Playwright identity.
// nodeDescendant can include the static server. CPU includes only each process's
// own utime/stime (never cutime/cstime). RSS sums can double-count shared pages;
// IO bytes are storage-layer counters, not network/all read/write traffic.
// Cgroup ancestors include descendants: never sum layers or attribute their
// entire usage to this task. Process deltas cover only matched surviving
// identities and exclude exited/short-lived work; they are observed lower bounds.
export class RuntimeResourceSampler {
  constructor(dependencies = {}) {
    this.read = dependencies.readFile ?? (path => readFileSync(path, 'utf8'));
    this.readlink = dependencies.readlink ?? (path => readlinkSync(path));
    this.list = dependencies.readdir ?? (path => readdirSync(path));
    this.now = dependencies.now ?? (() => performance.now());
    this.pid = dependencies.pid ?? process.pid;
    this.previous = new Map(); this.cgroupPrevious = new Map();
    this.hardware = undefined;
    this.workLimitReached = null; this.deadline = 0;
  }
  outOfBudget() {
    if (this.now() <= this.deadline) return false;
    this.workLimitReached = 'timeBudget'; return true;
  }
  cgroup() {
    const paths = safeRead(this.read, '/proc/self/cgroup', ownCgroupPaths);
    if (!paths) { this.cgroupPrevious.clear(); return null; }
    const next = new Map();
    const ancestors = [];
    for (const [depth, path] of paths.entries()) {
      if (this.outOfBudget()) break;
      const counters = safeRead(this.read, `${path}/cpu.stat`, parseCgroupStat);
      const change = delta(counters, this.cgroupPrevious.get(path)); next.set(path, counters);
      ancestors.push({ depth, quota: safeRead(this.read, `${path}/cpu.max`, parseCpuMax), effectiveCpuCount: safeRead(this.read, `${path}/cpuset.cpus.effective`, parseCpuSet), counters, delta: change });
    }
    this.cgroupPrevious = next;
    return { version: 2, complete: ancestors.length === paths.length, ancestors };
  }
  processes() {
    let names;
    try { names = this.list('/proc').filter(name => /^\d+$/u.test(name)); } catch { this.previous.clear(); return null; }
    if (names.length > 4096) { this.workLimitReached = 'processLimit'; this.previous.clear(); return null; }
    const stats = new Map(); let unreadableStats = 0;
    for (const name of names) {
      if (this.outOfBudget()) { this.previous.clear(); return null; }
      const stat = safeRead(this.read, `/proc/${name}/stat`, parseProcessStat);
      if (stat && stat.pid === Number(name)) stats.set(stat.pid, stat); else unreadableStats++;
    }
    const own = stats.get(this.pid); if (!own) { this.previous.clear(); return null; }
    // Linear adjacency traversal, not repeated full-table scans.
    const children = new Map();
    for (const stat of stats.values()) {
      const list = children.get(stat.ppid) ?? []; list.push(stat.pid); children.set(stat.ppid, list);
    }
    const descendants = new Set(); const queue = [this.pid]; const visited = new Set(queue);
    for (let i = 0; i < queue.length; i++) for (const pid of children.get(queue[i]) ?? []) {
      if (!visited.has(pid)) { visited.add(pid); descendants.add(pid); queue.push(pid); }
    }
    // A parent's stable identity is a prerequisite for counting its child.
    // proc snapshots are not atomic; races observed on any ancestor discard its
    // subtree instead of attributing a reused PID's unrelated descendants.
    const ownAfter = safeRead(this.read, `/proc/${this.pid}/stat`, parseProcessStat);
    if (!ownAfter || ownAfter.pid !== this.pid || ownAfter.startTicks !== own.startTicks) { this.previous.clear(); return null; }
    const validParents = new Set([this.pid]);
    const groups = Object.fromEntries(ROLES.map(role => [role, { count: 0, userTicks: 0, systemTicks: 0, rssKb: 0, rssObserved: 0, ioObserved: 0, readBytes: 0, writeBytes: 0, matchedProcesses: 0, cpuDeltaObserved: 0, userDeltaTicks: 0, systemDeltaTicks: 0, ioDeltaObserved: 0, readDeltaBytes: 0, writeDeltaBytes: 0 }]));
    const next = new Map(); let racedOrUnreadable = 0;
    for (const pid of descendants) {
      if (this.outOfBudget()) { this.previous.clear(); return null; }
      const before = stats.get(pid);
      const parentBefore = stats.get(before.ppid);
      const parentNow = safeRead(this.read, `/proc/${before.ppid}/stat`, parseProcessStat);
      if (!validParents.has(before.ppid) || !parentNow || parentNow.pid !== before.ppid || parentNow.startTicks !== parentBefore?.startTicks || parentNow.ppid !== parentBefore?.ppid) { racedOrUnreadable++; continue; }
      const comm = safeRead(this.read, `/proc/${pid}/comm`, text => String(text).trim());
      const executable = safeRead(this.readlink, `/proc/${pid}/exe`, value => typeof value === 'string' && value.length <= 4096 ? value : null);
      const io = safeRead(this.read, `/proc/${pid}/io`, parseProcessIo);
      const rssKb = safeRead(this.read, `/proc/${pid}/status`, parseRss);
      const after = safeRead(this.read, `/proc/${pid}/stat`, parseProcessStat);
      if (!after || after.pid !== pid || before.startTicks !== after.startTicks || before.ppid !== after.ppid || after.userTicks < before.userTicks || after.systemTicks < before.systemTicks) { racedOrUnreadable++; continue; }
      validParents.add(pid);
      const role = roleOf(comm, executable); const group = groups[role];
      const key = `${pid}:${after.startTicks}`; const prior = this.previous.get(key);
      group.count++; group.userTicks = add(group.userTicks, after.userTicks); group.systemTicks = add(group.systemTicks, after.systemTicks);
      if (rssKb !== null) { group.rssObserved++; group.rssKb = add(group.rssKb, rssKb); }
      if (io) { group.ioObserved++; group.readBytes = add(group.readBytes, io.readBytes); group.writeBytes = add(group.writeBytes, io.writeBytes); }
      if (prior && prior.role === role) {
        group.matchedProcesses++;
        if (after.userTicks >= prior.userTicks && after.systemTicks >= prior.systemTicks) { group.cpuDeltaObserved++; group.userDeltaTicks = add(group.userDeltaTicks, after.userTicks - prior.userTicks); group.systemDeltaTicks = add(group.systemDeltaTicks, after.systemTicks - prior.systemTicks); }
        if (io && prior.io && io.readBytes >= prior.io.readBytes && io.writeBytes >= prior.io.writeBytes) { group.ioDeltaObserved++; group.readDeltaBytes = add(group.readDeltaBytes, io.readBytes - prior.io.readBytes); group.writeDeltaBytes = add(group.writeDeltaBytes, io.writeBytes - prior.io.writeBytes); }
      }
      next.set(key, { role, userTicks: after.userTicks, systemTicks: after.systemTicks, io });
    }
    let exitedOrLost = 0; for (const key of this.previous.keys()) if (!next.has(key)) exitedOrLost++;
    this.previous = next;
    for (const group of Object.values(groups)) {
      if (!group.count) { group.userTicks = null; group.systemTicks = null; }
      if (!group.rssObserved) group.rssKb = null;
      if (!group.ioObserved) { group.readBytes = null; group.writeBytes = null; }
      if (!group.cpuDeltaObserved) { group.userDeltaTicks = null; group.systemDeltaTicks = null; }
      if (!group.ioDeltaObserved) { group.readDeltaBytes = null; group.writeDeltaBytes = null; }
    }
    return { scannedProcesses: names.length, unreadableStats, descendantCandidates: descendants.size, racedOrUnreadable, exitedOrLost, groups };
  }
  sample() {
    const start = this.now();
    // Cooperative cap: checked between bounded reads; not a hard interruption
    // guarantee for a kernel read. Measured duration includes any overrun.
    this.deadline = start + 25; this.workLimitReached = null;
    // Fail closed: errors contain no proc data and never escape into test status.
    try {
      if (this.hardware === undefined) this.hardware = safeRead(this.read, '/proc/cpuinfo', parseHardware);
      const cgroup = this.cgroup(), processes = this.processes();
      return { hardware: this.hardware, cgroup, processes, workLimitReached: this.workLimitReached, cooperativeBudgetMs: 25, sampleMs: Math.max(0, this.now() - start) };
    } catch { this.previous.clear(); this.cgroupPrevious.clear(); return null; }
  }
}
