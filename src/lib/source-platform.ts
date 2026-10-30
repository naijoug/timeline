/** URL identity is separate from the author or publisher of the source. */
export function sourcePlatform(url: string) {
  let host = '';
  try { const parsed = new URL(url); if (!['https:', 'http:'].includes(parsed.protocol)) return { id: 'web', label: '外部资料' }; host = parsed.hostname.toLowerCase().replace(/^www\./, ''); } catch { return { id: 'web', label: '外部资料' }; }
  const matches = (domain: string) => host === domain || host.endsWith(`.${domain}`);
  if (matches('github.com') || host === 'raw.githubusercontent.com') return { id: 'github', label: 'GitHub' };
  if (matches('huggingface.co')) return { id: 'huggingface', label: 'Hugging Face' };
  if (matches('youtube.com') || host === 'youtu.be') return { id: 'youtube', label: 'YouTube' };
  if (matches('bilibili.com') || host === 'b23.tv') return { id: 'bilibili', label: '哔哩哔哩' };
  if (matches('arxiv.org')) return { id: 'arxiv', label: 'arXiv' };
  if (matches('wikipedia.org')) return { id: 'wikipedia', label: 'Wikipedia' };
  return { id: 'web', label: host || '外部资料' };
}
export function sourceLinkLabel(url: string, title: string, publisher?: string) {
  return `${sourcePlatform(url).label} · ${title}${publisher ? ` · ${publisher}` : ''}（新窗口打开）`;
}
