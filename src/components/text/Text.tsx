import React from 'react';

interface TextProps {
  title: string;
  className: string;
}

export const Text: React.FC<TextProps> = ({ title, className }) => {
  return <p className={className}>{title}</p>;
};
