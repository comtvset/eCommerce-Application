import React, { useState } from 'react';
import style from 'src/components/search/Search.module.scss';

interface SearchComponentProps {
  onSearch: (query: string) => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className={style.search_container}>
      <form onSubmit={handleSubmit}>
        <input
          className={style.input_search}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <button className={style.button_input} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
