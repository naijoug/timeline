import type { Source, TimelineEvent } from "./types";

export const containmentSources: Source[] = [
  {
    "id": "openai-frontier-containment-report",
    "title": "Securing our frontier model training environment",
    "publisher": "OpenAI",
    "url": "https://openai.com/index/securing-our-frontier-model-training-environment/",
    "type": "工程文章",
    "checkedAt": "2026-10-24",
    "publishedAt": "2026-10-23",
    "locator": "Publication date; opening scope; Our new approach to model containment; Resuming frontier training with stronger defenses"
  }
];

export const containmentEvents: TimelineEvent[] = [
  {
    "id": "openai-frontier-containment-report",
    "date": "2026-10-23",
    "dateLabel": "2026年10月23日（报告发布）",
    "title": "OpenAI 公布前沿训练环境隔离与红队报告",
    "company": "OpenAI",
    "kind": "安全工程报告",
    "tracks": [
      "history"
    ],
    "summary": "OpenAI 说明其研究环境的隔离强化与持续红队安排，并回顾此前暂停及恢复前沿训练的过程。",
    "significance": "编辑解读：模型安全不仅关乎回答内容，也依赖权限边界、运行环境和持续验收。",
    "limitation": "这是厂商对内部研究环境的公开说明，不等同独立安全认证，也不能据此断言已发布产品发生同类事件。",
    "entityIds": [
      "ai-evaluation"
    ],
    "sourceIds": [
      "openai-frontier-containment-report"
    ],
    "tags": [
      "AI安全",
      "工程",
      "红队",
      "运行环境"
    ],
    "milestone": true,
    "details": [
      {
        "label": "公开日期与内部时间线",
        "text": "报告发表于10月23日。据OpenAI自述，9月20日内部事件后暂停最强模型的训练与评估；强化措施后，于10月1日恢复前沿强化学习训练与内部推理。",
        "sourceIds": [
          "openai-frontier-containment-report"
        ],
        "locator": "Opening summary; Resuming frontier training with stronger defenses"
      },
      {
        "label": "工程措施与边界",
        "text": "报告介绍离线交互环境、分层隔离、监测和自动停止，并将高算力红队纳入安全论证。它仍预期未来模型可能发现未知弱点，因此不是“一次修复即可永久安全”的结论。",
        "sourceIds": [
          "openai-frontier-containment-report"
        ],
        "locator": "Our new approach to model containment; Resuming frontier training with stronger defenses"
      },
      {
        "label": "编辑解读：把能力与权限分开",
        "text": "阅读这份报告时，可把模型能完成什么、系统允许它接触什么、异常能否被发现并停止分开考察。对Agent产品而言，改进能力不能替代最小权限和隔离验收。",
        "sourceIds": [
          "openai-frontier-containment-report"
        ],
        "locator": "编辑归纳，非独立认证结论",
        "editorial": true
      }
    ],
    "recommendedResources": [
      {
        "id": "openai-containment-engineering-reading",
        "title": "Securing our frontier model training environment",
        "creator": "OpenAI",
        "series": "OpenAI · Security",
        "url": "https://openai.com/index/securing-our-frontier-model-training-environment/",
        "kind": "article",
        "match": "了解训练环境隔离、监测与持续红队的工程边界。",
        "scopeNote": "已核验原文；厂商自述，不作为独立认证或客户产品事故证明。",
        "checkedAt": "2026-10-24",
        "publishedAt": "2026-10-23",
        "locator": "Our new approach to model containment; Resuming frontier training with stronger defenses"
      }
    ]
  }
];
