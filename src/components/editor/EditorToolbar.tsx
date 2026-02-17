import { useState } from 'react';
import type { FormData } from '@/types/form';
import { Save, Eye, Code, Layout, ArrowLeft, Palette, Undo2, Redo2 } from 'lucide-react';

interface Props {
  form: FormData;
  onChange: (form: FormData) => void;
  onSave: () => void;
  onBack: () => void;
  previewOpen: boolean;
  onTogglePreview: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export function EditorToolbar({ form, onChange, onSave, onBack, previewOpen, onTogglePreview, canUndo, canRedo, onUndo, onRedo }: Props) {
  const isCode = form.mode === 'code';
  const [showBg, setShowBg] = useState(false);

  const bg = form.background || {};

  return (
    <div className="h-12 border-b border-border bg-editor-surface flex items-center px-3 gap-2 relative">
      <button onClick={onBack} className="p-2 rounded hover:bg-editor-hover text-muted-foreground hover:text-foreground transition-colors" title="Назад">
        <ArrowLeft className="h-4 w-4" />
      </button>

      <input
        value={form.name}
        onChange={e => onChange({ ...form, name: e.target.value })}
        className="bg-transparent border-none text-foreground font-medium text-sm focus:outline-none
                   px-2 py-1 rounded hover:bg-editor-hover focus:bg-editor-hover w-48"
      />

      {/* Undo / Redo */}
      <div className="flex items-center gap-0.5 ml-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-1.5 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-editor-hover disabled:opacity-30 disabled:cursor-not-allowed"
          title="Отменить (Undo)"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-1.5 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-editor-hover disabled:opacity-30 disabled:cursor-not-allowed"
          title="Повторить (Redo)"
        >
          <Redo2 className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={() => setShowBg(!showBg)}
        className={`p-2 rounded transition-colors ${showBg ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-editor-hover'}`}
        title="Фон формы"
      >
        <Palette className="h-4 w-4" />
      </button>

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

      {/* Background settings popover */}
      {showBg && (
        <div className="absolute top-12 left-32 z-50 w-64 p-3 rounded-lg border border-border bg-card shadow-xl space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Фон формы</h4>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Цвет фона</label>
            <div className="flex gap-1">
              <input
                type="color"
                value={bg.color || '#1a1f2e'}
                onChange={e => onChange({ ...form, background: { ...bg, color: e.target.value } })}
                className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent"
              />
              <input
                value={bg.color || ''}
                onChange={e => onChange({ ...form, background: { ...bg, color: e.target.value } })}
                placeholder="Не задан"
                className="flex-1 px-2 py-1.5 rounded bg-secondary border border-border text-foreground text-sm"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">URL фонового изображения</label>
            <input
              value={bg.image || ''}
              onChange={e => onChange({ ...form, background: { ...bg, image: e.target.value } })}
              placeholder="https://..."
              className="w-full px-2 py-1.5 rounded bg-secondary border border-border text-foreground text-sm"
            />
          </div>
          <button
            onClick={() => onChange({ ...form, background: undefined })}
            className="text-xs text-destructive hover:text-destructive/80"
          >
            Сбросить фон
          </button>
        </div>
      )}
    </div>
  );
}
