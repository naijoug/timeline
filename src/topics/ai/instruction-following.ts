import type { Entity, Source, TimelineEvent } from './types';
import type { Collection, EventRelation, ReadingSection } from '../../core/types';

// Only these sources were reopened on this date. Other source review dates stay intact.
const checkedAt = '2026-10-09';
const paper = (id: string, title: string, arxiv: string, publishedAt: string, locator: string): Source => ({
  id, title, publisher: '论文作者 · arXiv', url: `https://arxiv.org/abs/${arxiv}v1`, type: '原始论文',
  language: 'English', checkedAt, publishedAt, format: '原始论文（作者提交版）', version: 'arXiv v1', locator,
});
export const instructionSources: Source[] = [
  paper('scaling-laws', 'Scaling Laws for Neural Language Models', '2001.08361', '2020-01-23', '§1.1–1.2、§2.3、§6、Appendix C'),
  paper('chinchilla', 'Training Compute-Optimal Large Language Models', '2203.15556', '2022-03-29', '§3、§4.1、Table 1、§5'),
  paper('constitutional-ai', 'Constitutional AI: Harmlessness from AI Feedback', '2212.08073', '2022-12-15', 'Abstract、§3 Critiques, Revisions, and Supervised Learning、§4 Reinforcement Learning from AI Feedback'),
  { id: 'gpt1-paper', title: 'Improving Language Understanding by Generative Pre-Training', publisher: 'Alec Radford 等 · OpenAI', url: 'https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf', type: '原始论文', checkedAt, language: 'English', format: '原始论文 PDF', version: '2018 官方发布 PDF', locator: '§3 Framework、§4.1 Model specifications', publishedAt: '2018-06-11' },
  { id: 'gpt2-paper', title: 'Language Models are Unsupervised Multitask Learners', publisher: 'Alec Radford 等 · OpenAI', url: 'https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf', type: '原始论文', checkedAt, language: 'English', format: '原始技术报告 PDF', version: '2019 官方发布 PDF', locator: '§2 Approach、§2.3 Model、§3 Experiments', publishedAt: '2019-02-14' },
];
const review = (version: string, locator: string, publishedAt: string, url?: string): Partial<Source> => ({ checkedAt, version, locator, publishedAt, format: version === 'arXiv v1' ? '原始论文（作者提交版）' : '官方网页原文', ...(url ? { url } : {}) });
export const instructionSourceReviews: Record<string, Partial<Source>> = {
  transformer: review('arXiv v1', '§3 Model Architecture、§5–6；Submission history', '2017-06-12', 'https://arxiv.org/abs/1706.03762v1'),
  'release-gpt-1': review('2018-06-11 发布页', '正文“两阶段”说明、Drawbacks；链接原论文', '2018-06-11'),
  'release-gpt-2': review('2019-02-14 发布页', '正文模型说明、Zero-shot、Release strategy', '2019-02-14'),
  bert: review('arXiv v1', '§3.1、§3.3、§3.5；Submission history', '2018-10-11', 'https://arxiv.org/abs/1810.04805v1'),
  'release-t5-paper': review('arXiv v1', '§2.4 Input and output format、§3.1、§3.7；Submission history', '2019-10-23', 'https://arxiv.org/abs/1910.10683v1'),
  gpt3: review('arXiv v1', '§1、§2.1、§2.4、§5；Submission history', '2020-05-28', 'https://arxiv.org/abs/2005.14165v1'),
  lora: review('arXiv v1', '§3.1、§5.2–5.3；Submission history', '2021-06-17', 'https://arxiv.org/abs/2106.09685v1'),
  cot: review('arXiv v1', '§2 Chain of Thought、§3、§6；Submission history', '2022-01-28', 'https://arxiv.org/abs/2201.11903v1'),
  instructgpt: review('arXiv v1', 'Figure 2、§3.2–3.5、§5.2；Submission history', '2022-03-04', 'https://arxiv.org/abs/2203.02155v1'),
  chatgpt: review('2022-11-30 原公告（现页面含后加提示）', 'Methods、Limitations；页首发布日期', '2022-11-30'),
  dpo: review('arXiv v1', '§4 Direct Preference Optimization、§6、§7；Submission history', '2023-05-29', 'https://arxiv.org/abs/2305.18290v1'),
};
const section = (label: string, text: string, sourceId: string, locator: string): ReadingSection => ({ label, text, sourceIds: [sourceId], locator });
const updates: Record<string, Partial<TimelineEvent>> = {
  transformer: { entityIds: ['transformer', 'google-research'], details: [
    section('架构解决的问题', '原论文面向序列转换，采用编码器—解码器结构。自注意力、交叉注意力和前馈层承担不同角色，并以位置编码补充顺序信息。', 'transformer', '§3.1–3.5'),
    section('实验与边界', '主要实验是机器翻译。论文讨论并行训练的优势；这不是指令微调，也不是一个向公众开放的聊天产品。', 'transformer', '§5–6、Abstract'),
  ] },
  'gpt-1': { entityIds: ['gpt', 'transformer', 'openai-research', 'alec-radford'], sourceIds: ['release-gpt-1', 'gpt1-paper'], details: [
    section('预训练与任务适配', '研究先用语言建模目标在无标注文本上预训练，再用带标签的数据微调下游任务。模型采用 Transformer 解码器，任务输入经过相应变换。', 'gpt1-paper', '§3.1–3.3'),
    section('公开阶段', '2018 年 6 月 11 日是官方研究发布日。发布页说明预训练计算成本和分布外泛化的局限；不要把这里的任务微调等同于后来的指令对齐。', 'release-gpt-1', '页首日期、两阶段说明、Drawbacks'),
  ] },
  'gpt-2': { entityIds: ['gpt', 'transformer', 'openai-research', 'alec-radford'], sourceIds: ['release-gpt-2', 'gpt2-paper'], details: [
    section('从目标到使用方式', 'GPT-2 延续自回归语言建模，在多种任务上探索不进行任务专门训练的零样本使用。技术报告给出模型和各任务的实验设置。', 'gpt2-paper', '§2–3'),
    section('公告不等于全部开放', '首次公告只开放较小模型，并说明分阶段发布策略。本节点保留 2019 年 2 月 14 日；完整权重开放是库中另一个事件。', 'release-gpt-2', 'Release strategy、Staged release'),
  ] },
  bert: { date: '2018-10-11', entityIds: ['bert-family', 'transformer', 'google-research'], details: [
    section('理解路线', 'BERT 使用双向 Transformer 编码器；原版预训练包含掩码语言建模与下一句预测。微调时更新模型参数，并按任务增加输出层。', 'bert', '§3.1、§3.3、§3.5'),
    section('和生成式模型的区别', '论文比较 BERT 与单向 GPT 的注意力和预训练目标。它面向语言理解任务，并不是 GPT 版本链上的下一代。', 'bert', '§3.6、Figure 1'),
  ] },
  't5-paper': { entityIds: ['t5', 'transformer', 'google-research'], details: [
    section('统一任务表示', 'T5 将任务输入和输出都写成文本，并用任务前缀区分翻译、摘要、分类等任务；同一框架中系统比较架构、目标和数据。', 'release-t5-paper', '§2.4、§3'),
    section('训练目标', '最终方案采用编码器—解码器和去噪预训练。统一文本接口不意味着不用训练就能遵循任意指令。', 'release-t5-paper', '§3.1、§3.3、§3.7'),
  ] },
  'gpt3-paper': { date: '2020-05-28', entityIds: ['gpt', 'prompt', 'transformer', 'openai-research', 'jared-kaplan'], details: [
    section('上下文学习', '论文按零样本、单样本和少样本分别评估；少样本例子放在上下文中，不执行下游梯度更新。该研究包含最大 175B 参数的自回归模型。', 'gpt3', '§1、§2.1、§2.4'),
    section('能力与开放口径', '论文讨论数据污染、生成偏差和任务间差异。这里记论文首版日期，不是 API 面向所有用户开放的日期，也不是指令微调成果。', 'gpt3', '§4–6；Submission history'),
  ] },
  lora: { date: '2021-06-17', company: 'Microsoft', entityIds: ['neural-networks', 'parameter-adaptation', 'microsoft-research'], details: [
    section('哪些参数被训练', 'LoRA 固定预训练权重，以两个较小矩阵的乘积表达权重更新。论文把它用于 Transformer 的适配，并与全参数微调等方法比较。', 'lora', '§3.1、§5'),
    section('成本口径', '低秩更新可以合并回原权重。论文中的显存与可训练参数收益依实验配置而定，不能直接外推成所有任务、所有部署成本的比例。', 'lora', '§3.1、§5.2'),
  ] },
  'chain-of-thought': { date: '2022-01-28', company: 'Google', entityIds: ['prompt', 'google-research'], details: [
    section('改变提示，不更新权重', '思维链提示在示例中加入中间推理步骤，再要求模型完成新问题。论文比较标准少样本提示与含步骤示例的提示，主要实验涉及算术、常识与符号推理。', 'cot', '§2–5'),
    section('边界', '原文讨论模型规模与提示选择的影响，也列出局限。生成一串推理文字不等于证明模型内部过程正确，更不是一种新的预训练架构。', 'cot', '§6 Discussion'),
  ] },
  instructgpt: { date: '2022-03-04', entityIds: ['alignment', 'gpt', 'openai-research'], details: [
    section('人类反馈流程', '流程先收集示范并做监督微调，再收集回答排序训练奖励模型，最后用 PPO 优化策略。训练从 GPT-3 模型开始。', 'instructgpt', 'Figure 2、§3.1、§3.5'),
    section('偏好不是普遍真理', '人类评价基于论文的提示分布与标注者群体。作者讨论对齐的是谁的偏好；结果不能证明所有文化、任务都被解决。', 'instructgpt', '§4、§5.2'),
  ] },
  chatgpt: { entityIds: ['alignment', 'openai-research'], details: [
    section('对话数据与反馈', '官方公告说明以人类训练员编写对话进行监督微调，再对多条回答排序，用奖励模型和 PPO 继续训练；对话数据与转成对话格式的 InstructGPT 数据混合。', 'chatgpt', 'Methods'),
    section('研究预览', '2022 年 11 月 30 日向公众推出研究预览。原公告列出错误答案、措辞敏感等局限；开放产品不等同于提出一项全新训练算法。', 'chatgpt', '页首日期、Limitations、Iterative deployment'),
  ] },
  dpo: { date: '2023-05-29', company: 'Stanford University', entityIds: ['alignment', 'stanford-research'], details: [
    section('直接优化偏好', 'DPO 将带约束的偏好优化重新参数化为可直接优化策略的分类目标，使用偏好回答对和参考策略；无需另训练显式奖励模型及执行 PPO 循环。', 'dpo', '§3–5'),
    section('实验范围', '论文测试情感控制、摘要与单轮对话。方法仍依赖偏好数据及建模假设；它是偏好优化方案，不能由此断言 ChatGPT 采用 DPO。', 'dpo', '§6–7'),
  ] },
};
export function enrichInstructionEvent(event: TimelineEvent): TimelineEvent {
  const update = updates[event.id];
  return update ? { ...event, ...update } : event;
}
const addition = (id: string, date: string, title: string, summary: string, significance: string, limitation: string, entityIds: string[], details: ReadingSection[]): TimelineEvent => ({
  id, date, title, summary, significance, limitation, entityIds, details, sourceIds: [id], tracks: ['history', 'methods'],
  tags: [id === 'constitutional-ai' ? 'AI 反馈与原则' : '预训练与算力'], milestone: true, kind: '论文首发', company: id === 'chinchilla' ? 'DeepMind' : id === 'constitutional-ai' ? 'Anthropic' : 'OpenAI',
});
export const instructionEvents: TimelineEvent[] = [
  addition('scaling-laws', '2020-01-23', 'Scaling Laws：分配语言模型的训练预算', '研究以模型参数、训练数据和计算量解释语言模型交叉熵损失的经验变化。', '编辑解读：把扩大模型的问题转化为可检验的资源分配问题。', '这是特定数据与训练设置中的经验规律，不保证任意任务能力按同一规律增长。', ['training-scale', 'openai-research', 'jared-kaplan'], [
    section('经验量与目标', '论文分别改变模型规模、数据量与训练计算量，拟合交叉熵损失；主要使用 WebText2，讨论固定预算的分配。', 'scaling-laws', '§1.2、§2.3、§6'),
    section('适用边界', '原文列出数据分布、计算估算等限制。它研究训练效率，不是把参数量当成通用智能分数。', 'scaling-laws', 'Appendix C Caveats'),
  ]),
  addition('chinchilla', '2022-03-29', 'Chinchilla：重新平衡模型规模与训练数据', '研究在固定计算预算下联合估计参数量与训练 token 数，并用 Chinchilla 检验预测。', '编辑解读：资源分配不仅关乎做大模型，也关乎是否给模型足够训练数据。', '结论依赖训练目标、数据和计算估算；这里记录论文，不宣称模型权重同时开放。', ['training-scale', 'deepmind-research'], [
    section('比较设置', '作者用多组规模和训练长度估计预算分配，再训练 70B 参数、1.4T token 的 Chinchilla，与使用相同计算预算的 Gopher 比较。', 'chinchilla', '§3、§4.1、Table 1'),
    section('与较早规律的关系', '论文直接讨论 Kaplan 等人的规模研究，并对训练长度和拟合方法作比较。它不是一条所有模型都必须按固定 token 比例训练的法则。', 'chinchilla', '§2、§5、Appendix D.4'),
  ]),
  addition('constitutional-ai', '2022-12-15', 'Constitutional AI：用原则和 AI 反馈训练助手', '论文研究用原则指导模型自我批评、改写和偏好评价，结合监督学习与强化学习。', '编辑解读：反馈来源和评价原则成为对齐流程中需要明确说明的组成部分。', '原则仍由人选择；减少特定有害性标签不等于没有人类参与，也不证明助手永远无害。', ['alignment', 'anthropic-research'], [
    section('监督阶段', '初始回答经过模型批评与改写，再用改写后的回答微调；批评由预先给定的原则引导。', 'constitutional-ai', '§3.1 Method'),
    section('反馈阶段', '模型比较回答形成 AI 偏好数据，训练偏好模型，并作为强化学习奖励信号。此流程与 DPO 的直接分类目标不同。', 'constitutional-ai', '§4.1 Method、Abstract'),
  ]),
];
export const instructionEntities: Entity[] = [
  { id: 'training-scale', name: '训练规模与算力分配', type: 'concept', description: '联合讨论参数、数据量与计算预算；经验规律需要注明训练目标和数据设置。', tags: ['预训练'], sourceIds: ['scaling-laws', 'chinchilla'] },
  { id: 'parameter-adaptation', name: '参数高效适配', type: 'concept', description: '用较少可训练参数适配预训练模型；LoRA 是此处的具体研究节点。', tags: ['适配'], sourceIds: ['lora'] },
  ...[['openai-research', 'OpenAI', 'gpt1-paper'], ['google-research', 'Google 研究团队', 'transformer'], ['microsoft-research', 'Microsoft 研究团队', 'lora'], ['deepmind-research', 'DeepMind', 'chinchilla'], ['anthropic-research', 'Anthropic', 'constitutional-ai'], ['stanford-research', 'Stanford University 研究团队', 'dpo']].map(([id, name, source]): Entity => ({ id, name, type: 'organization', description: '本专题记录论文署名或官方发布方，不代表其全部研究历史。', tags: ['机构'], sourceIds: [source] })),
  { id: 'alec-radford', name: 'Alec Radford', type: 'person', description: '2018 GPT 与 2019 GPT-2 技术报告署名作者之一。研究成果由共同作者完成。', tags: ['论文作者'], sourceIds: ['gpt1-paper', 'gpt2-paper'] },
  { id: 'jared-kaplan', name: 'Jared Kaplan', type: 'person', description: 'Scaling Laws 和 GPT-3 论文署名作者之一；这里仅记录有原文依据的参与关系。', tags: ['论文作者'], sourceIds: ['scaling-laws', 'gpt3'] },
];
const edge = (id: string, fromEventId: string, toEventId: string | undefined, entityId: string | undefined, label: string, sourceId: string, locator: string, note?: string): EventRelation => ({ id, fromEventId, toEventId, entityId, label, sourceIds: [sourceId], locator, note });
export const instructionRelations: EventRelation[] = [
  edge('gpt1-uses-transformer', 'gpt-1', 'transformer', undefined, '采用 Transformer 解码器', 'gpt1-paper', '§3.1'),
  edge('bert-uses-transformer', 'bert', 'transformer', undefined, '采用双向 Transformer 编码器', 'bert', '§3.1'),
  edge('t5-uses-transformer', 't5-paper', 'transformer', undefined, '使用编码器—解码器架构', 'release-t5-paper', '§3.1、§3.7'),
  edge('gpt2-scales-gpt1', 'gpt-2', 'gpt-1', undefined, '官方说明是 GPT 的规模扩展', 'release-gpt-2', '正文 GPT-2 is a direct scale-up 段'),
  edge('gpt3-compares-gpt2', 'gpt3-paper', 'gpt-2', undefined, '架构沿用 GPT-2 并调整设置', 'gpt3', '§2.1 Model and Architecture'),
  edge('chinchilla-revisits-scaling', 'chinchilla', 'scaling-laws', undefined, '比较较早的预算分配估计', 'chinchilla', '§2、Appendix D.4'),
  edge('lora-experiments-gpt3', 'lora', 'gpt3-paper', undefined, '用 GPT-3 做适配实验', 'lora', '§5.2 Performance on GPT-3', '实验对象关系，不代表 GPT-3 原始训练采用 LoRA。'),
  edge('cot-is-prompting', 'chain-of-thought', undefined, 'prompt', '通过示例改变提示上下文', 'cot', '§2'),
  edge('instruct-finetunes-gpt3', 'instructgpt', 'gpt3-paper', undefined, '从 GPT-3 开始反馈微调', 'instructgpt', '§3.1、§3.5、Figure 2'),
  edge('chatgpt-uses-instruct-method', 'chatgpt', 'instructgpt', undefined, '沿用 RLHF 方法并调整对话数据', 'chatgpt', 'Methods', '方法关系，不断言两者权重相同。'),
  edge('constitutional-ai-feedback', 'constitutional-ai', undefined, 'alignment', '用原则与 AI 偏好反馈训练', 'constitutional-ai', '§3–4'),
  edge('dpo-alternative-preference', 'dpo', 'instructgpt', undefined, '比较并简化显式奖励与 RL 的偏好流程', 'dpo', '§3–4', '对方法流程的比较，不代表 DPO 取代所有 RLHF。'),
];
export const instructionCollection: Collection = {
  id: 'transformer-to-instructions', title: 'Transformer 到指令遵循', path: '/ai/collections/transformer-to-instructions/',
  description: '2017—2023：区分架构、预训练与算力、任务适配、提示，以及反馈与偏好优化。',
  eventIds: ['transformer', 'gpt-1', 'bert', 'gpt-2', 't5-paper', 'scaling-laws', 'gpt3-paper', 'lora', 'chain-of-thought', 'instructgpt', 'chinchilla', 'chatgpt', 'constitutional-ai', 'dpo'],
  note: '14 个精选节点；11 个复用并补充，3 个新增。年代顺序只用于浏览，关系均另外提供原文依据。BERT、LoRA、提示与偏好优化是不同维度，不能串成一条模型继承链。',
};
