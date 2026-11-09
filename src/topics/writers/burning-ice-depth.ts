import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-11-09';
const interview2017 = 'writers-audit-zi-jin-chen-burning-ice';
const interview2024 = 'writers-audit-zi-jin-chen-long-night-twin-stars';
const chronology = 'writers-burning-ice-2017-chronology';
export const burningIceSources: Source[] = [
  { id: chronology, title: '专访《无证之罪》原著作者紫金陈：关于新作品（第3页）', publisher: '都市快报 · 潘卓盈 / 杭州网', url: 'https://hznews.hangzhou.com.cn/wenti/content/2017-09/20/content_6663063_3.htm', type: '作者专访及记者叙事观察', checkedAt, publishedAt: '2017-09-20', locator: '“关于新作品”段：2013年创作、次年出版；较早交代犯罪者身份是记者概括，不是作者逐字自述。' },
];

export const burningIcePatch: Partial<TimelineEvent> = {
  time: { kind: 'point', start: { year: 2014 } },
  summary: '小说以杭州城西为背景，数学教师严良参与案件推理。阅读时既可追踪线索如何被验证，也应把原著与电视剧的地点、职业设定分开。',
  significance: '编辑解读：悬念不只在“谁做的”，也在人物所知与调查所得之间的距离。把小说、作者回忆和影视改编分栏对照，比用剧集梗概替代原著更有帮助。',
  sourceIds: [interview2017, chronology, interview2024],
  facts: [
    { label: '出版年份', text: '暂保留2014年，仅精确到年；首版月份未获补证。', sourceIds: [interview2017, chronology] },
    { label: '原著设定', text: '杭州城西；严良是数学教师，不是剧集中的片警。', sourceIds: [interview2017] },
    { label: '系列关系', text: '与《坏小孩》《长夜难明》作主题对照，不按连续剧情理解。', sourceIds: [interview2024] },
  ],
  details: [
    { label: '出版核验：年份不等于版次证明', text: '2017年专访记载2013年创作、次年出版；2024年访谈却将本作列作“2012年”。两者口径冲突，现保留已有2014年记录，不补首版月日；还需初版版权页或可靠版本书目才能进一步解决。', sourceIds: [chronology, interview2024], locator: '2017年第3页创作与出版段；2024年“何时开始写推理小说”一组问答' },
    { label: '创作缘起：新闻启发不是真案复述', text: '作者在2024年回忆，旧新闻中警方大规模比对指纹的调查启发了小说构思。这是灵感追述，不证明小说复述了真实案件，本页也未独立核查新闻原案。', sourceIds: [interview2024], locator: '“推理三部曲”的故事都有真实参照案例吗' },
    { label: '叙事与改编：分开小说和屏幕', text: '2017年记者指出，小说较早交代犯罪者身份，阅读吸引力也来自推理过程。同篇采访把原著杭州、数学教师的设定与剧集东北、片警的改动分开；这些差异不能反过来填入小说介绍。', sourceIds: [chronology, interview2017], locator: '第3页叙事观察；第1页“关于《无证之罪》”' },
    { label: '系列边界：独立故事与主题对照', text: '2024年采访者指出三部曲各有独立叙事；作者随后分别以个人、家庭、社会层面的悲剧概括三部作品。这是访谈中的阅读框架，不是对现实犯罪成因的实证解释。', sourceIds: [interview2024], locator: '“之间并没有故事关联”提问及作者回应，区分提问与自述' },
    { label: '编辑分析：把信息与证据分栏', text: '读每一段推理时，可以分别记下人物知道什么、调查者能够验证什么，再观察两栏何时出现错位。若同时看改编剧，另开一栏记录场景和职业变化。这是编辑阅读建议，不是作者指定读法，也不预告人物结局。', editorial: true },
  ],
  note: '保留2014年的既有年级精度；两次访谈存在时间口径冲突，未读取初版版权页，不将后来的版本或访谈刊期当作首次出版日。作者回忆、记者概括与编辑分析分开。推荐访谈涉及三部作品的情节和动机，宜读完小说后再看。',
  recommendedResources: [
    { id: 'burning-ice-wenyibao-interview', title: '写作和人生是一个正反馈的过程：专访网络文学作家紫金陈', creator: '张小童（采访）／紫金陈（受访）', series: '文艺报 · 第7版', kind: 'article', url: 'https://wyb.chinawriter.com.cn/content/202402/02/content73422.html', publishedAt: '2024-02-02', checkedAt, match: '对照作者如何从新闻获得灵感，以及他对三部曲主题的回顾。', locator: '真实参照案例、独立叙事两组问答', scopeNote: '已核读具体访谈；包含三部作品的情节和动机，建议读完后阅读。文中年份与2017年报道冲突，不用它改写首版日期。' },
  ],
};
