import type { FormData } from '@/types/form';
import { FileText, Pencil, Trash2 } from 'lucide-react';

interface Props {
  forms: FormData[];
  activeId: string | null;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onHome: () => void;
}

export function Sidebar({ forms, activeId, onView, onEdit, onDelete, onHome }: Props) {
  return (
    <div className="w-56 border-r border-border bg-sidebar flex flex-col shrink-0">
      <button
        onClick={onHome}
        className="px-4 py-3 border-b border-sidebar-border text-left hover:bg-sidebar-accent transition-colors"
      >
        <h2 className="text-sm font-bold text-primary tracking-wide">⚡ FormBuilder</h2>
      </button>

      <div className="flex-1 overflow-y-auto">
        {forms.length > 0 && (
          <div className="px-3 pt-4 pb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Сохранённые формы
            </h3>
            <div className="space-y-0.5">
              {forms.map(f => (
                <div
                  key={f.id}
                  className={`group flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-colors text-sm
                    ${activeId === f.id ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent/50'}
                  `}
                  onClick={() => onView(f.id)}
                >
                  <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1 truncate">{f.name}</span>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-0.5 transition-opacity">
                    <button
                      onClick={e => { e.stopPropagation(); onEdit(f.id); }}
                      className="p-1 rounded hover:bg-editor-hover text-muted-foreground hover:text-primary"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); onDelete(f.id); }}
                      className="p-1 rounded hover:bg-editor-hover text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
