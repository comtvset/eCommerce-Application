import { loginClient } from 'src/services/api/BuildClient.ts';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export const loginRequest = async (myEmail: string, myPassword: string) => {
  const PROJECT_KEY: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;
  const apiRoot = createApiBuilderFromCtpClient(loginClient).withProjectKey({
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

  return loginUser();
};
