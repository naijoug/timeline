import type { Entity, Source, TimelineEvent, TimelineDefinition } from '../../core/types';
import { timelineEntries } from '../../core/timelines';

const checkedAt = '2026-11-02';
export const liBubaiSources: Source[] = [
  { id: 'writers-li-geography-2019-cross', title: '《透过地理看历史》2019年版交叉书目', publisher: '豆瓣读书', url: 'https://book.douban.com/subject/34876875/', type: '用户维护书目（交叉核验）', checkedAt, version: 'ISBN 9787516824511', locator: '作者、台海出版社、2019-12与ISBN字段；不使用评分或用户书评作为出版事实。' },
  { id: 'writers-li-geography-second', title: '《透过地理看历史》二版书目', publisher: '三民网路书店', url: 'https://www.sanmin.com.tw/product/index/009021012', type: '书商版本记录（检索摘录）', checkedAt, version: 'ISBN 9787516827864', locator: '搜索记录2020/11/01、二版、不同ISBN；只支持版次区别，不作为2019版日期的证据。' },
  { id: 'writers-li-three-kingdoms-conflict', title: '《透过地理看历史：三国篇》另一书目日期', publisher: '三民网路书店', url: 'https://www.sanmin.com.tw/product/index/007982639', type: '书商版本记录（日期分歧）', checkedAt, version: 'ISBN 9787558803178', locator: '基本资料同ISBN列2021/07/01、一版；与得到及MegBook的2020年9月不同，差异原因未核定。' },
  { id: 'writers-li-ocean-month-conflict', title: '《透过地理看历史：大航海时代》月份交叉记录', publisher: '当当', url: 'https://product.dangdang.com/29437431.html', type: '书商版本记录（检索摘录）', checkedAt, version: 'ISBN 9787511573537', locator: '搜索索引同ISBN列2022年07月，与三民6月不同；只取共同年份2022。' },
  { id: 'writers-li-ocean-traditional', title: '《用地理看歷史：大航海時代》全二冊', publisher: '城邦读书花园（所载出版社：時報出版）', url: 'https://www.cite.com.tw/book?id=88691', type: '繁体版书商书目', checkedAt, version: 'ISBN 9789571390093', locator: '作者李不白、時報出版、2021-06-08、全二冊。未核读原题版权页与逐章对应，不断言与2022简体本内容逐字相同。' },
  { id: 'writers-li-spring-autumn-cross', title: '《透过地理看历史：春秋篇》交叉书目', publisher: 'MegBook', url: 'https://search.megbook.com.hk/mall/detail.jsp?proID=3938041', type: '书商版本记录（检索摘录）', checkedAt, version: 'ISBN 9787511580481', locator: '搜索索引同ISBN及2024-01-01，与采购记录交叉；采用月精度。' },

  { id: 'writers-li-bubai-profile', title: '《透过地理看历史》：内容与作者简介', publisher: '广东省政协文化和文史资料委员会 · 文史广东', url: 'https://www.gdwsw.gov.cn/zhuanti/tjzqlntygc/tstj/content/post_37044.html', type: '机构图书介绍', checkedAt, publishedAt: '2024-09-12', locator: '内容简介及作者简介；支持地图学与地图编辑背景，不是出生年或完整作品年谱' },
  { id: 'writers-li-geography-2019', title: '《透过地理看历史》2019年台海版', publisher: 'MegBook 书目', url: 'https://www.megbook.com.tw/mall/detail.jsp?proID=3457648', type: '书商版本记录', checkedAt, version: 'ISBN 9787516824511', locator: '搜索索引书目信息：李不白、台海出版社、2019-12；正文直读无有效文字，未核读实物版权页，不将此版认定为绝对首次发表' },
  { id: 'writers-li-three-kingdoms-dedao', title: '《透过地理看历史：三国篇》书目与目录', publisher: '得到', url: 'https://www.dedao.cn/ebook/detail?id=poVrgXBZpKrJvLmo89Q4bD7O1de2aWAqo1mWYgXGPxBMVzqlRNk5j6yEnAa9E576', type: '正版电子书平台书目', checkedAt, locator: '发行日期2020-09-01；内容简介；第七章官渡之战、第十二章赤壁之战等目录。仅核读公开书目与目录，未读付费全文。' },
  { id: 'writers-li-three-kingdoms-print', title: '《透过地理看历史：三国篇》中华地图学社版本', publisher: 'MegBook 书目', url: 'https://www.megbook.com.tw/mall/detail.jsp?proID=3555300', type: '书商版本记录', checkedAt, version: 'ISBN 9787558803178', locator: '搜索索引列中华地图学社、2020-09；与得到所列月份对照。同ISBN三民记录另列2021-07，原因未核定。' },
  { id: 'writers-li-ocean-simplified', title: '《透过地理看历史：大航海时代》简体版', publisher: '三民网路书店', url: 'https://www.sanmin.com.tw/product/index/010708351', type: '书商版本记录', checkedAt, version: 'ISBN 9787511573537', locator: '商品信息：人民日报出版社、2022/06/01；简介。其他书商列2022年7月，本节点保留年精度，不认定首销日。' },
  { id: 'writers-li-spring-autumn', title: '《透过地理看历史：春秋篇》', publisher: '同济大学图书汇采平台', url: 'https://pickbuy.tongji.edu.cn/Baseinfo/Product?ID=14334758', type: '高校图书采购书目', checkedAt, version: 'ISBN 9787511580481', locator: '搜索索引所列书目信息：人民日报出版社、2024-01；公开页面内容简介。采购供应商书目不是馆藏MARC或已借阅实物版权页。' },
  { id: 'writers-li-warring-states', title: '《透过地理看历史：战国篇》馆藏书目', publisher: '对外经济贸易大学图书馆', url: 'https://opac.lib.uibe.edu.cn/opac/book/c7a5193e3c25c103efb9a4a6549fca70', type: '高校馆藏书目（检索摘录）', checkedAt, version: 'ISBN 9787511583468', locator: '检索结果载出版发行项：北京，人民日报出版社，2024.08。直页本次读取超时，未声称读过实物或完整馆藏页；与书商记录交叉核对。' },
  { id: 'writers-li-warring-states-print', title: '《透过地理看历史：战国篇》出版记录', publisher: 'MegBook 书目', url: 'https://www.megbook.com.hk/mall/detail.jsp?proID=4018449', type: '书商版本记录', checkedAt, version: 'ISBN 9787511583468', locator: '搜索索引列李不白、人民日报出版社、2024-08；与高校馆藏检索摘录交叉，不补造发行日。' },
];

