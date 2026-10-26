import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-10-26';
export const liuReviewedSources: Source[] = [
  { id: 'writers-liu-chronology', title: '刘慈欣文学年谱', publisher: '李浩 /《东吴学术》2024年第5期；中文科幻转载', url: 'https://www.chinasf.com/main/documentdetail.php?DocumentID=21137', type: '学术年谱', checkedAt, locator: '1990年创作起点条；2003年1月《超新星纪元》、2004年7月《球状闪电》条目；原刊目录另行核对，本文非初版版权页影像' },
  { id: 'writers-liu-chronology-issue', title: '《东吴学术》2024年第5期目录', publisher: '苏州工学院学术期刊编辑中心', url: 'https://soochow.academic.szut.edu.cn/qkml/a2024ndqk/dwq/1.htm', type: '期刊官方目录', checkedAt, locator: '学术年谱：刘慈欣文学年谱，李浩；只用于核准作者与刊期，PDF正文本次未成功读取' },
  { id: 'writers-liu-archive-books', title: '刘慈欣专馆：图书目录', publisher: '久隆计划', url: 'https://www.sfjiulong.org/catalogs/liu_cixin', type: '科幻实体藏书目录', checkedAt, locator: '图书表：2003作家版《超新星纪元》；2004《星云II：球状闪电》；2005《球状闪电》。采用年月而非目录默认日，不依赖可疑ISBN校验位' },
  { id: 'writers-liu-wangyao-interview', title: '我依然想写出能让自己激动的科幻小说——作家刘慈欣访谈录', publisher: '王瑶 /《文艺研究》2015年第12期；中文科幻转载', url: 'https://www.chinasf.com/main/documentdetail.php?ChapterID=1&DocumentID=1', type: '作者访谈', checkedAt, locator: '一、重返伊甸园之路：提问列1989年动笔，作者答改稿经历但未重述年份；页面收录的第一章，不声称读完全部访谈' },
  { id: 'writers-liu-pi-interview', title: '小π访谈（采访刘慈欣）', publisher: '文学视界；海德堡大学 DACHS 网页档案保存', url: 'https://project.zo.uni-heidelberg.de/DACHS_Leiden/archive/leiden/poetry/20040712/white-collar.net/01-author/l/60-liu_cx/034.htm', type: '作者访谈存档', checkedAt, locator: '硬软科幻问答；最近创作计划末段《球状闪电》与《超新星纪元》；页尾注明作者授权，档案路径日期不是采访发表日' },
  { id: 'writers-ball-lightning-tor', title: 'Ball Lightning', publisher: 'Tor Books / Macmillan', url: 'https://us.macmillan.com/books/9780765394088/balllightning/', type: '出版社英文版书目与简介', checkedAt, version: 'ISBN 9780765394088', locator: 'Author：Cixin Liu、Joel Martinsen；On Sale：08/14/2018；Book Details，不采用其他作品的宣传引语' },
  { id: 'writers-supernova-tor', title: 'Supernova Era', publisher: 'Tor Books / Macmillan', url: 'https://us.macmillan.com/books/9781250306043/supernovaera/', type: '出版社英文版书目与简介', checkedAt, version: 'ISBN 9781250306043', locator: 'Author：Cixin Liu、Joel Martinsen；On Sale：10/22/2019；Book Details。节选版权页的2004版记载不是2003作家版初版日期' },
];

