import { goIterationEvents, goIterationSources, goIterationRelations } from './go-iteration-history';
import type {
  Catalog,
  Entity,
  Period,
  Source,
  TimeSpan,
  TimelineEvent,
} from "../../core/types";
import { evolutionCheckedAt, evolutionEvents, evolutionRelations, evolutionSources } from "./evolution-milestones";

import { goReviewedEvents, goReviewedSources, goReviewedRelations } from "./go-reviewed-records";
import { pythonReviewedEvents, pythonReviewedSources } from "./python-reviewed-records";
import { rustReviewedEvents, rustReviewedSources } from "./rust-reviewed-records";

import { swiftReviewedPatches, swiftReviewedSources } from "./swift-reviewed-records";

const checkedAt = "2026-10-12";

const source = (
  id: string,
  title: string,
  publisher: string,
  url: string,
  type: string,
  locator = "见对应条目中的日期与版本说明",
): Source => ({ id, title, publisher, url, type, locator, checkedAt });

export const sources: Source[] = [
  ...goReviewedSources,
  ...pythonReviewedSources,
  ...rustReviewedSources,
  source("ibm-fortran", "Fortran — IBM History", "IBM", "https://www.ibm.com/history/fortran", "机构史料", "项目背景、1957 年交付与首个编译器"),
  source("acm-lisp", "Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I", "ACM", "https://dl.acm.org/doi/10.1145/367177.367199", "原始论文", "Communications of the ACM, 1960 年 4 月"),
  source("codasyl-cobol", "COBOL: Initial Specifications for a Common Business Oriented Language", "CODASYL · Bitsavers 扫描档案", "https://bitsavers.trailing-edge.com/pdf/codasyl/COBOL_Report_Apr60.pdf", "历史规格", "1960 年 4 月报告；1959 年为发起年份"),
  source("acm-algol60", "Report on the Algorithmic Language ALGOL 60", "ACM", "https://dl.acm.org/doi/10.1145/367236.367262", "原始报告", "1960 年 5 月报告"),
  source("dartmouth-basic", "BASIC at 50", "达特茅斯学院", "https://www.dartmouth.edu/basicfifty/basic.html", "机构史料", "1964 年 5 月 1 日运行记录"),
  source("acm-simula", "The Development of the SIMULA Languages", "ACM", "https://dl.acm.org/doi/10.1145/960118.808391", "历史论文", "Nygaard 与 Dahl 回顾 Simula 67"),
  source("eth-pascal", "The Programming Language Pascal", "苏黎世联邦理工学院", "https://www.research-collection.ethz.ch/items/514c7df1-8a1c-46c3-af34-2b7938131aeb", "技术报告", "1970 年 11 月报告"),
  source("bell-c", "The Development of the C Language", "Nokia Bell Labs", "https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.html", "作者回顾", "Ritchie 说明 1969—1973 年形成过程"),
  source("prolog-history", "The Birth of Prolog", "Colmerauer 与 Roussel · Prolog Academy 镜像", "https://prolog.academy/DOCS/the%20birth%20of%20prolog%20-%20Colmerauer%20-%20nov%201992.pdf", "作者回顾", "1972 年秋第一个解释器"),
  source("smalltalk-manual", "Smalltalk-72 Instruction Manual", "Computer History Museum", "https://smalltalkzoo.computerhistory.org/papers/Smalltalk72_Manual.pdf", "历史手册", "1972 年夏设计与秋冬季使用"),
  source("mit-scheme", "SCHEME: An Interpreter for Extended Lambda Calculus", "MIT · Sussman 与 Steele", "https://dspace.mit.edu/entities/publication/83ae1e70-c572-430d-abc1-c52725abfefb", "原始报告", "AIM-349，1975 年 12 月；摘要说明 Lisp-like language 与 lambda calculus"),
  source("ada-standard", "Ada 83: ANSI/MIL-STD-1815A", "Ada Resource Association", "https://www.adaic.org/ada-resources/standards/", "标准档案", "Ada 83 标准入口"),
  source("cpp-history", "A History of C++: 1979—1991", "Bjarne Stroustrup", "https://www.stroustrup.com/hopl2.pdf", "作者回顾", "1983 年命名与 1985 年商业发布"),
  source("objc-history", "The Origins of Objective-C at PPI/Stepstone and its Evolution at NeXT", "Brad Cox、Steve Naroff、Hansen Hsu · HOPL IV", "https://hopl4.sigplan.org/details/hopl-4-papers/18/The-Origins-of-Objective-C-at-PPI-Stepstone-and-its-Evolution-at-NeXT", "作者历史回顾", "摘要：1980 年代初起源；1986 年 Naroff 加入与 NeXT 成为重要客户"),
  source("apple-objc", "Programming with Objective-C", "Apple Developer", "https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html", "官方文档", "Objective-C 的面向对象模型"),
  source("erlang-history", "Concurrent Programming in ERLANG", "Erlang 官网", "https://erlang.org/download/erlang-book-part1.pdf", "技术资料", "并发模型与早期电信背景"),
  source("perl-release", "perlhist — the Perl history records", "Perl 官方社区", "https://perldoc.perl.org/perlhist", "官方版本史", "THE RECORDS：Larry，1.000，1987-Dec-18"),
  source("haskell-report", "Haskell 1.0 Report", "Haskell 官方社区", "https://www.haskell.org/definition/haskell-report-1.0.ps.gz", "语言报告", "1990 年 Haskell 1.0"),
  source("python-history", "25 Years of Python at CWI", "Centrum Wiskunde & Informatica", "https://www.cwi.nl/en/news/25-years-of-python-at-cwi/", "机构史料", "2015 年回顾：1989 年设计、1990 年原型与 1991-02-20 首次公开发布"),
  source("oracle-java", "What is Java technology and why do I need it?", "Oracle", "https://www.java.com/en/download/help/whatis_java.html", "官方历史说明", "首段：Sun 于 1995 年首次发布 Java；下文 JRE 8 描述不能倒推到 1995 年"),
  source("netscape-javascript", "Netscape and Sun Announce JavaScript", "Netscape 新闻稿 · Web Archive", "https://web.archive.org/web/20080206040518/http://wp.netscape.com/newsref/pr/newsrelease67.html", "新闻稿", "1995 年 12 月 4 日发布"),
  source("php-history", "PHP 手册：历史与发布", "PHP 官方社区", "https://www.php.net/manual/en/history.php.php", "官方文档", "PHP Tools 于 1995 年 6 月公开；PHP/FI 合名始于 1996 年 4 月"),
  source("ruby-history", "Ruby 语言的诞生", "Ruby 官方社区", "https://www.ruby-lang.org/en/documentation/faq/1/", "官方资料", "1995 年 Ruby 0.95"),
  source("ecma-javascript", "ECMA-262: ECMAScript Language Specification", "Ecma International", "https://www.ecma-international.org/publications-and-standards/standards/ecma-262/", "标准", "ECMAScript 标准系列"),
  source("microsoft-csharp", "Microsoft Introduces Highly Productive .NET Programming Language: C#", "Microsoft", "https://news.microsoft.com/source/2000/06/26/microsoft-introduces-highly-productive-net-programming-language-c/", "官方新闻稿", "2000-06-26 公布；技术预览计划在后续 PDC 提供"),
  source("scala-release", "An Overview of the Scala Programming Language (Second Edition)", "Martin Odersky 等 · EPFL", "https://scala-lang.org/docu/files/ScalaOverview.pdf", "技术报告", "第 1 页：2004 年 1 月 JVM 公开发布；面向对象与函数式设计"),
  source("clojure-release", "Clojure 15th Anniversary: A Retrospective", "Georgia Anunciação · Nubank", "https://building.nubank.com/clojure-15th-anniversary-a-retrospective/", "机构回顾", "2007: The Release；区分 2005 年设计与 2007 年公开发布"),
  source("go-open-source", "Hey! Ho! Let's Go!", "Google Open Source Blog", "https://opensource.googleblog.com/2009/11/hey-ho-lets-go.html", "官方公告", "2009 年 11 月 10 日开源"),
  source("rust-history", "Rust programming language — Mozilla Annual Summit, July 2010", "Graydon Hoare", "https://venge.net/graydon/talks/intro-talk.pdf", "原始演讲", "2010 年 7 月；早期安全/并发设计与实现状态，不代表现代借用检查器"),
  source("typescript-release", "Announcing TypeScript 1.0", "Microsoft TypeScript", "https://devblogs.microsoft.com/typescript/announcing-typescript-1-0/", "官方公告", "2014 年公告回顾 2012 年 10 月 TypeScript 0.8 首次发布"),
  { ...source("julia-paper", "Julia: A Fresh Approach to Numerical Computing", "SIAM Review", "https://epubs.siam.org/doi/10.1137/141000671", "原始论文", "Information & Authors → History：2017-02-07 在线发表；Abstract：设计目标"), publishedAt: "2017-02-07", checkedAt: evolutionCheckedAt },
  source("apple-swift", "Apple Releases iOS 8 SDK With Over 4,000 New APIs", "Apple", "https://www.apple.com/ie/newsroom/2014/06/02Apple-Releases-iOS-8-SDK-With-Over-4-000-New-APIs/", "官方新闻稿", "2014-06-02；Swift 与 Objective-C 共存；SDK beta"),
  source("kotlin-release", "Kotlin 1.0 Released", "JetBrains", "https://blog.jetbrains.com/kotlin/2016/02/kotlin-1-0-released-pragmatic-language-for-jvm-and-android/", "官方公告", "2016 年 1.0 发布及 Java 互操作性"),
  source("elixir-release", "Elixir v0.5.0 released", "José Valim · Elixir", "https://elixir-lang.org/blog/2012/05/25/elixir-v0-5-0-released/", "官方公告", "2012-05-25；重写后的首次发布，不是语言最早原型"),
  source("carbon-release", "Carbon Language", "GitHub", "https://github.com/carbon-language/carbon-lang", "实验项目", "2022 年 7 月公开实验代码"),
  source("modular-mojo", "A unified, extensible platform to superpower your AI", "Chris Lattner、Tim Davis、Eric Johnson · Modular", "https://www.modular.com/blog/a-unified-extensible-platform-to-superpower-your-ai", "官方公告", "2023-05-02；仍在开发，通过 JupyterHub Playground 预览"),
  source("python-313", "Python 3.13 Release Notes", "Python 官方社区", "https://docs.python.org/3.13/whatsnew/3.13.html", "发布说明", "实验性 free-threaded 构建与 2024 年发布"),
  source("java-versions", "Java SE Versions", "Oracle", "https://www.oracle.com/java/technologies/java-se-support-roadmap.html", "官方路线图", "Java SE 5/8/11/17/21 版本窗口"),
  source("javascript-2015", "ECMAScript 2015 Language Specification", "Ecma International", "https://262.ecma-international.org/6.0/", "标准", "let/const、类、模块与 Promise"),
  source("typescript20-exact-release", "TypeScript 2.0 is now available!", "Daniel Rosenwasser · Microsoft", "https://devblogs.microsoft.com/typescript/announcing-typescript-2-0/", "官方公告", "2016-09-22；strictNullChecks 与控制流分析"),
  source("typescript50-exact-release", "Announcing TypeScript 5.0", "Daniel Rosenwasser · Microsoft", "https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/", "官方公告", "2023-03-16；装饰器、const 类型参数和模块解析"),
  source("typescript-release-notes", "Announcing TypeScript 1.0", "Jonathan Turner · Microsoft", "https://devblogs.microsoft.com/typescript/announcing-typescript-1-0/", "官方公告", "2014-04-02；稳定平台与 Visual Studio 集成"),
  source("go-release-notes", "Go Release History", "Go 官方社区", "https://go.dev/doc/devel/release", "发布说明", "Go 1/1.11/1.18 版本记录"),
  source("rust-editions", "Rust Edition Guide", "Rust 官方社区", "https://doc.rust-lang.org/edition-guide/", "官方指南", "Rust 2015/2018/2021/2024 版本差异"),
  source("csharp-release-notes", "The history of C#", "Microsoft Learn", "https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history", "官方文档", "C# 2/3/6/8 变化"),
  source("swift-release-notes", "Swift 3.0 Released!", "Swift.org", "https://www.swift.org/blog/swift-3.0-released/", "发布说明", "2016-09-13 Swift 3.0 发布与源码兼容性"),
  source("kotlin-release-notes", "Kotlin Releases", "JetBrains", "https://kotlinlang.org/docs/releases.html", "发布说明", "Kotlin 1.x 与 2.0 变化"),
  source("python-versions", "Python Release Versions", "Python 官方社区", "https://www.python.org/doc/versions/", "版本列表", "Python 2.0/3.0/3.11 发布时间"),
  source("swift5-exact-release", "Swift 5 Released!", "Swift.org", "https://www.swift.org/blog/swift-5-released/", "发布说明", "2019-03-25，Apple 平台 ABI 稳定"),
  ...evolutionSources,
];

