import { BrainCircuit, CodeXml, Landmark, Feather } from 'lucide-react';
import type { topics } from '../core/topics';
export default function TopicIcon({ icon, size = 20 }: { icon: typeof topics[number]['icon']; size?: number }) {
  const Icon = { brain: BrainCircuit, code: CodeXml, history: Landmark, writing: Feather }[icon];
  return <Icon size={size} aria-hidden="true" />;
}
