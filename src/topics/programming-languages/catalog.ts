import type {
  Catalog,
  Entity,
  Period,
  Source,
  TimeSpan,
  TimelineEvent,
} from "../../core/types";

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
  source("julia-paper", "Julia: A Fresh Approach to Numerical Computing", "SIAM Review", "https://epubs.siam.org/doi/10.1137/141000671", "原始论文", "2012 年论文与语言目标"),
  source("apple-swift", "The Swift Programming Language", "Apple Developer", "https://developer.apple.com/swift/", "官方文档", "2014 年发布与演进"),
  source("kotlin-release", "Kotlin 官方网站", "JetBrains", "https://kotlinlang.org/", "官方网站", "2011 年公布与 2016 年 1.0"),
  source("elixir-release", "Elixir 语言官网", "Elixir 官方社区", "https://elixir-lang.org/", "官方网站", "Elixir 与 Erlang 虚拟机"),
  source("carbon-release", "Carbon Language", "GitHub", "https://github.com/carbon-language/carbon-lang", "实验项目", "2022 年 7 月公开实验代码"),
  source("modular-mojo", "Mojo 编程语言", "Modular", "https://www.modular.com/mojo", "官方文档", "面向 AI 工作负载的语言"),
  source("python-313", "Python 3.13 Release Notes", "Python 官方社区", "https://docs.python.org/3.13/whatsnew/3.13.html", "发布说明", "实验性 free-threaded 构建与 2024 年发布"),
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
  event("julia-paper", "Julia 语言论文发表", 2012, "paradigm", ["modern-safety"], ["julia"], "Julia 团队发表论文，说明其兼顾数值计算生产力与接近编译语言性能的目标。", ["julia-paper"], {
    significance: "Julia 把多重派发、科学计算生态和即时编译结合，服务数值密集型研究工作流。",
    tags: ["数值计算", "多重派发", "即时编译"],
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
};
