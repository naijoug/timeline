import type { Entity, Source, TimelineEvent } from './types';

const checkedAt = '2026-11-10';
const carbon = 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/';
const mka = 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/multimodal-knowledge-agent-benchmark/';
const mkaMethod = 'https://artificialanalysis.ai/evaluations/mka';
const robotics = 'https://deepmind.google/blog/gemini-robotics-2-5-accelerates-real-world-physical-intelligence/';
const robotics2 = 'https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/';
const asimov = 'https://huggingface.co/datasets/google/asimov_agentic';
const alphaProof = 'https://deepmind.google/blog/introducing-alphaproof-code/';
const proofPaper = 'https://google-deepmind.github.io/code-verification/';
const proofCode = 'https://github.com/google-deepmind/code-verification';

export const googleNov10Sources: Source[] = [
  { id: 'gemini4-carbon-wider-access', title: 'Gemini 4 Carbon is now available', publisher: 'Google · Koray Kavukcuoglu', url: carbon, type: '官方公告', publishedAt: checkedAt, checkedAt, locator: 'Getting started with Gemini 4 Carbon；Stronger scientific and mathematical reasoning；网络防御访问段', version: '核读官方正文，日期确认到日；不补造发布小时。' },
  { id: 'google-mka-announcement', title: 'Introducing the Multimodal Knowledge Agent benchmark', publisher: 'Google DeepMind · Rohan Doshi、Ben Caine', url: mka, type: '官方公告', publishedAt: checkedAt, checkedAt, locator: 'Introducing MKA：200-task evaluation set；separate set of 10 public tasks' },
  { id: 'aa-mka-methodology', title: 'Multimodal Knowledge Agent (MKA) Benchmark', publisher: 'Artificial Analysis', url: mkaMethod, type: '官方文档', checkedAt, locator: 'Background；Methodology；Cost', version: '方法与成本口径核查，不记录动态榜单排名。' },
  { id: 'gemini-robotics25-announcement', title: 'Gemini Robotics 2.5 accelerates real-world general dexterity', publisher: 'Google DeepMind · Carolina Parada', url: robotics, type: '官方公告', publishedAt: checkedAt, checkedAt, locator: '开头 VLA 与 partner rollout；Testing real-world reliability；Advancing steerability and agentic safety' },
  { id: 'gemini-robotics2-vla-announcement', title: 'Gemini Robotics 2 brings whole body intelligence to robots', publisher: 'Google DeepMind', url: robotics2, type: '官方公告', publishedAt: '2026-07-30', checkedAt, locator: 'Gemini Robotics 2 动作模型与全身控制；与 ER 高层推理的分工' },
  { id: 'asimov-agentic-dataset', title: 'ASIMOV-Jailbreak · google/asimov_agentic', publisher: 'Google · Hugging Face', url: asimov, type: '官方文档', checkedAt, locator: 'Dataset card；机器人 agentic jailbreak 评测数据', version: '关联评测材料，不是 Gemini Robotics 2.5 模型权重。' },
  { id: 'alphaproof-code-announcement', title: 'Introducing AlphaProof Code: a breakthrough in verifying complex software at depth', publisher: 'Google DeepMind · Pushmeet Kohli、Swarat Chaudhuri', url: alphaProof, type: '官方公告', publishedAt: checkedAt, checkedAt, locator: 'How we verified Signal；The future of security；formal verification artifacts' },
  { id: 'alphaproof-code-paper', title: 'AlphaProof Code: Verifying Signal’s Security at the Machine-Code Level', publisher: 'Google DeepMind、Google · Swarat Chaudhuri 等', url: proofPaper, type: '原始论文', publishedAt: checkedAt, checkedAt, locator: '§2 AlphaProof Code；§4 Setup for Verification；§5.3 Trusted Computing Base；§9 Discussion', version: '核读研究方法与验证范围；未重新构建或独立复跑 Lean 证明。' },
  { id: 'alphaproof-code-artifacts', title: 'google-deepmind/code-verification', publisher: 'Google DeepMind · GitHub', url: proofCode, type: '官方文档', checkedAt, locator: 'README；形式规格与 Lean 证明材料入口', version: '公开研究材料入口；不据此声称完整 agent 服务或通用模型 API 开放。' },
];

