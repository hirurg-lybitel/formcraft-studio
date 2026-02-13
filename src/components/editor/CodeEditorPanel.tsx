import type { FormData } from '@/types/form';
import { FormComponentRenderer } from './FormComponentRenderer';

interface Props {
  form: FormData;
  onChange: (form: FormData) => void;
}

function componentsToHtml(form: FormData): string {
  return form.components.map(c => {
    switch (c.type) {
      case 'heading': return `<${c.props.level || 'h2'}>${c.props.text}</${c.props.level || 'h2'}>`;
      case 'paragraph': return `<p>${c.props.text}</p>`;
      case 'text-input': return `<div class="field">\n  <label>${c.props.label}</label>\n  <input type="text" placeholder="${c.props.placeholder || ''}" />\n</div>`;
      case 'textarea': return `<div class="field">\n  <label>${c.props.label}</label>\n  <textarea rows="${c.props.rows || 3}" placeholder="${c.props.placeholder || ''}"></textarea>\n</div>`;
      case 'number-input': return `<div class="field">\n  <label>${c.props.label}</label>\n  <input type="number" placeholder="${c.props.placeholder || ''}" />\n</div>`;
      case 'select': return `<div class="field">\n  <label>${c.props.label}</label>\n  <select>\n    <option value="">Выберите...</option>\n${(c.props.options||[]).map((o:string) => `    <option>${o}</option>`).join('\n')}\n  </select>\n</div>`;
      case 'checkbox': return `<label class="checkbox"><input type="checkbox" /> ${c.props.label}</label>`;
      case 'button': return `<button class="btn ${c.props.variant || 'primary'}" onclick="${(c.props.onClick || '').replace(/"/g, '&quot;')}">${c.props.text}</button>`;
      case 'divider': return `<hr />`;
      default: return '';
    }
  }).join('\n\n');
}

export function CodeEditorPanel({ form, onChange }: Props) {
  const html = form.customHtml || componentsToHtml(form);
  const css = form.customCss;
  const js = form.customJs;

  const tabClass = (active: boolean) =>
    `px-3 py-1.5 text-xs font-medium rounded-t transition-colors ${
      active ? 'bg-editor-surface text-foreground' : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="grid grid-cols-3 gap-px bg-border flex-1 overflow-hidden">
        {/* HTML */}
        <div className="flex flex-col bg-editor-surface">
          <div className="px-3 py-2 border-b border-border flex items-center gap-2">
            <span className="text-xs font-mono text-primary">HTML</span>
          </div>
          <textarea
            value={html}
            onChange={e => onChange({ ...form, customHtml: e.target.value })}
            spellCheck={false}
            className="flex-1 p-3 bg-transparent text-foreground font-mono text-xs resize-none
                       focus:outline-none leading-relaxed"
          />
        </div>
        {/* CSS */}
        <div className="flex flex-col bg-editor-surface">
          <div className="px-3 py-2 border-b border-border">
            <span className="text-xs font-mono text-accent">CSS</span>
          </div>
          <textarea
            value={css}
            onChange={e => onChange({ ...form, customCss: e.target.value })}
            spellCheck={false}
            placeholder=".field { margin-bottom: 1rem; }"
            className="flex-1 p-3 bg-transparent text-foreground font-mono text-xs resize-none
                       focus:outline-none leading-relaxed placeholder:text-muted-foreground/40"
          />
        </div>
        {/* JS */}
        <div className="flex flex-col bg-editor-surface">
          <div className="px-3 py-2 border-b border-border">
            <span className="text-xs font-mono text-warning">JS</span>
          </div>
          <textarea
            value={js}
            onChange={e => onChange({ ...form, customJs: e.target.value })}
            spellCheck={false}
            placeholder="// custom scripts"
            className="flex-1 p-3 bg-transparent text-foreground font-mono text-xs resize-none
                       focus:outline-none leading-relaxed placeholder:text-muted-foreground/40"
          />
        </div>
      </div>
    </div>
  );
}
