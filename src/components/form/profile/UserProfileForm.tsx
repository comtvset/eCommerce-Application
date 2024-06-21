import React, { useEffect, useState } from 'react';
import { ICustomerModel, customerModel } from 'src/model/Customer.ts';
import styles from 'src/components/form/profile/UserProfileForm.module.scss';
import { createLoginApiRoot } from 'src/services/api/BuildClient.ts';
import { ModalWindow } from 'src/components/modalWindow/modalWindow.tsx';
import { ServerError } from 'src/utils/error/RequestErrors.ts';
import { mapCustomerToModel } from 'src/services/DTO/Customer.ts';
import { ChangePasswordForm } from 'src/components/form/profile/ChangePasswordForm.tsx';
import { AddressProfileForm } from 'src/components/form/profile/AddressProfileForm.tsx';
import useModalEffect from 'src/components/form/profile/UseModalEffect.ts';
import { BasicUserDataProfile } from './BasicUserDataProfile.tsx';

export const UserProfileForm: React.FC = () => {
  const loginApiRoot = createLoginApiRoot();
  const [api] = useState(loginApiRoot);
  const [activeTab, setActiveTab] = useState('basicInfo');

  const [id] = useState(localStorage.getItem('fullID') ?? '');
  const [customerVersion, setCustomerVersion] = useState(-1);

  const [formData, setFormData] = useState<ICustomerModel>(customerModel);

  const popupMessage = { status: '', message: '' };
  const [modalData, setModalData] = useState(popupMessage);
  useModalEffect(modalData, setModalData);

  useEffect(() => {
    if (id) {
      const initTabByCustomerData = async () => {
        return api.customers().withId({ ID: id }).get().execute();
      };
      initTabByCustomerData()
        .then((response) => {
          const customerData = mapCustomerToModel(response.body);
          setFormData(customerData);
          setCustomerVersion(response.body.version);
        })
        .catch((error: unknown) => {
          if (error instanceof ServerError) {
            setModalData({ status: 'Error', message: error.message });
          } else {
            setModalData({ status: 'Error', message: 'Unexpected error occurred.' });
          }
        });
    } else {
      setModalData({ status: 'Error', message: 'Please, make relogin again.' });
    }
  }, [id, api, activeTab]);

  const handleSwitchTab = () => {
    switch (activeTab) {
      case 'basicInfo':
        return <BasicUserDataProfile userProfileFormData={formData} />;
      case 'address':
        return <AddressProfileForm userProfileFormData={formData} />;
      case 'password':
        return <ChangePasswordForm version={customerVersion} />;
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
          className={`${styles.tab} ${activeTab === 'address' ? styles.activeTab : ''}`}
          onClick={() => {
            setActiveTab('address');
          }}
        >
          Addresses
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
      <div className={styles.contentWrapper}>{handleSwitchTab()}</div>
      {modalData.message && <ModalWindow data={modalData} />}
    </div>
  );
};
