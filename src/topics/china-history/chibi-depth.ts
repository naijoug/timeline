import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-11-07';
export const chibiDepthSources: Source[] = [
  {
    id: 'chibi-zhouyu-chronicle', title: '《三国志》卷五十四·周瑜传（裴松之注）',
    publisher: '陈寿撰、裴松之注 · 维基文库电子转录', url: 'https://zh.wikisource.org/wiki/三國志/卷54',
    type: '古代史书及注释', checkedAt,
    locator: '周瑜传：建安十三年刘琮降曹、孙刘联合、黄盖火攻及南郡后续；裴注引《江表传》曹操致孙权信',
    version: '定向核读电子转录，非古籍影印校勘。分别标明陈寿正文、裴注所引《江表传》与其中转述的书信，不将史书所载人物言论当成现场逐字记录。',
  },
  {
    id: 'chibi-wudi-chronicle', title: '《三国志》卷一·武帝纪：赤壁与撤军',
    publisher: '陈寿撰、裴松之注 · 维基文库电子转录', url: 'https://zh.wikisource.org/wiki/三國志/卷01',
    type: '古代史书及注释', checkedAt,
    locator: '建安十三年南征至赤壁段；裴注孙盛对赤壁、合肥先后次序的评论',
    version: '本次核读建安十三年相关正文及注释，不据本纪条目编排自行换算现代公历月日；与周瑜传比较叙事重点，不裁定全部兵力、伤亡或疫病种类。',
  },
  {
    id: 'chibi-crespigny-three-kingdoms', title: 'The Three Kingdoms and Western Jin: A History of China in the 3rd Century AD – I',
    publisher: 'Rafe de Crespigny · East Asian History 第1期',
    url: 'https://openresearch-repository.anu.edu.au/bitstreams/4d765733-dc96-43ee-8243-248abea243bd/download',
    type: '学者署名历史研究论文', checkedAt,
    locator: '印刷页7–9：The Red Cliffs Campaign (208)，尤第9页战事与次年江陵；第10页：The Struggle for the Middle Yangzi开头',
    version: '1991年6月《East Asian History》第1期，页1–36；2003是相关电子版资料记录年份，不作期刊首发年。本次核读相关页段的PDF索引提取正文并交叉核对书目；直接下载返回403，未完成PDF截图核验。作者对曹操意图及战果夸大的解释不作定论。',
  },
];

export const chibiDepthEventPatches: Record<string, Partial<TimelineEvent>> = {
  chibi: {
    significance: '赤壁阻止曹操此次南下攻势，但南方局面的稳固仍取决于后续江陵争夺和长江控制；火攻、疫病与撤军也应按不同史料分别理解。',
    sourceIds: ['anc-chibi-yiling', 'anc-sunwu', 'chibi-zhouyu-chronicle', 'chibi-wudi-chronicle', 'chibi-crespigny-three-kingdoms'],
    note: '节点沿用建安十三年（208）的年级定位，不补未经历法与史源核定的月日；《武帝纪》裴注已保存赤壁与合肥战事先后次序的异议。只说明史书记载的江北、南岸与江陵关系，不裁定现代赤壁遗址坐标。疫病种类、兵力和伤亡总数不作定数；“借东风”“草船借箭”等小说情节不列为战史事实。',
    details: [
      {
        label: '背景：荆州变化与孙刘联合',
        text: '《周瑜传》记刘琮降曹后，曹操取得荆州水军，孙权方面出现迎降与抵抗的争论。刘备败退后与鲁肃接触，又派诸葛亮赴孙权处；孙权随后派周瑜、程普等与刘备共同迎战。联盟是在南下压力中形成的选择，不是三个已经建立的国家之间的战争。',
        sourceIds: ['chibi-zhouyu-chronicle'], locator: '建安十三年刘琮降曹至孙权派周瑜、程普等与刘备共同迎战段',
      },
      {
        label: '过程：初战、火攻与追击',
        text: '按《周瑜传》正文，曹军交战前已有疾病，初战失利后退驻江北，周瑜等在南岸。黄盖提出用火攻破坏相接的船舰，先以书信诈降，再放火船；风助火势，延烧岸上营落。曹军退向南郡，刘备与周瑜等继续追击。这里采用该传的叙事，不据此复原每条船的航线或精确战场坐标。',
        sourceIds: ['chibi-zhouyu-chronicle'], locator: '周瑜传：曹军已有疾病、初战与黄盖火攻至曹操北归段',
      },
      {
        label: '史源对读：不能只选火攻或疫病',
        text: '《武帝纪》先记曹操与刘备交战不利，再记大疫、军士死亡与撤军；《周瑜传》则展开黄盖火攻，并把疾病放在初战之前。裴注引《江表传》还转述曹操致孙权的信，把退兵解释为遇病后自行烧船。这是史书保存的当事方说法，不是现存原信，也不能据此抹去正文所记战败；本页不判定具体病种或各因素造成的伤亡比例。',
        sourceIds: ['chibi-wudi-chronicle', 'chibi-zhouyu-chronicle'], locator: '武帝纪建安十三年赤壁段；周瑜传火攻段及裴注引《江表传》书信',
      },
      {
        label: '影响：还要看江陵与长江控制',
        text: '赤壁之后，曹操留下曹仁等守江陵，周瑜、程普继续进攻南郡，说明一场胜利并未立刻解决荆州争夺。Rafe de Crespigny的研究把次年周瑜军取得江陵与南方掌握长江防线联系起来。赤壁为孙权、刘备势力继续发展留下空间，但不能把208年的战役直接写成魏、蜀、吴三个帝国已经同时成立。',
        sourceIds: ['chibi-zhouyu-chronicle', 'chibi-crespigny-three-kingdoms', 'anc-sunwu'], locator: '周瑜传曹仁守江陵及进南郡段；de Crespigny论文印刷页9末至第10页开头；《族群关系与孙吴政权的成立》第3页',
      },
      {
        label: '编辑总结：把战役与战后分开看',
        text: '可以先追踪联盟怎样形成、各方怎样交战，再比较火攻与疫病在不同记载中的位置，最后看谁在战后控制江陵和长江。这样既不把胜负归为某个人的一次妙计，也不因史料有分歧就否认能够确认的战役结果。这是本站的阅读建议，不是唯一解释。',
        editorial: true,
      },
    ],
    recommendedResources: [{
      id: 'chibi-crespigny-reading', title: 'The Red Cliffs Campaign (208)：赤壁与长江中游争夺',
      creator: 'Rafe de Crespigny', series: 'East Asian History 第1期（1991年6月）· The Three Kingdoms and Western Jin – I',
      kind: 'article', url: 'https://openresearch-repository.anu.edu.au/bitstreams/4d765733-dc96-43ee-8243-248abea243bd/download', checkedAt,
      match: '从孙刘联合、火攻与撤军读到江陵争夺，把赤壁放回长江控制和三国形成的过程。',
      locator: 'PDF印刷页7–9，重点第9页；接读第10页The Struggle for the Middle Yangzi开头。页码指纸本页码，不是PDF查看器序号。',
      scopeNote: '英文期刊论文，已核读所列页段的PDF索引提取正文，未通读全文或完成截图核验。作者关于曹操意图及战果夸大的解释需与原典对照，不作本站定论；链接为ANU保存的期刊PDF，直接下载本次返回403，访问可能受限。',
    }],
  },
};
