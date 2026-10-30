import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-10-25';
const source = (id: string, title: string, url: string, locator: string, publishedAt?: string): Source => ({
  id, title, url, locator, publisher: 'Python 官方网站', type: '官方发布说明与提案', checkedAt,
  ...(publishedAt ? { publishedAt } : {}),
});

export const pythonReviewedSources: Source[] = [
  source('python30-release', 'Python 3.0 Release', 'https://www.python.org/download/releases/3.0/', 'Python 3.0 final；Python 3.0 Release: 03-Dec-2008', '2008-12-03'),
  source('python30-whatsnew', 'What’s New In Python 3.0', 'https://docs.python.org/3/whatsnew/3.0.html', 'Author；Print Is A Function；Integers；Text Vs. Data Instead Of Unicode Vs. 8-bit'),
  source('python3000-process', 'PEP 3000 – Python 3000', 'https://peps.python.org/pep-3000/', 'Author；Created；Compatibility and Transition；Implementation Language'),
  source('python311-release', 'Python Release Python 3.11.0', 'https://www.python.org/downloads/release/python-3110/', 'Release date；Major new features；General changes', '2022-10-24'),
  source('python311-whatsnew', 'What’s New In Python 3.11', 'https://docs.python.org/3.11/whatsnew/3.11.html', 'Editor；PEP 657；Faster CPython；FAQ'),
  source('python659-specialization', 'PEP 659 – Specializing Adaptive Interpreter', 'https://peps.python.org/pep-0659/', 'Author；Created；Abstract；Implementation；Costs'),
  source('python654-exception-groups', 'PEP 654 – Exception Groups and except*', 'https://peps.python.org/pep-0654/', 'Author；Python-Version；Abstract；Motivation；Rationale'),
];

