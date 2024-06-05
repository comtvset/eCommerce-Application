import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { IPasswordForm } from 'src/components/form/profile/IPasswordForm.ts';

export const updatePassword = async (
  api: ByProjectKeyRequestBuilder,
  formData: IPasswordForm,
  version: number,
) => {
  const accessToken: string = localStorage.getItem('token') ?? '';

  return api
    .me()
    .password()
    .post({
      body: {
        version,
        currentPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .execute();
};
