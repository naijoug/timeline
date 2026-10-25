import type { Source, TimelineEvent } from '../../core/types';

export const historyReviewedSources: Source[] = [
  {
    id: 'columbia-examination-social-context', title: 'The Confucian Classics & the Civil Service Examinations', publisher: '哥伦比亚大学 Asia for Educators',
    url: 'https://afe.easia.columbia.edu/cosmos/irc/classics.htm', type: '大学教学材料', checkedAt: '2026-10-24',
    locator: 'The Confucian Tradition Institutionalized through the Examination System；Who Took the Civil Service Examinations?',
    version: '只采用课程与教育机会的概述，不使用其识字率估计、考试层级简化及起源定年作为本节点证据。',
  },
  {
    id: 'backbone-tang-met-review', title: 'Tang Dynasty (618–907)：安史之后的唐朝', publisher: '大都会艺术博物馆 · 亚洲艺术部',
    url: 'https://www.metmuseum.org/essays/tang-dynasty-618-906', type: '博物馆研究', checkedAt: '2026-10-24', publishedAt: '2001-10-01',
    locator: '正文最后一段：An Lushan rebellion与其后一个半世纪',
    version: '本次只核对安史之乱后唐廷权力及王朝继续存续的概述，不把导语的评价性措辞作为事实结论',
  },
  {
    id: 'backbone-song-rivals-review', title: 'Northern Rivals：宋辽和议与多政权格局', publisher: '哥伦比亚大学 Asia for Educators',
    url: 'https://afe.easia.columbia.edu/songdynasty-module/outside-rivals.html', type: '大学教学材料', checkedAt: '2026-10-24',
    locator: 'Northern Rivals开头；Silver ingot图注中的Treaty of Shanyuan in 1005',
    version: '仅采用宋辽并存及1005年岁币安排；不沿用网页1042年数字中的明显缺位，也不采用其辽、元的其他起算口径',
  },
  {
    id: 'backbone-xuanwu-review', title: '玄武门之变：皇位继承冲突与后续即位', publisher: '深圳市盐田区档案馆',
    url: 'https://www.yantian.gov.cn/ytdayszxxw/lsjt/content/post_11736532.html', type: '机构通俗历史回顾', checkedAt: '2026-10-24', publishedAt: '2024-12-18',
    locator: '正文开头的继承冲突、政变经过及末段立太子与即位',
    version: '只核对人物、年份及事件次序，不采纳拟写对话、功劳大小或人物内心的描绘；不是原始史料',
  },
];

export const historyReviewedEventPatches: Record<string, Partial<TimelineEvent>> = {
  'an-shi': {
    summary: '755—763年，安禄山、史思明等发动的叛乱和持续战争削弱唐廷，但唐朝并未因此立即灭亡。',
    significance: '这是从盛唐进入中晚唐的重要转折。理解它既要看到中央权力受损，也要看到战后制度、社会和文化仍在持续变化。',
    sourceIds: ['an-shi', 'backbone-tang-met-review'],
    details: [
      { label: '持续战争，而非一次战役', text: '本条沿用755—763年的战争区间，将叛乱与平叛作为持续过程记录；具体战场行动不能用某一年的单点代替。', sourceIds: ['an-shi'], locator: '所收研究书目的题名：公元755—763年' },
      { label: '转折之后仍有历史', text: '大都会博物馆概述指出，安史叛乱严重削弱朝廷权力，但恢复后的唐政府仍延续约一个半世纪；文化艺术的发展也没有立即停止。', sourceIds: ['backbone-tang-met-review'], locator: '正文最后一段' },
      { label: '我的理解', text: '“转折点”不应被读成“从此只有衰落”。把安史之乱与780年两税法、晚唐文化和后续地方政治放在一起，才能同时观察破坏、应对与延续。', editorial: true },
    ],
    note: '战争区间由研究书目核对，影响概述依据博物馆研究，二者证据用途不同。不将它当作单场战役，也不把其后所有变化归于一个原因。',
  },
  chanyuan: {
    summary: '1005年宋辽达成澶渊之盟，宋向辽支付岁币；军事对峙转入和议安排。',
    significance: '此事件适合观察战争与外交如何共同塑造秩序。宋并非这一时期唯一政权，对和约的评价也不能脱离多国并存的背景。',
    sourceIds: ['backbone-song-rivals-review'],
    details: [
      { label: '多政权并存的背景', text: '哥伦比亚大学教学材料指出，宋虽经济和人口规模突出，却不具压倒性的军事优势，必须在辽、西夏、金等政权先后并存的环境中调整策略。', sourceIds: ['backbone-song-rivals-review'], locator: 'Northern Rivals开头及诸政权概述' },
      { label: '和议的具体安排', text: '该页银锭图注将1005年澶渊之盟与宋向辽定期支付银、绢相联系；军事竞争因此还要结合财政和外交安排来理解。', sourceIds: ['backbone-song-rivals-review'], locator: 'Silver ingot图注：Treaty of Shanyuan in 1005' },
      { label: '我的理解', text: '只问“胜利还是屈辱”容易遮住决策的代价。更有价值的问题是：各方用什么成本换取哪些利益，这一安排又如何影响后续选择？下方节目提供的是对此问题的观点，而不是最终裁决。', editorial: true },
    ],
    note: '本条按1005年和议记年，1004年军事对峙属于其背景；传统纪年年末与公历年初可能带来不同标注。后来的辽、金、蒙古并非在1005年同时与宋订立此约。',
  },
  xuanwu: {
    summary: '626年，李世民在玄武门政变中杀死太子李建成与齐王李元吉，随后成为太子并即位。',
    significance: '军事功绩、储位身份与政治集团的竞争在这里交汇，唐初皇位继承由宫廷暴力重新安排。',
    sourceIds: ['backbone-xuanwu-review'],
    details: [
      { label: '继承冲突', text: '李建成已经拥有太子身份，李世民则是唐初重要军事统帅。盐田区档案馆的回顾将二人的皇位竞争作为政变背景。', sourceIds: ['backbone-xuanwu-review'], locator: '正文前两段' },
      { label: '政变与即位是不同阶段', text: '政变中李建成、李元吉被杀；李世民随后被立为太子，并在同年继唐高祖而即位。不能把战斗、立储和即位压缩成同一个瞬间。', sourceIds: ['backbone-xuanwu-review'], locator: '政变经过及正文末段' },
      { label: '我的理解', text: '解释一场政变的结构条件，并不等于证明它必然发生或为暴力辩护。阅读这段历史时，可把身份规则、军事实力与事后的正当化叙事分开考察。', editorial: true },
    ],
    note: '采用年份精度，不直接沿用回顾文章的中西历换算，也不采用其中拟写的宫廷对话或对人物功劳、动机的断言。节目标题中的“不得不”是一种解释框架。',
  },
};
