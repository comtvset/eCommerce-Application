import React from 'react';

interface ButtonProps {
  title: string;
  className: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ title, className, disabled, onClick }) => {
  return (
    <button type="button" className={className} disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
};
