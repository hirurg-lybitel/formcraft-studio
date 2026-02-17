import type { FormData, FormComponent } from '@/types/form';

function id() {
  return Math.random().toString(36).slice(2, 10);
}

const surveyComponents: FormComponent[] = [
  { id: id(), type: 'heading', props: { text: 'Анкета участника', level: 'h2' }, colSpan: 12, name: 'title' },
  { id: id(), type: 'paragraph', props: { text: 'Пожалуйста, заполните все поля анкеты.' }, colSpan: 12 },
  { id: id(), type: 'text-input', props: { label: 'Имя', placeholder: 'Введите ваше имя' }, colSpan: 6, name: 'firstName' },
  { id: id(), type: 'text-input', props: { label: 'Фамилия', placeholder: 'Введите вашу фамилию' }, colSpan: 6, name: 'lastName' },
  { id: id(), type: 'text-input', props: { label: 'Email', placeholder: 'example@mail.com' }, colSpan: 8 },
  { id: id(), type: 'number-input', props: { label: 'Возраст', placeholder: '25', min: 1, max: 120 }, colSpan: 4 },
  { id: id(), type: 'data-select', props: { label: 'Город', dataSource: 'cities' }, colSpan: 6 },
  { id: id(), type: 'date-picker', props: { label: 'Дата рождения' }, colSpan: 6 },
  { id: id(), type: 'textarea', props: { label: 'О себе', placeholder: 'Расскажите о себе...', rows: 4 }, colSpan: 12 },
  { id: id(), type: 'checkbox', props: { label: 'Согласен на обработку персональных данных' }, colSpan: 12 },
  { id: id(), type: 'divider', props: {}, colSpan: 12 },
  { id: id(), type: 'button', props: { text: 'Отправить', variant: 'primary', onClick: 'alert("Анкета отправлена!")' }, colSpan: 4, name: 'submitBtn' },
  { id: id(), type: 'button', props: { text: 'Очистить', variant: 'secondary', onClick: 'document.querySelectorAll("input,textarea,select").forEach(el=>{el.value=""})' }, colSpan: 4 },
];

const feedbackComponents: FormComponent[] = [
  { id: id(), type: 'heading', props: { text: 'Обратная связь', level: 'h2' }, colSpan: 12 },
  { id: id(), type: 'paragraph', props: { text: 'Мы ценим ваше мнение! Оставьте отзыв.' }, colSpan: 12, name: 'subtitle' },
  { id: id(), type: 'text-input', props: { label: 'Ваше имя', placeholder: 'Имя' }, colSpan: 6 },
  { id: id(), type: 'select', props: { label: 'Оценка', options: ['⭐ Отлично', '👍 Хорошо', '😐 Нормально', '👎 Плохо'] }, colSpan: 6 },
  { id: id(), type: 'textarea', props: { label: 'Комментарий', placeholder: 'Опишите ваш опыт...', rows: 5 }, colSpan: 12 },
  { id: id(), type: 'checkbox', props: { label: 'Хочу получить ответ по email' }, colSpan: 12 },
  { id: id(), type: 'text-input', props: { label: 'Email для ответа', placeholder: 'example@mail.com' }, colSpan: 12 },
  { id: id(), type: 'button', props: { text: 'Отправить отзыв', variant: 'primary', onClick: 'alert("Спасибо за отзыв!")' }, colSpan: 6,
    actions: [{ targetName: 'subtitle', action: 'setText' as const, value: 'Спасибо! Ваш отзыв принят.' }],
    name: 'sendBtn',
  },
];

export const templates: { name: string; description: string; icon: string; components: FormComponent[] }[] = [
  {
    name: 'Анкета участника',
    description: 'Полная анкета с текстовыми полями, датой, списком из БД и горизонтальной раскладкой',
    icon: '📋',
    components: surveyComponents,
  },
  {
    name: 'Форма обратной связи',
    description: 'Форма с оценкой, комментарием и межкомпонентным взаимодействием',
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
