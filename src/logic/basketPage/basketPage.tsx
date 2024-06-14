import React from 'react';
import { CartCustomer } from 'src/components/form/cart/CartCustomer.tsx';

const BasketPage: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CartCustomer />
    </React.Suspense>
  );
};

export default BasketPage;
