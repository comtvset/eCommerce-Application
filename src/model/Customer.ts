export interface ICustomerModel {
  email: string;
  password: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  isShippingDefaultAddress: boolean;
  isEqualAddress: boolean;
  street: string | undefined;
  city: string | undefined;
  postalCode: string | undefined;
  country: string | undefined;
  isBillingDefaultAddress: boolean;
  billingStreet: string | undefined;
  billingCity: string | undefined;
  billingCountry: string | undefined;
  billingPostalCode: string | undefined;
  version?: number;
  [key: string]: string | boolean | number | undefined;
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
