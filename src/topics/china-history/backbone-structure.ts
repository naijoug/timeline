import type { Collection, Period, TimelineEvent } from '../../core/types';
import { dateBounds } from '../../core/time';

export const historyCoverageCheckedAt = '2026-10-24';
// These are editorial reading groups, not claims about the end of a state or policy.
const modernPeriodPlan = [
  {
    "id": "republic-1912-1949",
    "title": "中华民国时期：大陆1912—1949",
    "start": 1912,
    "end": 1949,
    "summary": "从共和建政、军阀政治与国民政府，到抗日战争、国共内战及1949年政权格局变化。",
    "note": "这是中国大陆的历史阅读分组，不把1949年解释为中华民国终结。中华民国政府此后迁往台湾；海峡两岸的后续事件按具体史实另行归属。"
  },
  {
    "id": "republican-early",
    "title": "民初与北洋时期",
    "start": 1912,
    "end": 1927,
    "parentId": "republic-1912-1949",
    "summary": "共和制度的探索、政治分裂与新政治力量兴起。",
    "note": "1912—1927是本资料集的阅读范围，北洋政府延续至1928；不以阅读边界替代政府实际存续期。"
  },
  {
    "id": "republican-nanjing",
    "title": "南京国民政府前期",
    "start": 1927,
    "end": 1937,
    "parentId": "republic-1912-1949",
    "summary": "国民政府的整合、国共冲突，以及日本侵略逐步扩大的时期。",
    "note": "1937年是全面抗战开始的分段点，不是中华民国或国民政府终结。与1931年起的抗战阅读分组有意交叠。"
  },
  {
    "id": "war-resistance",
    "title": "抗日战争：1931—1945",
    "start": 1931,
    "end": 1945,
    "parentId": "republic-1912-1949",
    "summary": "区分1931年东北危机、1937年全面战争和1945年日本投降，兼顾战役与平民经历。",
    "note": "1931与1937是不同层次的起点，不能合并成同一天；大战略、具体战役与战争暴行分别记录。"
  },
  {
    "id": "civil-war",
    "title": "战后与国共内战",
    "start": 1945,
    "end": 1949,
    "parentId": "republic-1912-1949",
    "summary": "抗战胜利后的和谈、冲突升级与大规模战役，至1949年新的政权格局。",
    "note": "以1949年为本分组阅读边界，不表示所有战斗、政治分歧或两岸对立在当年结束。"
  },
  {
    "id": "prc",
    "title": "中华人民共和国：1949年至今",
    "start": 1949,
    "end": 2026,
    "summary": "从建国与社会主义改造，到政治运动、改革开放和当代社会经济变化。",
    "note": "结束刻度是本资料集2026年10月24日的核查快照，不是国家存续终点。主线聚焦中国大陆，香港、澳门及两岸事件另附各自的制度和历史边界。"
  },
  {
    "id": "prc-early",
    "title": "共和国前期：1949—1978",
    "start": 1949,
    "end": 1978,
    "parentId": "prc",
    "summary": "国家制度、经济体制与社会结构的重建，以及大跃进、饥荒和文化大革命等严重曲折。",
    "note": "这是按重大转折组织的阅读分组，不把不同政策、运动和社会经验压缩为单一评价。"
  },
  {
    "id": "reform-opening",
    "title": "改革开放与全球化：1978—2012",
    "start": 1978,
    "end": 2012,
    "parentId": "prc",
    "summary": "经济与社会改革、对外开放和国际联系扩大，同时保留重要政治事件与制度变化。",
    "note": "1978和2012用于组织阅读；改革并非一日启动、也不在2012年停止。香港、澳门与台湾的制度经历不能直接套用大陆分期。"
  },
  {
    "id": "contemporary",
    "title": "当代中国：2012年至今",
    "start": 2012,
    "end": 2026,
    "parentId": "prc",
    "summary": "持续补充经过核查的制度调整、社会变化、公共卫生与经济节点。",
    "note": "本分组的2026年终点只是核查快照；只列已经发生并有直接资料的事件，不把计划、预测或未来目标写成已完成。"
  },
  {
    "id": "postwar-taiwan",
    "title": "战后台湾：1949年至今",
    "start": 1949,
    "end": 2026,
    "summary": "单独呈现台湾的政治制度演变与社会经历，保持与大陆分期的区别。",
    "note": "与大陆阅读分组并列，不推定主权归属或政治隶属关系。结束刻度仅表示本资料集2026年10月24日的核查快照，1949也不是台湾全部战后史的起点。"
  }
] as const;

// References for facts in the period summary that are not implied by child-event membership.
const modernPeriodSupplementalSources: Record<string, string[]> = {
  'civil-war': ['modern-revolution-1949'],
  'postwar-taiwan': ['modern-revolution-1949'],
  'republican-nanjing': ['modern-war-china'],
  'prc-early': ['modern-reform-1978'],
};

