import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-10-29';
export const greatHealerSources: Source[] = [
  { id: 'writers-healer-dawn-library', title: '大医：破晓篇（下）书目', publisher: '日本国立信息学研究所 · CiNii Books', url: 'https://ci.nii.ac.jp/ncid/BD11161878', type: '图书馆联合书目', checkedAt, locator: '出版项2022.9；注记为2022年9月第1版、2024年3月第2次印刷，两册套装。重印年不是初版年。' },
  { id: 'writers-healer-sunrise-library', title: '大医：日出篇（下）书目', publisher: '日本国立信息学研究所 · CiNii Books', url: 'https://ci.nii.ac.jp/ncid/BD11970401', type: '图书馆联合书目', checkedAt, locator: '出版项2022.12；注记为2022年12月第1版、2024年8月第2次印刷，两册套装。' },
  { id: 'writers-healer-launch-interview', title: '马伯庸谈新书《大医·破晓篇》：医之大者，为国为民', publisher: '夏奕宁、产雨欣 / 澎湃新闻·文化课', url: 'https://www.thepaper.cn/newsDetail_forward_19748415', type: '同期发布会报道与作者自述', checkedAt, publishedAt: '2022-09-03', locator: '9月2日首场发布会；三名主人公并无一比一历史原型；2017年参观院史馆与查阅《申报》的创作回忆。仅用于作品与写作方法，不逐项背书医学史说法。' },
];

export const greatHealerPatch: Partial<TimelineEvent> = {
  time: { kind: 'point', start: { year: 2022, month: 9 } },
  summary: '以早期中国红十字会与公共医疗为背景的历史小说，由《破晓篇》和《日出篇》组成；通过三位青年医者的成长，呈现个人选择与时代变化。',
  significance: '编辑解读：医院不仅是救治场景，也让读者从办学、筹资与救援等日常协作观察社会变化；小说的情感与人物安排不能直接当作历史记录。',
  note: '本节点以2022年9月《破晓篇》出版为起点；《日出篇》为同年12月，不代表全作同月推出。未补造发行日或评分；未逐件核验医学原档，书中旧疗法不作现实医疗建议。',
  sourceIds: ['writers-audit-great-healer', 'writers-healer-dawn-library', 'writers-healer-sunrise-library', 'writers-healer-launch-interview'],
  facts: [
    { label: '分篇出版', text: '上海文艺出版社：《破晓篇》2022年9月，《日出篇》2022年12月。', sourceIds: ['writers-audit-great-healer', 'writers-healer-dawn-library', 'writers-healer-sunrise-library'] },
    { label: '篇与册', text: '全作分两篇；CiNii所载版本中，每篇各有上下两册。“两篇”不等于全作仅两册。', sourceIds: ['writers-healer-dawn-library', 'writers-healer-sunrise-library'] },
  ],
  details: [
    { label: '出版：初版、重印与书讯不是同一天', text: '《破晓篇》《日出篇》分别记为2022年9月、12月初版。图书馆所据实物为2024年的重印本，但注记保留初版年月；《文艺报》2024年11月的介绍也不是首次出版。9月2日发布会与9月3日报道则是《破晓篇》的传播节点，不据此推定精确发行日。', sourceIds: ['writers-healer-dawn-library', 'writers-healer-sunrise-library', 'writers-audit-great-healer', 'writers-healer-launch-interview'], locator: '联合书目出版项及版次注记；同期发布会导语' },
    { label: '创作背景：从院史馆进入普通人的经历', text: '作者在同期报道及后来的自述中，均把2017年参观华山医院院史馆视为创作缘起；他还谈到阅读旧报、访问医生和查阅档案。这些材料说明作者如何寻找故事与时代细节，不意味着本页已经完成对原始医疗文献的独立核验。', sourceIds: ['writers-healer-launch-interview', 'writers-audit-great-healer'], locator: '“用细节拉近现代读者与历史之间的距离”；获奖感言首段' },
    { label: '小说与史实：三位主人公不是三份人物传记', text: '发布会报道概述三名不同出身的青年在1910年进入中国红十字会总医院的故事。马伯庸说明，他们并无一比一对应的真实人物原型。医院与历史事件提供背景，人物相遇、心理和命运仍需作为小说叙述阅读，不能由文学细节反推史实。', sourceIds: ['writers-healer-launch-interview'], locator: '故事简介及主人公历史原型问答' },
    { label: '编辑分析：按分篇读，再用问题连接历史', text: '建议先读《破晓篇》建立人物与机构关系，再读《日出篇》观察选择如何变化。每章可以只记一个问题：谁提供资源、谁承担代价、叙述依据是什么？将书中情节、作者访谈和另查的史料分开记录，比把小说当成医疗史教材更有助于理解。这是编辑阅读路径，不是作者指定的研究结论。', editorial: true, sourceIds: ['writers-audit-great-healer', 'writers-healer-launch-interview'], locator: '据分篇结构与作者对虚实的说明作编辑归纳' },
  ],
  recommendedResources: [
    { id: 'great-healer-launch-reading', title: '马伯庸谈新书《大医·破晓篇》：医之大者，为国为民', creator: '夏奕宁、产雨欣（报道）／马伯庸等（发言）', series: '澎湃新闻·文化课', kind: 'article', url: 'https://www.thepaper.cn/newsDetail_forward_19748415', publishedAt: '2022-09-03', checkedAt, match: '直接讨论三位主人公的原型边界，以及作者如何通过院史馆和旧报寻找叙事细节，适合在开始阅读时对照。', locator: '主人公原型、创作缘起与旧报阅读段落', scopeNote: '已核读报道；发布会为9月2日。文章中的具体治疗、药物与医学史说法未逐项独立复核，不作为现实医疗指导。' },
    { id: 'great-healer-ritan-483', title: 'vol.483 马伯庸：《大医》与生命的重量', creator: '日谈公园；主播小伙子、3000，嘉宾马伯庸', series: '日谈公园 · 小宇宙', kind: 'audio', url: 'https://www.xiaoyuzhoufm.com/episode/6342da882a992d56e91e5b73', checkedAt, match: '节目介绍明确围绕《大医·破晓篇》的调研、写作与医者故事，提供作者如何组织材料的补充视角。', locator: '本期标题、主播嘉宾栏及节目介绍', scopeNote: '已核验具体节目身份和文字介绍，未完整收听或核验音频播放；不引用评论区时间戳作为内容证据，不把评论日期当作首播日。节目解读与史实来源分栏。' },
  ],
};
