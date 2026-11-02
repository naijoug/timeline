import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-11-02';
export const javaReviewedSources: Source[] = [
  { id: 'java21-virtual-threads-guide', title: 'Virtual Threads', publisher: 'Oracle · Java SE 21 Core Libraries', url: 'https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html', type: '版本化官方使用指南', checkedAt, locator: 'Why Use Virtual Threads?；Scheduling Virtual Threads and Pinned Virtual Threads；Virtual Threads: An Adoption Guide。机制和限制以 Java 21 为范围，不将此持续维护页面当成当日发布公告。' },
];

export const java21Patch: Partial<TimelineEvent> = {
  time: { kind: 'point', start: { year: 2023, month: 9, day: 19 } },
  summary: 'JDK 21 正式可用，虚拟线程、记录模式与 switch 模式匹配转正；结构化并发等能力仍处于预览阶段。',
  significance: '编辑解读：这一节点适合观察 Java 如何保留熟悉的线程式代码，同时扩展高并发服务的实现选择；新机制不等于每项任务都会更快。',
  sourceIds: ['java-versions', 'java21-exact-features', 'java21-arrival', 'java21-virtual-threads-guide'],
  note: '日期按 JDK 21 正式可用（GA）公告，而非预览版或提案日期。LTS 是发行商的支持与维护安排，不是另一套 Java 语言语义；本页只说明 Oracle 公告中的长期支持定位，不泛化各发行商期限。虚拟线程限制按 Java 21 描述，不代表所有后续版本。',
  details: [
    { label: '事件：正式发布与预览并存', text: '2023年9月19日，Oracle Java 团队宣布 JDK 21 正式可用。虚拟线程、记录模式和 switch 模式匹配成为正式能力；同版的 Scoped Values 与 Structured Concurrency 仍是 Preview。不能把随 JDK 一起提供理解为所有能力都已最终定型。', sourceIds: ['java21-arrival'], locator: '公告日期与 General Availability；JEP 440、441、444、446、453' },
    { label: '背景与机制：扩展线程式服务', text: '发布文章把虚拟线程放在 Project Loom 下介绍，并回顾其在 JDK 19、20 的预览。Java 21 指南说明它仍是 java.lang.Thread，但不固定绑定一个操作系统线程；运行时可在等待阻塞 I/O 时挂起虚拟线程，让承载线程处理其他任务。这为每请求一个线程的写法提供新的伸缩路径，而不是要求把代码统一改写成异步回调。', sourceIds: ['java21-arrival', 'java21-virtual-threads-guide'], locator: 'Project Loom；What is a Virtual Thread?；Virtual Threads: An Adoption Guide' },
    { label: '影响与边界：吞吐量不是计算加速', text: '官方指南面向大量等待 I/O 的并发任务，区分更高吞吐量与更低延迟：虚拟线程不会让代码执行得更快，也不是长时间 CPU 密集运算的加速手段。在 Java 21 中，synchronized 区块或方法以及 native 方法等可能使虚拟线程固定在承载线程上；长时间固定会妨碍伸缩，不能只凭线程数量推断服务性能。', sourceIds: ['java21-virtual-threads-guide'], locator: 'Why Use Virtual Threads?；Scheduling Virtual Threads and Pinned Virtual Threads' },
    { label: '编辑分析：把三种承诺分开阅读', text: '建议分别核对发布状态、执行模型和发行商维护政策：GA 日期回答版本何时可用，虚拟线程回答等待任务如何承载，LTS 回答谁负责多长时间的维护。三者都不能替代对真实应用的测量；这里提供学习路径，不作吞吐量排名或迁移收益保证。', editorial: true, sourceIds: ['java21-arrival', 'java21-virtual-threads-guide'], locator: '基于发布公告和使用指南的编辑归纳；本站未运行性能实验' },
  ],
  recommendedResources: [{ id: 'java21-virtual-threads-reading', title: 'Virtual Threads', creator: 'Oracle', series: 'Java SE 21 Core Libraries', kind: 'article', url: 'https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html', checkedAt, match: '用线程创建、客户端/服务端示例和采用指南，具体解释本次转正的虚拟线程适用什么任务，以及 Java 21 中的固定限制。', locator: 'Why Use Virtual Threads?；Scheduling Virtual Threads and Pinned Virtual Threads；Virtual Threads: An Adoption Guide', scopeNote: '已核读官方版本化指南的对应章节；页面未标明独立发表日期，不猜日期。它用于解释 Java 21 的机制，不替代 GA 公告；示例未在本站执行，性能收益须按真实工作负载测量。' }],
};
