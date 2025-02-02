import { useState } from "react";
import s from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState(""); // Стартовое значение пустое

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    onSearch(inputValue);
    setInputValue(""); // Очищаем инпут после поиска
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          autoComplete="off" 
          autoSave="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className={s.btn}>Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
