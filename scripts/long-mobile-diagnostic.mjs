import {mkdirSync,readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';

export const SOURCE_SHA='012ce7acb7b438653acf679323d7fc8e1f824c49';
// Replaced only after independent real discovery against the exact source.
export const LONG_INVENTORY={"count":127,"sha256":"991c1d137c1e9d59d45189e972bc68ce611b6a9883586dde7f0ab2cdb0decdff"};
export const MIN_PRIOR_SAME_WORKER=20;
export const TITLES=[
 'nvidia-groot2-research: evidence, availability boundaries and light/dark reading',
 'nvidia-groot2-research: full-library search, return focus and two Back/Forward cycles',
];
export const PLAN=[{id:'01-F1',cohort:'F'},{id:'02-L',cohort:'L'},{id:'03-F2',cohort:'F'}];
export const FIXED_SOURCE_FILES=['package.json','package-lock.json','playwright.config.ts','scripts/serve-built.mjs','scripts/browser-runtime-reporter.mjs','scripts/runtime-resource-sampler.mjs'];
const digest=value=>createHash('sha256').update(value).digest('hex');
const escapeRegex=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
export function diagnosticConfig(original,source,output,cohort){
 if(!['F','L'].includes(cohort))throw Error('Invalid cohort');
 if(original.workers!==1||original.retries!==0||original.timeout!==45000||original.globalTimeout!==420000||original.expect?.timeout!==10000)throw Error('Original deadlines/settings changed');
 if(original.use?.trace!=='retain-on-failure'||original.use?.screenshot!=='only-on-failure'||original.use?.video!=='off'||original.use?.baseURL!=='http://127.0.0.1:4179/'||original.webServer?.reuseExistingServer!==false)throw Error('Unexpected original use/server');
 if(original.projects?.map(p=>p.name).join(',')!=='desktop,mobile')throw Error('Unexpected projects');
 if(original.reporter?.length!==3||original.reporter[0][0]!=='list'||original.reporter[1][0]!=='json'||original.reporter[2][0]!=='./scripts/browser-runtime-reporter.mjs')throw Error('Unexpected original reporters');
 if(original.grep!==undefined||original.grepInvert!==undefined||original.repeatEach!==undefined||original.testMatch!==undefined||original.testIgnore!==undefined||original.shard!==undefined||original.fullyParallel!==undefined)throw Error('Original selection settings changed');
 source=resolve(source);output=resolve(output);
 if(output===source||output.startsWith(source+'/'))throw Error('Output inside exact source');
 const config={...original,testDir:join(source,'tests/browser'),outputDir:join(output,'artifacts'),reporter:[['list'],['json',{outputFile:join(output,'results.json')}],[join(source,'scripts/browser-runtime-reporter.mjs'),{label:'root',outputFile:join(output,'runtime-diagnostics.ndjson')}]],webServer:{...original.webServer,cwd:source}};
 if(cohort==='F'){config.testMatch='research-nov9.spec.ts';config.grep=new RegExp(`(?:${TITLES.map(escapeRegex).join('|')})$`);}
 return config;
}
export function inventoryEntries(report){
 if((report.errors??[]).length)throw Error('Global discovery/results error');
 const entries=[];
 function visit(suite,parent=[]){const ancestry=[...parent,suite.title];for(const spec of suite.specs??[])for(const test of spec.tests??[]){if(test.projectName!=='mobile'||ancestry[0]!==spec.file)throw Error('Unexpected project/file ancestry');entries.push({key:JSON.stringify([test.projectName,spec.file,...ancestry,spec.title]),project:test.projectName,file:spec.file,path:[...ancestry,spec.title],test});}for(const child of suite.suites??[])visit(child,ancestry);}
 for(const suite of report.suites??[])visit(suite);
 if(new Set(entries.map(e=>e.key)).size!==entries.length)throw Error('Duplicate case');
 return entries;
}
export function inventorySignature(report){const entries=inventoryEntries(report);return {count:entries.length,sha256:digest(JSON.stringify(entries.map(e=>e.key).sort()))};}
export function testInventory(report,cohort){
 if(!['F','L'].includes(cohort))throw Error('Invalid cohort');
 const entries=inventoryEntries(report);
 if(cohort==='F'){
  const wanted=TITLES.map(t=>JSON.stringify(['mobile','research-nov9.spec.ts','research-nov9.spec.ts',t]));
  if(JSON.stringify(entries.map(e=>e.key))!==JSON.stringify(wanted))throw Error('Fresh control must contain exact two ordered cases');
 }else{
  if(!Number.isInteger(LONG_INVENTORY.count)||LONG_INVENTORY.count<=2||!/^[a-f0-9]{64}$/.test(LONG_INVENTORY.sha256))throw Error('Real full mobile inventory not pinned');
  if(JSON.stringify(inventorySignature(report))!==JSON.stringify(LONG_INVENTORY))throw Error('Full mobile inventory changed');
 }
 return entries;
}
export function assertPassed(report,cohort){
 const entries=testInventory(report,cohort);
 if(entries.some(e=>e.test.expectedStatus!=='passed'||e.test.results?.length!==1||e.test.results[0].status!=='passed'||e.test.results[0].retry!==0))throw Error('Failed/incomplete/retried observation; stop');
 return entries;
}
export function assertObserverEvidence(text,count){
 const rows=text.trim().split('\n').map(JSON.parse),begin=rows.filter(r=>r.kind==='begin'),end=rows.filter(r=>r.kind==='end'),tests=rows.filter(r=>r.kind==='testEnd');
 // Playwright's --project filtering is verified during real discovery before pinning this list.
 if(begin.length!==1||begin[0].discovered!==count||begin[0].settings?.workers!==1||begin[0].settings?.globalTimeoutMs!==420000||JSON.stringify(begin[0].settings?.retries)!=='[0,0]'||end.length!==1||end[0].status!=='passed'||end[0].incompleteTests!==0||!(end[0].reporterStepCallbackCount>0)||tests.length!==count||tests.some(t=>t.status!=='passed'||t.attempt!==0)||new Set(tests.map(t=>t.id)).size!==count)throw Error('Original observer evidence incomplete');
}
export function exposureEvidence(report){
 const entries=inventoryEntries(report).map(e=>{const r=e.test.results?.[0];if(!r||e.test.results.length!==1||r.status!=='passed'||r.retry!==0||!Number.isFinite(r.duration)||r.duration<0||!Number.isInteger(r.workerIndex)||r.workerIndex<0||!Number.isFinite(Date.parse(r.startTime)))throw Error('Missing worker/time evidence');return {...e,worker:r.workerIndex,startMs:Date.parse(r.startTime),endMs:Date.parse(r.startTime)+r.duration};});
 const targets=TITLES.map(title=>{const e=entries.find(e=>e.file==='research-nov9.spec.ts'&&e.path.at(-1)===title);if(!e)throw Error('Missing exposure target');return {key:e.key,workerIndex:e.worker,startTime:new Date(e.startMs).toISOString(),priorSameWorkerCases:entries.filter(x=>x.worker===e.worker&&x.startMs<e.startMs&&x.endMs<=e.startMs).length};});
 return {minimumPriorSameWorker:MIN_PRIOR_SAME_WORKER,targets,status:targets.every(t=>t.priorSameWorkerCases>=MIN_PRIOR_SAME_WORKER)?'sufficient_prior_same_worker_exposure':'inconclusive_insufficient_same_worker_exposure'};
}
export function configSource(source,output,cohort){return `import original from ${JSON.stringify(join(resolve(source),'playwright.config.ts'))};\nimport {diagnosticConfig} from ${JSON.stringify(pathToFileURL(import.meta.filename).href)};\nexport default diagnosticConfig(original,${JSON.stringify(resolve(source))},${JSON.stringify(resolve(output))},${JSON.stringify(cohort)});\n`;}
function run(command,args,cwd,capture=false,prefix=null){const r=spawnSync(command,args,{cwd,encoding:'utf8',stdio:capture?'pipe':'inherit',maxBuffer:32*1024*1024,env:{...process.env,TIMELINE_BASE_PATH:'',TIMELINE_OUT_DIR:'dist',ASTRO_TELEMETRY_DISABLED:'1'}});if(prefix){writeFileSync(prefix+'.stdout.txt',r.stdout??'');writeFileSync(prefix+'.stderr.txt',r.stderr??'');}if(r.error||r.status!==0)throw Error(`Diagnostic process failed (${r.status??'spawn'}); no rerun`);return r.stdout?.trim();}
function allBrowserFiles(source){const files=[];function visit(directory){for(const d of readdirSync(join(source,directory),{withFileTypes:true})){const p=directory+'/'+d.name;if(d.isDirectory())visit(p);else if(d.isFile())files.push(p);else throw Error('Unexpected non-file browser source');}}visit('tests/browser');return files.sort();}
function hashes(source){return Object.fromEntries([...FIXED_SOURCE_FILES,...allBrowserFiles(source)].map(p=>[p,digest(readFileSync(join(source,p)))]));}
export function execute(workspace){
 workspace=resolve(workspace);const source=join(workspace,'candidate'),out=join(workspace,'long-mobile-diagnostic-evidence');mkdirSync(out,{recursive:true});
 const manifest={purpose:'diagnostic only, NOT complete acceptance or a repair',sourceSha:SOURCE_SHA,plan:PLAN,longInventory:LONG_INVENTORY,minimumPriorSameWorker:MIN_PRIOR_SAME_WORKER,trace:'retain-on-failure in all cohorts',warmups:'none',runs:[]};
 const save=()=>writeFileSync(join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');save();
 const integrity=()=>{if(run('git',['rev-parse','HEAD'],source,true)!==SOURCE_SHA)throw Error('Wrong source SHA');run('git',['diff','--exit-code'],source);run('git',['diff','--cached','--exit-code'],source);const h=hashes(source);if(manifest.sourceHashes&&JSON.stringify(h)!==JSON.stringify(manifest.sourceHashes))throw Error('Source hash changed');return h;};manifest.sourceHashes=integrity();save();
 for(const item of PLAN){
  const output=join(out,item.id);mkdirSync(output,{recursive:true});const config=join(output,'diagnostic.config.mts');writeFileSync(config,configSource(source,output,item.cohort));const state={...item,status:'listing',startedAt:new Date().toISOString()};manifest.runs.push(state);save();
  try{
   integrity();const cli=join(source,'node_modules/@playwright/test/cli.js');const args=['test','--config',config,'--project','mobile'];
   const listing=run('node',[cli,...args,'--list','--reporter=json'],source,true,join(output,'listing'));writeFileSync(join(output,'inventory.json'),listing+'\n');testInventory(JSON.parse(listing),item.cohort);state.status='running';save();
   run('node',[cli,...args],source);const report=JSON.parse(readFileSync(join(output,'results.json'),'utf8'));const entries=assertPassed(report,item.cohort);assertObserverEvidence(readFileSync(join(output,'runtime-diagnostics.ndjson'),'utf8'),entries.length);
   if(item.cohort==='L'){manifest.exposure=exposureEvidence(report);writeFileSync(join(output,'exposure.json'),JSON.stringify(manifest.exposure,null,2)+'\n');}
   integrity();state.status='passed';
  }catch(error){state.status='failed';throw error;}finally{state.finishedAt=new Date().toISOString();save();}
 }
 manifest.interpretation=manifest.exposure?.status??'inconclusive_missing_exposure';save();
}
if(process.argv[1]&&pathToFileURL(resolve(process.argv[1])).href===import.meta.url){if(process.argv.length!==3)throw Error('Usage: node long-mobile-diagnostic.mjs WORKSPACE');execute(process.argv[2]);}
