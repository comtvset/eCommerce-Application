import React, { useEffect, useState } from 'react';
import { RegistrationMainFields } from 'src/components/form/registration/RegistrationMainFields.tsx';
import { ICustomerModel, customerModel } from 'src/model/Customer.ts';
import styles from 'src/components/form/profile/UserProfileForm.module.scss';
import { myStatus } from 'src/components/tempFolderForDevelop/statusHandler.ts';
import { Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { IResponse } from 'src/components/tempFolderForDevelop/responseHandler.ts';
import { getLoginClient } from 'src/services/api/BuildClient.ts';
import { AddressForm } from 'src/components/address/Address.tsx';
import { BillingAddressForm } from 'src/components/address/BillingAddress.tsx';
import { ModalWindow } from 'src/components/modalWindow/modalWindow.tsx';

export const UserProfileForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basicInfo');

  const [formData, setFormData] = useState(customerModel);
  const [errors, setErrors] = useState<ICustomerModel>(customerModel);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<IResponse | null>(null);

  const id: string | null = localStorage.getItem('fullID');

  const handleChange = () => {
    //  console.log('TODO');
  };

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

  const mapCustomerToModel = (customer: Customer): ICustomerModel => {
    return {
      email: customer.email,
      password: customer.password,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth,
      isShippingDefaultAddress: false,
      isEqualAddress: false,
      street: customer.addresses[0].streetName,
      city: customer.addresses[0]?.city,
      postalCode: customer.addresses[0]?.postalCode,
      country: customer.addresses[0]?.country,
      isBillingDefaultAddress: false,
      billingStreet: customer.addresses[1]?.streetName,
      billingCity: customer.addresses[1]?.city,
      billingCountry: customer.addresses[1]?.country,
      billingPostalCode: customer.addresses[1]?.postalCode,
    };
  };

  interface CommercetoolsErrorDetail {
    code: string;
    message: string;
  }

  interface CommercetoolsErrorResponse {
    statusCode: number;
    message: string;
    errors: CommercetoolsErrorDetail[];
  }

  useEffect(() => {
    const isCommercetoolsError = (
      error: unknown,
    ): error is { body: CommercetoolsErrorResponse } => {
      return (
        typeof error === 'object' &&
        error !== null &&
        'body' in error &&
        typeof (error as { body: unknown }).body === 'object' &&
        (error as { body: unknown }).body !== null &&
        'errors' in (error as { body: CommercetoolsErrorResponse }).body &&
        Array.isArray((error as { body: CommercetoolsErrorResponse }).body.errors)
      );
    };
    const { client } = getLoginClient();
    const PROJECT_KEY: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;

    const apiRoot2 = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: PROJECT_KEY,
    });
    if (id) {
      apiRoot2
        .customers()
        .withId({ ID: id })
        .get()
        .execute()
        .then((response) => {
          const customerModelData = mapCustomerToModel(response.body);

          setFormData(customerModelData);
        })
        .catch((error: unknown) => {
          const errorsList: string[] = [];

          if (isCommercetoolsError(error)) {
            error.body.errors.forEach((err: CommercetoolsErrorDetail) => {
              errorsList.push(`${err.code}: ${err.message}`);
            });
          }
          setModalData(myStatus(false, errorsList.join('\n')));
          setShowModal(true);
        });
    }
  }, [id]);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    }
    return () => {
      ('');
    };
  }, [showModal]);

  const renderContent = () => {
    switch (activeTab) {
      case 'basicInfo':
        return (
          <>
            <div className={`${styles.content} ${styles.visible}`}>
              <RegistrationMainFields
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                showEmailAndPassword={false}
              />
            </div>
            <div className={styles.addresses}>
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
            </div>
            {showModal && modalData && <ModalWindow data={modalData} />}
          </>
        );
      case 'password':
        return <div>Not implemented</div>;
      default:
        return null;
    }
  };
  return (
    <div className={styles.tab_container}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'basicInfo' ? styles.activeTab : ''}`}
          onClick={() => {
            setActiveTab('basicInfo');
          }}
        >
          User Basic Info
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'password' ? styles.activeTab : ''}`}
          onClick={() => {
            setActiveTab('password');
          }}
        >
          Password
        </button>
      </div>
      <div className={styles.contentWrapper}>{renderContent()}</div>
    </div>
  );
};
