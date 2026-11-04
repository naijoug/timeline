import type { HistoricalMap, Source } from '../../core/types';

export const juluMapSources: Source[] = [
  {
    id: 'map-julu-shiji-xiangyu', title: '《史记》卷七·项羽本纪：巨鹿救援段',
    publisher: '西汉司马迁 · 维基文库古籍电子文本',
    url: 'https://zh.wikisource.org/w/index.php?oldid=12725987&title=史記/卷007',
    type: '古代史书电子文本', checkedAt: '2026-11-04',
    locator: '“章邯已破项梁军”后的围巨鹿段；“项羽已杀卿子冠军”后的先遣、悉渡、断甬道及诸侯段。',
    version: '定向核读固定修订版的相关原文，未做影印本校勘；叙述写于战事之后，不是战场测绘。兵力、交战次数和人物动机不作为独立验证数据。',
  },
  {
    id: 'map-julu-shiji-zhanger', title: '《史记》卷八十九·张耳陈馀列传：巨鹿解围段',
    publisher: '西汉司马迁 · 维基文库古籍电子文本',
    url: 'https://zh.wikisource.org/w/index.php?oldid=8744143&title=史記/卷089',
    type: '古代史书电子文本', checkedAt: '2026-11-04',
    locator: '“王离围钜鹿”至“诸侯军乃敢击围钜鹿秦军”及王离被俘段。',
    version: '只核读围城和解围段，与卷七同属《史记》，不是两份独立现场证据；保留两篇在断粮、渡河、诸侯参战次序上的叙事差别。',
  },
];

export const juluCampaignMap: HistoricalMap = {
  id: 'julu-relief-207-bce', title: '巨鹿之战：渡河救赵与断粮',
  depictedTime: '前207年战事背景；不补造公历月日', kind: 'schematic',
  assetPath: '/maps/julu-relief-207-bce.svg', width: 640, height: 1270,
  alt: '四窗原创示意：秦军围巨鹿，章邯在城南供粮、陈余在城北；楚军先遣渡河救援；项羽悉渡后毁船破釜并断粮作战；王离被俘、巨鹿解围。阶段按项羽本纪排列，不复原渡口和精确路线，另篇记述次序不同。',
  description: '沿《项羽本纪》的叙事看围城、先遣、悉渡断粮与解围。第一窗只标史书明确的南北关系，其余箭头只表示叙事次序。两篇《史记》记述不同，不能把本图当作已确定的完整行军路线。',
  scopeNote: '这是2026年编辑原创的史料关系示意，不是秦末古地图或精确历史地图复原。四窗独立、非按比例，不复原古河道、渡口、道路、城墙、营地坐标或疆界；不将原文的“河”直接指定为某条现代河流。阶段依《项羽本纪》排列，《张耳陈馀列传》对断粮、悉渡及诸侯参战的先后记述不同。前207年是战事背景，不是“破釜沉舟”四字用语的首见年。',
  creator: 'timeline 编辑', createdAt: '2026-11-04',
  license: { label: '原创示意，随本仓库保存；未复制第三方地图' },
  modificationNote: '根据公版《史记》文字自行组织节点和线条，未描摹战场地图或复制电子站的现代翻译、注释、版式。',
  sourceIds: ['map-julu-shiji-xiangyu', 'map-julu-shiji-zhanger'],
  readingPoints: [
    {
      label: '① 围城与供粮：南北是相对巨鹿',
      text: '《项羽本纪》记王离等围困巨鹿，章邯在巨鹿以南修筑甬道供粮，陈余率军驻于巨鹿以北。图中只保留围城军、粮道和城南城北这几项关系。',
      sourceIds: ['map-julu-shiji-xiangyu'], locator: '“章邯已破项梁军”段：“筑甬道而输之粟”“陈余为将，将卒数万人而军钜鹿之北”。',
      scopeNote: '南北以巨鹿为参照，不是行军方向。无箭头虚线只表示供粮关系，不表示甬道走向、长度或营垒形状。',
    },
    {
      label: '② 先遣渡河：不指定渡口',
      text: '《项羽本纪》先记项羽派当阳君、蒲将军渡河救援，战事稍有进展后，陈余再次请求增援。图中先遣与主力分开，避免把所有渡河行动压成同一时刻。',
      sourceIds: ['map-julu-shiji-xiangyu'], locator: '“项羽已杀卿子冠军”后：“使当阳君、蒲将军将卒二万渡河，救钜鹿”“陈余复请兵”。',
      scopeNote: '原文这段没有提供精确渡口和行军路径；不把原文兵数当作独立核实的统计，不据图推定渡河方向。',
    },
    {
      label: '③ 悉渡与断粮：采用本纪叙事次序',
      text: '卷七继而叙述项羽率军全部渡河，毁船、破坏炊具并携有限口粮；接着进攻秦军、切断甬道。图中箭头用于整理该篇的先后，不表示真实道路。',
      sourceIds: ['map-julu-shiji-xiangyu'], locator: '“项羽乃悉引兵渡河”至“九战，绝其甬道”。',
      scopeNote: '不把毁船破釜单独解释为取胜原因，也不将史书的交战次数、兵力或人物心理当作已逐项验证的事实。',
    },
    {
      label: '④ 解围结果与另一篇的不同次序',
      text: '卷七记王离被俘、秦军败退，并突出诸侯观战。卷八十九则先记项羽多次断甬道、章邯军缺粮，再记悉渡与章邯退却，随后诸侯参战、王离被俘。两篇都记解围，但细部先后与协同叙述不能简单拼接。',
      sourceIds: ['map-julu-shiji-xiangyu', 'map-julu-shiji-zhanger'], locator: '卷七“虏王离”及“诸侯军救钜鹿下者”段；卷八十九“项羽兵数绝章邯甬道”至“遂虏王离”。',
      scopeNote: '这是同一史书的两篇叙事，不是两份独立现场报告。本图止于巨鹿解围，不把章邯后来投降、新安事件或秦朝灭亡并入同一天。',
    },
  ],
};