export function modernReadingPeriods(events: TimelineEvent[]): Period[] {
  return modernPeriodPlan.map(plan => {
    const relevant = events.filter(event => event.periodIds.includes(plan.id));
    return {
      id: plan.id, title: plan.title, summary: plan.summary, note: plan.note,
      time: { kind: 'duration', start: { year: plan.start }, end: plan.end === 2026 ? { year: 2026, month: 10, day: 24 } : { year: plan.end } },
      ...('parentId' in plan ? { parentId: plan.parentId } : {}),
      entityIds: [], coverage: 'selected',
      sourceIds: [...new Set([...(plan.id === 'republic-1912-1949' || plan.id === 'republican-early' ? ['xinhai-exhibition', 'xinhai-frus-overview'] : []), ...(modernPeriodSupplementalSources[plan.id] ?? []), ...relevant.flatMap(event => event.sourceIds)])],
    };
  });
}

export function reviewedPeriodCoverage(periods: Period[], events: TimelineEvent[]): Period[] {
  // Coverage only states whether this catalog has selected records, never completeness.
  return periods.map(period => ({
    ...period,
    coverage: events.some(event => event.periodIds.includes(period.id)) ? 'selected' : period.coverage,
  }));
}

const backboneAnchors = [
  'xia-erlitou', 'shang-rise', 'yinxu-oracle-bones', 'muye', 'eastern-zhou-move',
  'three-jin', 'shang-yang-reforms', 'qin-unification', 'western-han-founded',
  'zhang-qian', 'han-state-monopolies', 'eastern-han-founded', 'yellow-turbans',
  'chibi', 'western-jin-reunification', 'yongjia-crisis', 'feishui', 'xiaowen-luoyang',
  'sui-reunification', 'sui-grand-canal', 'tang-founded', 'an-shi', 'two-tax',
  'song-founded', 'chanyuan', 'wang-anshi-reforms', 'southern-song-start',
  'yuan-named', 'song-ended', 'ming-founded', 'zheng-he-voyages', 'single-whip-reform',
  'qing-enters-beijing', 'nerchinsk-treaty', 'treaty-nanjing', 'treaty-shimonoseki',
  'abolish-examinations', 'wuchang-uprising', 'sun-inauguration', 'qing-abdication',
];

export function historyBackboneCollections(events: TimelineEvent[]): Collection[] {
  const ordered = [...events].sort((a,b) => dateBounds(a.time.start)[0] - dateBounds(b.time.start)[0] || a.id.localeCompare(b.id));
  const anchors = new Set(backboneAnchors);
  // Modern nodes are already a bounded, sourced backbone rather than a daily news feed.
  const backbone = ordered.filter(event => anchors.has(event.id) || event.time.start.year >= 1913 && event.milestone);
  return [
    {
      id: 'china-through-the-ages', title: '从夏商周到当代', path: '/china-history/collections/china-through-the-ages/',
      description: '把早期国家、帝国建立与分裂、制度和社会转型、近现代战争及改革放在一条连续阅读线上；再从每个节点进入有来源的事件详情。',
      eventIds: backbone.map(event => event.id),
      note: '这是一条跨时代主线，不是无遗漏的通史。夏的传统纪年与考古材料分开说明；现代分期是阅读工具，不将1949年写成所有战事结束。顺序不自动证明因果，解释与推荐节目单独标记。',
    },
    {
      id: 'wars-and-turning-points', title: '战役与战争转折', path: '/china-history/collections/wars-and-turning-points/',
      description: '从先秦争霸、秦汉统一、三国与南北对峙，读到王朝战争、抗日战争和近现代冲突。把战场节点与长期战争过程分开看。',
      eventIds: ordered.filter(event => event.category === 'battle' || event.category === 'war').map(event => event.id),
      note: '单场战役与持续战争分别分类；时间先后不等于单一因果，不把不可靠的兵力、伤亡数字或小说情节当作定论。战役胜负也不代表所有制度和社会变化同时完成。',
    },
  ];
}

export function earlyQingReadingPeriod(events: TimelineEvent[]): Period {
  return {
    id: 'later-jin-early-qing', title: '后金与入关前的清',
    time: { kind: 'duration', start: { year: 1616 }, end: { year: 1644 } },
    entityIds: [], coverage: 'selected',
    summary: '从后金建立、萨尔浒之战到1636年改国号为清，区分政权形成与1644年入关。',
    note: '与明并列的阅读分组，不表示从属于明，也不把清国号前推到1616年。既有清时期仍按1644年入关口径起算。',
    sourceIds: [...new Set(events.filter(event => event.periodIds.includes('later-jin-early-qing')).flatMap(event => event.sourceIds))],
  };
}
