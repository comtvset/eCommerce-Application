import React, { useEffect, useState } from 'react';
import style from 'src/components/form/RegistrationForm.module.scss';
import { AddressForm } from 'src/components/address/Address.tsx';
import { validateField } from 'src/components/validation/Validation.ts';
import { validatePostalCode } from 'src/components/validation/PostalCodeValidation.ts';
import { Country } from 'src/components/country/country.ts';
import { Paragraph } from 'src/components/text/Text.tsx';
import { Link } from 'src/components/link/Link.tsx';
import { RegistrationMainFields } from './RegistrationMainFields.tsx';

const allFields = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  isShippingDefaultAddress: false,
  street: '',
  city: '',
  postalCode: '',
  country: '',
};

let countrySelectedValue: Country;
interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  isShippingDefaultAddress: boolean;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

type FilledFields = Omit<FormData, 'isShippingDefaultAddress'>;

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState(allFields);

  const [errors, setErrors] = useState<FilledFields>(allFields);

  const [isFormValid, setIsFormValid] = useState(false);

  countrySelectedValue = Country[formData.country as keyof typeof Country];
  const handleBoolean = (checked: boolean) => {
    setFormData({
      ...formData,
      isShippingDefaultAddress: checked,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value, countrySelectedValue);
    const errorValidate = error === '' ? '' : `⚠ ${error}`;
    setErrors({
      ...errors,
      [name]: errorValidate,
    });
  };

  useEffect(() => {
    const allFieldsValid = Object.values(errors).every((error) => error === '');
    setIsFormValid(allFieldsValid);
  }, [errors]);

  useEffect(() => {
    const error = validatePostalCode(countrySelectedValue, formData.postalCode);
    setErrors((prevErrors) => ({
      ...prevErrors,
      postalCode: error,
    }));
  }, [formData.country, formData.postalCode]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredFields: (keyof FormData)[] = [
      'email',
      'password',
      'firstName',
      'lastName',
      'dateOfBirth',
      'isShippingDefaultAddress',
      'street',
      'city',
      'postalCode',
      'country',
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
        handleBoolean={handleBoolean}
        handleChange={handleChange}
        errors={errors}
        title="Shipping address"
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
