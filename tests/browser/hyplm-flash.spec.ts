import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
test('HyPLM keeps scientific release boundaries and filtered return', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/?lines=all&all=1&q=HyPLM`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await page.locator('[data-event-id="hyplm-flash-release"]').click();
  await expect(page.locator('h1')).toContainText('HyPLM-Flash 650M');
  for (const text of ['2026年11月2日', 'FP32', 'INT8', 'MIT', '未下载', 'Hyra 平台整体开源']) await expect(page.locator('main')).toContainText(text);
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await page.evaluate(() => document.fonts.ready);
    const file = info.outputPath(`hyplm-${colorScheme}.png`);
    await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
    await info.attach(`hyplm-${colorScheme}`, { path: file, contentType: 'image/png' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('HyPLM');
  await expect(page.locator('[data-event-id="hyplm-flash-release"]')).toBeFocused();
  expect(errors).toEqual([]);
});
