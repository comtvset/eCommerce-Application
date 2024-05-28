export interface ICustomerModel {
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

export const customerModel: ICustomerModel = {
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
