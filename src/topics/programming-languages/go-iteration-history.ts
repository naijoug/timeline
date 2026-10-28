import type { Source, TimelineEvent, EventRelation } from '../../core/types';
const checkedAt = '2026-10-28';
export const goIterationSources: Source[] = [
  { id: 'go122-announcement', title: 'Go 1.22 is released!', publisher: 'Eli Bendersky · Go 团队', url: 'https://go.dev/blog/go1.22', type: '官方发布公告', publishedAt: '2024-02-06', checkedAt, locator: '发布日期；Language changes' },
  { id: 'go122-notes', title: 'Go 1.22 Release Notes', publisher: 'Go 团队', url: 'https://go.dev/doc/go1.22', type: '版本说明', checkedAt, version: 'Go 1.22', locator: 'Changes to the language；Vet → References to loop variables' },
  { id: 'go122-loopvar-design', title: 'Fixing For Loops in Go 1.22', publisher: 'David Chase、Russ Cox · The Go Blog', url: 'https://go.dev/blog/loopvar-preview', type: '官方设计说明', publishedAt: '2023-09-19', checkedAt, locator: 'The Problem；The Fix；Previewing The Fix' },
  { id: 'go123-announcement', title: 'Go 1.23 is released', publisher: 'Dmitri Shuralyov · Go 团队', url: 'https://go.dev/blog/go1.23', type: '官方发布公告', publishedAt: '2024-08-13', checkedAt, locator: '发布日期；Language changes' },
  { id: 'go123-notes', title: 'Go 1.23 Release Notes', publisher: 'Go 团队', url: 'https://go.dev/doc/go1.23', type: '版本说明', checkedAt, version: 'Go 1.23', locator: 'Changes to the language；Standard library → iter / slices / maps' },
  { id: 'go123-iteration-explainer', title: 'Range Over Function Types', publisher: 'Ian Lance Taylor · The Go Blog', url: 'https://go.dev/blog/range-functions', type: '官方讲座改写文章', publishedAt: '2024-08-20', checkedAt, locator: 'Introduction；Why?；Range over (some) function types；Standard (push) iterators' },
  { id: 'go-iteration-spec', title: 'The Go Programming Language Specification · For statements', publisher: 'Go 团队', url: 'https://go.dev/ref/spec#For_statements', type: '语言规范', checkedAt, locator: 'For statements with for clause / range clause；Go 1.22、Go 1.23 版本标注' },
];
export const goIterationEvents: TimelineEvent[] = [
  {
    id: 'go-122-loops', title: 'Go 1.22：循环变量按迭代创建', time: { kind: 'point', start: { year: 2024, month: 2, day: 6 } },
    category: 'release', periodIds: ['modern-safety'], entityIds: ['go'], milestone: true,
    summary: 'Go 1.22 调整循环中声明的变量语义，减少闭包意外共享；同时正式支持对整数使用 range。',
    significance: '编辑解读：这是以语言版本控制迁移的语义修正，而不只是新增一种循环写法。',
    sourceIds: ['go122-announcement', 'go122-notes', 'go122-loopvar-design', 'go-iteration-spec'], tags: ['Go 1.22', '循环变量', '闭包', '兼容迁移'],
    note: '正式发布日为2024-02-06；2023年的设计文章讲的是 Go 1.21 中的预览。新语义按模块或文件的语言版本启用，不是只安装新版工具链就改写全部旧代码。',
    details: [
      { label: '背景：问题不只发生在并发里', text: '闭包保存循环变量引用时，旧规则可能使多个闭包看到同一变量后来的值；即使没有 goroutine，也会出现这种意外共享。设计说明据此讨论了静态检查漏报与误报之间的取舍。', sourceIds: ['go122-loopvar-design'], locator: 'The Problem' },
      { label: '经过：正式语义与实验能力分开', text: '1.22 对循环中声明的变量按每次迭代创建，并加入整数 range。函数迭代器在这一版仍需 GOEXPERIMENT=rangefunc，是预览，不应提前写成正式支持。', sourceIds: ['go122-announcement', 'go122-notes'], locator: 'Language changes；Changes to the language' },
      { label: '迁移边界：声明新变量，不是重新赋值', text: '模块 go.mod 声明 go 1.22 或更高版本后采用新语义，也可用文件构建约束控制。规范区分 range 中的 := 声明与对已有变量的 = 赋值；后者不会凭这次更新自动变成每轮新变量。', sourceIds: ['go122-loopvar-design', 'go-iteration-spec'], locator: 'The Fix；For statements with range clause' },
      { label: '编辑分析：升级要同时看语言版本与测试', text: '排查闭包问题时应先确认变量在哪里声明、模块要求哪个语言版本，再判断实际行为。减少一类意外共享不等于消除所有数据竞争；依赖旧共享语义的代码仍要审阅。', editorial: true },
    ],
    change: { baseline: '此前循环声明变量在迭代之间共享；Go 1.21 可预览新规则', improvements: ['循环声明变量按迭代创建', '整数 range 正式支持'], tradeoffs: '受语言版本控制；已有变量赋值不等同新声明，函数 range 在1.22仍是实验。', evidence: 'Go 1.22 公告、版本说明与语言规范', sourceIds: ['go122-announcement', 'go122-notes', 'go-iteration-spec'] },
    recommendedResources: [{ id: 'go122-loopvar-reading', title: 'Fixing For Loops in Go 1.22', creator: 'David Chase、Russ Cox', series: 'The Go Blog', kind: 'article', url: 'https://go.dev/blog/loopvar-preview', publishedAt: '2023-09-19', checkedAt, match: '具体分析闭包捕获、检测工具与按语言版本渐进迁移，适合了解为何需要改变循环语义。', scopeNote: '这是发布前的设计与预览说明，不能把文章日期当作1.22正式发布日；本次核验正文，未执行其中示例。', locator: 'The Problem；The Fix；Previewing The Fix' }],
  },
  {
    id: 'go-123-iterators', title: 'Go 1.23：函数迭代器正式进入 range', time: { kind: 'point', start: { year: 2024, month: 8, day: 13 } },
    category: 'release', periodIds: ['modern-safety'], entityIds: ['go'], milestone: true,
    summary: 'Go 1.23 将函数迭代器从预览推进为正式语言能力，并以 iter 包连接自定义容器与统一的遍历接口。',
    significance: '编辑解读：泛型容器不仅要能定义类型，还需要可组合的遍历约定；这一版补上了该接口。',
    sourceIds: ['go123-announcement', 'go123-notes', 'go123-iteration-explainer', 'go-iteration-spec', 'go122-notes'], tags: ['Go 1.23', '迭代器', 'range', '泛型容器'],
    note: '正式发布日为2024-08-13，讲座改写文章发表于8月20日。这里只记录当时的能力；泛型类型别名在1.23仍是受限实验，不与迭代器的正式状态混淆。',
    details: [
      { label: '背景：从泛型容器到共同遍历方式', text: '官方讲解以 Go 1.18 后能编写泛型容器为出发点：不同容器若各自约定遍历方式，就难以共享算法。1.23 扩展 range，使用户定义容器也能通过统一函数形式产生元素。', sourceIds: ['go123-iteration-explainer'], locator: 'Why?；Improvements in this release' },
      { label: '经过：限定签名，不是任意函数都能遍历', text: '正式支持的是接收 yield 回调的三类函数，回调产生零、一或两个值并返回 bool。iter 包提供 Seq、Seq2 命名类型，slices 与 maps 增加相关工具；它不是对所有函数返回值的自动遍历。', sourceIds: ['go123-notes', 'go123-iteration-explainer'], locator: 'Changes to the language；Standard library；Range over (some) function types' },
      { label: '执行边界：提前退出也有契约', text: '循环提前退出后，yield 返回 false，迭代器不能再次调用它。语法统一并不替开发者保证容器的顺序、资源清理或并发安全，应继续遵守具体容器和迭代器的契约。', sourceIds: ['go-iteration-spec'], locator: 'For statements with range clause → function iteration' },
      { label: '版本边界：正式迭代器与实验别名', text: '1.22 的函数 range 仍通过实验开关启用，1.23 才正式支持。另一方面，1.23 的泛型类型别名仍需实验工具链开关，且当时不支持跨包使用；同一版本里的功能不一定处于相同成熟阶段。', sourceIds: ['go122-notes', 'go123-notes'], locator: 'Changes to the language' },
      { label: '编辑分析：共同接口比功能数量更重要', text: '这条历史线索连接了泛型抽象与库之间的协作。选择迭代器时，应评估是否减少接口转换和临时集合，而不是预设换用新语法一定更快；本项目未做性能基准。', editorial: true },
    ],
    change: { baseline: 'Go 1.22 的 rangefunc 实验及既有容器遍历约定', baselineEventId: 'go-122-loops', improvements: ['函数 range 正式支持', 'iter.Seq / Seq2 与标准库迭代工具'], tradeoffs: '必须满足限定签名和提前退出协议；不承诺自动并发或无条件性能提升。', evidence: 'Go 1.23 版本说明与官方设计讲解', sourceIds: ['go123-notes', 'go123-iteration-explainer'] },
    recommendedResources: [{ id: 'go123-range-reading', title: 'Range Over Function Types', creator: 'Ian Lance Taylor', series: 'The Go Blog · GopherCon 2024 讲座改写稿', kind: 'article', url: 'https://go.dev/blog/range-functions', publishedAt: '2024-08-20', checkedAt, match: '以泛型集合、push/pull迭代器和标准库配合解释统一遍历接口的设计动机。', scopeNote: '已核验作者、日期、正文与GopherCon讲座背景；引用的是文章，未声称看过嵌入录像或运行示例。', locator: 'Introduction；Why?；Standard (push) iterators；Pull iterators' }],
  },
];
export const goIterationRelations: EventRelation[] = [{ id: 'go-generics-to-iteration', fromEventId: 'go-118', toEventId: 'go-123-iterators', label: '泛型容器推动统一迭代接口', sourceIds: ['go123-iteration-explainer'], locator: 'Why?；Improvements in this release', note: '官方讲解明确从1.18泛型容器讨论到统一迭代约定；不是只依据版本先后推断因果。' }];
