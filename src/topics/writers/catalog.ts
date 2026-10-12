import type {
  Catalog,
  Entity,
  Period,
  Source,
  TimeSpan,
  TimelineEvent,
} from "../../core/types";

const checkedAt = "2026-10-12";

const source = (
  id: string,
  title: string,
  publisher: string,
  url: string,
  type: string,
  locator = "见作品出版与版本档案",
): Source => ({ id, title, publisher, url, type, locator, checkedAt });

export const sources: Source[] = [
  source("sfs-archive", "《科幻世界》杂志社刊发档案", "科幻世界杂志社", "https://www.sfw.com.cn/", "期刊档案", "1999—2006 年期刊发表与中国科幻银河奖评奖档案"),
  source("hugo-database", "The Hugo Awards Official Database", "World Science Fiction Society", "https://www.thehugoawards.org/hugo-history/2015-hugo-awards/", "奖项记录", "2015 Hugo Award Best Novel: The Three-Body Problem by Cixin Liu"),
  source("cq-press", "重庆出版社当代文学与科幻出版档案", "重庆出版社", "https://www.cqph.com/", "出版档案", "《三体》三部曲单行本出版记录与印次信息"),
  source("scitech-press", "四川科学技术出版社出版书目", "四川科学技术出版社", "https://www.sckjpress.com/", "出版档案", "世界科幻大师丛书 · 《球状闪电》2004 年版出版档案"),
  source("writers-press", "作家出版社当代文学出版档案", "作家出版社", "https://www.writerspress.com.cn/", "出版档案", "刘慈欣《超新星纪元》2003 年首版出版记录"),
  source("new-star-press", "新星出版社午夜文库档案", "新星出版社", "https://www.newstarpress.com/", "出版档案", "午夜文库 · 紫金陈《无证之罪》2014 年版出版记录"),
  source("jiangsu-lit-press", "江苏凤凰文艺出版社出版书目", "江苏凤凰文艺出版社", "https://www.jswy.com.cn/", "出版档案", "紫金陈《坏小孩》、马伯庸《古董局中局》《三国机密》出版档案"),
  source("yunnan-peoples-press", "云南人民出版社出版档案", "云南人民出版社", "https://www.ynrmcbs.com/", "出版档案", "紫金陈《长夜难明》2017 年首版出版记录"),
  source("zhejiang-lit-press", "浙江文艺出版社当代小说档案", "浙江文艺出版社", "https://www.zjwy.com.cn/", "出版档案", "紫金陈《低智商犯罪》2019 年版出版记录"),
  source("beijing-joint-press", "北京联合出版公司图书档案", "北京联合出版公司", "https://www.bjjoint.com/", "出版档案", "联合读创 · 紫金陈《追踪师》2020 年出版记录"),
  source("hainan-press", "海南出版社文学出版档案", "海南出版社", "https://www.hainanpress.com/", "出版档案", "马伯庸《风起陇西》2006 年首版出版记录"),
  source("hunan-lit-press", "湖南文艺出版社当代原创档案", "湖南文艺出版社", "https://www.hnwyp.com/", "出版档案", "马伯庸《长安十二时辰》《显微镜下的大明》《长安的荔枝》《太白金星有点烦》《食南之徒》出版档案"),
  source("shanghai-lit-press", "上海文艺出版社原创文学档案", "上海文艺出版社", "https://www.rw-sh.com/", "出版档案", "马伯庸《大医》（破晓篇、日出篇）2022 年版出版记录"),
  source("nlc-china", "中国国家图书馆全国总书目", "国家图书馆国家书目数据库", "https://www.nlc.cn/", "国家书目", "当代华语作家作品在版编目（CIP）与版本典藏登记"),
];

export const entities: Entity[] = [
  {
    id: "liu-cixin",
    name: "刘慈欣",
    type: "科幻作家",
    sourceIds: ["sfs-archive", "hugo-database", "cq-press", "nlc-china"],
  },
  {
    id: "zi-jin-chen",
    name: "紫金陈",
    type: "悬疑推理作家",
    sourceIds: ["new-star-press", "jiangsu-lit-press", "yunnan-peoples-press", "nlc-china"],
  },
  {
    id: "ma-bo-yong",
    name: "马伯庸",
    type: "历史小说与纪实作家",
    sourceIds: ["hunan-lit-press", "hainan-press", "shanghai-lit-press", "nlc-china"],
  },
];

const duration = (start: number, end: number): TimeSpan => ({
  kind: "duration",
  start: { year: start },
  end: { year: end },
});

export const periods: Period[] = [
  {
    id: "era-early-breakthrough",
    title: "世纪初探索与类型破局",
    time: duration(1999, 2005),
    entityIds: ["liu-cixin", "ma-bo-yong"],
    sourceIds: ["sfs-archive", "writers-press", "hainan-press"],
    summary: "世纪之交，当代类型小说迎来创新热潮。刘慈欣在《科幻世界》密集发表《鲸歌》《流浪地球》《乡村教师》《朝闻道》《球状闪电》等作，确立硬科幻宏大构思；马伯庸活跃于早期网络社区，完成首部长篇历史谍战小说《风起陇西》。",
    coverage: "selected",
  },
  {
    id: "era-epic-and-mystery",
    title: "科幻史诗与类型自觉",
    time: duration(2006, 2013),
    entityIds: ["liu-cixin", "zi-jin-chen", "ma-bo-yong"],
    sourceIds: ["cq-press", "hugo-database", "jiangsu-lit-press"],
    summary: "《三体》三部曲相继出版，将中国科幻推向世界级峰巅；紫金陈在天涯社区连载《谋杀官员》（高智商犯罪）系列并出版《无证之罪》，开启本土社会派推理实验；马伯庸出版《古董局中局》《三国机密》，开创文化悬疑与历史解构新风貌。",
    coverage: "selected",
  },
  {
    id: "era-screen-and-bestseller",
    title: "现象级出圈与影视联动",
    time: duration(2014, 2020),
    entityIds: ["zi-jin-chen", "ma-bo-yong"],
    sourceIds: ["jiangsu-lit-press", "yunnan-peoples-press", "hunan-lit-press"],
    summary: "本土类型文学迎来全盛与跨媒介爆发。紫金陈相继推出《坏小孩》《长夜难明》，改编网剧《隐秘的角落》《沉默的真相》引发社会广泛热议；马伯庸出版《长安十二时辰》《显微镜下的大明》，掀起大唐反恐与微观历史风潮。",
    coverage: "selected",
  },
  {
    id: "era-micro-history-mature",
    title: "微细叙事与文风成熟",
    time: duration(2021, 2026),
    entityIds: ["ma-bo-yong", "zi-jin-chen"],
    sourceIds: ["hunan-lit-press", "shanghai-lit-press", "beijing-joint-press"],
    summary: "作家创作步入深耕与反思阶段。马伯庸相继推出《长安的荔枝》《大医》《太白金星有点烦》《食南之徒》，聚焦体制边缘小人物、近代公共卫生史与荒诞职场寓言；紫金陈推进幽默刑侦与现代科技题材探索。",
    coverage: "selected",
  },
];

const event = (
  id: string,
  title: string,
  year: number,
  month: number,
  category: string,
  periodIds: string[],
  entityIds: string[],
  summary: string,
  sourceIds: string[],
  extra: Partial<TimelineEvent> = {},
): TimelineEvent => ({
  id,
  title,
  time: { kind: "point", start: { year, month } },
  summary,
  significance: summary,
  category,
  entityIds,
  periodIds,
  sourceIds,
  tags: [],
  milestone: true,
  ...extra,
});

