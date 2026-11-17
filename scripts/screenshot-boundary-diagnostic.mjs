import {mkdirSync,readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
export const SOURCE_SHA='012ce7acb7b438653acf679323d7fc8e1f824c49';
export const TEST_FILE='tests/browser/research-nov9.spec.ts';
export const PINNED_HASHES={'package-lock.json':'9e5072869c7621b4c9433539e644469926df327787f5880206809d38bfa602e2','playwright.config.ts':'4dd427e00b892e82fd7ed3d6b6f1626f20a883f3b8b8386257f8107acd576701'};
export const TEST_SHA256='0273a8ef3afc7df18a604f5065b154056b653f7931bf32be5bfeefef6c2653e0';
export const PLAN=[{id:'01-N1',cohort:'N'},{id:'02-I1',cohort:'I'},{id:'03-I2',cohort:'I'},{id:'04-N2',cohort:'N'}];
export const TITLES=['nvidia-groot2-research: evidence, availability boundaries and light/dark reading','nvidia-groot2-research: full-library search, return focus and two Back/Forward cycles'];
export const digest=x=>createHash('sha256').update(x).digest('hex');
const escapeRegex=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const PREAMBLE=`import { writeFileSync as __diagnosticWrite } from 'node:fs';
import { performance as __diagnosticClock } from 'node:perf_hooks';
const __diagnosticSamples: { site: number; durationMs: number }[] = [];
test.afterEach(async ({}, testInfo) => {
  const samples = __diagnosticSamples.splice(0);
  __diagnosticWrite(testInfo.outputPath('screenshot-await.json'), JSON.stringify({project:testInfo.project.name,title:testInfo.title,retry:testInfo.retry,workerIndex:testInfo.workerIndex,samples})+'\\n');
});
`;
export function instrument(original){
 if(digest(original)!==TEST_SHA256)throw Error('Unexpected exact test source');
 const lines=original.split('\n');let count=0;const replacements=[];
 for(let i=0;i<lines.length;i++)if(/^\s*await page\.screenshot\(.+\);$/.test(lines[i])){
  const old=lines[i],site=++count,indent=old.match(/^\s*/)[0];
  const next=indent+'{\n'+indent+'  const __diagnosticStart = __diagnosticClock.now();\n'+old+'\n'+indent+'  const __diagnosticEnd = __diagnosticClock.now();\n'+indent+`  __diagnosticSamples.push({site:${site},durationMs:__diagnosticEnd-__diagnosticStart});\n`+indent+'}';
  replacements.push({old,next,site});lines[i]=next;
 }
 if(count!==4)throw Error('Expected four direct screenshot callsites');
 const boundary=original.indexOf('\n')+1;let changed=lines.join('\n');changed=changed.slice(0,boundary)+PREAMBLE+changed.slice(boundary);
 if(reverse(changed,replacements)!==original)throw Error('Reversal mismatch');
 return {changed,replacements,changedSha256:digest(changed)};
}
export function reverse(changed,replacements){let text=changed;if(text.split(PREAMBLE).length!==2)throw Error('Preamble absent/duplicated');text=text.replace(PREAMBLE,'');for(const {old,next} of replacements){if(text.split(next).length!==2)throw Error('Changed block absent/duplicated');text=text.replace(next,old);}return text;}
export function diagnosticConfig(original,source,output){
 if(original.workers!==1||original.retries!==0||original.timeout!==45000||original.globalTimeout!==420000||original.expect?.timeout!==10000)throw Error('Original deadlines changed');
 if(original.use?.trace!=='retain-on-failure'||original.use?.screenshot!=='only-on-failure'||original.use?.video!=='off'||original.use?.baseURL!=='http://127.0.0.1:4179/'||original.webServer?.reuseExistingServer!==false)throw Error('Original use/server changed');
 if(original.projects?.map(p=>p.name).join(',')!=='desktop,mobile'||original.reporter?.length!==3||original.reporter[0][0]!=='list'||original.reporter[1][0]!=='json'||original.reporter[2][0]!=='./scripts/browser-runtime-reporter.mjs')throw Error('Original projects/reporters changed');
 for(const key of ['grep','grepInvert','repeatEach','testMatch','testIgnore','shard','fullyParallel'])if(original[key]!==undefined)throw Error('Original selection changed');
 source=resolve(source);output=resolve(output);if(output===source||output.startsWith(source+'/'))throw Error('Output inside exact source');
 return {...original,testDir:join(source,'tests/browser'),testMatch:'research-nov9.spec.ts',grep:new RegExp(`(?:${TITLES.map(escapeRegex).join('|')})$`),outputDir:join(output,'artifacts'),reporter:[['list'],['json',{outputFile:join(output,'results.json')}],[join(source,'scripts/browser-runtime-reporter.mjs'),{label:'root',outputFile:join(output,'runtime-diagnostics.ndjson')}]],webServer:{...original.webServer,cwd:source}};
}
export function inventory(report,passed=false){
 if((report.errors??[]).length)throw Error('Global report error');const found=[];
 const walk=(s,parents=[])=>{const chain=[...parents,s.title];for(const spec of s.specs??[])for(const t of spec.tests??[])found.push({key:JSON.stringify([t.projectName,spec.file,...chain,spec.title]),title:spec.title,project:t.projectName,line:spec.line,column:spec.column,test:t});for(const c of s.suites??[])walk(c,chain);};for(const s of report.suites??[])walk(s);
 const want=['desktop','mobile'].flatMap(p=>TITLES.map(t=>JSON.stringify([p,'research-nov9.spec.ts','research-nov9.spec.ts',t]))).sort();
 if(JSON.stringify(found.map(x=>x.key).sort())!==JSON.stringify(want))throw Error('Inventory mismatch');
 if(passed&&found.some(x=>x.test.expectedStatus!=='passed'||x.test.results?.length!==1||x.test.results[0].status!=='passed'||x.test.results[0].retry!==0))throw Error('Incomplete/failed/retried observation');return found;
}
export function observer(rows,entries){
 const begins=rows.filter(x=>x.kind==='begin'),ends=rows.filter(x=>x.kind==='end');
 if(begins.length!==1||begins[0].discovered!==4||begins[0].settings?.workers!==1||begins[0].settings?.globalTimeoutMs!==420000||JSON.stringify(begins[0].settings?.retries)!=='[0,0]'||ends.length!==1||ends[0].status!=='passed'||ends[0].incompleteTests!==0)throw Error('Observer incomplete/settings mismatch');
 const map=new Map();let activeId=null;
 for(const row of rows){if(row.kind==='testBegin'){if(activeId!==null||map.has(row.test.id)||row.attempt!==0)throw Error('Repeated observer identity');activeId=row.test.id;map.set(row.test.id,{...row.test,worker:row.worker,steps:[]});}
  if(row.kind==='sample')for(const active of row.activeTests??[]){const t=map.get(active.id);if(!t)throw Error('Unknown sampled identity');t.steps.push(...active.completedSteps);}
  if(row.kind==='testEnd'){const t=map.get(row.id);if(activeId!==row.id||!t||t.end||row.status!=='passed'||row.attempt!==0||(row.unfinishedSteps??[]).length)throw Error('Incomplete observer test');t.steps.push(...row.completedSteps);t.end=row;activeId=null;}
 }
 if(activeId!==null||map.size!==4)throw Error('Observer test count mismatch');
 return entries.map(e=>{const matches=[...map.values()].filter(t=>t.project===e.project&&t.file==='research-nov9.spec.ts'&&t.line===e.line&&t.column===e.column);if(matches.length!==1)throw Error('Ambiguous observer mapping');const t=matches[0],r=e.test.results[0];if(!t.end||t.worker!==r.workerIndex||t.end.durationMs!==r.duration)throw Error('Result mismatch');const steps=t.steps.filter(s=>s.category==='pw:api'&&s.operation==='browser.screenshot').sort((a,b)=>a.id-b.id);if(steps.length!==(e.title===TITLES[0]?2:1)||steps.some(s=>s.error||!Number.isFinite(s.durationMs))||new Set(t.steps.map(s=>s.id)).size!==t.steps.length)throw Error('Screenshot step mismatch');return {project:e.project,title:e.title,worker:r.workerIndex,durationMs:r.duration,screenshots:steps.map((s,i)=>({ordinal:i+1,apiStepMs:s.durationMs}))};});
}
function files(root){const out=[];const visit=p=>{for(const d of readdirSync(p,{withFileTypes:true})){const f=join(p,d.name);if(d.isDirectory())visit(f);else if(d.isFile())out.push(f);else throw Error('Unexpected non-file');}};visit(root);return out.sort();}
function hashes(source){return Object.fromEntries(['package.json','package-lock.json','playwright.config.ts','scripts/serve-built.mjs','scripts/browser-runtime-reporter.mjs','scripts/runtime-resource-sampler.mjs',...files(join(source,'tests/browser')).map(p=>p.slice(source.length+1))].map(p=>[p,digest(readFileSync(join(source,p)))]));}
function run(cmd,args,cwd,capture=false,prefix){const r=spawnSync(cmd,args,{cwd,encoding:'utf8',stdio:capture?'pipe':'inherit',maxBuffer:32*1024*1024,env:{...process.env,TIMELINE_BASE_PATH:'',TIMELINE_OUT_DIR:'dist',ASTRO_TELEMETRY_DISABLED:'1'}});if(prefix){writeFileSync(prefix+'.stdout.txt',r.stdout??'');writeFileSync(prefix+'.stderr.txt',r.stderr??'');}if(r.error||r.status!==0)throw Error(`Process failed (${r.status??'spawn'}); stop, no rerun`);return r.stdout?.trim();}
export function withInstrumentation(sourcePath,changed,operation){const original=readFileSync(sourcePath);try{writeFileSync(sourcePath,changed);return operation();}finally{writeFileSync(sourcePath,original);if(!readFileSync(sourcePath).equals(original))throw Error('Restoration failed');}}
export function execute(workspace){
 workspace=resolve(workspace);const source=join(workspace,'candidate'),out=join(workspace,'screenshot-boundary-evidence');mkdirSync(out,{recursive:true});
 const original=readFileSync(join(source,TEST_FILE),'utf8'),patch=instrument(original),manifest={purpose:'diagnostic only; NOT full acceptance, not a repair',sourceSha:SOURCE_SHA,plan:PLAN,testOriginalSha256:digest(original),testInstrumentedSha256:patch.changedSha256,runs:[]};const save=()=>writeFileSync(join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');save();
 const integrity=()=>{if(run('git',['rev-parse','HEAD'],source,true)!==SOURCE_SHA)throw Error('Wrong source');run('git',['diff','--exit-code'],source);run('git',['diff','--cached','--exit-code'],source);const h=hashes(source);for(const [p,expected] of Object.entries(PINNED_HASHES))if(h[p]!==expected)throw Error('Pinned lock/config mismatch');if(manifest.sourceHashes&&JSON.stringify(h)!==JSON.stringify(manifest.sourceHashes))throw Error('Source hashes changed');return h;};manifest.sourceHashes=integrity();save();
 for(const item of PLAN){integrity();const output=join(out,item.id);mkdirSync(output,{recursive:true});const config=join(output,'diagnostic.config.mts');writeFileSync(config,`import original from ${JSON.stringify(join(source,'playwright.config.ts'))};\nimport {diagnosticConfig} from ${JSON.stringify(import.meta.url)};\nexport default diagnosticConfig(original,${JSON.stringify(source)},${JSON.stringify(output)});\n`);const state={...item,status:'started',startedAt:new Date().toISOString()};manifest.runs.push(state);save();
  const observe=()=>{
   const before=hashes(source),want={...manifest.sourceHashes,...(item.cohort==='I'?{[TEST_FILE]:patch.changedSha256}:{})};if(JSON.stringify(before)!==JSON.stringify(want))throw Error('Unexpected measured source');
   const cli=join(source,'node_modules/@playwright/test/cli.js'),args=['test','--config',config];const listing=run('node',[cli,...args,'--list','--reporter=json'],source,true,join(output,'listing'));writeFileSync(join(output,'inventory.json'),listing+'\n');inventory(JSON.parse(listing));run('node',[cli,...args],source);
   const report=JSON.parse(readFileSync(join(output,'results.json'),'utf8')),entries=inventory(report,true),rows=readFileSync(join(output,'runtime-diagnostics.ndjson'),'utf8').trim().split('\n').map(JSON.parse),observations=observer(rows,entries);
   const timings=files(join(output,'artifacts')).filter(p=>p.endsWith('/screenshot-await.json')).map(p=>JSON.parse(readFileSync(p,'utf8')));if(timings.length!==(item.cohort==='I'?4:0))throw Error('Timing record count mismatch');
   for(const observation of observations)if(item.cohort==='I'){const match=timings.filter(t=>t.project===observation.project&&t.title===observation.title);if(match.length!==1||match[0].retry!==0||match[0].workerIndex!==observation.worker)throw Error('Timing identity mismatch');const expectedSites=observation.title===TITLES[0]?[1,2]:[4],samples=match[0].samples;if(JSON.stringify(samples.map(s=>s.site))!==JSON.stringify(expectedSites)||samples.some(s=>!Number.isFinite(s.durationMs)||s.durationMs<0))throw Error('Timing site mismatch');observation.screenshots.forEach((s,i)=>Object.assign(s,{site:samples[i].site,fullAwaitMs:samples[i].durationMs,clientResidualMs:samples[i].durationMs-s.apiStepMs}));}
   writeFileSync(join(output,'observations.json'),JSON.stringify({suiteDurationMs:report.stats.duration,observations},null,2)+'\n');if(JSON.stringify(hashes(source))!==JSON.stringify(want))throw Error('Source changed during measurement');state.status='passed';
  };
  try{if(item.cohort==='I')withInstrumentation(join(source,TEST_FILE),patch.changed,observe);else observe();integrity();}catch(error){state.status='failed';throw error;}finally{state.finishedAt=new Date().toISOString();save();}
 }
 run('/usr/bin/python3',[join(resolve(import.meta.dirname),'screenshot-boundary-pixels.py'),out],workspace);manifest.interpretation='Timing residual is not pure filesystem IO; inspect pixel comparison and controls before interpreting.';save();
}
if(process.argv[1]&&pathToFileURL(resolve(process.argv[1])).href===import.meta.url){if(process.argv.length!==3)throw Error('Usage: node screenshot-boundary-diagnostic.mjs WORKSPACE');execute(process.argv[2]);}
