import { test, expect, type Page, type TestInfo } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const figureId = '#map-julu-relief-207-bce';
async function verifyMap(page: Page) {
  const figure = page.locator(figureId);
  await figure.scrollIntoViewIfNeeded();
  await expect.poll(() => figure.locator('img').evaluate(el => (el as HTMLImageElement).naturalWidth)).toBe(640);
  await expect(figure.getByRole('list', { name: '读图要点', exact: true }).locator('h4')).toHaveCount(4);
  await expect(figure).toContainText('非按比例');
  await expect(figure).toContainText('不补造公历月日');
  await expect(figure).toContainText('不将原文的“河”直接指定');
  await expect(figure).toContainText('先后记述不同');
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
test('Julu diagram preserves evidence, image access and filtered return across themes', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/china-history/?q=巨鹿`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="julu"]'); await card.click();
  const figure = await verifyMap(page), toggle = figure.getByText('查看图示来源', { exact: true });
  await toggle.focus(); await toggle.press('Enter');
  await expect(figure.locator('.map-evidence')).toHaveAttribute('open', '');
  await expect(figure.locator('.map-evidence')).toContainText('《史记》卷八十九');
  await toggle.press('Enter'); await expect(toggle).toBeFocused();
  const link = figure.getByRole('link', { name: /打开原尺寸地图/ });
  await link.focus(); const opened = page.waitForEvent('popup'); await link.press('Enter');
  const popup = await opened; await popup.waitForLoadState();
  await expect(popup).toHaveURL(new URL(`${prefix}/maps/julu-relief-207-bce.svg`, page.url()).href);
  await expect(popup.locator('svg')).toBeVisible(); await popup.close(); await expect(link).toBeFocused();
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  for (const theme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: theme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await page.evaluate(() => document.fonts.ready);
    await capture(page, info, `julu-${theme}`);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('巨鹿');
  await expect(page.locator('[data-event-id="julu"]')).toBeFocused();
  expect(errors).toEqual([]);
});
test('Julu diagram and reading points remain available without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/china-history/events/julu/`);
  await verifyMap(page); await capture(page, info, 'julu-no-js');
  await context.close();
});
