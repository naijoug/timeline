import type { Source, TimelineEvent } from './types';
const checkedAt = '2026-10-29';
const revision = 'f12dabdc0c1e99e7f7924461a6f308859b05af4d';
const model = 'https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B';
const announcement = 'https://mistral.ai/news/mistral-large-4-oss/';
export const mistralLarge4Sources: Source[] = [
 { id: 'mistral-large4-weight-announcement', title: 'Mistral Large 4 (Le Chonk) is now open weight', publisher: 'Mistral AI', url: announcement, type: '官方公告', publishedAt: '2026-10-29', checkedAt, locator: 'Improved model；Start building with Le Chonk；许可与API价格；页面datePublished为2026-10-29T12:00:07Z', version: '10月29日核查；页面持续更新，发布时间元数据不等于权重首次可下载时刻。' },
 { id: 'mistral-large4-fixed-card', title: 'Mistral Large 4 - Le Chonk · model card', publisher: 'Mistral AI · Hugging Face', url: `${model}/blob/${revision}/README.md`, type: '官方文档', checkedAt, version: revision, locator: 'Key Features；Recommended Settings；vLLM；License' },
 { id: 'mistral-large4-fixed-files', title: 'Mistral Large 4 · fixed-revision weight inventory', publisher: 'Mistral AI · Hugging Face', url: `https://huggingface.co/api/models/mistralai/Mistral-Large-4-1T-A52B/tree/${revision}`, type: '官方文档', checkedAt, version: revision, locator: '54个consolidated safetensors分片，合计1,060,554,587,912字节；非仅模型卡或ETA' },
 { id: 'mistral-large4-fixed-license', title: 'Mistral Ecosystem Open-Weight License', publisher: 'Mistral AI', url: `${model}/blob/${revision}/LICENSE`, type: '官方文档', checkedAt, version: revision, locator: '第2条Model as a Service定义、商业许可条件与第3条例外' },
 { id: 'mistral-large4-api-documentation', title: 'Mistral Large 4 · API model documentation', publisher: 'Mistral AI', url: 'https://docs.mistral.ai/models/mistral-large-4-0', type: '官方文档', checkedAt, locator: 'Public Preview；模型标识与功能', version: '持续更新文档；权重开放不自动改变托管API的预览阶段。' },
];
export const mistralLarge4Events: TimelineEvent[] = [{
 id: 'mistral-large-4-open-weights', date: '2026-10-29', dateLabel: '2026年10月29日（官方权重发布公告；同日核对文件清单）', title: 'Mistral Large 4 权重开放：从 API 预览到可自部署', company: 'Mistral AI', kind: '模型权重公开', tracks: ['models'], entityIds: ['mistral'], milestone: true,
 summary: 'Mistral公布Large 4改进版权重，官方仓库已有54个权重分片；开放权重与此前API预览分别记录，并保留自部署和许可限制。',
 significance: '编辑解读：这一发布把访问托管模型推进到可自行部署和调整模型，但实际成本、运行框架与许可条件仍是交付的一部分。',
 limitation: '采用Mistral Ecosystem Open-Weight License，并非无条件MIT；MaaS商业使用有额外许可要求。API文档仍标Public Preview，不能由权重开放推断API已GA。未下载完整权重、执行推理或独立复现评测。',
 sourceIds: mistralLarge4Sources.map(s => s.id), tags: ['开放权重', '多模态', '混合专家', '推理'],
 change: { baseline: '2026年10月6日Large 4 API公开预览；此处记录后续权重与模型更新，不改写首次预览日期', baselineEventId: 'mistral-large-4-preview', improvements: ['官方权重文件实际可见，支持自行部署路线', '同一权重支持low、medium、high三档推理强度', '厂商发布改进版编码与推理表现说明'], tradeoffs: '稀疏激活不等于仅需存储激活参数；基准成绩来自厂商配置，权重许可和API服务阶段需单独核对。', evidence: '厂商报告', sourceIds: ['mistral-large4-weight-announcement', 'mistral-large4-fixed-card', 'mistral-large4-fixed-license'] },
 details: [
  { label: '经过：计划发布与实际文件分开', text: '10月初记录的是API公开预览，10月29日官方另行宣布改进版权重开放。此次核对固定版本仓库为公开、无需申请访问，含54个safetensors分片，合计约1.06 TB；不再只有Upcoming与预计日期。文件清单证明上传资料存在，本次未下载全部文件验证完整性。', sourceIds: ['mistral-large4-weight-announcement', 'mistral-large4-fixed-files'], locator: '公告；固定版本分片清单。发布时间元数据不代表每个分片的首次可下载时刻。' },
  { label: '技术：激活参数不等于部署体积', text: '模型卡描述约1万亿总参数的混合专家架构；正文区分每token约490亿激活参数，以及计入嵌入和输出层后约520亿。它接受文本与图像、输出文本，声明约100万token上下文。稀疏计算不代表机器只需容纳520亿参数的权重，也不代表长上下文在任意设备上都可低成本运行。', sourceIds: ['mistral-large4-fixed-card', 'mistral-large4-fixed-files'], locator: '模型卡开头；Key Features；vLLM内存与并发说明' },
  { label: '使用：权重、推理档位与托管API', text: '模型提供low、medium、high三档推理强度，默认high。官方示例涉及vLLM、SGLang等运行框架及工具/推理解析器；还需按硬件调整上下文和并发。公告说明API可用，但核查时API文档仍标Public Preview，因此本条不把权重发布升级为API正式可用。', sourceIds: ['mistral-large4-fixed-card', 'mistral-large4-weight-announcement', 'mistral-large4-api-documentation'], locator: 'Recommended Settings；vLLM；Start building；Public Preview' },
  { label: '证据边界：更新版成绩不能混入旧表', text: '发布方称改进版在编码和推理任务上进步，属于厂商报告。不同页面可能保留预览检查点、不同推理档位或执行框架的成绩，不能拼成同一张排行榜，也不能把示例演示当作本项目已执行的验证。这里保留更新事实，不据单一分数宣布普遍领先。', sourceIds: ['mistral-large4-weight-announcement', 'mistral-large4-fixed-card'], locator: '官方更新说明与Benchmarks；未独立复现实验' },
  { label: '许可：开放权重不等于无条件开源', text: '模型采用Mistral Ecosystem Open-Weight License，文本自称修改版MIT。第2条对经营Model as a Service业务的主体规定商业使用需另签许可，并定义该业务及排除情形；第3条另列内部使用和Mistral官方产品访问的例外。应阅读对应版本全文，不能只看到MIT字样就忽略附加条件。', sourceIds: ['mistral-large4-fixed-license'], locator: '第2、3条；此处记录条款边界，不提供具体部署的法律结论' },
  { label: '编辑分析：可控性需要完整交付条件', text: '对有自部署需求的团队，权重可获取让基础设施选择与定制更加可控。是否值得迁移，仍应把任务正确率、失败恢复、总体运行成本和许可适用性一起验收；开放权重是选择增加，不是无需工程投入的保证。', editorial: true, sourceIds: ['mistral-large4-fixed-card', 'mistral-large4-fixed-license'], locator: '依据部署与许可要求的编辑归纳，非独立性能或商业适用结论' },
 ],
 recommendedResources: [{ id: 'mistral-large4-serving-reading', title: 'Mistral Large 4 model card：vLLM serving 与推荐设置', creator: 'Mistral AI', series: 'Hugging Face 官方模型卡', kind: 'article', url: `${model}/blob/${revision}/README.md`, checkedAt, match: '直接对照推理档位、解析器、并发和上下文条件，理解权重下载之后还需要哪些部署工作。', scopeNote: '固定版本的厂商说明；只核读文字和配置，未拉取镜像、下载完整模型或执行推理。', locator: 'Recommended Settings；vLLM；SGLang' }],
}];
