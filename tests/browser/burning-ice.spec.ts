import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

test('Burning Ice detail preserves search, source boundaries and return focus', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/writers/?q=无证之罪&all=1`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="zi-jin-chen-burning-ice"]');
  await card.scrollIntoViewIfNeeded();
  const destination = new URL((await card.getAttribute('href'))!, 'http://127.0.0.1').searchParams.get('return')!;
  await card.click();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('《无证之罪》');
  await expect(page.locator('.full-event-meta time')).toHaveText('2014 年');
  await expect(page.getByRole('heading', { name: '系列边界：独立故事与主题对照' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /编辑分析：把信息与证据分栏/ })).toHaveCount(1);
  await expect(page.locator('main')).toContainText('两次访谈存在时间口径冲突');
  const reading = page.locator('#further-reading');
  await expect(reading.locator('a')).toHaveAttribute('href', 'https://wyb.chinawriter.com.cn/content/202402/02/content73422.html');
  await expect(page.locator('#sources')).toContainText('关于新作品（第3页）');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`burning-ice-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    await reading.scrollIntoViewIfNeeded();
    await expect(reading).toBeVisible();
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('q')).toBe('无证之罪');
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('《无证之罪》');
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(card).toBeFocused();
  expect(errors).toEqual([]);
});

test('Burning Ice source and reading remain available without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/writers/events/zi-jin-chen-burning-ice/`);
  await expect(page.getByRole('heading', { name: '创作缘起：新闻启发不是真案复述' })).toBeVisible();
  await expect(page.locator('#sources')).toContainText('关于新作品（第3页）');
  await expect(page.locator('#further-reading a')).toHaveAttribute('href', 'https://wyb.chinawriter.com.cn/content/202402/02/content73422.html');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.screenshot({ path: info.outputPath('burning-ice-no-js.png'), fullPage: true });
  await context.close();
});
