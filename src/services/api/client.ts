import { ctpClient, getCurrentToken, getRefreshToken } from 'src/services/api/BuildClient.ts';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const PROJECT_KEY: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: PROJECT_KEY,
});

const getProject = () => {
  return apiRoot.get().execute();
};

const getTokens = async () => {
  try {
    await getProject();
    const currentToken = getCurrentToken();
    const refreshToken = getRefreshToken();

    const tokens = {
      curToken: currentToken,
      refToken: refreshToken,
    };

    localStorage.setItem('userTokens', JSON.stringify(tokens));
  } catch (error) {
    // console.error(error); // commit for ESLint
  }
};

try {
  await getTokens();
} catch (error) {
  // console.error(error);  // commit for ESLint
}

export const sdkTest = () => {
  return true;
};