export const googleNov10Entities: Entity[] = [
  { id: 'gemini-robotics', name: 'Gemini Robotics', type: 'family', company: 'Google DeepMind', description: '视觉—语言—动作（VLA）模型家族，将感知与指令转为机器人动作；与 Gemini Robotics ER 高层具身推理家族分开记录。', tags: ['机器人', 'VLA', '动作模型'], sourceIds: ['gemini-robotics2-vla-announcement', 'gemini-robotics25-announcement'] },
];

export const googleNov10Events: TimelineEvent[] = [
  {
    id: 'gemini-4-carbon-wider-access', date: checkedAt, dateLabel: '2026年11月10日（扩大接入公告日，未取得发布小时）',
    title: 'Gemini 4 Carbon 扩大接入：付费 API 与 Ultra 分批上线', company: 'Google DeepMind', kind: '模型接入范围扩大', tracks: ['models'], entityIds: ['gemini'], milestone: false,
    summary: 'Google 将 Carbon 从10月28日公布的受限投放阶段扩展至开发者与企业，并向 AI Ultra 订阅用户逐步上线；科研免费计划和网络防御专版仍需申请。',
    significance: '编辑解读：这一节点改变的是谁能通过哪些渠道使用模型，应与首次公布及厂商性能报告分别追踪。',
    limitation: '不同入口受付费层级、订阅及逐步开放条件限制，不等于所有用户免费可用；未宣布公开模型权重或开放权重许可。本站未调用 API、验证账号资格或复测性能。',
    sourceIds: ['gemini4-carbon-wider-access', 'gemini4-carbon-announcement', 'google-mka-announcement', 'aa-mka-methodology'], tags: ['Gemini', 'API', '渠道开放', '多模态', '知识工作'],
    change: { baseline: '10月28日 Carbon 首次公布，先向受限网络防御伙伴投放；普遍产品入口当时仍为 coming soon', baselineEventId: 'gemini-4-carbon-announced', improvements: ['开发者可通过 Gemini API 付费层级接入', '企业与 AI Ultra 订阅用户获得更多产品入口', '科研计划扩展至 Carbon，但仍需资格审核'], tradeoffs: '接入扩大不是性能独立验证；科研与网络防御渠道仍有申请和选择条件。', evidence: '厂商报告', sourceIds: ['gemini4-carbon-announcement', 'gemini4-carbon-wider-access'] },
    details: [
      { label: '背景与经过：保留首次公布，另记访问变化', text: '10月28日先公布模型及受限防御伙伴投放计划。11月10日公告列出 Gemini API 付费层级、AI Studio 与企业 Gemini for business 等入口，并向 AI Ultra 订阅用户逐步上线 Antigravity、Gemini app 和搜索 AI Mode 的使用渠道。这里记录本轮扩大接入，不把历史公告改成当天已全面可用。', sourceIds: ['gemini4-carbon-announcement', 'gemini4-carbon-wider-access'], locator: '10月28日 Coming soon；11月10日 Getting started with Gemini 4 Carbon' },
      { label: '接入边界：申请计划不是无条件赠送', text: '科研人员可申请在 Antigravity 获得六个月免费访问，但接入按批次推进，受资格、容量和遴选约束。网络防御专版 Carbon for cyber 仍通过 Fairwind Program 申请；一般 API 开放不等于获得这一专版的权限。', sourceIds: ['gemini4-carbon-wider-access'], locator: 'Stronger scientific and mathematical reasoning；Getting started 中 scientists & researchers / cybersecurity defenders' },
      { label: '评测阅读：MKA 衡量交付物，不是完整任务成功率', text: '同期 MKA 由 Google DeepMind 开发，Artificial Analysis 独立运行评测：200项私有任务与另行发布的10项公开示例分开。Climb WSR 是较难评分条件的加权满足率，不是整项任务全部完成的比例；公布的成本仅计被测模型调用，不含评审模型费用。这里保留方法，不据动态榜单宣布通用能力排名。', sourceIds: ['google-mka-announcement', 'aa-mka-methodology'], locator: 'Introducing MKA；Background 的 Climb WSR；Methodology；Cost' },
      { label: '编辑分析：把接入验收与效果验收分开', text: '扩大渠道让更多团队有机会检验自己的工作流，但能调用不代表能稳定交付。选型应分别核对账户权限、任务质量、总成本和安全限制；知识工作基准可以帮助提出测试问题，不能代替真实业务的复核。', editorial: true, sourceIds: ['gemini4-carbon-wider-access', 'aa-mka-methodology'], locator: '编辑归纳，依据渠道条件、评测方法与成本范围；非本项目实测' },
    ],
    recommendedResources: [
      { id: 'carbon-wider-access-reading', title: 'Gemini 4 Carbon is now available', creator: 'Koray Kavukcuoglu', series: 'Google 官方博客', kind: 'article', url: carbon, publishedAt: checkedAt, checkedAt, match: '从 Getting started 对照开发者、企业、订阅用户与申请计划，确定访问边界。', locator: 'Getting started with Gemini 4 Carbon', scopeNote: '核读官方正文；提供的是厂商公布的渠道条件，未登录账号确认资格或调用付费 API。' },
      { id: 'mka-method-reading', title: 'Multimodal Knowledge Agent (MKA) Benchmark', creator: 'Artificial Analysis', kind: 'article', url: mkaMethod, checkedAt, match: '理解视觉文件交付任务、Climb WSR 与成本计算，再决定哪些能力适合自行验收。', locator: 'Background；Methodology；Cost', scopeNote: '该机构独立运行 Google 开发的评测；这里核读方法，不复跑私有任务，不把加权条件满足率写成任务成功率。' },
    ],
  },
  {
    id: 'gemini-robotics-25-partner-rollout', date: checkedAt, dateLabel: '2026年11月10日（官方公告日，向机器人伙伴逐步投放）',
    title: 'Gemini Robotics 2.5 向伙伴投放：扩展动作灵巧性与安全引导', company: 'Google DeepMind', kind: '机器人动作模型／伙伴投放', tracks: ['models'], entityIds: ['gemini-robotics'], milestone: false,
    summary: 'Google DeepMind 公布新一代 VLA 动作模型 Gemini Robotics 2.5，报告在灵巧操作、工厂试点可靠性及推理时安全引导上的改进，并向机器人合作伙伴逐步投放。',
    significance: '编辑解读：从高层任务规划到实际动作执行，模型的价值需要在特定硬件、环境与安全边界内判断。',
    limitation: '合作伙伴投放不是公开 API、权重下载或全面 GA；公告未确认这些开放方式及权重许可。工厂试点和安全评测属于厂商／伙伴报告，不是通用工业安全认证，本站未操作机器人或复测。',
    sourceIds: ['gemini-robotics25-announcement', 'gemini-robotics2-vla-announcement', 'asimov-agentic-dataset', 'robotics-er2-cloud-preview'], tags: ['机器人', 'VLA', '伙伴投放', '物理安全', '具身智能'],
    change: { baseline: '7月30日公布的 Gemini Robotics 2 VLA 动作模型；不是高层推理 Gemini Robotics ER 2 的云端预览', improvements: ['厂商报告扩展精细工具使用与柔性物体操作', '在 Apollo 2 汽车零件配套试点检验动作可靠性', '采用推理时引导规避物理危险'], tradeoffs: '成绩依赖任务、硬件与环境；伙伴投放和示例不能外推为任何机器人均可可靠运行。', evidence: '厂商报告', sourceIds: ['gemini-robotics2-vla-announcement', 'gemini-robotics25-announcement'] },
    details: [
      { label: '背景：动作模型与高层推理分工', text: 'Robotics 2.5 承接 Robotics 2 的 VLA 路线，控制机器人具体动作。ER 系列则负责理解场景与组织任务；10月27日 ER 2 的云端公开预览是另一条接入事件，不能当成本模型的前代发布。新公告的可用性措辞是向机器人合作伙伴逐步投放。', sourceIds: ['gemini-robotics2-vla-announcement', 'gemini-robotics25-announcement', 'robotics-er2-cloud-preview'], locator: '开头 whole-body intelligence / VLA / robotics partners；Testing real-world reliability 中 ER 与 actions model 分工；10月27日云公告 public preview' },
      { label: '经过：精细操作与工厂配套试点', text: '厂商用夹取食物、打蝴蝶结和移液等任务说明灵巧性扩展。在与 Apptronik、梅赛德斯-奔驰合作的概念验证中，Apollo 2 将汽车零件从料箱分拣至顺序托盘：ER 跟踪工作流，2.5 控制手臂和手部。这是指定生产线的伙伴试点，不等于跨工厂、跨硬件的独立验证。', sourceIds: ['gemini-robotics25-announcement'], locator: 'Expanding task breadth, reliability, and dexterity；Testing real-world reliability with Apptronik’s Apollo and Mercedes-Benz' },
      { label: '安全：动作引导和越狱评测不是同一证据', text: '2.5 使用推理时引导来避开障碍与附近人员。同期发布的 ASIMOV-Jailbreak 是机器人场景的对抗提示评测数据，不是模型权重；公告中关于 Gemini 4 Argon 的越狱抗性结果也不能移植为 Robotics 2.5 的安全成绩。', sourceIds: ['gemini-robotics25-announcement', 'asimov-agentic-dataset'], locator: 'Advancing steerability and agentic safety for robots；ASIMOV-Jailbreak 数据入口' },
      { label: '编辑分析：把现场约束留在验收链内', text: '动作模型的改进需要和感知误差、末端执行器、人员接近及异常停止一起评估。伙伴案例提供了可研究的任务闭环，但安全引导并不自动构成部署许可或工业认证；扩大使用前仍需针对实际现场验收。', editorial: true, sourceIds: ['gemini-robotics25-announcement'], locator: '编辑基于伙伴试点与物理安全引导的归纳，非厂商认证或本站实测' },
    ],
    recommendedResources: [
      { id: 'robotics25-pilot-reading', title: 'Gemini Robotics 2.5 accelerates real-world general dexterity', creator: 'Carolina Parada', series: 'Google DeepMind 官方博客', kind: 'article', url: robotics, publishedAt: checkedAt, checkedAt, match: '对照动作模型、高层规划与 Apollo 2 汽车零件配套试点，理解落地环节。', locator: 'Testing real-world reliability；Advancing steerability and agentic safety', scopeNote: '核读正文和案例说明，未完整观看演示、运行模型或验证真实机器人安全；试点不是通用认证。' },
      { id: 'asimov-jailbreak-reading', title: 'ASIMOV-Jailbreak · google/asimov_agentic', creator: 'Google', series: 'Hugging Face 数据集', kind: 'article', url: asimov, checkedAt, match: '查看机器人对抗提示如何包装不安全请求，区分语言指令评测与物理执行风险。', locator: 'Dataset card；机器人场景与 jailbreak 提示', scopeNote: '作为公告关联的评测材料阅读入口；不是模型发布或权重许可，本站未运行数据集或复测越狱结果。' },
    ],
  },
  {
    id: 'alphaproof-code-verification', date: checkedAt, dateLabel: '2026年11月10日（研究公告与论文日期）',
    title: 'AlphaProof Code：以 AI 协作验证 Signal 部分实现的安全性质', company: 'Google DeepMind', kind: '形式化验证研究', tracks: ['methods'], entityIds: ['formal-software-verification'], milestone: false,
    summary: 'Google DeepMind 发布人类指导规格、多 LLM 证明代理与 Lean 内核校验结合的研究框架，报告对 libsignal 特定编译实现的安全性质证明，并公开形式化材料。',
    significance: '编辑解读：关注点从代理能否生成代码转向能否提供与明确规格相符、可由证明内核检查的证据。',
    limitation: '研究只覆盖指定实现和安全性质，不证明整个 Signal 绝对安全；规格、密码原语假设、机器语义及 Lean 内核仍在可信基础内。公开证明材料不等于通用模型 API 或完整代理服务，本站未独立复跑证明。',
    sourceIds: ['alphaproof-code-announcement', 'alphaproof-code-paper', 'alphaproof-code-artifacts'], tags: ['形式化验证', 'Lean', '多代理', 'Signal', '研究'],
    details: [
      { label: '背景与方法：先明确要证明什么', text: 'AlphaProof Code 把规格编写与证明生成分开：人类专家指导并批准 Lean 规格，多 LLM 代理协作提出证明，再由 Lean 内核检查。门控还要核对证明是否对应批准的规格；代理生成的文字或自报成功不能代替这一检查。', sourceIds: ['alphaproof-code-announcement', 'alphaproof-code-paper'], locator: 'How we verified Signal；论文 §2.1 Specification Writing、§2.4 Gatekeeping 与 Figure 1' },
      { label: '对象：特定版本与编译后的命令行封装', text: '论文针对 libsignal v0.105.4，使用命令行封装编译为 AArch64 机器码，覆盖一对一会话代码的 init、send、recv 路径。keygen 密钥生成不在已验证路径内，不能把核心协议实现的性质证明扩大为整个客户端、群聊或多设备系统的认证。', sourceIds: ['alphaproof-code-paper'], locator: '§4 Setup for Verification；§4.1 Binary-Level Guarantees；§9 Discussion' },
      { label: '保证边界：证明成立仍有可信前提', text: '安全结论依赖经过审阅的规格、密码原语假设、AArch64 机器语义、外部例程契约及 Lean 内核。量子攻击方面只覆盖论文限定的部分性质，不能宣称完整后量子安全；群聊、多设备不在覆盖范围内，限定会话模型及多会话规模等仍有边界，不能直接外推至任意大规模部署。', sourceIds: ['alphaproof-code-paper'], locator: 'Figure 1；§5.1 Symbolic Proofs；§5.2 Computational Proofs（含 §5.2.5 多会话规模限制）；§5.3 Trusted Computing Base；§9 Discussion' },
      { label: '公开材料：研究可审查，不等于服务已上线', text: '团队公开形式规格与 Lean 证明等研究材料，并在隔离版本中重新引入历史已修复缺陷来检查规格能否发现问题。这里记录论文与材料发布，不将其写成新的基础模型、完整 agent 产品或面向公众的验证 API。本站没有重新构建或独立复跑这些证明。', sourceIds: ['alphaproof-code-announcement', 'alphaproof-code-paper', 'alphaproof-code-artifacts'], locator: 'The future of security；论文 §6 Finding Historical Bugs；官方代码仓库入口' },
      { label: '编辑分析：可检查的证明也需要可解释的范围', text: '这一研究的意义在于把实现、规格和机器检查连接起来，同时把“证明了什么”作为阅读起点。复用前应核对版本、信任边界和外部依赖，而不是凭证明代码规模判断整个产品的安全性；发现攻击与证明限定性质也应分开记录。', editorial: true, sourceIds: ['alphaproof-code-paper', 'alphaproof-code-artifacts'], locator: '编辑归纳，依据验证对象与可信基础；非独立安全审计结论' },
    ],
    recommendedResources: [
      { id: 'alphaproof-code-paper-reading', title: 'AlphaProof Code: Verifying Signal’s Security at the Machine-Code Level', creator: 'Swarat Chaudhuri 等', series: 'Google DeepMind 研究论文', kind: 'article', url: proofPaper, publishedAt: checkedAt, checkedAt, match: '先读验证设置、可信基础与讨论，再看证明结果，明确哪些性质及代码路径被覆盖。', locator: '§4 Setup for Verification；§5.3 Trusted Computing Base；§9 Discussion', scopeNote: '核读方法和范围，不是对全部证明的独立复核；限定会话模型、多会话规模、外部原语及部分量子保证仍有边界，不能扩写为整个 Signal 的安全认证。' },
      { id: 'alphaproof-code-artifacts-reading', title: 'google-deepmind/code-verification', creator: 'Google DeepMind', series: '公开形式化研究材料', kind: 'article', url: proofCode, checkedAt, match: '从仓库说明进入规格与证明材料，理解论文结论如何对应可检查的形式对象。', locator: 'README；规格与 Lean 证明入口', scopeNote: '公开材料入口不代表完整代理框架或托管服务；本站未构建仓库、复跑 Lean 或验证全部依赖。' },
    ],
  },
];
