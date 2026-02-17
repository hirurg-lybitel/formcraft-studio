import { useState, useCallback } from 'react';
import type { FormData } from '@/types/form';
import { EditorToolbar } from './EditorToolbar';
import { ComponentPalette } from './ComponentPalette';
import { FormCanvas } from './FormCanvas';
import { CodeEditorPanel } from './CodeEditorPanel';
import { FormPreview } from './FormPreview';
import { useFormHistory } from '@/hooks/useFormHistory';

interface Props {
  form: FormData;
  allForms: FormData[];
  onChange: (form: FormData) => void;
  onSave: (form: FormData) => void;
  onBack: () => void;
}

export function FormEditor({ form: initialForm, allForms, onChange, onSave, onBack }: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const history = useFormHistory(initialForm, onChange);

  const form = history.current;

  const handleChange = useCallback((updated: FormData) => {
    history.push(updated);
    onChange(updated);
  }, [history, onChange]);

  const handleBack = useCallback(() => {
    if (history.hasChanges) {
      const confirmed = window.confirm('У вас есть несохранённые изменения. Вы уверены, что хотите выйти?');
      if (!confirmed) return;
    }
    onBack();
  }, [history.hasChanges, onBack]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <EditorToolbar
        form={form}
        onChange={handleChange}
        onSave={() => onSave(form)}
        onBack={handleBack}
        previewOpen={showPreview}
        onTogglePreview={() => setShowPreview(!showPreview)}
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onUndo={history.undo}
        onRedo={history.redo}
      />
      <div className="flex-1 flex min-h-0">
        {showPreview ? (
          <div className="flex-1 bg-canvas overflow-auto">
            <FormPreview form={form} allForms={allForms} />
          </div>
        ) : form.mode === 'visual' ? (
          <>
            <ComponentPalette />
            <div className="flex-1 bg-canvas canvas-grid overflow-auto">
              <FormCanvas form={form} allFormNames={allForms.map(f => f.name)} onChange={handleChange} />
            </div>
          </>
        ) : (
          <CodeEditorPanel form={form} onChange={handleChange} />
        )}
      </div>
    </div>
  );
}
