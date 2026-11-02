import type { Source, TimelineDefinition, TimelineEvent } from '../../core/types';

// The historical event stays authoritative. Idioms are reading contexts, not invented dated events.
export const idiomBackgroundSources: Source[] = [
  {
    id: 'idiom-pofu-moe', title: '破釜沉舟：典源、释义与书证',
    publisher: '教育部《成语典》2020进阶版 · 国家教育研究院',
    url: 'https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=1718&webMd=2',
    type: '辞典与古籍引文', checkedAt: '2026-11-02',
    locator: '典源《史记》卷七·项羽本纪；释义；书证1–4',
    version: '定向核读词条及其原典引文，未校勘《史记》各版本；书证收录顺序不等于词语最早首见顺序。',
  },
  {
    id: 'idiom-caomu-moe', title: '草木皆兵：典源、释义与书证',
    publisher: '教育部《成语典》2020进阶版 · 国家教育研究院',
    url: 'https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=20&webMd=2',
    type: '辞典与古籍引文', checkedAt: '2026-11-02',
    locator: '典源《晋书》卷一一四·苻坚载记下；释义；书证1–3',
    version: '核读所引典源和后世用例；不照搬词条说明的兵力、人物动机或因果判断，不据书证宣布成语首创年。',
  },
  {
    id: 'idiom-jinshu-fujian', title: '《晋书》卷一一四·苻坚载记下',
    publisher: '唐修《晋书》 · 识典古籍电子文本',
    url: 'https://www.shidianguji.com/book/HY2499/chapter/1mb9kwmhn6p86',
    type: '古代史书电子文本', checkedAt: '2026-11-02',
    locator: '“谢石等以既败梁成”后：登城观阵、八公山草木及淝水交战段',
    version: '只对读相关段落，页面其他位置可见转录杂字，未作影印本校勘。与辞典典源同属《晋书》文本，不是两份独立战场证据。',
  },
];

export const idiomBackgroundTimeline: TimelineDefinition = {
  id: 'idiom-backgrounds', themeId: 'china-history', kind: 'curated', parentId: 'china-through-the-ages',
  title: '成语故事的历史背景', path: '/china-history/collections/idiom-backgrounds/',
  description: '精选两例：从巨鹿的“破釜沉舟”和淝水的“草木皆兵”，分清故事背景、史书记述与后世用语。',
  note: '本线按故事所关联事件的背景年代排列，不表示成语在该年首次出现。现收两例，不是完整成语史；史书记述、词语书证与现代释义分开呈现，未核实最早用例时不标注成语诞生日期。',
  entries: [
    { eventId: 'julu', importance: 'supporting', context: '破釜沉舟：前207年是巨鹿战事的背景年代，不是成语首见年。' },
    { eventId: 'feishui', importance: 'supporting', context: '草木皆兵：383年是淝水之战的背景年代，不是成语首创日期。' },
  ],
};

