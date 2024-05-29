import React, { useEffect, useState } from 'react';
import style from 'src/components/form/RegistrationForm.module.scss';
import { AddressForm } from 'src/components/address/Address.tsx';
import { validateField } from 'src/components/validation/Validation.ts';
import { validatePostalCode } from 'src/components/validation/PostalCodeValidation.ts';
import { Country } from 'src/components/country/country.ts';
import { Paragraph } from 'src/components/text/Text.tsx';
import { Link } from 'src/components/link/Link.tsx';
// import { apiRootRegistration } from 'src/services/api/ctpClientRegistration.ts';
import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import { apiRoot } from 'src/services/api/ctpClient.ts';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { loginRequest } from 'src/services/api/loginRequest.ts';
import { saveCredentials } from 'src/services/userData/saveEmailPassword.ts';
import { RegistrationMainFields } from './RegistrationMainFields.tsx';
import { BillingAddressForm } from '../address/BillingAddress.tsx';
import { IResponse } from '../tempFolderForDevelop/responseHandler.ts';
import { myStatus } from '../tempFolderForDevelop/statusHandler.ts';
import { ModalWindow } from '../modalWindow/modalWindow.tsx';

let countryShipping: Country;
let countryBilling: Country;
interface FormData {
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

const allFields: FormData = {
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

const requiredFields: (keyof FormData)[] = [
  'email',
  'password',
  'firstName',
  'lastName',
  'dateOfBirth',
];

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState(allFields);

  const [errors, setErrors] = useState(allFields);

  const [isFormValid, setIsFormValid] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<IResponse | null>(null);
  const navigation = useNavigate();

  countryShipping = Country[formData.country as keyof typeof Country];
  countryBilling = Country[formData.billingCountry as keyof typeof Country];

  const handleDefaultAddress = (checked: boolean) => {
    setFormData({
      ...formData,
      isShippingDefaultAddress: checked,
    });
  };
  const handleBillingAddress = (checked: boolean) => {
    setFormData({
      ...formData,
      isBillingDefaultAddress: checked,
    });
  };

  const validateOneField = (name: string, value: string) => {
    const error = validateField(name, value, countryShipping, countryBilling);
    const errorValidate = error === '' ? '' : error;
    setErrors({
      ...errors,
      [name]: errorValidate,
    });
  };

  const handleSameAddress = (checked: boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      isEqualAddress: checked,
      ...(checked && {
        billingStreet: prevFormData.street,
        billingCity: prevFormData.city,
        billingCountry: prevFormData.country,
        billingPostalCode: prevFormData.postalCode,
      }),
    }));
  };

  useEffect(() => {
    if (formData.isEqualAddress) {
      const billingAddressFields: string[] = [
        'billingStreet',
        'billingCity',
        'billingCountry',
        'billingPostalCode',
      ];
      billingAddressFields.forEach((field) => {
        if (typeof formData[field] === 'string') {
          const value = formData[field] as string;
          const error = validateField(field, value, countryShipping, countryBilling);
          const errorValidate = error === '' ? '' : error;
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: errorValidate,
          }));
        }
      });
    }
  }, [formData.isEqualAddress, formData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateOneField(name, value);
  };

  useEffect(() => {
    const allFieldsValid = Object.values(errors).every(
      (error) => error === '' || typeof error === 'boolean',
    );
    setIsFormValid(allFieldsValid);
  }, [errors, formData]);

  useEffect(() => {
    const error = validatePostalCode(countryShipping, formData.postalCode);
    setErrors((prevErrors) => ({
      ...prevErrors,
      postalCode: error,
    }));
  }, [formData.country, formData.postalCode]);

  useEffect(() => {
    const error = validatePostalCode(countryBilling, formData.billingPostalCode);
    setErrors((prevErrors) => ({
      ...prevErrors,
      billingPostalCode: error,
    }));
  }, [formData.billingCountry, formData.billingPostalCode]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isAnyEmpty = requiredFields.some((field) => !formData[field]);

    if (!isAnyEmpty && isFormValid) {
      let generatedCustomerID: string;
      let generatedShippAddrID: string | undefined;
      let generatedBillAddrID: string | undefined;
      const generateUUID = (): string => {
        return uuidv4();
      };

      const addresses: BaseAddress[] = [
        {
          id: generateUUID(),
          streetName: formData.street,
          city: formData.city,
          country: Country[formData.country as keyof typeof Country],
          postalCode: formData.postalCode,
        },
        {
          id: generateUUID(),
          streetName: formData.billingStreet,
          city: formData.billingCity,
          country: Country[formData.billingCountry as keyof typeof Country],
          postalCode: formData.billingPostalCode,
        },
      ];

      const newCustomer: CustomerDraft = {
        key: generateUUID(),
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        addresses,
        ...(formData.isShippingDefaultAddress && { defaultShippingAddress: 0 }),
        ...(formData.isBillingDefaultAddress && { defaultBillingAddress: 1 }),
      };

      const createCustomer = () => {
        return apiRoot
          .customers()
          .post({
            body: newCustomer,
          })
          .execute();
      };

      createCustomer()
        .then(async ({ body }) => {
          generatedCustomerID = body.customer.id;
          generatedShippAddrID = body.customer.addresses[0].id;
          generatedBillAddrID = body.customer.addresses[1].id;
          if (body.customer.email) {
            saveCredentials(formData.email, formData.password);
            await loginRequest(formData.email, formData.password);
            setTimeout(() => {
              navigation('/');
            }, 1000);
            setModalData(myStatus(true, 'Login successful!'));
            setShowModal(true);
          }
        })
        .catch((error: unknown) => {
          if (error) {
            setModalData(myStatus(false, 'A customer with this email already exists!'));
            setShowModal(true);
          }
        });

      if (formData.isShippingDefaultAddress) {
        const setDefualtAdd = () => {
          return apiRoot
            .customers()
            .withId({ ID: generatedCustomerID })
            .post({
              body: {
                version: 1,
                actions: [
                  {
                    action: 'setDefaultShippingAddress',
                    addressId: generatedShippAddrID,
                  },
                ],
              },
            })
            .execute();
        };
        setDefualtAdd()
          .then(() => {
            // TODO
          })
          .catch((error: unknown) => {
            if (error) {
              // TODO
            }
          });
      }
      if (formData.isBillingDefaultAddress) {
        const setDefualtAdd = () => {
          return apiRoot
            .customers()
            .withId({ ID: generatedCustomerID })
            .post({
              body: {
                version: 1,
                actions: [
                  {
                    action: 'setDefaultBillingAddress',
                    addressId: generatedBillAddrID,
                  },
                ],
              },
            })
            .execute();
        };
        setDefualtAdd()
          .then(() => {
            // TODO
          })
          .catch((error: unknown) => {
            if (error) {
              // TODO
            }
          });
      }
    }
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
    return () => {
      ('');
    };
  }, [showModal]);

  return (
    <>
      <form className={style.registration} onSubmit={handleSubmit}>
        <RegistrationMainFields formData={formData} handleChange={handleChange} errors={errors} />
        <AddressForm
          formData={formData}
          handleSameAddress={handleSameAddress}
          handleBoolean={handleDefaultAddress}
          handleChange={handleChange}
          errors={errors}
          title="Shipping address"
        />
        <BillingAddressForm
          formData={formData}
          handleBoolean={handleBillingAddress}
          handleChange={handleChange}
          errors={errors}
          title="Billing address"
        />

        <button className={style.submitButton} type="submit" disabled={!isFormValid}>
          APPLY
        </button>
        <div className={style.link}>
          <Paragraph
            tag="p"
            className={style.register_text}
            title="Do you already have an account?"
          />
          <Link to="/login" title="LOGIN" className={style.login_link} />
        </div>
      </form>
      {showModal && modalData && <ModalWindow data={modalData} />}
    </>
  );
};

export default RegistrationForm;
