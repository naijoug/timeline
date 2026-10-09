import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { chooseAppearance, observeAppearance, type Appearance } from '../lib/appearance';

const options = [
  { value: 'light', label: '浅色', Icon: Sun },
  { value: 'dark', label: '深色', Icon: Moon },
  { value: 'system', label: '跟随系统', Icon: Monitor },
] as const;

export default function AppearanceControl() {
  const [mode, setMode] = useState<Appearance>('system');
  useEffect(() => observeAppearance(setMode), []);
  const index = options.findIndex(option => option.value === mode);
  const { Icon, label } = options[index];
  const next = options[(index + 1) % options.length];
  const description = `当前外观：${label}；点击切换为${next.label}`;
  return <button type="button" className="appearance-control" aria-label={description} title={description} onClick={() => chooseAppearance(next.value)}>
    <Icon size={18} aria-hidden="true" />
  </button>;
}
