import React from 'react';
import style from './Filter.module.scss';

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterComponentProps {
  options: FilterOption[];
  title: string;
  type: 'checkbox' | 'radio';
  handleChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  checked?: (value: string) => boolean;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
  options,
  title,
  type,
  handleChange,
  checked,
}) => {
  return (
    <div className={style.filter_container}>
      <h4>{title}</h4>
      <div className={style.filter_group}>
        {options.map((option) => (
          <div key={option.value} className={style.option_group}>
            <input
              id={`${title.toLowerCase()}-${option.value}`}
              type={type}
              name={title.toLowerCase()}
              value={option.value}
              checked={checked ? checked(option.value) : false}
              onChange={handleChange}
            />
            <label htmlFor={`${title.toLowerCase()}-${option.value}`} className={style.label}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
