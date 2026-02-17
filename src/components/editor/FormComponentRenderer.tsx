import type { FormComponent, ComponentStyle, ComponentAction } from '@/types/form';
import { mockDataSources } from '@/data/mockData';
import { usePreviewRuntime } from './PreviewRuntimeContext';

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

function executeActions(actions: ComponentAction[], runtime: ReturnType<typeof usePreviewRuntime>) {
  actions.forEach(act => {
    if (act.action === 'openForm') {
      window.dispatchEvent(new CustomEvent('form:openForm', {
        detail: { formName: act.value, mode: act.openMode || 'modal' },
      }));
      return;
    }
    if (act.action === 'closeForm') {
      window.dispatchEvent(new CustomEvent('form:closeForm'));
      return;
    }
    if (act.action === 'setVariable' && runtime) {
      runtime.setVariable(act.targetName, act.value || '');
      return;
    }
    if (act.action === 'addToCart' && runtime) {
      // targetName = name of the select component holding the product
      const selectedLabel = runtime.getVariable(act.targetName);
      if (!selectedLabel) return;
      const qtyVar = act.value ? runtime.getVariable(act.value) : undefined;
      const qty = parseInt(qtyVar, 10) || 1;
      const price = parsePrice(selectedLabel);
      const nameMatch = selectedLabel.match(/^(.+?)(?:\s*[—\-]\s*\d+)/);
      const itemName = nameMatch ? nameMatch[1].trim() : selectedLabel;
      runtime.addToCart({ name: itemName, price, priceLabel: `${price} ₽`, qty });
      // Auto-update cartTotal variable for {{cartTotal}} interpolation
      return;
    }
    if (act.action === 'clearCart' && runtime) {
      runtime.clearCart();
      return;
    }
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

/** Parse price like "59 ₽" or "Хлеб белый — 59₽" to number */
function parsePrice(str: string): number {
  const match = str.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function FormComponentRenderer({ component, interactive = false }: Props) {
  const { type, props, style, name } = component;
  const inlineStyle = buildInlineStyle(style);
  const runtime = usePreviewRuntime();

  /** Resolve {{var}} in text if in interactive mode */
  const resolve = (text: string | undefined): string => {
    if (!text) return '';
    if (interactive && runtime) return runtime.interpolate(text);
    return text;
  };

  switch (type) {
    case 'heading': {
      const Tag = (props.level || 'h2') as keyof JSX.IntrinsicElements;
      return <Tag data-name={name} className="text-xl font-bold text-foreground" style={inlineStyle}>{resolve(props.text)}</Tag>;
    }
    case 'paragraph':
      return <p data-name={name} className="text-sm text-muted-foreground" style={inlineStyle}>{resolve(props.text)}</p>;
    case 'text-input':
      return <TextInputRenderer name={name} props={props} style={inlineStyle} interactive={interactive} />;
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
      return <NumberInputRenderer name={name} props={props} style={inlineStyle} interactive={interactive} />;
    case 'select':
      return <SelectRenderer name={name} props={props} style={inlineStyle} interactive={interactive} />;
    case 'data-select':
      return <DataSelectRenderer name={name} props={props} style={inlineStyle} interactive={interactive} />;
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
    case 'button':
      return <ButtonRenderer component={component} interactive={interactive} inlineStyle={inlineStyle} />;
    case 'table':
      return <TableRenderer component={component} interactive={interactive} inlineStyle={inlineStyle} />;
    case 'divider':
      return <hr data-name={name} className="border-border" style={inlineStyle} />;
    default:
      return null;
  }
}

/* ---- Sub-components for stateful rendering ---- */

function TextInputRenderer({ name, props, style, interactive }: { name?: string; props: Record<string, any>; style: React.CSSProperties; interactive: boolean }) {
  const runtime = usePreviewRuntime();
  return (
    <div data-name={name} className="space-y-1" style={style}>
      <label className="text-sm font-medium text-foreground">{props.label}</label>
      <input
        type="text"
        placeholder={props.placeholder}
        readOnly={!interactive}
        onChange={interactive && runtime && name ? (e) => runtime.setVariable(name, e.target.value) : undefined}
        className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-foreground
                   placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function NumberInputRenderer({ name, props, style, interactive }: { name?: string; props: Record<string, any>; style: React.CSSProperties; interactive: boolean }) {
  const runtime = usePreviewRuntime();
  return (
    <div data-name={name} className="space-y-1" style={style}>
      <label className="text-sm font-medium text-foreground">{props.label}</label>
      <input
        type="number"
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        readOnly={!interactive}
        onChange={interactive && runtime && name ? (e) => runtime.setVariable(name, e.target.value) : undefined}
        className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-foreground
                   placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function SelectRenderer({ name, props, style, interactive }: { name?: string; props: Record<string, any>; style: React.CSSProperties; interactive: boolean }) {
  const runtime = usePreviewRuntime();
  return (
    <div data-name={name} className="space-y-1" style={style}>
      <label className="text-sm font-medium text-foreground">{props.label}</label>
      <select
        disabled={!interactive}
        onChange={interactive && runtime && name ? (e) => runtime.setVariable(name, e.target.value) : undefined}
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
}

function DataSelectRenderer({ name, props, style, interactive }: { name?: string; props: Record<string, any>; style: React.CSSProperties; interactive: boolean }) {
  const runtime = usePreviewRuntime();
  const source = mockDataSources[props.dataSource];
  const items = source ? source.items : [];
  return (
    <div data-name={name} className="space-y-1" style={style}>
      <label className="text-sm font-medium text-foreground">{props.label}</label>
      <select
        disabled={!interactive}
        onChange={interactive && runtime && name ? (e) => runtime.setVariable(name, e.target.value) : undefined}
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

function ButtonRenderer({ component, interactive, inlineStyle }: { component: FormComponent; interactive: boolean; inlineStyle: React.CSSProperties }) {
  const { props, name } = component;
  const isPrimary = props.variant === 'primary';
  const runtime = usePreviewRuntime();

  const handleClick = () => {
    if (!interactive) return;

    if (component.actions?.length) {
      executeActions(component.actions, runtime);
    }
    if (props.onClick) {
      try { new Function(props.onClick)(); } catch {}
    }
  };

  return (
    <button
      data-name={name}
      type="button"
      onClick={interactive ? handleClick : undefined}
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

function TableRenderer({ component, interactive, inlineStyle }: { component: FormComponent; interactive: boolean; inlineStyle: React.CSSProperties }) {
  const { props, name } = component;
  const runtime = usePreviewRuntime();
  const columns = props.columns || [];
  let rows = props.rows || [];

  // If table has a filterBy prop, filter rows using that variable
  if (interactive && runtime && props.filterBy) {
    const filterText = runtime.getVariable(props.filterBy) || '';
    if (typeof filterText === 'string' && filterText.trim()) {
      const lower = filterText.toLowerCase();
      rows = rows.filter((row: any) =>
        Object.values(row).some((val: any) => String(val).toLowerCase().includes(lower))
      );
    }
  }

  // If table has a dataSource of "cart", render from runtime cart
  if (interactive && runtime && props.dataSourceVar === 'cart') {
    rows = runtime.cart.map(item => ({
      name: item.name,
      price: item.priceLabel,
      qty: item.qty,
      total: `${item.price * item.qty} ₽`,
    }));
  }

  return (
    <div data-name={name} className="overflow-auto" style={inlineStyle}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {columns.map((col: any, i: number) => (
              <th key={i} className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground bg-secondary border border-border">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any, ri: number) => (
            <tr key={ri} className="hover:bg-secondary/50">
              {columns.map((col: any, ci: number) => (
                <td key={ci} className="px-3 py-2 border border-border text-foreground">{row[col.key] ?? ''}</td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} className="px-3 py-4 text-center text-muted-foreground border border-border">Нет данных</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
