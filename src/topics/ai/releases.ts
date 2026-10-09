import type { Entity, Source, TimelineEvent } from './types';

// Curated release records, checked against the linked primary sources.
// Dates describe the stated release stage, not model snapshot identifiers.
export const releaseResearchDate = '2026-09-30';
type Release = { event: TimelineEvent; source: Source };
type Options = { key?: boolean; kind?: string; baselineId?: string; note?: string; tags?: string[] };
const records: Release[] = [];
function model(id: string, date: string, title: string, family: string, company: string, url: string, baseline: string, improvements: string[], significance: string, tradeoffs: string, options: Options = {}) {
  add(id, date, title, family, company, url, improvements.join('；') + '。', significance, tradeoffs, 'models', options, { baseline, baselineEventId: options.baselineId, improvements, tradeoffs, evidence: options.kind === '论文首发' ? '论文报告' : '厂商报告', sourceIds: [`release-${id}`] });
}
function product(id: string, date: string, title: string, entity: string, company: string, url: string, summary: string, significance: string, limitation: string, options: Options = {}) {
  add(id, date, title, entity, company, url, summary, significance, limitation, 'products', options);
}
function add(id: string, date: string, title: string, entity: string, company: string, url: string, summary: string, significance: string, limitation: string, track: 'models' | 'products', options: Options, change?: TimelineEvent['change']) {
  const sourceId = `release-${id}`;
  records.push({
    source: { id: sourceId, title, publisher: company, url, type: options.kind === '论文首发' ? '原始论文' : '官方公告', checkedAt: releaseResearchDate },
    event: { id, date, title, company, summary, significance, limitation: [limitation, options.note].filter(Boolean).join(' '), tracks: [track], entityIds: [entity], sourceIds: [sourceId], tags: options.tags ?? [], milestone: options.key ?? false, kind: options.kind ?? (track === 'models' ? '模型发布' : '产品更新'), change },
  });
}

// Language pretraining before the conversational-model era.
model('gpt-1', '2018-06-11', 'GPT：生成式语言预训练', 'gpt', 'OpenAI', 'https://openai.com/index/language-unsupervised/', '面向单项任务的监督训练', ['先用无标注文本预训练，再针对语言任务微调'], '生成式预训练成为可复用的语言建模路线。', '这时仍依赖任务微调，不是今天的通用对话产品。', { key: true, tags: ['预训练'] });
model('gpt-2', '2019-02-14', 'GPT-2：零样本任务迁移', 'gpt', 'OpenAI', 'https://openai.com/index/better-language-models/', 'GPT', ['扩大语言模型规模，探索不经任务微调的文本生成与迁移'], '同一语言模型开始展示跨任务使用的可能。', '首次公告采用分阶段开放策略，不能视为完整权重已同时发布。', { key: true, baselineId: 'gpt-1' });
model('gpt-2-full', '2019-11-05', 'GPT-2 完整权重开放', 'gpt', 'OpenAI', 'https://openai.com/index/gpt-2-1-5b-release/', 'GPT-2 分阶段发布', ['公开此前未完整开放的 1.5B 版本权重'], '完整模型可供更广泛的复现与下游研究。', '这是可获得性变化，不是新一代模型。', { baselineId: 'gpt-2', kind: '权重开放' });
model('t5-paper', '2019-10-23', 'T5：统一的文本到文本模型', 't5', 'Google', 'https://arxiv.org/abs/1910.10683', '不同任务采用不同输入输出格式', ['用文本到文本格式统一语言任务', '系统比较预训练目标、数据与迁移方法'], '把任务统一表示与可复用预训练联系起来。', '日期为论文首次提交日，不是某个 API 的上线日。', { key: true, kind: '论文首发' });

// OpenAI: API availability is explicit so it cannot be confused with ChatGPT rollout.
const api = 'https://developers.openai.com/api/docs/changelog';
model('gpt-4-turbo-preview', '2023-11-06', 'GPT-4 Turbo 预览', 'gpt', 'OpenAI', api, 'GPT-4', ['扩展到 128K 上下文', '更新知识范围并降低 API 使用成本'], '更长材料和更低成本改变模型接入方式。', '发布阶段为预览；上下文上限不等于长文信息始终可准确利用。', { key: true, kind: 'API 预览', baselineId: 'gpt-4-report' });
model('gpt-4o-mini', '2024-07-18', 'GPT-4o mini', 'gpt', 'OpenAI', 'https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/', 'GPT-3.5 Turbo 档位', ['提供低成本文本与视觉输入模型'], '轻量模型扩大高频调用和组合工作流的适用范围。', '小模型档位不等同于 GPT-4o 的全部能力。');
model('o1-preview', '2024-09-12', 'o1-preview / o1-mini', 'gpt', 'OpenAI', 'https://openai.com/index/introducing-openai-o1-preview/', '直接生成答案的通用模型', ['引入在回答前投入更多计算的推理模型'], '推理时计算成为模型能力演进的独立维度。', '预览版功能和速率受限，推理耗时也更长。', { key: true, kind: '研究预览', tags: ['推理'] });
model('o1-api', '2024-12-17', 'o1 开放 API', 'gpt', 'OpenAI', api, 'o1-preview', ['API 增加视觉输入、工具调用与结构化输出支持'], '推理能力开始接入更完整的开发工作流。', '记录 API 日期，与 ChatGPT 中的发布阶段区分。', { baselineId: 'o1-preview', kind: 'API 开放' });
model('o3-mini', '2025-01-31', 'o3-mini', 'gpt', 'OpenAI', 'https://openai.com/index/openai-o3-mini/', 'o1-mini', ['小型推理模型提供可选推理强度', '面向数学、科学和编程任务'], '推理预算与响应速度可以按任务取舍。', '发布时不支持视觉；不是所有任务都需要高推理强度。', { key: true });
model('gpt-4-5', '2025-02-27', 'GPT-4.5 研究预览', 'gpt', 'OpenAI', 'https://openai.com/index/introducing-gpt-4-5/', 'GPT-4o', ['扩大预训练路线，侧重知识、自然对话和指令理解'], '展示预训练扩展与专门推理模型并行发展的路线。', '较高成本的研究预览，不宜与推理模型视为同一种升级。', { kind: '研究预览', baselineId: 'gpt-4o-api' });
model('gpt-4-1', '2025-04-14', 'GPT-4.1 系列', 'gpt', 'OpenAI', 'https://openai.com/index/gpt-4-1/', 'GPT-4o 系列', ['强化编程和指令遵循', '提供长上下文与 mini、nano 档位'], '开发者可按任务复杂度选择不同模型规模。', '长上下文能力依任务而变；各档位不能共用一个性能结论。', { key: true, kind: 'API 开放', baselineId: 'gpt-4o-api' });
model('o3-o4-mini', '2025-04-16', 'o3 / o4-mini', 'gpt', 'OpenAI', 'https://openai.com/index/introducing-o3-and-o4-mini/', 'o1 / o3-mini', ['增强推理与视觉问题处理', '支持结合工具完成多步任务'], '推理模型与行动工具进一步结合。', '工具、思考预算与评测环境都会影响结果。', { key: true, baselineId: 'o3-mini' });
model('gpt-5-api', '2025-08-07', 'GPT-5 系列 API', 'gpt', 'OpenAI', 'https://developers.openai.com/api/docs/models/gpt-5', 'GPT-4.1 / o 系列', ['统一提供可调推理与工具使用的模型档位'], '通用开发和推理工作流获得新的系列入口。', '此条记录 API 发布，不把应用路由策略视为单一模型属性。', { key: true, kind: 'API 开放' });
model('gpt-5-1-api', '2025-11-13', 'GPT-5.1 API', 'gpt', 'OpenAI', 'https://developers.openai.com/api/docs/models/gpt-5.1', 'GPT-5', ['改善可控性与编程工作流', '支持更灵活的推理投入'], '同系列开始优化任务耗时与指令执行。', 'API 日期与 ChatGPT 推送日期可能不同。', { baselineId: 'gpt-5-api', kind: 'API 开放' });
model('gpt-5-2-api', '2025-12-11', 'GPT-5.2 API', 'gpt', 'OpenAI', 'https://developers.openai.com/api/docs/models/gpt-5.2', 'GPT-5.1', ['改进长上下文、工具调用与专业工作任务'], '模型评估更侧重连续完成实际工作。', '厂商报告的收益依任务和推理预算而变。', { baselineId: 'gpt-5-1-api', kind: 'API 开放' });
model('gpt-5-3-codex-api', '2026-02-24', 'GPT-5.3-Codex API', 'gpt', 'OpenAI', 'https://developers.openai.com/api/docs/models/gpt-5.3-codex', 'GPT-5.2-Codex', ['面向持续编程与工具执行的专用模型更新'], '编码模型与 Codex 产品本身分开追踪。', '记录 API 可用日，不是 Codex 客户端首次提供该模型的日期。', { kind: 'API 开放' });
model('gpt-5-4-api', '2026-03-05', 'GPT-5.4 API', 'gpt', 'OpenAI', 'https://developers.openai.com/api/docs/models/gpt-5.4', 'GPT-5.2', ['增加原生电脑使用和工具搜索能力', '扩展长上下文支持'], '模型与电脑操作工作流的结合更加直接。', '电脑使用仍需配套运行环境、授权和结果检查。', { key: true, baselineId: 'gpt-5-2-api', kind: 'API 开放' });
model('gpt-5-5-api', '2026-04-24', 'GPT-5.5 API', 'gpt', 'OpenAI', 'https://developers.openai.com/api/docs/models/gpt-5.5', 'GPT-5.4', ['更新长任务中的工具、Skills 与上下文压缩支持'], '模型更新更关注跨步骤执行的连续性。', '功能受 API 和客户端支持范围影响。', { baselineId: 'gpt-5-4-api', kind: 'API 开放' });
model('gpt-5-6-api', '2026-07-09', 'GPT-5.6：Sol / Terra / Luna', 'gpt', 'OpenAI', api, 'GPT-5.5', ['引入分档模型与程序化工具工作流'], '能力、运行成本与任务规模形成新的分档选择。', '各档位能力不同；多 Agent 等配套能力需区分测试阶段。', { baselineId: 'gpt-5-5-api', kind: 'API 开放' });
model('gpt-6-astra-api', '2026-09-03', 'GPT-6 Astra API', 'gpt', 'OpenAI', api, 'GPT-5.6 系列', ['面向复杂端到端任务的高能力档位'], '模型发布进一步围绕完整工作成果展开。', '高能力档位仍需要权衡任务成本与延迟。', { baselineId: 'gpt-5-6-api', kind: 'API 开放' });
model('gpt-6-sol-luna-api', '2026-09-22', 'GPT-6 Sol / Luna API', 'gpt', 'OpenAI', api, 'GPT-6 Astra 档位', ['补充面向不同成本和任务复杂度的文本、图像模型'], '同代模型不再只有单一旗舰选择。', '这是系列档位扩展，不能推断低成本版本全面超过 Astra。', { baselineId: 'gpt-6-astra-api', kind: 'API 开放' });
model('gpt-6-1-sol-api', '2026-09-29', 'GPT-6.1 Sol API', 'gpt', 'OpenAI', api, 'GPT-6 Sol', ['更新编程与专业工作档位，强调任务成本效率'], '可将新版本与同档位的既有工作流比较。', '实际收益需要在相同任务、工具与预算下验证。', { baselineId: 'gpt-6-sol-luna-api', kind: 'API 开放' });

