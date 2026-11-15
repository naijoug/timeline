import { test, expect, type Page } from '@playwright/test';
import { geminiHydrogenEvents } from '../../src/topics/ai/gemini-hydrogen-release';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const event = geminiHydrogenEvents[0];
const path = `${prefix}/ai/events/${event.id}/`;
const canonicalPath = `${prefix}/ai/models/gemini/gemini-4-hydrogen-release/`;
const query = 'Gemini 4 Hydrogen';
const modelDoc = 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-hydrogen';
const noOverflow = async (page: Page) => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
const inspect = async (page: Page) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(event.title);
  const main = page.locator('main');
  for (const text of ['2026年11月12日', 'gemini-4-hydrogen', '1,048,576 tokens', '65,536 tokens', '共享预算', '自动模型选择', '付费 Google AI Pro、Ultra', 'high 为默认值', '不是开放权重发布', '未调用模型', '2027年1月12日', '仍属未来安排', 'Orchestrator']) await expect(main).toContainText(text);
  await expect(main.locator(`a[href="${modelDoc}"]`).first()).toBeVisible();
  await expect(main).toContainText('Google DeepMind');
  await noOverflow(page);
};

test('Gemini Hydrogen desktop/mobile light and dark evidence stays readable', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(path);
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await inspect(page);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: info.outputPath(`gemini-hydrogen-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
  }
  expect(errors).toEqual([]);
});

test('Gemini Hydrogen search preserves exact return, focus and repeated history; source link uses keyboard', async ({ page, context }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/timelines/ai-model-iterations/?lines=ai-model-iterations&all=1&lane=models`);
  await expect(page.locator('[data-timeline-ready="true"]')).toBeVisible();
  if (info.project.name === 'mobile') await page.getByRole('button', { name: '搜索当前主题', exact: true }).click();
  const search = page.getByRole('textbox', { name: '搜索事件、对象或关键词', exact: true });
  await search.fill(query); await search.press('Enter');
  await expect(page).toHaveURL(url => url.searchParams.get('q') === query && url.searchParams.get('lines') === 'ai-model-iterations' && url.searchParams.get('lane') === 'models');
  const card = page.locator(`a[data-event-id="${event.id}"]`);
  await expect(card).toBeVisible();
  const destination = new URL((await card.getAttribute('href'))!, page.url());
  const saved = new URL(destination.searchParams.get('return')!, page.url());
  const expected = new URL(page.url()); expected.hash = `event-${event.id}`;
  expect(saved.href).toBe(expected.href);
  expect(destination.pathname).toBe(canonicalPath);
  await card.click(); await inspect(page);
  // Stub only the external destination: this checks native keyboard activation,
  // not external-site availability or the independently reviewed source content.
  await context.route(modelDoc, route => route.fulfill({ contentType: 'text/html', body: '<title>External source navigation fixture</title>' }));
  const citation = page.locator(`main a[href="${modelDoc}"]`).first();
  await expect(citation).toHaveAttribute('target', '_blank');
  await citation.focus();
  const opened = page.waitForEvent('popup'); await citation.press('Enter');
  const popup = await opened; await expect(popup).toHaveURL(modelDoc); await popup.close();
  await context.unroute(modelDoc);
  const restored = async () => {
    await expect(page).toHaveURL(saved.href);
    await expect(page.locator('[data-timeline-ready="true"]')).toBeVisible();
    await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue(query);
    await expect(card).toBeFocused(); await noOverflow(page);
  };
  const back = page.getByRole('link', { name: '返回时间线', exact: true });
  await expect(back).toHaveAttribute('href', saved.pathname + saved.search + saved.hash);
  await back.click(); await restored();
  await card.click(); await expect(page).toHaveURL(destination.href);
  for (let cycle = 0; cycle < 2; cycle++) {
    await page.goBack(); await restored();
    await page.goForward(); await expect(page).toHaveURL(destination.href); await inspect(page);
  }
  expect(errors).toEqual([]);
});

test.describe('Gemini Hydrogen without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('sources and native detail return remain readable', async ({ page }) => {
    await page.goto(`${prefix}/ai/timelines/ai-model-iterations/`);
    await page.locator(`a[data-event-id="${event.id}"]`).click();
    await inspect(page);
    const back = page.getByRole('link', { name: '返回时间线', exact: true });
    await expect(back).toHaveAttribute('href', `${prefix}/ai/`);
    await back.click(); await expect(page).toHaveURL(url => url.pathname === `${prefix}/ai/` && !url.search);
    await noOverflow(page);
  });
});
