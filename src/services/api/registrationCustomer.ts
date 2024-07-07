import { CustomerDraft } from '@commercetools/platform-sdk';
import { ServerError } from 'src/utils/error/RequestErrors.ts';
import { createApiRoot } from './BuildClient.ts';

export const createCustomer = (newCustomer: CustomerDraft) => {
  const apiRoot = createApiRoot();

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
