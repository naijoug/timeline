import type { RecommendedResource, Source, TimelineEvent } from '../../core/types';

const oaths = 'https://zh.wikisource.org/wiki/契丹國志/卷二十';
const study = 'https://www.zzxk1979.cn/Uploads/PdfFile/2024-03-01/65e14e2f0cf60.pdf';

export const chanyuanDepthSources: Source[] = [
  {
    id: 'chanyuan-transmitted-oaths', title: '《契丹国志》卷二十：宋真宗与辽圣宗誓书',
    publisher: '叶隆礼编纂；维基文库电子转录', url: oaths, type: '古代史书所收文书', checkedAt: '2026-11-09',
    locator: '“澶渊誓书”下的“宋真宗誓书”“契丹圣宗誓书”两节；不混入后文关南誓书',
    version: '读取传世书所收双方誓书的电子文字，不是1005年的原件或影印校勘本；条款只能证明文本中的约定，不能单独证明逐年履行。',
  },
  {
    id: 'chanyuan-zhang-2024', title: '再论澶渊之盟', publisher: '张希清 ·《中州学刊》2024年第1期',
    url: study, type: '学术论文', format: 'PDF', checkedAt: '2026-11-09', publishedAt: '2024-01-15',
    locator: '刊物页125—132（合刊PDF第127—134页）；重点核对第二节交涉、第三节评价',
    version: '定向读取论文文字；日期取刊物刊头，不取PDF上传路径。作者的平等互利评价是研究意见，不代表无争议共识。',
  },
  {
    id: 'chanyuan-wang-2003', title: '对澶渊之盟的重新认识和评价',
    publisher: '王晓波 ·《四川大学学报（哲学社会科学版）》2003年第4期',
    url: 'https://journal.scu.edu.cn/info/1109/13616.htm', type: '学术论文摘要', checkedAt: '2026-11-09',
    locator: '期刊官网摘要与书目信息：2003年第4期，第111—118页',
    version: '只核对摘要与书目信息，未取得全文；不据摘要补写作者的完整论证或精确发表月日。',
  },
];

export const chanyuanSourceReviews: Record<string, Partial<Source>> = {
  'song-rivals': {
    checkedAt: '2026-11-09', locator: 'Northern Rivals 段与银锭图注中的1005年和约及初始银绢额度',
    version: '本轮仅复核澶渊之盟纪年与初始岁币；图注把银锭与岁币的联系表述为推测，不能当作确定的实物证明。未将后续增币数字纳入本节点。',
  },
};

export const chanyuanDepthEventPatches: Record<string, Partial<TimelineEvent>> = {
  chanyuan: {
    summary: '宋辽达成和约，以年度银绢交付和边境约束安排两国关系。',
    significance: '盟约不只有岁币：交割地点、边界秩序和军事设施限制共同构成宋辽处理冲突的制度框架。',
    sourceIds: ['song-rivals', 'chanyuan-transmitted-oaths', 'chanyuan-zhang-2024', 'chanyuan-wang-2003'],
    note: '保留公元1005年的年份精度，不补未经核定的公历月日。传世誓书使用景德元年、统和二十二年的传统纪年，年末与公历年初可能造成1004／1005标注差异。这里区分文本约定、实际履行与学术评价，不估算现代币值。',
    details: [
      {
        label: '背景与交涉：战场与使者往来',
        text: '张希清的研究梳理了王继忠居间传递信息、曹利用出使等交涉，显示战事与谈判并行。和议并非某一场战斗结束后才突然出现，也不能仅用单一胜败解释。',
        sourceIds: ['chanyuan-zhang-2024'], locator: '第二节：王继忠通书与曹利用出使，刊物页127—128',
      },
      {
        label: '条款：银绢、交割与边境约束',
        text: '《契丹国志》所收誓书约定宋每年向辽交付绢二十万匹、银十万两，在雄州交割。双方守边，不侵扰耕作、不得藏匿逃亡盗贼；既有城池可维修，但不得另筑城隍、开掘河道。银与绢单位不同，不能合写成“三十万两白银”。',
        sourceIds: ['chanyuan-transmitted-oaths', 'song-rivals'], locator: '双方誓书的银绢、雄州交割、沿边州军与城池条款；Columbia初始岁币说明',
      },
      {
        label: '史料边界：传世誓书不是原件',
        text: '这里使用后世编纂史书保存的誓书文本及其电子转录，不是当时签署文书的实物。相互承诺可以帮助还原和约安排，却不能独自证明此后每年全部照办；同卷后面的关南誓书也不应混入这份初始和约。',
        sourceIds: ['chanyuan-transmitted-oaths'], locator: '卷二十篇目与双方誓书；其后另列关南誓书',
      },
      {
        label: '影响与评价：不同标准会得出不同判断',
        text: '张希清强调平等互利，反对以“城下之盟”概括；王晓波的论文摘要则认为它不完全平等，同时肯定有限妥协的意义。两者是有归属的研究判断，不应合并成一个所谓学界定论。',
        sourceIds: ['chanyuan-zhang-2024', 'chanyuan-wang-2003'], locator: '张文第三节，刊物页129—130；王文官网摘要',
      },
      {
        label: '编辑总结：先读条款，再评成败',
        text: '先把支付、边境和军事限制逐项读清，再问各方承担了什么、获得了什么。评价一份和约时，签约处境、长期效果与后世立场是不同问题；不必先选“屈辱”或“胜利”的标签。',
        editorial: true,
      },
    ],
  },
};

export const chanyuanRecommendedResources: RecommendedResource[] = [
  {
    id: 'chanyuan-oaths-reading', title: '对读宋辽双方誓书', creator: '叶隆礼编纂；维基文库电子转录',
    series: '《契丹国志》卷二十', url: oaths, kind: 'article', checkedAt: '2026-11-09',
    match: '将双方关于银绢、交割、边界与城池的表述并排阅读，分清谁承诺什么。',
    locator: '澶渊誓书下的宋真宗誓书、契丹圣宗誓书；到关南誓书之前停止。',
    scopeNote: '已核对电子转录的两份誓书；不是原件图像或校勘版本。传统纪年未转换为未经核准的公历月日，也未逐年核验履行情况。',
  },
  {
    id: 'chanyuan-zhang-reading', title: '再论澶渊之盟', creator: '张希清', series: '《中州学刊》2024年第1期',
    url: study, kind: 'article', publishedAt: '2024-01-15', checkedAt: '2026-11-09',
    match: '沿交涉经过进入学术评价，再与节点列出的不同意见对读。',
    locator: '刊物页125—132，合刊PDF第127—134页；优先读第二、三节。',
    scopeNote: '定向核对论文文字而非整期刊物；观点归于作者。王晓波2003年文章本轮只读摘要，不声称已比较两篇全文。',
  },
];
