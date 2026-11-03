import { test, expect, type Page, type TestInfo } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const figureId = '#map-guandu-campaign-200';
async function verifyMap(page: Page) {
  const figure = page.locator(figureId);
  await figure.scrollIntoViewIfNeeded();
  await expect.poll(() => figure.locator('img').evaluate(el => (el as HTMLImageElement).naturalWidth)).toBe(640);
  await expect(figure.getByRole('list', { name: '读图要点', exact: true }).locator('h4')).toHaveCount(4);
  await expect(figure).toContainText('非按比例');
  await expect(figure).toContainText('不直接换算为公历月份');
  await expect(figure).toContainText('不据此认定曹军已在该阶段实际渡河');
  await expect(figure).toContainText('相对袁绍营，不是曹营或官渡城');
  await expect(figure).toContainText('未复制第三方地图');
  return figure;
}
async function capture(page: Page, info: TestInfo, name: string) {
  const figure = page.locator(figureId);
  await figure.evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await expect.poll(async () => {
    const heading = await figure.locator('h3').boundingBox();
    const header = await page.locator('.library-header').boundingBox();
    return heading!.y - header!.y - header!.height;
  }).toBeGreaterThanOrEqual(0);
  for (const area of ['viewport', 'figure'] as const) {
    const file = info.outputPath(`${name}-${area}.png`);
    if (area === 'viewport') await page.screenshot({ path: file, animations: 'disabled' });
    else await figure.screenshot({ path: file, animations: 'disabled' });
    await info.attach(`${name}-${area}`, { path: file, contentType: 'image/png' });
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
}
test('Guandu diagram preserves evidence, image access and filtered return across themes', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/china-history/?q=官渡`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="guandu"]'); await card.click();
  const figure = await verifyMap(page), toggle = figure.getByText('查看图示来源', { exact: true });
  await toggle.focus(); await toggle.press('Enter');
  await expect(figure.locator('.map-evidence')).toHaveAttribute('open', '');
  await expect(figure.locator('.map-evidence')).toContainText('本纪、裴注');
  await toggle.press('Enter'); await expect(toggle).toBeFocused();
  const link = figure.getByRole('link', { name: /打开原尺寸地图/ });
  await link.focus(); const opened = page.waitForEvent('popup'); await link.press('Enter');
  const popup = await opened; await popup.waitForLoadState();
  await expect(popup).toHaveURL(new URL(`${prefix}/maps/guandu-campaign-200.svg`, page.url()).href);
  await expect(popup.locator('svg')).toBeVisible(); await popup.close(); await expect(link).toBeFocused();
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  for (const theme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: theme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await page.evaluate(() => document.fonts.ready);
    await capture(page, info, `guandu-${theme}`);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('官渡');
  await expect(page.locator('[data-event-id="guandu"]')).toBeFocused();
  expect(errors).toEqual([]);
});
test('Guandu diagram and reading points remain available without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/china-history/events/guandu/`);
  await verifyMap(page); await capture(page, info, 'guandu-no-js');
  await context.close();
});
