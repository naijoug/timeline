import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-11-07';
export const deathsEndSources: Source[] = [
  { id: 'writers-deaths-end-tor-2016', title: 'Death’s End — ISBN 9780765377104', publisher: 'Tor Books / Macmillan', url: 'https://us.macmillan.com/books/9780765377104/deathsend/', type: '出版社版本书目与授权节选', version: 'ISBN 9780765377104', checkedAt, locator: 'Author、Volume 3、On Sale、ISBN、Book Details；2016-09-20仅属于该ISBN版本，不推定其他地区或格式同步发行。' },
  { id: 'writers-hugo-2017', title: '2017 Hugo Awards', publisher: 'The Hugo Awards / World Science Fiction Society', url: 'https://www.thehugoawards.org/hugo-history/2017-hugo-awards/', type: '奖项官方记录', checkedAt, locator: 'Best Novel决选名单：Death’s End署名Cixin Liu、translated by Ken Liu；入围不等于获奖。' },
  { id: 'writers-hugo-2017-results', title: '2017 Hugo Awards Announced', publisher: 'The Hugo Awards', url: 'https://www.thehugoawards.org/2017/08/2017-hugo-awards-announced/', type: '奖项官方结果公告', checkedAt, locator: '2017年8月11日颁奖说明与BEST NOVEL结果；获奖作品不是Death’s End。' },
  { id: 'writers-liu-mithila-interview', title: 'Cixin Liu: Chinese Readers Care About the Whole Humanity', publisher: 'Mithila Review', url: 'https://mithilareview.com/liu_01_17/', type: '作者访谈（英译）', checkedAt, locator: 'Issue 7（2017年1—3月）；采访Salik Shah、英译Shaoyan Hu署名；末组问答区分采访者对程心的描述与作者对价值观的回应。' },
];

export const deathsEndPatch: Partial<TimelineEvent> = {
  time: { kind: 'point', start: { year: 2010, month: 11 } },
  summary: '《三体》三部曲的终卷承接黑暗森林威慑下的脆弱和平。航天工程师程心从冬眠中醒来，带着危机初期的经历进入新的时代，也卷入文明存续与个人选择的冲突。',
  significance: '编辑总结：终卷提供了一条从威慑机制转向伦理选择的阅读路径。可以比较人物作出决定时掌握的信息、承担的责任和后果，而不把小说中的宇宙规则直接当作现实国际关系定律。',
  sourceIds: ['writers-three-body-chronology', 'writers-deaths-end-tor-2016', 'writers-hugo-2017', 'writers-hugo-2017-results', 'writers-liu-mithila-interview', 'hugo-database'],
  facts: [
    { label: '中文出版', text: '2010年11月；本节点采用中文单行本年月。', sourceIds: ['writers-three-body-chronology'] },
    { label: '英文译介', text: 'Ken Liu（刘宇昆）译；所列Tor版本于2016年9月20日发行，ISBN 9780765377104。', sourceIds: ['writers-deaths-end-tor-2016'] },
    { label: '雨果奖记录', text: '2017年Best Novel决选入围；不是该奖项获奖作品。', sourceIds: ['writers-hugo-2017', 'writers-hugo-2017-results'] },
    { label: '系列位置', text: '《三体》三部曲第三部。', sourceIds: ['writers-deaths-end-tor-2016'] },
  ],
  details: [
    { label: '事件经过：中文出版、英译与评奖分开', text: '中文出版年月为2010年11月。本页所列Tor英译版发行于2016年9月20日，译者为刘宇昆；2017年雨果奖官网将该译本列入最佳长篇小说决选名单。这是同一作品的不同传播阶段，不能用译本日期覆盖中文出版时间，也不能把入围写成获奖。', sourceIds: ['writers-three-body-chronology', 'writers-deaths-end-tor-2016', 'writers-hugo-2017', 'writers-hugo-2017-results'], locator: '年表2010年条；Tor On Sale与译者；Hugo决选名单及结果公告' },
    { label: '故事背景：和平并未消除风险', text: '出版社简介把故事起点放在黑暗森林威慑形成的平衡中：知识与文化交流带来繁荣，也使人类逐渐放松警惕。程心醒来后进入这一局面。这里介绍叙事前提，不展开结局，也不把虚构威慑机制当成现实科学证明。', sourceIds: ['writers-deaths-end-tor-2016'], locator: 'Book Details：Dark Forest Deterrence与Cheng Xin' },
    { label: '作者解释：价值选择与处境', text: '在Mithila Review的访谈中，采访者以程心引出责任问题；刘慈欣回应说，他关注人性、道德和价值体系怎样随人类所处环境变化，并尝试在三部曲中呈现这一点。这是作者对创作的解释，不意味着读者必须接受某一人物选择，也不是现实伦理的实证结论。', sourceIds: ['writers-liu-mithila-interview'], locator: '末组问答；采访Salik Shah，英译Shaoyan Hu' },
    { label: '传播与接受：入围不等于获奖', text: '英译本进入2017年雨果奖最佳长篇小说决选，提供了作品进入英语科幻评奖视野的明确记录。它不等于销量、读者共识或文学价值排名；第一部《三体》的2015年获奖也不能自动归给第三部。', sourceIds: ['writers-hugo-2017', 'writers-hugo-2017-results', 'hugo-database'], locator: '2017年Best Novel名单及结果；2015年Best Novel记录' },
    { label: '编辑分析：把选择放回当时的信息条件', text: '与《黑暗森林》连读时，可分别记录人物当时知道什么、能选择什么、由谁承担代价，再观察后续情节如何改变评价。这样的读法避免只凭结局给人物贴上道德标签，也能区分作者设置的极端困境与读者自己的价值判断。', editorial: true },
  ],
  note: '本节点仍记录2010年11月中文出版。英译日期限定于ISBN 9780765377104，未据此断言所有地区和格式同步发行。2017年雨果奖只确认决选入围；未逐版校勘中文原作或核读初版版权页。作者访谈本次读取英文译文，中文链接超时，未核读中文原文；不据采访者问题代替作者立场。',
  recommendedResources: [
    { id: 'liu-deaths-end-mithila-conversation', title: 'Cixin Liu: Chinese Readers Care About the Whole Humanity', creator: '刘慈欣（受访）；Salik Shah（采访）；Shaoyan Hu（英译）', series: 'Mithila Review · Issue 7（2017年1—3月）', kind: 'article', url: 'https://mithilareview.com/liu_01_17/', checkedAt, match: '末组问答从《死神永生》的程心切入，适合在阅读小说后对照作者对责任、价值观与环境变化的解释。', scopeNote: '已核读英文访谈，含三部曲人物与主题提示；中文原文链接本次超时。作者观点与采访者提问须分开，不是对作品意义的唯一裁定。', locator: '末组问答与采访、翻译署名' },
  ],
};
