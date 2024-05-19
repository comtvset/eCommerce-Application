// validation rules are compatible with CommerceTools

import { Country } from '../country/country.ts';

// https://docs.commercetools.com/api/projects/customers
export const validateEmail = (email: string): string => {
  const trimmedValue = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{3}$/;

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

export const validateName = (name: string): string => {
  const emailRegex = /^[a-zA-Z]+$/;
  return emailRegex.test(name) ? '' : 'Must contain at least 1 letter and use only Latin letters.';
};

export const validateBirthday = (value: string): string => {
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

export const validateNonEmpty = (value: string): string => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return 'Must contain at least one character';
  }
  return '';
};

export const validateCountry = (value: string): string => {
  if (!(value in Country)) {
    return 'Please select a valid country.';
  }
  return '';
};
