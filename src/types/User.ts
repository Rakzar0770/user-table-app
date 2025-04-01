// Типы данных для адреса и компании пользователя
export interface Address {
  city: string;
}

export interface Company {
  name: string;
}

// Основной интерфейс для пользователя
export interface User {
  id: number; // Уникальный идентификатор
  name: string; // Полное имя
  username: string; // Никнейм
  email: string; // Электронная почта
  address: Address; // Адрес (город)
  phone: string; // Телефон
  birthdate: string; // Дата рождения в формате ISO 8601
  company: Company; // Компания
}