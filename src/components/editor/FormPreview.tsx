import { useState, useEffect, useCallback } from 'react';
import type { FormData } from '@/types/form';
import { FormComponentRenderer } from './FormComponentRenderer';
import { PreviewRuntimeProvider } from './PreviewRuntimeContext';
import { X } from 'lucide-react';

interface Props {
  form: FormData;
  allForms?: FormData[];
}

function getGridColumn(comp: { colStart?: number; colSpan?: number }): string {
  if (comp.colStart) {
    return `${comp.colStart} / span ${comp.colSpan || 12}`;
  }
  return `span ${comp.colSpan || 12}`;
}

function FormContent({ form }: { form: FormData }) {
  const bgStyle: React.CSSProperties = {};
  if (form.background?.color) bgStyle.backgroundColor = form.background.color;
  if (form.background?.image) {
    bgStyle.backgroundImage = `url(${form.background.image})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg" style={bgStyle}>
      <div className="grid grid-cols-12 gap-2">
        {form.components.map(comp => (
          <div key={comp.id} style={{ gridColumn: getGridColumn(comp) }}>
            <FormComponentRenderer component={comp} interactive />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormPreview({ form, allForms = [] }: Props) {
  const [modalForm, setModalForm] = useState<FormData | null>(null);
  const [replacedForm, setReplacedForm] = useState<FormData | null>(null);

  const handleOpenForm = useCallback((e: Event) => {
    const detail = (e as CustomEvent).detail;
    const formName = detail.formName;
    const target = allForms.find(f => f.name === formName);
    if (!target) {
      alert(`Форма "${formName}" не найдена. Убедитесь, что она сохранена в редакторе.`);
      return;
    }
    if (detail.mode === 'replace') {
      setReplacedForm(target);
    } else {
      setModalForm(target);
    }
  }, [allForms]);

  const handleCloseForm = useCallback(() => {
    if (modalForm) setModalForm(null);
    else if (replacedForm) setReplacedForm(null);
  }, [modalForm, replacedForm]);

  useEffect(() => {
    window.addEventListener('form:openForm', handleOpenForm);
    window.addEventListener('form:closeForm', handleCloseForm);
    return () => {
      window.removeEventListener('form:openForm', handleOpenForm);
      window.removeEventListener('form:closeForm', handleCloseForm);
    };
  }, [handleOpenForm, handleCloseForm]);

  if (form.customHtml) {
    const html = `<!DOCTYPE html>
<html><head><style>
body { font-family: Inter, sans-serif; margin: 20px; color: #e2e8f0; background: #1a1f2e; }
input, textarea, select { display:block; width:100%; padding:8px 12px; margin-top:4px; border-radius:6px; background:#2a3040; border:1px solid #3a4050; color:#e2e8f0; font-size:14px; box-sizing:border-box; }
.field { margin-bottom: 16px; }
label { font-size: 14px; font-weight: 500; }
.checkbox { display:flex; align-items:center; gap:8px; cursor:pointer; font-size:14px; }
.btn { padding:8px 16px; border-radius:6px; font-size:14px; font-weight:500; cursor:pointer; border:none; }
.btn.primary { background:#2dd4bf; color:#111827; }
.btn.secondary { background:#2a3040; color:#e2e8f0; }
hr { border-color:#3a4050; }
h1,h2,h3 { color:#f1f5f9; }
p { color:#94a3b8; font-size:14px; }
${form.customCss || ''}
</style></head><body>${form.customHtml}<script>${form.customJs || ''}</script></body></html>`;

    return (
      <iframe
        srcDoc={html}
        className="w-full h-full border-none"
        sandbox="allow-scripts"
        title="Form preview"
      />
    );
  }

  const activeForm = replacedForm || form;

  return (
    <PreviewRuntimeProvider>
      <div className="relative h-full">
        <FormContent form={activeForm} />

        {replacedForm && (
          <button
            onClick={() => setReplacedForm(null)}
            className="fixed top-4 left-4 z-50 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium hover:bg-editor-hover"
          >
            ← Назад
          </button>
        )}

        {modalForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl max-h-[85vh] overflow-auto bg-card rounded-xl border border-border shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-border bg-card">
                <h3 className="text-sm font-semibold text-foreground">{modalForm.name}</h3>
                <button onClick={() => setModalForm(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <FormContent form={modalForm} />
            </div>
          </div>
        )}
      </div>
    </PreviewRuntimeProvider>
  );
}
