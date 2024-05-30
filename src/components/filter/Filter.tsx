import React from 'react';
import style from 'src/components/filter/Filter.module.scss';
import { FilterComponent, FilterOption } from './FilterComponent.tsx';

interface FilterProps {
  colors: FilterOption[];
  sizes: FilterOption[];
  prices: FilterOption[];
}

// const fetchProductTypes = async () => {
//   try {
//     const response = await apiRoot.products().get().execute();
//     console.log('Product Types:', response.body.results);
//     return response.body.results;
//   } catch (error) {
//     console.error('Error fetching product types:', error);
//     return [];
//   }
// };
// fetchProductTypes();

export const Filter: React.FC<FilterProps> = ({ colors = [], sizes = [], prices = [] }) => {
  return (
    <div className={style.filters_container}>
      <h3>Product Filters</h3>
      <FilterComponent options={colors} title="Color" type="checkbox" />
      <FilterComponent options={sizes} title="Size" type="checkbox" />
      <FilterComponent options={prices} title="Price" type="radio" />
    </div>
  );
};
