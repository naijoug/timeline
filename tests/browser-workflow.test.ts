import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('browser CI pins the supported runner without weakening the no-PR acceptance boundary', () => {
  const workflow = readFileSync(new URL('../.github/workflows/subtimeline-checks.yml', import.meta.url), 'utf8');
  assert.match(workflow, /runs-on: ubuntu-24\.04/);
  assert.match(workflow, /permissions:\n  contents: read/);
  assert.match(workflow, /branches: \['maintenance\/\*\*'\]/);
  assert.match(workflow, /npx playwright install --with-deps chromium/);
  assert.match(workflow, /fonts-noto-cjk/);
  assert.equal((workflow.match(/run: npm run test:browser/g) || []).length, 2);
  assert.doesNotMatch(workflow, /pull_request_target|continue-on-error|deploy-pages|id-token: write|pages: write/);
  const pages = readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
  assert.match(pages, /workflow_dispatch/);
  assert.doesNotMatch(pages, /pull_request:|push:/);
});
