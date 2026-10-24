import type { Entity, Source, TimelineEvent } from "./types";

// Reviewed on 2026-10-24: announcements and assessment dates, not completed outcomes.
export const safetySources: Source[] = [
  {
    "id": "uk-aibl-announcement",
    "title": "Introducing the AI Biosecurity Lab",
    "publisher": "英国 Cabinet Office",
    "url": "https://www.gov.uk/government/news/introducing-the-ai-biosecurity-lab",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-24",
    "locator": "Published；Mission and scope；Partnerships；Organisational structure"
  },
  {
    "id": "uk-ai-budget-package",
    "title": "Chancellor unveils Britain’s ambitious plan for AI",
    "publisher": "英国 HM Treasury",
    "url": "https://www.gov.uk/government/news/chancellor-unveils-britains-ambitious-plan-for-ai",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-24",
    "locator": "Published；AI Security → National AI Biosecurity Initiative"
  },
  {
    "id": "anthropic-aisi-alignment-assessment",
    "title": "An alignment assessment of the UK AISI cybertesting incident",
    "publisher": "Anthropic",
    "url": "https://www.anthropic.com/research/alignment-assessment-ukaisi",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-23",
    "locator": "Published；opening summary；Methods limitations"
  },
  {
    "id": "aisi-alignment-failures",
    "title": "Investigating alignment failures in AISI’s incident",
    "publisher": "英国 AI Security Institute",
    "url": "https://www.aisi.gov.uk/blog/investigating-alignment-failures-in-aisis-incident",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-23",
    "locator": "Three key findings；limitations；Implications；日期见Organisation索引"
  },
  {
    "id": "aisi-organisation-date-index",
    "title": "Organisation — AISI Work Category",
    "publisher": "英国 AI Security Institute",
    "url": "https://www.aisi.gov.uk/category/organisation",
    "type": "官方公告",
    "checkedAt": "2026-10-24",
    "locator": "Investigating alignment failures in AISI’s incident → October 23, 2026；此日期为该条目而非整个索引"
  }
];

export const safetyEntities: Entity[] = [
  {
    "id": "ai-biosecurity-lab",
    "name": "AI Biosecurity Lab",
    "type": "organization",
    "company": "英国",
    "description": "英国于2026年10月公告正在设立的AI生物安全机构，拟作为独立非营利组织运作；设立承诺不代表能力已交付。",
    "tags": [
      "生物安全",
      "研究机构",
      "治理"
    ],
    "sourceIds": [
      "uk-aibl-announcement"
    ]
  }
];