// Claude: small/large model branches and release dates remain distinct.
const anthropic = 'https://www.anthropic.com/news/';
model('claude-1', '2023-03-14', 'Claude / Claude Instant', 'claude', 'Anthropic', anthropic + 'introducing-claude', 'Claude 系列首次公开发布', ['提供通用与低延迟对话模型档位'], 'Claude 的产品化模型谱系由此展开。', '首次公开产品公告不代表该研究方向的起点。', { key: true });
model('claude-3-haiku', '2024-03-13', 'Claude 3 Haiku', 'claude', 'Anthropic', anthropic + 'claude-3-haiku', 'Claude Instant', ['增加视觉输入并面向低延迟任务'], '补齐 Claude 3 系列的轻量档位。', '速度与能力的权衡不同于 Opus 档位。');
model('opus-4-1', '2025-08-05', 'Claude Opus 4.1', 'claude', 'Anthropic', anthropic + 'claude-opus-4-1', 'Claude Opus 4', ['改进复杂编程、推理与多文件任务'], '旗舰模型更侧重真实代码库中的连续工作。', '厂商评估依赖所配备的工具与工作流。', { baselineId: 'opus-4' });
model('haiku-4-5', '2025-10-15', 'Claude Haiku 4.5', 'claude', 'Anthropic', anthropic + 'claude-haiku-4-5', 'Claude 3.5 Haiku', ['更新轻量模型的编程和工具执行能力'], '低延迟模型可以承担更多 Agent 子任务。', '轻量档位并不适用于所有复杂规划任务。');
model('opus-4-5', '2025-11-24', 'Claude Opus 4.5', 'claude', 'Anthropic', anthropic + 'claude-opus-4-5', 'Claude Opus 4.1', ['改进编码、电脑操作与 Agent 工作流'], '旗舰能力继续向实际任务执行扩展。', '模型快照标识中的日期不是公告日期。', { key: true, baselineId: 'opus-4-1' });
model('opus-4-6', '2026-02-05', 'Claude Opus 4.6', 'claude', 'Anthropic', anthropic + 'claude-opus-4-6', 'Claude Opus 4.5', ['加强长任务与代码审查、调试', '提供百万 token 上下文测试能力'], '更大上下文服务于项目级工程任务。', '长上下文功能发布时处于测试阶段，不能省略可用条件。', { baselineId: 'opus-4-5' });
model('opus-4-7', '2026-04-16', 'Claude Opus 4.7', 'claude', 'Anthropic', anthropic + 'claude-opus-4-7', 'Claude Opus 4.6', ['改进复杂编程和高分辨率视觉处理'], '视觉输入与工程任务继续在同一模型中结合。', '任务成功率仍依赖输入、工具与验证机制。', { baselineId: 'opus-4-6' });
model('sonnet-5-5', '2026-09-28', 'Claude Sonnet 5.5', 'claude', 'Anthropic', 'https://www.anthropic.com/claude-sonnet-5-5', 'Claude Sonnet 5', ['改进编程和知识工作', '强调响应速度与任务 token 效率'], '关注同等工作量下的执行效率。', '厂商的平均效率数据不能直接换算成所有用户的节省比例。', { baselineId: 'sonnet-5' });

