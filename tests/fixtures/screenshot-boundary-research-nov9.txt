import { test, expect, type Page } from '@playwright/test';
import { groot2Events, groot2Sources } from '../../src/topics/ai/groot2-research';
import { ernieEvolveEvents, ernieEvolveSources } from '../../src/topics/ai/ernie-evolve-research';

// Canonical routing follows src/topics/ai/entities.ts: models with a family use
// /ai/models/{family}/{id}/; other records use /ai/events/{id}/.
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const records = [
  {
    path: `${prefix}/ai/models/nvidia-groot/${groot2Events[0].id}/`,
    event: groot2Events[0], sources: groot2Sources, query: 'GR00T 2',
    boundary: /Code Available in December/,
    detailBoundary: /不是 GR00T 2 模型权重/,
  },
  {
    path: `${prefix}/ai/events/${ernieEvolveEvents[0].id}/`,
    event: ernieEvolveEvents[0], sources: ernieEvolveSources, query: 'ERNIE Evolve',
    boundary: /ERNIE-5\.5-Flash 仍在开发中/,
    detailBoundary: /作者系统内部的独立评估程序，不是第三方复现/,
  },
];

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
}

async function inspectRecord(page: Page, record: typeof records[number]) {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(record.event.title);
  await expect(page.locator('.full-event-meta')).toContainText(record.event.kind);
  await expect(page.locator('.full-event-meta time')).toContainText('2026年11月9日');
  const boundary = page.locator('.article-body > section').filter({ has: page.getByRole('heading', { name: '阅读这段历史时', exact: true }) });
  await expect(boundary).toContainText(record.boundary);
  await expect(page.locator('.article-body')).toContainText(record.detailBoundary);
  await expect(page.locator('#sources .source-item')).toHaveCount(record.sources.length);
  for (const source of record.sources) {
    const link = page.locator('#sources .source-item').filter({ hasText: source.title });
    await expect(link).toHaveAttribute('href', source.url);
    await expect(link).toContainText('核查于 2026-11-10');
    await expect(link).toHaveAttribute('rel', /noopener/);
  }
  await expect(page.locator('#further-reading .resource-scope')).not.toHaveCount(0);
  await noOverflow(page);
}

for (const record of records) {
  test(`${record.event.id}: evidence, availability boundaries and light/dark reading`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const path = record.path;
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(path);
    await inspectRecord(page, record);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.screenshot({ path: testInfo.outputPath(`${record.event.id}-light.png`), fullPage: true, animations: 'disabled' });
    // Use the real appearance control, including the mobile header control.
    const appearance = page.locator('.appearance-control:visible').first();
    await expect(appearance).toHaveAttribute('aria-label', /当前外观：跟随系统/);
    await appearance.click();
    await expect(page.locator('html')).toHaveAttribute('data-appearance', 'light');
    await appearance.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await inspectRecord(page, record);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await page.screenshot({ path: testInfo.outputPath(`${record.event.id}-dark.png`), fullPage: true, animations: 'disabled' });

    expect(errors).toEqual([]);
  });

  test.describe(`${record.event.id}: JavaScript disabled`, () => {
    // Let Playwright own context teardown: a failed operation remains the primary
    // error, rather than a finally/close rejection replacing its call log.
    test.use({ javaScriptEnabled: false });
    test('sources, boundaries, layout and native return stay usable', async ({ page }, testInfo) => {
      await test.step('read the canonical record without JavaScript', async () => {
        await page.goto(record.path);
        await inspectRecord(page, record);
        await page.evaluate(() => document.fonts.ready);
        const back = page.getByRole('link', { name: '返回时间线', exact: true });
        await expect(back).toBeVisible();
        await expect(back).toHaveAttribute('href', `${prefix}/ai/`);
        await page.screenshot({ path: testInfo.outputPath(`${record.event.id}-no-js.png`), fullPage: true, animations: 'disabled' });
      });
      await test.step('follow the native return link without JavaScript', async () => {
        // Mobile CSS hides the desktop #back-to-timeline; the visible header
        // anchor has the same native href and works without JavaScript.
        await page.getByRole('link', { name: '返回时间线', exact: true }).click();
        await expect(page).toHaveURL(url => url.pathname === `${prefix}/ai/` && !url.search);
        await noOverflow(page);
      });
    });
  });

  test(`${record.event.id}: full-library search, return focus and two Back/Forward cycles`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${prefix}/ai/?lines=all&all=1&lane=all`);
    await expect(page.locator('[data-timeline-ready="true"]')).toBeVisible();
    if (testInfo.project.name === 'mobile') {
      expect(page.viewportSize()).toEqual({ width: 375, height: 812 });
      await page.getByRole('button', { name: '搜索当前主题', exact: true }).click();
    }
    const search = page.getByRole('textbox', { name: '搜索事件、对象或关键词', exact: true });
    await search.fill(record.query);
    await search.press('Enter');
    await expect(page).toHaveURL(url => url.searchParams.get('q') === record.query && url.searchParams.get('lines') === 'all');
    const card = page.locator(`a[data-event-id="${record.event.id}"]`);
    await expect(card).toBeVisible();
    await noOverflow(page);
    const destination = new URL((await card.getAttribute('href'))!, page.url());
    expect(destination.pathname).toBe(record.path);
    await card.click();
    await expect(page).toHaveURL(destination.href);
    await inspectRecord(page, record);
    const returnURL = new URL(page.url()).searchParams.get('return');
    expect(returnURL).toBeTruthy();
    const saved = new URL(returnURL!, page.url());
    expect(saved.searchParams.get('q')).toBe(record.query);
    expect(saved.searchParams.get('lines')).toBe('all');

    const checkRestored = async () => {
      await expect(page).toHaveURL(saved.href);
      await expect(page).toHaveURL(url => url.pathname.endsWith('/ai/') && url.searchParams.get('q') === record.query && url.searchParams.get('lines') === 'all' && url.hash === `#event-${record.event.id}`);
      await expect(page.locator('[data-timeline-ready="true"]')).toBeVisible();
      // Returning intentionally closes the mobile search panel so focus can
      // return to the card. Inspect its persisted input without reopening it.
      await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue(record.query);
      await expect(card).toBeFocused();
      await noOverflow(page);
    };
    const back = page.getByRole('link', { name: '返回时间线', exact: true });
    await expect(back).toBeVisible();
    await expect(back).toHaveAttribute('href', saved.pathname + saved.search + saved.hash);
    await back.click();
    await checkRestored();
    await page.screenshot({ path: testInfo.outputPath(`${record.event.id}-search-return.png`), fullPage: true });
    // Re-enter through the result, then exercise native history twice.
    await card.click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(record.event.title);
    for (let cycle = 0; cycle < 2; cycle++) {
      await page.goBack();
      await checkRestored();
      await page.goForward();
      await expect(page).toHaveURL(destination.href);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(record.event.title);
      await noOverflow(page);
    }
    expect(errors).toEqual([]);
  });
}
