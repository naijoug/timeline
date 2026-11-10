import { test, expect, type Page } from '@playwright/test';
import { googleNov10Events } from '../../src/topics/ai/google-nov10';
import { sources } from '../../src/topics/ai/sources';
import { eventHref } from '../../src/topics/ai/entities';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const queries: Record<string, string> = {
  'gemini-4-carbon-wider-access': 'Carbon',
  'gemini-robotics-25-partner-rollout': 'Gemini Robotics 2.5',
  'alphaproof-code-verification': 'AlphaProof',
};
const records = googleNov10Events.map(event => ({
  event, query: queries[event.id], path: `${prefix}${eventHref(event)}`,
  sources: sources.filter(source => event.sourceIds.includes(source.id)),
}));

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
}

async function inspectRecord(page: Page, record: typeof records[number]) {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(record.event.title);
  await expect(page.locator('.full-event-meta')).toContainText(record.event.kind);
  await expect(page.locator('.full-event-meta time')).toBeVisible();
  await expect(page.locator('.full-event-meta time')).toContainText('2026年11月10日');
  const boundary = page.locator('.article-body > section').filter({ has: page.getByRole('heading', { name: '阅读这段历史时', exact: true }) });
  await expect(boundary).toContainText(record.event.limitation);
  for (const section of record.event.details!) {
    await expect(page.getByRole('heading', { name: `${section.label}${section.editorial ? ' · 编辑解读' : ''}`, exact: true })).toBeVisible();
    await expect(page.locator('.article-body')).toContainText(section.text);
  }
  await expect(page.locator('#sources .source-item')).toHaveCount(record.sources.length);
  for (const source of record.sources) {
    const link = page.locator('#sources .source-item').filter({ hasText: source.title });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', source.url);
    await expect(link).toContainText(`核查于 ${source.checkedAt}`);
    await expect(link).toHaveAttribute('rel', /noopener/);
  }
  await expect(page.locator('#further-reading .resource-scope')).toHaveCount(record.event.recommendedResources!.length);
  await expect(page.locator('#further-reading')).toBeVisible();
  for (const resource of record.event.recommendedResources!) {
    await expect(page.locator('#further-reading a').filter({ hasText: resource.title })).toHaveAttribute('href', resource.url);
    await expect(page.locator('#further-reading')).toContainText(resource.scopeNote);
  }
  await noOverflow(page);
}

for (const record of records) {
  test(`${record.event.id}: dated evidence, boundaries and light/dark reading`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    if (info.project.name === 'mobile') expect(page.viewportSize()).toEqual({ width: 375, height: 812 });
    await page.goto(record.path);
    for (const colorScheme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme });
      await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
      await inspectRecord(page, record);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      await page.screenshot({ path: info.outputPath(`${record.event.id}-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    }
    expect(errors).toEqual([]);
  });

  test.describe(`${record.event.id}: JavaScript disabled`, () => {
    // Keep the project's complete device configuration and let the runner own
    // teardown so a cleanup rejection cannot replace the original failure.
    test.use({ javaScriptEnabled: false });
    test('readable sources and native return', async ({ page }) => {
      await page.goto(record.path);
      await inspectRecord(page, record);
      const back = page.getByRole('link', { name: '返回时间线', exact: true });
      await expect(back).toHaveAttribute('href', `${prefix}/ai/`);
      await back.click();
      await expect(page).toHaveURL(url => url.pathname === `${prefix}/ai/` && !url.search);
      await noOverflow(page);
    });
  });

  test(`${record.event.id}: real search, exact return and two Back/Forward cycles`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${prefix}/ai/?lines=all&all=1&lane=all`);
    await expect(page.locator('[data-timeline-ready="true"]')).toBeVisible();
    if (info.project.name === 'mobile') await page.getByRole('button', { name: '搜索当前主题', exact: true }).click();
    const search = page.getByRole('textbox', { name: '搜索事件、对象或关键词', exact: true });
    await search.fill(record.query);
    await search.press('Enter');
    await expect(page).toHaveURL(url => url.searchParams.get('q') === record.query && url.searchParams.get('lines') === 'all');
    const card = page.locator(`a[data-event-id="${record.event.id}"]`);
    await expect(card).toBeVisible();
    await noOverflow(page);
    const destination = new URL((await card.getAttribute('href'))!, page.url());
    expect(destination.pathname).toBe(record.path);
    const saved = new URL(destination.searchParams.get('return')!, page.url());
    const expectedReturn = new URL(page.url());
    expectedReturn.hash = `event-${record.event.id}`;
    expect(saved.href).toBe(expectedReturn.href);
    await card.click();
    await expect(page).toHaveURL(destination.href);
    await inspectRecord(page, record);
    const checkRestored = async () => {
      await expect(page).toHaveURL(saved.href);
      await expect(page.locator('[data-timeline-ready="true"]')).toBeVisible();
      await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue(record.query);
      await expect(card).toBeFocused();
      await noOverflow(page);
    };
    const back = page.getByRole('link', { name: '返回时间线', exact: true });
    await expect(back).toHaveAttribute('href', saved.pathname + saved.search + saved.hash);
    await back.click();
    await checkRestored();
    await card.click();
    await expect(page).toHaveURL(destination.href);
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
