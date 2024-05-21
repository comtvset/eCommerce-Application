import { ctpClient } from 'src/services/api/BuildClient.ts';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const PROJECT_KEY: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: PROJECT_KEY,
});

const getProject = async () => {
  return apiRoot.get().execute();
};

(async () => {
  await getProject();
})();

export const sdkTest = () => {
  return true;
};
