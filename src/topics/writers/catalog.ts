import { writersReviewedSources, writersRelations } from "./reviewed-works";
import { zijinReviewedEvents, zijinReviewedSources } from "./zijin-reviewed-works";
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
  ...writersReviewedSources,
  ...zijinReviewedSources,
  source("sfs-archive", "《科幻世界》杂志社刊发档案", "科幻世界杂志社", "https://www.sfw.com.cn/", "期刊档案", "1999—2006 年期刊发表与中国科幻银河奖评奖档案"),
  source("cq-press", "重庆出版社当代文学与科幻出版档案", "重庆出版社", "https://www.cqph.com/", "出版档案", "《三体》三部曲单行本出版记录与印次信息"),
  source("scitech-press", "四川科学技术出版社出版书目", "四川科学技术出版社", "https://www.sckjpress.com/", "出版档案", "世界科幻大师丛书 · 《球状闪电》2004 年版出版档案"),
  source("writers-press", "作家出版社当代文学出版档案", "作家出版社", "https://www.writerspress.com.cn/", "出版档案", "刘慈欣《超新星纪元》2003 年首版出版记录"),
  source("new-star-press", "新星出版社午夜文库档案", "新星出版社", "https://www.newstarpress.com/", "出版档案", "午夜文库 · 紫金陈《无证之罪》2014 年版出版记录"),
  source("jiangsu-lit-press", "江苏凤凰文艺出版社出版书目", "江苏凤凰文艺出版社", "https://www.jswy.com.cn/", "出版档案", "紫金陈《坏小孩》、马伯庸《古董局中局》《三国机密》出版档案"),
  source("yunnan-peoples-press", "云南人民出版社出版档案", "云南人民出版社", "https://www.ynrmcbs.com/", "出版档案", "紫金陈《长夜难明》2017 年首版出版记录"),
  source("beijing-joint-press", "北京联合出版公司图书档案", "北京联合出版公司", "https://www.bjjoint.com/", "出版档案", "联合读创 · 紫金陈《追踪师》再版与《黄金原野》中文选集出版记录"),
  source("hainan-press", "海南出版社文学出版档案", "海南出版社", "https://www.hainanpress.com/", "出版档案", "马伯庸《风起陇西》2006 年首版出版记录"),
  source("hunan-lit-press", "湖南文艺出版社当代原创档案", "湖南文艺出版社", "https://www.hnwyp.com/", "出版档案", "马伯庸《长安十二时辰》《显微镜下的大明》《长安的荔枝》《太白金星有点烦》《食南之徒》《两京十五日》《桃花源没事儿》出版档案"),
  source("shanghai-lit-press", "上海文艺出版社原创文学档案", "上海文艺出版社", "https://www.rw-sh.com/", "出版档案", "马伯庸《大医》（破晓篇、日出篇）2022 年版出版记录"),
  source("nlc-china", "中国国家图书馆全国总书目", "国家图书馆国家书目数据库", "https://www.nlc.cn/", "国家书目", "当代华语作家作品在版编目（CIP）与版本典藏登记"),
  source("chinawriter", "中国作家网·书汇与作品档案", "中国作家协会", "https://www.chinawriter.com.cn/", "出版档案", "当代作家作品出版信息、书讯与内容简介"),
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
    entityIds: ["liu-cixin", "zi-jin-chen", "ma-bo-yong"],
    sourceIds: ["sfs-archive", "writers-press", "hainan-press"],
    summary: "世纪之交，当代类型小说迎来创新热潮。刘慈欣在《科幻世界》密集发表《鲸歌》《带上她的眼睛》《流浪地球》《乡村教师》《朝闻道》《球状闪电》等作，确立硬科幻宏大构思；紫金陈以《爱不明白》《少年股神》初试啼声；马伯庸活跃于早期网络社区，完成首部长篇历史谍战小说《风起陇西》。",
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
    entityIds: ["liu-cixin", "zi-jin-chen", "ma-bo-yong"],
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
    "《三体》开始连载",
    2006,
    5,
    "sci-fi",
    ["era-epic-and-mystery"],
    ["liu-cixin"],
    "一次向宇宙发出的信号把地球与濒临毁灭的外星文明联系起来，人类内部也开始分化为迎接者与抵抗者。",
    ["writers-three-body-chronology", "writers-three-body-tor"],
    {
      significance: "三部曲的第一部先以期刊连载进入读者视野；连载、中文成书、英文译介与获奖是四个不同的时间节点。",
      tags: ["科幻", "三体", "期刊首发", "刘慈欣"],
      milestone: true,
      facts: [
        {
          label: "节点类型",
          text: "期刊连载开始",
          sourceIds: ["writers-three-body-chronology"]
        },
        {
          label: "连载范围",
          text: "2006 年 5—12 月，共八个月",
          sourceIds: ["writers-three-body-chronology"]
        }
      ],
      details: [
        {
          label: "首发与版本",
          text: "《科幻世界》于 2006 年 5 月开始连载，12 月结束；中文单行本另记在 2008 年 1 月。",
          sourceIds: ["writers-three-body-chronology"],
          locator: "2006 年与 2008 年条目"
        },
        {
          label: "作品入口",
          text: "故事将中国的历史经验与第一次外星接触并置；可先把握两个文明的接触及人类的不同回应，再进入续作。",
          sourceIds: ["writers-three-body-tor"],
          locator: "Book Details：首部与故事背景"
        }
      ],
      note: "此处日期是首期连载月份，不是单行本、英译本或获奖日期；简介不预先揭示主要结局。"
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
    "面对外星文明对信息的监控，人类启动面壁计划；罗辑成为四位面壁者中最出人意料的一员。",
    ["writers-three-body-chronology", "writers-dark-forest-tor"],
    {
      significance: "三部曲第二部将文明接触推进到战略与信任困境；阅读时应把小说的宇宙社会学设想与现实科学结论区分开。",
      tags: ["科幻", "三体", "面壁计划", "刘慈欣"],
      milestone: true,
      facts: [
        {
          label: "节点类型",
          text: "中文单行本出版",
          sourceIds: ["writers-three-body-chronology"]
        },
        {
          label: "系列位置",
          text: "三部曲第二部",
          sourceIds: ["writers-dark-forest-tor"]
        }
      ],
      details: [
        {
          label: "版本与承接",
          text: "中文单行本出版于 2008 年 5 月，承接《三体》第一部。英文出版社将其列为系列第二卷。",
          sourceIds: ["writers-three-body-chronology", "writers-dark-forest-tor"],
          locator: "年表 2008 年；出版社 Volume 2"
        },
        {
          label: "内容简介",
          text: "智子的监视使公开部署难以保密，面壁者因此以未被读取的思想构思防御方案。天文学家、社会学家罗辑被选中后，必须理解自己为何受到特别关注。",
          sourceIds: ["writers-dark-forest-tor"],
          locator: "Book Details：Wallfacer Project 与 Luo Ji"
        }
      ],
      note: "2008 年 5 月按中文出版年表记录；引用的英文作品页另有其有声版发行日期，二者不可混用。"
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
    "黑暗森林威慑维持着脆弱和平，从冬眠中苏醒的航天工程师程心进入一个新的时代，也改变了两种文明的平衡。",
    ["writers-three-body-chronology", "writers-deaths-end-tor"],
    {
      significance: "作为三部曲终卷，它把技术选择、伦理责任与文明存续放到更大的时间和空间尺度中。",
      tags: ["科幻", "三体", "程心", "刘慈欣"],
      milestone: true,
      facts: [
        {
          label: "节点类型",
          text: "中文单行本出版",
          sourceIds: ["writers-three-body-chronology"]
        },
        {
          label: "系列位置",
          text: "三部曲第三部",
          sourceIds: ["writers-deaths-end-tor"]
        }
      ],
      details: [
        {
          label: "版本与承接",
          text: "中文单行本出版于 2010 年 11 月；出版社将英文版列为系列第三卷及三部曲的收束。",
          sourceIds: ["writers-three-body-chronology", "writers-deaths-end-tor"],
          locator: "年表 2010 年；出版社 Volume 3 与 Book Details"
        },
        {
          label: "内容简介",
          text: "威慑之下，两种文明交换知识与文化，表面的繁荣却不能消除生存风险。程心带着危机初期的经历醒来，故事由此展开新的抉择。",
          sourceIds: ["writers-deaths-end-tor"],
          locator: "Book Details：Dark Forest Deterrence 与 Cheng Xin"
        }
      ],
      note: "这里记录出版史，不把小说内部纪元当作现实年份；不以简化的结局梗概代替原作。"
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

  ...zijinReviewedEvents,

  event(
    "zi-jin-chen-low-iq-crime",
    "《低智商犯罪》",
    2020,
    1,
    "suspense",
    ["era-screen-and-bestseller"],
    ["zi-jin-chen"],
    "警察张一昂、笨贼与各怀心思的人物被一连串误会卷在一起，严肃的犯罪调查变成多线交错的荒诞喜剧。",
    ["writers-zijin-2020-interview", "writers-low-iq-cite"],
    {
      time: {
        kind: "point",
        start: {
          year: 2020
        }
      },
      significance: "这是理解紫金陈风格变化的一个入口：从沉重的社会派推理，转向依靠巧合、误判和多线结构制造喜剧。",
      tags: ["推理", "黑色幽默", "张一昂", "紫金陈"],
      milestone: false,
      facts: [
        {
          label: "节点类型",
          text: "作品出版，按年记录",
          sourceIds: ["writers-zijin-2020-interview"]
        },
        {
          label: "核心人物",
          text: "张一昂",
          sourceIds: ["writers-low-iq-cite"]
        },
        {
          label: "写作方向",
          text: "喜剧推理、多线叙事",
          sourceIds: ["writers-low-iq-cite"]
        }
      ],
      details: [
        {
          label: "人物与叙事",
          text: "小说中的警察是张一昂。出版社介绍以笨贼、官商与警方相互牵动的多线喜剧为重点，突出误会和自作聪明怎样改变案件走向。",
          sourceIds: ["writers-low-iq-cite"],
          locator: "内容简介与奇幻基地编辑何宁推荐"
        },
        {
          label: "创作与版本",
          text: "作者在 2020 年 6 月的访谈中介绍已经出版的本书，表示此次希望写得轻松、好笑。城邦所列 2022 年 1 月 25 日是繁体版日期，不是作品首次问世时间。",
          sourceIds: ["writers-zijin-2020-interview", "writers-low-iq-cite"],
          locator: "访谈末尾谈轻松创作；城邦基本资料"
        }
      ],
      note: "现有证据能确认 2020 年已出版，但不足以统一简体首版月份，因此按年记录；繁体版只用于核对人物与内容。"
    },
  ),

  event(
    "zi-jin-chen-tracker",
    "《追踪师》",
    2018,
    1,
    "suspense",
    ["era-screen-and-bestseller"],
    ["zi-jin-chen"],
    "围绕安防系统与黄金案件，警察林奇、张强和夏明逐步接近工程师沈研背后的秘密。",
    ["writers-tracker-library"],
    {
      time: {
        kind: "point",
        start: {
          year: 2018
        }
      },
      significance: "把技术侦查与企业利益冲突结合，可与作者的社会派、喜剧推理路线对照阅读。",
      tags: ["悬疑", "技术侦查", "安防系统", "紫金陈"],
      milestone: false,
      facts: [
        {
          label: "出版机构",
          text: "中国友谊出版公司，2018 年",
          sourceIds: ["writers-tracker-library"]
        },
        {
          label: "版本标识",
          text: "ISBN 9787505742888",
          sourceIds: ["writers-tracker-library"]
        },
        {
          label: "人物线索",
          text: "林奇、张强、夏明、沈研",
          sourceIds: ["writers-tracker-library"]
        }
      ],
      details: [
        {
          label: "内容简介",
          text: "馆藏提要将沈研的创业困境、黄金案与安防系统竞争连在一起，调查线则涉及林奇、张强和夏明。这里保留线索而不展开凶案结果。",
          sourceIds: ["writers-tracker-library"],
          locator: "提要文摘"
        },
        {
          label: "版本核对",
          text: "采用中国友谊出版公司 2018 年版，ISBN 9787505742888。馆藏出版项只给出年份，不把编目日期写成出版日。",
          sourceIds: ["writers-tracker-library"],
          locator: "出版发行项、ISBN、记录来源"
        }
      ],
      note: "馆藏著录只提供出版年，内容以该版提要为准；不把小说中的技术设定当作现实刑侦系统的能力说明。"
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
    2012,
    1,
    "historical",
    ["era-epic-and-mystery"],
    ["ma-bo-yong"],
    "病危汉献帝让孪生弟弟刘平偷天换日入宫继位，刘平在曹操集团严密监视下与司马懿联手匡扶汉室黎民。",
    ["jiangsu-lit-press"],
    {
      time: { kind: "duration", start: { year: 2012 }, end: { year: 2013 } },
      milestone: false,
      significance: "视角独特的历史翻案之作；以人道主义情怀重新诠释汉末乱世权谋，改编为大型传奇古装剧。",
      tags: ["历史", "三国", "汉献帝", "司马懿", "马伯庸"],
      facts: [
        { label: "出版机构", text: "江苏文艺出版社（2012—2013年，分《龙难日》《潜龙在渊》两卷）", sourceIds: ["jiangsu-lit-press"] },
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
    "《长安的荔枝》单行本出版",
    2022,
    10,
    "historical",
    ["era-micro-history-mature"],
    ["ma-bo-yong"],
    "小吏李善德接下限时运送鲜荔枝的差事，在保鲜、路途与官僚体系之间寻找可行方案。",
    ["writers-lychee-book", "writers-lychee-serial", "writers-ma-jianwei-interview"],
    {
      significance: "通过一项具体差事观察盛世的代价；将作品首发与成书分开，才能看清它从文学期刊到单行本的传播过程。",
      tags: ["历史", "长安", "荔枝", "见微", "马伯庸"],
      milestone: true,
      facts: [
        {
          label: "节点类型",
          text: "中文单行本出版",
          sourceIds: ["writers-lychee-book"]
        },
        {
          label: "版本标识",
          text: "湖南文艺出版社；ISBN 9787572608582",
          sourceIds: ["writers-lychee-book"]
        }
      ],
      details: [
        {
          label: "版本沿革",
          text: "本节点采用湖南文艺出版社 2022 年 10 月版；作品此前已发表于《收获》长篇小说 2021 年春卷。",
          sourceIds: ["writers-lychee-book", "writers-lychee-serial"],
          locator: "书讯出版时间；访谈导语"
        },
        {
          label: "内容与阅读",
          text: "故事聚焦李善德的运输任务，而不是给唐代荔枝运输写一份确定的历史复原。作者在访谈中谈到借普通办事者观察大历史。",
          sourceIds: ["writers-lychee-book", "writers-lychee-serial"],
          locator: "内容简介；关于小人物与史料的问答"
        },
        {
          label: "书系位置",
          text: "本书与《太白金星有点烦》《桃花源没事儿》同属“见微”书系。",
          sourceIds: ["writers-ma-jianwei-interview"],
          locator: "开篇书系介绍"
        },
        {"label": "创作方法与历史边界", "text": "作者在首发访谈中明确：小说运输路线是据文献与地形推想的可能方案，并非已证实的唐代路线；保鲜技术取自不同时代的资料，小说把它们集中到唐代。阅读时应把史料线索与虚构安排分开。", "sourceIds": ["writers-lychee-serial"], "locator": "关于路线推想、保鲜办法与历史真实的问答"},
        {"label": "从任务看制度：阅读建议", "text": "不妨沿“谁提出目标、谁承担成本、谁有权更改规则”做三列阅读笔记。我们认为，运输难题既推动情节，也让抽象制度通过普通人的选择变得可见；这是编辑阅读角度，不是对唐代行政史的定论。", "editorial": true}
      ],
      recommendedResources: [{"id": "lychee-author-method-interview", "title": "对话 | 马伯庸新作首发《收获》：但问荔枝“如何来”？", "creator": "罗昕采访；马伯庸受访", "series": "《收获》 / 中国作家网", "url": "https://www.chinawriter.com.cn/n1/2021/0406/c405057-32070554.html", "kind": "article", "match": "作者直接说明运输路线如何构想，以及历史材料如何转换为小说。适合读完后核对虚构边界。", "scopeNote": "这是2021年首发阶段的文字访谈，不是2022年单行本的发行公告；作者解释不能代替唐史考证。含情节讨论。", "checkedAt": "2026-10-24", "publishedAt": "2021-04-06", "locator": "关于路线与保鲜方法的两组问答"}],
      note: "出版月份不是创作起点；2021 年春卷首发另列为节点。小说情节及人物不等于已证实的唐代史实。"
    },
  ),

  event(
    "ma-bo-yong-great-healer",
    "《大医》",
    2022,
    9,
    "historical",
    ["era-micro-history-mature"],
    ["ma-bo-yong"],
    "聚焦晚清至民国中国现代红十字会与公共卫生医学发端；三位青年医者在日俄战争、鼠疫与抗战血火中以医济世。",
    ["shanghai-lit-press"],
    {
      significance: "历时数年查阅数百万字医史档案写就的长篇巨著，讴歌中国第一代红十字医者的医道仁心与民族气节。",
      tags: ["历史", "医学史", "红十字会", "大医精诚", "马伯庸"],
      facts: [
        { label: "出版机构", text: "上海文艺出版社（2022年9月《破晓篇》、12月《日出篇》）", sourceIds: ["shanghai-lit-press"] },
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
    6,
    "historical",
    ["era-micro-history-mature"],
    ["ma-bo-yong"],
    "太白金星李长庚负责协调西天取经，面对神仙、妖怪与繁杂事务，在办事过程中重新理解自己的修行。",
    ["writers-taibai-book", "writers-ma-jianwei-interview"],
    {
      significance: "以神话世界重写组织协作与人情难题，是“见微”书系中与《长安的荔枝》形成对照的一部。",
      tags: ["神话改写", "职场", "见微", "马伯庸"],
      milestone: true,
      facts: [
        {
          label: "节点类型",
          text: "中文图书出版",
          sourceIds: ["writers-taibai-book"]
        },
        {
          label: "版本标识",
          text: "ISBN 9787572610912",
          sourceIds: ["writers-taibai-book"]
        },
        {
          label: "核心人物",
          text: "太白金星李长庚",
          sourceIds: ["writers-taibai-book"]
        }
      ],
      details: [
        {
          label: "版本与内容",
          text: "中国作家网书讯列湖南文艺出版社 2023 年 6 月版，ISBN 9787572610912。故事的中心是李长庚筹划取经及其遭遇的层层问题。",
          sourceIds: ["writers-taibai-book"],
          locator: "出版时间、ISBN 与内容简介"
        },
        {
          label: "创作与书系",
          text: "作者前言谈到希望用一部短而轻松的作品调整写作状态；后续访谈将它与《长安的荔枝》《桃花源没事儿》归入“见微”书系。",
          sourceIds: ["writers-taibai-book", "writers-ma-jianwei-interview"],
          locator: "前言；2025 年访谈开篇"
        },
        {"label": "作者自述：从休息到故事转向", "text": "书讯所附前言说，作者在2022年交出长稿后，想写一部较短、轻松的作品。写作过程中篇幅增长；他也说明，没有逐一重写全部八十一难，是因为故事重心会发生变化。这里记录创作自述，不把动笔年份当出版年份。", "sourceIds": ["writers-taibai-book"], "locator": "前言：2022年交稿后的写作缘起；关于宝象国后叙事重心的解释"},
        {"label": "不只当成职场段子：阅读建议", "text": "编辑建议先观察“办成一件事”与“成为怎样的人”是否始终一致，再回看李长庚的选择。职场类比可以帮助进入故事，却不必成为唯一答案；本书是神话改写，并非《西游记》的续篇认证或职场操作手册。", "editorial": true}
      ],
      recommendedResources: [{"id": "taibai-author-preface", "title": "《太白金星有点烦》书讯所附前言", "creator": "马伯庸", "series": "中国作家网·书汇", "url": "https://image.chinawriter.com.cn/n1/2023/0602/c405081-40005145.html", "kind": "article", "match": "前言直接解释创作动机、篇幅变化和叙事转向，适合与读者自己的阅读感受对照。", "scopeNote": "链接原页面标题为《太白金星有点烦》；阅读定位为“前言”。含情节结构讨论，建议读完小说后看；书讯日期不等于首售日。", "checkedAt": "2026-10-24", "publishedAt": "2023-06-02", "locator": "页面下半部“前言”"}],
      note: "本节点按书讯标注的 2023 年 6 月版记录，不据书讯日期推定具体首售日；这是神话改写，不是历史人物传记。"
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

  // ==================== 刘慈欣（补充） ====================
  event(
    "liu-cixin-earth-eye",
    "《带上她的眼睛》",
    1999,
    10,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "未来地质飞船失事沉入炽热地心，女领航员靠传感眼镜把最后的世界分享给地面工程师，在封闭地心孤独走完余生。",
    ["sfs-archive"],
    {
      significance: "获1999年中国科幻银河奖一等奖，并入选人教版七年级语文教材，是刘慈欣柔软悲悯科幻美学的代表作。",
      tags: ["科幻", "银河奖", "地心", "语文教材", "刘慈欣"],
      facts: [
        { label: "首发刊物", text: "《科幻世界》1999年第10期", sourceIds: ["sfs-archive"] },
        { label: "所获荣誉", text: "1999年中国科幻银河奖一等奖", sourceIds: ["sfs-archive"] },
        { label: "教育收录", text: "入选人教版七年级《语文》教材", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "‘我’在休假途中受托戴上一副来自地心的传感眼镜，透过它感受一位年轻女领航员最后所能看见的世界。作为‘落日工程’的一部分，她驾驶的地层飞船在航行中失事，永远沉入了六千多公里深的地核，只能在封闭的船舱里度过余生。女领航员却强忍孤独与恐惧，把草原、落日、微风与一朵小花全都分享给地面上的‘我’，在生命尽头完成了对世界最后的温柔凝视。",
          sourceIds: ["sfs-archive"],
        },
        {
          label: "创作背景与反响",
          text: "作品以极克制的笔触写尽孤独与牺牲，是刘慈欣硬科幻外壳下最柔软的一篇，也是少数进入国民教育教材的中国当代科幻小说。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-micro-era",
    "《微纪元》",
    2001,
    1,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "宇宙航行者重返灾后地球，发现幸存人类已把自己改造成细胞大小的微人，在袖珍王国里重建无忧无虑的文明。",
    ["sfs-archive"],
    {
      time: { kind: "point", start: { year: 2001, approximate: true } },
      significance: "尺度奇观与文明反思并重的银河奖获奖短篇，展示刘慈欣在宏观与微观之间自由切换的想象力。",
      tags: ["科幻", "微纪元", "尺度奇观", "文明演化", "刘慈欣"],
      facts: [
        { label: "首发刊物", text: "《科幻世界》（约2001年，各版本著录年份略有出入）", sourceIds: ["sfs-archive"] },
        { label: "所获荣誉", text: "中国科幻银河奖", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "人类宇航员从遥远的星际航行中返回太阳系，却惊恐地发现地球已经历过毁灭性的大灾难。深入调查后他才知道，灾难中的幸存人类早已通过基因技术把自己改造成只有细菌大小的‘微人’，在曾经的城市遗址上建立起一个资源近乎无限、没有战争与饥饿的‘微纪元’文明。面对这个快乐而脆弱的新世界，作为旧人类最后代表的宇航员陷入了是否干预的艰难抉择。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-china-sun",
    "《中国太阳》",
    2002,
    1,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "西北穷小子水娃一路从擦鞋匠做到太空镜面清洁工，最终驾驶‘中国太阳’驶向深空，完成底层劳动者的宇宙壮举。",
    ["sfs-archive"],
    {
      significance: "获2002年中国科幻银河奖，将农民工群体的命运托举至宇宙尺度，是刘慈欣最富现实温度与理想主义的中篇。",
      tags: ["科幻", "银河奖", "水娃", "中国太阳", "理想主义", "刘慈欣"],
      facts: [
        { label: "首发刊物", text: "《科幻世界》2002年第1期", sourceIds: ["sfs-archive"] },
        { label: "所获荣誉", text: "2002年中国科幻银河奖", sourceIds: ["sfs-archive"] },
        { label: "核心人物", text: "水娃（乡村务工青年）", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "在西北干旱山村长大的水娃为了生存走出黄土地，从北京街头的擦鞋匠一路做到‘中国太阳’大型空间镜面工程的镜面清洁工。这份游走在高真空轨道上的危险工作让他第一次触摸到宇宙的壮丽。数年后，当‘中国太阳’即将退役时，已是航天老手的水娃提出一个疯狂而浪漫的方案——利用这面巨镜把宇航飞船反射推进，自己驾驶它飞向太阳系外，为人类文明做第一个向外太空进发的平凡而伟大的先行者。",
          sourceIds: ["sfs-archive"],
        },
        {
          label: "创作背景与反响",
          text: "刘慈欣罕见地把镜头对准底层劳动者，让最平凡的农民工成为宇宙探索的主角，以朴素而昂扬的理想主义打动无数读者。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-dream-sea",
    "《梦之海》",
    2002,
    1,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "高等文明艺术家以地球海水为材料，在太空中凝成宏伟冰雕‘梦之海’，人类为夺回海洋展开科学与美学的漫长博弈。",
    ["sfs-archive"],
    {
      significance: "‘大艺术’系列开篇之作，用极端宇宙艺术审视文明、美学与生存的边界，同系列还有《诗云》《欢乐颂》。",
      tags: ["科幻", "大艺术", "海洋", "宇宙艺术", "刘慈欣"],
      facts: [
        { label: "首发刊物", text: "《科幻世界》2002年第1期", sourceIds: ["sfs-archive"] },
        { label: "所属系列", text: "‘大艺术’系列（含《梦之海》《诗云》《欢乐颂》）", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "一位来自高等文明的低温艺术家降临地球，为完成一件宇宙尺度的艺术作品，竟将地球全部海水抽取到太空中，冻结成围绕地球的巨大冰环‘梦之海’。海洋消失后，地球生态濒临崩溃，人类一方面艰难求生，另一方面又与这位只关心纯粹美学的艺术家展开漫长的博弈，最终以科学的耐心一点点把海水重新带回地球，也留下了对艺术与生存孰轻孰重的永恒追问。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-angel-era",
    "《天使时代》",
    2002,
    7,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "贫困国家用基因技术培育出长有翅膀的‘天使’战士，科技伦理、人道主义与大国霸权在非洲上空激烈碰撞。",
    ["sfs-archive"],
    {
      significance: "直面基因编辑伦理的争议名篇，后扩展为长篇《魔鬼积木》。",
      tags: ["科幻", "基因工程", "科技伦理", "天使时代", "刘慈欣"],
      facts: [
        { label: "首发刊物", text: "《科幻世界》2002年第7期", sourceIds: ["sfs-archive"] },
        { label: "后续扩展", text: "扩展为长篇小说《魔鬼积木》（2002）", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "饱受战乱与贫困的非洲某国秘密实施基因工程，培育出长有双翼、能在天空飞翔的‘天使’战士。这一突破打破了传统战争的地面边界，也让掌握尖端基因技术的发达国家陷入伦理与战略的双重恐慌。围绕是否允许这种‘非人’生命存在，联合国、军队与科学家激烈交锋，最终在非洲上空展开一场以人道之名进行的残酷绞杀。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-swallow",
    "《吞食者》",
    2002,
    11,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "以行星为食的宇宙文明‘吞食者’逼近太阳系，人类与恐龙后裔在吞食者环带下为文明存亡殊死博弈。",
    ["sfs-archive"],
    {
      significance: "获2002年中国科幻银河奖读者提名奖，以磅礴尺度与冷峻生存推演震撼读者。",
      tags: ["科幻", "吞食者", "宇宙尺度", "生存博弈", "刘慈欣"],
      facts: [
        { label: "首发刊物", text: "《科幻世界》2002年第11期", sourceIds: ["sfs-archive"] },
        { label: "所获荣誉", text: "2002年中国科幻银河奖读者提名奖", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "地球收到警报：一个以行星为食的恐怖文明‘吞食者’正跨越星际空间逼近太阳系。人类启动全行星防御，却发现吞食者环带上竟然居住着当年逃出地球、进化出文明的恐龙后裔。在压倒性的宇宙力量面前，人类与恐龙两大文明围绕生存权展开谈判、交易与殊死一搏，最终吞食者毫不犹豫地开始啃食地球。作品把‘生存即正义’的宇宙丛林法则推演到极致。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-support-god",
    "《赡养上帝》",
    2005,
    1,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "创造了人类的上帝文明因衰老而降临地球要求赡养，荒诞温情的日常里暗藏文明衰老与代际伦理的深刻讽喻。",
    ["sfs-archive"],
    {
      time: { kind: "point", start: { year: 2005 } },
      significance: "黑色幽默解构创世神话，是刘慈欣社会寓言式科幻的代表作。",
      tags: ["科幻", "赡养上帝", "文明衰老", "黑色幽默", "刘慈欣"],
      facts: [
        { label: "首发刊物", text: "《科幻世界》（2005年）", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "创造了地球生命与人类的‘上帝文明’在衰老与资源枯竭后，驾驶最后一艘飞船降临地球，希望由自己曾经的造物来赡养晚年。老迈的上帝们被分配到各个人类家庭中生活，带来一系列啼笑皆非的文化冲突与温情瞬间。随着上帝文明内部的分裂与秘密逐渐揭开，人类发现自己同样可能走向这种被造物嫌弃的衰亡结局，一场关于文明衰老与代际责任的寓言徐徐展开。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-support-human",
    "《赡养人类》",
    2005,
    11,
    "sci-fi",
    ["era-early-breakthrough"],
    ["liu-cixin"],
    "私有化到极致的‘第一地球’文明只剩下一名穷人，为获得向地球移民的资格，其代理人向人类提出冷酷条件。",
    ["sfs-archive"],
    {
      significance: "《赡养上帝》续篇，对极端私有制与贫富分化的思想实验冷酷而锋利。",
      tags: ["科幻", "赡养人类", "贫富分化", "思想实验", "刘慈欣"],
      facts: [
        { label: "首发刊物", text: "《科幻世界》2005年第11期", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "一艘外星飞船突然降临地球，其使者宣称来自拥有高度文明的‘第一地球’，此行是要把地球改造成他们新的家园。他们给出的条件是：将地球人类的财富彻底均分，直到所有人都穷得完全平等。随着真相揭开，人类得知第一地球的私有制已经发展到极致——整个星球的所有财富、空气甚至阳光都归于唯一的超级富豪，其余全部沦为赤贫。这场以‘公平’为名的极端思想实验，把资本主义逻辑推演到令人不寒而栗的尽头。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-mountain",
    "《山》",
    2006,
    1,
    "sci-fi",
    ["era-epic-and-mystery"],
    ["liu-cixin"],
    "登山者在海洋行星上与硅基文明相遇，对方讲述了文明在星球内部凿穿万米地壳、逐级走向太空的奋斗史诗。",
    ["sfs-archive"],
    {
      time: { kind: "point", start: { year: 2006 } },
      significance: "以‘山’为意象追问文明进步的代价，深受硬科幻读者推崇。",
      tags: ["科幻", "山", "文明攀登", "硬科幻", "刘慈欣"],
      facts: [
        { label: "首发刊物", text: "《科幻世界》（2006年）", sourceIds: ["sfs-archive"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "酷爱登山的海洋学家冯帆在海上遭遇外星飞船引发的巨大水山，坠落深海后被救入飞船。飞船中的硅基外星生命向他讲述了自己文明的传奇：它们起源于一颗没有陆地、全靠自身引力固结的海洋行星，为求得生存，整个文明用了千万年时间，在星球内部一层层凿穿万米地壳，最终从地心爬到地表、再踏上通往太空的阶梯。群山般厚重的时间跨度，映照着任何文明为了向上攀登都必须付出的代价。",
          sourceIds: ["sfs-archive"],
        },
      ],
    },
  ),

  event(
    "liu-cixin-golden-field",
    "《黄金原野》",
    2018,
    8,
    "sci-fi",
    ["era-screen-and-bestseller"],
    ["liu-cixin"],
    "父亲为病重女儿打造虚拟太空舱，女孩‘登月’的传说点燃全球太空热潮，多年后飞船抵达真相方揭。",
    ["beijing-joint-press"],
    {
      significance: "沉寂八年后刘慈欣再次发表科幻短篇，中文版收录于MIT《十二个明天》，延续其对太空探索的深情与悲悯。",
      tags: ["科幻", "黄金原野", "太空探索", "虚拟现实", "刘慈欣"],
      facts: [
        { label: "中文首发", text: "《十二个明天》（北京联合出版公司2018年8月）", sourceIds: ["beijing-joint-press"] },
        { label: "英文首发", text: "MIT《Twelve Tomorrows》（2018年5月）", sourceIds: ["beijing-joint-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "为重病缠身、无法远行的女儿，工程师父亲研发出一套虚拟现实体感舱，让女儿在幻境中‘飞向月球’。女儿‘登月’的传奇故事被媒体不断传播，意外点燃了全球几代人的太空热潮，无数年轻人投身航天事业。多年后，当人类终于抵达那片传说中的‘黄金原野’，才发现舱体早已在太空中漂流多年，里面空无一人——父亲用一场善意的虚构，为人类重新种下了仰望星空的火种。",
          sourceIds: ["beijing-joint-press"],
        },
      ],
    },
  ),

  // ==================== 紫金陈（补充） ====================
  event(
    "zi-jin-chen-love-confused",
    "《爱不明白》",
    2005,
    5,
    "romance",
    ["era-early-breakthrough"],
    ["zi-jin-chen"],
    "幽默爱情长篇，以都市青年夏宇宏的感情纠葛为线索，在戏谑笔调中呈现年轻一代对爱情与婚姻的迷惘。",
    ["nlc-china"],
    {
      significance: "紫金陈大学时代的首部长篇小说，也是他写作生涯的起点，虽被自嘲‘出道即扑街’却显露幽默天赋。",
      tags: ["爱情", "幽默", "处女作", "夏宇宏", "紫金陈"],
      facts: [
        { label: "出版机构", text: "大众文艺出版社（2005年5月）", sourceIds: ["nlc-china"] },
        { label: "体裁篇幅", text: "长篇幽默爱情小说", sourceIds: ["nlc-china"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "二十七岁的单身公务员夏宇宏在一段看似平淡的都市生活中卷入感情纠葛：他深爱的清芳最终因现实与金钱选择了别人，身边的友人各自走向不同的人生归宿，唯有他在失意与自嘲中反复追问爱情的意义。小说以轻松的幽默笔调写成，被读者称为现代版的爱情围城。",
          sourceIds: ["nlc-china"],
        },
      ],
    },
  ),

  event(
    "zi-jin-chen-teen-stock-god",
    "《少年股神》",
    2007,
    1,
    "business",
    ["era-epic-and-mystery"],
    ["zi-jin-chen"],
    "以古龙武侠笔法写股市江湖，一场规模空前的股神大赛让各路金融豪杰风云际会，少年天才在其中博弈厮杀。",
    ["nlc-china"],
    {
      time: { kind: "point", start: { year: 2007 } },
      significance: "紫金陈成名前的商战代表作，后被改编为同名商战武侠网络剧。",
      tags: ["商战", "股市", "少年股神", "古龙风", "紫金陈"],
      facts: [
        { label: "出版机构", text: "当代中国出版社（2007年）", sourceIds: ["nlc-china"] },
        { label: "体裁篇幅", text: "长篇商战小说", sourceIds: ["nlc-china"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "一场规模空前的股神大赛将各方金融高手聚集一堂：小徐哥、冷公子、姚娘子、进三少、金手指、古老师等各路豪杰在资本市场上以智慧为剑、以信息为盾，上演一幕幕惊心动魄的操盘博弈。作者以浓烈的古龙武侠笔调书写现代股市江湖，把涨停跌停、内幕交易与多空对决写得刀光剑影。",
          sourceIds: ["nlc-china"],
        },
      ],
    },
  ),

  event(
    "zi-jin-chen-capital-duel",
    "《资本对决》",
    2009,
    8,
    "business",
    ["era-epic-and-mystery"],
    ["zi-jin-chen"],
    "上海新城区数千亿投资引爆资本暗战，华东第一投资集团与深圳红岭集团围绕黄金地块展开世纪豪赌。",
    ["nlc-china"],
    {
      significance: "《少年股神》续篇，把资本市场的攻防博弈写得如同江湖争锋。",
      tags: ["商战", "资本对决", "上海滩", "金融博弈", "紫金陈"],
      facts: [
        { label: "出版机构", text: "中国工人出版社（2009年）", sourceIds: ["nlc-china"] },
        { label: "系列归属", text: "《少年股神》续篇", sourceIds: ["nlc-china"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "数千亿投资与近万亩土地的上海新城区规划，牵动了中国资本市场各路大鳄的神经。华东第一投资集团总裁夏远捷足先登，一举拿下新城区黄金地段的全部土地；深圳红岭集团则携国际投资大鳄的千亿资本强势登陆上海滩，意图把这块肥肉收入囊中。一场围绕资本、权势与人心的世纪豪赌就此展开，底牌翻开的瞬间，胜负早已超出金钱本身。",
          sourceIds: ["nlc-china"],
        },
      ],
    },
  ),

  event(
    "zi-jin-chen-forbidden-place",
    "《禁忌之地》",
    2011,
    1,
    "horror",
    ["era-epic-and-mystery"],
    ["zi-jin-chen"],
    "原名《浙大夜惊魂》的高校实景恐怖小说，以浙江大学紫金港校区为舞台，讲述校园灵异与恐怖悬疑交织的故事。",
    ["nlc-china"],
    {
      time: { kind: "point", start: { year: 2011 } },
      significance: "天涯鬼话人气之作，开创本土高校实景恐怖小说类型。",
      tags: ["恐怖", "校园", "浙大夜惊魂", "禁忌之地", "紫金陈"],
      facts: [
        { label: "网络连载", text: "2010年6月以《浙大夜惊魂》之名在天涯论坛连载", sourceIds: ["nlc-china"] },
        { label: "出版机构", text: "江苏文艺出版社（2011年，更名《禁忌之地》）", sourceIds: ["jiangsu-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "故事以浙江大学紫金港校区为真实舞台，讲述深夜校园中接连发生的离奇事件：诡异的自习室、失联的同学、无法解释的禁忌符号，以及隐藏在校园传说背后的真相。作者把高校的日常场景与恐怖氛围结合，营造出强烈的代入感与惊悚体验，成为当年天涯论坛‘莲蓬鬼话’板块的现象级热帖。",
          sourceIds: ["nlc-china"],
        },
      ],
    },
  ),

  event(
    "zi-jin-chen-long-night-twin-stars",
    "《长夜难明：双星》",
    2024,
    1,
    "suspense",
    ["era-micro-history-mature"],
    ["zi-jin-chen"],
    "闹市女子坠楼身亡，两天后市长之子持刀逃离现场的视频在网上疯传，一场舆论漩涡揭开两位女主角的隐秘命运。",
    ["chinawriter"],
    {
      significance: "紫金陈首部女性题材推理小说，借‘真真假假’的双女主叙事探讨父权社会下的女性困境。",
      tags: ["悬疑", "女性题材", "长夜难明", "双星", "紫金陈"],
      facts: [
        { label: "出版机构", text: "湖南文艺出版社·中南博集天卷（2024年1月）", sourceIds: ["chinawriter"] },
        { label: "题材类型", text: "首部女性题材社会派推理", sourceIds: ["chinawriter"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "闹市街头，一名腹部有刀伤的女子坠楼身亡。两天后，一段江北市原市长之子赵泽宇手持带血匕首逃离案发现场的视频在网上被公开，案件瞬间引爆全社会关注。赵泽宇被警方刑拘，却坚称自己没有杀人，死者实为跳楼自杀。随着调查深入，家境贫困、命运多舛的孟真真与出身优渥却深陷无爱婚姻的王嘉嘉两位女主角的身世浮出水面，她们在父权社会中的挣扎与反抗，指向一连串死亡事件背后被刻意掩埋的真相。",
          sourceIds: ["chinawriter"],
        },
      ],
    },
  ),

  event(
    "zi-jin-chen-i-refuse",
    "《我不服》",
    2026,
    1,
    "suspense",
    ["era-micro-history-mature"],
    ["zi-jin-chen"],
    "困顿外卖员受雇绑架千万粉丝主播的妻子，人质却离奇死亡且并非主播之妻，一场套娃式绑架杀人案撕开流量人设与人心深渊。",
    ["hunan-lit-press"],
    {
      time: { kind: "point", start: { year: 2026 } },
      significance: "‘推理之王’系列后的社会派悬疑新作，聚焦直播时代的流量泡沫与错位人生。",
      tags: ["悬疑", "社会派", "直播", "我不服", "紫金陈"],
      facts: [
        { label: "出版机构", text: "湖南文艺出版社（2026年）", sourceIds: ["hunan-lit-press"] },
        { label: "题材类型", text: "社会派悬疑长篇", sourceIds: ["hunan-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "一个生活陷入困顿的外卖员因一场车祸走投无路，此时有人出价一百万，雇他去绑架坐拥数千万粉丝的超级带货主播冰川的妻子。绑架实施后，人质却突然离奇死亡，而调查显示死者根本不是主播的妻子。层层反转的‘套娃式’绑架杀人案背后，是流量时代的宠妻人设、资本炒作与平凡人生被命运绞杀的深渊。",
          sourceIds: ["hunan-lit-press"],
        },
      ],
    },
  ),

  // ==================== 马伯庸（补充） ====================
  event(
    "ma-bo-yong-death-on-qq",
    "《她死在QQ上》",
    2006,
    1,
    "horror",
    ["era-epic-and-mystery"],
    ["ma-bo-yong"],
    "围绕网络聊天记录展开的恐怖悬疑中篇，都市青年在虚拟社交的隐秘角落遭遇离奇死亡与惊悚真相。",
    ["nlc-china"],
    {
      significance: "马伯庸早期网络恐怖小说名篇，反映了世纪初网络社交兴起时的时代恐慌。",
      tags: ["恐怖", "网络小说", "QQ", "马伯庸"],
      facts: [
        { label: "出版机构", text: "安徽文艺出版社（2006年）", sourceIds: ["nlc-china"] },
        { label: "体裁篇幅", text: "网络恐怖小说", sourceIds: ["nlc-china"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "故事围绕一段段网络聊天记录展开：都市青年在虚拟社交中结识的网友接连遭遇离奇死亡，而最后一条消息总是停留在那个熟悉的头像上。随着线索拼合，隐藏在屏幕背后的真相逐渐浮出水面，虚拟世界与现实的界限在恐惧中崩塌。作品捕捉了世纪初网络聊天兴起时人们对匿名社交既好奇又恐惧的时代情绪。",
          sourceIds: ["nlc-china"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-yin-shang-maya",
    "《殷商玛雅征服史》",
    2007,
    1,
    "historical",
    ["era-epic-and-mystery"],
    ["ma-bo-yong"],
    "戏说殷商舰队横渡太平洋征服玛雅的架空历史，以荒诞考证与冷幽默解构宏大历史叙事。",
    ["nlc-china"],
    {
      time: { kind: "point", start: { year: 2007 } },
      significance: "马伯庸早期‘历史可能性’与脑洞实验的代表作。",
      tags: ["历史", "戏说", "殷商", "玛雅", "马伯庸"],
      facts: [
        { label: "出版机构", text: "二十一世纪出版社（2007年）", sourceIds: ["nlc-china"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "作者虚构了殷商末年一支由攸侯喜指挥的二十船舰队漂洋过海、远征美洲并‘征服’玛雅文明的荒诞历史。全书以一本正经的学术考据腔调，把甲骨文、玛雅历法与航海术杂糅在一起，在脑洞大开的设定中解构了历史书写的权威与趣味。",
          sourceIds: ["nlc-china"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-seven-marquises",
    "《七侯笔录》更名成书",
    2019,
    4,
    "historical",
    ["era-screen-and-bestseller"],
    ["ma-bo-yong"],
    "现代少年遇见寄寓李白才情的青莲笔，进入由文人笔灵构成的奇幻世界；旧作《笔冢随录》以新书名收束故事。",
    ["writers-seven-marquises-book"],
    {
      significance: "让旧题名、早期写作与后来成书各归其位，也展现马伯庸在历史小说之外的文化奇幻路线。",
      tags: ["奇幻", "笔冢随录", "七侯笔录", "马伯庸"],
      facts: [
        { label: "节点类型", text: "《七侯笔录》书名下的图书版本", sourceIds: ["writers-seven-marquises-book"] },
        { label: "出版版本", text: "湖南文艺出版社，2019 年 4 月；ISBN 9787540490805", sourceIds: ["writers-seven-marquises-book"] },
        { label: "原题名", text: "《笔冢随录》", sourceIds: ["writers-seven-marquises-book"] },
      ],
      details: [
        {
          label: "版本与旧作关系",
          text: "书讯注明原名《笔冢随录》，并说明此次版本首次带来大结局。本节点记录《七侯笔录》的 2019 年图书版本，不把早期旧题名的日期直接移用过来。",
          sourceIds: ["writers-seven-marquises-book"],
          locator: "出版时间、ISBN 与编辑推荐",
        },
        {
          label: "内容简介",
          text: "小说让历代文人的精神化为笔灵，现代少年意外与李白之笔相遇，继而进入笔冢世界。它以传统文化为想象材料，主人公并不是生活在古代的落魄书生。",
          sourceIds: ["writers-seven-marquises-book"],
          locator: "内容简介：现代少年与青莲笔",
        },
      ],
      note: "更名、结局补全与最初写作不是同一时点；本轮未核定《笔冢随录》各早期版本日期，不补造首发年月。",
    },
  ),

  event(
    "ma-bo-yong-three-kingdoms-supporting",
    "《三国配角演义》",
    2013,
    4,
    "historical",
    ["era-epic-and-mystery"],
    ["ma-bo-yong"],
    "从马谡、刘禅、何晏等三国配角视角重写历史缝隙，以小人物命运撬动被忽略的史实与人心。",
    ["jiangsu-lit-press"],
    {
      significance: "以‘历史可能性小说’笔法为三国小人物立传，是马伯庸历史解构风格的典型短篇集。",
      tags: ["历史", "三国", "配角", "马伯庸"],
      facts: [
        { label: "出版机构", text: "江苏文艺出版社（2013年4月）", sourceIds: ["jiangsu-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "小说集把镜头对准被正史一笔带过的三国配角：街亭之失背后另有隐情的马谡、装疯卖傻以求自保的刘禅、风流才子何晏等人的命运。作者在史料缝隙中填入大胆而合乎逻辑的想象，让那些模糊的身影重新拥有温度与心机，也借此重新审视英雄叙事的另一面。",
          sourceIds: ["jiangsu-lit-press"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-read-less",
    "《我读书少，你可别骗我》",
    2012,
    12,
    "non-fiction",
    ["era-epic-and-mystery"],
    ["ma-bo-yong"],
    "马伯庸幽默杂文与短篇合集，以一本正经的考据腔调侃历史、文化与生活琐事。",
    ["nlc-china"],
    {
      significance: "最能体现‘马亲王’嬉笑怒骂文风的随笔短篇集。",
      tags: ["随笔", "幽默", "杂文", "马伯庸"],
      facts: [
        { label: "出版时间", text: "2012年12月（短篇合集）", sourceIds: ["nlc-china"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "书名本身就是一句自嘲式的口头禅。书中收录马伯庸一系列嬉笑怒骂的杂文与短篇，他用极其正经的考据态度去论证一些荒诞不经的题目，从历史掌故、文化冷知识到日常生活，处处可见抖机灵的智慧与对伪知识的揶揄。",
          sourceIds: ["nlc-china"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-europa-heroes",
    "《欧罗巴英雄记》",
    2014,
    9,
    "historical",
    ["era-screen-and-bestseller"],
    ["ma-bo-yong"],
    "以武侠笔法戏写欧洲骑士与英雄传奇，中西类型文学碰撞出荒诞而精巧的脑洞。",
    ["nlc-china"],
    {
      significance: "马伯庸中西混血的类型实验之作。",
      tags: ["历史", "戏仿", "欧洲", "武侠", "马伯庸"],
      facts: [
        { label: "出版机构", text: "九州出版社（2014年9月）", sourceIds: ["nlc-china"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "作者用中国武侠小说的笔法重写欧洲英雄传奇，让骑士、游侠与神话人物在熟悉的套路中焕发陌生而荒诞的喜感。东西方类型文学元素的错位碰撞，产生了别具一格的幽默效果，也显露了马伯庸对类型程式的敏锐解构。",
          sourceIds: ["nlc-china"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-dragon-and-subway",
    "《龙与地下铁》",
    2016,
    1,
    "historical",
    ["era-screen-and-bestseller"],
    ["ma-bo-yong"],
    "古代龙族误入现代地铁隧道，少年与巨龙在都市地下展开奇幻冒险，以童趣视角反思现代文明。",
    ["nlc-china"],
    {
      significance: "幻想与都市寓言结合的温情长篇。",
      tags: ["历史", "奇幻", "龙", "都市寓言", "马伯庸"],
      facts: [
        { label: "出版时间", text: "2016年1月", sourceIds: ["nlc-china"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "古代龙族通过一条神秘通道误入现代都市的地铁系统，却发现自己再也无法回到天空。一个少年与这些困于地下钢铁丛林中的巨龙相遇，在帮助它们寻找归途的过程中，逐渐理解了现代文明对古老生灵的挤压与温情。小说以轻盈的幻想外壳承载了对城市化与传统的思考。",
          sourceIds: ["nlc-china"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-grassland-zoo",
    "《草原动物园》",
    2017,
    3,
    "historical",
    ["era-screen-and-bestseller"],
    ["ma-bo-yong"],
    "传教士在内蒙古草原建起动物园，与草原牧民在风沙与信仰间发生一系列神奇故事。",
    ["nlc-china"],
    {
      significance: "充满草原诗意与神秘色彩的长篇，展现马伯庸另一种抒情笔调。",
      tags: ["历史", "草原", "动物园", "抒情", "马伯庸"],
      facts: [
        { label: "出版时间", text: "2017年3月", sourceIds: ["nlc-china"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "一位传教士带着一批动物深入内蒙古草原，试图在荒原上建起一座动物园。这个看似荒诞的计划在草原牧民、僧侣与风沙之间激起层层涟漪，动物与人的相遇引出一连串神秘而温情的故事。小说以草原的辽阔与信仰的质朴为底色，写出了人与万物共生的诗意。",
          sourceIds: ["nlc-china"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-culture-pilgrimage",
    "《文化不苦旅：重走诸葛亮北伐之路》",
    2015,
    1,
    "non-fiction",
    ["era-screen-and-bestseller"],
    ["ma-bo-yong"],
    "沿诸葛亮五次北伐路线实地行走，把史料考证与旅途见闻熔于一炉的文化随笔。",
    ["nlc-china"],
    {
      time: { kind: "point", start: { year: 2015 } },
      significance: "马伯庸历史非虚构行走写作的代表，以脚步重访三国地理。",
      tags: ["非虚构", "三国", "诸葛亮", "行旅随笔", "马伯庸"],
      facts: [
        { label: "出版机构", text: "四川人民出版社（2015年）", sourceIds: ["nlc-china"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "马伯庸沿着诸葛亮北伐的进军路线实地行走，将沿途的山川形胜、历史遗迹与旅途见闻结合，在车轮与脚步中重访三国时代的军事地理。随笔既有对史料细节的严谨考据，也有对历史人物的温情回望，让纸上的北伐在脚下重新鲜活起来。",
          sourceIds: ["nlc-china"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-people-lovely",
    "《事实证明，人民永远是最可爱的》",
    2017,
    1,
    "non-fiction",
    ["era-screen-and-bestseller"],
    ["ma-bo-yong"],
    "马伯庸杂文集，以幽默机锋评点社会百态、历史掌故与生活趣味。",
    ["nlc-china"],
    {
      time: { kind: "point", start: { year: 2017 } },
      significance: "收录其广为流传的网文与杂谈，体现鲜明的‘马氏幽默’。",
      tags: ["非虚构", "杂文", "幽默", "马伯庸"],
      facts: [
        { label: "出版机构", text: "人民文学出版社（2017年）", sourceIds: ["nlc-china"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "这是马伯庸的杂文随笔集，收录了他多年来在网络与报刊上广为流传的文字。从历史冷知识到社会热点，从生活趣事到文化观察，作者以机锋毕露又接地气的笔调嬉笑怒骂，展现了‘文字鬼才’鲜活的另一面。",
          sourceIds: ["nlc-china"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-two-capitals-fifteen-days",
    "《两京十五日》",
    2020,
    7,
    "historical",
    ["era-screen-and-bestseller"],
    ["ma-bo-yong"],
    "明仁宗驾崩后太子朱瞻基须在十五日内从南京赶回北京即位，小捕快、医生与女医官卷入运河沿线的惊天阴谋。",
    ["hunan-lit-press"],
    {
      significance: "以明初‘两京大营’与京杭运河为舞台的历史冒险长篇，延续《长安十二时辰》的极限时限叙事。",
      tags: ["历史", "明朝", "朱瞻基", "运河", "两京十五日", "马伯庸"],
      facts: [
        { label: "出版机构", text: "湖南文艺出版社（2020年7月）", sourceIds: ["hunan-lit-press"] },
        { label: "体裁篇幅", text: "长篇历史小说（全两册）", sourceIds: ["hunan-lit-press"] },
      ],
      details: [
        {
          label: "内容简介",
          text: "洪熙元年，明仁宗突然驾崩，远在南京的太子朱瞻基必须在十五日内赶回北京即位，而沿京杭大运河的千里归途暗藏杀机。途中，一名机敏的小捕快、一位深藏秘密的医生与一位精通医术的冷面女医官先后卷入其中，与追杀而来的势力展开生死追逐。在快节奏的冒险中，作者串联起漕运、白莲教、宫廷倾轧等明初历史肌理，书写了一段于绝境中奔逃的史诗。",
          sourceIds: ["hunan-lit-press"],
        },
      ],
    },
  ),

  event(
    "ma-bo-yong-peach-blossom-fine",
    "《桃花源没事儿》",
    2025,
    6,
    "historical",
    ["era-micro-history-mature"],
    ["ma-bo-yong"],
    "俗务道人玄穹在妖怪居住的桃花源处理日常纠纷，一场危机让维持安稳生活也变成艰难的任务。",
    ["writers-peach-book", "writers-ma-jianwei-interview"],
    {
      significance: "“见微”书系转向志怪生活与群像叙事；它也提示读者，书籍上市时间和作者断续构思的时间并不相同。",
      tags: ["志怪", "桃花源", "玄穹", "见微", "马伯庸"],
      milestone: true,
      facts: [
        {
          label: "节点类型",
          text: "中文图书出版",
          sourceIds: ["writers-peach-book"]
        },
        {
          label: "版本标识",
          text: "湖南文艺出版社；ISBN 9787572624247",
          sourceIds: ["writers-peach-book"]
        },
        {
          label: "构思与出版",
          text: "2013 年萌生灵感，2025 年出版",
          sourceIds: ["writers-ma-jianwei-interview"]
        }
      ],
      details: [
        {
          label: "书讯与版本",
          text: "中国作家网在 2025 年 5 月 28 日刊出书讯，书目中的出版时间为 2025 年 6 月。两种日期分属报道与图书版本，不宜互相替代。",
          sourceIds: ["writers-peach-book"],
          locator: "页面发布时间与出版时间栏"
        },
        {
          label: "内容与创作",
          text: "玄穹因财运受限而在桃花源谋生，为妖怪居民调解纠纷。作者访谈说故事灵感萌生于 2013 年，经过十余年断续写作，属于“见微”书系。",
          sourceIds: ["writers-peach-book", "writers-ma-jianwei-interview"],
          locator: "内容简介；“打怪升级”段落"
        },
        {"label": "作者自述：志怪与日常经验", "text": "2025年访谈中，马伯庸把书中的群像与日常生活观察联系起来，并明确谈到《聊斋志异》的启发。他保留断续创作留下的不同表达风貌；这是作者对创作过程的回顾，不是连续写作十余年的证明。", "sourceIds": ["writers-ma-jianwei-interview"], "locator": "“打怪升级”中破解成长困局；历史宝库里开采灵感源泉"},
        {"label": "从个人闯关到共同生活：阅读建议", "text": "编辑建议把注意力从主角能否升迁，移到居民各自的愿望如何相互牵制。与《长安的荔枝》的单项任务、与《太白金星有点烦》的组织协调对照，可以看见三种小人物叙事入口；这不是统一主题的唯一解释，也不是必须依序阅读的续作关系。", "editorial": true}
      ],
      recommendedResources: [{"id": "peach-author-jianwei-interview", "title": "马伯庸：在小说里“任性一把”", "creator": "许旸采访；马伯庸受访", "series": "文汇报 / 中国作家网", "url": "https://www.chinawriter.com.cn/n1/2025/0606/c403994-40495089.html", "kind": "article", "match": "直接谈到本书的群像、断续创作和《聊斋志异》阅读经验，可比较作者自述与个人理解。", "scopeNote": "文字访谈含人物和主题讨论；书系关系不等于剧情连续，作者自述也不是第三方效果评价。", "checkedAt": "2026-10-24", "publishedAt": "2025-06-06", "locator": "“打怪升级”中破解成长困局；历史宝库里开采灵感源泉"}],
      note: "此处用书目所列月份，不据提前书讯推定实际首售日；“2013 年萌生灵感”也不等于从那年连续写作至出版。"
    },
  ),
  event(
    "liu-cixin-three-body-book",
    "《三体》单行本出版",
    2008,
    1,
    "sci-fi",
    ["era-epic-and-mystery"],
    ["liu-cixin"],
    "《三体》在期刊连载结束后以中文单行本出版，形成三部曲第一部的图书版本节点。",
    ["writers-three-body-chronology"],
    {
      significance: "将 2006 年连载与 2008 年成书分开，避免不同资料使用不同“首次出版”口径时产生冲突。",
      tags: ["科幻", "三体", "单行本", "刘慈欣"],
      milestone: false,
      facts: [
        {
          label: "节点类型",
          text: "中文单行本出版",
          sourceIds: ["writers-three-body-chronology"]
        }
      ],
      details: [
        {
          label: "出版节点",
          text: "《文艺报》年表把 2006 年 5—12 月连载与 2008 年 1 月单行本分别列项。",
          sourceIds: ["writers-three-body-chronology"],
          locator: "2006 年、2008 年条目"
        }
      ],
      note: "是同一作品的版本阶段，不是又一部新作。"
    },
  ),

  event(
    "liu-cixin-three-body-english",
    "《三体》英文版出版",
    2014,
    11,
    "sci-fi",
    ["era-screen-and-bestseller"],
    ["liu-cixin"],
    "刘宇昆英译的 The Three-Body Problem 由 Tor Books 出版，作品进入英语出版体系。",
    ["writers-three-body-tor", "hugo-database"],
    {
      time: {
        kind: "point",
        start: {
          year: 2014,
          month: 11,
          day: 11
        }
      },
      significance: "译介是作品传播史中的独立阶段，不能把英文版发行日追溯为中文作品的诞生日。",
      tags: ["科幻", "三体", "译介", "刘宇昆", "刘慈欣"],
      milestone: false,
      facts: [
        {
          label: "节点类型",
          text: "英文译本出版",
          sourceIds: ["writers-three-body-tor"]
        },
        {
          label: "译者",
          text: "刘宇昆（Ken Liu）",
          sourceIds: ["writers-three-body-tor"]
        }
      ],
      details: [
        {
          label: "译本档案",
          text: "出版社列作者 Cixin Liu、译者 Ken Liu，精装本 ISBN 9780765377067；其 On Sale 日期为 2014 年 11 月 11 日。",
          sourceIds: ["writers-three-body-tor"],
          locator: "Author、On Sale 与 ISBN"
        },
        {
          label: "与获奖的关系",
          text: "雨果奖官方档案说明，2014 年首次英文出版使作品按其资格规则再次具备参评条件，获奖本身发生在次年。",
          sourceIds: ["hugo-database"],
          locator: "Best Novel 后的 eligibility note"
        }
      ],
      note: "日期对应这里明确的 Tor 英文精装版，不推广到其他语种、装帧或地区版本。"
    },
  ),

  event(
    "liu-cixin-three-body-hugo",
    "《三体》获雨果奖最佳长篇小说",
    2015,
    8,
    "sci-fi",
    ["era-screen-and-bestseller"],
    ["liu-cixin"],
    "《三体》第一部的刘宇昆英译本获得 2015 年雨果奖 Best Novel，作者、译者与出版者均载于官方名单。",
    ["hugo-database"],
    {
      time: {
        kind: "point",
        start: {
          year: 2015,
          month: 8,
          day: 22
        }
      },
      significance: "获奖节点把作品的中文发表、英语译介和国际认可串联起来，但不把单部获奖扩大为三部曲全部获奖。",
      tags: ["科幻", "三体", "雨果奖", "刘慈欣"],
      milestone: true,
      facts: [
        {
          label: "节点类型",
          text: "文学奖项",
          sourceIds: ["hugo-database"]
        },
        {
          label: "奖项",
          text: "2015 Hugo Award · Best Novel",
          sourceIds: ["hugo-database"]
        }
      ],
      details: [
        {
          label: "奖项记录",
          text: "官方记录列 The Three Body Problem，作者 Cixin Liu、译者 Ken Liu、出版者 Tor Books，颁奖地点为美国斯波坎。",
          sourceIds: ["hugo-database"],
          locator: "Presented at 与 Best Novel"
        }
      ],
      note: "采用颁奖地当地日期 2015 年 8 月 22 日；中国报道中常见的 8 月 23 日是跨时区报道日期。获奖对象是第一部，不是三部曲整体。"
    },
  ),

  event(
    "ma-bo-yong-lychee-serial",
    "《长安的荔枝》期刊首发",
    2021,
    1,
    "historical",
    ["era-micro-history-mature"],
    ["ma-bo-yong"],
    "《长安的荔枝》首发于《收获》长篇小说 2021 年春卷，比 2022 年单行本更早进入读者视野。",
    ["writers-lychee-serial"],
    {
      time: {
        kind: "point",
        start: {
          year: 2021
        }
      },
      significance: "补上期刊发表这一环，使创作与出版年谱不再仅由后来畅销的图书版本定义。",
      tags: ["历史", "期刊首发", "见微", "马伯庸"],
      milestone: false,
      facts: [
        {
          label: "节点类型",
          text: "期刊首发",
          sourceIds: ["writers-lychee-serial"]
        },
        {
          label: "期刊卷次",
          text: "《收获》长篇小说 2021 年春卷",
          sourceIds: ["writers-lychee-serial"]
        }
      ],
      details: [
        {
          label: "首发记录",
          text: "《收获》访谈导语明确标注 2021 年春卷，由《收获》杂志出品、上海文艺出版社出版。",
          sourceIds: ["writers-lychee-serial"],
          locator: "导语前两段"
        }
      ],
      note: "资料给出季节卷次，未据此补造月份或日；2021 年 4 月 6 日是访谈刊发日，不作小说首发日。"
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
    description: "从刘慈欣的科幻宏构、紫金陈的社会派推理到马伯庸的历史微细叙事，区分期刊首发、单行本、译介与获奖节点，记录作品与出版脉络。",
    coverage: "刘慈欣、紫金陈、马伯庸的精选作品年谱，不是完整书目。部分重点作品已细分发表阶段并核对具体书目；其余条目继续补证，不能把本轮核查日期视为全部重核。",
    categories: [
      { id: "sci-fi", title: "科幻文学" },
      { id: "suspense", title: "悬疑推理" },
      { id: "historical", title: "历史小说" },
      { id: "non-fiction", title: "纪实与随笔" },
      { id: "romance", title: "爱情小说" },
      { id: "business", title: "商战小说" },
      { id: "horror", title: "恐怖悬疑" },
    ],
    shortcuts: [
      { title: "刘慈欣作品年谱", path: "/writers/authors/liu-cixin/" },
      { title: "紫金陈作品年谱", path: "/writers/authors/zi-jin-chen/" },
      { title: "马伯庸作品年谱", path: "/writers/authors/ma-bo-yong/" },
      { title: "科幻文学", path: "/writers/categories/sci-fi/" },
      { title: "悬疑推理", path: "/writers/categories/suspense/" },
      { title: "历史小说", path: "/writers/categories/historical/" },
      { title: "纪实与随笔", path: "/writers/categories/non-fiction/" },
      { title: "商战小说", path: "/writers/categories/business/" },
      { title: "恐怖悬疑", path: "/writers/categories/horror/" },
    ],
  },
  periods,
  events,
  entities,
  sources,
  relations: writersRelations,
};