export const idiomBackgroundEventPatches: Record<string, Partial<TimelineEvent>> = {
  julu: {
    sourceIds: ['anc-julu', 'idiom-pofu-moe'],
    tags: ['秦汉', '关键战役', '破釜沉舟', '成语故事'],
    note: '沿用前207年战役锚点，不补造公历月日；秦纪年月份不能直接等同公历月份。这里标记故事背景，不是“破釜沉舟”的首见年，四字说法的最早用例与定型时间尚未核实。',
    details: [
      { label: '事件经过与典故背景', text: '秦末，项羽率楚军救援被秦军围困的巨鹿。《史记·项羽本纪》记他引兵渡河后毁船、破坏炊具，携有限口粮，以示不再退却，继而攻击秦军并切断其运输通道。这是“破釜沉舟”所关联的故事，不是成语首次出现的记录。', sourceIds: ['idiom-pofu-moe'], locator: '典源《史记》卷七·项羽本纪，渡河至断甬道段' },
      { label: '后世用语：词义与书证', text: '“破釜沉舟”后来用来比喻切断退路、决意一搏。《成语典》列出李清《三垣笔记》、陈孝逸书信、史可法奏疏等四字用例。它们说明后世已有这种说法；收例次序不能用来判定最早造词者或首创年份。', sourceIds: ['idiom-pofu-moe'], locator: '释义；书证1–4' },
      { label: '年代与史源边界', text: '前207年用于定位战役，而西汉司马迁《史记》的叙述晚于秦末。这里经辞典所引原文核读，未完成版本校勘或早期文献的穷尽检索，因此不另立“成语诞生”事件，也不把叙事中的兵力和交战次数当作已逐项验证的数据。', sourceIds: ['idiom-pofu-moe'], locator: '典源署名、卷次及战争叙述；本次核读范围' },
      { label: '编辑总结：决心不是完整的战争解释', text: '典故便于记住决心，但断绝退路不是普遍适用的成功方法。阅读时仍需追踪协同、补给与战场条件，不能把胜利只归结为心理姿态。巨鹿是反秦战争的重要转折，也不意味着秦帝国在同一天全部消失。', editorial: true },
    ],
    recommendedResources: [{
      id: 'julu-chiculture-reading', title: '奠定秦朝覆亡的“破釜沉舟”之役——巨鹿之战',
      creator: '陈佳荣', series: '中国文化研究院 · 灿烂的中国文明', kind: 'article',
      url: 'https://www.chiculture.org.hk/sc/china-five-thousand-years/3977',
      publishedAt: '2024-01-08', checkedAt: '2026-11-02', locator: '“巨鹿决战”及历法、渡河地点、新安杀俘附注',
      match: '将援赵、渡河与切断粮道串联，适合与《史记》所引段落对读，并认识战事阶段与历法问题。',
      scopeNote: '教学解读，不替代原典。兵力、人物动机和具体月份不作为本站定论；文中也明示渡河地点与新安杀俘人数存在争议。破釜沉船的动作次序以本页注明的《史记》引文为叙述依据。',
    }],
  },
  feishui: {
    sourceIds: ['anc-feishui', 'idiom-caomu-moe', 'idiom-jinshu-fujian'],
    tags: ['魏晋南北朝', '关键战役', '草木皆兵', '成语故事'],
    note: '383年是故事相关战役的背景年代，不是“草木皆兵”的首见年；四字说法的最早用例与定型时间尚未核实。唐修史书的叙述、明代艺术作品与383年的现场记录须分开，兵力和伤亡数字未列入。',
    details: [
      { label: '战事与史书记述', text: '383年东晋一方在淝水战事中战胜前秦。唐修《晋书·苻坚载记下》叙述，苻坚与苻融登城观察晋军，见部阵严整，又把八公山草木看成人形，显露惧色。这是后世史书对战前情境的记述，不能把人物感受和对话当作已独立核实的现场实录。', sourceIds: ['anc-feishui', 'idiom-jinshu-fujian'], locator: '上博藏品简介的383年；《晋书》“谢石等以既败梁成”后的登城段' },
      { label: '后世用语：词义与书证', text: '“草木皆兵”后来用来形容惊恐中疑神疑鬼。《成语典》所引古文并非直接使用这四字，其“书证”另列梁章钜《归田琐记》及晚清小说等用例。这些收录不能证明成语在383年或《晋书》编成时已经定型。', sourceIds: ['idiom-caomu-moe'], locator: '释义、典源及书证1–3' },
      { label: '年代与史源边界', text: '这里用唐修《晋书》的相关段落核对典故，不宣布它是该故事绝对最早的记载；更早文献谱系与成语首见仍待考证。原文带有神异解释，不能将其当作现实发生的事。上海博物馆的明代《顾绣东山图》展示后世“东山报捷”的文化记忆，也不是383年的战场图像。', sourceIds: ['idiom-jinshu-fujian', 'anc-feishui'], locator: '《晋书》登城段后的神异叙述；上博藏品时代与简介' },
      { label: '编辑总结：不要用成语替代战史', text: '故事可引出对威胁感知的讨论，但不能凭一个成语给历史人物作心理诊断。把战场结果、史家的叙事和后世语言习惯分开，再讨论胜败，能避免把复杂战争缩成一句熟悉的话。', editorial: true },
    ],
  },
};