export const liuReviewedEvents: TimelineEvent[] = [
  {
    id: 'liu-cixin-supernova-era', title: '《超新星纪元》', time: { kind: 'point', start: { year: 2003, month: 1 } }, category: 'sci-fi', entityIds: ['liu-cixin'], periodIds: ['era-early-breakthrough'], milestone: false,
    summary: '超新星辐射使十三岁以上的人生命进入倒计时，成年人试图把维持社会的知识传给孩子。孩子接手后，是否还会遵循原来的秩序？这是小说设定，不是天文学预测。',
    significance: '这部较早开始写作、历经修改才出版的长篇，提供了理解刘慈欣早期创作与后续译介的入口；写作时间、中文版和英文版不能混为一个节点。',
    sourceIds: ['writers-liu-chronology', 'writers-liu-chronology-issue', 'writers-liu-archive-books', 'writers-liu-wangyao-interview', 'writers-supernova-tor'], tags: ['科幻', '长篇小说', '儿童纪元', '刘慈欣', '超新星纪元'],
    facts: [
      { label: '本节点', text: '2003年1月作家出版社中文版本', sourceIds: ['writers-liu-chronology', 'writers-liu-archive-books'] },
      { label: '创作与出版', text: '写作起点记录有差异：访谈提问列1989年，学术年谱列1990年；不强定精确起始年', sourceIds: ['writers-liu-wangyao-interview', 'writers-liu-chronology'] },
      { label: '英文译介', text: 'Joel Martinsen译；所列Tor版本2019年10月22日发行', sourceIds: ['writers-supernova-tor'] },
    ],
    details: [
      { label: '内容：交接知识，不等于交接规则', text: '出版社简介将冲突放在成年人退出前的准备和儿童接管后的选择之间。孩子学习维持世界运转，却未必愿意照搬继承的生活；这里保留叙事起点，不把小说的群体行为当作儿童心理研究结论。', sourceIds: ['writers-supernova-tor'], locator: 'Book Details：辐射、知识传授和儿童选择' },
      { label: '创作：早写成不等于早出版', text: '王瑶的访谈提问把动笔列为1989年6月，李浩年谱则在1990年条下记开始创作；刘慈欣的回答确认寄稿和为出版改稿经历，却未重述精确起始年。因此保留记录差异，只概括为约1989—1990年前后的早期写作，不把1991年定为唯一构思年。', sourceIds: ['writers-liu-wangyao-interview', 'writers-liu-chronology'], locator: '访谈第一章第二组问答；年谱1990年条'  },
      { label: '版本：中文成书与英译分开', text: '年谱与藏书目录支持2003年1月作家版；本页链接的Tor英文版列2019年10月22日和译者Joel Martinsen。英文节选另有2004年中文版本版权说明，属于版本线索，不据此覆盖已核对的2003年出版记录。', sourceIds: ['writers-liu-chronology', 'writers-liu-archive-books', 'writers-supernova-tor'], locator: '年谱2003条、专馆图书表；Tor On Sale和节选版权说明' },
      { label: '编辑解读：先问社会如何被维持', text: '可以把阅读问题分成两层：电力、食品和技术怎样传承，规则、责任与信任又怎样获得认同。这样读，能看到灾难设定如何推动社会选择，而不必把小说认定为某个现实社会的准确预言。', editorial: true },
    ],
    note: '写作起点存在1989年与1990年两种记录：前者来自访谈提问，后者来自学术年谱，本次未据原稿裁定。仅采用中文书目年月，不把档案目录中的具体日认定为首销日。未逐稿校勘各中文版，也未核定最早网络传播日期；年谱原刊目录已核对，原刊PDF正文未成功读取，内容使用注明出处的转载并与藏书目录交叉核查。',
    recommendedResources: [{ id: 'liu-supernova-creation-interview', title: '我依然想写出能让自己激动的科幻小说——作家刘慈欣访谈录', creator: '刘慈欣（受访）；王瑶（采访）', series: '《文艺研究》2015年第12期 · 中文科幻转载', kind: 'article', url: 'https://www.chinasf.com/main/documentdetail.php?ChapterID=1&DocumentID=1', match: '第一章直接谈《超新星纪元》的写作与改稿，可帮助区分创作起点、出版条件和后来的作者回顾。', scopeNote: '已核读所链接的第一章文字；未冒称读完全部章节。访谈是作者与研究者的解释，不是儿童社会行为的实验证据，含其他作品讨论。', locator: '一、重返伊甸园之路：1989年写作与后续修改问答', checkedAt }],
  },
  {
    id: 'liu-cixin-ball-lightning', title: '《球状闪电》', time: { kind: 'point', start: { year: 2004, month: 7 } }, category: 'sci-fi', entityIds: ['liu-cixin'], periodIds: ['era-early-breakthrough'], milestone: true,
    summary: '陈因父母死于球状闪电而追索这一现象，研究逐渐与军事开发交织。科学探索、个人执念和应用后果之间的冲突，构成小说的核心悬念。',
    significance: '这部可独立阅读的长篇把研究动机与技术用途放在同一故事中。宏观量子设定属于科幻构造，不是现实球状闪电已获证实的解释，也不把本书定为《三体》三部曲的必读前传。',
    sourceIds: ['writers-liu-chronology', 'writers-liu-chronology-issue', 'writers-liu-archive-books', 'writers-liu-pi-interview', 'writers-ball-lightning-tor'], tags: ['科幻', '长篇小说', '球状闪电', '科学伦理', '刘慈欣'],
    facts: [
      { label: '本节点', text: '2004年7月《星云II：球状闪电》版本；四川科学技术出版社', sourceIds: ['writers-liu-chronology', 'writers-liu-archive-books'] },
      { label: '版本区别', text: '专馆另列2005年6月《球状闪电》单行本；不是本节点年月', sourceIds: ['writers-liu-archive-books'] },
      { label: '英文译介', text: 'Joel Martinsen译；所列Tor版本2018年8月14日发行', sourceIds: ['writers-ball-lightning-tor'] },
    ],
    details: [
      { label: '内容：同一个发现，不同的目的', text: 'Tor简介以陈对父母死亡的追问切入，再引入有各自动机的军人与科学家。这里只交代研究与应用之间的矛盾，避免用详细结局代替阅读，也不把出版社的宣传评价当成作品的公认排名。', sourceIds: ['writers-ball-lightning-tor'], locator: 'Book Details：陈的动机及军人、科学家的分歧' },
      { label: '科学与想象：保留小说的假设边界', text: '在小π访谈里，刘慈欣把这部作品介绍为技术型科幻，并概述宏观尺度的量子想象；他也区分科幻所表达的科学意境与科学知识本身。访谈能说明作者的创作取向，却不能证明小说设定为真实物理模型。', sourceIds: ['writers-liu-pi-interview'], locator: '软硬科幻问答；最近创作计划末段' },
      { label: '版本：先辨认星云系列，再看单行本', text: '学术年谱与久隆计划目录均指向2004年7月《星云II》版本，替换旧条目无具体依据的2004年6月。目录另列2005年6月版本，Tor所列英文版为2018年8月14日；三项不是同一次出版。', sourceIds: ['writers-liu-chronology', 'writers-liu-archive-books', 'writers-ball-lightning-tor'], locator: '年谱2004年7月；专馆两行版本记录；Tor On Sale' },
      { label: '编辑解读：把研究与使用拆开看', text: '可分别记录人物为何研究、谁决定投入、谁承担应用后果，再比较三者是否一致。与《三体》并读可以观察刘慈欣的尺度变化，但这是一条编辑阅读建议，不代表两书必须按统一故事前后传来读。', editorial: true },
    ],
    note: '采用交叉核对后的2004年7月，不认定精确首销日；本次未查看初版版权页实物影像。宏电子等只作为小说设定讨论；撤下无依据的“文学水准最成熟”和正式前传判断。未核实影视播出状态。',
    recommendedResources: [{ id: 'liu-ball-lightning-pi-conversation', title: '小π访谈（采访刘慈欣）', creator: '刘慈欣（受访）；小π（采访署名）', series: '文学视界 · 海德堡大学 DACHS 网页档案', kind: 'article', url: 'https://project.zo.uni-heidelberg.de/DACHS_Leiden/archive/leiden/poetry/20040712/white-collar.net/01-author/l/60-liu_cx/034.htm', match: '创作计划段直接谈《球状闪电》，可对照作者对科学意境和类型小说的理解，避免把幻想机制误当科学结论。', scopeNote: '已核读存档文字，包含故事设定和后段情节提示。采访原始日期未确定，不把档案路径中的20040712当作发表日；早期计划不等于后来均已出版。', locator: '软硬科幻问答；“最近还完成了两部长篇”段', checkedAt }],
  },
];
