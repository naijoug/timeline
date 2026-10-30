import type { Entity, Source, TimelineEvent } from './types';
const checkedAt = '2026-10-27';
const announcement = 'https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/';
const model = 'https://deepmind.google/models/genie/';
export const genieSources: Source[] = [
  { id: 'genie4-announcement', title: 'Genie 4: A new generation of world simulation', publisher: 'Google DeepMind · Raia Hadsell、Diego Rivas、Hang Qi', url: announcement, type: '官方公告', publishedAt: checkedAt, checkedAt, locator: '发布日期；four key capabilities；Simulating complex events；Next steps；Understanding current limitations' },
  { id: 'genie4-model', title: 'Genie 4 · capabilities, preview access and limitations', publisher: 'Google DeepMind', url: model, type: '官方文档', checkedAt, locator: 'Join Project Genie waitlist；Limitations；Responsibility；Disclaimer。持续更新页面，状态为核查快照。' },
];
export const genieEntities: Entity[] = [{ id: 'genie', name: 'Genie', type: 'family', company: 'Google DeepMind', description: '生成并交互探索世界的模型路线；与 Gemini 推理模型及 Project Genie 产品入口分开理解。', tags: ['世界模型', '交互模拟'], sourceIds: ['genie4-model'] }];
export const genieEvents: TimelineEvent[] = [{
  id: 'genie-4-research-preview', date: checkedAt, dateLabel: '2026年10月27日（官方研究预览公告日）',
  title: 'Genie 4 研究预览：原生声音与实时世界模拟', company: 'Google DeepMind', kind: '研究预览', tracks: ['models'], entityIds: ['genie'], milestone: true,
  summary: 'Google DeepMind 向受信任测试者提供 Genie 4 研究预览，展示原生声音、交互对白与自然语言实时引导世界模拟。',
  significance: '编辑解读：世界生成与推理引导结合，值得作为交互式 AI 的重要研究节点追踪，而非当作已经可普遍部署的模拟器。',
  limitation: '已开放的是受信任测试者研究预览；Ultra／Project Genie 及 Gemini API／AI Studio 早期伙伴入口仍为即将开放。不代表公开 API 或权重已可用；未运行模型或独立复测。',
  sourceIds: genieSources.map(s => s.id), tags: ['世界模型', '原生音频', '实时交互', '研究预览'],
  change: { baseline: '世界模拟与 Gemini 推理协同的研究路线，不将演示当作同条件定量对照', improvements: ['官方展示原生环境音与交互对白', '用文本在模拟过程中改变场景', '以 Gemini 推理引导多步事件'], tradeoffs: '短时演示不保证长时一致性、真实物理精度或现实机器人任务成功。', evidence: '厂商报告', sourceIds: ['genie4-announcement', 'genie4-model'] },
  details: [
    { label: '经过：预览对象与后续计划分开', text: '10月27日公告确认已开始向受信任测试者推出研究预览。Google AI Ultra 用户在 Project Genie 中的访问，以及 Gemini API、Google AI Studio 早期伙伴访问，仍写作 coming soon；候补名单不是已获得调用权限。', sourceIds: ['genie4-announcement', 'genie4-model'], locator: 'Next steps for Genie 4；Join Project Genie waitlist' },
    { label: '技术变化：生成与推理协作', text: '官方展示环境音和对白随世界生成，用户可用文本修改场景。公告说明 Gemini 3.8 Flash 在循环中观察、拆解目标并检查步骤，另展示 Gemini 4 Argon 引导机器人模拟；这些是团队演示，不是现实机器人已完成同一任务的证据。', sourceIds: ['genie4-announcement'], locator: 'Modeling how the world sounds；Simulating complex events with Gemini models' },
    { label: '边界：可探索不等于可靠数字孪生', text: '模型页说明连续交互目前为数分钟，较长运行或多次修改可能出现物体与视觉细节漂移；真实地点、文字、复杂交互和音频准确性仍有限制。页面还注明演示为说明用途、片段经过缩短，不能据此推出无限稳定运行。', sourceIds: ['genie4-model'], locator: 'Limitations；Disclaimer' },
    { label: '安全披露：标记生成内容并保留判断', text: '团队表示预览前开展内部安全评估，并为生成的视频和音频加入 SynthID。此为发布方披露，不是独立安全认证，也不能让从历史照片生成的场景自动成为史实记录。', sourceIds: ['genie4-model'], locator: 'Responsibility；编辑对生成内容证据边界的提醒' },
    { label: '编辑分析：把可控性与可信度分别验收', text: '我们认为创意预演可以接受的偏差，未必适合工程或机器人验证。评估时应分别记录指令是否生效、对象能否持续保持，以及物理结果是否有外部依据；画面逼真不能替代验证。', editorial: true, sourceIds: ['genie4-model'], locator: '编辑归纳，依据 Limitations 的准确性与一致性边界' },
  ],
  recommendedResources: [
    { id: 'genie4-release-reading', title: 'Genie 4: A new generation of world simulation', creator: 'Raia Hadsell、Diego Rivas、Hang Qi', series: 'Google DeepMind 官方博客', kind: 'article', url: announcement, publishedAt: checkedAt, checkedAt, match: '对照四类能力、Gemini 协作说明与受限预览状态，理解演示和产品可用性不是同一件事。', scopeNote: '核读具体公告正文；页面嵌入演示未独立完整播放，未实际操作模型。这是一手发布说明，不是独立评测。', locator: 'four key capabilities；Next steps；Understanding current limitations' },
  ],
}];
