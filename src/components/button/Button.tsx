import React from 'react';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ type, onClick, label }) => {
  return (
    <button onClick={onClick} type={type}>
      {label}
    </button>
  );
};