const duration = (start: number, end: number): TimeSpan => ({
  kind: "duration",
  start: { year: start },
  end: { year: end },
});

const era = (
  id: string,
  title: string,
  start: number,
  end: number,
  summary: string,
  extra: Partial<Period> = {},
): Period => ({
  id,
  title,
  time: duration(start, end),
  entityIds: [],
  sourceIds: ["ibm-fortran"],
  summary,
  coverage: "selected",
  ...extra,
});

export const periods: Period[] = [
  era("early-high-level", "早期高级语言", 1957, 1960, "编译器开始把科学计算和商业数据处理的描述推向更高抽象层。", {
    sourceIds: ["ibm-fortran", "codasyl-cobol"],
  }),
  era("structured-languages", "结构化与范式分化", 1960, 1979, "ALGOL 系语法、Lisp 语法树、逻辑编程、面向对象和系统语言分别成形。", {
    sourceIds: ["acm-algol60", "acm-simula", "bell-c"],
  }),
  era("desktop-scripting", "桌面、面向对象与脚本化", 1980, 1994, "个人计算机扩散，语言设计开始服务快速开发、图形界面和教学场景。", {
    sourceIds: ["cpp-history", "perl-release", "haskell-report"],
  }),
  era("web-platform", "Web 与托管平台", 1995, 2009, "浏览器、服务器端脚本和虚拟机把语言选择与平台生态紧密连接。", {
    sourceIds: ["netscape-javascript", "oracle-java", "go-open-source"],
  }),
  era("modern-safety", "现代安全与性能", 2010, 2026, "类型系统、并发模型、内存安全、数值计算和 AI 工作负载成为语言设计主线。", {
    sourceIds: ["rust-history", "typescript-release", "modular-mojo"],
  }),
];

const entity = (id: string, name: string, sourceId: string): Entity => ({
  id,
  name,
  type: "编程语言",
  sourceIds: [sourceId],
});

export const entities: Entity[] = [
  entity("fortran", "FORTRAN", "ibm-fortran"),
  entity("lisp", "Lisp", "acm-lisp"),
  entity("cobol", "COBOL", "codasyl-cobol"),
  entity("algol60", "ALGOL 60", "acm-algol60"),
  entity("basic", "BASIC", "dartmouth-basic"),
  entity("simula67", "Simula 67", "acm-simula"),
  entity("pascal", "Pascal", "eth-pascal"),
  entity("c", "C", "bell-c"),
  entity("prolog", "Prolog", "prolog-history"),
  entity("smalltalk", "Smalltalk", "smalltalk-manual"),
  entity("scheme", "Scheme", "mit-scheme"),
  entity("ada83", "Ada 83", "ada-standard"),
  entity("cpp", "C++", "cpp-history"),
  entity("objective-c", "Objective-C", "apple-objc"),
  entity("erlang", "Erlang", "erlang-history"),
  entity("perl", "Perl", "perl-release"),
  entity("haskell", "Haskell", "haskell-report"),
  entity("python", "Python", "python-history"),
  entity("java", "Java", "oracle-java"),
  entity("javascript", "JavaScript", "netscape-javascript"),
  entity("php", "PHP", "php-history"),
  entity("ruby", "Ruby", "ruby-history"),
  entity("ecmascript", "ECMAScript", "ecma-javascript"),
  entity("csharp", "C#", "microsoft-csharp"),
  entity("scala", "Scala", "scala-release"),
  entity("clojure", "Clojure", "clojure-release"),
  entity("go", "Go", "go-open-source"),
  entity("rust", "Rust", "rust-history"),
  entity("typescript", "TypeScript", "typescript-release"),
  entity("julia", "Julia", "julia-paper"),
  entity("swift", "Swift", "apple-swift"),
  entity("kotlin", "Kotlin", "kotlin-release"),
  entity("elixir", "Elixir", "elixir-release"),
  entity("carbon", "Carbon", "carbon-release"),
  entity("mojo", "Mojo", "modular-mojo"),
];

const change = (
  baseline: string,
  improvements: string[],
  tradeoffs: string,
  sourceIds: string[],
): NonNullable<TimelineEvent["change"]> => ({
  baseline,
  improvements,
  tradeoffs,
  evidence: "依据官方发布说明或标准文档",
  sourceIds,
});

const event = (
  id: string,
  title: string,
  year: number,
  category: string,
  periodIds: string[],
  entityIds: string[],
  summary: string,
  sourceIds: string[],
  extra: Partial<TimelineEvent> = {},
): TimelineEvent => ({
  id,
  title,
  time: { kind: "point", start: { year } },
  category,
  periodIds,
  entityIds,
  summary,
  significance: "这个节点帮助解释编程语言从机器细节走向更高抽象层的连续过程。",
  sourceIds,
  tags: [],
  milestone: true,
  ...extra,
});

