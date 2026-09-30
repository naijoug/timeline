import type { Entity, Source, TimelineEvent } from './types';

// Sources are shared by releases, entity pages and the evidence drawer.
const references: [string, string, string, string, Source['type']][] = [
  ['qwen25', 'Qwen2.5: A Party of Foundation Models', 'Qwen', 'https://qwenlm.github.io/blog/qwen2.5/', '官方公告'],
  ['qwen3', 'Qwen3: Think Deeper, Act Faster', 'Qwen', 'https://qwenlm.github.io/blog/qwen3/', '官方公告'],
  ['kimi2', 'Kimi K2: Open Agentic Intelligence', 'Moonshot AI', 'https://www.kimi.com/blog/kimi-k2', '官方公告'],
  ['kimi-agent', 'Introducing Kimi Agent', 'Moonshot AI', 'https://www.kimi.com/en/help/agent/agent-overview', '官方文档'],
  ['glm45', 'GLM-4.5: Reasoning, Coding, and Agentic Abilities', 'Z.ai', 'https://z.ai/blog/glm-4.5', '官方公告'],
  ['glm45-repo', 'GLM-4.5 model and research repository', 'Z.ai', 'https://github.com/zai-org/GLM-4.5', '官方文档'],
  ['minimax-m1', 'MiniMax-M1', 'MiniMax', 'https://www.minimax.io/news/minimaxm1', '官方公告'],
  ['minimax-agent', 'Introducing MiniMax Agent', 'MiniMax', 'https://www.minimax.io/news/minimax-agent', '官方公告'],
  ['ernie45', 'ERNIE 4.5 模型系列正式开源', '百度', 'https://ernie.baidu.com/blog/zh/posts/ernie4.5/', '官方公告'],
  ['hunyuan-t1', '腾讯混元 Hunyuan-T1 正式发布', '腾讯云', 'https://cloud.tencent.com/product/events/detail/6702', '官方公告'],
  ['pangu-open', '华为宣布开源盘古 7B 和 72B 模型', '华为', 'https://www.huawei.com/cn/news/2025/7/pangu-opensource', '官方公告'],
  ['step3', 'Step3: Cost-Effective Multimodal Intelligence', '阶跃星辰', 'https://chat.stepfun.com/research/en/step3', '官方公告'],
  ['sensenova6', '商汤日日新 V6 发布', '商汤', 'https://www.sensetime.com/cn/news/51169469', '官方公告'],
  ['ui-tars', 'UI-TARS: Pioneering Automated GUI Interaction', 'ByteDance Seed', 'https://github.com/bytedance/UI-TARS', '官方文档'],
  ['gpt4-report', 'GPT-4 Technical Report', 'OpenAI / arXiv', 'https://arxiv.org/abs/2303.08774', '原始论文'],
  ['gemini15', 'How Gemini 1.5 expands the context window', 'Google', 'https://blog.google/innovation-and-ai/products/long-context-window-ai-models/', '官方公告'],
  ['gemini20', 'Gemini 2.0, Jules and Colab updates', 'Google', 'https://blog.google/feed/gemini-jules-colab-updates/', '官方公告'],
  ['llama2', 'Meta and Microsoft introduce Llama 2', 'Meta', 'https://ai.meta.com/blog/llama-2/', '官方公告'],
  ['llama3', 'Introducing Meta Llama 3', 'Meta', 'https://ai.meta.com/blog/meta-llama-3', '官方公告'],
  ['llama31', 'Introducing Llama 3.1', 'Meta', 'https://ai.meta.com/blog/meta-llama-3-1/', '官方公告'],
  ['mixtral', 'Mixtral of experts', 'Mistral AI', 'https://mistral.ai/news/mixtral-of-experts/', '官方公告'],
  ['command-r', 'Command R: Retrieval-Augmented Generation at Scale', 'Cohere', 'https://docs.cohere.com/changelog/command-r-retrieval-augmented-generation-at-production-scale', '官方公告'],
  ['falcon180', 'Introducing Falcon 180B', 'TII', 'https://www.tii.ae/news/technology-innovation-institute-introduces-worlds-most-powerful-open-llm-falcon-180b', '官方公告'],
  ['jules-beta', 'Build with Jules, your asynchronous coding agent', 'Google', 'https://blog.google/innovation-and-ai/models-and-research/google-labs/jules/', '官方公告'],
  ['jules-ga', 'Jules is out of public beta', 'Google', 'https://blog.google/innovation-and-ai/models-and-research/google-labs/jules-now-available/', '官方公告'],
  ['copilot-agent', 'GitHub Copilot: Meet the new coding agent', 'GitHub', 'https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/', '官方公告'],
  ['replit-v2', 'Introducing Replit Agent v2 in Early Access', 'Replit', 'https://replit.com/blog/agent-v2', '官方公告'],
  ['devin', 'Introducing Devin', 'Cognition', 'https://cognition.com/blog/introducing-devin', '官方公告'],
  ['cursor-agent', 'Composer UI, Agent and Commit Messages', 'Cursor', 'https://www.cursor.com/ja/changelog/new-composer-ui-agent-commit-messages', '官方公告'],
];
export const globalSources: Source[] = references.map(([id, title, publisher, url, type]) => ({
  id, title, publisher, url, type, language: ['ernie45','hunyuan-t1','pangu-open','sensenova6'].includes(id) ? '简体中文' : id === 'cursor-agent' ? '日本語 / English' : 'English', checkedAt: '2026-09-29',
}));

