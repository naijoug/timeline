import { test, expect } from '@playwright/test';
import { chinaHistory } from '../../src/topics/china-history/catalog';
const prefix = (process.env.TIMELINE_BASE_PATH || '').replace(/\/$/, '');

for (const event of chinaHistory.events.filter(event => event.maps?.length)) {
  test(`${event.id} map sources retain per-source attribution and check dates without JavaScript`, async ({ browser }, info) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:4179${prefix}/china-history/events/${event.id}/`);
    for (const map of event.maps!) {
      const evidence = page.locator(`#map-${map.id} .map-evidence`);
      await evidence.locator('summary').click();
      await expect(evidence).toHaveAttribute('open', '');
      await expect(evidence).toContainText('不代表全库已复核');
      const rows = evidence.locator('li');
      await expect(rows).toHaveCount(map.sourceIds.length);
      for (const [index, sourceId] of map.sourceIds.entries()) {
        const source = chinaHistory.sources.find(item => item.id === sourceId)!;
        const row = rows.nth(index);
        await expect(row).toContainText(`作者／发布整理方：${source.publisher}`);
        await expect(row.locator('time')).toHaveText(source.checkedAt);
        await expect(row.locator('time')).toHaveAttribute('datetime', source.checkedAt);
        await expect(row.getByRole('link')).toHaveAttribute('href', source.url);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await evidence.locator('summary').click();
      await expect(evidence).not.toHaveAttribute('open', '');
    }
    await context.close();
  });
}
