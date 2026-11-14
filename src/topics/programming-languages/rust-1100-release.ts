import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-11-14';
export const rust1100Sources: Source[] = [
  { id: 'rust1100-never-type', title: 'Primitive Type never', publisher: 'Rust 项目 · 标准库文档', url: 'https://doc.rust-lang.org/stable/std/primitive.never.html', type: '官方类型文档', checkedAt, version: '核查时 std 1.100.0', locator: 'Primitive Type never；never-to-any coercion。stable 路径持续维护，不是冻结快照。' },
  { id: 'rust1100-release-notes', title: 'Rust Release Notes · 1.100.0', publisher: 'Rust 项目', url: 'https://doc.rust-lang.org/releases.html#version-11000-2026-11-12', type: '官方版本说明', publishedAt: '2026-11-12', checkedAt, version: 'Rust 1.100.0', locator: 'Version 1.100.0；Language；Libraries；Stabilized APIs；Compatibility Notes。日期为该版本条目所列发布日期，页面持续维护。' },
  { id: 'rust1100-never-fallback', title: 'Never type fallback change', publisher: 'Rust 项目 · The Rust Edition Guide', url: 'https://doc.rust-lang.org/edition-guide/rust-2024/never-type-fallback.html', type: '官方兼容性说明', checkedAt, locator: 'Summary 的 Rust 1.100 更新说明；Details；Migration。路径含 rust-2024，不表示当前规则仍仅限该 edition。' },
  { id: 'rust1100-allocator', title: 'Allocator in std::alloc', publisher: 'Rust 项目 · 标准库文档', url: 'https://doc.rust-lang.org/stable/std/alloc/trait.Allocator.html', type: '官方 API 文档', checkedAt, version: '核查时 std 1.100.0', locator: '稳定版本标注；unsafe trait Allocator；Safety；const: unstable。stable 路径会随版本更新。' },
];

export const rust1100Event: TimelineEvent = {
  id: 'rust-1100', title: 'Rust 1.100：never type 与分配器 API 稳定',
  time: { kind: 'point', start: { year: 2026, month: 11, day: 12 } },
  category: 'release', periodIds: ['modern-safety'], entityIds: ['rust'], milestone: true,
  summary: 'Rust 1.100.0 稳定 never type 与 Allocator API，同时将 never 类型推断回退规则统一到所有 editions。',
  significance: '编辑解读：表达能力扩大与升级兼容性需要一起阅读；稳定 API 并不消除调用和实现中的安全责任。',
  sourceIds: rust1100Sources.map(source => source.id), tags: ['Rust 1.100', 'never type', 'Allocator', '兼容性'],
  note: '日期取官方版本说明中的正式发布日；这不是新 edition，也不是 Rust 2.0。本文核对文档，未运行 Rust 1.100 编译器、迁移示例或性能基准。',
  details: [
    { label: '事件：稳定能力与版本边界', text: '2026年11月12日的版本条目列出 never type、Allocator 与 DropGuard 等稳定化进展。never type 写作 !，是没有任何值的类型，用来表达不会正常返回的计算。1.100 是编译器与标准库版本号，不能把它理解为另一个语言 edition。', sourceIds: ['rust1100-release-notes', 'rust1100-never-type'], locator: 'Version 1.100.0；Language；Libraries；Stabilized APIs；Primitive Type never → 类型说明' },
    { label: '兼容性：旧 edition 也需要检查', text: 'never-to-any 转换无法推断目标类型时，现在所有 editions 都回退到 !，不再回退到单元类型 ()；Infallible 也成为 ! 的别名。依赖旧回退的代码可能遇到编译错误或行为变化。', sourceIds: ['rust1100-release-notes', 'rust1100-never-fallback'], locator: 'Compatibility Notes；Edition Guide → Summary、Details' },
    { label: '迁移边界：没有自动修复保证', text: '指南说明用于迁移的 dependency_on_unit_never_type_fallback lint 已移除。对依赖旧回退的遗留代码，没有自动修复；可能需要显式指定类型，并检查具体行为。不能因为没有该迁移警告，就认定旧代码已兼容。', sourceIds: ['rust1100-never-fallback'], locator: 'Summary；Migration' },
    { label: '分配器：接口稳定不等于免除安全契约', text: 'Allocator 文档标注自 1.100.0 稳定，但它仍是 unsafe trait；实现者必须遵守内存有效性、布局和释放等契约。核查时 const 支持仍标为 unstable，不能把普通 API 的稳定化扩写成所有用法均已稳定。', sourceIds: ['rust1100-allocator'], locator: '稳定版本标注；Safety；const: unstable' },
    { label: '编辑分析：把新增能力与升级检查分开', text: '这次版本可以沿两条线阅读：一条看类型与分配接口能表达什么，另一条检查现有代码依赖了哪些推断和安全假设。版本号跨过整百，不是代码自动正确或性能普遍提升的证据。', editorial: true, sourceIds: ['rust1100-release-notes', 'rust1100-never-fallback', 'rust1100-allocator'], locator: '依据上述稳定化和兼容性边界作编辑归纳，非独立实验' },
  ],
  change: {
    baseline: '此前稳定版本（1.99.1）及旧的 never 类型回退行为；本站已收录的 1.85 并非直接前一版本',
    improvements: ['never type 稳定', 'Allocator 等分配器 API 稳定', 'never 类型推断回退统一到所有 editions'],
    tradeoffs: '旧推断依赖可能需要手动调整；Allocator 实现仍须满足 unsafe 契约，const 支持未一并稳定。',
    evidence: '官方 1.100.0 版本说明、Edition Guide 与标准库 API；未执行迁移或性能实验', sourceIds: rust1100Sources.map(source => source.id),
  },
  recommendedResources: [{ id: 'rust1100-fallback-reading', title: 'Never type fallback change', creator: 'Rust 项目文档贡献者', series: 'The Rust Edition Guide', kind: 'article', url: 'https://doc.rust-lang.org/edition-guide/rust-2024/never-type-fallback.html', checkedAt,
    match: '从类型无法推断时的回退机制，理解为什么升级工具链也可能影响旧 edition 的代码。',
    scopeNote: '已核读 Summary、Details 和 Migration；文档是持续维护说明，不是当日冻结快照。页面示例未在本站独立运行，当前规则不能倒填为 Rust 2024 首发时就覆盖所有 editions。', locator: 'Summary；Details；Migration' }],
};
