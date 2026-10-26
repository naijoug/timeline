import type { Source, TimelineEvent, EventRelation } from '../../core/types';

export const modernSources: Source[] = [
  {
    "id": "modern-bm-qing",
    "title": "An introduction to 19th-century China",
    "publisher": "大英博物馆 · Jessica Harrison-Hall",
    "url": "https://www.britishmuseum.org/blog/introduction-19th-century-china",
    "type": "博物馆研究",
    "format": "博物馆研究",
    "locator": "The military：鸦片战争、太平天国及人口迁移段",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-taiping-harvard",
    "title": "Placards of the Taiping Heavenly Kingdom",
    "publisher": "哈佛大学费正清中国研究中心",
    "url": "https://fairbank.fas.harvard.edu/research/blog/placards-of-the-taiping-heavenly-kingdom/",
    "type": "大学馆藏研究",
    "format": "大学馆藏研究",
    "locator": "开头1851—1864年；太平天国布告与宗教政治方案",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-second-opium",
    "title": "Second China War",
    "publisher": "英国国家陆军博物馆",
    "url": "https://www.nam.ac.uk/explore/second-china-war",
    "type": "博物馆研究",
    "format": "博物馆研究",
    "locator": "1856—1860年；Burning of the Summer Palace；Convention of Peking",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-tongzhi",
    "title": "同治皇帝",
    "publisher": "故宫博物院",
    "url": "https://www.dpm.org.cn/court/lineage/226248.html",
    "type": "博物馆历史说明",
    "format": "博物馆历史说明",
    "locator": "奕訢1861年主持总理各国事务衙门；同文馆条",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-western-learning",
    "title": "Excerpts from On the Adoption of Western Learning",
    "publisher": "哥伦比亚大学 Asia for Educators",
    "url": "https://afe.easia.columbia.edu/main_pop/ps/ps_china-feng-guifen-western-learning.htm",
    "type": "史料英译节录与教学导言",
    "format": "史料英译节录与教学导言",
    "locator": "导言与冯桂芬文章节录",
    "version": "据J. Mason Gentzler编Changing China（1977）70—71页；不是中文原件",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-shimonoseki",
    "title": "Towards peace: Treaty of Shimonoseki and Triple Intervention",
    "publisher": "日本亚洲历史资料中心 · 英国图书馆联合展览",
    "url": "https://jacar.go.jp/english/exhibition/jacarbl-fsjwar-e/about/p004.html",
    "type": "档案展览说明与文书链接",
    "format": "档案展览说明与文书链接",
    "locator": "Treaty of Shimonoseki；Triple Intervention",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-yalu",
    "title": "9月17日：黄海海战",
    "publisher": "中华人民共和国外交部",
    "url": "https://www.fmprc.gov.cn/web/ziliao_674904/historytoday_674971/200309/t20030917_9284644.shtml",
    "type": "机构历史回顾",
    "format": "机构历史回顾",
    "locator": "1894年9月17日条",
    "version": "仅采用日期、地点和交战双方；不用兵力、伤亡与英雄叙事细节",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-late-qing-reform",
    "title": "From Reform to Revolution, 1842 to 1911",
    "publisher": "哥伦比亚大学 Asia for Educators",
    "url": "https://afe.easia.columbia.edu/special/china_1750_reform.htm",
    "type": "大学教学研究",
    "format": "大学教学研究",
    "locator": "Reform；1901年后教育、军事与商业改革段",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-boxer-awm",
    "title": "China (Boxer Rebellion), 1900–01",
    "publisher": "澳大利亚战争纪念馆",
    "url": "https://www.awm.gov.au/articles/atwar/boxer",
    "type": "博物馆研究",
    "format": "博物馆研究",
    "locator": "义和团运动与1900年列强军事干预段",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-boxer-protocol",
    "title": "Settlement of matters growing out of the Boxer uprising",
    "publisher": "美国国会图书馆 · 美国条约集",
    "url": "https://wwws.loc.gov/law/help/us-treaties/bevans/m-ust000001-0302.pdf",
    "type": "条约正式英译影印",
    "format": "条约正式英译影印",
    "locator": "文首签署与生效日；第VI、VII、IX条",
    "version": "Bevans美国条约集，第302页起；不是中文条约原件",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-may-fourth-date",
    "title": "外交史上的今天：5月4日",
    "publisher": "中华人民共和国外交部",
    "url": "https://www.fmprc.gov.cn/web/ziliao_674904/historytoday_674971/200305/t20030504_9284558.shtml",
    "type": "机构历史回顾",
    "format": "机构历史回顾",
    "locator": "1919年5月4日北京学生示威及山东权益争议段",
    "version": "仅采用日期与抗议对象，不沿用政治定性",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-may-fourth-object",
    "title": "五四运动纪念章",
    "publisher": "中国国家博物馆",
    "url": "https://www.chnmuseum.cn/zp/zpml/gmww/202112/t20211214_253220.shtml",
    "type": "藏品说明",
    "format": "藏品说明",
    "locator": "6月5日上海罢工；6月28日拒签段",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-ccp-first",
    "title": "中国共产党的成立",
    "publisher": "中国共产党新闻网",
    "url": "https://cpc.people.com.cn/GB/33837/3503018.html",
    "type": "政党机构历史回顾",
    "format": "政党机构历史回顾",
    "locator": "1921年7月23日开幕与7月1日纪念日区别",
    "version": "只采用日期与会议信息，不沿用目的论评价",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-northern-expedition",
    "title": "第一次外相時代：中国安定化の模索",
    "publisher": "日本外务省外交史料馆",
    "url": "https://www.mofa.go.jp/mofaj/annai/honsho/shiryo/shidehara/02_2.html",
    "type": "外交档案展览说明",
    "format": "外交档案展览说明",
    "locator": "1926年7月北伐；1928年4月重启、6月进北京和12月张学良表态段",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-1927-purge",
    "title": "共产党历史上最苦难的日子：四一二",
    "publisher": "中共上海市委党史研究室 · 龙华英烈",
    "url": "https://www.ccphistory.org.cn/shds/ssjc/content/b841a008-e2ea-4716-b51b-285d8267864d.html",
    "type": "政党机构历史回顾",
    "format": "政党机构历史回顾",
    "locator": "1927年4月12—13日条",
    "version": "仅采用日期、解除工人武装、逮捕与杀害等经过，不使用伤亡数字或政治定性",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-revolution-1949",
    "title": "The Chinese Revolution of 1949",
    "publisher": "美国国务院历史办公室",
    "url": "https://history.state.gov/milestones/1945-1952/chinese-rev",
    "type": "外交史研究",
    "format": "外交史研究",
    "locator": "首段1949年10月1日；1927年White Terror；1945年会谈与1946年内战；1949年撤台段",
    "version": "本页其他段有西安事变误记1937年等问题；仅采用列明段落，不用其概括内战在建国当日结束的说法",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-mukden-ndl",
    "title": "Manchurian Incident of 1931",
    "publisher": "日本国立国会图书馆",
    "url": "https://www.ndl.go.jp/modern/e/cha4/description01.html",
    "type": "档案展览说明",
    "format": "档案展览说明",
    "locator": "首段1931年9月18日晚与关东军军官炸毁铁路；原田熊雄日记说明",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-mukden-aftermath",
    "title": "The Mukden Incident of 1931 and the Stimson Doctrine",
    "publisher": "美国国务院历史办公室",
    "url": "https://history.state.gov/milestones/1921-1936/mukden-incident",
    "type": "外交史研究",
    "format": "外交史研究",
    "locator": "Japanese Invasion of China：占领东北与满洲国段",
    "version": "具体爆炸实施者依据日本国会图书馆，不沿用本页较弱的推测措辞",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-long-march",
    "title": "何香凝、廖承志等合绘陈毅题跋的长征会师图",
    "publisher": "中国国家博物馆",
    "url": "https://www.chnmuseum.cn/zp/zpml/gshww/202109/t20210927_251573.shtml",
    "type": "藏品说明",
    "format": "藏品说明",
    "locator": "1934年10月撤退、1936年10月会师段",
    "version": "作品绘于1961年，不是1930年代现场图像；仅取历史日期和转移背景",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-war-china",
    "title": "Liberation in China and the Pacific",
    "publisher": "美国国家二战博物馆 · Rana Mitter",
    "url": "https://www.nationalww2museum.org/war/articles/liberation-china-and-pacific",
    "type": "博物馆学者讲解",
    "format": "博物馆学者讲解",
    "locator": "Origins of the War in Asia：1937年7月7日及战事扩大",
    "version": "不沿用页面对日本投降原因的单一因果概括",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-shanghai",
    "title": "伟大的淞沪抗战 英勇的中华儿女",
    "publisher": "人民网党史频道",
    "url": "https://dangshi.people.com.cn/n/2015/0813/c85037-27455102.html",
    "type": "机构历史回顾",
    "format": "机构历史回顾",
    "locator": "五阶段分期；11月12日上海地区会战结束与12月2日江阴战事结束",
    "version": "只采用战役范围与日期，说明不同终点口径，不使用兵力伤亡总数",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-nanjing-yale",
    "title": "The Nanking Massacre Project: Introduction",
    "publisher": "耶鲁大学神学院图书馆",
    "url": "https://divinity-adhoc.library.yale.edu/nanking/about.html",
    "type": "目击者档案项目介绍",
    "format": "目击者档案项目介绍",
    "locator": "首段1937年12月13日及其后六周；档案覆盖局限说明",
    "version": "项目提供目击者文书和照片；本轮仅核对项目介绍，不声称逐件核验全部档案",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-taierzhuang",
    "title": "血战台儿庄 激战禹王山：徐州会战回眸",
    "publisher": "西藏日报 · 新华社（赵久龙、丛佳鑫）",
    "url": "https://e.xzxw.com/xzrbpad/202507/28/content_319068.html",
    "type": "机构历史回顾",
    "format": "机构历史回顾",
    "locator": "1938年3月开战、4月7日胜利；随后徐州撤退段",
    "version": "仅采用日期、指挥方与战役关系；不采用兵力、伤亡数字",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "modern-japan-surrender",
    "title": "Surrender of Japan (1945)",
    "publisher": "美国国家档案馆",
    "url": "https://www.archives.gov/milestone-documents/surrender-of-japan",
    "type": "投降书影像与文本转录",
    "format": "投降书影像与文本转录",
    "locator": "文首1945年9月2日；投降书第二、三段与签署名单",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-china-surrender",
    "title": "民國34年9月9日中華民國接受日本國投降文件",
    "publisher": "台湾文化部国家文化记忆库 · 国史馆藏品",
    "url": "https://tcmb.culture.tw/zh-tw/detail?id=20160426000004&indexCode=BOCH_CountryCulture_61",
    "type": "馆藏文物目录",
    "format": "馆藏文物目录",
    "locator": "题名与文物说明：1945年9月9日受降文件",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-liaoshen",
    "title": "辽沈战役：开启解放战争战略决战序幕",
    "publisher": "人民网 · 解放军报（冯斌、刘奎、姚池）",
    "url": "https://cpc.people.com.cn/n1/2022/0531/c443712-32434528.html",
    "type": "机构军事史回顾",
    "format": "机构军事史回顾",
    "locator": "首段1948年9月12日至11月2日；锦州和沈阳作战段",
    "version": "采用日期、战区和结果；不沿用政治评价或参战伤亡统计",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "modern-huaihai",
    "title": "淮海战役：以60万战胜80万的战争奇迹",
    "publisher": "央广军事 · 姜廷玉",
    "url": "https://m.cnr.cn/mil/20190108/t20190108_524475138.html",
    "type": "机构军事史回顾",
    "format": "机构军事史回顾",
    "locator": "审时度势 科学运筹：1948年11月6日至1949年1月10日；参战部队与徐州战区",
    "version": "标题与正文兵力、伤亡数字不用于本节点；仅核对时间、部队、地区和结果",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "modern-pingjin",
    "title": "平津战役：铸就伟大胜利的关键一役",
    "publisher": "人民网 · 解放军报（冯斌、刘奎、郭书菊）",
    "url": "https://cpc.people.com.cn/n1/2022/0726/c443712-32485491.html",
    "type": "机构军事史回顾",
    "format": "机构军事史回顾",
    "locator": "首段；天津作战和北平和平接收段",
    "version": "仅采用战役日期与不同城市的解决方式",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "modern-three-campaigns",
    "title": "伟大征程丨三大战役：伟大的战略决战",
    "publisher": "新华网·新华社（朱高祥、宋瑞）",
    "url": "https://www1.xinhuanet.com/politics/20260615/b48d60a31a304823b72b17f4aad54558/c.html",
    "type": "机构军事史回顾",
    "format": "机构军事史回顾",
    "locator": "1948年9月12日及1949年1月31日时间段；三大战役整体背景",
    "version": "2026年新华社回顾，已核正文日期；只作整体背景和终点交叉佐证，不从概述推断三战役互不重叠",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "modern-land-reform",
    "title": "中华人民共和国土地改革法",
    "publisher": "中国人大网原文 · 河南省纪委监委转载",
    "url": "https://www.hnsjw.gov.cn/sitesources/hnsjct/page_pc/ztjj/gqbnhdgclswy/dswx/article3008587e20c94309a2da10dc80e38d9b.html",
    "type": "法律原文转载",
    "format": "法律原文转载",
    "locator": "1950年6月30日公布施行命令；第一、二条",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-korea-entry",
    "title": "Out in the Cold: China enters the war, October 1950",
    "publisher": "澳大利亚战争纪念馆",
    "url": "https://www.awm.gov.au/visit/exhibitions/korea/operations/china",
    "type": "博物馆研究",
    "format": "博物馆研究",
    "locator": "China enters the war；October 1950段",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-korea-armistice",
    "title": "Korean War Armistice Agreement (1953)",
    "publisher": "美国国家档案馆",
    "url": "https://www.archives.gov/milestone-documents/armistice-agreement-restoration-south-korean-state",
    "type": "停战协定影像与转录",
    "format": "停战协定影像与转录",
    "locator": "1953年7月27日；协定序言及第一、二条",
    "version": "采用协定条款；不将网站介绍的ended the war概括理解为签订了和平条约",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-first-five-year",
    "title": "How China Proceeds with the Task of Industrialization (1953), by Ji Yun",
    "publisher": "哥伦比亚大学 Asia for Educators",
    "url": "https://afe.easia.columbia.edu/main_pop/ps/ps_china-jiyun-industrialization.htm",
    "type": "史料英译节录与教学导言",
    "format": "史料英译节录与教学导言",
    "locator": "导言；人民日报1953年文章节录",
    "version": "Sources of Chinese Tradition第2卷455—456页节译；政策主张不是实施效果的独立评估",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-socialist-transformation",
    "title": "全国工商界代表为全国主要城市资本主义工商业实现全行业公私合营给中共中央的报喜信",
    "publisher": "中国国家博物馆",
    "url": "https://www.chnmuseum.cn/zp/zpml/gshww/202109/t20210927_251567.shtml",
    "type": "藏品说明",
    "format": "藏品说明",
    "locator": "藏品说明；1956年全行业公私合营与年底三大改造段",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-constitution-1954",
    "title": "中华人民共和国宪法（1954年）",
    "publisher": "共产党员网",
    "url": "https://news.12371.cn/2015/03/18/ARTI1426665514681575.shtml",
    "type": "历史宪法原文",
    "format": "历史宪法原文",
    "locator": "1954年9月20日公告；总纲与国家机构章",
    "version": "1954年历史文本，不是现行法；已核通过日期、序言、总纲和国家机构章",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "modern-hundred-flowers",
    "title": "Intellectual Opinions from the Hundred Flowers Period (1957)",
    "publisher": "哥伦比亚大学 Asia for Educators",
    "url": "https://afe.easia.columbia.edu/main_pop/ps/ps_china-hundred-flowers.htm",
    "type": "史料英译节录与教学导言",
    "format": "史料英译节录与教学导言",
    "locator": "导言；储安平等意见节录",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-resolution-1981",
    "title": "关于建国以来党的若干历史问题的决议",
    "publisher": "共产党员网",
    "url": "https://www.12371.cn/2021/11/09/ARTI1636454249781129.shtml",
    "type": "政党决议原文",
    "format": "政党决议原文",
    "locator": "第18—20段：1957—1961；文化大革命十年一节；1978年转折",
    "version": "1981年6月27日通过；党对自身历史的正式评价，必须明确归属，不能代替全部学术研究",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-great-famine-study",
    "title": "The Institutional Causes of China’s Great Famine, 1959–61",
    "publisher": "Xin Meng、Nancy Qian、Pierre Yared · NBER工作论文16361，哥伦比亚大学存本",
    "url": "https://business.columbia.edu/sites/default/files-efs/pubfiles/3546/w16361.pdf",
    "type": "学术研究论文",
    "format": "学术研究论文",
    "locator": "摘要；Introduction及粮食征购机制分析",
    "version": "2010年9月工作论文版本；不是人口死亡总量的唯一估计，不把模型解释当作所有地区完整因果",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-cultural-revolution-16",
    "title": "The Sixteen Points: Guidelines for the Great Proletarian Cultural Revolution (1966)",
    "publisher": "哥伦比亚大学 Asia for Educators",
    "url": "https://afe.easia.columbia.edu/main_pop/ps/ps_china-sixteen-points.htm",
    "type": "史料英译节录与教学导言",
    "format": "史料英译节录与教学导言",
    "locator": "导言；1966年十六条节录",
    "version": "运动纲领属于当时的政治主张，不能用其自我描述代替对迫害与制度破坏的评价",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-un-2758",
    "title": "1971年中国在联合国代表权与A/RES/2758(XXVI)",
    "publisher": "联合国达格·哈马舍尔德图书馆",
    "url": "https://ask.un.org/faq/320138",
    "type": "联合国文献指南与原始文书链接",
    "format": "联合国文献指南与原始文书链接",
    "locator": "答复首段；决议原文、会议记录与表决链接",
    "version": "核对决议日期和代表权条文；不把后来的各方解释当作决议原文",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-reform-1978",
    "title": "中国共产党第十一届中央委员会第三次全体会议公报",
    "publisher": "学习时报理论网 · 新华社",
    "url": "https://www.studytimes.cn/zggcdzywyhlcqthy/zggcddsyjzywyhlcqthy/202111/t20211105_37543.html",
    "type": "会议公报原文转载",
    "format": "会议公报原文转载",
    "locator": "会议时间；从1979年转移工作着重点及农业、经济管理段",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-constitution-1982",
    "title": "中华人民共和国宪法（历次修正沿革）",
    "publisher": "中央人民政府驻香港特别行政区联络办公室",
    "url": "https://www.locpg.gov.cn/fzfz/zhrmghgxf/index.htm",
    "type": "宪法合并文本",
    "format": "宪法合并文本",
    "locator": "文首1982年12月4日通过公布及历次修正说明；目录",
    "version": "本页是2018年修正后的合并文本；本节点仅据文首核对1982年日期和篇章结构，不将后来的具体条文倒写为1982年内容",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "modern-tiananmen-archives",
    "title": "Tiananmen Square, 1989: The Declassified History",
    "publisher": "美国国家安全档案馆（乔治·华盛顿大学）· Jeffrey Richelson、Michael Evans编",
    "url": "https://nsarchive2.gwu.edu/NSAEBB/NSAEBB16/",
    "type": "解密外交文书专题",
    "format": "解密外交文书专题",
    "locator": "导言；Documents 7、12—17、31及所链解密电报",
    "version": "同期电报包含目击、转述、传闻和初步估计，可信度不一；只采用交叉一致的抗议、戒严与军队开火主线，不采用未经证实的内部兵变等传闻或单一死亡数",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-southern-tour",
    "title": "新中国峥嵘岁月丨邓小平视察南方",
    "publisher": "人民网 · 新华社",
    "url": "https://cpc.people.com.cn/n1/2019/1024/c429559-31418497.html",
    "type": "机构历史资料",
    "format": "机构历史资料",
    "locator": "1992年1月18日至2月21日行程与谈话段",
    "version": "仅采用行程与谈话议题，不沿用评价性结论",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "modern-market-reform",
    "title": "价格改革的成就与经验",
    "publisher": "国家发展和改革委员会",
    "url": "https://www.ndrc.gov.cn/fzggw/jgsj/jgs/sjdt/201811/t20181119_1110111.html",
    "type": "政策历史回顾",
    "format": "政策历史回顾",
    "locator": "1992年南方谈话与十四大、1993年十四届三中全会段",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-fourteenth-congress",
    "title": "中国共产党第十四次全国代表大会",
    "publisher": "中国共产党新闻网资料中心",
    "url": "https://cpc.people.com.cn/GB/64162/64168/64567/",
    "type": "政党会议资料",
    "format": "政党会议资料",
    "locator": "1992年10月12日至18日；建立社会主义市场经济体制目标",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-taiwan-election",
    "title": "总统、副总统选举：历次选举摘要",
    "publisher": "中央选举委员会（台湾）",
    "url": "https://web.cec.gov.tw/central/article/19170",
    "type": "选举机关历史记录",
    "format": "选举机关历史记录",
    "locator": "第9任：民国85年3月23日；首次由人民直接选举",
    "version": "网页正文动态加载，已核对搜索索引中的第9任行，并用国史馆与选举结果表交叉核对",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-taiwan-election-result",
    "title": "第九任总统、副总统选举政党得票",
    "publisher": "国立政治大学选举研究中心 · 中央选举委员会资料",
    "url": "https://vote.nccu.edu.tw/cec/A1996005.PDF",
    "type": "选举数据原表",
    "format": "选举数据原表",
    "locator": "表首投票日期1996年3月23日；候选人组得票",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-taiwan-election-date",
    "title": "台湾首次总统就职典礼",
    "publisher": "国史馆台湾文献馆",
    "url": "https://www.th.gov.tw/Epaper_Content/238/9126/",
    "type": "档案机构历史研究",
    "format": "档案机构历史研究",
    "locator": "第二段：首次全民直选总统1996年3月23日",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-hong-kong-basic-law",
    "title": "Basic Law: Preamble",
    "publisher": "香港特别行政区政府基本法网站",
    "url": "https://www.basiclaw.gov.hk/en/basiclaw/preamble.html",
    "type": "基本法正式英译",
    "format": "基本法正式英译",
    "locator": "序言：1984年联合声明、1997年7月1日；特别行政区制度",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-hong-kong-effective",
    "title": "The Basic Law",
    "publisher": "香港特别行政区律政司",
    "url": "https://www.doj.gov.hk/en/our_legal_system/basic_law.html",
    "type": "法律制度说明",
    "format": "法律制度说明",
    "locator": "1990年4月4日公布；1997年7月1日生效；one country, two systems",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-macao-establishment",
    "title": "Decision on the Establishment of the Macao Special Administrative Region",
    "publisher": "中央人民政府驻澳门联络办公室",
    "url": "https://www.zlb.gov.cn/2014-06/26/c_126677086_20.htm",
    "type": "全国人大决定正式英译",
    "format": "全国人大决定正式英译",
    "locator": "1993年3月31日全国人大决定第1、2项",
    "version": "核对1999年12月20日成立及澳门半岛、氹仔、路环范围",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-macao-transfer",
    "title": "General Outline of the Macao Special Administrative Region",
    "publisher": "中华人民共和国外交部",
    "url": "https://www.mfa.gov.cn/eng/wjb/zzjg_663340/gats_665294/xgxw_665296/202406/t20240606_11405837.html",
    "type": "机构历史资料",
    "format": "机构历史资料",
    "locator": "1999年12月19日午夜交接与12月20日零时成立段",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-wto-accession",
    "title": "China: WTO accession",
    "publisher": "世界贸易组织",
    "url": "https://www.wto.org/english/thewto_E/minist_e/min01_e/min01_11nov_e.htm",
    "type": "国际组织同时代记录",
    "format": "国际组织同时代记录",
    "locator": "2001年11月11日批准加入议定书；12月11日成为成员",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-wto-protocol",
    "title": "Protocol on the accession of the People’s Republic of China to the Marrakesh Agreement",
    "publisher": "联合国条约集",
    "url": "https://treaties.un.org/Pages/showDetails.aspx?clang=_en&objid=0800000280083c8d",
    "type": "国际条约登记记录",
    "format": "国际条约登记记录",
    "locator": "缔结2001年11月10日；生效2001年12月11日",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-constitution-2018",
    "title": "中华人民共和国宪法修正案（2018年）",
    "publisher": "中华人民共和国商务部 · 受权发布文本",
    "url": "https://www.mofcom.gov.cn/xxgcxjpxsdzgtsshzysx/zywj/art/2018/art_c2bf29a9e72f4195bf3ad28870bc8a95.html",
    "type": "宪法修正案原文",
    "format": "宪法修正案原文",
    "locator": "2018年3月11日通过；第四十五条及第五十二条",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-covid-who",
    "title": "Report of the WHO–China Joint Mission on COVID-19, 16–24 February 2020",
    "publisher": "世界卫生组织与中国联合考察组",
    "url": "https://www.who.int/docs/default-source/coronaviruse/WHO-China-joint-mission-on-covid-19-final-report.pdf",
    "type": "同时代公共卫生考察报告",
    "format": "同时代公共卫生考察报告",
    "locator": "第14—15页The China response；2020年1月23日交通管制",
    "version": "用于当时措施和日期；疫情早期资料有时效局限，不据此判定病毒起源或最终伤亡",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-civil-code",
    "title": "中华人民共和国民法典",
    "publisher": "北京市人民政府 · 中国人大网文本",
    "url": "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    "type": "法律原文转载",
    "format": "法律原文转载",
    "locator": "题注2020年5月28日通过；目录；第1260条",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-covid-ten",
    "title": "2022年12月7日国务院联防联控机制新闻发布会文字实录",
    "publisher": "国家疾病预防控制局",
    "url": "https://www.ndcpa.gov.cn/jbkzzx/c100009/common/content/content_1656341116366950400.html",
    "type": "同时代政策发布会实录",
    "format": "同时代政策发布会实录",
    "locator": "优化措施十条：核酸检测、隔离方式和风险区域",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-covid-policy-shift",
    "title": "关于对新型冠状病毒感染实施“乙类乙管”的总体方案",
    "publisher": "国家卫生健康委员会",
    "url": "https://www.nhc.gov.cn/wjw/c100378/202212/d15a93cd65f549e0a31ded91e6a9f128.shtml",
    "type": "政策原文",
    "format": "政策原文",
    "locator": "总体要求；2023年1月8日起的措施；优化中外人员往来",
    "version": "原文搜索索引可核对；页面访问返回412，同时以国家应急广播所载原文交叉核对",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-covid-policy-republication",
    "title": "国家卫健委：1月8日起实施“乙类乙管”",
    "publisher": "国家应急广播 · 国家卫生健康委员会公告及方案转载",
    "url": "https://www.cneb.gov.cn/yjxw/gnxw/20221227/t20221227_526106138.html",
    "type": "政策原文转载",
    "format": "政策原文转载",
    "locator": "2022年12月26日公告；总体方案第二部分",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-retirement-reform",
    "title": "全国人大常委会关于实施渐进式延迟法定退休年龄的决定",
    "publisher": "敖汉旗人民政府 · 人力资源和社会保障局转载",
    "url": "https://www.ahq.gov.cn/xwzx/tzgg/202502/t20250224_2539381.html",
    "type": "全国人大常委会决定原文转载",
    "format": "全国人大常委会决定原文转载",
    "locator": "决定第一、二、五项",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-fifteenth-plan",
    "title": "关于国民经济和社会发展第十五个五年规划纲要的决议",
    "publisher": "北京市人大常委会 · 新华社受权发布",
    "url": "https://www.bjrd.gov.cn/zyfb/zt/14jqgrd04chybjdbthdztbd/wjbg/202603/t20260313_4556146.html",
    "type": "全国人大决议原文转载",
    "format": "全国人大决议原文转载",
    "locator": "题注2026年3月12日通过；批准规划纲要的第一段",
    "version": "已核对在线文字；不是原件影印",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-first-opium-nam",
    "title": "First China War",
    "publisher": "英国国家陆军博物馆",
    "url": "https://www.nam.ac.uk/explore/first-china-war-1839-1842",
    "type": "博物馆研究",
    "format": "博物馆研究",
    "locator": "Balance of trade；Chinese resistance；Naval engagements",
    "version": "本页从1839年冲突起算；仅取贸易背景与1840年北上经过，不采用其将1841年初步协议直接说成香港正式割让的简化表述",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-reform-1898-palace",
    "title": "戊戌变法",
    "publisher": "故宫博物院",
    "url": "https://www.dpm.org.cn/lemmas/241774.html",
    "type": "博物馆历史说明",
    "format": "博物馆历史说明",
    "locator": "改革内容、政变及京师大学堂保留段",
    "version": "仅采用政策范围及变法失败后的大学堂延续；不沿用阶级定性，不把农历日期直接当公历",
    "checkedAt": "2026-10-24"
  },
  {
    "id": "modern-prc-founding-record",
    "title": "中华人民共和国大事记（1949年10月－2019年9月）",
    "publisher": "中央党史和文献研究院 · 共产党员网转载",
    "url": "https://www.12371.cn/2019/09/27/ARTI1569582665702388.shtml",
    "type": "机构编年史",
    "format": "机构编年史",
    "locator": "1949年10月1日段：政协、共同纲领、政府会议和成立典礼",
    "version": "只取可核对的日期、会议和机构安排，不沿用“完全统一”等政治评价",
    "checkedAt": "2026-10-26"
  }
];

