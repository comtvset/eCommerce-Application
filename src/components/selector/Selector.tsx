import React from 'react';

interface Option {
  value: string | undefined;
  label: string;
}

interface SelectorProps {
  id: string;
  name: string;
  value: string | undefined;
  label: string;
  options: Option[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur: React.ChangeEventHandler<HTMLSelectElement>;
  error?: string;
}

const Selector: React.FC<{ selectorProps: SelectorProps }> = ({ selectorProps }) => {
  const { id, name, value, label, options, onChange, onBlur, error } = selectorProps;

  return (
    <div>
      <label htmlFor={id}>{label}</label>

      <select id={id} name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Selector;
