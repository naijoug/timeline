/** Prefix local URLs for project hosting, while preserving external URLs and fragments. */
export function sitePath(path: string, base = import.meta.env?.BASE_URL || '/'): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const prefix = '/' + base.split('/').filter(Boolean).join('/');
  if (prefix === '/') return path;
  const pathname = path.split(/[?#]/, 1)[0];
  if (pathname === prefix || pathname.startsWith(prefix + '/')) return path;
  return prefix + path;
}
