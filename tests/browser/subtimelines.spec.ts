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
  const cards=page.locator('.chronicle-event-button');await expect(cards).toHaveCount(49);
  await noOverflow(page);await capture(page,info,'ai-main');
  const mainUrl=page.url();
  await page.getByRole('checkbox',{name:'合并AI 模型发现与迭代',exact:true}).check();
  await expect(page).toHaveURL(/lines=ai-milestones%2Cai-model-iterations/);
  const expected=await page.locator('#timeline-payload-ai').evaluate(el=>{
    const catalog=JSON.parse(el.textContent!).catalog;
    return new Set(catalog.timelines.filter((line:{id:string})=>['ai-milestones','ai-model-iterations'].includes(line.id)).flatMap((line:{entries:{eventId:string}[]})=>line.entries.map(entry=>entry.eventId))).size;
  });
  await expect(cards).toHaveCount(expected);expect(new Set(await cards.evaluateAll(els=>els.map(el=>(el as HTMLElement).dataset.eventId))).size).toBe(expected);
  const mergedUrl=page.url();await page.goBack();await ready(page);await expect(page).toHaveURL(mainUrl);await expect(cards).toHaveCount(49);
  await page.goForward();await ready(page);await expect(page).toHaveURL(mergedUrl);await expect(cards).toHaveCount(expected);
  await page.getByRole('checkbox',{name:'合并AI 模型发现与迭代',exact:true}).uncheck();await expect(cards).toHaveCount(49);
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