export const liBubaiEntity: Entity = { id: 'li-bu-bai', name: '李不白', type: '历史地理通俗写作者', sourceIds: ['writers-li-bubai-profile'] };

const entry = (id: string, title: string, year: number, month: number | undefined, summary: string, publisher: string, isbn: string, sourceIds: string[], versionNote: string, reading: string): TimelineEvent => ({
  id, title, time: { kind: 'point', start: { year, ...(month ? { month } : {}) } },
  category: 'history-geography', entityIds: ['li-bu-bai'], periodIds: ['era-history-geography-reading'], milestone: true,
  summary, significance: '将这一个版本放回出版顺序，观察作者从中国区域、战争专题到全球航路的写作范围。出版年份是书目时间，不是书中历史事件的年代。',
  sourceIds, tags: ['李不白', '透过地理看历史', '历史地理', '版本出版'],
  facts: [{ label: '所据出版社', text: publisher, sourceIds }, { label: '所据版本 ISBN', text: isbn, sourceIds }, { label: '记录范围', text: '已核读公开书目及简介，未宣称读完本书或核过实物版权页', sourceIds }],
  details: [
    { label: '内容与切入点', text: summary, sourceIds, locator: '所引书目内容简介及公开目录' },
    { label: '出版与版本边界', text: versionNote, sourceIds, locator: '版本书目、ISBN与日期字段；证据强度和访问限制见下方来源定位' },
    { label: '编辑阅读建议', text: reading, editorial: true },
    { label: '编辑分析：地理不是唯一答案', text: '可先辨认山川、通道与行动距离，再追问资源、制度、选择和偶然因素。地图帮助建立空间问题，却不能单独证明历史因果；通俗作品中的解释还应与原典和研究互证。', editorial: true },
  ],
  note: versionNote,
});

