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

const kioskComponents: FormComponent[] = [
  // Header
  { id: id(), type: 'heading', props: { text: '🛒 Касса самообслуживания', level: 'h1' }, colSpan: 8, name: 'kioskTitle', style: { fontSize: '24', fontSizeUnit: 'px' as const } },
  { id: id(), type: 'paragraph', props: { text: 'Добро пожаловать! Отсканируйте товар или найдите его в каталоге.' }, colSpan: 8, name: 'kioskSubtitle' },
  { id: id(), type: 'paragraph', props: { text: '💳 К оплате:' }, colSpan: 2, name: 'totalLabel', style: { fontSize: '14', fontSizeUnit: 'px' as const } },
  { id: id(), type: 'heading', props: { text: '0 ₽', level: 'h2' }, colSpan: 2, name: 'totalAmount', style: { color: '#2dd4bf', fontSize: '28', fontSizeUnit: 'px' as const } },
  { id: id(), type: 'divider', props: {}, colSpan: 12 },

  // Search and quick add
  { id: id(), type: 'text-input', props: { label: '🔍 Поиск товара', placeholder: 'Введите название или штрих-код...' }, colSpan: 6, name: 'searchInput' },
  { id: id(), type: 'data-select', props: { label: 'Быстрый выбор', dataSource: 'products' }, colSpan: 4, name: 'quickSelect' },
  { id: id(), type: 'button', props: { text: '➕ Добавить', variant: 'primary' }, colSpan: 2, name: 'addBtn',
    actions: [{ targetName: 'kioskSubtitle', action: 'setText' as const, value: '✅ Товар добавлен в корзину' }],
  },

  // Cart table
  { id: id(), type: 'table', props: {
    columns: [
      { key: 'name', label: 'Товар' },
      { key: 'price', label: 'Цена' },
      { key: 'qty', label: 'Кол-во' },
      { key: 'total', label: 'Сумма' },
    ],
    rows: [
      { name: 'Хлеб белый', price: '59 ₽', qty: '2', total: '118 ₽' },
      { name: 'Молоко 1л', price: '89 ₽', qty: '1', total: '89 ₽' },
      { name: 'Яблоки 1кг', price: '129 ₽', qty: '1.5', total: '194 ₽' },
      { name: 'Сыр Российский', price: '349 ₽', qty: '1', total: '349 ₽' },
    ],
  }, colSpan: 12, name: 'cartTable' },

  // Quantity controls
  { id: id(), type: 'number-input', props: { label: 'Изменить кол-во', placeholder: '1', min: 0, max: 99 }, colSpan: 4, name: 'qtyInput' },
  { id: id(), type: 'button', props: { text: '−', variant: 'secondary' }, colSpan: 1, name: 'minusBtn' },
  { id: id(), type: 'button', props: { text: '+', variant: 'secondary' }, colSpan: 1, name: 'plusBtn' },
  { id: id(), type: 'button', props: { text: '🗑 Удалить', variant: 'secondary' }, colSpan: 2, name: 'removeBtn',
    actions: [{ targetName: 'kioskSubtitle', action: 'setText' as const, value: '❌ Товар удалён из корзины' }],
  },
  { id: id(), type: 'paragraph', props: { text: 'Итого: 750 ₽' }, colSpan: 4, name: 'subtotalText', style: { fontSize: '18', fontSizeUnit: 'px' as const, color: '#e2e8f0' } },

  { id: id(), type: 'divider', props: {}, colSpan: 12 },

  // Payment section
  { id: id(), type: 'heading', props: { text: 'Оплата', level: 'h3' }, colSpan: 12 },
  { id: id(), type: 'select', props: { label: 'Способ оплаты', options: ['Банковская карта', 'QR-код / СБП', 'Наличные', 'Бонусная карта'] }, colSpan: 6, name: 'paymentMethod' },
  { id: id(), type: 'text-input', props: { label: 'Номер бонусной карты', placeholder: '0000 0000 0000' }, colSpan: 6, name: 'bonusCard' },
  { id: id(), type: 'checkbox', props: { label: 'Электронный чек на email' }, colSpan: 6, name: 'eReceipt' },
  { id: id(), type: 'text-input', props: { label: 'Email для чека', placeholder: 'example@mail.com' }, colSpan: 6, name: 'emailInput' },

  { id: id(), type: 'button', props: { text: '💳 Оплатить 750 ₽', variant: 'primary', onClick: 'alert("Оплата проведена! Спасибо за покупку.")' }, colSpan: 6, name: 'payBtn',
    style: { fontSize: '18', fontSizeUnit: 'px' as const, borderRadius: '12px', backgroundColor: '#059669' },
    actions: [
      { targetName: 'totalAmount', action: 'setText' as const, value: '0 ₽' },
      { targetName: 'kioskSubtitle', action: 'setText' as const, value: '✅ Оплата прошла успешно! Заберите чек.' },
    ],
  },
  { id: id(), type: 'button', props: { text: '❌ Отменить', variant: 'secondary' }, colSpan: 3, name: 'cancelBtn',
    actions: [{ targetName: 'kioskSubtitle', action: 'setText' as const, value: 'Покупка отменена. Начните заново.' }],
  },
  { id: id(), type: 'button', props: { text: '📞 Вызвать помощь', variant: 'secondary' }, colSpan: 3, name: 'helpBtn',
    actions: [{ targetName: 'kioskSubtitle', action: 'setText' as const, value: '🔔 Сотрудник уже идёт к вам!' }],
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
  {
    name: 'Касса самообслуживания',
    description: 'Экран кассы: каталог товаров, корзина, подсчёт суммы, выбор оплаты',
    icon: '🛒',
    components: kioskComponents,
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
