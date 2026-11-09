import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

test('Chanyuan detail preserves year precision, evidence limits, search and return focus', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/china-history/?q=澶渊&all=1`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="chanyuan"]');
  await card.scrollIntoViewIfNeeded();
  const destination = new URL((await card.getAttribute('href'))!, 'http://127.0.0.1').searchParams.get('return')!;
  await card.click();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('澶渊之盟');
  await expect(page.locator('.full-event-meta time')).toContainText('1005 年');
  await expect(page.getByRole('heading', { name: '条款：银绢、交割与边境约束' })).toBeVisible();
  await expect(page.locator('main')).toContainText('银与绢单位不同');
  await expect(page.locator('main')).toContainText('本轮只读摘要');
  const reading = page.locator('#further-reading');
  await expect(reading.locator('a')).toHaveCount(4);
  await expect(reading.locator('a').first()).toHaveAttribute('href', 'https://zh.wikisource.org/wiki/契丹國志/卷二十');
  await expect(page.locator('#sources')).toContainText('叶隆礼');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await page.screenshot({ path: info.outputPath(`chanyuan-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    await reading.scrollIntoViewIfNeeded();
    await expect(reading).toBeVisible();
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('q')).toBe('澶渊');
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('澶渊之盟');
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(card).toBeFocused();
  expect(errors).toEqual([]);
});

test('Chanyuan reading and evidence boundaries remain available without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/china-history/events/chanyuan/`);
  await expect(page.getByRole('heading', { name: '条款：银绢、交割与边境约束' })).toBeVisible();
  await expect(page.locator('main')).toContainText('银与绢单位不同');
  await expect(page.locator('#further-reading a')).toHaveCount(4);
  await expect(page.locator('#sources')).toContainText('叶隆礼');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.screenshot({ path: info.outputPath('chanyuan-no-js.png'), fullPage: true });
  await context.close();
});
