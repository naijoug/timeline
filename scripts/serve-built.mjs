// Localhost-only static fixture server for browser acceptance; never a deployment.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
const root=resolve(process.env.TIMELINE_OUT_DIR || 'dist');
const base=(process.env.TIMELINE_BASE_PATH || '').replace(/\/$/,'');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.jpg':'image/jpeg'};
createServer(async(req,res)=>{
  try {
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
    const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
    if(base && !pathname.startsWith(base+'/')){res.writeHead(404);res.end();return;}
    const relative=base?pathname.slice(base.length):pathname;
    let path=resolve(root,'.'+relative);
    if(path!==root && !path.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    if((await stat(path)).isDirectory())path=resolve(path,'index.html');
    const bytes=await readFile(path);res.writeHead(200,{'content-type':types[extname(path)]||'application/octet-stream','cache-control':'no-store'});res.end(req.method==='HEAD'?undefined:bytes);
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(4179,'127.0.0.1',()=>console.log(`Static browser fixture: http://127.0.0.1:4179${base}/`));
