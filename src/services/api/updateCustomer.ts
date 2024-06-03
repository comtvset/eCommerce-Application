import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { ServerError } from 'src/utils/error/RequestErrors.ts';

export const updateCustomerField = async (
  apiRoot2: ByProjectKeyRequestBuilder,
  id: string,
  customerVersion: number,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
) => {
  return apiRoot2
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: customerVersion,
        actions: [
          {
            action: 'setFirstName',
            firstName,
          },
          {
            action: 'setLastName',
            lastName,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth,
          },
          {
            action: 'changeEmail',
            email,
          },
        ],
      },
    })
    .execute()
    .catch((error: unknown) => {
      throw new ServerError('Error during update customer.', error);
    });
};