export const liBubaiEvents: TimelineEvent[] = [
  entry('li-bu-bai-geography-history-2019', '《透过地理看历史》：2019年台海版', 2019, 12,
    '以中国的地理区域为组织线索，将地形与历代事件放在一起讲解；适合作为历史空间阅读的入口。', '台海出版社', '9787516824511', ['writers-li-geography-2019', 'writers-li-geography-2019-cross', 'writers-li-geography-second', 'writers-li-bubai-profile'],
    '本节点采用所引书商的2019年12月台海版记录，不认定为作品绝对首次发表。2020年另有不同ISBN的二版记录；两个版次不能当成两部新作品，具体增删尚未逐版核读。',
    '先选一个熟悉区域，对照书目提出的地理视角和该地不同时期的事件。读完一节可以自己标出地点，但不从现代地图直接反推古代河道或疆界。'),
  entry('li-bu-bai-three-kingdoms-2020', '《透过地理看历史：三国篇》：2020年版书目记录', 2020, 9,
    '通过地理视角串联三国战争与战略。公开目录包含官渡、赤壁、汉中、夷陵等专题，可从熟悉的战役进入，再连成历史脉络。', '中华地图学社', '9787558803178', ['writers-li-three-kingdoms-dedao', 'writers-li-three-kingdoms-print', 'writers-li-three-kingdoms-conflict'],
    '得到列发行日期2020-09-01，同ISBN书商记录也列2020年9月；三民对同ISBN另列2021年7月，差异原因未核定。这里采用交叉支持的2020年9月版本记录，不补确切首销日，也不把2021年另算新作首发。',
    '可先看公开目录中的官渡专题，再回到史料辨认官渡、阳武与粮道等问题。这里核读的是目录而非全章，不能把目录中出现某战役当作已验证书中全部地理判断。'),
  entry('li-bu-bai-ocean-2022', '《透过地理看历史：大航海时代》：2022年简体版', 2022, undefined,
    '从航路开拓看15世纪中后叶至17世纪末的跨区域联系，结合地形、季风和洋流讨论远洋活动及其影响。', '人民日报出版社', '9787511573537', ['writers-li-ocean-simplified', 'writers-li-ocean-month-conflict', 'writers-li-ocean-traditional'],
    '记录2022年人民日报出版社简体版。书目存在6月与7月差异，暂只用年份；2021年已有题为《用地理看历史：大航海时代》的繁体版本记录，未逐页核对原题版权和内容对应，不能把2022年写成所有版本的最早出版年。',
    '在中国专题之后扩展到海上交通。阅读时把自然条件、技术、贸易与殖民活动分别列出，避免把对不同社会的影响压缩成单一的“航海进步”故事。'),
  entry('li-bu-bai-spring-autumn-2024', '《透过地理看历史：春秋篇》：2024年版', 2024, 1,
    '围绕春秋诸侯与战争，用地理位置、交通和形势变化辅助理解事件之间的联系。书目将地图与历史叙述并列为阅读入口。', '人民日报出版社', '9787511580481', ['writers-li-spring-autumn', 'writers-li-spring-autumn-cross'],
    '同济图书采购书目列2024年1月。这里记录该ISBN版本，不以采购页面或介绍文章的更新日期代替出版年月；未核实逐章全文及版权页实物。',
    '可与战国篇按所讲历史的先后并读。注意历史时序与两本书的出版时序是两回事；地名、联盟和势力范围也会随事件变化，不能用一张图概括整个春秋。'),
  entry('li-bu-bai-warring-states-2024', '《透过地理看历史：战国篇》：2024年版', 2024, 8,
    '以战国时期重大事件与战争为线索，观察诸侯形势及统一进程。空间关系可辅助理解竞争格局，但仍需分辨具体时期与史料依据。', '人民日报出版社', '9787511583468', ['writers-li-warring-states', 'writers-li-warring-states-print'],
    '高校馆藏检索记录与书商目录均支持2024年8月、人民日报出版社及所列ISBN。馆藏直页本轮超时，因此明确保留检索摘录的访问边界；不补造出版日。',
    '接续春秋篇时，先检查作者采用的阶段划分，再比较同一区域在不同事件中的作用。不要把后来的秦统一结果倒推为各国当时必然知道的结局。'),
];
export const liBubaiTimeline: TimelineDefinition = {
  id: 'li-bu-bai', themeId: 'writers', kind: 'entity', title: '李不白作品年谱', path: '/writers/authors/li-bu-bai/',
  description: '从《透过地理看历史》系列的五个版本出版节点，进入历史与地理的结合阅读。',
  note: '精选五个版本节点，不是完整生平或完整书目。逐条说明书目差异，无法确定的月份采用年精度；同书修订、改题和繁简版本不当成不同原创作品。作者简介有地图学与地图编辑背景依据，不补造出生日期、奖项或销量。',
  entries: timelineEntries(liBubaiEvents.map(event => event.id)),
};
