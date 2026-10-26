import type { Entity, Source, TimelineEvent } from './types';

// A bounded primary-source review of significant 2026 gaps, not a news feed.
// Announcement, access, preview and downloadable weights remain distinct events.
export const verified2026ResearchDate = '2026-10-24';

export const verified2026Sources: Source[] = [
  { id: 'muse-spark-open-model-card', title: 'Muse-Spark-Open-816B-A42B model card and access conditions', publisher: 'Meta · Hugging Face', url: 'https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B', type: '官方文档', checkedAt: '2026-10-26', locator: 'Muse Model License; gated access conditions' },
  { id: 'muse-spark-open-files', title: 'Muse-Spark-Open-816B-A42B files and gated access notice', publisher: 'Meta · Hugging Face', url: 'https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B/tree/main', type: '官方文档', checkedAt: '2026-10-26', locator: 'Gated model; preview of files and safetensors shard metadata' },
  {
    "id": "gap-gemma-4",
    "title": "Gemma 4: Byte for byte, the most capable open models",
    "publisher": "Google",
    "url": "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-04-02",
    "locator": "Date; Industry-leading capabilities and mobile-first AI; An open-source license"
  },
  {
    "id": "gap-ernie-5-1",
    "title": "ERNIE 5.1 official release",
    "publisher": "百度",
    "url": "https://ernie.baidu.com/blog/posts/ernie-5.1-0508-release/",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-05-09",
    "locator": "Publication date; model introduction; availability"
  },
  {
    "id": "gap-minimax-m3",
    "title": "MiniMax M3",
    "publisher": "MiniMax",
    "url": "https://www.minimax.io/blog/minimax-m3",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-06-01",
    "locator": "Publication date; model introduction; availability"
  },
  {
    "id": "gap-claude-fable-mythos-5",
    "title": "Claude Fable 5 and Claude Mythos 5",
    "publisher": "Anthropic",
    "url": "https://www.anthropic.com/news/claude-fable-5-mythos-5",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-06-09",
    "locator": "Published Jun 9, 2026; related access updates Jun 12 and Jul 1; Availability"
  },
  {
    "id": "gap-seedream-5-pro",
    "title": "Beyond generation, it understands design: Introducing Seedream 5.0 Pro",
    "publisher": "字节跳动",
    "url": "https://seed.bytedance.com/en/blog/beyond-generation-it-understands-design-introducing-seedream-5-0-pro?view_from=content_recommend",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-07-08",
    "locator": "July 8, 2026; information-rich design; local editing; layer separation"
  },
  {
    "id": "gap-seedance-2-5",
    "title": "One-take creation, flexible referencing: Introducing Seedance 2.5",
    "publisher": "字节跳动",
    "url": "https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5?view_from=content_recommend",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-07-31",
    "locator": "Publication date; one-take creation; flexible references; availability"
  },
  {
    "id": "gap-tencent-hy4-preview",
    "title": "Tencent releases and open-sources Tencent Hy4 preview",
    "publisher": "腾讯",
    "url": "https://www.tencent.com/tencent-releases-and-open-sources-tencent-hy4-preview/",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-08-28",
    "locator": "Publication date; model introduction; deployment availability"
  },
  {
    "id": "gap-claude-fable-mythos-5-1",
    "title": "Introducing Claude Fable 5.1 and Claude Mythos 5.1",
    "publisher": "Anthropic",
    "url": "https://www.anthropic.com/claude-fable-and-mythos-5-1",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-09-01",
    "locator": "Introduction; Trusted access; Cost and availability; date corroborated by /claude/fable announcement index"
  },
  {
    "id": "gap-fable-5-1-date",
    "title": "Claude Fable official announcements",
    "publisher": "Anthropic",
    "url": "https://www.anthropic.com/claude/fable",
    "type": "官方文档",
    "checkedAt": "2026-10-24",
    "locator": "Announcements → New Sep 1, 2026 → Introducing Claude Fable 5.1"
  },
  {
    "id": "gap-opus-5-5",
    "title": "Introducing Claude Opus 5.5",
    "publisher": "Anthropic",
    "url": "https://www.anthropic.com/claude-opus-5-5",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-09-22",
    "locator": "September 22, 2026; Introduction; Cost and speed; Availability"
  },
  {
    "id": "gap-codex-cloud-2026",
    "title": "ChatGPT release notes: September 29, 2026",
    "publisher": "OpenAI",
    "url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-09-29",
    "locator": "September 29, 2026 → Codex Cloud"
  },
  {
    "id": "gap-gemini-4-argon-preview",
    "title": "Gemini 4 Argon: our next era of frontier intelligence",
    "publisher": "Google",
    "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-09-30",
    "locator": "Sep 30, 2026; introduction; rollout / availability"
  },
  {
    "id": "gap-mistral-large-4-preview",
    "title": "Introducing Mistral Large 4",
    "publisher": "Mistral AI",
    "url": "https://mistral.ai/news/mistral-large-4/",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-06",
    "locator": "October 6, 2026; public preview opening; weights end-of-month statements"
  },
  {
    "id": "gap-haiku-5-5",
    "title": "Introducing Claude Haiku 5.5",
    "publisher": "Anthropic",
    "url": "https://www.anthropic.com/claude-haiku-5-5",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-07",
    "locator": "October 7, 2026; Introduction; adjustable effort; Availability"
  },
  {
    "id": "gap-muse-wonder",
    "title": "Muse Wonder: A Frontier Model For Personal & Professional AI Agents",
    "publisher": "Meta",
    "url": "https://research.meta.ai/blog/muse-wonder",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-12",
    "locator": "October 12, 2026; opening availability; Active Memory; Active Focus"
  },
  {
    "id": "gap-gemini-4-argon-ga",
    "title": "Gemini 4 Argon: Built to solve your hardest problems",
    "publisher": "Google",
    "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-13",
    "locator": "Oct 13, 2026; opening; Get started today"
  },
  {
    "id": "gap-muse-spark-open",
    "title": "Introducing Muse Spark Open",
    "publisher": "Meta",
    "url": "https://research.meta.ai/blog/muse-spark-open",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-15",
    "locator": "October 15, 2026; Available Now; License; Get Started"
  },
  {
    "id": "gap-minimax-m3-1-flash",
    "title": "MiniMax M3.1 Flash",
    "publisher": "MiniMax",
    "url": "https://www.minimax.io/blog/minimax-m31f",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-19",
    "locator": "Publication date; introduction; availability and pricing"
  },
  {
    "id": "gap-minimax-m3-1-flash-weights",
    "title": "MiniMax-M3.1-Flash commit history",
    "publisher": "MiniMax",
    "url": "https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash/commits/main",
    "type": "官方文档",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-23",
    "locator": "Oct 23 → 03:37 → Init MiniMaxAI/MiniMax-M3.1-Flash"
  },
  {
    "id": "gap-minimax-m31f-card",
    "title": "MiniMax-M3.1-Flash official model card and weights",
    "publisher": "MiniMax",
    "url": "https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash",
    "type": "官方文档",
    "checkedAt": "2026-10-24",
    "locator": "Model card; license; Files tree contains 48 safetensor shards"
  },
  {
    "id": "gap-tencent-hy-nomas",
    "title": "Hy-Nomas official model card",
    "publisher": "腾讯",
    "url": "https://huggingface.co/tencent/Hy-Nomas",
    "type": "官方文档",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-23",
    "locator": "Model card; License Apache-2.0; inference configurations; dated commits"
  },
  {
    "id": "gap-hy-nomas-date",
    "title": "Hy-Nomas official commit history",
    "publisher": "腾讯",
    "url": "https://huggingface.co/tencent/Hy-Nomas/commits/main",
    "type": "官方文档",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-23",
    "locator": "Initial commit Oct 23 at 11:18"
  },
  {
    "id": "gap-hy-nomas-code",
    "title": "Hy-Nomas official code repository",
    "publisher": "腾讯",
    "url": "https://github.com/Tencent-Hunyuan/Hy-Nomas",
    "type": "官方文档",
    "checkedAt": "2026-10-24",
    "locator": "README → Technical Report (Coming Soon); Model Introduction; Model Assets; License"
  }
];

