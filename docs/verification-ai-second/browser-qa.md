# AI 第二批 Mac Chrome 浏览器验收

日期：2026-10-09。复验仅操作本机预览、保存证据和更新验收文档，未改应用代码、提交、推送或发布。Git HEAD 保持 `f8088c980e962aaf92317bdcd7517b0b88e2aa5e`，用户原有工作区变更保留。

预览地址：http://127.0.0.1:4328/ai/collections/learning-to-systems/ 。4327 已占用，`npm run preview -- --port 4327` 自动选择 4328；未停止其他服务。结束浏览器验收后预览仍保留。

## 覆盖与结果

| 浏览器路径 | 实际验证 | 结果／证据 |
| --- | --- | --- |
| AI 入口 → 专题 | 从入口点击“从视觉学习到协作系统”；10 节点标题、日期、类型和专题说明 | `topic-desktop.jpg`、`topic-mobile-375.jpg`、`topic-mobile-320.jpg` |
| 桌面全部 10 节点 | AlexNet、VAE、GAN、ResNet、RAG、DDPM、CLIP、Whisper、Phi-1、AutoGen；逐个点击打开、核对标题、正文定位和原始来源 | `browser-desktop-results.json`；10 份 `*-desktop.txt` |
| 375×812 全部 10 节点 | 专题链接、详情标题、正文及来源卡片；页面滚动宽度等于可用宽度 360px，余下 15px 为纵向滚动条 | `browser-mobile-results.json`；10 份 `*-mobile-375.txt`；Whisper、Phi-1、AutoGen 截图 |
| 最后两条手机链接 | Phi-1、AutoGen 在语义点击等待未及时反映导航后，使用原生 Chrome AX 链接点击，均观察到目标详情的 AXWebArea、标题和地址 | `mobile-native-clicks.json`；不存在未完成的点击阻碍 |
| 320×812 窄屏 | 专题、AutoGen 长标题／正文／来源、ResNet 完整反向关系 | 可用宽度 305px、滚动宽度 305px，无横向溢出；`autogen-mobile-320.jpg`、`sources-mobile-320.jpg`、`relations-mobile-320.jpg` |
| 完整反向关系 | ResNet 页面显示“CLIP：连接文本与图像 · 使用改造的 ResNet 作为图像编码器之一 · ResNet 让更深的网络更容易训练”，并显示 §2.4 定位和限制说明 | `relations-desktop.jpg`、`resnet-relations-mobile-320.txt` |
| 实际打开来源 | 从 ResNet 的关系依据打开 CLIP v1 arXiv 页面，核对标题和提交历史 v1：2021-02-26 | `clip-source-browser.txt`；本项仅证明该链接可达，不声称全部外部来源本轮均重读 |
| 桌面详情交互 | Phi-1 打开／展开阅读／关闭，关闭后详情区域消失；重开 AutoGen | `phi-timeline-desktop.txt`、`reader-desktop.jpg` |
| 桌面类别筛选 | 选择 AI 技术突破：AutoGen 存在、Phi-1 不在结果 | `autogen-filter-desktop.txt` |
| 手机时间线 | 320px 点击 AutoGen，正文和关闭按钮可见；相邻按钮切至 Llama 2，再至 Phi-1；关闭后恢复列表；选择模型演进，Phi-1 存在、AutoGen 不在结果 | `reader-mobile-320.jpg`、`autogen-timeline-mobile-320.txt`、`phi-timeline-mobile-320.txt`、`phi-filter-mobile-320.txt`；详情和列表宽度 320px，无横向溢出 |
| 浏览器运行错误 | 查询桌面／移动验收标签页 error 日志 | 均为空 |

桌面为用户 Mac Chrome 的正常视口，截图期间窗口尺寸约 1665×1003 和 1680×947。移动端为同一浏览器的响应式视口模拟，未进行实体手机或跨浏览器验收。截图为当前系统外观下的暗色页面。临时视口覆盖均已重置，桌面专题预览标签页保留供用户查看。没有未解决的浏览器连接或点击阻碍。

本轮未重跑已通过的数据校验、48 项测试、Astro 检查及根路径／子路径构建；应用代码和构建产物没有变化，已有结果见 `../ai-second-coverage.md`。