export const events: TimelineEvent[] = [
  // ==================== 刘慈欣 (12 部) ====================
  event(
    "liu-cixin-whale-song",
    "《鲸歌》",
    1999,
    6,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "公海走私集团利用生物电极控制蓝鲸运送毒品，揭示科技操纵生灵的残酷与科学家的良知觉醒。",
    ["sfs-archive"],
    {
      significance: "刘慈欣公开发表的第一篇科幻小说，拉开了其硬科幻宏大技术设想与人文悲悯交织的创作序幕。",
      tags: ["科幻", "处女作", "生物电极", "刘慈欣"],
      facts: [
        { label: "发表平台", text: "《科幻世界》1999年第6期", sourceIds: ["sfs-archive"] },
        { label: "体裁篇幅", text: "短篇小说", sourceIds: ["sfs-archive"] },
        { label: "创作作者", text: "刘慈欣", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "公海走私集团首领沃纳招募生物物理学家霍普金斯，在其协助下捕获一头巨型蓝鲸并在其脑中植入生物电极，将鲸鱼改造成无法被常规雷达察觉的走私工具。每次下潜，蓝鲸都发出悲戚空灵的哀鸣。在一次被缉毒巡逻艇堵截的绝境中，霍普金斯目睹母鲸对幼崽的深情眷恋，良知苏醒，按下自毁程序与罪恶同归于尽，只留下辽阔大洋中久久回荡的鲸歌。",
          sourceIds: ["sfs-archive"],
        },
        {
          label: "创作背景与反响",
          text: "《鲸歌》标志着刘慈欣正式进入当代科幻文学视野。作品短小精悍，将硬核生物控制论构思与深厚的人道关怀融为一体，初露大家风范。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-micro-end",
    "《微观尽头》",
    1999,
    7,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "人类建造超级对撞机击碎物质最小基本单元夸克，却在微观最深处触发宏观宇宙的瞬间反转与镜像重构。",
    ["sfs-archive"],
    {
      milestone: false,
      significance: "刘慈欣宇宙尺度奇观化想象的代表短篇，以极端物理假说探讨微观与宏观的哲学对偶。",
      tags: ["科幻", "理论物理", "微观宇宙", "刘慈欣"],
      facts: [
        { label: "发表平台", text: "《科幻世界》1999年第7期", sourceIds: ["sfs-archive"] },
        { label: "体裁篇幅", text: "短篇小说", sourceIds: ["sfs-archive"] },
        { label: "核心概念", text: "夸克击碎 / 宏观反转", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "全世界物理学家倾尽全力建造了环绕赤道的超大型粒子加速器，旨在轰击物质最基本的组成单元夸克。当最后一束超强能量射向夸克并将其击碎的瞬间，预想中的更小微观粒子没有出现，反而整个宏观宇宙在一瞬间发生了彻底反转，群星闪烁的黑夜化为纯白，所有星系物质以微观镜像重构，证明微观的最深处正是宏观宇宙的起点。",
          sourceIds: ["sfs-archive"],
        },
        {
          label: "创作背景与反响",
          text: "小说以不足万字的篇幅展现了强烈的科幻诗意与几何反转美感，是刘慈欣探讨极端物理实验后果的早期先声。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-earth-fire",
    "《地火》",
    2000,
    2,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "矿工之子刘欣为终结煤矿井下挖煤惨剧而推行煤炭地下气化，工业试验失控酿成漫延百年的地火灾难。",
    ["sfs-archive"],
    {
      milestone: false,
      significance: "兼具厚重现实工业质感与技术悲剧崇高感的代表作，展现科学先驱在挫折中背负的历史重量。",
      tags: ["科幻", "工业现实", "能源工程", "刘慈欣"],
      facts: [
        { label: "发表平台", text: "《科幻世界》2000年第2期", sourceIds: ["sfs-archive"] },
        { label: "体裁篇幅", text: "中篇小说", sourceIds: ["sfs-archive"] },
        { label: "核心人物", text: "刘欣", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "煤矿总工程师刘欣的父亲因矽肺病悲惨离世，为了彻底消除煤矿工人井下开采的伤亡与尘肺苦难，刘欣研制了煤田地下气化技术，试图直接在地层中将煤炭转化为煤气输出。然而在工业试运行中，地下地质断层引发气化失控，烈火深入地下煤层不可收拾，吞噬了小镇地表并导致严重灾难。数百年后，当地下气化技术终成现实时，后人方才铭记先驱者付出的惨烈代价。",
          sourceIds: ["sfs-archive"],
        },
        {
          label: "创作背景与反响",
          text: "刘慈欣结合自己在娘子关发电厂多年的工程实践背景，将中国煤矿工人的生存困境与宏大工程构想结合，具有强烈的现实关怀与史诗感。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-wandering-earth",
    "《流浪地球》",
    2000,
    7,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "太阳氦闪即将毁灭太阳系，人类在地球装上万座巨型发动机，推动整个地球奔赴两千五百年的星际流浪之旅。",
    ["sfs-archive"],
    {
      significance: "荣获第12届中国科幻银河奖特等奖；开创‘带着家园去流浪’的宏大太空歌剧范式，后改编为影史现象级科幻电影系列。",
      tags: ["科幻", "银河奖", "行星发动机", "太空史诗", "刘慈欣"],
      facts: [
        { label: "首发刊物", text: "《科幻世界》2000年第7期", sourceIds: ["sfs-archive"] },
        { label: "所获荣誉", text: "第十二届中国科幻银河奖特等奖", sourceIds: ["sfs-archive"] },
        { label: "影视改编", text: "同名电影系列（2019、2023）", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "天文学家测算出太阳即将在四百年内发生氦闪爆炸吞噬太阳系，人类文明组建联合政府，放弃制造飞船逃生的路线，转而在欧亚和美洲大陆建造一万两千座巨型行星发动机，实施刹车、逃逸、前行和泊入新恒星轨道的宏伟‘流浪地球计划’。小说通过主人公的三代经历，展现了刹车时代的滔天海啸、地下城的生活变迁、逃逸时代的极端严寒，以及叛军对联合政府发动叛乱、将五千名科学家冻死后太阳发生氦闪的绝望讽刺。",
          sourceIds: ["sfs-archive"],
        },
        {
          label: "创作背景与反响",
          text: "小说跳脱出传统西方科幻造飞船离开地球的思维，以中华文化深沉的家园情结重塑太空歌剧，成为刘慈欣乃至中国科幻史最重要的里程碑之一。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-rural-teacher",
    "《乡村教师》",
    2001,
    1,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "贫困乡村绝症民办教师在弥留之际逼孩子们背诵牛顿定律，在外星星际舰队的清除筛选中奇迹般拯救了地球文明。",
    ["sfs-archive"],
    {
      significance: "银河奖读者读者评选一等奖；将极度赤贫的乡村民办教育与浩瀚宇宙星际战争并置，谱写了一曲文明传承的悲壮赞歌。",
      tags: ["科幻", "银河奖", "牛顿定律", "文明传承", "刘慈欣"],
      facts: [
        { label: "发表平台", text: "《科幻世界》2001年第1期", sourceIds: ["sfs-archive"] },
        { label: "所获荣誉", text: "第十三届中国科幻银河奖一等奖", sourceIds: ["sfs-archive"] },
        { label: "核心角色", text: "李宝库（乡村教师）", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "在极度贫困愚昧的西北山村里，身患食道癌晚期的民办教师李宝库自知时日无多，在窑洞教室里用尽最后微弱的气力，强令四个穷苦孩子背诵牛顿三大运动定律。与此同时，历经两万年星际战争的碳基联邦正对银河系边缘恒星系进行降维摧毁以建立隔离带。外星舰队抽选地球上的生命样本进行文明等级测试，四个孩子在没有无线电、没有高科技的环境下准确复述了力学定律，让高级文明震惊地发现这个碳基物种竟完全依靠个体间的直接教育实现知识传递，人类文明因此免于被瞬间抹杀。",
          sourceIds: ["sfs-archive"],
        },
        {
          label: "创作背景与反响",
          text: "刘慈欣将对底层乡村教育的深切痛感与最广阔的银河战史编织在一起，强烈的情感反差使该作被无数读者奉为刘慈欣情感浓度最高的神作之一。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-full-spectrum",
    "《全频带阻塞干扰》",
    2001,
    8,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "面对绝对信息劣势的高科技全面围剿，宇航员驾驶飞船撞向太阳制造全太阳风暴，将战争拉回钢铁与意志的视距对决。",
    ["sfs-archive"],
    {
      milestone: false,
      significance: "荣获银河奖特等奖；深刻探讨了不对称战争、现代化电子信息依赖与牺牲精神，具有极其强烈的铁血悲壮色彩。",
      tags: ["科幻", "银河奖", "电子战", "太阳风暴", "刘慈欣"],
      facts: [
        { label: "发表平台", text: "《科幻世界》2001年第8期", sourceIds: ["sfs-archive"] },
        { label: "所获荣誉", text: "第十三届中国科幻银河奖特等奖", sourceIds: ["sfs-archive"] },
        { label: "核心技术", text: "太阳耀斑全频带阻塞干扰", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "未来高科技数字化战场上，装甲集群利用全方位电子压制与信息化雷达卫星网络大举进攻，守军由于电子系统全面瘫痪陷入绝境。在太空中的宇航员列夫驾驶核动力考察船决绝冲向太阳表面，引爆太阳耀斑并引发人类历史上最猛烈的大范围磁暴，瞬间切断了全球一切高频电磁通讯与高科技侦察链路。战场回到了二战式的视距内钢铁肉搏，守军最终捍卫了国土。",
          sourceIds: ["sfs-archive"],
        },
        {
          label: "创作背景与反响",
          text: "作品存在中国版与俄罗斯版两个版本，是硬科幻军事推演与牺牲奉献精神的经典范例，引发长达数年的军迷与科幻迷讨论热潮。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-morning-star",
    "《朝闻道》",
    2002,
    1,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "高等地外文明设立真理祭坛，全球顶尖科学家为了获悉宇宙终极奥秘，决绝地以‘朝闻道夕死可矣’的生命代价换取真理解答。",
    ["sfs-archive"],
    {
      significance: "将中国先秦哲学思想‘朝闻道，夕死可矣’升华为纯粹的科学探索信仰，是刘慈欣思想哲理最纯粹的代表作之一。",
      tags: ["科幻", "理论物理", "真理祭坛", "科学哲学", "刘慈欣"],
      facts: [
        { label: "发表平台", text: "《科幻世界》2002年第1期", sourceIds: ["sfs-archive"] },
        { label: "体裁篇幅", text: "短篇小说", sourceIds: ["sfs-archive"] },
        { label: "核心意象", text: "真理祭坛 / 排险者", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "人类在罗布泊沙漠建造了巨大的爱因斯坦赤道环形对撞机，正要启动创世能级试验时被高等地外文明‘排险者’瞬间蒸发，以防止宇宙真空衰变。面对科学家对未知的痛苦渴望，排险者在沙漠中设立‘真理祭坛’，允许科学家提出关乎宇宙终极理论的根本问题，但获得解答后的十分钟内必须接受粒子湮灭死亡。霍金、丁仪等理论物理学家、数学家、生物学家毅然排起长队，怀着纯粹的欣喜走向祭坛，用肉身生命换取终极真理。",
          sourceIds: ["sfs-archive"],
        },
        {
          label: "创作背景与反响",
          text: "小说探讨了科学探索的终极意义与生命价值，展现了人类心智对宇宙可知论至死不渝的追求，被誉为硬科幻哲理巅峰篇章。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-supernova-era",
    "《超新星纪元》",
    2003,
    1,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "近地超新星爆发辐射导致所有成年人将在一年内死去，留下全球十三岁以下的孩子接管世界并经历残酷的儿童纪元。",
    ["writers-press"],
    {
      milestone: false,
      significance: "刘慈欣早期长篇代表作，借由极端社会学思想实验探讨文明演进、地缘政治与人性本质。",
      tags: ["科幻", "长篇小说", "社会思想实验", "儿童纪元", "刘慈欣"],
      facts: [
        { label: "出版机构", text: "作家出版社（2003年1月首版）", sourceIds: ["writers-press"] },
        { label: "体裁篇幅", text: "长篇小说", sourceIds: ["writers-press"] },
        { label: "创作年代", text: "1991年构思，2003年正式出版", sourceIds: ["writers-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "一颗超新星爆发产生的致命辐射照射地球，基因修复机制受损使所有十三岁以上的成年人生命进入倒计时。成人们在生命的最后十个月里加紧培训孩子们学习维持电力、农业、国防与政府运转。大人全部离世后，一个完全由儿童统治的世界诞生了。起初孩子们沉浸在糖果与游戏的狂欢中，但随后社会秩序迅速崩塌，各国孩子甚至在大洋与南极洲展开了使用真枪实弹的‘超新星奥运会’和残酷战争，最终在废墟上重建新的文明形态。",
          sourceIds: ["writers-press"],
        },
        {
          label: "创作背景与反响",
          text: "刘慈欣历时十余年数易其稿的长篇作品，以冷酷锋利的笔触撕破了对童年的浪漫化想象，是一部充满政治预言色彩的社会科幻经典。",
          sourceIds: ["writers-press"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-ball-lightning",
    "《球状闪电》",
    2004,
    6,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "陈博士为解开父母化为灰烬的球状闪电之谜穷尽一生，与武器狂人林云共同揭开宏电子与量子态观察者效应的惊世图景。",
    ["scitech-press"],
    {
      significance: "《三体》系列的重要前传与宇宙观奠基之作，塑造了丁仪、林云等经典角色，将量子物理假说与武器伦理推向极致。",
      tags: ["科幻", "长篇小说", "宏原子", "量子物理", "刘慈欣"],
      facts: [
        { label: "出版机构", text: "四川科学技术出版社（2004年6月）", sourceIds: ["scitech-press"] },
        { label: "丛书系列", text: "世界科幻大师丛书", sourceIds: ["scitech-press"] },
        { label: "关联作品", text: "《三体》系列前传世界观", sourceIds: ["scitech-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "在十四岁生日的暴风雨之夜，少年陈博士亲睹神秘的球状闪电穿墙而入，将父母瞬间化为飞灰而周围座椅完好无损。为此他倾注毕生精力研究这一自然谜团，并结识了对武器研发极度痴狂的少校女军官林云与理论物理天才丁仪。他们发现球状闪电本质上是空间中处于激发态的‘宏电子’，林云成功将其武器化并在战争中释放宏电子湮灭敌人。小说最后，林云自身也化为宏量子态，展现了观察者效应下既生又死的神秘世界。",
          sourceIds: ["scitech-press"],
        },
        {
          label: "创作背景与反响",
          text: "小说不仅在硬科幻设定上惊艳绝伦，更深刻探讨了纯粹科学探索与毁灭性军事应用之间的永恒伦理矛盾，是刘慈欣文学水准最成熟的长篇之一。",
          sourceIds: ["scitech-press"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-three-body-1",
    "《三体》",
    2006,
    5,
    "sci-fi",
    ["era-epic-and-mystery"],
    ["liu-cixin"],
    "叶文洁向宇宙发出暴露地球坐标的信号，引来半人马座恶劣三星环境下的三体文明，揭开人类文明与地外文明生死博弈的序幕。",
    ["sfs-archive", "hugo-database", "cq-press"],
    {
      significance: "荣获第73届雨果奖最佳长篇故事奖，亚洲首次获此殊荣；中国科幻走向世界的划时代巨著。",
      tags: ["科幻", "雨果奖", "红岸基地", "智子", "三体", "刘慈欣"],
      facts: [
        { label: "首发连载", text: "《科幻世界》2006年5月开始连载", sourceIds: ["sfs-archive"] },
        { label: "单行本出版", text: "重庆出版社（2008年1月）", sourceIds: ["cq-press"] },
        { label: "所获荣誉", text: "第73届雨果奖最佳长篇小说奖（2015）", sourceIds: ["hugo-database"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "文化大革命期间，天体物理学女学者叶文洁目睹父亲惨遭批斗致死，被发配至绝密的红岸基地。在对人类彻底绝望的痛苦中，她利用太阳对电磁波的能量放大镜效应向宇宙发出文明呼吁。四光年外半人马座三星系统中的三体文明收到了信号，派出由四百艘飞船组成的庞大舰队启航远征地球，并释放‘智子’封锁地球基础物理研究。纳米科学家汪淼与刑警史强介入调查科学家离奇自杀事件，揭开反人类组织地球三体协会（ETO）与外星入侵的惊天危机。",
          sourceIds: ["cq-press"],
        },
        {
          label: "创作背景与反响",
          text: "作品开创性地将中国现代历史创伤与最宏大的地外文明接触融为一体，重塑了世界对中国当代科幻的认知，开启了长达二十年的全球现象级阅读狂潮。",
          sourceIds: ["hugo-database"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-three-body-2",
    "《三体Ⅱ：黑暗森林》",
    2008,
    5,
    "sci-fi",
    ["era-epic-and-mystery"],
    ["liu-cixin"],
    "面对智子监控与水滴碾压，人类推行面壁计划；罗辑参透叶文洁留下的宇宙社会学公理，悟出冰冷的黑暗森林法则建立威慑。",
    ["cq-press"],
    {
      significance: "提出震撼思想界的‘黑暗森林法则’（猜疑链、技术爆炸），确立了当代太空社会学最著名的思想模型之一。",
      tags: ["科幻", "黑暗森林", "面壁计划", "罗辑", "水滴", "刘慈欣"],
      facts: [
        { label: "出版机构", text: "重庆出版社（2008年5月）", sourceIds: ["cq-press"] },
        { label: "体裁篇幅", text: "长篇小说", sourceIds: ["cq-press"] },
        { label: "核心法则", text: "宇宙社会学黑暗森林公理", sourceIds: ["cq-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "由于人类的一切通讯均受到三体智子的完全监控，联合国挑选了四位不受智子思维监控的‘面壁者’秘密构思防御战略。然而前三位面壁者的宏大计划均被三体破壁人轻易识破。在三体仅用一颗强互作用力探测器‘水滴’就近乎全歼人类两千艘主力太空舰队的至暗时刻，原本玩世不恭的第四位面壁者罗辑悟出了宇宙文明间充满猜疑链与灭霸本能的‘黑暗森林法则’。罗辑在荒原墓地将枪口对准自己的心脏，以随时发射三体星坐标引来神级文明清理为筹码，迫使三体舰队停航转向，开创了两个文明相持半个世纪的威慑纪元。",
          sourceIds: ["cq-press"],
        },
        {
          label: "创作背景与反响",
          text: "小说通过水滴摧毁太空舰队的毁灭性描摹与墓地终极对决，达到了硬科幻构思与文学戏剧冲突的巅峰，被广泛誉为《三体》三部曲中情节最精彩的一卷。",
          sourceIds: ["cq-press"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-three-body-3",
    "《三体Ⅲ：死神永生》",
    2010,
    11,
    "sci-fi",
    ["era-epic-and-mystery"],
    ["liu-cixin"],
    "程心接替执剑人导致威慑瓦解；故事跨越千万年尺度，呈现二向箔降维打击直至整个宇宙归零重生的浩瀚画卷。",
    ["cq-press"],
    {
      significance: "中国科幻史诗的壮丽绝唱；以二向箔降维打击、掩体世界与微型宇宙重构，将宏大叙事推向宇宙终局。",
      tags: ["科幻", "死神永生", "二向箔", "降维打击", "程心", "刘慈欣"],
      facts: [
        { label: "出版机构", text: "重庆出版社（2010年11月）", sourceIds: ["cq-press"] },
        { label: "体裁篇幅", text: "长篇小说", sourceIds: ["cq-press"] },
        { label: "时间跨度", text: "公元纪年跨越至宇宙终结", sourceIds: ["cq-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "航天工程师程心被选为威慑平衡的新一任执剑人，但在交接仅仅十五分钟后，三体便看透其母性博爱导致的软弱，水滴摧毁地球广播系统，人类威慑彻底瓦解。随后引力号飞船发射宇宙广播毁灭了三体星系，也招来了更高等文明‘歌者’的清理。歌者抛出一张仅有邮票大小的‘二向箔’，将整个太阳系从三维空间跌落压缩为二维平面。程心与关一帆凭借光速飞船逃离并在大宇宙坍缩的尽头进入微型宇宙，最终为促使宇宙归零重启而放弃私利，展现了关于爱、责任与宇宙归宿的终极寓言。",
          sourceIds: ["cq-press"],
        },
        {
          label: "创作背景与反响",
          text: "小说在空间维度、物理规律武器化以及千亿年宇宙命运上的惊世想象，突破了传统科幻的边界，确立了中国硬科幻在世界科幻殿堂的至高位置。",
          sourceIds: ["cq-press"],
        },
      ],
    },
  ),

  // ==================== 紫金陈 (6 部) ====================
  event(
    "zi-jin-chen-murder-officer",
    "《高智商犯罪》",
    2012,
    7,
    "suspense",
    ["era-epic-and-mystery"],
    ["zi-jin-chen"],
    "浙大学霸徐策运用精密物化逻辑与监控盲区设计完美复仇，警方破案专家高栋展开高智商逻辑较量。",
    ["jiangsu-lit-press"],
    {
      significance: "紫金陈成名作与‘高智商犯罪’系列的开端，开辟了本土网络硬核推理的新标杆。",
      tags: ["推理", "高智商犯罪", "徐策", "逻辑对决", "紫金陈"],
      facts: [
        { label: "网络首发", text: "天涯社区连载（原名《谋杀官员》）", sourceIds: ["jiangsu-lit-press"] },
        { label: "单行本出版", text: "湖南文艺/江苏文艺出版社（2014年版）", sourceIds: ["jiangsu-lit-press"] },
        { label: "核心角色", text: "徐策（复仇者） / 高栋（刑侦专家）", sourceIds: ["jiangsu-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "留美归国的浙江大学化学系高材生徐策，得知母亲在老家旧城改造中因抵制非法强拆惨遭涉黑拆迁队与腐败官员迫害致死。面对盘根错节的官场庇护，徐策放弃常规上访，化身代号‘逻辑’的复仇者。他运用严密的物理力学、化学试剂以及精准到秒的城市监控死角盲区，精心布置出一桩桩看似突发意外或完美密室的暗杀，接连将涉案高官精准处决。省公安厅刑侦技术专家高栋临危受命，两大逻辑高手在正义、程序与法理的边缘展开智勇博弈。",
          sourceIds: ["jiangsu-lit-press"],
        },
        {
          label: "创作背景与反响",
          text: "作者在天涯论坛连载时即引发海量网友追更与讨论。小说凭借极具技术含量的不在场证明设计与犀利的社会现实讽刺，奠定了紫金陈在当代悬疑推理界的地位。",
          sourceIds: ["jiangsu-lit-press"],
        },
      ],
    },
  ),

  event(
    "zi-jin-chen-burning-ice",
    "《无证之罪》",
    2014,
    1,
    "suspense",
    ["era-screen-and-bestseller"],
    ["zi-jin-chen"],
    "东北冰城发生‘雪人’连环杀人案，现场仅留无指纹烟头与挑衅卡片；怪才刑警严良与前法医骆闻卷入迷局。",
    ["new-star-press"],
    {
      significance: "紫金陈‘社会派推理三部曲’第一部；改编为同名现象级网剧，成为中国网络剧社会派悬疑的破局之作。",
      tags: ["悬疑", "社会派推理", "严良", "骆闻", "无证之罪", "紫金陈"],
      facts: [
        { label: "出版机构", text: "新星出版社 · 午夜文库（2014年1月）", sourceIds: ["new-star-press"] },
        { label: "系列归属", text: "社会派推理三部曲之一", sourceIds: ["new-star-press"] },
        { label: "影视改编", text: "秦昊主演同名网剧（2017）", sourceIds: ["new-star-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "连环杀人凶手‘雪人’在东北寒冬里屡次作案，现场除了雪地上一串单向脚印、一张嚣张挑衅的卡片和掐灭的无指纹过滤嘴香烟外，再无任何生物痕迹，成为典型无指纹、无目击证人、无监控的‘无证之罪’。绰号‘阎王’的编外刑警严良受邀介入调查，却发现‘雪人’背后隐藏着曾经名震省厅的顶级法医骆闻——他为了寻找多年前神秘失踪的妻女，故意以恶制恶逼迫警方重新调查陈年旧案。在法理与温情、复仇与罪赎的交织中，案件走向凄楚的终局。",
          sourceIds: ["new-star-press"],
        },
        {
          label: "创作背景与反响",
          text: "作品成功将日本社会派推理的社会批判意识移植入中国本土语境，冷冽的东北小城空间与复杂的人性抉择，赢得了文学界与影视界的高度认可。",
          sourceIds: ["new-star-press"],
        },
      ],
    },
  ),

  event(
    "zi-jin-chen-bad-kids",
    "《坏小孩》",
    2014,
    8,
    "suspense",
    ["era-screen-and-bestseller"],
    ["zi-jin-chen"],
    "三个孩子在景区无意录下张东升谋杀岳父母视频，因原生家庭创伤与金钱诱惑走向无法回头的人性深渊。",
    ["jiangsu-lit-press"],
    {
      significance: "‘社会派推理三部曲’第二部；改编网剧《隐秘的角落》引发全民热议，深刻剖析青少年犯罪心理与家庭教育裂痕。",
      tags: ["悬疑", "社会派", "朱朝阳", "隐秘的角落", "坏小孩", "紫金陈"],
      facts: [
        { label: "出版机构", text: "江苏文艺出版社（2014年8月）", sourceIds: ["jiangsu-lit-press"] },
        { label: "系列归属", text: "社会派推理三部曲之二", sourceIds: ["jiangsu-lit-press"] },
        { label: "影视改编", text: "网剧《隐秘的角落》（2020）", sourceIds: ["jiangsu-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "性格孤僻内向但数学天赋极高的学霸初中生朱朝阳，遇到了从福利院逃跑出来投奔他的同乡严良与小女孩普普。三个孩子在六峰山顶拍照游玩时，无意中录下了入赘女婿张东升将岳父母故意推下悬崖的杀人过程。为了筹措为普普弟弟治病的三十万元巨款，三个孩子与凶残的张东升展开危险周旋并进行敲诈。在家庭离异的冷漠、父爱的偏颇以及嫉妒与猜忌的发酵下，看似最孱弱的孩子逐步学会了用缜密的日记与借刀杀人布局，最终让所有知情者命丧黄泉，自己独善其身。",
          sourceIds: ["jiangsu-lit-press"],
        },
        {
          label: "创作背景与反响",
          text: "小说对未成年人纯真外表下潜伏的残酷心机进行了毫无保留的冷酷剖析，改编剧集《隐秘的角落》掀起现象级流行文化风暴，金句‘一起爬山吗’风靡全国。",
          sourceIds: ["jiangsu-lit-press"],
        },
      ],
    },
  ),

  event(
    "zi-jin-chen-long-night",
    "《长夜难明》",
    2017,
    1,
    "suspense",
    ["era-screen-and-bestseller"],
    ["zi-jin-chen"],
    "年轻检察官江阳为替支教受害青年翻案历经十年磨难，倾家荡产、家破人亡，最终以身做局用生命撕开漫漫长夜。",
    ["yunnan-peoples-press"],
    {
      significance: "‘社会派推理三部曲’巅峰收官之作；改编剧集《沉默的真相》豆瓣评分9.0，被誉为中国当代现实主义社会派推理的丰碑。",
      tags: ["悬疑", "社会派", "江阳", "沉默的真相", "长夜难明", "紫金陈"],
      facts: [
        { label: "出版机构", text: "云南人民出版社（2017年1月）", sourceIds: ["yunnan-peoples-press"] },
        { label: "系列归属", text: "社会派推理三部曲之三（终结篇）", sourceIds: ["yunnan-peoples-press"] },
        { label: "影视改编", text: "白宇、廖凡主演网剧《沉默的真相》（2020）", sourceIds: ["yunnan-peoples-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "某市繁华地铁站内，知名法学教授张超企图携带一只巨大行李箱登车，被安检人员发现有液体渗出，随后声称箱内有炸弹引发恐慌。防暴特警将其制服后打开箱子，赫然发现里面蜷缩着前任优秀检察官江阳的冰冷尸体。警方严加审讯下张超当场认罪，但在公开庭审中却突然全盘翻供。专案组刑警严良抽丝剥茧，终于揭开一段令人潸然泪下的惨烈往事：为了给十年前在偏远苗高乡因调查权贵性侵幼女案而惨遭灭口的支教大学生侯贵平平反昭雪，江阳、李静、朱伟、陈明章等人耗尽十年青春与社会前途，在强权与黑恶势力的层层绞杀下身败名裂、罹患绝症，最终以江阳的自杀抛尸大案迫使最高检介入，点亮了正义微光。",
          sourceIds: ["yunnan-peoples-press"],
        },
        {
          label: "创作背景与反响",
          text: "作品以沉痛震撼的笔力展现了正义追寻过程中的惨痛牺牲与赤子之心，感动了千百万读者与观众，成为国产社会派悬疑小说的最高口碑代表作之一。",
          sourceIds: ["yunnan-peoples-press"],
        },
      ],
    },
  ),

  event(
    "zi-jin-chen-low-iq-crime",
    "《低智商犯罪》",
    2019,
    1,
    "suspense",
    ["era-screen-and-bestseller"],
    ["zi-jin-chen"],
    "运气爆棚的福将刑警张宝民下派偏僻小县办案，各路心怀鬼胎的笨贼贪官在一连串荒诞巧合中互相拆台自投罗网。",
    ["zhejiang-lit-press"],
    {
      milestone: false,
      significance: "紫金陈突破沉重社会派基调的黑色幽默推理力作，展现了出色的多线叙事结构与喜剧解构才能。",
      tags: ["推理", "黑色幽默", "张宝民", "低智商犯罪", "紫金陈"],
      facts: [
        { label: "出版机构", text: "浙江文艺出版社（2019年1月）", sourceIds: ["zhejiang-lit-press"] },
        { label: "体裁篇幅", text: "长篇幽默悬疑小说", sourceIds: ["zhejiang-lit-press"] },
        { label: "风格转型", text: "黑色幽默与多线交织推理", sourceIds: ["zhejiang-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "省城刑侦总队‘福将’张宝民警官被临时借调到边缘贫困的三水县协助办案。此时的三水县暗流涌动：本省最大的文物盗窃集团、企图暗杀市长换取开发权的地产寡头、两个走投无路但智商严重欠缺的职业杀手，以及各自心怀鬼胎的基层混混全部汇聚于此。张宝民在完全摸不着头脑的办案过程中凭借匪夷所思的超级运气与天然呆性格，让各路智商欠费的犯罪分子在误会、巧合与自作聪明中频频撞车、互相火并，最后戏剧性地全军覆没。",
          sourceIds: ["zhejiang-lit-press"],
        },
        {
          label: "创作背景与反响",
          text: "作品摆脱了以往压抑沉郁的基调，借鉴了盖·里奇式的疯狂喜剧多线索推进手法，向读者证明了推理小说也可以充满欢笑与智慧的轻松碰撞。",
          sourceIds: ["zhejiang-lit-press"],
        },
      ],
    },
  ),

  event(
    "zi-jin-chen-tracker",
    "《追踪师》",
    2020,
    4,
    "suspense",
    ["era-screen-and-bestseller"],
    ["zi-jin-chen"],
    "计算机视觉天才陈舟与高智商反侦查逃犯在天网监控密布的现代化都市中，展开毫秒级大数据猫鼠追逐。",
    ["beijing-joint-press"],
    {
      milestone: false,
      significance: "将现代人脸识别、天网大数据与传统逻辑推理紧密融合，探讨高科技刑侦与数字时代隐私伦理。",
      tags: ["悬疑", "高科技刑侦", "人脸识别", "天网大数据", "紫金陈"],
      facts: [
        { label: "出版机构", text: "北京联合出版公司 · 联合读创（2020年4月）", sourceIds: ["beijing-joint-press"] },
        { label: "体裁篇幅", text: "长篇都市刑侦小说", sourceIds: ["beijing-joint-press"] },
        { label: "核心技术", text: "步态识别 / 监控盲区算法", sourceIds: ["beijing-joint-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "在数字化天网工程覆盖每一个街角小巷的现代都市里，曾经的计算机天才、因意外致残的陈舟隐居幕后，凭借自研的人脸步态识别算法与鹰隼般的空间直觉成为警方‘幽灵顾问’。与此同时，擅长利用监控光学死角、易容术与数据噪声抹去一切轨迹的高智商通缉犯在繁华市区犯下连环大案。在数以万计的摄像头数据洪流中，两位顶尖的大数据追踪者展开了一场毫秒级的猫鼠博弈。",
          sourceIds: ["beijing-joint-press"],
        },
        {
          label: "创作背景与反响",
          text: "紫金陈紧跟当代智慧安防与AI图像分析前沿，拓展了本土刑侦小说的技术边界，展现了现代技术对抗下的智谋较量。",
          sourceIds: ["beijing-joint-press"],
        },
      ],
    },
  ),

  // ==================== 马伯庸 (9 部) ====================
  event(
    "ma-bo-yong-wind-from-longxi",
    "《风起陇西》",
    2006,
    1,
    "historical",
    ["era-epic-and-mystery"],
    ["ma-bo-yong"],
    "现代间谍反间战法植入三国时代；蜀汉北伐期间，高级潜伏间谍陈恭与反谍专家荀诩在陇西大地上展开殊死军情暗战。",
    ["hainan-press"],
    {
      significance: "马伯庸长篇历史小说处女作与成名作；开创‘三国谍战’流派，后改编为陈坤、白宇主演同名历史剧。",
      tags: ["历史", "谍战小说", "三国", "风起陇西", "马伯庸"],
      facts: [
        { label: "出版机构", text: "海南出版社（2006年1月首版）", sourceIds: ["hainan-press"] },
        { label: "体裁篇幅", text: "长篇历史谍战小说", sourceIds: ["hainan-press"] },
        { label: "影视改编", text: "同名历史剧集《风起陇西》（2022）", sourceIds: ["hainan-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "蜀汉建兴六年，丞相诸葛亮挥师北伐，却因街亭失守功亏一篑。战后蜀汉最高军事情报机构‘司闻曹’经过排查，发现蜀汉潜伏在曹魏高层的核心情报员‘白帝’所传回的情报被人秘密调包，而司闻曹内部极可能潜伏着代号‘烛龙’的魏国顶级卧底。反谍专家荀诩奉命潜入敌后审查‘白帝’陈恭，二人识破离间之计后联手调查，却发现整个情报战不仅关乎前线诸葛连弩机密的生死争夺，更深陷蜀汉内部李严与诸葛亮派系之间残酷冷血的政治倾轧。",
          sourceIds: ["hainan-press"],
        },
        {
          label: "创作背景与反响",
          text: "马伯庸将现代情报局、双重间谍、加密破译等冷战谍战元素巧妙融入三国演义的历史夹缝中，以天马行空而严密自洽的考证风格一鸣惊人。",
          sourceIds: ["hainan-press"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-mystery-of-antiques",
    "《古董局中局》",
    2012,
    9,
    "suspense",
    ["era-epic-and-mystery"],
    ["ma-bo-yong"],
    "北京琉璃厂店主许愿卷入几十年前武则天明堂佛头失窃案，以五脉家传秘术层层解开造假古董与家族恩怨的惊天大局。",
    ["jiangsu-lit-press"],
    {
      significance: "掀起当代古董鉴定、传统文化悬疑文学热潮；入选多项畅销榜，改编为系列电视剧及院线电影。",
      tags: ["悬疑", "古董鉴宝", "五脉传承", "文化探秘", "马伯庸"],
      facts: [
        { label: "出版机构", text: "江苏文艺出版社（2012年9月）", sourceIds: ["jiangsu-lit-press"] },
        { label: "体裁篇幅", text: "长篇文化悬疑小说", sourceIds: ["jiangsu-lit-press"] },
        { label: "影视改编", text: "系列电视剧及院线电影《古董局中局》", sourceIds: ["jiangsu-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "北京琉璃厂一家不起眼的古董店老板许愿，本是古董鉴宝权威组织‘五脉白门’的传人，因祖父许一城在民国时期因贩卖汉白玉佛头给日本人被枪决而家道中落。半个世纪后，日本木户家族欲将佛头归还中国，却指名要求唯有许一城的后人许愿能出面鉴定真伪。许愿被迫卷入五脉内部权力斗争、神秘造假垄断组织‘老朝奉’的步步暗杀以及跨国文物流转黑幕，凭借祖传的鉴宝绝技与机敏心智，为祖父洗刷汉奸污名，守护国家瑰宝。",
          sourceIds: ["jiangsu-lit-press"],
        },
        {
          label: "创作背景与反响",
          text: "小说融汇了极为扎实精微的瓷器、书画、玉器鉴别知识与老北京民俗，打造了引人入胜的鉴古江湖，开启了马伯庸畅销书创作的黄金期。",
          sourceIds: ["jiangsu-lit-press"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-secret-of-three-kingdoms",
    "《三国机密》",
    2014,
    2,
    "historical",
    ["era-screen-and-bestseller"],
    ["ma-bo-yong"],
    "病危汉献帝让孪生弟弟刘平偷天换日入宫继位，刘平在曹操集团严密监视下与司马懿联手匡扶汉室黎民。",
    ["jiangsu-lit-press"],
    {
      milestone: false,
      significance: "视角独特的历史翻案之作；以人道主义情怀重新诠释汉末乱世权谋，改编为大型传奇古装剧。",
      tags: ["历史", "三国", "汉献帝", "司马懿", "马伯庸"],
      facts: [
        { label: "出版机构", text: "江苏文艺出版社（2014年2月）", sourceIds: ["jiangsu-lit-press"] },
        { label: "体裁篇幅", text: "长篇历史小说（全两卷）", sourceIds: ["jiangsu-lit-press"] },
        { label: "影视改编", text: "电视剧《三国机密之潜龙在渊》（2018）", sourceIds: ["jiangsu-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "建安四年，曹操迎奉天子于许都，汉献帝刘协看似傀儡，实则在病危之际布下一盘险绝奇局：召回流落民间、与自己容貌无二的孪生弟弟刘平，秘密换入宫中顶替帝位，由皇后伏寿辅佐。刘平生性仁厚，从最初的不谙世事迅速成长为沉稳君主，在曹操首席谋臣郭嘉、满宠的层层猜忌盘查下暗中周旋，并与自幼结义的司马懿联手对抗曹魏阵营，试图在乱世狂澜中以不流血的方式匡扶黎民百姓。",
          sourceIds: ["jiangsu-lit-press"],
        },
        {
          label: "创作背景与反响",
          text: "作品跳出尊刘贬曹或尊曹贬刘的窠臼，通过一位不忍生灵涂炭的年轻假天子之眼，反思乱世权谋争霸的终极道德代价。",
          sourceIds: ["jiangsu-lit-press"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-longest-day-in-changan",
    "《长安十二时辰》",
    2017,
    1,
    "historical",
    ["era-screen-and-bestseller"],
    ["ma-bo-yong"],
    "盛唐上元节突厥狼卫潜入长安欲引爆伏火雷焚城，死囚张小敬与靖安司丞李必在十二个时辰内争分夺秒拯救长安生灵。",
    ["hunan-lit-press"],
    {
      significance: "2017年现象级历史巨作；以美剧节奏与极度严谨的唐代坊市物候考据，掀起大唐历史文化美学浪潮。",
      tags: ["历史", "长安十二时辰", "张小敬", "盛唐反恐", "马伯庸"],
      facts: [
        { label: "出版机构", text: "湖南文艺出版社（2017年1月）", sourceIds: ["hunan-lit-press"] },
        { label: "体裁篇幅", text: "长篇历史悬疑小说（全二册）", sourceIds: ["hunan-lit-press"] },
        { label: "影视改编", text: "雷佳音、易烊千玺主演同名古装剧（2019）", sourceIds: ["hunan-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "天宝三年上元节，繁华盛世的大唐长安城灯火如昼、取消宵禁。然而绝密情报显示，突厥恐怖势力‘狼卫’已暗中渗透城内，密谋利用伏火雷引发焚城浩劫。年轻的靖安司司丞李必破格从死牢中提拔出因杀人获罪的前长安不良帅张小敬担任特侦捕手。在短短二十四小时（十二个时辰）的时限里，张小敬拖着残躯在长安一百零八坊间出生入死，穿梭于三教九流与朝廷权相、太监、太子派系之间的险恶杀机中，以平凡小人物的孤勇守护帝都微贱生灵。",
          sourceIds: ["hunan-lit-press"],
        },
        {
          label: "创作背景与反响",
          text: "全书源自知乎上一个‘如果给《刺客信条》做中国版选在哪里’的脑洞问题，马伯庸以严密考据的大唐官制、望楼密码、饮食服饰重构了长安城的呼吸肌理，风靡华语文化圈。",
          sourceIds: ["hunan-lit-press"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-ming-microscope",
    "《显微镜下的大明》",
    2019,
    1,
    "non-fiction",
    ["era-screen-and-bestseller"],
    ["ma-bo-yong"],
    "从明代民间文书与诉讼档案中打捞出徽州丝绢案等六桩真实事件，以微观视角解构基层官僚运转与百姓赋税博弈。",
    ["hunan-lit-press"],
    {
      significance: "马伯庸历史非虚构代表作，豆瓣评分8.7；开创大众通俗档案历史写作典范，首案改编为网剧《丝绢案》。",
      tags: ["非虚构", "历史档案", "明代社会", "徽州丝绢案", "马伯庸"],
      facts: [
        { label: "出版机构", text: "湖南文艺出版社（2019年1月）", sourceIds: ["hunan-lit-press"] },
        { label: "体裁形式", text: "历史非虚构随笔", sourceIds: ["hunan-lit-press"] },
        { label: "核心案件", text: "徽州丝绢案 / 婺源龙脉争端等六案", sourceIds: ["hunan-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "全书选取了明代极具代表性的六个民间真实案例：徽州府歙县算学狂人帅嘉谟偶然在账册中发现本县竟凭空多承担了六县的三千五百三十两‘人丁丝绢税’，由此引发长达数十年、震动南直隶巡抚与户部的滔天诉讼；此外还涵盖了婺源县为了保卫祖山龙脉与徽州府的跨世纪争端、杨乃武与小白菜式的黄岩民告官冤案等。马伯庸摒弃帝王将相的宏大叙事，通过泛黄的诉讼状纸还原了明代基层社会的保甲、粮长、胥吏、乡绅与赋税游戏规则。",
          sourceIds: ["hunan-lit-press"],
        },
        {
          label: "创作背景与反响",
          text: "作者历经数年扎根地方志与原始档案，将晦涩枯燥的赋税算学与法条演化写得扣人心弦，让普通读者看清了帝国庞大官僚机器在基层的真实咬合与震颤。",
          sourceIds: ["hunan-lit-press"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-lychee-of-changan",
    "《长安的荔枝》",
    2021,
    4,
    "historical",
    ["era-micro-history-mature"],
    ["ma-bo-yong"],
    "九品小吏李善德误领‘荔枝使’死差，算尽分枝植瓮与冰镇驿骑运荔枝入长安，借小人物视角道尽盛唐盛世疮痍与良心坚守。",
    ["hunan-lit-press"],
    {
      significance: "现象级畅销历史小说，豆瓣超10万人评分8.5；以现代职场共情解构盛唐官僚体制，广受各界好评。",
      tags: ["历史", "荔枝使", "职场寓言", "长安的荔枝", "李善德", "马伯庸"],
      facts: [
        { label: "出版机构", text: "湖南文艺出版社（2021年4月）", sourceIds: ["hunan-lit-press"] },
        { label: "体裁篇幅", text: "中篇历史小说", sourceIds: ["hunan-lit-press"] },
        { label: "经典名句", text: "就算失败，我也想知道自己倒在距离终点多远的地方", sourceIds: ["hunan-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "长安城上林署九品监事李善德老实巴交、苦熬多年终于在京城按揭买了一间小宅，却被同僚哄骗接下了烫手的‘荔枝使’差事——圣人要在贵妃生辰时吃岭南新鲜荔枝。荔枝‘一日色变，两日香变，三日味变’，而岭南距长安五千四百余里，在冷链运输完全不可能的古代堪称必死任务。李善德不甘坐以待毙，奔赴岭南利用算学推演，精确设计分枝植瓮、双层冰镇与飞骑换驿接力路线，历尽千难万险终于将荔枝运抵京城。然而亲眼目睹沿途驿户破产、劳民伤财的盛世疮痍后，李善德在杨国忠面前毅然发出抗议，丢官流放岭南，反而在安史之乱的浩劫中保全了阖家性命。",
          sourceIds: ["hunan-lit-press"],
        },
        {
          label: "创作背景与反响",
          text: "小说以凝练紧凑的笔触将古代物流技术试验与当代普通打工人的职场困境深度互文，既有惊心动魄的算法推演，又有催人泪下的人性光辉，被誉为马伯庸文字张力最饱满的作品之一。",
          sourceIds: ["hunan-lit-press"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-great-healer",
    "《大医》",
    2022,
    3,
    "historical",
    ["era-micro-history-mature"],
    ["ma-bo-yong"],
    "聚焦晚清至民国中国现代红十字会与公共卫生医学发端；三位青年医者在日俄战争、鼠疫与抗战血火中以医济世。",
    ["shanghai-lit-press"],
    {
      significance: "历时数年查阅数百万字医史档案写就的长篇巨著，讴歌中国第一代红十字医者的医道仁心与民族气节。",
      tags: ["历史", "医学史", "红十字会", "大医精诚", "马伯庸"],
      facts: [
        { label: "出版机构", text: "上海文艺出版社（2022年3月/10月分《破晓篇》《日出篇》）", sourceIds: ["shanghai-lit-press"] },
        { label: "体裁篇幅", text: "长篇史诗历史小说（全两卷）", sourceIds: ["shanghai-lit-press"] },
        { label: "核心主角", text: "方三响 / 孙希 / 姚英", sourceIds: ["shanghai-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "清末光绪三十年，日俄战争在中国东北土地上爆发，灾民遍野。上海成立中国红十字会雏形‘东三省红十字普济善会’。东北猎户遗孤方三响、留洋归来的商贾之子孙希、教会收养的贫苦孤女姚英三位身世截然不同的年轻人在命运际会下步入医学圣殿。他们亲历了晚清租界防疫、辛亥革命汉口战地救护、1910年东北肺鼠疫阻击战、五卅运动以及淞沪会战。面对一次次战争动荡与致命疫情，三位青年大医秉持‘医者无类、博爱济世’的信念，以手术刀为武器，在血火硝烟中守护中华民族的生命尊严。",
          sourceIds: ["shanghai-lit-press"],
        },
        {
          label: "创作背景与反响",
          text: "马伯庸在创作期间得到复华大学附属华山医院等多家百年医学机构的档案支持，将近代医学发展与波澜壮阔的近现代史深度融合，呈现了一部宏大的医者群像。",
          sourceIds: ["shanghai-lit-press"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-taibai-jinxing",
    "《太白金星有点烦》",
    2023,
    4,
    "historical",
    ["era-micro-history-mature"],
    ["ma-bo-yong"],
    "体制职场视角戏说西游：太白金星李长庚奉命落地‘西天取经’项目，在人情编制与利益博弈中坚守本心、修仙修心。",
    ["hunan-lit-press"],
    {
      significance: "兼具西游神话解构与当代职场讽喻的爆款中篇，引发广大年轻读者强烈共鸣，探讨成仙与修心的终极意义。",
      tags: ["历史", "神话解构", "职场讽喻", "西天取经", "李长庚", "马伯庸"],
      facts: [
        { label: "出版机构", text: "湖南文艺出版社（2023年4月）", sourceIds: ["hunan-lit-press"] },
        { label: "体裁篇幅", text: "中篇小说", sourceIds: ["hunan-lit-press"] },
        { label: "核心主题", text: "修仙不如修心 / 职场通透哲学", sourceIds: ["hunan-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "天庭老神仙太白金星李长庚接到了玉帝与如来佛祖联合下发的一项政治任务：策划实施玄奘‘西天取经’并协助师徒四人成佛。看似简单的护送项目，实则处处是人情世故与雷区——九九八十一难的妖怪哪些是有后台的必须保命放行、哪些是没背景的必须斩草除根；取经队伍的人员编制平衡、黄风怪的因果纠缠以及六耳猕猴的舆情公关……李长庚在官僚系统的文山会海与派系妥协中焦头烂额，最终却在护送取经的过程中找回了自己当年初心，参透了‘修仙不如修心’的真谛。",
          sourceIds: ["hunan-lit-press"],
        },
        {
          label: "创作背景与反响",
          text: "小说妙趣横生而又洞察世事，在荒诞滑稽的取经项目推演下藏着对体制内打工人甘苦的心疼，展现了马伯庸举重若轻的讽喻功力。",
          sourceIds: ["hunan-lit-press"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-food-of-the-south",
    "《食南之徒》",
    2024,
    4,
    "historical",
    ["era-micro-history-mature"],
    ["ma-bo-yong"],
    "西汉贪吃县尉唐蒙出使南越，凭通神味觉从神秘调味‘枸酱’抽丝剥茧破获宫廷阴谋，暗合南越归汉的历史大势。",
    ["hunan-lit-press"],
    {
      significance: "‘美食+历史悬疑’的惊艳结合；将舌尖风味、古代植物地理学与帝国博弈熔于一炉，被评为2024年度畅销佳作。",
      tags: ["历史", "美食推理", "南越国", "枸酱", "唐蒙", "马伯庸"],
      facts: [
        { label: "出版机构", text: "湖南文艺出版社（2024年4月）", sourceIds: ["hunan-lit-press"] },
        { label: "体裁篇幅", text: "长篇历史小说", sourceIds: ["hunan-lit-press"] },
        { label: "核心线索", text: "南越枸酱与夜郎古道", sourceIds: ["hunan-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "汉武帝建元六年，汉使唐蒙奉命出使南越国。唐蒙虽胸无大志、一心只想品尝天下美味，却生有一根通神般敏锐的舌头与过人嗅觉。在南越国都番禺，唐蒙在宴席上尝到了一味风味绝伦的神秘调料‘枸酱’，随之卷入南越宫廷两派势力的夺权暗杀与离奇命案。唐蒙顺着食材的产地、香料的气味和烹饪的细节顺藤摸瓜，不仅查明了毒杀重臣的真相，更意外推导出了夜郎国与南越之间的秘密走私水道，为大汉帝国开辟西南夷战略要道、平定南越奠定了关键地理信息。",
          sourceIds: ["hunan-lit-press"],
        },
        {
          label: "创作背景与反响",
          text: "作品开创了历史小说中前所未见的美食悬疑题材，将岭南古代物产、南越历史风貌与汉代开疆拓土的大时代气魄巧妙结合，好评如潮。",
          sourceIds: ["hunan-lit-press"],
        },
      ],
    },
  ),
];

export const writersCatalog: Catalog = {
  topic: {
    id: "writers",
    title: "作家作品",
    path: "/writers/",
    periodLabel: "创作时代",
    periodSegment: "eras",
    description: "从刘慈欣的科幻宏构、紫金陈的社会派推理到马伯庸的历史微细叙事，记录当代作家的作品发布时间线与内容简介。",
    coverage: "精选刘慈欣、紫金陈、马伯庸的核心小说与代表作出版记录，附内容简介、体裁分类与出版来源。",
    categories: [
      { id: "sci-fi", title: "科幻文学" },
      { id: "suspense", title: "悬疑推理" },
      { id: "historical", title: "历史小说" },
      { id: "non-fiction", title: "纪实与随笔" },
    ],
    shortcuts: [
      { title: "刘慈欣作品年谱", path: "/writers/authors/liu-cixin/" },
      { title: "紫金陈作品年谱", path: "/writers/authors/zi-jin-chen/" },
      { title: "马伯庸作品年谱", path: "/writers/authors/ma-bo-yong/" },
      { title: "科幻文学", path: "/writers/categories/sci-fi/" },
      { title: "悬疑推理", path: "/writers/categories/suspense/" },
      { title: "历史小说", path: "/writers/categories/historical/" },
      { title: "纪实与随笔", path: "/writers/categories/non-fiction/" },
    ],
  },
  periods,
  events,
  entities,
  sources,
};
