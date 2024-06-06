import { Address, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import React, { useEffect, useState } from 'react';
import { getLoginClient } from 'src/services/api/BuildClient.ts';
import { PROJECT_KEY } from 'src/services/api/BuildClientRegistration.ts';
import styles from 'src/components/form/profile/UserProfileForm.module.scss';
import { AddressForm } from 'src/components/address/Address.tsx';
import { ModalWindow } from 'src/components/modalWindow/modalWindow.tsx';
import { validateField } from 'src/components/validation/Validation.ts';
import { validatePostalCode } from 'src/components/validation/PostalCodeValidation.ts';
import { Country, countryLookup } from 'src/components/country/country.ts';
import { ICustomerModel, customerModel } from 'src/model/Customer.ts';
import useModalEffect from 'src/components/form/profile/UseModalEffect.ts';
import { ServerError } from 'src/utils/error/RequestErrors.ts';

interface AddressProfileProps {
  userProfileFormData: ICustomerModel;
}

export const AddressProfileForm: React.FC<AddressProfileProps> = ({ userProfileFormData }) => {
  const apiRoot = createApiBuilderFromCtpClient(getLoginClient().client).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const [countryNewAddress] = useState<Country>(Country.Underfined);
  const [countryBilling] = useState<Country>(Country.Underfined);
  const [id] = useState(localStorage.getItem('fullID') ?? '');
  const [formData, setFormData] = useState<ICustomerModel>({
    ...customerModel,
    ...userProfileFormData,
  });
  const [, setIsFormValid] = useState(false);

  const popupMessage = { status: '', message: '' };
  const [modalData, setModalData] = useState(popupMessage);
  useModalEffect(modalData, setModalData);

  const [errors, setErrors] = useState<ICustomerModel>(customerModel);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [editAddressID, setEditAddressID] = useState('');

  interface IEmptyAddress {
    streetName: string;
    city: string;
    postalCode: string;
    country: Country;
  }
  const emptyAddress: IEmptyAddress = {
    streetName: '',
    city: '',
    postalCode: '',
    country: Country.Underfined,
  };
  const [newAddress, setNewAddress] = useState<Address>(emptyAddress);

  const proceedExceptions = (error: unknown, message: string) => {
    if (error instanceof ServerError) {
      setModalData({ status: 'Error', message: error.message });
    } else if (error instanceof Error) {
      setModalData({ status: 'Error', message: error.message });
    } else {
      setModalData({ status: 'Error', message });
    }
  };

  useEffect(() => {
    const apiRoot2 = createApiBuilderFromCtpClient(getLoginClient().client).withProjectKey({
      projectKey: PROJECT_KEY,
    });
    const fetchAddresses = async (): Promise<void> => {
      try {
        const response = await apiRoot2.customers().withId({ ID: id }).get().execute();
        setAddresses(response.body.addresses);
        setFormData((prevFormData) => ({
          ...prevFormData,
          version: response.body.version,
        }));
      } catch (error) {
        proceedExceptions(error, 'Could not retrieve customer addresses');
      }
    };
    if (id) {
      fetchAddresses().catch((error: unknown) => {
        proceedExceptions(error, 'Could not retrieve customer addresses');
      });
    }
  }, [id]);

  const handleDefaultAddress = (checked: boolean, type: 'shipping' | 'billing') => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type === 'shipping' ? 'isShippingDefaultAddress' : 'isBillingDefaultAddress']: checked,
    }));
  };

  const validateOneField = (name: string, value: string) => {
    const error = validateField(name, value, countryNewAddress, countryBilling);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error || '',
    }));
  };

  const handleNewAddressChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setNewAddress((prevNewAddress) => ({
      ...prevNewAddress,
      [name]: value,
    }));
    validateOneField(name, value);
  };

  const fetchLatestVersion = async (): Promise<number | null> => {
    try {
      const response = await apiRoot.customers().withId({ ID: id }).get().execute();
      return response.body.version;
    } catch (error) {
      proceedExceptions(error, 'Fetching latest version');
      return null;
    }
  };

  const handleAddAddress = async () => {
    const latestVersion = await fetchLatestVersion();
    if (latestVersion !== null) {
      try {
        const response = await apiRoot
          .customers()
          .withId({ ID: id })
          .post({
            body: {
              version: latestVersion,
              actions: [
                {
                  action: 'addAddress',
                  address: {
                    streetName: newAddress.streetName,
                    city: newAddress.city,
                    postalCode: newAddress.postalCode,
                    country: Country[newAddress.country as keyof typeof Country],
                  },
                },
              ],
            },
          })
          .execute();

        setAddresses(response.body.addresses);
        setFormData((prevFormData) => ({
          ...prevFormData,
          version: response.body.version,
        }));
        setNewAddress(emptyAddress);
        setModalData({ status: 'Success', message: 'Address added successfully' });
      } catch (error) {
        setModalData({ status: 'Error', message: 'Could not add a new address' });
        proceedExceptions(error, 'Adding new address');
      }
    }
  };

  const handleEditAddress = async () => {
    const latestVersion = await fetchLatestVersion();
    if (latestVersion !== null) {
      try {
        const response = await apiRoot
          .customers()
          .withId({ ID: id })
          .post({
            body: {
              version: latestVersion,
              actions: [
                {
                  action: 'changeAddress',
                  addressId: editAddressID,
                  address: {
                    streetName: newAddress.streetName,
                    city: newAddress.city,
                    postalCode: newAddress.postalCode,
                    country: Country[newAddress.country as keyof typeof Country],
                  },
                },
              ],
            },
          })
          .execute();

        setAddresses(response.body.addresses);
        setIsEditAddress(false);
        setFormData((prevFormData) => ({
          ...prevFormData,
          version: response.body.version,
        }));
        setNewAddress(emptyAddress);
        setModalData({ status: 'Success', message: 'Address edited successfully' });
      } catch (error) {
        setModalData({ status: 'Error', message: 'Could not save edited address' });
        proceedExceptions(error, 'Editing address');
      }
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    const latestVersion = await fetchLatestVersion();
    if (latestVersion !== null) {
      try {
        const response = await apiRoot
          .customers()
          .withId({ ID: id })
          .post({
            body: {
              version: latestVersion,
              actions: [
                {
                  action: 'removeAddress',
                  addressId,
                },
              ],
            },
          })
          .execute();

        setAddresses(response.body.addresses);
        setFormData((prevFormData) => ({
          ...prevFormData,
          version: response.body.version,
        }));
        setModalData({ status: 'Success', message: 'Address deleted successfully' });
      } catch (error) {
        setModalData({ status: 'Error', message: 'Error deleting address' });
        proceedExceptions(error, 'Deleting address');
      }
    }
  };

  useEffect(() => {
    const allFieldsValid = Object.values(errors).every(
      (error) => error === '' || typeof error === 'boolean',
    );
    setIsFormValid(allFieldsValid);
  }, [errors]);

  useEffect(() => {
    const error = validatePostalCode(countryNewAddress, newAddress.postalCode);
    setErrors((prevErrors) => ({
      ...prevErrors,
      postalCode: error,
    }));
  }, [countryNewAddress, newAddress.postalCode]);

  useEffect(() => {
    const error = validatePostalCode(countryBilling, formData.billingPostalCode);
    setErrors((prevErrors) => ({
      ...prevErrors,
      billingPostalCode: error,
    }));
  }, [countryBilling, formData.billingPostalCode]);

  return (
    <>
      <div className={styles.addresses_container}>
        <div className={styles.addresses}>
          <h1>Add New Address</h1>
          <div>
            <AddressForm
              formData={newAddress}
              handleChange={handleNewAddressChange}
              errors={errors}
              title="New Address"
              showIsTheSameAddress={false}
              disabledMode={false}
            />
            <div className={styles.buttons_editaddress}>
              {isEditAddress && (
                <button
                  className={styles.updteButton}
                  type="button"
                  onClick={() => {
                    handleEditAddress().catch((error: unknown) => {
                      proceedExceptions(error, 'Edit address failed');
                    });
                  }}
                >
                  Save Address
                </button>
              )}
              {isEditAddress && (
                <button
                  className={styles.updteButton}
                  type="button"
                  onClick={() => {
                    setIsEditAddress(false);
                    setNewAddress(emptyAddress);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
          {!isEditAddress && (
            <button
              type="button"
              className={styles.updteButton}
              onClick={() => {
                handleAddAddress().catch((error: unknown) => {
                  proceedExceptions(error, 'Adding new address');
                });
              }}
            >
              Add Address
            </button>
          )}
        </div>
        <div className={styles.addresses}>
          <h2>Your Addresses</h2>
          {addresses
            .slice()
            .reverse()
            .map((address) => (
              <div key={address.id} className={styles.addressCard}>
                <div className={styles.editdelete_container}>
                  <div>
                    <div className={styles.address_checkboxes}>
                      <label>
                        <input
                          type="checkbox"
                          checked={formData.isShippingDefaultAddress}
                          onChange={(e) => {
                            handleDefaultAddress(e.target.checked, 'shipping');
                          }}
                        />
                        Default Shipping
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={formData.isBillingDefaultAddress}
                          onChange={(e) => {
                            handleDefaultAddress(e.target.checked, 'billing');
                          }}
                        />
                        Default Billing
                      </label>
                    </div>
                  </div>
                  <div>
                    {!isEditAddress && (
                      <button
                        type="button"
                        onClick={() => {
                          setNewAddress(() => ({
                            ...address,
                            country: countryLookup[address.country],
                          }));
                          setEditAddressID(address.id ?? '');
                          setIsEditAddress(true);
                        }}
                      >
                        📝
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteAddress(address.id ?? '').catch((error: unknown) => {
                          proceedExceptions(error, 'Deleting address');
                        });
                      }}
                    >
                      ❌
                    </button>
                  </div>
                </div>
                <div className={styles.address_row}>
                  <div>
                    <span>street name:</span>
                    <p>{address.streetName}</p>
                  </div>
                  <div>
                    <span> city:</span>
                    <p>{address.city}</p>
                  </div>
                  <div>
                    <span>postal code:</span>
                    <p>{address.postalCode}</p>
                  </div>
                  <div>
                    <span> country:</span>
                    <p>{countryLookup[address.country]}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {modalData.message && <ModalWindow data={modalData} />}
    </>
  );
};
