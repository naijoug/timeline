import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const cases = [
  { id: 'perplexity-teammates-web-launch', query: 'Teammates', line: 'ai-agent-products', words: ['研究预览', '个人 Max', 'Enterprise Pro / Max', '2026年11月5日17:05:47 UTC', '博客索引标11月4日', 'iOS', 'Claude Opus 5.5'], source: 'https://www.perplexity.ai/help-center/en/articles/2026102601-perplexity-teammates' },
  { id: 'inkling-2-small-release', query: 'Inkling 2 Small', line: 'ai-model-iterations', words: ['2026', '594B', '17B', 'Apache 2.0', 'Tinker'], source: 'https://thinkingmachines.ai/model-card/inkling-2-small/' },
];
for (const item of cases) {
  test(`${item.query} preserves evidence, theme layout and filtered return`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${prefix}/ai/?lines=all&all=1&lane=${item.line === 'ai-agent-products' ? 'products' : 'models'}&q=${encodeURIComponent(item.query)}`);
    await page.locator('[data-timeline-ready="true"]').waitFor();
    const card = page.locator(`[data-event-id="${item.id}"]`);
    await expect(card).toHaveCount(1);
    await card.click();
    await expect(page.locator('h1')).toContainText(item.query);
    for (const word of item.words) await expect(page.locator('main')).toContainText(word);
    await expect(page.getByRole('heading', { name: /编辑分析.*编辑解读/ })).toBeVisible();
    await expect(page.locator(`main a[href="${item.source}"]`).first()).toBeVisible();
    for (const colorScheme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme });
      await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
      await page.evaluate(() => document.fonts.ready);
      const path = info.outputPath(`${item.id}-${colorScheme}.png`);
      await page.screenshot({ path, fullPage: true, animations: 'disabled' });
      await info.attach(`${item.id}-${colorScheme}`, { path, contentType: 'image/png' });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    await page.getByRole('link', { name: '返回时间线', exact: true }).click();
    await page.locator('[data-timeline-ready="true"]').waitFor();
    await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue(item.query);
    await expect(card).toBeFocused();
    expect(new URL(page.url()).searchParams.get('lines')).toBe('all');
    await page.goForward();
    await expect(page.locator('h1')).toContainText(item.query);
    await page.goBack();
    await page.locator('[data-timeline-ready="true"]').waitFor();
    await expect(card).toBeFocused();
    expect(errors).toEqual([]);
  });
  test(`${item.query} reads from its curated line without JavaScript`, async ({ browser }, info) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
    try {
      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:4179${prefix}/ai/timelines/${item.line}/`);
      await page.locator(`[data-event-id="${item.id}"]`).click();
      await expect(page.locator('h1')).toContainText(item.query);
      for (const word of item.words) await expect(page.locator('main')).toContainText(word);
      await expect(page.locator(`main a[href="${item.source}"]`).first()).toBeVisible();
      await expect(page.getByRole('link', { name: '返回时间线', exact: true })).toHaveAttribute('href', `${prefix}/ai/`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    } finally { await context.close(); }
  });
}