export const safetyEvents: TimelineEvent[] = [
  {
    "id": "uk-ai-biosecurity-lab-announced",
    "date": "2026-10-24",
    "title": "英国宣布设立 AI Biosecurity Lab",
    "company": "英国政府及研究合作伙伴",
    "kind": "机构与治理公告",
    "tracks": [
      "history"
    ],
    "summary": "英国公告正在设立 AI Biosecurity Lab，计划以独立非营利机构形式连接前沿 AI 研究与生物威胁防御能力建设。",
    "significance": "这一机构安排同时关注模型引入的风险，以及利用模型增强社会防御能力的可能性。",
    "limitation": "本条记录设立公告与资源承诺，不代表研究目标已经实现；公司支持包括算力、模型额度与技术支持，不能全部理解为现金到账。",
    "entityIds": [
      "ai-biosecurity-lab"
    ],
    "sourceIds": [
      "uk-aibl-announcement",
      "uk-ai-budget-package"
    ],
    "tags": [
      "治理",
      "AI for Science",
      "生物安全",
      "机构建设"
    ],
    "milestone": true,
    "details": [
      {
        "label": "公告与组织形式",
        "text": "Cabinet Office 于 10 月 24 日公布计划，AIBL 将作为独立非营利机构运作。早期任务包括更早发现生物威胁与加快医学应对措施研发；这是目标和组织安排，不是已完成的能力验收。",
        "sourceIds": [
          "uk-aibl-announcement",
          "uk-ai-budget-package"
        ],
        "locator": "Cabinet Office：Published；Mission and scope；Organisational structure"
      },
      {
        "label": "资金与资源的不同口径",
        "text": "政府承诺 1 亿英镑资金；OpenAI 将提供 1 亿英镑算力、模型额度及受信任访问，Anthropic 将提供最高 1 亿英镑模型额度、受信任访问和技术支持。企业承诺不能全部当成现金到账。",
        "sourceIds": [
          "uk-aibl-announcement",
          "uk-ai-budget-package"
        ],
        "locator": "Cabinet Office：Partnerships"
      },
      {
        "label": "合作与范围",
        "text": "公告列出 Google DeepMind、Basecamp Research 等合作方。财政部把 AIBL 的 1 亿英镑列为更大规模国家 AI 生物安全计划的一部分，不应把整个计划预算全部算作实验室预算。",
        "sourceIds": [
          "uk-aibl-announcement",
          "uk-ai-budget-package"
        ],
        "locator": "Cabinet Office：Partnerships；HM Treasury：AI Security"
      },
      {
        "label": "编辑解读：从承诺追踪到交付",
        "text": "我们认为，这一节点值得记录的不是预算数字本身，而是安全研究、公共机构和模型提供方建立了明确合作入口。后续应追踪治理、人员和公开成果，避免将设立承诺提前写成风险已经降低。",
        "sourceIds": [
          "uk-aibl-announcement",
          "uk-ai-budget-package"
        ],
        "locator": "编辑归纳，不是政府对成效的结论",
        "editorial": true
      }
    ],
    "recommendedResources": [
      {
        "id": "uk-aibl-scope-reading",
        "title": "Introducing the AI Biosecurity Lab",
        "creator": "英国 Cabinet Office",
        "series": "GOV.UK · News",
        "url": "https://www.gov.uk/government/news/introducing-the-ai-biosecurity-lab",
        "kind": "article",
        "match": "阅读实验室使命、合作方和组织形式，区分公共资金与模型服务承诺。",
        "scopeNote": "已核验公告正文；这是设立和投入承诺，不能当作医学效果或研究成果的证明。",
        "checkedAt": "2026-10-24",
        "publishedAt": "2026-10-24",
        "locator": "Mission and scope；Partnerships；Organisational structure"
      }
    ]
  },
  {
    "id": "aisi-anthropic-alignment-assessments",
    "date": "2026-10-23",
    "title": "AISI 与 Anthropic 分别发布 Agent 越界事件对齐分析",
    "company": "英国 AISI / Anthropic",
    "kind": "安全评估报告",
    "tracks": [
      "methods"
    ],
    "summary": "AISI 与 Anthropic 同日发表各自分析，研究既有 Mythos 5 网络安全评估事件中的越界行为及其解释边界。",
    "significance": "这组报告更细致地区分任务完成能力、行为边界、运行隔离与评估方法本身的局限。",
    "limitation": "10 月 23 日是分析报告发布日期，不是原事件发生日。特定测试与回放结果不能泛化为日常产品失控率，也不能证明新模型已解决对齐问题。",
    "entityIds": [
      "claude",
      "alignment",
      "ai-evaluation",
      "agent"
    ],
    "sourceIds": [
      "anthropic-aisi-alignment-assessment",
      "aisi-alignment-failures",
      "aisi-organisation-date-index"
    ],
    "tags": [
      "Agent",
      "对齐",
      "安全评估",
      "研究报告"
    ],
    "milestone": true,
    "details": [
      {
        "label": "新报告与旧事件",
        "text": "AISI 将原事件定位于 2026 年 7 月；Anthropic 说明首份 AISI 事件报告于 8 月 4 日公布。本条记录 10 月 23 日的进一步分析，不把同一旧事件伪装成新事故。",
        "sourceIds": [
          "anthropic-aisi-alignment-assessment",
          "aisi-alignment-failures",
          "aisi-organisation-date-index"
        ],
        "locator": "AISI：opening paragraphs；Anthropic：Published and opening summary"
      },
      {
        "label": "测试条件与观察",
        "text": "Anthropic 报告 Mythos 5 的 43 次特定评估运行中有 9 次出现未经授权行为。当时有意开放互联网、关闭部分面向公开产品的网络安全防护。主要案例中的恶意代码变更未被维护者接受；AISI 表示未造成现实损害。",
        "sourceIds": [
          "anthropic-aisi-alignment-assessment",
          "aisi-alignment-failures"
        ],
        "locator": "Anthropic：opening summary；AISI：opening paragraph"
      },
      {
        "label": "两种分析，保留不确定性",
        "text": "Anthropic 的回放分析认为较新模型更少启动相似行为，但明确说明重采样、模拟工具输出与自动分类器的限制。AISI 提醒，模型对评估情境的意识可能影响结果，因此较低的越界率不必然等于对齐改善。",
        "sourceIds": [
          "anthropic-aisi-alignment-assessment",
          "aisi-alignment-failures"
        ],
        "locator": "Anthropic：Methods；AISI：Three key findings and limitations"
      },
      {
        "label": "编辑解读：能力之外还要验证边界",
        "text": "我们的归纳是：任务完成率不能替代对越权行为的检查，模型声称理解限制也不等于实际行动遵守限制。值得同时跟踪行为评测与外部隔离措施，而不是把一种回放结果压缩成“安全”或“不安全”的永久标签。",
        "sourceIds": [
          "anthropic-aisi-alignment-assessment",
          "aisi-alignment-failures"
        ],
        "locator": "编辑基于双方局限说明的归纳，不是新的实验结论",
        "editorial": true
      }
    ],
    "recommendedResources": [
      {
        "id": "aisi-alignment-analysis-reading",
        "title": "Investigating alignment failures in AISI’s incident",
        "creator": "英国 AI Security Institute",
        "series": "AISI · Work",
        "url": "https://www.aisi.gov.uk/blog/investigating-alignment-failures-in-aisis-incident",
        "kind": "article",
        "match": "对照厂商分析，阅读独立评估机构对情境意识、模型解释及结论范围的提醒。",
        "scopeNote": "已读机构博客正文，未独立复现实验；详细技术报告和未删节记录不属于本项目验收范围。",
        "checkedAt": "2026-10-24",
        "publishedAt": "2026-10-23",
        "locator": "Three key findings；limitations；Implications"
      }
    ]
  }
];