export const verified2026Entities: Entity[] = [
  {
    "id": "muse-models",
    "name": "Muse 模型",
    "type": "family",
    "company": "Meta",
    "description": "Meta 的 Muse Spark 与 Muse Wonder 基础模型路线，和 Muse 个人 Agent 产品分开追踪。",
    "tags": [
      "多模态",
      "Agent"
    ],
    "sourceIds": [
      "gap-muse-wonder",
      "gap-muse-spark-open"
    ]
  },
  {
    "id": "seedream",
    "name": "Seedream",
    "type": "family",
    "company": "字节跳动",
    "description": "用于图像生成与精细编辑的模型系列，和 Seedance 音视频生成路线分开追踪。",
    "tags": [
      "图像生成",
      "图像编辑"
    ],
    "sourceIds": [
      "gap-seedream-5-pro",
      "release-seedance-1-5-pro"
    ]
  }
];

export const verified2026Events: TimelineEvent[] = [
  {
    "id": "gemma-4",
    "date": "2026-04-02",
    "title": "Gemma 4：面向推理与 Agent 的开放模型",
    "company": "Google",
    "kind": "模型发布",
    "tracks": [
      "models"
    ],
    "summary": "Google 发布 Gemma 4 系列，提供 E2B、E4B、26B MoE 与 31B Dense 四个尺寸，采用 Apache 2.0 许可。",
    "significance": "端侧与可自部署模型继续扩展推理、工具调用和多模态工作流。",
    "limitation": "各尺寸的模态、上下文和硬件需求不同；发布方的能力比较不等同于本项目独立评测。",
    "entityIds": [
      "gemma"
    ],
    "sourceIds": [
      "gap-gemma-4"
    ],
    "tags": [
      "开放权重",
      "端侧",
      "多模态"
    ],
    "milestone": true,
    "change": {
      "baseline": "Gemma 3",
      "baselineEventId": "gemma-3",
      "improvements": [
        "新增面向推理和 Agent 的系列",
        "采用 Apache 2.0 许可并提供四个尺寸"
      ],
      "tradeoffs": "不同尺寸支持范围及运行资源不同；不合并为统一性能结论。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-gemma-4"
      ]
    }
  },
  {
    "id": "ernie-5-1",
    "date": "2026-05-09",
    "title": "文心 ERNIE 5.1 发布",
    "company": "百度",
    "kind": "模型发布",
    "tracks": [
      "models"
    ],
    "summary": "百度发布 ERNIE 5.1，进一步强化推理与 Agent 任务能力，并通过文心与 AI Studio 提供访问。",
    "significance": "基础模型通过后训练强化推理与工具任务，并将能力接入可体验的开发平台。",
    "limitation": "采用官方文章的 5 月 9 日发布日期，不将 URL 中的 0508 直接当作发布日；性能表述属于厂商报告。",
    "entityIds": [
      "ernie"
    ],
    "sourceIds": [
      "gap-ernie-5-1"
    ],
    "tags": [
      "推理",
      "Agent"
    ],
    "milestone": true,
    "change": {
      "baseline": "ERNIE 5.0",
      "improvements": [
        "通过弹性预训练继承既有能力，缩减模型规模",
        "强化推理、Agent 与长尾任务的后训练"
      ],
      "tradeoffs": "采用官方文章的 5 月 9 日发布日期，不将 URL 中的 0508 直接当作发布日；性能表述属于厂商报告。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-ernie-5-1"
      ]
    }
  },
  {
    "id": "minimax-m3",
    "date": "2026-06-01",
    "title": "MiniMax M3：原生多模态与长程任务",
    "company": "MiniMax",
    "kind": "模型发布",
    "tracks": [
      "models"
    ],
    "summary": "MiniMax 发布 M3，支持原生图像与视频输入、电脑使用及 100 万 token 上下文，并接入 Code、Token Plan 与 API。",
    "significance": "把长上下文、视觉理解与实际任务执行组合进同一基础模型。",
    "limitation": "本条记录 6 月 1 日的产品与 API 发布，不据公告推定全部权重当日可下载；能力与效率比较属于厂商报告。",
    "entityIds": [
      "minimax"
    ],
    "sourceIds": [
      "gap-minimax-m3"
    ],
    "tags": [
      "多模态",
      "电脑使用",
      "长上下文"
    ],
    "milestone": true,
    "change": {
      "baseline": "MiniMax M2 系列",
      "improvements": [
        "引入 MSA 稀疏注意力并支持 100 万 token 上下文",
        "结合原生图像与视频输入、电脑使用能力"
      ],
      "tradeoffs": "本条记录 6 月 1 日的产品与 API 发布，不据公告推定全部权重当日可下载；能力与效率比较属于厂商报告。 基线链接指向此前已收录节点，不表示它是紧邻前代或直接架构来源。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-minimax-m3"
      ],
      "baselineEventId": "minimax-m2-5"
    }
  },
  {
    "id": "claude-fable-mythos-5",
    "date": "2026-06-09",
    "title": "Claude Fable 5 与 Mythos 5 公布",
    "company": "Anthropic",
    "kind": "模型发布",
    "tracks": [
      "models"
    ],
    "summary": "Anthropic 公布 Fable 5 与 Mythos 5，围绕长时间编程和知识工作推进第五代模型，并按安全措施区分开放范围。",
    "significance": "前沿模型开始同时以通用访问与受信任访问形态部署。",
    "limitation": "这是 6 月 9 日的首次发布节点；官方随后于 6 月 12 日暂停访问、7 月 1 日恢复。不能把 Mythos 写为无条件向公众开放。",
    "entityIds": [
      "claude"
    ],
    "sourceIds": [
      "gap-claude-fable-mythos-5"
    ],
    "tags": [
      "长任务",
      "编程",
      "分级访问"
    ],
    "milestone": true,
    "change": {
      "baseline": "此前 Claude 模型与受限访问方案",
      "improvements": [
        "面向更长的编程与知识工作任务",
        "同一底层模型通过不同安全措施区分 Fable 与 Mythos 的访问范围"
      ],
      "tradeoffs": "这是 6 月 9 日的首次发布节点；官方随后于 6 月 12 日暂停访问、7 月 1 日恢复。不能把 Mythos 写为无条件向公众开放。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-claude-fable-mythos-5"
      ]
    },
    "details": [
      {
        "label": "长任务能力",
        "text": "官方将软件工程、知识工作、视觉与记忆列为主要能力方向；能力较强并不取消运行环境、工具配置和安全措施对任务结果的影响。",
        "sourceIds": [
          "gap-claude-fable-mythos-5"
        ],
        "locator": "Evaluating Claude Fable 5 and Claude Mythos 5"
      },
      {
        "label": "分级访问与后续中断",
        "text": "Fable 与 Mythos 使用相同底层模型，但安全措施和访问对象不同。公告同时保留 6 月 12 日暂停、7 月 1 日恢复的后续说明，首次公布日不代表服务此后一直可用。",
        "sourceIds": [
          "gap-claude-fable-mythos-5"
        ],
        "locator": "Opening announcement; related updates Jun 12 and Jul 1"
      }
    ]
  },
  {
    "id": "seedream-5-pro",
    "date": "2026-07-08",
    "title": "Seedream 5.0 Pro：从图像生成走向设计编辑",
    "company": "字节跳动",
    "kind": "模型发布",
    "tracks": [
      "models"
    ],
    "summary": "Seed 发布 Seedream 5.0 Pro，强化信息密集型版面、局部图像编辑和图层分离等设计任务。",
    "significance": "图像模型的能力从生成单张画面扩展到可控制、可修改的创作过程。",
    "limitation": "发布方展示与测评不等于所有实际设计任务的稳定表现；图像模型和 Seedance 视频模型需要分开记录。",
    "entityIds": [
      "seedream"
    ],
    "sourceIds": [
      "gap-seedream-5-pro"
    ],
    "tags": [
      "图像生成",
      "设计",
      "图像编辑"
    ],
    "milestone": true,
    "change": {
      "baseline": "此前 Seedream 图像模型",
      "improvements": [
        "强化信息密集型图像与版面生成",
        "增加更精细的局部编辑、图层分离与多图融合控制"
      ],
      "tradeoffs": "发布方展示与测评不等于所有实际设计任务的稳定表现；图像模型和 Seedance 视频模型需要分开记录。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-seedream-5-pro"
      ]
    }
  },
  {
    "id": "seedance-2-5",
    "date": "2026-07-31",
    "title": "Seedance 2.5：长镜头与多模态参考",
    "company": "字节跳动",
    "kind": "模型发布",
    "tracks": [
      "models"
    ],
    "summary": "Seed 发布 Seedance 2.5，支持最长 30 秒的音视频生成，并扩展图像、视频和音频参考输入。",
    "significance": "视频模型从单段画面生成扩展到更长镜头与更细致的创作控制。",
    "limitation": "官方公告日期为 7 月 31 日；即梦和豆包 Pro 开始上线，API 当时仍为后续计划。30 秒是单次生成的视频时长，不是生成所需时间。",
    "entityIds": [
      "seedance"
    ],
    "sourceIds": [
      "gap-seedance-2-5"
    ],
    "tags": [
      "视频生成",
      "音视频",
      "多模态参考"
    ],
    "milestone": true,
    "change": {
      "baseline": "Seedance 2.0",
      "improvements": [
        "单次音视频生成时长从 15 秒扩展到 30 秒，并支持多轮延长",
        "扩展图像、视频、音频参考与时间戳级编辑"
      ],
      "tradeoffs": "官方公告日期为 7 月 31 日；即梦和豆包 Pro 开始上线，API 当时仍为后续计划。30 秒是单次生成的视频时长，不是生成所需时间。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-seedance-2-5"
      ],
      "baselineEventId": "seedance-2"
    }
  },
  {
    "id": "tencent-hy4-preview",
    "date": "2026-08-28",
    "title": "腾讯 Hy4 预览版开放权重",
    "company": "腾讯",
    "kind": "预览与权重开放",
    "tracks": [
      "models"
    ],
    "summary": "腾讯发布并开放 Hy4 预览版权重，支持超过 100 万 token 上下文，同时提供 WorkBuddy、CodeBuddy 与 API 入口。",
    "significance": "腾讯的基础模型路线进入长上下文与 Agent 任务的新阶段。",
    "limitation": "模型明确处于预览阶段；开放权重不代表没有许可限制，官方能力报告也不等同于独立测评。",
    "entityIds": [
      "hunyuan"
    ],
    "sourceIds": [
      "gap-tencent-hy4-preview"
    ],
    "tags": [
      "开放权重",
      "预览",
      "长上下文"
    ],
    "milestone": true,
    "change": {
      "baseline": "此前混元语言模型路线",
      "improvements": [
        "扩展到超过 100 万 token 上下文，面向编程、办公与研究任务",
        "开放预览版权重，并提供产品与 API 入口"
      ],
      "tradeoffs": "模型明确处于预览阶段；开放权重不代表没有许可限制，官方能力报告也不等同于独立测评。 基线链接指向此前已收录节点，不表示它是紧邻前代或直接架构来源。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-tencent-hy4-preview"
      ],
      "baselineEventId": "hunyuan-t1"
    }
  },
  {
    "id": "claude-fable-mythos-5-1",
    "date": "2026-09-01",
    "title": "Claude Fable 5.1 与 Mythos 5.1 发布",
    "company": "Anthropic",
    "kind": "模型发布",
    "tracks": [
      "models"
    ],
    "summary": "Anthropic 更新 Fable 与 Mythos 系列，强化编程、知识工作和研究任务；Fable 5.1 普遍可用，Mythos 5.1 限受信任访问。",
    "significance": "同一基础模型通过不同安全配置服务通用工作与经过审核的专业用途。",
    "limitation": "主公告只展示月份；日级日期由官方 Fable 产品页的公告索引确认。Mythos 与 Fable 是同一模型的不同安全配置，不宜写成完全独立架构。",
    "entityIds": [
      "claude"
    ],
    "sourceIds": [
      "gap-claude-fable-mythos-5-1",
      "gap-fable-5-1-date"
    ],
    "tags": [
      "编程",
      "知识工作",
      "分级访问"
    ],
    "milestone": true,
    "change": {
      "baseline": "Claude Fable 5 / Mythos 5",
      "improvements": [
        "官方报告编程、知识工作和研究能力改善",
        "调整缓存读取价格及安全措施，保留通用与受信任访问的区别"
      ],
      "tradeoffs": "主公告只展示月份；日级日期由官方 Fable 产品页的公告索引确认。Mythos 与 Fable 是同一模型的不同安全配置，不宜写成完全独立架构。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-claude-fable-mythos-5-1",
        "gap-fable-5-1-date"
      ],
      "baselineEventId": "claude-fable-mythos-5"
    },
    "details": [
      {
        "label": "同一模型，不同访问条件",
        "text": "Fable 5.1 普遍可用，Mythos 5.1 仅通过受信任项目开放；它们不是两个独立架构。能力比较还需考虑安全措施触发后的任务回退。",
        "sourceIds": [
          "gap-claude-fable-mythos-5-1"
        ],
        "locator": "Introduction; A new performance frontier"
      },
      {
        "label": "日级日期依据",
        "text": "主公告页显示 2026 年 9 月；官方 Fable 产品页的公告索引明确列为 9 月 1 日。",
        "sourceIds": [
          "gap-claude-fable-mythos-5-1",
          "gap-fable-5-1-date"
        ],
        "locator": "Announcements → New Sep 1, 2026"
      }
    ]
  },
  {
    "id": "opus-5-5",
    "date": "2026-09-22",
    "title": "Claude Opus 5.5：旗舰能力与效率升级",
    "company": "Anthropic",
    "kind": "模型发布",
    "tracks": [
      "models"
    ],
    "summary": "Anthropic 发布 Opus 5.5，强化 Agent 编程、电脑使用与知识工作，并降低典型工作负载的运行成本。",
    "significance": "旗舰模型更新同时强调任务完成质量、运行效率和行动边界。",
    "limitation": "官方所称典型工作负载成本下降 40% 不是每项任务的保证；不同评测的推理强度、工具和安全回退配置需要分别比较。",
    "entityIds": [
      "claude"
    ],
    "sourceIds": [
      "gap-opus-5-5"
    ],
    "tags": [
      "编程",
      "效率",
      "电脑使用"
    ],
    "milestone": true,
    "change": {
      "baseline": "Claude Opus 5",
      "improvements": [
        "官方报告编程、电脑使用和知识工作能力改善",
        "降低典型工作负载成本，并改进行动边界与抗提示注入表现"
      ],
      "tradeoffs": "官方所称典型工作负载成本下降 40% 不是每项任务的保证；不同评测的推理强度、工具和安全回退配置需要分别比较。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-opus-5-5"
      ]
    }
  },
  {
    "id": "codex-cloud-2026",
    "date": "2026-09-29",
    "title": "Codex Cloud：在可复用云环境中持续开发",
    "company": "OpenAI",
    "kind": "产品更新",
    "tracks": [
      "products"
    ],
    "summary": "Codex Cloud 支持从桌面、网页和移动端发起或继续编码任务，以隔离工作区运行预配置的仓库、工具与依赖。",
    "significance": "编码 Agent 的任务可以在用户电脑休眠后继续执行，并在不同终端间接续。",
    "limitation": "本条记录 2026 年可复用云环境产品更新，不是 2025 年云端 Codex 的首次出现；可用性受套餐和工作区设置影响。",
    "entityIds": [
      "codex"
    ],
    "sourceIds": [
      "gap-codex-cloud-2026"
    ],
    "tags": [
      "云端开发",
      "持续任务"
    ],
    "milestone": true
  },
  {
    "id": "gemini-4-argon-preview",
    "date": "2026-09-30",
    "title": "Gemini 4 Argon 首次公布",
    "company": "Google",
    "kind": "公布与受限开放",
    "tracks": [
      "models"
    ],
    "summary": "Google 公布 Gemini 4 Argon，面向复杂专业工作和长程任务，首先向 Fairwind Program 中的受信任网络防御人员开放。",
    "significance": "Gemini 模型谱系进入新一代，同时采用分阶段部署策略。",
    "limitation": "9 月 30 日是公布与受限开放，不是全面可用；后续 10 月 13 日的公开渠道开放应单独记录。",
    "entityIds": [
      "gemini"
    ],
    "sourceIds": [
      "gap-gemini-4-argon-preview"
    ],
    "tags": [
      "推理",
      "长任务",
      "分阶段部署"
    ],
    "milestone": true,
    "change": {
      "baseline": "此前 Gemini 模型路线",
      "improvements": [
        "面向复杂专业工作与长程推理任务",
        "先通过 Fairwind Program 向受信任网络防御人员部署"
      ],
      "tradeoffs": "9 月 30 日是公布与受限开放，不是全面可用；后续 10 月 13 日的公开渠道开放应单独记录。 基线链接指向此前已收录节点，不表示它是紧邻前代或直接架构来源。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-gemini-4-argon-preview"
      ],
      "baselineEventId": "gemini-3-1-pro"
    }
  },
  {
    "id": "mistral-large-4-preview",
    "date": "2026-10-06",
    "title": "Mistral Large 4 进入公开预览",
    "company": "Mistral AI",
    "kind": "公开预览",
    "tracks": [
      "models"
    ],
    "summary": "Mistral 发布 Large 4 的 API 公开预览，采用原生多模态路线，面向编程、Agent 和专业工作。",
    "significance": "欧洲模型团队继续扩展前沿多模态与企业部署路线。",
    "limitation": "截至 2026 年 10 月 24 日核查，完整权重仍计划于 10 月底发布，不能记为已经开放；公开预览的能力与部署条件仍可能变化。",
    "entityIds": [
      "mistral"
    ],
    "sourceIds": [
      "gap-mistral-large-4-preview"
    ],
    "tags": [
      "多模态",
      "编程",
      "预览"
    ],
    "milestone": true,
    "change": {
      "baseline": "此前 Mistral Large 系列",
      "improvements": [
        "采用原生多模态路线，强化专业任务与 Agent 工作流",
        "提供 API 公开预览，完整权重另行发布"
      ],
      "tradeoffs": "截至 2026 年 10 月 24 日核查，完整权重仍计划于 10 月底发布，不能记为已经开放；公开预览的能力与部署条件仍可能变化。 基线链接指向此前已收录节点，不表示它是紧邻前代或直接架构来源。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-mistral-large-4-preview"
      ],
      "baselineEventId": "mistral-large-2"
    }
  },
  {
    "id": "haiku-5-5",
    "date": "2026-10-07",
    "title": "Claude Haiku 5.5：更低成本的 Agent 子任务",
    "company": "Anthropic",
    "kind": "模型发布",
    "tracks": [
      "models"
    ],
    "summary": "Anthropic 发布 Haiku 5.5，面向摘要、上下文压缩、分类、浏览器操作等高频任务，并首次为 Haiku 档提供可调推理强度。",
    "significance": "低成本模型更明确地承担多 Agent 系统中的局部工作。",
    "limitation": "速度和平均成本改善属于厂商统计；新分词器、输入长度和推理设置会影响实际账单，不应只比较 token 单价。",
    "entityIds": [
      "claude"
    ],
    "sourceIds": [
      "gap-haiku-5-5"
    ],
    "tags": [
      "低成本",
      "子 Agent",
      "可调推理"
    ],
    "milestone": true,
    "change": {
      "baseline": "Claude Haiku 4.5",
      "improvements": [
        "Haiku 档首次加入可调推理强度",
        "强化高频摘要、压缩、分类与浏览器任务，适合作为子 Agent"
      ],
      "tradeoffs": "速度和平均成本改善属于厂商统计；新分词器、输入长度和推理设置会影响实际账单，不应只比较 token 单价。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-haiku-5-5"
      ],
      "baselineEventId": "haiku-4-5"
    }
  },
  {
    "id": "muse-wonder",
    "date": "2026-10-12",
    "title": "Muse Wonder 与 Wonder Full 发布",
    "company": "Meta",
    "kind": "模型发布",
    "tracks": [
      "models"
    ],
    "summary": "Meta 发布 Muse Wonder 与 Wonder Full，围绕 Active Memory、Active Focus 和长程编程任务提升个人与专业 Agent 能力。",
    "significance": "模型能力开始显式围绕跨会话记忆和持续完成目标组织。",
    "limitation": "发布时 Wonder 可通过 Meta Model API 与 Muse Code 使用，Full 面向 Muse Code 订阅用户；Muse 消费应用的后续接入不能写成当日全面完成。",
    "entityIds": [
      "muse-models"
    ],
    "sourceIds": [
      "gap-muse-wonder"
    ],
    "tags": [
      "长期记忆",
      "长任务",
      "编程"
    ],
    "milestone": true,
    "change": {
      "baseline": "此前 Muse Spark 模型路线",
      "improvements": [
        "以 Active Memory 处理跨会话的相关上下文",
        "以 Active Focus 与长程编程训练支持持续完成目标"
      ],
      "tradeoffs": "发布时 Wonder 可通过 Meta Model API 与 Muse Code 使用，Full 面向 Muse Code 订阅用户；Muse 消费应用的后续接入不能写成当日全面完成。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-muse-wonder"
      ]
    },
    "details": [
      {
        "label": "记忆与持续执行",
        "text": "Active Memory 指跨会话保留并检索相关上下文；Active Focus 指尝试替代方案、处理阻碍并持续推进目标。二者是官方描述的能力方向，不是所有任务都能成功的保证。",
        "sourceIds": [
          "gap-muse-wonder"
        ],
        "locator": "Active Memory; Active Focus"
      },
      {
        "label": "发布时可用的入口",
        "text": "Wonder 通过 Meta Model API 和 Muse Code 提供，Wonder Full 面向 Muse Code 订阅用户。Muse 消费应用接入属于公告中的后续计划。",
        "sourceIds": [
          "gap-muse-wonder"
        ],
        "locator": "Opening availability, paragraphs 2–3"
      }
    ]
  },
  {
    "id": "gemini-4-argon-ga",
    "date": "2026-10-13",
    "title": "Gemini 4 Argon 扩展公开可用",
    "company": "Google",
    "kind": "公开可用范围扩展",
    "tracks": [
      "models"
    ],
    "summary": "Gemini 4 Argon 开始通过 API、Gemini 应用、AI Mode 与 Antigravity 等渠道向开发者、企业及符合订阅条件的用户开放。",
    "significance": "此前受限的新一代模型进入更广泛的产品与开发工作流。",
    "limitation": "这是可获得性扩展，不是首次公布。不同入口有套餐和资格要求；100 万 token 是统一输入输出上限，不宜简写成所有产品均有相同上下文额度。",
    "entityIds": [
      "gemini"
    ],
    "sourceIds": [
      "gap-gemini-4-argon-ga",
      "gap-gemini-4-argon-preview"
    ],
    "tags": [
      "API",
      "专业工作",
      "分阶段部署"
    ],
    "milestone": true,
    "change": {
      "baseline": "Gemini 4 Argon 的受限开放",
      "improvements": [
        "从受信任访问扩展到开发者、企业与符合订阅条件的用户",
        "通过 API、Gemini 应用、AI Mode 与 Antigravity 提供访问"
      ],
      "tradeoffs": "这是可获得性扩展，不是首次公布。不同入口有套餐和资格要求；100 万 token 是统一输入输出上限，不宜简写成所有产品均有相同上下文额度。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-gemini-4-argon-ga"
      ],
      "baselineEventId": "gemini-4-argon-preview"
    },
    "details": [
      {
        "label": "同一模型的开放阶段",
        "text": "9 月 30 日先向 Fairwind Program 的受信任网络防御人员推出；10 月 13 日扩展至公开渠道。这两个节点记录部署阶段，而非两代模型。",
        "sourceIds": [
          "gap-gemini-4-argon-preview",
          "gap-gemini-4-argon-ga"
        ],
        "locator": "Preview announcement; GA announcement → Get started today"
      },
      {
        "label": "不同渠道的可用条件",
        "text": "API 面向开发者与企业；Antigravity 对应 Google AI Ultra，Gemini 应用与 AI Mode 对应 Ultra 和 Pro。这里记录发布时的开放范围，不保证所有入口额度相同。",
        "sourceIds": [
          "gap-gemini-4-argon-ga"
        ],
        "locator": "Opening announcement; Get started today"
      }
    ]
  },
  {
    "id": "muse-spark-open",
    "date": "2026-10-15",
    "title": "Muse Spark Open 正式开放权重",
    "company": "Meta",
    "kind": "权重开放",
    "tracks": [
      "models"
    ],
    "summary": "Meta 发布 Muse Spark Open 权重，提供原生多模态、100 万 token 上下文与面向编程和 Agent 的自部署选择。",
    "significance": "Meta 的新模型路线重新扩展到可下载、可在本地或云端运行的权重。",
    "limitation": "采用带有限商业条款的 Muse Model License，不是无条件开源；官方 Hugging Face 仓库需登录并审阅访问条件。本次只核对公开文件元数据，未下载或运行权重。桌面演示依赖特定高内存硬件，不能推广到普通电脑。",
    "entityIds": [
      "muse-models"
    ],
    "sourceIds": [
      "gap-muse-spark-open",
      "muse-spark-open-model-card",
      "muse-spark-open-files"
    ],
    "tags": [
      "开放权重",
      "多模态",
      "自部署"
    ],
    "milestone": true,
    "change": {
      "baseline": "Muse Spark 系列的托管访问",
      "improvements": [
        "发布受许可与访问条件约束的权重，增加自部署选择",
        "提供原生多模态、100 万 token 上下文与编程、Agent 能力"
      ],
      "tradeoffs": "采用带有限商业条款的 Muse Model License，不是无条件开源；官方 Hugging Face 仓库需登录并审阅访问条件。本次只核对公开文件元数据，未下载或运行权重。桌面演示依赖特定高内存硬件，不能推广到普通电脑。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-muse-spark-open"
      ]
    },
    "details": [
      {
        "label": "部署方式的变化",
        "text": "官方公告提供权重与合作方托管 API。官方 Hugging Face 文件树可见权重分片元数据，但明确标为 Gated model：未获访问权限时可列文件、不可读取文件。本次没有申请权限、下载或运行权重；自部署仍需满足访问、许可、框架和硬件条件。",
        "sourceIds": [
          "gap-muse-spark-open",
          "muse-spark-open-model-card",
          "muse-spark-open-files"
        ],
        "locator": "Opening announcement; Get Started; file tree gated access notice"
      },
      {
        "label": "开放权重不等于无条件开源",
        "text": "权重采用 Muse Model License，并带有限商业条款；官方桌面演示依赖两台高内存 Mac Studio，不是普通电脑的最低配置承诺。",
        "sourceIds": [
          "gap-muse-spark-open"
        ],
        "locator": "Optimized for Apple Silicon; License"
      }
    ]
  },
  {
    "id": "minimax-m3-1-flash",
    "date": "2026-10-19",
    "title": "MiniMax M3.1 Flash：低成本多模态 Agent 模型",
    "company": "MiniMax",
    "kind": "模型发布",
    "tracks": [
      "models"
    ],
    "summary": "MiniMax 发布 M3.1 Flash，提供文本、图像和视频输入及 100 万 token 上下文，接入 API、M Plan 与 MiniMax Code。",
    "significance": "多模态长任务模型继续在能力、响应速度与运行成本之间寻找更低门槛。",
    "limitation": "本条是 API 与产品发布；权重于 10 月 23 日另行开放。价格与能力比较应保留各自条件，不能按单一分数概括。",
    "entityIds": [
      "minimax"
    ],
    "sourceIds": [
      "gap-minimax-m3-1-flash",
      "gap-minimax-m31f-card"
    ],
    "tags": [
      "多模态",
      "长上下文",
      "低成本"
    ],
    "milestone": true,
    "change": {
      "baseline": "MiniMax M3",
      "improvements": [
        "官方报告 Agent、编程与电脑使用表现改善",
        "通过更稀疏的推理优化响应速度与任务成本"
      ],
      "tradeoffs": "本条是 API 与产品发布；权重于 10 月 23 日另行开放。价格与能力比较应保留各自条件，不能按单一分数概括。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-minimax-m3-1-flash",
        "gap-minimax-m31f-card"
      ],
      "baselineEventId": "minimax-m3"
    }
  },
  {
    "id": "minimax-m3-1-flash-weights",
    "date": "2026-10-23",
    "title": "MiniMax M3.1 Flash 权重开放",
    "company": "MiniMax",
    "kind": "权重开放",
    "tracks": [
      "models"
    ],
    "summary": "MiniMax 在官方模型仓库发布 M3.1 Flash 权重，提供可下载的模型文件与部署说明。",
    "significance": "在 API 上线之外，为自部署和进一步研究提供实际可获得的权重。",
    "limitation": "日期由官方仓库初始提交历史确认，不从模型名称推断。许可为 minimax-community，不能写成无条件开源；较大的权重文件仍要求相应硬件。",
    "entityIds": [
      "minimax"
    ],
    "sourceIds": [
      "gap-minimax-m3-1-flash-weights",
      "gap-minimax-m31f-card",
      "gap-minimax-m3-1-flash"
    ],
    "tags": [
      "开放权重",
      "自部署"
    ],
    "milestone": false,
    "change": {
      "baseline": "MiniMax M3.1 Flash API 与产品发布",
      "improvements": [
        "发布可下载模型权重与部署说明",
        "把已上线的模型扩展到自部署场景，不是新一代模型"
      ],
      "tradeoffs": "日期由官方仓库初始提交历史确认，不从模型名称推断。许可为 minimax-community，不能写成无条件开源；较大的权重文件仍要求相应硬件。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-minimax-m3-1-flash-weights",
        "gap-minimax-m31f-card"
      ],
      "baselineEventId": "minimax-m3-1-flash"
    },
    "details": [
      {
        "label": "模型卡的运行条件",
        "text": "模型卡列出文本、图像和视频输入与最长 100 万 token 上下文；实际可用长度、吞吐和第三方量化结果受显存与部署配置影响。",
        "sourceIds": [
          "gap-minimax-m31f-card"
        ],
        "locator": "Model at a Glance; Evaluation Notes; Inference Settings"
      },
      {
        "label": "API 与权重分开记录",
        "text": "10 月 19 日公告说明 API、M Plan 和 MiniMax Code 已上线，但权重将随后发布。官方模型仓库在 10 月 23 日的初始提交提供了实际权重。",
        "sourceIds": [
          "gap-minimax-m3-1-flash",
          "gap-minimax-m3-1-flash-weights",
          "gap-minimax-m31f-card"
        ],
        "locator": "Blog availability; commit history → Oct 23 → Init; Files"
      }
    ]
  },
  {
    "id": "tencent-hy-nomas",
    "date": "2026-10-23",
    "title": "Hy-Nomas：可交互的视频世界模型",
    "company": "腾讯",
    "kind": "模型与权重开放",
    "tracks": [
      "models"
    ],
    "summary": "腾讯开放 Hy-Nomas 模型与代码，支持多轮文本指令和镜头控制，并以持续上下文衔接生成的视频片段。",
    "significance": "世界模型从一次性视频生成向可持续交互与控制的环境演进。",
    "limitation": "日期由官方权重仓库初始提交确认；技术报告仍待发布。24 FPS 是输出播放帧率，不是实时生成速度；单张 RTX 4090 运行需特定低内存配置。",
    "entityIds": [
      "hunyuan"
    ],
    "sourceIds": [
      "gap-tencent-hy-nomas",
      "gap-hy-nomas-date",
      "gap-hy-nomas-code"
    ],
    "tags": [
      "世界模型",
      "交互视频",
      "开放权重"
    ],
    "milestone": true,
    "change": {
      "baseline": "单段视频生成与交互世界生成任务",
      "improvements": [
        "支持多轮文本指令和镜头控制",
        "通过持续 KV 上下文衔接视频片段，并开放模型和代码"
      ],
      "tradeoffs": "日期由官方权重仓库初始提交确认；技术报告仍待发布。24 FPS 是输出播放帧率，不是实时生成速度；单张 RTX 4090 运行需特定低内存配置。",
      "evidence": "厂商报告",
      "sourceIds": [
        "gap-tencent-hy-nomas",
        "gap-hy-nomas-date",
        "gap-hy-nomas-code"
      ]
    },
    "details": [
      {
        "label": "架构与许可边界",
        "text": "模型按片段自回归地生成视频，以扩散 Transformer、文本编码器和视频解码器组合工作。主体采用 Apache-2.0，第三方模型与组件仍遵循各自许可。",
        "sourceIds": [
          "gap-tencent-hy-nomas"
        ],
        "locator": "Model Architecture; License"
      },
      {
        "label": "视频规格与运行边界",
        "text": "模型卡中的 24 FPS 是生成视频的播放规格，不能据此宣称实时生成。单卡 RTX 4090 方案依赖量化、KV 缓存配置和 CPU 卸载；技术报告仍待发布。",
        "sourceIds": [
          "gap-tencent-hy-nomas",
          "gap-hy-nomas-code"
        ],
        "locator": "Model Introduction; Single-GPU Low-Memory Inference; Runtime Considerations; code README → Technical Report (Coming Soon)"
      }
    ]
  }
];

// Later availability/access clauses need their own evidence, not only the first announcement.
for (const [id, sourceIds] of [
  ['gemini-4-argon-preview', ['gap-gemini-4-argon-ga']],
  ['minimax-m3-1-flash', ['gap-minimax-m3-1-flash-weights']],
  ['muse-spark-open', ['muse-spark-open-model-card', 'muse-spark-open-files']],
] as const) {
  const event = verified2026Events.find(item => item.id === id)!;
  event.sourceIds = [...new Set([...event.sourceIds, ...sourceIds])];
  if (event.change) event.change.sourceIds = [...new Set([...event.change.sourceIds, ...sourceIds])];
}
