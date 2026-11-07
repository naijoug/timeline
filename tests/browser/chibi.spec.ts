import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

test('Red Cliffs detail preserves search, source boundaries and return focus', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/china-history/?q=赤壁&all=1`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="chibi"]');
  await card.scrollIntoViewIfNeeded();
  const destination = new URL((await card.getAttribute('href'))!, 'http://127.0.0.1').searchParams.get('return')!;
  await card.click();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('赤壁之战：孙刘联军阻止曹操南下');
  await expect(page.locator('.full-event-meta time')).toHaveText('208 年');
  await expect(page.getByRole('heading', { name: '史源对读：不能只选火攻或疫病' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /编辑总结：把战役与战后分开看/ })).toHaveCount(1);
  await expect(page.locator('main')).toContainText('不是现存原信');
  const reading = page.locator('#further-reading');
  await expect(reading.locator('a')).toHaveAttribute('href', 'https://openresearch-repository.anu.edu.au/bitstreams/4d765733-dc96-43ee-8243-248abea243bd/download');
  await expect(reading).toContainText('1991年6月');
  await expect(reading).toContainText('访问可能受限');
  await expect(page.locator('#sources')).toContainText('《三国志》卷一·武帝纪：赤壁与撤军');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`chibi-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    await reading.scrollIntoViewIfNeeded();
    await expect(reading).toBeVisible();
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('q')).toBe('赤壁');
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('赤壁之战：孙刘联军阻止曹操南下');
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(card).toBeFocused();
  expect(errors).toEqual([]);
});

test('Red Cliffs source and reading remain available without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/china-history/events/chibi/`);
  await expect(page.getByRole('heading', { name: '过程：初战、火攻与追击' })).toBeVisible();
  await expect(page.locator('#sources')).toContainText('《三国志》卷一·武帝纪：赤壁与撤军');
  await expect(page.locator('#further-reading')).toContainText('Rafe de Crespigny');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.screenshot({ path: info.outputPath('chibi-no-js.png'), fullPage: true });
  await context.close();
});
