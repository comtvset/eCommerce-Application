// validation rules are compatible with CommerceTools
// https://docs.commercetools.com/api/projects/customers

import { Country } from '../country/country.ts';
import { validatePostalCode } from './PostalCodeValidation.ts';

export const validateEmail = (email: string): string => {
  const trimmedValue = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;

  if (!trimmedValue) {
    return 'Email is required';
  }
  if (!emailRegex.test(trimmedValue)) {
    return 'Example of correct format: username@domain.topLevelDomain';
  }
  return '';
};

export const validatePassword = (password: string): string => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    return 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number.';
  }
  return '';
};

const validateName = (name: string): string => {
  const emailRegex = /^[a-zA-Z]+$/;
  return emailRegex.test(name) ? '' : 'Must contain at least 1 letter and use only Latin letters.';
};

const validateBirthday = (value: string): string => {
  const birthday = new Date(value);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const minDate = new Date(currentYear - 110, currentDate.getMonth(), currentDate.getDate());
  const maxDate = new Date(currentYear - 15, currentDate.getMonth(), currentDate.getDate());

  let result = '';
  if (birthday < minDate || birthday > maxDate) {
    result = 'Age shold be more then 15 yo';
  }

  return result;
};

const validateNonEmpty = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return 'Must contain at least one character';
  }
  return '';
};

const validateCountry = (value: string): string => {
  if (!(value in Country)) {
    return 'Please select a valid country.';
  }
  return '';
};

export const validateField = (
  name: string,
  inputValue: string,
  countryShipping: Country,
  countryBilling: Country,
): string => {
  let validateValue: Country | string;
  if (name === 'postalCode') {
    validateValue = countryShipping;
  } else if (name === 'billingPostalCode') {
    validateValue = countryBilling;
  } else validateValue = inputValue;

  switch (name) {
    case 'email':
      return validateEmail(validateValue);
    case 'password':
      return validatePassword(validateValue);
    case 'firstName':
    case 'lastName':
    case 'city':
    case 'billingCity':
      return validateName(validateValue);
    case 'dateOfBirth':
      return validateBirthday(validateValue);
    case 'street':
    case 'billingStreet':
      return validateNonEmpty(validateValue);
    case 'postalCode':
      return validatePostalCode(countryShipping, validateValue);
    case 'billingPostalCode':
      return validatePostalCode(countryBilling, validateValue);
    case 'country':
    case 'billingCountry':
      return validateCountry(validateValue);
    default:
      return '';
  }
};
