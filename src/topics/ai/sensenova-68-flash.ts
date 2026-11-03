import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-11-03';
const announcement = 'https://www.sensetime.com/cn/news/sensenova-6-8-flash-release-20261103-1421';
export const sensenova68Sources: Source[] = [
  { id: 'sensenova-68-flash-release', title: 'SenseNova 6.8 Flash 正式版发布：办公更稳，设计更美', publisher: '商汤', url: announcement, type: '官方公告', language: '简体中文', publishedAt: '2026-11-02', checkedAt, locator: '正文日期；办公智能及内部研发版脚注；设计美学；如何体验', version: '2026-11-03 核查：正文与 article:published_time 为11月2日，URL中的20261103不作为发布日期。' },
  { id: 'sensenova-68-news-date', title: '商汤新闻中心 · SenseNova 6.8 Flash 日期核对', publisher: '商汤', url: 'https://www.sensetime.com/cn/news', type: '官方公告', language: '简体中文', checkedAt, locator: 'SenseNova 6.8 Flash 正式版发布条目：2026/11/02', version: '动态目录当次核查快照；搜索摘要曾显示11月3日，当前目录和正文均为11月2日。' },
  { id: 'sensenova-68-lite-preview', title: 'SenseNova 6.8 Flash Lite Preview开放体验：迈向“委派智能”第一步', publisher: '商汤', url: 'https://www.sensetime.com/cn/news/sensenova-6.8-flash-lite-preview', type: '官方公告', language: '简体中文', publishedAt: '2026-08-11', checkedAt, locator: '2026/08/11；开篇区分Lite Preview、计划中的Lite正式版和Flash模型', version: '历史预览公告，用于区分型号与发布阶段，不以“即将发布”承诺倒推实际发布日期。' },
];
export const sensenova68Events: TimelineEvent[] = [{
  id: 'sensenova-6-8-flash', date: '2026-11-02', dateLabel: '2026年11月2日（官方正文及当前新闻目录日期；不取URL日期）',
  title: 'SenseNova 6.8 Flash 正式版发布', company: '商汤', kind: '模型正式版与在线体验', tracks: ['models'],
  entityIds: ['sensenova'], sourceIds: sensenova68Sources.map(s => s.id), milestone: true,
  summary: '商汤发布面向办公协作与设计交付的 SenseNova 6.8 Flash 正式版；公告列出在线体验和 Token Plan 入口。',
  significance: '编辑解读：模型演进进一步关注可继续编辑的交付物，以及多轮任务中的协作过程。',
  limitation: '能力与评测为厂商报告，未独立复现或调用。主动交互演示仅基于小浣熊内部研发版，设计入口仍为 Design 实验版；不能据此宣称所有功能均已公开可用。未核实本模型权重开放。',
  tags: ['办公协作', '设计生成', '正式版', '多模态'],
  change: {
    baseline: '2026年8月11日的 SenseNova 6.8 Flash Lite Preview 公告；Lite Preview 与 Flash 是不同型号，本条比较发布阶段，不量化性能差距',
    improvements: ['公布6.8 Flash正式版及在线体验入口', '厂商描述动态PPT、海报、网页与3D设计交付', '展示跨任务、跨会话协作方向，公开功能与内部演示分别说明'],
    tradeoffs: '此前预览页的发布计划不是实际交付日期。主动交互仍为内部演示；Blender场景需要本地环境与用户多轮反馈，不能视为一键全自动。',
    evidence: '厂商报告', sourceIds: ['sensenova-68-flash-release', 'sensenova-68-lite-preview'],
  },
  details: [
    { label: '经过：型号与日期分别核对', text: '8月11日公告开放的是 Flash Lite Preview，并把 Flash 列为后续计划。此次正文与当前新闻目录均标11月2日，记录 Flash 正式版；URL中的11月3日和搜索摘要日期不替代正文日期，也不把历史计划当作已发布事实。', sourceIds: ['sensenova-68-flash-release', 'sensenova-68-news-date', 'sensenova-68-lite-preview'], locator: '两篇公告的日期、型号和发布阶段；新闻目录对应条目' },
    { label: '交付：从内容生成到可编辑成果', text: '公告介绍动态PPT、海报、网页与SVG、网页3D及Blender设计，也提到Figma工作流。Blender示例明确依赖本地环境和用户多轮交互；这些是厂商能力说明，不是本项目的质量、兼容性或成功率测试。', sourceIds: ['sensenova-68-flash-release'], locator: '设计美学：01–06；动态3D Blender限制脚注' },
    { label: '边界：主动交互仍是内部演示', text: '公告以长期记忆和主动交互展示办公协作方向，但两处案例均标明使用小浣熊内部研发版。不能由模型正式发布推断这些主动功能已经向所有用户开放。', sourceIds: ['sensenova-68-flash-release'], locator: '办公智能；两处“主动交互功能演示”脚注' },
    { label: '接入：正式模型与实验入口并存', text: '官方列出SenseNova Studio、Token Plan和小浣熊入口，设计体验需进入Design实验版。本次只核读发布材料，未登录、调用或验收这些渠道；公告提到的Loop-9B-Preview是另一模型，不能作为6.8 Flash开放权重的证据。', sourceIds: ['sensenova-68-flash-release'], locator: '如何体验；模型新路径探索' },
    { label: '编辑分析：把交付与可用性分开看', text: '这次更新值得观察的是可编辑成果与多轮协作的结合。模型名称、工具环境、具体入口和实际交付质量仍需逐项验证，演示效果不能代替真实任务验收。', editorial: true, sourceIds: ['sensenova-68-flash-release'], locator: '基于设计演示与接入限制的编辑归纳，非独立评测结论' },
  ],
  recommendedResources: [{ id: 'sensenova-68-release-reading', title: 'SenseNova 6.8 Flash 正式版发布', creator: '商汤', series: '商汤官方发布', kind: 'article', url: announcement, publishedAt: '2026-11-02', checkedAt, match: '结合设计交付示例，逐项辨认正式模型、实验入口和内部研发演示的区别。', scopeNote: '厂商材料；已核读正文及限制脚注，未复现评测、完整播放演示或实际调用。', locator: '办公智能脚注；设计美学；如何体验' }],
}];
