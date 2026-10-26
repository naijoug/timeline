import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export interface ChoiceOption { value: string; label: string; nested?: boolean }
/** Inline expansion stays inside the sheet's scroll area, never behind its footer. */
export default function FilterChoice({ label, value, options, onChange, name }: {
  label: string; value: string; options: ChoiceOption[]; onChange: (value: string) => void; name: string;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null), trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false), [active, setActive] = useState(0);
  const search = useRef({ text: '', at: 0 });
  const keyboardMove = useRef(false);
  const selected = Math.max(0, options.findIndex(option => option.value === value));
  const reveal = () => { keyboardMove.current = true; setActive(selected); setOpen(true); };
  const choose = (index: number) => { onChange(options[index].value); setOpen(false); trigger.current?.focus(); };
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);
  useEffect(() => {
    if (!open || !keyboardMove.current) return;
    const item = root.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    const list = item?.parentElement;
    if (item && list) { const row = item.getBoundingClientRect(), box = list.getBoundingClientRect(); if (row.top < box.top) list.scrollTop -= box.top - row.top; else if (row.bottom > box.bottom) list.scrollTop += row.bottom - box.bottom; }
    const body = root.current?.closest<HTMLElement>('.filter-sheet-body');
    if (item && body) { const row = item.getBoundingClientRect(), box = body.getBoundingClientRect(); if (row.top < box.top) body.scrollTop -= box.top - row.top + 8; else if (row.bottom > box.bottom) body.scrollTop += row.bottom - box.bottom + 8; }
  }, [active, open]);
  return <div className={`filter-choice${open ? ' is-open' : ''}`} ref={root} data-choice={name} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}>
    <span className="filter-field-label" id={`${id}-label`}>{label}</span>
    <button ref={trigger} type="button" className="filter-choice-trigger" role="combobox" aria-expanded={open} aria-controls={open ? `${id}-options` : undefined} aria-haspopup="listbox" aria-labelledby={`${id}-label ${id}-value`} aria-activedescendant={open ? `${id}-${active}` : undefined} onClick={() => open ? setOpen(false) : reveal()} onKeyDown={event => {
      if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); setOpen(false); return; }
      if (event.key === 'Tab') { setOpen(false); return; }
      if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault(); keyboardMove.current = true; setOpen(true);
        setActive(current => event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : !open ? selected : (current + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length);
      } else if (open && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); choose(active); }
      else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && event.key !== ' ') {
        event.preventDefault(); const now = Date.now(); search.current = { text: now - search.current.at < 700 ? search.current.text + event.key : event.key, at: now };
        const match = options.findIndex(option => option.label.toLocaleLowerCase().startsWith(search.current.text.toLocaleLowerCase()));
        if (match >= 0) { keyboardMove.current = true; setOpen(true); setActive(match); }
      }
    }}><span id={`${id}-value`}>{options[selected]?.label}</span><ChevronDown size={16} aria-hidden="true"/></button>
    {open && <div className="filter-choice-options" id={`${id}-options`} role="listbox" aria-labelledby={`${id}-label`}>{options.map((option, index) => <div key={option.value} id={`${id}-${index}`} data-index={index} data-value={option.value} role="option" aria-selected={option.value === value} className={`filter-choice-option${active === index ? ' is-active' : ''}${option.nested ? ' is-nested' : ''}`} onPointerDown={event => event.preventDefault()} onPointerMove={event => { if (event.pointerType === 'mouse') { keyboardMove.current = false; setActive(index); } }} onClick={() => choose(index)}><span>{option.label}</span><Check size={16} aria-hidden="true" style={{ visibility: option.value === value ? 'visible' : 'hidden' }}/></div>)}</div>}
  </div>;
}

export function FilterSegments({ label, value, options, onChange, name }: {
  label: string; value: string; options: ChoiceOption[]; onChange: (value: string) => void; name: string;
}) {
  const id = useId();
  return <fieldset className="filter-segments" data-segments={name}><legend>{label}</legend><div>{options.map(option => <label key={option.value}><input type="radio" name={`${id}-${name}`} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)}/><span>{option.label}</span></label>)}</div></fieldset>;
}
