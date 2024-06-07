import { Customer } from '@commercetools/platform-sdk';
import { countryLookup } from 'src/components/country/country.ts';
import { ICustomerModel } from 'src/model/Customer.ts';

export const mapCustomerToModel = (customer: Customer): ICustomerModel => {
  const isShippingDefaultAddress = !!customer.defaultShippingAddressId?.toString();
  const isBillingDefaultAddress = !!customer.defaultBillingAddressId?.toString();
  const country = countryLookup[customer.addresses[0].country];
  const billingCountry = countryLookup[customer.addresses[1].country];
  return {
    email: customer.email,
    password: customer.password,
    firstName: customer.firstName,
    lastName: customer.lastName,
    dateOfBirth: customer.dateOfBirth,
    isShippingDefaultAddress,
    isEqualAddress: false,
    streetName: customer.addresses[0].streetName,
    city: customer.addresses[0]?.city,
    postalCode: customer.addresses[0]?.postalCode,
    country,
    isBillingDefaultAddress,
    billingStreet: customer.addresses[1]?.streetName,
    billingCity: customer.addresses[1]?.city,
    billingCountry,
    billingPostalCode: customer.addresses[1]?.postalCode,
  };
};
