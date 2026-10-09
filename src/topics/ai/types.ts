export type Track = 'history' | 'methods' | 'products' | 'models';
import type { Source as CoreSource, ReadingSection } from '../../core/types';
export type EntityType = 'concept' | 'product' | 'family' | 'person' | 'organization';
export type Evidence = '原始论文' | '官方公告' | '机构回顾' | '工程文章' | '官方文档';
export interface Source extends CoreSource { type: Evidence; language?: string }
export interface Entity { id: string; name: string; type: EntityType; company?: string; description: string; tags: string[]; sourceIds: string[] }
export interface Change { baseline: string; baselineEventId?: string; improvements: string[]; tradeoffs: string; evidence: '论文报告' | '厂商报告' | '编辑解读'; sourceIds: string[] }
export interface TimelineEvent {
  id: string; date: string; dateLabel?: string; title: string; subtitle?: string;
  summary: string; significance: string; limitation: string;
  tracks: Track[]; entityIds: string[]; sourceIds: string[]; tags: string[];
  milestone: boolean; kind: string; company?: string; announcementGroup?: string;
  change?: Change;
  details?: ReadingSection[];
}
export interface Relation { from: string; to: string; label: string; sourceIds: string[]; since?: string }
