import type { Source, TimelineEvent } from '../../core/types';

export const hanMonopolyDepthSources: Source[] = [
  {
    id: 'han-monopoly-wagner', title: 'Ferrous Metallurgy · The Han State Monopoly of the Iron Industry',
    publisher: 'Donald B. Wagner · Science and Civilisation in China（作者公开本）',
    url: 'https://donwagner.dk/SCC36cx.pdf', type: '学术专著章节', checkedAt: '2026-11-03',
    locator: '印刷页171及脚注2；185页《盐铁论》材料性质（PDF第232、246页）',
    version: '定向核读作者公开PDF的上述页段；未逐页阅读全书。第171页并列前117与前119年的研究意见；第185页讨论桓宽对会议材料的扩写整理。',
  },
  {
    id: 'han-monopoly-columbia-debate', title: 'A Record of the Debate on Salt and Iron',
    publisher: '哥伦比亚大学 Asia for Educators · Sources of Chinese Tradition',
    url: 'https://afe.easia.columbia.edu/main_pop/ps/ps_china-debate-salt-iron.htm', type: '传世文献英译与教学材料', checkedAt: '2026-11-03',
    locator: '导言；Longer Selection的始元六年开头与文学、桑弘羊答辩',
    version: '读取《Sources of Chinese Tradition》第2版第1卷（1999）360–363页的在线授权节录；不是汉代原件或会议逐字记录。只用于论辩纪年与文本主张，不证明全国实施效果。',
  },
];

export const hanMonopolyDepthEventPatches: Record<string, Partial<TimelineEvent>> = {
  'han-state-monopolies': {
    time: { kind: 'point', start: { year: -119, approximate: true } },
    summary: '汉武帝时期，盐铁业被纳入国家专卖体系；其财政用途、民生代价与政府逐利的正当性，后来成为盐铁论辩的重要议题。',
    significance: '把官营制度、作坊实物与政策论辩并读，可以观察国家如何筹集资源，以及不同参与者怎样争论这些资源的用途和代价。',
    sourceIds: ['anc-monopolies', 'han-monopoly-wagner', 'han-monopoly-columbia-debate'],
    details: [
      { label: '起点：前119年是一种纪年口径', text: '国博《铁器陶范》说明采用前119年；Wagner在专著第171页及脚注2讨论前117与前119两种研究意见。这里保留约前119年的定位，并明确起始年存在分歧，不把筹议、设官和各地实施压缩为已确定的一天。', sourceIds: ['anc-monopolies', 'han-monopoly-wagner'], locator: '国博正文；Wagner第171页及脚注2' },
      { label: '实物：官营作坊留下什么证据', text: '国博把带有“山阳二”“巨野二”标志的陶范解释为官府经营的第二号冶铸作坊用具。它们让生产组织具有可观察的实物依据，但单组陶范不能证明全国工场的产量、质量或普通家庭负担。', sourceIds: ['anc-monopolies'], locator: '藏品正文后半段：铭文及作坊说明' },
      { label: '后续：前81年的论辩不是制度起始', text: '哥伦比亚大学所载英译将会议置于汉昭帝始元六年，即前81年，讨论的是汉武帝时期延续下来的经济政策。这是后来重新评议政策的节点，不是盐铁官营的创设年份。', sourceIds: ['han-monopoly-columbia-debate'], locator: '导言；Longer Selection首段' },
      { label: '争论：财政用途与政府角色', text: '节录中的桑弘羊以边防支出为保留专卖辩护；文学一方则批评官府与民争利，主张撤除有关措施、重视农业与道德教化。这些是文本呈现的双方论点，不能直接当作全国财政收益或民生损失的统计。', sourceIds: ['han-monopoly-columbia-debate'], locator: 'Longer Selection：文学与桑弘羊两段答辩' },
      { label: '史料边界：会议与成书分开', text: 'Wagner讨论《盐铁论》时指出，桓宽在会议相关材料上扩充议题、组织论辩。因此，传世文本及现代英译能帮助理解政策争议，却不宜当成前81年现场发言的逐字记录；本条也不据节录推定各项制度的最终去留。', sourceIds: ['han-monopoly-wagner', 'han-monopoly-columbia-debate'], locator: 'Wagner第185页；Columbia版本说明与节录范围' },
      { label: '编辑总结：把三个问题分开', text: '官府为什么筹款、生产由谁组织、费用最终由谁承担，是三个相关但不同的问题。器物显示组织方式，论辩展示参与者的理由；要判断社会后果，还需要更广的地方材料，不能以“富国”或“与民争利”一句话替代证据。', editorial: true },
    ],
    note: '约前119年沿用国博口径，同时保留学术研究中的前117年异说；不是前119至前117年连续实施的确定区间。前81年是盐铁会议纪年，不是官营始年或《盐铁论》精确成书年。原事件ID和时间线归属不变，史实依据与现代解读分栏。',
    recommendedResources: [
      {
        id: 'han-salt-iron-primary-reading', title: 'A Record of the Debate on Salt and Iron',
        creator: 'Wm. Theodore de Bary、Irene Bloom 编《Sources of Chinese Tradition》', series: '哥伦比亚大学 Asia for Educators · Primary Sources', kind: 'article',
        url: 'https://afe.easia.columbia.edu/main_pop/ps/ps_china-debate-salt-iron.htm', checkedAt: '2026-11-03',
        match: '并读文学与桑弘羊对农业、边防支出和官府逐利的不同主张，回到具体文本而非现代标签。',
        locator: 'Longer Selection与四道阅读问题。',
        scopeNote: '已读在线英译节录；纸本来源为1999年版，不是网页发布日期。译文不是原件、全文或现场逐字记录，双方主张不等同实施成效。',
      },
      {
        id: 'han-salt-iron-pomeranz-interview', title: 'Ken Pomeranz Answers Five Questions About China’s Early Economy',
        creator: 'Dan Turello 访谈；Kenneth Pomeranz 受访', series: '美国国会图书馆 · Kluge Center / Insights', kind: 'article',
        url: 'https://blogs.loc.gov/kluge/2020/05/ken-pomeranz-answers-five-questions-about-chinas-early-economy/', publishedAt: '2020-05-15', checkedAt: '2026-11-03',
        match: '第一问专门解释盐铁论辩与民生、道德目标的关系，并提醒不要把它简单套入现代自由市场理论。',
        locator: '第一问回答中从The Debates on Salt and Iron到Adam Smith比较的段落。',
        scopeNote: '已读文字访谈的相关段落。这是Pomeranz的现代解释，不是汉代原文；不以其简化战争背景概述作为官营起始年或战争结束的独立证据。',
      },
    ],
  },
};
