import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

test('Death’s End detail preserves search, source boundaries and return focus', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/writers/?q=死神永生&all=1`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="liu-cixin-three-body-3"]');
  await card.scrollIntoViewIfNeeded();
  const destination = new URL((await card.getAttribute('href'))!, 'http://127.0.0.1').searchParams.get('return')!;
  await card.click();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('《三体Ⅲ：死神永生》');
  await expect(page.locator('.full-event-meta time')).toHaveText('2010 年 11 月');
  await expect(page.getByRole('heading', { name: '传播与接受：入围不等于获奖' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /编辑分析：把选择放回当时的信息条件/ })).toHaveCount(1);
  await expect(page.locator('main')).toContainText('决选入围；不是该奖项获奖作品');
  const reading = page.locator('#further-reading');
  await expect(reading.locator('a')).toHaveAttribute('href', 'https://mithilareview.com/liu_01_17/');
  await expect(page.locator('#sources')).toContainText('2017 Hugo Awards Announced');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`deaths-end-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    await reading.scrollIntoViewIfNeeded();
    await expect(reading).toBeVisible();
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('q')).toBe('死神永生');
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('《三体Ⅲ：死神永生》');
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(card).toBeFocused();
  expect(errors).toEqual([]);
});

test('Death’s End source and reading remain available without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/writers/events/liu-cixin-three-body-3/`);
  await expect(page.getByRole('heading', { name: '作者解释：价值选择与处境' })).toBeVisible();
  await expect(page.locator('#sources')).toContainText('2017 Hugo Awards Announced');
  await expect(page.locator('#further-reading a')).toHaveAttribute('href', 'https://mithilareview.com/liu_01_17/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.screenshot({ path: info.outputPath('deaths-end-no-js.png'), fullPage: true });
  await context.close();
});
