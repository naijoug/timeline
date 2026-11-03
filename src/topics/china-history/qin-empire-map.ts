import type { HistoricalMap, Source } from '../../core/types';

const articleUrl = 'https://doi.org/10.1017/jch.2022.19';
const pdfUrl = 'https://www.cambridge.org/core/services/aop-cambridge-core/content/view/5C80E8CC40548B2953F72246C49A6CF7/S2059163222000196a.pdf/making-use-of-the-land-the-political-ecology-of-chinas-first-empire.pdf';

export const qinEmpireMapSource: Source = {
  id: 'map-qin-lander', title: 'Making Use of the Land: The Political Ecology of China’s First Empire · Map 1',
  publisher: 'Brian Lander · Journal of Chinese History / Cambridge University Press',
  url: articleUrl, type: '学术论文与现代历史地图', checkedAt: '2026-11-03', format: '开放获取论文',
  locator: '2023年期刊版，第8页正文及注25、第9页 Map 1与图注；第1页 CC BY 4.0声明。',
  version: '只核读地图、图注、相关地理说明与许可。图示鼎盛期郡的示意点位及旧地/新地，不是前221年精确疆界；作者明确象郡、桂林郡位置未知。图注所列谭其骧地图集及Korolkov研究为作者制图依据，本次未独立复核这些底层资料。',
};

export const qinEmpireMap: HistoricalMap = {
  id: 'qin-commandery-lander', title: '秦帝国：郡的点位与旧地、新地',
  depictedTime: '秦帝国鼎盛期，原图未指定单一年份', kind: 'reconstruction',
  assetPath: '/maps/qin-commandery-lander.png', width: 688, height: 876,
  alt: 'Brian Lander论文中的秦帝国历史地图：地形底图上以星形标咸阳、方块标郡的示意点位、点线区分旧地与新地，并标示黄河、长江、秦长城及250公里比例尺。最西南两郡的位置未确定。',
  description: '先用下方中文读图要点辨认原图符号，再打开原尺寸查看地名与地形。原图标题为“The Qin Empire at its height”，这里保留原图，不额外描画国界或行军路线。',
  scopeNote: '这是现代学者的历史复原图，不是秦代原图，也不是前221年某一天的确定疆界。图注把新地概括为约前230年至前206年间的征服区域，不表示整片地区始终受到同等控制。作者在第8页注25明确说明象郡、桂林郡具体位置未知，图中两个最西南方块只表达区域内曾设驻军；不能当作精确遗址坐标。河流、长城与地形用于理解作者的地图，不作现代导航或古河道测绘依据。',
  creator: 'Brian Lander；底图 Lynn Carlson, GISP',
  createdAt: '2022年首次在线发表，2023年期刊版',
  license: { label: 'CC BY 4.0 · © The Author(s), 2022', url: 'https://creativecommons.org/licenses/by/4.0/' },
  originalUrl: `${pdfUrl}#page=9`,
  modificationNote: '2026-11-03从论文第9页提取原嵌入图像并无损转存PNG，未裁切地图、重绘、翻译图内文字或改动符号；中文导读由本站另写。原图依据与出版信息见来源，不暗示作者认可本站。',
  sourceIds: [qinEmpireMapSource.id],
  readingPoints: [
    {
      label: '方块与星形：郡的点位、咸阳',
      text: '原图“Commanderies”图例以方块标示郡的示意点位，星形与“Xianyang”标示咸阳。“Yellow River”“Yangzi River”分别为黄河与长江；左上角保留原图250公里比例尺。',
      sourceIds: [qinEmpireMapSource.id], locator: '第9页 Map 1图例、咸阳及河流标注。',
      scopeNote: '郡的示意点位不等于行政区的完整边界；图中没有绘出每一郡的辖区。',
    },
    {
      label: '点线与虚线：两种不同含义',
      text: '贯穿图中的粗点线区分“Old Territories”（旧地）与“New Territories”（新地）；图注将其东侧、南侧新地归入约前230年至前206年的征服范围。北方长虚线标为“Qin’s Long Wall”（秦长城），不是同一条分界。',
      sourceIds: [qinEmpireMapSource.id], locator: '第9页 Map 1点线、长城标注及图注。',
      scopeNote: '这是原作者对长期扩张的概括，不能把两种线都当成前221年的国界。',
    },
    {
      label: '南方点位：保留未定位置',
      text: '作者讨论秦在南方的控制时强调驻军与交通网络，并在注25明确承认象郡、桂林郡位置未知。两个最西南方块因此只用于表现曾在这一地区设驻军。',
      sourceIds: [qinEmpireMapSource.id], locator: '第8页南方控制范围段及注25，续至第9页页脚。',
      scopeNote: '不能据方块测量遗址坐标，也不能把点位间的全部土地解释为持续、均一的直接统治。',
    },
  ],
};
