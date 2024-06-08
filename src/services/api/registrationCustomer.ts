import { CustomerDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ServerError } from 'src/utils/error/RequestErrors.ts';
import { ctpClient } from './BuildClient.ts';

export const createCustomer = (newCustomer: CustomerDraft) => {
  const PROJECT_KEY: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  return apiRoot
    .customers()
    .post({
      body: newCustomer,
    })
    .execute()
    .catch((error: unknown) => {
      throw new ServerError('Error during customer registration.', error);
    });
};
