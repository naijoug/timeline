import type { Source, TimelineEvent } from './types';

const checkedAt = '2026-11-06';
const release = 'https://ernie.baidu.com/release/ernie-5-5-flash-base/';
const card = 'https://huggingface.co/baidu/ERNIE-5.5-Flash-Base';
export const ernie55BaseSources: Source[] = [
  { id: 'ernie55-base-release', title: 'ERNIE 5.5 Flash Base', publisher: 'Baidu ERNIE Team · ERNIE Blog', url: release, type: '官方公告', checkedAt, locator: 'Introduction；Pre-training；Conclusion and Outlook；Citation（正文仅标年份）' },
  { id: 'ernie55-base-date', title: 'ERNIE 5.5 Flash Model Announcement · 百度官方组织卡', publisher: '百度 · Hugging Face（已验证组织）', url: 'https://huggingface.co/baidu', type: '官方公告', publishedAt: '2026-11-05', checkedAt, locator: 'ERNIE 5.5 Flash Model Announcement：2026-11-05，两项 Base 仓库' },
  { id: 'ernie55-base-card', title: 'ERNIE-5.5-Flash-Base · Model card', publisher: '百度 · Hugging Face', url: card, type: '官方文档', checkedAt, locator: 'Model Overview；Deployment；License' },
  { id: 'ernie55-base-fp8-files', title: 'ERNIE-5.5-Flash-Base · FP8 文件目录', publisher: '百度 · Hugging Face', url: `${card}/tree/028544b2ffceea189b2d8768ed2b9d09b06f2343`, type: '官方文档', checkedAt, version: '2026-11-06 文件可见性核验', locator: 'config.json；model.safetensors.index.json；safetensors 分片' },
  { id: 'ernie55-base-bf16-files', title: 'ERNIE-5.5-Flash-Base-BF16 · 文件目录', publisher: '百度 · Hugging Face', url: 'https://huggingface.co/baidu/ERNIE-5.5-Flash-Base-BF16/tree/dfab899dadcff8f4d08af24b75a26c6d4d2e0b09', type: '官方文档', checkedAt, version: '2026-11-06 文件可见性核验', locator: 'config.json；model.safetensors.index.json；safetensors 分片' },
  { id: 'ernie55-base-license', title: 'ERNIE 5.5 Flash Base Model License Agreement v1.0', publisher: '百度 · Hugging Face', url: `${card}/blob/028544b2ffceea189b2d8768ed2b9d09b06f2343/LICENSE`, type: '官方文档', checkedAt, locator: 'Release date: November 5, 2026；License grant；Commercial use；Acceptable Use Policy' },
];

export const ernie55BaseEvents: TimelineEvent[] = [{
  id: 'ernie-5-5-flash-base', date: '2026-11-05', dateLabel: '2026年11月5日（官方组织卡公告日；11月6日核验文件可见）',
  title: '文心 ERNIE 5.5 Flash Base 开放预训练权重',
  subtitle: 'FP8 / BF16 · 预训练检查点 · 自定义许可',
  summary: '百度公开 ERNIE 5.5 Flash Base，提供 FP8 与 BF16 权重；这是中期训练、后训练之前的文本基座模型。',
  significance: '编辑解读：把预训练检查点交给研究者继续训练，与直接提供对话产品是不同的开放路径。',
  limitation: '权重受自定义许可约束，不是 MIT／Apache 或不受限开源。本站核对了文件目录与模型卡，未下载全部分片、验证模型完整性或运行推理；没有据此确认托管 API 已开放。',
  tracks: ['models'], entityIds: ['ernie'], company: '百度', kind: '预训练权重发布', milestone: false,
  sourceIds: ernie55BaseSources.map(source => source.id), tags: ['开放权重', 'Base', 'MoE', '预训练', '自定义许可'],
  change: {
    baseline: '此前收录的 ERNIE 5.1 家族节点；Base 与后训练模型阶段不同，不作任务性能直接排名',
    baselineEventId: 'ernie-5-1',
    improvements: ['公开未经过中期训练或后训练的预训练检查点', '提供 FP8 与 BF16 两种权重格式，便于后续训练与部署研究'],
    tradeoffs: 'Base 不能直接等同于指令／聊天模型；模型容量、上下文和评测为厂商声明，运行成本与能力还取决于资源及训练配置。',
    evidence: '厂商报告', sourceIds: ['ernie55-base-release', 'ernie55-base-card'],
  },
  details: [
    { label: '经过：公告与文件核验分开', text: '百度已验证的 Hugging Face 组织卡将两种权重的公告标为11月5日。11月6日检查两项官方目录时可见配置、索引与权重分片；仓库早期提交日期不能证明当时已对外公开。', sourceIds: ['ernie55-base-date', 'ernie55-base-fp8-files', 'ernie55-base-bf16-files'], locator: '组织卡日期条目；两项官方 Files 目录' },
    { label: '背景：预训练完成不等于聊天就绪', text: '官方技术说明把本次检查点定位为领域适配、指令微调和强化学习的起点，并明确后训练版 ERNIE 5.5 Flash 将另行发布。此处不把未来计划记为已经完成。', sourceIds: ['ernie55-base-release'], locator: 'Introduction；Conclusion and Outlook' },
    { label: '规格：声明的训练与推理窗口不同', text: '厂商报告总参数280B、每 token 激活14B，预训练使用33.5T token；预训练上下文最高128K，微调和推理支持1M。稀疏激活参数不等于完整权重的内存需求，上下文容量也不保证全长任务质量。', sourceIds: ['ernie55-base-release', 'ernie55-base-card'], locator: 'Introduction；Pre-training；Model Overview' },
    { label: '访问：格式、许可与 API 不能混为一谈', text: 'FP8 与 BF16 是同一基座的不同权重格式，不是两个独立模型发布。自定义许可包含地域和商用条件，实际使用前须阅读原文。模型卡中的本地 OpenAI 兼容接口示例，不是百度托管 API 上线的证据。', sourceIds: ['ernie55-base-card', 'ernie55-base-license'], locator: 'Deployment；License grant；Commercial use' },
    { label: '编辑分析：先比较训练阶段，再比较能力', text: '这一节点的价值主要是提供可继续训练的共同起点。评价后续成果时，应说明权重精度、后训练数据、推理预算和运行框架，不能把 Base 的原始评测直接当作聊天产品体验。', editorial: true, sourceIds: ['ernie55-base-release', 'ernie55-base-card'], locator: '编辑归纳，依据检查点定位与部署说明' },
  ],
  recommendedResources: [{ id: 'ernie55-base-deployment-reading', title: 'ERNIE-5.5-Flash-Base · Deployment', creator: 'Baidu ERNIE Team', series: 'Hugging Face 官方模型卡', kind: 'article', url: `${card}#deployment`, checkedAt, match: '沿模型卡的架构、评测与部署说明，理解预训练基座怎样进入继续训练或本地推理流程。', scopeNote: '官方技术材料，不是独立实测；示例代码未由本站执行，使用还须遵守模型许可。', locator: 'Deployment；Model Overview' }],
}];
