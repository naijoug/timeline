import type { Source, TimelineEvent } from "../../core/types";

// Conservative citation repair: publication evidence must not masquerade as novel-text evidence.
export const liuAuditSources: Source[] = [
  {
    "id": "writers-angel-ethics-audit",
    "title": "刘慈欣《天使时代》中的伦理书写",
    "publisher": "余文菁 /《长江小说鉴赏》；中文科幻转载",
    "url": "https://www.chinasf.com/main/documentdetail.php?DocumentID=21113",
    "type": "学术评论",
    "checkedAt": "2026-10-26",
    "locator": "摘要及正文开头；用于剧情主题校正，评价为作者解读"
  },
  {
    "id": "writers-support-human-audit",
    "title": "刘慈欣《赡养人类》的叙事创新",
    "publisher": "徐彦利 /《新疆艺术（汉文）》2018年第4期；中文科幻转载",
    "url": "https://chinasf.com/main/documentdetail.php?DocumentID=5423&language=chinese_simplified&language=english",
    "type": "学术评论",
    "checkedAt": "2026-10-26",
    "locator": "正文情节概述；区分终产者、贫困人口与最低赡养标准"
  },
  {
    "id": "writers-liu-creation-road-audit",
    "title": "刘慈欣的科幻创作之路",
    "publisher": "中国科学技术出版社 · 来源标注科普社",
    "url": "https://www.cspbooks.com.cn/content/700",
    "type": "出版社评论",
    "checkedAt": "2026-10-26",
    "locator": "创作道路：鲸歌、微观尽头；创作观念末段：朝闻道。仅以明述情节为证，不照搬评论评价"
  },
  {
    "id": "writers-rural-teacher-audit",
    "title": "科幻作品中的教师形象——评刘慈欣《乡村教师》",
    "publisher": "付昌义 / 科普时报 · 中国科普网",
    "url": "https://www.zgkpw.org.cn/scifi/content_1751291.html",
    "type": "作品评论",
    "checkedAt": "2026-10-26",
    "locator": "2023-09-10；第3段情节概述"
  }
];

