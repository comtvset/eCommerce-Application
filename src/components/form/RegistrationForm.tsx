import React, { useEffect, useState } from 'react';
import style from 'src/components/form/RegistrationForm.module.scss';
import { AddressForm } from 'src/components/address/Address.tsx';
import { validateField } from 'src/components/validation/Validation.ts';
import { validatePostalCode } from 'src/components/validation/PostalCodeValidation.ts';
import { Country } from 'src/components/country/country.ts';
import { RegistrationMainFields } from './RegistrationMainFields.tsx';
import { BillingAddressForm } from '../address/BillingAddress.tsx';

const allFields = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  isShippingDefaultAddress: false,
  isEqualAddress: false,
  street: '',
  city: '',
  postalCode: '',
  country: '',
  isBillingDefaultAddress: false,
  billingStreet: '',
  billingCity: '',
  billingCountry: '',
  billingPostalCode: '',
};

let countryShipping: Country;
let countryBilling: Country;
interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  isShippingDefaultAddress: boolean;
  isEqualAddress: boolean;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isBillingDefaultAddress: boolean;
  billingStreet: string;
  billingCity: string;
  billingCountry: string;
  billingPostalCode: string;
}

type FilledFields = Omit<FormData, 'isShippingDefaultAddress'>;

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState(allFields);

  const [errors, setErrors] = useState<FilledFields>(allFields);

  const [isFormValid, setIsFormValid] = useState(false);

  countryShipping = Country[formData.country as keyof typeof Country];
  countryBilling = Country[formData.billingCountry as keyof typeof Country];
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

  const handleSameAddress = (checked: boolean) => {
    setFormData({
      ...formData,
      isEqualAddress: checked,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value, countryShipping, countryBilling);
    const errorValidate = error === '' ? '' : `⚠ ${error}`;
    setErrors({
      ...errors,
      [name]: errorValidate,
    });
  };

  useEffect(() => {
    const allFieldsValid = Object.values(errors).every((error) => error === '' || typeof error === 'boolean');
    setIsFormValid(allFieldsValid);
  }, [errors]);

  useEffect(() => {
    const error = validatePostalCode(countryShipping, formData.postalCode);
    setErrors((prevErrors) => ({
      ...prevErrors,
      postalCode: error,
    }));
  }, [formData.country, formData.postalCode]);

  useEffect(() => {
    const error = validatePostalCode(countryBilling, formData.billingPostalCode);
    setErrors((prevErrors) => ({
      ...prevErrors,
      billingPostalCode: error,
    }));
  }, [formData.billingCountry, formData.billingPostalCode]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredFields: (keyof FormData)[] = [
      'email',
      'password',
      'firstName',
      'lastName',
      'dateOfBirth',
      'isShippingDefaultAddress',
      'isEqualAddress',
      'street',
      'city',
      'postalCode',
      'country',
      'isBillingDefaultAddress',
      'billingStreet',
      'billingCity',
      'billingCountry',
      'billingPostalCode',
    ];

    const isAnyEmpty = requiredFields.some((field) => !formData[field]);

    if (!isAnyEmpty && isFormValid) {
      // Submit the form if all required fields are filled and form is valid
      // TODO
    }
  };

  return (
    <form className={style.registration} onSubmit={handleSubmit}>
      <RegistrationMainFields formData={formData} handleChange={handleChange} errors={errors} />
      <AddressForm
        formData={formData}
        handleSameAddress={handleSameAddress}
        handleBoolean={handleDefaultAddress}
        handleChange={handleChange}
        errors={errors}
        title="Shipping address"
      />
      <BillingAddressForm
        formData={formData}
        handleBoolean={handleBillingAddress}
        handleChange={handleChange}
        errors={errors}
        title="Billing address"
      />

      <button className={style.submitButton} type="submit" disabled={!isFormValid}>
        APPLY
      </button>
    </form>
  );
};

export default RegistrationForm;
