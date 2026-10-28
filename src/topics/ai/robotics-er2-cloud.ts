import type { Entity, Source, TimelineEvent } from './types';
const checkedAt = '2026-10-28';
const cloud = 'https://cloud.google.com/blog/products/ai-machine-learning/gemini-robotics-embodied-reasoning-2-is-now-available-on-google-cloud';
const model = 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/robotics-er-2';
export const roboticsErSources: Source[] = [
  { id: 'robotics-er2-original', title: 'Introducing Gemini Robotics ER 2', publisher: 'Google DeepMind', url: 'https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/', type: '官方公告', publishedAt: '2026-07-30', checkedAt, locator: '正文开头：high-level brain；Gemini API / AI Studio 与 Agent Platform private preview（不采用页面 AI 摘要代替正文）' },
  { id: 'robotics-er2-cloud-preview', title: 'Gemini Robotics Embodied Reasoning 2 is now available on Google Cloud', publisher: 'Google Cloud', url: cloud, type: '官方公告', publishedAt: '2026-10-27', checkedAt, locator: '开头 public preview；Get started；企业集成与低层控制接口' },
  { id: 'robotics-er2-cloud-spec', title: 'Gemini Robotics ER 2 · model information', publisher: 'Google Cloud', url: model, type: '官方文档', checkedAt, version: 'gemini-robotics-er-2-preview · 2026-10-28 snapshot', locator: 'Model ID；APIs；Versions → Preview / October 27, 2026' },
];
export const roboticsErEntities: Entity[] = [{ id: 'gemini-robotics-er', name: 'Gemini Robotics ER', type: 'family', company: 'Google DeepMind', description: '机器人高层具身推理模型：理解场景、规划和调用工具；与低层动作执行模型、不同托管渠道分开记录。', tags: ['具身推理', '机器人'], sourceIds: ['robotics-er2-original'] }];
export const roboticsErEvents: TimelineEvent[] = [{
  id: 'gemini-robotics-er2-cloud-preview', date: '2026-10-27', dateLabel: '2026年10月27日（Google Cloud 公开预览；模型最初公告为7月30日）',
  title: 'Gemini Robotics ER 2 进入云端公开预览', company: 'Google DeepMind', kind: '云平台公开预览', tracks: ['models'], entityIds: ['gemini-robotics-er'], milestone: false,
  summary: 'Google Cloud 将 Gemini Robotics ER 2 从该渠道的私有预览推进为公开预览，提供高层机器人推理与工具编排入口。',
  significance: '编辑解读：价值在于开发者接入渠道扩大；不能把云平台开放日期写成模型首次发布，或把预览写成正式商用版。',
  limitation: '这是托管公开预览，不是 GA 或权重开放。本次未调用付费 API、运行机器人或复测厂商指标；模型规划也不等于硬件执行安全得到保证。',
  sourceIds: roboticsErSources.map(s => s.id), tags: ['机器人', '具身推理', '公开预览', 'API', '渠道开放'],
  change: { baseline: '7月30日公告时云平台为私有预览，本次只比较接入状态，不声称模型性能升级', improvements: ['Google Cloud 渠道进入公开预览'], tradeoffs: '仍是 Preview；不同渠道的 API 支持和使用条件须分别核对。', evidence: '厂商报告', sourceIds: ['robotics-er2-original', 'robotics-er2-cloud-preview', 'robotics-er2-cloud-spec'] },
  details: [
    { label: '经过：模型首发与渠道开放分开', text: '7月30日的原始公告已向开发者开放 Gemini API 与 AI Studio，并把 Enterprise Agent Platform 标为私有预览。10月27日云公告和版本表共同确认该云渠道进入公开预览，不能据此将模型首发改到10月。', sourceIds: ['robotics-er2-original', 'robotics-er2-cloud-preview', 'robotics-er2-cloud-spec'], locator: '原始公告正文；云公告 public preview；Versions' },
    { label: '背景：高层推理不是直接取代动作控制', text: 'ER 2 负责理解场景、分解任务与调用工具；原始公告明确把电机动作交给较低层的视觉—语言—动作模型。云公告则说明可把导航、VLA 或自定义控制接口作为工具接入，不是下载一个模型就能自动适配所有机器人。', sourceIds: ['robotics-er2-original', 'robotics-er2-cloud-preview'], locator: 'high-level brain / motor execution；low-level control interfaces' },
    { label: '接入：按具体云渠道的能力表开发', text: '10月28日核查的云文档使用 gemini-robotics-er-2-preview，标明基于 Gemini 3.5 Flash。该渠道支持 GenerateContent 与函数调用，但表中 Gemini Live、Interactions、Chat Completions 均为不支持。其他渠道的实时能力说明不能直接当作这条云 API 的契约。', sourceIds: ['robotics-er2-cloud-spec'], locator: '模型说明；Tools；APIs' },
    { label: '影响与边界：预览不是现场验收', text: '企业可以把推理接入既有云端编排流程，但开放阶段仍是 Preview。官方示例和客户引语说明用途，不是所有工厂或设备的独立验证；这里不将厂商报告的任务成绩转成可靠性承诺。', sourceIds: ['robotics-er2-cloud-preview', 'robotics-er2-cloud-spec'], locator: '客户案例；Preview notice；Versions' },
    { label: '编辑分析：先验证任务闭环，再扩大自动化', text: '我们建议将场景理解、工具参数、动作反馈和异常停止分别验收。只有模型说“成功”不够，还要有环境反馈证明动作完成；模拟接口跑通与真实硬件安全属于不同层次，不能互相替代。', editorial: true, sourceIds: ['robotics-er2-original', 'robotics-er2-cloud-preview'], locator: '编辑基于高层推理与低层执行分工的归纳，非厂商原话或本项目实测' },
  ],
  recommendedResources: [{ id: 'robotics-er2-task-orchestration-guide', title: 'Task orchestration · Gemini Robotics ER 2', creator: 'Google Cloud 文档团队', series: 'Gemini Enterprise Agent Platform 开发指南', kind: 'article', url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/gemini-robotics-er/orchestration', checkedAt, match: '具体演示如何把移动、夹爪等函数声明为工具，并循环传回结果；适合理解模型规划与执行接口之间的分工。', scopeNote: '指南示例使用 mock robot API，所示输出是可能输出，不是本项目执行记录，也不是真实机器人安全认证。本次未运行示例。', locator: '工具声明；agentic loop；possible output / mock robot API' }],
}];
