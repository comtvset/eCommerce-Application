import { createApiRoot, createLoginApiRoot, getLoginClient } from './BuildClient.ts';
import { saveToken } from './saveToken.ts';

export const loginRequest = async (myEmail: string, myPassword: string) => {
  const apiRoot = createApiRoot();

  const loginApiRoot = createLoginApiRoot();
  const { tokenCache } = getLoginClient();

  const loginUser = () => {
    return apiRoot
      .me()
      .login()
      .post({
        body: {
          email: myEmail,
          password: myPassword,
        },
      })
      .execute();
  };

  const result = loginUser()
    .then((response) => {
      const idUser = response.body.customer.id;
      const newIdUser = idUser.split('-')[0];
      localStorage.setItem('id', newIdUser);
      localStorage.setItem('fullID', idUser);
    })
    .then(() => {
      return loginApiRoot.carts().get().execute();
    })
    .then(() => {
      saveToken(tokenCache);
    });

  return result;
};
