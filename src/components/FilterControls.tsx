import React, { useState } from 'react';
import { User } from '../types/User';

interface FilterControlsProps {
  users: User[];
  onFilterChange: (filteredUsers: User[]) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ users, onFilterChange }) => {
  const [sortByIdAsc, setSortByIdAsc] = useState(true);
  const [sortByNameAsc, setSortByNameAsc] = useState(true);
  const [sortByBirthdateAsc, setSortByBirthdateAsc] = useState(true);
  const [showAdultsOnly, setShowAdultsOnly] = useState(false);

  // Стили для кнопок
  const buttonStyle = {
    padding: '8px 16px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const checkboxStyle = {
    marginLeft: '10px',
    cursor: 'pointer',
  };

  const handleSortById = () => {
    const sortedUsers = [...users].sort((a, b) => (sortByIdAsc ? a.id - b.id : b.id - a.id));
    onFilterChange(sortedUsers);
    setSortByIdAsc(!sortByIdAsc);
  };

  const handleSortByName = () => {
    const sortedUsers = [...users].sort((a, b) =>
      sortByNameAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    onFilterChange(sortedUsers);
    setSortByNameAsc(!sortByNameAsc);
  };

  const handleSortByBirthdate = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const dateA = new Date(a.birthdate).getTime();
      const dateB = new Date(b.birthdate).getTime();
      return sortByBirthdateAsc ? dateA - dateB : dateB - dateA;
    });
    onFilterChange(sortedUsers);
    setSortByBirthdateAsc(!sortByBirthdateAsc);
  };

  const handleAgeFilter = (checked: boolean) => {
    setShowAdultsOnly(checked);
    const filteredUsers = checked
      ? users.filter(user => calculateAge(new Date(user.birthdate)) > 18)
      : users;
    onFilterChange(filteredUsers);
  };

  const calculateAge = (birthdate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Кнопки */}
      <button style={buttonStyle} onClick={handleSortById}>
        Сортировать по ID ({sortByIdAsc ? '↑' : '↓'})
      </button>

      <button style={buttonStyle} onClick={handleSortByName}>
        Сортировать по имени ({sortByNameAsc ? 'A → Я' : 'Я → A'})
      </button>

      <button style={buttonStyle} onClick={handleSortByBirthdate}>
        Сортировать по дате рождения ({sortByBirthdateAsc ? '↑' : '↓'})
      </button>

      {/* Чекбокс */}
      <label style={checkboxStyle}>
        <input type="checkbox" onChange={e => handleAgeFilter(e.target.checked)} />
        Показать только совершеннолетних
      </label>
    </div>
  );
};

export default FilterControls;