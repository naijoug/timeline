import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-10-29';
export const mingMicroscopeSources: Source[] = [
  { id: 'writers-ming-publication-interview', title: '马伯庸重说明朝那些事儿', publisher: '刘悠扬 / 深圳商报（中国作家网转载）', url: 'https://www.chinawriter.com.cn/n1/2019/0125/c405057-30590518.html', type: '同期书目与作者访谈', checkedAt, publishedAt: '2019-01-25', locator: '书封说明：湖南文艺出版社2019年1月；“我有意写一本冷门书”问答。文章日不是图书出版日。' },
  { id: 'writers-ming-library', title: '显微镜下的大明', publisher: '南京信息工程大学图书馆', url: 'https://lib.nuist.edu.cn/info/1383/8309.htm', type: '图书馆书目与阅读介绍', checkedAt, locator: '作者、出版社、出版时间字段；用于交叉核验2019年1月，不把书评赞誉或案例简介当作原档核验。' },
  { id: 'writers-ming-adaptation-interview', title: '专访｜马伯庸：作家做编剧，一定要“放得下、退得出”', publisher: '罗昕 / 澎湃新闻', url: 'https://m.thepaper.cn/newsDetail_forward_21992065', type: '作者改编访谈', checkedAt, publishedAt: '2023-02-21', locator: '导语：原书六案与首篇改编；关于剧书不同和人物动机的问答。采访发生于2月20日，刊发日为2月21日。' },
];

export const mingMicroscopePatch: Partial<TimelineEvent> = {
  time: { kind: 'point', start: { year: 2019, month: 1 } },
  summary: '以徽州丝绢案、黄册库等六组地方历史材料为线索的非虚构作品，聚焦税收、文书与基层治理；不是同名影视剧的剧情年表。',
  significance: '编辑解读：把地方文书转为可阅读的叙事，提供从普通人办事与利益冲突进入制度史的路径；可读性不替代史料核验。',
  note: '出版时间核到2019年1月，未取得具体日；本次核读书目和作者访谈，未逐件核验明代原档，也未观看全剧。不新增未经核定的评分或奖项。',
  sourceIds: ['writers-ming-publication-interview', 'writers-ming-library', 'writers-audit-ming-microscope', 'writers-ming-adaptation-interview'],
  facts: [{ label: '出版记录', text: '湖南文艺出版社，2019年1月。同期访谈与图书馆书目相互印证，未补造发行日。', sourceIds: ['writers-ming-publication-interview', 'writers-ming-library'] }, { label: '作品与改编', text: '原书为六篇非虚构；《显微镜下的大明之丝绢案》取材于其中首篇，不能与整部原书混为一谈。', sourceIds: ['writers-ming-adaptation-interview'] }],
  details: [
    { label: '出版：月份与报道日期分开', text: '同期书封说明与图书馆资料均记为2019年1月出版。1月25日和5月16日是两篇访谈的刊发日，不是图书发行日；本节点只记录到月。', sourceIds: ['writers-ming-publication-interview', 'writers-ming-library'], locator: '同期访谈书封说明；图书馆出版时间字段' },
    { label: '背景与方法：从税案线索到文书阅读', text: '据2019年白雁访谈，作者回忆2014年听朋友讲徽州税案后，转向《丝绢全书》等材料，逐步汇集六篇非虚构。他强调理解文书需要结合制度与地方规则。这是作者对写作过程的自述，不等于本页已经逐件复核原档。', sourceIds: ['writers-audit-ming-microscope'], locator: '第1节写作缘起与六篇组成；第2节史料精读' },
    { label: '传播：改编不是史料的可视化原件', text: '2023年《显微镜下的大明之丝绢案》改编自原书第一篇，而非六案全部。2月21日刊出的罗昕专访中，马伯庸解释人物动机和戏剧结构需要重新组织。影视中的人物经历不能反向当作历史证据；采访时间为2月20日，也不是本书出版时间。', sourceIds: ['writers-ming-adaptation-interview'], locator: '导语与“剧版和书版存在很多不同”问答' },
    { label: '编辑分析：先辨证据，再比较叙事', text: '可按“当事人诉求—文书证据—制度约束”整理阅读笔记，再比较书与剧如何呈现同一矛盾。遇到人物心理或因果解释，分别标记原文书所载、作者归纳和改编创作；不凭一县一案概括整个明朝。这是编辑阅读建议，不是独立史学结论。', editorial: true, sourceIds: ['writers-audit-ming-microscope', 'writers-ming-adaptation-interview'], locator: '依据史料阅读与改编边界作编辑归纳' },
  ],
  recommendedResources: [{ id: 'ming-microscope-adaptation-reading', title: '专访｜马伯庸：作家做编剧，一定要“放得下、退得出”', creator: '罗昕（采访）／马伯庸（受访）', series: '澎湃新闻·文化课', kind: 'article', url: 'https://m.thepaper.cn/newsDetail_forward_21992065', publishedAt: '2023-02-21', checkedAt, match: '以丝绢税分配的视觉呈现为具体例子，解释原书材料为何需要改写成戏剧场景，帮助区分原著与剧作。', locator: '从“纯粹的历史纪实作品”到“剧版和书版不同”的问答', scopeNote: '已核读文字访谈，未播放或验收电视剧；作者自述用于理解改编，不替代历史原档，也不把未来开发计划写成已经播出。' }],
};
