import React, { useEffect, useState } from 'react';
import style from 'src/components/form/RegistrationForm.module.scss';
import { AddressForm } from 'src/components/address/Address.tsx';
import { validateField } from 'src/components/validation/Validation.ts';
import { validatePostalCode } from 'src/components/validation/PostalCodeValidation.ts';
import { Country } from 'src/components/country/country.ts';
import { Paragraph } from 'src/components/text/Text.tsx';
import { Link } from 'src/components/link/Link.tsx';
import { RegistrationMainFields } from './RegistrationMainFields.tsx';
import { BillingAddressForm } from '../address/BillingAddress.tsx';

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
  [key: string]: string | boolean;
}
const allFields: FormData = {
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

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState(allFields);

  const [errors, setErrors] = useState(allFields);

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

  const validateOneField = (name: string, value: string) => {
    const error = validateField(name, value, countryShipping, countryBilling);
    const errorValidate = error === '' ? '' : `⚠ ${error}`;
    setErrors({
      ...errors,
      [name]: errorValidate,
    });
  };

  const handleSameAddress = (checked: boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      isEqualAddress: checked,
      ...(checked && {
        billingStreet: prevFormData.street,
        billingCity: prevFormData.city,
        billingCountry: prevFormData.country,
        billingPostalCode: prevFormData.postalCode,
      }),
    }));
  };

  useEffect(() => {
    if (formData.isEqualAddress) {
      const billingAddressFields: string[] = [
        'billingStreet',
        'billingCity',
        'billingCountry',
        'billingPostalCode',
      ];
      billingAddressFields.forEach((field) => {
        if (typeof formData[field] === 'string') {
          const value = formData[field] as string;
          const error = validateField(field, value, countryShipping, countryBilling);
          const errorValidate = error === '' ? '' : `⚠ ${error}`;
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: errorValidate,
          }));
        }
      });
    }
  }, [formData.isEqualAddress, formData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateOneField(name, value);
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
  }, [formData.country, formData.postalCode, formData.isEqualAddress]);

  useEffect(() => {
    const error = validatePostalCode(countryBilling, formData.billingPostalCode);
    setErrors((prevErrors) => ({
      ...prevErrors,
      billingPostalCode: error,
    }));
  }, [formData.billingCountry, formData.billingPostalCode, formData.isEqualAddress]);

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
      <div className={style.link}>
        <Paragraph tag="p" className={style.register_text} title="Do you already have an account?" />
        <Link to="/login" title="LOGIN" className={style.login_link} />
      </div>
    </form>
  );
};

export default RegistrationForm;
