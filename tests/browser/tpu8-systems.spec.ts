import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const id = 'tpu8tx-8imax-announcement';
const article = 'https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/';

test('TPU system boundaries survive search, exact return and repeated history navigation', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/?lines=all&all=1&q=TPU%208tx`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator(`[data-event-id="${id}"]`);
  await expect(card).toHaveCount(1);
  const destination = new URL((await card.getAttribute('href'))!, 'http://127.0.0.1').searchParams.get('return')!;
  await card.click();
  await expect(page.locator('h1')).toHaveText('TPU 8tx 与 8i Max：同代芯片的新系统配置');
  for (const text of ['2026年11月9日', '沿用8t硅片', '两颗8i', '不认定硬件已正式可用', 'TPU agent suite仍标预览', '编辑分析：评价应回到具体负载']) await expect(page.locator('main')).toContainText(text);
  await expect(page.locator('#further-reading a')).toHaveCount(2);
  await expect(page.locator(`#further-reading a[href="${article}"]`)).toBeVisible();
  await expect(page.locator('#sources')).toContainText('Amin Vahdat');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`tpu8-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  for (let i = 0; i < 2; i++) {
    await page.locator('[data-timeline-ready="true"]').waitFor();
    await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
    await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('TPU 8tx');
    await expect(card).toBeFocused();
    await page.goForward(); await expect(page.locator('h1')).toContainText('同代芯片的新系统配置');
    await page.goBack();
  }
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(card).toBeFocused();
  expect(errors).toEqual([]);
});

test('TPU announcement and reading remain usable without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/ai/events/${id}/`);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('TPU 8tx');
  await expect(page.locator('main')).toContainText('软件 GA 不等于硬件 GA');
  await expect(page.locator('#sources')).toContainText('Our newest TPUs');
  await expect(page.locator('#further-reading a')).toHaveCount(2);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.screenshot({ path: info.outputPath('tpu8-no-js.png'), fullPage: true });
  await context.close();
});
