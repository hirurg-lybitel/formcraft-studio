export type ComponentType =
  | 'heading'
  | 'paragraph'
  | 'text-input'
  | 'textarea'
  | 'number-input'
  | 'select'
  | 'checkbox'
  | 'button'
  | 'divider'
  | 'date-picker'
  | 'image'
  | 'data-select';

export interface ComponentStyle {
  color?: string;
  fontSize?: string;
  fontSizeUnit?: 'px' | 'rem' | '%' | 'vw' | 'vh';
  borderRadius?: string;
  backgroundColor?: string;
}

export interface ComponentAction {
  targetName: string;
  action: 'setText' | 'setColor' | 'setBgColor' | 'hide' | 'show' | 'toggleVisibility';
  value?: string;
}

export interface FormComponent {
  id: string;
  type: ComponentType;
  name?: string;
  props: Record<string, any>;
  style?: ComponentStyle;
  colSpan?: number; // 1-12
  actions?: ComponentAction[];
}

export interface FormData {
  id: string;
  name: string;
  components: FormComponent[];
  customHtml: string;
  customCss: string;
  customJs: string;
  mode: 'visual' | 'code';
  createdAt: number;
  updatedAt: number;
}

export interface DragItem {
  type: ComponentType;
  label: string;
  icon: string;
  defaultProps: Record<string, any>;
}
