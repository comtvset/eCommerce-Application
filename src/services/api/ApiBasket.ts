import { createApiRoot, createLoginApiRoot } from 'src/services/api/BuildClient.ts';
import {
  CartUpdate,
  ByProjectKeyRequestBuilder,
  Cart,
  CartUpdateAction,
  LineItem,
} from '@commercetools/platform-sdk';

function getApiRoot() {
  const isUser = Boolean(localStorage.getItem('userTokens'));
  const apiRoot: ByProjectKeyRequestBuilder = isUser ? createLoginApiRoot() : createApiRoot();
  return apiRoot;
}

export const createAnonymousBasket = async () => {
  const apiRoot = getApiRoot();
  let idCart = localStorage.getItem('anonimousCartId');
  if (!idCart) {
    const body = { country: 'FR', currency: 'EUR' };
    const result = await apiRoot.carts().post({ body }).execute();
    idCart = result.body.id;
    localStorage.setItem('cartId', result.body.id);
  }
  return idCart;
};

export const getAnonimousCart = async () => {
  const apiRoot = getApiRoot();

  const anonymousCartId = localStorage.getItem('anonimousCartId');

  let anonymousCartResult;
  if (anonymousCartId) {
    anonymousCartResult = await apiRoot.carts().withId({ ID: anonymousCartId }).get().execute();
  } else {
    anonymousCartResult = null;
  }
  return anonymousCartResult;
};

export const getCustomerBasket = async () => {
  const apiRoot = getApiRoot();
  const customerId: string | null = localStorage.getItem('customerID');

  if (!customerId) {
    throw new Error('There is no customer. User should log in.');
  }

  let cart;
  try {
    cart = await apiRoot.me().activeCart().get().execute();
  } catch (error) {
    const body = { customer: { id: customerId }, currency: 'EUR' };
    cart = await apiRoot.carts().post({ body }).execute();
  }
  localStorage.setItem('customerCartID', cart.body.id);

  return cart;
};

export const getProducts = async (idCart: string, id: string) => {
  const apiRoot = getApiRoot();
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
  const apiRoot = getApiRoot();
  const result = await apiRoot.carts().withId({ ID: idCart }).get().execute();
  return result;
};
export const getVersionCart = async (idCart: string) => {
  const apiRoot = getApiRoot();
  const result = await apiRoot.carts().withId({ ID: idCart }).get().execute();
  const cartVersion = result.body.version;
  return cartVersion;
};

export const addProductToCart = async (idCart: string, productId: string) => {
  const apiRoot = getApiRoot();
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
  const apiRoot = getApiRoot();
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

export const mergeCarts = async (anonymousCart: Cart, userCart: Cart) => {
  const actions: CartUpdateAction[] = [];
  const { lineItems } = anonymousCart;
  lineItems.forEach((lineItem: LineItem) => {
    actions.push({
      action: 'addLineItem',
      productId: lineItem.productId,
      variantId: lineItem.variant.id,
      quantity: lineItem.quantity,
    });
  });
  const apiRoot = getApiRoot();

  const updatedCart = await apiRoot
    .carts()
    .withId({ ID: userCart.id })
    .post({
      body: {
        version: userCart.version,
        actions,
      },
    })
    .execute();

  return updatedCart;
};
