import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const cases = [
  { period: 'qin', query: '巨鹿', map: 'julu-relief-207-bce', event: 'julu', evidence: '《史记》卷八十九' },
  { period: 'eastern-han', query: '官渡', map: 'guandu-campaign-200', event: 'guandu', evidence: '本纪、裴注' },
  { period: 'eastern-jin', query: '淝水', map: 'feishui-spatial-383', event: 'feishui', evidence: '《淝水之战：胡人骑兵大败》教学材料' },
];
for (const item of cases) test(`${item.period} battle map is discoverable and preserves dynasty return`, async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(`${prefix}/china-history/dynasties/${item.period}/?q=${encodeURIComponent(item.query)}`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await page.getByRole('link', { name: '阅读说明与资料', exact: true }).click();
  const figure = page.locator(`#map-${item.map}`);
  await figure.scrollIntoViewIfNeeded();
  await expect(figure).toBeInViewport();
  await expect.poll(() => figure.locator('img').evaluate(el => (el as HTMLImageElement).naturalWidth)).toBe(640);
  const toggle = figure.getByText('查看图示来源', { exact: true });
  await toggle.focus(); await toggle.press('Enter');
  await expect(figure.locator('.map-evidence')).toContainText(item.evidence);
  await toggle.press('Enter'); await expect(toggle).toBeFocused();
  // Let native focus restoration finish before scrolling for visual evidence.
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  for (const theme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: theme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await page.evaluate(() => document.fonts.ready);
    await figure.evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
    await expect.poll(async () => {
      const heading = await figure.locator('h3').boundingBox();
      const header = await page.locator('.library-header').boundingBox();
      return heading!.y - header!.y - header!.height;
    }).toBeGreaterThanOrEqual(0);
    const viewport = info.outputPath(`${item.period}-${theme}-viewport.png`);
    await page.screenshot({ path: viewport, animations: 'disabled' });
    await info.attach(`${item.period}-${theme}-viewport`, { path: viewport, contentType: 'image/png' });
    const file = info.outputPath(`${item.period}-${theme}.png`);
    await figure.screenshot({ path: file, animations: 'disabled' });
    await info.attach(`${item.period}-${theme}`, { path: file, contentType: 'image/png' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  const returnUrl = page.url().replace(/#.*$/, '') + '#dynasty-maps';
  await page.locator(`[data-map-event-link][href*="/events/${item.event}/"]`).click();
  await expect(page.locator(`#map-${item.map}`)).toBeVisible();
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page).toHaveURL(returnUrl);
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue(item.query);
  await expect(page.locator('#dynasty-maps')).toBeInViewport();
  expect(errors).toEqual([]);
});
test('Sixteen Kingdoms map has static evidence without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/china-history/dynasties/sixteen-kingdoms/`);
  const figure = page.locator('#map-feishui-spatial-383');
  await expect(figure).toContainText('不是383年绘制的古地图');
  await expect(figure.locator('img')).toBeVisible();
  await page.locator('[data-map-event-link][href*="/events/feishui/"]').click();
  await expect(page.locator('h1')).toContainText('淝水');
  await context.close();
});
