# timeline 项目约定

## 工作区与账号

执行外部账号操作前，必须读取并遵循 `/Users/guojian/Workspace/naijoug/AGENTS.md`。临时检出和 worktree 同样适用，不依赖父目录自动发现该文件。

## 文档维护

- 根目录 `README.md` 只保留项目简介、主要主题、基本启动方式与文档入口，保持简洁。
- 每日更新、维护状态、批次统计、研究过程与验收结果一律写入 `docs/`，不要再向 `README.md` 追加这些内容。只有项目介绍、启动方式或文档入口本身变化时才更新 README。
- `docs/changelog.md` 作为更新索引：有实际变更时按日期倒序添加简短条目，并链接详细记录；没有变化无需写日报。
- 日常维护记录沿用 `docs/maintenance-YYYY-MM-DD-HHMM.md`；AI 资料巡查沿用 `docs/ai-radar-YYYY-MM-DD-HHMM.md`。正文明确时区、核查范围与验证结果，不将单次核查写成全库复核。
- 稳定的开发、内容维护和部署说明放在 `docs/development.md`；主题研究、设计与验收材料放在 `docs/` 对应目录。只有涉及用户迁移步骤时才新增升级指南。
- 整理文档时保留已有报告和资料入口，移动文件或内容后同步修正相对链接。
