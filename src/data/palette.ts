import type { DragItem } from '@/types/form';

export const paletteItems: DragItem[] = [
  { type: 'heading', label: 'Заголовок', icon: 'Type', defaultProps: { text: 'Заголовок', level: 'h2' } },
  { type: 'paragraph', label: 'Текст', icon: 'AlignLeft', defaultProps: { text: 'Текстовый блок' } },
  { type: 'text-input', label: 'Текстовое поле', icon: 'TextCursorInput', defaultProps: { label: 'Поле', placeholder: 'Введите текст...' } },
  { type: 'textarea', label: 'Многострочное', icon: 'FileText', defaultProps: { label: 'Описание', placeholder: 'Введите текст...', rows: 3 } },
  { type: 'number-input', label: 'Числовое поле', icon: 'Hash', defaultProps: { label: 'Число', placeholder: '0' } },
  { type: 'select', label: 'Выпадающий список', icon: 'ChevronDown', defaultProps: { label: 'Выбор', options: ['Вариант 1', 'Вариант 2', 'Вариант 3'] } },
  { type: 'checkbox', label: 'Чекбокс', icon: 'CheckSquare', defaultProps: { label: 'Флажок' } },
  { type: 'button', label: 'Кнопка', icon: 'MousePointerClick', defaultProps: { text: 'Кнопка', variant: 'primary', onClick: '' } },
  { type: 'divider', label: 'Разделитель', icon: 'Minus', defaultProps: {} },
];
