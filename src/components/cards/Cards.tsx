import { ProductProjection } from '@commercetools/platform-sdk';
import React from 'react';
import { Paragraph } from 'src/components/text/Text.tsx';
import style from 'src/components/cards/Cards.module.scss';
import { Link } from 'src/components/link/Link.tsx';
import { getCurrencySymbol } from 'src/utils/CurrencyUtils.ts';

interface CardProps {
  products: ProductProjection[];
}

export const Card: React.FC<CardProps> = ({ products }) => {
  return (
    <div className={style.cards_container}>
      {products.map((product) => {
        const priceObj = product.masterVariant.prices?.[0].value;
        const centAmount = priceObj?.centAmount;
        const currencyCode = priceObj?.currencyCode;
        const currencySymbol = getCurrencySymbol(currencyCode) ?? '';
        const price =
          centAmount !== undefined ? `${currencySymbol}${(centAmount / 100).toFixed(2)}` : '';

        return (
          <Link
            className={style.card}
            key={product.id}
            id={product.id}
            to={`/product/${product.id}`}
          >
            <div className={style.image_container}>
              <img
                className={style.image}
                src={product.masterVariant.images?.[0].url}
                alt={product.name['en-US']}
              />
            </div>
            <div className={style.card_info}>
              <Paragraph tag="h2" title={product.name['en-US']} className={style.name_thing} />
              <Paragraph
                tag="p"
                title={product.description?.['en-US'].split('.')[0] ?? ''}
                className={style.description}
              />
            </div>
            <div>
              <Paragraph tag="h2" title={price} className="" />
            </div>
          </Link>
        );
      })}
    </div>
  );
};
