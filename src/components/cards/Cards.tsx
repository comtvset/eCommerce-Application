import React, { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Paragraph } from 'src/components/text/Text.tsx';
import style from 'src/components/cards/Cards.module.scss';
import style1 from 'src/components/card/Card.module.scss';
import { Link } from 'src/components/link/Link.tsx';
import { getCurrencySymbol } from 'src/utils/CurrencyUtils.ts';
import { ensureBasketAndCheckProduct } from 'src/utils/BasketUtils.ts';
import { Button } from 'src/components/button/Button.tsx';
import { fetchAllProducts } from 'src/services/api/filterRequests.ts';
import { createAnonymousBasket, getProductsInCart } from 'src/services/api/ApiBasket.ts';
import ImageWithLoader from 'src/components/spinnerImage/ImageWithLoader.tsx';


interface CardProps {
  products: ProductProjection[];
}

export const Card: React.FC<CardProps> = ({ products }) => {
  const [isDisabled, setIsDisabled] = useState<Record<string, boolean>>({});

  const ensureBasketAndCheckProducts = async () => {
    await createAnonymousBasket();
    const cartId = localStorage.getItem('cartId') ?? '';
    const allProducts = await fetchAllProducts();
    const productsInCartResponse = await getProductsInCart(cartId);
    const productsInCart = productsInCartResponse.body.lineItems;

    const buttonsState: Record<string, boolean> = {};

    allProducts.forEach((product) => {
      const isProductInCart = productsInCart.some(
        (cartProduct) => cartProduct.productId === product.id,
      );
      buttonsState[product.id] = isProductInCart;
    });
    setIsDisabled(buttonsState);
  };

  useEffect(() => {
    ensureBasketAndCheckProducts().catch(() => {
      'Button is broken';
    });
  }, []);

  return (
    <div className={style.cards_container}>
      {products.map((product) => {
        const priceObj = product.masterVariant.prices?.[0].value;
        const priceDiscountObj = product.masterVariant.prices?.[0].discounted?.value;

        const centAmount = priceObj?.centAmount;
        const centAmountDiscount = priceDiscountObj?.centAmount;
        const currencyCode = priceObj?.currencyCode;
        const currencySymbol = getCurrencySymbol(currencyCode) ?? '';
        const price =
          centAmount !== undefined ? `${currencySymbol}${(centAmount / 100).toFixed(2)}` : '';

        const priceDiscount =
          centAmountDiscount !== undefined
            ? `${currencySymbol}${(centAmountDiscount / 100).toFixed(2)}`
            : '';

        const priceStartClass = centAmountDiscount
          ? `${style1.price_start} ${style1.price_sale}`
          : style1.price_start;

        return (
          <Link
            className={style.card}
            key={product.id}
            id={product.id}
            to={`/product/${product.id}`}
            onClick={() => {
              (async () => {
                await ensureBasketAndCheckProduct(product.id);
              })();
            }}
          >
            <div className={style.image_container}>
              <ImageWithLoader
                className={style.image}
                src={product.masterVariant.images ? product.masterVariant.images[0].url : ''}
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
            <div className={style1.prices}>
              <Paragraph tag="h2" title={price} className={priceStartClass} />
              {centAmountDiscount !== undefined && (
                <Paragraph tag="h2" title={priceDiscount} className={style1.price_finish} />
              )}
            </div>
            <Button
              className={style.button__add}
              title="ADD TO BASKET"
              disabled={isDisabled[product.id]}
            />
          </Link>
        );
      })}
    </div>
  );
};
