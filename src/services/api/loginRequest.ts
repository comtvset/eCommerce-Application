import { Cart } from '@commercetools/platform-sdk';
import { getCustomerBasket, getAnonimousCart, mergeCarts } from './ApiBasket.ts';
import { createApiRoot } from './BuildClient.ts';

let cartCustomer: Cart;

export const loginRequest = async (myEmail: string, myPassword: string) => {
  const apiRoot = createApiRoot();

  const anonymousCart: Cart = (await getAnonimousCart()) as unknown as Cart;

  const loginUser = async () => {
    return apiRoot
      .me()
      .login()
      .post({
        body: {
          email: myEmail,
          password: myPassword,
          activeCartSignInMode: 'MergeWithExistingCustomerCart',
        },
      })
      .execute()
      .then(async (response) => {
        const idUser = response.body.customer.id;
        localStorage.setItem('customerID', idUser);
        cartCustomer = (await getCustomerBasket()) as unknown as Cart;
        if (anonymousCart.id) {
          await mergeCarts(anonymousCart, cartCustomer);
        }
      });
  };

  return loginUser();
};
