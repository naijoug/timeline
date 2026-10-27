import type { EventRelation, Source } from "../../core/types";

// Narrowly reviewed batch: do not refresh the dates on unrelated legacy sources.
export const writersReviewedSources: Source[] = [
  {
    id: "writers-seven-marquises-book",
    title: "《七侯笔录》",
    publisher: "中国作家网·书汇",
    url: "https://www.chinawriter.com.cn/n1/2019/0805/c405078-31274984.html",
    type: "图书书讯",
    checkedAt: "2026-10-24",
    publishedAt: "2019-08-05",
    version: "ISBN 9787540490805",
    locator: "2019 年 4 月出版栏；编辑推荐说明原题名及大结局，内容简介说明现代少年",
  },
  {
    id: "writers-three-body-chronology",
    title: "《三体》时间轴",
    publisher: "文艺报",
    url: "https://wyb.chinawriter.com.cn/content/202609/28/content85463.html",
    type: "文学机构年表",
    locator: "2006、2008、2010 年条目：连载起止与三部中文单行本出版月份",
    checkedAt: "2026-10-24",
    publishedAt: "2026-09-28"
  },
  {
    id: "writers-three-body-tor",
    title: "The Three-Body Problem",
    publisher: "Tor Books / Macmillan",
    url: "https://us.macmillan.com/books/9780765377067/thethreebodyproblem/",
    type: "出版社书目",
    locator: "Author、On Sale、Book Details 与 ISBN；2014-11-11 为此英文精装版发行日",
    checkedAt: "2026-10-24",
    version: "ISBN 9780765377067"
  },
  {
    id: "writers-dark-forest-tor",
    title: "The Dark Forest",
    publisher: "Tor Books / Macmillan Audio",
    url: "https://us.macmillan.com/books/9781427273321/thedarkforest/",
    type: "出版社作品简介",
    locator: "Book Details：Volume 2、面壁计划与罗辑；该页英文有声版日期不是中文首版日期",
    checkedAt: "2026-10-24",
    version: "ISBN 9781427273321"
  },
  {
    id: "writers-dark-forest-tor-2015", title: "The Dark Forest — ISBN 9780765377081",
    publisher: "Tor Books / Macmillan", url: "https://us.macmillan.com/books/9780765377081/thedarkforest/",
    type: "出版社版本书目", checkedAt: "2026-10-27", version: "ISBN 9780765377081",
    locator: "Author：Cixin Liu、Joel Martinsen；On Sale：08/11/2015；Book Details：系列第二部与面壁计划。不由未显示的格式字段推断装帧。"
  },
  {
    id: "writers-dark-forest-tor-2016", title: "The Dark Forest — ISBN 9780765386694",
    publisher: "Tor Books / Macmillan", url: "https://us.macmillan.com/books/9780765386694/thedarkforest/",
    type: "出版社版本书目", checkedAt: "2026-10-27", version: "ISBN 9780765386694",
    locator: "Author：Cixin Liu、Joel Martinsen；On Sale：08/16/2016。该日期仅对应此ISBN，不覆盖2015年版本。"
  },
  {
    id: "writers-dark-forest-nbd-interview", title: "专访│科幻作家刘慈欣：我和你们一样看不懂前沿物理论文",
    publisher: "丁舟洋、王礼迪 / 每日经济新闻", url: "https://www.nbd.com.cn/articles/2017-12-19/1173292.html",
    type: "作者访谈", checkedAt: "2026-10-27", publishedAt: "2017-12-19",
    locator: "关于黑暗森林是否成立的问答：作者限定为小说中的一种可能性；不将创作解释当作现实宇宙的科学证据。"
  },
  {
    id: "writers-deaths-end-tor",
    title: "Death’s End",
    publisher: "Tor Books / Macmillan Audio",
    url: "https://us.macmillan.com/books/9781427268303/deathsend/",
    type: "出版社作品简介",
    locator: "Book Details：Volume 3、程心与威慑平衡；该页英文有声版日期不是中文首版日期",
    checkedAt: "2026-10-24",
    version: "ISBN 9781427268303"
  },
  {
    id: "hugo-database",
    title: "2015 Hugo Awards",
    publisher: "World Science Fiction Society",
    url: "https://www.thehugoawards.org/hugo-history/2015-hugo-awards/",
    type: "奖项记录",
    locator: "Presented at、Best Novel 及其资格说明：当地 2015-08-22，获奖作品为刘宇昆英译的第一部",
    checkedAt: "2026-10-24"
  },
  {
    id: "writers-lychee-serial",
    title: "对话｜马伯庸新作首发《收获》：但问荔枝“如何来”？",
    publisher: "《收获》 / 中国作家网",
    url: "https://www.chinawriter.com.cn/n1/2021/0406/c405057-32070554.html",
    type: "作者访谈与期刊首发记录",
    locator: "导语：首发《收获》长篇小说 2021 年春卷；访谈谈历史材料与小人物视角",
    checkedAt: "2026-10-24",
    publishedAt: "2021-04-06"
  },
  {
    id: "writers-lychee-book",
    title: "《长安的荔枝》",
    publisher: "中国作家网·书汇",
    url: "https://www.chinawriter.com.cn/n1/2022/1104/c405064-32559177.html",
    type: "图书书讯",
    locator: "出版时间、ISBN、内容简介：湖南文艺出版社 2022 年 10 月版",
    checkedAt: "2026-10-24",
    publishedAt: "2022-11-04",
    version: "ISBN 9787572608582"
  },
  {
    id: "writers-taibai-book",
    title: "《太白金星有点烦》",
    publisher: "中国作家网·书汇",
    url: "https://image.chinawriter.com.cn/n1/2023/0602/c405081-40005145.html",
    type: "图书书讯与作者前言",
    locator: "出版时间、ISBN、内容简介；前言说明其短篇幅写作缘起",
    checkedAt: "2026-10-24",
    publishedAt: "2023-06-02",
    version: "ISBN 9787572610912"
  },
  {
    id: "writers-peach-book",
    title: "《桃花源没事儿》",
    publisher: "中国作家网·书汇",
    url: "https://www.chinawriter.com.cn/n1/2025/0528/c405081-40489719.html",
    type: "图书书讯",
    locator: "出版时间、ISBN 与内容简介：标注 2025 年 6 月，书讯日期为 5 月 28 日",
    checkedAt: "2026-10-24",
    publishedAt: "2025-05-28",
    version: "ISBN 9787572624247"
  },
  {
    id: "writers-ma-jianwei-interview",
    title: "马伯庸：在小说里“任性一把”",
    publisher: "文汇报 / 中国作家网",
    url: "https://www.chinawriter.com.cn/n1/2025/0606/c403994-40495089.html",
    type: "作者访谈",
    locator: "开篇的“见微”书系三作；“打怪升级”段落：2013 年萌生灵感，十余年断续创作",
    checkedAt: "2026-10-24",
    publishedAt: "2025-06-06"
  },
  {
    id: "writers-zijin-2020-interview",
    title: "紫金陈《隐秘的角落》：朱朝阳的原型就是我自己",
    publisher: "北京青年报 / 中国作家网",
    url: "https://www.chinawriter.com.cn/n1/2020/0624/c405057-31757596.html",
    type: "作者访谈",
    locator: "“小演员挑得好也演得好”末尾：2020 年已出版《低智商犯罪》；小贴士列出“推理之王”三部曲",
    checkedAt: "2026-10-24",
    publishedAt: "2020-06-24"
  },
  {
    id: "writers-low-iq-cite",
    title: "《低智商犯罪》：奇幻基地编辑推荐与书目",
    publisher: "奇幻基地 / 城邦读书花园",
    url: "https://www.cite.com.tw/book?id=91129",
    type: "出版社书目与编辑推荐",
    locator: "内容简介、编辑何宁推荐和基本资料；张一昂及多线喜剧，2022 年繁体版不作简体首版日期。2026-10-26 云浏览器仅显示网站维护提示，当前正文未能直读；本轮仅复核检索返回的具体书目信息。",
    checkedAt: "2026-10-24",
    version: "繁体版 ISBN 9786267094006"
  },
  {
    id: "writers-tracker-library",
    title: "《追踪师》馆藏书目",
    publisher: "对外经济贸易大学图书馆",
    url: "https://opac.uibe.edu.cn/opac/book/bfc0192b8f9c68d1da16a0833c65c287",
    type: "高校馆藏书目",
    locator: "出版发行项、ISBN 与提要文摘：2018 年中国友谊版；林奇、张强、夏明与沈研。2026-10-26 云浏览器连接超时，不判为404；本轮核对检索返回书目，未直读当前完整页面。",
    checkedAt: "2026-10-24",
    version: "ISBN 9787505742888"
  }
];

