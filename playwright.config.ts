import { defineConfig, devices } from '@playwright/test';

const base = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const label = base ? 'pages' : 'root';
export default defineConfig({
  testDir: './tests/browser',
  outputDir: `test-results/browser-${label}`,
  timeout: 45_000,
  // Preserve the suite budget as coverage grows; bound CI concurrency instead
  // of weakening individual checks or extending timeouts.
  globalTimeout: 420_000,
  expect: { timeout: 10_000 },
  // Files may run in parallel, but cases within a file remain ordered. Each
  // test still gets its own context and output path; the fixture server is read-only.
  fullyParallel: false,
  workers: process.env.CI ? 2 : 1,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: `test-results/browser-${label}/results.json` }]],
  use: {
    baseURL: `http://127.0.0.1:4179${base}/`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', viewport: { width: 375, height: 812 } } },
  ],
  webServer: {
    command: 'node scripts/serve-built.mjs',
    url: `http://127.0.0.1:4179${base}/ai/`,
    reuseExistingServer: false,
    timeout: 15_000,
  },
});
