import type { FormData } from '@/types/form';
import { Save, Eye, Code, Layout, ArrowLeft } from 'lucide-react';

interface Props {
  form: FormData;
  onChange: (form: FormData) => void;
  onSave: () => void;
  onBack: () => void;
  previewOpen: boolean;
  onTogglePreview: () => void;
}

export function EditorToolbar({ form, onChange, onSave, onBack, previewOpen, onTogglePreview }: Props) {
  const isCode = form.mode === 'code';

  return (
    <div className="h-12 border-b border-border bg-editor-surface flex items-center px-3 gap-2">
      <button onClick={onBack} className="p-2 rounded hover:bg-editor-hover text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
      </button>

      <input
        value={form.name}
        onChange={e => onChange({ ...form, name: e.target.value })}
        className="bg-transparent border-none text-foreground font-medium text-sm focus:outline-none
                   px-2 py-1 rounded hover:bg-editor-hover focus:bg-editor-hover w-48"
      />

      <div className="flex-1" />

      <div className="flex items-center bg-secondary rounded-md p-0.5">
        <button
          onClick={() => onChange({ ...form, mode: 'visual' })}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
            !isCode ? 'bg-editor-surface text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Layout className="h-3.5 w-3.5" /> Визуальный
        </button>
        <button
          onClick={() => onChange({ ...form, mode: 'code' })}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
            isCode ? 'bg-editor-surface text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Code className="h-3.5 w-3.5" /> Код
        </button>
      </div>

      <button
        onClick={onTogglePreview}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
          previewOpen ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-editor-hover'
        }`}
      >
        <Eye className="h-3.5 w-3.5" /> Превью
      </button>

      <button
        onClick={onSave}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-primary text-primary-foreground
                   text-xs font-semibold hover:bg-primary/90 transition-colors glow-primary"
      >
        <Save className="h-3.5 w-3.5" /> Сохранить
      </button>
    </div>
  );
}
