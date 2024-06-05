import React, { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import style from 'src/components/filter/Filter.module.scss';
import myStyles from 'src/components/form/registration/RegistrationForm.module.scss';
import { fetchAllProducts } from 'src/services/api/filterRequests.ts';
import { FilterComponent, FilterOption } from './FilterComponent.tsx';

interface FilterProps {
  colors: FilterOption[];
  sizes: FilterOption[];
  prices: FilterOption[];
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onReset(products: ProductProjection[]): void;
}

export const Filter: React.FC<FilterProps> = ({
  colors = [],
  sizes = [],
  prices = [],
  handleChange,
  onReset,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [productState, setProductState] = useState<ProductProjection[]>([]);
  const errorsArray = [];
  const trashArray = [];

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (event.target.type === 'radio') {
      setSelectedOptions([value]);
    } else if (event.target.checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }

    handleChange(event);
  };

  const isChecked = (value: string): boolean => {
    return selectedOptions.includes(value);
  };

  useEffect(() => {
    const errorArray = [];
    const getAllproducts = async () => {
      try {
        const result = await fetchAllProducts();
        setProductState(result);
      } catch (error) {
        errorArray.push(error);
      }
    };
    (async () => {
      await getAllproducts();
    })();
  }, []);

  const resetFilters = async () => {
    setSelectedOptions([]);
    try {
      const result = await fetchAllProducts();
      setProductState(result);
      onReset(result);
    } catch (error) {
      errorsArray.push(error);
    }
  };

  const handleResetButtonClick = () => {
    resetFilters().catch((error: unknown) => {
      errorsArray.push(error);
      trashArray.push(productState);
    });
  };

  return (
    <div className={style.filters_container}>
      <h3>Product Filters</h3>
      <FilterComponent
        options={colors}
        title="Color"
        type="checkbox"
        handleChange={handleFilterChange}
        checked={isChecked}
      />
      <FilterComponent
        options={sizes}
        title="Size"
        type="checkbox"
        handleChange={handleFilterChange}
        checked={isChecked}
      />
      <FilterComponent
        options={prices}
        title="Price"
        type="radio"
        handleChange={handleFilterChange}
        checked={isChecked}
      />
      <button type="button" className={myStyles.myButton} onClick={handleResetButtonClick}>
        Reset filters
      </button>
    </div>
  );
};
