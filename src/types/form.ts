export type ComponentType =
  | 'heading'
  | 'paragraph'
  | 'text-input'
  | 'textarea'
  | 'number-input'
  | 'select'
  | 'checkbox'
  | 'button'
  | 'divider';

export interface FormComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
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