const families = [
  ['gpt', 'GPT', 'OpenAI', '从通用语言能力到多模态交互，追踪代表模型的能力变化。', 'gpt4-report'],
  ['gemini', 'Gemini', 'Google', '多模态、长上下文与面向工具的模型演进。', 'gemini15'],
  ['llama', 'Llama', 'Meta', '可获得权重的模型家族，关注生态、语言与上下文能力。', 'llama2'],
  ['qwen', 'Qwen / 通义千问', '阿里巴巴', '多语言、编程与推理模型，以及不同规模的开放权重。', 'qwen3'],
  ['kimi', 'Kimi', '月之暗面', '关注代码、长上下文和 Agent 工具使用。', 'kimi2'],
  ['glm', 'GLM', '智谱', '结合推理、代码和 Agent 能力的模型家族。', 'glm45'],
  ['minimax', 'MiniMax', 'MiniMax', '混合注意力与长上下文推理模型。', 'minimax-m1'],
  ['ernie', 'ERNIE / 文心', '百度', '语言与多模态模型，追踪开放权重和能力变化。', 'ernie45'],
  ['hunyuan', 'Hunyuan / 混元', '腾讯', '通用语言、推理与多模态模型体系。', 'hunyuan-t1'],
  ['pangu', 'Pangu / 盘古', '华为', '模型开放、部署生态与行业能力的演进。', 'pangu-open'],
  ['step', 'Step', '阶跃星辰', '多模态推理模型与效率设计。', 'step3'],
  ['sensenova', 'SenseNova / 日日新', '商汤', '多模态理解、推理与实时交互。', 'sensenova6'],
  ['mistral', 'Mistral', 'Mistral AI', '法国团队的开放模型与混合专家路线。', 'mixtral'],
  ['command', 'Command', 'Cohere', '面向企业检索增强与工具使用的模型家族。', 'command-r'],
  ['falcon', 'Falcon', 'TII', '阿联酋 TII 的大规模开放模型研究。', 'falcon180'],
];
const products = [
  ['jules', 'Jules', 'Google', '在云端异步执行代码任务，并提供可审阅的变更。', 'jules-beta'],
  ['minimax-agent', 'MiniMax Agent', 'MiniMax', '面向复杂长任务的规划、工具使用与交付。', 'minimax-agent'],
  ['kimi-agent', 'Kimi Agent', '月之暗面', '从 OK Computer 等产品模式发展而来的通用任务 Agent。', 'kimi-agent'],
  ['ui-tars', 'UI-TARS', '字节跳动', '研究原生 GUI Agent，通过感知界面和行动完成操作。', 'ui-tars'],
  ['copilot', 'GitHub Copilot', 'GitHub', '将编码 Agent 接入 issue、后台执行与 pull request 工作流。', 'copilot-agent'],
  ['replit-agent', 'Replit Agent', 'Replit', '面向应用创建、预览与迭代的 Agent。', 'replit-v2'],
  ['devin', 'Devin', 'Cognition', '具备开发工具与执行环境的软件工程 Agent。', 'devin'],
  ['cursor', 'Cursor Agent', 'Cursor', '代码编辑器中的 Agent 工作流。', 'cursor-agent'],
];
export const globalEntities: Entity[] = [
  ...families.map(([id,name,company,description,source]) => ({id,name,company,description,type:'family' as const,tags:['模型演进'],sourceIds:[source]})),
  ...products.map(([id,name,company,description,source]) => ({id,name,company,description,type:'product' as const,tags:['Agent 应用'],sourceIds:[source]})),
];

