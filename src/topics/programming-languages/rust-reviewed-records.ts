import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-10-25';
const source = (id: string, title: string, url: string, locator: string, publishedAt?: string): Source => ({
  id, title, url, locator, publisher: 'Rust 官方团队', type: '官方公告与指南', checkedAt,
  ...(publishedAt ? { publishedAt } : {}),
});

export const rustReviewedSources: Source[] = [
  source('rust10-release', 'Announcing Rust 1.0', 'https://blog.rust-lang.org/2015/05/15/Rust-1.0/', '发布日期；What does it mean for Rust to be 1.0?；Cargo and crates.io', '2015-05-15'),
  source('rust-stability-deliverable', 'Stability as a Deliverable', 'https://blog.rust-lang.org/2014/10/30/Stability/', '作者与日期；Committing to stability；The plan；What are the stability caveats?', '2014-10-30'),
  source('rust-editions-explained', 'What are Editions?', 'https://doc.rust-lang.org/edition-guide/editions/', 'Editions do not split the ecosystem；Edition migration is easy and largely automated'),
  source('rust2024-unsafe-functions', 'unsafe_op_in_unsafe_fn warning', 'https://doc.rust-lang.org/edition-guide/rust-2024/unsafe-op-in-unsafe-fn.html', 'Summary；Details；Migration'),
  source('rust2024-unsafe-extern', 'Unsafe extern blocks', 'https://doc.rust-lang.org/edition-guide/rust-2024/unsafe-extern.html', 'Details：1.82 与 2024 的区别；Migration：签名仍须人工审查'),
  source('rust2024-cargo-resolver', 'Cargo: Rust-version aware resolver', 'https://doc.rust-lang.org/edition-guide/rust-2024/cargo-resolver.html', 'Summary；Details：workspace 与 virtual workspace；Migration'),
];

