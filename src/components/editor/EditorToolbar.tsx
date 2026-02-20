import { useState } from 'react';
import type { FormData, ComputedVariable } from '@/types/form';
import { Save, Eye, Code, Layout, ArrowLeft, Palette, Undo2, Redo2, Calculator, Plus, Trash2 } from 'lucide-react';

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
  const [showVars, setShowVars] = useState(false);

  const bg = form.background || {};
  const computedVars = form.computedVariables || [];

  const fieldClass = "w-full px-2 py-1.5 rounded bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring";

  const updateComputedVar = (idx: number, updates: Partial<ComputedVariable>) => {
    const next = [...computedVars];
    next[idx] = { ...next[idx], ...updates };
    onChange({ ...form, computedVariables: next });
  };
  const addComputedVar = () => {
    onChange({ ...form, computedVariables: [...computedVars, { name: '', expression: '' }] });
  };
  const removeComputedVar = (idx: number) => {
    onChange({ ...form, computedVariables: computedVars.filter((_, i) => i !== idx) });
  };

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
        onClick={() => { setShowBg(!showBg); setShowVars(false); }}
        className={`p-2 rounded transition-colors ${showBg ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-editor-hover'}`}
        title="Фон формы"
      >
        <Palette className="h-4 w-4" />
      </button>

      <button
        onClick={() => { setShowVars(!showVars); setShowBg(false); }}
        className={`p-2 rounded transition-colors ${showVars ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-editor-hover'}`}
        title="Вычисляемые переменные"
      >
        <Calculator className="h-4 w-4" />
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

      {/* Computed variables popover */}
      {showVars && (
        <div className="absolute top-12 left-44 z-50 w-80 p-3 rounded-lg border border-border bg-card shadow-xl space-y-3 max-h-[60vh] overflow-y-auto">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Вычисляемые переменные</h4>
          <p className="text-[10px] text-muted-foreground">
            Автоматически пересчитываются при изменении данных. Доступны через {'{{имя}}'}.
          </p>
          <div className="space-y-2">
            {computedVars.map((cv, idx) => (
              <div key={idx} className="p-2 rounded bg-secondary/50 border border-border space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">Переменная {idx + 1}</span>
                  <button onClick={() => removeComputedVar(idx)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                <input
                  value={cv.name}
                  onChange={e => updateComputedVar(idx, { name: e.target.value })}
                  placeholder="Имя (напр. totalSum)"
                  className={fieldClass + ' text-xs font-mono'}
                />
                <input
                  value={cv.expression}
                  onChange={e => updateComputedVar(idx, { expression: e.target.value })}
                  placeholder="Выражение"
                  className={fieldClass + ' text-xs font-mono'}
                />
              </div>
            ))}
          </div>
          <button
            onClick={addComputedVar}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <Plus className="h-3 w-3" /> Добавить переменную
          </button>
          <div className="border-t border-border pt-2 space-y-1">
            <p className="text-[10px] text-muted-foreground font-semibold">Доступные выражения:</p>
            <p className="text-[10px] text-muted-foreground"><code className="text-primary">sum(список.поле)</code> — сумма поля</p>
            <p className="text-[10px] text-muted-foreground"><code className="text-primary">sum(список.поле1 * список.поле2)</code> — сумма произведений</p>
            <p className="text-[10px] text-muted-foreground"><code className="text-primary">count(список)</code> — количество элементов</p>
          </div>
        </div>
      )}
    </div>
  );
}