const significance: Record<string,string> = {
  'gpt-4-report':'让通用大模型在更复杂的任务上接受系统评估，推动研究者同时关注能力与局限。',
  'gpt-4o-api':'旗舰模型的使用成本与响应速度发生变化，让更多交互式应用有了可行的模型选择。',
  'gemini-1-5':'长文档、代码和多模态材料开始能够放进更大的上下文，改变了应用组织信息的方式。',
  'gemini-2-0':'模型、工具与实时交互更紧密地结合，为 Agent 应用提供新的基础能力。',
  'llama-2':'扩大高能力模型权重的可获得性，让更多团队可以在自身环境中研究、适配和部署模型。',
  'llama-3':'持续更新的开放权重模型，使开发者可以在新一代基础能力上延续自己的应用与研究。',
  'llama-3-1':'多语言、长上下文与更大档位共同扩展了开放模型可承担的任务范围。',
  'qwen-2-5':'提供多种规模和能力方向的模型，使中文及多语言应用拥有更多可部署的基础选择。',
  'qwen-3':'让同一模型按任务选择思考模式，并将多语言和工具能力扩展到不同规模的开放模型。',
  'kimi-k2':'将模型发布重点从单纯回答转向代码与工具使用，体现面向 Agent 的基础模型路线。',
  'glm-4-5':'把推理、编程与行动能力放在同一模型训练目标中，拓展 Agent 的模型选择。',
  'minimax-m1':'展示长上下文推理的另一条架构路线，提醒开发者同时关注能力和计算效率。',
  'ernie-4-5-open':'让文心模型进入可获取权重、适配和部署的生态，改变了开发者接触模型的方式。',
  'hunyuan-t1':'腾讯的模型路线进一步扩展到深度推理，丰富了中文应用的基础模型选择。',
  'pangu-open':'把模型开放与本地计算生态连接起来，提供另一种部署与研究路径。',
  'step-3':'将多模态推理和效率设计结合，补充只以文字能力或模型规模观察演进的视角。',
  'sensenova-6':'让模型演进的观察范围涵盖多模态推理与实时交互，而不局限于文字聊天。',
  'mixtral-8x7b':'欧洲团队公开可使用的稀疏专家模型，为研究能力与计算开销之间的关系提供实际对象。',
  'command-r':'把检索、引用和工具调用作为企业工作流的重要能力，体现模型发展的任务导向。',
  'falcon-180b':'来自阿联酋的模型研究扩大了大规模模型权重的来源，让全球发展史超出少数地区。',
};
const openFamilies=new Set(['llama','qwen','kimi','glm','minimax','ernie','pangu','step','mistral','falcon']);
function release(id: string, date: string, title: string, family: string, source: string, baseline: string, improvements: string[], limitation: string, baselineEventId?: string): TimelineEvent {
  const entity = globalEntities.find(e => e.id === family)!;
  return { id,date,title,summary:improvements.join('；')+'。',significance:significance[id],limitation,
    tracks:['models'],entityIds:[family],sourceIds:[source],tags:openFamilies.has(family)?['开放权重','基础模型']:['基础模型'],milestone:true,kind:'模型发布',company:entity.company,
    change:{baseline,baselineEventId,improvements,tradeoffs:limitation,evidence:source==='gpt4-report'?'论文报告':'厂商报告',sourceIds:[source]},
  };
}
function application(id:string,date:string,title:string,entityId:string,source:string,summary:string,significance:string,kind='产品发布'): TimelineEvent {
  const entity=globalEntities.find(e=>e.id===entityId)!;
  return {id,date,title,summary,significance,limitation:'本条依据发布方资料记录该阶段的能力，官方描述不等于本站独立实测。',tracks:['products'],entityIds:[entityId],sourceIds:[source],tags:['Agent 应用'],milestone:true,kind,company:entity.company};
}
export const globalEvents: TimelineEvent[] = [
  {...release('gpt-4-report','2023-03-15','GPT-4 技术报告','gpt','gpt4-report','GPT-3.5 系列',['报告更强的复杂任务表现','介绍文本和图像输入能力'],'这是论文首发时间，不能当作所有模态或渠道同时开放的日期。'),kind:'技术报告'},
  release('gpt-4o-api','2024-05-13','GPT-4o','gpt','api-changelog','此前 GPT-4 系列',['新一代旗舰模型进入 API','改善速度与使用成本'],'这里记录 API 发布；不同模态与产品入口的开放日期应分别核查。','gpt-4-report'),
  release('gemini-1-5','2024-02-15','Gemini 1.5','gemini','gemini15','Gemini 1.0',['扩展多模态长上下文处理','探索百万 token 级上下文窗口'],'百万 token 窗口在此阶段面向有限测试；大窗口不等于全程信息检索都可靠。'),
  release('gemini-2-0','2024-12-11','Gemini 2.0 Flash 实验版','gemini','gemini20','Gemini 1.5',['进一步结合多模态与工具调用','提供实时交互相关开发能力'],'此条为实验版发布，不等于所有能力正式可用。','gemini-1-5'),
  release('llama-2','2023-07-18','Llama 2','llama','llama2','Llama 初代',['扩大模型权重的研究与商业使用范围','提供不同规模的预训练与对话版本'],'使用需遵循模型许可；开放权重不等于没有使用条件。'),
  release('llama-3','2024-04-18','Llama 3','llama','llama3','Llama 2',['首批发布 8B 与 70B 模型','官方报告推理与指令能力改善'],'此阶段首批模型以文本为主，后续多模态能力不能倒填到本次发布。','llama-2'),
  release('llama-3-1','2024-07-23','Llama 3.1','llama','llama31','Llama 3',['扩展至 128K 上下文和多语言','发布 405B 档位并更新较小模型'],'不同规模的硬件与成本需求差异很大。','llama-3'),
  release('qwen-2-5','2024-09','Qwen2.5','qwen','qwen25','Qwen2',['改进知识、代码和数学能力','开放多种规模的基础模型与指令模型'],'不同规模与专用版本的许可、能力和上下文条件需逐一查看。'),
  release('qwen-3','2025-04-29','Qwen3','qwen','qwen3','Qwen2.5',['整合思考与非思考模式','开放稠密与混合专家模型','增强多语言和 Agent 工具能力'],'思考预算影响速度与成本；各规模模型的上下文长度不同。','qwen-2-5'),
  release('kimi-k2','2025-07-11','Kimi K2','kimi','kimi2','此前 Kimi 系列',['聚焦 Agent 编程与工具使用','开放混合专家模型权重'],'此为 K2 初版，与 2025 年 9 月的更新区分记录。'),
  {...release('glm-4-5','2025-07-28','GLM-4.5','glm','glm45','此前 GLM-4 系列',['整合推理、代码与 Agent 能力','提供思考与非思考模式及开放权重'],'不同档位的推理效率与部署需求不同。'),sourceIds:['glm45','glm45-repo']},
  release('minimax-m1','2025-06-16','MiniMax-M1','minimax','minimax-m1','MiniMax-01 系列',['结合混合注意力与长上下文推理','面向长任务和工具使用优化'],'长上下文和推理输出上限是不同指标；厂商效率测试依赖具体设置。'),
  {...release('ernie-4-5-open','2025-06-30','文心 ERNIE 4.5 开放权重','ernie','ernie45','此前文心模型的可获得性',['开放多尺寸语言与多模态模型权重','提供训练与部署生态支持'],'这是权重开放日，不是 ERNIE 4.5 最初公布日。'),kind:'开放权重'},
  release('hunyuan-t1','2025-03-21','混元 Hunyuan-T1','hunyuan','hunyuan-t1','Hunyuan TurboS 基座',['扩展深度推理能力','进一步进行偏好对齐'],'此日期依腾讯云正式发布动态，预览和后续快照另行区分。'),
  {...release('pangu-open','2025-06-30','盘古 7B / Pro MoE 开放','pangu','pangu-open','此前盘古模型的可获得性',['开放稠密与混合专家模型','开放基于昇腾的推理技术'],'模型开放及推理技术发布，不代表所有盘古行业模型均已开放。'),kind:'开放权重'},
  release('step-3','2025-07-31','Step3','step','step3','此前 Step 系列',['结合多模态推理与混合专家架构','关注推理计算效率'],'能力与成本需要结合具体任务和部署配置评估。'),
  release('sensenova-6','2025-04-10','日日新 SenseNova V6','sensenova','sensenova6','SenseNova V5 系列',['增强多模态推理','更新实时交互相关能力'],'官方性能描述不等于所有场景的第三方验证。'),
  release('mixtral-8x7b','2023-12-11','Mixtral 8×7B','mistral','mixtral','Mistral 7B',['开放稀疏混合专家模型权重','支持多语言与 32K 上下文'],'激活参数量与总参数量不能混为一谈，实际部署仍需存储全部权重。'),
  release('command-r','2024-03','Command R','command','command-r','此前 Command 系列',['针对检索增强与工具使用优化','支持长上下文与多语言'],'博客与 changelog 日期口径不同，本条保留月份。'),
  release('falcon-180b','2023-09-06','Falcon 180B','falcon','falcon180','此前 Falcon 系列',['发布更大规模的语言模型权重','扩展可获得的大模型研究选择'],'规模不自动意味着每种任务更优；使用条件依发布方许可。'),
  application('jules-beta','2025-05-20','Jules 公开测试','jules','jules-beta','Google 将异步云端编码 Agent 向公众开放测试。','代码任务可以在隔离的云环境中执行，并返回可审阅的变更。','公开测试'),
  application('jules-ga','2025-08-06','Jules 正式开放','jules','jules-ga','Jules 结束公开测试，更新可用范围与产品能力。','区分首次亮相、公开测试和正式使用的不同阶段。','正式开放'),
  application('minimax-agent-launch','2025-06-19','MiniMax Agent','minimax-agent','minimax-agent','MiniMax 推出面向复杂长任务的通用 Agent。','将规划、任务分解与多步执行组织成可使用的产品。'),
  application('kimi-ok-computer','2025-09-26','Kimi OK Computer','kimi-agent','kimi-agent','Kimi 推出 Agent 产品模式，用多个工具处理完整任务。','从单轮回答转向研究、构建与文件交付。','产品模式发布'),
  application('ui-tars-research','2025-01','UI-TARS','ui-tars','ui-tars','字节 Seed 公开原生 GUI Agent 的研究与模型。','把界面感知与行动连接起来，研究可操作电脑的 Agent。','研究公开'),
  application('copilot-coding-agent','2025-05-19','Copilot coding agent','copilot','copilot-agent','GitHub 发布从 issue 开始，在后台执行并提交 PR 的编码 Agent。','让 Agent 接入团队已有的审查与协作流程。'),
  application('replit-agent-v2','2025-02-25','Replit Agent v2','replit-agent','replit-v2','Replit 开放 Agent v2 早期体验，提供应用创建与实时设计预览。','用户可以在构建完成前检查并调整结果。','早期体验'),
  application('devin-introduction','2024-03','Devin','devin','devin','Cognition 介绍具有终端、编辑器与浏览器环境的软件工程 Agent。','展示将开发任务委托给可以持续执行的系统这一产品方向。','产品介绍'),
  application('cursor-agent-introduction','2024-11-24','Cursor Agent','cursor','cursor-agent','Cursor 在 Composer 更新中引入 Agent 工作流。','让代码编辑器中的助手能够更主动地组织开发操作。','功能发布'),
];
