import type { HistoricalMap, Source } from '../../core/types';

const pdfUrl = 'https://discovery.ucl.ac.uk/id/eprint/10186270/1/Li_A%20spatial%20interaction%20model%20of%20Qin-Han%20Dynasty%20organisation%20on%20the%20northern%20frontier%20and%20the%20location%20of%20the%20Zhidao%20highway_VoR.pdf';

export const hanFrontierMapSource: Source = {
  id: 'map-qin-han-li-bevan',
  title: 'A spatial interaction model of Qin-Han Dynasty organisation on the northern frontier and the location of the Zhidao highway (China) · Figure 1',
  publisher: 'Zehao Li、Andrew Bevan · Journal of Archaeological Science: Reports / UCL Discovery',
  url: 'https://discovery.ucl.ac.uk/id/eprint/10186270/',
  type: '学术论文与现代历史地图', checkedAt: '2026-11-03', format: '开放获取论文',
  locator: '2024年出版版本，第1页CC BY声明；第2页Figure 1及图注、2.2节；第3页右栏年代与考古材料限制。',
  version: '只核读图1、图例、图注、相关年代/道路说明与许可。图1基于Xu与Yu（2018）；未独立复核底层考古报告，不把论文后续空间模型的推演路线当成实测。原图的城梁至麻池红实线仍含推定，须与图注一起读。',
};

export const hanFrontierMap: HistoricalMap = {
  id: 'qin-han-frontier-li-bevan', title: '秦汉北部边防：堡址、长城与直道',
  depictedTime: '秦汉区域材料，研究侧重西汉；不是前202年快照', kind: 'reconstruction',
  assetPath: '/maps/qin-han-frontier-li-bevan.png', width: 1019, height: 719,
  alt: 'Li与Bevan论文图1：白圆点标堡址，棕、绿、蓝、橙线分别标汉北线、汉南线、秦和赵长城，黄星标麻池；红实线和紫虚线表示作者区分的直道线路。右侧放大图标红庆河HQH与城梁CL；红实线北段仍含推定。',
  description: '注意：城梁至麻池虽为红实线，仍含推定。把这张区域图作为理解秦汉设施承接的补充阅读，不与建汉年份画等号。原图同时放入不同时期的墙线、堡址与直道研究线索；请先读下方证据差别，再打开原尺寸查看图例。',
  scopeNote: '这是2024年论文的区域研究图，不是汉朝疆域总图、前202年设施快照或某场战役的行军路线。红庆河至城梁只有部分路段具有考古证据；城梁至麻池虽画成红色实线，图注仍说明依赖推定和少量遗存。堡址难以逐一精确区分秦、西汉与东汉年代，不能据白点认定它们同时存在或同时使用。本站仅展示图1的背景材料，不导入论文数据层或后续模型推演路线，不据此作现代导航。',
  creator: 'Zehao Li、Andrew Bevan；图注说明基于Xu与Yu（2018）',
  createdAt: '2024-01-26在线发表',
  license: { label: 'CC BY 4.0 · © The Author(s), 2024', url: 'https://creativecommons.org/licenses/by/4.0/' },
  originalUrl: `${pdfUrl}#page=2`,
  modificationNote: '2026-11-03从出版版本第2页提取原嵌入图像并无损转存PNG，未裁切、重绘、修改颜色或图内文字；中文导读另列。论文与UCL记录标明CC BY 4.0，图1未另列许可排除；不暗示作者认可本站。',
  sourceIds: [hanFrontierMapSource.id],
  readingPoints: [
    {
      label: '多种墙线：不是一年的国界',
      text: '图例以棕线标Han Wall (North)、绿线标Han Wall (South)，蓝线标Qin Wall，橙线标Zhao Wall。白圆点为堡址（Forts），黄星为麻池（Machi）；这些是不同类型和时代的设施。左下角China、Mongolia小图是现代地理定位。',
      sourceIds: [hanFrontierMapSource.id], locator: '第2页Figure 1图例；第3页右栏年代说明。',
      scopeNote: '墙线不是统一国界；白点没有在图中逐一标出使用年份，不能还原某一年的完整驻防。',
    },
    {
      label: '红实线也要结合图注',
      text: '原图把直道分为红色实线“Determined”和紫色虚线“Not Determined”。但图注更谨慎：红庆河（HQH）至城梁（CL）仅部分路段可见考古证据，城梁以北至麻池一段依赖推定和少量遗存。',
      sourceIds: [hanFrontierMapSource.id], locator: '第2页Figure 1图例、图注及2.2节。',
      scopeNote: '不能把整条红实线称为已经逐段实测确认的道路，也不能把紫虚线当作已发现遗迹。',
    },
    {
      label: '西汉研究范围与模型边界',
      text: '作者以西汉为研究重点，同时说明现有考古材料难以把堡址细分到秦、西汉、东汉各期。图1用于介绍研究区域；论文随后另用空间交互模型探索可能的交通联系。',
      sourceIds: [hanFrontierMapSource.id], locator: '第2页2.2节末与第3页右栏年代范围；第1页摘要对假设流量的说明。',
      scopeNote: '模型是研究假设，不是古代行军记录或新发现道路的实测证明。本页不展示或验证其模拟结果。',
    },
  ],
};