export const events: TimelineEvent[] = [
  event("fortran-i", "FORTRAN I 交付", 1957, "implementation", ["early-high-level"], ["fortran"], "IBM 为 IBM 704 开发的 FORTRAN 编译器交付，科学计算程序可以用接近数学表达的方式书写。", ["ibm-fortran"], {
    significance: "它证明了高级语言经优化编译后可以在当时的机器上达到可接受的效率，改变了编程工作的抽象层级。",
    tags: ["编译器", "科学计算", "IBM"],
    facts: [{ label: "核心问题", text: "让公式计算不必手写机器指令", sourceIds: ["ibm-fortran"] }],
  }),
  event("lisp-paper", "Lisp 论文发表", 1960, "paradigm", ["structured-languages"], ["lisp"], "McCarthy 发表 Lisp 论文，用 S 表达式表示程序和数据。", ["acm-lisp"], {
    significance: "代码与数据共用符号表达式，使 Lisp 成为人工智能研究、语言实验和动态语言设计的重要源头。",
    tags: ["S 表达式", "递归", "函数式"],
    facts: [{ label: "代表思想", text: "程序可以作为数据被处理", sourceIds: ["acm-lisp"] }],
  }),
  event("cobol-initial-spec", "COBOL 初始规格发布", 1960, "standard", ["early-high-level", "structured-languages"], ["cobol"], "CODASYL 发布面向商业数据处理的 COBOL 初始规格，项目发起点在 1959 年。", ["codasyl-cobol"], {
    significance: "商业数据处理获得了接近英语的通用语言，可移植程序和厂商共同标准开始改变行业协作方式。",
    tags: ["商业计算", "可移植性", "规格"],
    note: "事件按 1960 年报告发布记年；1959 年是任务发起与设计过程，不是这份报告的出版年份。",
  }),
  event("algol60-report", "ALGOL 60 报告发布", 1960, "paradigm", ["structured-languages"], ["algol60"], "国际委员会发布 ALGOL 60 报告，定义块结构、词法作用域和递归过程等语言要素。", ["acm-algol60"], {
    significance: "ALGOL 60 的语法和作用域思想影响了 Pascal、C、Ada 以及此后大量命令式语言。",
    tags: ["块结构", "作用域", "语法"],
  }),
  event("basic-first-run", "BASIC 首次运行", 1964, "release", ["structured-languages"], ["basic"], "达特茅斯学院的分时系统上运行第一批 BASIC 程序，语言面向非专业学生设计。", ["dartmouth-basic"], {
    time: { kind: "point", start: { year: 1964, month: 5, day: 1 } },
    significance: "分时系统加上易学语言，让普通学生可以直接使用计算机，也铺垫了后来个人计算机的 BASIC 文化。",
    tags: ["教育", "分时系统"],
  }),
  event("simula67", "Simula 67 成形", 1967, "paradigm", ["structured-languages"], ["simula67"], "Dahl 与 Nygaard 的 Simula 67 引入类、对象和继承概念。", ["acm-simula"], {
    significance: "面向对象程序设计的核心词汇先在仿真语言中出现，再进入 Smalltalk、C++ 和 Java 等后续语言。",
    tags: ["类", "继承", "仿真"],
  }),
  event("pascal-report", "Pascal 报告发布", 1970, "release", ["structured-languages"], ["pascal"], "Wirth 发布 Pascal 报告，强调结构化编程、明确类型和适合教学的简洁设计。", ["eth-pascal"], {
    significance: "Pascal 在大学和早期个人计算机中长期用于教学，也推动了强类型语言的普及。",
    tags: ["结构化编程", "类型", "教学"],
  }),
  event("c-creative-year", "C 语言成形", 1972, "implementation", ["structured-languages"], ["c"], "Ritchie 在改造 B 和重写 UNIX 的过程中形成 C 语言；1972 年是其最有创造性的年份。", ["bell-c"], {
    significance: "C 把可移植系统编程和贴近机器的控制结合起来，成为操作系统、运行库和后续语言实现的基础。",
    tags: ["系统编程", "UNIX", "可移植"],
    note: "C 的形成覆盖 1969—1973 年；此处按作者回顾中的 1972 年作为时间节点。",
  }),
  event("prolog-interpreter", "第一个 Prolog 解释器", 1972, "paradigm", ["structured-languages"], ["prolog"], "Marseille 团队在 1972 年秋实现第一个 Prolog 解释器，以逻辑关系和合一求解程序目标。", ["prolog-history"], {
    significance: "Prolog 把逻辑编程推向可运行系统，为规则推理、自然语言处理和符号计算提供了另一条语言路线。",
    tags: ["逻辑编程", "合一", "推理"],
  }),
  event("smalltalk72", "Smalltalk-72 设计", 1972, "paradigm", ["structured-languages"], ["smalltalk"], "Xerox PARC 的学习研究组设计 Smalltalk-72，儿童在同年晚些时候首次使用。", ["smalltalk-manual"], {
    significance: "Smalltalk 把对象、消息传递和图形界面环境结合，塑造了面向对象语言与人机交互的原型。",
    tags: ["消息传递", "图形界面", "Dynabook"],
  }),
  event("scheme-report", "Scheme 方言与报告体系", 1975, "paradigm", ["structured-languages"], ["scheme"], "Scheme 作为 Lisp 方言出现，此后以系列报告保持小核心与词法作用域设计。", ["mit-scheme"], {
    significance: "Scheme 影响了教育、语言研究和 JavaScript 等语言中的作用域与函数设计。",
    tags: ["Lisp", "词法作用域", "小核心"],
    note: "首版 Scheme 在 1975 年出现；本条资料指向现行报告体系，用于追溯设计原则。",
  }),
  event("ada83-standard", "Ada 83 标准化", 1983, "standard", ["desktop-scripting"], ["ada83"], "Ada 83 成为 ANSI 与军用标准，为大型嵌入式和长期维护系统提供强类型与模块化设计。", ["ada-standard"], {
    significance: "Ada 代表语言设计与采购标准、可靠软件工程约束的结合。",
    tags: ["嵌入式", "可靠性", "标准"],
  }),
  event("cpp-release", "C++ 商业发布", 1985, "release", ["desktop-scripting"], ["cpp"], "Cfront 实现 C++ 的第一个商业版本，兼容 C 工具链并引入类、构造函数等抽象机制。", ["cpp-history"], {
    significance: "C++ 让系统程序员能以较小迁移成本获得抽象能力，长期主导性能敏感型软件。",
    tags: ["面向对象", "系统编程", "Cfront"],
    note: "C with Classes 始于 1979 年；本条采用 1985 年商业发布节点。",
  }),
  event("objective-c", "Objective-C 进入 NeXT 平台路线", 1986, "paradigm", ["desktop-scripting"], ["objective-c"], "1986 年 Steve Naroff 加入 Stepstone，NeXT 成为 Objective-C 的重要客户；语言把 Smalltalk 风格消息传递与 C 兼容性结合。", ["objc-history", "apple-objc"], {
    significance: "它展示了动态面向对象层与 C 运行时结合的可行路线，也影响移动应用开发工具链。",
    tags: ["Objective-C", "消息传递", "Apple"],
    note: "1986 年标记 Naroff 加入与 NeXT 客户关系，不是 Objective-C 的诞生年。作者历史回顾把语言根源追溯到 1980 年代初；Apple 文档仅用于核对语言模型。",
  }),
  event("erlang-concurrency", "Erlang 面向并发系统", 1986, "paradigm", ["desktop-scripting"], ["erlang"], "Ericsson 实验室为电信系统开发 Erlang，以进程、消息传递和容错为核心。", ["erlang-history"], {
    significance: "Erlang 的 Actor 式并发和“让它崩溃”容错思想，后来影响分布式服务和多个并发语言。",
    tags: ["并发", "容错", "电信"],
  }),
  event("perl-1", "Perl 1 发布", 1987, "release", ["desktop-scripting"], ["perl"], "Larry Wall 发布 Perl 1，用脚本语言处理文本、报表和系统管理任务。", ["perl-release"], {
    significance: "Perl 在早期 Web 和系统运维中广泛使用，也代表了脚本语言的实用主义路线。",
    tags: ["脚本", "文本处理", "CGI"],
  }),
  event("haskell-1", "Haskell 1.0 报告", 1990, "paradigm", ["desktop-scripting"], ["haskell"], "Haskell 委员会发布 Haskell 1.0 报告，统一非严格函数式语言的语法与语义基础。", ["haskell-report"], {
    significance: "Haskell 成为惰性求值、纯函数和类型系统研究的重要公共平台。",
    tags: ["函数式", "惰性求值", "类型系统"],
  }),
  event("python-public", "Python 首次公开发布", 1991, "release", ["desktop-scripting"], ["python"], "van Rossum 公开发布 Python 解释器，强调清晰语法、模块和脚本效率。", ["python-history"], {
    significance: "Python 逐步成为教学、脚本、科学计算和数据处理的重要通用语言。",
    tags: ["可读性", "解释器", "通用脚本"],
  }),
  event("java-public", "Java 公开发布", 1995, "release", ["web-platform"], ["java"], "Sun 公开展示 Java，以虚拟机、垃圾回收和跨平台类库为核心卖点。", ["oracle-java"], {
    significance: "Java 让“编译到托管运行时”的模型进入主流，深刻影响企业服务与后来的托管语言设计。",
    tags: ["虚拟机", "垃圾回收", "跨平台"],
    note: "本条采用 1995 年公开发布节点；JDK 1.0 的正式可用时间另行整理。",
  }),
  event("javascript-netscape", "JavaScript 随 Netscape 发布", 1995, "release", ["web-platform"], ["javascript"], "Netscape 与 Sun 公布 JavaScript，浏览器脚本语言开始进入 Web 开发。", ["netscape-javascript"], {
    time: { kind: "point", start: { year: 1995, month: 12, day: 4 } },
    significance: "浏览器成为新的语言运行环境，JavaScript 之后发展为 Web、服务端和跨平台开发的基础。",
    tags: ["浏览器", "动态语言", "Web"],
  }),
  event("php-fi", "PHP/FI 公开使用", 1995, "release", ["web-platform"], ["php"], "Rasmus Lerdorf 把 PHP/FI 公开给外部开发者，用于构建动态网页。", ["php-history"], {
    significance: "PHP 把模板、表单处理和数据库访问带进 Web 开发，塑造了大量早期动态网站。",
    tags: ["服务器端", "模板", "Web"],
  }),
  event("ruby-095", "Ruby 0.95 发布", 1995, "release", ["web-platform"], ["ruby"], "Matz 发布 Ruby 0.95，融合脚本效率、面向对象和程序员愉悦感。", ["ruby-history"], {
    significance: "Ruby 的面向对象模型和后来的 Rails 生态共同推动敏捷 Web 开发浪潮。",
    tags: ["面向对象", "脚本", "Rails"],
  }),
  event("ecmascript-v1", "ECMAScript 第一版标准", 1997, "standard", ["web-platform"], ["ecmascript", "javascript"], "Ecma International 发布 ECMA-262 第一版，为 JavaScript 建立开放标准。", ["ecma-javascript"], {
    significance: "标准化让不同浏览器和运行时能以同一语义基础实现 JavaScript，是 Web 兼容性的关键制度。",
    tags: ["标准化", "浏览器兼容", "ECMA-262"],
  }),
  event("csharp-announced", "C# 公布", 2000, "release", ["web-platform"], ["csharp"], "Microsoft 公布 C#，语言与 .NET 运行时和类库一起面向企业应用与 Web 服务。", ["microsoft-csharp"], {
    significance: "C# 把托管运行时、强类型面向对象和平台工具链组合成主流企业开发方案。",
    tags: ["托管平台", "企业开发", ".NET"],
    note: "2000 年为公布节点；C# 1.0 随 Visual Studio .NET 在 2002 年正式发布。",
  }),
  event("scala-release", "Scala 发布", 2004, "release", ["web-platform"], ["scala"], "Scala 发布，把面向对象与函数式编程放在 JVM 上。", ["scala-release"], {
    significance: "Scala 展示了静态类型语言在托管平台上融合范式的能力，并推动大数据处理生态。",
    tags: ["JVM", "函数式", "类型推断"],
  }),
  event("clojure-release", "Clojure 发布", 2007, "release", ["web-platform"], ["clojure"], "Rich Hickey 发布 Clojure，把 Lisp 程序设计带到 JVM。", ["clojure-release"], {
    significance: "Clojure 推动不可变数据、函数式编程和宿主平台互操作重新进入生产系统讨论。",
    tags: ["Lisp", "JVM", "不可变性"],
  }),
  event("go-open-source", "Go 语言开源", 2009, "release", ["web-platform"], ["go"], "Google 公布 Go 语言，聚焦编译速度、并发原语和大规模网络服务。", ["go-open-source"], {
    time: { kind: "point", start: { year: 2009, month: 11, day: 10 } },
    significance: "Go 把轻量并发、静态链接和工程化工具链作为语言设计目标，服务云基础设施场景。",
    tags: ["并发", "网络服务", "工程工具"],
  }),
  event("rust-prealpha", "Rust 早期设计公开介绍", 2010, "release", ["modern-safety"], ["rust"], "Graydon Hoare 在 Mozilla 年度峰会上介绍 Rust，提出面向安全、并发系统程序的设计与早期实现。", ["rust-history"], {
    significance: "编辑分析：这一公开介绍呈现了 Rust 的安全与系统编程目标；其后语言机制经历多轮重构，不能把成熟版本的借用检查器倒推到 2010 年。",
    time: { kind: "point", start: { year: 2010, month: 7 } },
    note: "原始演讲仍描述 typestate、任务级垃圾回收和早期编译器；这是设计介绍，不是稳定版本发布。",
    tags: ["早期设计", "内存安全", "系统编程"],
  }),
  event("typescript-08", "TypeScript 0.8 发布", 2012, "release", ["modern-safety"], ["typescript"], "Microsoft 发布 TypeScript 0.8，为 JavaScript 增加可选静态类型和工具化能力。", ["typescript-release"], {
    significance: "可选类型层让大型 JavaScript 工程获得编辑器支持与渐进迁移路径，改变了前端工程形态。",
    tags: ["渐进类型", "JavaScript", "工具链"],
  }),
  // Keep the legacy event ID so previously shared links continue to resolve.
  event("julia-paper", "Julia 首次公开发布", 2012, "release", ["modern-safety"], ["julia"], "Julia 创始团队公开介绍语言，提出把动态语言的易用性与数值计算性能结合的目标。", ["julia-initial-release", "julia-paper"], {
    time: { kind: "point", start: { year: 2012, month: 2, day: 14 } },
    significance: "Julia 把多重派发、科学计算生态和即时编译结合，服务数值密集型研究工作流。",
    tags: ["数值计算", "多重派发", "即时编译"],
    note: "2012 年是首次公开发布，不是 Julia 1.0，也不是所引 SIAM Review 论文的出版年；该论文于 2017-02-07 在线发表，仅作后续设计说明。",
    details: [{ label: "先公开语言，再形成后续论文", text: "初次发布文章明确提出尚未完成的语言需要更多使用者参与；官方脚注也澄清这不是 1.0 发布。", sourceIds: ["julia-initial-release"], locator: "末段 initial release；脚注 1" }],
  }),
  event("swift-announced", "Swift 公布与开发者预览", 2014, "release", ["modern-safety"], ["swift"], "Apple 在 WWDC 公布 Swift，并随开发者 SDK 提供预览，支持与 Objective-C 代码共存。", ["apple-swift"], {
    significance: "Swift 展示了现代类型安全、值语义和开发者体验在移动与系统平台中的组合。",
    tags: ["Apple", "类型安全", "移动开发"],
    time: { kind: "point", start: { year: 2014, month: 6, day: 2 } },
    note: "该节点是公布和开发者预览，不等同于 Swift 1.0 正式发布。",
  }),
  event("kotlin-10", "Kotlin 1.0 发布", 2016, "release", ["modern-safety"], ["kotlin"], "JetBrains 发布 Kotlin 1.0，提供 JVM 上更现代的语法、空安全与工具体验。", ["kotlin-release"], {
    significance: "Kotlin 后来成为 Android 官方支持语言，说明宿主平台能显著改变语言扩散路径。",
    tags: ["JVM", "空安全", "Android"],
  }),
  event("elixir-release", "Elixir 0.5 发布", 2012, "release", ["modern-safety"], ["elixir"], "José Valim 发布重写后的 Elixir 0.5，在 Erlang 虚拟机上构建现代语法与生产力工具。", ["elixir-release"], {
    significance: "Elixir 把 Erlang 的并发与容错能力带入 Web 和实时系统开发，延续 Actor 模型路线。",
    tags: ["BEAM", "并发", "实时系统"],
    time: { kind: "point", start: { year: 2012, month: 5, day: 25 } },
    note: "这是重写后的 0.5 版本发布；作者回顾记载 2011 年已有 0.3 原型，不能把 2012 年视为全部开发工作的起点。",
  }),
  event("carbon-experiment", "Carbon 实验项目公开", 2022, "release", ["modern-safety"], ["carbon"], "Google 相关团队公开 Carbon 实验语言，探索 C++ 的渐进迁移与互操作路线。", ["carbon-release"], {
    significance: "Carbon 说明现代语言不仅要提出安全模型，还必须回应既有 C++ 资产迁移成本。",
    tags: ["实验语言", "互操作", "迁移"],
    milestone: false,
  }),
  event("mojo-release", "Mojo 面向 AI 工作负载", 2023, "release", ["modern-safety"], ["mojo"], "Modular 公布 Mojo，尝试把 Python 生态与底层硬件性能控制连接起来。", ["modular-mojo"], {
    significance: "Mojo 代表 AI 编译栈对语言语法、硬件抽象和 Python 兼容性的重新组合。",
    tags: ["AI", "性能", "Python 生态"],
    time: { kind: "point", start: { year: 2023, month: 5, day: 2 } },
    note: "当日为仍在开发中的语言与网页 Playground 预览，不是完整本地 SDK 或稳定版发布；性能数字属于厂商特定测试，不能泛化。",
    milestone: false,
  }),
  event("python-313", "Python 3.13 发布", 2024, "release", ["modern-safety"], ["python"], "Python 3.13 引入实验性 free-threaded 构建和交互式解释器改进。", ["python-313"], {
    significance: "长期以单解释器为主的 Python 开始把并行执行作为正式工程方向，说明成熟语言仍会改变核心约束。",
    tags: ["free-threading", "解释器", "并行"],
    milestone: true,
  }),
  event("cpp-11", "C++11 标准发布", 2011, "standard", ["modern-safety"], ["cpp"], "C++11 以 auto、lambda、右值引用和智能指针等特性更新现代 C++ 的表达方式。", ["cpp-standard"], {
    significance: "C++11 是从经典 C++ 转向现代资源管理与泛型编程的分界线。",
    tags: ["C++11", "lambda", "移动语义"],
    change: change("C++03 语法与手工资源管理模式", ["auto 类型推断", "lambda 表达式", "右值引用与移动语义", "标准智能指针"], "新特性增加语言复杂度，旧代码迁移需要明确编译器支持范围", ["cpp-standard"]),
  }),
  event("cpp-20", "C++20 标准发布", 2020, "standard", ["modern-safety"], ["cpp"], "C++20 引入模块、协程、概念和 ranges 等大型语言与库特性。", ["cpp-standard"], {
    significance: "C++20 继续压缩依赖宏和手写模板约束的空间，让接口约束与组合式算法更直接。",
    tags: ["C++20", "模块", "协程", "ranges"],
    change: change("C++11/17 中的头文件、模板约束和手写迭代模式", ["模块化组织代码", "concepts 约束模板参数", "协程语法", "ranges 组合算法"], "模块与协程的工具链支持长期不均衡，迁移通常分阶段进行", ["cpp-standard"]),
  }),
  event("java-5", "Java SE 5 发布", 2004, "release", ["web-platform"], ["java"], "Java SE 5 引入泛型、枚举、注解和增强 for 循环。", ["java-versions"], {
    significance: "这些特性长期构成 Java 企业开发的基本语法面，也推动注解成为框架配置的重要方式。",
    tags: ["Java 5", "泛型", "注解"],
    change: change("Java 1.4 的原始集合与显式迭代", ["泛型集合", "枚举类型", "注解", "增强 for 循环"], "泛型采用擦除实现，运行期不能直接获得泛型实参", ["java-versions"]),
  }),
  event("java-8", "Java SE 8 发布", 2014, "release", ["modern-safety"], ["java"], "Java SE 8 引入 lambda 表达式、Stream API 和新的日期时间 API。", ["java-versions"], {
    significance: "Java 从以类为中心的命令式写法转向函数式集合处理，生态迁移范围极大。",
    tags: ["Java 8", "lambda", "Stream"],
    change: change("Java 7 的匿名内部类与手写循环", ["lambda 表达式", "Stream API", "java.time 日期时间库"], "并行 Stream 的调度与语义使性能调优更依赖上下文", ["java-versions"]),
  }),
  event("java-21", "Java SE 21 LTS 发布", 2023, "release", ["modern-safety"], ["java"], "Java SE 21 作为 LTS 版本，进一步推广虚拟线程与模式匹配等能力。", ["java-versions"], {
    significance: "虚拟线程把高并发服务的线程模型从每请求一平台线程中解放出来，模式匹配继续简化数据解构。",
    tags: ["Java 21", "LTS", "虚拟线程"],
    change: change("Java 17 LTS 的平台线程与 switch 模式匹配预览", ["虚拟线程正式化", "记录模式匹配", "switch 模式匹配", "序列化集合"], "虚拟线程适合阻塞式 I/O 场景，并不能替代所有并发设计", ["java-versions"]),
  }),
  event("javascript-2015", "ECMAScript 2015 发布", 2015, "standard", ["modern-safety"], ["ecmascript", "javascript"], "ECMAScript 2015 引入 let/const、类、模块、生成器和 Promise。", ["javascript-2015"], {
    significance: "这次修订奠定了现代 JavaScript 模块化、异步和类语法的基础，也让标准进入年度节奏。",
    tags: ["ES2015", "模块", "Promise"],
    change: change("ES5 的 var、函数模块模式和回调式异步", ["块级 let/const", "class 语法", "ES Modules", "Promise", "生成器"], "模块加载和 class 底层仍需兼容既有动态语义", ["javascript-2015"]),
  }),
  event("typescript-10", "TypeScript 1.0 发布", 2014, "release", ["modern-safety"], ["typescript"], "TypeScript 1.0 提供稳定的类型系统、泛型与 Visual Studio 工具支持。", ["typescript-release-notes"], {
    significance: "0.x 预览进入可用于生产评估的稳定版本。",
    tags: ["TypeScript 1.0", "泛型"],
    change: change("TypeScript 0.8 的基础类型注解", ["正式类型系统", "泛型", "工具链集成"], "严格性选项与现代项目默认值仍随后续版本演进", ["typescript-release-notes"]),
  }),
  event("typescript-20", "TypeScript 2.0 发布", 2016, "release", ["modern-safety"], ["typescript"], "TypeScript 2.0 引入 strictNullChecks 与控制流分析相关的空安全能力。", ["typescript20-exact-release"], {
    significance: "空值检查把 TypeScript 从“可选注解”推进到可系统性消除 null/undefined 错误的工具。",
    tags: ["TypeScript 2.0", "strictNullChecks"],
    change: change("TypeScript 1.x 默认允许 null 赋给多数类型", ["strictNullChecks", "never 类型", "只读属性", "标记联合改进"], "启用严格空安全后需要显式收窄和标注边界", ["typescript20-exact-release"]),
  }),
  event("typescript-50", "TypeScript 5.0 发布", 2023, "release", ["modern-safety"], ["typescript"], "TypeScript 5.0 优化编译器实现和包体积，引入 const 类型参数和装饰器新方案。", ["typescript50-exact-release"], {
    significance: "在语言表达力继续增加的同时，工具链性能和代码规模被明确纳入版本目标。",
    tags: ["TypeScript 5.0", "性能", "装饰器"],
    change: change("TypeScript 4.x 的代码库结构与实验性装饰器", ["更快的编译与安装体验", "const 类型参数", "标准化装饰器", "bundler 模块解析"], "部分 API 被移除，复杂项目需要检查迁移清单", ["typescript50-exact-release"]),
  }),
  ...goReviewedEvents,
  event("rust-2018", "Rust 2018 edition 发布", 2018, "release", ["modern-safety"], ["rust"], "Rust 2018 随 Rust 1.31 发布，改善模块路径、非词法生命周期与迁移工具。", ["rust-editions", "rust131-release"], {
    time: { kind: "point", start: { year: 2018, month: 12, day: 6 } },
    significance: "edition 机制让 Rust 能清理语法债务，同时保持跨版本库互操作。",
    tags: ["Rust 2018", "edition"],
    note: "async / await 要到 2019 年 Rust 1.39 才稳定，不能与 Rust 2018 edition 的发布混同。",
    change: { ...change("Rust 2015 edition 的模块路径与词法借用限制", ["更直接的模块路径", "非词法生命周期（NLL）借用检查", "cargo fix 辅助 edition 迁移"], "edition 按包选择，2015 与 2018 的依赖可互用；不构成稳定 ABI 的承诺", ["rust131-release"]), baselineEventId: "rust-10" },
    details: [{ label: "兼容地改变规则", text: "官方说明不同 edition 的包可以相互依赖，新规则由各包主动选择；2018 并不意味着旧生态同时失效。", sourceIds: ["rust131-release"], locator: "Rust 2018：edition package setting and dependency interoperability" }],
  }),
  event("csharp-2", "C# 2.0 发布", 2005, "release", ["web-platform"], ["csharp"], "C# 2.0 引入泛型、可空类型与迭代器。", ["csharp-release-notes"], {
    significance: "类型安全集合和惰性枚举成为 C# 常用表达方式。",
    tags: ["C# 2.0", "泛型"],
    change: change("C# 1.x 的非泛型集合与显式枚举模式", ["泛型", "可空值类型", "yield return 迭代器", "匿名方法"], "泛型运行时实现与 Java 擦除不同，但旧集合仍需迁移", ["csharp-release-notes"]),
  }),
  event("csharp-3", "C# 3.0 发布", 2007, "release", ["web-platform"], ["csharp"], "C# 3.0 引入 LINQ、lambda、扩展方法和匿名类型。", ["csharp-release-notes"], {
    significance: "LINQ 把查询语法纳入语言，推动函数式风格进入主流 .NET 开发。",
    tags: ["C# 3.0", "LINQ"],
    change: change("C# 2.0 的显式循环与匿名方法", ["LINQ 查询表达式", "lambda", "扩展方法", "类型推断"], "查询语法对提供程序实现敏感，复杂表达式可读性需权衡", ["csharp-release-notes"]),
  }),
  event("csharp-8", "C# 8.0 发布", 2019, "release", ["modern-safety"], ["csharp"], "C# 8.0 引入可空引用类型、异步流与默认接口实现。", ["csharp-release-notes"], {
    significance: "可空引用类型把空安全从值类型扩展到对象引用，是大型存量代码的长期治理工具。",
    tags: ["C# 8.0", "可空引用类型"],
    change: change("C# 7.3 默认所有引用类型可为空", ["可空引用类型注解", "IAsyncEnumerable", "索引与范围", "默认接口实现"], "注解式空安全需要项目、库与调用方逐步协调", ["csharp-release-notes"]),
  }),
  event("swift-3", "Swift 3 发布", 2016, "release", ["modern-safety"], ["swift"], "Swift 3 完成 API 命名指南的系统性清理，语言进入相对稳定阶段。", ["swift-release-notes"], {
    significance: "Swift 2 到 Swift 3 的源代码破坏性变化明显，这也是语言确立公共 API 风格的重要阶段。",
    tags: ["Swift 3", "API 命名"],
    change: change("Swift 2 的旧 API 命名与跨平台核心库差异", ["Swift 3 API 命名指南", "核心库 API 清理", "移除 ++/-- 等遗留运算符"], "这是源代码不兼容版本，大量项目需要迁移", ["swift-release-notes"]),
  }),
  event("swift-5", "Swift 5 发布", 2019, "release", ["modern-safety"], ["swift"], "Swift 5 稳定 ABI，并继续推进编码指南与字符串处理。", ["swift5-exact-release"], {
    significance: "稳定 ABI 使系统组件与用户程序可共享 Swift 运行时，是 Apple 平台集成的重要基础。",
    tags: ["Swift 5", "ABI 稳定"],
    change: change("Swift 4 每个应用附带运行时与源码兼容模式", ["ABI 稳定", "标准库二进制兼容", "字符串重写与 SIMD 雏形"], "源代码兼容性与二进制兼容是不同层面的承诺", ["swift5-exact-release"]),
  }),
  event("swift-6", "Swift 6 发布", 2024, "release", ["modern-safety"], ["swift"], "Swift 6 提供可选择启用的语言模式，把潜在数据竞争诊断提升为编译错误。", ["swift6-release"], {
    time: { kind: "point", start: { year: 2024, month: 9, day: 17 } },
    significance: "并发模型从库和开发者约定进一步转向编译期隔离检查。",
    tags: ["Swift 6", "并发", "数据竞争安全"],
    note: "Swift 6 工具链与 Swift 6 语言模式不是一回事；升级编译器不等于所有旧项目自动开启新模式。",
    change: change("Swift 5.10 可通过完整严格并发选项获得的警告", ["Swift 6 语言模式将潜在数据竞争作为错误", "typed throws 指定抛出错误类型", "非可复制类型扩展到泛型系统"], "新语言模式需要主动选择；存量代码仍需整理 actor、Sendable 和跨隔离域边界", ["swift6-release"]),
    details: [{ label: "安全检查的启用边界", text: "官方将这一能力称为 opt-in language mode：原先在 Swift 5.10 可作为警告启用的检查，在新模式中成为编译错误。", sourceIds: ["swift6-release"], locator: "Language and Standard Library → Concurrency" }],
  }),
  event("kotlin-2", "Kotlin 2.0 发布", 2024, "release", ["modern-safety"], ["kotlin"], "Kotlin 2.0 引入 K2 编译器并保持语言源码兼容。", ["kotlin-release-notes"], {
    significance: "编译器基础设施重写为后续语言与工具性能演进提供基础。",
    tags: ["Kotlin 2.0", "K2"],
    change: change("Kotlin 1.x 旧编译器前端", ["K2 编译器", "编译速度与诊断改进", "智能类型转换增强"], "第三方编译器插件生态需要适配新前端", ["kotlin-release-notes"]),
  }),
  event("python-2", "Python 2.0 发布", 2000, "release", ["web-platform"], ["python"], "Python 2.0 引入列表推导和垃圾回收等基础能力。", ["python-versions"], {
    significance: "Python 2 系长期主导 2000 年代脚本与 Web 开发，也为后来的迁移难题埋下伏笔。",
    tags: ["Python 2", "列表推导"],
    change: change("Python 1.x 的类型与内存模型", ["列表推导", "引用计数加垃圾回收", "增强赋值"], "Unicode 支持尚不完整，Python 2 与 3 的长期并存需要项目明确兼容策略", ["python-versions"]),
  }),
  ...pythonReviewedEvents,
  ...rustReviewedEvents,
  ...evolutionEvents,
];

