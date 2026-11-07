import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

test('Chengpu detail preserves search, source boundaries and return focus', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/china-history/?q=城濮&all=1`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="chengpu"]');
  await card.scrollIntoViewIfNeeded();
  const destination = new URL((await card.getAttribute('href'))!, 'http://127.0.0.1').searchParams.get('return')!;
  await card.click();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('城濮之战：晋楚争霸');
  await expect(page.locator('.full-event-meta time')).toHaveText('公元前 632 年');
  await expect(page.getByRole('heading', { name: '史源对读：铭文与后世解说' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /编辑总结：从成语走回历史/ })).toHaveCount(1);
  await expect(page.locator('main')).toContainText('战役对应是馆方解释');
  const reading = page.locator('#further-reading');
  await expect(reading.locator('a[href="https://theme.npm.edu.tw/selection/Article.aspx?sNo=04001142"]')).toHaveAttribute('href', 'https://theme.npm.edu.tw/selection/Article.aspx?sNo=04001142');
  await expect(reading).toContainText('国立故宫博物院');
  await expect(reading).toContainText('未观看');
  await expect(page.locator('#sources')).toContainText('《春秋左氏传》僖公二十七、二十八年：救宋至践土');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`chengpu-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    await reading.scrollIntoViewIfNeeded();
    await expect(reading).toBeVisible();
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('q')).toBe('城濮');
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('城濮之战：晋楚争霸');
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(card).toBeFocused();
  expect(errors).toEqual([]);
});

test('Chengpu source and reading remain available without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/china-history/events/chengpu/`);
  await expect(page.getByRole('heading', { name: '过程：退三舍不等于整场战术' })).toBeVisible();
  await expect(page.locator('#sources')).toContainText('《春秋左氏传》僖公二十七、二十八年：救宋至践土');
  await expect(page.locator('#further-reading')).toContainText('国立故宫博物院');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.screenshot({ path: info.outputPath('chengpu-no-js.png'), fullPage: true });
  await context.close();
});
