import type { Entity, Source, TimelineEvent } from './types';

const checkedAt = '2026-11-11';
const announcement = 'https://www.minimax.io/blog/minimax-h3-image';
const model = 'https://huggingface.co/MiniMaxAI/MiniMax-H3-Image';
const initial = '7b6142f879bf7a973c449e1dea5480289736cdbd';
const diffusers = '492fd8c4eca666f1085f57e30738c1e0d86b3439';
const repository = 'https://github.com/MiniMax-AI/MiniMax-H3-Image';
const revision = '6ea7b9e55523a2177e4f759db372065ba6089510';
const readme = `${repository}/blob/${revision}/README.md`;
const license = `${repository}/blob/${revision}/LICENSE`;

export const h3ImageSources: Source[] = [
  { id: 'minimax-h3-image-release-post', title: 'MiniMax H3-Image is here · official release thread', publisher: 'MiniMax · X @MiniMax_AI', url: 'https://x.com/MiniMax_AI/status/2120179737695826420', type: '官方公告', publishedAt: '2026-11-10', checkedAt, locator: '主帖 DOM time：2026-11-10T15:40:15.000Z；available now 与 open-weight', version: '云浏览器只读核查原帖时间；本地显示日期为11月11日，不冒充UTC。' },
  { id: 'minimax-h3-image-announcement', title: 'MiniMax H3-Image: Bringing 4K Image Generation into the 10-Second Era', publisher: 'MiniMax', url: announcement, type: '官方公告', publishedAt: checkedAt, checkedAt, locator: '发布日期；开放权重；API Platform、MiniMax Code 与 Hailuo 入口', version: '博客标注11月11日；不把博客日期当作权重首次上传日。' },
  { id: 'minimax-h3-image-initial-files', title: 'MiniMax-H3-Image · initial release files', publisher: 'MiniMax · Hugging Face', url: `${model}/commit/${initial}`, type: '官方文档', publishedAt: '2026-11-10', checkedAt, locator: 'Initial commit；transformer 的12个 safetensors 分片、索引及 VAE', version: initial },
  { id: 'minimax-h3-image-diffusers-files', title: 'MiniMax-H3-Image · Diffusers format weights', publisher: 'MiniMax · Hugging Face', url: `${model}/commit/${diffusers}`, type: '官方文档', publishedAt: '2026-11-10', checkedAt, locator: 'Add diffusers format weights；transformer_diffusers、text_encoder、vae 与配置', version: diffusers },
  { id: 'minimax-h3-image-readme', title: 'MiniMax-H3-Image · architecture and serving guide', publisher: 'MiniMax · GitHub', url: readme, type: '官方文档', checkedAt, locator: 'Introduction；Model Architecture；Quick Start；Request parameters', version: revision },
  { id: 'minimax-h3-image-license', title: 'MiniMax-H3-Image Community License Agreement', publisher: 'MiniMax', url: license, type: '官方文档', publishedAt: '2026-11-10', checkedAt, locator: 'Release/license date；I.5、II、IV、V；IX', version: revision },
];

export const h3ImageEntities: Entity[] = [
  { id: 'minimax-h3-image', name: 'MiniMax H3-Image', type: 'family', company: 'MiniMax', description: 'H3 路线的静态图像生成与编辑模型；与 MiniMax 的语言模型、H3 视频功能分开记录。', tags: ['图像生成', '图像编辑', '开放权重'], sourceIds: ['minimax-h3-image-readme', 'minimax-h3-image-license'] },
];

