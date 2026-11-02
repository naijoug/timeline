import { test as base, expect, type Page, type TestInfo } from '@playwright/test';

const test=base.extend<{ pageErrors: string[] }>({
  pageErrors: [async({page},use)=>{const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});await use(errors);expect(errors).toEqual([]);},{auto:true}],
});
const prefix=(process.env.TIMELINE_BASE_PATH || '').replace(/\/$/,'');
const path=(value:string)=>`${prefix}/${value}`;
async function ready(page:Page){await page.locator('[data-timeline-ready="true"]').waitFor();await page.evaluate(()=>document.fonts.ready);}
async function capture(page:Page,info:TestInfo,name:string){const file=info.outputPath(`${name}.png`);await page.screenshot({path:file});await info.attach(name,{path:file,contentType:'image/png'});}
async function noOverflow(page:Page){expect(await page.evaluate(()=>document.documentElement.scrollWidth <= window.innerWidth+1)).toBe(true);}

test('curated main, union selection and native Back/Forward',async({page},info)=>{
  await page.goto(path('ai/'));await ready(page);
  const cards=page.locator('.chronicle-event-button');await expect(cards).toHaveCount(50);
  await noOverflow(page);await capture(page,info,'ai-main');
  const mainUrl=page.url();
  await page.getByRole('checkbox',{name:'合并AI 模型发现与迭代',exact:true}).check();
  await expect(page).toHaveURL(/lines=ai-milestones%2Cai-model-iterations/);
  const expected=await page.locator('#timeline-payload-ai').evaluate(el=>{
    const catalog=JSON.parse(el.textContent!).catalog;
    return new Set(catalog.timelines.filter((line:{id:string})=>['ai-milestones','ai-model-iterations'].includes(line.id)).flatMap((line:{entries:{eventId:string}[]})=>line.entries.map(entry=>entry.eventId))).size;
  });
  await expect(cards).toHaveCount(expected);expect(new Set(await cards.evaluateAll(els=>els.map(el=>(el as HTMLElement).dataset.eventId))).size).toBe(expected);
  const mergedUrl=page.url();await page.goBack();await ready(page);await expect(page).toHaveURL(mainUrl);await expect(cards).toHaveCount(50);
  await page.goForward();await ready(page);await expect(page).toHaveURL(mergedUrl);await expect(cards).toHaveCount(expected);
  await page.getByRole('checkbox',{name:'合并AI 模型发现与迭代',exact:true}).uncheck();await expect(cards).toHaveCount(50);
  await page.getByRole('checkbox',{name:'合并AI 模型发现与迭代',exact:true}).check();await expect(cards).toHaveCount(expected);
  const freshness=page.locator('.timeline-freshness a');
  const back=new URL((await freshness.getAttribute('href'))!,'http://127.0.0.1').searchParams.get('return')!;
  expect(new URL(back,'http://127.0.0.1').searchParams.get('lines')).toBe('ai-milestones,ai-model-iterations');
  expect(back.endsWith('#timeline-freshness')).toBe(true);
  await cards.nth(1).scrollIntoViewIfNeeded();
  const first=await cards.nth(0).boundingBox(),second=await cards.nth(1).boundingBox();
  expect(first&&second).toBeTruthy();
  if(info.project.name==='desktop')expect(second!.x-first!.x).toBeGreaterThan(100);
  else expect(Math.abs(first!.x-second!.x)).toBeLessThan(3);
  await noOverflow(page);await capture(page,info,'merged-leaf-layout');
});

