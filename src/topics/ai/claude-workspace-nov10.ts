import type { Entity, Source, TimelineEvent } from './types';

const checkedAt = '2026-11-10';
const announcement = 'https://claude.com/resources/articles/sheets-whiteboards-data';
const overview = 'https://claude.com/resources/articles/more-ways-to-work-with-claude-sheets-whiteboards-and-interactive-connectors';
const whiteboards = 'https://support.claude.com/en/articles/18324319-get-started-with-claude-whiteboards';
const sheets = 'https://support.claude.com/en/articles/18324300-get-started-with-claude-sheets';
const data = 'https://support.claude.com/en/articles/17454700-get-started-with-claude-data';
const announcementGroup = 'claude-workspace-2026-11-10';

export const claudeWorkspaceNov10Sources: Source[] = [
  { id: 'claude-workspace-nov10-announcement', title: 'Introducing Claude Whiteboards, Claude Sheets, and Claude Data', publisher: 'Anthropic', url: announcement, type: '官方公告', publishedAt: checkedAt, checkedAt, locator: 'Claude Whiteboards；Claude Sheets；Claude Data；Getting started', version: '核读官方正文；日期确认到日，不补造发布小时。' },
  { id: 'claude-workspace-nov10-overview', title: 'More ways to work with Claude: Sheets, Whiteboards, and Interactive Connectors', publisher: 'Anthropic', url: overview, type: '官方公告', publishedAt: checkedAt, checkedAt, locator: '开头 Claude Meetings is coming soon；Bring ideas to life faster, together', version: 'Meetings 的 coming soon 与 Whiteboards 帮助文档存在可用性口径差异。' },
  { id: 'claude-whiteboards-guide', title: 'Get started with Claude Whiteboards', publisher: 'Anthropic · Claude Help Center', url: whiteboards, type: '官方文档', checkedAt, locator: '开头资格；In a Claude Meetings call (beta)；Work on it together；Current limitations', version: '核读帮助全文；动态文档的核查日不作为首次发布日。' },
  { id: 'claude-sheets-guide', title: 'Get started with Claude Sheets', publisher: 'Anthropic · Claude Help Center', url: sheets, type: '官方文档', checkedAt, locator: 'How Claude Sheets differs from Claude for Excel；Import and export；Current limitations', version: '核读帮助全文；移动端仅基本只读，不能外推完整编辑支持。' },
  { id: 'claude-data-guide', title: 'Get started with Claude Data', publisher: 'Anthropic · Claude Help Center', url: data, type: '官方文档', checkedAt, locator: '开头默认设置；How data refreshes；Use certified queries (beta)；Share live results with your organization (beta)', version: '核读帮助全文；核心产品 GA 与两项 beta 功能分开记录。' },
];

export const claudeWorkspaceNov10Entities: Entity[] = [
  { id: 'claude-whiteboards', name: 'Claude Whiteboards', type: 'product', company: 'Anthropic', description: 'Claude 内的协作白板 artifact，用于整理想法、流程和计划；2026年11月以 beta 推出。', tags: ['协作白板', 'Artifacts'], sourceIds: ['claude-workspace-nov10-announcement', 'claude-whiteboards-guide'] },
  { id: 'claude-sheets', name: 'Claude Sheets', type: 'product', company: 'Anthropic', description: 'Claude 内置的协作电子表格 artifact，不同于将 Claude 接入 Excel 或 Google Workspace 的扩展。', tags: ['电子表格', 'Artifacts'], sourceIds: ['claude-workspace-nov10-announcement', 'claude-sheets-guide'] },
  { id: 'claude-data', name: 'Claude Data（原 Claude Dashboards）', type: 'product', company: 'Anthropic', description: '从连接的数据源生成仪表板与数据叙事的 Claude 产品；承接2026年10月 beta 的 Claude Dashboards，11月更名并 GA。', tags: ['数据分析', '仪表板', 'Artifacts'], sourceIds: ['claude-workspace-nov10-announcement', 'claude-data-guide'] },
];