export const h3ImageEvents: TimelineEvent[] = [{
  id: 'minimax-h3-image-weights', date: '2026-11-10', dateLabel: '2026年11月10日（官方帖15:40 UTC；博客标11月11日）',
  title: 'MiniMax H3-Image 权重发布：高分辨率生成与编辑', company: 'MiniMax', kind: '模型权重发布', tracks: ['models'], entityIds: ['minimax-h3-image'], milestone: true,
  summary: 'MiniMax 公开 H3-Image 图像模型权重与运行资料，将文本生图和多参考图编辑放进同一模型；自定义社区许可另有地域和商业限制。',
  significance: '编辑解读：可检查的模型文件让高分辨率图像工作流有了自部署路线，但文件公开、运行成本和合法使用范围是不同问题。',
  limitation: '不是无条件开源：标准许可排除欧盟、英国、韩国和美国，第三方托管等情形须另获授权。速度与画质为厂商报告；本站未下载完整权重、调用付费 API 或运行推理。',
  sourceIds: h3ImageSources.map(source => source.id), tags: ['开放权重', '图像生成', '图像编辑', '社区许可'],
  change: { baseline: '首次收录 H3-Image；承接 H3 架构但去除音频分支，不把图像版本当作 H3 视频模型首次发布', improvements: ['同一检查点用于文本生图与参考图编辑', '官方公布原生约1600万像素输出与最多16张参考图', '实际权重分片与 Diffusers 格式转换资料已公开'], tradeoffs: '厂商的速度、质量与参考图演示不代表任意硬件的效果；部署须分别核对依赖、资源与社区许可。', evidence: '厂商报告', sourceIds: ['minimax-h3-image-announcement', 'minimax-h3-image-readme', 'minimax-h3-image-initial-files', 'minimax-h3-image-license'] },
  details: [
    { label: '经过：权重日期与公告日期分开', text: '官方 X 原帖时间为11月10日15:40:15 UTC，文件历史与许可日期也为11月10日；发布博客标11月11日且未注明时区。本节点按UTC公告日排序，保留博客日期差异，不将提交页面未注明时区的时间冒充UTC。博客另列 API Platform、MiniMax Code 与 Hailuo 入口，本站未验证账号实际可用性。', sourceIds: ['minimax-h3-image-release-post', 'minimax-h3-image-initial-files', 'minimax-h3-image-diffusers-files', 'minimax-h3-image-license', 'minimax-h3-image-announcement'], locator: '原帖 DOM time；两次提交历史；许可首行；博客日期与使用入口' },
    { label: '技术：图像生成与编辑共用模型', text: '官方说明采用去掉音频分支的 H3 路线：331亿参数的稠密扩散 Transformer，复用 H3 文本编码器，并配合图像 VAE。六步采样直接生成约1600万像素图像，不靠放大器；支持最多16张参考图。4K十秒内等速度和质量表述来自厂商，不能当作本站实测或任意显卡的保证。', sourceIds: ['minimax-h3-image-readme', 'minimax-h3-image-announcement'], locator: 'Introduction；Model Architecture；公告速度与参考图说明' },
    { label: '交付：文件存在不等于完成运行验证', text: '初始 transformer 目录列出12个 safetensors 分片及索引；后续提交另加入 Diffusers 格式和文本编码器文件。README 的原始流程仍说明从 H3 仓库读取编码器，因此应按所选格式核对依赖，不能说所有版本都缺少编码器。本轮只核查文件清单与元数据，未下载全量文件；仓库容量也不等于最低显存。', sourceIds: ['minimax-h3-image-initial-files', 'minimax-h3-image-diffusers-files', 'minimax-h3-image-readme'], locator: 'transformer 清单；Diffusers 提交；Quick Start 的组件与编码器说明' },
    { label: '许可：权重公开仍有地域与商业条件', text: '该版本社区许可的标准授权不覆盖欧盟、英国、韩国和美国。使用方及关联方年化收入超过100万美元，或向第三方提供托管服务，均需事先取得书面授权；两项条件是“或”，不是同时满足。许可还限制用模型或输出改进无关模型，并规定下游使用约束。此处是条款摘要，具体使用应核对全文及另行授权。', sourceIds: ['minimax-h3-image-license'], locator: 'I.5 Excluded Territories；II Grant；IV.1 Additional Commercial Terms；V.3–5' },
    { label: '编辑分析：把可获取与可采用分开', text: '这一节点的价值是图像生成和编辑有了可检查的交付物，而不只是演示。真正采用时，仍需按任务核对一致性、提示处理、硬件成本与许可；文件目录里的格式转换也说明复现必须固定版本，不能混用不同日期的部署说明。', editorial: true, sourceIds: ['minimax-h3-image-readme', 'minimax-h3-image-diffusers-files', 'minimax-h3-image-license'], locator: '依据交付物、文档差异与许可条件的编辑归纳；非性能或法律适用结论' },
  ],
  recommendedResources: [
    { id: 'h3-image-serving-reading', title: 'MiniMax H3-Image 架构与运行说明', creator: 'MiniMax', series: 'GitHub 官方仓库', kind: 'article', url: readme, checkedAt, match: '对照图像模型、文本编码器和采样设置，理解自部署的组成部分。', scopeNote: '核读固定版本说明，未执行推理；编码器位置需结合后续 Diffusers 格式核对。', locator: 'Model Architecture；Quick Start；Request parameters' },
    { id: 'h3-image-license-reading', title: 'MiniMax H3-Image 社区许可', creator: 'MiniMax', kind: 'article', url: license, checkedAt, match: '在采用或提供托管服务前，先核对地域与额外书面授权条件。', scopeNote: '固定版本条款阅读，不是针对读者具体业务的法律意见；文件公开不表示自动获准使用。', locator: 'I、II、IV、V' },
  ],
}];
