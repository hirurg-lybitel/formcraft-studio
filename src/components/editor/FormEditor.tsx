import { useState } from 'react';
import type { FormData } from '@/types/form';
import { EditorToolbar } from './EditorToolbar';
import { ComponentPalette } from './ComponentPalette';
import { FormCanvas } from './FormCanvas';
import { CodeEditorPanel } from './CodeEditorPanel';
import { FormPreview } from './FormPreview';

interface Props {
  form: FormData;
  onChange: (form: FormData) => void;
  onSave: (form: FormData) => void;
  onBack: () => void;
}

export function FormEditor({ form, onChange, onSave, onBack }: Props) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <EditorToolbar
        form={form}
        onChange={onChange}
        onSave={() => onSave(form)}
        onBack={onBack}
        previewOpen={showPreview}
        onTogglePreview={() => setShowPreview(!showPreview)}
      />
      <div className="flex-1 flex min-h-0">
        {showPreview ? (
          <div className="flex-1 bg-canvas overflow-auto">
            <FormPreview form={form} />
          </div>
        ) : form.mode === 'visual' ? (
          <>
            <ComponentPalette />
            <div className="flex-1 bg-canvas canvas-grid overflow-auto">
              <FormCanvas form={form} onChange={onChange} />
            </div>
          </>
        ) : (
          <CodeEditorPanel form={form} onChange={onChange} />
        )}
      </div>
    </div>
  );
}
