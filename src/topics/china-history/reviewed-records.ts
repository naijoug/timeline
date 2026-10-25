import type { Source, TimelineEvent } from '../../core/types';

export const historyReviewedSources: Source[] = [
  {
    id: 'an-shi-pulleyblank', title: 'AN LU-SHAN', publisher: 'Edwin G. Pulleyblank · Encyclopaedia Iranica',
    url: 'https://www.iranicaonline.org/articles/an-lu-shan-frontier-general/', type: '学者署名研究词条', checkedAt: '2026-10-25', publishedAt: '1989-12-15',
    locator: '边军统帅与宫廷竞争段；756年称燕帝、占领长安及757年身亡段',
    version: '网页标注2018年更新；只采用军政背景与事件次序，不采用宫廷传闻、疾病推测、族群决定论或网页早期家族纪年的明显残缺。',
  },
  {
    id: 'an-shi-cambridge-provinces', title: "Court and province in mid- and late T’ang（第8章公开摘要）", publisher: 'C. A. Peterson · Cambridge University Press',
    url: 'https://www.cambridge.org/core/books/abs/cambridge-history-of-china/court-and-province-in-mid-and-late-tang/9944E1F41895AF5010CD2B7F97EB0DAB', type: '学术著作章节摘要', checkedAt: '2026-10-25', publishedAt: '2008-03-28',
    locator: 'Summary四段：755–63、地方分权、长期制度变化与非必然性',
    version: '《剑桥中国史》本章纸本出版于1979年，2008年为上线时间。本轮只读取公开摘要及书目信息，未读取付费章节全文；不据摘要补写战役或财政细节。',
  },
  {
    id: 'an-shi-yan-memorial', title: '唐顏真卿祭姪文稿　卷', publisher: '国立故宫博物院提供 · 国家文化记忆库',
    url: 'https://tcmb.culture.tw/zh-tw/detail?id=%E6%95%85%E6%9B%B800006000000&indexCode=NPM_Uncategorized', type: '馆藏文物说明', checkedAt: '2026-10-25',
    locator: '作品简介：常山失守、颜杲卿与颜季明遇难；基本资讯中的资料来源与建档单位',
    version: '读取独立公开的馆方供稿条目，不等于亲读原卷；故宫数字典藏原入口本轮返回403，未获取原卷高清图或逐字核对释文。此材料用于家庭遭遇，不推算全战争伤亡。',
  },
  {
    id: 'wang-anshi-crop-loans', title: 'Memorial on the Crop Loans Measure, by Wang Anshi', publisher: '哥伦比亚大学 Asia for Educators · Sources of Chinese Tradition',
    url: 'https://afe.easia.columbia.edu/main_pop/ps/ps_china-wang-anshi-crop-loans.htm', type: '历史奏议英译与教学材料', checkedAt: '2026-10-25',
    locator: 'Longer Selection：1069年制置三司条例司奏议、收获前贷款、分期偿还与灾年延期',
    version: '读取HTML所载《Sources of Chinese Tradition》第2版第1卷（1999）617–618页英译，非原奏本。正文表明政策主张，不证明普遍实施成效；不采用导言“1068年任首相”的错位纪年或利率脚注，PDF入口本轮未成功打开。',
  },
  {
    id: 'wang-anshi-smith-policy', title: 'State Power and Economic Activism during the New Policies, 1068–1085（第2章）', publisher: 'Paul J. Smith · University of California Press / California Digital Library',
    url: 'https://publishing.cdlib.org/ucpressebooks/public/book/ordering-the-world-approaches-to-state-and-society-in-sung-dynasty-china.html', type: '学术著作章节', checkedAt: '2026-10-25',
    locator: '《Ordering the World》（1993）第2章，89–93页：Economic Activism and Policy Formation / Displacing Private Interests',
    version: '读取公开电子本的所列页段；区分政策设计、当时反对者的指控与作者分析，不将局部记录概括为全国一致结果；不采用本章人口、田亩与利率估计。',
  },
  {
    id: 'columbia-examination-social-context', title: 'The Confucian Classics & the Civil Service Examinations', publisher: '哥伦比亚大学 Asia for Educators',
    url: 'https://afe.easia.columbia.edu/cosmos/irc/classics.htm', type: '大学教学材料', checkedAt: '2026-10-24',
    locator: 'The Confucian Tradition Institutionalized through the Examination System；Who Took the Civil Service Examinations?',
    version: '只采用课程与教育机会的概述，不使用其识字率估计、考试层级简化及起源定年作为本节点证据。',
  },
  {
    id: 'backbone-tang-met-review', title: 'Tang Dynasty (618–907)：安史之后的唐朝', publisher: '大都会艺术博物馆 · 亚洲艺术部',
    url: 'https://www.metmuseum.org/essays/tang-dynasty-618-906', type: '博物馆研究', checkedAt: '2026-10-25', publishedAt: '2001-10-01',
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
    sourceIds: ['an-shi-cambridge-provinces', 'an-shi-pulleyblank', 'an-shi-yan-memorial', 'backbone-tang-met-review'],
    details: [
      { label: '背景：边军与宫廷的权力关系', text: '玄宗后期，安禄山已是掌握边军的重要统帅。Pulleyblank将边疆军事压力、统帅权力的扩大和宫廷竞争联系起来，指出安禄山与宰相杨国忠之间的对立不断加剧。这是军政关系的危机，不能只靠一段宫廷爱情故事解释。', sourceIds: ['an-shi-pulleyblank'], locator: '742年后边军统帅地位、李林甫用人与杨国忠竞争段' },
      { label: '经过：首领身亡不等于战争结束', text: '叛乱与平叛通常按755—763年记录。安禄山在占领洛阳后于756年称燕帝，叛军同年进入长安，玄宗离京。安禄山于757年被杀，但战争并未随之结束；节点保留整个战争区间，不把攻占都城或某个首领死亡当作终点。', sourceIds: ['an-shi-cambridge-provinces', 'an-shi-pulleyblank'], locator: 'Peterson摘要首段755–63；Pulleyblank词条末两段756、757年事件' },
      { label: '从一件文稿看战争中的家庭', text: '国立故宫博物院提供的《祭侄文稿》说明记述：颜真卿的堂兄颜杲卿守常山，城破后与儿子颜季明遇难；颜真卿写下祭文悼念侄子。这个具体家庭的遭遇，让战争不只剩下统帅和都城，但不能据此推算全国死亡人数。', sourceIds: ['an-shi-yan-memorial'], locator: '作品简介首段；资料来源、建档单位' },
      { label: '影响：中央受损，唐朝仍在延续', text: 'Peterson的章节摘要将战后地方分权格局与叛乱相联系；大都会博物馆也指出唐廷权威受损，却强调恢复后的唐政府仍延续约一个半世纪，文化艺术并未立即停止。战争结束、中央重新控制地方和王朝终结，是不同的问题。', sourceIds: ['an-shi-cambridge-provinces', 'backbone-tang-met-review'], locator: 'Peterson Summary首段；大都会文章末段' },
      { label: '解释边界：转折不是唯一原因', text: 'Peterson同时提醒，中晚唐的变化有此前长期制度演变的根源，不能全部归结为这次叛乱；这些结构条件也不意味着战争必然发生。这是学者对因果关系的分析，而非一份叛乱参与者的自述。', sourceIds: ['an-shi-cambridge-provinces'], locator: 'Summary第三、四段：long-term changes与nothing inevitable' },
      { label: '我的理解', text: '可以用三个尺度连读这场战争：统帅与朝廷如何失去互信，一户家庭如何承受战乱，战后国家又如何维持运转。再去看780年两税法，就能把“盛衰转折”的标签拆成可以追问的制度和生活问题，而不预设其后只有衰落。', editorial: true },
    ],
    note: '755—763年区间现有学术章节摘要支持，不再仅凭书目题名。保持年份精度，不补造古历换算日；不以户籍减少直接计算死亡人数，也不采用宫廷传闻或族群身份作为战争的单一解释。文物简介、学术分析与完整战争叙事的证据能力不同。',
  },
  'wang-anshi-reforms': {
    summary: '1069年王安石任参知政事后推进新法，以国家信用、财政与行政调整回应治理难题；政策目标与地方执行持续引发争论。',
    significance: '变法不仅是改革者与反对者的对决，也改变了国家介入农户借贷和市场的方式。把设计、执行与成效分开，才能理解新法为何同时引出救济期待与行政权力的争议。',
    sourceIds: ['anc-wanganshi', 'wang-anshi-crop-loans', 'wang-anshi-smith-policy'],
    details: [
      { label: '背景：财政压力与农时之间', text: '哥伦比亚大学教学材料把庞大的军费和收支压力列为改革背景；所载奏议则以农户收获前需要借贷为政策切入口。国家的财政需求与农户的季节困难同时进入改革讨论，但两者并不是同一个问题。', sourceIds: ['wang-anshi-crop-loans'], locator: '导言的军费与财政段；Longer Selection的收获前借贷段' },
      { label: '1069年是政治起点，不是全部法令的同日颁布', text: '故宫词条记载王安石1069年任参知政事、1070年拜相，推进青苗、均输、市易等新法。哥伦比亚所载奏议长选也明确标出1069年制置三司条例司上奏。此节点记录改革的起点，并不把不同新法的形成和实施压缩成一个瞬间。', sourceIds: ['anc-wanganshi', 'wang-anshi-crop-loans'], locator: '故宫词条政治生涯首段；Columbia Longer Selection开头' },
      { label: '青苗法的设计：把仓储资源变成季节信用', text: '奏议主张利用官府钱粮，在收获前向有借贷需要的农户贷款，随夏秋税期分次偿还，遇灾准许延期，并通过粮食买卖调节价格。减少农户对高利贷的依赖，是奏议陈述的目标；这些规定本身并不证明人人自愿借贷或普遍获益。', sourceIds: ['wang-anshi-crop-loans'], locator: 'Longer Selection的贷款、夏秋偿还、灾年延期与粮价段' },
      { label: '争议为何落在地方执行上', text: 'Smith据文献记述，苏辙担心地方官吏掌握放贷与催收权后会产生强制和滥用。制度虽禁止强制摊派贷款，反对者仍指控保护借户的规定遭到违反。这里应区分制度条文、当时人的批评与实际发生的范围，不能把一方指控直接写成全国统计。', sourceIds: ['wang-anshi-smith-policy'], locator: '第2章91页苏辙意见、92–93页借贷保护条款与反对者指控' },
      { label: '研究视角：国家参与市场的方式', text: 'Smith比较青苗贷款与茶马政策，认为两者都扩大了官府参与经济的范围，并逐渐加强了筹集收入的目标，但具体行政方式并不相同。这一比较说明新法不能被当成单一措施；它是作者对所研究政策的解释，不是全体农户收支变化的测量。', sourceIds: ['wang-anshi-smith-policy'], locator: '第2章89页：两项政策的共同目标与行政方式差异' },
      { label: '政治进程：改革者去留与政策评估分开', text: '王安石于1074年、1076年先后两次罢相，后来退居江宁。这样的仕途节点能说明政治争议，却不能单独回答每项新法何时停止、各地如何执行或哪类家庭获益。评价政策仍需回到具体制度与地方材料。', sourceIds: ['anc-wanganshi'], locator: '词条政治生涯首段：熙宁七年、九年两次罢相' },
      { label: '我的理解', text: '阅读新法时，不妨分别问：这笔贷款解决谁的季节困难，由谁决定放贷与催收，官府增加收入是否等于农户生活改善？把王安石的政策主张、反对者的风险判断和地方证据并排阅读，比先贴“进步”或“失败”的标签更有解释力。', editorial: true },
    ],
    note: '1069年是改革起点；1070年拜相和1074、1076年罢相另行说明，不把离任等同全部新法终止。奏议英译不是效果报告；不采用教学导言中1068年任首相的错位纪年，也不拼接不同资料中的利率口径。本条不声称各地执行一致或改革已获单一成败定论。',
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
