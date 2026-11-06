import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const eventId = 'gemini-omni-1-2-flash-ga';
const query = 'Gemini Omni 1.2';
const modelDoc = 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-1-2-flash';
const editingGuide = 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/edit-videos';

test('Gemini Omni GA preserves evidence, filtered return focus and Back/Forward', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/?lines=all&all=1&q=${encodeURIComponent(query)}`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator(`[data-event-id="${eventId}"]`);
  await expect(card).toHaveCount(1);
  await card.click();
  await expect(page.locator('h1')).toContainText('Gemini Omni 1.2 Flash 在 API 与 Google Cloud 正式可用');
  const main = page.locator('main');
  await expect(main).toContainText(/2026\s*年\s*11\s*月\s*5\s*日/);
  for (const text of ['gemini-omni-1.2-flash', '3–15 秒', '每步最多 10 秒', '720p 每秒 0.07 美元', '厂商标价比较', 'Gemini for business', 'coming soon', '两份官方公告', 'generally available', '来源差异', 'Google AI Ultra', '白名单授权', '不是权重发布', '不能将其描述为原生 4K', '未调用 API']) {
    await expect(main).toContainText(text);
  }
  await expect(page.getByRole('heading', { name: /编辑分析：按可交付片段验收迭代.*编辑解读/ })).toBeVisible();
  for (const url of [modelDoc, editingGuide, 'https://deepmind.google/models/model-cards/gemini-omni-1-2-flash/']) {
    await expect(page.locator(`main a[href="${url}"]`).first()).toBeVisible();
  }
  await expect(main).toContainText('Anish Nangia');
  await expect(main).toContainText('Edit videos');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await page.evaluate(() => document.fonts.ready);
    const file = info.outputPath(`gemini-omni-12-${colorScheme}.png`);
    await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
    await info.attach(`gemini-omni-12-${colorScheme}`, { path: file, contentType: 'image/png' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue(query);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('lines')).toBe('all');
  // The return link consumes history.back(), so Forward reopens this detail.
  await page.goForward();
  await expect(page.locator('h1')).toContainText('Gemini Omni 1.2 Flash');
  await expect(main).toContainText('Gemini for business');
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue(query);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('lines')).toBe('all');
  expect(errors).toEqual([]);
});

test('Gemini Omni GA evidence and related reading work without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  try {
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:4179${prefix}/ai/timelines/ai-model-iterations/`);
    await page.locator(`[data-event-id="${eventId}"]`).click();
    await expect(page.locator('h1')).toContainText('Gemini Omni 1.2 Flash');
    await expect(page.locator('main')).toContainText('音频参考功能仍需要白名单授权');
    await expect(page.locator('main')).toContainText('不是官方或独立评测结论');
    for (const url of [modelDoc, editingGuide]) {
      await expect(page.locator(`main a[href="${url}"]`).first()).toBeVisible();
    }
    await expect(page.getByRole('link', { name: '返回时间线', exact: true })).toHaveAttribute('href', `${prefix}/ai/`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  } finally {
    await context.close();
  }
});
