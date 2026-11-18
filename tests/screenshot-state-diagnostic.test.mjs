import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {SOURCE_SHA,PINNED_HASHES,TEST_SHA256,PLAN,TITLES,digest,instrument,reverse,diagnosticConfig,inventory,observer,withInstrumentation,validateSample} from '../scripts/screenshot-state-diagnostic.mjs';
const fixture=readFileSync(new URL('./fixtures/screenshot-state-research-nov9.txt',import.meta.url),'utf8');
const original=()=>({timeout:45000,globalTimeout:420000,workers:1,retries:0,expect:{timeout:10000},reporter:[['list'],['json',{}],['./scripts/browser-runtime-reporter.mjs',{}]],use:{baseURL:'http://127.0.0.1:4179/',trace:'retain-on-failure',screenshot:'only-on-failure',video:'off'},projects:[{name:'desktop',use:{viewport:{width:1440,height:1000},deviceScaleFactor:1}},{name:'mobile',use:{viewport:{width:375,height:812},deviceScaleFactor:3,isMobile:true,hasTouch:true,defaultBrowserType:'chromium'}}],webServer:{command:'node scripts/serve-built.mjs',url:'http://127.0.0.1:4179/ai/',timeout:15000,reuseExistingServer:false}});
const report=()=>({errors:[],suites:[{title:'research-nov9.spec.ts',specs:TITLES.map((title,i)=>({title,file:'research-nov9.spec.ts',line:60+i*50,column:3,tests:['desktop','mobile'].map((projectName,j)=>({projectName,expectedStatus:'passed',results:[{status:'passed',retry:0,workerIndex:j,duration:100+i}]}))}))}]});
function rows(entries){const out=[{kind:'begin',discovered:2,settings:{workers:1,retries:[0,0],globalTimeoutMs:420000}}];entries.forEach((e,i)=>{const id=String(i),steps=Array.from({length:1},(_,j)=>({id:j+1,category:'pw:api',operation:'browser.screenshot',durationMs:10+j,error:false}));out.push({kind:'testBegin',test:{id,project:e.project,file:'research-nov9.spec.ts',line:e.line,column:e.column},worker:e.test.results[0].workerIndex,attempt:0});out.push({kind:'sample',activeTests:[{id,completedSteps:steps.slice(0,1)}]});out.push({kind:'testEnd',id,status:'passed',attempt:0,durationMs:e.test.results[0].duration,completedSteps:steps.slice(1),unfinishedSteps:[]});});out.push({kind:'end',status:'passed',incompleteTests:0});return out;}
test('exact fixed source and bounded N/P/P/N plan',()=>{assert.equal(SOURCE_SHA,'012ce7acb7b438653acf679323d7fc8e1f824c49');assert.equal(digest(fixture),TEST_SHA256);assert.deepEqual(PINNED_HASHES,{'package-lock.json':'9e5072869c7621b4c9433539e644469926df327787f5880206809d38bfa602e2','playwright.config.ts':'4dd427e00b892e82fd7ed3d6b6f1626f20a883f3b8b8386257f8107acd576701'});assert.deepEqual(PLAN.map(x=>x.cohort),['N','P','P','N']);assert.equal(new Set(PLAN.map(x=>x.id)).size,4);});
test('one wrapped screenshot, all original calls and statements preserved reversibly',()=>{
 const p=instrument(fixture);assert.equal(p.replacements.length,1);assert.equal(reverse(p.changed,p.replacements),fixture);
 const calls=x=>x.split('\n').filter(s=>/^\s*await page\.screenshot\(/.test(s));assert.deepEqual(calls(p.changed),calls(fixture));
 assert.equal((p.changed.match(/__diagnosticStart =/g)||[]).length,1);
 assert.equal((p.changed.match(/__diagnosticSamples.push/g)||[]).length,1);
 assert.match(p.changed,/test.beforeEach/);assert.match(p.changed,/page.addInitScript/);assert.match(p.changed,/test.afterEach/);
 assert.equal((p.replacements[0].next.match(/page.evaluate/g)||[]).length,2);assert.ok(p.replacements[0].next.indexOf("('pre')")<p.replacements[0].next.indexOf('await page.screenshot'));assert.ok(p.replacements[0].next.indexOf("('post')")>p.replacements[0].next.indexOf('await page.screenshot'));
 assert.equal(digest(p.changed),p.changedSha256);assert.throws(()=>instrument(fixture+'\n'));
 assert.throws(()=>reverse(p.changed+p.replacements[0].next,p.replacements));
 assert.doesNotMatch(p.changed,/requestAnimationFrame|sessionStorage|localStorage|window.name|\.mouse\.move|\.hover\(|waitForTimeout/);
});
test('all original fidelity settings and reporters retained',()=>{const o=original(),copy=structuredClone(o),c=diagnosticConfig(o,'/S','/O');assert.deepEqual(o,copy);for(const k of ['timeout','globalTimeout','workers','retries','expect','use','projects'])assert.deepEqual(c[k],o[k]);assert.equal(c.reporter.length,3);assert.deepEqual(c.reporter[2],['/S/scripts/browser-runtime-reporter.mjs',{label:'root',outputFile:'/O/runtime-diagnostics.ndjson'}]);assert.equal(c.testMatch,'research-nov9.spec.ts');for(const t of TITLES)assert.ok(c.grep.test(t));assert.ok(!c.grep.test('ERNIE '+TITLES[0]+' wrong'));assert.deepEqual(c.webServer,{...o.webServer,cwd:'/S'});});
test('changed gates/selection/unsafe output rejected',()=>{for(const [k,v]of[['workers',2],['retries',1],['timeout',60000],['globalTimeout',500000],['grep',/x/],['testMatch','x'],['repeatEach',2],['fullyParallel',true]])assert.throws(()=>diagnosticConfig({...original(),[k]:v},'/S','/O'));for(const key of ['trace','screenshot','video']){const o=original();o.use[key]='wrong';assert.throws(()=>diagnosticConfig(o,'/S','/O'));}assert.throws(()=>diagnosticConfig(original(),'/S','/S/out'));});
test('two exact cases, no duplicates/unexpected ancestry',()=>{assert.equal(inventory(report()).length,2);const r=report();r.suites[0].specs.reverse();assert.equal(inventory(r).length,2);for(const alter of [r=>r.suites[0].specs.push(r.suites[0].specs[0]),r=>r.suites[0].specs.pop(),r=>r.suites[0].title='nested',r=>r.suites[0].specs[0].tests[0].projectName='other',r=>r.errors.push({})]){const r=report();alter(r);assert.throws(()=>inventory(r));}});
test('failures/skips/expected failure/retries never pass',()=>{assert.equal(inventory(report(),true).length,2);for(const status of ['failed','skipped','interrupted','timedOut']){const r=report();r.suites[0].specs[0].tests[0].results[0].status=status;assert.throws(()=>inventory(r,true));}for(const alter of [t=>t.results.push(t.results[0]),t=>t.results[0].retry=1,t=>t.expectedStatus='failed']){const r=report();alter(r.suites[0].specs[0].tests[0]);assert.throws(()=>inventory(r,true));}});
test('observer reconstructs screenshot ordinals across spliced snapshots',()=>{const e=inventory(report(),true),o=observer(rows(e),e);assert.deepEqual(o.map(x=>x.screenshots.map(y=>y.apiStepMs)),[[10],[10]]);});
test('observer fails on incomplete, duplicate, wrong worker/duration and missing steps',()=>{const e=inventory(report(),true);for(const alter of [r=>r.pop(),r=>r[0].settings.workers=2,r=>r[1].worker=9,r=>r[3].durationMs=999,r=>r[3].status='failed',r=>r[2].activeTests[0].completedSteps=[],r=>r[3].completedSteps.push(r[2].activeTests[0].completedSteps[0]),r=>r[3].unfinishedSteps=[{}],r=>r[1].test.line=999]){const r=rows(e);alter(r);assert.throws(()=>observer(r,e));}});
test('instrumented source restored after success and failure; original error propagates',()=>{const dir=mkdtempSync(join(tmpdir(),'screenshot-state-'));try{const path=join(dir,'spec.ts');writeFileSync(path,fixture);const p=instrument(fixture);const value=withInstrumentation(path,p.changed,()=>{assert.equal(readFileSync(path,'utf8'),p.changed);return 17;});assert.equal(value,17);assert.equal(readFileSync(path,'utf8'),fixture);assert.throws(()=>withInstrumentation(path,p.changed,()=>{throw Error('sentinel failure');}),/sentinel failure/);assert.equal(readFileSync(path,'utf8'),fixture);}finally{rmSync(dir,{recursive:true,force:true});}});
test('workflow is isolated read-only and preserves both evidence classes',()=>{const y=readFileSync(new URL('../.github/workflows/screenshot-state-diagnostic.yml',import.meta.url),'utf8');assert.match(y,/branches: \['diagnostics\/screenshot-state-20261118-0000'\]/);assert.match(y,/permissions:\n  contents: read/);assert.ok(y.includes(SOURCE_SHA));assert.match(y,/node-version: 22/);assert.match(y,/runs-on: ubuntu-24.04/);assert.equal((y.match(/persist-credentials: false/g)||[]).length,2);assert.equal((y.match(/if: always\(\)/g)||[]).length,2);assert.match(y,/python3-pil/);assert.match(y,/screenshot-state-numerical-/);assert.match(y,/screenshot-state-full-/);assert.doesNotMatch(y,/workflow_dispatch|contents: write|pages: write|deploy-pages|git push|continue-on-error|--workers|--retries|--repeat-each/);});

test('observer rejects overlapping serial cases',()=>{const e=inventory(report(),true),r=rows(e);[r[3],r[4]]=[r[4],r[3]];assert.throws(()=>observer(r,e));});

test('both clock brackets, no pre-drain and same-document capture validated',()=>{
 const browser=phase=>({version:2,phase,timeOrigin:1000,documentId:'1000',readStart:phase==='pre'?1:4,now:phase==='pre'?2:5,capacity:512,dropped:0,records:phase==='pre'?[]:[{kind:'target-observed',at:1}],lastPointer:null,snapshot:{target:{text:'全部事件'},targetStillCurrent:true}});
 const good=()=>({nodeTimeOrigin:2000,preSend:1,preReceive:3,screenshotStart:10,screenshotEnd:20,readSend:21,readReceive:24,pre:browser('pre'),browser:browser('post')});
 assert.equal(validateSample(good()).browser.lastPointer,null);
 for(const alter of [s=>s.preReceive=11,s=>s.readSend=19,s=>s.browser.documentId='old',s=>s.pre.records=[{}],s=>s.browser.records=[],s=>s.browser.records[0].at=6,s=>s.browser.capacity=999,s=>s.browser.dropped=-1,s=>s.browser.lastPointer={documentId:'old',at:1},s=>s.pre.now=6]){
  const s=good();alter(s);assert.throws(()=>validateSample(s));
 }
 const full=good();full.browser.records=Array.from({length:512},()=>({at:2,kind:'pointer'}));full.browser.dropped=1;assert.doesNotThrow(()=>validateSample(full));
});

import {runInNewContext} from 'node:vm';
import {installEventCollector} from '../scripts/screenshot-state-collector.mjs';
test('collector is passive until explicit reads; pre preserves ring; post drains bounded evidence',()=>{
 const handlers={},observers=[];let tick=0,styleReads=0,rectReads=0,animationReads=0;
 const makeElement=(button=false)=>({textContent:button?'':'全部事件 · 329',isConnected:true,getAttribute:k=>k==='class'?(button?'mobile-app-back':'is-active'):null,
  matches:selector=>selector==='.mobile-app-back'?button:selector===':hover'?button:false,
  getBoundingClientRect:()=>{rectReads++;return {x:0,y:0,width:44,height:44,top:0,right:44,bottom:44,left:0};},
  getAnimations:options=>{animationReads++;assert.equal(options.subtree,false);return [];}});
 const target=makeElement(),back=makeElement(true);
 const document={activeElement:{},fonts:{status:'loaded'},querySelector:s=>s==='.mobile-app-back'?back:target,addEventListener:(type,fn,options)=>{assert.equal(options.capture,true);assert.equal(options.passive,true);handlers[type]=fn;}};
 class MO {constructor(fn){this.fn=fn;observers.push(this);}observe(el,options){this.el=el;this.options=options;}disconnect(){this.disconnected=true;}}
 const window={visualViewport:null};const context={window,document,MutationObserver:MO,performance:{timeOrigin:1000,now:()=>++tick},scrollX:0,scrollY:10,devicePixelRatio:3,matchMedia:()=>({matches:false}),getComputedStyle:()=>{styleReads++;return {display:'flex',visibility:'visible',color:'rgb(32, 32, 32)',backgroundColor:'rgba(0, 0, 0, 0)',transitionDuration:'0.16s'};}};
 runInNewContext('('+installEventCollector.toString()+')()',context);
 const read=window.__timelineScreenshotState_20261118;
 assert.equal(styleReads,0);assert.equal(rectReads,0);assert.equal(animationReads,0);
 const pre=read('pre');assert.equal(pre.lastPointer,null);assert.equal(pre.records.length,0);assert.equal(pre.phase,'pre');assert.equal(pre.snapshot.returnButton.pseudo.hover,true);assert.equal(pre.snapshot.target.pseudo.hover,false);
 const first=read('post');assert.equal(first.records[0].kind,'target-observed');assert.equal(first.snapshot.targetStillCurrent,true);assert.equal(first.snapshot.dpr,3);assert.equal(first.snapshot.scroll.y,10);
 handlers.transitionstart({target:{},propertyName:'color'});assert.equal(read('post').records.length,0);
 handlers.transitionstart({target,propertyName:'color',elapsedTime:0,pseudoElement:'',isTrusted:true});
 assert.equal(read('pre').records.length,0);const transition=read('post').records[0];assert.equal(transition.kind,'target-transition');assert.equal(transition.identity,'all-events-link');
 handlers.transitionstart({target:back,propertyName:'background-color',isTrusted:true});assert.equal(read('post').records[0].identity,'return-button');
 for(let i=0;i<520;i++)handlers.pointermove({target:{},clientX:i,clientY:4,pointerType:'mouse',isTrusted:true});
 const full=read('post');assert.equal(full.records.length,512);assert.equal(full.dropped,8);assert.equal(full.lastPointer.clientX,519);assert.equal(full.lastPointer.documentId,'1000');assert.equal(full.records[0].identity,'other');assert.equal(read('post').records.length,0);
 assert.equal(observers[0].disconnected,true);const watched=observers.find(o=>o.el===target);assert.deepEqual(Array.from(watched.options.attributeFilter),['class','aria-current']);
 watched.fn([{type:'attributes',attributeName:'class',oldValue:'old'}]);assert.equal(read('post').records[0].oldValue,'old');
 assert.throws(()=>read('invalid'),/phase/);assert.throws(()=>runInNewContext('('+installEventCollector.toString()+')()',context),/collision/);
});
