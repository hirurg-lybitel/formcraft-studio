import type { DragItem } from '@/types/form';

export const paletteItems: DragItem[] = [
  { type: 'heading', label: 'Заголовок', icon: 'Type', defaultProps: { text: 'Заголовок', level: 'h2' } },
  { type: 'paragraph', label: 'Текст', icon: 'AlignLeft', defaultProps: { text: 'Текстовый блок' } },
  { type: 'text-input', label: 'Текстовое поле', icon: 'TextCursorInput', defaultProps: { label: 'Поле', placeholder: 'Введите текст...' } },
  { type: 'textarea', label: 'Многострочное', icon: 'FileText', defaultProps: { label: 'Описание', placeholder: 'Введите текст...', rows: 3 } },
  { type: 'number-input', label: 'Числовое поле', icon: 'Hash', defaultProps: { label: 'Число', placeholder: '0' } },
  { type: 'select', label: 'Выпадающий список', icon: 'ChevronDown', defaultProps: { label: 'Выбор', options: ['Вариант 1', 'Вариант 2', 'Вариант 3'] } },
  { type: 'data-select', label: 'Список из БД', icon: 'Database', defaultProps: { label: 'Данные', dataSource: 'mock', options: [] } },
  { type: 'checkbox', label: 'Чекбокс', icon: 'CheckSquare', defaultProps: { label: 'Флажок' } },
  { type: 'date-picker', label: 'Дата', icon: 'Calendar', defaultProps: { label: 'Дата' } },
  { type: 'image', label: 'Изображение', icon: 'ImageIcon', defaultProps: { src: 'https://placehold.co/400x200/2a3040/94a3b8?text=Image', alt: 'Изображение', width: '100%' } },
  { type: 'button', label: 'Кнопка', icon: 'MousePointerClick', defaultProps: { text: 'Кнопка', variant: 'primary', onClick: '' } },
  { type: 'table', label: 'Таблица', icon: 'Table', defaultProps: { columns: [{ key: 'col1', label: 'Столбец 1' }, { key: 'col2', label: 'Столбец 2' }], rows: [{ col1: 'Значение 1', col2: 'Значение 2' }] } },
  { type: 'divider', label: 'Разделитель', icon: 'Minus', defaultProps: {} },
];
