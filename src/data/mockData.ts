// Mock data sources for data-select component
export const mockDataSources: Record<string, { label: string; items: { value: string; label: string }[] }> = {
  countries: {
    label: 'Страны',
    items: [
      { value: 'ru', label: 'Россия' },
      { value: 'us', label: 'США' },
      { value: 'de', label: 'Германия' },
      { value: 'fr', label: 'Франция' },
      { value: 'jp', label: 'Япония' },
      { value: 'cn', label: 'Китай' },
    ],
  },
  cities: {
    label: 'Города',
    items: [
      { value: 'msk', label: 'Москва' },
      { value: 'spb', label: 'Санкт-Петербург' },
      { value: 'nsk', label: 'Новосибирск' },
      { value: 'ekb', label: 'Екатеринбург' },
      { value: 'kzn', label: 'Казань' },
    ],
  },
  departments: {
    label: 'Отделы',
    items: [
      { value: 'dev', label: 'Разработка' },
      { value: 'design', label: 'Дизайн' },
      { value: 'marketing', label: 'Маркетинг' },
      { value: 'hr', label: 'HR' },
      { value: 'finance', label: 'Финансы' },
    ],
  },
  roles: {
    label: 'Роли',
    items: [
      { value: 'admin', label: 'Администратор' },
      { value: 'editor', label: 'Редактор' },
      { value: 'viewer', label: 'Просмотр' },
      { value: 'moderator', label: 'Модератор' },
    ],
  },
  products: {
    label: 'Товары',
    items: [
      { value: 'bread', label: 'Хлеб белый — 59₽' },
      { value: 'milk', label: 'Молоко 1л — 89₽' },
      { value: 'cheese', label: 'Сыр Российский — 349₽' },
      { value: 'apple', label: 'Яблоки 1кг — 129₽' },
      { value: 'chicken', label: 'Курица 1кг — 289₽' },
      { value: 'water', label: 'Вода 1.5л — 45₽' },
      { value: 'pasta', label: 'Макароны 500г — 79₽' },
      { value: 'butter', label: 'Масло сливочное — 159₽' },
      { value: 'eggs', label: 'Яйца 10шт — 119₽' },
      { value: 'sugar', label: 'Сахар 1кг — 69₽' },
    ],
  },
};

export function getMockData(sourceKey: string) {
  return mockDataSources[sourceKey] || null;
}