test('independent model line preserves query, order, scroll and focus through detail',async({page},info)=>{
  await page.goto(path('ai/timelines/ai-model-iterations/?q=GPT&order=asc&all=1'));await ready(page);
  const cards=page.locator('.chronicle-event-button');expect(await cards.count()).toBeGreaterThan(4);
  const card=cards.nth(3);await card.scrollIntoViewIfNeeded();
  const id=await card.getAttribute('data-event-id');
  const destination=new URL((await card.getAttribute('href'))!,'http://127.0.0.1:4179').searchParams.get('return')!;
  const scroll=await page.evaluate(()=>window.scrollY);await capture(page,info,'filtered-model-line');
  await card.click();await page.getByRole('link',{name:'返回时间线',exact:true}).waitFor();
  await expect(page.getByRole('link',{name:'返回时间线',exact:true})).toHaveAttribute('href',destination);
  await capture(page,info,'event-detail');
  await page.getByRole('link',{name:'返回时间线',exact:true}).click();await ready(page);
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await expect(page.locator(`[data-event-id="${id}"]`)).toBeFocused();
  await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBeGreaterThan(100);
  await expect.poll(async()=>Math.abs((await page.evaluate(()=>window.scrollY))-scroll)).toBeLessThan(8);
  expect(new URL(page.url()).searchParams.get('q')).toBe('GPT');
  expect(new URL(page.url()).searchParams.get('order')).toBe('asc');
  await page.goForward();await page.getByRole('link',{name:'返回时间线',exact:true}).waitFor();
  await page.goBack();await ready(page);await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await noOverflow(page);
});

