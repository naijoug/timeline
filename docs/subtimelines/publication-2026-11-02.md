# 子时间线：真实上游与发布验收续记

2026-11-02 UTC。用户明确本地父级 AGENTS 读取约定不适用于云端，本次仅据此解除该特定前置条件，未扩大其他账号、安全或发布授权。

重新核对 naijoug/timeline 的 main 仍为 `70ded21f07e55b4da2c697ab484c742d69c8fcca`，AGENTS 未变。已取得真实上游 Git 历史并重放原三个阶段；重放结果 tree 为 `5f789dd45ef3c82a5fd3f60586cd7e4fd3de2c97`，与原本地候选一致，没有推送合成根。

为解决原云端浏览器不可运行的环境门槛，新增仅 `pull_request` 触发、`contents: read`、无 secrets、无部署的验收工作流。锁定 Playwright 1.57.0，使用 Chromium 验证桌面 1440×1000 与窄屏 375×812，并保留 7 天截图与失败 trace。根路径和 /timeline 两种产物分别运行；原 Pages 仍只允许显式手动发布。

本提交只建立验收流程，不把尚未运行的浏览器检查记为通过。后续记录以具体提交和实际 CI 结果为准。

## First browser run

- GitHub Actions run `41387785235` executed real Chromium: all four desktop cases and two mobile cases passed.
- Two mobile cases targeted the intentionally hidden desktop-only return link. The rendered mobile header already had the correct visible return link and exact subline URL. The test now selects the accessible visible “返回时间线” link on either viewport; query, scroll, focus and browser Back/Forward assertions are unchanged.
- This failed run is retained as evidence, not represented as acceptance. A new exact-head run is required before integration.

## 真实浏览器验收通过

- 受测分支 `feat/subtimelines-20261102`，提交 `92f1a13f45dcf558f3640b1773ee18ce394fa2f8`；[CI run 41388248550](https://github.com/naijoug/timeline/actions/runs/41388248550) 全部成功。
- 根路径与 `/timeline` 两套构建各通过 8 个 Chromium 用例（桌面 1440×1000、窄屏 375×812），合计 16 个；验证独立线路、去重融合、反复勾选、筛选取消/应用、实际 Back/Forward、精确返回 URL、滚动像素与焦点、作者附录和移动抽屉。
- 同一 CI 通过类型检查、260 单测、两套静态构建/内部链接/阅读路径/线路成员/性能/生产 hydration 检查，未放宽性能预算。
- 实际截图已检查：Fira/CJK 可读；桌面左右交替、移动单侧叶片；未见内容溢出或重叠；附录导航保持 sticky；详情与来源可读。独立只读审查没有发现阻塞性视觉问题。
- 初次两项失败来自测试选择了隐藏的桌面返回链接；修正为可访问的可见返回控件后全部通过，没有改动产品逻辑或降低 URL、滚动、焦点断言。

本记录提交只更新文档；集成前仍等待其精确分支头 CI 通过，再通过既有手动 Pages 流程发布。实际合并/部署提交及运行结果以 [PR #1](https://github.com/naijoug/timeline/pull/1) 和 GitHub Actions 为准，不把本次受测分支冒充已上线版本。

### 后续小范围体验优化

- 移动端横向线路选择器可在独立阅读时自动露出已选项。
- 独立线路的年份数字当前表示全主题可用筛选边界；后续可明确标注为“筛选范围”，与该线路实际覆盖期区分。

这两项不影响当前独立成员、融合去重、筛选或导航正确性，本轮未扩大改动范围。
