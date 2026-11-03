import { test, expect, type Page, type TestInfo } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const path = (value: string) => `${prefix}/${value}`;
const figureId = '#map-qin-han-frontier-li-bevan';
async function ready(page: Page) { await page.locator('[data-timeline-ready="true"]').waitFor(); await page.evaluate(() => document.fonts.ready); }
async function visibleMap(page: Page) {
  const figure = page.locator(figureId);
  await figure.scrollIntoViewIfNeeded();
  await expect.poll(() => figure.locator('img').evaluate(el => (el as HTMLImageElement).naturalWidth)).toBe(1019);
  await expect(figure).toContainText('不是前202年快照');
  await expect(figure).toContainText('城梁至麻池虽为红实线，仍含推定');
  await expect(figure).toContainText('现代地理定位');
  await expect(figure).toContainText('不导入论文数据层或后续模型推演路线');
  await expect(figure.getByRole('list', { name: '读图要点', exact: true }).locator('h4')).toHaveCount(3);
  await expect(figure.getByRole('link', { name: /CC BY 4.0/ })).toHaveAttribute('href', 'https://creativecommons.org/licenses/by/4.0/');
  return figure;
}
async function capture(page: Page, info: TestInfo, name: string) {
  const figure = page.locator(figureId);
  await figure.evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await expect.poll(async () => {
    const heading = await figure.locator('h3').boundingBox(), navigation = await page.locator('.library-header').boundingBox();
    return heading!.y - navigation!.y - navigation!.height;
  }).toBeGreaterThanOrEqual(0);
  const viewport = info.outputPath(`${name}-viewport.png`);
  await page.screenshot({ path: viewport, animations: 'disabled' });
  await info.attach(`${name}-viewport`, { path: viewport, contentType: 'image/png' });
  const file = info.outputPath(`${name}.png`);
  await figure.screenshot({ path: file, animations: 'disabled' });
  await info.attach(name, { path: file, contentType: 'image/png' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
}
test('Han regional map retains uncertainty, image access, themes and filtered return', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto(path('china-history/dynasties/han/?q=刘邦')); await ready(page);
  await page.getByRole('link', { name: '阅读说明与资料', exact: true }).click();
  const figure = await visibleMap(page), toggle = figure.getByText('查看图示来源', { exact: true });
  await toggle.focus(); await toggle.press('Enter');
  await expect(figure.locator('.map-evidence')).toHaveAttribute('open', '');
  await expect(figure.locator('.map-evidence')).toContainText('图1基于Xu与Yu');
  await toggle.press('Enter'); await expect(toggle).toBeFocused();
  await expect(figure.locator('.map-evidence')).not.toHaveAttribute('open', '');
  const imageLink = figure.getByRole('link', { name: /打开原尺寸地图/ });
  await imageLink.focus(); const popupPromise = page.waitForEvent('popup'); await imageLink.press('Enter');
  const popup = await popupPromise; await popup.waitForLoadState();
  await expect(popup).toHaveURL(new URL(path('maps/qin-han-frontier-li-bevan.png'), page.url()).href);
  await expect(popup.locator('img')).toBeVisible(); await popup.close(); await expect(imageLink).toBeFocused();
  await capture(page, info, 'han-map-light');
  await page.emulateMedia({ colorScheme: 'dark' }); await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await capture(page, info, 'han-map-dark');
  const destination = page.url().replace(/#.*$/, '') + '#dynasty-maps';
  await page.getByRole('link', { name: '刘邦建汉：重建帝国秩序：阅读事件与来源', exact: true }).click();
  await visibleMap(page); await capture(page, info, 'han-event-map-dark');
  await page.getByRole('link', { name: '返回时间线', exact: true }).click(); await ready(page);
  await expect(page).toHaveURL(destination);
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('刘邦');
  await expect(page.locator('#dynasty-maps')).toBeInViewport();
  await page.goto(path('china-history/dynasties/western-han/')); await visibleMap(page);
  expect(errors).toEqual([]);
});
test('Han map and evidence remain usable without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${path('china-history/dynasties/western-han/')}`);
  await visibleMap(page);
  await page.getByRole('link', { name: '刘邦建汉：重建帝国秩序：阅读事件与来源', exact: true }).click();
  await visibleMap(page); await capture(page, info, 'han-static-event-map');
  await context.close();
});
