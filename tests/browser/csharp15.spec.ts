import { test, expect, type Page } from '@playwright/test';
import { csharp15Event as event, csharp15Sources } from '../../src/topics/programming-languages/csharp15-release';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const path = `${prefix}/programming-languages/events/csharp-15/`;
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
}
async function inspect(page: Page) {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(event.title);
  await expect(page.locator('.full-event-meta time')).toHaveText('2026 年 11 月 10 日');
  await expect(page.locator('main')).toContainText(event.note!);
  for (const section of event.details!) await expect(page.locator('main')).toContainText(section.text);
  await expect(page.locator('#sources .source-item')).toHaveCount(csharp15Sources.length);
  for (const source of csharp15Sources) {
    const link = page.locator('#sources .source-item').filter({ hasText: source.title });
    await expect(link).toHaveAttribute('href', source.url);
    await expect(link).toContainText('核查于 2026-11-15');
  }
  await expect(page.locator('#further-reading a')).toHaveAttribute('href', event.recommendedResources![0].url);
  await expect(page.locator('#further-reading')).toContainText(event.recommendedResources![0].scopeNote!);
  await noOverflow(page);
}

test('C# 15 dated evidence and compatibility boundaries in light and dark', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(path);
  expect(page.viewportSize()).toEqual(info.project.name === 'mobile' ? { width: 375, height: 812 } : { width: 1440, height: 1000 });
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await inspect(page);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: info.outputPath(`csharp15-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
  }
  expect(errors).toEqual([]);
});

test.describe('C# 15 without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('sources, reading and native return remain accessible', async ({ page }, info) => {
    await page.goto(path);
    await inspect(page);
    await page.screenshot({ path: info.outputPath('csharp15-no-js.png'), fullPage: true });
    const back = page.getByRole('link', { name: '返回时间线', exact: true });
    await expect(back).toHaveAttribute('href', `${prefix}/programming-languages/`);
    await back.click();
    await expect(page).toHaveURL(url => url.pathname === `${prefix}/programming-languages/` && !url.search);
    await noOverflow(page);
  });
});

test('C# 15 real search in C# scope preserves exact return and repeated history', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/programming-languages/?scope=csharp&all=1`);
  await expect(page.locator('[data-timeline-ready="true"]')).toBeVisible();
  if (info.project.name === 'mobile') await page.getByRole('button', { name: '搜索当前主题', exact: true }).click();
  const search = page.getByRole('textbox', { name: '搜索事件、对象或关键词', exact: true });
  await search.fill('C# 15');
  await search.press('Enter');
  await expect(page).toHaveURL(url => url.searchParams.get('q') === 'C# 15' && url.searchParams.get('scope') === 'csharp');
  const card = page.locator('[data-event-id="csharp-15"]');
  await expect(card).toBeVisible();
  const destination = new URL((await card.getAttribute('href'))!, page.url());
  expect(destination.pathname).toBe(path);
  const saved = new URL(destination.searchParams.get('return')!, page.url());
  const expectedReturn = new URL(page.url());
  expectedReturn.hash = 'event-csharp-15';
  expect(saved.href).toBe(expectedReturn.href);
  await card.click();
  await inspect(page);
  const checkReturn = async () => {
    await expect(page).toHaveURL(saved.href);
    await expect(page.locator('[data-timeline-ready="true"]')).toBeVisible();
    await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('C# 15');
    await expect(card).toBeFocused();
    await noOverflow(page);
  };
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await checkReturn();
  await card.click();
  await expect(page).toHaveURL(destination.href);
  for (let cycle = 0; cycle < 2; cycle++) {
    await page.goBack(); await checkReturn();
    await page.goForward(); await expect(page).toHaveURL(destination.href); await inspect(page);
  }
  expect(errors).toEqual([]);
});
