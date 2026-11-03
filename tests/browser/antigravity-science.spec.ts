import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
test('Antigravity Science keeps plugin access and experimental limits clear with filtered return', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/?q=Antigravity`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="antigravity-cheminformatics-skills"]');
  await expect(card).toHaveCount(1); await card.click();
  await expect(page.locator('h1')).toContainText('Antigravity 发布化学信息学技能');
  await expect(page.locator('main')).toContainText('2026年11月3日');
  await expect(page.locator('main')).toContainText('不是新模型发布');
  await expect(page.locator('main')).toContainText('未安装插件或运行工作流');
  await expect(page.locator('main')).toContainText('必须合成并实验验证');
  await expect(page.locator('main')).toContainText('企业用户');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await page.evaluate(() => document.fonts.ready);
    const file = info.outputPath(`antigravity-${colorScheme}.png`);
    await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
    await info.attach(`antigravity-${colorScheme}`, { path: file, contentType: 'image/png' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('Antigravity');
  await expect(page.locator('[data-event-id="antigravity-cheminformatics-skills"]')).toBeFocused();
  expect(errors).toEqual([]);
});
