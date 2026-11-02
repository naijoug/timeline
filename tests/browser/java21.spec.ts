import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

test('Java 21 detail keeps sourced history and reading usable in both themes', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/programming-languages/events/java-21/`);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Java SE 21 LTS 发布');
  await expect(page.locator('.full-event-meta time')).toHaveText('2023 年 9 月 19 日');
  await expect(page.getByRole('heading', { name: '事件：正式发布与预览并存' })).toBeVisible();
  await expect(page.getByText(/Structured Concurrency 仍是 Preview/)).toBeVisible();
  await expect(page.getByRole('heading', { name: /编辑分析：把三种承诺分开阅读/ })).toHaveCount(1);
  const reading = page.locator('#further-reading');
  await expect(reading.locator('a')).toHaveAttribute('href', 'https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html');
  await expect(page.locator('#sources')).toContainText('Java SE 21 Core Libraries');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`java21-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    await reading.scrollIntoViewIfNeeded();
    await expect(reading).toBeVisible();
  }
  expect(errors).toEqual([]);
});
