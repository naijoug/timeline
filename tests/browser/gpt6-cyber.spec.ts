import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

test('GPT-6 Cyber restricted release keeps evidence and exact search return', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/?lines=all&all=1&q=GPT-6%20Cyber`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await page.locator('[data-event-id="gpt-6-cyber-restricted-release"]').click();
  await expect(page.locator('h1')).toContainText('受限开放');
  await expect(page.locator('main')).toContainText(/2026\s*年\s*11\s*月\s*5\s*日/);
  for (const text of ['模型专项批准', '90/288', '96/288', '标准短上下文', '本站未独立复现']) await expect(page.locator('main')).toContainText(text);
  for (const url of ['https://openai.com/index/introducing-gpt-6-cyber/', 'https://deploymentsafety.openai.com/gpt-6-cyber', 'https://developers.openai.com/api/docs/models/gpt-6-cyber']) {
    await expect(page.locator(`main a[href="${url}"]`).first()).toBeVisible();
  }
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: info.outputPath(`gpt6-cyber-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('GPT-6 Cyber');
  await expect(page.locator('[data-event-id="gpt-6-cyber-restricted-release"]')).toBeFocused();
  // The return link consumes history.back(), so Forward revisits the detail.
  await page.goForward();
  await expect(page.locator('h1')).toContainText('受限开放');
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('GPT-6 Cyber');
  expect(errors).toEqual([]);
});
