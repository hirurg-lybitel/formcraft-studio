import type { FormComponent } from '@/types/form';

interface Props {
  component: FormComponent;
  interactive?: boolean;
}

export function FormComponentRenderer({ component, interactive = false }: Props) {
  const { type, props } = component;

  switch (type) {
    case 'heading': {
      const Tag = (props.level || 'h2') as keyof JSX.IntrinsicElements;
      return <Tag className="text-xl font-bold text-foreground">{props.text}</Tag>;
    }
    case 'paragraph':
      return <p className="text-sm text-muted-foreground">{props.text}</p>;
    case 'text-input':
      return (
        <div className="space-y-1">
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
        <div className="space-y-1">
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
        <div className="space-y-1">
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
        <div className="space-y-1">
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
    case 'checkbox':
      return (
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input
            type="checkbox"
            disabled={!interactive}
            className="rounded border-border text-primary focus:ring-ring h-4 w-4"
          />
          {props.label}
        </label>
      );
    case 'button': {
      const isPrimary = props.variant === 'primary';
      return (
        <button
          type="button"
          onClick={interactive && props.onClick ? () => {
            try { new Function(props.onClick)(); } catch {}
          } : undefined}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isPrimary
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground hover:bg-editor-hover'
          }`}
        >
          {props.text}
        </button>
      );
    }
    case 'divider':
      return <hr className="border-border" />;
    default:
      return null;
  }
}
