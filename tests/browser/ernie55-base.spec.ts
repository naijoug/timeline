import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

test('ERNIE Base keeps release stage and evidence through search and exact return', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/ai/?lines=ai-model-iterations&q=ERNIE%205.5`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await page.locator('[data-event-id="ernie-5-5-flash-base"]').click();
  await expect(page.locator('h1')).toContainText('开放预训练权重');
  for (const text of ['中期训练、后训练之前', '自定义许可', '未下载全部分片', '早期提交日期不能证明', '本地 OpenAI 兼容接口', '编辑分析']) await expect(page.locator('main')).toContainText(text);
  for (const scheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: info.outputPath(`ernie55-${scheme}.png`), fullPage: true, animations: 'disabled' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  const detailUrl = page.url();
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('ERNIE 5.5');
  await expect(page.locator('[data-event-id="ernie-5-5-flash-base"]')).toBeFocused();
  await page.goForward();
  await expect(page).toHaveURL(detailUrl);
  await page.goBack();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('ERNIE 5.5');
  expect(errors).toEqual([]);
});

test('ERNIE Base sources and reading stay available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}ai/timelines/ai-model-iterations/`);
  await page.locator('[data-event-id="ernie-5-5-flash-base"]').click();
  await expect(page.locator('main')).toContainText('自定义许可');
  await expect(page.locator('main a[href="https://huggingface.co/baidu/ERNIE-5.5-Flash-Base#deployment"]')).toBeVisible();
  await expect(page.getByRole('link', { name: '返回时间线', exact: true })).toHaveAttribute('href', new RegExp(`${prefix}/ai/`));
  await context.close();
});
