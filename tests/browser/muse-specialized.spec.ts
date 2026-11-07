import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

test('Muse specialized detail preserves search, source boundaries and return focus', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/?q=Muse&all=1&lines=all&lane=products`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="muse-specialized-rollout"]');
  await card.scrollIntoViewIfNeeded();
  const destination = new URL((await card.getAttribute('href'))!, 'http://127.0.0.1').searchParams.get('return')!;
  await card.click();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Muse 与 Meta AI 接入专门模型：记忆与任务恢复');
  await expect(page.locator('.full-event-meta time')).toHaveText('2026 年 11 月 6 日');
  await expect(page.getByRole('heading', { name: '机制：记忆与持续目标' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /编辑分析：应测试失效记忆/ })).toHaveCount(1);
  await expect(page.locator('main')).toContainText('不能推广为所有任务的可靠性');
  const reading = page.locator('#further-reading');
  await expect(reading.locator('a')).toHaveAttribute('href', 'https://research.meta.ai/blog/specialized-models-for-muse-and-metaai');
  await expect(page.locator('#sources')).toContainText('Meta AI Research');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`muse-specialized-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    await reading.scrollIntoViewIfNeeded();
    await expect(reading).toBeVisible();
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('q')).toBe('Muse');
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Muse 与 Meta AI 接入专门模型：记忆与任务恢复');
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(card).toBeFocused();
  expect(errors).toEqual([]);
});

test('Muse specialized source and reading remain available without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/ai/events/muse-specialized-rollout/`);
  await expect(page.getByRole('heading', { name: '事件与日期' })).toBeVisible();
  await expect(page.locator('#sources')).toContainText('Meta AI');
  await expect(page.locator('#further-reading a')).toHaveAttribute('href', 'https://research.meta.ai/blog/specialized-models-for-muse-and-metaai');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.screenshot({ path: info.outputPath('muse-specialized-no-js.png'), fullPage: true });
  await context.close();
});
