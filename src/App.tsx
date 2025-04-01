import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from './types/User';
import UserTable from './components/UserTable';
import FilterControls from './components/FilterControls';

// URL для загрузки данных пользователей
const API_URL = 'https://mocki.io/v1/194e77a9-7f0b-41f3-8607-6bc93e558b74';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Все пользователи
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Отфильтрованные пользователи

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    axios.get<User[]>(API_URL)
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Изначально показываем всех пользователей
      })
      .catch(error => console.error('Ошибка загрузки данных:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Список пользователей</h1>
      {/* Компонент управления фильтрами */}
      <FilterControls users={users} onFilterChange={setFilteredUsers} />
      {/* Компонент таблицы */}
      <UserTable users={filteredUsers} />
    </div>
  );
};

export default App;