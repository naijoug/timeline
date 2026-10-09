import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown } from 'lucide-react';
import '../../styles/category-select.css';

/** Keep focus on the trigger while navigating the listbox. */
export default function CategorySelect({ value, options, onChange }: {
  value: string;
  options: { id: string; title: string }[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 180, maxHeight: 280 });
  const selected = Math.max(0, options.findIndex(option => option.id === value));
  const show = () => { setActive(selected); setOpen(true); };
  const choose = (index: number) => {
    onChange(options[index].id);
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  };

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      if (!trigger.current) return;
      const rect = trigger.current.getBoundingClientRect();
      const width = Math.min(Math.max(rect.width, 180), window.innerWidth - 24);
      const below = window.innerHeight - rect.bottom - 18;
      const above = rect.top - 18;
      const upwards = below < Math.min(280, options.length * 40 + 12) && above > below;
      const maxHeight = Math.max(0, Math.min(280, upwards ? above : below));
      const height = Math.min(menu.current?.scrollHeight || maxHeight, maxHeight);
      setPosition({ width, maxHeight, left: Math.max(12, Math.min(rect.left, window.innerWidth - width - 12)), top: upwards ? rect.top - height - 6 : rect.bottom + 6 });
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => { window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true); };
  }, [open, options.length]);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: Event) => {
      const target = event.target as Node;
      if (!trigger.current?.contains(target) && !menu.current?.contains(target)) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('focusin', dismiss);
    return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('focusin', dismiss); };
  }, [open]);

  useEffect(() => {
    if (open) menu.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape' && open) {
      event.preventDefault(); event.stopPropagation(); setOpen(false); return;
    }
    if (event.key === 'Tab') { setOpen(false); return; }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      if (!open) { show(); return; }
      setActive(index => event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : Math.max(0, Math.min(options.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1))));
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (open) choose(active); else show();
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const match = options.findIndex(option => option.title.toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()));
      if (match >= 0) { event.preventDefault(); setActive(match); setOpen(true); }
    }
  };

  return <>
    <button ref={trigger} type="button" className="category-select-trigger" role="combobox" aria-label="事件类别" aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? id : undefined} aria-activedescendant={open ? `${id}-${active}` : undefined} onClick={() => open ? setOpen(false) : show()} onKeyDown={onKeyDown}>
      <span>{options[selected].title}</span><ChevronDown size={14} aria-hidden="true" />
    </button>
    {open && createPortal(<div ref={menu} id={id} role="listbox" aria-label="事件类别" className="category-select-menu" style={position} onPointerDown={event => event.preventDefault()}>
      {options.map((option, index) => <div key={option.id} id={`${id}-${index}`} role="option" aria-selected={option.id === value} className={`category-select-option${active === index ? ' is-active' : ''}`} onPointerMove={() => setActive(index)} onClick={() => choose(index)}>
        <span>{option.title}</span><Check size={15} aria-hidden="true" className="category-select-check" />
      </div>)}
    </div>, document.body)}
  </>;
}
