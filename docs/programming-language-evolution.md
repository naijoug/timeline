# 编程语言发展脉络补充（2026-10-24）

本批次新增 8 个节点、14 份直接来源和 5 条有依据的关系。主题累计 69 个事件、35 个语言对象、5 个时代、60 份来源。只扩充语言主题及其事件阅读页，没有改变共享浏览器或视觉布局。仍是精选语言史，不是完整版本数据库。

## 发展主线

- C 的形成 → ANSI C89 → C99：从系统实现到跨编译器的语言与库契约，再到类型、初始化和数值能力的扩展。
- Simula 的类模型 + C 的系统能力 → C++ → C++98 → 已有 C++11/20：新增标准化环节，不把标准收录误写成每项特性的发明日期。C89 函数原型反向借鉴 C++，也说明影响并非单向树形继承。
- ECMAScript 第一版 → ES5 → 已有 ES2015 → ES2017：先协调兼容性，再扩展模块、Promise 和异步函数。ES2017 的 async/await 不是自动并行线程。
- Rust 1.0 → 2018 edition → 1.39 async/await → 2021 edition → 2024 edition：区分六周编译器发布与可选择迁移的 edition。
- Swift 5 → 5.5 并发模型 → 6 语言模式：把 ABI、异步表达、actor 隔离和严格数据竞争检查分开解释。

## 日期与证据边界

| 节点 | 日期口径 | 直接依据 |
| --- | --- | --- |
| ANSI C89 | 1989 年标准化，后为 ISO C90 | [Ritchie 回顾：Standardization](https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.html)、[WG14 rationale §0](https://www.open-std.org/jtc1/sc22/wg14/www/C99RationaleV5.10.pdf) |
| C99 | 1999-12-01 出版 | [WG14 标准档案](https://www.open-std.org/jtc1/sc22/wg14/www/standards.html)；[N1256 前言](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1256.pdf)是 2007 年合并勘误文本，不能代替事件日期 |
| C++98 | 1998-09 出版，保留月份精度 | [ISO 档案](https://www.iso.org/standard/25845.html)、[设计者的标准化访谈](https://stroustrup.com/cuj_interview.html) |
| ES5 | 2009-12-03 大会批准，公告在 12-15 | [Ecma 批准公告](https://ecma-international.org/news/ecma-international-approves-major-revision-of-ecmascript/) |
| ES2017 | 2017-06 标准出版，不是浏览器统一上线 | [ECMA-262 第八版](https://ecma-international.org/wp-content/uploads/ECMA-262_8th_edition_june_2017.pdf)，Introduction、§14.6、§25.5.5 |
| Rust 2018 | 2018-12-06，随 1.31 发布 | [1.31 官方公告](https://blog.rust-lang.org/2018/12/06/Rust-1.31-and-rust-2018/) |
| Rust async/await | 2019-11-07，1.39 稳定 | [1.39 官方公告](https://blog.rust-lang.org/2019/11/07/Rust-1.39.0/) |
| Rust 2021 | 2021-10-21，随 1.56 稳定 | [1.56 官方公告](https://blog.rust-lang.org/2021/10/21/Rust-1.56.0/) |
| Rust 2024 | 修正为 2025-02-20，2024 是 edition 名称 | [1.85 官方公告](https://blog.rust-lang.org/2025/02/20/Rust-1.85.0/) |
| Swift 5.5 | 2021-09-20 正式发布 | [Swift 5.5 公告](https://www.swift.org/blog/swift-5.5-released/) |
| Swift 6 | 2024-09-17 正式可用；严格检查需选择 Swift 6 语言模式 | [Swift 6 公告](https://www.swift.org/blog/announcing-swift-6/)，Concurrency |
| Julia | 原节点改为 2012-02-14 首次公开发布，保留旧 ID/链接 | [首次公开文章](https://julialang.org/blog/2012/02/why-we-created-julia/)；原引用的 [SIAM 论文](https://epubs.siam.org/doi/10.1137/141000671)实际于 2017-02-07 在线发表，仅作后续设计背景 |

C/C++ 关系还直接依据 [Stroustrup 的历史回顾 §1–2](https://www.stroustrup.com/hopl2.pdf)。未添加仅凭时间先后推测的影响关系，也未把相同 async 关键词当成语言间的直接继承证据。

## 阅读与兼容

新增节点复用既有语言、时代和分类入口。C 现在有三个节点，自动进入语言切换列表。版本变化可回看已经收录的比较基线；关系复用原有 Relations 组件，展示明确方向、限定说明与来源。页面引用集合覆盖正文、版本比较和关系证据。精确到日的旧节点不再显示“按月份精度”默认说明。

Rust 2024 成为本资料集最新已收录日期，“最新”入口同步更新；不声称它是现实中最新语言版本。旧事件 ID（包括 julia-paper、rust-2024）未改变。

## 验证

新增 tests/programming-language-evolution.test.ts，覆盖新增节点唯一性、日期精度、标准与发布分类、历史源文件版本、比较基线可达性、来源完整性、关系方向、Swift 模式边界、Rust edition/async 时间差与 C 语言筛选。

集成时需在最新主分支重新运行 npm run check、npm test、npm run build 及项目子路径链接检查。本批次不替代全库史料复核，未核查的既有来源保留原核查日期。

本批次隔离工作区验证结果：Astro/TypeScript 0 错误、0 警告；99 项测试通过；数据校验通过；804 个静态页面构建成功；19,501 条内部链接通过检查。另检查 C89、C++、ES2017、Rust 2024、Swift 5.5 的已构建 HTML，确认关系与基线链接实际输出，Swift 6 和 Julia 的更正文本可见。集成后的页面总数可因其他并行内容批次改变。
