import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-10-25';

// This batch reviews two existing novels, not the author's complete bibliography.
export const zijinReviewedSources: Source[] = [
  {
    id: 'writers-bad-kids-xinhua', title: '《坏小孩》书目与版本参数', publisher: '新华书店网上商城',
    url: 'https://item.xhsd.com/items/110000100120645', type: '发行商书目', checkedAt,
    version: 'ISBN 9787540468422',
    locator: '普通信息：出版社为湖南文艺，出版／首版时间为2014-08-01，印刷时间为2018-07-01；仅采用出版年月，不认定精确首销日',
  },
  {
    id: 'writers-bad-kids-pushkin-uk', title: 'Bad Kids — UK paperback', publisher: 'Pushkin Press（英国站）',
    url: 'https://pushkinpress.com/book/bad-kids/', type: '出版社书目与作品简介', checkedAt,
    version: 'ISBN 9781782277620；英国平装版',
    locator: 'ISBN、Published（4th August 2022）、Format；张东升、朝阳和朋友以录像勒索的简介',
  },
  {
    id: 'writers-bad-kids-pushkin-us', title: 'Bad Kids — US paperback', publisher: 'Pushkin Press（美国站）',
    url: 'https://us.pushkinpress.com/book/bad-kids/', type: '出版社区域发行书目', checkedAt,
    version: 'ISBN 9781782277620；美国站平装版记录',
    locator: 'ISBN、Published（6th June 2023）、Format；与英国站同ISBN但地区发行日期不同',
  },
  {
    id: 'writers-bad-kids-cwa', title: 'Bad Kids — Crime Fiction in Translation Dagger 2023', publisher: 'The Crime Writers’ Association',
    url: 'https://thecwa.co.uk/past-winners/bad-kids/', type: '奖项主办方记录', checkedAt,
    locator: 'Crime Fiction in Translation Dagger 2023；Shortlisted；Zijin Chen；tr. Michelle Deeter；Published by Pushkin Press',
  },
  {
    id: 'writers-zijin-childhood-interview', title: '《隐秘的角落》原著作者：致敬每一个曾被伤害过的成年人', publisher: '人民网文化频道 / 中国作家网',
    url: 'https://www.chinawriter.com.cn/n1/2020/0627/c405057-31760447.html', type: '作者访谈', checkedAt,
    publishedAt: '2020-06-29',
    locator: '郭冠华采访；页面署名日期2020-06-29（不是URL中的0627）；创作背景、小说与改编区别、电影节奏三个问答',
  },
  {
    id: 'writers-zijin-character-interview', title: '专访紫金陈：我会站在每个角色身后，思考逻辑是否自洽', publisher: '潮新闻',
    url: 'https://tidenews.com.cn/news.html?id=2705191&source=1', type: '作者访谈', checkedAt,
    publishedAt: '2024-02-02',
    locator: '张小童专访；一、创作：检察官题材与工具书、三作各自独立；二、品质：人物视角与反复改稿；不是文中2023年直播的逐字稿',
  },
  {
    id: 'writers-long-night-library', title: '《长夜难明》馆藏书目', publisher: '对外经济贸易大学图书馆',
    url: 'https://opac.uibe.edu.cn/opac/book/7cb1f1fd9c260a6a1ac5de2b5e3d1093', type: '高校馆藏书目', checkedAt,
    version: 'ISBN 9787222143975',
    locator: '出版发行项：云南人民出版社、2017；提要文摘：检察官等人的十年斗争。核读检索返回的完整书目字段，直连本次超时',
  },
  {
    id: 'writers-long-night-edition', title: '《长夜难明》图书版本参数', publisher: '北方图书城',
    url: 'https://www.96192.com/product/detail/719478', type: '发行商书目', checkedAt,
    version: 'ISBN 9787222143975；版次1',
    locator: '商品参数：出版年月2017-01-01、云南人民出版社、版次1；仅采用年月。核读检索返回字段，直连本次超时',
  },
  {
    id: 'writers-long-night-biennial', title: '第二届网络文学双年奖揭晓 70后作家酒徒拿到金奖', publisher: '都市快报 / 中国作家网',
    url: 'https://www.chinawriter.com.cn/n1/2017/1106/c404023-29629082.html', type: '颁奖报道与获奖名单', checkedAt,
    publishedAt: '2017-11-06',
    locator: '获奖名单→铜奖作品（6部）列《长夜难明》；报道日期与小说出版月份分开',
  },
];

