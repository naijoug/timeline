import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-11-15';
export const csharp15Sources: Source[] = [
  { id: 'csharp15-announcement', title: 'Announcing .NET 11', publisher: 'Microsoft · .NET Blog', url: 'https://devblogs.microsoft.com/dotnet/announcing-dotnet-11/', type: '官方发布公告', publishedAt: '2026-11-10', checkedAt, locator: '发布日期；Languages → C# 15。日期来自正式公告，不从文档更新时间推算。' },
  { id: 'csharp15-whats-new', title: "What's new in C# 15", publisher: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-15', type: '官方语言版本说明', checkedAt, version: 'C# 15；页面更新于 2026-11-10', locator: '开篇版本与 SDK 说明；Memory safety (preview)。持续维护文档，非发布日冻结快照。' },
  { id: 'csharp15-union', title: 'Union types', publisher: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/union', type: '官方语言参考', checkedAt, locator: 'Union types；Union exhaustiveness；Nullability；default 值说明。持续维护文档。' },
  { id: 'csharp15-closed', title: 'closed modifier', publisher: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/closed', type: '官方语言参考', checkedAt, locator: 'Declaration rules；Exhaustive switch expressions。持续维护文档。' },
  { id: 'csharp15-version', title: 'Configure C# language version', publisher: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/configure-language-version', type: '官方配置说明', checkedAt, locator: '目标框架与默认语言版本；C# language version reference；latest 警告。持续维护文档。' },
];

export const csharp15Event: TimelineEvent = {
  id: 'csharp-15', title: 'C# 15：联合类型与封闭继承层次',
  time: { kind: 'point', start: { year: 2026, month: 11, day: 10 } },
  category: 'release', periodIds: ['modern-safety'], entityIds: ['csharp'], milestone: true,
  summary: 'C# 15 随 .NET 11 正式发布，以联合类型与封闭继承层次加强有限情况的表达和 switch 检查；内存安全工作仍处于预览。',
  significance: '编辑解读：把可出现的情况写进类型，有助于发现遗漏分支，但静态检查边界仍需结合默认值、继承范围和目标框架阅读。',
  sourceIds: csharp15Sources.map(source => source.id), tags: ['C# 15', '.NET 11', '联合类型', '封闭继承', '模式匹配'],
  note: '日期为正式公告的发布日期，精确到日；不是本轮巡查时刻的新发布。当前文档包含预览内容，不能将整页视为全部稳定。本文未运行 C# 编译器或独立验证示例。',
  details: [
    { label: '事件：正式发布与预览分开', text: '2026年11月10日的 .NET 11 公告将 C# 15 作为正式语言版本介绍。联合类型、封闭继承层次、集合表达式参数、扩展索引器和带标签的 break/continue 不要求 preview；内存安全改进仍另列为预览。', sourceIds: ['csharp15-announcement', 'csharp15-whats-new'], locator: 'Languages → C# 15；开篇功能清单及 Memory safety (preview)' },
    { label: '联合类型：表达有限的备选情况', text: 'union 声明允许的 case 类型，并提供从这些类型转换到联合类型的机制；switch 表达式可检查是否覆盖所有 case。它适合组合并不共享继承基类的结果类型。所依赖的 UnionAttribute 和 IUnion 由 .NET 11 提供，不能把新语法与运行库支持混为一谈。', sourceIds: ['csharp15-union'], locator: 'Union types；运行库依赖；Union exhaustiveness；Nullability' },
    { label: '默认值边界：穷尽检查不是运行时保证', text: '生成的联合类型取 default 时可能包含 null，即使所有 case 都声明为非空。编译器不一定因此警告缺失 null 分支；这样的值进入没有相应分支的 switch 表达式仍可能抛出异常。显式处理 null 能保留对未来新增 case 的遗漏提示，不能把“无警告”理解成任何值都安全。', sourceIds: ['csharp15-union'], locator: 'Union exhaustiveness；Nullability → default 值与 null 分支' },
    { label: '封闭继承：只约束直接派生', text: 'closed 类的直接子类型必须在同一程序集和模块中声明，编译器据此检查 switch 表达式的分支。这个限制不传递：派生类不会自动成为 closed，未被 sealed 或 closed 限制的子类仍可在其他程序集继续派生。可空的输入还须处理 null。', sourceIds: ['csharp15-closed'], locator: 'Declaration rules；Exhaustive switch expressions' },
    { label: '工具链：默认版本跟随目标框架', text: '.NET 11 SDK 中以 net11.0 为目标的项目默认使用 C# 15；安装新 SDK 并不代表所有旧目标项目都默认切换。官方配置说明不支持使用高于目标框架所对应的语言版本，也不建议用会随机器上的编译器变化的 latest 设置。', sourceIds: ['csharp15-whats-new', 'csharp15-version'], locator: "What's new 开篇；Configure C# language version → TFM 默认选择、latest 警告、版本参考" },
    { label: '预览边界：内存安全并未整体稳定', text: '内存安全是一项跨版本工作。preview 语言设置启用其预览语法与指针规则放宽，updated-memory-safety-rules 是启用更新安全规则的另一个特性开关；unsafe 表达式还要求 AllowUnsafeBlocks。指针解引用等实际访问仍需要 unsafe，不能写成 C# 15 已消除不安全内存操作。', sourceIds: ['csharp15-whats-new'], locator: 'Memory safety (preview) → 指针操作、unsafe 表达式与特性开关说明段落' },
    { label: '编辑分析：建模与部署约束一起读', text: '联合类型组合已有类型，封闭继承层次则适合自己控制的继承关系。两者提供更清楚的情况集合，不等于取消空值、兼容性和运行时检查。先说明模型能表达什么，再说明编译器检查到哪里，更能解释这次语言演进的意义。', editorial: true, sourceIds: ['csharp15-union', 'csharp15-closed', 'csharp15-version'], locator: '依据官方类型、继承和配置边界作编辑归纳，非独立实验' },
  ],
  change: { baseline: 'C# 14 及既有类型与模式匹配机制；本站 C# 8 节点不是直接前一版本', improvements: ['联合类型声明有限 case 集合', 'closed 继承层次支持分支穷尽检查', '集合表达式参数与扩展索引器等正式能力'], tradeoffs: '默认值与 null 仍有边界；closed 不自动传递；目标框架与运行库约束仍在，内存安全仍为预览。', evidence: '正式发布公告与当前官方语言参考；未运行编译器或性能实验', sourceIds: csharp15Sources.map(source => source.id) },
  recommendedResources: [{ id: 'csharp15-union-reading', title: 'Union types', creator: 'Microsoft Learn 文档贡献者', series: 'C# language reference', kind: 'article', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/union', checkedAt, match: '从 case 集合、转换与 null 边界理解联合类型，而不是把穷尽检查当作运行时无异常保证。', scopeNote: '已核读类型声明、运行库依赖和穷尽性/空值部分。页面持续维护；示例未在本站独立编译。', locator: 'Union types；Union exhaustiveness；Nullability' }],
};
