import test from 'node:test';
import assert from 'node:assert/strict';
import { programmingLanguages } from '../src/topics/programming-languages/catalog';

const event = (id: string) => programmingLanguages.events.find(item => item.id === id)!;
const source = (id: string) => programmingLanguages.sources.find(item => item.id === id)!;

test('language bibliography keeps the verified original paper DOIs and specific PHP history', () => {
  assert.equal(source('acm-lisp').url, 'https://dl.acm.org/doi/10.1145/367177.367199');
  assert.equal(source('acm-algol60').url, 'https://dl.acm.org/doi/10.1145/367236.367262');
  assert.equal(source('php-history').url, 'https://www.php.net/manual/en/history.php.php');
  assert.deepEqual(event('php-fi').time.start, { year: 1995, month: 6 });
  assert.match(event('php-fi').title, /PHP Tools/);
  assert.match(event('php-fi').note ?? '', /PHP\/FI.*1996 年 4 月/);
});

test('version descriptions retain exact feature and compatibility boundaries', () => {
  const java = event('java-21').change!.improvements.join(' ');
  assert.match(java, /有序集合接口（Sequenced Collections）/);
  assert.doesNotMatch(java, /序列化集合/);
  assert.match(event('kotlin-2').summary, /源码与行为不兼容/);
  assert.ok(event('kotlin-2').sourceIds.includes('kotlin20-compatibility'));
  assert.match(event('swift-5').summary, /Apple 平台.*ABI/);
  assert.match(event('swift-5').summary, /SIMD 向量类型/);
});
