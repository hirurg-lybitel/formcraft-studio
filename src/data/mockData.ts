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
};

export function getMockData(sourceKey: string) {
  return mockDataSources[sourceKey] || null;
}
