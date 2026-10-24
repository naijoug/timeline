import type { EventRelation, Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-10-24';
const source = (id: string, title: string, url: string, locator: string, publishedAt?: string): Source => ({
  id, title, url, locator, publisher: 'Go 官方网站', type: '官方公告与文档', checkedAt,
  ...(publishedAt ? { publishedAt } : {}),
});

export const goReviewedSources: Source[] = [
  source('go1-announcement', 'Go version 1 is released', 'https://go.dev/blog/go1', '发布日期；stability；go fix；go command', '2012-03-28'),
  source('go1-compatibility', 'Go 1 and the Future of Go Programs', 'https://go.dev/doc/go1compat', 'Introduction；Expectations：源码、二进制、安全修复与未指定行为'),
  source('go111-announcement', 'Go 1.11 is released', 'https://go.dev/blog/go1.11', '发布日期；modules 与 WebAssembly 均为 experimental', '2018-08-24'),
  source('go111-release-detail', 'Go 1.11 Release Notes', 'https://go.dev/doc/go1.11', 'Changes to the language；WebAssembly；Modules, package versioning, and dependency management'),
  source('go118-announcement', 'Go 1.18 is released!', 'https://go.dev/blog/go1.18', '发布日期；Generics；Fuzzing；Workspaces', '2022-03-15'),
  source('go118-release-detail', 'Go 1.18 Release Notes', 'https://go.dev/doc/go1.18', 'Changes to the language → Generics；Tools → Fuzzing、Go command'),
];

export const goReviewedEvents: TimelineEvent[] = [
  {
    id: 'go-10', title: 'Go 1 发布', time: { kind: 'point', start: { year: 2012, month: 3, day: 28 } },
    category: 'release', periodIds: ['modern-safety'], entityIds: ['go'], milestone: true,
    summary: 'Go 1 为语言和标准库建立长期源码兼容预期，并以统一的 go 命令整理日常工具链。',
    significance: '版本的意义不只是新增语法，更在于让程序、团队和教材有可以长期依赖的基础。',
    sourceIds: ['go1-announcement', 'go1-compatibility', 'go-release-notes'], tags: ['Go 1', '兼容性', '工具链'],
    note: '日期取正式发布公告。兼容承诺针对符合规范的源码，不是二进制兼容、性能不变或所有旧代码永不出错的保证。',
    details: [
      { label: '发布背景：先整理，再承诺稳定', text: 'Go 1 将预发布时期积累的语言与库调整集中落地；部分旧程序需要修改，官方提供 go fix 辅助迁移。稳定预期针对 Go 1 规范，不能倒推为所有早期代码都无需修改。', sourceIds: ['go1-announcement'], locator: 'not a major redesign；backwards-incompatible changes；go fix' },
      { label: '事件内容：工具链也是语言体验', text: '统一的 go 命令承担获取、构建、安装和维护代码等任务。与单看语法不同，发布公告把开发工作流的整理放在语言和标准库变化旁边说明。', sourceIds: ['go1-announcement'], locator: 'restructured the Go tool suite around the new go command' },
      { label: '影响与边界：兼容不等于冻结', text: '兼容文档允许增加 API；链接新版本时仍可能需要重新编译。安全问题、依赖未指定行为或实现错误的代码，以及 unsafe 等情况属于重要例外，程序性能也没有跨版本不变的承诺。', sourceIds: ['go1-compatibility'], locator: 'Introduction；Expectations' },
      { label: '如何理解这次转折', text: '我们把 Go 1 看作从“试用一种语言”转向“依赖一个工程契约”的节点。兼容性降低长期维护的不确定性，但升级前的测试仍不可省；这是对上述边界的编辑归纳，不是零迁移成本的保证。', editorial: true },
    ],
    change: { baseline: '2009 年开源后、Go 1 之前的预发布阶段', baselineEventId: 'go-open-source', improvements: ['明确语言与标准库的源码兼容预期', '整理库 API 并提供 go fix 迁移支持', '统一 go 命令的构建与维护流程'], tradeoffs: '预发布代码可能需要迁移；源码兼容不等于二进制兼容，也不消除安全修复等例外。', evidence: 'Go 1 正式发布公告；兼容文档 Introduction 与 Expectations', sourceIds: ['go1-announcement', 'go1-compatibility'] },
    recommendedResources: [{ id: 'go1-pike-engineering', title: 'Go at Google: Language Design in the Service of Software Engineering', creator: 'Rob Pike', series: 'Go 官方网站 · SPLASH 2012 演讲改写稿', kind: 'article', url: 'https://go.dev/talks/2012/splash.article', match: '从团队规模、构建时间与依赖管理解释 Go 的工程取舍，帮助理解 Go 1 为什么强调稳定基础。', scopeNote: '已核验作者、正文与演讲背景；这是 2012-10-25 演讲的改写文章，不是 Go 1 发布当天记录，也不声称已观看录像。', locator: '§1 Abstract；§3 Go at Google', checkedAt }],
  },
  {
    id: 'go-111', title: 'Go 1.11 发布', time: { kind: 'point', start: { year: 2018, month: 8, day: 24 } },
    category: 'release', periodIds: ['modern-safety'], entityIds: ['go'], milestone: true,
    summary: 'Go 1.11 初步引入 modules 与 js/wasm 目标；两项当时都被明确标为实验支持。',
    significance: '依赖版本管理和浏览器执行目标一起扩展，但这次发布没有改变语言规格。',
    sourceIds: ['go111-announcement', 'go111-release-detail'], tags: ['Go modules', 'WebAssembly', '实验支持'],
    note: '2018-08-24 是正式版本发布日期，不代表 modules 当时已全面默认启用，也不代表所有 Go 程序能无改动运行在浏览器。',
    details: [
      { label: '背景：依赖版本进入工具链', text: '模块机制为 GOPATH 布局提供另一条路径，让依赖版本明确记录，并允许开发者在 GOPATH 之外工作。发布说明将它与更可靠、可重复的构建联系起来。', sourceIds: ['go111-release-detail'], locator: 'Tools → Modules, package versioning, and dependency management' },
      { label: '事件内容：两项实验，而非一次语言改写', text: '官方公告同时介绍 modules 与 WebAssembly 实验端口；版本说明则明确语言规格没有变化。这里需要分开观察语言规则、工具链和执行平台，而不是把它们统称为新语法。', sourceIds: ['go111-announcement', 'go111-release-detail'], locator: '公告 modules、WebAssembly；版本说明 Changes to the language' },
      { label: '影响与边界：迁移和浏览器互操作', text: 'GO111MODULE 的模式选择保留旧工作流；js/wasm 编译产物包含 Go 运行时，并通过实验性的 syscall/js 与 JavaScript 交互。新目标不是对现有服务端程序的浏览器兼容承诺。', sourceIds: ['go111-release-detail'], locator: 'Tools → Modules；Ports → WebAssembly' },
      { label: '如何理解这次转折', text: '我们更看重这次更新把“代码在哪里、依赖哪个版本、运行到哪里”纳入日常工具链，而非只把它列成两个功能名。实验阶段与后来成熟普及应分开记录，避免用今天的默认配置解释 2018 年。', editorial: true },
    ],
    change: { baseline: '模块机制出现前的 GOPATH 依赖布局与既有编译目标', improvements: ['modules 初步支持与显式依赖版本', 'GO111MODULE 控制新旧模式', 'js/wasm 实验端口及 syscall/js'], tradeoffs: 'modules 与 WebAssembly 当时均属实验支持；语言规格本身没有变化。', evidence: 'Go 1.11 公告及对应版本说明', sourceIds: ['go111-announcement', 'go111-release-detail'] },
    recommendedResources: [{ id: 'go111-using-modules', title: 'Using Go Modules', creator: 'Tyler Bui-Palsulich、Eno Compton', series: 'The Go Blog · 模块系列第 1 篇', kind: 'article', url: 'https://go.dev/blog/using-go-modules', publishedAt: '2019-03-19', match: '用 go.mod、依赖升级和版本操作解释 1.11 引入的模块机制，适合从历史节点转入具体实践。', scopeNote: '已核验作者、发布日期和正文。文章晚于 1.11 发布，按 1.11/1.12 的早期模块环境讲解，不将它的日期当成模块首发日期。', locator: 'Introduction；Creating a new module；Adding a dependency', checkedAt }],
  },
  {
    id: 'go-118', title: 'Go 1.18 发布', time: { kind: 'point', start: { year: 2022, month: 3, day: 15 } },
    category: 'release', periodIds: ['modern-safety'], entityIds: ['go'], milestone: true,
    summary: 'Go 1.18 发布类型参数支持、工具链原生模糊测试和多模块工作区模式。',
    significance: '这一版本同时补强可复用抽象、测试探索和跨模块开发，而不只是一项泛型语法更新。',
    sourceIds: ['go118-announcement', 'go118-release-detail'], tags: ['Go 泛型', '模糊测试', 'go work'],
    note: '日期取正式发布公告，不是此前的 beta 或提案日期。本文描述 1.18 当时的能力与限制，不把后续版本完善提前算入。',
    details: [
      { label: '背景：长期需求与跨模块协作', text: '官方将泛型列为长期以来最受期待的能力之一；工作区则回应用户在多个模块之间协作的困难。两条需求路线在同一版本落地，不应混成一个泛型功能。', sourceIds: ['go118-announcement'], locator: 'Generics；Workspaces' },
      { label: '事件内容：类型参数与约束', text: '函数和类型可以声明类型参数；接口可用于描述类型集合，any 是空接口的别名，comparable 用作类型约束。这些变化扩展静态类型表达，但并没有把 Go 改成基于类继承的语言。', sourceIds: ['go118-release-detail'], locator: 'Changes to the language → Generics' },
      { label: '影响与边界：测试和工作流一并演进', text: '原生模糊测试进入标准工具链；工作区模式支持多个模块共同开发。1.18 的说明还列出泛型实现限制，并提醒新功能当时缺少大规模生产经验；后来的库和编译器进展不能倒填到本次发布。', sourceIds: ['go118-announcement', 'go118-release-detail'], locator: 'Fuzzing；Workspaces；Generics 的兼容与实现限制' },
      { label: '如何理解这次转折', text: '我们建议按问题而非语法清单理解 1.18：类型参数服务于跨类型复用，模糊测试探索边界输入，工作区减少跨模块联调摩擦。是否采用泛型仍应看重复逻辑与接口边界，不必为了使用新特性而重写已有代码。', editorial: true },
    ],
    change: { baseline: 'Go 1.17 的既有类型机制与单模块日常工作流', improvements: ['函数与类型声明支持类型参数', '类型集合与 comparable 等约束', '标准工具链集成模糊测试', 'go work 多模块工作区'], tradeoffs: '1.18 的泛型实现存在明确限制；新增能力不意味着所有代码都应泛型化，也不保证每种程序都更快。', evidence: 'Go 1.18 公告及对应版本说明', sourceIds: ['go118-announcement', 'go118-release-detail'] },
    recommendedResources: [{ id: 'go118-intro-generics', title: 'An Introduction To Generics', creator: 'Robert Griesemer、Ian Lance Taylor', series: 'The Go Blog · 基于 GopherCon 2021 讲解', kind: 'article', url: 'https://go.dev/blog/intro-generics', publishedAt: '2022-03-22', match: '围绕类型参数、类型集合和类型推断解释 1.18 泛型，能接着本节点阅读具体示例。', scopeNote: '已核验文章作者、正文和大会讲解背景。文章发表于正式发布后一周；页面嵌入的录像未验证播放，本文推荐的是可读文章。', locator: 'Introduction；Type Parameters；Type Sets；Type inference', checkedAt }],
  },
];

export const goReviewedRelations: EventRelation[] = [
  { id: 'go118-workspaces-modules', fromEventId: 'go-118', toEventId: 'go-111', label: '在模块机制上补充跨模块工作区', sourceIds: ['go118-announcement'], locator: 'Workspaces：multiple modules 与 workspace mode', note: '这是工具链能力的承接，不表示 1.18 紧接 1.11，也不是泛型由 modules 推导而来。' },
];