// 2026-10-26 逐句引用复核：日期、版本能力与兼容边界分别取证。
const deepAuditSources: Source[] = [
  {
    "id": "java5-exact-features",
    "title": "New Features and Enhancements — J2SE 5.0",
    "url": "https://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html",
    "publisher": "Sun Microsystems / Oracle",
    "locator": "Java Language Features：泛型、增强 for、枚举与注解；非发布日期证据",
    "type": "官方文档",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "java5-jsr-final",
    "title": "JSR 176: J2SE 5.0 (Tiger) Release Contents",
    "url": "https://jcp.org/en/jsr/detail?id=176",
    "publisher": "Java Community Process",
    "locator": "Stage timeline：Final Release 2004-09-30；区分规格定稿与预览",
    "type": "官方文档",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "java8-exact-features",
    "title": "What's New in JDK 8",
    "url": "https://www.oracle.com/java/technologies/javase/8-whats-new.html",
    "publisher": "Oracle",
    "locator": "Java Programming Language、Collections、Date-Time Package",
    "type": "官方文档",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "java21-exact-features",
    "title": "JDK 21 Release Notes",
    "url": "https://www.oracle.com/java/technologies/javase/21-relnote-issues.html",
    "publisher": "Oracle",
    "locator": "2023-09-19；Major New Functionality：record patterns、switch patterns、virtual threads、Sequenced Collections",
    "type": "官方文档",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "kotlin20-exact-features",
    "title": "What's new in Kotlin 2.0.0",
    "url": "https://kotlinlang.org/docs/whatsnew20.html",
    "publisher": "JetBrains",
    "locator": "2024-05-21；默认稳定 K2 与 Smart cast improvements",
    "type": "官方文档",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "kotlin20-compatibility",
    "title": "Compatibility guide for Kotlin 2.0.x",
    "url": "https://kotlinlang.org/docs/compatibility-guide-20.html",
    "publisher": "JetBrains",
    "locator": "Language：源码与行为不兼容变更；非无条件源码兼容承诺",
    "type": "官方文档",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "python20-exact-features",
    "title": "What's New in Python 2.0",
    "url": "https://docs.python.org/3/whatsnew/2.0.html",
    "publisher": "Python 官方文档 · A. M. Kuchling、Moshe Zadka",
    "locator": "Introduction：2000-10-16；List Comprehensions、Augmented Assignment、Garbage Collection of Cycles",
    "type": "官方文档",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "cpp11-designer-faq",
    "title": "C++11 — the new ISO C++ standard",
    "url": "https://www.stroustrup.com/C++11FAQ.html",
    "publisher": "Bjarne Stroustrup",
    "locator": "2011 标准；auto、lambda、rvalue references、smart pointers 专节",
    "type": "设计者回顾",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "cpp20-iso-record",
    "title": "ISO/IEC 14882:2020 — Programming languages — C++",
    "url": "https://www.iso.org/standard/79358.html",
    "publisher": "ISO",
    "locator": "2020-12 出版记录；不是浏览器或编译器实现完成日期",
    "type": "官方文档",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "cpp20-designer-history",
    "title": "Thriving in a Crowded and Changing World: C++ 2006–2020",
    "url": "https://www.stroustrup.com/hopl20main-p5-p-bfc9cd4--final.pdf",
    "publisher": "Bjarne Stroustrup · HOPL 2020",
    "locator": "§9.3 C++20 Features；2020 年 6 月发表，当时最终 ISO 出版仍是计划，实际出版另据 ISO 档案",
    "type": "设计者回顾",
    "checkedAt": "2026-10-26"
  },
  {
    "id": "typescript09-generics",
    "title": "Announcing TypeScript 0.9",
    "url": "https://devblogs.microsoft.com/typescript/announcing-typescript-0-9/",
    "publisher": "Microsoft · Jonathan Turner",
    "locator": "2013-06-18；Generics，避免把泛型首次加入误记为 1.0",
    "type": "官方文档",
    "checkedAt": "2026-10-26"
  }
];
sources.push(...deepAuditSources);
const deepAuditPatches: Record<string, Partial<TimelineEvent>> = {
  "php-fi": {
    "title": "PHP Tools 源代码公开",
    "time": {
      "kind": "point",
      "start": {
        "year": 1995,
        "month": 6
      }
    },
    "summary": "Rasmus Lerdorf 于 1995 年 6 月公开 PHP Tools 源代码，允许外部开发者使用、修复和改进这组动态网页工具。",
    "note": "1995 年 9 月为 FI，10 月为 Personal Home Page Construction Kit；PHP/FI 合名始于 1996 年 4 月，不能把这些阶段合并成一次发布。"
  },
  "java-5": {
    "title": "J2SE 5.0 发布",
    "sourceIds": [
      "java5-jsr-final",
      "java5-exact-features"
    ]
  },
  "java-8": {
    "sourceIds": [
      "java-versions",
      "java8-exact-features"
    ]
  },
  "java-21": {
    "sourceIds": [
      "java-versions",
      "java21-exact-features"
    ]
  },
  "kotlin-2": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2024,
        "month": 5,
        "day": 21
      }
    },
    "summary": "Kotlin 2.0 默认启用稳定的 K2 编译器，扩展智能类型转换；迁移仍包含源码与行为不兼容变更。",
    "sourceIds": [
      "kotlin-release-notes",
      "kotlin20-exact-features",
      "kotlin20-compatibility"
    ]
  },
  "python-2": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2000,
        "month": 10,
        "day": 16
      }
    },
    "summary": "Python 2.0 引入列表推导、增强赋值，并在 CPython 已有引用计数之外增加循环引用垃圾回收。",
    "sourceIds": [
      "python-versions",
      "python20-exact-features"
    ],
    "note": "引用计数早已存在；本次新增的是不可达引用环的回收机制。Python 1.6 已有 Unicode 支持，不把 Unicode 起点或 Python 3 的迁移时间提前合并。"
  },
  "python-313": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2024,
        "month": 10,
        "day": 7
      }
    },
    "significance": "编辑解读：实验性无 GIL 构建提供了探索 CPython 多线程并行的新路径，但不意味着此前没有多进程或其他并行方案。"
  },
  "cpp-11": {
    "sourceIds": [
      "cpp11-designer-faq"
    ]
  },
  "cpp-20": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2020,
        "month": 12
      }
    },
    "sourceIds": [
      "cpp20-iso-record",
      "cpp20-designer-history"
    ]
  },
  "swift-3": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2016,
        "month": 9,
        "day": 13
      }
    },
    "summary": "Swift 3 将 API 设计指南用于标准库并清理语言语法；它是与 Swift 2.2、2.3 源码不兼容的正式版本。"
  },
  "swift-5": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2019,
        "month": 3,
        "day": 25
      }
    },
    "summary": "Swift 5 在 Apple 平台声明 ABI 稳定，并以 UTF-8 重写 String、加入 Result 与 SIMD 向量类型。",
    "note": "ABI 稳定的发布承诺明确限于 Apple 平台，不能无条件推广到所有平台；源码兼容与二进制兼容也不是同一件事。"
  },
  "typescript-10": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2014,
        "month": 4,
        "day": 2
      }
    },
    "sourceIds": [
      "typescript-release-notes",
      "typescript09-generics"
    ],
    "note": "泛型在 2013-06-18 的 TypeScript 0.9 已加入，不是 1.0 首次引入；此处与 0.8 比较的是阶段演进。"
  },
  "typescript-20": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2016,
        "month": 9,
        "day": 22
      }
    },
    "significance": "编辑解读：启用严格空值检查能提前发现许多 null／undefined 使用错误，但类型断言、any 与外部数据等边界仍需运行时验证。"
  },
  "typescript-50": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2023,
        "month": 3,
        "day": 16
      }
    },
    "note": "装饰器实现对齐当时新的 ECMAScript 提案，不等于 2023 年已写入正式 ECMAScript 标准。"
  }
};
for (const entry of events) {
  Object.assign(entry, deepAuditPatches[entry.id] ?? {});
  if (deepAuditPatches[entry.id]?.sourceIds && entry.change) entry.change.sourceIds = [...entry.sourceIds];
}
const deepEvent = (id: string) => events.find(entry => entry.id === id)!;
deepEvent("java-21").change!.improvements[3] = "有序集合接口（Sequenced Collections）";
deepEvent("java-5").change!.tradeoffs = "泛型在编译期检查类型；存量原始类型集合仍需逐步迁移。";
deepEvent("kotlin-2").change!.tradeoffs = "K2 迁移包含源码与行为不兼容项；编译器插件也需检查适配情况。";
deepEvent("python-2").change!.improvements[1] = "在引用计数之外增加循环引用回收";
deepEvent("python-2").change!.tradeoffs = "循环检测增加开销；Python 1.6 已有 Unicode，不能把这次发布说成首次文本国际化。";
deepEvent("cpp-11").change!.baseline = "C++03 的语法与标准库（当时已有 RAII、模板和 auto_ptr）";
deepEvent("swift-5").change!.improvements = ["Apple 平台 ABI 稳定", "Apple 平台 Swift 运行时进入系统", "UTF-8 String、Result 与 SIMD 向量类型"];
deepEvent("swift-5").change!.baseline = "Swift 4 的 Apple 平台应用运行时随包分发与源码兼容模式";
deepEvent("typescript-50").change!.improvements[2] = "对齐新装饰器提案的实现";
for (const id of ["acm-lisp", "acm-algol60", "php-history", "java-versions", "kotlin-release-notes", "python-313", "swift-release-notes", "swift5-exact-release", "typescript-release-notes", "typescript20-exact-release", "typescript50-exact-release"]) {
  const entry = sources.find(item => item.id === id);
  if (entry) entry.checkedAt = "2026-10-26";
}

