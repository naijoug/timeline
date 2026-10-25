import type { Collection, EventRelation, ReadingSection, Source, TimelineEvent } from '../../core/types';
import { parseDate } from '../../core/time';

// Only the pages and passages named below were reviewed in this batch.
const checkedAt = '2026-10-24';
const src = (id: string, title: string, publisher: string, url: string, type: string, locator: string, version: string): Source => ({
  id, title, publisher, url, type, format: type, locator, version, checkedAt,
});
export const transitionSources: Source[] = [
  src('nmc-qin-han', '古代中国 · 秦汉时期', '中国国家博物馆', 'https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail4.html', '博物馆陈列说明', '第一单元「大一统帝国」；第一组「秦统一中国」、第二组「西汉的强盛」', '在线陈列说明；用于制度概述与前202年建汉纪年'),
  src('nmc-division', '古代中国 · 三国两晋南北朝时期', '中国国家博物馆', 'https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail5.html', '博物馆陈列说明', '第一单元「多民族政权并立与民族融合」；第二单元首段', '在线陈列说明；用于统一、分裂与人口南迁背景'),
  src('aja-western-jin', 'China: Dawn of a Golden Age', 'Victor Cunrui Xiong · American Journal of Archaeology', 'https://ajaonline.org/online-museum-review/378/', '学术期刊展览评论', '正文以「The period covered by “Dawn”」开头的历史背景段', 'AJA 109.1（2005）在线评论；仅采用西晋280—311年短暂统一的分期'),
  src('nmc-sui-tang', '古代中国 · 隋唐五代时期', '中国国家博物馆', 'https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail6.html', '博物馆陈列说明', '第一单元第一组「隋朝的统一」', '在线陈列说明；分别核对581年建国、589年灭陈与618年隋末更替'),
  src('unesco-grand-canal', 'The Grand Canal', 'UNESCO 世界遗产中心', 'https://whc.unesco.org/en/list/1443/', '世界遗产说明', 'Description；Outstanding Universal Value / Brief synthesis 与 criterion (iii)', '在线遗产说明；区分早期河段、隋代整合与后世改建'),
  src('huaibei-grand-canal', '淮北市博物馆：再现大运河繁华盛景', '人民日报海外版 · 淮北市人民政府转载', 'https://www.huaibei.gov.cn/xwzx/mtjj/wmkhb/60223081.html', '博物馆采访报道', '「述说运河繁荣」首段及馆长对漕运作用的说明', '2021-04-06 报道；用其605—610年口径限定隋炀帝时期的扩建阶段'),
  src('nmc-ming-qing', '古代中国 · 明清时期', '中国国家博物馆', 'https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail8.html', '博物馆陈列说明', '第一单元「明朝的建立」；第四单元第一组「满族的兴起与清朝的建立」', '在线陈列说明；仅采用建政、迁都与制度承袭段，不采用页面1911年的清代终年'),
  src('usc-nanjing-treaty', 'Treaty of Nanjing (Nanking), 1842', '南加州大学美中学院', 'https://china.usc.edu/node/20462', '条约英文文本转录', '文首批准书与换约注；条约第II、III、V、VII条', '在线英文转录；日期依据文内签署与换约记载，不采用网页的1901年元数据；未核验条约原件'),
  src('columbia-nanjing-treaty', 'Excerpts from the Treaty of Nanjing, August 1842', '哥伦比亚大学 Asia for Educators', 'https://afe.easia.columbia.edu/ps/china/nanjing.pdf', '条约节录与教学导言', '第1页Introduction；第II、III、V、VII、X条及第3页脚注2', '据J. Mason Gentzler编《Changing China》（1977）的获授权节录；不是原件影印'),
  src('frus-1905-examinations', 'FRUS 1905 · 第211号文书：停科举上谕英译', '美国国务院历史办公室', 'https://history.state.gov/historicaldocuments/frus1905/d211', '同时代外交文书与上谕英译转录', '附件2「Imperial edict of September 2, 1905」；附件3「Imperial edict of September 4, 1905」', '1905-09-04柔克义报告及附件；采用上谕英译正文，不把外交官的概括当作诏令全文'),
];

