import React, { useEffect, useState } from 'react';
import styleAddr from 'src/components/address/Address.module.scss';
import styles from 'src/components/form/profile/UserProfileForm.module.scss';
import { InputWithLabel } from 'src/components/input/InputWithLabel.tsx';
import { IPasswordForm, passwordForm } from 'src/components/form/profile/IPasswordForm.ts';
import { validatePassword } from 'src/components/validation/Validation.ts';
import { ModalWindow } from 'src/components/modalWindow/modalWindow.tsx';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { getLoginClient } from 'src/services/api/BuildClient.ts';
import { PROJECT_KEY } from 'src/services/api/BuildClientRegistration.ts';
import { ServerError } from 'src/utils/error/RequestErrors.ts';
import { getPassword, setPassword } from 'src/services/userData/saveEmailPassword.ts';
import { updatePassword } from 'src/services/api/ResetPassword.ts';
import useModalEffect from 'src/components/form/profile/UseModalEffect.ts';

interface ChangePasswordFormProps {
  version: number;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ version }) => {
  const apiRoot2 = createApiBuilderFromCtpClient(getLoginClient().client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  const [api, setAPI] = useState(apiRoot2);

  const [isDisabledPassword, setEditPassword] = useState(true);
  const [errors, setErrors] = useState<IPasswordForm>(passwordForm);
  const [formData, setFormData] = useState<IPasswordForm>(passwordForm);
  const popupMessage = { status: '', message: '' };
  const [modalData, setModalData] = useState(popupMessage);
  useModalEffect(modalData, setModalData);

  const [id] = useState(localStorage.getItem('fullID') ?? '');
  const [customerVersion, setCustomerVersion] = useState(version);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(false);
  const [isSamePasswords, setIsSamePasswords] = useState(false);

  const proceedExceptions = (error: unknown, message: string) => {
    if (error instanceof ServerError) {
      setModalData({ status: 'Error', message: error.message });
    } else if (error instanceof Error) {
      setModalData({ status: 'Error', message: error.message });
    } else {
      setModalData({ status: 'Error', message });
    }
  };

  const fetchLatestVersion = async (): Promise<number> => {
    let response;
    let result = -1;

    try {
      response = await api.customers().withId({ ID: id }).get().execute();
    } catch (error) {
      proceedExceptions(error, 'Fetching latest version');
    }
    if (response !== undefined) {
      result = response.body.version;
    }
    return result;
  };

  const validatePasswordsForm = (name: string, value: string) => {
    const error = validatePassword(value);
    const errorValidate = error === '' ? '' : error;
    setErrors({
      ...errors,
      [name]: errorValidate,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validatePasswordsForm(name, value);
  };

  useEffect(() => {
    const allFieldsValid = Object.values(errors).every(
      (error) => error === '' || typeof error === 'boolean',
    );
    setIsFormValid(allFieldsValid);
  }, [errors, formData]);

  const handlePasswordChange = async () => {
    if (id && isSamePasswords && formData.oldPassword) {
      if (localStorage.getItem('changePassword')) {
        setModalData({
          status: 'Invalid',
          message: 'Please logout and login again after password was changed.',
        });
      } else {
        const latestVersion = await fetchLatestVersion();

        updatePassword(api, formData, latestVersion)
          .then((response) => {
            setCustomerVersion(response.body.version);
            setPassword(formData.newPassword);
            setFormData(passwordForm);
            setIsOldPasswordCorrect(false);
            localStorage.setItem('changePassword', 'true');

            setModalData({ status: 'Success', message: 'Password updated successfully.' });
            setEditPassword(true);
            setAPI(
              createApiBuilderFromCtpClient(getLoginClient().client).withProjectKey({
                projectKey: PROJECT_KEY,
              }),
            );
          })
          .catch((error: unknown) => {
            if (error instanceof ServerError) {
              setModalData({ status: 'Error', message: error.message });
            } else {
              setModalData({ status: 'Error', message: 'Unexpected error occurred.' });
            }
          });
      }
    } else {
      setModalData({
        status: 'Invalid',
        message: 'The New Password and Confirm Password should be the same',
      });
    }
  };

  const handleOldPassword = () => {
    if (formData.oldPassword === getPassword()) {
      setIsOldPasswordCorrect(true);
      setEditPassword(false);
      setIsSamePasswords(false);
      setModalData({ status: 'Sucess!', message: 'Password sucessfuly verifyed' });
    } else {
      setIsOldPasswordCorrect(false);
      setEditPassword(true);
      setModalData({ status: 'Error', message: 'Current Password is wrong. Try again.' });
    }
  };

  const isConfirmPassword = () => {
    if (
      formData.newPassword === formData.confirmPassword &&
      isOldPasswordCorrect &&
      formData.newPassword &&
      formData.confirmPassword &&
      isFormValid
    ) {
      setIsSamePasswords(true);
    } else setIsSamePasswords(false);
  };

  useEffect(() => {
    if (
      formData.newPassword === formData.confirmPassword &&
      isOldPasswordCorrect &&
      formData.newPassword &&
      formData.confirmPassword &&
      isFormValid
    ) {
      setIsSamePasswords(true);
    } else setIsSamePasswords(false);
  }, [formData.confirmPassword, formData.newPassword, isFormValid, isOldPasswordCorrect]);

  return (
    <>
      <div className={`${styles.content} ${styles.visible}`}>
        <div className={styleAddr.formbody}>
          <InputWithLabel
            id="oldPassword"
            type="password"
            name="oldPassword"
            label="Old Password"
            value={formData.oldPassword}
            onChange={(e) => {
              handleChange(e);
            }}
            required
            error={errors.oldPassword}
          />

          <button type="button" className={styles.verifyButton} onClick={handleOldPassword}>
            Verify
          </button>
          <InputWithLabel
            id="newPassword"
            type="password"
            name="newPassword"
            label="New Password"
            value={formData.newPassword}
            onChange={(e) => {
              handleChange(e);
              isConfirmPassword();
            }}
            required
            error={errors.newPassword}
            disabledMode={isDisabledPassword}
          />

          <InputWithLabel
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            label="Confirm New Password"
            value={formData.confirmPassword}
            onChange={(e) => {
              handleChange(e);
              isConfirmPassword();
            }}
            required
            error={errors.confirmPassword}
            disabledMode={isDisabledPassword}
          />
        </div>
        {modalData.message && <ModalWindow data={modalData} />}
      </div>
      {isOldPasswordCorrect && (
        <button
          type="button"
          className={styles.updteButton}
          onClick={() => {
            handlePasswordChange().catch((error: unknown) => {
              proceedExceptions(error, 'Edit address failed');
            });
          }}
          disabled={!isSamePasswords || !isFormValid}
        >
          {isDisabledPassword ? 'Edit' : 'Update'}
        </button>
      )}
    </>
  );
};
