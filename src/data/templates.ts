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

// === KIOSK: Product Search Form ===
const kioskSearchComponents: FormComponent[] = [
  { id: id(), type: 'heading', props: { text: '🔍 Поиск товара', level: 'h2' }, colSpan: 12, name: 'searchTitle' },
  { id: id(), type: 'text-input', props: { label: 'Наименование', placeholder: 'Введите название товара...' }, colSpan: 12, name: 'searchField' },
  { id: id(), type: 'divider', props: {}, colSpan: 12 },
  { id: id(), type: 'table', props: {
    columns: [
      { key: 'name', label: 'Товар' },
      { key: 'price', label: 'Цена' },
      { key: 'category', label: 'Категория' },
    ],
    rows: [
      { name: 'Хлеб белый', price: '59 ₽', category: 'Хлеб' },
      { name: 'Хлеб чёрный', price: '49 ₽', category: 'Хлеб' },
      { name: 'Молоко 1л', price: '89 ₽', category: 'Молочные' },
      { name: 'Кефир 1л', price: '79 ₽', category: 'Молочные' },
      { name: 'Сыр Российский', price: '349 ₽', category: 'Молочные' },
      { name: 'Яблоки 1кг', price: '129 ₽', category: 'Фрукты' },
      { name: 'Бананы 1кг', price: '89 ₽', category: 'Фрукты' },
      { name: 'Курица 1кг', price: '289 ₽', category: 'Мясо' },
      { name: 'Макароны 500г', price: '79 ₽', category: 'Бакалея' },
      { name: 'Масло сливочное', price: '159 ₽', category: 'Молочные' },
    ],
    filterBy: 'searchField',
  }, colSpan: 12, name: 'productTable' },
  { id: id(), type: 'divider', props: {}, colSpan: 12 },
  { id: id(), type: 'data-select', props: { label: 'Выберите товар', dataSource: 'products' }, colSpan: 8, name: 'productSelect' },
  { id: id(), type: 'button', props: { text: '✅ Добавить в корзину', variant: 'primary' }, colSpan: 4, name: 'addToCartBtn',
    actions: [
      { targetName: 'productSelect', action: 'addToCart' as const, value: '' },
      { targetName: 'searchTitle', action: 'setText' as const, value: '🔍 Товар добавлен! Выберите ещё или закройте окно.' },
    ],
  },
  { id: id(), type: 'button', props: { text: '✖ Закрыть', variant: 'secondary' }, colSpan: 4, colStart: 9, name: 'closeSearchBtn',
    actions: [{ targetName: '', action: 'closeForm' as const }],
  },
];

// === KIOSK: Payment Form ===
const kioskPaymentComponents: FormComponent[] = [
  { id: id(), type: 'heading', props: { text: '💳 Оплата', level: 'h2' }, colSpan: 12, name: 'payTitle' },
  { id: id(), type: 'paragraph', props: { text: 'Выберите способ оплаты и завершите покупку.' }, colSpan: 12, name: 'paySubtitle' },
  { id: id(), type: 'divider', props: {}, colSpan: 12 },
  { id: id(), type: 'heading', props: { text: '{{cartTotal}} ₽', level: 'h1' }, colSpan: 12, name: 'payTotal',
    style: { color: '#2dd4bf', fontSize: '36', fontSizeUnit: 'px' as const },
  },
  { id: id(), type: 'divider', props: {}, colSpan: 12 },
  { id: id(), type: 'select', props: { label: 'Способ оплаты', options: ['💳 Банковская карта', '📱 QR-код / СБП', '💵 Наличные', '🎁 Бонусная карта'] }, colSpan: 6, name: 'payMethod' },
  { id: id(), type: 'text-input', props: { label: 'Номер карты / бонусной карты', placeholder: '0000 0000 0000 0000' }, colSpan: 6, name: 'cardNumber' },
  { id: id(), type: 'checkbox', props: { label: 'Электронный чек на email' }, colSpan: 6, name: 'eReceipt' },
  { id: id(), type: 'text-input', props: { label: 'Email', placeholder: 'example@mail.com' }, colSpan: 6, name: 'emailReceipt' },
  { id: id(), type: 'divider', props: {}, colSpan: 12 },
  { id: id(), type: 'button', props: { text: '✅ Оплатить', variant: 'primary' }, colSpan: 6, name: 'confirmPayBtn',
    style: { fontSize: '18', fontSizeUnit: 'px' as const, backgroundColor: '#059669' },
    actions: [
      { targetName: 'paySubtitle', action: 'setText' as const, value: '✅ Оплата прошла успешно! Заберите чек.' },
    ],
  },
  { id: id(), type: 'button', props: { text: '✖ Отмена', variant: 'secondary' }, colSpan: 3, colStart: 10, name: 'cancelPayBtn',
    actions: [{ targetName: '', action: 'closeForm' as const }],
  },
];

