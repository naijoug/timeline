import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

function configuration(ci: boolean, base: string) {
  return JSON.parse(execFileSync(process.execPath, [
    '--import', 'tsx', '--input-type=module', '-e',
    "import config from './playwright.config.ts'; console.log(JSON.stringify(config));",
  ], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, CI: ci ? 'true' : '', TIMELINE_BASE_PATH: base },
    encoding: 'utf8',
  }));
}

for (const base of ['', '/timeline']) {
  test(`browser acceptance preserves coverage and isolation for ${base || '/'} with bounded CI workers`, () => {
    const label = base ? 'pages' : 'root';
    for (const ci of [false, true]) {
      const config = configuration(ci, base);
      assert.equal(config.workers, ci ? 2 : 1);
      assert.equal(config.fullyParallel, false);
      assert.equal(config.testDir, './tests/browser');
      assert.equal(config.timeout, 45_000);
      assert.equal(config.globalTimeout, 420_000);
      assert.equal(config.expect.timeout, 10_000);
      assert.equal(config.retries, 0);
      assert.equal(config.outputDir, `test-results/browser-${label}`);
      assert.deepEqual(config.reporter, [['list'], ['json', {
        outputFile: `test-results/browser-${label}/results.json`,
      }]]);
      assert.equal(config.use.baseURL, `http://127.0.0.1:4179${base}/`);
      assert.equal(config.use.trace, 'retain-on-failure');
      assert.equal(config.use.screenshot, 'only-on-failure');
      assert.equal(config.use.storageState, undefined);
      for (const scope of [config, ...config.projects]) {
        for (const filter of ['grep', 'grepInvert', 'shard', 'testIgnore', 'testMatch']) {
          assert.equal(scope[filter], undefined, `${filter} must not narrow browser acceptance`);
        }
      }
      assert.deepEqual(config.projects.map((project: { name: string; use: { viewport: unknown } }) => ({
        name: project.name, viewport: project.use.viewport,
      })), [
        { name: 'desktop', viewport: { width: 1440, height: 1000 } },
        { name: 'mobile', viewport: { width: 375, height: 812 } },
      ]);
      const mobile = config.projects.find((project: { name: string }) => project.name === 'mobile');
      assert.equal(mobile.use.defaultBrowserType, 'chromium');
      assert.equal(mobile.use.isMobile, true);
      assert.equal(mobile.use.hasTouch, true);
      assert.deepEqual(config.webServer, {
        command: 'node scripts/serve-built.mjs',
        url: `http://127.0.0.1:4179${base}/ai/`,
        reuseExistingServer: false,
        timeout: 15_000,
      });
    }
  });
}
