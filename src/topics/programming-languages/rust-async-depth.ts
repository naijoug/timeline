import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-10-29';
export const rustAsyncSources: Source[] = [
  { id: 'rust-async-ecosystem', title: 'The Async Ecosystem', publisher: 'Rust Async Book 贡献者', url: 'https://rust-lang.github.io/async-book/08_ecosystem/00_chapter.html', type: '官方项目教程', checkedAt, locator: '首段与 Async Runtimes：标准库无异步运行时；持续维护的机制说明，不是2019年发布清单。' },
  { id: 'rust136-future-release', title: 'Announcing Rust 1.36.0', publisher: 'The Rust Release Team', url: 'https://blog.rust-lang.org/2019/07/04/Rust-1.36.0/', type: '官方发布公告', checkedAt, publishedAt: '2019-07-04', locator: 'The Future is here!：Future trait 稳定，为后续 async / await 预留生态准备期' },
  { id: 'rust139-async-explainer', title: 'Async-await on stable Rust!', publisher: 'Niko Matsakis · Rust Blog', url: 'https://blog.rust-lang.org/2019/11/07/Async-await-stable/', type: '同期官方设计解读', checkedAt, publishedAt: '2019-11-07', locator: 'Async-await: a quick primer；Zero-cost futures；Major developments in the async ecosystem' },
  { id: 'rust-await-reference', title: 'Await expressions', publisher: 'Rust 项目文档贡献者 · The Rust Reference', url: 'https://doc.rust-lang.org/reference/expressions/await-expr.html', type: '语言参考', checkedAt, locator: '2018 Edition differences；本条仅用其版次门槛说明，不将当前 IntoFuture 或 async closure 语义倒灌为1.39的能力' },
  { id: 'rust-async-primer', title: 'async/.await Primer', publisher: 'Rust Async Book 贡献者', url: 'https://rust-lang.github.io/async-book/01_getting_started/04_async_await_primer.html', type: '官方项目教程', checkedAt, locator: 'Future 需要 executor；block_on 与 .await 的区别；join! 的单线程并发示例。持续维护教程不是2019年发布清单。' },
];

export const rustAsyncPatch: Partial<TimelineEvent> = {
  significance: '编辑解读：它为 Future 组合提供接近顺序代码的表达方式，但把任务调度与 I/O 运行时选择留给生态，并不自动带来多线程或性能提升。',
  sourceIds: ['rust139-release', ...rustAsyncSources.map(s => s.id)],
  note: '稳定日为2019-11-07，需 Rust 2018 或之后的 edition；版次名称不等于功能发布年份。此页为历史与机制介绍，未编译或基准测试示例，不建议为学习而安装旧工具链。当前教程只用于解释执行模型，不充当1.39完整能力清单。',
  details: [
    { label: '背景：先稳定 Future，再交付语法', text: '2019年7月4日的 Rust 1.36 先稳定 Future trait，公告明确让库和生态为 async / await 做准备。11月7日，1.39 才稳定 async fn、async 块与 .await。二者不是同一天落地；Rust 2018 是使用这些语法的版次门槛，不代表语法已在2018年稳定。', sourceIds: ['rust136-future-release', 'rust139-release', 'rust-await-reference'], locator: '1.36 → The Future is here!；1.39 → The .await is over；Reference → 2018 Edition differences' },
    { label: '机制：调用不等于启动任务', text: '同期说明强调，调用 async 函数只是取得尚待执行的 Future，不会自行调度它。执行器驱动外层任务，.await 组合内部计算；当 Future 尚不能推进时，可交还控制权。后缀 future.await 还可接 ? 传播错误。这里的“惰性”不能理解成每一次 await 都必然暂停。', sourceIds: ['rust139-async-explainer', 'rust-async-primer'], locator: 'Async-await: a quick primer；Zero-cost futures；Primer → executor 与 .await' },
    { label: '边界：语法、执行器与并行分开', text: '1.39 的稳定化不是把 Tokio 等运行时一并纳入标准库；同期文章把各运行时适配及其计划单列为生态工作。教程区分 block_on 阻塞当前线程与 .await 等待，且展示同一线程上的多任务并发。因此，加上 async 不等于启动新线程，也不保证应用里的阻塞调用被自动改造为异步 I/O。', sourceIds: ['rust139-async-explainer', 'rust-async-primer', 'rust-async-ecosystem'], locator: 'The Async Ecosystem → Async Runtimes；Major developments in the async ecosystem；Primer → block_on 注释与 join! 示例' },
    { label: '编辑分析：沿三层阅读，而非只记关键字', text: '建议先看发布公告确认“何时稳定”，再看同期设计解释“Future 如何组合”，最后用教程检查“谁驱动任务”。把顺序等待、并发和多线程并行分别记录，才能理解后续运行时为何仍有不同调度取舍。这是编辑学习路径，不是某个运行时更快或适合所有工作负载的结论。', editorial: true, sourceIds: ['rust139-release', 'rust139-async-explainer', 'rust-async-primer'], locator: '根据发布、机制和执行示例作编辑归纳' },
  ],
  recommendedResources: [{ id: 'rust139-async-reading', title: 'Async-await on stable Rust!', creator: 'Niko Matsakis', series: 'Rust 官方博客', kind: 'article', url: 'https://blog.rust-lang.org/2019/11/07/Async-await-stable/', publishedAt: '2019-11-07', checkedAt, match: '用具体 Future 调用与 .await 示例串起惰性、后缀语法和运行时生态，适合补足发布公告只列功能的部分。', locator: 'Async-await: a quick primer；Zero-cost futures', scopeNote: '已核读文字与作者、日期。文中的运行时未来版本计划仅代表当时计划；“zero-cost”不是整项任务没有内存或调度开销，也不是本站独立性能实测。' }],
};
