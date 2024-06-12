import { apiRoot } from 'src/services/api/ctpClient.ts';
import { CartUpdate } from '@commercetools/platform-sdk';

export const createAnonymousBasket = async () => {
  if (!localStorage.getItem('cartId')) {
    const body = { country: 'US', currency: 'EUR' };
    const result = await apiRoot.carts().post({ body }).execute();
    localStorage.setItem('cartId', result.body.id);
    return true;
  }
  return false;
};

export const getProducts = async (idCart: string, id: string) => {
  const result = await apiRoot.carts().withId({ ID: idCart }).get().execute();
  const basketVersion = result.body.version;
  let isInBasket = false;
  result.body.lineItems.forEach((lineItem) => {
    if (lineItem.productId === id) {
      isInBasket = true;
    }
  });
  localStorage.setItem('isInBasket', isInBasket.toString());
  return basketVersion;
};

export const addProductToBasket = async (idCart: string, productId: string) => {
  const version = await getProducts(idCart, productId);
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