export const modernEvents: TimelineEvent[] = [
  {
    "id": "first-opium-war",
    "title": "第一次鸦片战争",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1840
      },
      "end": {
        "year": 1842
      }
    },
    "category": "war",
    "periodIds": [
      "qing"
    ],
    "entityIds": [],
    "summary": "英国对清朝发动战争，清军战败，随后签订《南京条约》。",
    "significance": "把战争过程与既有的1842年条约节点连接，才能同时看到军事冲击与贸易、外交制度的后果。",
    "note": "采用中国史常见的1840—1842年军事战争分期；部分国际研究从1839年中英冲突起算。本条不重复《南京条约》的具体条款。",
    "sourceIds": [
      "modern-first-opium-nam"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "冲突背景",
        "text": "战争背景涉及英国商人走私印度鸦片、贸易与白银流动，以及清朝禁烟。英国国家陆军博物馆将1839年的冲突列入战争前段，说明不同起点口径。",
        "sourceIds": [
          "modern-first-opium-nam"
        ],
        "locator": "Balance of trade；Chinese resistance"
      },
      {
        "label": "军事升级",
        "text": "1840年英国远征舰队北上攻占定海等地，战争持续至1842年清朝接受和约；本目录以1840年大规模战争阶段起算。",
        "sourceIds": [
          "modern-first-opium-nam"
        ],
        "locator": "Naval engagements及战争结束段"
      },
      {
        "label": "理解与延伸",
        "text": "将“为什么发生战争”和“战后改变了什么”分为两个问题：前者需要贸易、禁烟和军事决策，后者须回到《南京条约》等具体文本。",
        "editorial": true
      }
    ]
  },
  {
    "id": "taiping-civil-war",
    "title": "太平天国战争",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1851
      },
      "end": {
        "year": 1864
      }
    },
    "category": "war",
    "periodIds": [
      "qing"
    ],
    "entityIds": [],
    "summary": "太平天国与清廷长期交战，战争波及大片地区并破坏社会经济。",
    "significance": "晚清危机不能只看外战。内战、人口迁移与地方军事力量的发展也是理解国家权力变化的线索。",
    "note": "采用1851—1864年常见分期；1850年的组织与武装冲突、1864年后的余部活动另属延伸阶段。死亡估计差异很大，本条不列单一数字。",
    "sourceIds": [
      "modern-taiping-harvard",
      "modern-bm-qing"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "史实与依据",
        "text": "哈佛馆藏研究将太平天国战争定年1851—1864年，并通过布告说明其政治与宗教方案。",
        "sourceIds": [
          "modern-taiping-harvard"
        ],
        "locator": "首段及布告说明"
      },
      {
        "label": "史实与依据",
        "text": "博物馆研究指出战争促使人口迁往较安全的城市与边地，并带来新的资源冲突。",
        "sourceIds": [
          "modern-bm-qing"
        ],
        "locator": "The military后半段"
      },
      {
        "label": "理解与延伸",
        "text": "同一时期发生外战与内战，可以追问中央财政、地方军队和人口迁移如何相互牵动；不能把清朝变化解释为单一外国冲击。",
        "editorial": true
      }
    ]
  },
  {
    "id": "second-opium-war",
    "title": "第二次鸦片战争",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1856
      },
      "end": {
        "year": 1860
      }
    },
    "category": "war",
    "periodIds": [
      "qing"
    ],
    "entityIds": [],
    "summary": "英法联军与清朝作战，战争扩展至北京，圆明园遭劫掠焚毁。",
    "significance": "条约体系通过军事压力进一步扩展，清廷同时面临战争、外交与行政改革的压力。",
    "note": "不是单场战役。1858年《天津条约》与1860年《北京条约》分属不同阶段；不把各国条约的全部条款混为同一文本。",
    "sourceIds": [
      "modern-second-opium"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "战争扩大",
        "text": "1856年起的英法军事行动逐步由华南扩大，1858年清政府与列强签订《天津条约》，但战争并未就此最终结束。",
        "sourceIds": [
          "modern-second-opium"
        ],
        "locator": "战争起因、Tientsin段"
      },
      {
        "label": "北京与议和",
        "text": "1860年联军进入北京，圆明园遭劫掠并被焚毁；《北京条约》随后确认和扩展此前条约安排。",
        "sourceIds": [
          "modern-second-opium"
        ],
        "locator": "Burning of the Summer Palace；Convention of Peking"
      },
      {
        "label": "理解与延伸",
        "text": "把1858年签约、1859年冲突和1860年占领分开看，有助于理解条约并不自动结束争端，执行条款本身也可能引发新战争。",
        "editorial": true
      }
    ]
  },
  {
    "id": "zongli-yamen-self-strengthening",
    "title": "总理衙门设立与洋务改革",
    "time": {
      "kind": "point",
      "start": {
        "year": 1861
      }
    },
    "category": "institution",
    "periodIds": [
      "qing"
    ],
    "entityIds": [],
    "summary": "清廷设总理各国事务衙门，洋务改革逐步涉及外交、军工与新式教育。",
    "significance": "从对外战争转入国家如何组织回应：学习技术与设立新机构，并不等于立即改变全部政治制度。",
    "note": "1861年标记总理衙门这一机构节点，不把整个洋务运动视为当年一次完成，也不以甲午战败判定一切工业、教育成果归零。",
    "sourceIds": [
      "modern-tongzhi",
      "modern-western-learning"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "史实与依据",
        "text": "故宫资料记奕訢于1861年主持总理各国事务衙门，并列同文馆附属其下、培养翻译人才。",
        "sourceIds": [
          "modern-tongzhi"
        ],
        "locator": "奕訢与同文馆条"
      },
      {
        "label": "史实与依据",
        "text": "冯桂芬文章主张学习西方科学技术；大学导言将这类倡议放在清朝战败后增强军事与工业能力的背景中。",
        "sourceIds": [
          "modern-western-learning"
        ],
        "locator": "导言及文章节录"
      },
      {
        "label": "理解与延伸",
        "text": "可以分别追踪外交办事机构、军事企业和教育机构：它们解决的问题不同，成功或失败不宜用一个总标签判断。",
        "editorial": true
      }
    ]
  },
  {
    "id": "first-sino-japanese-war",
    "title": "甲午战争",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1894
      },
      "end": {
        "year": 1895
      }
    },
    "category": "war",
    "periodIds": [
      "qing"
    ],
    "entityIds": [],
    "summary": "清朝在对日战争中失败，1895年签订《马关条约》。",
    "significance": "战争改变东亚力量关系，也加剧清朝改革压力。条约后果、列强干预与后续变法应分层阅读。",
    "note": "1894—1895是战争分期，不等于条约签署当天全部善后完成；辽东半岛随后归还，不应与台湾、澎湖的割让混为同一后续。",
    "sourceIds": [
      "modern-shimonoseki",
      "modern-yalu"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "史实与依据",
        "text": "档案展览记《马关条约》于1895年4月17日签署，规定台湾、澎湖和辽东割让等条件；三国干预后另订还辽安排。",
        "sourceIds": [
          "modern-shimonoseki"
        ],
        "locator": "Treaty of Shimonoseki；Triple Intervention"
      },
      {
        "label": "战争中的关键战役",
        "text": "1894年9月17日，北洋舰队与日本联合舰队在黄海大东沟外海交战。",
        "sourceIds": [
          "modern-yalu"
        ],
        "locator": "1894年9月17日条"
      },
      {
        "label": "理解与延伸",
        "text": "甲午战争的战场、1895年和约以及三国干预是连续但不同层次的事件；比较它们可看出军事胜负如何被外交力量重新塑形。",
        "editorial": true
      }
    ]
  },
  {
    "id": "hundred-days-reform",
    "title": "戊戌变法",
    "time": {
      "kind": "point",
      "start": {
        "year": 1898
      }
    },
    "category": "politics",
    "periodIds": [
      "qing"
    ],
    "entityIds": [],
    "summary": "光绪帝推动的变法短暂展开，随后遭政变中止。",
    "significance": "甲午战败后的改革诉求扩大到政治与教育制度；变法受挫不意味着晚清改革从此停止。",
    "note": "只用年份精度。此节点概括百日维新，不将所有晚清新政都归入1898年，也不把改革者诉求当作已落实的结果。",
    "sourceIds": [
      "modern-late-qing-reform",
      "modern-reform-1898-palace"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "史实与依据",
        "text": "大学研究说明康有为、梁启超、谭嗣同等的改革方案在1898年得到短暂试行；较广泛的新政则在1901年后推行。",
        "sourceIds": [
          "modern-late-qing-reform"
        ],
        "locator": "Reform"
      },
      {
        "label": "措施与局限",
        "text": "改革涉及新式学堂、军队训练、裁减冗员及工商业等领域。故宫的介绍指出政变使变法受挫，但京师大学堂并未被裁撤。",
        "sourceIds": [
          "modern-reform-1898-palace"
        ],
        "locator": "改革内容与结尾"
      },
      {
        "label": "理解与延伸",
        "text": "比较“提出了哪些措施”“实际执行多少”“哪些机构留下来”，比简单把变法归为成功或失败更能解释其历史位置。",
        "editorial": true
      }
    ]
  },
  {
    "id": "boxer-war-protocol",
    "title": "义和团、八国联军与《辛丑条约》",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1900
      },
      "end": {
        "year": 1901
      }
    },
    "category": "war",
    "periodIds": [
      "qing"
    ],
    "entityIds": [],
    "summary": "义和团冲突与列强军事干预升级，清廷在战败后签订《辛丑条约》。",
    "significance": "社会暴力、外国军事干预和巨额财政负担交织，成为晚清新政前的重要转折。",
    "note": "1900—1901覆盖战争高潮及议和阶段，不表示义和团最早在1900年出现。八国联军的参战国与议定书的签字国数量不同。",
    "sourceIds": [
      "modern-boxer-awm",
      "modern-boxer-protocol"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "史实与依据",
        "text": "战争纪念馆说明1900年列强在华军事干预的扩展，以及义和团运动的反外来势力背景。",
        "sourceIds": [
          "modern-boxer-awm"
        ],
        "locator": "1900年战争经过"
      },
      {
        "label": "史实与依据",
        "text": "议定书于1901年9月7日签署并生效，涉及赔款、使馆区和驻军安排。",
        "sourceIds": [
          "modern-boxer-protocol"
        ],
        "locator": "文首；第VI、VII、IX条"
      },
      {
        "label": "理解与延伸",
        "text": "需要同时追踪地方群众行动、清廷决策与列强干预，而不是把任何一方视为全程行动完全一致的单一主体。",
        "editorial": true
      }
    ]
  },
  {
    "id": "may-fourth-movement",
    "title": "五四运动",
    "time": {
      "kind": "point",
      "start": {
        "year": 1919,
        "month": 5,
        "day": 4
      }
    },
    "category": "politics",
    "periodIds": [
      "republic-1912-1949",
      "republican-early"
    ],
    "entityIds": [],
    "summary": "北京学生抗议巴黎和会的山东问题安排，运动随后扩展到其他城市与社会群体。",
    "significance": "国际外交争议转化为广泛社会动员，并与新文化、思想和政治组织的变化相交汇。",
    "note": "日期是北京示威起点，不是全部运动结束日期；新文化运动范围更广，不能完全等同于1919年5月4日一天。",
    "sourceIds": [
      "modern-may-fourth-date",
      "modern-may-fourth-object"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "史实与依据",
        "text": "1919年5月4日北京学生集会游行，抗议德国在山东的权益被转让日本。",
        "sourceIds": [
          "modern-may-fourth-date"
        ],
        "locator": "1919年5月4日条"
      },
      {
        "label": "史实与依据",
        "text": "6月上海发生声援学生的罢工与罢市；中国代表没有参加6月28日的巴黎和约签字。",
        "sourceIds": [
          "modern-may-fourth-object"
        ],
        "locator": "第1—2段"
      },
      {
        "label": "理解与延伸",
        "text": "从学生到工人和商人的参与变化，是理解运动扩展的关键；外交目标、文化批判和社会诉求并不完全相同。",
        "editorial": true
      }
    ]
  },
  {
    "id": "ccp-first-congress",
    "title": "中国共产党成立",
    "time": {
      "kind": "point",
      "start": {
        "year": 1921,
        "month": 7,
        "day": 23
      }
    },
    "category": "politics",
    "periodIds": [
      "republic-1912-1949",
      "republican-early"
    ],
    "entityIds": [],
    "summary": "中国共产党第一次全国代表大会在上海开幕。",
    "significance": "新的政治组织进入共和时期的竞争与合作格局，其后与国民党的关系多次变化。",
    "note": "7月23日是经研究确认的一大开幕日；7月1日是后来确定的建党纪念日，二者不能混用。采用机构考证日期，不沿用其价值评价。",
    "sourceIds": [
      "modern-ccp-first"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "史实与依据",
        "text": "党史资料区分1921年7月23日一大召开与后来定下的7月1日纪念日，并说明具体开幕日期曾经重新考证。",
        "sourceIds": [
          "modern-ccp-first"
        ],
        "locator": "一大召开日期及纪念日说明"
      },
      {
        "label": "组织形成的背景",
        "text": "建党前，上海、北京等地已出现早期共产主义组织，共产国际代表参与推动联系；全国代表大会把这些组织联系进一步制度化。",
        "sourceIds": [
          "modern-ccp-first"
        ],
        "locator": "1920年早期组织与1921年一大段"
      },
      {
        "label": "理解与延伸",
        "text": "成立日期只是组织史的起点。可继续比较1921年的小规模组织与1926年北伐联盟、1927年后的武装路线，避免倒推其结局必然。",
        "editorial": true
      }
    ]
  },
  {
    "id": "northern-expedition",
    "title": "北伐战争",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1926,
        "month": 7
      },
      "end": {
        "year": 1928,
        "month": 12
      }
    },
    "category": "war",
    "periodIds": [
      "republic-1912-1949",
      "republican-early",
      "republican-nanjing"
    ],
    "entityIds": [],
    "summary": "国民革命军由广东北进，经过中断与重启，南京国民政府取得名义上的全国统一。",
    "significance": "这场战争重组军阀时代的政治格局，但军事推进、党内分裂与地方实力派延续同时存在。",
    "note": "采用1926年7月出师至1928年12月东北易帜的阶段范围。名义统一不等于中央已完全控制各地，也不等于内战结束。",
    "sourceIds": [
      "modern-northern-expedition"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "从南方北进",
        "text": "1926年7月，蒋介石统率的国民革命军由广东北伐，次年推进至上海、南京；同时发生党内及国共关系的剧烈冲突。",
        "sourceIds": [
          "modern-northern-expedition"
        ],
        "locator": "北伐進展に伴う租界への影響，第1段"
      },
      {
        "label": "重启与名义统一",
        "text": "北伐在内部分裂后中断，1928年4月重启、6月进入北京；12月张学良宣布归附南京政府，带来名义上的统一。",
        "sourceIds": [
          "modern-northern-expedition"
        ],
        "locator": "北伐進展に伴う租界への影響，第1段"
      },
      {
        "label": "理解与延伸",
        "text": "“军事推进”与“统一程度”需要不同证据：地图上的易手不能单独证明税收、军队和地方行政已经完全中央化。",
        "editorial": true
      }
    ]
  },
  {
    "id": "shanghai-purge-1927",
    "title": "四一二清共与国共分裂",
    "time": {
      "kind": "point",
      "start": {
        "year": 1927,
        "month": 4,
        "day": 12
      }
    },
    "category": "politics",
    "periodIds": [
      "republic-1912-1949",
      "republican-early",
      "republican-nanjing"
    ],
    "entityIds": [],
    "summary": "蒋介石一方在上海解除工人武装，逮捕并杀害共产党人与工人活动者。",
    "significance": "北伐中的联盟破裂，国共双方随后走向长期武装冲突，政治组织与军事路线随之改变。",
    "note": "4月12日是上海清共节点，国共合作破裂是跨地区持续过程，不在一天内完成。本条不用未独立复核的伤亡数字。",
    "sourceIds": [
      "modern-1927-purge",
      "modern-revolution-1949"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "史实与依据",
        "text": "上海党史机构记录4月12日对工人纠察队的袭击、缴械及搜捕，13日又发生抗议。",
        "sourceIds": [
          "modern-1927-purge"
        ],
        "locator": "1927年4月12—13日段"
      },
      {
        "label": "史实与依据",
        "text": "美国外交史研究将1927年的清洗与第一次国共合作的破裂相联系。",
        "sourceIds": [
          "modern-revolution-1949"
        ],
        "locator": "White Terror段"
      },
      {
        "label": "理解与延伸",
        "text": "把上海清共放回北伐的联盟结构，可以理解同一军事胜利过程中为何出现激烈分裂；不同地区的过程仍须分别考察。",
        "editorial": true
      }
    ]
  },
  {
    "id": "mukden-incident",
    "title": "九一八事变与东北沦陷",
    "time": {
      "kind": "point",
      "start": {
        "year": 1931,
        "month": 9,
        "day": 18
      }
    },
    "category": "war",
    "periodIds": [
      "republic-1912-1949",
      "republican-nanjing",
      "war-resistance"
    ],
    "entityIds": [],
    "summary": "日本关东军制造铁路爆炸并扩大军事行动，随后占领中国东北。",
    "significance": "中国与日本的战争不能只从1937年看起：东北危机及国际应对失效构成全面战争的重要前史。",
    "note": "本节点日期是事变起点，东北占领与1932年满洲国建立为后续过程。日军制造爆炸有日本档案机构记载，不写成未经证实的猜测。",
    "sourceIds": [
      "modern-mukden-ndl",
      "modern-mukden-aftermath"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "史实与依据",
        "text": "日本国会图书馆记1931年9月18日晚，关东军军官炸毁沈阳郊外柳条湖附近南满铁路。",
        "sourceIds": [
          "modern-mukden-ndl"
        ],
        "locator": "首段"
      },
      {
        "label": "史实与依据",
        "text": "日军随后占领东北，并扶植受其控制的满洲国。",
        "sourceIds": [
          "modern-mukden-aftermath"
        ],
        "locator": "Japanese Invasion of China"
      },
      {
        "label": "理解与延伸",
        "text": "制造冲突的行为、随后的占领与国际组织反应是三个层次。区分它们，才能避免把1931年至1937年的升级过程压缩成一天。",
        "editorial": true
      }
    ]
  },
  {
    "id": "long-march",
    "title": "红军长征",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1934,
        "month": 10
      },
      "end": {
        "year": 1936,
        "month": 10
      }
    },
    "category": "war",
    "periodIds": [
      "republic-1912-1949",
      "republican-nanjing"
    ],
    "entityIds": [],
    "summary": "共产党领导的多支红军部队撤离原根据地，向西北转移并陆续会师。",
    "significance": "共产党军事与政治活动的重心发生重大位移；长征既是军事撤退，也成为其后组织与历史记忆的重要节点。",
    "note": "区间覆盖多支红军的转移，不是所有部队同日出发、沿同一路线行军；不把1935年中央红军抵陕与1936年会师混为一日。",
    "sourceIds": [
      "modern-long-march"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "撤离根据地",
        "text": "1934年10月，中央红军等撤离原有根据地并向西转移；国博藏品说明将这一阶段置于军事压力下的撤退和转移背景。",
        "sourceIds": [
          "modern-long-march"
        ],
        "locator": "历史背景段"
      },
      {
        "label": "会师与历史记忆",
        "text": "1936年10月，红一、二、四方面军在甘肃地区会师，构成长征常见分期终点。该馆《长征会师图》作于1961年，是事后纪念作品而非现场记录。",
        "sourceIds": [
          "modern-long-march"
        ],
        "locator": "历史背景与作品创作时间段"
      },
      {
        "label": "理解与延伸",
        "text": "路线、组织重组和后来的纪念叙事可以同时研究；纪念画能说明历史如何被记忆，却不能代替当年行军记录。",
        "editorial": true
      }
    ]
  },
  {
    "id": "full-scale-war-resistance",
    "title": "卢沟桥事变与全面抗战",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1937,
        "month": 7,
        "day": 7
      },
      "end": {
        "year": 1945,
        "month": 9,
        "day": 2
      }
    },
    "category": "war",
    "periodIds": [
      "republic-1912-1949",
      "war-resistance"
    ],
    "entityIds": [],
    "summary": "卢沟桥一带冲突升级，中日进入全面战争，直到日本正式签署投降书。",
    "significance": "把全面战争作为持续背景，再进入具体会战、占领与平民遭遇，避免以单场胜负代替整场战争。",
    "note": "1937年是全面战争阶段起点，不否定1931年起的侵略与抵抗；1945年9月2日是正式投降书签署日，中国战区受降另在9月9日。",
    "sourceIds": [
      "modern-war-china",
      "modern-japan-surrender"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "史实与依据",
        "text": "二战博物馆学者说明1937年7月7日北京附近的冲突在数日内升级为全面但未正式宣战的中日战争。",
        "sourceIds": [
          "modern-war-china"
        ],
        "locator": "Origins of the War in Asia"
      },
      {
        "label": "史实与依据",
        "text": "日本于1945年9月2日签署投降书，命令其军队停止敌对行动并无条件投降。",
        "sourceIds": [
          "modern-japan-surrender"
        ],
        "locator": "投降书第二、三段"
      },
      {
        "label": "理解与延伸",
        "text": "这条长区间是阅读具体会战的背景，不是把国民政府军、共产党武装及各地抵抗的经历抹成一条完全同步的线。",
        "editorial": true
      }
    ]
  },
  {
    "id": "battle-shanghai-1937",
    "title": "淞沪会战",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1937,
        "month": 8,
        "day": 13
      },
      "end": {
        "year": 1937,
        "month": 11,
        "day": 12
      }
    },
    "category": "battle",
    "periodIds": [
      "republic-1912-1949",
      "war-resistance"
    ],
    "entityIds": [],
    "summary": "中国军队与日军在上海及周边激战，国民政府军队最终撤离上海。",
    "significance": "上海会战显示全面战争的规模与代价；战场失利并没有使中国政府停止抵抗。",
    "note": "终点采用上海市区及周边地区会战口径；若包括江阴等外围撤退战，有资料延至12月2日。不是1932年的淞沪抗战。",
    "sourceIds": [
      "modern-shanghai"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "持续作战",
        "text": "1937年8月13日，上海地区作战展开。资料把会战分为多个进攻、防御与撤退阶段，表明其并非一次短促交锋。",
        "sourceIds": [
          "modern-shanghai"
        ],
        "locator": "五阶段分期"
      },
      {
        "label": "撤退与终点口径",
        "text": "11月12日中国军队退出上海市区南市；资料还区分延续到12月2日江阴战事的较宽口径。本节点终点采用上海地区口径。",
        "sourceIds": [
          "modern-shanghai"
        ],
        "locator": "11月12日、12月2日段"
      },
      {
        "label": "理解与延伸",
        "text": "战役终点取决于讨论的是上海市区、周边战场还是整个撤退阶段。明确范围后，才能比较不同史书的日期。",
        "editorial": true
      }
    ]
  },
  {
    "id": "nanjing-massacre",
    "title": "南京大屠杀",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1937,
        "month": 12,
        "day": 13
      },
      "end": {
        "year": 1938,
        "month": 1,
        "approximate": true,
        "note": "暴行核心时段约六周，不表示此月某日全部停止。"
      }
    },
    "category": "war",
    "periodIds": [
      "republic-1912-1949",
      "war-resistance"
    ],
    "entityIds": [],
    "summary": "日军占领南京后，对平民和已放下武器的人员实施大规模杀戮与其他暴行。",
    "significance": "战争史不仅是军队进退，还必须呈现占领下的平民伤害、救助行动和目击证据。",
    "note": "以南京沦陷日起记，结束用约略月份表示，暴行并非整齐地在某一天停止。屠杀事实与具体死亡总数的估计分开；本条不选用单一伤亡数。",
    "sourceIds": [
      "modern-nanjing-yale"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "时间与事件",
        "text": "耶鲁档案项目将日军于1937年12月13日占领南京后的约六周列为暴行核心时段。南京的屠杀与其他严重暴行有多位留城者的同期记录。",
        "sourceIds": [
          "modern-nanjing-yale"
        ],
        "locator": "Introduction首段"
      },
      {
        "label": "证据与局限",
        "text": "该项目汇集留在南京的西方传教士、商人等留下的文书与照片，同时明确说明这些材料不能穷尽所有经历，需要与其他档案研究互证。",
        "sourceIds": [
          "modern-nanjing-yale"
        ],
        "locator": "Introduction前两段及目击者名单"
      },
      {
        "label": "理解与延伸",
        "text": "对具体总数保持审慎，不等于对已由多类证据确认的屠杀事实保持含糊；史料互证应同时关心受害者经历与证据的形成方式。",
        "editorial": true
      }
    ]
  },
  {
    "id": "battle-taierzhuang",
    "title": "台儿庄战役",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1938,
        "month": 3
      },
      "end": {
        "year": 1938,
        "month": 4
      }
    },
    "category": "battle",
    "periodIds": [
      "republic-1912-1949",
      "war-resistance"
    ],
    "entityIds": [],
    "summary": "李宗仁指挥的第五战区部队在台儿庄击退日军进攻。",
    "significance": "这是全面抗战初期的重要战术胜利，但不能据此推断徐州会战整体或此后战争已获胜。",
    "note": "起止使用月份精度；4月7日是胜利节点。台儿庄作战属于徐州会战，后续禹王山作战与徐州撤退不可删去。",
    "sourceIds": [
      "modern-taierzhuang"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "战役经过",
        "text": "台儿庄作战属于徐州会战，1938年3月展开，李宗仁指挥第五战区部队作战，4月7日取得胜利。",
        "sourceIds": [
          "modern-taierzhuang"
        ],
        "locator": "台儿庄段"
      },
      {
        "label": "放回更大战区",
        "text": "资料同时记载随后禹王山等地作战和中国军队最终撤离徐州；台儿庄胜利不能被扩大成整个徐州会战的胜利。",
        "sourceIds": [
          "modern-taierzhuang"
        ],
        "locator": "禹王山与徐州撤退段"
      },
      {
        "label": "理解与延伸",
        "text": "战术胜利可以提升抵抗信心，却未必立即扭转战区态势；把局部战果与后续撤退并置，更接近战争的真实节奏。",
        "editorial": true
      }
    ]
  },
  {
    "id": "japan-surrender-china",
    "title": "日本投降与中国战区受降",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1945,
        "month": 9,
        "day": 2
      },
      "end": {
        "year": 1945,
        "month": 9,
        "day": 9
      }
    },
    "category": "diplomacy",
    "periodIds": [
      "republic-1912-1949",
      "war-resistance",
      "civil-war"
    ],
    "entityIds": [],
    "summary": "日本签署对盟国投降书，随后在南京举行中国战区受降仪式。",
    "significance": "抗战结束不等于中国立即进入稳定和平；受降、接收与随后国共冲突需要分别追踪。",
    "note": "这里展示两次正式签署，不把8月15日天皇广播、9月2日盟国受降与9月9日中国战区受降混为同一事件。",
    "sourceIds": [
      "modern-japan-surrender",
      "modern-china-surrender"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "史实与依据",
        "text": "9月2日日本投降书列有中华民国代表徐永昌的签署。",
        "sourceIds": [
          "modern-japan-surrender"
        ],
        "locator": "投降书签署名单"
      },
      {
        "label": "史实与依据",
        "text": "馆藏目录保存1945年9月9日受降相关文件，包括何应钦签呈、日军降书与冈村宁次受领证。",
        "sourceIds": [
          "modern-china-surrender"
        ],
        "locator": "文物题名与说明"
      },
      {
        "label": "理解与延伸",
        "text": "广播宣布、国际投降书、中国战区受降和各地接收各有日期；历史上的“战争结束”往往由多个程序构成。",
        "editorial": true
      }
    ]
  },
  {
    "id": "liaoshen-campaign",
    "title": "辽沈战役",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1948,
        "month": 9,
        "day": 12
      },
      "end": {
        "year": 1948,
        "month": 11,
        "day": 2
      }
    },
    "category": "battle",
    "periodIds": [
      "republic-1912-1949",
      "civil-war"
    ],
    "entityIds": [],
    "summary": "解放军东北野战军在锦州、长春、沈阳等地区击败国民党军，取得东北主要地区控制。",
    "significance": "东北军事格局的改变，使国共力量对比和后续进军方向发生重大变化。",
    "note": "战役包含攻城、围困、投降与接收，不是单次交锋。本条不将军队损失总数写成阵亡人数，也不采用未经单独核对的平民死亡估计。",
    "sourceIds": [
      "modern-liaoshen"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "关键方向",
        "text": "1948年9月12日，东北野战军展开辽沈战役。锦州成为关键目标，双方围绕锦州及增援通路作战。",
        "sourceIds": [
          "modern-liaoshen"
        ],
        "locator": "首段；锦州及塔山作战段"
      },
      {
        "label": "结果与地域变化",
        "text": "战役于11月2日结束，国民党军在东北的主要军事力量失败，东北主要城市与交通要地转由解放军控制。",
        "sourceIds": [
          "modern-liaoshen"
        ],
        "locator": "首段及沈阳、战役结束段"
      },
      {
        "label": "理解与延伸",
        "text": "锦州方向与增援通路的重要性提示读者注意交通、围困和退路，而不仅是战场上的兵力数字。",
        "editorial": true
      }
    ]
  },
  {
    "id": "huaihai-campaign",
    "title": "淮海战役",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1948,
        "month": 11,
        "day": 6
      },
      "end": {
        "year": 1949,
        "month": 1,
        "day": 10
      }
    },
    "category": "battle",
    "periodIds": [
      "republic-1912-1949",
      "civil-war"
    ],
    "entityIds": [],
    "summary": "解放军华东、中原野战军在徐州及淮海地区击败国民党军主力。",
    "significance": "长江以北的军事防线大幅改变，南京政府的核心统治区域面临更直接的军事压力。",
    "note": "是一场跨省、持续数月的战役，不是徐州城的一天战斗。不使用来源标题中的兵力对比作为无需争议说明的定论。",
    "sourceIds": [
      "modern-huaihai"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "战区与双方",
        "text": "战役于1948年11月6日开始，华东、中原野战军在以徐州为中心的地区，对国民党军集团展开连续作战。",
        "sourceIds": [
          "modern-huaihai"
        ],
        "locator": "审时度势 科学运筹"
      },
      {
        "label": "战役结果",
        "text": "作战延续至1949年1月10日，国民党军在淮海地区的主要集团被击败；这一结果与北方其他战区变化共同影响长江防线。",
        "sourceIds": [
          "modern-huaihai"
        ],
        "locator": "战役结束及结果段"
      },
      {
        "label": "理解与延伸",
        "text": "多支野战军与多个国民党军集团的连续交战构成整个战役；兵力、被俘和阵亡的统计口径尤其不能混用。",
        "editorial": true
      }
    ]
  },
  {
    "id": "pingjin-campaign",
    "title": "平津战役",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1948,
        "month": 11,
        "day": 29
      },
      "end": {
        "year": 1949,
        "month": 1,
        "day": 31
      }
    },
    "category": "battle",
    "periodIds": [
      "republic-1912-1949",
      "civil-war"
    ],
    "entityIds": [],
    "summary": "解放军在华北展开作战；天津经攻城易手，北平通过谈判和平接收。",
    "significance": "同一战役包含军事攻城与政治协商，不能用一种结局概括所有城市。",
    "note": "平津战役与淮海战役时间交叠；三大战役并非依次、互不重叠地展开。北平和平接收不代表整个战役没有战斗。",
    "sourceIds": [
      "modern-pingjin",
      "modern-three-campaigns"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "史实与依据",
        "text": "战史记1948年11月29日开战，并区分天津的军事攻取与北平的和平接收。",
        "sourceIds": [
          "modern-pingjin"
        ],
        "locator": "首段及天津、北平段"
      },
      {
        "label": "史实与依据",
        "text": "官方军事史回顾将平津战役结束日列为1949年1月31日。",
        "sourceIds": [
          "modern-pingjin"
        ],
        "locator": "慑谈并举，和平解放北平：1949年1月31日接管防务、战役结束"
      },
      {
        "label": "理解与延伸",
        "text": "天津与北平的不同结局显示，战场压力与谈判可以交织；“和平接收”应精确落实到地点，而不是扩展到整场战役。",
        "editorial": true
      }
    ]
  },
  {
    "id": "treaty-shimonoseki",
    "title": "《马关条约》签订",
    "time": {
      "kind": "point",
      "start": {
        "year": 1895,
        "month": 4,
        "day": 17
      }
    },
    "category": "diplomacy",
    "periodIds": [
      "qing"
    ],
    "entityIds": [],
    "summary": "清朝与日本签订《马关条约》，接受割地、赔款及新的通商条件。",
    "significance": "把军事战败、条约签署与列强干预拆开，才能看清台湾、辽东和东北亚外交的不同后续。",
    "note": "辽东半岛在三国干预后另行归还，不能据此说原约未规定割让；台湾与澎湖则在其后进入日本殖民统治时期。",
    "sourceIds": [
      "modern-shimonoseki"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "条约内容",
        "text": "1895年4月17日，双方在下关签约，约定清朝承认朝鲜独立，并割让台湾、澎湖及辽东等地。",
        "sourceIds": [
          "modern-shimonoseki"
        ],
        "locator": "Treaty of Shimonoseki"
      },
      {
        "label": "条约之后",
        "text": "俄、德、法随后施压，日本同意归还辽东；这一后续并未取消条约的其他主要条件。",
        "sourceIds": [
          "modern-shimonoseki"
        ],
        "locator": "Triple Intervention"
      },
      {
        "label": "理解与延伸",
        "text": "辽东的返还与台湾、澎湖的后续不同，说明必须把原约条款、后续协议和实际统治变化逐层分开。",
        "editorial": true
      }
    ]
  },
  {
    "id": "prc-founding",
    "title": "中华人民共和国成立",
    "time": {
      "kind": "point",
      "start": {
        "year": 1949,
        "month": 10,
        "day": 1
      }
    },
    "category": "politics",
    "periodIds": [
      "prc",
      "prc-early"
    ],
    "entityIds": [],
    "summary": "毛泽东在北京宣布中华人民共和国中央人民政府成立。",
    "significance": "这是大陆政权更替和新国家机构建立的标志，但不能把它写成所有内战行动或中华民国的终结。",
    "note": "中华人民共和国未实际统治台湾；中华民国政府随后迁台并延续。1949年10月1日也不是所有地区完成军事接收的日期。",
    "sourceIds": [
      "modern-prc-founding-record",
      "modern-revolution-1949"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "成立及制度准备",
        "text": "1949年9月的政协会议通过《共同纲领》和有关组织法，选出中央人民政府委员会；10月1日举行政府会议和成立典礼，毛泽东宣布中央人民政府成立。",
        "sourceIds": [
          "modern-prc-founding-record"
        ],
        "locator": "1949年10月1日段"
      },
      {
        "label": "此后的两岸",
        "text": "国民党领导的中华民国政府撤至台湾，海峡两岸形成长期分治格局。",
        "sourceIds": [
          "modern-revolution-1949"
        ],
        "locator": "1949年撤台段"
      },
      {
        "label": "理解与延伸",
        "text": "可以并读政府的成立文书与海峡两岸的实际统治范围：法律主张、政权建立和领土控制不是同一层次。",
        "editorial": true
      }
    ]
  },
  {
    "id": "land-reform-law",
    "title": "《土地改革法》公布施行",
    "time": {
      "kind": "point",
      "start": {
        "year": 1950,
        "month": 6,
        "day": 30
      }
    },
    "category": "institution",
    "periodIds": [
      "prc",
      "prc-early"
    ],
    "entityIds": [],
    "summary": "新政权以法律推动农村土地重新分配，将地主土地所有制改为农民土地所有制。",
    "significance": "土地所有权与农村权力关系受到系统重构；此时的分田与后来集体化是不同阶段。",
    "note": "1950年法律不是全国土改最早起点，各地推进时间和方式不同。实施中的强制、暴力及伤亡不能仅凭法条还原，需另查地方档案与研究；本条不填入未核对的死亡总数。",
    "sourceIds": [
      "modern-land-reform"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "通过与施行",
        "text": "法律于6月28日通过，中央人民政府命令规定6月30日起公布施行。",
        "sourceIds": [
          "modern-land-reform"
        ],
        "locator": "题注及公布命令"
      },
      {
        "label": "产权变化",
        "text": "第一条规定实行农民土地所有制，第二条列明没收地主土地、农具等范围；法条并非直接宣布农村全部土地集体所有。",
        "sourceIds": [
          "modern-land-reform"
        ],
        "locator": "第一、二条"
      },
      {
        "label": "理解与延伸",
        "text": "先分清农民个人所有、合作化和集体所有，才不会把1950年土地再分配与1950年代中后期所有制改变混为一项政策。",
        "editorial": true
      }
    ]
  },
  {
    "id": "china-korean-war",
    "title": "中国参战与朝鲜战争停战",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1950,
        "month": 10
      },
      "end": {
        "year": 1953,
        "month": 7,
        "day": 27
      }
    },
    "category": "war",
    "periodIds": [
      "prc",
      "prc-early"
    ],
    "entityIds": [],
    "summary": "中国人民志愿军进入朝鲜作战，1953年朝鲜停战协定签署。",
    "significance": "新成立的中华人民共和国迅速卷入冷战中的大规模国际战争，东北亚安全格局长期受其影响。",
    "note": "朝鲜战争本身始于1950年6月，此处从中国参战阶段起算。停战协定停止大规模敌对行动，不等于和平条约；不使用单一军民伤亡估计。",
    "sourceIds": [
      "modern-korea-entry",
      "modern-korea-armistice"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "中国参战",
        "text": "1950年10月，中国部队进入朝鲜，并在当月末开始反击向北推进的联合国军。",
        "sourceIds": [
          "modern-korea-entry"
        ],
        "locator": "China enters the war"
      },
      {
        "label": "停战安排",
        "text": "1953年7月27日签署的停战协定规定军事分界线、非军事区和停止敌对行动等安排。",
        "sourceIds": [
          "modern-korea-armistice"
        ],
        "locator": "协定第一、二条及签署页"
      },
      {
        "label": "理解与延伸",
        "text": "国内战争后的国家建设并非脱离国际环境展开；参战与停战的制度安排可作为连接中国史和冷战史的接口。",
        "editorial": true
      }
    ]
  },
  {
    "id": "first-five-year-plan",
    "title": "一五计划与社会主义改造",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1953
      },
      "end": {
        "year": 1957
      }
    },
    "category": "institution",
    "periodIds": [
      "prc",
      "prc-early"
    ],
    "entityIds": [],
    "summary": "国家实施第一个五年计划，以重工业建设为重点，同时推进农业、手工业和私营工商业的改造。",
    "significance": "工业投资、资源配置和所有制改革共同塑造计划经济体制，不能只以工厂数量或单一增长指标概括。",
    "note": "计划区间为1953—1957年；1956年“基本完成改造”是当时的阶段性制度表述，不意味着一切经营形式和地区差异立即消失。",
    "sourceIds": [
      "modern-first-five-year",
      "modern-socialist-transformation"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "工业化方向",
        "text": "1953年《人民日报》文章将工业化任务放在第一个五年计划中，强调重工业以及其他部门的配合。",
        "sourceIds": [
          "modern-first-five-year"
        ],
        "locator": "导言与文章节录"
      },
      {
        "label": "所有制变化",
        "text": "国博藏信反映1956年全行业公私合营高潮；藏品说明将同年底视为农业、手工业及私营工商业社会主义改造基本完成的阶段。",
        "sourceIds": [
          "modern-socialist-transformation"
        ],
        "locator": "藏品说明"
      },
      {
        "label": "理解与延伸",
        "text": "工业化与所有制变化并行，却不是同一过程。可以分别问资源投向何处、谁控制企业与农田，以及农民和工人如何受到影响。",
        "editorial": true
      }
    ]
  },
  {
    "id": "constitution-1954",
    "title": "1954年宪法通过",
    "time": {
      "kind": "point",
      "start": {
        "year": 1954,
        "month": 9,
        "day": 20
      }
    },
    "category": "institution",
    "periodIds": [
      "prc",
      "prc-early"
    ],
    "entityIds": [],
    "summary": "第一届全国人大第一次会议通过中华人民共和国第一部宪法。",
    "significance": "建国初期的组织安排进入成文宪法框架，可与1912年《临时约法》及1982年宪法比较制度设计。",
    "note": "1954年宪法是历史文本，不是今天的现行文本；规定的权利和机构安排与实际运行要区分。",
    "sourceIds": [
      "modern-constitution-1954"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "通过节点",
        "text": "第一届全国人大第一次会议在1954年9月20日通过宪法，公告与全文保留了当日通过的信息。",
        "sourceIds": [
          "modern-constitution-1954"
        ],
        "locator": "文首公告"
      },
      {
        "label": "文本结构",
        "text": "文本分别设置总纲、国家机构、公民的基本权利和义务等内容，并在序言中说明向社会主义转变的制度方向。",
        "sourceIds": [
          "modern-constitution-1954"
        ],
        "locator": "序言与目录"
      },
      {
        "label": "理解与延伸",
        "text": "读宪法时可比较“文本规定”“机构建立”“实际保障”三层：不能用法条存在直接证明制度已如条文运行。",
        "editorial": true
      }
    ]
  },
  {
    "id": "anti-rightist-campaign",
    "title": "鸣放转向反右运动",
    "time": {
      "kind": "point",
      "start": {
        "year": 1957
      }
    },
    "category": "politics",
    "periodIds": [
      "prc",
      "prc-early"
    ],
    "entityIds": [],
    "summary": "鼓励批评的政治氛围转为反右运动，大量知识分子与干部遭到划定、处分和长期政治限制。",
    "significance": "这次转折改变了公开批评与政策反馈的条件，也为理解随后经济运动的信息环境提供背景。",
    "note": "使用年份精度概括转折；“右派”是当时政治划定而非本目录认可的身份判断。个人经历与划定总数须另据档案核对。",
    "sourceIds": [
      "modern-hundred-flowers",
      "modern-resolution-1981"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "从鼓励批评开始",
        "text": "1957年春夏，知识分子响应鸣放，提出对官僚主义、党群关系和表达空间的批评；大学史料集收录了这些意见。",
        "sourceIds": [
          "modern-hundred-flowers"
        ],
        "locator": "导言及储安平等意见"
      },
      {
        "label": "随后的政策逆转",
        "text": "1981年中共历史决议承认反右运动被严重扩大化，许多知识分子、爱国人士和党内干部遭错误划定并承受后果。",
        "sourceIds": [
          "modern-resolution-1981"
        ],
        "locator": "1957年反右段"
      },
      {
        "label": "理解与延伸",
        "text": "把当时公开意见与后来处分、平反材料对照，有助于理解政治标签怎样改变个人生活与政策信息反馈。",
        "editorial": true
      }
    ]
  },
  {
    "id": "great-leap-famine",
    "title": "大跃进、人民公社与大饥荒",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1958
      },
      "end": {
        "year": 1961
      }
    },
    "category": "politics",
    "periodIds": [
      "prc",
      "prc-early"
    ],
    "entityIds": [],
    "summary": "大跃进和人民公社化激进推进，1959—1961年发生严重饥荒与大规模非正常死亡。",
    "significance": "生产目标、征购制度、集体化和信息反馈如何相互作用，是比单一口号或单一灾因更重要的解释问题。",
    "note": "运动与饥荒分期不完全重合；部分研究扩展灾荒至1958—1962年。死亡估计受口径、基线和资料限制影响，本条不列未经比较的单一总数，也不把灾难仅归因自然天气。",
    "sourceIds": [
      "modern-resolution-1981",
      "modern-great-famine-study"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "运动与政策",
        "text": "1981年中共决议承认1958年发动大跃进和人民公社化中的高指标、浮夸等错误，并指出后来经济困难与政策错误有关。",
        "sourceIds": [
          "modern-resolution-1981"
        ],
        "locator": "1958年与1959—1961年段"
      },
      {
        "label": "研究如何解释灾难",
        "text": "孟昕、钱楠筠、Pierre Yared的研究分析1959—1961年饥荒，指出僵化的粮食征购制度可使产量冲击转化为严重粮食短缺；这是机制解释，不是所有地区完整因果。",
        "sourceIds": [
          "modern-great-famine-study"
        ],
        "locator": "摘要及Introduction"
      },
      {
        "label": "理解与延伸",
        "text": "对灾荒的解释应同时容纳政策、信息、分配和地区差异；没有统一死亡数字，并不妨碍确认大规模灾难及政策责任。",
        "editorial": true
      }
    ]
  },
  {
    "id": "cultural-revolution",
    "title": "文化大革命",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1966
      },
      "end": {
        "year": 1976
      }
    },
    "category": "politics",
    "periodIds": [
      "prc",
      "prc-early"
    ],
    "entityIds": [],
    "summary": "毛泽东发动文化大革命，政治清洗、群众派系冲突和迫害造成广泛社会创伤与制度破坏。",
    "significance": "要把发动者目标、政策文件、不同地区的实际暴力与个人经历分开阅读，不能用任何一份纲领概括十年社会史。",
    "note": "采用通常的1966—1976年分期；早期群众运动、随后政治清洗等阶段不同。伤亡和受迫害人数口径差异很大，本条不以单一估计替代研究。",
    "sourceIds": [
      "modern-cultural-revolution-16",
      "modern-resolution-1981"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "发动与纲领",
        "text": "1966年“十六条”把斗争对象指向所谓走资本主义道路的当权派，并要求改造教育、文化等领域，显示运动的政治目标。",
        "sourceIds": [
          "modern-cultural-revolution-16"
        ],
        "locator": "十六条节录"
      },
      {
        "label": "后果与后来评价",
        "text": "1981年中共历史决议把文化大革命界定为严重灾难，记述对干部群众的迫害和组织、法制遭受的破坏。这是党后来作出的正式否定评价。",
        "sourceIds": [
          "modern-resolution-1981"
        ],
        "locator": "文化大革命十年一节"
      },
      {
        "label": "理解与延伸",
        "text": "不同年份、地区和身份者经历差别很大；政治纲领、地方档案与个人证词需要互证，不能由一个人物或一句口号代替。",
        "editorial": true
      }
    ]
  },
  {
    "id": "un-china-representation",
    "title": "联合国中国代表权更替",
    "time": {
      "kind": "point",
      "start": {
        "year": 1971,
        "month": 10,
        "day": 25
      }
    },
    "category": "diplomacy",
    "periodIds": [
      "prc",
      "prc-early"
    ],
    "entityIds": [],
    "summary": "联合国大会通过第2758号决议，由中华人民共和国政府代表中国在联合国行使代表权。",
    "significance": "这一国际组织席位与外交地位的重大变化，应与各国建交、两岸实际治理和后来的法律争论分开。",
    "note": "中国是联合国创始会员国，不能写作1971年“中国首次加入联合国”。决议原文处理中国代表权，未明确写入台湾主权归属；不同政治主体对其延伸含义存在争论。",
    "sourceIds": [
      "modern-un-2758"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "决议的内容",
        "text": "联合国文献指南确认大会于1971年10月25日通过第2758号决议，承认中华人民共和国政府代表为中国在联合国的唯一合法代表。",
        "sourceIds": [
          "modern-un-2758"
        ],
        "locator": "首段及决议链接"
      },
      {
        "label": "阅读原始文本",
        "text": "原文同时决定恢复中华人民共和国在联合国的一切权利，排除蒋介石的代表；指南提供当日会议记录和表决材料，便于区分文本与后来解释。",
        "sourceIds": [
          "modern-un-2758"
        ],
        "locator": "决议与会议记录链接"
      },
      {
        "label": "理解与延伸",
        "text": "先读决议原文究竟决定了什么，再比较各方后来的解释；代表权、会员资格和领土主权是相关但不同的问题。",
        "editorial": true
      }
    ]
  },
  {
    "id": "reform-opening-plenum",
    "title": "十一届三中全会与改革转向",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1978,
        "month": 12,
        "day": 18
      },
      "end": {
        "year": 1978,
        "month": 12,
        "day": 22
      }
    },
    "category": "politics",
    "periodIds": [
      "prc",
      "reform-opening"
    ],
    "entityIds": [],
    "summary": "中共十一届三中全会决定把工作重点转向现代化建设，成为改革开放进程的重要政治节点。",
    "significance": "改革不是一份文件当日完成的整体方案，而是政治方向调整与随后农业、企业、价格和对外开放试验的积累。",
    "note": "公报提出从1979年转移工作着重点；1978年常作为改革开放分期起点，不表示此前毫无调整，也不把此后所有政策倒写为会议既定方案。",
    "sourceIds": [
      "modern-reform-1978"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "方向调整",
        "text": "全会在1978年12月18—22日召开，公报提出从1979年起把工作着重点转向现代化建设。",
        "sourceIds": [
          "modern-reform-1978"
        ],
        "locator": "会议时间与工作重点段"
      },
      {
        "label": "议题范围",
        "text": "公报还讨论农业、经济管理以及加强法制等问题；这是后来改革的政治和议题背景，而不是成熟市场经济制度已在当时确立。",
        "sourceIds": [
          "modern-reform-1978"
        ],
        "locator": "农业、经济管理和法制段"
      },
      {
        "label": "理解与延伸",
        "text": "不妨把全会看成方向转折而非一键启动：后续改革还涉及地方试验、利益调整及反复修订。",
        "editorial": true
      }
    ]
  },
  {
    "id": "constitution-1982",
    "title": "1982年宪法通过",
    "time": {
      "kind": "point",
      "start": {
        "year": 1982,
        "month": 12,
        "day": 4
      }
    },
    "category": "institution",
    "periodIds": [
      "prc",
      "reform-opening"
    ],
    "entityIds": [],
    "summary": "第五届全国人大第五次会议通过并公布新宪法，形成此后多次修正的宪法文本基础。",
    "significance": "把宪法的制定与以后修正分开，才能追踪改革时期国家机构、权利条款和经济制度表述的变化。",
    "note": "所引官方网页是2018年合并版本，仅用其文首核对1982年通过日期及沿革，不把1993、2004、2018年修正内容提前写入1982年。",
    "sourceIds": [
      "modern-constitution-1982"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "制定节点",
        "text": "现行宪法文本的文首明确记载：1982年12月4日通过，并于同日公布施行。",
        "sourceIds": [
          "modern-constitution-1982"
        ],
        "locator": "文首通过与公布说明"
      },
      {
        "label": "持续变化的文本",
        "text": "同一沿革说明列明1988、1993、1999、2004和2018年的修正；这一点提示读者区分原始文本和后来的合并文本。",
        "sourceIds": [
          "modern-constitution-1982"
        ],
        "locator": "文首历次修正说明"
      },
      {
        "label": "理解与延伸",
        "text": "版本意识尤其重要：引用今天的合并文本讲1982年历史时，需要检查每一条是否后来新增或修改。",
        "editorial": true
      }
    ]
  },
  {
    "id": "protests-crackdown-1989",
    "title": "1989年抗议与六四武力镇压",
    "time": {
      "kind": "duration",
      "start": {
        "year": 1989,
        "month": 4
      },
      "end": {
        "year": 1989,
        "month": 6,
        "day": 4
      }
    },
    "category": "politics",
    "periodIds": [
      "prc",
      "reform-opening"
    ],
    "entityIds": [],
    "summary": "学生、市民等群体的抗议扩大，北京实施戒严，军队在6月3日至4日进城并向平民开火。",
    "significance": "这是改革时期政治与社会关系的重要断裂；记录应包括抗议诉求、决策过程、街头暴力、受害者与后续限制。",
    "note": "区间标记抗议高潮及主要镇压节点，不表示抓捕、伤亡和政治后果在6月4日结束。死亡人数无法凭单一电报定论，主要伤亡地点也不应全部误写为广场内部。",
    "sourceIds": [
      "modern-tiananmen-archives"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "抗议与戒严",
        "text": "胡耀邦4月去世后，悼念转为更广泛的抗议；5月20日北京实行戒严。专题汇集同期文件，反映反腐败、政治开放等诉求。",
        "sourceIds": [
          "modern-tiananmen-archives"
        ],
        "locator": "导言与Document 7"
      },
      {
        "label": "镇压与证据边界",
        "text": "6月3日晚至4日，部队携武器进入北京市中心并造成大量平民伤亡。6月22日的总结电报指出，许多死亡发生在长安街及广场周边街道，而不只在广场内。",
        "sourceIds": [
          "modern-tiananmen-archives"
        ],
        "locator": "Documents 12—17、31"
      },
      {
        "label": "理解与延伸",
        "text": "对伤亡数字和具体地点保持证据纪律，与清楚描述军队向平民开火并不矛盾；同期外交电报也要区别目击、转述和传闻。",
        "editorial": true
      }
    ]
  },
  {
    "id": "southern-tour-market-reform",
    "title": "南方谈话与市场经济目标",
    "time": {
      "kind": "point",
      "start": {
        "year": 1992
      }
    },
    "category": "politics",
    "periodIds": [
      "prc",
      "reform-opening"
    ],
    "entityIds": [],
    "summary": "邓小平南方谈话推动改革提速，中共十四大明确建立社会主义市场经济体制的改革目标。",
    "significance": "这是对计划与市场关系的政策再定位，不意味着国有部门或政府经济管理随即退出。",
    "note": "谈话发生于1—2月，十四大在10月，1993年又有进一步制度安排；本节点用年份精度串联方向变化，不混为一天。",
    "sourceIds": [
      "modern-southern-tour",
      "modern-fourteenth-congress",
      "modern-market-reform"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "南方谈话",
        "text": "1992年1月18日至2月21日，邓小平赴南方多地考察并发表谈话，强调继续改革发展。",
        "sourceIds": [
          "modern-southern-tour"
        ],
        "locator": "行程与谈话段"
      },
      {
        "label": "制度目标",
        "text": "10月12日至18日举行的十四大，确立了建立社会主义市场经济体制的改革目标。",
        "sourceIds": [
          "modern-fourteenth-congress"
        ],
        "locator": "大会日期与改革目标"
      },
      {
        "label": "后续推进",
        "text": "1993年十四届三中全会进一步提出主要由市场形成价格的机制，显示1992年的方向仍需后续制度化。",
        "sourceIds": [
          "modern-market-reform"
        ],
        "locator": "1993年11月段"
      },
      {
        "label": "理解与延伸",
        "text": "政策讲话、党代会目标和实际价格改革有时间差；可以据此追踪政治倡议如何进入更具体的制度安排。",
        "editorial": true
      }
    ]
  },
  {
    "id": "taiwan-direct-election",
    "title": "台湾首次总统直接选举",
    "time": {
      "kind": "point",
      "start": {
        "year": 1996,
        "month": 3,
        "day": 23
      }
    },
    "category": "institution",
    "periodIds": [
      "postwar-taiwan"
    ],
    "entityIds": [],
    "summary": "台湾举行中华民国第九任总统、副总统选举，首次由选民直接投票产生这两个职位。",
    "significance": "把台湾的制度变迁作为并行线索，可以避免将1949年后的全部历史简化成单一大陆政治进程。",
    "note": "本条描述实际举行的选举及制度变化，不据此判定两岸主权争议。民主化是此前解严、修宪和社会运动等长期过程，不能归结为一次投票。",
    "sourceIds": [
      "modern-taiwan-election",
      "modern-taiwan-election-result",
      "modern-taiwan-election-date"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "选举方式变化",
        "text": "选举机关历次摘要将第九任选举定在民国85年3月23日，并注明总统、副总统首次由人民直接选举。",
        "sourceIds": [
          "modern-taiwan-election"
        ],
        "locator": "第9任条"
      },
      {
        "label": "官方结果记录",
        "text": "政治大学保存的中选会数据表列出1996年3月23日投票结果；国史馆台湾文献馆也核对这一首次直选日期。",
        "sourceIds": [
          "modern-taiwan-election-result",
          "modern-taiwan-election-date"
        ],
        "locator": "表首日期与得票表"
      },
      {
        "label": "日期的区分",
        "text": "国史馆文章区分投票日与就职典礼日期，说明直选制度下仍需分别追踪选举与交接。",
        "sourceIds": [
          "modern-taiwan-election-date"
        ],
        "locator": "末段"
      },
      {
        "label": "理解与延伸",
        "text": "将选举制度的改变与大陆改革、香港澳门交接并列展示，有助于看到同一时代不同地区并行而非同一的制度轨迹。",
        "editorial": true
      }
    ]
  },
  {
    "id": "hong-kong-handover",
    "title": "香港政权交接与特区成立",
    "time": {
      "kind": "point",
      "start": {
        "year": 1997,
        "month": 7,
        "day": 1
      }
    },
    "category": "institution",
    "periodIds": [
      "prc",
      "reform-opening"
    ],
    "entityIds": [],
    "summary": "中国恢复对香港行使主权，香港特别行政区成立，基本法同时生效。",
    "significance": "外交协议、政权交接与特区制度在这里相接；长期制度运行需要与交接当年的法律安排分开评价。",
    "note": "“一国两制”与基本法是制度安排，不是本目录对后续执行状况的预先评价；不把1997年的历史节点写成所有制度争议的终点。",
    "sourceIds": [
      "modern-hong-kong-basic-law",
      "modern-hong-kong-effective"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "外交与日期",
        "text": "基本法序言依据1984年中英联合声明，明确中国自1997年7月1日起恢复对香港行使主权。",
        "sourceIds": [
          "modern-hong-kong-basic-law"
        ],
        "locator": "序言"
      },
      {
        "label": "特区制度",
        "text": "香港律政司说明基本法于1990年4月4日公布、1997年7月1日生效，确立特别行政区制度框架。",
        "sourceIds": [
          "modern-hong-kong-effective"
        ],
        "locator": "公布、生效及制度说明"
      },
      {
        "label": "理解与延伸",
        "text": "交接前的外交承诺、交接时生效的法律与后来的政策实践应各有证据；任何一层都不能替代其余两层。",
        "editorial": true
      }
    ]
  },
  {
    "id": "macao-handover",
    "title": "澳门政权交接与特区成立",
    "time": {
      "kind": "point",
      "start": {
        "year": 1999,
        "month": 12,
        "day": 20
      }
    },
    "category": "institution",
    "periodIds": [
      "prc",
      "reform-opening"
    ],
    "entityIds": [],
    "summary": "澳门结束葡萄牙行政管理，澳门特别行政区成立。",
    "significance": "澳门与香港有相近的特区制度框架，但交接条约、社会背景与实施过程并不相同，应保留各自节点。",
    "note": "采用交接和特区成立日期，不将香港1997年安排的具体内容直接套用于澳门；此节点不预断后续制度运行。",
    "sourceIds": [
      "modern-macao-establishment",
      "modern-macao-transfer"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "设立安排",
        "text": "全国人大1993年的设立决定规定澳门特别行政区自1999年12月20日起成立，范围包括澳门半岛、氹仔和路环。",
        "sourceIds": [
          "modern-macao-establishment"
        ],
        "locator": "决定第1、2项"
      },
      {
        "label": "交接实施",
        "text": "中葡双方举行交接仪式，1999年12月20日零时中国恢复对澳门行使主权并宣布特区成立。",
        "sourceIds": [
          "modern-macao-transfer"
        ],
        "locator": "交接仪式段"
      },
      {
        "label": "理解与延伸",
        "text": "可与香港对照，但应避免把相同制度名称理解为完全相同的社会条件和历史路径。",
        "editorial": true
      }
    ]
  },
  {
    "id": "china-wto-accession",
    "title": "中国加入世界贸易组织",
    "time": {
      "kind": "point",
      "start": {
        "year": 2001,
        "month": 12,
        "day": 11
      }
    },
    "category": "diplomacy",
    "periodIds": [
      "prc",
      "reform-opening"
    ],
    "entityIds": [],
    "summary": "中华人民共和国加入世界贸易组织，承担入世议定书规定的贸易制度承诺。",
    "significance": "加入多边贸易规则体系推动了国内制度调整与全球经济联系，但具体增长、分配与产业影响仍需分别分析。",
    "note": "部长级会议批准、签署批准书和成员资格生效不是同一天；本节点以2001年12月11日正式成为成员为准。香港与台湾的成员身份和加入时间另行处理。",
    "sourceIds": [
      "modern-wto-accession",
      "modern-wto-protocol"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "加入程序",
        "text": "WTO同时代记录说明中国于2001年11月11日批准入世议定书，并将在30天后即12月11日成为成员。",
        "sourceIds": [
          "modern-wto-accession"
        ],
        "locator": "批准与生效段"
      },
      {
        "label": "条约时间",
        "text": "联合国条约登记记录列明议定书缔结于11月10日、生效于12月11日，帮助区分谈判完成与正式入会。",
        "sourceIds": [
          "modern-wto-protocol"
        ],
        "locator": "缔结与生效字段"
      },
      {
        "label": "理解与延伸",
        "text": "入世是制度性参与节点。评价其后果还需分别观察出口、就业、产业转型与地区差异，不能仅归结为一个全国增长数字。",
        "editorial": true
      }
    ]
  },
  {
    "id": "constitution-amendment-2018",
    "title": "2018年修宪与监察体制调整",
    "time": {
      "kind": "point",
      "start": {
        "year": 2018,
        "month": 3,
        "day": 11
      }
    },
    "category": "institution",
    "periodIds": [
      "prc",
      "contemporary"
    ],
    "entityIds": [],
    "summary": "全国人大通过宪法修正案，取消国家主席、副主席连续任职不得超过两届的限制，并增设监察委员会制度。",
    "significance": "国家领导职务任期规则与监察机关的宪法地位同时发生变化，应逐条理解而非只以人物叙事概括。",
    "note": "取消的是国家主席、副主席的连续任职届数限制，不是取消所有国家职务任期，也不是法条直接规定终身任职；每届任期仍与全国人大相同。",
    "sourceIds": [
      "modern-constitution-2018"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "任期规则",
        "text": "修正案第四十五条删去宪法第七十九条第三款关于国家主席、副主席连续任职不得超过两届的限制，保留每届任期与全国人大相同的规定。",
        "sourceIds": [
          "modern-constitution-2018"
        ],
        "locator": "第四十五条"
      },
      {
        "label": "监察机关",
        "text": "第五十二条在国家机构章中增设监察委员会一节，规定国家与地方各级监察机关及其组织关系。",
        "sourceIds": [
          "modern-constitution-2018"
        ],
        "locator": "第五十二条"
      },
      {
        "label": "理解与延伸",
        "text": "区分国家主席、党总书记与军委主席等职务，才不会把某一职务的法定规则错误推广为全部权力结构的统一规则。",
        "editorial": true
      }
    ]
  },
  {
    "id": "covid-wuhan-restrictions",
    "title": "新冠疫情与武汉交通管制",
    "time": {
      "kind": "point",
      "start": {
        "year": 2020,
        "month": 1,
        "day": 23
      }
    },
    "category": "politics",
    "periodIds": [
      "prc",
      "contemporary"
    ],
    "entityIds": [],
    "summary": "新冠疫情扩散期间，武汉实施严格交通管制，随后更广泛的公共卫生应对改变生产、流动与日常生活。",
    "significance": "重大公共卫生事件也属于社会史与治理史；需要同时看防疫制度、医疗压力和普通人的生活，而不是只列病例数字。",
    "note": "日期标记武汉交通管制，不是疫情最早发生日，也不支持任何病毒起源判断。早期考察报告有时点局限，不能代替最终死亡、长期影响或政策效果研究。",
    "sourceIds": [
      "modern-covid-who"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "交通管制节点",
        "text": "世卫组织与中国联合考察报告记载，武汉于2020年1月23日实施严格交通限制。",
        "sourceIds": [
          "modern-covid-who"
        ],
        "locator": "第14—15页The China response"
      },
      {
        "label": "措施范围",
        "text": "同一报告记述病例隔离、接触者医学观察以及延长春节假期和控制交通等措施，反映早期应对已跨越医疗系统进入社会运行。",
        "sourceIds": [
          "modern-covid-who"
        ],
        "locator": "第14—15页The China response"
      },
      {
        "label": "理解与延伸",
        "text": "历史节点可以记录当时采取的措施，但措施目的、执行差异和最终效果属于另外的研究问题，不宜混写为已证明的同一结论。",
        "editorial": true
      }
    ]
  },
  {
    "id": "civil-code-effective",
    "title": "《民法典》施行",
    "time": {
      "kind": "point",
      "start": {
        "year": 2021,
        "month": 1,
        "day": 1
      }
    },
    "category": "institution",
    "periodIds": [
      "prc",
      "contemporary"
    ],
    "entityIds": [],
    "summary": "中华人民共和国民法典生效，将多部民事单行法整合为统一法典。",
    "significance": "把财产、人格、家庭与侵权规则放入通史，可以让制度史与普通人的日常权利联系起来。",
    "note": "通过日为2020年5月28日，生效日为2021年1月1日；法律文本的确立与具体权利在实践中的实现不能等同。",
    "sourceIds": [
      "modern-civil-code"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "通过与生效",
        "text": "民法典于2020年5月28日通过，末条规定自2021年1月1日起施行。",
        "sourceIds": [
          "modern-civil-code"
        ],
        "locator": "题注及第1260条"
      },
      {
        "label": "整合内容",
        "text": "法典分总则、物权、合同、人格权、婚姻家庭、继承和侵权责任七编；第1260条同时列出被废止的民事单行法律。",
        "sourceIds": [
          "modern-civil-code"
        ],
        "locator": "目录与第1260条"
      },
      {
        "label": "理解与延伸",
        "text": "从法律条文到日常经验，可以具体追问人格、合同与家庭关系如何被规范；法典化的存在本身并不能回答执行效果。",
        "editorial": true
      }
    ]
  },
  {
    "id": "covid-policy-transition",
    "title": "新冠防疫政策转向",
    "time": {
      "kind": "duration",
      "start": {
        "year": 2022,
        "month": 12,
        "day": 7
      },
      "end": {
        "year": 2023,
        "month": 1,
        "day": 8
      }
    },
    "category": "institution",
    "periodIds": [
      "prc",
      "contemporary"
    ],
    "entityIds": [],
    "summary": "“新十条”调整检测和隔离措施，随后新冠病毒感染管理转为“乙类乙管”。",
    "significance": "从严格限制向常态化医疗管理转变，是制度和社会运行的结构性变化；政策变化本身与健康后果应分别记录。",
    "note": "区间连接主要政策发布与施行节点，不表示各地同时、同速实施，也不等于病毒消失或疫情全部结束；死亡影响须另查可靠统计与估计。",
    "sourceIds": [
      "modern-covid-ten",
      "modern-covid-policy-republication"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "十二月的调整",
        "text": "2022年12月7日公布的调整缩小核酸查验和风险区范围，允许符合条件者居家隔离等。",
        "sourceIds": [
          "modern-covid-ten"
        ],
        "locator": "核酸检测、隔离方式与风险区域答问"
      },
      {
        "label": "一月的施行",
        "text": "12月26日公布的方案规定2023年1月8日起实施“乙类乙管”，取消感染者隔离、密切接触者判定等措施，并调整入境管理。",
        "sourceIds": [
          "modern-covid-policy-republication"
        ],
        "locator": "总体方案第二部分及入境管理"
      },
      {
        "label": "理解与延伸",
        "text": "政策转向的速度、医疗承接能力与居民经历需要分别核对；“乙类乙管”是管理分类变化，不是宣布疾病风险归零。",
        "editorial": true
      }
    ]
  },
  {
    "id": "gradual-retirement-reform",
    "title": "渐进式延迟法定退休年龄启动",
    "time": {
      "kind": "point",
      "start": {
        "year": 2025,
        "month": 1,
        "day": 1
      }
    },
    "category": "institution",
    "periodIds": [
      "prc",
      "contemporary"
    ],
    "entityIds": [],
    "summary": "延迟法定退休年龄改革开始实施，以渐进方式调整男女职工退休年龄。",
    "significance": "这类长期制度变化连接人口老龄化、劳动市场和养老安排，比零散年度新闻更适合作为当代社会经济骨架。",
    "note": "2025年是启动，不是所有人当年立即达到新年龄。决定规定十五年渐进调整并分类实施；具体个人规则需要按出生年月及配套办法判断。",
    "sourceIds": [
      "modern-retirement-reform"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "启动方式",
        "text": "决定规定自2025年1月1日起施行，按小步调整、弹性实施、分类推进等原则推进。",
        "sourceIds": [
          "modern-retirement-reform"
        ],
        "locator": "第二、五项"
      },
      {
        "label": "长期调整范围",
        "text": "决定规划用十五年将男职工法定退休年龄从60岁逐步调至63岁，女职工原50岁和55岁分别调至55岁和58岁。",
        "sourceIds": [
          "modern-retirement-reform"
        ],
        "locator": "第一项"
      },
      {
        "label": "理解与延伸",
        "text": "这是开始一段长期过渡的日期；阅读年龄数字时应把最终目标与某一出生群体实际适用的年龄分开。",
        "editorial": true
      }
    ]
  },
  {
    "id": "fifteenth-five-year-plan",
    "title": "“十五五”规划纲要获批准",
    "time": {
      "kind": "point",
      "start": {
        "year": 2026,
        "month": 3,
        "day": 12
      }
    },
    "category": "institution",
    "periodIds": [
      "prc",
      "contemporary"
    ],
    "entityIds": [],
    "summary": "十四届全国人大四次会议批准“十五五”规划纲要，确定2026—2030年国家发展的规划框架。",
    "significance": "与1953年首个五年计划相对照，可观察国家规划工具的延续与目标变化；当前节点只记录决策，不预写成效。",
    "note": "本条是已发生的批准事件，不把2026—2030年的目标当作已经完成的事实，也不预测政策未来结果。目录截至2026年10月24日。",
    "sourceIds": [
      "modern-fifteenth-plan"
    ],
    "tags": [
      "中国通史",
      "近现代"
    ],
    "milestone": true,
    "details": [
      {
        "label": "批准事件",
        "text": "全国人大决议题注记载2026年3月12日通过；正文批准国务院提出的国民经济和社会发展第十五个五年规划纲要。",
        "sourceIds": [
          "modern-fifteenth-plan"
        ],
        "locator": "题注与第一段"
      },
      {
        "label": "目标与事实的界限",
        "text": "决议要求实施纲要，并以发展质量、改革创新和民生等列示未来工作方向；这些属于规划任务而非既有历史成果。",
        "sourceIds": [
          "modern-fifteenth-plan"
        ],
        "locator": "第二、三段"
      },
      {
        "label": "理解与延伸",
        "text": "当代史可记录已经通过的规划，却应给尚未发生的执行效果保留空白；目标、投入与结果是三种不同事实。",
        "editorial": true
      }
    ]
  }
];

