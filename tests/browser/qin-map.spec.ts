import { test, expect, type Page, type TestInfo } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const path = (value: string) => `${prefix}/${value}`;
const figureId = '#map-qin-commandery-lander';
async function ready(page: Page) { await page.locator('[data-timeline-ready="true"]').waitFor(); await page.evaluate(() => document.fonts.ready); }
async function capture(page: Page, info: TestInfo, name: string) {
  const figure = page.locator(figureId);
  await figure.evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
  // The site's normal scroll is smooth; capture the settled viewport, not an animation frame.
  await expect.poll(async () => {
    const heading = await figure.locator('h3').boundingBox();
    const navigation = await page.locator('.library-header').boundingBox();
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
async function visibleMap(page: Page) {
  const figure = page.locator(figureId);
  await figure.scrollIntoViewIfNeeded();
  await expect(figure.locator('img')).toBeVisible();
  await expect.poll(() => figure.locator('img').evaluate(el => (el as HTMLImageElement).naturalWidth)).toBe(688);
  await expect(figure).toContainText('不是前221年');
  await expect(figure).toContainText('象郡、桂林郡具体位置未知');
  await expect(figure).toContainText('Lynn Carlson');
  await expect(figure.getByRole('list', { name: '读图要点', exact: true }).locator('h4')).toHaveCount(3);
  await expect(figure.getByRole('link', { name: /CC BY 4.0/ })).toHaveAttribute('href', 'https://creativecommons.org/licenses/by/4.0/');
  await expect(figure.getByRole('link', { name: '原图与授权记录' })).toHaveAttribute('href', /#page=9$/);
  return figure;
}

test('Qin dynasty map preserves attribution, native image access and filtered event return', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto(path('china-history/dynasties/qin/?q=秦'));
  await ready(page);
  await page.getByRole('link', { name: '阅读说明与资料', exact: true }).click();
  const figure = await visibleMap(page);
  const toggle = figure.getByText('查看图示来源', { exact: true });
  await toggle.focus(); await toggle.press('Enter');
  await expect(figure.locator('.map-evidence')).toHaveAttribute('open', '');
  await expect(figure.locator('.map-evidence')).toContainText('学术论文与现代历史地图');
  await toggle.press('Enter'); await expect(toggle).toBeFocused();
  await expect(figure.locator('.map-evidence')).not.toHaveAttribute('open', '');
  const imageLink = figure.getByRole('link', { name: /打开原尺寸地图/ });
  await imageLink.focus();
  const popupPromise = page.waitForEvent('popup');
  await imageLink.press('Enter');
  const popup = await popupPromise; await popup.waitForLoadState();
  await expect(popup).toHaveURL(new URL(path('maps/qin-commandery-lander.png'), page.url()).href);
  await expect(popup.locator('img')).toBeVisible(); await popup.close();
  await expect(imageLink).toBeFocused();
  await capture(page, info, 'qin-dynasty-map-light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await capture(page, info, 'qin-dynasty-map-dark');
  const destination = page.url().replace(/#.*$/, '') + '#dynasty-maps';
  await page.getByRole('link', { name: '秦统一：阅读事件与来源', exact: true }).click();
  await visibleMap(page); await capture(page, info, 'qin-event-map-dark');
  await page.getByRole('link', { name: '返回时间线', exact: true }).click(); await ready(page);
  await expect(page).toHaveURL(destination);
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('秦');
  await expect(page.locator('#dynasty-maps')).toBeInViewport();
  await page.goto(path('china-history/dynasties/eastern-han/'));
  // Eastern Han now has reviewed Guandu evidence, but must not inherit Qin's map.
  await expect(page.locator('#map-qin-commandery-lander')).toHaveCount(0);
  await expect(page.locator('#map-guandu-campaign-200')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('Qin geography and its caveats remain readable without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${path('china-history/dynasties/qin/')}`);
  await visibleMap(page);
  await expect(page.getByRole('link', { name: '阅读说明与资料', exact: true })).toHaveAttribute('href', '#dynasty-maps');
  await page.getByRole('link', { name: '秦统一：阅读事件与来源', exact: true }).click();
  await visibleMap(page);
  await capture(page, info, 'qin-static-event-map');
  await context.close();
});
