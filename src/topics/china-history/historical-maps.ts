import type { HistoricalMap, Source } from '../../core/types';

export const historicalMapSources: Source[] = [{
  id: 'map-feishui-edb', title: '《淝水之战：胡人骑兵大败》教学材料',
  publisher: '香港教育局 · 中国历史课程资源',
  url: 'https://www.edb.gov.hk/attachment/sc/curriculum-development/kla/pshe/references-and-resources/chinese-history/war3_sc.pdf',
  type: '教学材料（限定引用空间关系）', checkedAt: '2026-11-02', format: 'PDF',
  locator: '第11页：秦军沿淝水西岸布防；第12页：晋军移至东岸；第13页：后退、渡河与战局变化。已查看相关页图文，不复制其中地图。',
  version: '本图仅据这些页的相对岸位叙述；不采用文中全部兵力估计、人物生卒和路线绘制为确定事实，材料本身也不是当时地图。',
}];

export const historicalMaps: Record<string, HistoricalMap[]> = {
  feishui: [{
    id: 'feishui-spatial-383', title: '淝水战事的空间关系', depictedTime: '383年战事背景', kind: 'schematic',
    assetPath: '/maps/feishui-spatial-383.svg', width: 640, height: 730,
    alt: '两窗示意：上窗为史书记述的寿阳城上向北望八公山；下窗为前秦在淝水西岸、东晋在东岸。两窗不作坐标对位，河道与山城符号均不按比例。',
    description: '《晋书》记述苻坚从城上向北望八公山；教育局教学材料将对峙阶段表述为秦军在淝水西岸、晋军在东岸。图中只转写这两组空间关系，帮助辨认山城视线与河流阻隔，不能据此复原完整战场。',
    scopeNote: '这是2026年编辑原创的史料空间示意，不是383年绘制的古地图，也不是精确的历史地图复原。A、B两窗不作坐标对位；不表达山城与河道的精确距离，不复原古河道形状、城墙、营地、渡口或行军路线。水带不表示流向、宽度或南北走向；“北望”是史书记述，不是对人物视觉与心理的独立实测。',
    creator: 'timeline 编辑', createdAt: '2026-11-02',
    license: { label: '原创示意，随本仓库保存；未复制第三方地图' },
    modificationNote: '根据所列文字材料重新组织两窗关系示意，未描摹李不白著作、教学PDF或现代地图底图。',
    sourceIds: ['idiom-jinshu-fujian', 'map-feishui-edb'],
  }],
};