const google = 'https://blog.google/';
model('gemini-1', '2023-12-06', 'Gemini 1.0', 'gemini', 'Google', google + 'technology/ai/google-gemini-ai/', 'Gemini 系列首次公布', ['公布面向不同运行环境的原生多模态系列'], '语言、图像等输入成为同一模型家族的设计目标。', 'Ultra、Pro、Nano 的公布与实际可用阶段并不完全相同。', { key: true });
model('gemini-2-5-pro', '2025-03-25', 'Gemini 2.5 Pro 实验版', 'gemini', 'Google', google + 'innovation-and-ai/models-and-research/google-deepmind/gemini-model-thinking-updates-march-2025/', 'Gemini 2.0', ['引入思考模型路线，强化推理与代码任务'], 'Gemini 进入显式推理计算的新阶段。', '本条为实验版日期，不等于全系列正式开放。', { key: true, kind: '实验版', baselineId: 'gemini-2-0' });
model('gemini-3', '2025-11-18', 'Gemini 3 预览', 'gemini', 'Google', google + 'products-and-platforms/products/gemini/gemini-3-gemini-app/', 'Gemini 2.5', ['更新复杂推理、多模态理解与交互生成'], '模型升级与新的任务交互方式同时推进。', '不同产品入口的开放范围可能不同。', { key: true, kind: '预览发布', baselineId: 'gemini-2-5-pro' });
model('gemini-3-1-pro', '2026-02-19', 'Gemini 3.1 Pro 预览', 'gemini', 'Google', google + 'innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/', 'Gemini 3 Pro', ['针对复杂问题强化推理能力'], '在同一系列中继续优化困难任务处理。', '本条记录预览发布，不将厂商评测等同于所有实际场景。', { kind: '预览发布', baselineId: 'gemini-3' });
model('gemma-1', '2024-02-21', 'Gemma 开放模型', 'gemma', 'Google', google + 'technology/developers/gemma-open-models/', 'Gemma 系列首次发布', ['提供可部署的轻量语言模型及开发工具'], 'Google 的开放权重路线与 Gemini 服务并行。', '使用需遵循 Gemma 条款，开放权重不等于无条件开放。', { key: true });
model('gemma-2', '2024-06-27', 'Gemma 2', 'gemma', 'Google', google + 'technology/developers/google-gemma-2/', 'Gemma', ['更新模型架构，提供更强的中小规模档位'], '关注可部署模型的能力与计算成本。', '实际推理需求随模型规模和量化方式变化。', { baselineId: 'gemma-1' });
model('gemma-3', '2025-03-12', 'Gemma 3', 'gemma', 'Google', google + 'technology/developers/gemma-3/', 'Gemma 2', ['系列扩展视觉理解、多语言与长上下文支持'], '小规模可部署模型覆盖更多输入形式。', '不同尺寸支持的模态和上下文不同，不能一概而论。', { key: true, baselineId: 'gemma-2' });

const meta = 'https://ai.meta.com/blog/';
model('llama-1', '2023-02-24', 'LLaMA 首次公布', 'llama', 'Meta', meta + 'large-language-model-llama-meta-ai/', 'LLaMA 系列首次发布', ['提供多个规模的基础语言模型研究路线'], '推动可研究、可适配的基础模型生态。', '最初权重访问受申请和研究许可限制。', { key: true });
model('llama-3-2', '2024-09-25', 'Llama 3.2：视觉与端侧', 'llama', 'Meta', meta + 'llama-3-2-connect-2024-vision-edge-mobile-devices/', 'Llama 3.1', ['增加轻量文本模型和独立的视觉模型档位'], '端侧部署与视觉理解在同一系列中分支发展。', '1B/3B 文本模型与 11B/90B 视觉模型能力不同。', { key: true, baselineId: 'llama-3-1' });
model('llama-3-3', '2024-12', 'Llama 3.3 70B', 'llama', 'Meta', meta + 'future-of-ai-built-with-llama/', 'Llama 3.1 70B', ['改进中大型文本模型的指令任务表现'], '以较小部署规模争取更强的文本能力。', '采用官方回顾确认发布月份，不补猜具体日；不是视觉模型更新。', { baselineId: 'llama-3-1' });
model('llama-4', '2025-04-05', 'Llama 4 Scout / Maverick', 'llama', 'Meta', meta + 'llama-4-multimodal-intelligence/', 'Llama 3 系列', ['采用多模态混合专家架构', '提供不同容量和上下文档位'], 'Llama 的架构和原生多模态路线发生明显变化。', '公告中的模型与未同步开放的研究型号需区分；许可仍有条件。', { key: true });

const mistral = 'https://mistral.ai/news/';
model('mistral-7b', '2023-09-27', 'Mistral 7B', 'mistral', 'Mistral AI', mistral + 'announcing-mistral-7b/', 'Mistral 首次开放语言模型', ['以较小参数规模提供可部署基础模型'], '欧洲团队进入开放语言模型生态。', '基础版与指令版需区分，部署效果依微调和推理配置。', { key: true });
model('mistral-large', '2024-02-26', 'Mistral Large', 'mistral', 'Mistral AI', mistral + 'mistral-large/', 'Mistral 已有开放模型', ['推出面向复杂推理、多语言与工具使用的旗舰服务'], '开放模型与商业 API 产品形成并行路线。', '不能将其他 Mistral 模型的开放许可套用到该版本。');
model('mistral-large-2', '2024-07-24', 'Mistral Large 2', 'mistral', 'Mistral AI', mistral + 'mistral-large-2407/', 'Mistral Large', ['加强代码、多语言和长上下文处理'], '旗舰模型面向更多工程使用场景。', '研究许可与商业部署条件需分别确认。', { baselineId: 'mistral-large' });
model('devstral', '2025-05-21', 'Devstral：软件工程模型', 'mistral', 'Mistral AI', mistral + 'devstral/', '通用代码生成模型', ['针对代码仓库与软件工程 Agent 任务训练'], '代码模型从补全文本走向仓库任务。', '模型能力需要与 Agent 运行环境配合，不能直接视为完整产品。', { key: true });
model('magistral', '2025-06-10', 'Magistral：多语言推理', 'mistral', 'Mistral AI', mistral + 'magistral/', 'Mistral 通用模型路线', ['提供专门推理模型及不同服务档位'], '欧洲模型路线也扩展推理时计算。', '不同档位的许可与服务条件不同。');
model('devstral-2', '2025-12-09', 'Devstral 2', 'mistral', 'Mistral AI', mistral + 'devstral-2-vibe-cli/', 'Devstral', ['扩展软件工程模型系列及轻量选择'], '配合 Vibe CLI 形成模型与工具一体的开发入口。', '模型系列和 Vibe CLI 是同次公告的不同对象。', { baselineId: 'devstral' });

// China: follow continuous model families, including specialist branches.
const qwen = 'https://qwenlm.github.io/blog/';
model('qwen-1-5', '2024-02-04', 'Qwen1.5', 'qwen', '阿里巴巴', qwen + 'qwen1.5/', 'Qwen 初代', ['改善对话偏好、多语言与部署生态'], '通义千问扩展开放模型的规模选择。', '不同规模的能力和部署成本差异较大。');
model('qwen-2', '2024-06-07', 'Qwen2', 'qwen', '阿里巴巴', qwen + 'qwen2/', 'Qwen1.5', ['增强多语言、编程与数学能力', '部分版本扩展长上下文'], '形成较完整的多规模开放模型家族。', '最长上下文不适用于系列中的每个版本。', { key: true, baselineId: 'qwen-1-5' });
model('qwen-2-vl', '2024-08-29', 'Qwen2-VL', 'qwen', '阿里巴巴', qwen + 'qwen2-vl/', 'Qwen-VL', ['处理不同分辨率图像与视频', '探索视觉 Agent 交互'], '视觉语言模型成为独立演进分支。', '视觉理解成绩不等同于真实设备操作成功率。', { key: true });
model('qwen-2-5-coder', '2024-11-12', 'Qwen2.5-Coder 完整系列', 'qwen', '阿里巴巴', qwen + 'qwen2.5-coder-family/', 'Qwen2.5-Coder 已有档位', ['补齐多规模编程模型，增强代码生成、修复与推理'], '开发者可以按部署预算选择编程专用模型。', '这是完整系列公告，不能视为所有尺寸的首次出现。');
model('qwen-2-5-vl', '2025-01', 'Qwen2.5-VL', 'qwen', '阿里巴巴', qwen + 'qwen2.5-vl/', 'Qwen2-VL', ['加强文档、视频与界面理解', '改善视觉定位和工具交互'], '多模态能力与 GUI 工作流联系更紧密。', '页面元数据与传播日期存在差异，本条保留月份精度。', { baselineId: 'qwen-2-vl' });
model('qwq-32b', '2025-03-06', 'QwQ-32B', 'qwen', '阿里巴巴', qwen + 'qwq-32b/', 'QwQ 预览路线', ['通过强化学习增强推理能力'], '中等规模开放模型探索推理计算收益。', '较长思考可能增加等待和 token 消耗。', { key: true, tags: ['推理'] });
model('qwen-3-coder', '2025-07', 'Qwen3-Coder', 'qwen', '阿里巴巴', qwen + 'qwen3-coder/', 'Qwen2.5-Coder', ['面向代码 Agent 与工具使用训练', '扩展仓库级上下文处理'], '编程模型开始与执行型开发工具共同发布。', '原文元数据与发布时区存在日差，本条保留月份；扩展上下文与原生窗口需区分。', { key: true, baselineId: 'qwen-2-5-coder' });

