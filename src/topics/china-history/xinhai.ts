import type { Collection, Entity, EventRelation, ReadingSection, Source, TimelineEvent } from '../../core/types';
import { parseDate } from '../../core/time';

// These pages and the indicated passages were read on this date; older sources are untouched.
const checkedAt = '2026-10-09';
const museum = 'https://1911museum.cn/list_30.html';
const src = (id:string, title:string, publisher:string, url:string, format:string, locator:string, version:string):Source => ({ id,title,publisher,url,format,type:format,locator,version,checkedAt });
const frus = (id:string, number:number, date:string, locator:string, format='同时代外交文书电子转录'):Source => src(id,`FRUS 1912 · 第 ${number} 号文书（${date}）`,'美国国务院历史办公室',`https://history.state.gov/historicaldocuments/frus1912/d${number}`,format,locator,'FRUS 1912 在线版；未核对纸本原件');
export const xinhaiSources:Source[] = [
  src('xinhai-chronology','辛亥革命年表','辛亥革命博物院',museum,'博物馆编纂年表','1911 年 5 月 9 日至 1912 年 4 月 5 日各日期条目','在线年表；不是同时代原件'),
  src('xinhai-wuchang-chronology','武昌起义大事记','辛亥革命博物院','https://1911museum.cn/list_31.html','研究著作年表节录','1911 年 10 月 16、18 日，11 月 3、27 日；1912 年 4 月 1 日条','页面注明选自贺觉非、冯天瑜《辛亥武昌首义史》（湖北人民出版社，1985）；未核验书本原件'),
  src('xinhai-cabinet-letter','嘱陈其美促伍廷芳等到宁视事电','国立国父纪念馆 · 中山学术资料库','https://sunology.yatsen.gov.tw/detail/74f4fd127b7dd1fac4fb3d2dfa0808aa/','史料函电文本转录','西元日期 1912/01/03；全文与注一；《国父全集》第四册第 174 页','据 1912-01-06《天铎报》；未核验报纸原件'),
  src('xinhai-railway-policy','粤汉铁路湘鄂线修筑略记','岳阳市档案局','https://daj.yueyang.gov.cn/6658/6667/content_370337.html','档案机构历史回顾','第二节「民众奋起抗争，拒绝借款」段','2014-08-12 网页；本轮仅采用 1911 年政策与抗议段'),
  src('xinhai-exhibition','共和之基——辛亥革命历史陈列','辛亥革命博物院','https://www.1911museum.cn/view_59.html','博物馆陈列说明','第三展厅「武昌首义」、第四展厅「创建共和」','2023-03-29 陈列说明'),
  frus('xinhai-frus-protest',23,'1911-09-03','正文首段：集会、停课、闭市、拒税及镇压命令','外交电报摘录与转述（Extracts—Paraphrases）'),
  frus('xinhai-frus-wuchang',28,'1911-10-11','正文首段：起义军占领武昌、领事的回应'),
  src('xinhai-frus-overview','FRUS 1912 · 中国革命与临时共和政府','美国国务院历史办公室','https://history.state.gov/historicaldocuments/frus1912/ch11','外交文献集编者说明','章首 Note：选举、就任、退位及临时约法','在线版章首说明；不是单份同时代电报'),
  frus('xinhai-frus-abdication',67,'1912-02-13','第 2–4 段；脚注 1：附件未刊出'),
  frus('xinhai-frus-yuan-election',71,'1912-02-16','正文：yesterday 当选、南京与邀请南下','同时代外交电报电子转录'),
  frus('xinhai-frus-yuan-inauguration',85,'1912-03-09','正文：授权在北京于 March 10 就任','外交电报摘录电子转录'),
  src('xinhai-sun-declaration','中华民国临时大总统对外宣言书（英译中）','孙中山故居纪念馆','https://sunyat-sen.org/portal/article/index.html?cid=19&id=24415','史料中文译文转录','题名、撰写时间、原载；第（一）至（四）项；文末底本说明','黄彦编《孙文选集》中册（2006）；据 1912-01-06《天铎报》陈布雷译文；页面注明英文原文未发现'),
  src('xinhai-constitution-transcript','中华民国临时约法及公布令','维基文库 · 转录《临时政府公报》','https://zh.wikisource.org/w/index.php?title=中華民國臨時約法&oldid=2422419','史料文本转录（含后加标点）','公布令；第 2、5、16、22、43–45、51、54、56 条','固定转录版本 2422419；页面标示《临时政府公报》第 35 号第 1–9 页；未核验公报原件'),
  src('xinhai-constitution-dates','1912年3月11日《中华民国临时约法》颁布','北京政法网 · 转引人民网','https://www.bj148.org/wh/lssdjt/202103/t20210311_1601353.html','机构历史回顾','首段 3 月 8 日议决、末段 3 月 11 日公布','2021-03-11 网页；仅采用日期，不照录其内阁制度概括'),
  src('xinhai-constitution-museum','实物：《中华民国临时约法》','孙中山故居纪念馆','https://www.sunyat-sen.org/portal/article/index.html?cid=215&id=26806','博物馆展品说明','说明段：参议院通过、孙中山颁布、主权与平等','在线展品说明；未据图片核验实物全文'),
];
const s = (label:string,text:string,sourceId:string,locator:string):ReadingSection => ({label,text,sourceIds:[sourceId],locator});
const e = (id:string,title:string,date:string,category:string,periodIds:string[],entityIds:string[],summary:string,significance:string,details:ReadingSection[],end?:string,note?:string):TimelineEvent => ({
  id,title,time:{kind:end?'duration':'point',start:parseDate(date),...(end?{end:parseDate(end)}:{})},category,periodIds,entityIds,summary,significance,details,
  sourceIds:[...new Set(details.flatMap(d=>d.sourceIds!))],tags:['辛亥革命','1911—1912'],milestone:true,
  note:note || '日期采用资料所列公历；机构回顾与史料转录分别标示，未声称核验馆藏原件。',
});
const q = ['qing','late-qing-republic'];
const r = ['early-republic','late-qing-republic'];
export const xinhaiEvents:TimelineEvent[] = [
  e('railway-nationalization','清廷颁布铁路国有政策','1911-05-09','institution',q,['qing'],'清廷改变铁路经营政策。','从政策节点进入保路运动的阅读线索。',[
    s('政策与背景','5 月 9 日清廷发布干路国有上谕；回顾文章记载湘、鄂、粤、川反对收归国有的抗议。铁路借款与经营权争议构成保路风潮的背景。','xinhai-railway-policy','第二节「民众奋起抗争，拒绝借款」段'),
    s('当时的抗议记录','9 月 3 日美国使馆电报把四川动荡与反对外国参与铁路建设联系起来，记载了集会、闭市、停课与拒税。该电报是外交观察与转述。','xinhai-frus-protest','正文首段'),
  ]),
  e('sichuan-railway-protection','四川保路运动：组织与抗议阶段','1911-06-17','politics',q,['sichuan-railway-association'],'四川保路同志会成立，随后展开抗议。','将组织成立和运动发展放在持续区间中阅读。',[
    s('组织成立','6 月 17 日四川保路同志会成立。','xinhai-chronology','1911 年 6 月 17 日条'),
    s('抗议形式','9 月 3 日的外交电报已经记录集会、学校与商店关闭、拒税，并称总督接到武力镇压命令。','xinhai-frus-protest','正文首段'),
  ],'1911-09-07','区间截至成都血案这个阶段边界，不表示整个保路运动在这一天结束。'),
  e('chengdu-bloodshed','成都血案','1911-09-07','politics',q,['zhao-erfeng','sichuan-railway-association'],'保路请愿遭镇压。','抗议与镇压的节点需与运动整体范围分开。',[
    s('事件经过','赵尔丰拘捕保路人士，并枪杀请愿群众。','xinhai-chronology','1911 年 9 月 7 日条'),
  ],undefined,'不采用未经本轮核对的伤亡数字，也不把四川抗议直接写成武昌起义的唯一原因。'),
  e('wuchang-uprising','武昌起义','1911-10-10','politics',q,[],'起义军在武昌发动起义。','地方起义与共和政权建立是相关而不同的阶段。',[
    s('起义之夜','10 月 10 日夜起义，随后占领武昌。','xinhai-exhibition','第三展厅「武昌首义」'),
    s('同时代观察','10 月 11 日美国使馆电报确认起义军已占领武昌，并记载外国领事仅防卫租界的回应。电报日期不是起义开始日期。','xinhai-frus-wuchang','正文首段'),
  ]),
  e('hubei-military-government','湖北军政府成立','1911-10-11','politics',q,['hubei-military-government','li-yuanhong'],'起义后在武昌建立军政府。','从军事行动进入地方政权组织。',[
    s('政权组织','湖北军政府推举黎元洪为都督，发布共和文告并号召各省响应。','xinhai-exhibition','第三展厅「武昌首义」'),
  ]),
  e('yangxia-war','阳夏战争','1911-10-18','war',q,['hubei-military-government','huang-xing'],'武汉的军事对抗延续至汉阳失守。','持续战争有多个战斗节点，不能缩成起义当夜。',[
    s('起止节点','年表将 10 月 18 日记作阳夏战争开始；11 月 27 日汉阳失守。','xinhai-chronology','1911 年 10 月 18 日、11 月 27 日条'),
    s('前线与指挥','详细大事记在 10 月 16 日已记载民军进攻刘家庙，又记录 11 月 3 日黎元洪任黄兴为战时总司令。命名战争的起点不表示此前没有交战。','xinhai-wuchang-chronology','1911 年 10 月 16 日、11 月 3 日条'),
  ],'1911-11-27','起点采用《辛亥革命年表》的战争分期，结束以汉阳失守为界；不把这一范围当作武汉全部军事活动的起止。'),
  e('shanghai-uprising','上海起义与沪军都督府','1911-11-03','politics',q,['chen-qimei','shanghai-military-government'],'上海起义后建立地方军政府。','保留起义和组织成立的不同日期。',[
    s('阶段日期','11 月 3 日起义；6 日成立沪军都督府，推陈其美为都督。','xinhai-chronology','1911 年 11 月 3 日上海条'),
  ],'1911-11-06'),
  e('nanjing-captured','南京光复','1911-12-02','battle',q,[],'江浙联军攻克南京。','城市控制与临时政府选址可以分别追踪。',[
    s('攻城与选址','12 月 2 日攻克南京，3 日各省代表会议决临时政府设于南京。','xinhai-chronology','1911 年 12 月 2 日攻克南京、12 月 3 日条'),
  ]),
  e('shanghai-peace-talks','南北议和：上海会谈阶段','1911-12-18','diplomacy',['qing','early-republic','late-qing-republic'],['wu-tingfang','tang-shaoyi','yuan-shikai'],'南北双方在上海议和。','限定会谈阶段，后续协商另有方式与节点。',[
    s('代表与会谈','伍廷芳代表南方，唐绍仪代表北方；12 月 18 日上海会谈开始。','xinhai-chronology','1911 年 12 月 4–6 日、12 月 18 日条'),
    s('阶段转换','1912 年 1 月 2 日唐绍仪辞职，此后伍廷芳与袁世凯直接电商。','xinhai-chronology','1912 年 1 月 2 日条'),
  ],'1912-01-02','这里的结束点表示上海代表会谈阶段的转换，不是整个南北议和终结。'),
  e('sun-provisional-election','孙中山当选临时大总统','1911-12-29','politics',['late-qing-republic'],['sun-yat-sen'],'各省代表在南京选举总统。','选举先于宣誓就任，二者分别记录。',[
    s('选举与就任','文献集章首说明记载 12 月 29 日选举与次年 1 月 1 日就任。','xinhai-frus-overview','章首 Note 第一段'),
  ],undefined,'不采用 FRUS 章首“全体一致”这一票数概括；本条只核对选举日期和当选者。清廷仍存续，事件按过渡时期归属，不作为清廷内部政治事件。'),
  e('sun-inauguration','孙中山就任与南京建政宣告','1912-01-01','politics',r,['sun-yat-sen','nanjing-provisional-government'],'孙中山在南京宣誓就任。','建政宣告、政府组成与对外宣言具有各自时间口径。',[
    s('1 月 1 日宣告','孙中山宣誓就任，南京临时政府宣告成立。','xinhai-exhibition','第四展厅「创建共和」'),
    s('1 月 3 日组成阶段','孙中山给陈其美的电文记载各部部长人选已定，请在沪的相关人员尽快到南京办公。电文体现政府组成阶段，与元旦就任和宣告分列。','xinhai-cabinet-letter','1912/01/03 全文；《国父全集》第四册第 174 页'),
    s('后续外交说明','1 月 5 日对外宣言阐述对既有条约、债务与外国人保护的政策。纪念馆刊载的是据《天铎报》整理的中文译文，不是元旦建政宣告原件。','xinhai-sun-declaration','撰写时间、原载、第（一）至（四）项、文末说明'),
  ],undefined,'元旦是就任与建政宣告日，1 月 3 日为政府组成阶段。对外宣言页面注明英文原文未发现；本轮只阅读其中文转录。'),
  e('qing-abdication','清帝退位','1912-02-12','politics',['qing',...r],['qing','yuan-shikai'],'清帝发布退位诏书。','退位、共和政府组织与总统选举各有不同依据。',[
    s('退位日期','清帝退位日期为 2 月 12 日。','xinhai-exhibition','第四展厅「创建共和」'),
    s('外交文书中的诏书内容','2 月 13 日报告转述清廷来函，记载诏书将主权归于人民并授权袁世凯组织临时共和政府，同时描述南北两个临时政府尚需协调。','xinhai-frus-abdication','第 2–4 段'),
  ],undefined,'FRUS 第 67 号报告提到译件附件，但脚注明确附件未刊出；不能声称本页提供或本轮核验了退位诏书原件全文。'),
  e('yuan-presidential-transfer','袁世凯当选、就任与交接','1912-02-15','politics',r,['yuan-shikai','sun-yat-sen','provisional-senate'],'临时总统权力交接分阶段进行。','用持续过程显示选举、就任和南京解职之间的间隔。',[
    s('2 月 15 日选举','2 月 16 日电报报告袁世凯前一天当选，同时记载邀请其赴南京，表明就任地点仍需协调。','xinhai-frus-yuan-election','正文首段'),
    s('3 月 10 日就任','3 月 9 日电报记录南京方面授权袁在北京于次日就任；文献集章首确认 3 月 10 日就任。','xinhai-frus-yuan-inauguration','正文；就任结果另见 FRUS 章首 Note'),
    s('交接的后续','大事记记载孙中山于 4 月 1 日正式宣告辞去临时总统职务。','xinhai-wuchang-chronology','1912 年 4 月 1 日条'),
    s('前后任关系','文献集章首说明将袁的选举表述为接替辞职的孙中山。','xinhai-frus-overview','章首 Note 第二、三段'),
  ],'1912-04-01','区间内有三个阶段，不能把 2 月 15 日当选说成当日就任，也不能将 3 月 10 日就任理解为南京各项交接全部完成。'),
  e('provisional-constitution','《临时约法》议决与公布','1912-03-08','institution',r,['provisional-senate','sun-yat-sen'],'临时参议院议决约法，随后公布。','把立法议决、公布施行与制度条文分别核对。',[
    s('议决与公布','3 月 8 日通过，3 月 11 日孙中山公布。','xinhai-constitution-dates','首段与末段日期'),
    s('制度内容','转录文本规定主权归于国民、人民平等、参议院行使立法权，以及国务员副署和法官独立审判；第 56 条规定自公布日施行。','xinhai-constitution-transcript','第 2、5、16、45、51、56 条'),
    s('展品说明的互证','纪念馆展品说明确认由临时参议院通过、孙中山颁布，并说明其临时宪法性质。','xinhai-constitution-museum','说明段'),
  ],'1912-03-11','条文依据文本转录，未核验《临时政府公报》原件；公布令、通过日期和施行规定分别定位。'),
];
export const xinhaiEntities:Entity[] = [
  ['sichuan-railway-association','四川保路同志会','机构','xinhai-chronology'],
  ['zhao-erfeng','赵尔丰','人物','xinhai-chronology'],
  ['hubei-military-government','湖北军政府','机构','xinhai-exhibition'],
  ['li-yuanhong','黎元洪','人物','xinhai-exhibition'],
  ['huang-xing','黄兴','人物','xinhai-chronology'],
  ['chen-qimei','陈其美','人物','xinhai-chronology'],
  ['shanghai-military-government','沪军都督府','机构','xinhai-chronology'],
  ['wu-tingfang','伍廷芳','人物','xinhai-chronology'],
  ['tang-shaoyi','唐绍仪','人物','xinhai-chronology'],
  ['yuan-shikai','袁世凯','人物','xinhai-frus-yuan-election'],
  ['sun-yat-sen','孙中山','人物','xinhai-exhibition'],
  ['nanjing-provisional-government','南京临时政府','机构','xinhai-exhibition'],
  ['provisional-senate','临时参议院','机构','xinhai-constitution-museum'],
].map(([id,name,type,sourceId])=>({id,name,type,sourceIds:[sourceId]}));
const rel = (id:string,fromEventId:string,label:string,target:{entityId:string}|{toEventId:string},sourceId:string,locator:string,note?:string):EventRelation => ({id,fromEventId,label,...target,sourceIds:[sourceId],locator,note});
export const xinhaiRelations:EventRelation[] = [
  rel('wuchang-establishes-hubei','wuchang-uprising','起义后成立',{toEventId:'hubei-military-government'},'xinhai-exhibition','第三展厅「武昌首义」：10 日起义、11 日建政'),
  rel('hubei-appoints-li','hubei-military-government','推举为都督',{entityId:'li-yuanhong'},'xinhai-exhibition','第三展厅「武昌首义」'),
  rel('yangxia-appoints-huang','yangxia-war','期间任命为战时总司令',{entityId:'huang-xing'},'xinhai-wuchang-chronology','1911 年 11 月 3 日拜将条','由黎元洪任命；关系限定于本次战争。'),
  rel('shanghai-appoints-chen','shanghai-uprising','建府并推举为都督',{entityId:'chen-qimei'},'xinhai-chronology','1911 年 11 月 3 日上海条（含 6 日建府）'),
  rel('talks-south-wu','shanghai-peace-talks','南方议和代表',{entityId:'wu-tingfang'},'xinhai-chronology','1911 年 12 月 4 日议和条款、1912 年 1 月 2 日电商条'),
  rel('talks-north-tang','shanghai-peace-talks','北方议和代表',{entityId:'tang-shaoyi'},'xinhai-chronology','1911 年 12 月 5 日条（含次日派代表）、1912 年 1 月 2 日辞职条'),
  rel('sun-election-inauguration','sun-provisional-election','当选者随后就任',{toEventId:'sun-inauguration'},'xinhai-frus-overview','章首 Note 第一段：12 月 29 日选举、1 月 1 日就任'),
  rel('abdication-authorizes-yuan','qing-abdication','诏书授权组织临时共和政府',{entityId:'yuan-shikai'},'xinhai-frus-abdication','第 2 段；脚注 1','依据外交报告的内容转述；附件未刊出，不据此声称核验诏书原件。'),
  rel('yuan-succeeds-sun','yuan-presidential-transfer','临时总统职务接替',{toEventId:'sun-inauguration'},'xinhai-frus-overview','章首 Note 第二、三段','箭头指向被接替者的就任记录，不表示事件发生顺序。'),
  rel('constitution-senate','provisional-constitution','由其议决',{entityId:'provisional-senate'},'xinhai-constitution-museum','说明段；公布令另见《临时约法》转录'),
];
export const xinhaiCollection:Collection = {
  id:'xinhai-1911-1912',title:'辛亥革命 1911—1912',path:'/china-history/collections/xinhai-1911-1912/',
  description:'从保路风潮、地方起义与战争，读到议和、共和建政及临时约法。',
  eventIds:xinhaiEvents.map(e=>e.id),
  note:'14 个精选节点、10 条有据关系。1912 年南京共和政权与清廷一度并存，事件明确归属，跨时期记录仅存一份。机构年表、同时代外交文书转录和中文译文按各自性质标示；日期先后本身不构成因果。',
};
