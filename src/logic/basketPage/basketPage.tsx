import React from 'react';

const BasketPage: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div>Basket</div>
    </React.Suspense>
  );
};

export default BasketPage;
