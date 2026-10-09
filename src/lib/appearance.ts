export const APPEARANCE_KEY = 'timeline-appearance';
export type Appearance = 'system' | 'light' | 'dark';
export const normalizeAppearance = (value: string | null | undefined): Appearance => value === 'light' || value === 'dark' ? value : 'system';
export const resolveAppearance = (mode: Appearance, systemDark: boolean): 'light' | 'dark' => mode === 'system' ? systemDark ? 'dark' : 'light' : mode;

export function applyAppearance(mode: Appearance, systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches) {
  const theme = resolveAppearance(mode, systemDark);
  document.documentElement.dataset.appearance = mode;
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#202020' : '#f3f3f3');
}

/** System changes apply only in automatic mode; storage changes sync open tabs. */
export function observeAppearance(onChange: (mode: Appearance) => void): () => void {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let mode = normalizeAppearance(document.documentElement.dataset.appearance);
  const publish = (next: Appearance) => { mode = next; applyAppearance(mode, media.matches); onChange(mode); };
  publish(mode);
  const systemChanged = () => { if (mode === 'system') publish(mode); };
  const storageChanged = (event: StorageEvent) => {
    if (event.key === APPEARANCE_KEY || event.key === null) publish(normalizeAppearance(event.newValue));
  };
  const chosen = () => publish(normalizeAppearance(document.documentElement.dataset.appearance));
  media.addEventListener('change', systemChanged);
  window.addEventListener('storage', storageChanged);
  window.addEventListener('timeline:appearance', chosen);
  return () => { media.removeEventListener('change', systemChanged); window.removeEventListener('storage', storageChanged); window.removeEventListener('timeline:appearance', chosen); };
}

export function chooseAppearance(mode: Appearance) {
  try { localStorage.setItem(APPEARANCE_KEY, mode); } catch { /* The current page can still switch with storage disabled. */ }
  applyAppearance(mode);
  window.dispatchEvent(new Event('timeline:appearance'));
}
