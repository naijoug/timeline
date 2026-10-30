# Python 既有节点深化 · 2026-10-25

本批只替换 `python-3` 与 `python-311` 的资料，69 个语言节点数量和原 URL 不变。沿用共用静态详情与轻量索引，没有增加 UI、运行时依赖或客户端正文包。

## 核验与改进

- [Python 3.0 正式发布页](https://www.python.org/download/releases/3.0/)给出 2008-12-03，补足原来的年份精度。[Guido van Rossum 的版本说明](https://docs.python.org/3/whatsnew/3.0.html)区分 Unicode 文本与字节；修正原条目把 Python 2 简化为“ASCII 字符串”的基线，并删除缺乏直接依据的“生态完成迁移”断言。
- [PEP 3000](https://peps.python.org/pep-3000/)用于说明当年的过渡设计及转换器边界，不当作今天的迁移教程，也不以其创建日替代正式发布日。
- [Python 3.11.0 发布页](https://www.python.org/downloads/release/python-3110/)给出 2022-10-24。[PEP 654](https://peps.python.org/pep-0654/)支持异常组的动机与范围；[3.11 文档](https://docs.python.org/3.11/whatsnew/3.11.html)补充错误位置与基准条件。
- 核验时 3.11.0 发布页为 1.22×，3.11 分支文档为 1.25×；保留两种页面口径及 GCC/Ubuntu/pyperformance 条件，不拼成统一实测，不宣称所有任务或所有 Python 实现获得相同提升。
- [Mark Shannon 的 PEP 659](https://peps.python.org/pep-0659/)解释专门化与自适应机制。提案 Created 为 2021-04-13，与 3.11 发布日不同；提案预测不能替代最终版本基准。

## 阅读推荐与边界

Python 3.0 推荐 Guido van Rossum 的具体历史版本说明；3.11 推荐 Mark Shannon 的 PEP 659。各条保留作者、平台、题名、对应章节、阅读理由与核验日期。推荐均为可读文档，没有声称验证视频播放或独立重跑性能测试。各节点三段有据说明与一段明确标识的编辑解读分开。

最初尝试的 `https://docs.python.org/3.0/whatsnew/3.0.html` 在研究工具中无法读取；实际引用并核对的是官方现行文档站的历史文章 `/3/whatsnew/3.0.html`。文档站页头显示当前文档版本，不意味着所述历史功能在当前版本才发布。

新增回归覆盖：稳定 ID 和精确日期、事实/编辑标识、证据引用、来源口径差异、推荐出处、详情不回流客户端索引。完整构建和上线 QA 由本批集成流程执行，本文件不先行宣称部署成功。