export const claudeWorkspaceNov10Events: TimelineEvent[] = [
  {
    id: 'claude-whiteboards-beta', date: checkedAt, dateLabel: '2026年11月10日（官方 beta 公告日）',
    title: 'Claude Whiteboards beta：与团队共同整理想法', company: 'Anthropic', kind: '产品 beta', tracks: ['products'], entityIds: ['claude', 'claude-whiteboards'], milestone: false, announcementGroup,
    summary: 'Anthropic 推出 Claude 内置协作白板 beta，面向付费计划，用图形、连线和分组整理想法，并可把白板转成文档或演示稿。',
    significance: '编辑解读：白板让团队与 Claude 共享可编辑的思考过程，而不只接收聊天中的最终答案。',
    limitation: 'Enterprise 默认关闭，HIPAA-ready 组织不可用。Meetings 的官方公告与帮助文档口径不一致，本节点不确认其普遍上线；未登录实际测试协作。',
    sourceIds: ['claude-workspace-nov10-announcement', 'claude-whiteboards-guide', 'claude-workspace-nov10-overview'], tags: ['协作白板', 'beta', 'Artifacts', '知识工作'],
    details: [
      { label: '发布阶段与准入', text: '11月10日公告将 Whiteboards 定为 beta。帮助文档列明 Pro、Max、Ultra、Team 和 Enterprise，支持 web、桌面和移动端；Team 默认开启，Enterprise 需管理员启用，Claude for Teachers 尚未支持。这里记录公告日，不推定每个账号同时获得功能。', sourceIds: ['claude-workspace-nov10-announcement', 'claude-whiteboards-guide'], locator: '公告开头与 Getting started；帮助开头资格段' },
      { label: '从想法到共享画布', text: '用户可输入、口述或绘制想法，由 Claude 整理为图形、箭头、流程与分组。成员在同一白板实时移动内容，也能选择局部向 Claude 提问。它是可共同修改的 artifact，而不是只生成一张不可编辑的示意图片。', sourceIds: ['claude-whiteboards-guide'], locator: 'How Claude Whiteboards works；Work on the board with Claude；Work on it together' },
      { label: '交付与数据边界', text: '白板可转为文档或演示稿、导出 PNG，或发送到 Lucid、Miro、Zoho Vani；不能从文件导入整张白板。当前 Claude 只使用画布内容，不读取连接应用的上下文；HIPAA-ready 组织不可用，Claude Code 的零保留设置也不能据此覆盖白板。', sourceIds: ['claude-whiteboards-guide'], locator: 'Turn your board into something else；Current limitations' },
      { label: 'Meetings：保留官方口径冲突', text: '同日官方总览两次称 Claude Meetings 即将推出；Whiteboards 帮助却把 Team、Enterprise 的 Meetings beta 实时白板写为可用，并描述 Google Meet 操作。两者不足以确定统一开放范围。本条仅确认 Whiteboards beta，不把会议功能计作已全面上线，也不推断 Zoom 或 Teams 支持。', sourceIds: ['claude-workspace-nov10-overview', 'claude-whiteboards-guide'], locator: '总览开头与 Bring ideas to life faster, together；帮助 In a Claude Meetings call (beta) 与 Current limitations' },
      { label: '编辑分析：协作对象改变了什么', text: '共享画布让团队能直接修正 Claude 的分组和依赖关系，但图形清晰不代表计划正确。采用时应复核责任人、时间和信息边界；会议相关描述的冲突也提醒读者区分功能介绍、账号准入与实际上线。', editorial: true, sourceIds: ['claude-whiteboards-guide', 'claude-workspace-nov10-overview'], locator: '编辑基于协作流程、限制及两份官方材料差异的归纳；非实测' },
    ],
    recommendedResources: [{ id: 'claude-whiteboards-guide-reading', title: 'Get started with Claude Whiteboards', creator: 'Anthropic', series: 'Claude Help Center', kind: 'article', url: whiteboards, checkedAt, match: '对照共享、导出和当前限制，判断白板是否适合团队工作。', scopeNote: '已核读全文，未登录测试；Meetings 可用性与同日官方总览存在差异，不能据此确认普遍开放。', locator: 'Work on it together；Turn your board into something else；Current limitations' }],
  },
  {
    id: 'claude-sheets-beta', date: checkedAt, dateLabel: '2026年11月10日（官方 beta 公告日）',
    title: 'Claude Sheets beta：在 Claude 内共同编辑电子表格', company: 'Anthropic', kind: '产品 beta', tracks: ['products'], entityIds: ['claude', 'claude-sheets'], milestone: false, announcementGroup,
    summary: 'Claude Sheets 以 beta 提供内置协作表格，支持多标签页、公式和格式设置；面向付费计划，移动端仅基本只读。',
    significance: '编辑解读：表格成为人和 Claude 共同编辑、检查计算过程的对象，但还不是完整办公表格软件的替代品。',
    limitation: 'Enterprise 默认关闭；有10万单元格上限，不支持透视表、VBA及连接应用实时数据。HIPAA、CMEK、ZDR 尚不支持，本站未实测公式兼容性。',
    sourceIds: ['claude-workspace-nov10-announcement', 'claude-sheets-guide'], tags: ['电子表格', 'beta', '协作', 'Artifacts'],
    details: [
      { label: '发布与产品边界', text: '11月10日推出的是 Claude 内置 Sheets beta，而不是既有 Claude for Excel 或 Google Workspace 扩展。Pro、Max、Ultra、Team、Enterprise 可使用；Team 默认开启，Enterprise 默认关闭，管理员也可用自定义角色限定使用群体。', sourceIds: ['claude-workspace-nov10-announcement', 'claude-sheets-guide'], locator: '公告 Claude Sheets；帮助开头、How Claude Sheets differs from Claude for Excel、Turn on Claude Sheets for your organization' },
      { label: '共同编辑与可检查的公式', text: 'Sheets 支持多标签页、跨页公式、条件格式、下拉框、复选框和图表；文档列出144个函数。Claude 的每次修改会被标出，成员在相同单元格协作，公式保留可查，也能通过版本历史恢复早先状态。', sourceIds: ['claude-sheets-guide'], locator: 'How Claude Sheets works；Work in your sheet；Undo Claude’s changes' },
      { label: '导入导出与平台范围', text: '可导入 CSV、Excel 和 Google Sheets 内容，并导出 .xlsx 或 CSV。web 和桌面提供编辑，移动端只有基本只读访问；因此公告所说支持移动端不应被扩写成移动端完整表格编辑。', sourceIds: ['claude-sheets-guide'], locator: 'Import and export；Current limitations / Platforms' },
      { label: 'beta 的容量、功能与数据限制', text: '单表上限为10万个单元格，暂缺透视表、保护范围等功能，不支持宏、VBA、Power Query 或 DAX。Sheets 不能从连接应用拉取实时数据，其他文档、演示稿和仪表板也不能把它作为数据源；HIPAA、CMEK、ZDR 尚不支持。', sourceIds: ['claude-sheets-guide'], locator: 'Current limitations / Size、Features not available yet、Excel features not supported、Live data、Data controls' },
      { label: '编辑分析：将生成与验算分开', text: '轻量预算、跟踪表可受益于共同编辑，但能生成公式不等于业务口径正确。迁移已有工作簿前应检查函数、权限和导出结果；需要成熟功能或实时数据链路时，应依据这些明确限制选择工具。', editorial: true, sourceIds: ['claude-sheets-guide'], locator: '编辑基于产品定位、公式可见性与 beta 限制的归纳；未实测兼容性' },
    ],
    recommendedResources: [{ id: 'claude-sheets-guide-reading', title: 'Get started with Claude Sheets', creator: 'Anthropic', series: 'Claude Help Center', kind: 'article', url: sheets, checkedAt, match: '先读与 Excel 的分工及功能缺口，再评估是否迁移具体工作簿。', scopeNote: '已核读全文；未创建表格、验证函数或测试文件往返，不能视为兼容性验收。', locator: 'How Claude Sheets differs from Claude for Excel；Import and export；Current limitations' }],
  },
  {
    id: 'claude-data-ga', date: checkedAt, dateLabel: '2026年11月10日（更名与 GA 公告日）',
    title: 'Claude Dashboards 更名 Claude Data 并 GA', company: 'Anthropic', kind: '产品 GA／更名', tracks: ['products'], entityIds: ['claude', 'claude-data'], milestone: false, announcementGroup,
    summary: '10月 beta 的 Claude Dashboards 更名为 Claude Data 并转为正式可用，扩展数据叙事等输出；认证查询和实时共享仍处于 beta。',
    significance: '编辑解读：节点同时记录产品成熟阶段与数据表达范围的变化，不能把整个功能包都当作退出测试。',
    limitation: 'Enterprise 默认启用计划在11月19日，且保留已保存的设置；认证查询及实时共享在 Enterprise 默认关闭。实时共享会让无数据源权限的查看者看到结果，不等于授予底层访问。',
    sourceIds: ['claude-workspace-nov10-announcement', 'claude-data-guide'], tags: ['数据分析', 'GA', '仪表板', '产品更名'],
    details: [
      { label: '沿革：不是从零发布的新产品', text: '官方公告说明 Claude Dashboards 已在10月进入 beta，11月10日以 Claude Data 名称正式可用。原有仪表板继续工作；新名称反映输出不再局限于仪表板，也包括数据故事、带解说的短视频与文字分析。', sourceIds: ['claude-workspace-nov10-announcement', 'claude-data-guide'], locator: '公告 Claude Data；帮助开头与 How Claude Data works' },
      { label: '核心产品与 beta 功能分别看', text: 'Data 面向 Pro、Max、Ultra、Team、Enterprise；认证查询和实时共享仍是 beta。Team 默认开启 Data 及两项 beta；Enterprise 的 Data 将于11月19日默认开启，但不覆盖所有者已保存的设置，两项 beta 仍默认关闭。', sourceIds: ['claude-data-guide'], locator: '开头计划资格与默认设置；Turn on Claude Data for your organization' },
      { label: '连接数据、检查查询与刷新', text: 'Data 可连接仓库或业务应用，为图表编写查询并显示刷新时间。认证查询让团队复用已批准口径；编辑认证查询会移除认证。刷新发生在有人打开仪表板且数据已到刷新间隔时，不应把可配置间隔写成后台按时自动运行。', sourceIds: ['claude-data-guide'], locator: 'Connect your data；How data refreshes；Use certified queries (beta)' },
      { label: '实时共享的权限含义', text: '不开实时共享时，共享仪表板通过每位查看者自己的连接加载。开启后可使用共享者的数据源权限展示指定查询结果，因此没有底层数据源权限的人也可能看到这些结果。查询变更需要编辑者批准，分享前仍需检查结果内容和接收范围。', sourceIds: ['claude-data-guide'], locator: 'Share live results with your organization (beta)' },
      { label: '编辑分析：复用口径也需审查结果', text: '认证查询与共享结果有助于减少团队重复解释指标，但认证是团队批准，不是事实正确性的自动保证。把数据变成故事也可能放大错误口径；应同时检查查询、刷新条件与结果受众，而不是只验收展示效果。', editorial: true, sourceIds: ['claude-data-guide'], locator: '编辑基于认证查询、刷新和实时共享机制的归纳；未连接真实企业数据实测' },
    ],
    recommendedResources: [{ id: 'claude-data-guide-reading', title: 'Get started with Claude Data', creator: 'Anthropic', series: 'Claude Help Center', kind: 'article', url: data, checkedAt, match: '重点理解 GA 与两项 beta 的区别，以及查询认证、刷新和共享者权限的影响。', scopeNote: '已核读全文；未连接数据源或运行查询，不代表独立验证查询质量与企业权限配置。', locator: 'How data refreshes；Use certified queries (beta)；Share live results with your organization (beta)' }],
  },
];