test('Agent, writer and historical-war routes retain membership and source-note navigation',async({page},info)=>{
  for(const [route,title,count] of [
    ['ai/timelines/ai-agent-products/','AI Agent 产品',46],
    ['writers/authors/liu-cixin/','刘慈欣作品年谱',25],
    ['china-history/collections/wars-and-turning-points/','战役与战争转折',53],
  ] as const){
    await page.goto(path(route));await ready(page);await expect(page.locator('h1')).toHaveText(title);
    await expect(page.locator('.chronicle-event-button')).toHaveCount(count);await noOverflow(page);
    await capture(page,info,route.startsWith('ai/')?'agent-line':route.startsWith('writers/')?'writer-line':'war-line');
  }
  await page.goto(path('writers/authors/liu-cixin/'));await ready(page);
  await page.locator('#timeline-notes').scrollIntoViewIfNeeded();
  const header=page.locator('.navigation-root');await expect.poll(async()=>Math.abs((await header.boundingBox())!.y)).toBeLessThan(2);
  expect((await header.boundingBox())!.height).toBeGreaterThan(40);
  await capture(page,info,'writer-notes-sticky-navigation');
  if(info.project.name==='mobile'){
    await page.getByRole('button',{name:'打开主题导航',exact:true}).click();
    await expect(page.locator('#topic-sidebar')).toHaveAttribute('aria-modal','true');
    expect(await page.locator('#timeline-notes').evaluate(el=>(el as HTMLElement).inert)).toBe(true);
    await page.keyboard.press('Escape');await expect(page.locator('#topic-sidebar')).not.toHaveAttribute('aria-modal','true');
    await expect(page.getByRole('button',{name:'打开主题导航',exact:true})).toBeFocused();
    expect(await page.locator('#timeline-notes').evaluate(el=>(el as HTMLElement).inert)).toBe(false);
  }
  const noteLink=page.locator('#timeline-notes a[href*="/events/"]').first();
  await noteLink.scrollIntoViewIfNeeded();await noteLink.click();await page.getByRole('link',{name:'返回时间线',exact:true}).waitFor();
  expect((await page.getByRole('link',{name:'返回时间线',exact:true}).getAttribute('href'))).toContain('/writers/authors/liu-cixin/');
  expect((await page.getByRole('link',{name:'返回时间线',exact:true}).getAttribute('href'))).toContain('#timeline-notes');
  await page.getByRole('link',{name:'返回时间线',exact:true}).click();await ready(page);await expect(page).toHaveURL(/#timeline-notes$/);
});

test('filter cancel, apply and repeated dismissals retain subline context',async({page},info)=>{
  await page.goto(path('ai/timelines/ai-agent-products/'));await ready(page);
  const before=page.url(),trigger=page.getByRole('button',{name:'时间与范围筛选',exact:true});
  await trigger.click();await expect(page.locator('#chronicle-filters')).toBeVisible();
  await page.locator('.filter-sheet-key input').check();await page.keyboard.press('Escape');
  await expect(page.locator('#chronicle-filters')).toHaveCount(0);await expect(page).toHaveURL(before);await expect(trigger).toBeFocused();
  await trigger.click();await page.locator('.filter-sheet-key input').check();await page.locator('.filter-sheet-apply').click();
  await expect(page).toHaveURL(/all=0/);expect(new URL(page.url()).searchParams.get('lines')).toBe('ai-agent-products');
  expect(await page.locator('.chronicle-event-button').count()).toBeLessThan(46);
  for(let i=0;i<2;i++){await trigger.click();await page.getByRole('button',{name:'关闭筛选，不保存更改',exact:true}).click();await expect(trigger).toBeFocused();}
  await noOverflow(page);await capture(page,info,'filtered-agent-line');
});

test('selected reading paths stay discoverable without stealing rail scroll or focus', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(path('ai/timelines/ai-agent-products/')); await ready(page);
  const rail = page.locator('.subtimeline-options');
  const agent = page.getByRole('checkbox', { name: '合并AI Agent 产品', exact: true });
  const visibleSelection = () => rail.evaluate(el => {
    const bounds = el.getBoundingClientRect();
    return [...el.querySelectorAll('.is-selected')].some(card => {
      const rect = card.getBoundingClientRect();
      return rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1;
    });
  });
  await expect.poll(visibleSelection).toBe(true);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await expect(agent).not.toBeFocused();
  await noOverflow(page); await capture(page, info, 'selected-agent-reading-path');
  if (info.project.name === 'desktop') {
    expect(await rail.evaluate(el => el.scrollLeft)).toBe(0);
    return;
  }
  expect(await rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  // A reader can inspect other paths; unrelated filtering must not drag the rail back.
  await rail.evaluate(el => el.scrollTo({ left: 0, behavior: 'instant' }));
  // CSS snapping consumes the rail's 3px padding; record its settled position.
  await expect.poll(() => rail.evaluate(el => Math.abs(el.firstElementChild!.getBoundingClientRect().left - el.getBoundingClientRect().left))).toBeLessThan(1);
  const manualScroll = await rail.evaluate(el => el.scrollLeft);
  await page.getByRole('button', { name: '搜索当前主题', exact: true }).click();
  await page.getByRole('textbox', { name: '搜索事件、对象或关键词', exact: true }).fill('Agent');
  await expect(page).toHaveURL(/q=Agent/);
  expect(await rail.evaluate(el => el.scrollLeft)).toBe(manualScroll);

  // On the theme route, checkbox edits are in-place and create native history entries.
  await page.goto(path('ai/?lines=ai-agent-products&all=1')); await ready(page);
  await expect.poll(visibleSelection).toBe(true);
  const original = page.url();
  const main = page.getByRole('checkbox', { name: '合并AI 发展里程碑', exact: true });
  await main.check(); // Playwright's normal click reveals the checkbox, as keyboard traversal does.
  await expect(main).toBeFocused();
  const merged = page.url();
  await expect(main).toBeChecked(); await expect(agent).toBeChecked();
  // Native history does not necessarily blur the checkbox that created the entry.
  const historyTop = await page.evaluate(() => window.scrollY);
  await page.goBack(); await ready(page); await expect(page).toHaveURL(original);
  await expect(main).toBeFocused(); await expect(main).not.toBeChecked();
  await expect.poll(visibleSelection).toBe(true);
  expect(await page.evaluate(() => window.scrollY)).toBe(historyTop);
  await page.goForward(); await ready(page); await expect(main).toBeChecked();
  await expect(main).toBeFocused();
  const forwardScroll = await rail.evaluate(el => el.scrollLeft);
  await page.getByRole('combobox', { name: '排列顺序', exact: true }).selectOption('asc');
  expect(await rail.evaluate(el => el.scrollLeft)).toBe(forwardScroll);
  await page.goBack(); await ready(page); await expect(page).toHaveURL(original);
  await expect.poll(visibleSelection).toBe(true);
  await page.goForward(); await ready(page);
  expect(new URL(page.url()).searchParams.get('lines')).toBe(new URL(merged).searchParams.get('lines'));
  await expect.poll(visibleSelection).toBe(true);
  await main.focus(); await page.keyboard.press('Space');
  await expect(main).not.toBeChecked(); await expect(main).toBeFocused();
  const focusedScroll = await rail.evaluate(el => el.scrollLeft);
  await page.keyboard.press('Space'); await expect(main).toBeChecked(); await expect(main).toBeFocused();
  expect(await rail.evaluate(el => el.scrollLeft)).toBe(focusedScroll);
  await noOverflow(page); await capture(page, info, 'merged-reading-path-focus');
});

test('idiom backgrounds distinguish story dates, preserve details and merge without duplicates', async ({ page }, info) => {
  await page.goto(path('china-history/collections/idiom-backgrounds/')); await ready(page);
  await expect(page.locator('h1')).toHaveText('成语故事的历史背景');
  const cards = page.locator('.chronicle-event-button');
  await expect(cards).toHaveCount(2);
  await expect(page.locator('#timeline-notes')).toContainText('不表示成语在该年首次出现');
  await noOverflow(page); await capture(page, info, 'idiom-background-line');
  const julu = page.locator('[data-event-id="julu"]');
  await julu.scrollIntoViewIfNeeded();
  const destination = new URL((await julu.getAttribute('href'))!, 'http://127.0.0.1').searchParams.get('return')!;
  await julu.click();
  await expect(page.locator('h1')).toContainText('巨鹿之战');
  await expect(page.locator('.article-body')).toContainText('不是“破釜沉舟”的首见年');
  await expect(page.getByRole('heading', { name: '后世用语：词义与书证', exact: true })).toBeVisible();
  await expect(page.locator('#sources')).toContainText('破釜沉舟：典源、释义与书证');
  await expect(page.locator('.article-body')).toContainText('陈佳荣');
  await noOverflow(page); await capture(page, info, 'idiom-julu-detail');
  await page.getByRole('link', { name: '返回时间线', exact: true }).click(); await ready(page);
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`);
  await expect(page.locator('[data-event-id="julu"]')).toBeFocused();
  await expect(cards).toHaveCount(2);
  await page.locator('[data-event-id="feishui"]').click();
  await expect(page.locator('.article-body')).toContainText('不是“草木皆兵”的首见年');
  await expect(page.locator('.article-body')).toContainText('不是两份独立战场证据');
  await page.getByRole('heading', { name: '后世用语：词义与书证', exact: true }).scrollIntoViewIfNeeded();
  await noOverflow(page); await capture(page, info, 'idiom-feishui-reading');
  await page.getByRole('link', { name: '返回时间线', exact: true }).click(); await ready(page);
  const wars = page.getByRole('checkbox', { name: '合并战役与战争转折', exact: true });
  await expect(wars).not.toBeChecked();
  // Selecting from an independent route performs a native navigation; check() may
  // retry on the replacement checkbox and toggle it back. Click once, then assert.
  await wars.click(); await ready(page); await expect(wars).toBeChecked();
  await expect(cards).toHaveCount(53);
  expect(new Set(await cards.evaluateAll(els => els.map(el => (el as HTMLElement).dataset.eventId))).size).toBe(53);
  await page.getByRole('checkbox', { name: '合并战役与战争转折', exact: true }).uncheck();
  await expect(cards).toHaveCount(2);
  if (info.project.name === 'mobile') await page.getByRole('button', { name: '搜索当前主题', exact: true }).click();
  await page.getByRole('textbox', { name: '搜索事件、对象或关键词', exact: true }).fill('破釜沉舟');
  await expect(cards).toHaveCount(1); await expect(page.locator('[data-event-id="julu"]')).toBeVisible();
});

test('new LongCat API stage leads the curated main and preserves release caveats', async ({ page }, info) => {
  await page.goto(path('ai/')); await ready(page);
  await expect(page.locator('.chronicle-event-button').first()).toHaveAttribute('data-event-id', 'longcat-2-5-api');
  await page.locator('[data-event-id="longcat-2-5-api"]').click();
  await expect(page.locator('h1')).toHaveText('LongCat-2.5 API 上线');
  await expect(page.locator('.article-body')).toContainText('2026年9月25日的LongCat-2.5-Preview');
  await expect(page.locator('.article-body')).toContainText('未实际调用');
  await expect(page.locator('.article-body')).toContainText('未核实2.5权重开放');
  await noOverflow(page); await capture(page, info, 'longcat-api-detail');
  await page.getByRole('link', { name: '返回时间线', exact: true }).click(); await ready(page);
  await expect(page.locator('[data-event-id="longcat-2-5-api"]')).toBeFocused();
});

test('Li Bubai publication line keeps edition precision, reading notes and exact return', async ({page}, info) => {
  await page.goto(path('writers/authors/li-bu-bai/')); await ready(page);
  await expect(page.locator('h1')).toHaveText('李不白作品年谱');
  const cards=page.locator('.chronicle-event-button'); await expect(cards).toHaveCount(5);
  await noOverflow(page); await capture(page,info,'li-bubai-author-line');
  const ocean=page.locator('[data-event-id="li-bu-bai-ocean-2022"]');
  await ocean.scrollIntoViewIfNeeded();
  const destination=new URL((await ocean.getAttribute('href'))!,'http://127.0.0.1:4179').searchParams.get('return')!;
  await ocean.click(); await expect(page.locator('.event-record')).toContainText('6月与7月差异');
  await expect(page.locator('.event-record')).toContainText('2021年已有');
  await expect(page.locator('.full-event-meta time')).toHaveText('2022 年');
  await noOverflow(page); await capture(page,info,'li-bubai-edition-detail');
  await page.getByRole('link',{name:'返回时间线',exact:true}).click(); await ready(page);
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`); await expect(ocean).toBeFocused();
  await page.locator('#timeline-notes').scrollIntoViewIfNeeded();
  await expect(page.locator('#timeline-notes')).toContainText('不是出版顺序');
  const liu=page.getByRole('checkbox',{name:'合并刘慈欣作品年谱',exact:true}); await liu.click(); await ready(page);
  await expect(liu).toBeChecked(); await expect(cards).toHaveCount(30);
  expect(new Set(await cards.evaluateAll(els=>els.map(el=>(el as HTMLElement).dataset.eventId))).size).toBe(30);
});

