import type { FormComponent, ComponentStyle } from '@/types/form';
import { mockDataSources } from '@/data/mockData';

interface Props {
  component: FormComponent;
  interactive?: boolean;
}

function buildInlineStyle(style?: ComponentStyle): React.CSSProperties {
  if (!style) return {};
  const s: React.CSSProperties = {};
  if (style.color) s.color = style.color;
  if (style.fontSize) {
    s.fontSize = `${style.fontSize}${style.fontSizeUnit || 'px'}`;
  }
  if (style.borderRadius) s.borderRadius = style.borderRadius;
  if (style.backgroundColor) s.backgroundColor = style.backgroundColor;
  return s;
}

export function FormComponentRenderer({ component, interactive = false }: Props) {
  const { type, props, style, name } = component;
  const inlineStyle = buildInlineStyle(style);

  switch (type) {
    case 'heading': {
      const Tag = (props.level || 'h2') as keyof JSX.IntrinsicElements;
      return <Tag data-name={name} className="text-xl font-bold text-foreground" style={inlineStyle}>{props.text}</Tag>;
    }
    case 'paragraph':
      return <p data-name={name} className="text-sm text-muted-foreground" style={inlineStyle}>{props.text}</p>;
    case 'text-input':
      return (
        <div data-name={name} className="space-y-1" style={inlineStyle}>
          <label className="text-sm font-medium text-foreground">{props.label}</label>
          <input
            type="text"
            placeholder={props.placeholder}
            readOnly={!interactive}
            className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-foreground
                       placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      );
    case 'textarea':
      return (
        <div data-name={name} className="space-y-1" style={inlineStyle}>
          <label className="text-sm font-medium text-foreground">{props.label}</label>
          <textarea
            placeholder={props.placeholder}
            rows={props.rows || 3}
            readOnly={!interactive}
            className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-foreground
                       placeholder:text-muted-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      );
    case 'number-input':
      return (
        <div data-name={name} className="space-y-1" style={inlineStyle}>
          <label className="text-sm font-medium text-foreground">{props.label}</label>
          <input
            type="number"
            placeholder={props.placeholder}
            min={props.min}
            max={props.max}
            readOnly={!interactive}
            className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-foreground
                       placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      );
    case 'select':
      return (
        <div data-name={name} className="space-y-1" style={inlineStyle}>
          <label className="text-sm font-medium text-foreground">{props.label}</label>
          <select
            disabled={!interactive}
            className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-foreground text-sm
                       focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Выберите...</option>
            {(props.options || []).map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );
    case 'data-select': {
      const source = mockDataSources[props.dataSource];
      const items = source ? source.items : [];
      return (
        <div data-name={name} className="space-y-1" style={inlineStyle}>
          <label className="text-sm font-medium text-foreground">{props.label}</label>
          <select
            disabled={!interactive}
            className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-foreground text-sm
                       focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Выберите...</option>
            {items.map(item => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
          {!source && <p className="text-xs text-destructive">Источник данных не найден</p>}
        </div>
      );
    }
    case 'checkbox':
      return (
        <label data-name={name} className="flex items-center gap-2 text-sm text-foreground cursor-pointer" style={inlineStyle}>
          <input
            type="checkbox"
            disabled={!interactive}
            className="rounded border-border text-primary focus:ring-ring h-4 w-4"
          />
          {props.label}
        </label>
      );
    case 'date-picker':
      return (
        <div data-name={name} className="space-y-1" style={inlineStyle}>
          <label className="text-sm font-medium text-foreground">{props.label}</label>
          <input
            type="date"
            readOnly={!interactive}
            className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-foreground text-sm
                       focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      );
    case 'image':
      return (
        <div data-name={name} style={inlineStyle}>
          <img
            src={props.src}
            alt={props.alt || ''}
            style={{ width: props.width || '100%', borderRadius: style?.borderRadius }}
            className="max-w-full"
          />
        </div>
      );
    case 'button': {
      const isPrimary = props.variant === 'primary';
      return (
        <button
          data-name={name}
          type="button"
          onClick={interactive ? () => {
            // Execute visual actions
            if (component.actions?.length) {
              component.actions.forEach(act => {
                const target = document.querySelector(`[data-name="${act.targetName}"]`) as HTMLElement;
                if (!target) return;
                switch (act.action) {
                  case 'setText':
                    target.textContent = act.value || '';
                    break;
                  case 'setColor':
                    target.style.color = act.value || '';
                    break;
                  case 'setBgColor':
                    target.style.backgroundColor = act.value || '';
                    break;
                  case 'hide':
                    target.style.display = 'none';
                    break;
                  case 'show':
                    target.style.display = '';
                    break;
                  case 'toggleVisibility':
                    target.style.display = target.style.display === 'none' ? '' : 'none';
                    break;
                }
              });
            }
            // Execute custom JS
            if (props.onClick) {
              try { new Function(props.onClick)(); } catch {}
            }
          } : undefined}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isPrimary
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground hover:bg-editor-hover'
          }`}
          style={inlineStyle}
        >
          {props.text}
        </button>
      );
    }
    case 'divider':
      return <hr data-name={name} className="border-border" style={inlineStyle} />;
    default:
      return null;
  }
}