const ds = 'https://api-docs.deepseek.com/news/';
model('deepseek-coder-paper', '2024-01-25', 'DeepSeek-Coder 技术论文', 'deepseek', 'DeepSeek', 'https://arxiv.org/abs/2401.14196', '通用语言模型的代码能力', ['采用项目级代码预训练和填空式任务'], '为开放代码模型提供系统化训练与评估材料。', '这是论文日期，不是模型权重最早发布日期。', { kind: '论文首发' });
model('deepseek-coder-v2-paper', '2024-06-17', 'DeepSeek-Coder-V2 技术论文', 'deepseek', 'DeepSeek', 'https://arxiv.org/abs/2406.11931', 'DeepSeek-Coder', ['采用混合专家模型，增强代码和数学能力'], '代码专用路线与 DeepSeek-V2 基础架构结合。', '论文成绩受评测条件影响；与通用聊天版本分开理解。', { kind: '论文首发', baselineId: 'deepseek-coder-paper' });
model('deepseek-v2-5', '2024-09-05', 'DeepSeek-V2.5', 'deepseek', 'DeepSeek', ds + 'news0905/', 'DeepSeek-V2 / Coder-V2', ['合并通用对话与编程能力', '改进写作和指令遵循'], '通用与编程模型路线汇合。', '系统提示与输出习惯可能变化，旧应用需要回归验证。', { baselineId: 'deepseek-coder-v2-paper' });
model('deepseek-v3-0324', '2025-03-25', 'DeepSeek-V3-0324 更新公告', 'deepseek', 'DeepSeek', ds + 'news250325/', 'DeepSeek-V3', ['更新推理、前端开发与工具使用', '权重改用 MIT 许可'], '能力与许可条件同时变化。', '0324 是版本标识；本条采用官方更新公告日期。', { baselineId: 'deepseek-v3-paper' });
model('deepseek-v3-1', '2025-08-21', 'DeepSeek-V3.1', 'deepseek', 'DeepSeek', ds + 'news250821/', 'DeepSeek-V3', ['统一思考与非思考模式', '增强工具调用与 Agent 任务能力'], '推理与工具使用进入同一模型工作流。', '思考模式和工具调用接口需要按官方要求组合。', { key: true, baselineId: 'deepseek-v3-0324' });
model('deepseek-v3-2-exp', '2025-09-29', 'DeepSeek-V3.2-Exp', 'deepseek', 'DeepSeek', ds + 'news250929/', 'DeepSeek-V3.1-Terminus', ['引入稀疏注意力以降低长上下文计算负担'], '模型发布开始强调长上下文的运行效率。', '这是实验版本，不能与后续正式版混同。', { kind: '实验版' });
model('deepseek-v3-2', '2025-12-01', 'DeepSeek-V3.2', 'deepseek', 'DeepSeek', ds + 'news251201/', 'DeepSeek-V3.2-Exp', ['结合稀疏注意力、推理和 Agent 任务训练'], '长上下文效率与工具执行继续整合。', '专门强化推理的变体与通用工具版本适用条件不同。', { key: true, baselineId: 'deepseek-v3-2-exp' });
model('deepseek-v4-preview', '2026-04-24', 'DeepSeek-V4 Pro / Flash 预览', 'deepseek', 'DeepSeek', ds + 'news260424/', 'DeepSeek-V3.2', ['扩展到百万 token 上下文', '推出 Pro / Flash 档位并强化 Agent 能力'], '不同计算预算下的长任务模型形成分档。', '本条为预览版本，正式版另有升级事件。', { key: true, kind: '预览发布', baselineId: 'deepseek-v3-2' });
model('deepseek-v4-pro-ga', '2026-08-13', 'DeepSeek-V4-Pro 正式版', 'deepseek', 'DeepSeek', ds + 'news260813/', 'DeepSeek-V4 预览', ['增加推理强度设置与 Responses API 支持'], '模型接口向现有 Agent 工具生态靠拢。', '价格调整的生效时间晚于公告日，不能混用。', { kind: '正式开放', baselineId: 'deepseek-v4-preview' });
model('deepseek-v4-1-flash', '2026-09-10', 'DeepSeek-V4.1-Flash', 'deepseek', 'DeepSeek', ds + 'news260910/', 'DeepSeek-V4-Flash', ['采用新的非对称编码解码架构', '增加原生视觉并降低缓存需求'], '视觉与长任务的计算效率同时演进。', '旧 API 名称的临时路由不代表旧模型仍在提供服务。', { baselineId: 'deepseek-v4-preview' });

const kimi = 'https://www.kimi.com/blog/';
model('kimi-k1-5-paper', '2025-01-22', 'Kimi k1.5 技术论文', 'kimi', '月之暗面', 'https://arxiv.org/abs/2501.12599', 'Kimi 既有语言模型', ['探索长上下文强化学习与多模态推理'], 'Kimi 的推理训练路线形成公开技术材料。', '论文首次提交日与产品宣传日期分开记录。', { key: true, kind: '论文首发' });
model('kimi-k2-thinking', '2025-11-06', 'Kimi K2 Thinking', 'kimi', '月之暗面', kimi + 'kimi-k2-thinking', 'Kimi K2', ['将深度思考与多轮工具调用结合'], '开放模型探索更长的自主研究和执行过程。', '多轮任务的成本与成功率受工具环境影响。', { key: true, baselineId: 'kimi-k2' });
model('kimi-k2-5', '2026-01-27', 'Kimi K2.5', 'kimi', '月之暗面', kimi + 'kimi-k2-5', 'Kimi K2 / K2 Thinking', ['增加原生视觉理解', '支持视觉编程与多 Agent 任务路线'], '视觉输入、代码与协作执行进入同一模型系列。', '模型权重与托管 Agent Swarm 产品的可用能力不能混同。', { key: true, baselineId: 'kimi-k2-thinking' });
model('kimi-k2-6', '2026-04-20', 'Kimi K2.6', 'kimi', '月之暗面', kimi + 'kimi-k2-6', 'Kimi K2.5', ['加强持续编程与复杂工具任务'], '长任务的完成质量成为系列升级重点。', '厂商演示的长任务时间不能保证所有任务的成功率。', { baselineId: 'kimi-k2-5' });
model('kimi-k3', '2026-07-16', 'Kimi K3 公布', 'kimi', '月之暗面', kimi + 'kimi-k3', 'Kimi K2.6', ['更新原生视觉与百万 token 上下文能力'], '系列继续扩展跨模态长任务处理。', '此处为公告日期，不把随后权重开放日期合并为同一天。', { baselineId: 'kimi-k2-6', kind: '模型公告' });

const glmNotes = 'https://docs.z.ai/release-notes/new-released';
model('glm-4-5v', '2025-08-11', 'GLM-4.5V', 'glm', '智谱', glmNotes, 'GLM-4.5 文本路线', ['增加视觉推理、定位与 GUI 任务支持'], 'GLM 扩展视觉分支。', '不能将视觉任务成绩直接等同于 Agent 成功率。');
model('glm-4-6', '2025-09-30', 'GLM-4.6', 'glm', '智谱', glmNotes, 'GLM-4.5', ['改进编程并扩展上下文'], '服务更大代码库。', '实际收益依任务而变。', { baselineId: 'glm-4-5' });
model('glm-4-7', '2025-12-22', 'GLM-4.7', 'glm', '智谱', glmNotes, 'GLM-4.6', ['加强编码、推理与多步执行'], '面向端到端开发。', '评测环境影响结果。', { baselineId: 'glm-4-6' });
model('glm-5', '2026-02-12', 'GLM-5', 'glm', '智谱', glmNotes, 'GLM-4.7', ['面向系统工程与长程 Agent 任务'], '关注项目级工程。', '采用官方更新日志日期。', { key: true, baselineId: 'glm-4-7' });
model('glm-5-1', '2026-04-07', 'GLM-5.1', 'glm', '智谱', glmNotes, 'GLM-5', ['优化持续规划、执行与修正'], '改善长任务连续性。', '持续运行不保证正确交付。', { baselineId: 'glm-5' });
model('glm-5-2', '2026-06-16', 'GLM-5.2', 'glm', '智谱', glmNotes, 'GLM-5.1', ['扩展长上下文和深度调试'], '支持更大项目。', '窗口大小不等于有效记忆。', { baselineId: 'glm-5-1' });
model('glm-5-3', '2026-08-18', 'GLM-5.3', 'glm', '智谱', glmNotes, 'GLM-5.2', ['更新编码与代码审查能力'], '深化工程任务支持。', '不引用跨设置的排名比较。', { baselineId: 'glm-5-2' });
model('glm-5-3-flash', '2026-08-26', 'GLM-5.3-Flash', 'glm', '智谱', glmNotes, 'GLM-5.3 系列', ['增加高效视觉与界面反馈处理'], '连接代码、浏览器和 GUI。', '轻量档位另有能力权衡。', { baselineId: 'glm-5-3' });