sources.push({ id: "erlang-compiler-history", title: "A Brief History of the BEAM Compiler", publisher: "Erlang/OTP · Björn Gustavsson", url: "https://beta.erlang.org/blog/beam-compiler-history/", type: "实现者回顾", checkedAt: "2026-10-26", publishedAt: "2018-06-18", locator: "The Prolog interpreter：1986 年实验实现；JAM 与 OTP 为后续阶段" });
Object.assign(deepEvent("java-public"), { summary: "Sun Microsystems 于 1995 年首次公开发布 Java 编程语言与计算平台。", significance: "编辑解读：应把语言公开、JDK 1.0 正式可用与后来虚拟机生态的扩展分别观察，不能由一份现行产品说明倒推出早期版本的全部能力。" });
Object.assign(deepEvent("javascript-netscape"), { title: "JavaScript 公布并提供浏览器测试版", note: "1995-12-04 的 Netscape／Sun 公告说明 JavaScript 已在 Navigator 2.0 测试版中提供；不是 Navigator 2.0 正式版发布日期。" });
deepEvent("smalltalk72").summary = "Xerox PARC 的学习研究组于 1972 年夏设计 Smalltalk-72，同年晚秋首次与用户交互；手册并未确认首次用户是儿童。";
deepEvent("scheme-report").note = "1975 年 AIM-349 是本条所引原始报告，不是现行 Scheme 规范；后来版本的细节不能倒填到这个初始报告。";
Object.assign(deepEvent("erlang-concurrency"), { title: "Erlang 早期实验实现", summary: "Erlang 的首个实验版本于 1986 年用 Prolog 实现，用来快速检验和调整语言特性；后续 JAM 与 OTP 工程化是不同阶段。", sourceIds: ["erlang-compiler-history", "erlang-history"], note: "1986 年指早期 Prolog 实验实现，不是成熟 BEAM 虚拟机或 OTP 的正式发布；OTP 首版另在 1996 年。" });
deepEvent("go-111").details![2].text = "模块支持让开发者可以在 GOPATH 之外工作；js/wasm 编译产物包含 Go 运行时，并通过实验性的 syscall/js 与 JavaScript 交互。新目标不是对现有服务端程序的浏览器兼容承诺。";
deepEvent("go-111").change!.improvements[1] = "GOPATH 之外的模块工作流";
deepEvent("c99-standard").details![0].text = "前言明确这版替代经修订与勘误的 ISO C90，并逐项列出新增能力和移除的旧式隐式规则。";
for (const entry of periods) entry.summary = "编辑分期：" + entry.summary;
for (const id of ["oracle-java", "netscape-javascript", "smalltalk-manual", "mit-scheme"]) sources.find(entry => entry.id === id)!.checkedAt = "2026-10-26";

