import {
  createAnonymousBasket,
  getProducts,
  addProductToCart,
  deleteProductFromCart,
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
    await addProductToCart(idCart, idProduct);
  }
};

export const handleResponseStatus = (statusCode: number) => {
  if (statusCode === 200) {
    return 'The product was successfully removed from the cart';
  }
  return "The product wasn't successfully removed";
};

export const deleteProductOnProductPage = async (
  idProduct: string,
  setResponseStatus: (status: string) => void,
) => {
  const idCart = await createAnonymousBasket();
  let message = '';
  if (idCart && idProduct) {
    const status = (await deleteProductFromCart(idCart, idProduct)).statusCode;
    if (status !== undefined) {
      message = handleResponseStatus(status);
    }
  }
  setResponseStatus(message);
};
