# 唐宋战争与制度详情深化

批次：2026-10-25 16:00 UTC；实际核查与编辑约16:04—16:12 UTC。

本轮只深化已有的`an-shi`（安史之乱）和`wang-anshi-reforms`（王安石变法），不新增节点、不改日期或类别。中国史保持145个事件，来源从179增至184；具体学习资源从17增至20，仍连接15个事件。没有修改UI、共享组件、客户端索引机制或其他主题。

## 采用的资料及边界

| 资料 | 用途与核查范围 |
| --- | --- |
| Edwin G. Pulleyblank，[AN LU-SHAN](https://www.iranicaonline.org/articles/an-lu-shan-frontier-general/) | 读取学者署名词条的军政背景与756、757年事件顺序；不采用宫廷传闻、病情推测或网页残缺的早期纪年。 |
| C. A. Peterson，[Court and province in mid- and late T’ang](https://www.cambridge.org/core/books/abs/cambridge-history-of-china/court-and-province-in-mid-and-late-tang/9944E1F41895AF5010CD2B7F97EB0DAB) | **只读公开摘要**及书目信息，支持战争区间与因果解释边界，不声称读过付费章节。1979年为纸本出版年，2008年为上线时间。 |
| 国立故宫博物院供稿，[唐顏真卿祭姪文稿　卷](https://tcmb.culture.tw/zh-tw/detail?id=%E6%95%85%E6%9B%B800006000000&indexCode=NPM_Uncategorized) | 读取国家文化记忆库独立公开的作品说明及供稿单位；原数字典藏入口返回403，未继续尝试原入口，未取得高清图或核对完整释文。用作家庭经历的例证，不作全国统计。 |
| 哥伦比亚大学，[Memorial on the Crop Loans Measure, by Wang Anshi](https://afe.easia.columbia.edu/main_pop/ps/ps_china-wang-anshi-crop-loans.htm) | 读取HTML英译长选及教学问题，属于政策主张而非效果测量。**排除导言1068年任首相的错位纪年与利率脚注**；PDF入口未成功打开。日期与旧故宫词条交叉核对。 |
| Paul J. Smith，[State Power and Economic Activism during the New Policies, 1068–1085](https://publishing.cdlib.org/ucpressebooks/public/book/ordering-the-world-approaches-to-state-and-society-in-sung-dynasty-china.html) | 《Ordering the World》（1993）第2章89–93页已读取，不等于全书复核；区分作者研究、制度规定与当时反对意见，不引用人口、田亩或利率估计。 |
| 大都会艺术博物馆，[Tang Dynasty (618–907)](https://www.metmuseum.org/essays/tang-dynasty-618-906) | 重读文章末段，更新既有`backbone-tang-met-review`核查日；旧`tang-met`原记录不批量改期。 |

王安石政治生涯仍引用既有[故宫词条](https://www.dpm.org.cn/lemmas/243269.html)。本轮直读两次超时，搜索索引仍能核对原文，但**保留其旧核查日期2026-10-24**，不称本轮重新成功读取正文；1069年另有奏议正文交叉支持。

## 内容与推荐

- 安史之乱不再仅以研究书目题名核对战争区间；加入背景、经过、个人文物、战后延续及学者因果分析，保留755—763年持续战争，不补造公历月日或伤亡数字。
- 王安石变法区分改革起点、政策设计、地方执行争论、作者研究与官员去留。保留1069年节点，不把各项新法视为同日颁布，也不把离任等同政策全部终止。
- 每个事件保留一个显式`editorial: true`的独立解读段。事实和归属明确的研究判断逐段带来源、定位；所有这些来源同时列入事件的`sourceIds`，确保详情页能渲染证据链接。
- 新增三条具体延伸阅读：颜真卿文物说明、青苗奏议英译、Smith的指定章节。提供作者／供稿方、平台、内容定位、相关性和核查限制；原央视纪录片与《文明之旅》视频的ID、URL、原核查日期保持不变，没有重称验证播放。
- 旧安史书目来源仍保留在档案中，不改成已亲读的研究证据；其他未触及来源也不统一重标日期。

## 回归验证

新增`tests/history-governance-depth.test.ts`，覆盖汇总补丁优先级、日期与节点不变、逐段证据可渲染、原始材料／摘要／解释边界，以及推荐保持静态且不覆盖旧视频。仅按授权更新商朝学习资源测试中的全库来源和推荐总数。

本子任务运行新测试及历史主干、社会史、商朝学习资源、推荐组件的回归测试，**17项全部通过**。完整检查、双路径构建、浏览器与发布由父任务处理。此文不声称已部署或完成外站视频播放、原件高清阅读。
