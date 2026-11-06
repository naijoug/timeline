import type { Source, TimelineEvent } from './types';
const checkedAt = '2026-11-04';
const model = 'https://huggingface.co/moonshotai/Kimi-K3.1-Pro';
export const kimiK31WeightSources: Source[] = [
  { id: 'kimi-k31-weight-files', title: 'Kimi K3.1 Pro · 官方权重文件目录', publisher: '月之暗面 · Hugging Face', url: `${model}/tree/main`, type: '官方文档', checkedAt, version: '2026-11-04 16:06 UTC 检索确认；页面显示提交 6d0a020', locator: '目录标示 1.56 TB；本次可见前39个 safetensors 分片，文件名标注总数96；不是完整下载验证' },
  { id: 'kimi-k31-weight-shard', title: 'Kimi K3.1 Pro · 首个权重分片与下载入口', publisher: '月之暗面 · Hugging Face', url: `${model}/blob/main/model-00001-of-000096.safetensors`, type: '官方文档', checkedAt, version: '2026-11-04 16:06 UTC 检索确认', locator: 'Download file 2.34 GB；Xet Pointer Details；SHA256 7f60e41909fb16712100c311ca4402cc4e66ecc9dff9dad4ebc06f05106c58a1（页面声明，未独立校验）' },
  { id: 'kimi-k31-weight-license', title: 'Kimi K3.1-Pro License', publisher: '月之暗面', url: `${model}/blob/main/LICENSE`, type: '官方文档', checkedAt, version: '2026-11-04 16:06 UTC 核读；页面显示提交 6d0a020', locator: '第1至4条：保留声明、MaaS商业使用、署名要求及例外' },
  { id: 'kimi-k31-weight-card', title: 'Kimi K3.1 Pro · 模型卡与部署说明', publisher: '月之暗面 · Hugging Face', url: model, type: '官方文档', checkedAt, version: '2026-11-04 核查快照；不以模型卡或文件提交时间推断公开日', locator: 'Model Summary；Deployment and Availability；Model Usage' },
];
export const kimiK31WeightEvents: TimelineEvent[] = [{
  id: 'kimi-k3-1-pro-weights-confirmed', date: '2026-11-04', dateLabel: '2026年11月4日（检索确认日，非首次公开日）',
  title: 'Kimi K3.1 Pro：确认官方权重文件公开可见', company: '月之暗面', kind: '权重可用性核验', tracks: ['models'], entityIds: ['kimi'], milestone: false,
  summary: '官方仓库已出现权重分片、下载入口与专用许可；这次记录实际文件可见的核验结果，与10月产品上线和权重预告分开。',
  significance: '编辑解读：模型的获取方式从托管服务扩展到可获取权重的路径，但实际部署仍需核对文件完整性、运行环境和许可条件。',
  limitation: '日期仅表示2026-11-04 16:06 UTC检索确认，不是首次公开日。未核全96个分片、未下载二进制或运行推理；页面下载入口可见不等于完成下载验证。采用定制 Kimi K3.1-Pro License，不能称为无条件MIT开源。',
  sourceIds: kimiK31WeightSources.map(source => source.id), tags: ['开放权重', '可用性核验', '许可', '自部署'],
  change: {
    baseline: '2026年10月24日研究发布节点：产品和API已上线，完整权重当时仍属计划', baselineEventId: 'kimi-k3-1-pro',
    improvements: ['官方权重分片与下载入口已公开可见，不再只有模型卡和预计日期', '仓库提供模型专用许可与部署说明，可进一步评估自部署路线'],
    tradeoffs: '本条记录获取方式与证据状态变化，不声称模型能力再次升级；未验证完整下载或推理，商业使用仍须满足许可条件。',
    evidence: '厂商报告', sourceIds: ['kimi-k31-weight-files', 'kimi-k31-weight-shard', 'kimi-k31-weight-license'],
  },
  details: [
    { label: '时间口径：确认日不是首发日', text: '本次于2026-11-04 16:06 UTC检索确认官方仓库的文件、下载入口和许可已公开可见。现有材料不足以确定首次公开的绝对时刻；不把模型卡日期、文件提交日期或相对活动时间换算成发布日。10月24日节点继续记录产品发布和当时的权重预告。', sourceIds: ['kimi-k31-weight-files', 'kimi-k31-weight-shard', 'kimi-k3-1-pro-announcement'], locator: '本次检索结果与10月公告的Availability段落分别保留' },
    { label: '文件证据：不是空模型卡', text: '目录标示约1.56 TB，检索结果可见前39个safetensors分片，文件名采用96分片编号。首分片页面提供2.34 GB下载入口、Xet指针和SHA256。这支持文件已公开可见，但本次未核全96个分片、未下载二进制、未独立计算校验和，也未运行推理。', sourceIds: ['kimi-k31-weight-files', 'kimi-k31-weight-shard'], locator: 'Files；model-00001-of-000096.safetensors → Download与Xet Pointer Details' },
    { label: '部署：稀疏激活不等于小体积', text: '模型卡列出2.8万亿总参数、每token激活1040亿参数，以及MXFP4权重和MXFP8激活量化；支持文本、图像与约100万token上下文。总权重存储、上下文缓存和运行框架仍决定部署需求，不能把激活参数量当作完整模型体积。官方列出vLLM、SGLang和TokenSpeed部署资料，本次只核读说明。', sourceIds: ['kimi-k31-weight-card', 'kimi-k31-weight-files'], locator: 'Model Summary；Deployment and Availability' },
    { label: '许可：定制条款不是MIT', text: 'Kimi K3.1-Pro License保留使用、修改和分发等权利，同时附带条件。经营MaaS且主体及关联方连续12个月合计收入超过2000万美元的商业使用须另签协议；大型产品另有显著署名条件，第4条列有内部使用及官方渠道等例外。应阅读完整许可，不据“开放权重”推断无条件商业授权。', sourceIds: ['kimi-k31-weight-license'], locator: '第1至4条；这里说明条款边界，不作具体项目法律适用结论' },
    { label: '本次没有新增性能结论', text: '权重文件可见是交付方式变化，不是又一次模型能力发布。10月发布评测保留其原始日期、测试版本与厂商或第三方来源；本次没有下载模型复测，也不把部署示例或页面分数写成已独立验证。', editorial: true, sourceIds: ['kimi-k31-weight-card', 'aa-kimi-k31-launch-evaluation'], locator: '编辑根据本轮验证范围作出的区分' },
  ],
}];
