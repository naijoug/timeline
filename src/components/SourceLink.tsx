import SourceIcon from './SourceIcon';
import { sourceLinkLabel } from '../lib/source-platform';
export default function SourceLink({ url, title, publisher, className = '' }: { url: string; title: string; publisher?: string; className?: string }) {
  const label = sourceLinkLabel(url, title, publisher);
  return <a className={`source-icon-link ${className}`} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}><SourceIcon url={url}/></a>;
}
