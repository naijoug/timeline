import { sitePath } from '../../lib/paths';
import type { Entity, Relation, TimelineEvent } from './types';
import { globalEntities } from './global';
import { releaseEntities } from './releases';
import { instructionEntities } from './instruction-following';
import { historicalEntities } from './historical-milestones';
export const entities: Entity[] = [
  ...globalEntities,
  ...releaseEntities,
  ...instructionEntities,
  ...historicalEntities,
  { id: 'mcp', name: 'MCP', type: 'concept', description: '连接 AI 应用与外部数据、工具的开放协议。与 Skills 的任务知识和 Agent 的运行循环各有分工。', tags: ['协议', '工具连接'], sourceIds: ['mcp'] },
  { id: 'neural-networks', name: '神经网络', type: 'concept', description: '通过连接和参数学习，把输入转化为预测。从早期形式神经元，到现代深度学习。', tags: ['深度学习', '学习方法'], sourceIds: ['mcculloch', 'backprop'] },
  { id: 'symbolic-ai', name: '符号主义与专家系统', type: 'concept', description: '用符号、知识和规则完成推理。它与学习方法长期并行发展。', tags: ['知识表示', '推理'], sourceIds: ['chm'] },
  { id: 'prompt', name: 'Prompt engineering', type: 'concept', description: '通过任务说明、示例和上下文引导模型。它与 Skills、工具使用和 Agent 可以组合。', tags: ['提示方法'], sourceIds: ['agents'] },
  { id: 'agent', name: 'Agent', type: 'concept', description: '根据目标与环境反馈选择行动的系统。任务可以经历多轮工具调用和检查。', tags: ['工具使用', '自主执行'], sourceIds: ['agents', 'react'] },
  { id: 'loop', name: 'Agent loop', type: 'concept', description: '执行、观察结果、调整并继续的循环。Loop 是运行机制，不是 Agent 之后的新一代产品。', tags: ['反馈', '验证'], sourceIds: ['agents'] },
  { id: 'skills', name: 'Agent Skills', type: 'concept', description: '把专业知识、流程和资源组织成可按需加载的能力包。此处追踪具体的 Agent Skills 方案。', tags: ['能力复用', '开放标准'], sourceIds: ['skills'] },
  { id: 'harness', name: 'Agent harness', type: 'concept', description: '组织模型、工具、状态与执行过程的运行框架，帮助 Agent 跨越多轮甚至多次会话工作。', tags: ['长任务', '运行环境'], sourceIds: ['harness'] },
  { id: 'context', name: 'Context engineering', type: 'concept', description: '管理模型每一步看到的信息：指令、记忆、工具结果和外部资料。', tags: ['上下文', '记忆'], sourceIds: ['harness'] },
  { id: 'transformer', name: 'Transformer', type: 'concept', description: '以注意力机制组织序列信息的架构，也是许多现代语言模型的重要基础。', tags: ['架构', '注意力'], sourceIds: ['transformer'] },
  { id: 'claude-code', name: 'Claude Code', type: 'product', company: 'Anthropic', description: '从终端中的编码 Agent，发展到 IDE 集成和更广泛的工程工作流。', tags: ['编码', '工具使用'], sourceIds: ['sonnet37', 'claude4'] },
  { id: 'codex', name: 'Codex', type: 'product', company: 'OpenAI', description: '面向软件开发的 Agent 产品。产品发布和具体基础模型版本分别记录。', tags: ['编码', '云端任务'], sourceIds: ['api-changelog', 'codex-changelog'] },
  { id: 'rag', name: 'RAG', type: 'concept', description: '检索外部资料，再结合这些资料生成回答。检索质量、信息时效和引用依据都影响结果。', tags: ['检索', '知识'], sourceIds: ['rag'] },
  { id: 'alignment', name: '偏好与指令对齐', type: 'concept', description: '用指令示例和偏好反馈训练模型，让输出更符合使用者意图。', tags: ['训练', '偏好'], sourceIds: ['instructgpt', 'dpo'] },
  { id: 'generative', name: '生成模型', type: 'concept', description: '学习数据中的规律并生成新样本。VAE、GAN 与扩散模型代表不同的方法路线。', tags: ['生成', '图像'], sourceIds: ['vae', 'gan', 'ddpm'] },
  { id: 'grok-bot', name: 'Grok Bot', type: 'product', company: 'xAI', description: '拥有持续云电脑的 AI 队友，支持后台任务、例行工作和多个 Bot 协作。', tags: ['长期任务', '多 Agent', '云电脑'], sourceIds: ['grokbot'] },
  { id: 'muse', name: 'Muse', type: 'product', company: 'Meta', description: '围绕个人目标工作的 Agent，通过云电脑、持久上下文和主动跟进处理日常任务。', tags: ['个人助理', '长期任务', '云电脑'], sourceIds: ['muse'] },
  { id: 'manus', name: 'Manus', type: 'product', company: 'Manus', description: '覆盖研究、创作和应用构建的通用任务 Agent；产品架构与基础模型分开追踪。', tags: ['通用任务', '创作'], sourceIds: ['manus16', 'manus2'] },
  { id: 'manus-studio', name: 'Manus Studio', type: 'product', company: 'Manus', description: 'Manus 的桌面工作空间，让人与 AI 在作品、代码和专业编辑环境中协作。', tags: ['协作创作', '工作空间'], sourceIds: ['manus2'] },
  { id: 'cue', name: 'Cue', type: 'product', company: 'Manus', description: 'Manus 推出的独立个人 Agent 应用，为 Agent 配置电话、邮箱、钱包与电脑等身份能力。', tags: ['个人助理', '多 Agent'], sourceIds: ['cue', 'manus2'] },
  { id: 'claude', name: 'Claude', type: 'family', company: 'Anthropic', description: '追踪 Claude 的代表版本，包括推理、编程、工具使用的变化；不同档位分别记录。', tags: ['推理', '编程'], sourceIds: ['sonnet37', 'claude4'] },
  { id: 'deepseek', name: 'DeepSeek', type: 'family', company: 'DeepSeek', description: '追踪公开模型与推理模型的代表发布，区分模型更新、研究报告和服务开放。', tags: ['开放权重', '推理'], sourceIds: ['r1'] },
  { id: 'grok', name: 'Grok', type: 'family', company: 'xAI', description: '追踪 Grok 模型发布、API 开放及输入能力的变化，与 Grok Bot 产品分开记录。', tags: ['推理', '工具使用'], sourceIds: ['grok-releases'] },
];
export const entityMap = Object.fromEntries(entities.map(e => [e.id, e]));
export const entityCollection = (type: Entity['type']) => ({ concept: 'concepts', family: 'models', product: 'products', person: 'people', organization: 'organizations' })[type];
export const entityLabel = (type: Entity['type']) => ({ concept: '技术与方法', family: '模型家族', product: 'Agent 产品', person: '论文作者', organization: '研究机构' })[type];
export const entityHref = (id: string) => { const e = entityMap[id]; return e ? sitePath(`/ai/${entityCollection(e.type)}/${id}/`) : sitePath('/ai/'); };
export const eventHref = (event: TimelineEvent) => { const family = event.entityIds.find(id => entityMap[id]?.type === 'family'); return event.tracks.includes('models') && family ? sitePath(`/ai/models/${family}/${event.id}/`) : sitePath(`/ai/events/${event.id}/`); };
export const relations: Relation[] = [
  { from: 'manus-studio', to: 'manus', label: '桌面工作空间', sourceIds: ['manus2'], since: '2026-09' },
  { from: 'cue', to: 'manus', label: '共享基础设施的独立应用', sourceIds: ['manus2'], since: '2026-09' },
  { from: 'skills', to: 'agent', label: '提供可复用任务知识', sourceIds: ['skills'] },
  { from: 'loop', to: 'agent', label: '执行与反馈机制', sourceIds: ['agents'] },
  { from: 'harness', to: 'agent', label: '组织运行过程', sourceIds: ['harness'] },
  { from: 'claude-code', to: 'skills', label: '支持 Agent Skills', sourceIds: ['skills'], since: '2025-10-16' },
];
