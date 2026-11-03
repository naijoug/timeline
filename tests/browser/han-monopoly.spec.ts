import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
test('Han monopoly separates uncertain date, evidence and reading on desktop and mobile', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/china-history/events/han-state-monopolies/`);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('盐铁官营：汉武帝时期的财政扩张');
  await expect(page.locator('.full-event-meta time')).toContainText('约');
  await expect(page.locator('.full-event-meta time')).toContainText('119');
  await expect(page.getByRole('heading', { name: '后续：前81年的论辩不是制度起始' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '编辑总结：把三个问题分开' })).toHaveCount(1);
  await expect(page.getByText(/约前119年沿用国博口径，同时保留学术研究中的前117年异说/)).toBeVisible();
  const reading = page.locator('#further-reading');
  await expect(reading.locator('a')).toHaveCount(2);
  await expect(reading).toContainText('Dan Turello');
  await expect(page.locator('#sources')).toContainText('Donald B. Wagner');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`han-monopoly-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    await reading.scrollIntoViewIfNeeded();
    await expect(reading).toBeVisible();
  }
  expect(errors).toEqual([]);
});
