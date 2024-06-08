import React, { useState } from 'react';
import style from 'src/components/sort/Sort.module.scss';

interface SortComponentProps {
  onSort: (criteria: string) => void;
  defaultCriteria?: string;
}

export const SortComponent: React.FC<SortComponentProps> = ({
  onSort,
  defaultCriteria = 'price',
}) => {
  const [criteria, setCriteria] = useState<string>(defaultCriteria);

  const handleCriteriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCriteria = event.target.value;
    setCriteria(newCriteria);
    onSort(newCriteria);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSort(criteria);
  };

  return (
    <div className={style.sort_container}>
      <form onSubmit={handleSubmit} className={style.form_container}>
        <h3>Sort by:</h3>
        <select className={style.select_sort} value={criteria} onChange={handleCriteriaChange}>
          <option value="price high">price high</option>
          <option value="price low">price low</option>
          <option value="name a-z">name a-z</option>
          <option value="name z-a">name z-a</option>
        </select>
      </form>
    </div>
  );
};
