import type { Source, TimelineEvent } from './types';
const checkedAt = '2026-11-15';
const base = 'https://api-docs.deepseek.com/';
const source = (id: string, title: string, path: string, locator: string, publishedAt?: string): Source => ({ id, title, publisher: 'DeepSeek', url: base + path, type: publishedAt ? '官方公告' : '官方文档', checkedAt, ...(publishedAt ? { publishedAt } : {}), locator, version: '核读官方正文；动态文档的核查日不是首次发布日期。未调用 API 或运行演示。' });
export const deepseekAppApiSources: Source[] = [
  source('deepseek-app-api-announcement', 'The full DeepSeek App experience, now via API', 'news/news261113/', 'Full-Suite App API Release 2026/11/13；Built-in tools；API pricing', '2026-11-13'),
  source('deepseek-app-api-changelog', 'DeepSeek API Change Log · App API 与此前 Search API', 'updates/', '2026-11-13 Full-Suite App API；2026-10-17 Search API'),
  source('deepseek-app-api-guide', 'Build a Chatbot', 'guides/build_a_chatbot/', 'Feature Map；Choose a Protocol；Ignored Parameters；Compliance Requirements'),
  source('deepseek-app-api-web-tools', 'Web Tools', 'guides/web_tools/', 'Web Search；Deep Thinking Search；Multi-turn Conversations'),
  source('deepseek-app-api-safety', 'Model Content Safety', 'guides/safety/', 'Enable Safety Review；Handle Refusals；Billing'),
  source('deepseek-app-api-pricing', 'Models & Pricing', 'quick_start/pricing/', 'deepseek-flash 模型映射；工具计费'),
];
export const deepseekAppApiEvents: TimelineEvent[] = [{
  id: 'deepseek-app-api-release', date: '2026-11-13', dateLabel: '2026年11月13日（成套 App API 公告日）', title: 'DeepSeek App API：将会话工具交给服务端编排', company: 'DeepSeek', kind: 'API 能力开放', tracks: ['methods', 'products'], entityIds: ['deepseek'], milestone: false,
  summary: 'DeepSeek 将搜索、文件输入、链接阅读、安全检查与语音能力成套开放为 App API；会话工具调用和上下文组装由服务端处理，开发者可构建自己的聊天应用。',
  significance: '编辑解读：开放的不只是模型回答接口，还包括组织资料与多步搜索的会话层；开发者的工作转向状态传递、引用呈现和失败处理。',
  limitation: '不是新模型、开放权重或 DeepSeek App 首次发布，也不把所有工具写成这一天首次出现。独立 Search API 已于10月17日开放；本轮未调用 API、运行演示或实测费用。',
  sourceIds: deepseekAppApiSources.map(source => source.id), tags: ['App API', '服务端工具', '搜索', '开发者接口', '内容安全'],
  details: [
    { label: '日期与模型边界', text: '公告及更新日志将成套 App API 发布记为11月13日，仅保留日级日期。独立 Search API 已在10月17日开放，不能重复记为搜索首发。核查时 deepseek-flash 仍映射 DeepSeek-V4.1-Flash-1017；本次记录应用接口与编排层，不新增模型版本。', sourceIds: ['deepseek-app-api-announcement', 'deepseek-app-api-changelog', 'deepseek-app-api-pricing'], locator: '公告发布索引；更新日志对应日期；定价模型表' },
    { label: '同一会话能力的三个入口', text: 'Messages、Responses 与 Chat Completions 都可使用 deepseek-flash 的会话能力。非思考模式可按问题搜索网页或图片并给出引用；思考模式可在多步推理中搜索和阅读。文件输入与 URL 阅读为回答提供上下文；Search、Fetch、OCR、ASR、TTS 也提供独立 API，但不能把会话能力逐项等同于独立接口能力。', sourceIds: ['deepseek-app-api-announcement', 'deepseek-app-api-guide'], locator: 'Built-in tools；Feature Map；Choose a Protocol' },
    { label: '服务端执行，客户端仍要保留状态', text: 'deepseek_web_search 与 deepseek_read_url 的工具调用和上下文组装在服务端进行；客户端要显示返回的内容块，并在下一轮按文档原样传回。Chat Completions 的扩展 server_tool_calls 不能被网关或 SDK 静默丢弃，否则先前链接内容可能丢失。服务端编排不等于客户端可以只保存最终回答文本。', sourceIds: ['deepseek-app-api-guide', 'deepseek-app-api-web-tools'], locator: '概览服务端与客户端分工；Multi-turn Conversations' },
    { label: '默认检查与拒绝处理', text: 'safety_check 的 low 是默认内容检查，不是关闭安全检查；high 启用文档所述的额外基础风控，检查输入和输出。流式输出结束后仍可能终审拒绝，客户端需移除已显示的回答并显示拒绝信息；开启参数也不替代服务提供者的内容审核责任。', sourceIds: ['deepseek-app-api-safety'], locator: 'Enable Safety Review 的 low/high 表；Handle Refusals；Compliance Requirements' },
    { label: '用量与参数不是普通聊天的简单复制', text: '扩展工具费用叠加在常规 token 费用之外，拒绝前消耗的 token 仍计费。启用网页工具、high 安全检查或标题生成时，服务端会忽略一组采样与控制参数。max_tokens（Responses 为 max_output_tokens）限制每个推理步骤的输出，不是整轮总输出上限；不能据此把多步搜索预算当成单次回答预算。', sourceIds: ['deepseek-app-api-announcement', 'deepseek-app-api-safety', 'deepseek-app-api-guide'], locator: 'API pricing；Handle Refusals/Billing；Ignored Parameters' },
    { label: '编辑分析：接口减少代码，不消除验收', text: '成套能力减少了自行拼装搜索和资料读取流程的工作，却把正确保存上下文、展示来源、处理最终拒绝和控制工具成本变得更重要。评估时应分别验证这些行为，而不是把兼容某种协议当成已有客户端无需修改的保证。', editorial: true, sourceIds: ['deepseek-app-api-guide', 'deepseek-app-api-safety'], locator: '编辑依据客户端呈现、参数边界与拒绝处理归纳；非实测结论' },
  ],
  recommendedResources: [{ id: 'deepseek-app-api-guide-reading', title: 'Build a Chatbot', creator: 'DeepSeek', series: 'DeepSeek API Docs', kind: 'article', url: base + 'guides/build_a_chatbot/', checkedAt, match: '按能力表、协议选择、响应呈现与被忽略参数顺序阅读，理解会话 API 和单纯模型调用的差别。', locator: 'Feature Map → Choose a Protocol → Render a Response → Ignored Parameters', scopeNote: '核读官方指南及示例，未提交密钥、上传文件、调用 API 或运行 demo；当前说明不是发布当日冻结快照。' }],
}];
