import { paletteItems } from '@/data/palette';
import {
  Type, AlignLeft, TextCursorInput, FileText, Hash,
  ChevronDown, CheckSquare, MousePointerClick, Minus,
  Calendar, ImageIcon, Database, Table
} from 'lucide-react';
import type { DragItem } from '@/types/form';

const iconMap: Record<string, React.FC<any>> = {
  Type, AlignLeft, TextCursorInput, FileText, Hash,
  ChevronDown, CheckSquare, MousePointerClick, Minus,
  Calendar, ImageIcon, Database, Table,
};

export function ComponentPalette() {
  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="w-56 border-r border-border bg-palette flex flex-col">
      <div className="px-3 py-3 border-b border-border">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Компоненты
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {paletteItems.map(item => {
          const Icon = iconMap[item.icon];
          return (
            <div
              key={item.type}
              draggable
              onDragStart={e => handleDragStart(e, item)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-secondary-foreground
                         bg-secondary/50 hover:bg-editor-hover cursor-grab active:cursor-grabbing
                         transition-colors select-none"
            >
              {Icon && <Icon className="h-4 w-4 text-primary shrink-0" />}
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
