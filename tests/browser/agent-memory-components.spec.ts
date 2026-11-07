import { test, expect } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const article = 'https://www.anthropic.com/research/components-of-agent-memory';
const cookbook = 'https://platform.claude.com/cookbook/managed-agents-cma-dreaming-with-a-dynamic-workflow';

test('agent memory evidence survives search, exact return and history navigation', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(`${prefix}/ai/?lines=all&all=1&q=记忆组件`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="anthropic-agent-memory-components"]');
  await expect(card).toHaveCount(1); await card.click();
  await expect(page.locator('h1')).toContainText('Agent 记忆组件评估');
  for (const text of ['2026年11月6日', '25题', '54%升至61%', '纯搜索为53%', '不能当作任务成功率', '11月2日', 'Managed Agents beta', 'research preview', '未运行示例或独立复现']) await expect(page.locator('main')).toContainText(text);
  for (const url of [article, cookbook]) await expect(page.locator(`main a[href="${url}"]`).first()).toBeVisible();
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: info.outputPath(`agent-memory-${colorScheme}.png`), fullPage: true, animations: 'disabled' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('记忆组件');
  await expect(card).toBeFocused();
  await page.goForward(); await expect(page.locator('h1')).toContainText('Agent 记忆组件评估');
  await page.goBack(); await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page.locator('#current-topic-search input[name="q"]')).toHaveValue('记忆组件');
  expect(errors).toEqual([]);
});

test('agent memory sources and concrete reading remain available without JavaScript', async ({ browser }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/ai/events/anthropic-agent-memory-components/`);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Agent 记忆组件评估');
  await expect(page.locator('#sources')).toContainText('The components of agent memory');
  await expect(page.locator('#further-reading a')).toHaveCount(2);
  for (const url of [article, cookbook]) await expect(page.locator(`#further-reading a[href="${url}"]`)).toBeVisible();
  await expect(page.locator('main')).toContainText('不是权重训练');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.screenshot({ path: info.outputPath('agent-memory-no-js.png'), fullPage: true });
  await context.close();
});
