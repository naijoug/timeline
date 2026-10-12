/** Shared subject navigation. Add subjects here without growing the header. */
export const topics = [
  { id: 'ai', title: 'AI 发展史', path: '/ai/', subtitle: '从图灵到生成式 AI', icon: 'chart' },
  { id: 'programming-languages', title: '编程语言', path: '/programming-languages/', subtitle: '从 FORTRAN 到现代语言', icon: 'chart' },
  { id: 'china-history', title: '中国历史', path: '/china-history/', subtitle: '沿着朝代，探索历史的来路', icon: 'book' },
  { id: 'writers', title: '作家作品', path: '/writers/', subtitle: '刘慈欣、紫金陈、马伯庸出版年谱', icon: 'book' },
] as const;