export const modernRelations: EventRelation[] = [
  {
    "id": "modern-rel-first-opium-war-treaty-nanjing",
    "fromEventId": "first-opium-war",
    "toEventId": "treaty-nanjing",
    "label": "战争以1842年《南京条约》议和告一段落",
    "sourceIds": [
      "modern-first-opium-nam"
    ],
    "locator": "Treaty of Nanking段"
  },
  {
    "id": "modern-rel-first-sino-japanese-war-treaty-shimonoseki",
    "fromEventId": "first-sino-japanese-war",
    "toEventId": "treaty-shimonoseki",
    "label": "甲午战败后的议和条约",
    "sourceIds": [
      "modern-shimonoseki"
    ],
    "locator": "Treaty of Shimonoseki"
  },
  {
    "id": "modern-rel-treaty-shimonoseki-hundred-days-reform",
    "fromEventId": "treaty-shimonoseki",
    "toEventId": "hundred-days-reform",
    "label": "甲午战败及和约后的改革压力",
    "sourceIds": [
      "modern-late-qing-reform"
    ],
    "locator": "Reform",
    "note": "指改革背景，不声称变法只有这一原因。"
  },
  {
    "id": "modern-rel-second-opium-war-zongli-yamen-self-strengthening",
    "fromEventId": "second-opium-war",
    "toEventId": "zongli-yamen-self-strengthening",
    "label": "外战压力下设立外交和学习机构",
    "sourceIds": [
      "modern-tongzhi",
      "modern-western-learning"
    ],
    "locator": "总理衙门、同文馆说明；冯桂芬文章导言",
    "note": "相关的制度回应，不等于全部洋务改革只由一场战争决定。"
  },
  {
    "id": "modern-rel-hundred-days-reform-abolish-examinations",
    "fromEventId": "hundred-days-reform",
    "toEventId": "abolish-examinations",
    "label": "晚清教育改革从1898年倡议延续至新政阶段",
    "sourceIds": [
      "modern-reform-1898-palace",
      "modern-late-qing-reform"
    ],
    "locator": "文教改革；1901年后的新政段",
    "note": "呈现制度议题延续，不表示1905年只是直接执行1898年同一方案。"
  },
  {
    "id": "modern-rel-northern-expedition-shanghai-purge-1927",
    "fromEventId": "northern-expedition",
    "toEventId": "shanghai-purge-1927",
    "label": "北伐联盟内部发生清共与分裂",
    "sourceIds": [
      "modern-revolution-1949"
    ],
    "locator": "White Terror与第一次国共合作段"
  },
  {
    "id": "modern-rel-ccp-first-congress-shanghai-purge-1927",
    "fromEventId": "ccp-first-congress",
    "toEventId": "shanghai-purge-1927",
    "label": "成立后的共产党在国共合作破裂中成为清洗对象",
    "sourceIds": [
      "modern-ccp-first",
      "modern-revolution-1949"
    ],
    "locator": "一大成立；White Terror段",
    "note": "组织身份的前后关联，不是成立导致清洗的因果判断。"
  },
  {
    "id": "modern-rel-mukden-incident-full-scale-war-resistance",
    "fromEventId": "mukden-incident",
    "toEventId": "full-scale-war-resistance",
    "label": "1931年东北侵略与1937年全面战争的阶段区别",
    "sourceIds": [
      "modern-mukden-ndl",
      "modern-war-china"
    ],
    "locator": "1931年事变首段；Origins of the War in Asia",
    "note": "1937年不是日本侵华和中国抵抗的最早起点。"
  },
  {
    "id": "modern-rel-full-scale-war-resistance-battle-shanghai-1937",
    "fromEventId": "full-scale-war-resistance",
    "toEventId": "battle-shanghai-1937",
    "label": "全面战争中的上海会战",
    "sourceIds": [
      "modern-shanghai"
    ],
    "locator": "1937年战争背景与五阶段分期"
  },
  {
    "id": "modern-rel-full-scale-war-resistance-battle-taierzhuang",
    "fromEventId": "full-scale-war-resistance",
    "toEventId": "battle-taierzhuang",
    "label": "全面抗战期间徐州会战内的台儿庄作战",
    "sourceIds": [
      "modern-taierzhuang"
    ],
    "locator": "台儿庄与徐州会战段"
  },
  {
    "id": "modern-rel-full-scale-war-resistance-nanjing-massacre",
    "fromEventId": "full-scale-war-resistance",
    "toEventId": "nanjing-massacre",
    "label": "战争与占领下的南京平民灾难",
    "sourceIds": [
      "modern-nanjing-yale"
    ],
    "locator": "Introduction首段",
    "note": "关系表明战争背景，不把暴行写成不可避免的自然后果。"
  },
  {
    "id": "modern-rel-full-scale-war-resistance-japan-surrender-china",
    "fromEventId": "full-scale-war-resistance",
    "toEventId": "japan-surrender-china",
    "label": "日本投降终止全面战争阶段",
    "sourceIds": [
      "modern-japan-surrender"
    ],
    "locator": "投降书第二、三段"
  },
  {
    "id": "modern-rel-liaoshen-campaign-pingjin-campaign",
    "fromEventId": "liaoshen-campaign",
    "toEventId": "pingjin-campaign",
    "label": "辽沈之后东北野战军进入华北参加平津战役",
    "sourceIds": [
      "modern-pingjin"
    ],
    "locator": "东北野战军入关与开战段"
  },
  {
    "id": "modern-rel-huaihai-campaign-pingjin-campaign",
    "fromEventId": "huaihai-campaign",
    "toEventId": "pingjin-campaign",
    "label": "两场战役在1948年末至1949年初交叠",
    "sourceIds": [
      "modern-huaihai",
      "modern-pingjin",
      "modern-three-campaigns"
    ],
    "locator": "各战役起止日期",
    "note": "仅表明经来源确认的同时性，不推断未经证明的直接因果。"
  },
  {
    "id": "modern-rel-prc-founding-land-reform-law",
    "fromEventId": "prc-founding",
    "toEventId": "land-reform-law",
    "label": "新成立中央人民政府公布土地改革法",
    "sourceIds": [
      "modern-land-reform",
      "modern-prc-founding-record"
    ],
    "locator": "法律公布命令；1949年政府成立条"
  },
  {
    "id": "modern-rel-land-reform-law-first-five-year-plan",
    "fromEventId": "land-reform-law",
    "toEventId": "first-five-year-plan",
    "label": "农民土地所有制与其后合作化、集体化的阶段区别",
    "sourceIds": [
      "modern-land-reform",
      "modern-socialist-transformation"
    ],
    "locator": "第一条；1956年改造段",
    "note": "制度转变，不把1950年分田等同于1956年集体化。"
  },
  {
    "id": "modern-rel-first-five-year-plan-great-leap-famine",
    "fromEventId": "first-five-year-plan",
    "toEventId": "great-leap-famine",
    "label": "1950年代工业化与后来的激进经济运动分期",
    "sourceIds": [
      "modern-resolution-1981"
    ],
    "locator": "社会主义改造及1958年大跃进段",
    "note": "不表示首个五年计划本身与大跃进政策完全相同。"
  },
  {
    "id": "modern-rel-anti-rightist-campaign-great-leap-famine",
    "fromEventId": "anti-rightist-campaign",
    "toEventId": "great-leap-famine",
    "label": "政治压力与经济信息反馈的联系",
    "sourceIds": [
      "modern-great-famine-study"
    ],
    "locator": "第27—28页粮食征购与政治环境；第31页脚注54",
    "note": "学术机制分析，不把反右运动说成饥荒唯一原因。"
  },
  {
    "id": "modern-rel-cultural-revolution-reform-opening-plenum",
    "fromEventId": "cultural-revolution",
    "toEventId": "reform-opening-plenum",
    "label": "文革后的政治纠错与工作重点转移",
    "sourceIds": [
      "modern-resolution-1981"
    ],
    "locator": "历史转折及十一届三中全会段",
    "note": "关系据1981年党内总结，需保留来源性质。"
  },
  {
    "id": "modern-rel-reform-opening-plenum-southern-tour-market-reform",
    "fromEventId": "reform-opening-plenum",
    "toEventId": "southern-tour-market-reform",
    "label": "改革方向在1992年进一步市场化定位",
    "sourceIds": [
      "modern-market-reform"
    ],
    "locator": "改革开放价格改革历程；1992—1993年段"
  },
  {
    "id": "modern-rel-constitution-1982-constitution-amendment-2018",
    "fromEventId": "constitution-1982",
    "toEventId": "constitution-amendment-2018",
    "label": "2018年修正1982年宪法文本",
    "sourceIds": [
      "modern-constitution-1982",
      "modern-constitution-2018"
    ],
    "locator": "历次修正说明；2018年修正案公告"
  },
  {
    "id": "modern-rel-covid-wuhan-restrictions-covid-policy-transition",
    "fromEventId": "covid-wuhan-restrictions",
    "toEventId": "covid-policy-transition",
    "label": "早期限制措施与2022—2023年管理政策转向",
    "sourceIds": [
      "modern-covid-who",
      "modern-covid-ten",
      "modern-covid-policy-republication"
    ],
    "locator": "The China response；新十条；乙类乙管总体方案",
    "note": "只对照政策，不据此推断未经研究的因果效果。"
  }
];

export const modernEventPatches: Record<string, Partial<TimelineEvent>> = {};
