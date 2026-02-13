import type { FormComponent } from '@/types/form';
import { X } from 'lucide-react';

interface Props {
  component: FormComponent;
  onChange: (props: Record<string, any>) => void;
  onClose: () => void;
}

export function PropertyEditor({ component, onChange, onClose }: Props) {
  const { type, props } = component;

  const update = (key: string, value: any) => {
    onChange({ ...props, [key]: value });
  };

  const fieldClass = "w-full px-2 py-1.5 rounded bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring";
  const labelClass = "text-xs text-muted-foreground font-medium";

  return (
    <div className="w-60 border-l border-border bg-palette overflow-y-auto">
      <div className="flex items-center justify-between px-3 py-3 border-b border-border">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Свойства</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-3 space-y-3">
        {(type === 'heading' || type === 'paragraph') && (
          <div className="space-y-1">
            <label className={labelClass}>Текст</label>
            <textarea value={props.text || ''} onChange={e => update('text', e.target.value)} rows={2} className={fieldClass} />
          </div>
        )}
        {type === 'heading' && (
          <div className="space-y-1">
            <label className={labelClass}>Уровень</label>
            <select value={props.level || 'h2'} onChange={e => update('level', e.target.value)} className={fieldClass}>
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
            </select>
          </div>
        )}
        {['text-input', 'textarea', 'number-input', 'select', 'checkbox'].includes(type) && (
          <div className="space-y-1">
            <label className={labelClass}>Подпись</label>
            <input value={props.label || ''} onChange={e => update('label', e.target.value)} className={fieldClass} />
          </div>
        )}
        {['text-input', 'textarea', 'number-input'].includes(type) && (
          <div className="space-y-1">
            <label className={labelClass}>Placeholder</label>
            <input value={props.placeholder || ''} onChange={e => update('placeholder', e.target.value)} className={fieldClass} />
          </div>
        )}
        {type === 'select' && (
          <div className="space-y-1">
            <label className={labelClass}>Варианты (по строке)</label>
            <textarea
              value={(props.options || []).join('\n')}
              onChange={e => update('options', e.target.value.split('\n'))}
              rows={4}
              className={fieldClass + ' font-mono text-xs'}
            />
          </div>
        )}
        {type === 'button' && (
          <>
            <div className="space-y-1">
              <label className={labelClass}>Текст кнопки</label>
              <input value={props.text || ''} onChange={e => update('text', e.target.value)} className={fieldClass} />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Вариант</label>
              <select value={props.variant || 'primary'} onChange={e => update('variant', e.target.value)} className={fieldClass}>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>onClick (JS)</label>
              <textarea value={props.onClick || ''} onChange={e => update('onClick', e.target.value)} rows={3} className={fieldClass + ' font-mono text-xs'} />
            </div>
          </>
        )}
        {type === 'textarea' && (
          <div className="space-y-1">
            <label className={labelClass}>Строки</label>
            <input type="number" value={props.rows || 3} onChange={e => update('rows', Number(e.target.value))} min={1} max={20} className={fieldClass} />
          </div>
        )}
      </div>
    </div>
  );
}