// === KIOSK: Main Form ===
const kioskMainComponents: FormComponent[] = [
  // Header row
  { id: id(), type: 'heading', props: { text: '🛒 Касса самообслуживания', level: 'h1' }, colSpan: 8, name: 'kioskTitle',
    style: { fontSize: '24', fontSizeUnit: 'px' as const },
  },
  { id: id(), type: 'heading', props: { text: '{{cartTotal}} ₽', level: 'h2' }, colSpan: 4, name: 'totalAmount',
    style: { color: '#2dd4bf', fontSize: '28', fontSizeUnit: 'px' as const },
  },
  { id: id(), type: 'paragraph', props: { text: 'Добавьте товары и перейдите к оплате.' }, colSpan: 12, name: 'kioskStatus' },
  { id: id(), type: 'divider', props: {}, colSpan: 12 },

  // Quick add row
  { id: id(), type: 'data-select', props: { label: 'Быстрый выбор', dataSource: 'products' }, colSpan: 5, name: 'quickSelect' },
  { id: id(), type: 'number-input', props: { label: 'Кол-во', placeholder: '1', min: 1, max: 99 }, colSpan: 2, name: 'qtyInput' },
  { id: id(), type: 'button', props: { text: '➕ Добавить', variant: 'primary' }, colSpan: 2, name: 'quickAddBtn',
    actions: [
      { targetName: 'quickSelect', action: 'addToCart' as const, value: 'qtyInput' },
      { targetName: 'kioskStatus', action: 'setText' as const, value: '✅ Товар добавлен в корзину!' },
    ],
  },
  { id: id(), type: 'button', props: { text: '🔍 Поиск', variant: 'secondary' }, colSpan: 3, name: 'openSearchBtn',
    actions: [
      { targetName: '', action: 'openForm' as const, value: 'Касса — Поиск товара', openMode: 'modal' as const },
    ],
  },

  { id: id(), type: 'divider', props: {}, colSpan: 12 },

  // Cart table
  { id: id(), type: 'heading', props: { text: 'Корзина', level: 'h3' }, colSpan: 12 },
  { id: id(), type: 'table', props: {
    columns: [
      { key: 'name', label: 'Товар' },
      { key: 'price', label: 'Цена' },
      { key: 'qty', label: 'Кол-во' },
      { key: 'total', label: 'Сумма' },
    ],
    rows: [],
    dataSourceVar: 'cart',
  }, colSpan: 12, name: 'cartTable' },

  { id: id(), type: 'divider', props: {}, colSpan: 12 },

  // Bottom actions
  { id: id(), type: 'button', props: { text: '💳 Оплатить', variant: 'primary' }, colSpan: 4, name: 'openPayBtn',
    style: { fontSize: '16', fontSizeUnit: 'px' as const },
    actions: [
      { targetName: '', action: 'openForm' as const, value: 'Касса — Оплата', openMode: 'modal' as const },
    ],
  },
  { id: id(), type: 'button', props: { text: '🗑 Очистить корзину', variant: 'secondary' }, colSpan: 3, name: 'clearCartBtn',
    actions: [
      { targetName: '', action: 'clearCart' as const },
      { targetName: 'kioskStatus', action: 'setText' as const, value: 'Корзина очищена.' },
    ],
  },
  { id: id(), type: 'button', props: { text: '📞 Помощь', variant: 'secondary' }, colSpan: 2, colStart: 11, name: 'helpBtn',
    actions: [
      { targetName: 'kioskStatus', action: 'setText' as const, value: '🔔 Сотрудник уже идёт к вам!' },
    ],
  },
];

export const templates: { name: string; description: string; icon: string; components: FormComponent[]; background?: { color?: string; image?: string } }[] = [
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
    name: 'Касса — Главная',
    description: 'Основной экран кассы: быстрый выбор, корзина, поиск и оплата через вложенные формы',
    icon: '🛒',
    components: kioskMainComponents,
    background: { color: '#111827' },
  },
  {
    name: 'Касса — Поиск товара',
    description: 'Форма поиска товара по наименованию с таблицей результатов',
    icon: '🔍',
    components: kioskSearchComponents,
  },
  {
    name: 'Касса — Оплата',
    description: 'Форма выбора способа оплаты и завершения покупки',
    icon: '💳',
    components: kioskPaymentComponents,
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
    background: template.background,
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
