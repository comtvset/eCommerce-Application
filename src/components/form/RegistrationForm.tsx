import React, { useEffect, useState } from 'react';
import style from 'src/logic/registrationPage/registration.module.scss';
import { AddressForm } from 'src/components/address/Address.tsx';
import { validateField } from 'src/components/validation/Validation.ts';
import { validatePostalCode } from 'src/components/validation/PostalCodeValidation.ts';
import { Country } from 'src/components/country/country.ts';

const allFields = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
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
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState(allFields);

  const [errors, setErrors] = useState(allFields);

  const [isFormValid, setIsFormValid] = useState(false);

  countrySelectedValue = Country[formData.country as keyof typeof Country];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value, countrySelectedValue);
    setErrors({
      ...errors,
      [name]: error,
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
  }, [formData.postalCode]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredFields: (keyof FormData)[] = [
      'email',
      'password',
      'firstName',
      'lastName',
      'dateOfBirth',
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
      <div className={style.formbody}>
        <div className={style.label_block}>
          <label htmlFor="email">Email</label>
          <label htmlFor="password">Password</label>
          <label htmlFor="firstName">First Name</label>
          <label htmlFor="lastName">Last Name</label>
          <label htmlFor="dateOfBirth">Date of birth</label>
        </div>
        <div className={style.input_block}>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className={style.error_block}>
          <div className={style.errorText}>{errors.email}</div>
          <div className={style.errorText}>{errors.password}</div>
          <div className={style.errorText}>{errors.firstName}</div>
          <div className={style.errorText}>{errors.lastName}</div>
          <div className={style.errorText}>{errors.dateOfBirth}</div>
        </div>
      </div>
      <AddressForm formData={formData} handleChange={handleChange} errors={errors} title="Shipping address" />

      <button className={style.submitButton} type="submit" disabled={!isFormValid}>
        APPLY
      </button>
    </form>
  );
};

export default RegistrationForm;
