import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient, getLoginClient } from './BuildClient.ts';
import { saveToken } from './saveToken.ts';

export const loginRequest = async (myEmail: string, myPassword: string) => {
  const PROJECT_KEY: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

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

  const { client, tokenCache } = getLoginClient();

  const apiRoot2 = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const result = loginUser()
    .then(() => {
      return apiRoot2.carts().get().execute();
    })
    .then(() => {
      saveToken(tokenCache);
    });

  return result;
};