export const liuAuditPatches: Record<string, Partial<TimelineEvent>> = {
  "liu-cixin-whale-song": {
    "time": {
      "kind": "point",
      "start": {
        "year": 1999,
        "month": 6
      }
    },
    "summary": "科学家霍普金斯利用生物控制蓝鲸为毒枭运输毒品，技术能力被用于犯罪。",
    "significance": "编辑总结：可围绕“区分作者首次公开发表与唯一处女作”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology",
      "writers-liu-creation-road-audit"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》1999 年第 6 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 1999 年 6 月条下记录此作发表于《科幻世界》第 6 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "1999 年 6 月条"
      },
      {
        "label": "有界内容简介",
        "text": "出版社文章支持科学家操纵蓝鲸运毒的故事前提；旧版所写母鲸幼崽、良知觉醒与自毁程序没有对应依据，已撤下。",
        "sourceIds": [
          "writers-liu-creation-road-audit"
        ],
        "locator": "对应作品讨论段"
      },
      {
        "label": "首次发表不是单篇独占",
        "text": "年谱记载《鲸歌》与《微观尽头》同在 1999 年第 6 期刊出；因此不把《鲸歌》单独称作唯一的首次发表作品。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "1999 年 6 月条"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注区分作者首次公开发表与唯一处女作。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "期刊年月据年谱；本页内容提要仅限出版社文章明确介绍的情节，不据评论补写具体结局。编辑阅读问题与文献陈述分栏。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "刘慈欣"
    ]
  },
  "liu-cixin-micro-end": {
    "time": {
      "kind": "point",
      "start": {
        "year": 1999,
        "month": 6
      }
    },
    "summary": "粒子实验触发了宇宙景象的反转，把探索微观结构与观察宏观世界联系起来。这是小说设定，不是已证实的物理结论。",
    "significance": "编辑总结：可围绕“物理想象与科学论证的边界”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology",
      "writers-liu-creation-road-audit"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》1999 年第 6 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 1999 年 6 月条下记录此作发表于《科幻世界》第 6 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "1999 年 6 月条"
      },
      {
        "label": "有界内容简介",
        "text": "出版社概述了夸克受撞击后星空颜色反转、再次撞击后恢复的设定。这里不保留无支持的环赤道加速器规模，也不把故事中的解释当成科学事实。",
        "sourceIds": [
          "writers-liu-creation-road-audit"
        ],
        "locator": "对应作品讨论段"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注物理想象与科学论证的边界。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "期刊年月据年谱；本页内容提要仅限出版社文章明确介绍的情节，不据评论补写具体结局。编辑阅读问题与文献陈述分栏。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "理论物理",
      "刘慈欣"
    ]
  },
  "liu-cixin-earth-fire": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2000,
        "month": 2
      }
    },
    "summary": "刘慈欣的《地火》发表于《科幻世界》2000 年第 2 期。本节点记录期刊发表，不把后续选集、改编或获奖时间当作首发时间。",
    "significance": "编辑总结：可围绕“工程决策与技术风险”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2000 年第 2 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2000 年 2 月条下记录此作发表于《科幻世界》第 2 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2000 年 2 月条"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注工程决策与技术风险。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "本次核实了期刊年月；年谱不是小说全文，不能为具体人物行动、技术细节和结局背书。旧版无具体出处的剧情细节与宣传性评价暂撤，待可核读文本支持后补充。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "工业现实",
      "能源工程",
      "刘慈欣"
    ]
  },
  "liu-cixin-wandering-earth": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2000,
        "month": 7
      }
    },
    "summary": "刘慈欣的《流浪地球》发表于《科幻世界》2000 年第 7 期。本节点记录期刊发表，不把后续选集、改编或获奖时间当作首发时间。",
    "significance": "编辑总结：可围绕“灾难中的家园观念”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2000 年第 7 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      },
      {
        "label": "获奖记录",
        "text": "2001 年 8 月获 2000 年度中国科幻银河奖特等奖",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2000 年 7 月条下记录此作发表于《科幻世界》第 7 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2000 年 7 月条"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注灾难中的家园观念。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "本次核实了期刊年月；年谱不是小说全文，不能为具体人物行动、技术细节和结局背书。旧版无具体出处的剧情细节与宣传性评价暂撤，待可核读文本支持后补充。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "行星发动机",
      "太空史诗",
      "刘慈欣"
    ]
  },
  "liu-cixin-rural-teacher": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2001,
        "month": 1
      }
    },
    "summary": "一位乡村教师在生命最后阶段教孩子背下牛顿三定律；这些知识后来影响外星文明对地球的测试结果。",
    "significance": "编辑总结：可围绕“知识传递与文明延续”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology",
      "writers-rural-teacher-audit"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2001 年第 1 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      },
      {
        "label": "获奖记录",
        "text": "2002 年 7 月获 2001 年度中国科幻银河奖读者提名奖",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2001 年 1 月条下记录此作发表于《科幻世界》第 1 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2001 年 1 月条"
      },
      {
        "label": "内容提要与阅读边界",
        "text": "付昌义的评论介绍了乡村课堂与星际文明测试两条叙事线。这里概括知识传递的故事前提；测试机制属于小说设定，不是现实文明等级的科学标准。",
        "sourceIds": [
          "writers-rural-teacher-audit"
        ],
        "locator": "正文第3段"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注知识传递与文明延续。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "首发年月及读者提名奖据年谱；情节前提据付昌义具体评论，不把电影改编设定混入原作。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "牛顿定律",
      "文明传承",
      "刘慈欣"
    ]
  },
  "liu-cixin-full-spectrum": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2001,
        "month": 8
      }
    },
    "summary": "刘慈欣的《全频带阻塞干扰》发表于《科幻世界》2001 年第 8 期。本节点记录期刊发表，不把后续选集、改编或获奖时间当作首发时间。",
    "significance": "编辑总结：可围绕“通信技术与战争选择”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2001 年第 8 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      },
      {
        "label": "获奖记录",
        "text": "2002 年 7 月获 2001 年度中国科幻银河奖；不据此补写“特等奖”",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2001 年 8 月条下记录此作发表于《科幻世界》第 8 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2001 年 8 月条"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注通信技术与战争选择。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "本次核实了期刊年月；年谱不是小说全文，不能为具体人物行动、技术细节和结局背书。旧版无具体出处的剧情细节与宣传性评价暂撤，待可核读文本支持后补充。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "电子战",
      "太阳风暴",
      "刘慈欣"
    ]
  },
  "liu-cixin-morning-star": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2002,
        "month": 1
      }
    },
    "summary": "科学家面对以生命换取问题答案的选择，小说以此构造知识追求与个人代价之间的极端冲突。",
    "significance": "编辑总结：可围绕“知识追求的代价”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology",
      "writers-liu-creation-road-audit"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2002 年第 1 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      },
      {
        "label": "获奖记录",
        "text": "2003 年 7 月获 2002 年度中国科幻银河奖读者提名奖",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2002 年 1 月条下记录此作发表于《科幻世界》第 1 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2002 年 1 月条"
      },
      {
        "label": "有界内容简介",
        "text": "出版社评论明确讲述科学家向排险者提出问题、以生命交换真理的情节。该前提可以核对，至于是否赞颂这种选择，应留作阅读讨论而非定论。",
        "sourceIds": [
          "writers-liu-creation-road-audit"
        ],
        "locator": "对应作品讨论段"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注知识追求的代价。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "期刊年月据年谱；本页内容提要仅限出版社文章明确介绍的情节，不据评论补写具体结局。编辑阅读问题与文献陈述分栏。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "理论物理",
      "真理祭坛",
      "科学哲学",
      "刘慈欣"
    ]
  },
  "liu-cixin-earth-eye": {
    "time": {
      "kind": "point",
      "start": {
        "year": 1999,
        "month": 10
      }
    },
    "summary": "刘慈欣的《带上她的眼睛》发表于《科幻世界》1999 年第 10 期。本节点记录期刊发表，不把后续选集、改编或获奖时间当作首发时间。",
    "significance": "编辑总结：可围绕“感知技术与个体处境”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》1999 年第 10 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      },
      {
        "label": "获奖记录",
        "text": "2000 年 7 月获 1999 年度中国科幻银河奖一等奖",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 1999 年 10 月条下记录此作发表于《科幻世界》第 10 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "1999 年 10 月条"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注感知技术与个体处境。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "本次核实了期刊年月；年谱不是小说全文，不能为具体人物行动、技术细节和结局背书。旧版无具体出处的剧情细节与宣传性评价暂撤，待可核读文本支持后补充。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "地心",
      "语文教材",
      "刘慈欣"
    ]
  },
  "liu-cixin-micro-era": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2001,
        "month": 4
      }
    },
    "summary": "刘慈欣的《微纪元》发表于《科幻世界》2001 年第 4 期。本节点记录期刊发表，不把后续选集、改编或获奖时间当作首发时间。",
    "significance": "编辑总结：可围绕“尺度变化与生存方案”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2001 年第 4 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2001 年 4 月条下记录此作发表于《科幻世界》第 4 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2001 年 4 月条"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注尺度变化与生存方案。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "本次核实了期刊年月；年谱不是小说全文，不能为具体人物行动、技术细节和结局背书。旧版无具体出处的剧情细节与宣传性评价暂撤，待可核读文本支持后补充。 旧版所列本篇“银河奖”未找到对应获奖记录，已撤下；不把作者获奖经历转移到单篇作品。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "微纪元",
      "尺度奇观",
      "文明演化",
      "刘慈欣"
    ]
  },
  "liu-cixin-china-sun": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2002,
        "month": 1
      }
    },
    "summary": "刘慈欣的《中国太阳》发表于《科幻世界》2002 年第 1 期。本节点记录期刊发表，不把后续选集、改编或获奖时间当作首发时间。",
    "significance": "编辑总结：可围绕“劳动经验与太空想象”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2002 年第 1 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      },
      {
        "label": "获奖记录",
        "text": "2003 年 7 月获 2002 年度中国科幻银河奖",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2002 年 1 月条下记录此作发表于《科幻世界》第 1 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2002 年 1 月条"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注劳动经验与太空想象。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "本次核实了期刊年月；年谱不是小说全文，不能为具体人物行动、技术细节和结局背书。旧版无具体出处的剧情细节与宣传性评价暂撤，待可核读文本支持后补充。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "中国太阳",
      "理想主义",
      "刘慈欣"
    ]
  },
  "liu-cixin-dream-sea": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2002,
        "month": 1
      }
    },
    "summary": "刘慈欣的《梦之海》发表于《科幻世界》2002 年第 1 期。本节点记录期刊发表，不把后续选集、改编或获奖时间当作首发时间。",
    "significance": "编辑总结：可围绕“艺术价值与生存需要”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2002 年第 1 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2002 年 1 月条下记录此作发表于《科幻世界》第 1 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2002 年 1 月条"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注艺术价值与生存需要。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "本次核实了期刊年月；年谱不是小说全文，不能为具体人物行动、技术细节和结局背书。旧版无具体出处的剧情细节与宣传性评价暂撤，待可核读文本支持后补充。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "海洋",
      "宇宙艺术",
      "刘慈欣"
    ]
  },
  "liu-cixin-angel-era": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2002,
        "month": 6
      }
    },
    "summary": "桑比亚的科学家试图通过基因改造应对饥饿，引出对人之定义、生存需要与科技伦理的冲突。不是长翅膀战士的战争故事。",
    "significance": "编辑总结：可围绕“饥饿、生存与基因技术伦理”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology",
      "writers-angel-ethics-audit"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2002 年第 6 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      },
      {
        "label": "后续改写",
        "text": "年谱记载《魔鬼积木》于 2002 年 9 月出版，由《天使时代》扩展和改写而来；两者细节不能混用。",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2002 年 6 月条下记录此作发表于《科幻世界》第 6 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2002 年 6 月条"
      },
      {
        "label": "内容与评论的范围",
        "text": "余文菁的论文把故事核心放在基因技术与饥饿问题上。这里据其论述概括冲突，不沿用旧版“有翼天使战士”的错误情节；论文的伦理评价属于研究者解释，而非唯一结论。",
        "sourceIds": [
          "writers-angel-ethics-audit"
        ],
        "locator": "摘要与正文开头"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注饥饿、生存与基因技术伦理。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "本次核实了期刊年月；年谱不是小说全文，不能为具体人物行动、技术细节和结局背书。旧版无具体出处的剧情细节与宣传性评价暂撤，待可核读文本支持后补充。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "基因工程",
      "科技伦理",
      "刘慈欣"
    ]
  },
  "liu-cixin-swallow": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2002,
        "month": 11
      }
    },
    "summary": "刘慈欣的《吞食者》发表于《科幻世界》2002 年第 11 期。本节点记录期刊发表，不把后续选集、改编或获奖时间当作首发时间。",
    "significance": "编辑总结：可围绕“文明相遇与生存谈判”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2002 年第 11 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      },
      {
        "label": "获奖记录",
        "text": "2003 年 7 月获 2002 年度中国科幻银河奖读者提名奖",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2002 年 11 月条下记录此作发表于《科幻世界》第 11 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2002 年 11 月条"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注文明相遇与生存谈判。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "本次核实了期刊年月；年谱不是小说全文，不能为具体人物行动、技术细节和结局背书。旧版无具体出处的剧情细节与宣传性评价暂撤，待可核读文本支持后补充。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "宇宙尺度",
      "生存博弈",
      "刘慈欣"
    ]
  },
  "liu-cixin-support-god": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2005,
        "month": 1
      }
    },
    "summary": "刘慈欣的《赡养上帝》发表于《科幻世界》2005 年第 1 期。本节点记录期刊发表，不把后续选集、改编或获奖时间当作首发时间。",
    "significance": "编辑总结：可围绕“照护责任与文明衰老”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2005 年第 1 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2005 年 1 月条下记录此作发表于《科幻世界》第 1 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2005 年 1 月条"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注照护责任与文明衰老。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "本次核实了期刊年月；年谱不是小说全文，不能为具体人物行动、技术细节和结局背书。旧版无具体出处的剧情细节与宣传性评价暂撤，待可核读文本支持后补充。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "赡养上帝",
      "文明衰老",
      "黑色幽默",
      "刘慈欣"
    ]
  },
  "liu-cixin-support-human": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2005,
        "month": 11
      }
    },
    "summary": "外来文明拟按人类最低生活水平实施赡养，地球富人因此试图提高这一标准；来客自身的社会则出现财富集中于一名“终产者”的极端局面。",
    "significance": "编辑总结：可围绕“财富分配与制度激励”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology",
      "writers-support-human-audit"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2005 年第 11 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      },
      {
        "label": "获奖记录",
        "text": "2006 年 4 月获 2005 年度中国科幻银河奖",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2005 年 11 月条下记录此作发表于《科幻世界》第 11 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2005 年 11 月条"
      },
      {
        "label": "情节校正",
        "text": "徐彦利的论文说明，故事不是“只剩一名穷人”，也不是外星人要求把财富均分。财富极度集中与按最低标准赡养形成冲突，推动了富人的行动；这里只交代关键前提，不复述杀手支线的完整结局。",
        "sourceIds": [
          "writers-support-human-audit"
        ],
        "locator": "正文情节概述第 2—4 段"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注财富分配与制度激励。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "本次核实了期刊年月；年谱不是小说全文，不能为具体人物行动、技术细节和结局背书。旧版无具体出处的剧情细节与宣传性评价暂撤，待可核读文本支持后补充。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "赡养人类",
      "贫富分化",
      "思想实验",
      "刘慈欣"
    ]
  },
  "liu-cixin-mountain": {
    "time": {
      "kind": "point",
      "start": {
        "year": 2006,
        "month": 1
      }
    },
    "summary": "刘慈欣的《山》发表于《科幻世界》2006 年第 1 期。本节点记录期刊发表，不把后续选集、改编或获奖时间当作首发时间。",
    "significance": "编辑总结：可围绕“探索边界与攀登意象”提出阅读问题；这是阅读建议，不是作者意图或作品地位的权威定论。",
    "sourceIds": [
      "writers-liu-chronology"
    ],
    "facts": [
      {
        "label": "期刊发表",
        "text": "《科幻世界》2006 年第 1 期",
        "sourceIds": [
          "writers-liu-chronology"
        ]
      }
    ],
    "details": [
      {
        "label": "发表记录",
        "text": "李浩《刘慈欣文学年谱》在 2006 年 1 月条下记录此作发表于《科幻世界》第 1 期。这里采用期刊年月，不补造具体日。",
        "sourceIds": [
          "writers-liu-chronology"
        ],
        "locator": "2006 年 1 月条"
      },
      {
        "label": "编辑阅读建议",
        "text": "阅读时可以关注探索边界与攀登意象。应把小说中的假设、人物立场与现实中的事实判断分开。",
        "editorial": true
      }
    ],
    "note": "本次核实了期刊年月；年谱不是小说全文，不能为具体人物行动、技术细节和结局背书。旧版无具体出处的剧情细节与宣传性评价暂撤，待可核读文本支持后补充。",
    "recommendedResources": [],
    "tags": [
      "科幻",
      "山",
      "文明攀登",
      "硬科幻",
      "刘慈欣"
    ]
  }
};
