import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
test('Hydrogen detail keeps gated access and vendor evidence clear with filtered return', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/?q=Hydrogen`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="hydrogen-1-release"]');
  await expect(card).toHaveCount(1); await card.click();
  await expect(page.locator('h1')).toContainText('Hydrogen-1.0');
  await expect(page.locator('main')).toContainText('登录并同意分享');
  await expect(page.locator('main')).toContainText('评测均为厂商报告');
  await expect(page.locator('main')).toContainText('未实测');
  await expect(page.getByRole('link', { name: /GLM-5.3/, exact: false }).first()).toHaveAttribute('href', /glm-5-3/);
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await page.evaluate(() => document.fonts.ready);
    const file = info.outputPath(`hydrogen-${colorScheme}.png`);
    await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
    await info.attach(`hydrogen-${colorScheme}`, { path: file, contentType: 'image/png' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('Hydrogen');
  await expect(page.locator('[data-event-id="hydrogen-1-release"]')).toBeFocused();
  expect(errors).toEqual([]);
});
