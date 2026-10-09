import type { TimelineEvent } from './types';
import { entities } from './entities';
import { sourceMap } from './sources';

function datePrecision(event: TimelineEvent) {
  return event.dateLabel || (event.date.length === 4 ? '年份精度' : event.date.length === 7 ? '月份精度' : '日期精度');
}

/** Expand each record into source-backed reading sections without inventing facts. */
export function aiEventDetails(event: TimelineEvent) {
  if (event.details?.length) return event.details;
  const linked = event.entityIds.map(id => entities.find(entity => entity.id === id)).filter(Boolean);
  const sources = event.sourceIds.map(id => sourceMap[id]).filter(Boolean);
  const sourceNames = sources.map(source => `《${source.title}》`).join('、');
  const publisher = event.company || linked[0]?.company || linked[0]?.name || '原始资料中的发布方';
  const precision = datePrecision(event);
  const tags = event.tags.filter(Boolean);

  const narrative = [
    `${event.title} 被收录为“${event.kind}”，本条采用${precision}。`,
    `公开资料的发布 / 发表方是${publisher}。`,
    event.summary,
    linked.length ? `节点关联${linked.map(entity => entity!.name).join('、')}；${linked.slice(0, 2).map(entity => `${entity!.name}的定义是“${entity!.description}”`).join('。')}。` : '',
  ].filter(Boolean).join('');

  const interpretation = event.change ? [
    `与${event.change.baseline}相比，可核对的变化是：${event.change.improvements.join('；')}。`,
    `证据类型为${event.change.evidence}。这个基线用于避免把系列名称的延续误读成能力自动提升。`,
    event.change.tradeoffs,
  ].join('') : [
    `从时间线角度看，这个节点的价值在于：${event.significance}`,
    tags.length ? `它同时被标记为${tags.join(' / ')}，便于和相邻节点比较同一技术或产品线索的变化。` : '',
  ].filter(Boolean).join('');

  const verification = [
    sources.length ? `核对原文时先读${sourceNames}。` : '核对原文时先读本条列出的来源。',
    `需要确认三件事：日期属于公告、论文、预览还是正式开放；能力描述来自${sources[0]?.publisher || '发布方'}还是第三方验证；“${event.limitation}”`,
  ].join('');

  return [
    { label: '事件经过', text: narrative, sourceIds: event.sourceIds },
    { label: event.change ? '实质变化与解读' : '解读', text: interpretation, sourceIds: event.change?.sourceIds.length ? event.change.sourceIds : event.sourceIds },
    { label: '怎样核对原文', text: verification, sourceIds: event.sourceIds },
  ];
}