export const pythonReviewedEvents: TimelineEvent[] = [
  {
    id: 'python-3', title: 'Python 3.0 发布', time: { kind: 'point', start: { year: 2008, month: 12, day: 3 } },
    category: 'release', periodIds: ['web-platform'], entityIds: ['python'], milestone: true,
    summary: 'Python 3.0 主动打破与 2.x 的部分兼容性，明确文本与二进制数据的区分，并调整除法和 print 等基础语义。',
    significance: '它把清理语言历史包袱与生态迁移成本同时摆到台前：设计更一致，并不意味着旧程序能无修改升级。',
    sourceIds: ['python30-release', 'python30-whatsnew', 'python3000-process'], tags: ['Python 3', 'Unicode', '兼容性', '迁移'],
    note: '日期取 3.0 正式发布日。Python 2 已有 Unicode 类型，不是只能处理 ASCII；也不能把 2008 年发布等同于整个生态已经迁移完成。这里介绍当年的设计与过渡方案，不推荐现在安装已停止维护的 3.0。',
    details: [
      { label: '背景：有意的不兼容，而非另起炉灶', text: '3.0 发布页明确它与 2.x 不兼容；PEP 3000 则把实现定位为既有 C 代码库的演进，而不是完全重写。语言设计调整与实现重写是两个不同问题。', sourceIds: ['python30-release', 'python3000-process'], locator: '发布页开头；PEP 3000 → Implementation Language' },
      { label: '事件内容：文本和字节需要明确边界', text: 'Python 2 同时有 Unicode 与 8 位字符串；3.0 以 str 表示文本、bytes 表示二进制数据，并要求明确编解码。另有 print 函数化，以及 1/2 得到浮点数、1//2 保留整除行为等变化。', sourceIds: ['python30-whatsnew'], locator: 'Text Vs. Data Instead Of Unicode Vs. 8-bit；Print Is A Function；Integers' },
      { label: '迁移边界：工具不能代替验证', text: 'PEP 3000 的过渡计划包括 2.6 警告模式、部分新特性回移与 2to3 转换工具，同时要求测试。文档指出转换器不能进行数据流分析或类型推断，因此自动改写不等于行为正确。', sourceIds: ['python3000-process'], locator: 'Compatibility and Transition' },
      { label: '如何理解这次转折', text: '我们把这次更新理解为“把隐含假设变成显式边界”：文本编码、数值运算和依赖兼容都要说清楚。阅读语言史时，发布日是设计落地的节点，不是社会性迁移已经结束的证明。', editorial: true },
    ],
    change: { baseline: 'Python 2.6 的 Unicode／8 位字符串并存、print 语句及旧除法语义', improvements: ['str 与 bytes 明确区分文本和二进制数据', 'print 从语句改为函数', '/ 与 // 明确区分真除法和整除', '整理并移除部分历史遗留行为'], tradeoffs: '主动打破兼容性；转换工具无法保证语义正确，程序及其依赖需要分别迁移和测试。', evidence: 'Python 3.0 正式发布页、版本变化说明与 PEP 3000 过渡方案', sourceIds: ['python30-release', 'python30-whatsnew', 'python3000-process'] },
    recommendedResources: [{ id: 'python30-guido-whatsnew', title: 'What’s New In Python 3.0', creator: 'Guido van Rossum', series: 'Python 官方文档 · 历史版本变化说明', kind: 'article', url: 'https://docs.python.org/3/whatsnew/3.0.html', match: '作者用新旧代码对照解释文本、除法与 print 的变化，适合从版本年份深入到真实的迁移问题。', scopeNote: '已核验作者、正文与正式发布日期；当前文档站保留的历史文章不是新版 Python 的完整使用指南。本条是可读文档，不涉及视频播放验收。', locator: 'Author；Common Stumbling Blocks；Porting To Python 3.0', checkedAt }],
  },
  {
    id: 'python-311', title: 'Python 3.11 发布', time: { kind: 'point', start: { year: 2022, month: 10, day: 24 } },
    category: 'release', periodIds: ['modern-safety'], entityIds: ['python'], milestone: true,
    summary: 'Python 3.11 引入异常组与更精细的错误定位，并通过 CPython 解释器优化改善部分工作负载的执行效率。',
    significance: '这个版本同时改进失败时的可诊断性与正常执行时的开销，而不只是一个通用的“更快”标签。',
    sourceIds: ['python311-release', 'python311-whatsnew', 'python659-specialization', 'python654-exception-groups'], tags: ['Python 3.11', 'CPython', '异常组', '解释器性能'],
    note: '日期取 3.11.0 稳定版发布日，内容按 3.11 的历史范围说明。解释器性能不等于所有 Python 实现或所有应用的速度；未在本项目独立重跑官方基准。',
    details: [
      { label: '事件内容：更完整地表达失败', text: 'ExceptionGroup 与 except* 支持把多个不相关异常一起传播并按子组处理，回应并发任务等场景；细粒度 traceback 则可指向一行中的具体表达式，而不只报告行号。', sourceIds: ['python654-exception-groups', 'python311-whatsnew'], locator: 'PEP 654 → Abstract、Motivation；What’s New → PEP 657' },
      { label: '性能机制：自适应的解释器', text: 'PEP 659 描述根据运行中出现的类型与值，把常见操作专门化，并在模式变化时退回或调整。这种解释器优化不必生成机器码；不能把它直接说成 3.11 已加入 JIT 编译器。', sourceIds: ['python659-specialization'], locator: 'Abstract；Implementation → Overview、Adaptive instructions' },
      { label: '基准边界：版本说明也有口径差异', text: '本次读取的 3.11.0 发布页写平均 1.22× 加速比；3.11 分支文档写 1.25×，并注明 GCC、Ubuntu Linux 与 pyperformance。文档还说明 I/O 或 C 扩展占主导的任务可能收益不明显，不能把这些数字当成每个程序的保证。', sourceIds: ['python311-release', 'python311-whatsnew'], locator: '发布页 General changes；Faster CPython；FAQ → I don’t see any speedups in my workload' },
      { label: '如何理解这次转折', text: '我们建议把升级收益分成两张清单：一张看能否更快定位和保留错误信息，另一张用自己的任务测量运行效果。前者改善开发反馈，后者依赖负载；二者都比单个速度百分比更能解释版本价值。', editorial: true },
    ],
    change: { baseline: 'Python 3.10 的异常处理方式与 CPython 解释器开销', improvements: ['ExceptionGroup 与 except* 表达多个异常', 'traceback 指向具体表达式', '自适应专门化等 Faster CPython 优化'], tradeoffs: '性能随负载与构建环境变化；异常组需要调用方理解其处理方式，自适应专门化也不等于 JIT。', evidence: '3.11.0 正式发布页、3.11 文档及 PEP 654／659；基准为官方报告，非本站实测', sourceIds: ['python311-release', 'python311-whatsnew', 'python659-specialization', 'python654-exception-groups'] },
    recommendedResources: [{ id: 'python311-mark-shannon-specialization', title: 'PEP 659 – Specializing Adaptive Interpreter', creator: 'Mark Shannon', series: 'Python Enhancement Proposals · PEP 659', kind: 'article', url: 'https://peps.python.org/pep-0659/', match: '解释动态语言为何仍能利用稳定的运行模式优化，以及专门化失败时如何退回，帮助理解 3.11 性能变化背后的机制。', scopeNote: '已核验作者、正文和提案范围；页面 Created 为 2021-04-13，不是 Python 3.11 发布日。提案中的预测性能不当作最终版本统一实测，也未独立执行基准。', locator: 'Author；Created；Abstract；Implementation；Costs', checkedAt }],
  },
];
