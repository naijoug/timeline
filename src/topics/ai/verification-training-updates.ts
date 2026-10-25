import type { Entity, Source, TimelineEvent } from "./types";

// Verified 2026-10-25: report/GA dates, not a new foundation-model release.

export const verificationTrainingSources: Source[] = [
  {
    "id": "anthropic-formal-verification-report",
    "title": "LLMs are making formal software verification feasible at a much larger scale",
    "publisher": "Anthropic",
    "url": "https://www.anthropic.com/research/formal-verification",
    "type": "工程文章",
    "publishedAt": "2026-10-22",
    "checkedAt": "2026-10-25",
    "locator": "Publication; Introduction; Limitations"
  },
  {
    "id": "theorem-oss-verify-proofs",
    "title": "OSS Verify: proofs about OSS-Fuzz fuzz targets",
    "publisher": "Theorem",
    "url": "https://github.com/theorem-labs/oss-verify-proofs",
    "type": "官方文档",
    "checkedAt": "2026-10-25",
    "locator": "README: 60 entry points in 25 libraries; What a proof does not say"
  },
  {
    "id": "theorem-linux-process-semantics",
    "title": "A Rocq model of a Linux process that runs a RISC-V binary",
    "publisher": "Theorem",
    "url": "https://github.com/theorem-labs/rocq-linux-process-semantics",
    "type": "官方文档",
    "checkedAt": "2026-10-25",
    "locator": "README; model and assumptions"
  },
  {
    "id": "aws-training-sessions-ga",
    "title": "Announcing new ways to customize models with SageMaker AI, without managing GPUs",
    "publisher": "AWS",
    "url": "https://aws.amazon.com/blogs/machine-learning/announcing-new-ways-to-customize-models-with-sagemaker-ai-without-managing-gpus/",
    "type": "官方公告",
    "publishedAt": "2026-10-22",
    "checkedAt": "2026-10-25",
    "locator": "Publication; general availability launch of training sessions; How it works"
  },
  {
    "id": "aws-training-sessions-docs",
    "title": "Training session APIs - Amazon SageMaker AI",
    "publisher": "AWS",
    "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/customizing-models-training-sessions.html",
    "type": "官方文档",
    "checkedAt": "2026-10-25",
    "locator": "Note; Key differentiators; Supported models, pricing, and Regions"
  }
];

export const verificationTrainingEntities: Entity[] = [
  {
    "id": "aws-sagemaker-training-sessions",
    "name": "SageMaker AI Training Sessions",
    "type": "product",
    "company": "AWS",
    "description": "由开发者编排后训练操作、由服务托管GPU执行的会话式接口。",
    "tags": [
      "后训练",
      "云服务"
    ],
    "sourceIds": [
      "aws-training-sessions-ga",
      "aws-training-sessions-docs"
    ]
  },
  {
    "id": "formal-software-verification",
    "name": "软件形式化验证",
    "type": "concept",
    "description": "以明确的规范和系统模型构造机器可检查的证明；证明的结论只在声明的性质、输入范围与假设下成立。",
    "tags": [
      "形式化方法",
      "证明",
      "软件工程"
    ],
    "sourceIds": [
      "anthropic-formal-verification-report",
      "theorem-oss-verify-proofs",
      "theorem-linux-process-semantics"
    ]
  }
];

