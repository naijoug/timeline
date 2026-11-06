import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
test('Kimi weights keep confirmation date, license limits and filtered return', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/timelines/ai-model-iterations/?all=1&q=Kimi`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await page.locator('[data-event-id="kimi-k3-1-pro-weights-confirmed"]').click();
  await expect(page.locator('h1')).toContainText('确认官方权重文件公开可见');
  for (const text of ['检索确认日，非首次公开日', '16:06 UTC', '前39个', '未核全96个分片', '未下载二进制', 'Kimi K3.1-Pro License', 'MaaS', '不是MIT']) await expect(page.locator('main')).toContainText(text);
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await page.evaluate(() => document.fonts.ready);
    const file = info.outputPath(`kimi-weights-${colorScheme}.png`);
    await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
    await info.attach(`kimi-weights-${colorScheme}`, { path: file, contentType: 'image/png' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('Kimi');
  await expect(page.locator('[data-event-id="kimi-k3-1-pro-weights-confirmed"]')).toBeFocused();
  await expect(page.locator('[data-event-id="kimi-k3-1-pro"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test('Kimi confirmation evidence is readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/ai/timelines/ai-model-iterations/?all=1&q=Kimi`);
  await page.locator('[data-event-id="kimi-k3-1-pro-weights-confirmed"]').click();
  await expect(page.locator('main')).toContainText('检索确认日，非首次公开日');
  await expect(page.locator('a[href="https://huggingface.co/moonshotai/Kimi-K3.1-Pro/blob/main/LICENSE"]').first()).toBeVisible();
  await context.close();
});
