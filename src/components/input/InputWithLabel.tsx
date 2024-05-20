import React from 'react';
import style from 'src/components/address/Address.module.scss';

interface InputProps {
  id: string;
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

export const InputWithLabel: React.FC<InputProps> = ({
  id,
  type,
  name,
  label,
  value,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
      />
      {error && (
        <div className={style.error_tooltip} role="alert">
          {error}
        </div>
      )}
    </div>
  );
};