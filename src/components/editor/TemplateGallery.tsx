import { templates, createFormFromTemplate, createBlankForm } from '@/data/templates';
import type { FormData } from '@/types/form';
import { Plus } from 'lucide-react';

interface Props {
  onSelect: (form: FormData) => void;
}

export function TemplateGallery({ onSelect }: Props) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">Редактор форм</h1>
          <p className="text-muted-foreground">Выберите шаблон или создайте форму с нуля</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Blank form */}
          <button
            onClick={() => onSelect(createBlankForm())}
            className="group flex flex-col items-center justify-center gap-3 p-8 rounded-xl
                       border-2 border-dashed border-border hover:border-primary
                       bg-card hover:bg-editor-hover transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center
                          group-hover:bg-primary/20 transition-colors">
              <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
              Пустая форма
            </span>
          </button>

          {/* Templates */}
          {templates.map((t, i) => (
            <button
              key={i}
              onClick={() => onSelect(createFormFromTemplate(t))}
              className="group flex flex-col items-start gap-3 p-6 rounded-xl
                         border border-border hover:border-primary
                         bg-card hover:bg-editor-hover transition-all text-left"
            >
              <span className="text-3xl">{t.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{t.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