export const writersReviewedEventIds = ["ma-bo-yong-seven-marquises", "liu-cixin-three-body-1", "liu-cixin-three-body-2", "liu-cixin-three-body-3", "zi-jin-chen-low-iq-crime", "zi-jin-chen-tracker", "ma-bo-yong-lychee-of-changan", "ma-bo-yong-taibai-jinxing", "ma-bo-yong-peach-blossom-fine", "liu-cixin-three-body-book", "liu-cixin-three-body-english", "liu-cixin-three-body-hugo", "ma-bo-yong-lychee-serial"];

export const writersRelations: EventRelation[] = [
  {
    id: "three-body-serial-to-book",
    fromEventId: "liu-cixin-three-body-1",
    toEventId: "liu-cixin-three-body-book",
    label: "连载后成书",
    sourceIds: ["writers-three-body-chronology"],
    locator: "2006 年与 2008 年条目",
    note: "同一作品的发表阶段，不重复计算为两部作品。"
  },
  {
    id: "three-body-volume-1-to-2",
    fromEventId: "liu-cixin-three-body-book",
    toEventId: "liu-cixin-three-body-2",
    label: "三部曲第一部 → 第二部",
    sourceIds: ["writers-three-body-tor", "writers-dark-forest-tor"],
    locator: "出版社系列卷序与 Book Details",
    note: "系列顺序有出版社依据；不是由年份相邻自动推断。"
  },
  {
    id: "three-body-volume-2-to-3",
    fromEventId: "liu-cixin-three-body-2",
    toEventId: "liu-cixin-three-body-3",
    label: "三部曲第二部 → 第三部",
    sourceIds: ["writers-dark-forest-tor", "writers-deaths-end-tor"],
    locator: "出版社 Volume 2、Volume 3",
    note: "按系列顺序阅读；中文出版年月另据中文年表。"
  },
  {
    id: "three-body-book-to-english",
    fromEventId: "liu-cixin-three-body-book",
    toEventId: "liu-cixin-three-body-english",
    label: "译为英文",
    sourceIds: ["writers-three-body-tor", "hugo-database"],
    locator: "Tor 作者/译者；雨果奖资格说明",
    note: "中文版、英文译本为同一部作品的不同版本。"
  },
  {
    id: "three-body-english-to-hugo",
    fromEventId: "liu-cixin-three-body-english",
    toEventId: "liu-cixin-three-body-hugo",
    label: "该译本获奖",
    sourceIds: ["hugo-database"],
    locator: "Best Novel 与英文首次出版资格说明",
    note: "仅第一部获 2015 Best Novel，不把奖项泛化到全部三卷。"
  },
  {
    id: "lychee-serial-to-book",
    fromEventId: "ma-bo-yong-lychee-serial",
    toEventId: "ma-bo-yong-lychee-of-changan",
    label: "期刊首发后成书",
    sourceIds: ["writers-lychee-serial", "writers-lychee-book"],
    locator: "《收获》春卷首发记录；2022 年图书书讯",
    note: "同一作品的两种发表阶段，访谈日期不代替期刊日期。"
  },
  {
    id: "jianwei-lychee-to-taibai",
    fromEventId: "ma-bo-yong-lychee-of-changan",
    toEventId: "ma-bo-yong-taibai-jinxing",
    label: "同属“见微”书系",
    sourceIds: ["writers-ma-jianwei-interview"],
    locator: "开篇列出三部“见微”作品",
    note: "书系关联，不意味着故事人物或情节连续。"
  },
  {
    id: "jianwei-taibai-to-peach",
    fromEventId: "ma-bo-yong-taibai-jinxing",
    toEventId: "ma-bo-yong-peach-blossom-fine",
    label: "同属“见微”书系",
    sourceIds: ["writers-ma-jianwei-interview"],
    locator: "开篇列出三部“见微”作品",
    note: "可对照小人物办事、神话改写与志怪群像，不要求按剧情续作理解。"
  }
];
