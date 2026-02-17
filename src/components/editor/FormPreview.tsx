import type { FormData } from '@/types/form';
import { FormComponentRenderer } from './FormComponentRenderer';

interface Props {
  form: FormData;
}

export function FormPreview({ form }: Props) {
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="grid grid-cols-12 gap-2">
        {form.components.map(comp => (
          <div key={comp.id} style={{ gridColumn: `span ${comp.colSpan || 12}` }}>
            <FormComponentRenderer component={comp} interactive />
          </div>
        ))}
      </div>
    </div>
  );
}