sources.push(...[
  {
    "id": "lisp-author-original",
    "title": "Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I",
    "publisher": "John McCarthy · Stanford University 作者存档",
    "url": "https://www-formal.stanford.edu/jmc/recursive.pdf",
    "type": "作者托管原文",
    "checkedAt": "2026-10-26",
    "locator": "1960-04；§e Representation of S-Functions by S-Expressions；脚注说明重排版存在少量记号修改，不冒称原刊排印"
  },
  {
    "id": "pascal-author-projects",
    "title": "Summary of projects by N. Wirth, 1962–1999",
    "publisher": "Niklaus Wirth · ETH Zürich",
    "url": "https://people.inf.ethz.ch/wirth/projects.html",
    "type": "设计者回顾",
    "checkedAt": "2026-10-26",
    "locator": "Pascal, 1968–1972；Pascal-P, 1972–74；当时教育使用与实现路线，不作现今排名"
  }
] as Source[]);
const boundedEarlyPatches: Record<string, Partial<TimelineEvent>> = {
  "lisp-paper": {
    "sourceIds": [
      "acm-lisp",
      "lisp-author-original"
    ],
    "significance": "编辑解读：程序与数据能用相近表示法处理，为阅读解释器和元编程提供了一个清晰入口；具体后继语言的影响关系仍须分别取证。"
  },
  "cobol-initial-spec": {
    "summary": "CODASYL 发布面向商业数据处理的 COBOL 初始规格；报告记录了 1959 年底的短期委员会稿与随后审批。"
  },
  "pascal-report": {
    "summary": "Wirth 发布 Pascal 报告；其作者回顾说明，语言设计同时考虑系统设计、清晰结构和大学教学。",
    "sourceIds": [
      "eth-pascal",
      "pascal-author-projects"
    ],
    "significance": "编辑解读：可把 Pascal 放在系统实现与教学两种要求的交叉点阅读，而不是简单归为只供初学者使用的语言。"
  },
  "scheme-report": {
    "title": "Scheme 原始报告",
    "summary": "Sussman 与 Steele 发布 1975 年 Scheme 原始报告，以类似 Lisp 的语言解释扩展 lambda 演算。",
    "significance": "编辑解读：阅读原始报告可以追问，少量核心规则如何表达复杂控制过程；不由这一份报告直接推定它对后继语言的全部影响。"
  },
  "ada83-standard": {
    "summary": "Ada 在 1983 年成为 ANSI 标准与美国军用标准 MIL-STD-1815A。"
  },
  "perl-1": {
    "summary": "Larry Wall 发布 Perl 1.000；官方 perlhist 版本记录将日期列为 1987 年 12 月 18 日。",
    "significance": "编辑解读：先用明确版本记录建立起点，再另读语法和使用场景；发布史与早期 Web 普及史不是同一组证据。"
  },
  "python-public": {
    "summary": "Guido van Rossum 于 1991 年 2 月公开发布 Python 0.9.0 解释器。"
  },
  "ruby-095": {
    "summary": "Matz 于 1995 年 12 月把 Ruby 0.95 发布到日本新闻组，探索面向对象的脚本语言。",
    "significance": "编辑解读：这里适合比较脚本语言的对象模型与使用体验；Rails 等后续生态应另按自己的发布与采纳证据讨论。"
  },
  "carbon-experiment": {
    "summary": "Carbon 项目公开实验语言，探索 C++ 的渐进迁移与互操作路线。",
    "significance": "编辑解读：实验项目的价值可以从迁移目标与实现边界观察；设计目标不能被当成已经交付的安全或兼容保证。"
  },
  "algol60-report": {
    "significance": "编辑解读：可以从报告如何组织语法与语义规则入手阅读；它与各后继语言的具体关系，需要设计者记录逐条说明。"
  },
  "simula67": {
    "significance": "编辑解读：仿真系统如何表达有状态的参与者，是理解对象组织方式的入口；后继语言是否、如何借鉴，应另据设计者记述。"
  },
  "basic-first-run": {
    "significance": "编辑解读：把易学语言与分时交互一起观察，更容易理解这个节点的教学目标；不能仅由首次运行推出后来全部个人电脑文化。"
  },
  "smalltalk72": {
    "significance": "编辑解读：应把语言设计、实际用户试用与后来图形环境的演化分开阅读，避免将整个 Smalltalk 家族的成果一次性归到 1972 年。"
  },
  "cpp-release": {
    "significance": "编辑解读：C++ 的早期路线把程序组织与系统效率放在一起权衡；其后不同领域的采用程度，不能用首个商业版本直接证明。"
  },
  "objective-c": {
    "significance": "编辑解读：这个节点适合观察语言设计与平台采用的关系；不能把 1986 年的采用直接等同于后来移动平台的全部发展。"
  },
  "erlang-concurrency": {
    "significance": "编辑解读：用可快速修改的解释器检验语言特性，与构建可部署系统是不同任务；后来的并发和容错能力需要按各阶段阅读。"
  },
  "scala-release": {
    "significance": "编辑解读：可以从静态类型约束下如何组合面向对象与函数式写法理解 Scala；大数据生态的采用与影响需要另一组具体证据。"
  },
  "clojure-release": {
    "significance": "编辑解读：语言发布、宿主平台互操作和不可变数据的设计应分别看证据，不把一个周年回顾当成所有技术细节的来源。"
  },
  "go-open-source": {
    "significance": "编辑解读：开源让外部使用者能够检验编译与并发设计；静态链接和云基础设施采用的具体历史，需要另找针对性记录。"
  },
  "kotlin-10": {
    "summary": "JetBrains 发布 Kotlin 1.0，强调 JVM／Android 开发、类型安全、工具支持及 Java 互操作。",
    "significance": "编辑解读：1.0 的发布承诺与后来 Android 平台的采纳是两个节点，不能把后来的平台支持倒推为首发时已完成。"
  },
  "csharp-announced": {
    "significance": "编辑解读：语言公布反映了工具链与平台协同设计的方向，但公布、正式产品交付和大规模采用应分别记录。"
  },
  "elixir-release": {
    "significance": "编辑解读：可以把 Elixir 与底层 Erlang 运行环境对照阅读，区分新语法、运行时能力及后来具体应用生态。"
  }
};
for (const entry of events) Object.assign(entry, boundedEarlyPatches[entry.id] ?? {});

