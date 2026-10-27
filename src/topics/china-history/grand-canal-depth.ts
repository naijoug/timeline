import type { Source, TimelineEvent } from '../../core/types';

// A review of one existing duration, not a new event or a claim to audit the whole topic.
export const grandCanalDepthSources: Source[] = [
  {
    id: 'canal-he-cultural-history', title: '大运河：宝贵的遗产 流动的文化',
    publisher: '贺云翱 · 中国非物质文化遗产网（转自中国民族报）',
    url: 'https://www.ihchina.cn/Article/Index/detail?id=22732', type: '学者历史概述', checkedAt: '2026-10-27',
    locator: '「中华先民千年智慧与持续创造的结晶」隋唐、元朝及明清段；「多元一体中华文化的经典符号」征役段',
    version: '页面创建于2021-04-12；定向读取都城轴心、后世改线、养护与征役。未核验其征工人数，故不采用数量；不采用文明优劣、唯一原因或全线通航的概括。',
  },
  {
    id: 'canal-he-archaeology', title: '大运河考古：激活历史记忆，谱写新的篇章',
    publisher: '贺云翱 · 南京大学（转自南京日报）',
    url: 'https://www.nju.edu.cn/info/1056/350301.htm', type: '学者考古成果概述', checkedAt: '2026-10-27',
    locator: '「运输遗迹考古硕果累累 更多领域期待“上新”」之（三）第2项回洛仓、第3项含嘉仓',
    version: '南京大学网页2023-12-15；读取粮仓考古概述而非发掘报告或原始铭文。两篇贺云翱文章为同一作者，不当作两个独立研究团队；不采用网页申遗月日。',
  },
];

export const grandCanalSourceReviews: Record<string, Partial<Source>> = {
  'unesco-grand-canal': {
    checkedAt: '2026-10-27', locator: 'Description；Brief synthesis；Authenticity',
    version: '本轮重读遗产说明，区分前5世纪以来分段工程、隋代统合与后世发展；遗产总范围和现存工程不是605—610年的施工清单。',
  },
  'huaibei-grand-canal': {
    checkedAt: '2026-10-27', locator: '「述说运河繁荣」首段与馆长关于粮食、军力运输的说明；文末文章来源',
    version: '人民日报海外版原文2021-04-06，淮北转载页2021-06-02；保留605—610工程区间。不把展厅木雕复原场景当作隋代实录，也不采用工程里程或船员人数。',
  },
};

export const grandCanalDepthEventPatches: Record<string, Partial<TimelineEvent>> = {
  'sui-grand-canal': {
    significance: '把粮食运到都城，需要河道、仓储、人员和持续养护共同运作。隋代扩建是制度与交通整合的重要阶段，却不是大运河全部历史的起点，也不能用后世收益抹去当时的征役负担。',
    sourceIds: ['unesco-grand-canal', 'huaibei-grand-canal', 'canal-he-cultural-history', 'canal-he-archaeology'],
    details: [
      { label: '背景：连接已有河段，而非从零开挖', text: 'UNESCO将早期河段追溯至公元前5世纪，并把7世纪隋代视为统一交通网络的整合阶段。隋代工程利用和连接既有水道，不能把整个网络说成某位皇帝一次创造。', sourceIds: ['unesco-grand-canal'], locator: 'Description首段：分段建设与隋代统一交通构想' },
      { label: '经过：605—610年是本条的工程窗口', text: '淮北市博物馆采访报道以605—610年概括隋炀帝时期的扩建，列出永济渠、通济渠、邗沟和江南河。本站保留这个年份区间，不把各段开工、完工压成同一天，也不把它扩展为所有隋代水利工程的工期。', sourceIds: ['huaibei-grand-canal'], locator: '「述说运河繁荣」首段' },
      { label: '作用：运输连接财政与军事供给', text: 'UNESCO强调粮食和战略物资运输，淮北报道也介绍粮食北运与军力输送。贺云翱的概述把隋唐网络的轴心放在长安、洛阳：理解它，应先问当时物资运往哪里，而不是直接套用今日北京—杭州的路线。', sourceIds: ['unesco-grand-canal', 'huaibei-grand-canal', 'canal-he-cultural-history'], locator: 'UNESCO Description；淮北馆长的漕运说明；贺文隋唐段' },
      { label: '具体证据：河道之外还有粮仓', text: '贺云翱的考古概述介绍，回洛仓遗址揭示大型官仓的布局与仓窖形制，含嘉仓则为研究储粮方法和漕运管理提供资料。这些遗址帮助理解运输和仓储的配合；该文不是原始发掘报告，不能据此算出隋代每年的实际运粮量。', sourceIds: ['canal-he-archaeology'], locator: '（三）大运河运输遗迹考古：第2项回洛仓、第3项含嘉仓' },
      { label: '代价与后续：劳役不会因长期收益而消失', text: '贺云翱同时提醒开挖、疏浚依靠大量征役。其概述另述元代会通河、通惠河建设及明清治水养护：后世改变和维护了网络。这里不采用尚未核对原始记载的征工数字，也不把运河单独认定为隋亡的充分原因。', sourceIds: ['canal-he-cultural-history'], locator: '征役段；元朝改建与明清治理段' },
      { label: '编辑总结：把工程放回持续运作的社会', text: '与其只问“谁修了运河”，不如一起观察河道、粮仓、都城需求与劳动者。长远交通价值和当时的社会负担可以同时存在；一项工程留下来，也不等于原来的政权、路线和管理方式都原封不动地延续。', editorial: true },
    ],
    note: '605—610年仅指所引报道的隋炀帝扩建阶段；不是所有河段的起源或大运河从无到有的全部历史，也不是后来的京杭路线一次建成。隋唐、元明清及现代遗存须分期理解；展厅复原、学者概述与原始考古报告不等同。',
    recommendedResources: [{
      id: 'nju-grand-canal-archaeology-reading', title: '大运河考古：激活历史记忆，谱写新的篇章',
      creator: '贺云翱', series: '南京大学 · 媒体传真（来源：南京日报）', kind: 'article',
      url: 'https://www.nju.edu.cn/info/1056/350301.htm', publishedAt: '2023-12-15', checkedAt: '2026-10-27',
      match: '从回洛仓、含嘉仓等具体遗址理解水运如何与仓储相配合，为本节点的供给网络补上可观察的物质证据。',
      locator: '「运输遗迹考古硕果累累 更多领域期待“上新”」之（三）第2、3项；可对读工程本体与运输遗迹两节。',
      scopeNote: '已读取文章及作者、来源、网页日期；这是成果概述，不是发掘报告全文。推荐采用的粮仓段另在事实依据中定位；不背书全文所有宏观评价，不把各朝遗存都定年为605—610年。',
    }],
  },
};
