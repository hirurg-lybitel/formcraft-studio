import type { FormComponent, ComponentAction } from '@/types/form';
import { mockDataSources } from '@/data/mockData';
import { X, Plus, Trash2 } from 'lucide-react';

interface Props {
  component: FormComponent;
  allComponents: FormComponent[];
  allFormNames?: string[];
  onChange: (updates: Partial<FormComponent>) => void;
  onClose: () => void;
}

const ACTION_LABELS: Record<string, string> = {
  setText: 'Изменить текст',
  setColor: 'Изменить цвет текста',
  setBgColor: 'Изменить фон',
  hide: 'Скрыть',
  show: 'Показать',
  toggleVisibility: 'Переключить видимость',
  openForm: 'Открыть форму',
  closeForm: 'Закрыть форму',
};

export function PropertyEditor({ component, allComponents, allFormNames = [], onChange, onClose }: Props) {
  const { type, props, style = {}, name = '', colSpan = 12, colStart, actions = [] } = component;

  const updateProp = (key: string, value: any) => {
    onChange({ props: { ...props, [key]: value } });
  };
  const updateStyle = (key: string, value: any) => {
    onChange({ style: { ...style, [key]: value } });
  };
  const updateAction = (idx: number, updates: Partial<ComponentAction>) => {
    const newActions = [...actions];
    newActions[idx] = { ...newActions[idx], ...updates };
    onChange({ actions: newActions });
  };
  const addAction = () => {
    onChange({ actions: [...actions, { targetName: '', action: 'setText', value: '' }] });
  };
  const removeAction = (idx: number) => {
    onChange({ actions: actions.filter((_, i) => i !== idx) });
  };

  const fieldClass = "w-full px-2 py-1.5 rounded bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring";
  const labelClass = "text-xs text-muted-foreground font-medium";
  const sectionClass = "border-t border-border pt-3";

  const namedComponents = allComponents.filter(c => c.name && c.id !== component.id);

  return (
    <div className="w-64 border-l border-border bg-palette overflow-y-auto">
      <div className="flex items-center justify-between px-3 py-3 border-b border-border">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Свойства</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-3 space-y-3">
        {/* Name */}
        <div className="space-y-1">
          <label className={labelClass}>Имя компонента</label>
          <input value={name} onChange={e => onChange({ name: e.target.value })} placeholder="myComponent" className={fieldClass + ' font-mono text-xs'} />
        </div>

        {/* Grid position */}
        <div className="space-y-1">
          <label className={labelClass}>Начальная колонка (1-12, пусто = авто)</label>
          <input
            type="number"
            min={1}
            max={12}
            value={colStart || ''}
            onChange={e => {
              const v = e.target.value ? Number(e.target.value) : undefined;
              onChange({ colStart: v });
            }}
            placeholder="авто"
            className={fieldClass}
          />
        </div>

        {/* Grid span */}
        <div className="space-y-1">
          <label className={labelClass}>Ширина (колонки 1-12)</label>
          <input type="range" min={1} max={12} value={colSpan} onChange={e => onChange({ colSpan: Number(e.target.value) })} className="w-full accent-primary" />
          <div className="text-xs text-muted-foreground text-right">{colSpan}/12</div>
        </div>

        {/* Component-specific props */}
        {(type === 'heading' || type === 'paragraph') && (
          <div className="space-y-1">
            <label className={labelClass}>Текст</label>
            <textarea value={props.text || ''} onChange={e => updateProp('text', e.target.value)} rows={2} className={fieldClass} />
          </div>
        )}
        {type === 'heading' && (
          <div className="space-y-1">
            <label className={labelClass}>Уровень</label>
            <select value={props.level || 'h2'} onChange={e => updateProp('level', e.target.value)} className={fieldClass}>
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
            </select>
          </div>
        )}
        {['text-input', 'textarea', 'number-input', 'select', 'checkbox', 'date-picker', 'data-select'].includes(type) && (
          <div className="space-y-1">
            <label className={labelClass}>Подпись</label>
            <input value={props.label || ''} onChange={e => updateProp('label', e.target.value)} className={fieldClass} />
          </div>
        )}
        {['text-input', 'textarea', 'number-input'].includes(type) && (
          <div className="space-y-1">
            <label className={labelClass}>Placeholder</label>
            <input value={props.placeholder || ''} onChange={e => updateProp('placeholder', e.target.value)} className={fieldClass} />
          </div>
        )}
        {type === 'select' && (
          <div className="space-y-1">
            <label className={labelClass}>Варианты (по строке)</label>
            <textarea
              value={(props.options || []).join('\n')}
              onChange={e => updateProp('options', e.target.value.split('\n'))}
              rows={4}
              className={fieldClass + ' font-mono text-xs'}
            />
          </div>
        )}
        {type === 'data-select' && (
          <div className="space-y-1">
            <label className={labelClass}>Источник данных</label>
            <select value={props.dataSource || ''} onChange={e => updateProp('dataSource', e.target.value)} className={fieldClass}>
              <option value="">— выберите —</option>
              {Object.entries(mockDataSources).map(([key, src]) => (
                <option key={key} value={key}>{src.label}</option>
              ))}
            </select>
          </div>
        )}
        {type === 'image' && (
          <>
            <div className="space-y-1">
              <label className={labelClass}>URL изображения</label>
              <input value={props.src || ''} onChange={e => updateProp('src', e.target.value)} className={fieldClass} />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Alt текст</label>
              <input value={props.alt || ''} onChange={e => updateProp('alt', e.target.value)} className={fieldClass} />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Ширина</label>
              <input value={props.width || '100%'} onChange={e => updateProp('width', e.target.value)} placeholder="100%, 200px" className={fieldClass} />
            </div>
          </>
        )}
        {type === 'button' && (
          <>
            <div className="space-y-1">
              <label className={labelClass}>Текст кнопки</label>
              <input value={props.text || ''} onChange={e => updateProp('text', e.target.value)} className={fieldClass} />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Вариант</label>
              <select value={props.variant || 'primary'} onChange={e => updateProp('variant', e.target.value)} className={fieldClass}>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>
          </>
        )}
        {type === 'textarea' && (
          <div className="space-y-1">
            <label className={labelClass}>Строки</label>
            <input type="number" value={props.rows || 3} onChange={e => updateProp('rows', Number(e.target.value))} min={1} max={20} className={fieldClass} />
          </div>
        )}
        {type === 'table' && (
          <>
            <div className="space-y-1">
              <label className={labelClass}>Столбцы (JSON)</label>
              <textarea
                value={JSON.stringify(props.columns || [], null, 2)}
                onChange={e => { try { updateProp('columns', JSON.parse(e.target.value)); } catch {} }}
                rows={4}
                className={fieldClass + ' font-mono text-xs'}
                placeholder='[{"key":"col1","label":"Столбец 1"}]'
              />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Данные (JSON)</label>
              <textarea
                value={JSON.stringify(props.rows || [], null, 2)}
                onChange={e => { try { updateProp('rows', JSON.parse(e.target.value)); } catch {} }}
                rows={4}
                className={fieldClass + ' font-mono text-xs'}
                placeholder='[{"col1":"Значение"}]'
              />
            </div>
          </>
        )}

        {/* CSS Styles section */}
        <div className={sectionClass}>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Стили</h4>
          <div className="space-y-2">
            <div className="space-y-1">
              <label className={labelClass}>Цвет текста</label>
              <div className="flex gap-1">
                <input
                  type="color"
                  value={style.color || '#e2e8f0'}
                  onChange={e => updateStyle('color', e.target.value)}
                  className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent"
                />
                <input value={style.color || ''} onChange={e => updateStyle('color', e.target.value)} placeholder="#e2e8f0" className={fieldClass} />
              </div>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Размер текста</label>
              <div className="flex gap-1">
                <input
                  type="number"
                  value={style.fontSize || ''}
                  onChange={e => updateStyle('fontSize', e.target.value)}
                  placeholder="14"
                  className={fieldClass + ' flex-1'}
                />
                <select
                  value={style.fontSizeUnit || 'px'}
                  onChange={e => updateStyle('fontSizeUnit', e.target.value)}
                  className={fieldClass + ' w-16'}
                >
                  <option value="px">px</option>
                  <option value="rem">rem</option>
                  <option value="%">%</option>
                  <option value="vw">vw</option>
                  <option value="vh">vh</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Бордер радиус</label>
              <input value={style.borderRadius || ''} onChange={e => updateStyle('borderRadius', e.target.value)} placeholder="8px" className={fieldClass} />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Цвет фона</label>
              <div className="flex gap-1">
                <input
                  type="color"
                  value={style.backgroundColor || '#1a1f2e'}
                  onChange={e => updateStyle('backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent"
                />
                <input value={style.backgroundColor || ''} onChange={e => updateStyle('backgroundColor', e.target.value)} placeholder="#1a1f2e" className={fieldClass} />
              </div>
            </div>
          </div>
        </div>

        {/* Actions section (for buttons) */}
        {type === 'button' && (
          <div className={sectionClass}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Действия</h4>
            <div className="space-y-2">
              {actions.map((act, idx) => (
                <div key={idx} className="p-2 rounded bg-secondary/50 border border-border space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">Действие {idx + 1}</span>
                    <button onClick={() => removeAction(idx)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                  <select
                    value={act.action}
                    onChange={e => updateAction(idx, { action: e.target.value as ComponentAction['action'] })}
                    className={fieldClass + ' text-xs'}
                  >
                    {Object.entries(ACTION_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>

                  {act.action === 'openForm' ? (
                    <>
                      <input
                        value={act.value || ''}
                        onChange={e => updateAction(idx, { value: e.target.value })}
                        placeholder="Имя формы"
                        className={fieldClass + ' text-xs'}
                        list={`form-names-${idx}`}
                      />
                      <datalist id={`form-names-${idx}`}>
                        {allFormNames.map(n => <option key={n} value={n} />)}
                      </datalist>
                      <select
                        value={act.openMode || 'modal'}
                        onChange={e => updateAction(idx, { openMode: e.target.value as 'modal' | 'replace' })}
                        className={fieldClass + ' text-xs'}
                      >
                        <option value="modal">Модальное окно</option>
                        <option value="replace">Заменить экран</option>
                      </select>
                    </>
                  ) : act.action === 'closeForm' ? null : (
                    <>
                      <select
                        value={act.targetName}
                        onChange={e => updateAction(idx, { targetName: e.target.value })}
                        className={fieldClass + ' text-xs'}
                      >
                        <option value="">— цель —</option>
                        {namedComponents.map(c => (
                          <option key={c.id} value={c.name}>{c.name} ({c.type})</option>
                        ))}
                      </select>
                      {!['hide', 'show', 'toggleVisibility'].includes(act.action) && (
                        <input
                          value={act.value || ''}
                          onChange={e => updateAction(idx, { value: e.target.value })}
                          placeholder="Значение"
                          className={fieldClass + ' text-xs'}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
              <button
                onClick={addAction}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                <Plus className="h-3 w-3" /> Добавить действие
              </button>
            </div>

            {/* Raw JS */}
            <div className="space-y-1 mt-3">
              <label className={labelClass}>onClick (JS)</label>
              <textarea value={props.onClick || ''} onChange={e => updateProp('onClick', e.target.value)} rows={3} className={fieldClass + ' font-mono text-xs'} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
