import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
test('SenseNova Flash keeps public access separate from internal demos and restores filtered return', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/?q=SenseNova%206.8`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="sensenova-6-8-flash"]');
  await expect(card).toHaveCount(1); await card.click();
  await expect(page.locator('h1')).toContainText('SenseNova 6.8 Flash 正式版');
  await expect(page.locator('main')).toContainText('2026年11月2日');
  await expect(page.locator('main')).toContainText('内部研发版');
  await expect(page.locator('main')).toContainText('Design 实验版');
  await expect(page.locator('main')).toContainText('未独立复现或调用');
  await expect(page.locator('main')).toContainText('不同型号');
  await expect(page.locator('main')).toContainText('本地环境和用户多轮交互');
  await expect(page.locator('main')).toContainText('未核实本模型权重开放');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await page.evaluate(() => document.fonts.ready);
    const file = info.outputPath(`sensenova-flash-${colorScheme}.png`);
    await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
    await info.attach(`sensenova-flash-${colorScheme}`, { path: file, contentType: 'image/png' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('SenseNova 6.8');
  await expect(page.locator('[data-event-id="sensenova-6-8-flash"]')).toBeFocused();
  expect(errors).toEqual([]);
});
