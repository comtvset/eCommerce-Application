import { ProductCatalogData } from '@commercetools/platform-sdk';
import React, { useState, useEffect } from 'react';
import { apiRoot } from 'src/services/api/ctpClient.ts';
import { Paragraph } from 'src/components/text/Text.tsx';
import style from 'src/components/cards/Cards.module.scss';
import { Link } from 'src/components/link/Link.tsx';

export interface IProductData {
  id: string;
  masterData: ProductCatalogData;
}

const getCurrencySymbol = (currencyCode: string | undefined) => {
  switch (currencyCode) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    default:
      return currencyCode;
  }
};

export const Card: React.FC = () => {
  const [products, setProducts] = useState<IProductData[]>([]);

  useEffect(() => {
    apiRoot
      .products()
      .get({
        queryArgs: {
          limit: 117,
        },
      })
      .execute()
      .then((response) => {
        setProducts(response.body.results);
      })
      .catch((error: unknown) => {
        return error;
      });
  }, []);

  return (
    <div className={style.cards_container}>
      {products.map((product) => {
        const priceObj = product.masterData.staged.masterVariant.prices?.[0].value;
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
                src={product.masterData.staged.masterVariant.images?.[0].url}
                alt={product.masterData.current.name['en-US']}
              />
            </div>
            <div className={style.card_info}>
              <Paragraph
                tag="h2"
                title={product.masterData.current.name['en-US']}
                className={style.name_thing}
              />
              <Paragraph
                tag="p"
                title={product.masterData.current.description?.['en-US'].split('.')[0] ?? ''}
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
