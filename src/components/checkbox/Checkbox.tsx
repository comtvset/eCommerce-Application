import React from 'react';
import style from 'src/components/checkbox/Checkbox.module.scss';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={style.custom_checkbox}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <label htmlFor="checkbox">{label}</label>
    </div>
  );
};