test('Feishui sourced diagram loads in light and dark without disturbing reading return', async ({page}, info) => {
  await page.emulateMedia({colorScheme:'light'});
  await page.goto(path('china-history/collections/idiom-backgrounds/')); await ready(page);
  const card=page.locator('[data-event-id="feishui"]'); await card.scrollIntoViewIfNeeded();
  const destination=new URL((await card.getAttribute('href'))!,'http://127.0.0.1:4179').searchParams.get('return')!;
  await card.click(); const figure=page.locator('#map-feishui-spatial-383'); await figure.scrollIntoViewIfNeeded();
  const img=figure.locator('img'); await expect(img).toBeVisible();
  await expect.poll(()=>img.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBe(640);
  await expect(img).toHaveAttribute('alt',/两窗示意/);
  await expect(figure).toContainText('不是383年绘制');
  await expect(figure).toContainText('2026-11-02');
  await noOverflow(page); await capture(page,info,'feishui-map-light');
  const figureShot=info.outputPath('feishui-map-full-figure.png'); await figure.screenshot({path:figureShot}); await info.attach('feishui-map-full-figure',{path:figureShot,contentType:'image/png'});
  const imageLink=figure.getByRole('link',{name:/打开原尺寸地图/});
  await expect(imageLink).toHaveAttribute('href',path('maps/feishui-spatial-383.svg'));
  await expect(imageLink).toHaveAttribute('target','_blank');
  await imageLink.focus(); await expect(imageLink).toBeFocused();
  const popupPromise=page.waitForEvent('popup'); await imageLink.click(); const popup=await popupPromise; await popup.waitForLoadState();
  await expect(popup).toHaveURL(new URL(path('maps/feishui-spatial-383.svg'),page.url()).href);
  await expect(popup.locator('svg')).toBeVisible(); await popup.close(); await expect(imageLink).toBeFocused();
  await figure.locator('summary').click();
  await expect(figure.getByRole('link',{name:'《淝水之战：胡人骑兵大败》教学材料'})).toBeVisible();
  await page.emulateMedia({colorScheme:'dark'}); await noOverflow(page); await capture(page,info,'feishui-map-dark');
  await page.getByRole('link',{name:'返回时间线',exact:true}).click(); await ready(page);
  await expect(page).toHaveURL(`http://127.0.0.1:4179${destination}`); await expect(card).toBeFocused();
});
