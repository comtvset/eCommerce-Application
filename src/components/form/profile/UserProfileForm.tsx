import React, { useEffect, useState } from 'react';
import { RegistrationMainFields } from 'src/components/form/registration/RegistrationMainFields.tsx';
import { ICustomerModel, customerModel } from 'src/model/Customer.ts';
import styles from 'src/components/form/profile/UserProfileForm.module.scss';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { getLoginClient } from 'src/services/api/BuildClient.ts';
import { AddressForm } from 'src/components/address/Address.tsx';
import { BillingAddressForm } from 'src/components/address/BillingAddress.tsx';
import { ModalWindow } from 'src/components/modalWindow/modalWindow.tsx';
import { Country } from 'src/components/country/country.ts';
import { validateField } from 'src/components/validation/Validation.ts';
import { validatePostalCode } from 'src/components/validation/PostalCodeValidation.ts';
import { ServerError } from 'src/utils/error/RequestErrors.ts';
import { mapCustomerToModel } from 'src/services/DTO/Customer.ts';
import { updateCustomerField } from 'src/services/api/updateCustomer.ts';
import { updateEmail } from 'src/services/userData/saveEmailPassword.ts';

const PROJECT_KEY: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;

export const UserProfileForm: React.FC = () => {
  const apiRoot2 = createApiBuilderFromCtpClient(getLoginClient().client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  const [api, setAPI] = useState(apiRoot2);
  const [activeTab, setActiveTab] = useState('basicInfo');
  const [isDisabledUserInfo, setEditUserInfo] = useState(true);
  const [isDisabledAddress, setEditAddress] = useState(true);
  const [isDisabledPassword, setEditPassword] = useState(true);
  const [countryShipping, setCountryShipping] = useState<Country>(Country.Underfined);
  const [countryBilling, setCountryBilling] = useState<Country>(Country.Underfined);
  const [isEmail, setEmail] = useState(false);
  const [id] = useState(localStorage.getItem('fullID') ?? '');
  const [customerVersion, setCustomerVersion] = useState(-1);

  const [formData, setFormData] = useState(customerModel);
  const [isFormValid, setIsFormValid] = useState(false);

  const popupMessage = { status: '', message: '' };
  const [modalData, setModalData] = useState(popupMessage);

  const [errors, setErrors] = useState<ICustomerModel>(customerModel);

  const handleDefaultAddress = (checked: boolean) => {
    setFormData({
      ...formData,
      isShippingDefaultAddress: checked,
    });
  };

  const handleBillingAddress = (checked: boolean) => {
    setFormData({
      ...formData,
      isBillingDefaultAddress: checked,
    });
  };

  const validateOneField = (name: string, value: string) => {
    const error = validateField(name, value, countryShipping, countryBilling);
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
  }, [errors, formData]);

  useEffect(() => {
    const error = validatePostalCode(countryShipping, formData.postalCode);
    setErrors((prevErrors) => ({
      ...prevErrors,
      postalCode: error,
    }));
  }, [countryShipping, formData.postalCode]);

  useEffect(() => {
    const error = validatePostalCode(countryBilling, formData.billingPostalCode);
    setErrors((prevErrors) => ({
      ...prevErrors,
      billingPostalCode: error,
    }));
  }, [countryBilling, formData.billingPostalCode]);

  const handleUserInfoTab = () => {
    if (isDisabledUserInfo) {
      setEmail(!isEmail);
    }
    setEditUserInfo(!isDisabledUserInfo);
    setEmail(!isEmail);

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
          })
          .catch((error: unknown) => {
            if (error instanceof ServerError) {
              setModalData({ status: 'Error', message: error.message });
            }
          });
      } else {
        setModalData({ status: 'Error', message: 'Please, make relogin again.' });
      }
    }
  };

  const handleAddressTab = () => {
    if (isDisabledAddress) {
      setCountryShipping(Country[formData.country as keyof typeof Country]);
      setCountryBilling(Country[formData.billingCountry as keyof typeof Country]);
      if (isFormValid) {
        // TODO send saving reqest to server
      }
    }
    setEditAddress(!isDisabledAddress);
  };

  const handlePasswordTab = () => {
    if (isDisabledPassword) {
      // TODO send saving reqest to server
    }
    setEditPassword(!isDisabledPassword);
  };

  const handleChangeMode = (tab: string) => {
    if (tab === 'basicInfo') {
      handleUserInfoTab();
    } else if (tab === 'password') {
      handlePasswordTab();
    } else if (tab === 'address') {
      handleAddressTab();
    }
  };

  useEffect(() => {
    if (modalData.status) {
      const timer = setTimeout(() => {
        setModalData({ status: '', message: '' });
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    }
    return () => {
      ('');
    };
  }, [modalData]);

  useEffect(() => {
    if (id) {
      api
        .customers()
        .withId({ ID: id })
        .get()
        .execute()
        .then((response) => {
          const customerData = mapCustomerToModel(response.body);
          setFormData(customerData);
          setCustomerVersion(response.body.version);
        })
        .catch((error: unknown) => {
          if (error instanceof ServerError) {
            setModalData({ status: 'Error', message: error.message });
          } else {
            setModalData({ status: 'Error', message: 'Unexpected error occurred.' });
          }
        });
    } else {
      setModalData({ status: 'Error', message: 'Please, make relogin again.' });
    }
  }, [id, api]);

  const handleSwitchTab = () => {
    switch (activeTab) {
      case 'basicInfo':
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
            <button
              type="button"
              onClick={() => {
                handleChangeMode(activeTab);
              }}
            >
              {isDisabledUserInfo ? 'Edit' : 'Save'}
            </button>
            {modalData.message && <ModalWindow data={modalData} />}
          </>
        );
      case 'address':
        return (
          <>
            <div className={styles.addresses}>
              <AddressForm
                formData={formData}
                handleBoolean={handleDefaultAddress}
                handleChange={handleChange}
                errors={errors}
                title="Shipping address"
                showIsTheSameAddress={false}
                disabledMode={isDisabledAddress}
              />
              <BillingAddressForm
                formData={formData}
                handleBoolean={handleBillingAddress}
                handleChange={handleChange}
                errors={errors}
                title="Billing address"
                disabledMode={isDisabledAddress}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                handleChangeMode(activeTab);
              }}
            >
              {isDisabledAddress ? 'Edit' : 'Save'}
            </button>
            {modalData.message && <ModalWindow data={modalData} />}
          </>
        );
      case 'password':
        return (
          <button
            type="button"
            onClick={() => {
              handleChangeMode(activeTab);
            }}
          >
            {isDisabledPassword ? 'Edit' : 'Save'}
          </button>
        );

      default:
        return null;
    }
  };
  return (
    <div className={styles.tab_container}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'basicInfo' ? styles.activeTab : ''}`}
          onClick={() => {
            setActiveTab('basicInfo');
          }}
        >
          User Basic Info
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'address' ? styles.activeTab : ''}`}
          onClick={() => {
            setActiveTab('address');
          }}
        >
          Addresses
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'password' ? styles.activeTab : ''}`}
          onClick={() => {
            setActiveTab('password');
          }}
        >
          Password
        </button>
      </div>
      <div className={styles.contentWrapper}>{handleSwitchTab()}</div>
    </div>
  );
};
