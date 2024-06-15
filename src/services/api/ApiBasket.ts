import { createApiRoot } from 'src/services/api/BuildClient.ts';
import { CartUpdate } from '@commercetools/platform-sdk';

const apiRoot = createApiRoot();

export const createAnonymousBasket = async () => {
  let idCard = localStorage.getItem('cartId');
  if (!idCard) {
    const body = { country: 'US', currency: 'EUR' };
    const result = await apiRoot.carts().post({ body }).execute();
    idCard = result.body.id;
    localStorage.setItem('cartId', result.body.id);
  }
  return idCard;
};

export const getProducts = async (idCart: string, id: string) => {
  const result = await apiRoot.carts().withId({ ID: idCart }).get().execute();
  let isInBasket = false;
  result.body.lineItems.forEach((lineItem) => {
    if (lineItem.productId === id) {
      isInBasket = true;
    }
  });
  localStorage.setItem('isInBasket', isInBasket.toString());
  return result;
};

export const getProductsInCart = async (idCart: string) => {
  const result = await apiRoot.carts().withId({ ID: idCart }).get().execute();
  return result;
};

export const getVersionCart = async (idCart: string) => {
  const result = await apiRoot.carts().withId({ ID: idCart }).get().execute();
  const cartVersion = result.body.version;
  return cartVersion;
};

export const addProductToCart = async (idCart: string, productId: string) => {
  const version = await getVersionCart(idCart);
  const body: CartUpdate = {
    version,
    actions: [
      {
        action: 'addLineItem',
        productId,
        quantity: 1,
      },
    ],
  };
  await apiRoot.carts().withId({ ID: idCart }).post({ body }).execute();
};