export const zijinReviewedEvents: TimelineEvent[] = [
  {
    id: 'zi-jin-chen-bad-kids', title: '《坏小孩》',
    time: { kind: 'point', start: { year: 2014, month: 8 } },
    category: 'suspense', periodIds: ['era-screen-and-bestseller'], entityIds: ['zi-jin-chen'], milestone: true,
    summary: '张东升以为山崖上的谋杀无人知晓，朱朝阳和朋友却意外录下现场。孩子们选择以录像勒索，故事由此转向彼此试探与命运失控。',
    significance: '小说后来改编为《隐秘的角落》；Michelle Deeter英译本在2023年进入CWA翻译犯罪小说匕首奖短名单。改编、译介与奖项入围是不同的传播经历。',
    sourceIds: ['writers-bad-kids-xinhua', 'writers-bad-kids-pushkin-uk', 'writers-bad-kids-pushkin-us', 'writers-bad-kids-cwa', 'writers-zijin-childhood-interview'],
    tags: ['悬疑', '社会派', '朱朝阳', '隐秘的角落', '坏小孩', '紫金陈'],
    facts: [
      { label: '节点类型', text: '中文单行本出版，按书目月份记录', sourceIds: ['writers-bad-kids-xinhua'] },
      { label: '出版机构', text: '湖南文艺出版社；ISBN 9787540468422', sourceIds: ['writers-bad-kids-xinhua'] },
      { label: '英文译者', text: 'Michelle Deeter', sourceIds: ['writers-bad-kids-cwa'] },
      { label: '奖项状态', text: '2023 CWA Crime Fiction in Translation Dagger短名单入围，非获奖', sourceIds: ['writers-bad-kids-cwa'] },
    ],
    details: [
      { label: '小说内容：录像让旁观者进入事件', text: '出版社简介以张东升杀害岳父母、被朝阳和朋友拍到为开端；孩子们把录像变成勒索筹码。这里保留小说的叙事起点，不把电视剧中的人物改名、求助动机或结局直接写回原著。', sourceIds: ['writers-bad-kids-pushkin-uk', 'writers-zijin-childhood-interview'], locator: 'Pushkin作品简介；访谈导语及“纯粹的恶”与改编问答' },
      { label: '创作背景：作者如何选择青少年题材', text: '紫金陈在2020年访谈中回忆，妻子怀孕使他关注青少年题材，并把部分童年感受带入人物。他同时区分小说与面向大众的影视表达；这是作者对创作的回顾，不是家庭经历必然导致犯罪的社会科学结论。', sourceIds: ['writers-zijin-childhood-interview'], locator: '“第一考虑是故事好看，希望引起大家思考”；“《坏小孩》色调偏暗”两组问答' },
      { label: '版本与传播：同一ISBN也要看发行地区', text: '中文节点采用新华书店书目中的2014年8月版，不使用其2018年印刷时间。Pushkin英国站列英文平装版2022年8月4日，美国站对同一ISBN列2023年6月6日；CWA则记录2023年短名单入围，不能读成获奖或中文版出版日。', sourceIds: ['writers-bad-kids-xinhua', 'writers-bad-kids-pushkin-uk', 'writers-bad-kids-pushkin-us', 'writers-bad-kids-cwa'], locator: '新华普通信息；两地区Published栏；CWA的Shortlisted和译者栏' },
      { label: '编辑解读：比较两种悬念', text: '可先看人物掌握的信息如何改变，再比较原著与改编怎样引导观众同情某个角色。这样读，比把故事当作未成年人心理报告或用剧集情节替代小说更能看清叙事选择。', editorial: true },
    ],
    note: '保留2014年8月的书目月份，不把发行商字段中的“1日”认定为首销日，也未核定最早网络连载起止。中文成书、2020年改编讨论、英美发行与2023年入围不能合并为一次出版；CWA网址虽含past-winners，正文状态明确为Shortlisted。',
    recommendedResources: [{
      id: 'zijin-bad-kids-childhood-conversation', title: '《隐秘的角落》原著作者：致敬每一个曾被伤害过的成年人',
      creator: '紫金陈（受访）；郭冠华（采访）', series: '人民网文化频道访谈 · 中国作家网转载', kind: 'article',
      url: 'https://www.chinawriter.com.cn/n1/2020/0627/c405057-31760447.html',
      match: '直接比较小说与影视的表达选择，并解释作者为何从父母与孩子的关系切入；适合读完小说后对照阅读。',
      scopeNote: '含人物和情节讨论；作者的童年回顾与教育看法不作为普遍心理因果证据。已核读文字，页面署名为2020-06-29，不用URL里的日期或访谈日期替代出版日期。',
      locator: '创作背景问答；“纯粹的恶”与改编问答；“写小说兼顾改编难度”', publishedAt: '2020-06-29', checkedAt,
    }],
  },
  {
    id: 'zi-jin-chen-long-night', title: '《长夜难明》',
    time: { kind: 'point', start: { year: 2017, month: 1 } },
    category: 'suspense', periodIds: ['era-screen-and-bestseller'], entityIds: ['zi-jin-chen'], milestone: true,
    summary: '检察官江阳与警察、法医、律师等人追查侯贵平旧案，历经十年的阻碍与代价。故事追问的不只是案件真相，也包括让真相被看见有多困难。',
    significance: '作品获第二届网络文学双年奖铜奖，后来改编为《沉默的真相》。奖项记录和作者访谈提供了理解其传播与创作目标的入口，不以未注明时间的评分代替评价。',
    sourceIds: ['writers-long-night-library', 'writers-long-night-edition', 'writers-long-night-biennial', 'writers-zijin-character-interview', 'writers-zijin-childhood-interview'],
    tags: ['悬疑', '社会派', '江阳', '沉默的真相', '长夜难明', '紫金陈'],
    facts: [
      { label: '节点类型', text: '中文单行本出版；2017年1月版', sourceIds: ['writers-long-night-library', 'writers-long-night-edition'] },
      { label: '出版机构', text: '云南人民出版社；ISBN 9787222143975', sourceIds: ['writers-long-night-library'] },
      { label: '文学奖项', text: '2017年第二届网络文学双年奖铜奖', sourceIds: ['writers-long-night-biennial'] },
      { label: '影视改编', text: '《沉默的真相》；不是原著另一个初版书名', sourceIds: ['writers-zijin-childhood-interview'] },
    ],
    details: [
      { label: '小说内容：从个人查案到多人共同承担', text: '馆藏提要将故事概括为检察官、刑警、法医和律师等人与犯罪团伙持续十年的斗争；作者访谈点明了为侯贵平翻案这一线索。这里介绍人物关系与核心处境，不用剧集场景或最终布局替代原著梗概。', sourceIds: ['writers-long-night-library', 'writers-zijin-character-interview'], locator: '馆藏提要文摘；潮新闻“一、创作”中三部作品与原型案例问答' },
      { label: '创作背景：把检察官带进类型小说', text: '紫金陈在2024年访谈中说，一位熟悉的最高检新媒体中心负责人建议他尝试检察官视角，并推荐刑事诉讼法和检察官法作为资料。他据此准备职业背景；这属于作者自述，不意味着小说是某宗真实案件的完整复原，也不是法律实务指南。', sourceIds: ['writers-zijin-character-interview'], locator: '“一、创作”→《长夜难明》题材缘起及两本法学工具书的回答' },
      { label: '传播记录：出版、获奖与改编分开', text: '2017年云南人民出版社书目与发行商的1月版次记录对应本节点；同年11月的双年奖名单将作品列为铜奖。2020年作者访谈谈的是《沉默的真相》改编尚待上线的期待，不能把这篇访谈当成剧集首播公告，也不能把剧集评分当成小说自身的文学地位。', sourceIds: ['writers-long-night-library', 'writers-long-night-edition', 'writers-long-night-biennial', 'writers-zijin-childhood-interview'], locator: '书目出版发行项与版本参数；获奖名单“铜奖作品”；2020访谈最后一组改编问答' },
      { label: '编辑解读：把“知道”与“能够证明”分开', text: '阅读时可分别追踪谁知道真相、谁有证据、谁愿意承担公开它的代价。与《坏小孩》并读，能比较信息被用来勒索还是寻求正义；这是编辑的主题比较，不把同属“推理之王”理解为连续剧情。', editorial: true },
    ],
    note: '节点按2017年1月版记录，未把书目默认的1日认定为精确首销日。两份书目字段可由检索读取，本次直连超时；未核定网络连载起止。2017年11月奖项、2020年改编访谈和2024年创作回顾均不是小说初版日期；不把“三部曲”称为作者已封笔的终结篇。',
    recommendedResources: [{
      id: 'zijin-long-night-character-conversation', title: '专访紫金陈：我会站在每个角色身后，思考逻辑是否自洽',
      creator: '紫金陈（受访）；张小童（采访）', series: '潮新闻 · 作家专访', kind: 'article',
      url: 'https://tidenews.com.cn/news.html?id=2705191&source=1',
      match: '定位检察官题材缘起，再看作者如何代入不同人物、反复重写，用创作方法理解小说的道德选择与推理逻辑。',
      scopeNote: '含三部小说与《双星》的人物、情节讨论。2024-02-02是文章发布日期；文中回忆2023年活动，不据此声称核看过直播或将访谈日当成书的出版日。作者自述不等于独立效果评估。',
      locator: '一、创作：检察官题材缘起；二、品质：人物逻辑与反复改稿', publishedAt: '2024-02-02', checkedAt,
    }],
  },
];
