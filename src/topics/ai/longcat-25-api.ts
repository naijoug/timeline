import type { Entity, Source, TimelineEvent } from './types';
const checkedAt = '2026-11-02';
export const longcat25Sources: Source[] = [
  { id: 'longcat-25-changelog', title: 'LongCat API 更新日志：LongCat-2.5 上线', publisher: 'LongCat', url: 'https://longcat.chat/platform/docs/zh/ChangeLog.html', type: '官方公告', language: '简体中文', publishedAt: '2026-11-02', checkedAt, locator: '2026-11-02 LongCat-2.5；2026-09-25 LongCat-2.5-Preview', version: '日期取日志版本日期，没有具体发布时刻；同页重复的日期区块合并为同一公告，不重复计事件。' },
  { id: 'longcat-25-changelog-en', title: 'LongCat API Change Log: LongCat-2.5 Now Available', publisher: 'LongCat', url: 'https://longcat.ai/platform/docs/ChangeLog.html', type: '官方公告', language: 'English', publishedAt: '2026-11-02', checkedAt, locator: 'Version 2026-11-02；Version 2026-09-25', version: '与中文日志核对发布阶段，不视为独立第三方评测。' },
  { id: 'longcat-25-quickstart', title: 'LongCat API 快速开始', publisher: 'LongCat', url: 'https://longcat.chat/platform/docs/zh/', type: '官方文档', language: '简体中文', checkedAt, locator: '支持的模型、接入端点及OpenAI/Anthropic API格式', version: '持续更新文档；本次只核读接入说明，未创建密钥或实际调用服务。' },
  { id: 'longcat-25-vision', title: 'LongCat-2.5 视觉理解：图片与视频输入', publisher: 'LongCat', url: 'https://longcat.chat/platform/docs/zh/image-video-understanding', type: '官方文档', language: '简体中文', checkedAt, locator: '视觉理解；传入图片；传入视频；接口信息', version: '支持范围为厂商文档说明，示例代码未执行。' },
];
export const longcat25Entities: Entity[] = [{
  id: 'longcat', name: 'LongCat', type: 'family', company: '美团',
  description: 'LongCat 模型系列；官方 API 日志分别记录模型预览与后续上线阶段。',
  tags: ['多模态', '模型家族'], sourceIds: ['longcat-25-changelog'],
}];
export const longcat25Events: TimelineEvent[] = [{
  id: 'longcat-2-5-api', date: '2026-11-02', dateLabel: '2026年11月2日（官方API日志日期，具体时刻未披露）',
  title: 'LongCat-2.5 API 上线', company: '美团', kind: '模型 API 上线', tracks: ['models'],
  entityIds: ['longcat'], sourceIds: longcat25Sources.map(source => source.id), milestone: true,
  summary: 'LongCat API 日志记录2.5版本上线，与9月25日的2.5-Preview分列；当前文档列出模型接入和图片、视频理解能力。',
  significance: '编辑概述：记录从Preview到非Preview命名API的可用阶段变化，为多模态编程与工具工作流增加一个模型选项。',
  limitation: '官方公告API可用，未实际调用；未核实2.5权重开放，不标开源。能力描述来自厂商，未独立复现评测；兼容Agent运行框架不等于独立Agent产品发布，也不证明所有账号或任务均可顺利使用。',
  tags: ['API开放', '多模态理解', '编码', '工具调用'],
  change: {
    baseline: '2026年9月25日LongCat-2.5-Preview；此前预览未单独建档，本条不改写其发布时间',
    improvements: ['官方日志新增非Preview命名的LongCat-2.5上线阶段', '当前API文档列出图片与视频输入', '官方提供OpenAI与Anthropic兼容接入格式'],
    tradeoffs: '这里比较发布阶段和已说明的接入范围，不据此量化相对Preview的性能提升。模型、运行框架、账号权限与实际任务成功率需要分别验收。',
    evidence: '厂商报告', sourceIds: ['longcat-25-changelog', 'longcat-25-quickstart', 'longcat-25-vision'],
  },
  details: [
    { label: '经过：预览与后续上线分开', text: '官方中英文API日志分别列出2026年9月25日的LongCat-2.5-Preview和11月2日的LongCat-2.5。本节点记录后者，不将同页重复区块计成两次发布；日期精确到日，不能据本次发现时间推断公告刚刚发生。', sourceIds: ['longcat-25-changelog', 'longcat-25-changelog-en'], locator: '两个版本日期的对应条目' },
    { label: '接入：模型能力与运行框架各有边界', text: '快速开始页面将LongCat-2.5列为支持模型，给出OpenAI与Anthropic兼容入口。视觉文档说明它可在文本之外接收图片、视频；视频以URL传入。发布方强调多步推理、工具使用和与多种Harness的适配，这些属于模型与接入说明，不是独立Agent应用的首次发布。', sourceIds: ['longcat-25-changelog', 'longcat-25-quickstart', 'longcat-25-vision'], locator: '上线特性；支持的模型与接入端点；视觉理解及传入视频' },
    { label: '证据边界：上线公告不是实测结果', text: '本次读取官方日志与调用文档，没有创建API Key、发起请求或执行示例。公开API接入不等于权重可下载；这里尚未核实2.5权重开放。厂商对编程、设计和长任务的描述不直接作为第三方能力排名，亦不由参数容量推导实际工程任务成功率。', sourceIds: ['longcat-25-changelog', 'longcat-25-quickstart'], locator: '官方描述与本次核查范围；无实调或权重验收' },
    { label: '编辑分析：先确认接入阶段，再评估任务适配', text: '对已有编程工作流的团队，先辨清模型版本和接口阶段，再用自己的截图、代码库与失败恢复案例评估，通常比只看厂商排名更有决策价值。兼容接口可以降低试接入的工作量，但不能替代对权限、数据处理、成本和可靠性的验收。', editorial: true, sourceIds: ['longcat-25-quickstart', 'longcat-25-vision'], locator: '基于接入要求的编辑归纳，非独立性能结论' },
  ],
  recommendedResources: [{
    id: 'longcat-25-visual-reading', title: 'LongCat-2.5 视觉理解接入说明', creator: 'LongCat', series: 'LongCat API 官方文档', kind: 'article',
    url: 'https://longcat.chat/platform/docs/zh/image-video-understanding', checkedAt,
    match: '用具体的图片和视频输入格式理解多模态接入边界，连接发布说明与实际工程接口。',
    scopeNote: '厂商使用说明，与独立效果评测分开；只核读文字，未执行示例或发送图像、视频数据。', locator: '传入图片、传入视频与接口信息',
  }],
}];