sources.push(...[
  {
    "id": "simula-dahl-original",
    "title": "The Birth of Object Orientation: the Simula Languages",
    "url": "https://www.mn.uio.no/ifi/english/about/ole-johan-dahl/bibliography/the-birth-of-object-orientation-the-simula-languages.pdf",
    "publisher": "Ole-Johan Dahl · University of Oslo 作者档案",
    "type": "一手文档／作者说明",
    "checkedAt": "2026-10-26",
    "locator": "2001-06 回顾，§3：1967 年、class、object、subclass/prefixing；不是1967同期出版物"
  },
  {
    "id": "clojure-design-rationale",
    "title": "Rationale",
    "url": "https://clojure.org/about/rationale",
    "publisher": "Clojure · Rich Hickey",
    "type": "一手文档／作者说明",
    "checkedAt": "2026-10-26",
    "locator": "首段与 Functional programming／Languages and Platforms；当前设计阐述，不把页面更新时间当2007发布日期"
  },
  {
    "id": "typescript2012-conference",
    "title": "Introducing TypeScript",
    "url": "https://2012.jsconf.eu/speaker/2012/10/05/introducing-typescript.html",
    "publisher": "JSConf EU 2012 · Anders Hejlsberg、Luke Hoban",
    "type": "一手文档／作者说明",
    "checkedAt": "2026-10-26",
    "locator": "2012-10 会场文字摘要：optional static types/classes/modules/tooling；未验证嵌入视频播放，发布日期另据微软回顾"
  },
  {
    "id": "java21-arrival",
    "title": "The Arrival of Java 21!",
    "url": "https://inside.java/2023/09/19/the-arrival-of-java-21/",
    "publisher": "Oracle Java 团队 · Sharat Chander",
    "type": "一手文档／作者说明",
    "checkedAt": "2026-10-26",
    "locator": "2023-09-19 正式可用；各 JEP 段区分正式、预览和孵化能力，含 Sequenced Collections"
  },
  {
    "id": "java8-jsr-final",
    "title": "JSR 337: Java SE 8 Release Contents",
    "url": "https://jcp.org/en/jsr/detail?id=337",
    "publisher": "Java Community Process",
    "type": "一手文档／作者说明",
    "checkedAt": "2026-10-26",
    "locator": "规格 Final Release 为2014-03-04；不是JDK产品GA日期，产品月份另据路线图"
  }
] as Source[]);
deepEvent("simula67").sourceIds.push("simula-dahl-original");
deepEvent("clojure-release").sourceIds.push("clojure-design-rationale");
Object.assign(deepEvent("typescript-08"), { title: "TypeScript 0.8 预览公开", sourceIds: ["typescript-release", "typescript2012-conference"], note: "微软回顾确认 0.8 于2012年10月首次公开；同月会场文字介绍可选静态类型与工具能力，不把2014年1.0功能整体倒填到预览版。" });
deepEvent("java-21").sourceIds.push("java21-arrival");
deepEvent("java-21").change!.sourceIds.push("java21-arrival");
deepEvent("java-8").sourceIds.push("java8-jsr-final");
for (const id of ["java5-exact-features", "java8-exact-features", "java21-exact-features"]) {
  const entry = sources.find(item => item.id === id)!;
  entry.locator += "；本轮搜索正文可核，但云浏览器直达显示 Site Unavailable，非404；可先参考并列的规范记录或官方发布文章。";
}

