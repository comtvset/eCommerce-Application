import React from 'react';
import style from 'src/components/checkbox/Checkbox.module.scss';

interface CheckboxProps {
  label: string;
  checked: boolean;
  id: string;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={style.custom_checkbox}>
      <input id={id} type="checkbox" checked={checked} onChange={handleChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
