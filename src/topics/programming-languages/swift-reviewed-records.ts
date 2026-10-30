import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-10-26';
export const swiftReviewedSources: Source[] = [
  { id: 'swift51-module-stability', title: 'Swift 5.1 Released!', publisher: 'Ted Kremenek · Swift.org', url: 'https://www.swift.org/blog/swift-5.1-released/', type: '官方发布公告', publishedAt: '2019-09-20', checkedAt, locator: 'Module Stability；Additional Language and Compiler Updates' },
  { id: 'swift-library-evolution', title: 'Library Evolution in Swift', publisher: 'Slava Pestov · Swift.org', url: 'https://www.swift.org/blog/library-evolution/', type: '官方技术说明', publishedAt: '2020-02-13', checkedAt, locator: '首段三种稳定性；When to enable library evolution support；Enabling library evolution support' },
  { id: 'swift6-migration-wwdc24', title: 'Migrate your app to Swift 6', publisher: 'Apple Swift 团队 · WWDC24', url: 'https://developer.apple.com/videos/play/wwdc2024/10169/', type: '官方讲座与文字稿', checkedAt, locator: '3:20 data-race safety；7:26 The strategy；25:51 language mode；27:47 incremental strategy；文字稿' },
];

export const swiftReviewedPatches: Record<string, Partial<TimelineEvent>> = {
  'swift-5': {
    sourceIds: ['swift5-exact-release', 'swift51-module-stability', 'swift-library-evolution'],
    significance: '编辑解读：Swift 5 的意义不只在新增语法，也在于把应用与系统运行时之间的兼容契约稳定下来；分发第三方二进制框架仍须区分后续的模块稳定与库演进能力。',
    note: '此节点仍按 Swift 5 正式发布日 2019-03-25 归档。Apple 平台 ABI 稳定、Swift 5.1 模块稳定与源码兼容不是同一个承诺；不把 5.1 功能倒填为 5.0 首发能力。',
    details: [
      { label: '事件背景：稳定的是哪一层接口', text: 'Swift 5 在 Apple 平台确立稳定 ABI，应用可以使用操作系统内置的 Swift 运行时和标准库。该承诺不能无条件推广到所有平台，也不等于任意旧源码都无需迁移。', sourceIds: ['swift5-exact-release', 'swift-library-evolution'], locator: 'Swift 5 → ABI Stability；Library Evolution → 首段' },
      { label: '后续进展：模块稳定在 5.1 到来', text: '2019年9月20日发布的 Swift 5.1 引入文本模块接口，使不同版本编译器能够使用分发的二进制框架；它还加入库演进支持。二者属于后续版本，不能只看到“Swift 5 稳定 ABI”就推定所有二进制分发问题已经解决。', sourceIds: ['swift51-module-stability'], locator: '发布日期；Module Stability' },
      { label: '工程边界：并非每个库都要开启演进模式', text: '2020年的官方说明建议，仅对需要与客户端分别构建和更新的框架启用库演进；总是一起构建、分发的模块不需要此模式。相关设置会影响性能特征与部分语言检查，不能把开关当作无代价的兼容性保险。', sourceIds: ['swift-library-evolution'], locator: 'When to enable library evolution support' },
      { label: '编辑分析：兼容性先问对象与场景', text: '我们建议把“源码能否重新编译”“编译器能否读取模块接口”“既有二进制能否继续协作”拆开理解。阅读版本历史时，先确定承诺针对哪一层、哪类平台和分发方式，比笼统记住“稳定了”更有用。', editorial: true },
    ],
    recommendedResources: [{ id: 'swift5-library-evolution-reading', title: 'Library Evolution in Swift', creator: 'Slava Pestov', series: 'Swift.org 官方博客', kind: 'article', url: 'https://www.swift.org/blog/library-evolution/', publishedAt: '2020-02-13', checkedAt, match: '用具体二进制框架场景拆开 ABI、模块稳定与库演进，适合接着 Swift 5／5.1 公告阅读。', scopeNote: '已核验作者、日期与正文。这是2020年的技术说明，不是2019年3月的发布公告；未独立构建示例框架或验证所有平台组合。', locator: '首段；When to enable library evolution support；Enabling library evolution support' }],
  },
  'swift-6': {
    sourceIds: ['swift6-release', 'swift6-migration-wwdc24'],
    significance: '编辑解读：这次演进将并发隔离的部分责任移入编译期检查，但采纳新语言模式仍是逐模块的工程迁移，而不是换一个工具链版本就完成。',
    note: '日期取 2024-09-17 正式公告。Swift 6 工具链与可选择启用的 Swift 6 语言模式分开，升级编译器不等于自动开启新模式；当时随工具链提供的 Embedded Swift 仍属实验性预览。此处描述发布时状态，不推断其后稳定时间。',
    details: [
      { label: '变化：编译器版本不等于语言模式', text: 'Swift 6 正式发布后，新语言模式仍需主动启用。Swift 5.10 可用完整严格并发选项产生的潜在数据竞争警告，在 Swift 6 模式中升级为错误；这不意味着所有并发业务逻辑都自动正确。', sourceIds: ['swift6-release'], locator: 'Language and Standard Library → Concurrency' },
      { label: '迁移过程：先整理隔离，再逐模块启用', text: 'WWDC24 的 Coffee Tracker 示例先检查共享可变状态与隔离边界，再逐步为 watch extension、CoffeeKit 等模块启用完整检查和 Swift 6 模式。讲座也讨论未由自己维护的代码，展示渐进策略而非一次重写整个应用。', sourceIds: ['swift6-migration-wwdc24'], locator: '7:26 The strategy；23:40 code you do not maintain；25:51、27:47 与35:23章节' },
      { label: '能力边界：正式工具链也会包含实验特性', text: '正式公告把 typed throws、非可复制类型的泛型支持与 Embedded Swift 分别介绍；后者是面向受限环境的语言子集和编译模式，在本次发布时仍明确标为实验性预览。不能因为 Swift 6 已正式可用，就把所有随附能力都称为稳定。', sourceIds: ['swift6-release'], locator: 'Typed throws；Ownership；Embedded Swift' },
      { label: '编辑分析：把迁移变成可检查的小步骤', text: '我们认为先辨认数据由谁隔离、在哪个边界传递，再逐模块打开诊断，更容易发现真正需要设计调整的地方。编译通过是一个检查点，而不是性能、业务正确性或全部外部依赖安全性的证明。', editorial: true },
    ],
    recommendedResources: [{ id: 'swift6-wwdc-migration-reading', title: 'Migrate your app to Swift 6', creator: 'Ben · Apple Swift 团队', series: 'WWDC24 · Session 10169', kind: 'video', url: 'https://developer.apple.com/videos/play/wwdc2024/10169/', checkedAt, match: '通过同一个 Coffee Tracker 应用演示逐模块采纳，直接对应工具链、语言模式和隔离边界的区别，而不是泛泛的 Swift 频道入口。', scopeNote: '已核验具体节目身份、章节和官方文字稿，讲者在稿中自称 Ben；未补猜姓氏、精确上线日，也未完整播放视频或运行示例。', locator: '3:20、7:26、23:40、25:51、27:47、35:23' }],
  },
};
