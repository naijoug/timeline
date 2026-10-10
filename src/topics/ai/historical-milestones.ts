import type { Entity, Source, TimelineEvent } from './types';
import type { Collection, EventRelation, ReadingSection } from '../../core/types';

// Review dates apply only to sources actually read for this pack.
const checkedAt = '2026-10-09';
const paper = (id: string, title: string, arxiv: string, publishedAt: string, locator: string): Source => ({
  id, title, publisher: '论文作者 · arXiv', url: `https://arxiv.org/abs/${arxiv}v1`, type: '原始论文', language: 'English',
  checkedAt, publishedAt, format: '原始论文（作者提交版）', version: 'arXiv v1', locator,
});
export const historicalSources: Source[] = [
  paper('clip-paper', 'Learning Transferable Visual Models From Natural Language Supervision', '2103.00020', '2021-02-26', '§2.3–2.4、§3.1、§6；Submission history'),
  { id: 'whisper-release', title: 'Introducing Whisper', publisher: 'OpenAI', url: 'https://openai.com/index/whisper/', type: '官方公告', language: 'English', checkedAt, publishedAt: '2022-09-21', format: '官方网页原文', version: '2022-09-21 研究发布页（现页面含后加提示）', locator: '页首日期、训练数据、架构、评估和开源说明' },
  paper('whisper-paper', 'Robust Speech Recognition via Large-Scale Weak Supervision', '2212.04356', '2022-12-06', '§2.1–2.3、§3.8、§6；Submission history'),
  paper('phi1-paper', 'Textbooks Are All You Need', '2306.11644', '2023-06-20', 'Abstract、§2–2.3、§5、Appendix B；Submission history'),
  paper('autogen-paper', 'AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation Framework', '2308.08155', '2023-08-16', '作者署名与机构、§2.1–2.2、§4、§5.2；Submission history'),
];
const review = (arxiv: string, publishedAt: string, locator: string): Partial<Source> => ({
  url: `https://arxiv.org/abs/${arxiv}v1`, version: 'arXiv v1', format: '原始论文（作者提交版）', checkedAt, publishedAt, locator,
});
export const historicalSourceReviews: Record<string, Partial<Source>> = {
  alexnet: { checkedAt, publishedAt: '2012', format: '原始会议论文 PDF', version: 'NIPS 2012 会议论文', url: 'https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf', locator: '§3.1–3.2、§3.5、§4.1–4.2、§6；会议年份' },
  vae: review('1312.6114', '2013-12-20', '作者署名、§2.1–2.4、§3、§5；Submission history'),
  gan: review('1406.2661', '2014-06-10', '作者署名、§3–4、§6；Submission history'),
  resnet: review('1512.03385', '2015-12-10', '作者署名、§1、§3.1–3.3、§4.1–4.2；Submission history'),
  rag: review('2005.11401', '2020-05-22', '§2.1–2.4、§3、§6；Submission history'),
  ddpm: review('2006.11239', '2020-06-19', '§1–2、§3.2、§3.4、§4.1–4.3；Submission history'),
  'release-clip-release': { checkedAt, publishedAt: '2021-01-05', format: '官方网页原文', version: '2021-01-05 研究发布页', locator: '页首日期、Approach、Limitations' },
};
const section = (label: string, text: string, sourceId: string | string[], locator: string): ReadingSection => ({ label, text, sourceIds: Array.isArray(sourceId) ? sourceId : [sourceId], locator });
const updates: Record<string, Partial<TimelineEvent>> = {
  alexnet: { company: 'Alex Krizhevsky、Ilya Sutskever、Geoffrey Hinton', kind: '会议论文', dateLabel: 'NIPS 2012 会议论文，年份精度', details: [
    section('网络与训练', '论文采用五层卷积层和三层全连接层，使用 ReLU，并将网络分布在两块 GPU 上训练。数据增广和 dropout 用于减轻过拟合。', 'alexnet', '§3.1–3.2、§3.5、§4.1–4.2'),
    section('结果的口径', '论文分别报告 ILSVRC-2010 与 ILSVRC-2012 的实验，2012 竞赛成绩涉及多个网络的组合。这里保留会议年份；分类基准不能直接代表任意视觉任务。', 'alexnet', '§6 Results、Table 1–2'),
  ] },
  vae: { company: 'Diederik P. Kingma、Max Welling', entityIds: ['generative', 'neural-networks', 'diederik-kingma'], details: [
    section('学习概率隐变量', '推断网络为观测数据给出隐变量的近似后验分布，生成网络给出隐变量条件下的数据分布。两部分共同优化变分下界，而不是只学习确定性的压缩与重建。', 'vae', '§2.1–2.2'),
    section('重参数化与范围', '将采样写成噪声与可微变换的组合，使下界的随机梯度能够用于训练。论文讨论连续隐变量，并以特定分布和数据实验验证；不保证每种生成模型都能使用相同估计器。', 'vae', '§2.3–2.4、§3、§5'),
  ] },
  gan: { company: 'Ian Goodfellow 等共同作者', entityIds: ['generative', 'ian-goodfellow'], details: [
    section('两个网络的目标', '生成器把噪声映射为样本，判别器学习区分真实数据与生成样本；二者通过对抗目标交替训练。', 'gan', '§3 Adversarial nets'),
    section('理论与实践', '原文的分布收敛分析有理想化假设，不能当作有限网络训练的保证。作者明确讨论判别器与生成器的同步困难，以及生成器将不同输入映射为相同样本的失败情形。', 'gan', '§4 Theoretical Results、§6 Advantages and disadvantages'),
  ] },
  resnet: { company: 'Microsoft Research', entityIds: ['neural-networks', 'microsoft-research', 'kaiming-he'], details: [
    section('残差连接', '将目标映射写成输入加上待学习的残差 F(x)，用捷径连接传递输入。论文针对加深网络后训练误差反而增加的退化问题，而不仅是讨论过拟合。', 'resnet', '§1、§3.1–3.2'),
    section('实验范围', '研究在 ImageNet 和 CIFAR-10 比较不同深度的网络，并报告视觉识别实验。残差结构有助于优化，但更深的网络并非在任意数据与配置下都更好。', 'resnet', '§3.3、§4.1–4.2'),
  ] },
  'rag-paper': { date: '2020-05-22', company: 'Facebook AI Research / UCL / NYU', entityIds: ['rag', 'context', 'bert-family'], details: [
    section('检索器和生成器', '原论文把 Wikipedia 向量索引作为外部记忆，使用基于 BERT 的 DPR 检索器和 BART 生成器。微调查询编码器与生成器时，文档编码器和索引保持固定。', 'rag', '§2.2–2.4'),
    section('两种组合', 'RAG-Sequence 对整段输出使用同一检索文档，RAG-Token 允许输出的不同 token 使用不同文档，并对候选文档进行边缘化。研究评估知识密集型任务，不等于只在提示中拼接搜索结果。', 'rag', '§2.1、§3'),
  ] },
  ddpm: { date: '2020-06-19', company: 'Jonathan Ho、Ajay Jain、Pieter Abbeel', details: [
    section('加噪与反向过程', '前向过程逐步向数据加入高斯噪声，模型学习反向链的去噪转移。论文将特定参数化与多噪声水平的去噪得分匹配联系起来。', 'ddpm', '§1–2、§3.2'),
    section('训练目标与边界', '简化目标训练网络预测加入的噪声，并在 CIFAR-10、LSUN 等图像数据上评估。论文讨论样本质量与似然指标的差别；此节点不是文本生图产品发布，也不是扩散方法的最早起点。', 'ddpm', '§3.4、§4.1–4.3、§1'),
  ] },
  'clip-release': { entityIds: ['clip', 'openai-research'], sourceIds: ['release-clip-release', 'clip-paper'], details: [
    section('图文对齐', '联合训练图像编码器与文本编码器，在同一批次中区分正确图文配对。图像编码器实验包括改造的 ResNet 和 Vision Transformer；类别文字可用于零样本分类。', 'clip-paper', '§2.3–2.4、§3.1'),
    section('发布与论文', '节点日期采用官方研究公告的 2021 年 1 月 5 日。所引 arXiv v1 提交于 2 月 26 日，是后续论文材料；CLIP 学习视觉表示，不生成图像，细粒度分类和计数等任务仍有局限。', ['release-clip-release', 'clip-paper'], '公告页首日期；论文 Submission history、§6 Limitations'),
    section('公告口径', '官方发布页介绍通过自然语言监督学习视觉概念，并给出使用文本类别描述进行分类的示例。', 'release-clip-release', '页首日期、Approach'),
  ] },
};
export function enrichHistoricalEvent(event: TimelineEvent): TimelineEvent {
  return updates[event.id] ? { ...event, ...updates[event.id] } : event;
}
export const historicalEvents: TimelineEvent[] = [
  { id: 'whisper-release', date: '2022-09-21', title: 'Whisper：开放多语言语音识别研究', company: 'OpenAI', kind: '研究发布', milestone: true,
    summary: 'OpenAI 发布基于大规模弱监督数据训练的语音识别模型，并开放模型与推理代码。', significance: '编辑解读：跨数据分布的稳健性与多任务接口成为语音模型的重要考察维度。',
    limitation: '不同语言与场景表现不同；长音频可能重复、漏词或输出与音频无关的转录。', tracks: ['history', 'models'], entityIds: ['whisper', 'transformer', 'openai-research'], sourceIds: ['whisper-release', 'whisper-paper'], tags: ['语音识别', '多语言', '开放模型'],
    details: [
      section('研究开放阶段', '2022 年 9 月 21 日官方公告介绍约 68 万小时多语言、多任务监督数据，并开放模型与推理代码。这里记录研究发布；论文首版提交于 12 月 6 日。', ['whisper-release', 'whisper-paper'], '公告页首日期、训练数据、开源说明；论文 Submission history'),
      section('统一任务接口', '编码器—解码器 Transformer 处理音频特征，并用特殊 token 表达任务。任务包括多语言转录和翻译到英语；训练使用 30 秒音频片段，长音频需要分段解码。', 'whisper-paper', '§2.1–2.3、§3.8'),
      section('评估边界', '作者讨论长音频的重复、漏词和幻觉转录，以及低资源语言的数据不足。零样本跨数据集评估不能证明所有语言或所有语音系统都被超越。', 'whisper-paper', '§6 Limitations and Future Work'),
    ], change: { baseline: '面向单一语音数据集或专门任务训练的系统', improvements: ['探索大规模多语言监督下的零样本迁移', '以序列接口组合语音识别与英语翻译等任务'], tradeoffs: '训练成本、低资源语言差异与长音频解码错误仍需评估。', evidence: '论文报告', sourceIds: ['whisper-release', 'whisper-paper'] },
  },
  { id: 'phi-1-paper', date: '2023-06-20', title: 'Phi-1：用教材式数据训练小型代码模型', company: 'Microsoft Research', kind: '论文首发', milestone: true,
    summary: 'Textbooks Are All You Need 研究筛选代码数据和合成教材、练习对小型代码模型的作用。', significance: '编辑解读：模型规模之外，训练数据的组织与质量也值得单独比较。',
    limitation: '主要研究 Python 代码任务；论文自报成绩不等于通用能力排名或独立复测。', tracks: ['history', 'models'], entityIds: ['phi', 'microsoft-research', 'training-scale'], sourceIds: ['phi1-paper'], tags: ['代码模型', '数据质量', '合成数据'],
    details: [
      section('数据与训练阶段', '1.3B 参数模型先以筛选的代码和合成教材预训练，再用合成 Python 练习微调为 phi-1。论文中的语料规模与多轮训练实际处理的 token 数是不同口径。', 'phi1-paper', 'Abstract、§2–2.3'),
      section('范围与局限', '论文以 HumanEval、MBPP 等代码任务比较，讨论训练数据污染，并列出复杂应用、提示长度等限制。日期采用 arXiv v1，不推定模型权重在同日开放。', 'phi1-paper', 'Table 1、§5、Appendix B；Submission history'),
    ], change: { baseline: '在标准代码语料上扩大模型或增加训练轮次', improvements: ['比较筛选与合成教材数据的训练效果', '通过代码练习微调提升特定 Python 任务表现'], tradeoffs: '数据筛选成本、污染评估和复杂代码任务的泛化仍有边界。', evidence: '论文报告', sourceIds: ['phi1-paper'] },
  },
  { id: 'autogen-paper', date: '2023-08-16', title: 'AutoGen：用多 Agent 对话组织应用', company: 'Microsoft / Penn State / University of Washington', kind: '论文首发', milestone: true,
    summary: '论文提出可定制、可对话的 Agent，以消息交互组合语言模型、工具和人类参与。', significance: '编辑解读：角色、消息和执行能力构成应用流程，而不只是让模型扮演多个身份。',
    limitation: '工作流依任务配置；更多 Agent 不保证更好结果，自动执行需要可追踪的行为与人类介入机制。', tracks: ['history', 'methods'], entityIds: ['autogen', 'agent', 'loop'], sourceIds: ['autogen-paper'], tags: ['开发框架', '多 Agent', '人类参与'],
    details: [
      section('可对话 Agent', 'Agent 可以由语言模型、人或工具驱动，通过统一消息接口组合。论文介绍 AssistantAgent 与 UserProxyAgent 等预设，并支持自动回复和可定制的交互模式。', 'autogen-paper', '§2.1–2.2'),
      section('应用与阶段', '论文给出数学、代码与网页交互等应用案例。此节点记录 8 月 16 日 arXiv v1，不将后续推广或库版本更新当作同一发布阶段。', 'autogen-paper', '§4；Submission history'),
      section('工作流边界', '作者说明 Agent 数量、角色与交互模式依应用而定，并讨论日志调试、连锁错误和适当的人类参与。研究案例不能证明多 Agent 在所有任务上都更优。', 'autogen-paper', '§5.2 Future Work'),
    ],
  },
];
export const historicalEntities: Entity[] = [
  { id: 'whisper', name: 'Whisper', type: 'family', company: 'OpenAI', description: '大规模弱监督语音模型；本专题区分研究开放与论文发表阶段。', tags: ['语音', '多语言'], sourceIds: ['whisper-release', 'whisper-paper'] },
  { id: 'phi', name: 'Phi', type: 'family', company: 'Microsoft', description: '此处从 phi-1 代码研究切入，记录教材式数据与小型模型的实验，不延伸断言后续版本。', tags: ['代码模型', '数据质量'], sourceIds: ['phi1-paper'] },
  { id: 'autogen', name: 'AutoGen', type: 'concept', description: '通过可对话 Agent 组织应用的开发框架；本专题依据 2023 年论文首版，归入技术与方法。', tags: ['开发框架', '多 Agent'], sourceIds: ['autogen-paper'] },
  ...[['diederik-kingma', 'Diederik P. Kingma', 'vae'], ['ian-goodfellow', 'Ian Goodfellow', 'gan'], ['kaiming-he', 'Kaiming He / 何恺明', 'resnet']].map(([id, name, sourceId]): Entity => ({ id, name, type: 'person', description: '所引原论文的署名作者之一；共同作者的研究贡献不由此省略。', tags: ['论文作者'], sourceIds: [sourceId] })),
];
const edge = (id: string, fromEventId: string, label: string, sourceId: string, locator: string, target: { toEventId: string } | { entityId: string }, note?: string): EventRelation => ({ id, fromEventId, ...target, label, sourceIds: [sourceId], locator, note });
export const historicalRelations: EventRelation[] = [
  edge('alexnet-convolution', 'alexnet', '采用深层卷积神经网络', 'alexnet', '§3.5', { entityId: 'neural-networks' }),
  edge('vae-kingma-author', 'vae', '署名作者之一', 'vae', '论文作者署名', { entityId: 'diederik-kingma' }),
  edge('gan-goodfellow-author', 'gan', '署名作者之一', 'gan', '论文作者署名', { entityId: 'ian-goodfellow' }),
  edge('resnet-he-author', 'resnet', '署名作者之一', 'resnet', '论文作者署名', { entityId: 'kaiming-he' }),
  edge('ddpm-generative', 'ddpm', '研究逐步去噪的生成方法', 'ddpm', '§1–2', { entityId: 'generative' }),
  edge('rag-retriever-bert', 'rag-paper', '在 DPR 检索器中使用 BERT 编码器', 'rag', '§2.2 Retriever: DPR', { toEventId: 'bert' }, '检索组件关系；原论文生成器是 BART。'),
  edge('clip-image-resnet', 'clip-release', '使用改造的 ResNet 作为图像编码器之一', 'clip-paper', '§2.4 Choosing and Scaling a Model', { toEventId: 'resnet' }, '也研究 Vision Transformer；不表示沿用原 ResNet 权重。'),
  edge('whisper-encoder-decoder', 'whisper-release', '采用编码器—解码器 Transformer', 'whisper-paper', '§2.2 Model', { toEventId: 'transformer' }),
  edge('phi1-microsoft-authors', 'phi-1-paper', '署名研究机构', 'phi1-paper', '作者署名与机构', { entityId: 'microsoft-research' }),
  edge('autogen-conversable-agents', 'autogen-paper', '以可对话 Agent 组合模型、工具和人', 'autogen-paper', '§2.1–2.2', { entityId: 'agent' }),
];
export const historicalCollection: Collection = {
  id: 'learning-to-systems', title: '从视觉学习到协作系统', path: '/ai/collections/learning-to-systems/',
  description: '2012—2023：视觉学习、生成方法、检索、跨模态表示和协作框架的 10 个代表节点。',
  eventIds: ['alexnet', 'vae', 'gan', 'resnet', 'rag-paper', 'ddpm', 'clip-release', 'whisper-release', 'phi-1-paper', 'autogen-paper'],
  note: '7 个既有节点补充正文，3 个新增代表节点。并行方法放在同一浏览专题中；年代顺序不是技术继承或因果关系。模型发布、论文首版与框架研究分别注明。',
};
