// validation rules are compatible with CommerceTools
// https://docs.commercetools.com/api/projects/customers

import { Country } from '../country/country.ts';
import { validatePostalCode } from './PostalCodeValidation.ts';

export const validateEmail = (value: string) => {
  const errorMessages: string[] = [];

  if (value.startsWith('@')) {
    errorMessages.push('Cannot start with @');
  }
  if (!/^[^.]/.test(value)) {
    errorMessages.push('Cannot start with a dot');
  }
  if (!/^\S*$/.test(value)) {
    errorMessages.push('Cannot contain spaces');
  }
  if (!/^[a-zA-Z0-9@.]+$/.test(value)) {
    errorMessages.push('Can only contain English letters or digits');
  }
  if (!value.includes('@')) {
    errorMessages.push('Must contain @');
  }
  if (!/^\S+@\S+\.\S+$/.test(value)) {
    errorMessages.push('Must contain a domain name like example.com');
  }
  const dotMatches = value.match(/\./g);
  if (!(dotMatches !== null && dotMatches.length === 1)) {
    errorMessages.push('Must contain only one dot');
  }
  if (!/^[^@\s]+@[^.@\s]+\.[^@\s]+$/.test(value)) {
    errorMessages.push('Must be in the correct format like user@example.com');
  }
  return errorMessages.join('\n');
};

export const validatePassword = (password: string): string => {
  const errorMessages: string[] = [];

  if (password.length < 8) {
    errorMessages.push('Minimum 8 characters required');
  }
  if (!/[a-z]/.test(password)) {
    errorMessages.push('At least 1 lowercase letter required');
  }
  if (!/[A-Z]/.test(password)) {
    errorMessages.push('At least 1 uppercase letter required');
  }
  if (!/\d/.test(password)) {
    errorMessages.push('At least 1 digit required');
  }
  if (/\s/.test(password)) {
    errorMessages.push('Spaces are not allowed');
  }

  return errorMessages.join('\n');
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
  const validateValue: Country | string = inputValue;

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
    case 'streetName':
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