const minimax = 'https://www.minimax.io/news/';
model('minimax-m2', '2025-10-27', 'MiniMax-M2', 'minimax', 'MiniMax', minimax + 'minimax-m2', 'MiniMax-M1', ['聚焦编程与 Agent 的多步执行'], '模型与托管 Agent 产品共同升级。', '模型本身不包含所有托管产品的工具和连接器。', { key: true, baselineId: 'minimax-m1' });
model('minimax-m2-1', '2025-12-23', 'MiniMax-M2.1', 'minimax', 'MiniMax', minimax + 'minimax-m21', 'MiniMax-M2', ['增强多语言编程和应用开发能力'], '编程任务覆盖面继续扩展。', '不同编程语言和项目规模的提升并不相同。', { baselineId: 'minimax-m2' });
model('minimax-m2-5', '2026-02-12', 'MiniMax-M2.5', 'minimax', 'MiniMax', minimax + 'minimax-m25', 'MiniMax-M2.1', ['加强编程、搜索与办公工具任务'], 'Agent 模型从代码继续走向专业工作。', '工具可用性及运行预算直接影响结果。', { baselineId: 'minimax-m2-1' });
model('exaone-3', '2024-08-07', 'EXAONE 3.0 研究权重开放', 'exaone', 'LG AI Research', 'https://github.com/LG-AI-EXAONE/EXAONE-3.0', 'EXAONE 既有闭源路线', ['公开韩英双语指令模型研究权重'], '增加韩国团队的开放模型路线。', '研究用途许可不等于无限制商业许可。', { key: true, kind: '权重开放' });