export const transitionSourceReviews: Record<string, Partial<Source>> = {
  columbia: {
    checkedAt,
    locator: 'Annotated Timeline：Qin与Han段；王朝纪年表Han段',
    version: '本轮复核秦汉制度承接与汉朝前206年的分期口径；其余段落未逐项复核',
  },
  tax: {
    title: '隋、唐', checkedAt,
    type: '税务机构转引研究', format: '税务机构转引研究',
    locator: '正文租庸调制、均田制变化与780年两税法段',
    version: '2019-05-08网页；署摘自陈明光《隋唐王朝赋税的来源于用途》（2013）；未核验期刊原文',
  },
};
const section = (label: string, text: string, sourceIds: string[], locator: string): ReadingSection => ({ label, text, sourceIds, locator });
const event = (id: string, title: string, date: string, category: string, periodIds: string[], entityIds: string[], summary: string, significance: string, details: ReadingSection[], note: string, end?: string): TimelineEvent => ({
  id, title, time: { kind: end ? 'duration' : 'point', start: parseDate(date), ...(end ? { end: parseDate(end) } : {}) },
  category, periodIds, entityIds, summary, significance, details, note,
  sourceIds: [...new Set(details.flatMap(s => s.sourceIds || []))], tags: ['历史脉络', '国家与制度'], milestone: true,
});

