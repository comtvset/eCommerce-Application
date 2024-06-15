import { createApiRoot } from 'src/services/api/BuildClient.ts';
import { CartUpdate } from '@commercetools/platform-sdk';

const apiRoot = createApiRoot();

export const createAnonymousBasket = async () => {
  let idCart = localStorage.getItem('cartId');
  if (!idCart) {
    const body = { country: 'US', currency: 'EUR' };
    const result = await apiRoot.carts().post({ body }).execute();
    idCart = result.body.id;
    localStorage.setItem('cartId', result.body.id);
  }
  return idCart;
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

export const deleteProductFromCart = async (idCart: string, productId: string) => {
  const version = await getVersionCart(idCart);
  const { lineItems } = (await getProducts(idCart, productId)).body;
  const lineItem = lineItems.find((item) => item.productId === productId);
  const lineItemId = lineItem ? lineItem.id : undefined;
  const body: CartUpdate = {
    version,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId,
        quantity: 1,
      },
    ],
  };
  const result = await apiRoot.carts().withId({ ID: idCart }).post({ body }).execute();
  return result;
};
