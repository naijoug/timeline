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
  source("ibm-fortran", "IBM 100: FORTRAN", "IBM", "https://www.ibm.com/ibm/history/ibm100/us/en/items/fortran/", "机构史料", "项目背景、1957 年交付与首个编译器"),
  source("acm-lisp", "Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I", "ACM", "https://dl.acm.org/doi/10.1145/367199.367179", "原始论文", "Communications of the ACM, 1960 年 4 月"),
  source("codasyl-cobol", "COBOL: Initial Specifications for a Common Business Oriented Language", "CODASYL · Bitsavers 扫描档案", "https://bitsavers.trailing-edge.com/pdf/codasyl/COBOL_Report_Apr60.pdf", "历史规格", "1960 年 4 月报告；1959 年为发起年份"),
  source("acm-algol60", "Report on the Algorithmic Language ALGOL 60", "ACM", "https://dl.acm.org/doi/10.1145/367233.367262", "原始报告", "1960 年 5 月报告"),
  source("dartmouth-basic", "BASIC at 50", "达特茅斯学院", "https://www.dartmouth.edu/basicfiftyyears.html", "机构史料", "1964 年 5 月 1 日运行记录"),
  source("acm-simula", "The Development of the SIMULA Languages", "ACM", "https://dl.acm.org/doi/10.1145/960118.808391", "历史论文", "Nygaard 与 Dahl 回顾 Simula 67"),
  source("eth-pascal", "The Programming Language Pascal", "苏黎世联邦理工学院", "https://www.research-collection.ethz.ch/items/514c7df1-8a1c-46c3-af34-2b7938131aeb", "技术报告", "1970 年 11 月报告"),
  source("bell-c", "The Development of the C Language", "Nokia Bell Labs", "https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.html", "作者回顾", "Ritchie 说明 1969—1973 年形成过程"),
  source("prolog-history", "The Birth of Prolog", "Colmerauer 与 Roussel · Prolog Academy 镜像", "https://prolog.academy/DOCS/the%20birth%20of%20prolog%20-%20Colmerauer%20-%20nov%201992.pdf", "作者回顾", "1972 年秋第一个解释器"),
  source("smalltalk-manual", "Smalltalk-72 Instruction Manual", "Computer History Museum", "https://smalltalkzoo.computerhistory.org/papers/Smalltalk72_Manual.pdf", "历史手册", "1972 年夏设计与秋冬季使用"),
  source("mit-scheme", "The Revised Report on Scheme", "Scheme 官方社区", "https://scheme.org/tspl4/", "语言报告", "Scheme 的 Lisp 方言定位与报告体系"),
  source("ada-standard", "Ada 83: ANSI/MIL-STD-1815A", "Ada Resource Association", "https://www.adaic.org/ada-resources/standards/", "标准档案", "Ada 83 标准入口"),
  source("cpp-history", "A History of C++: 1979—1991", "Bjarne Stroustrup", "https://www.stroustrup.com/hopl2.pdf", "作者回顾", "1983 年命名与 1985 年商业发布"),
  source("apple-objc", "Programming with Objective-C", "Apple Developer", "https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html", "官方文档", "Objective-C 的面向对象模型"),
  source("erlang-history", "Concurrent Programming in ERLANG", "Erlang 官网", "https://erlang.org/download/erlang-book-part1.pdf", "技术资料", "并发模型与早期电信背景"),
  source("perl-release", "Perl 语言官网", "Perl 官方社区", "https://www.perl.org/about.html", "官方网站", "Perl 1 发布年份"),
  source("haskell-report", "Haskell 1.0 Report", "Haskell 官方社区", "https://www.haskell.org/definition/haskell-report-1.0.ps.gz", "语言报告", "1990 年 Haskell 1.0"),
  source("python-history", "The History of Python", "Python 官方网站", "https://www.python.org/doc/essays/history/", "作者回顾", "1991 年首次公开发布"),
  source("oracle-java", "Java 概述", "Oracle", "https://www.oracle.com/java/technologies/java-language-and-jvm-overview/", "官方文档", "Java 平台与语言关系"),
  source("netscape-javascript", "Netscape and Sun Announce JavaScript", "Netscape 新闻稿 · Web Archive", "https://web.archive.org/web/20080206040518/http://wp.netscape.com/newsref/pr/newsrelease67.html", "新闻稿", "1995 年 12 月 4 日发布"),
  source("php-history", "PHP 手册：历史与发布", "PHP 官方社区", "https://www.php.net/manual/en/history.php", "官方文档", "PHP/FI 1995 年公开使用"),
  source("ruby-history", "Ruby 语言的诞生", "Ruby 官方社区", "https://www.ruby-lang.org/en/documentation/ruby-from-other-languages-to-ruby/", "官方资料", "1995 年 Ruby 0.95"),
  source("ecma-javascript", "ECMA-262: ECMAScript Language Specification", "Ecma International", "https://www.ecma-international.org/publications-and-standards/standards/ecma-262/", "标准", "ECMAScript 标准系列"),
  source("microsoft-csharp", "C# 文档", "Microsoft Learn", "https://learn.microsoft.com/en-us/dotnet/csharp/", "官方文档", "C# 与 .NET 平台"),
  source("scala-release", "Scala 语言官网", "Scala 官方社区", "https://www.scala-lang.org/", "官方网站", "2004 年发布与演进"),
  source("clojure-release", "Clojure 语言官网", "Clojure 官方社区", "https://clojure.org/", "官方网站", "2007 年发布与 Lisp 传承"),
  source("go-open-source", "Hey, Ho, Let's Go!", "Go 官方网站", "https://go.dev/blog/lets-go", "官方公告", "2009 年 11 月 10 日开源"),
  source("rust-history", "Rust 官方博客", "Rust 官方社区", "https://blog.rust-lang.org/", "官方公告", "2010 年预览与 2015 年 1.0"),
  source("typescript-release", "TypeScript: JavaScript at Scale", "Microsoft TypeScript 官网", "https://www.typescriptlang.org/", "官方网站", "2012 年 TypeScript 0.8"),
  { ...source("julia-paper", "Julia: A Fresh Approach to Numerical Computing", "SIAM Review", "https://epubs.siam.org/doi/10.1137/141000671", "原始论文", "Information & Authors → History：2017-02-07 在线发表；Abstract：设计目标"), publishedAt: "2017-02-07", checkedAt: evolutionCheckedAt },
  source("apple-swift", "The Swift Programming Language", "Apple Developer", "https://developer.apple.com/swift/", "官方文档", "2014 年发布与演进"),
  source("kotlin-release", "Kotlin 官方网站", "JetBrains", "https://kotlinlang.org/", "官方网站", "2011 年公布与 2016 年 1.0"),
  source("elixir-release", "Elixir 语言官网", "Elixir 官方社区", "https://elixir-lang.org/", "官方网站", "Elixir 与 Erlang 虚拟机"),
  source("carbon-release", "Carbon Language", "GitHub", "https://github.com/carbon-language/carbon-lang", "实验项目", "2022 年 7 月公开实验代码"),
  source("modular-mojo", "Mojo 编程语言", "Modular", "https://www.modular.com/mojo", "官方文档", "面向 AI 工作负载的语言"),
  source("python-313", "Python 3.13 Release Notes", "Python 官方社区", "https://docs.python.org/3.13/whatsnew/3.13.html", "发布说明", "实验性 free-threaded 构建与 2024 年发布"),
  source("cpp-standard", "C++ Standards", "Standard C++ Foundation", "https://isocpp.org/std/the-standard", "标准档案", "C++ 11/20/23 等标准版本入口"),
  source("java-versions", "Java SE Versions", "Oracle", "https://www.oracle.com/java/technologies/java-se-support-roadmap.html", "官方路线图", "Java SE 5/8/11/17/21 版本窗口"),
  source("javascript-2015", "ECMAScript 2015 Language Specification", "Ecma International", "https://262.ecma-international.org/6.0/", "标准", "let/const、类、模块与 Promise"),
  source("typescript-release-notes", "TypeScript Release Notes", "Microsoft TypeScript", "https://www.typescriptlang.org/docs/handbook/release-notes/", "发布说明", "TypeScript 1.0/2.0/5.0 变化"),
  source("go-release-notes", "Go Release History", "Go 官方社区", "https://go.dev/doc/devel/release", "发布说明", "Go 1/1.11/1.18 版本记录"),
  source("rust-editions", "Rust Edition Guide", "Rust 官方社区", "https://doc.rust-lang.org/edition-guide/", "官方指南", "Rust 2015/2018/2021/2024 版本差异"),
  source("csharp-release-notes", "C# What's New", "Microsoft Learn", "https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/", "官方文档", "C# 2/3/6/8 变化"),
  source("swift-release-notes", "Swift Release Notes", "Apple Developer", "https://developer.apple.com/documentation/swift-release-notes", "发布说明", "Swift 3/5/6 兼容性与并发演进"),
  source("kotlin-release-notes", "Kotlin Releases", "JetBrains", "https://kotlinlang.org/docs/releases.html", "发布说明", "Kotlin 1.x 与 2.0 变化"),
  source("python-versions", "Python Release Versions", "Python 官方社区", "https://www.python.org/downloads/release-list/", "版本列表", "Python 2.0/3.0/3.11 发布时间"),
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
  event("objective-c", "Objective-C 面向 C 的对象层", 1986, "paradigm", ["desktop-scripting"], ["objective-c"], "Objective-C 把 Smalltalk 风格的消息传递加入 C，后来成为 Apple 平台的主要开发语言之一。", ["apple-objc"], {
    significance: "它展示了动态面向对象层与 C 运行时结合的可行路线，也影响移动应用开发工具链。",
    tags: ["Objective-C", "消息传递", "Apple"],
    note: "官方文档用于核对语言模型；早期发布年份需另查 Brad Cox 的原始资料。",
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
  event("csharp-announced", "C# 与 .NET 发布", 2000, "release", ["web-platform"], ["csharp"], "Microsoft 公布 C#，语言与 .NET 运行时和类库一起面向企业应用与 Web 服务。", ["microsoft-csharp"], {
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
  event("rust-prealpha", "Rust 预览", 2010, "release", ["modern-safety"], ["rust"], "Rust 项目公开预览，提出内存安全与并发安全由类型系统约束的设计方向。", ["rust-history"], {
    significance: "Rust 把所有权与借用检查作为语言核心，为无垃圾回收的系统编程提供新的安全策略。",
    tags: ["所有权", "内存安全", "系统编程"],
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
  event("swift-announced", "Swift 发布", 2014, "release", ["modern-safety"], ["swift"], "Apple 在 WWDC 发布 Swift，作为 Objective-C 之外的新一代平台语言。", ["apple-swift"], {
    significance: "Swift 展示了现代类型安全、值语义和开发者体验在移动与系统平台中的组合。",
    tags: ["Apple", "类型安全", "移动开发"],
  }),
  event("rust-10", "Rust 1.0 发布", 2015, "release", ["modern-safety"], ["rust"], "Rust 1.0 承诺语言与标准库核心的稳定性，生态可以建立在明确兼容性边界上。", ["rust-history"], {
    significance: "所有权模型从实验项目进入长期生产阶段，推动内存安全成为系统语言设计议题。",
    tags: ["稳定性", "所有权", "生产化"],
  }),
  event("kotlin-10", "Kotlin 1.0 发布", 2016, "release", ["modern-safety"], ["kotlin"], "JetBrains 发布 Kotlin 1.0，提供 JVM 上更现代的语法、空安全与工具体验。", ["kotlin-release"], {
    significance: "Kotlin 后来成为 Android 官方支持语言，说明宿主平台能显著改变语言扩散路径。",
    tags: ["JVM", "空安全", "Android"],
  }),
  event("elixir-release", "Elixir 发布", 2012, "release", ["modern-safety"], ["elixir"], "José Valim 发布 Elixir，在 Erlang 虚拟机上构建现代语法与生产力工具。", ["elixir-release"], {
    significance: "Elixir 把 Erlang 的并发与容错能力带入 Web 和实时系统开发，延续 Actor 模型路线。",
    tags: ["BEAM", "并发", "实时系统"],
  }),
  event("carbon-experiment", "Carbon 实验项目公开", 2022, "release", ["modern-safety"], ["carbon"], "Google 相关团队公开 Carbon 实验语言，探索 C++ 的渐进迁移与互操作路线。", ["carbon-release"], {
    significance: "Carbon 说明现代语言不仅要提出安全模型，还必须回应既有 C++ 资产迁移成本。",
    tags: ["实验语言", "互操作", "迁移"],
    milestone: false,
  }),
  event("mojo-release", "Mojo 面向 AI 工作负载", 2023, "release", ["modern-safety"], ["mojo"], "Modular 公布 Mojo，尝试把 Python 生态与底层硬件性能控制连接起来。", ["modular-mojo"], {
    significance: "Mojo 代表 AI 编译栈对语言语法、硬件抽象和 Python 兼容性的重新组合。",
    tags: ["AI", "性能", "Python 生态"],
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
  event("typescript-20", "TypeScript 2.0 发布", 2016, "release", ["modern-safety"], ["typescript"], "TypeScript 2.0 引入 strictNullChecks 与控制流分析相关的空安全能力。", ["typescript-release-notes"], {
    significance: "空值检查把 TypeScript 从“可选注解”推进到可系统性消除 null/undefined 错误的工具。",
    tags: ["TypeScript 2.0", "strictNullChecks"],
    change: change("TypeScript 1.x 默认允许 null 赋给多数类型", ["strictNullChecks", "never 类型", "只读属性", "标记联合改进"], "启用严格空安全后需要显式收窄和标注边界", ["typescript-release-notes"]),
  }),
  event("typescript-50", "TypeScript 5.0 发布", 2023, "release", ["modern-safety"], ["typescript"], "TypeScript 5.0 重构运行时与数据结构，引入 const 类型参数和装饰器新方案。", ["typescript-release-notes"], {
    significance: "在语言表达力继续增加的同时，工具链性能和代码规模被明确纳入版本目标。",
    tags: ["TypeScript 5.0", "性能", "装饰器"],
    change: change("TypeScript 4.x 的代码库结构与实验性装饰器", ["更快的编译与安装体验", "const 类型参数", "标准化装饰器", "命名空间兼容改进"], "部分 API 被移除，复杂项目需要检查迁移清单", ["typescript-release-notes"]),
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
  event("rust-2024", "Rust 2024 edition 随 1.85 稳定", 2025, "release", ["modern-safety"], ["rust"], "Rust 2024 edition 于 2025 年随 Rust 1.85 稳定，调整 unsafe 边界、临时值作用域与宏规则。", ["rust-editions", "rust185-release"], {
    time: { kind: "point", start: { year: 2025, month: 2, day: 20 } },
    significance: "edition 成为 Rust 稳定演进制度的一部分，而不是破坏性重写。",
    tags: ["Rust 2024", "edition"],
    note: "2024 是 edition 名称，不是稳定发布日期。Rust 1.85 同时稳定的 async 闭包属于该编译器版本的能力，不列作仅限 2024 edition 的变化。",
    change: { ...change("Rust 2021 edition", ["unsafe extern 块与 unsafe 属性显式标记", "调整 impl Trait 捕获与临时值作用域", "预留 gen 关键字", "Cargo 默认采用考虑 rust-version 的解析器"], "cargo fix 优先保留旧语义；unsafe 和析构顺序变化仍需人工检查与测试", ["rust185-release"]), baselineEventId: "rust-2021" },
    details: [{ label: "名称年份与发布日期", text: "1.85 发布公告明确宣布 2024 edition 进入 stable；该公告的时间是 2025 年 2 月 20 日。", sourceIds: ["rust185-release"], locator: "发布日期；Rust 2024；Migrating to 2024" }],
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
  event("swift-5", "Swift 5 发布", 2019, "release", ["modern-safety"], ["swift"], "Swift 5 稳定 ABI，并继续推进编码指南与字符串处理。", ["swift-release-notes"], {
    significance: "稳定 ABI 使系统组件与用户程序可共享 Swift 运行时，是 Apple 平台集成的重要基础。",
    tags: ["Swift 5", "ABI 稳定"],
    change: change("Swift 4 每个应用附带运行时与源码兼容模式", ["ABI 稳定", "标准库二进制兼容", "字符串重写与 SIMD 雏形"], "源代码兼容性与二进制兼容是不同层面的承诺", ["swift-release-notes"]),
  }),
  event("swift-6", "Swift 6 发布", 2024, "release", ["modern-safety"], ["swift"], "Swift 6 提供可选择启用的语言模式，把潜在数据竞争诊断提升为编译错误。", ["swift-release-notes", "swift6-release"], {
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
  ...evolutionEvents,
];

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
  relations: [...evolutionRelations, ...goReviewedRelations],
};
