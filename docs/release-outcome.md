# timeline 已授权公开与上线

2026-10-09，用户明确批准将 `naijoug/timeline` 改为公开，包括源代码和提交历史。发布前对四个可达提交的 181 个唯一文本 blob 做凭据模式扫描，未发现匹配；69 个二进制 blob 不做文本模式分析。扫描为启发式检查，不将“无匹配”写成绝对安全保证。

按明确的 72 文件发布范围，在独立临时副本完成数据校验、46 项测试、Astro 检查和两种路径构建／链接检查，随后提交并推送主分支。未将用户原有 `design-qa.md`、`public/favicon.svg`、已删除的 `src/styles/explorer.css` 或设计截图目录纳入发布。

- 仓库：[naijoug/timeline](https://github.com/naijoug/timeline)，`visibility=public`、`private=false`。
- 发布 SHA：`f8088c980e962aaf92317bdcd7517b0b88e2aa5e`。
- CI：[运行 37906474991](https://github.com/naijoug/timeline/actions/runs/37906474991)，build 和 deploy 均成功；部署记录 `6956596780` 成功。
- 线上：[timeline](https://naijoug.github.io/timeline/)，[AI 指令专题](https://naijoug.github.io/timeline/ai/collections/transformer-to-instructions/)，[辛亥专题](https://naijoug.github.io/timeline/china-history/collections/xinhai-1911-1912/)。
- 10 个线上站内页面 HTTP 验证通过，子路径、两专题和关键详情正确。Mac Chrome 曾实际打开线上首页和 AI 入口，截图在 `verification-release/home-live.jpg`。

主要论文、辛亥博物馆与 FRUS 外链可读；此前在 Mac 浏览器读核的孙中山 1912-01-03 函电转录站，当前 HTTP 客户端访问返回 403，保留原链接与核验边界，详见 `verification-release/http-checks.json`。线上事件日期及转录／译文说明没有因此改写。

后续 AI 第二批只写入本机，未触发新提交或部署；见 [本批实施记录](ai-second-coverage.md)。当前 Mac 浏览器控制接口断连，线上完整详情／移动端复验及本批视觉验收未完成；原辛亥本机桌面与手机验收截图可独立复查。

机器证据：`verification-release/deployment.json`、`secret-scan.json`、`http-checks.json`；这些附加记录随后续内容提交。先前私人仓库 Pages 返回的套餐限制已通过用户授权公开解决，当前没有发布或 CI 阻碍。
