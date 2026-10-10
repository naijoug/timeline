import { writeFileSync } from 'node:fs';
import { events } from '../src/topics/ai/events';
import { entities } from '../src/topics/ai/entities';
import { sources } from '../src/topics/ai/sources';
import { eventLane, isKeyEvent, chinaCompanies } from '../src/topics/ai/config';
import { releaseEvents, releaseResearchDate } from '../src/topics/ai/releases';
import { instructionEvents } from '../src/topics/ai/instruction-following';
import { historicalEvents } from '../src/topics/ai/historical-milestones';
const latestCheckedAt = sources.map(s=>s.checkedAt).sort().at(-1);

const rows = ['# AI 时间线覆盖报告', '', `来源最近核查日期：${latestCheckedAt}；版本发布批次核查日期：${releaseResearchDate}。各来源保留各自核查日期。运行 \`npm run report:ai\` 从实际数据重新生成本报告。`, '',
  '## 收录范围', '',
  `当前工作区共 ${events.length} 个事件、${entities.length} 个对象、${sources.length} 份来源；版本发布批次新增 ${releaseEvents.length} 条，指令专题新增 ${instructionEvents.length} 条，视觉学习到协作系统专题新增 ${historicalEvents.length} 条。两个专题分别复用并完善 11、7 个既有节点，保留原事件 ID。第二个专题目前仅供本机预览。`, '',
  '| 主线 | 全部已收录 | 关键节点 | 中国团队筛选 |', '| --- | ---: | ---: | ---: |'];
for (const [lane, title] of [['methods', 'AI 技术突破'], ['models', '模型演进'], ['products', 'Agent 应用']]) {
  const list = events.filter(e => eventLane(e) === lane);
  rows.push(`| ${title} | ${list.length} | ${list.filter(isKeyEvent).length} | ${list.filter(e => chinaCompanies.has(e.company || '')).length} |`);
}
rows.push('', '“当前显示”受时间窗口、关键词、地区、主线和关键节点筛选共同影响；页面同时显示全库和每轨总数。聚合不删除事件，打开组内目录可逐条阅读。', '',
  '## 研究与日期规则', '',
  '- 优先使用论文、官方单篇公告、官方仓库和有日期的更新日志；不把媒体转述或搜索摘要的推测写成已确认事实。',
  '- 原始论文、研究预览、公告、权重开放、API 开放和正式开放分别标记；不以模型名称中的快照日期代替发布日期。',
  '- Replit 首发只记 2024-09；Qwen2.5-VL 与 Qwen3-Coder 保留月份。Qwen3.5 采用仓库权重开放日 2026-02-16，而非更早的博客元数据。',
  '- Opus 4.5 公告为 2025-11-24；DeepSeek-V3-0324 的更新公告为 2025-03-25；Kimi k1.5 论文首稿为 2025-01-22。',
  '- Manus Browser Operator 的 2025-11-18 公告与 11 月 22 日全量开放分开说明。Seedance 2.0 使用发布说明日期，不推断更早的灰度上线日。',
  '- Cowork 原文已重定向到当前产品页面。2026-01-12 来自官方博客历史目录的搜索索引；仅收录当时公告的工作方向，后续功能不倒填。',
  '- 模型记录包含比较基线、变化和限制；只对已有且相同家族的前代建立链接。首个已收录版本不自动宣称为公司最早模型。',
  '- “为什么重要”是编辑解读。模型提升引用论文或厂商报告，未进行独立性能实测，也不拼接不同评测设置的排名。',
  '- 同页发布模型与产品时保留两条事件、关联同次公告，共用一个来源；多个模型尺寸通常作为系列事件，不靠拆尺寸凑数量。', '',
  '## 尚未穷尽的范围', '',
  '本轮重点补齐语言、推理、编码模型及 Agent 的公开演进，增加视觉、图像和视频生成代表路线。全球覆盖包括中国、美国、欧洲、加拿大、阿联酋、日本和韩国团队；这不等于覆盖每家公司、每个地区或每个快照。', '',
  '- 文心、混元、盘古、Step、日日新、Falcon 等仍以代表节点为主；Phi 当前仅补充 phi-1，后续 Phi、IBM Granite、更多地区语言模型及垂直模型仍待系统研究。',
  '- 视觉、音频、视频、具身与世界模型当前只收录部分代表事件，尚未形成各系列的完整版本链。',
  '- AutoGen 已按开发框架归入技术与方法；LangGraph、CrewAI 等仍待补充，不直接当作面向用户的应用来增加数量。',
  '- Manus 最初邀请测试的精确一手发布时间、本轮未核实的产品小版本暂不补猜。已有多个后续重要升级可追踪。',
  '- 资料截至本次核查；外链可能跳转或改写。OpenAI 部分公告拒绝普通 HTTP 抓取，采用可读取的官方网页索引交叉核对；结构测试不等于实时外链全部可访问。', '',
  '## 按对象的覆盖', '', '| 对象 | 团队 | 主轨事件数 | 最早已收录 | 最近已收录 |', '| --- | --- | ---: | --- | --- |');
for (const entity of entities.filter(e => e.type !== 'concept').sort((a, b) => a.name.localeCompare(b.name))) {
  const list = events.filter(e => e.entityIds.includes(entity.id) && eventLane(e) === (entity.type === 'family' ? 'models' : 'products')).sort((a, b) => a.date.localeCompare(b.date));
  if (list.length) rows.push(`| ${entity.name} | ${entity.company || '研究团队'} | ${list.length} | ${list[0].date} | ${list.at(-1)!.date} |`);
}
const sourceMap = new Map(sources.map(s => [s.id, s]));
rows.push('', '## 本轮新增事件与原始依据', '', '| 日期 | 事件 | 事件口径 | 原始来源 |', '| --- | --- | --- | --- |');
for (const event of [...releaseEvents].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id))) {
  rows.push(`| ${event.date} | ${event.title} | ${event.kind} | ${event.sourceIds.map(id => { const s = sourceMap.get(id)!; return `[${s.publisher}](${s.url})`; }).join('、')} |`);
}
writeFileSync(new URL('../docs/ai-coverage.md', import.meta.url), rows.join('\n') + '\n');
console.log(`AI coverage report: ${events.length} events, ${releaseEvents.length} additions, ${sources.length} sources.`);