export const rustReviewedEvents: TimelineEvent[] = [
  {
    id: 'rust-10', title: 'Rust 1.0 发布', time: { kind: 'point', start: { year: 2015, month: 5, day: 15 } },
    category: 'release', periodIds: ['modern-safety'], entityIds: ['rust'], milestone: true,
    summary: 'Rust 1.0 正式开始稳定性承诺，把快速变化的实验语言转向可供应用与库持续依赖的稳定基础。',
    significance: '长期维护不只依靠语言特性，也需要清晰的发布渠道、兼容性承诺和依赖管理边界。',
    sourceIds: ['rust10-release', 'rust-stability-deliverable'], tags: ['Rust 1.0', '稳定性', '发布渠道', 'Cargo'],
    note: '日期取 2015-05-15 正式发布公告。稳定不等于语言停止演进，也不保证所有第三方依赖不变；编译器错误与安全漏洞修复等仍有兼容性例外。这里介绍历史节点，不建议安装旧版工具链。',
    details: [
      { label: '背景：从频繁变化到稳定基础', text: '1.0 公告回顾早期语言和标准库持续调整给维护项目带来的负担，并把正式发布定义为稳定性承诺的开始，而不是语言设计已经完成。', sourceIds: ['rust10-release'], locator: 'What does it mean for Rust to be 1.0?' },
      { label: '事件内容：渠道让实验与承诺分开', text: '发布公告宣布每六周推出常规版本，并同时发布 1.1 beta。此前的稳定性方案区分 nightly、beta 与 stable：实验特性留在 nightly，稳定渠道只提供已作出稳定承诺的语言特性和标准库 API。', sourceIds: ['rust10-release', 'rust-stability-deliverable'], locator: '1.0 公告 → 六周发布段；Stability as a Deliverable → The plan' },
      { label: '边界：不是整个依赖世界都被冻结', text: '稳定性说明保留修复编译器错误、安全漏洞以及部分类型推断变化的空间；它关注 Rust 编译器与标准库升级，第三方库需要自己的版本兼容策略。Cargo 与 crates.io 帮助管理和发现依赖，不会自动消除依赖升级风险。', sourceIds: ['rust-stability-deliverable', 'rust10-release'], locator: 'What about stability attributes outside of the standard library?；What are the stability caveats?；Cargo and crates.io' },
      { label: '编辑分析：稳定性也是一种产品能力', text: '我们认为这个节点的关键是让使用者可以规划维护成本，而不只是展示新的语法。阅读后续 edition 时，可以沿着同一条问题线索：如何允许语言改变，又不要求所有项目在同一天一起迁移。', editorial: true },
    ],
    change: { baseline: '1.0 之前语言与标准库仍频繁变化的开发阶段', improvements: ['正式开始稳定性承诺', '采用六周发布节奏并区分发布渠道', '以 Cargo 与 crates.io 支撑依赖工作流'], tradeoffs: '稳定承诺有修复错误等例外；nightly 实验特性和第三方库不自动获得同等承诺。', evidence: '正式发布公告与作者对稳定渠道、兼容性例外的说明', sourceIds: ['rust10-release', 'rust-stability-deliverable'] },
    recommendedResources: [{ id: 'rust10-stability-reading', title: 'Stability as a Deliverable', creator: 'Aaron Turon 与 Niko Matsakis', series: 'Rust 官方博客', kind: 'article', url: 'https://blog.rust-lang.org/2014/10/30/Stability/', publishedAt: '2014-10-30', checkedAt, match: '在 1.0 之前解释为何稳定性需要发布渠道和特性门控，适合与正式发布公告对照，理解语言治理而不只看语法。', scopeNote: '已核验作者、日期与正文。这是 2014 年的历史方案，不能把其中对未来工作的计划当作已经全部实现，也不是所有当前兼容性规则的完整清单。', locator: 'The plan；The FAQ；What are the stability caveats?' }],
  },
  {
    id: 'rust-2024', title: 'Rust 2024 edition 随 1.85 稳定', time: { kind: 'point', start: { year: 2025, month: 2, day: 20 } },
    category: 'release', periodIds: ['modern-safety'], entityIds: ['rust'], milestone: true,
    summary: 'Rust 2024 edition 于 2025 年随 Rust 1.85 稳定，以按包选择的新规则调整 unsafe 边界、临时值作用域与宏匹配。',
    significance: '它把语言规则变化与编译器升级区分开，让项目逐个选择迁移，同时维持不同 edition 的库互操作。',
    sourceIds: ['rust185-release', 'rust-editions-explained', 'rust2024-unsafe-functions', 'rust2024-unsafe-extern', 'rust2024-cargo-resolver'], tags: ['Rust 2024', 'edition', 'unsafe', '迁移'],
    note: '2024 是 edition 名称，不是稳定发布日期。Rust 1.85 同时稳定的 async 闭包属于该编译器版本的能力，不列作仅限 2024 edition 的变化。迁移工具不能证明 unsafe 代码正确；本条未独立编译或审计示例。',
    details: [
      { label: '背景：edition 不是另一个编译器分支', text: '官方指南说明各 crate 在 Cargo.toml 中选择 edition，不同 edition 的 crate 可以互相依赖。升级编译器与迁移 edition 是两件事，不能把 2024 版次理解成整个依赖生态必须同时切换。', sourceIds: ['rust-editions-explained', 'rust185-release'], locator: 'What are Editions?；Editions do not split the ecosystem；1.85 → Rust 2024' },
      { label: '事件内容：把安全责任写出来', text: '2024 要求 extern 块标记 unsafe；该写法在 1.82 已能用于所有 edition。unsafe 函数内部执行不带显式 unsafe 块的危险操作，在 2024 默认触发警告，并非一律成为编译错误。声明调用者的责任与标记函数体内的危险操作，需要分别表达。', sourceIds: ['rust2024-unsafe-extern', 'rust2024-unsafe-functions'], locator: 'Unsafe extern blocks → Details；unsafe_op_in_unsafe_fn → Summary、Details' },
      { label: '迁移边界：自动改写不是安全证明', text: 'cargo fix 优先保留旧行为，而非建议每一处都采用新语义；它不能验证 extern 声明的签名是否正确。Cargo 的 edition 2024 默认关联 resolver 3，但虚拟 workspace 仍需显式设置 resolver，不能只改某个成员的 edition 就假定整个工作区已切换。', sourceIds: ['rust185-release', 'rust2024-unsafe-extern', 'rust2024-cargo-resolver'], locator: '1.85 → Migrating to 2024；Unsafe extern blocks → Migration；Cargo resolver → Details' },
      { label: '编辑分析：把升级拆成两张检查表', text: '我们的阅读建议是先区分“新编译器提供了什么”与“选择新版次会改变什么规则”，再分别检查接口契约、析构时机与依赖解析。能自动修改代码，只说明迁移成本有所降低，不等于测试和人工审查可以省略。', editorial: true },
    ],
    change: { baseline: 'Rust 2021 edition', baselineEventId: 'rust-2021', improvements: ['unsafe extern 块与 unsafe 属性显式标记', '调整 impl Trait 捕获与临时值作用域', '预留 gen 关键字', 'Cargo 默认采用考虑 rust-version 的解析器'], tradeoffs: 'cargo fix 优先保留旧语义；unsafe 契约、析构顺序和 workspace 解析器设置仍需人工检查与测试。', evidence: 'Rust 1.85 正式公告及 Edition Guide 的专门迁移章节', sourceIds: ['rust185-release', 'rust2024-unsafe-extern', 'rust2024-cargo-resolver'] },
    recommendedResources: [{ id: 'rust2024-unsafe-extern-reading', title: 'Unsafe extern blocks', creator: 'Rust 项目文档贡献者', series: 'The Rust Edition Guide · Rust 2024', kind: 'article', url: 'https://doc.rust-lang.org/edition-guide/rust-2024/unsafe-extern.html', checkedAt, match: '用具体外部函数声明解释 FFI 接口为何需要明确安全责任，并指出自动迁移只能补标记，不能验证签名，适合将版次变化落实到实际代码审查。', scopeNote: '已核验正文与迁移限制；指南是持续维护文档，不把其当前内容日期当作版次发布日期。未独立运行示例或审计外部函数实现。', locator: 'Details；Migration' }],
  },
];