export const transitionEvents: TimelineEvent[] = [
  event('western-han-founded', '刘邦建汉：重建帝国秩序', '-202', 'politics', ['han', 'western-han'], ['han', 'western-han'],
    '秦亡后经过楚汉战争，刘邦建立汉朝；汉初以休养生息恢复秩序。',
    '秦的短期统一没有终结帝国制度。汉对既有政治框架作出调整，使王朝更替与制度延续同时发生。', [
      section('从战争到建政', '国博陈列以公元前202年为刘邦建汉之年，并将汉初休养生息与社会经济恢复相联系。', ['nmc-qin-han'], '第一单元第二组「西汉的强盛」'),
      section('制度的承接', '秦汉均以皇帝为中心组织中央与地方统治。哥伦比亚大学年表将汉代概括为对帝国秩序基础的调整和巩固，而非从零开始。', ['nmc-qin-han', 'columbia'], '「大一统帝国」总述；Annotated Timeline / Han'),
    ], '采用前202年建汉口径；另有年表从前206年汉王阶段起算。节点不表示汉代后来的所有制度都在建国时完成。'),
  event('western-jin-reunification', '西晋的短暂统一', '280', 'politics', ['division', 'western-jin', 'wu'], ['western-jin', 'wu'],
    '东汉以后的分裂局面曾被西晋短暂统一，随后再次转向多政权并立。',
    '魏晋南北朝并非三百多年始终不变的分裂：其间有统一、再分裂，以及人口迁徙带来的社会经济变化。', [
      section('统一的节点', 'AJA的展览研究将西晋的短暂统一期记为280—311年。此处以280年标记统一，不以它替代西晋建国日期。', ['aja-western-jin'], '历史背景段：Western Jin from 280 to 311'),
      section('此后的南北格局', '国博陈列把西晋之后的东晋、南朝与十六国、北朝放在并立格局中说明；北方战乱推动人口南迁，促进南方开发。', ['nmc-division'], '第一单元及第二单元首段'),
    ], '年份精度。280—311年是所引研究的统一阶段分期，不是西晋王朝存续期；并列时期不表示彼此隶属。'),
  event('sui-reunification', '隋灭陈，南北再统一', '589', 'politics', ['division', 'southern-dynasties', 'sui'], ['sui'],
    '隋朝建立后，于589年灭陈，结束南北长期政治分立。',
    '把581年建国与589年统一分开，才能理解隋唐国家是在南北长期演变之后重新整合，而非一次改朝换代便全部完成。', [
      section('建国与统一', '杨坚在581年代北周建立隋；589年隋灭陈。两者相隔八年，是不同的政治节点。', ['nmc-sui-tang'], '第一单元第一组「隋朝的统一」'),
      section('走向隋唐的背景', '在隋统一之前，南北各政权之间已经持续发生人口流动与文化交流，不能把政治分裂等同于社会完全隔绝。', ['nmc-division'], '第一单元「多民族政权并立与民族融合」'),
    ], '只采用经核对的公元年份，不将传统历法中的月日直接写成公历日期。'),
  event('sui-grand-canal', '隋代扩建大运河：连接南北供给', '605', 'institution', ['sui'], ['sui'],
    '605—610年，隋炀帝时期扩建并连接河道，形成跨区域的运输网络。',
    '统一不只依靠军队和诏令。运河与漕运把粮食、物资运输及行政需求联系起来，也为后续王朝留下可继续改建的基础设施。', [
      section('本条覆盖的工程阶段', '淮北市博物馆采访报道以605—610年概括隋炀帝时期的南北运河工程，本条据此保留持续区间。', ['huaibei-grand-canal'], '「述说运河繁荣」首段'),
      section('交通与财政的联系', 'UNESCO说明指出，早期河段可追溯到公元前5世纪，隋代才首次按统一帝国交通网络加以组织；后世漕运承担粮食、战略物资运输与相关管理。', ['unesco-grand-canal'], 'Description；Brief synthesis与criterion (iii)'),
    ], '605—610年不是整条大运河从无到有的全部历史，也不是今日京杭运河线路一次建成的日期。', '610'),
  event('ming-founded', '明朝建立：重组统治机构', '1368', 'politics', ['yuan', 'ming'], ['yuan', 'ming'],
    '朱元璋在南京称帝，建立明朝；新王朝随后改革法律、行政、军事与监察制度。',
    '由元入明不仅是更换国号，也涉及皇权与统治机构的重新安排。建国日期与此后的制度改革不能压成同一天。', [
      section('建立与制度调整', '国博陈列记1368年朱元璋在南京建立明朝，并概述建国后制定律例、改革政治、军事和监察制度。', ['nmc-ming-qing'], '第一单元「明朝的建立」'),
    ], '使用建国之年的精度；制度调整是后续过程，本条不将其全部定年为1368年。元与明的阅读归属用于呈现更替，不代表蒙古各政权同年终结。'),
  event('qing-enters-beijing', '清军入关与迁都北京', '1644', 'politics', ['ming', 'qing'], ['ming', 'qing'],
    '清军入关，清廷迁都北京，随后逐步扩展统治；新政权沿用并调整明代制度。',
    '军事征服与制度承袭可以同时发生。1644年是清朝入主北京的重要转折，不是清国号出现或全部征服完成的日期。', [
      section('本条的起点口径', '国博将1644年记为清军入关、清政府迁都北京并开始建立对全国统治的节点；此前已有后金及改国号为清的阶段。', ['nmc-ming-qing'], '第四单元第一组「满族的兴起与清朝的建立」'),
      section('承袭与变化', '清代统治体制多沿袭明代，同时保留八旗等自身组织；此后的中央军政机构也继续演变。', ['nmc-ming-qing'], '第四单元第一组第二段'),
    ], '明清更替与后续战争不在1644年一天完成。本节点采用入关、迁都口径，不把它写成清政权的最早起点。'),
  event('treaty-nanjing', '《南京条约》签订：战败后的通商安排', '1842-08-29', 'diplomacy', ['qing'], ['qing'],
    '第一次鸦片战争后，清政府与英国签订条约，涉及五口通商、割让香港岛和赔款。',
    '从军事失败进入制度性后果：贸易口岸、商人经营方式与财政负担被条约重新规定，对外关系发生重要变化。', [
      section('战争与签署', '哥伦比亚大学导言说明条约是在清政府战败后由英国强加的条件；南加州大学所载英文文本记签署日为1842年8月29日。', ['columbia-nanjing-treaty', 'usc-nanjing-treaty'], '教学节录第1页Introduction；英文转录文首批准书'),
      section('条款的具体影响', '第II条规定广州、厦门、福州、宁波、上海通商；第III条割让香港岛；第V条取消英商只能经公行交易的限制；第VII条列赔款总额2100万银元。', ['usc-nanjing-treaty'], '条约第II、III、V、VII条'),
      section('签署不等于换约', '英文转录注明1843年6月26日在香港交换批准书。教学节录另说明具体关税表须经后续谈判确定。', ['usc-nanjing-treaty', 'columbia-nanjing-treaty'], '文首Ratifications exchanged注；教学节录第3页脚注2'),
    ], '采用文内签署日期，而非网页元数据日期。条约英文转录与节录不是原件；不将后续条约的领事裁判权等内容混入本约。'),
  event('abolish-examinations', '清廷下诏停止科举', '1905-09-02', 'institution', ['qing'], ['qing', 'yuan-shikai'],
    '清廷采纳袁世凯等人的奏请，停止科举考试，推动新式学堂取士。',
    '在1911年革命之前，维系士人教育与入仕的制度已发生重大变化。学校、仕途与国家用人的关系正在重新安排。', [
      section('诏令内容', '9月2日上谕英译规定从丙午年（1906）起停止乡、会试，并停止各省生员考试；已取得功名者仍按其资格安排任用。', ['frus-1905-examinations'], '附件2：beginning with the year ping-wu (1906)段及其后段'),
      section('学校与仕途之外的社会背景', '哥伦比亚大学教学材料说明，经学课程不仅服务于应试，也影响基础教育；继续准备考试又依赖家庭资源或资助。制度转型因此关系到学习内容与机会，并不只是官职选拔方式的替换。', ['columbia-examination-social-context'], 'The Confucian Tradition Institutionalized through the Examination System；Who Took the Civil Service Examinations?'),
      section('改革者的理由与后续', '上谕记载袁世凯等认为保留科举会妨碍扩充学校；9月4日上谕又将学政的职责转向督察各省学校。这里呈现诏令的理由，不将它等同于改革效果的完整评价。', ['frus-1905-examinations'], '附件2开头及Now we have received段；附件3'),
      { label: '编辑解读：停止旧制不等于新制完成', text: '可以把停考、兴学和既有功名者的安排分开观察：旧的晋身道路被关闭，新的学校与任用机制仍须建设。诏令表达改革目标，不足以证明各地教育机会已经平等，也不能单凭它解释后来的革命。', editorial: true },
    ], '节点是1905年诏令颁布日，1906是诏令规定停止乡会试的起始科年，不应混为同一日期。采用同时代英译转录，未核验中文上谕原件；不把废科举写成辛亥革命的单一原因。'),
];

