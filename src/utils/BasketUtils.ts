import {
  createAnonymousBasket,
  getProducts,
  addProductToBasket,
} from 'src/services/api/ApiBasket.ts';

export const ensureBasketAndCheckProduct = async (idProduct: string) => {
  const idCart = await createAnonymousBasket();
  if (idCart) {
    await getProducts(idCart, idProduct);
  }
};

export const addProduct = async (idProduct: string) => {
  const idCart = await createAnonymousBasket();
  if (idCart && idProduct) {
    await addProductToBasket(idCart, idProduct);
  }
};
