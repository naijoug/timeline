import type { Catalog, TimelineEvent } from '../../core/types';
import { dateBounds } from '../../core/time';

export interface WriterReadingPath {
  title: string;
  eventIds: string[];
  note: string;
  sourceIds: string[];
}

// Curated reading suggestions, not a claim about the user's reading history or tastes.
export const writersReadingPaths: Record<string, WriterReadingPath[]> = {
  'li-bu-bai': [{ title: '从中国区域进入，再按历史专题拓展', eventIds: ['li-bu-bai-geography-history-2019', 'li-bu-bai-spring-autumn-2024', 'li-bu-bai-warring-states-2024', 'li-bu-bai-three-kingdoms-2020', 'li-bu-bai-ocean-2022'], note: '编辑阅读建议：先建立区域概念，再按春秋、战国、三国的历史时序选读，最后扩展到大航海。不是出版顺序，不是连续情节，也不代表已读全书；地理是解释变量之一，不独自决定兴亡。', sourceIds: ['writers-li-bubai-profile', 'writers-li-three-kingdoms-dedao', 'writers-li-ocean-simplified', 'writers-li-spring-autumn', 'writers-li-warring-states'] }],
  'liu-cixin': [{
    title: '三部曲：按卷序阅读',
    eventIds: ['liu-cixin-three-body-book', 'liu-cixin-three-body-2', 'liu-cixin-three-body-3'],
    note: '按第一、二、三部阅读。连载、译本与获奖是同一作品的传播节点，不是额外几卷；《球状闪电》也不列为这三卷之一。',
    sourceIds: ['writers-three-body-tor', 'writers-dark-forest-tor', 'writers-deaths-end-tor'],
  }],
  'zi-jin-chen': [{
    title: '先辨认“推理之王”，再对照风格',
    eventIds: ['zi-jin-chen-burning-ice', 'zi-jin-chen-bad-kids', 'zi-jin-chen-long-night', 'zi-jin-chen-tracker', 'zi-jin-chen-low-iq-crime'],
    note: '前三本是作者访谈列出的“推理之王”系列，各自独立叙事，不是必须连续阅读的同一故事。后两本供对照技术侦查与喜剧推理，不作为同一剧情的第四、第五部；这是一条编辑阅读建议。',
    sourceIds: ['writers-zijin-2020-interview', 'writers-zijin-character-interview', 'writers-tracker-library', 'writers-low-iq-cite'],
  }],
  'ma-bo-yong': [{
    title: '“见微”：从办事者视角进入',
    eventIds: ['ma-bo-yong-lychee-of-changan', 'ma-bo-yong-taibai-jinxing', 'ma-bo-yong-peach-blossom-fine'],
    note: '三作同属“见微”书系，分别借历史、神话与志怪看普通人的处境。按出版顺序并读是编辑建议，不意味着情节连续或必须依次阅读。',
    sourceIds: ['writers-ma-jianwei-interview'],
  }],
};

/** Stable chronological order, without mutating shared catalog data. */
export function authorTimeline(catalog: Catalog, authorId: string): TimelineEvent[] {
  const ids = new Set(catalog.timelines?.find(line => line.id === authorId)?.entries.map(entry => entry.eventId) || []);
  return catalog.events
    .filter(event => ids.has(event.id))
    .sort((a, b) => dateBounds(a.time.start)[0] - dateBounds(b.time.start)[0] || a.id.localeCompare(b.id));
}
