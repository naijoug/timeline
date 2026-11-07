import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-11-07';
const announcement = 'typescript21-announcement';
const notes = 'typescript21-versioned-notes';
export const typescript21Sources: Source[] = [
  { id: announcement, title: 'Announcing TypeScript 2.1', publisher: 'Daniel Rosenwasser · Microsoft TypeScript', url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-2-1-2/', type: '官方正式发布公告', publishedAt: '2016-12-07', checkedAt, locator: '发布日期；keyof and Lookup Types；Mapped Types；Partial, Readonly, Record, and Pick；Async Functions' },
  { id: notes, title: 'TypeScript 2.1', publisher: 'Microsoft / TypeScript 文档贡献者', url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html', type: '版本化官方发布说明', version: 'TypeScript 2.1', checkedAt, locator: 'keyof and Lookup Types；Mapped Types；Downlevel Async Functions。版本页面不作为当日冻结快照或独立发布日期证据。' },
];

export const typescript21Event: TimelineEvent = {
  id: 'typescript-21', title: 'TypeScript 2.1：从类型查询到映射类型',
  time: { kind: 'point', start: { year: 2016, month: 12, day: 7 } },
  category: 'release', periodIds: ['modern-safety'], entityIds: ['typescript'], milestone: true,
  summary: 'TypeScript 2.1 正式发布，加入 keyof、索引访问与映射类型，并支持将 async/await 编译到 ES3/ES5 目标。',
  significance: '编辑解读：从逐个声明对象形状走向复用类型之间的关系，让库接口更容易表达；静态表达力与运行环境兼容仍是两件事。',
  sourceIds: [announcement, notes], tags: ['TypeScript 2.1', 'keyof', '映射类型', 'async/await'],
  note: '日期为正式发布公告日，不是 RC 日期。本文核对历史文档，未运行 TypeScript 2.1 编译器；不把当前版本的类型规则倒填到2016年。',
  details: [
    { label: '经过：正式版接续 RC', text: 'Daniel Rosenwasser 于2016年12月7日宣布2.1可用，并回指此前 RC 对异步函数与推断的介绍。本节点记录正式版，而非把预览公告当作最终发布。', sourceIds: [announcement], locator: '发布日期与开篇；Async Functions' },
    { label: '背景与机制：关联属性名和结果类型', text: '以属性名作为参数的 JavaScript 接口，需要把合法键与对应值类型联系起来。keyof T 查询属性名类型，T[K] 表达对应属性的类型；两者可组合描述泛型属性访问，而不是退回无约束的字符串与 any。', sourceIds: [notes], locator: 'keyof and Lookup Types' },
    { label: '变化：由已有类型推导变体', text: '映射类型按属性名构造新类型，使可选或只读变体不必重复列出每个字段。2.1 同时提供 Partial、Readonly、Record、Pick 等工具类型；这些是类型层的表达，不等于运行时自动复制或冻结对象。', sourceIds: [announcement, notes], locator: 'Mapped Types；Partial, Readonly, Record, and Pick' },
    { label: '运行边界：语法降级不补齐运行库', text: '此前 async/await 需以 ES2015 为目标；2.1 扩展到 ES3/ES5。运行环境仍须有符合 ECMAScript 的全局 Promise，必要时另加 polyfill；lib 选项也须让编译器认识 Promise。类型声明不能代替运行时实现。', sourceIds: [notes], locator: 'Downlevel Async Functions，尤其 Note' },
    { label: '编辑分析：分开看抽象与部署', text: '阅读这一节点可先追踪“键、值、派生类型”的关系，再检查目标环境的 Promise 条件。它展示类型抽象与代码生成两条进展，不意味着所有项目升级后都会更安全或更快。', editorial: true, sourceIds: [announcement, notes], locator: '根据类型机制与异步运行条件作编辑归纳；不是性能实测' },
  ],
  change: {
    baseline: '既有对象类型声明，以及仅面向 ES2015 的 async/await 支持',
    improvements: ['keyof 与索引访问类型', '映射类型与通用工具类型', 'async/await 可面向 ES3/ES5'],
    tradeoffs: '静态类型不执行运行时对象操作；异步语法降级仍要求 Promise 实现与类型声明。',
    evidence: '同期官方正式公告与2.1版本说明，未进行旧编译器或性能实验', sourceIds: [announcement, notes],
  },
  recommendedResources: [{
    id: 'typescript21-type-transformations-reading', title: 'TypeScript 2.1', creator: 'Microsoft / TypeScript 文档贡献者',
    series: 'TypeScript 官网 · Handbook / Release Notes', kind: 'article',
    url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html', checkedAt,
    match: '先读键查询、索引访问及映射类型的组合，再对照异步函数的运行条件，区分类型层与部署层。',
    locator: 'keyof and Lookup Types；Mapped Types；Downlevel Async Functions',
    scopeNote: '已核读这些章节，不声称通读所有版本手册或执行示例。此页未标独立发表日；正式发布日期另据同期微软公告。',
  }],
};
