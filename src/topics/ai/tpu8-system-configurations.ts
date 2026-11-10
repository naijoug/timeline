import type { Entity, Source, TimelineEvent } from './types';

const checkedAt = '2026-11-10';
const announcement = 'https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/';
const baseline = 'https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/eighth-generation-tpu-agentic-era/';
const sourceIds = ['tpu8-system-configurations-announcement', 'tpu8-generation-background'];
export const tpu8Sources: Source[] = [
  { id: sourceIds[0], title: 'Our newest TPUs: 8tx and 8i Max, built for the agentic era', publisher: 'Amin Vahdat · Google', url: announcement, type: '官方公告', publishedAt: '2026-11-09', checkedAt, locator: '发布日期；Building the computer around the chip；TPU 8tx；TPU 8i Max；Opening up TPUs to every developer' },
  { id: sourceIds[1], title: 'Our eighth generation TPUs: two chips for the agentic era', publisher: 'Amin Vahdat · Google', url: baseline, type: '官方公告', checkedAt, locator: 'TPU 8t；TPU 8i；Infrastructure for the agentic era。此来源用于同代基线，不将旧文的未来GA承诺当作当前可用性证明。' },
];
export const tpu8Entities: Entity[] = [{
  id: 'google-tpu', name: 'Google TPU', type: 'product', company: 'Google',
  description: 'Google 的 AI 加速器与配套系统。本专题区分芯片代际、系统配置及服务开放阶段。',
  tags: ['AI 基础设施', '加速器'], sourceIds,
}];
export const tpu8Events: TimelineEvent[] = [{
  id: 'tpu8tx-8imax-announcement', date: '2026-11-09', dateLabel: '2026年11月9日（官方公告日；仅日精度）',
  title: 'TPU 8tx 与 8i Max：同代芯片的新系统配置',
  summary: 'Google 宣布 TPU 8tx 与 TPU 8i Max，分别面向机密计算和长上下文负载；这是第八代 TPU 系统扩展。',
  significance: '编辑解读：AI 基础设施的变化不只在芯片换代，也在内存、互联与安全如何围绕工作负载组合。',
  limitation: '记录公告，不认定硬件已正式可用（GA）；地区、价格和客户准入未确认。未运行硬件或独立验证性能及安全主张。',
  company: 'Google', kind: '基础设施系统公告', tracks: ['methods'], entityIds: ['google-tpu'], sourceIds,
  milestone: false, tags: ['TPU 8tx', 'TPU 8i Max', '机密计算', '长上下文', 'AI 基础设施'],
  details: [
    { label: '背景：训练与推理已有同代分工', text: '此前第八代 TPU 已分为侧重训练的8t与侧重推理的8i。旧公告的未来开放承诺不能证明新配置当前可购买或部署。', sourceIds: [sourceIds[1]], locator: 'TPU 8t；TPU 8i；Infrastructure for the agentic era' },
    { label: '变化：系统配置，不是新一代芯片', text: '8tx沿用8t硅片并结合主机与互联，强调使用中数据和权重的隔离。8i Max把两颗8i放入同一封装，面向长上下文的内存与计算需求。', sourceIds: [sourceIds[0]], locator: 'Building the computer around the chip；TPU 8tx；TPU 8i Max' },
    { label: '开放边界：软件 GA 不等于硬件 GA', text: '同文将 Cloud Pathways 与 GKE dynamic slicing 标为正式可用；TPU agent suite仍标预览。不能把这些软件阶段转移到8tx或8i Max。', sourceIds: [sourceIds[0]], locator: 'Opening up TPUs to every developer' },
    { label: '编辑分析：评价应回到具体负载', text: '可分别追问数据保护范围、内存瓶颈、服务供给和总成本。系统定位不能代替独立安全评估，也不能推出所有模型都会更快、更便宜或更准确。', editorial: true, sourceIds, locator: '根据系统分工与开放边界作编辑归纳，非硬件实测' },
  ],
  recommendedResources: [
    { id: 'tpu8-systems-reading', title: 'TPU 新系统与开放阶段', creator: 'Amin Vahdat · Google', kind: 'article', url: announcement, publishedAt: '2026-11-09', checkedAt, match: '对读芯片与系统的区别，再逐项确认硬件、软件各自的开放阶段。', scopeNote: '厂商公告，未验证其性能或安全效果；不将文中软件GA视为新硬件GA。', locator: 'Building the computer around the chip；Opening up TPUs to every developer' },
    { id: 'tpu8-baseline-reading', title: 'TPU 8t 与 8i 的同代分工', creator: 'Amin Vahdat · Google', kind: 'article', url: baseline, checkedAt, match: '先理解训练和推理的基线，再比较系统配置扩展。', scopeNote: '历史背景资料；本轮可读正文未显示精确发表日，不补造日级日期，也不据旧文推定当前供给。', locator: 'TPU 8t；TPU 8i；Infrastructure for the agentic era' },
  ],
}];