export const transitionRelations: EventRelation[] = [
  { id: 'han-adapts-qin-order', fromEventId: 'western-han-founded', toEventId: 'qin-unification', label: '承接并调整其帝国制度基础', sourceIds: ['nmc-qin-han', 'columbia'], locator: '「大一统帝国」总述；Annotated Timeline / Qin与Han', note: '这是制度承接关系，不表示汉代与秦代制度完全相同；箭头指向前一阶段。' },
  { id: 'qing-inherits-ming-institutions', fromEventId: 'qing-enters-beijing', toEventId: 'ming-founded', label: '承袭其后形成的部分统治体制', sourceIds: ['nmc-ming-qing'], locator: '第四单元第一组第二段', note: '箭头指向明朝建立节点，承袭的是明代逐步形成的体制，不是只指1368年当年的制度；王朝更替不等于制度全盘重建。' },
  { id: 'exam-abolition-yuan-memorial', fromEventId: 'abolish-examinations', entityId: 'yuan-shikai', label: '采纳其等人的停科举奏请', sourceIds: ['frus-1905-examinations'], locator: '附件2开头：Yuan Shih-k’ai and others have memorialized', note: '奏请者为多人；不将制度改革归功于单一人物。' },
];
export const transitionCollection: Collection = {
  id: 'state-transitions', title: '统一、分裂与制度转型', path: '/china-history/collections/state-transitions/',
  description: '从秦汉国家、魏晋分裂与隋唐再统一，读到并存政权、明清更替及帝制向共和的转折；同时观察运河、财政、通商与选官制度。',
  eventIds: ['qin-unification', 'western-han-founded', 'western-jin-reunification', 'sui-reunification', 'sui-grand-canal', 'tang-founded', 'an-shi', 'two-tax', 'song-founded', 'chanyuan', 'southern-song-start', 'yuan-named', 'song-ended', 'ming-founded', 'qing-enters-beijing', 'treaty-nanjing', 'abolish-examinations', 'wuchang-uprising', 'sun-inauguration', 'qing-abdication', 'provisional-constitution'],
  note: '这是一条精选阅读路线，不是完整通史。政治统一不等于制度一次完成，分裂也不等于交流中断；朝代、疆域、人口与财政各有不同的变化节奏。先后排列仅供阅读，不自动表示因果，关系另附来源。',
};
