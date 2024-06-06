import React, { useEffect, useState } from 'react';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Country } from 'src/components/country/country.ts';
import { ModalWindow } from 'src/components/modalWindow/modalWindow.tsx';
import { ICustomerModel, customerModel } from 'src/model/Customer.ts';
import { getLoginClient } from 'src/services/api/BuildClient.ts';
import { PROJECT_KEY } from 'src/services/api/BuildClientRegistration.ts';
import { RegistrationMainFields } from 'src/components/form/registration/RegistrationMainFields.tsx';
import styles from 'src/components/form/profile/UserProfileForm.module.scss';
import { validateField } from 'src/components/validation/Validation.ts';
import { updateCustomerField } from 'src/services/api/updateCustomer.ts';
import { updateEmail } from 'src/services/userData/saveEmailPassword.ts';
import { mapCustomerToModel } from 'src/services/DTO/Customer.ts';
import { ServerError } from 'src/utils/error/RequestErrors.ts';
import useModalEffect from './UseModalEffect.ts';

interface BasicUserDataProfileProps {
  version: number;
  userProfileFormData: ICustomerModel;
}

export const BasicUserDataProfile: React.FC<BasicUserDataProfileProps> = ({
  version,
  userProfileFormData,
}) => {
  const apiRoot2 = createApiBuilderFromCtpClient(getLoginClient().client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  const [api, setAPI] = useState(apiRoot2);

  const [id] = useState(localStorage.getItem('fullID') ?? '');
  const [isDisabledUserInfo, setEditUserInfo] = useState(true);
  const [formData, setFormData] = useState<ICustomerModel>(customerModel);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmail, setEmail] = useState(false);
  const [customerVersion, setCustomerVersion] = useState(version);

  const popupMessage = { status: '', message: '' };
  const [modalData, setModalData] = useState(popupMessage);
  useModalEffect(modalData, setModalData);

  const [errors, setErrors] = useState<ICustomerModel>(customerModel);

  useEffect(() => {
    setFormData({
      ...userProfileFormData,
    });
  }, [id, userProfileFormData]);

  const validateOneField = (name: string, value: string) => {
    const error = validateField(name, value, Country.Underfined, Country.Underfined);
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

    validateOneField(name, value);
  };

  useEffect(() => {
    const allFieldsValid = Object.values(errors).every(
      (error) => error === '' || typeof error === 'boolean',
    );
    setIsFormValid(allFieldsValid);
  }, [errors, formData.firstName, formData.lastName, formData.dateOfBirth, formData.email]);

  const handleUserInfoTab = () => {
    const bodyRequest = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      email: formData.email,
    };
    if (isDisabledUserInfo) {
      setEmail(true);
      setEditUserInfo(false);
    } else {
      setEditUserInfo(true);
      setEmail(false);

      if (isFormValid) {
        if (id) {
          updateCustomerField(
            api,
            id,
            customerVersion,
            formData.firstName ?? '',
            formData.lastName ?? '',
            formData.dateOfBirth ?? '',
            formData.email,
          )
            .then((response) => {
              const customerData = mapCustomerToModel(response.body);

              updateEmail(formData.email);

              setAPI(
                createApiBuilderFromCtpClient(getLoginClient().client).withProjectKey({
                  projectKey: PROJECT_KEY,
                }),
              );

              setFormData(customerData);
              setCustomerVersion(response.body.version);
              setModalData({
                status: 'Success',
                message: 'You have successfully updated your details',
              });
            })
            .catch((error: unknown) => {
              if (error instanceof ServerError) {
                setModalData({ status: 'Error', message: error.message });
              } else if (error instanceof Error) {
                setModalData({ status: 'Error', message: error.message });
              } else {
                setModalData({ status: 'Error', message: 'Unexpected error occurred.' });
              }
              setFormData({
                ...formData,
                firstName: bodyRequest.firstName,
                lastName: bodyRequest.firstName,
                dateOfBirth: bodyRequest.dateOfBirth,
                email: bodyRequest.email,
              });
            });
        } else {
          setModalData({ status: 'Error', message: 'Please, make relogin again.' });
        }
      }
    }
  };

  return (
    <>
      <div className={`${styles.content} ${styles.visible}`}>
        <RegistrationMainFields
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          showFields={{
            email: isEmail,
            password: false,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
          }}
          disabledMode={isDisabledUserInfo}
        />
      </div>
      <button type="button" onClick={handleUserInfoTab}>
        {isDisabledUserInfo ? 'Edit' : 'Save'}
      </button>
      {modalData.message && <ModalWindow data={modalData} />}
    </>
  );
};
