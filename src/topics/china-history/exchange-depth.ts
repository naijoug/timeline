import type { Source, TimelineEvent } from '../../core/types';

// A bounded review of two existing exchange-history nodes, not a new chronology.
export const exchangeDepthSources: Source[] = [
  {
    id: 'zhenghe-tsai-armed-voyages', title: 'Perpetual Happiness: The Ming Emperor Yongle — 9 / The Price of Glory',
    publisher: 'Shih-shan Henry Tsai · University of Washington Press',
    url: 'https://uw.manifoldapp.org/read/perpetual-happiness/section/9ed9e1ae-9a7b-4701-b4d5-425861a6fdf3',
    type: '学术著作公开章节', checkedAt: '2026-10-26',
    locator: '第9章郑和段：Palembang干预与陈祖义被捕；Sri Lankan军队败退及统治者被带至明廷（注79–80附近）',
    version: '2001年著作；已核对书名页、版权页和上述章节段落。仅交叉确认武力事件；不采用本章分航次地理、船数、兵员、动物辨识及寻找建文帝的动机解释。与教学概述相互核对不等于掌握冲突各方的独立亲历记录。',
  },
  {
    id: 'zhangqian-uw-han-text', title: 'Selections from the Han Narrative Histories：III. The Mission to the West by Zhang Qian',
    publisher: '华盛顿大学 · Silk Road Seattle', url: 'https://depts.washington.edu/silkroad/texts/hantxt1.html',
    type: '传世史书旧英译节选与大学编注', checkedAt: '2026-10-26',
    locator: '编者导言的版本说明；第三节出使、月氏答复、亲历与传闻之别、大夏所见蜀物及后续使节段',
    version: '读取网页第三节相关段落。编者将Friedrich Hirth于1917年发表的张骞出使英译插入A. Wylie的《汉书》旧译节选；不是张骞手稿，也不是无删节的现代校注本。旧译地名、族群称谓、距离、人口与军队数字不作本站结论。',
  },
  {
    id: 'zhangqian-uw-trade-routes', title: 'Silk Road Trade Routes', publisher: 'Jason Neelis · 华盛顿大学 Silk Road Seattle',
    url: 'https://depts.washington.edu/silkroad/exhibit/trade/essay.html', type: '大学展览研究文章', checkedAt: '2026-10-26',
    locator: '开头的近代命名；塔里木盆地南、北、中路线及行程选择段',
    version: '只采用路线网络、近代命名及行程受环境和政治经济条件影响的概述；不把文章跨汉唐及更晚时期的遗物全部归入张骞首使年代。',
  },
  {
    id: 'zhenghe-columbia-maritime-context', title: 'The Ming Voyages：商贸背景与航行中的武力', publisher: '哥伦比亚大学 · Asia for Educators',
    url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm', type: '大学教学概述', checkedAt: '2026-10-26',
    locator: 'Preparing the Fleet首段的商人网络；The Seven Voyages中的旧港及锡兰冲突段',
    version: '定向读取贸易背景与武力事件，不采用宝船尺寸、船数、兵员、技术世界第一或“朝贡保证和平”的概括；不据本页判定郑和亲自到达每个港口。另一个同站2018年讲座教学提纲含明显错年及大西洋表述，未用作证据。',
  },
  {
    id: 'zhenghe-nmc-bell', title: '郑和铸青铜钟', publisher: '中国国家博物馆',
    url: 'https://www.chnmuseum.cn/zp/zpml/csp/202008/t20200826_247451.shtml', type: '馆藏器物与铭文说明', checkedAt: '2026-10-26',
    locator: '钟铭中的宣德六年、郑和与王景弘及祈保往返平安；末句的第七次出使说明',
    version: '读取馆方器物说明和所录铭文，不声称独立释读原钟高清铭文。祈愿文字是当事人的愿望，不是航行安全、伤亡数量或全船员共同信仰的证明。',
  },
  {
    id: 'zhenghe-npm-yingya', title: '航向天方─十五世紀的伊斯蘭印象：尋找麒麟／瀛涯勝覽', publisher: '国立故宫博物院',
    url: 'https://theme.npm.edu.tw/exh110/salttothehorizon/ch/page-2.html', type: '展览与馆藏版本说明', checkedAt: '2026-10-26',
    locator: '《瀛涯勝覽》条：平圖002606、马欢、万历四十五年陈于廷刊本及通译身份说明',
    version: '读取馆方展签，未阅读《瀛涯胜览》全书或核验原页。展出的万历刊本不是航行当年的手稿；不把马欢记录概括为郑和亲历所有地点。',
  },
  {
    id: 'zhenghe-npm-trade-afterlife', title: '航向天方─十五世紀的伊斯蘭印象：餘波盪漾', publisher: '国立故宫博物院',
    url: 'https://theme.npm.edu.tw/exh110/salttothehorizon/ch/page-5.html', type: '展览与贸易器物说明', checkedAt: '2026-10-26',
    locator: '导语的十六、十七世纪海外贸易延续；十六世纪青花新月形军持（南購瓷000105）展签',
    version: '只采用后续贸易与特定器物设计的馆方解释；不把单件器物当作贸易总量证据，也不将后世全部艺术交流归因于郑和。',
  },
];