// Agent applications: research systems, product launches and major upgrades.
product('generative-agents-paper', '2023-04-07', 'Generative Agents：记忆、反思与规划', 'generative-agents', 'Stanford / Google Research', 'https://arxiv.org/abs/2304.03442', '研究者在模拟小镇中构建具有记忆、反思和规划机制的语言模型角色。', '把持续状态和自主行动组合成可观察的 Agent 系统。', '这是模拟环境中的研究原型，不是通用生产力产品。', { key: true, kind: '论文首发', tags: ['研究原型', '记忆', '多 Agent'] });
product('swe-agent-paper', '2024-05-06', 'SWE-agent：为 Agent 设计电脑接口', 'swe-agent', 'Princeton / Stanford', 'https://arxiv.org/abs/2405.15793', '开源研究系统通过专门的编辑、导航和执行接口处理软件工程任务。', '说明工具接口设计本身会影响 Agent 的任务表现。', '论文日期不是仓库首次建立日期；评测修复率不能直接代表所有项目。', { key: true, kind: '论文首发', tags: ['开源', '编码'] });
product('openhands-paper', '2024-07-23', 'OpenDevin / OpenHands 平台论文', 'openhands', 'OpenHands 社区', 'https://arxiv.org/abs/2407.16741', '平台将代码编辑、终端、浏览器和沙箱环境组织成软件开发 Agent 的执行空间。', '开源执行平台使 Agent 的环境与运行方式可以复用。', '采用论文首次提交日；论文后续版本使用 OpenHands 名称，不把更名日期倒推到首稿。', { key: true, kind: '论文首发', tags: ['开源', '编码', '执行环境'] });
product('autoglm-paper', '2024-10-28', 'AutoGLM：浏览器与手机 GUI Agent', 'autoglm', '智谱', 'https://arxiv.org/abs/2411.00820', 'AutoGLM 研究通过界面观察、规划和操作来执行浏览器与手机任务。', '中国团队的 GUI Agent 路线形成公开技术材料。', '研究论文不是所有用户都可使用的商业产品公告。', { key: true, kind: '论文首发', tags: ['GUI', '手机', '研究原型'] });
product('autoglm-phone-multilingual', '2025-12-11', 'AutoGLM-Phone 多语言版', 'autoglm', '智谱', glmNotes, '手机自动化框架增加中英文任务支持。', '扩展手机 Agent 使用范围。', '需要设备连接和相应授权。', { tags: ['手机', '多语言'] });
product('replit-agent-first', '2024-09', 'Replit Agent 首次推出', 'replit-agent', 'Replit', 'https://replit.com/blog/introducing-replit-agent', '用户用自然语言描述需求，Agent 在 Replit 中搭建应用并配置运行环境。', '应用开发从逐段生成代码走向任务式构建。', '官方回顾写于推出之后，本条仅确认首次发布月份。', { key: true, kind: '产品发布' });
product('replit-agent-3', '2025-09-10', 'Replit Agent 3', 'replit-agent', 'Replit', 'https://replit.com/blog/introducing-agent-3-our-most-autonomous-agent-yet', 'Agent 增加通过浏览器测试应用、检查结果并修复的能力。', '构建、运行、验证和修复形成更完整的循环。', '自动测试不能代替业务验收；复杂任务仍可能失败。', { key: true, tags: ['编码', '验证循环'] });
product('replit-agent-4', '2026-03-11', 'Replit Agent 4', 'replit-agent', 'Replit', 'https://replit.com/blog/introducing-agent-4-built-for-creativity', '将创意探索、设计迭代与并行开发工作结合。', 'Agent 产品从单任务执行扩展到协作创作流程。', '实际可用性受工作区和产品套餐影响。');
product('devin-2', '2025-04-03', 'Devin 2.0', 'devin', 'Cognition', 'https://cognition.ai/blog/devin-2', '发布新的 Agent 开发环境，让用户同时观察任务计划、代码与执行进度。', '人与编码 Agent 的协作界面成为产品升级重点。', '后台自主执行仍需要明确任务范围与代码审查。');
product('cursor-background-preview', '2025-05-15', 'Cursor Background Agents 预览', 'cursor', 'Cursor', 'https://cursor.com/changelog/0-50', '在独立远程环境中异步运行编码任务。', '编码 Agent 从编辑器内互动扩展到后台执行。', '发布时为早期预览，并非所有用户同时开放。', { key: true, kind: '早期预览' });
product('cursor-1', '2025-06-04', 'Cursor 1.0：后台 Agent 与 Bugbot', 'cursor', 'Cursor', 'https://cursor.com/changelog/1-0', '扩大后台 Agent 可用范围，并推出面向代码审查的 Bugbot。', 'Agent 工作流从写代码延伸到审查环节。', '后台任务和审查产品的使用条件需分别确认。');
product('cursor-2', '2025-10-29', 'Cursor 2.0：并行 Agent', 'cursor', 'Cursor', 'https://cursor.com/changelog/2-0', '采用新的 Agent 界面，支持并行运行多个编码任务，并引入 Composer 模型。', '开发者从操作单个助手转向协调多项执行任务。', '并行任务仍需要处理分支冲突和最终合并审查。', { key: true, tags: ['编码', '多 Agent'] });
product('gemini-cli', '2025-06-25', 'Gemini CLI 开源', 'gemini-cli', 'Google', google + 'innovation-and-ai/technology/developers-tools/introducing-gemini-cli-open-source-ai-agent/', '将 Gemini 接入终端，支持文件、命令和开发工具工作流。', '终端 Agent 生态增加开源实现。', '开源客户端不意味着模型推理服务不受配额和条款限制。', { key: true, kind: '开源发布', tags: ['编码', '终端'] });
product('qwen-code', '2025-07', 'Qwen Code 发布', 'qwen-code', '阿里巴巴', qwen + 'qwen3-coder/', '随 Qwen3-Coder 推出基于 Gemini CLI 改造的编码 Agent 工具。', '开放模型与可运行的终端工具共同进入开发工作流。', '这是产品工具事件；对应模型在模型轨道独立记录。', { key: true, kind: '开源发布', tags: ['编码', '终端'] });
product('trae-solo', '2025-07-17', 'TRAE SOLO 模式', 'trae', '字节跳动', 'https://www.trae.ai/blog/product_solo', '将需求、编辑器、终端、浏览器与部署进度整合为任务执行界面。', '编码工具开始围绕从需求到交付的全过程组织。', '发布时的访问资格与后续全面开放阶段应区分。', { key: true, kind: '产品发布', tags: ['编码', '工作空间'] });
product('mistral-vibe', '2025-12-09', 'Mistral Vibe CLI', 'mistral-vibe', 'Mistral AI', mistral + 'devstral-2-vibe-cli/', '随 Devstral 2 发布开源终端编码工具，连接模型、代码库和开发命令。', '欧洲团队提供完整的模型与编码 Agent 入口。', '运行模型的服务与部署成本独立于 CLI 许可。', { key: true, kind: '开源发布', tags: ['编码', '终端'] });
product('operator-preview', '2025-01-23', 'Operator 研究预览', 'chatgpt-agent', 'OpenAI', 'https://openai.com/index/introducing-operator/', 'Agent 使用自己的浏览器，通过观察、点击和输入执行网页任务。', '电脑界面成为通用任务 Agent 的操作对象。', '最初仅向美国 Pro 用户开放研究预览，重要操作仍需用户介入。', { key: true, kind: '研究预览', tags: ['浏览器', '通用任务'] });
product('chatgpt-agent-launch', '2025-07-17', 'ChatGPT agent', 'chatgpt-agent', 'OpenAI', 'https://openai.com/index/introducing-chatgpt-agent/', '整合研究、浏览器操作与终端工具，在同一任务中选择并执行多个步骤。', '资料研究与实际行动被连接成一个工作流。', '存在分批开放和操作确认机制，不能理解为无条件自动执行。', { key: true, kind: '产品发布', tags: ['浏览器', '研究', '通用任务'] });
product('claude-code-web', '2025-10-20', 'Claude Code 网页研究预览', 'claude-code', 'Anthropic', 'https://claude.com/blog/claude-code-on-the-web', '用户可在网页中委派后台编码任务，连接代码仓库并查看变更。', '终端编码 Agent 增加云端异步使用入口。', '记录最初研究预览，不把文章后续的正式开放更新倒填到这一天。', { key: true, kind: '研究预览', tags: ['编码', '云端任务'] });
product('claude-code-agent-teams', '2026-02-05', 'Claude Code Agent Teams 预览', 'claude-code', 'Anthropic', anthropic + 'claude-opus-4-6', '多个 Agent 可以分配任务、协同处理代码工作。', '编码 Agent 从单个执行循环扩展到协作执行。', '以研究预览推出；并行协作会增加计算成本与协调需求。', { kind: '研究预览', tags: ['编码', '多 Agent'] });
product('manus-wide-research', '2025-07-31', 'Manus Wide Research', 'manus', 'Manus', 'https://manus.im/blog/introducing-wide-research', '将大量可拆分的研究项目交给并行 Agent 执行，再整合结果。', '研究产品从单条长推理链扩展为并行任务组织。', '并行结果仍需要验证来源和处理不一致信息。', { key: true, tags: ['研究', '多 Agent'] });
product('manus-1-5', '2025-10-16', 'Manus 1.5', 'manus', 'Manus', 'https://manus.im/blog/manus-1.5-release', '更新任务执行与应用构建体验，改进持续任务的响应过程。', '通用 Agent 产品形成可追踪的版本迭代。', '产品版本不是对应基础模型的版本号。');
product('manus-browser-operator', '2025-11-18', 'Manus Browser Operator 公布', 'manus', 'Manus', 'https://manus.im/blog/manus-browser-operator', '让 Manus 利用用户自己的浏览器环境处理网页任务。', '任务执行不再只依赖远程浏览器中的独立登录状态。', '11 月 18 日为公告，面向所有用户的开放更新在 11 月 22 日。', { kind: '产品公告', tags: ['浏览器'] });
product('manus-projects', '2025-12-01', 'Manus Projects', 'manus', 'Manus', 'https://manus.im/blog/manus-projects', '用项目组织共享的背景信息、文件和任务上下文。', '重复任务可以复用工作背景。', '项目上下文并不保证所有任务都正确使用全部材料。', { tags: ['上下文', '工作空间'] });
product('minimax-agent-m2', '2025-10-27', 'MiniMax Agent 随 M2 升级', 'minimax-agent', 'MiniMax', minimax + 'minimax-m2', 'Agent 产品结合 M2 模型，强化代码、研究与复杂工具任务。', '基础模型能力转化为用户可委派的任务工作流。', '模型发布与产品更新同日，但不是同一个对象。', { tags: ['通用任务', '编码'] });
product('kimi-agent-swarm', '2026-01-27', 'Kimi Agent Swarm 预览', 'kimi-agent', '月之暗面', kimi + 'kimi-k2-5', 'K2.5 公告展示由多个 Agent 分工并行完成复杂任务的产品路线。', '通用 Agent 开始强调并行任务拆解与汇总。', '发布阶段及套餐可用范围受限，不能等同于下载模型权重即可获得该服务。', { key: true, kind: '预览发布', tags: ['多 Agent', '通用任务'] });