export const verificationTrainingEvents: TimelineEvent[] = [
  {
    "id": "anthropic-theorem-formal-verification",
    "date": "2026-10-22",
    "dateLabel": "2026年10月22日（研究报告发布）",
    "title": "Anthropic 与 Theorem 展示大规模软件形式化验证",
    "company": "Anthropic / Theorem",
    "kind": "研究与证明公开",
    "tracks": [
      "methods",
      "history"
    ],
    "summary": "Anthropic 与 Theorem 报告利用 Claude 为真实开源软件的选定编译产物生成形式化证明，并公开部分证明与系统语义模型供检查。",
    "significance": "编辑解读：AI 编程从生成与测试代码进一步延伸到构造可由独立检查器检验的证明。",
    "limitation": "报告中的123个库研究范围不等于公开仓库的25个库、60个入口。证明只覆盖明确性质和系统假设，不能宣称软件完全无漏洞。",
    "entityIds": [
      "formal-software-verification"
    ],
    "sourceIds": [
      "anthropic-formal-verification-report",
      "theorem-oss-verify-proofs",
      "theorem-linux-process-semantics"
    ],
    "tags": [
      "形式化验证",
      "软件工程",
      "Rocq",
      "研究报告"
    ],
    "milestone": true,
    "details": [
      {
        "label": "研究与公开材料分开",
        "text": "Anthropic 报告研究涉及123个开源库；2026年10月25日核查的公开证明仓库列出25个库的60个入口，是可检查的子集，不是全部实验材料，也不是每个库的所有功能。",
        "sourceIds": [
          "anthropic-formal-verification-report",
          "theorem-oss-verify-proofs"
        ],
        "locator": "Introduction; repository README"
      },
      {
        "label": "证明范围与可信基础",
        "text": "主要实验针对单线程、静态链接的 RISC-V/Linux 编译产物，并限定输入和内存条件。Rocq 检查的是指定定理；系统语义、定理是否贴合真实部署仍需要审查。",
        "sourceIds": [
          "anthropic-formal-verification-report",
          "theorem-linux-process-semantics"
        ],
        "locator": "Limitations; formal model"
      },
      {
        "label": "编辑解读：验证主张也要有边界",
        "text": "把“模型声称代码正确”和“检查器接受了某个性质的证明”分开，再追问该性质是否覆盖自己的运行环境，比一句“AI 已证明没有 bug”更有用。",
        "sourceIds": [
          "anthropic-formal-verification-report",
          "theorem-oss-verify-proofs"
        ],
        "editorial": true,
        "locator": "编辑归纳，非全面安全认证"
      }
    ],
    "recommendedResources": [
      {
        "id": "oss-verify-public-proofs",
        "title": "OSS Verify: proofs about OSS-Fuzz fuzz targets",
        "creator": "Theorem",
        "series": "GitHub · OSS Verify",
        "url": "https://github.com/theorem-labs/oss-verify-proofs",
        "kind": "article",
        "match": "直接查看哪些入口和性质获得公开证明，以及证明不涵盖什么。",
        "scopeNote": "已核验README；未下载执行或独立重跑证明检查。",
        "checkedAt": "2026-10-25",
        "locator": "README; What a proof does not say"
      }
    ]
  },
  {
    "id": "aws-sagemaker-training-sessions-ga",
    "date": "2026-10-22",
    "dateLabel": "2026年10月22日（正式可用公告）",
    "title": "SageMaker AI Training Sessions 正式可用",
    "company": "AWS",
    "kind": "平台正式可用",
    "tracks": [
      "methods"
    ],
    "summary": "AWS 将可编排训练循环的 Training Sessions 推向正式可用，让开发者控制后训练步骤，由服务管理 GPU 与分布式执行。",
    "significance": "编辑解读：后训练平台在托管基础设施与保留算法控制之间提供更细粒度的接口。",
    "limitation": "不是新基础模型，也不是无需编程的一键训练。支持模型、区域和配额有边界；公告与文档列出的模型清单并不完全一致，应在使用前核对。",
    "entityIds": [
      "aws-sagemaker-training-sessions"
    ],
    "sourceIds": [
      "aws-training-sessions-ga",
      "aws-training-sessions-docs"
    ],
    "tags": [
      "后训练",
      "强化学习",
      "云服务",
      "正式可用"
    ],
    "milestone": false,
    "details": [
      {
        "label": "训练逻辑与基础设施分工",
        "text": "开发者通过 Python 驱动采样、梯度计算和参数更新等操作，自行设计损失或奖励；服务处理 GPU 分配、分布式执行和状态管理。",
        "sourceIds": [
          "aws-training-sessions-ga",
          "aws-training-sessions-docs"
        ],
        "locator": "How it works; Training session APIs"
      },
      {
        "label": "可用性与费用边界",
        "text": "文档按模型列出可用区域，并区分输入处理、采样和训练计费。正式可用不代表所有区域、所有模型都可用，也不代表免费训练。",
        "sourceIds": [
          "aws-training-sessions-docs"
        ],
        "locator": "Supported models, pricing, and Regions"
      },
      {
        "label": "编辑解读：托管不替代评估",
        "text": "减少集群管理负担后，数据质量、奖励设计与验证仍由开发团队负责。选型应同时比较可控性、费用和任务评估，而不只看是否免管 GPU。",
        "sourceIds": [
          "aws-training-sessions-ga",
          "aws-training-sessions-docs"
        ],
        "editorial": true,
        "locator": "编辑归纳"
      }
    ],
    "recommendedResources": [
      {
        "id": "aws-training-sessions-api-reading",
        "title": "Training session APIs",
        "creator": "AWS",
        "series": "Amazon SageMaker AI 文档",
        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/customizing-models-training-sessions.html",
        "kind": "article",
        "match": "理解训练循环控制与托管GPU的分工，并核对模型、区域及计费维度。",
        "scopeNote": "已核验文档；未创建云资源或进行付费测试。",
        "checkedAt": "2026-10-25",
        "locator": "Training session APIs; Supported models, pricing, and Regions"
      }
    ]
  }
];
