import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { sourcePlatform, sourceLinkLabel } from '../src/lib/source-platform';
import SourceLink from '../src/components/SourceLink';
import TopicIcon from '../src/components/TopicIcon';
import { topics } from '../src/core/topics';

test('platform identity uses parsed exact hosts and safe subdomains, never publisher names', () => {
 for(const [url,id] of [['https://GITHUB.COM:443/a/b','github'],['https://raw.githubusercontent.com/a/b','github'],['https://huggingface.co/tencent/model','huggingface'],['https://www.youtube.com/watch?v=a','youtube'],['https://arxiv.org/abs/1234','arxiv'],['https://zh.wikipedia.org/wiki/A','wikipedia'],['https://www.bilibili.com/video/a','bilibili']] as const) assert.equal(sourcePlatform(url).id,id);
 for(const url of ['https://github.com.evil.test/','https://notgithub.com/','https://huggingface.co@evil.test/','https://evil.test/?github.com','javascript:alert(1)','not a URL']) assert.equal(sourcePlatform(url).id,'web');
 assert.equal(sourcePlatform('https://museum.example/').label,'museum.example');
});
test('compact sources expose destination and distinct document names without duplicate publisher text', () => {
 const html=renderToStaticMarkup(createElement(SourceLink,{url:'https://github.com/tencent/test',title:'模型代码',publisher:'腾讯混元'}));
 assert.match(html,/aria-label="GitHub · 模型代码 · 腾讯混元（新窗口打开）"/);
 assert.match(html,/rel="noopener noreferrer"/); assert.match(html,/data-platform="github"/);
 assert.match(html,/title="GitHub · 模型代码/); assert.ok(!html.includes('favicon'));
 assert.notEqual(sourceLinkLabel('https://github.com/a','文档A'),sourceLinkLabel('https://github.com/b','文档B'));
});
test('all four themes have distinct semantic icons and no added hydrated island',()=>{
 assert.equal(new Set(topics.map(t=>t.icon)).size,4);
 const markup=topics.map(t=>renderToStaticMarkup(createElement(TopicIcon,{icon:t.icon})));
 assert.equal(new Set(markup).size,4);markup.forEach(x=>assert.match(x,/aria-hidden="true"/));
});
