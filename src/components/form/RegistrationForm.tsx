import React, { useEffect, useState } from 'react';
import style from 'src/logic/registrationPage/registration.module.scss';
import {
  validateBirthday,
  validateCountry,
  validateEmail,
  validateName,
  validateNonEmpty,
  validatePassword,
} from 'src/components/validation/Validation.ts';
import { validatePostalCode } from '../validation/PostalCodeValidation.ts';
import { Country } from '../country/country.ts';

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

let countryEnumValue: Country;
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

  countryEnumValue = Country[formData.country as keyof typeof Country];

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      case 'firstName':
      case 'lastName':
      case 'city':
        return validateName(value);
      case 'dateOfBirth':
        return validateBirthday(value);
      case 'street':
        return validateNonEmpty(value);

      case 'postalCode':
        return validatePostalCode(countryEnumValue, value);
      case 'country':
        return validateCountry(value);
      default:
        return '';
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field on change and update errors
    const error = validateField(name, value);
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
    // Trigger validation for postalCode field when country changes
    const error = validatePostalCode(countryEnumValue, formData.postalCode);
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
      <h2 className={style.left_aligned}>Shipping address</h2>
      <div className={style.formbody}>
        <div className={style.label_block}>
          <label htmlFor="street">Street</label>
          <label htmlFor="city">City</label>
          <label htmlFor="country">Country</label>
          <label htmlFor="postalCode">Postal code</label>
        </div>
        <div className={style.input_block}>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleChange}
            autoComplete="off"
            required
          >
            <option value="">...</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Italy">Italy</option>
            <option value="Netherlands">Netherlands</option>
          </select>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.error_block}>
          <div className={style.errorText}>{errors.street}</div>
          <div className={style.errorText}>{errors.city}</div>
          <div className={style.errorText}>{errors.country}</div>
          <div className={style.errorText}>{errors.postalCode}</div>
        </div>
      </div>
      <button className={style.submitButton} type="submit" disabled={!isFormValid}>
        APPLY
      </button>
    </form>
  );
};

export default RegistrationForm;
