import type { Source, TimelineEvent } from '../../core/types';

const checkedAt = '2026-11-06';
export const typescript20AnnouncementReview: Partial<Source> = {
  checkedAt,
  publishedAt: '2016-09-22',
  locator: 'Final release；Non-nullable Types；Control Flow Analyzed Types：正式发布、可选择启用的空值检查与既有分析的扩展。',
};

export const typescriptNullCheckingSources: Source[] = [{
  id: 'typescript20-versioned-notes',
  title: 'TypeScript 2.0',
  publisher: 'Microsoft / TypeScript 文档贡献者',
  url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html',
  type: '版本化官方发布说明',
  version: 'TypeScript 2.0',
  checkedAt,
  locator: '--strictNullChecks；Non-null assertion operator；Compatibility；Control flow based type analysis。用于核对2.0机制，不以当前网站更新时间代替发布日。',
}];

export const typescript20Patch: Partial<TimelineEvent> = {
  time: { kind: 'point', start: { year: 2016, month: 9, day: 22 } },
  summary: 'TypeScript 2.0 正式发布，加入可选择启用的 strictNullChecks，并扩展控制流类型分析。',
  significance: '编辑解读：把空值可能性写入类型，再沿分支检查使用位置，有助于提前发现遗漏；这不是运行时无空值错误的保证。',
  sourceIds: ['typescript20-exact-release', 'typescript20-versioned-notes'],
  note: '日期为正式版公告日，不是 Beta 或 RC 日期。升级到2.0不等于自动启用 strictNullChecks；本页介绍历史机制，未运行旧版编译器实验。',
  change: {
    baseline: '此前类型检查允许 null / undefined 广泛赋值，控制流分析已有但覆盖有限',
    improvements: ['可选择启用 strictNullChecks', '扩展局部变量与参数的控制流收窄', '标记联合、never 与 readonly'],
    tradeoffs: '严格模式要求处理空值边界；非空断言 ! 会被擦除，不提供运行时检查。',
    evidence: '官方正式发布公告与2.0版本化发布说明；不是本站运行时安全实验',
    sourceIds: ['typescript20-exact-release', 'typescript20-versioned-notes'],
  },
  details: [
    { label: '背景：正式发布与兼容迁移', text: 'Daniel Rosenwasser 于2016年9月22日宣布2.0正式发布。公告解释：旧检查方式让 number 等类型也接受空值；改变这一行为会影响兼容性，因此 strictNullChecks 需要主动启用，而非随升级自动生效。', sourceIds: ['typescript20-exact-release'], locator: '开篇 final release；Non-nullable Types' },
    { label: '机制：类型随路径收窄', text: '严格模式区分 T 与 T | null。2.0 扩展既有控制流分析，纳入赋值、return 和 break 等路径信息；例如 string | null 参数在空值分支提前返回后，后续可按 string 检查。这不是首次出现类型守卫。', sourceIds: ['typescript20-exact-release', 'typescript20-versioned-notes'], locator: 'Control Flow Analyzed Types；--strictNullChecks；Control flow based type analysis' },
    { label: '边界：断言不是运行时守卫', text: '发布说明明确：后缀非空断言 x! 在生成 JavaScript 时被移除，不会插入空值检查。因此不能把“静态检查通过”理解为“运行时必定非空”；声明文件在普通检查模式下仍可兼容使用，也不表示已启用严格检查。', sourceIds: ['typescript20-versioned-notes'], locator: 'Non-null assertion operator；Compatibility' },
    { label: '编辑分析：把迁移问题拆开阅读', text: '可先核对发布日，再比较项目是否开启严格空值检查，最后检查代码用分支收窄还是用断言跳过疑点。这条阅读路径强调检查条件和边界，不把功能发布等同于所有项目的错误率下降。', editorial: true, sourceIds: ['typescript20-exact-release', 'typescript20-versioned-notes'], locator: '根据正式公告与版本化机制说明作编辑归纳' },
  ],
  recommendedResources: [{
    id: 'typescript20-null-checking-reading', title: 'TypeScript 2.0',
    creator: 'Microsoft / TypeScript 文档贡献者', series: 'TypeScript 官网 · Handbook / Release Notes',
    kind: 'article', url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html',
    checkedAt,
    match: '将严格空值模式、路径收窄与非空断言的示例并读，理解启用条件和检查边界。',
    locator: '--strictNullChecks；Control flow based type analysis；Non-null assertion operator',
    scopeNote: '已核读对应章节。版本化页面不等于冻结的当日网页；未标独立发表日，不补造日期。发布日另据同期微软公告，示例未在本站执行。',
  }],
};
