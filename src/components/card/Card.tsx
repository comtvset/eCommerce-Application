import React from 'react';
import { useParams } from 'react-router-dom';

export const CardOne: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (typeof id === 'undefined') {
    return <div>ID продукта отсутствует</div>;
  }

  return <div>{id}</div>;
};
