import React, { useState } from 'react';
import { User } from '../types/User';

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [highlightedRowId, setHighlightedRowId] = useState<number | null>(null);

  // Стили для таблицы
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const, // Явно указываем тип
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    backgroundColor: '#f9f9f9',
  };

  const headerStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left' as const, // Явно указываем тип
    fontWeight: 'bold',
  };

  const rowStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
    backgroundColor: '#fff',
  };

  const highlightedRowStyle = {
    ...rowStyle,
    backgroundColor: '#e6f7ff', // Подсветка строки
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerStyle}>ID</th>
          <th style={headerStyle}>Имя</th>
          <th style={headerStyle}>Никнейм</th>
          <th style={headerStyle}>Email</th>
          <th style={headerStyle}>Город</th>
          <th style={headerStyle}>Телефон</th>
          <th style={headerStyle}>Дата рождения</th>
          <th style={headerStyle}>Компания</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr
            key={user.id}
            onClick={() => setHighlightedRowId(user.id)}
            style={highlightedRowId === user.id ? highlightedRowStyle : rowStyle}
          >
            <td style={{ padding: '10px' }}>{user.id}</td>
            <td style={{ padding: '10px' }}>{user.name}</td>
            <td style={{ padding: '10px' }}>{user.username}</td>
            <td style={{ padding: '10px' }}>{user.email}</td>
            <td style={{ padding: '10px' }}>{user.address.city}</td>
            <td style={{ padding: '10px' }}>{user.phone}</td>
            <td style={{ padding: '10px' }}>{user.birthdate}</td>
            <td style={{ padding: '10px' }}>{user.company.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;