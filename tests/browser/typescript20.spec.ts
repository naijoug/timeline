import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

test('TypeScript 2.0 detail preserves search, source boundaries and return focus', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/programming-languages/?q=TypeScript&all=1`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="typescript-20"]');
  await card.scrollIntoViewIfNeeded();
  const destination = new URL((await card.getAttribute('href'))!, 'http://127.0.0.1').searchParams.get('return')!;
  await card.click();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('TypeScript 2.0 发布');
  await expect(page.locator('.full-event-meta time')).toHaveText('2016 年 9 月 22 日');
  await expect(page.getByRole('heading', { name: '边界：断言不是运行时守卫' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /编辑分析：把迁移问题拆开阅读/ })).toHaveCount(1);
  await expect(page.locator('main')).toContainText('不会插入空值检查');
  const reading = page.locator('#further-reading');
  await expect(reading.locator('a')).toHaveAttribute('href', 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html');
  await expect(page.locator('#sources')).toContainText('Daniel Rosenwasser');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`typescript20-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    await reading.scrollIntoViewIfNeeded();
    await expect(reading).toBeVisible();
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('q')).toBe('TypeScript');
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('TypeScript 2.0 发布');
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(card).toBeFocused();
  expect(errors).toEqual([]);
});

test('TypeScript 2.0 source and reading remain available without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/programming-languages/events/typescript-20/`);
  await expect(page.getByRole('heading', { name: '机制：类型随路径收窄' })).toBeVisible();
  await expect(page.locator('#sources')).toContainText('TypeScript 2.0');
  await expect(page.locator('#further-reading a')).toHaveAttribute('href', 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.screenshot({ path: info.outputPath('typescript20-no-js.png'), fullPage: true });
  await context.close();
});