// Additional branches keep the catalog from equating model history with chat LLMs.
model('clip-release', '2021-01-05', 'CLIP：连接文本与图像', 'clip', 'OpenAI', 'https://openai.com/index/clip/', '依赖固定类别标注的视觉模型', ['从图文配对中学习可迁移的视觉表示', '通过文本类别描述进行零样本分类'], '自然语言成为视觉模型的任务接口。', '并非图像生成模型；细粒度识别和分布外场景仍有明显限制。', { key: true, kind: '研究发布', tags: ['视觉', '多模态'] });
model('dall-e-1', '2021-01-05', 'DALL·E：文字生成图像', 'dall-e', 'OpenAI', 'https://openai.com/index/dall-e/', '既有文本条件图像生成研究', ['将文本与图像作为序列建模，生成组合概念的图像'], '文字描述成为图像创作入口。', '研究展示中的样例经过候选排序，不代表任意提示的一次生成效果。', { key: true, kind: '研究发布', tags: ['图像生成'] });
model('stable-diffusion-public', '2022-08-22', 'Stable Diffusion 公开发布', 'stable-diffusion', 'Stability AI', 'https://stability.ai/news-updates/stable-diffusion-public-release', '潜空间扩散研究模型', ['开放文本生成图像模型权重与使用入口'], '本地部署与社区微调推动图像生成生态。', '模型有许可和使用条件；硬件需求随分辨率、实现与设置变化。', { key: true, kind: '权重开放', tags: ['图像生成', '开放权重'] });
model('flux-1', '2024-08-01', 'FLUX.1', 'flux', 'Black Forest Labs', 'https://bfl.ai/blog/24-08-01-bfl', 'FLUX 系列首次发布', ['推出面向图像质量、提示遵循与速度的不同档位'], '欧洲图像生成模型生态增加新的系列。', 'pro、dev、schnell 的开放方式和许可不同，不能统一称为完全开源。', { key: true, tags: ['图像生成'] });
model('wan-2-1', '2025-02-25', 'Wan2.1 开放视频模型', 'wan', '阿里巴巴', 'https://github.com/Wan-Video/Wan2.1', 'Wan 既有视频模型路线', ['公开视频生成模型的权重与推理代码', '覆盖文字和图像条件的视频生成'], '视频模型获得可自行部署与研究的选择。', '不同任务和尺寸的显存、耗时不同；本条不是技术报告发布日期。', { key: true, kind: '权重开放', tags: ['视频生成', '开放权重'] });
model('codex-2021-paper', '2021-07-07', 'Codex 代码模型论文', 'gpt', 'OpenAI', 'https://arxiv.org/abs/2107.03374', 'GPT-3 通用文本模型', ['在代码上微调语言模型', '通过执行测试评估代码生成'], '将语言模型与程序生成的可执行评估连接。', '2021 年 Codex 是模型；不能与 2025 年同名 Agent 产品混同。', { key: true, kind: '论文首发', baselineId: 'gpt3-paper', tags: ['编程'] });
model('grok-2-beta', '2024-08-13', 'Grok-2 / mini 测试版', 'grok', 'xAI', 'https://x.ai/news/grok-2', 'Grok-1.5', ['扩展推理、编程与视觉任务能力，并提供轻量档位'], 'Grok 系列形成不同规模选择。', '本条记录测试版公告，API 开放另有时间安排。', { kind: '测试版' });
model('grok-3-blog', '2025-02-19', 'Grok 3 推理路线公告', 'grok', 'xAI', 'https://x.ai/blog/grok-3', 'Grok-2', ['通过强化学习引入思考模式', '提供 Grok 3 与 mini 推理路线'], 'Grok 系列开始强调推理时计算。', '记录官方技术公告日期，不替代此前直播或分批上线日期。', { key: true, kind: '技术公告', baselineId: 'grok-2-beta' });
model('grok-4', '2025-07-09', 'Grok 4 / Heavy', 'grok', 'xAI', 'https://x.ai/news/grok-4', 'Grok 3', ['加强原生工具使用', 'Heavy 探索并行推理计算'], '推理模型与搜索、执行工具进一步结合。', 'Heavy 档位的并行计算会增加资源需求；不同评测配置不能混比。', { key: true, baselineId: 'grok-3-blog' });
model('command-a', '2025-03-13', 'Command A', 'command', 'Cohere', 'https://docs.cohere.com/changelog/command-a', 'Command R+ 08-2024', ['强化企业检索、工具使用与多语言任务', '关注私有部署的推理效率'], '加拿大模型路线继续聚焦企业工作流。', '推理吞吐与硬件、输入长度及批处理设置有关。', { key: true });
model('sakana-evo-jp', '2024-03-21', 'EvoLLM-JP / EvoVLM-JP', 'sakana-evo', 'Sakana AI', 'https://sakana.ai/evolutionary-model-merge/', '人工选择的模型合并配方', ['用演化搜索组合已有模型', '发布日语语言与视觉语言模型'], '展示从头训练以外的模型构建路线。', '实验结果主要针对特定日语任务；同文中的图像模型并未同步全部开放。', { key: true, kind: '研究发布', tags: ['日本', '多模态', '模型合并'] });
const qwenRepo = 'https://github.com/QwenLM/Qwen3.8';
model('qwen-3-next', '2025-09-11', 'Qwen3-Next', 'qwen', '阿里巴巴', qwenRepo, 'Qwen3', ['采用混合注意力和高稀疏混合专家架构'], '探索高效率模型架构。', '日期依据官方仓库历史日志。', { baselineId: 'qwen-3' });
model('qwen-3-5', '2026-02-16', 'Qwen3.5 首批权重', 'qwen', '阿里巴巴', qwenRepo, 'Qwen3 / Qwen3-Next', ['发布原生多模态混合专家模型'], '语言与视觉路线汇合。', '采用仓库权重发布日期；博客元数据早一天。', { key: true, kind: '权重开放', baselineId: 'qwen-3-next' });
model('qwen-3-5-small', '2026-03-02', 'Qwen3.5 轻量系列', 'qwen', '阿里巴巴', qwenRepo, 'Qwen3.5 已有大型档位', ['增加 0.8B 至 9B 小型版本'], '扩大本地部署选择。', '尺寸不同，能力与部署条件不同。', { baselineId: 'qwen-3-5' });
model('qwen-3-6', '2026-04-16', 'Qwen3.6-35B-A3B', 'qwen', '阿里巴巴', qwenRepo, 'Qwen3.5 系列', ['新增开放的稀疏专家版本'], '继续迭代可部署模型。', '仅确认发布与型号，不推断统一性能提升。', { baselineId: 'qwen-3-5' });
model('qwen-3-8', '2026-08-12', 'Qwen3.8 首批权重', 'qwen', '阿里巴巴', qwenRepo, 'Qwen3.6 系列', ['开放更大档位，强化编程、研究和长任务'], '扩展开放模型的能力范围。', '27B 档位在 8 月 14 日另行开放。', { baselineId: 'qwen-3-6', kind: '权重开放' });

product('codex-cloud-preview', '2025-05-16', 'Codex 云端研究预览', 'codex', 'OpenAI', 'https://openai.com/index/introducing-codex/', '在独立云端沙箱中运行多个软件工程任务，并提供代码变更供审查。', '同名工具从本地终端扩展到云端异步委派。', '初始套餐范围与后续扩大开放不同；每个任务的环境和权限仍受限制。', { key: true, kind: '研究预览', tags: ['编码', '云端任务'] });
product('codex-cloud-ga', '2025-10-06', 'Codex 正式开放', 'codex', 'OpenAI', 'https://openai.com/index/codex-now-generally-available/', 'Codex 云端服务从研究预览进入正式开放，并扩展团队集成与管理能力。', '编码 Agent 进入可管理的团队工作流程。', '正式开放不代表每个实验功能都同时稳定。', { kind: '正式开放', tags: ['编码', '团队协作'] });
product('codex-desktop', '2026-02-02', 'Codex macOS 应用', 'codex', 'OpenAI', 'https://openai.com/index/introducing-the-codex-app/', '桌面应用提供项目、多任务、并行 Agent、Skills 和自动化的统一入口。', '产品重心从一次对话转向持续管理多个工作任务。', '这是 macOS 首发；Windows 版随后在 3 月开放。', { key: true, kind: '产品发布', tags: ['工作空间', '多 Agent', 'Skills'] });
product('chatgpt-deep-research', '2025-02-02', 'ChatGPT deep research', 'chatgpt-agent', 'OpenAI', 'https://openai.com/index/introducing-deep-research/', '自主拆解研究问题，浏览资料并生成带引用的报告。', '资料检索从单次搜索发展为多步研究任务。', '报告可能包含错误或不恰当引用，仍需核对关键证据。', { key: true, kind: '产品发布', tags: ['研究', '检索'] });
product('cowork-announcement', '2026-01-12', 'Cowork：从编码走向日常工作', 'cowork', 'Anthropic', 'https://claude.com/blog-category/agents', 'Anthropic 公告将 Claude Code 式的任务委派方式扩展到代码以外的工作。', '通用知识工作成为 Agent 产品的明确方向。', '原始文章已重定向到当前产品页；日期由官方博客目录的历史条目核实，不把当前功能全部倒填到首发。', { key: true, kind: '产品公告', tags: ['通用任务', '办公'] });

