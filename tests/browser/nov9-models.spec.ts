import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const records = [
  {
    id: 'muse-ember-release', query: 'Muse Ember',
    title: 'Muse Ember：面向持续 Agent 工作的高效模型',
    heading: '价格边界：200K 阈值改变整次请求费率',
    boundary: 'Standard 模式', publisher: 'Meta',
  },
  {
    id: 'seedream-5-5-release', query: 'Seedream 5.5',
    title: 'Seedream 5.5：原生透明素材与多轮图像编辑',
    heading: '开放边界：逐步上线与后续 Pro 计划',
    boundary: '5.5 Pro 仍是后续计划', publisher: 'Seed',
  },
];

for (const record of records) {
  test(`${record.id} preserves evidence, search and repeated history navigation`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${prefix}/ai/?q=${encodeURIComponent(record.query)}&all=1`);
    await page.locator('[data-timeline-ready="true"]').waitFor();
    const card = page.locator(`[data-event-id="${record.id}"]`);
    await expect(card).toHaveCount(1);
    await card.scrollIntoViewIfNeeded();
    const destination = new URL((await card.getAttribute('href'))!, 'http://127.0.0.1').searchParams.get('return')!;
    await card.click();
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(record.title);
    await expect(page.locator('.full-event-meta time')).toContainText('2026年11月9日');
    await expect(page.getByRole('heading', { name: record.heading })).toBeVisible();
    await expect(page.locator('main')).toContainText(record.boundary);
    const reading = page.locator('#further-reading');
    await expect(reading.locator('a')).toHaveCount(2);
    await expect(page.locator('#sources')).toContainText(record.publisher);
    for (const colorScheme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme });
      await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      await page.screenshot({ path: info.outputPath(`${record.id}-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
      await reading.scrollIntoViewIfNeeded();
      await expect(reading).toBeVisible();
    }
    await page.getByRole('link', { name: '返回时间线', exact: true }).click();
    await page.locator('[data-timeline-ready="true"]').waitFor();
    await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
    await expect(card).toBeFocused();
    expect(new URL(page.url()).searchParams.get('q')).toBe(record.query);
    for (let attempt = 0; attempt < 2; attempt++) {
      await page.goForward();
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(record.title);
      await page.goBack();
      await page.locator('[data-timeline-ready="true"]').waitFor();
      await expect(card).toBeFocused();
    }
    expect(errors).toEqual([]);
  });

  test(`${record.id} remains readable without JavaScript`, async ({ browser }, info) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:4179${prefix}/ai/events/${record.id}/`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(record.title);
    await expect(page.getByRole('heading', { name: record.heading })).toBeVisible();
    await expect(page.locator('main')).toContainText(record.boundary);
    await expect(page.locator('#sources')).toContainText(record.publisher);
    await expect(page.locator('#further-reading a')).toHaveCount(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath(`${record.id}-no-js.png`), fullPage: true });
    await context.close();
  });
}
