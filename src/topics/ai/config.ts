import type { TimelineEvent } from "./types";
import { events } from "./events";
export type Lane = "methods" | "models" | "products";
export const laneInfo: Record<Lane, { title: string; description: string }> = {
  methods: {
    title: "AI 技术突破",
    description: "新的方法、架构与能力\n推动 AI 边界",
  },
  models: {
    title: "模型演进",
    description: "基础模型持续进化\n从语言走向推理与多模态",
  },
  products: {
    title: "Agent 应用",
    description: "从对话到行动\n走向真实世界的任务执行",
  },
};
export const chinaCompanies = new Set([
  "阿里巴巴",
  "DeepSeek",
  "月之暗面",
  "智谱",
  "MiniMax",
  "百度",
  "腾讯",
  "字节跳动",
  "华为",
  "阶跃星辰",
  "商汤",
]);
const agents = new Set([
  "claude-code",
  "codex",
  "grok-bot",
  "muse",
  "manus",
  "manus-studio",
  "cue",
  "jules",
  "minimax-agent",
  "kimi-agent",
  "ui-tars",
  "copilot",
  "replit-agent",
  "devin",
  "cursor",
  "generative-agents",
  "swe-agent",
  "openhands",
  "autoglm",
  "gemini-cli",
  "qwen-code",
  "trae",
  "mistral-vibe",
  "chatgpt-agent",
  "cowork",
]);
const technicalOverrides = new Set(["skills-introduction", "manus-cascade"]);
export function eventLane(e: TimelineEvent): Lane {
  if (e.tracks.includes("models")) return "models";
  if (
    !technicalOverrides.has(e.id) &&
    e.tracks.includes("products") &&
    e.entityIds.some((id) => agents.has(id))
  )
    return "products";
  return "methods";
}
const additionalKeys = new Set([
  "dpo",
  "rag-paper",
  "chain-of-thought",
  "mcp-standard",
  "long-running-harness",
  "context-engineering",
  "sonnet-4",
  "sonnet-3-7",
]);
export function isKeyEvent(e: TimelineEvent) {
  return e.milestone || additionalKeys.has(e.id);
}
export const shortTitles: Record<string, string> = {
  "formal-neuron": "形式神经元",
  "turing-test": "图灵测试",
  "dartmouth-workshop": "达特茅斯研究项目",
  backprop: "反向传播",
  alexnet: "AlexNet",
  transformer: "Transformer",
  gan: "GAN",
  bert: "BERT",
  ddpm: "扩散模型",
  alphago: "AlphaGo",
  "gpt3-paper": "GPT-3 少样本学习",
  react: "ReAct",
  chatgpt: "ChatGPT",
  dpo: "DPO",
  "chain-of-thought": "思维链提示",
  "rag-paper": "RAG",
  "mcp-standard": "MCP",
  "context-engineering": "上下文工程",
  "long-running-harness": "长任务 Harness",
  "skills-introduction": "Agent Skills",
  "deepseek-r1": "DeepSeek-R1",
  "sonnet-3-7": "Claude 3.7 Sonnet",
  "sonnet-4": "Claude Sonnet 4",
  "claude-code-preview": "Claude Code",
  "codex-cli": "Codex CLI",
  "grok-bot-release": "Grok Bot",
  "muse-design": "Muse",
  "jules-beta": "Jules",
  "minimax-agent-launch": "MiniMax Agent",
  "kimi-ok-computer": "Kimi OK Computer",
  "copilot-coding-agent": "Copilot Agent",
  "devin-introduction": "Devin",
  "cursor-agent-introduction": "Cursor Agent",
  "manus-2": "Manus 2.0",
  "manus-studio": "Manus Studio",
  "cue-release": "Cue",
};
export const eventTitle = (e: TimelineEvent) => shortTitles[e.id] || e.title;

export const MIN_YEAR = Math.min(
  ...events.map((e) => Number(e.date.slice(0, 4))),
);
export const MAX_YEAR = Math.max(
  ...events.map((e) => Number(e.date.slice(0, 4))),
);
export const YEAR_COUNT = MAX_YEAR - MIN_YEAR + 1;
export const aiPresentation = {
  title: "全球 AI 时间线",
  subtitle: "从图灵到生成式 AI",
  lanes: ["methods", "models", "products"] as Lane[],
  preferredEvents: ["claude-code-preview", "skills-introduction"],
  defaultRange: [2023, 2025] as const,
  defaultEvent: "llama-2",
  latestEvent: "manus-2",
  landmark: {
    year: 2017,
    date: "2017-06-12",
    title: "Transformer",
    event: "transformer",
  },
};
