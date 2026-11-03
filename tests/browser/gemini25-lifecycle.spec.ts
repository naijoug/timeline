import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
test('Gemini experimental release separates future stable API lifecycle in both themes', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/events/gemini-2-5-pro/`);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gemini 2.5 Pro 实验版');
  await expect(page.locator('.full-event-meta time')).toHaveText('2025 年 3 月 25 日');
  await expect(page.getByRole('heading', { name: '后续稳定版 API 的生命周期（2026-11-02公告）' })).toBeVisible();
  await expect(page.getByText(/这不等于 API 已不可用/)).toBeVisible();
  await expect(page.getByText(/官方计划自2026年12月1日/)).toBeVisible();
  await expect(page.getByRole('heading', { name: '编辑分析：发布历史与服务状态分开读' })).toHaveCount(1);
  const reading = page.locator('#further-reading');
  await expect(reading.locator('a')).toHaveCount(2);
  await expect(page.locator('#sources')).toContainText('Gemini API changelog');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`gemini25-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    await reading.scrollIntoViewIfNeeded();
    await expect(reading).toBeVisible();
  }
  expect(errors).toEqual([]);
});
