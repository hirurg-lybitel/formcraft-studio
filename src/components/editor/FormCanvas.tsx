import { useState } from 'react';
import type { FormComponent, FormData, DragItem } from '@/types/form';
import { FormComponentRenderer } from './FormComponentRenderer';
import { Trash2, GripVertical, Settings } from 'lucide-react';
import { PropertyEditor } from './PropertyEditor';

interface Props {
  form: FormData;
  onChange: (form: FormData) => void;
}

export function FormCanvas({ form, onChange }: Props) {
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addComponent = (item: DragItem, index: number) => {
    const newComp: FormComponent = {
      id: Math.random().toString(36).slice(2, 10),
      type: item.type,
      props: { ...item.defaultProps },
    };
    const comps = [...form.components];
    comps.splice(index, 0, newComp);
    onChange({ ...form, components: comps });
  };

  const removeComponent = (id: string) => {
    onChange({ ...form, components: form.components.filter(c => c.id !== id) });
    if (editingId === id) setEditingId(null);
  };

  const updateComponent = (id: string, props: Record<string, any>) => {
    onChange({
      ...form,
      components: form.components.map(c => c.id === id ? { ...c, props } : c),
    });
  };

  const moveComponent = (fromIdx: number, toIdx: number) => {
    const comps = [...form.components];
    const [moved] = comps.splice(fromIdx, 1);
    comps.splice(toIdx > fromIdx ? toIdx - 1 : toIdx, 0, moved);
    onChange({ ...form, components: comps });
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIdx(null);
    const raw = e.dataTransfer.getData('application/json');
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data.reorderIdx !== undefined) {
        moveComponent(data.reorderIdx, index);
      } else {
        addComponent(data as DragItem, index);
      }
    } catch {}
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverIdx(index);
  };

  const editingComponent = editingId ? form.components.find(c => c.id === editingId) : null;

  return (
    <div className="flex-1 flex">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-lg mx-auto">
          {/* Drop zone at top */}
          <div
            onDrop={e => handleDrop(e, 0)}
            onDragOver={e => handleDragOver(e, 0)}
            onDragLeave={() => setDragOverIdx(null)}
            className={`h-3 rounded transition-all ${dragOverIdx === 0 ? 'bg-primary/30 h-8' : ''}`}
          />

          {form.components.map((comp, idx) => (
            <div key={comp.id}>
              <div
                className={`group relative rounded-lg border transition-all mb-1
                  ${editingId === comp.id ? 'border-primary bg-primary/5' : 'border-transparent hover:border-border'}
                `}
              >
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div
                    draggable
                    onDragStart={e => {
                      e.dataTransfer.setData('application/json', JSON.stringify({ reorderIdx: idx }));
                    }}
                    className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                  >
                    <GripVertical className="h-4 w-4" />
                  </div>
                </div>
                <div className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={() => setEditingId(editingId === comp.id ? null : comp.id)}
                    className="p-1 rounded hover:bg-editor-hover text-muted-foreground hover:text-primary"
                  >
                    <Settings className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => removeComponent(comp.id)}
                    className="p-1 rounded hover:bg-editor-hover text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="p-3" onClick={() => setEditingId(comp.id)}>
                  <FormComponentRenderer component={comp} />
                </div>
              </div>
              <div
                onDrop={e => handleDrop(e, idx + 1)}
                onDragOver={e => handleDragOver(e, idx + 1)}
                onDragLeave={() => setDragOverIdx(null)}
                className={`h-1 rounded transition-all ${dragOverIdx === idx + 1 ? 'bg-primary/30 h-8' : ''}`}
              />
            </div>
          ))}

          {form.components.length === 0 && (
            <div
              onDrop={e => handleDrop(e, 0)}
              onDragOver={e => handleDragOver(e, 0)}
              onDragLeave={() => setDragOverIdx(null)}
              className="border-2 border-dashed border-border rounded-xl p-12 text-center text-muted-foreground"
            >
              <p className="text-sm">Перетащите компоненты сюда</p>
            </div>
          )}
        </div>
      </div>

      {editingComponent && (
        <PropertyEditor
          component={editingComponent}
          onChange={props => updateComponent(editingComponent.id, props)}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  );
}
