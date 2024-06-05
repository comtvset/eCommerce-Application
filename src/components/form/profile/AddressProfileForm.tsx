import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import React, { useEffect, useState } from 'react';
import { getLoginClient } from 'src/services/api/BuildClient.ts';
import { PROJECT_KEY } from 'src/services/api/BuildClientRegistration.ts';
import styles from 'src/components/form/profile/UserProfileForm.module.scss';
import { AddressForm } from 'src/components/address/Address.tsx';
import { BillingAddressForm } from 'src/components/address/BillingAddress.tsx';
import { ModalWindow } from 'src/components/modalWindow/modalWindow.tsx';
import { validateField } from 'src/components/validation/Validation.ts';
import { validatePostalCode } from 'src/components/validation/PostalCodeValidation.ts';
import { Country } from 'src/components/country/country.ts';
import { ICustomerModel, customerModel } from 'src/model/Customer.ts';
import useModalEffect from 'src/components/form/profile/UseModalEffect.ts';

interface AddressProfileProps {
  version: number;
  userProfileFormData: ICustomerModel;
}

export const AddressProfileForm: React.FC<AddressProfileProps> = ({
  version,
  userProfileFormData,
}) => {
  const apiRoot2 = createApiBuilderFromCtpClient(getLoginClient().client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  const [api, setAPI] = useState(apiRoot2);
  const [isDisabledAddress, setEditAddress] = useState(true);
  const [countryShipping, setCountryShipping] = useState<Country>(Country.Underfined);
  const [countryBilling, setCountryBilling] = useState<Country>(Country.Underfined);
  const [id] = useState(localStorage.getItem('fullID') ?? '');
  const [formData, setFormData] = useState<ICustomerModel>(customerModel);
  const [isFormValid, setIsFormValid] = useState(false);

  const popupMessage = { status: '', message: '' };
  const [modalData, setModalData] = useState(popupMessage);
  useModalEffect(modalData, setModalData);

  const [errors, setErrors] = useState<ICustomerModel>(customerModel);

  useEffect(() => {
    setFormData({
      ...userProfileFormData,
    });
  }, [id, userProfileFormData]);

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

  const handleAddressTab = () => {
    if (isDisabledAddress) {
      setCountryShipping(Country[formData.country as keyof typeof Country]);
      setCountryBilling(Country[formData.billingCountry as keyof typeof Country]);
      if (isFormValid && id) {
        // TODO send saving reqest to server
      }
    }
    setEditAddress(!isDisabledAddress);
  };

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
      <button type="button" onClick={handleAddressTab}>
        {isDisabledAddress ? 'Edit' : 'Save'}
      </button>
      {modalData.message && <ModalWindow data={modalData} />}
    </>
  );
};
