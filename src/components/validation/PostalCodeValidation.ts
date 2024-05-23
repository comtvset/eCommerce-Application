import { Country } from '../country/country.ts';

export const validatePostalCode = (country: Country, postalCode: string): string => {
  let pattern: RegExp;
  let error = '';

  switch (country) {
    case Country.France:
      pattern = /^\d{2}[ ]?\d{3}$/;
      if (!pattern.test(postalCode)) {
        error = 'Correct format: <2 numbers><empty space><3 numbers>';
      }
      break;
    case Country.Germany:
    case Country.Italy:
      pattern = /^[\d]{5}$/;
      if (!pattern.test(postalCode)) {
        error = 'Correct format: 5 numbers';
      }
      break;
    case Country.Netherlands:
      pattern = /^\d{4}\s?[A-Za-z]{2}$/;
      if (!pattern.test(postalCode)) {
        error = 'Correct format: <4 numbers><empty space><2 letters>';
      }
      break;
    default:
      return 'Select country from the list';
  }

  return pattern.test(postalCode) ? '' : error;
};
