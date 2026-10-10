# AI 第二批：从视觉学习到协作系统

实施与核查日期：2026-10-09。本批基于 `f8088c980e962aaf92317bdcd7517b0b88e2aa5e` 追加，2026-10-10 经用户授权提交并发布。

本机预览：[AI 入口](http://127.0.0.1:4328/ai/) · [10 节点专题](http://127.0.0.1:4328/ai/collections/learning-to-systems/)。2026-10-09 浏览器复验时，4327 已被占用，预览自动使用 `127.0.0.1:4328`；原有服务保留。如服务结束，可在项目目录运行 `npm run preview -- --port 4328`，终端输出的实际端口为准。

## 范围与统计

复用并补充 AlexNet、VAE、GAN、ResNet、RAG、DDPM、CLIP 七个记录，新增 Whisper、Phi-1、AutoGen 三个代表节点。没有拆分模型尺寸或添加后续版本来增加数量。AutoGen 按开发框架归入技术与方法，Whisper 和 Phi 按模型研究归类。

| AI | 线上／本批前 | 本批后 |
| --- | ---: | ---: |
| 事件 | 245 | 248 |
| 对象 | 78 | 84 |
| 来源 | 201 | 206 |
| 对象关系 | 6 | 6 |
| 事件证据关系 | 12 | 22 |
| 精选专题 | 1 | 2 |

中国历史保持 36 时期、34 事件、41 对象、29 来源、10 条事件证据关系与 1 个专题。本批新增六个对象：Whisper、Phi、AutoGen，以及论文署名作者 Diederik Kingma、Ian Goodfellow、何恺明。十条新关系逐条注明依据，作者关系仅表示署名之一。

## 来源定位与日期

实际阅读以下 12 份资料，七个已有来源更新核查信息，五个来源新增；只对这些资料设置 `checkedAt=2026-10-09`，其他未读资料的日期保留。

| 节点与采用阶段 | 原始来源与已读位置 |
| --- | --- |
| AlexNet：2012，保留会议年份 | [NIPS 2012 原论文 PDF](https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf)；§3.1–3.2、§3.5、§4.1–4.2、§6。五卷积层、三全连接层及竞赛组合口径以 PDF 为准。 |
| VAE：2013-12-20 首版 | [Auto-Encoding Variational Bayes v1](https://arxiv.org/abs/1312.6114v1)；作者署名、§2.1–2.4、§3、§5；近似后验、变分下界与重参数化。 |
| GAN：2014-06-10 首版 | [Generative Adversarial Nets v1](https://arxiv.org/abs/1406.2661v1)；作者署名、§3–4、§6；区分理论假设与训练失败。 |
| ResNet：2015-12-10 首版 | [Deep Residual Learning v1](https://arxiv.org/abs/1512.03385v1)；署名、§1、§3.1–3.3、§4.1–4.2；训练退化与残差捷径。 |
| RAG：2020-05-22，原月份精度补为已核实日期 | [RAG v1](https://arxiv.org/abs/2005.11401v1)；§2.1–2.4、§3、§6；DPR/BERT 检索、BART 生成、文档编码器与索引固定。 |
| DDPM：2020-06-19，原月份精度补为已核实日期 | [DDPM v1](https://arxiv.org/abs/2006.11239v1)；§1–2、§3.2、§3.4、§4.1–4.3；加噪、反向链、预测噪声及评估范围。 |
| CLIP：2021-01-05 研究公告 | [OpenAI 公告](https://openai.com/index/clip/)；页首日期、Approach、Limitations。 |
| CLIP 论文：2021-02-26 首版 | [CLIP v1](https://arxiv.org/abs/2103.00020v1)；§2.3–2.4、§3.1、§6；图文对比学习、ResNet/ViT 编码器及局限。首版日期由提交历史核对，不按论文编号猜测月份。 |
| Whisper：2022-09-21 研究开放 | [OpenAI 公告](https://openai.com/index/whisper/)；页首日期、训练数据、架构、评估、开放模型与推理代码。 |
| Whisper 论文：2022-12-06 首版 | [Whisper v1](https://arxiv.org/abs/2212.04356v1)；§2.1–2.3、§3.8、§6；英语翻译目标、30 秒片段、长音频与低资源语言局限。 |
| Phi-1：2023-06-20 首版 | [Textbooks Are All You Need v1](https://arxiv.org/abs/2306.11644v1)；署名、Abstract、§2–2.3、Table 1、§5、Appendix B；筛选数据、教材、练习微调及污染分析。不将语料规模写成实际训练总 token，不推定同日权重开放。 |
| AutoGen：2023-08-16 首版 | [AutoGen v1](https://arxiv.org/abs/2308.08155v1)；署名与机构、§2.1–2.2、§4、§5.2；可对话 Agent、消息、执行、人类参与及工作流边界。不混用后续库版本。 |

七个既有节点及三个新节点均有逐段来源 ID 与定位。论文自报、厂商说明与编辑重要性解读分开表达，未进行模型性能实测。专题年代顺序不构成技术继承链。

## 变更文件

- `src/topics/ai/historical-milestones.ts`：补充、来源、对象、十条关系与专题定义。
- `src/topics/ai/events.ts`、`sources.ts`、`entities.ts`、`adapter.ts`：增量接入已有结构。
- `src/pages/ai/collections/learning-to-systems.astro`：复用专题页面与导航。
- `tests/content-packs.test.ts`：阶段日期、引用、技术分类与关系方向回归。
- `src/pages/about.astro`、`README.md`：更新核查范围与工作区数量。
- `scripts/ai-coverage.ts`、`docs/ai-coverage.md`：区分版本批次与专题增量，重新生成覆盖统计。
- `docs/ai-second-coverage.md`、`docs/verification-ai-second/`：本记录和验收证据。

## 验收

| 检查 | 结果 |
| --- | --- |
| 数据校验 | 通过，引用、日期、对象与关系无错误 |
| 测试 | 48/48 通过 |
| Astro 检查 | 76 文件，0 错误、0 警告、0 提示 |
| 根路径构建与链接 | 571 页、10,529 条内部链接通过 |
| `/timeline` 构建与链接 | 独立输出 `/tmp/timeline-second-ai-subpath`；571 页、10,529 条内部链接通过 |
| 本机 HTTP | 15/15 页面 200 与内容检查通过，含专题入口、十个节点、对象和历史专题 |
| 反向关系 | ResNet 详情完整展示“CLIP → 使用改造的 ResNet 作为图像编码器之一 → ResNet”，源证据可达 |
| Mac Chrome 桌面 | 10 个专题节点均点击打开；正文、逐段定位、来源、完整反向关系、展开／关闭／重开与类别筛选通过 |
| Mac Chrome 响应式 | 375×812 下专题及全部 10 个详情；320×812 下专题、AutoGen 正文／来源、ResNet 反向关系与时间线详情／筛选通过，无横向溢出 |
| Git 状态 | 线上 HEAD 仍为 `f8088c9`，本批未提交；用户原有设计改动保留 |

初次实施时浏览器接口断连；2026-10-09 复验已恢复并补齐实际 Mac Chrome 验收。此次只新增验收证据并更新本文，未改应用代码、重新构建、提交或发布。详见 [浏览器验收记录](verification-ai-second/browser-qa.md) 及同目录截图、DOM 快照和尺寸记录。移动端为 Mac Chrome 响应式视口模拟，未在实体手机上测试。
