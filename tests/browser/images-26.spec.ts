import { test, expect } from '@playwright/test';

const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const eventId = 'openai-images-2-6-release';
const query = 'Images 2.6';
const modelDoc = 'https://developers.openai.com/api/docs/models/gpt-image-2.6-sunburst';
const editingGuide = 'https://developers.openai.com/api/docs/guides/image-generation';

test('Images 2.6 release preserves evidence, filtered return focus and Back/Forward', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/?lines=all&all=1&q=${encodeURIComponent(query)}`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator(`[data-event-id="${eventId}"]`);
  await expect(card).toHaveCount(1);
  await card.click();
  await expect(page.locator('h1')).toContainText('OpenAI Images 2.6 发布：Flare 与 Sunburst');
  const main = page.locator('main');
  await expect(main).toContainText(/2026\s*年\s*11\s*月\s*4\s*日/);
  for (const text of ['gpt-image-2.6-flare', 'gpt-image-2.6-sunburst', '50%', 'quality=low 时最快约 6 秒', '厂商陈述', 'GIF 生成覆盖 ChatGPT 与 API', 'SVG 输出仅在 API', '并非 2.6 独有', 'complexity', '不是权重发布', '未调用 API']) {
    await expect(main).toContainText(text);
  }
  await expect(page.getByRole('heading', { name: /编辑分析：按修改成功率选择工作流.*编辑解读/ })).toBeVisible();
  for (const url of [modelDoc, editingGuide, 'https://deploymentsafety.openai.com/chatgpt-images-2-6']) {
    await expect(page.locator(`main a[href="${url}"]`).first()).toBeVisible();
  }
  await expect(main).toContainText('OpenAI API');
  await expect(main).toContainText('Image generation · GPT Image 2.6');
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await page.evaluate(() => document.fonts.ready);
    const file = info.outputPath(`images-26-${colorScheme}.png`);
    await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
    await info.attach(`images-26-${colorScheme}`, { path: file, contentType: 'image/png' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue(query);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('lines')).toBe('all');
  // The return link consumes history.back(), so Forward reopens this detail.
  await page.goForward();
  await expect(page.locator('h1')).toContainText('Images 2.6');
  await expect(main).toContainText('quality 单独控制渲染质量');
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue(query);
  await expect(card).toBeFocused();
  expect(new URL(page.url()).searchParams.get('lines')).toBe('all');
  expect(errors).toEqual([]);
});

test('Images 2.6 release evidence and related reading work without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  try {
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:4179${prefix}/ai/timelines/ai-model-iterations/`);
    await page.locator(`[data-event-id="${eventId}"]`).click();
    await expect(page.locator('h1')).toContainText('Images 2.6');
    await expect(page.locator('main')).toContainText('SVG 输出仅在 API 提供');
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
