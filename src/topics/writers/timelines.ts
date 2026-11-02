import type { TimelineDefinition } from '../../core/types';
import { timelineEntries } from '../../core/timelines';

export const writerTimelines: TimelineDefinition[] = [
  { id: 'liu-cixin', themeId: 'writers', kind: 'entity', title: '刘慈欣作品年谱', path: '/writers/authors/liu-cixin/',
    description: '刘慈欣的已收录作品、发表阶段与传播节点。',
    note: '精选作品年谱，不是完整生平或完整书目；连载、成书、译介与获奖分别记录，不将不同阶段当作不同作品。',
    entries: timelineEntries(["liu-cixin-whale-song", "liu-cixin-micro-end", "liu-cixin-earth-fire", "liu-cixin-wandering-earth", "liu-cixin-rural-teacher", "liu-cixin-full-spectrum", "liu-cixin-morning-star", "liu-cixin-supernova-era", "liu-cixin-ball-lightning", "liu-cixin-three-body-1", "liu-cixin-three-body-2", "liu-cixin-three-body-3", "liu-cixin-earth-eye", "liu-cixin-micro-era", "liu-cixin-china-sun", "liu-cixin-dream-sea", "liu-cixin-angel-era", "liu-cixin-swallow", "liu-cixin-support-god", "liu-cixin-support-human", "liu-cixin-mountain", "liu-cixin-golden-field", "liu-cixin-three-body-book", "liu-cixin-three-body-english", "liu-cixin-three-body-hugo"]),
  },
  { id: 'zi-jin-chen', themeId: 'writers', kind: 'entity', title: '紫金陈作品年谱', path: '/writers/authors/zi-jin-chen/',
    description: '紫金陈的已收录作品、发表阶段与传播节点。',
    note: '精选作品年谱，不是完整生平或完整书目；连载、成书、译介与获奖分别记录，不将不同阶段当作不同作品。',
    entries: timelineEntries(["zi-jin-chen-murder-officer", "zi-jin-chen-burning-ice", "zi-jin-chen-bad-kids", "zi-jin-chen-long-night", "zi-jin-chen-low-iq-crime", "zi-jin-chen-tracker", "zi-jin-chen-love-confused", "zi-jin-chen-teen-stock-god", "zi-jin-chen-capital-duel", "zi-jin-chen-forbidden-place", "zi-jin-chen-long-night-twin-stars", "zi-jin-chen-i-refuse"]),
  },
  { id: 'ma-bo-yong', themeId: 'writers', kind: 'entity', title: '马伯庸作品年谱', path: '/writers/authors/ma-bo-yong/',
    description: '马伯庸的已收录作品、发表阶段与传播节点。',
    note: '精选作品年谱，不是完整生平或完整书目；连载、成书、译介与获奖分别记录，不将不同阶段当作不同作品。',
    entries: timelineEntries(["ma-bo-yong-wind-from-longxi", "ma-bo-yong-mystery-of-antiques", "ma-bo-yong-secret-of-three-kingdoms", "ma-bo-yong-longest-day-in-changan", "ma-bo-yong-ming-microscope", "ma-bo-yong-lychee-of-changan", "ma-bo-yong-great-healer", "ma-bo-yong-taibai-jinxing", "ma-bo-yong-food-of-the-south", "ma-bo-yong-death-on-qq", "ma-bo-yong-yin-shang-maya", "ma-bo-yong-seven-marquises", "ma-bo-yong-three-kingdoms-supporting", "ma-bo-yong-read-less", "ma-bo-yong-europa-heroes", "ma-bo-yong-dragon-and-subway", "ma-bo-yong-grassland-zoo", "ma-bo-yong-culture-pilgrimage", "ma-bo-yong-people-lovely", "ma-bo-yong-two-capitals-fifteen-days", "ma-bo-yong-peach-blossom-fine", "ma-bo-yong-lychee-serial"]),
  },
];