// Re-date only the two existing records actually reread in this batch.
export const exchangeSourceReviews: Record<string, Partial<Source>> = {
  'anc-zhangqian': {
    checkedAt: '2026-10-26', locator: '张骞词条首句：建元二年／前139年出使',
    version: '本轮重读仅用于核对前139年的纪年口径。词条极简，不据其压缩叙述重建被拘与到访的先后；行程采用大学所载传世史书节选。',
  },
  'anc-zhenghe': {
    checkedAt: '2026-10-26', locator: 'Key Events 1405–1433；1577条中的瓷器外销与海外收藏',
    version: '本轮重读七次远航的年份区间、地域与外交物品交流，并核对1577条的后续瓷器外销；不采用船员或船数估计、生卒年，也不把“外交为主”理解为从未动武。',
  },
};

export const exchangeDepthEventPatches: Record<string, Partial<TimelineEvent>> = {
  'zhang-qian': {
    summary: '张骞为争取大月氏联合抗匈奴而西行，虽未达成原定联盟，却带回西域见闻，影响汉廷此后的使节与交通探索。',
    significance: '一次外交任务的成败，与知识和往来网络的扩展，不是同一个问题。把商人、向导及当地政权放回画面，才能理解交流不只由一名使者创造。',
    sourceIds: ['anc-zhangqian', 'anc-zhangqian-scio', 'zhangqian-uw-han-text', 'zhangqian-uw-trade-routes'],
    details: [
      { label: '背景：先有联盟任务，不是商路开幕式', text: '华盛顿大学所载史书节选记述，汉武帝希望联络曾受匈奴攻击的大月氏，张骞应募出使。此行首先回应汉匈竞争，并非一次以建立贸易路线为唯一目标的商业远征。', sourceIds: ['zhangqian-uw-han-text'], locator: '第三节开头：汉廷询问降者、招募使者与张骞应募段' },
      { label: '经过：被拘、转道与未达成的联盟', text: '据该节选，张骞被匈奴长期扣留，逃离后经大宛、康居前往大月氏；月氏已有新的居地，不愿再以对匈奴复仇为目标。首使没有取得预想的联盟，返程又遭扣留，后来才回到汉廷。', sourceIds: ['zhangqian-uw-han-text'], locator: '第三节：首次被拘、经大宛及康居、月氏答复和返程再被拘段' },
      { label: '商人的踪迹：蜀物为何先到大夏', text: '节选记载张骞在大夏见到邛竹杖、蜀布，当地人说商人从身毒购得。这是史书保存的一则询问与转述，提示商品已经通过中介流动；不能据它复原一条全程路线，更不能说张骞首次带去了这些商品。', sourceIds: ['zhangqian-uw-han-text'], locator: '第三节：Ta-hia条后张骞向皇帝报告竹杖、蜀布及Shon-tu的段落' },
      { label: '影响：见闻成为后续探索的线索', text: '节选区分张骞亲历之地与听闻所得，也记述汉廷据报告另遣使者探索西南交通，但探索受到阻碍。知识增加并不等于路线已经畅通；本条不把所有见闻当成亲眼观察或准确测量。', sourceIds: ['zhangqian-uw-han-text'], locator: '第三节：列举亲历与间接获知诸国；蜀地四路探使及受阻段' },
      { label: '放回长期网络：丝路不是一条固定公路', text: 'Jason Neelis的路线文章说明，“丝绸之路”是近代命名，塔里木盆地交通包含多条分支，行程随目的、环境和政治经济条件而变。文章涉及不同时期，不应把其中汉唐及后世路线压成张骞一次出使的足迹。', sourceIds: ['zhangqian-uw-trade-routes'], locator: '开头的Richthofen命名；南北及中间路线；Travelers’ itineraries段' },
      { label: '我的理解', text: '可以把问题分成三层：皇帝原本想要什么，使者实际带回什么，商人和沿途社会早已在做什么。联盟未成，并不抹去新知识的作用；国家后来加强往来，也不意味着此前的人群和交换网络不存在。', editorial: true },
    ],
    note: '保持“约前138年”的既有节点：故宫词条采用前139年，既有国务院新闻办公室条目采用前138年，未强行消除差异。后者本轮两次访问超时，保留2026-10-24旧核查日。首使与后来的出使、军事扩张分开；不补造返抵月日、现代国界对应或商品传播的唯一线路。',
    recommendedResources: [
      {
        id: 'uw-zhangqian-primary-reading', title: 'The Mission to the West by Zhang Qian（汉代史书英译节选第三节）',
        creator: 'Friedrich Hirth译；华盛顿大学 Silk Road Seattle编选', series: 'Silk Road Seattle · Historical Texts',
        url: 'https://depts.washington.edu/silkroad/texts/hantxt1.html', kind: 'article', checkedAt: '2026-10-26',
        match: '直接对读联盟目标、月氏答复与大夏所见蜀物，观察史书如何区分亲历、转述和据此提出的政策建议。',
        locator: '目录第三节“III. The Mission to the West by Zhang Qian”；读前先看网页导言的版本说明。',
        scopeNote: '已读取相关正文与编者版本说明。张骞部分采用1917年旧英译，并与《汉书》其他旧译节选编排；不是张骞原始手稿。旧地名、贬抑性族群称谓和编者括注须审慎阅读，本条不背书其人口、里程或文化优劣判断。',
      },
    ],
  },
  'zheng-he-voyages': {
    summary: '1405—1433年，明廷组织的七次郑和远航进入既有印度洋网络，开展外交、物品与知识交流，也发生武力干预。',
    significance: '国家远航把商贸、宫廷外交、翻译与宗教实践联系起来；它既不是印度洋交流的起点，也不能代表明代全部海外贸易。',
    sourceIds: ['anc-zhenghe', 'zhenghe-columbia-maritime-context', 'zhenghe-tsai-armed-voyages', 'zhenghe-nmc-bell', 'zhenghe-npm-yingya', 'zhenghe-npm-trade-afterlife'],
    details: [
      { label: '背景：船队进入已有商贸世界', text: '哥伦比亚大学教学概述指出，远航之前，中国、印度与穆斯林商人已参与跨东南亚和印度洋的交换网络。国家船队进入的是已有港口、商人和航行经验的世界，不是等待被“发现”的空白海域。', sourceIds: ['zhenghe-columbia-maritime-context'], locator: 'Preparing the Fleet首段：中国商人与穆斯林、印度商人的既有网络' },
      { label: '经过：七次航行，不是一趟连续旅程', text: '大都会博物馆年表将七次远航置于1405—1433年，概述船队联系印度、波斯及东非，并带回异域物品和动物。这个持续区间容纳多次往返，不表示全部船只、人员每次都走同一路线，也不证明郑和本人抵达每一处。', sourceIds: ['anc-zhenghe'], locator: 'Key Events 1405–1433' },
      { label: '外交与武力不能截然分开', text: '哥伦比亚概述与Tsai的研究均记有旧港的武装干预，以及锡兰交战后当地统治者被带至明廷的事件。礼物与使节往来并不能证明远航全程和平；这些叙述不是冲突各方的完整证词，本条不据此裁定正当性，也不采用兵力数字。', sourceIds: ['zhenghe-columbia-maritime-context', 'zhenghe-tsai-armed-voyages'], locator: 'Columbia The Seven Voyages的冲突段；Tsai第9章Palembang、Sri Lanka及注79–80附近' },
      { label: '知识由谁留下：马欢与后来的刊本', text: '国立故宫博物院介绍马欢是船队阿拉伯语通译官，将随行见闻写入《瀛涯胜览》。展出的却是万历四十五年刊本：航行见闻、作者记录与后来的传抄刊刻不是同一时刻，馆藏版本也不是郑和船上的原始日记。', sourceIds: ['zhenghe-npm-yingya'], locator: '《瀛涯勝覽》展签：平圖002606、明马欢撰及万历四十五年刊本' },
      { label: '从一口钟看航海者的祈愿', text: '中国国家博物馆藏“郑和铸青铜钟”，馆方所录铭文列出宣德六年、郑和和王景弘等人，并祈求西洋往返平安；馆方将它与第七次出使相联系。它为航海中的宗教实践留下具体线索，不能证明旅途确实没有风险或所有船员信仰相同。', sourceIds: ['zhenghe-nmc-bell'], locator: '器物说明中的钟铭及第七次出使说明' },
      { label: '后续影响：1433年不是所有海贸的终点', text: '国立故宫“余波荡漾”展区说明十六、十七世纪海外贸易延续，并展出面向伊斯兰世界设计的十六世纪青花新月形军持；大都会1577年条也记有景德镇瓷器外销。国家远航结束不等于器物交流全部停止，后世外销品也不能全部归功于郑和。', sourceIds: ['zhenghe-npm-trade-afterlife', 'anc-zhenghe'], locator: '故宫展区导语及青花新月形军持（南購瓷000105）；大都会Key Events 1577' },
      { label: '我的理解', text: '除了问船有多大、走得多远，还可问谁负责翻译、谁承担航行风险、礼物怎样变成政治信息。把船队与港口商人、后来的读者和工匠并置，能看见国家计划与社会交流相交，却并不完全重合。', editorial: true },
    ],
    note: '保留1405—1433年区间，不补造每次出发月日、宝船尺寸、船员数量或郑和个人的完整航迹。外交不等于从未动武；国家船队停航不等于全部海外贸易终止。器物说明与后刻文本可供观察宗教和知识传播，不能单独证明全部政策动机、贸易总量或唯一停航原因。',
    recommendedResources: [
      {
        id: 'penn-zhenghe-great-voyages', title: 'Great Voyages: Zheng He', creator: 'Adam Smith（时任宾夕法尼亚大学博物馆亚洲部助理策展人）',
        series: 'Penn Museum · 2013–2014 Great Lectures / Great Voyages', url: 'https://collections.penn.museum/collections/videos/video/93',
        kind: 'lecture', checkedAt: '2026-10-26', publishedAt: '2013-10-02',
        match: '馆方简介明确讨论七次远航、明廷展示权威与印度洋至东非的范围，与本节点的国家外交及跨海联系直接对应。',
        locator: '馆方影片页：标题、讲者、Video Date、Film Description；片长48:36。',
        scopeNote: '已核对馆方标题、讲者、系列、日期、片长和简介；未验证完整播放或逐字讲稿。日期按美国馆方10/02/2013记为2013-10-02；讲座解读不替代上方分段史料，也不据简介认定宝船尺寸或唯一停航原因。',
      },
      {
        id: 'nmc-zhenghe-bell-reading', title: '郑和铸青铜钟：器物与航行祈愿', creator: '中国国家博物馆', series: '国博藏品 · 馆藏精品 · 传世品',
        url: 'https://www.chnmuseum.cn/zp/zpml/csp/202008/t20200826_247451.shtml', kind: 'article', checkedAt: '2026-10-26',
        match: '用一件与第七次远航相联系的实物，阅读官军共同铸钟与祈保往返平安的措辞，把国家动员和航海者的愿望放在一起。',
        locator: '“郑和铸青铜钟”器物说明、铭文转录与末句。',
        scopeNote: '已读馆方说明和铭文转录，未独立核验原钟高清铭文。祈愿不是事故或死亡统计，不能据此断言所有船员共享同一种信仰；页面也不是对七次远航的完整叙述。',
      },
    ],
  },
};
