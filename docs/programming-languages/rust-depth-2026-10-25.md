# Rust 稳定性与版次：两条既有详情复核

核查日期：2026-10-25。限定 `rust-10` 与 `rust-2024`，不新增节点、版本或 UI。

- Rust 1.0：由年精度改为正式发布日 2015-05-15；用公告和 Aaron Turon、Niko Matsakis 的历史说明替代笼统博客首页。稳定承诺与 nightly 实验、第三方库及修复错误的例外分开。
- Rust 2024：保留 2025-02-20 日期与 `rust-2021` 比较基线，补 crate 版次与编译器升级的区别；区分 `unsafe_op_in_unsafe_fn` 默认警告和强制 `unsafe extern` 标记；保留自动迁移、FFI 签名和虚拟 workspace 的边界。
- 六个具体官方来源新增，两条作者/文档贡献者明确的阅读入口。三段有来源的正文和一段明确编辑分析，未把建议当作权威结论。已有 `rust185-release` 复用，未更改全库核查日期。

## 本次读取的原始来源

1. https://blog.rust-lang.org/2015/05/15/Rust-1.0/ — 日期、稳定承诺、六周发布与依赖工作流。
2. https://blog.rust-lang.org/2014/10/30/Stability/ — 作者、三渠道、第三方库与兼容性例外；历史方案不当作全部已经兑现。
3. https://blog.rust-lang.org/2025/02/20/Rust-1.85.0/ — 版次稳定日、迁移的保守性及编译器能力边界。
4. https://doc.rust-lang.org/edition-guide/editions/ — crate 级选择与跨版次互操作。
5. https://doc.rust-lang.org/edition-guide/rust-2024/unsafe-op-in-unsafe-fn.html — 默认 warning 而非统一 hard error。
6. https://doc.rust-lang.org/edition-guide/rust-2024/unsafe-extern.html — 1.82 可用与 2024 必选的区别、签名须人工审查。
7. https://doc.rust-lang.org/edition-guide/rust-2024/cargo-resolver.html — resolver 3 与虚拟 workspace 设置。

官方网页正文均已读取；不声称独立运行编译器、审计 unsafe/FFI 实现，亦不涉及视频播放。指南是持续维护文档，无虚构发布日期。新增测试保护日期、唯一节点、证据解析、状态边界和正文不进入轻量客户端索引。完整站点与上线验收由集成批次另行执行。
