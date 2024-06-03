import React from 'react';
import style from 'src/components/filter/Filter.module.scss';
import myStyles from 'src/components/form/registration/RegistrationForm.module.scss';
import { FilterComponent, FilterOption } from './FilterComponent.tsx';

interface FilterProps {
  colors: FilterOption[];
  sizes: FilterOption[];
  prices: FilterOption[];
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const Filter: React.FC<FilterProps> = ({
  colors = [],
  sizes = [],
  prices = [],
  handleChange,
}) => {
  const resetFilters = () => {
    return '';
  };

  return (
    <div className={style.filters_container}>
      <h3>Product Filters</h3>
      <FilterComponent options={colors} title="Color" type="checkbox" handleChange={handleChange} />
      <FilterComponent options={sizes} title="Size" type="checkbox" handleChange={handleChange} />
      <FilterComponent options={prices} title="Price" type="radio" handleChange={handleChange} />
      <button type="button" className={myStyles.myButton} onClick={resetFilters}>
        Reset
      </button>
    </div>
  );
};
