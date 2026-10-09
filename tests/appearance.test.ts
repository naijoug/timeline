import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { APPEARANCE_KEY, normalizeAppearance, resolveAppearance, observeAppearance, chooseAppearance } from '../src/lib/appearance';

test('appearance preferences resolve explicit modes independently of the system', () => {
  assert.equal(normalizeAppearance('unexpected'), 'system');
  assert.equal(normalizeAppearance(null), 'system');
  assert.equal(resolveAppearance('light', true), 'light');
  assert.equal(resolveAppearance('dark', false), 'dark');
  assert.equal(resolveAppearance('system', true), 'dark');
  assert.equal(resolveAppearance('system', false), 'light');
});

test('the actual pre-paint script restores saved dark mode and tolerates blocked storage', () => {
  const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
  const bootstrap = layout.match(/<script is:inline data-appearance-key=[^>]+>([\s\S]*?)<\/script>/)![1];
  for (const scenario of [{ stored:'dark', system:false, blocked:false, expected:'dark' },{stored:'light',system:true,blocked:false,expected:'light'},{stored:'invalid',system:true,blocked:false,expected:'dark'},{stored:null,system:false,blocked:true,expected:'light'}]) {
    const root = { dataset: {} as Record<string,string> }, meta = { content:'' };
    runInNewContext(bootstrap, { appearanceKey:APPEARANCE_KEY, document:{documentElement:root,querySelector:()=>meta,currentScript:{getAttribute:()=>APPEARANCE_KEY}},matchMedia:()=>({matches:scenario.system}),localStorage:{getItem:()=>{if(scenario.blocked)throw new Error('blocked');return scenario.stored;}} });
    assert.equal(root.dataset.theme, scenario.expected);
    assert.equal(meta.content, scenario.expected==='dark'?'#202020':'#f3f3f3');
  }
});

test('automatic changes, manual overrides, cross-tab changes and cleanup work together', t => {
  const saved = { window:globalThis.window, document:globalThis.document, localStorage:globalThis.localStorage };
  t.after(() => { for (const [key,value] of Object.entries(saved)) if(value===undefined) Reflect.deleteProperty(globalThis,key); else Object.defineProperty(globalThis,key,{value,configurable:true}); });
  const media = Object.assign(new EventTarget(), { matches:false });
  const fakeWindow = Object.assign(new EventTarget(), { matchMedia:()=>media });
  const root = { dataset:{appearance:'system',theme:'light'} };
  const meta = { setAttribute: (_:string,value:string)=>value };
  const store = new Map<string,string>();
  Object.defineProperty(globalThis,'window',{value:fakeWindow,configurable:true});
  Object.defineProperty(globalThis,'document',{value:{documentElement:root,querySelector:()=>meta},configurable:true});
  Object.defineProperty(globalThis,'localStorage',{value:{setItem:(key:string,value:string)=>store.set(key,value)},configurable:true});
  const modes:string[]=[];
  const dispose=observeAppearance(mode=>modes.push(mode));
  media.matches=true;media.dispatchEvent(new Event('change'));
  assert.equal(root.dataset.theme,'dark');
  chooseAppearance('light');
  assert.equal(store.get(APPEARANCE_KEY),'light');
  media.dispatchEvent(new Event('change'));
  assert.equal(root.dataset.theme,'light');
  fakeWindow.dispatchEvent(Object.assign(new Event('storage'),{key:APPEARANCE_KEY,newValue:'dark'}));
  assert.equal(root.dataset.theme,'dark');
  fakeWindow.dispatchEvent(Object.assign(new Event('storage'),{key:null,newValue:null}));
  assert.equal(root.dataset.appearance,'system');
  const count=modes.length;dispose();media.dispatchEvent(new Event('change'));
  assert.equal(modes.length,count);
  Object.defineProperty(globalThis,'localStorage',{value:{setItem:()=>{throw new Error('blocked');}},configurable:true});
  chooseAppearance('light');
  assert.equal(root.dataset.theme,'light');
});

test('paper palettes stay achromatic and body text meets contrast in both modes', () => {
  const css=readFileSync(new URL('../src/styles/paper.css',import.meta.url),'utf8');
  const luminance=(hex:string)=>{const n=parseInt(hex.slice(1,3),16)/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4;};
  for(const block of [css.match(/html:root\s*\{([^}]+)/)![1],css.match(/html\[data-theme='dark'\]\s*\{([^}]+)/)![1]]) {
    const tokens=Object.fromEntries([...block.matchAll(/--paper-([\w-]+):\s*(#[\da-f]{6,8})/g)].map(m=>[m[1],m[2]]));
    for(const value of Object.values(tokens)) assert.equal(value.slice(1,3),value.slice(3,5)),assert.equal(value.slice(3,5),value.slice(5,7));
    for(const foreground of ['ink','text','muted']) for(const background of ['bg','sidebar','selected']) {
      const a=luminance(tokens[foreground]),b=luminance(tokens[background]);
      assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,`${foreground} on ${background}`);
    }
  }
});
