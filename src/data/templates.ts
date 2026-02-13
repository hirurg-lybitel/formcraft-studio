import type { FormData, FormComponent } from '@/types/form';

function id() {
  return Math.random().toString(36).slice(2, 10);
}

const surveyComponents: FormComponent[] = [
  { id: id(), type: 'heading', props: { text: 'Анкета участника', level: 'h2' } },
  { id: id(), type: 'paragraph', props: { text: 'Пожалуйста, заполните все поля анкеты.' } },
  { id: id(), type: 'text-input', props: { label: 'Имя', placeholder: 'Введите ваше имя', required: true } },
  { id: id(), type: 'text-input', props: { label: 'Фамилия', placeholder: 'Введите вашу фамилию', required: true } },
  { id: id(), type: 'text-input', props: { label: 'Email', placeholder: 'example@mail.com', required: true } },
  { id: id(), type: 'number-input', props: { label: 'Возраст', placeholder: '25', min: 1, max: 120 } },
  { id: id(), type: 'select', props: { label: 'Город', options: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Другой'] } },
  { id: id(), type: 'textarea', props: { label: 'О себе', placeholder: 'Расскажите о себе...', rows: 4 } },
  { id: id(), type: 'checkbox', props: { label: 'Согласен на обработку персональных данных', required: true } },
  { id: id(), type: 'divider', props: {} },
  { id: id(), type: 'button', props: { text: 'Отправить', variant: 'primary', onClick: 'alert("Анкета отправлена!")' } },
  { id: id(), type: 'button', props: { text: 'Очистить', variant: 'secondary', onClick: 'document.querySelectorAll("input,textarea,select").forEach(el=>{el.value=""})' } },
];

const feedbackComponents: FormComponent[] = [
  { id: id(), type: 'heading', props: { text: 'Обратная связь', level: 'h2' } },
  { id: id(), type: 'paragraph', props: { text: 'Мы ценим ваше мнение! Оставьте отзыв.' } },
  { id: id(), type: 'text-input', props: { label: 'Ваше имя', placeholder: 'Имя', required: false } },
  { id: id(), type: 'select', props: { label: 'Оценка', options: ['⭐ Отлично', '👍 Хорошо', '😐 Нормально', '👎 Плохо'] } },
  { id: id(), type: 'textarea', props: { label: 'Комментарий', placeholder: 'Опишите ваш опыт...', rows: 5 } },
  { id: id(), type: 'checkbox', props: { label: 'Хочу получить ответ по email' } },
  { id: id(), type: 'text-input', props: { label: 'Email для ответа', placeholder: 'example@mail.com' } },
  { id: id(), type: 'button', props: { text: 'Отправить отзыв', variant: 'primary', onClick: 'alert("Спасибо за отзыв!")' } },
];

export const templates: { name: string; description: string; icon: string; components: FormComponent[] }[] = [
  {
    name: 'Анкета участника',
    description: 'Полная анкета с текстовыми полями, числовым вводом, выпадающим списком и кнопками',
    icon: '📋',
    components: surveyComponents,
  },
  {
    name: 'Форма обратной связи',
    description: 'Компактная форма для сбора отзывов с оценкой и комментарием',
    icon: '💬',
    components: feedbackComponents,
  },
];

export function createFormFromTemplate(template: typeof templates[0]): FormData {
  return {
    id: id(),
    name: template.name,
    components: template.components.map(c => ({ ...c, id: id() })),
    customHtml: '',
    customCss: '',
    customJs: '',
    mode: 'visual',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function createBlankForm(): FormData {
  return {
    id: id(),
    name: 'Новая форма',
    components: [],
    customHtml: '',
    customCss: '',
    customJs: '',
    mode: 'visual',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}
