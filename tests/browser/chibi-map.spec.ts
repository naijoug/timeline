import { test, expect, type Page, type TestInfo } from '@playwright/test';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');
const figureId = '#map-chibi-relations-208';
async function verify(page: Page) {
  const figure = page.locator(figureId);
  await figure.scrollIntoViewIfNeeded();
  await expect.poll(() => figure.locator('img').evaluate(el => (el as HTMLImageElement).naturalWidth)).toBe(640);
  await expect(figure.getByRole('list', { name: '读图要点', exact: true }).locator('h4')).toHaveCount(3);
  for (const text of ['不作坐标对齐', '南郡地区与江陵城不是同一层级', '《山阳公载记》', '合肥', '未复制第三方地图']) await expect(figure).toContainText(text);
  return figure;
}
async function settleFrames(page: Page) {
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}
async function capture(page: Page, info: TestInfo, name: string) {
  const figure = page.locator(figureId);
  // Poll from Node: no page timer/rAF dependency in the no-JavaScript context.
  const expectStableClearance = async () => {
    let previous: string | undefined;
    await expect.poll(async () => {
      const heading = await figure.locator('h3').boundingBox();
      const header = await page.locator('.library-header').boundingBox();
      if (!heading || !header) { previous = undefined; return false; }
      const geometry = JSON.stringify({ heading, header });
      const stable = geometry === previous;
      previous = geometry;
      return stable && heading.y - header.y - header.height >= 0;
    }).toBe(true);
    const heading = await figure.locator('h3').boundingBox();
    const header = await page.locator('.library-header').boundingBox();
    expect(heading!.y - header!.y - header!.height).toBeGreaterThanOrEqual(0);
  };
  await figure.evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await expectStableClearance();
  const viewportPath = info.outputPath(`${name}-viewport.png`);
  await page.screenshot({ path: viewportPath, animations: 'disabled' });
  await expectStableClearance();
  await info.attach(`${name}-viewport`, { path: viewportPath, contentType: 'image/png' });
  // The locator screenshot can scroll, so do it only after viewport checks.
  const figurePath = info.outputPath(`${name}-figure.png`);
  await figure.screenshot({ path: figurePath, animations: 'disabled' });
  await info.attach(`${name}-figure`, { path: figurePath, contentType: 'image/png' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
}
test('Chibi map preserves Eastern Han scope, keyboard evidence and repeated return history', async ({ page }, info) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${prefix}/china-history/dynasties/eastern-han/?q=赤壁&all=1`);
  await page.locator('[data-timeline-ready="true"]').waitFor();
  const card = page.locator('[data-event-id="chibi"]');
  const destination = new URL((await card.getAttribute('href'))!, page.url()).searchParams.get('return')!;
  await card.click();
  const figure = await verify(page), toggle = figure.getByText('查看图示来源', { exact: true });
  await toggle.focus(); await toggle.press('Enter');
  await expect(figure.locator('.map-evidence')).toHaveAttribute('open', '');
  await expect(figure.locator('.map-evidence')).toContainText('周瑜传');
  await expect(figure.locator('.map-evidence')).toContainText('武帝纪');
  await toggle.press('Enter'); await expect(toggle).toBeFocused();
  await expect(figure.locator('.map-evidence')).not.toHaveAttribute('open');
  const link = figure.getByRole('link', { name: /打开原尺寸地图/ });
  await link.focus(); const opened = page.waitForEvent('popup'); await link.press('Enter');
  const popup = await opened; await popup.waitForLoadState();
  await expect(popup).toHaveURL(new URL(`${prefix}/maps/chibi-relations-208.svg`, page.url()).href);
  await expect(popup.locator('svg')).toBeVisible(); await popup.close(); await expect(link).toBeFocused();
  await settleFrames(page);
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await page.evaluate(() => document.fonts.ready);
    await capture(page, info, `chibi-map-${colorScheme}`);
  }
  await page.getByRole('link', { name: '返回时间线', exact: true }).click();
  await page.locator('[data-timeline-ready="true"]').waitFor();
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await expect(card).toBeFocused();
  for (let repeat = 0; repeat < 2; repeat++) {
    await page.goForward(); await verify(page);
    await page.goBack(); await page.locator('[data-timeline-ready="true"]').waitFor();
    await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
    await expect(card).toBeFocused();
    expect(new URL(page.url()).pathname).toContain('/dynasties/eastern-han/');
    expect(new URL(page.url()).searchParams.get('q')).toBe('赤壁');
  }
  expect(errors).toEqual([]);
});
test('Chibi map remains readable without JavaScript in the full project device configuration', async ({ browser }, info) => {
  const { viewport, userAgent, deviceScaleFactor, isMobile, hasTouch } = info.project.use;
  const context = await browser.newContext({ viewport, userAgent, deviceScaleFactor, isMobile, hasTouch, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4179${prefix}/china-history/events/chibi/`);
  const figure = await verify(page);
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await figure.getByText('查看图示来源', { exact: true }).focus();
    await figure.getByText('查看图示来源', { exact: true }).press('Enter');
    await expect(figure.locator('.map-evidence')).toHaveAttribute('open', '');
    await expect(page.locator('html')).not.toHaveAttribute('data-theme');
    expect(await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(247, 247, 247)');
    await capture(page, info, `chibi-map-no-js-fallback-prefers-${colorScheme}`);
    await figure.getByText('查看图示来源', { exact: true }).press('Enter');
    await expect(figure.locator('.map-evidence')).not.toHaveAttribute('open');
  }
  await context.close();
});
