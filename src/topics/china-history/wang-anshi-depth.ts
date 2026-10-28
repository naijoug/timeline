import type { Source, TimelineEvent } from '../../core/types';
import { historyReviewedEventPatches } from './reviewed-records';
const previous = historyReviewedEventPatches['wang-anshi-reforms'];

export const wangAnshiDepthSources: Source[] = [
  {
    id: 'wang-anshi-qingmiao-study', title: '中国传统士大夫政治中的“天下情势”——以北宋熙宁初年的“青苗法事件”为例',
    publisher: '罗祎楠 · 中国社会科学网（来源：《中国社会科学》2023年第8期）',
    url: 'https://www.cssn.cn/skgz/202309/t20230927_5688074.shtml', type: '学术论文', checkedAt: '2026-10-28',
    locator: '二（一）：青苗法颁布、预先防范措施与试行后的质疑',
    version: '网页2023-09-27；定向读取政策设计与1069—1070年的论争，不将作者关于政治文明的解释视为学界定论，也不据本文概括全国实际借贷利率。',
  },
  {
    id: 'wang-anshi-regional-lecture', title: '“地域视角下的王安石变法——以两浙路为中心”学术讲座纪要',
    publisher: '李振华记录 · 河北大学宋史研究中心（张呈忠主讲）',
    url: 'https://sszx.hbu.cn/xjyw/1416.jhtml', type: '学术讲座纪要', checkedAt: '2026-10-28',
    locator: '“鄞县经验”史源辨析；陕西财政实践；王廷老与两浙路执行段',
    version: '讲座2026-03-23，网页2026-05-14；核验文字纪要，不是录像或原始史料全文。地域渊源与史源判断须归于讲者，不能升级为无争议事实。',
  },
];

export const wangAnshiSourceReviews: Record<string, Partial<Source>> = {
  'anc-wanganshi': { checkedAt: '2026-10-28', locator: '首段政治生涯：1069参知政事、次年拜相及两次罢相', version: '本轮读取故宫博物院词条正文；用于任职纪年与新法名称，不把简短人物介绍当作改革成败的完整论证。' },
};

export const wangAnshiDepthEventPatches: Record<string, Partial<TimelineEvent>> = {
  'wang-anshi-reforms': {
    significance: '新法不只是增加若干财政措施，也改变了官府与民间借贷、地方执行和政策争论的关系。理解改革，须把制度目标、执行结果与后世解释分开。',
    sourceIds: [...previous.sourceIds!, 'wang-anshi-qingmiao-study', 'wang-anshi-regional-lecture'],
    details: [
      ...previous.details!.filter(section => !section.editorial),
      { label: '具体制度：青苗借贷解决什么问题', text: '罗祎楠的研究记述，青苗新法于熙宁二年九月颁布，先在河北、京东、淮南试行，动用常平、广惠仓钱粮，在收成前向民户借出钱粮、随税归还并计息。这里的月份沿用宋代纪年，不转换成未经核对的公历日期。', sourceIds: ['wang-anshi-qingmiao-study'], locator: '二（一）首段：颁布、试行区域与借还安排' },
      { label: '研究视角：新法并非一个地方经验的简单放大', text: '河北大学的讲座纪要记录：张呈忠质疑将鄞县施政直接等同于新法起源的叙述，强调陕西边地财政经验，并以两浙路讨论推广时的地域差异。这是具体学者的史源与地域解释，不是已经排除其他解释的定论。', sourceIds: ['wang-anshi-regional-lecture'], locator: '“鄞县经验”、陕西模式及两浙路三部分' },
      { label: '编辑总结：用三个问题代替简单站队', text: '先问政策准备解决什么问题，再问谁执行、谁承担成本，最后问留下记载的人如何评价它。政策目的、地方结果与后世评价并不天然一致；“改革者必然正确”或“有弊病便毫无意义”，都不足以解释这段历史。', editorial: true },
    ],
    note: `${previous.note} 熙宁二年九月沿用传统纪年月，不是公历9月；讲座中的渊源判断保留学术解释属性。`,
    recommendedResources: [{
      id: 'wang-anshi-regional-reading', title: '地域视角下的王安石变法——以两浙路为中心（学术讲座纪要）',
      creator: '张呈忠主讲；李振华记录', series: '河北大学宋史研究中心 · 学术交流', kind: 'article',
      url: 'https://sszx.hbu.cn/xjyw/1416.jhtml', publishedAt: '2026-05-14', checkedAt: '2026-10-28',
      match: '从陕西与两浙的差异理解政策推广，补充人物传记之外的地方视角。',
      locator: '先读史源辨析，再读王廷老的地方执行个案。',
      scopeNote: '已读文字纪要；讲座举办于2026-03-23，网页发布于2026-05-14，二者不同。不是视频链接，未声称看过录像；具体研究意见须与史实依据区分。',
    }],
  },
};
