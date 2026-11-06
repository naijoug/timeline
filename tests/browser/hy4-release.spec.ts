import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
test('Hy4 formal release preserves preview baseline and search return', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/?lines=all&all=1&q=Hy4`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('[data-event-id="tencent-hy4-preview"]')).toBeVisible();
  await page.locator('[data-event-id="tencent-hy4-release"]').click();
  await expect(page.locator('h1')).toContainText('Hy4 正式版');
  await expect(page.locator('main')).toContainText(/2026\s*年\s*11\s*月\s*4\s*日/);
  for (const text of [ '权重与系统卡计划近日开放', '厂商报告', '未调用 API']) await expect(page.locator('main')).toContainText(text);
  await expect(page.locator('main a[href="https://www.tencent.com/zh-cn/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/"]').first()).toBeVisible();
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: info.outputPath(`hy4-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('Hy4');
  await expect(page.locator('[data-event-id="tencent-hy4-release"]')).toBeFocused();
  expect(errors).toEqual([]);
});