sources.push({ id: "algol60-original-report", title: "Report on the Algorithmic Language ALGOL 60", url: "https://softwarepreservation.computerhistory.org/ALGOL/report/Algol60_report_CACM_1960_June.pdf", publisher: "Peter Naur（编）等 · Communications of the ACM；Computer History Museum 档案", type: "一手文档／作者说明", checkedAt: "2026-10-26", locator: "1960年5月报告，含截至6月28日勘误；§4.1.3嵌套块、§5作用域、§5.4.4递归过程；不是1963修订版" });
deepEvent("algol60-report").sourceIds.push("algol60-original-report");
deepEvent("cobol-initial-spec").note = "事件按1960年4月报告出版记年；前言所记1959年12月委员会草稿不是该报告出版日期。";

const finalEarlyEditorial: Record<string, string> = {
  "fortran-i": "编辑解读：此节点适合比较数学公式与机器指令两种表达层级，并追问编译优化如何降低使用高级记法的成本。",
  "cobol-initial-spec": "编辑解读：报告中的商业数据处理目标与多方委员会过程，可以帮助理解语言规格如何成为共同协作的对象；不能据此直接量化行业影响。",
  "c-creative-year": "编辑解读：把语言的形成与 UNIX 的实现需求并读，可以观察抽象能力和机器控制之间的取舍；后续系统的采用需分别取证。",
  "prolog-interpreter": "编辑解读：可把规则描述与解释器如何求解目标对照阅读，理解逻辑式写法与命令式步骤的差别。",
  "ada83-standard": "编辑解读：将语言规范放入采购与软件工程要求的背景阅读，有助于区分设计目标、标准批准与实际项目效果。",
  "haskell-1": "编辑解读：统一报告提供了可共同讨论的语法语义文本；其在研究和产业中的实际采用不能仅凭报告发布推断。",
  "python-public": "编辑解读：这个节点先确定可公开获取的版本起点；教学、科学计算等后来的用途应另按各自形成过程讨论。",
  "javascript-netscape": "编辑解读：浏览器测试版中的脚本能力与后来的服务器运行时不是同一次事件，阅读时应区分平台与阶段。",
  "php-fi": "编辑解读：应先区分工具集公开、表单解释功能与 PHP/FI 合名，再讨论它们如何服务动态网页；不能把后来全部功能倒填到首发。",
  "ecmascript-v1": "编辑解读：共同规格为比较不同实现提供依据，但标准文本的发布本身不保证浏览器已完成兼容实现。",
  "typescript-08": "编辑解读：可选静态类型让使用者可以讨论增量引入类型的路线；实际迁移成本和工程效果仍取决于项目。",
  "julia-paper": "编辑解读：把动态交互与数值计算性能并列为设计目标，提供了观察语言取舍的角度；目标不是对每项任务的性能保证。",
  "swift-announced": "编辑解读：预览版让开发者开始比较新语言与既有平台接口的协作方式；后来的稳定性和生态不能倒算为首日成果。",
  "mojo-release": "编辑解读：可把 Python 使用体验与硬件控制两个目标对照阅读，注意预览展示与可部署、兼容的能力之间仍有边界。"
};
for (const entry of events) if (finalEarlyEditorial[entry.id]) entry.significance = finalEarlyEditorial[entry.id];

deepEvent("lisp-paper").facts?.[0].sourceIds?.push("lisp-author-original");
for (const [entityId, sourceId] of [["lisp", "lisp-author-original"], ["algol60", "algol60-original-report"], ["simula67", "simula-dahl-original"]]) entities.find(item => item.id === entityId)?.sourceIds.push(sourceId);
periods.find(item => item.id === "structured-languages")?.sourceIds.push("algol60-original-report", "simula-dahl-original", "lisp-author-original");

sources.push(...swiftReviewedSources);
for (const entry of events) Object.assign(entry, swiftReviewedPatches[entry.id] ?? {});
for (const id of ["swift5-exact-release", "swift6-release"]) {
  const index = sources.findIndex(item => item.id === id);
  sources[index] = { ...sources[index], checkedAt: "2026-10-26" };
}

sources.push(...goIterationSources);
events.push(...goIterationEvents);

export const programmingLanguages: Catalog = {
  topic: {
    id: "programming-languages",
    title: "编程语言",
    path: "/programming-languages/",
    periodLabel: "语言时代",
    periodSegment: "eras",
    description: "从 FORTRAN、Lisp、C 到现代安全与性能语言，看抽象、平台与工程目标如何塑造语言。",
    coverage: "精选语言史节点：以发布、范式成形、标准化和实现突破为主线，不追求收录所有版本。",
    categories: [
      { id: "release", title: "语言与发布" },
      { id: "paradigm", title: "范式与思想" },
      { id: "standard", title: "标准与规格" },
      { id: "implementation", title: "实现与运行" },
    ],
    shortcuts: [
      { title: "从 FORTRAN 开始", path: "/programming-languages/eras/early-high-level/" },
      { title: "看范式分化", path: "/programming-languages/categories/paradigm/" },
      { title: "Web 与平台时代", path: "/programming-languages/eras/web-platform/" },
      { title: "现代安全与性能", path: "/programming-languages/eras/modern-safety/" },
    ],
  },
  periods,
  events,
  entities,
  sources,
  relations: [...evolutionRelations, ...goReviewedRelations, ...goIterationRelations],
};
