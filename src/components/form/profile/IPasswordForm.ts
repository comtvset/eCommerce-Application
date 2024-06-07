export interface IPasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const passwordForm: IPasswordForm = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};
