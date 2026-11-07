import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
test('cryptanalysis preserves research boundaries, sources and filtered navigation', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(`${prefix}/ai/?q=密码分析`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="deepmind-ai-cryptanalysis-research"]');
  await expect(card).toHaveCount(1); await card.click();
  await expect(page.locator('h1')).toContainText('DeepMind 公布 AI 辅助密码分析研究');
  for (const text of ['2026年11月6日', '工作论文', '人类主导', '3.5倍', '约30倍', '尚未实现 fan factory', '2048-bit', '未独立复现', '编辑分析']) await expect(page.locator('main')).toContainText(text);
  await expect(page.locator('main a[href="https://x.com/GoogleDeepMind/status/2118755418675765656"]').first()).toBeVisible();
  await expect(page.locator('main a[href*="Faster_Affine_Root"]').first()).toBeVisible();
  await expect(page.locator('main a[href*="Fan_Factories_Multiple"]').first()).toBeVisible();
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: info.outputPath(`cryptanalysis-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('密码分析');
  await expect(card).toBeFocused();
  await page.goForward(); await expect(page.locator('h1')).toContainText('AI 辅助密码分析研究');
  await page.goBack(); await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('密码分析');
  expect(errors).toEqual([]);
});


test('cryptanalysis sources and paper readings work without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/ai/events/deepmind-ai-cryptanalysis-research/`);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('AI 辅助密码分析研究');
  await expect(page.locator('#sources')).toContainText('Fan Factories');
  await expect(page.locator('#further-reading a')).toHaveCount(2);
  await expect(page.locator('#further-reading a[href*="Faster_Affine_Root"]')).toBeVisible();
  await expect(page.locator('#further-reading a[href*="Fan_Factories_Multiple"]')).toBeVisible();
  await expect(page.locator('main')).toContainText('未独立复现');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.screenshot({ path: info.outputPath('cryptanalysis-no-js.png'), fullPage: true });
  await context.close();
});
