import React from 'react';
import { Paragraph } from 'src/components/text/Text.tsx';
import { Link } from 'src/components/link/Link.tsx';
import style from 'src/components/cartMessage/CartMessage.module.scss';

export const Message: React.FC = () => {
  return (
    <div className={style.cart__empty}>
      <Paragraph
        tag="p"
        className={style.cart__text}
        title="Your cart is currently empty, but that's an easy fix! Head over to our store and fill it up with the items you'd like. We're waiting for you!"
      />
      <Link to="/catalog" title="CATALOG" className={style.catalog__link} />
    </div>
  );
};
