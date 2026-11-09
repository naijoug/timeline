import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

test('QwenWork detail preserves product scope, permissions, search and return focus', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/?q=千问办公&all=1`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="qwenwork-2-release"]');
  await card.scrollIntoViewIfNeeded();
  const destination = new URL((await card.getAttribute('href'))!, 'http://127.0.0.1').searchParams.get('return')!;
  await card.click();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('千问办公 2.0：团队协作与事件触发任务');
  await expect(page.locator('.full-event-meta time')).toContainText('2026年11月9日');
  await expect(page.getByRole('heading', { name: '日期边界：版本汇总不等于每项功能首发' })).toBeVisible();
  await expect(page.locator('main')).toContainText('企业未配置远控策略时默认禁止');
  await expect(page.locator('main')).toContainText('11月7日已记录协作数字员工');
  const reading = page.locator('#further-reading');
  await expect(reading.locator('a')).toHaveCount(2);
  await expect(reading.locator('a').first()).toHaveAttribute('href', 'https://docs.qwenwork.cn/release-notes/desktop');
  await expect(page.locator('#sources')).toContainText('钉钉科技有限公司');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await page.screenshot({ path: info.outputPath(`qwenwork-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    await reading.scrollIntoViewIfNeeded();
    await expect(reading).toBeVisible();
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('q')).toBe('千问办公');
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('千问办公 2.0：团队协作与事件触发任务');
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(card).toBeFocused();
  expect(errors).toEqual([]);
});

test('QwenWork reading and permission boundaries remain available without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/ai/events/qwenwork-2-release/`);
  await expect(page.getByRole('heading', { name: '日期边界：版本汇总不等于每项功能首发' })).toBeVisible();
  await expect(page.locator('main')).toContainText('企业未配置远控策略时默认禁止');
  await expect(page.locator('#further-reading a')).toHaveCount(2);
  await expect(page.locator('#sources')).toContainText('钉钉科技有限公司');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.screenshot({ path: info.outputPath('qwenwork-no-js.png'), fullPage: true });
  await context.close();
});
