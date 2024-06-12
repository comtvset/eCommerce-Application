import {
  createAnonymousBasket,
  getProducts,
  addProductToBasket,
} from 'src/services/api/ApiBasket.ts';

export const ensureBasketAndCheckProduct = async (idProduct: string) => {
  await createAnonymousBasket();
  const idCard = localStorage.getItem('cartId');
  if (idCard) {
    await getProducts(idCard, idProduct);
  }
};

export const addProduct = async (idProduct: string) => {
  const idCart = localStorage.getItem('cartId');
  if (idCart && idProduct) {
    await addProductToBasket(idCart, idProduct);
  }
};