const seed = 'https://seed.bytedance.com/';
model('seed-1-5-vl', '2025-05-13', 'Seed1.5-VL 技术公告', 'seed', '字节跳动', seed + 'en/blog/first-release-of-seed-vlm-tech-report-comprehensive-solutions-for-image-video-gui-and-game', 'Seed 既有语言模型路线', ['扩展图像、视频与 GUI 视觉推理'], '豆包背后的基础模型研究与产品品牌分开追踪。', '本条采用技术公告日期；论文更早提交，API 快照日期也不是公告日。', { key: true, kind: '技术公告', tags: ['多模态', 'GUI'] });
model('seed-2', '2026-02-14', 'Seed2.0', 'seed', '字节跳动', seed + 'blog/seed-2-0-official-launch', 'Seed 既有通用模型系列', ['增强文档、图表与视频理解', '改进复杂指令和多步任务，并提供 Pro、Lite、Mini、Code 档位'], '模型能力面向大规模实际工作流优化。', '不同档位和产品入口的能力、费用与开放范围不同。', { key: true });
model('seed-2-1', '2026-06-23', 'Seed2.1', 'seed', '字节跳动', seed + 'en/blog/seed2-1-officially-released-advancing-ai-productivity', 'Seed2.0', ['改善跨工具、跨环境任务的连续交付'], '通用 Agent 的实际任务表现成为系列迭代重点。', '厂商的工作流评估不能保证每个任务的可靠交付。', { baselineId: 'seed-2' });
model('seedance-1-5-pro', '2025-12-16', 'Seedance 1.5 pro', 'seedance', '字节跳动', seed + 'en/blog/sound-and-vision-all-in-one-take-the-official-release-of-seedance-1-5-pro', 'Seedance 1.0', ['联合生成音频与视频', '改善口型、镜头与叙事配合'], '视频生成从无声画面扩展到原生视听内容。', '发布公告与前一天的论文日期分开；生成的动作和声音仍可能不准确。', { key: true, tags: ['视频生成', '音频'] });
model('seedance-2', '2026-02-12', 'Seedance 2.0 发布说明', 'seedance', '字节跳动', seed + 'en/blog/seedance-2-0-official-launch', 'Seedance 1.5 pro', ['支持文字、图像、音频与视频参考', '加强复杂运动、内容一致性与编辑控制'], '多模态参考使视频创作更可控。', '官方文章写于近期推出后，本条记录发布说明日，不推断首次灰度开放日。', { baselineId: 'seedance-1-5-pro', kind: '技术公告', tags: ['视频生成', '多模态'] });

// One primary page counts as one source, even when it announces model + product.
const sourceByUrl = new Map<string, string>([[api, 'api-changelog']]);
export const releaseSources: Source[] = [];
for (const { event, source } of records) {
  let id = sourceByUrl.get(source.url);
  if (!id) {
    id = source.id;
    sourceByUrl.set(source.url, id);
    releaseSources.push({ ...source, title: source.url === glmNotes ? 'Z.ai 模型与产品更新日志' : source.url === qwenRepo ? 'Qwen 官方模型仓库与历史发布日志' : source.title });
  }
  event.sourceIds = [id];
  if (event.change) event.change.sourceIds = [id];
}
export const releaseEvents = records.map(record => record.event);
// Availability dates for these model cards are backed by the dated API log as well.
for (const event of releaseEvents) {
  if (event.kind === 'API 开放' && event.company === 'OpenAI') {
    event.sourceIds = [...new Set([...event.sourceIds, 'api-changelog'])];
    if (event.change) event.change.sourceIds = [...new Set([...event.change.sourceIds, 'api-changelog'])];
  }
}
const sharedAnnouncements = [
  ['devstral-2', 'mistral-vibe'], ['qwen-3-coder', 'qwen-code'],
  ['minimax-m2', 'minimax-agent-m2'], ['kimi-k2-5', 'kimi-agent-swarm'],
  ['opus-4-6', 'claude-code-agent-teams'],
];
for (const ids of sharedAnnouncements) for (const event of releaseEvents.filter(e => ids.includes(e.id))) event.announcementGroup = `announcement-${ids[0]}`;
const entity = (id: string, name: string, type: Entity['type'], company: string, description: string, firstEvent: string, tags: string[]): Entity => ({ id, name, type, company, description, tags, sourceIds: [...releaseEvents.find(e => e.id === firstEvent)!.sourceIds] });
export const releaseEntities: Entity[] = [
  { id: 'bert-family', name: 'BERT', type: 'family', company: 'Google', description: '双向语言预训练模型，追踪论文和模型能力变化。', tags: ['语言理解'], sourceIds: ['bert'] },
  entity('t5', 'T5', 'family', 'Google', '将不同语言任务统一为文本到文本问题的预训练模型。', 't5-paper', ['预训练']),
  entity('gemma', 'Gemma', 'family', 'Google', '面向可部署场景的开放权重模型，与 Gemini 服务分开追踪。', 'gemma-1', ['开放权重']),
  entity('exaone', 'EXAONE', 'family', 'LG AI Research', '韩国 LG AI Research 开发的语言及多模态模型系列。', 'exaone-3', ['韩国', '多语言']),
  entity('sakana-evo', 'Sakana Evo 系列', 'family', 'Sakana AI', '通过演化模型合并探索日语语言与视觉语言模型。', 'sakana-evo-jp', ['日本', '模型合并']),
  entity('clip', 'CLIP', 'family', 'OpenAI', '通过自然语言监督学习视觉表示的模型。', 'clip-release', ['视觉', '多模态']),
  entity('dall-e', 'DALL·E', 'family', 'OpenAI', '从文字描述生成图像的模型系列。', 'dall-e-1', ['图像生成']),
  entity('stable-diffusion', 'Stable Diffusion', 'family', 'Stability AI', '采用潜空间扩散方法的可部署图像生成模型系列。', 'stable-diffusion-public', ['图像生成', '开放权重']),
  entity('flux', 'FLUX', 'family', 'Black Forest Labs', '欧洲团队开发的图像生成系列，不同档位使用不同开放方式。', 'flux-1', ['图像生成']),
  entity('wan', 'Wan / 通义万相', 'family', '阿里巴巴', '追踪视频生成模型与权重、推理代码的开放。', 'wan-2-1', ['视频生成']),
  entity('seed', 'Seed / 豆包基础模型', 'family', '字节跳动', '追踪支持豆包等产品的通用及视觉语言模型研究，不把产品更新等同于模型发布。', 'seed-1-5-vl', ['多模态', '推理']),
  entity('seedance', 'Seedance', 'family', '字节跳动', '联合处理视频与声音的生成模型系列。', 'seedance-1-5-pro', ['视频生成', '音频']),
  entity('generative-agents', 'Generative Agents', 'product', 'Stanford / Google Research', '在模拟环境中研究记忆、反思、规划与社会互动的 Agent 原型。', 'generative-agents-paper', ['研究原型', '多 Agent']),
  entity('swe-agent', 'SWE-agent', 'product', 'Princeton / Stanford', '通过专门电脑接口处理软件工程任务的开源 Agent 研究系统。', 'swe-agent-paper', ['开源', '编码']),
  entity('openhands', 'OpenHands / OpenDevin', 'product', 'OpenHands 社区', '提供代码、终端、浏览器与沙箱运行环境的软件开发 Agent 平台。', 'openhands-paper', ['开源', '编码']),
  entity('autoglm', 'AutoGLM', 'product', '智谱', '面向浏览器和手机图形界面的操作 Agent，研究与产品开放阶段分开记录。', 'autoglm-paper', ['GUI', '手机']),
  entity('gemini-cli', 'Gemini CLI', 'product', 'Google', '把模型和开发工具接入终端的开源 Agent。', 'gemini-cli', ['编码', '终端']),
  entity('qwen-code', 'Qwen Code', 'product', '阿里巴巴', '基于 Gemini CLI 路线发展的开源编码 Agent 工具。', 'qwen-code', ['编码', '终端']),
  entity('trae', 'TRAE', 'product', '字节跳动', '通过编辑器、终端和浏览器整合开发任务的 Agent 工作空间。', 'trae-solo', ['编码', '工作空间']),
  entity('mistral-vibe', 'Mistral Vibe', 'product', 'Mistral AI', '与 Devstral 模型配合使用的开源终端编码工具。', 'mistral-vibe', ['编码', '终端']),
  entity('chatgpt-agent', 'Operator / ChatGPT agent', 'product', 'OpenAI', '从浏览器操作研究预览发展到整合研究、电脑和终端的通用任务 Agent。', 'operator-preview', ['浏览器', '通用任务']),
  entity('cowork', 'Claude Cowork', 'product', 'Anthropic', '把任务委派扩展到代码以外的日常工作。', 'cowork-announcement', ['通用任务', '办公']),
];
