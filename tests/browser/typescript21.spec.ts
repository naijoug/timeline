import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

test('TypeScript 2.1 detail preserves search, source boundaries and return focus', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/programming-languages/?q=TypeScript&all=1`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="typescript-21"]');
  await card.scrollIntoViewIfNeeded();
  const destination = new URL((await card.getAttribute('href'))!, 'http://127.0.0.1').searchParams.get('return')!;
  await card.click();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('TypeScript 2.1：从类型查询到映射类型');
  await expect(page.locator('.full-event-meta time')).toHaveText('2016 年 12 月 7 日');
  await expect(page.getByRole('heading', { name: '运行边界：语法降级不补齐运行库' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /编辑分析：分开看抽象与部署/ })).toHaveCount(1);
  await expect(page.locator('main')).toContainText('类型声明不能代替运行时实现');
  const reading = page.locator('#further-reading');
  await expect(reading.locator('a')).toHaveAttribute('href', 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html');
  await expect(page.locator('#sources')).toContainText('Daniel Rosenwasser');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`typescript21-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    await reading.scrollIntoViewIfNeeded();
    await expect(reading).toBeVisible();
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('q')).toBe('TypeScript');
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('TypeScript 2.1：从类型查询到映射类型');
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(card).toBeFocused();
  expect(errors).toEqual([]);
});

test('TypeScript 2.1 source and reading remain available without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/programming-languages/events/typescript-21/`);
  await expect(page.getByRole('heading', { name: '背景与机制：关联属性名和结果类型' })).toBeVisible();
  await expect(page.locator('#sources')).toContainText('TypeScript 2.1');
  await expect(page.locator('#further-reading a')).toHaveAttribute('href', 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.screenshot({ path: info.outputPath('typescript21-no-js.png'), fullPage: true });
  await context.close();
});
