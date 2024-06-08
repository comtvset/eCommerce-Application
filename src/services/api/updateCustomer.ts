import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

export const updateCustomerField = async (
  apiRoot2: ByProjectKeyRequestBuilder,
  id: string,
  customerVersion: number,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
) => {
  const response = await apiRoot2
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
    .execute();

  return response;
};
